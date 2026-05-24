import Foundation
import Vision
import AppKit

struct OcrToken: Encodable {
  let text: String
  let confidence: Float
  let x: Double
  let y: Double
  let width: Double
  let height: Double
}

struct OcrFile: Encodable {
  let source: String
  let tokens: [OcrToken]
}

let paths = Array(CommandLine.arguments.dropFirst())
guard !paths.isEmpty else {
  fputs("Usage: swift scripts/rating-vision-ocr.swift /path/to/image.png [...]\n", stderr)
  exit(2)
}

var output: [OcrFile] = []
for imagePath in paths {
  let url = URL(fileURLWithPath: imagePath)
  guard let nsImage = NSImage(contentsOf: url) else {
    output.append(OcrFile(source: imagePath, tokens: []))
    continue
  }
  var proposedRect = CGRect(origin: .zero, size: nsImage.size)
  guard let cgImage = nsImage.cgImage(forProposedRect: &proposedRect, context: nil, hints: nil) else {
    output.append(OcrFile(source: imagePath, tokens: []))
    continue
  }

  let handler = VNImageRequestHandler(cgImage: cgImage, orientation: .up, options: [:])
  var observations: [VNRecognizedTextObservation] = []
  let request = VNRecognizeTextRequest { request, _ in
    observations = request.results as? [VNRecognizedTextObservation] ?? []
  }
  request.revision = VNRecognizeTextRequestRevision3
  request.recognitionLevel = .accurate
  request.recognitionLanguages = ["ru-RU", "en-US"]
  request.usesLanguageCorrection = false
  do {
    try handler.perform([request])
  } catch {
    output.append(OcrFile(source: imagePath, tokens: []))
    continue
  }

  let tokens = observations.compactMap { observation -> OcrToken? in
    guard let candidate = observation.topCandidates(1).first else { return nil }
    let box = observation.boundingBox
    return OcrToken(
      text: candidate.string,
      confidence: candidate.confidence,
      x: Double(box.minX),
      y: Double(box.minY),
      width: Double(box.width),
      height: Double(box.height)
    )
  }
  .sorted {
    let dy = abs($0.y - $1.y)
    if dy > 0.008 { return $0.y > $1.y }
    return $0.x < $1.x
  }

  output.append(OcrFile(source: imagePath, tokens: tokens))
}

let encoder = JSONEncoder()
encoder.outputFormatting = [.prettyPrinted, .sortedKeys]
let data = try encoder.encode(output)
FileHandle.standardOutput.write(data)
FileHandle.standardOutput.write("\n".data(using: .utf8)!)

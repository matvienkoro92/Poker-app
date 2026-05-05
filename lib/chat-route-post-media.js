"use strict";

async function normalizeChatPostMedia(body, myId) {
  body = body || {};
  let image = body.image;
  if (image && typeof image === "string") {
    const m = image.match(/^data:image\/(jpeg|jpg|png|gif|webp);base64,(.+)$/);
    image = m && m[2] && m[2].length <= 450000 ? image : null;
  }
  if (image) {
    try {
      const { tryUploadChatImageDataUrl } = require("./chat-image-blob");
      const blobUrl = await tryUploadChatImageDataUrl(image, myId);
      if (blobUrl) image = blobUrl;
    } catch (eImgUp) {
      console.error("[chat] chat image blob upload", eImgUp && eImgUp.message ? eImgUp.message : eImgUp);
      if ((process.env.BLOB_READ_WRITE_TOKEN || "").trim()) {
        return { error: "Не удалось сохранить изображение" };
      }
    }
  }

  let voice = body.voice;
  if (voice && typeof voice === "string") {
    let vRaw = String(voice).trim();
    if (/^data:video\/webm/i.test(vRaw)) vRaw = vRaw.replace(/^data:video\/webm/i, "data:audio/webm");
    else if (/^data:video\/(mp4|quicktime)/i.test(vRaw)) {
      vRaw = vRaw.replace(/^data:video\/(mp4|quicktime)/i, "data:audio/mp4");
    } else if (/^data:application\/octet-stream/i.test(vRaw)) {
      const c = vRaw.indexOf(",");
      if (c > 0) vRaw = "data:audio/webm;base64," + vRaw.slice(c + 1);
    }
    const v = vRaw.match(/^data:audio\/[^,]+,([\s\S]+)$/);
    voice = v && v[1] && v[1].length <= 1200000 ? vRaw : null;
  }

  let document = body.document;
  let documentName = (body.documentName && String(body.documentName).trim()) || "document.pdf";
  if (document && typeof document === "string") {
    const dm = document.match(/^data:application\/pdf;base64,([\s\S]+)$/);
    if (!dm || !dm[1] || dm[1].length > 12 * 1024 * 1024) document = null;
    else documentName = documentName.slice(0, 200).replace(/[^\w\s.-]/g, "") || "document.pdf";
  } else document = null;

  return { image, voice, document, documentName };
}

module.exports = {
  normalizeChatPostMedia,
};

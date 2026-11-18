"""Rebuild facial planes in Blender from the neutral wardrobe sculpture."""
import bpy
import json
import math
import struct
from pathlib import Path
import numpy as np

folder = Path(__file__).resolve().parents[1] / 'assets/player-hall/character-3d/sculpt'
data = (folder/'face.bin').read_bytes()
offset = struct.unpack_from('<I', data)[0]+4
meta = json.loads(data[4:offset])
n = meta['vertices']
verts = np.frombuffer(data, '<f4', n*3, offset).reshape(-1, 3)
faces = np.frombuffer(data, '<u4', meta['indices'], offset+24*n).reshape(-1, 3)
mesh = bpy.data.meshes.new('PokerMonkey facial sculpture')
mesh.from_pydata(verts.tolist(), [], faces.tolist())
for vertex in mesh.vertices:
    x, y, z = vertex.co
    a = abs(x)
    def mound(cx, cy, wx, wy):
        return math.exp(-((a-cx)/wx)**2-((y-cy)/wy)**2)
    front = max(0, min(1, (z-.19)/.07))
    brow = mound(.099, 1.684, .084, .035)
    cheek = mound(.155, 1.557, .057, .062)
    nose = mound(.035, 1.559, .034, .027)
    chin = mound(.04, 1.38, .11, .043)
    vertex.co.z += front*(.042*brow+.032*cheek+.025*nose+.018*chin-.013*mound(.12,1.61,.064,.023))
    vertex.co.x += math.copysign(front*(.022*nose+.015*cheek),x)
mesh.update()
positions = np.empty(n*3, dtype='<f4')
normals = positions.copy()
mesh.vertices.foreach_get('co', positions)
mesh.vertices.foreach_get('normal', normals)
(folder/'face-v2.bin').write_bytes(data[:offset]+positions.tobytes()+normals.tobytes()+faces.tobytes())

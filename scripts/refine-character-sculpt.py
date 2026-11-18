"""Finish the optimized garment meshes with Blender's bundled Python and NumPy."""
import json
import struct
from pathlib import Path

import numpy as np

SCULPTS = Path(__file__).resolve().parents[1] / 'assets/player-hall/character-3d/sculpt'


def shape(points, garment):
    x, y, z = points.T
    side = np.sign(x)
    width = np.abs(x)
    result = points.copy()

    def mound(cx, cy, sx, sy):
        return np.exp(-((width-cx)/sx)**2 - ((y-cy)/sy)**2)

    if garment.startswith('shirt'):
        shoulder = mound(.45, 1.02, .17, .17)
        waist = mound(.41, .48, .13, .24)
        chest = mound(.22, .91, .22, .19)
        result[:, 0] += side * (.041*shoulder - .032*waist)
        result[:, 2] += z * (.15*chest + .08*shoulder)
        if garment == 'shirt-jacket':
            sleeve = mound(.67, .56, .13, .22)
            folds = np.sin(47*y + 5*z + 9*width)
            result[:, 2] += z * sleeve * (.12 + .10*folds)
            result[:, 2] -= .03*sleeve*np.clip(-z/.10, 0, 1)
    else:
        thigh = mound(.29, -.49, .23, .23)
        knee = mound(.34, -.78, .15, .13)
        calf = mound(.37, -1.06, .16, .19)
        result[:, 2] += .026*thigh*np.clip(z/.12, 0, 1)
        if garment == 'pants':
            result[:, 2] += .038*knee*np.clip(z/.09, 0, 1)
            result[:, 2] -= .044*calf*np.clip(-z/.09, 0, 1)
            result[:, 2] += z*.10*knee*np.sin(45*y + 12*width)
    return result


def refine(name):
    path = SCULPTS / (name + '.bin')
    data = path.read_bytes()
    size, = struct.unpack_from('<I', data)
    meta = json.loads(data[4:4+size])
    if meta.get('tailoring') == 1:
        return
    count = meta['vertices']
    offset = 4 + size
    points, normals = np.frombuffer(data, '<f4', count*6, offset).reshape(2, count, 3).astype(float)
    # Inverse-transpose normals preserve the sculpt's smooth shading across folds.
    eps = .0001
    jacobian = np.stack([(shape(points+d, name)-shape(points-d, name))/(2*eps)
                         for d in np.eye(3)*eps], axis=-1)
    normals = np.linalg.solve(jacobian.transpose(0, 2, 1), normals[..., None])[..., 0]
    normals /= np.maximum(np.linalg.norm(normals, axis=1, keepdims=True), 1e-10)
    meta['tailoring'] = 1
    header = json.dumps(meta, separators=(',', ':')).encode()
    header += b' ' * (-len(header) % 4)
    path.write_bytes(struct.pack('<I', len(header)) + header + shape(points, name).astype('<f4').tobytes()
                     + normals.astype('<f4').tobytes() + data[offset+24*count:])


for garment in ('shirt-jacket', 'shirt-tee', 'shirt-tank', 'pants', 'shorts'):
    refine(garment)

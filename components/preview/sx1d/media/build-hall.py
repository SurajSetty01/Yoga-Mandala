"""
sx1d — rebuild the three hall-*.webp cut-outs beside this file.

    python components/preview/sx1d/media/build-hall.py

Reads the site's own 1620px encode of pr-ttc-dsc_0064_1 (the camera original is the same
size) and writes RGBA WebP at 1620, 960 and 640. Needs rembg with the isnet-general-use
model, numpy, scipy and Pillow. See ../media.ts for what each step is for.
"""
import os
import numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage as ndi
from rembg import remove, new_session

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, '..', '..', '..', '..'))
SRC = os.path.join(ROOT, 'public', 'media', 'stills', 'pr-ttc-dsc_0064_1-1620.webp')

src = Image.open(SRC).convert('RGB')
rgb = np.asarray(src).astype(np.float32)
H, W = rgb.shape[:2]

# 1 · people and props
ap = np.asarray(remove(src, session=new_session('isnet-general-use'), only_mask=True)).astype(np.float32) / 255
ap[:150, :] = 0            # rope ties and netting above the heads
ap[:330, :150] = 0         # the bamboo pole
lab, n = ndi.label(ap > 0.5)
sizes = ndi.sum(np.ones_like(ap), lab, range(1, n + 1))
keep = np.zeros(n + 1, bool)
keep[1:] = sizes > 4000
ap *= ndi.binary_dilation(keep[lab], iterations=3)

# 2 · the floor, on the measured wall base (drawn at 4x for an anti-aliased edge)
big = Image.new('L', (W * 4, H * 4), 0)
pts = [(0, 459), (468, 408), (840, 508), (1370, 652), (1620, 713), (1620, 1080), (0, 1080)]
ImageDraw.Draw(big).polygon([(x * 4, y * 4) for x, y in pts], fill=255)
af = np.asarray(big.resize((W, H), Image.LANCZOS)).astype(np.float32) / 255

# 3 · the floor alone is lit like a pool around the people standing on it: full within
#     180px of a figure or a chair, gone by 560px, and fading at both outer ends
xx = np.mgrid[0:H, 0:W][1].astype(np.float32)
near = ndi.distance_transform_edt(ap < 0.5)


def ss(e0, e1, v):
    t = np.clip((v - e0) / (e1 - e0), 0, 1)
    return t * t * (3 - 2 * t)


a = np.maximum(ap, af * (1 - ss(180, 560, near)) * ss(0, 260, xx) * (1 - ss(1250, 1620, xx)))

# 4 · edge colour pulled in from the nearest solid pixel where a figure meets a wall
core = ap >= 0.96
iy, ix = ndi.distance_transform_edt(~core, return_distances=False, return_indices=True)
edge = (ap > 0.01) & (ap < 0.96) & (af < 0.5)
out = rgb.copy()
out[edge] = rgb[iy, ix][edge]

img = Image.fromarray(np.dstack([out, a * 255]).clip(0, 255).astype(np.uint8), 'RGBA')
for w in (1620, 960, 640):
    im = img if w == W else img.resize((w, round(H * w / W)), Image.LANCZOS)
    im.save(os.path.join(HERE, f'hall-{w}.webp'), 'WEBP', quality=84, alpha_quality=90, method=6)
print('ok')

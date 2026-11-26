"""Run from the repository root with Blender --background --python."""
import math
import random
import tempfile
from pathlib import Path
from collections import defaultdict
import bpy
from mathutils import Vector

bpy.ops.wm.read_factory_settings(use_empty=True)
rng = random.Random(341)
materials = {}
meshes = defaultdict(lambda: ([], []))

def material(name, hex_color, roughness=.8, metal=0, glow=0):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    shader = m.node_tree.nodes.get("Principled BSDF")
    rgb = [int(hex_color[i:i+2], 16)/255 for i in (0, 2, 4)]
    color = [((v+.055)/1.055)**2.4 if v>.04045 else v/12.92 for v in rgb]+[1]
    shader.inputs['Base Color'].default_value = color
    shader.inputs['Roughness'].default_value = roughness
    shader.inputs['Metallic'].default_value = metal
    shader.inputs['Emission Color'].default_value = color
    shader.inputs['Emission Strength'].default_value = glow
    materials[name] = m

for args in [('brick','ffffff'),('stone','c7b29a'),('cap','917867'),('iron','293739',.53,.46),
             ('frame','214743',.52),('brass','bb965b',.35,.64),('oak','805438'),
             ('plaster','c99d72'),('leather','874736'),('ceramic','e3dac1'),
             ('sash','47606a',.28,.48),('lit','ffd398',.55,0,1.25),('shade','e4be85',.65,0,.32)]:
    material(*args)

# A 1.92 m repeating brick tile: 24 courses, staggered running bond.
size = 384
brick_image = bpy.data.images.new('Kiln brick - 80 mm courses',size,size)
pixels = []
tones = [[rng.uniform(.79,1.13) for _ in range(8)] for _ in range(24)]
for y in range(size):
    row = y//16
    for x in range(size):
        col, bx = divmod(x+24*(row%2),48)
        by = y%16
        mortar = bx<2 or by<2
        tone = tones[row][col%8]*rng.uniform(.87,1.1)
        rgb = (.38,.30,.24) if mortar else (.44*tone,.19*tone,.118*tone)
        pixels.extend((*rgb,1))
brick_image.pixels.foreach_set(pixels)
brick_image.filepath_raw = str(Path(tempfile.gettempdir())/'mayak-kiln-brick.png')
brick_image.file_format = 'PNG'
brick_image.save()
brick_image.pack()
nodes = materials['brick'].node_tree
tex = nodes.nodes.new('ShaderNodeTexImage')
tex.image = brick_image
nodes.links.new(tex.outputs['Color'],nodes.nodes.get('Principled BSDF').inputs['Base Color'])
# Tile-space normal map picks out the bevel on each mortar joint.
normal_image=bpy.data.images.new('Recessed mortar',size,size)
normal_image.colorspace_settings.name='Non-Color'
normal_pixels=[]
for y in range(size):
    for x in range(size):
        bx=(x+24*((y//16)%2))%48
        by=y%16
        nx=-.32 if bx==2 else .32 if bx==47 else 0
        ny=-.32 if by==2 else .32 if by==15 else 0
        normal_pixels.extend((.5+nx,.5+ny,.5+.5*math.sqrt(max(0,1-4*(nx*nx+ny*ny))),1))
normal_image.pixels.foreach_set(normal_pixels)
normal_image.filepath_raw=str(Path(tempfile.gettempdir())/'mayak-mortar-normal.png')
normal_image.file_format='PNG'
normal_image.save()
normal_image.pack()
normal_tex=nodes.nodes.new('ShaderNodeTexImage')
normal_tex.image=normal_image
normal=nodes.nodes.new('ShaderNodeNormalMap')
normal.inputs['Strength'].default_value=.46
nodes.links.new(normal_tex.outputs['Color'],normal.inputs['Color'])
nodes.links.new(normal.outputs['Normal'],nodes.nodes.get('Principled BSDF').inputs['Normal'])

def face(mat, points):
    verts, faces = meshes[mat]
    first = len(verts)
    verts.extend(points)
    faces.append(tuple(range(first,first+len(points))))

def prism(mat, outline, lo, hi):
    # Outline counterclockwise from above.
    face(mat, [(x,y,hi) for x,y in outline])
    face(mat, [(x,y,lo) for x,y in reversed(outline)])
    for i,(x,y) in enumerate(outline):
        a,b = outline[(i+1)%len(outline)]
        face(mat, [(x,y,lo),(a,b,lo),(a,b,hi),(x,y,hi)])

def box(mat,x,y,z,w,d,h):
    prism(mat,[(x-w/2,y-d/2),(x+w/2,y-d/2),(x+w/2,y+d/2),(x-w/2,y+d/2)],z-h/2,z+h/2)

def rod(mat,a,b,r,n=8):
    a,b=Vector(a),Vector(b)
    axis=(b-a).normalized()
    u=axis.cross(Vector((0,0,1)) if abs(axis.z)<.9 else Vector((1,0,0))).normalized()
    v=axis.cross(u)
    offsets=[r*(u*math.cos(i*math.tau/n)+v*math.sin(i*math.tau/n)) for i in range(n)]
    for i,o in enumerate(offsets):
        q=offsets[(i+1)%n]
        face(mat,[tuple(a+o),tuple(a+q),tuple(b+q),tuple(b+o)])
    face(mat,[tuple(b+o) for o in offsets])
    face(mat,[tuple(a+o) for o in reversed(offsets)])

def plate(mat,z,h,over=0):
    prism(mat,[(-8-over,-2.3-over),(8+over,-2.3-over),(8+over,.46+over),
               (6.16+over,2.3+over),(-8-over,2.3+over)],z,z+h)

plate('stone',0,.34)
plate('iron',.33,.045)
plate('stone',3.35,.21,.09)
plate('brick',3.55,10.41)
for z,h,o,m in [(13.87,.13,.05,'cap'),(14,.12,.15,'stone'),(14.12,.16,.26,'cap'),(14.28,.1,.36,'stone')]:
    plate(m,z,h,o)
box('plaster',0,-2.15,1.85,15.9,.18,3.05)
box('oak',-7.85,0,1.85,.16,4.4,3.05)
# Facade coordinates: horizontal distance, outward depth, height.
def facade(start,end,count,door=False):
    dx,dy=end[0]-start[0],end[1]-start[1]
    length=math.hypot(dx,dy)
    tx,ty=dx/length,dy/length
    def point(u,v,h):
        return (start[0]+tx*u-ty*v,start[1]+ty*u+tx*v,h)
    def panel(mat,u,v,h,w,d,t):
        outline=[point(u+du,v+dv,0)[:2] for du,dv in [(-w/2,-d/2),(w/2,-d/2),(w/2,d/2),(-w/2,d/2)]]
        prism(mat,outline,h-t/2,h+t/2)
    bay=length/count
    for i in range(count):
        u=(i+.5)*bay
        # The glazed shop fronts are open behind the glazing, through to the back wall.
        for edge in [-1,1]:
            panel('frame',u+edge*(bay/2-.08),0,1.88,.16,.2,3.03)
        if door:
            panel('oak',u,-.15,1.55,1.44,.13,2.44)
            panel('sash',u,-.065,1.87,1.12,.035,1.36)
            panel('brass',u+.48,-.025,1.22,.055,.08,.31)
            panel('stone',u,.11,.355,1.78,.52,.05)
            panel('frame',u,.39,2.76,bay-.1,.89,.105)
            panel('brass',u,.82,2.73,bay-.09,.055,.09)
            for edge in [-.91,.91]:
                rod('iron',point(u+edge,.015,2.36),point(u+edge,.76,2.71),.027)
        else:
            panel('frame',u,0,.60,bay-.12,.19,.51)
            panel('glass',u,-.035,1.87,bay-.19,.016,1.99)
            panel('brass',u,0,2.57,bay,.085,.047)
        panel('frame',u,.035,3.05,bay,.23,.56)
        panel('brass',u,.16,3.32,bay,.04,.033)
        for base in [4.08,7.23,10.4]:
            w=min(1.69,bay-.35)
            for side in [-1,1]:
                panel('cap',u+side*(w/2+.06),.055,base+1.05,.13,.17,2.18)
            panel('stone',u,.13,base-.04,w+.38,.40,.16)
            panel('iron',u,.035,base+1.04,w,.085,2.06)
            panel('sash',u,.09,base+1.04,w-.15,.032,1.91)
            if (i+int(base))%3!=1:
                blind=.25+((i*7+int(base))%5)*.1
                panel('cap',u,.116,base+1.97-blind/2,w-.18,.018,blind)
            panel('frame',u,.135,base+1.04,.06,.08,1.98)
            panel('stone',u,.14,base+1.26,w-.05,.07,.065)
            # Segmented eyebrow above the sash with a projecting central keystone.
            for j in range(9):
                t=j/8
                panel('stone' if j==4 else 'cap',u+(t-.5)*w,.12,base+2.13+.12*math.sin(t*math.pi),
                      w/8+.015,.23,.23 if j==4 else .17)
    return point

material('glass','9dbbb9',.16,.2)
shader=materials['glass'].node_tree.nodes.get('Principled BSDF')
shader.inputs['Alpha'].default_value=.16
facade((-8,2.3),(6.16,2.3),5)
facade((6.16,2.3),(8,.46),1,True)
facade((8,.46),(8,-2.3),1)
# Counter, upholstered banquette, bentwood chairs, cups and hanging lamps.
box('leather',-1.1,-1.49,.90,7.4,.75,.24)
box('leather',-1.1,-1.80,1.27,7.4,.16,.75)
box('frame',4.65,-.7,.97,3.7,.75,1.23)
box('stone',4.65,-.7,1.64,3.93,.91,.12)
for x in [-5.9,-2.8,.3,3.35]:
    rod('oak',(x,.76,1.12),(x,.76,1.20),.51,24)
    rod('iron',(x,.76,.34),(x,.76,1.12),.075)
    rod('ceramic',(x+.12,.76,1.20),(x+.12,.76,1.34),.083,12)
    for side in [-1,1]:
        cx=x+side*.69
        rod('oak',(cx,.76,.76),(cx,.76,.83),.24,16)
        for oy in [-.14,.14]:
            for ox in [-.14,.14]:
                rod('iron',(cx+ox*1.24,.76+oy*1.24,.34),(cx+ox,.76+oy,.78),.024)
        box('leather',cx+side*.19,.76,1.06,.07,.39,.33)
    rod('iron',(x,.74,2.49),(x,.74,3.38),.017)
    rod('shade',(x,.74,2.38),(x,.74,2.50),.27,24)
    rod('lit',(x,.74,2.35),(x,.74,2.38),.245,24)
# Grated landings, wall brackets, twin stringers, inclined rails and alternating flights.
for floor in range(3):
    h=4.0+floor*3.15
    for yy in [2.39,3.32]:
        box('iron',-4.15,yy,h,3.64,.077,.14)
    for i in range(29):
        box('iron',-5.92+i*.126,2.855,h+.05,.038,.99,.06)
    for x in [-5.91,-4.13,-2.39]:
        rod('iron',(x,2.31,h-.71),(x,3.32,h),.045)
        rod('iron',(x,3.32,h),(x,3.32,h+.88),.034)
    rod('iron',(-5.91,3.32,h+.88),(-2.39,3.32,h+.88),.04)
    if floor==2: continue
    a,b=(-5.72,-2.56) if floor==0 else (-2.56,-5.72)
    for yy in [2.47,3.18]:
        rod('iron',(a,yy,h),(b,yy,h+3.15),.067)
        rod('iron',(a,yy,h+.87),(b,yy,h+4.02),.037)
    for i in range(17):
        t=i/16
        x=a+(b-a)*t
        box('iron',x,2.83,h+3.15*t,.24,.76,.058)
        if i%4==0: rod('iron',(x,3.18,h+3.15*t),(x,3.18,h+3.15*t+.87),.029)
# Single mesh per finish, metre-scaled UVs and a portable packed texture.
for name,(verts,faces) in meshes.items():
    mesh=bpy.data.meshes.new(name)
    mesh.from_pydata(verts,[],faces);mesh.update()
    obj=bpy.data.objects.new(name,mesh);bpy.context.collection.objects.link(obj)
    obj.data.materials.append(materials[name])
    if name=='brick':
        uv=mesh.uv_layers.new()
        for poly in mesh.polygons:
            n=poly.normal
            for idx in poly.loop_indices:
                v=mesh.vertices[mesh.loops[idx].vertex_index].co
                uv.data[idx].uv=((v.x*n.y-v.y*n.x)/1.92,v.z/1.92)
source=Path.cwd()/'output/villa-waterfront/mayak-cafe.blend'
source.parent.mkdir(parents=True,exist_ok=True)
bpy.ops.wm.save_as_mainfile(filepath=str(source))
bpy.ops.export_scene.gltf(filepath=str(Path.cwd()/'assets/city-landscape/mayak-cafe.glb'),export_format='GLB')

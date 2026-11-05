"""Native Blender bicycle, optional upgrade groups, metric X-forward/Z-up."""
import bpy,math,os,json,sys
from mathutils import Vector
ROOT=os.path.abspath(os.path.join(os.path.dirname(__file__),'../../..'));OUT=ROOT+'/output/blender-bicycle';os.makedirs(OUT,exist_ok=True)
bpy.ops.object.select_all(action='SELECT');bpy.ops.object.delete(use_global=False)
collection=bpy.data.collections.new('Bicycle');bpy.context.scene.collection.children.link(collection)
def mat(name,color,metal=0,rough=.4):
 m=bpy.data.materials.new(name);m.use_nodes=True;p=m.node_tree.nodes.get('Principled BSDF');p.inputs['Base Color'].default_value=(*color,1);p.inputs['Metallic'].default_value=metal;p.inputs['Roughness'].default_value=rough
 if metal>.2:p.inputs['Coat Weight'].default_value=.45
 return m
paint=mat('Bicycle frame',(.025,.20,.37),.55,.28);black=mat('Black metal',(.018,.023,.029),.4,.36);rubber=mat('Rubber',(.012,.015,.018),0,.85);steel=mat('Brushed steel',(.45,.50,.55),.85,.29);chrome=mat('Spokes',(.62,.68,.72),.95,.23);leather=mat('Saddle',(.025,.028,.032),0,.7);red=mat('Tail light',(.55,.008,.015),.1,.25);glass=mat('Headlight lens',(.6,.78,.9),.3,.19);bagmat=mat('Canvas bag',(.065,.08,.06),0,.95)
variants={};current=None
def group(kind,id):
 global current
 name='bike__'+kind+'__'+id
 current=bpy.data.objects.new(name,None);collection.objects.link(current);variants[(kind,id)]=current;return current
def link(o):
 for c in list(o.users_collection):c.objects.unlink(o)
 collection.objects.link(o);o.parent=current;return o
def pipe(name,a,b,r,material,segments=16):
 delta=Vector(b)-Vector(a);bpy.ops.mesh.primitive_cylinder_add(vertices=segments,radius=r,depth=delta.length,location=(Vector(a)+Vector(b))/2);o=link(bpy.context.object);o.name=name;o.rotation_euler=delta.to_track_quat('Z','Y').to_euler();o.data.materials.append(material)
 for p in o.data.polygons:p.use_smooth=len(p.vertices)==4
 return o
def torus(name,center,r,t,material,major=72,minor=10):
 bpy.ops.mesh.primitive_torus_add(major_radius=r,minor_radius=t,major_segments=major,minor_segments=minor,location=center,rotation=(math.pi/2,0,0));o=link(bpy.context.object);o.name=name;o.data.materials.append(material)
 for p in o.data.polygons:p.use_smooth=True
 return o
def box(name,loc,size,material,bevel=.008):
 bpy.ops.mesh.primitive_cube_add(size=1,location=loc);o=link(bpy.context.object);o.name=name;o.dimensions=size;bpy.ops.object.transform_apply(location=False,rotation=False,scale=True);o.data.materials.append(material)
 if bevel:m=o.modifiers.new('Soft edges','BEVEL');m.width=bevel;m.segments=3;o.modifiers.new('Normals','WEIGHTED_NORMAL')
 return o
def ball(name,loc,size,material):
 bpy.ops.mesh.primitive_uv_sphere_add(segments=24,ring_count=12,location=loc);o=link(bpy.context.object);o.name=name;o.scale=size;o.data.materials.append(material)
 for p in o.data.polygons:p.use_smooth=True
 return o
def cable(name,points,r,material):
 cu=bpy.data.curves.new(name,'CURVE');cu.dimensions='3D';cu.bevel_depth=r;cu.bevel_resolution=2;s=cu.splines.new('BEZIER');s.bezier_points.add(len(points)-1)
 for p,v in zip(s.bezier_points,points):p.co=v;p.handle_left_type='AUTO';p.handle_right_type='AUTO'
 o=bpy.data.objects.new(name,cu);collection.objects.link(o);o.parent=current;o.data.materials.append(material);return o
rear=(-.55,0,.35);front=(.58,0,.35);bb=(-.08,0,.31);seat=(-.22,0,.82);head=(.34,0,.87);headlow=(.39,0,.70)
group('core','always')
for a,b,r in [(bb,seat,.022),(seat,head,.020),(bb,headlow,.027),(head,headlow,.028)]:pipe('Frame tube',a,b,r,paint)
for s in [-1,1]:
 for a,b,r in [(bb,(-.55,s*.065,.35),.012),(seat,(-.55,s*.065,.35),.012)]:pipe('Rear stay',a,b,r,paint)
pipe('Bottom bracket',(-.08,-.08,.31),(-.08,.08,.31),.036,black)
pipe('Seat post',seat,(-.24,0,.96),.013,steel)
for axle in [rear,front]:pipe('Wheel axle',(axle[0],-.075,.35),(axle[0],.075,.35),.011,steel)
# Replaceable fork: rigid or suspended stanchions.
for id in ['stock','suspension']:
 group('fork',id)
 for s in [-1,1]:
  if id=='stock':pipe('Rigid fork',headlow,(.58,s*.045,.35),.013,paint)
  else:
   mid=(.49,s*.045,.53);pipe('Suspension lower',mid,(.58,s*.045,.35),.021,black);pipe('Stanchion',(.39,s*.045,.74),mid,.013,steel)
 if id=='suspension':pipe('Fork crown',(.39,-.06,.72),(.39,.06,.72),.025,black);cable('Fork brace',[(.52,-.045,.45),(.53,0,.48),(.52,.045,.45)],.01,black)
# Wheel rims and laced spokes.
for id in ['spokes','aero']:
 group('wheels',id)
 for x,_,z in [rear,front]:
  torus('Rim',(x,0,z),.306,.012 if id=='spokes' else .021,steel if id=='spokes' else black)
  pipe('Hub',(x,-.032,z),(x,.032,z),.020,steel)
  count=32 if id=='spokes' else 20
  for k in range(count):
   t=k*math.pi*2/count;s=1 if k%2 else -1;twist=.20*s
   pipe('Laced spoke',(x+math.cos(t+twist)*.023,s*.026,z+math.sin(t+twist)*.023),(x+math.cos(t)*.306,0,z+math.sin(t)*.306),.0016 if id=='spokes' else .0027,chrome if id=='spokes' else black,8)
for id,thick in [('city',.022),('trail',.033)]:
 group('tyres',id)
 for x,_,z in [rear,front]:
  torus('Tyre',(x,0,z),.326,thick,rubber)
  if id=='trail':
   for k in range(52):
    t=k*math.pi*2/52;o=box('Tread block',(x+math.cos(t)*.354,0,z+math.sin(t)*.354),(.011,.052,.006),rubber,.002);o.rotation_euler.y=math.pi/2-t
bpy.ops.wm.save_as_mainfile(filepath=OUT+'/01-frame-and-wheels.blend')
# Cockpit, saddle and pedals.
for id in ['flat','riser']:
 group('handlebar',id);pipe('Stem',head,(.31,0,1.02),.014,black);pipe('Stem extension',(.31,0,1.02),(.39,0,1.035),.013,black)
 pts=[(.39,-.28,1.035),(.39,0,1.035),(.39,.28,1.035)] if id=='flat' else [(.36,-.30,1.08),(.40,-.15,1.08),(.40,-.08,1.035),(.40,.08,1.035),(.40,.15,1.08),(.36,.30,1.08)]
 cable('Handlebar',pts,.012,black)
 for s in [-1,1]:
  z=1.035 if id=='flat' else 1.08;pipe('Grip',(.38,s*.20,z),(.36,s*.29,z),.017,rubber)
  cable('Brake lever',[(.40,s*.19,z),(.44,s*.23,z-.025),(.43,s*.28,z-.026)],.004,steel)
  cable('Brake cable',[(.42,s*.19,z),(.48,s*.10,.92),(.37,s*.035,.74),(.55,s*.03,.49)],.002,black)
for id in ['comfort','sport']:
 group('saddle',id);ball('Saddle body',(-.25,0,.985),(.12,.082 if id=='comfort' else .058,.026),leather)
 pipe('Saddle rails',(-.30,-.025,.955),(-.15,-.025,.955),.004,steel);pipe('Saddle rails',(-.30,.025,.955),(-.15,.025,.955),.004,steel)
for id in ['stock','platform']:
 group('pedals',id)
 for s in [-1,1]:
  end=(-.08+s*.14,s*.082,.31+s*.065);pipe('Crank arm',(-.08,s*.07,.31),end,.009,black)
  pipe('Pedal spindle',end,(end[0],s*.13,end[2]),.006,steel);box('Pedal',(end[0],s*.15,end[2]),(.085,.065,.015),black if id=='stock' else steel,.004)
  if id=='platform':
   for dx in [-.028,.028]:
    for dy in [-.02,.02]:pipe('Pedal pin',(end[0]+dx,s*.15+dy,end[2]),(end[0]+dx,s*.15+dy,end[2]+.012),.002,steel,8)
# Chainring and chain path, cassette and derailleur variants.
for id in ['single','sport']:
 group('gears',id)
 torus('Chainring',(-.08,-.072,.31),.078,.006,steel,64,8)
 for k in range(5):
  t=k*math.pi*2/5;pipe('Chainring spider',(-.08,-.072,.31),(-.08+math.cos(t)*.074,-.072,.31+math.sin(t)*.074),.005,black)
 for k in range(1 if id=='single' else 9):torus('Rear sprocket',(-.55,-.06-k*.003,.35),.047-k*.0029,.0025,steel,48,6)
 cable('Upper chain',[(-.55,-.082,.397),(-.32,-.082,.399),(-.08,-.082,.388)],.003,black)
 cable('Lower chain',[(-.55,-.082,.303),(-.31,-.082,.266),(-.08,-.082,.232)],.003,black)
 if id=='sport':
  pipe('Derailleur',(-.54,-.10,.34),(-.50,-.10,.24),.010,black);torus('Jockey wheel',(-.50,-.10,.24),.015,.003,black,32,6)
for id in ['rim','disc']:
 group('brakes',id)
 for x in [-.55,.58]:
  if id=='disc':
   torus('Brake rotor',(x,.04,.35),.070,.008,steel,64,8)
   for k in range(6):
    t=k*math.pi/3;pipe('Rotor spider',(x,.04,.35),(x+math.cos(t)*.065,.04,.35+math.sin(t)*.065),.003,steel,8)
   box('Disc caliper',(x+.06,.045,.37),(.025,.028,.047),black,.006)
  else:
   for s in [-1,1]:pipe('V brake arm',(x,s*.022,.64),(x+.01,s*.048,.59),.006,black);box('Brake pad',(x,s*.022,.635),(.03,.012,.01),rubber,.003)
# Optional visible accessories.
group('headlight','led');pipe('Headlight bracket',(.326,0,.94),(.41,0,.94),.004,black);box('LED lamp',(.43,0,.94),(.048,.062,.043),black,.009);ball('LED lens',(.457,0,.94),(.003,.022,.014),glass);box('Rear light',(-.36,0,.91),(.016,.036,.024),red,.005)
group('rack','touring')
for s in [-1,1]:
 pipe('Rack support',(-.55,s*.065,.37),(-.56,s*.095,.79),.005,black);pipe('Rack rail',(-.72,s*.10,.80),(-.34,s*.10,.80),.006,black)
for x in [-.70,-.59,-.48,-.36]:pipe('Rack bridge',(x,-.10,.80),(x,.10,.80),.004,black)
box('Pannier bag',(-.56,.15,.64),(.23,.11,.27),bagmat,.025);box('Pannier flap',(-.56,.15,.778),(.24,.12,.018),black,.009)
# Frame graphics and reflectors remain visible in every configuration.
group('detail','always');pipe('Reflector bracket',(-.23,0,.89),(-.36,0,.89),.004,black);box('Rear reflector',(-.36,0,.89),(.009,.035,.020),red,.004)
# Convert curves, apply modifiers, consolidate by variant/material.
for g in list(variants.values()):
 for o in list(g.children):
  bpy.ops.object.select_all(action='DESELECT');o.select_set(True);bpy.context.view_layer.objects.active=o
  if o.type=='CURVE':bpy.ops.object.convert(target='MESH')
  for m in list(o.modifiers):bpy.ops.object.modifier_apply(modifier=m.name)
 for material in list(bpy.data.materials):
  groupobjs=[o for o in g.children if o.type=='MESH' and o.data.materials and o.data.materials[0]==material]
  if len(groupobjs)<2:continue
  bpy.ops.object.select_all(action='DESELECT')
  for o in groupobjs:o.select_set(True)
  bpy.context.view_layer.objects.active=groupobjs[0];bpy.ops.object.join();groupobjs[0].name=g.name+'_'+material.name
bpy.ops.object.select_all(action='DESELECT')
for o in collection.objects:o.select_set(True)
bpy.context.view_layer.objects.active=next(iter(collection.objects))
asset=ROOT+'/assets/garage/models/bicycle-v1.glb';bpy.ops.export_scene.gltf(filepath=asset,export_format='GLB',use_selection=True,export_texcoords=False,export_normals=True,export_yup=True,export_extras=False)
triangles=0
for o in collection.objects:
 if o.type=='MESH':o.data.calc_loop_triangles();triangles+=len(o.data.loop_triangles)
json.dump({'bytes':os.path.getsize(asset),'triangles':triangles,'meshes':sum(o.type=='MESH' for o in collection.objects)},open(OUT+'/metrics.json','w'),indent=2)
bpy.ops.wm.save_as_mainfile(filepath=OUT+'/02-all-upgrades.blend')
# Studio preview, base setup and fully upgraded setup share one exported asset.
scene=bpy.context.scene;scene.render.engine='CYCLES';scene.cycles.device='CPU';scene.cycles.samples=24;scene.cycles.use_denoising=True;scene.render.resolution_x=1000;scene.render.resolution_y=720;scene.render.resolution_percentage=100
scene.world.use_nodes=True;scene.world.node_tree.nodes['Background'].inputs['Color'].default_value=(.15,.18,.22,1);scene.world.node_tree.nodes['Background'].inputs['Strength'].default_value=.4
bpy.ops.mesh.primitive_plane_add(size=200);bpy.context.object.data.materials.append(mat('Studio',(.025,.035,.05),0,.7))
def aim(o,target=(0,0,.55)):o.rotation_euler=(Vector(target)-o.location).to_track_quat('-Z','Y').to_euler()
for name,loc,energy,size in [('Key',(1,-3,4),700,4),('Rim',(-2,2,3),900,3)]:
 l=bpy.data.lights.new(name,'AREA');l.energy=energy;l.shape='DISK';l.size=size;o=bpy.data.objects.new(name,l);scene.collection.objects.link(o);o.location=loc;aim(o)
bpy.ops.object.camera_add();cam=bpy.context.object;cam.data.lens=55;scene.camera=cam
leather.node_tree.nodes['Principled BSDF'].inputs['Specular IOR Level'].default_value=.15
base={'fork':'stock','wheels':'spokes','tyres':'city','handlebar':'flat','saddle':'comfort','pedals':'stock','gears':'single','brakes':'rim','headlight':'none','rack':'none'}
up={'fork':'suspension','wheels':'aero','tyres':'trail','handlebar':'riser','saddle':'sport','pedals':'platform','gears':'sport','brakes':'disc','headlight':'led','rack':'touring'}
for variant,look in [('base',base),('upgraded',up)]:
 for (kind,id),g in variants.items():
  g.hide_render=id!='always' and look.get(kind)!=id
  for o in g.children:o.hide_render=g.hide_render
 paint.node_tree.nodes['Principled BSDF'].inputs['Base Color'].default_value=(*((.025,.20,.37) if variant=='base' else (.45,.018,.025)),1)
 for name,loc in [('front',(2.6,-3.5,1.8)),('side',(0,-4.3,1.25)),('rear',(-2.7,3.4,1.8)),('top',(.01,0,5.7))]:
  cam.location=loc;aim(cam);scene.render.filepath=OUT+'/'+variant+'-'+name+'.png';bpy.ops.render.render(write_still=True)
cam.location=(2.6,-3.5,1.8);aim(cam);bpy.ops.wm.save_as_mainfile(filepath=OUT+'/03-studio.blend')

"""Scooter upgrades and Skyboard: native geometry, no textures."""
import bpy,math,os,json
from mathutils import Vector
ROOT=os.path.abspath(os.path.join(os.path.dirname(__file__),'../../..'));OUT=ROOT+'/output/blender-micro';os.makedirs(OUT,exist_ok=True)
bpy.ops.object.select_all(action='SELECT');bpy.ops.object.delete(use_global=False)
collection=bpy.data.collections.new('Scooter');bpy.context.scene.collection.children.link(collection);prefix='sc'
def mat(name,color,metal=0,rough=.4):
 m=bpy.data.materials.new(name);m.use_nodes=True;p=m.node_tree.nodes.get('Principled BSDF');p.inputs['Base Color'].default_value=(*color,1);p.inputs['Metallic'].default_value=metal;p.inputs['Roughness'].default_value=rough
 if metal>.2:p.inputs['Coat Weight'].default_value=.45
 return m
variants={};current=None
def group(kind,id):
 global current
 name=prefix+'__'+kind+'__'+id
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

black=mat('Carbon',(.018,.025,.032),.55,.29);rubber=mat('Rubber',(.012,.015,.019),0,.8);steel=mat('Titanium',(.33,.39,.45),.85,.24);gold=mat('Gold trim',(.8,.43,.08),.8,.23);paint=mat('Scooter frame',(.065,.085,.1),.65,.26);grip=mat('Deck grip',(.035,.045,.05),0,.85)
def glow(name,color,power):
 m=mat(name,color,.2,.23);p=m.node_tree.nodes['Principled BSDF'];p.inputs['Emission Color'].default_value=(*color,1);p.inputs['Emission Strength'].default_value=power;return m
cyan=glow('Ion cyan',(.015,.65,1),3);white=glow('LED white',(.65,.85,1),3);red=glow('Rear LED',(.8,.008,.025),2)
def wheel(x,wide):
 z=.18;r=.147;t=.030 if not wide else .050
 torus('Road tyre',(x,0,z),r,t,rubber)
 torus('Rim',(x,0,z),.118,.014,steel)
 pipe('Axle',(x,-.075,z),(x,.075,z),.018,steel)
 for s in [-1,1]:
  for k in range(8):
   a=k*math.pi/4;pipe('Forged spoke',(x,s*.025,z),(x+math.cos(a)*.115,s*.025,z+math.sin(a)*.115),.007,black,10)
  torus('Rim lip',(x,s*.032,z),.119,.004,gold if wide else steel,64,8)
 if wide:
  for k in range(44):
   a=k*math.pi*2/44;o=box('Terrain tread',(x+math.cos(a)*.192,0,z+math.sin(a)*.192),(.015,.072,.009),rubber,.003);o.rotation_euler.y=math.pi/2-a
# structural frame and folding mechanism
group('core','always')
pipe('Steering column',(.50,0,.20),(.29,0,1.10),.022,paint)
pipe('Rear arm',(-.35,0,.16),(-.55,0,.18),.024,paint)
pipe('Front fork',(.50,-.045,.34),(.55,-.045,.18),.017,paint);pipe('Front fork',(.50,.045,.34),(.55,.045,.18),.017,paint)
box('Folding hinge',(.46,0,.33),(.09,.08,.10),black,.015);pipe('Hinge pin',(.46,-.052,.33),(.46,.052,.33),.019,gold)
box('Hinge latch',(.42,0,.35),(.025,.048,.065),steel,.008)
pipe('Handlebar',(.29,-.285,1.10),(.29,.285,1.10),.014,steel)
for s in [-1,1]:
 pipe('Grip',(.29,s*.19,1.10),(.29,s*.30,1.10),.023,rubber)
 for k in range(7):torus('Grip ring',(.29,s*(.20+k*.013),1.10),.023,.0014,black,32,6)
 cable('Brake lever',[(.31,s*.17,1.09),(.35,s*.22,1.07),(.35,s*.28,1.07)],.005,steel)
 cable('Brake hose',[(.32,s*.18,1.09),(.40,s*.055,.91),(.46,s*.035,.46)],.0028,black)
# alternatives
for id in ['stock','armored']:
 group('deck',id);wide=id=='armored'
 box('Battery deck',(0,0,.17),(.83,.24 if wide else .17,.105 if wide else .055),black if wide else paint,.026)
 box('Anti slip pad',(-.025,0,.23 if wide else .201),(.68,.195 if wide else .14,.009),grip,.015)
 for s in [-1,1]:
  pipe('Deck side rail',(-.35,s*(.127 if wide else .09),.18),(.34,s*(.127 if wide else .09),.18),.011,gold if wide else steel)
  for x in [-.28,.28]:pipe('Deck bolt',(x,s*(.09 if wide else .06),.225 if wide else .20),(x,s*(.09 if wide else .06),.238 if wide else .211),.006,steel,12)
 if wide:
  for x in [-.24,-.12,0,.12,.24]:box('Grip channels',(x,0,.237),(.006,.15,.003),black,.001)
for id in ['city','terrain']:
 group('wheels',id)
 for x in [-.55,.55]:wheel(x,id=='terrain')
for id in ['foot','disc']:
 group('brakes',id)
 cable('Rear fender',[(-.75,0,.20),(-.68,0,.36),(-.55,0,.39),(-.40,0,.33)],.027,black)
 if id=='disc':
  for x in [-.55,.55]:
   torus('Ventilated rotor',(x,.065,.18),.092,.007,steel)
   for k in range(8):
    a=k*math.pi/4;pipe('Rotor arm',(x,.065,.18),(x+math.cos(a)*.087,.065,.18+math.sin(a)*.087),.0035,steel,8)
   box('Hydraulic caliper',(x+.07,.066,.22),(.035,.04,.07),gold,.009)
for id in ['rigid','dual']:
 group('suspension',id)
 for x in [-.43,.43]:
  for s in [-1,1]:
   a=(x,s*.065,.19);b=(x+(.07 if x>0 else -.07),s*.065,.35)
   pipe('Shock body',a,b,.017,black if id=='dual' else steel)
   if id=='dual':
    cable('Coil spring',[(a[0]+(b[0]-a[0])*k/60+.025*math.cos(k*math.pi/5),a[1]+.025*math.sin(k*math.pi/5),a[2]+(b[2]-a[2])*k/60) for k in range(61)],.004,gold)
for id in ['none','twin']:
 group('motor',id)
 if id=='twin':
  for x in [-.55,.55]:
   pipe('Hub motor',(x,-.044,.18),(x,.044,.18),.073,black,48)
   for s in [-1,1]:
    torus('Motor cooling ring',(x,s*.048,.18),.058,.006,gold,48,8)
    for k in range(12):
     a=k*math.pi/6;pipe('Cooling fin',(x+math.cos(a)*.035,s*.05,.18+math.sin(a)*.035),(x+math.cos(a)*.060,s*.05,.18+math.sin(a)*.060),.003,steel,8)
for id in ['plain','smart']:
 group('cockpit',id)
 if id=='smart':
  box('Control pod',(.29,0,1.13),(.10,.13,.045),black,.016);box('OLED',(.29,0,1.156),(.075,.10,.004),cyan,.009)
  for y in [-.028,0,.028]:box('Display telemetry',(.29,y,1.16),(.045,.007,.003),white,.002)
  box('Thumb accelerator',(.31,-.15,1.085),(.055,.045,.035),black,.009)
for id in ['none','neon']:
 group('lights',id)
 if id=='neon':
  for s in [-1,1]:
   pipe('Under deck neon',(-.34,s*.125,.12),(.32,s*.125,.12),.008,cyan)
   box('Dual LED housing',(.39,s*.050,.71),(.055,.060,.08),black,.014);box('Dual LED lens',(.422,s*.050,.71),(.008,.044,.051),white,.006)
  box('Tail lamp',(-.70,0,.32),(.025,.09,.025),red,.008)
for id in ['classic','hyper']:
 group('body',id)
 if id=='hyper':
  # broad sculpted split carbon steering fairing and gold spine
  for s in [-1,1]:
   cable('Carbon aero blade',[(.50,s*.045,.37),(.43,s*.070,.52),(.35,s*.055,.88),(.29,s*.028,1.05)],.030,black)
   cable('Gold blade edge',[(.51,s*.073,.37),(.44,s*.096,.52),(.36,s*.080,.87),(.30,s*.048,1.02)],.005,gold)
   box('Front intake',(.48,s*.045,.46),(.065,.04,.085),black,.01)
   pipe('Front light signature',(.44,s*.078,.54),(.36,s*.066,.86),.006,cyan)
  box('Stem badge',(.37,0,.84),(.022,.065,.09),gold,.008)
  box('Rear kick tail',(-.40,0,.27),(.14,.19,.055),black,.015).rotation_euler.y=-.30
bpy.ops.wm.save_as_mainfile(filepath=OUT+'/01-scooter-parts.blend')

def export_model(collection,variants,filename):
 for g in list(variants.values()):
  for o in list(g.children):
   bpy.ops.object.select_all(action='DESELECT');o.select_set(True);bpy.context.view_layer.objects.active=o
   if o.type=='CURVE':bpy.ops.object.convert(target='MESH')
   for m in list(o.modifiers):bpy.ops.object.modifier_apply(modifier=m.name)
  for material in list(bpy.data.materials):
   objs=[o for o in g.children if o.type=='MESH' and o.data.materials and o.data.materials[0]==material]
   if len(objs)<2:continue
   bpy.ops.object.select_all(action='DESELECT')
   for o in objs:o.select_set(True)
   bpy.context.view_layer.objects.active=objs[0];bpy.ops.object.join();objs[0].name=g.name+'_'+material.name
 bpy.ops.object.select_all(action='DESELECT')
 for o in collection.objects:o.select_set(True)
 path=ROOT+'/assets/garage/models/'+filename;bpy.ops.export_scene.gltf(filepath=path,export_format='GLB',use_selection=True,export_texcoords=False,export_yup=True)
 print('ASSET',filename,os.path.getsize(path),flush=True)
export_model(collection,variants,'scooter-v1.glb');scooter_collection=collection;scooter_variants=variants.copy()
collection=bpy.data.collections.new('Skyboard');bpy.context.scene.collection.children.link(collection);prefix='sky';variants={};group('core','always')
box('Sculpted carbon deck',(0,0,.43),(1.24,.36,.065),black,.09)
for s in [-1,1]:
 cable('Neon perimeter',[(-.57,s*.09,.43),(-.45,s*.18,.43),(.42,s*.18,.43),(.58,s*.08,.43)],.008,cyan)
 pipe('Titanium edge',(-.43,s*.186,.45),(.43,s*.186,.45),.008,gold)
for x in [-.36,.36]:
 box('Footpad',(x,0,.475),(.31,.28,.025),grip,.035)
 for k in range(7):box('Traction rib',(x-.10+k*.033,0,.491),(.008,.23,.005),black,.002)
 box('Magnetic core',(x,0,.37),(.22,.24,.07),steel,.04)
 for s in [-1,1]:
  loc=(x,s*.21,.34)
  # torus normally Y-axis; rotate to horizontal for ducted vertical lift fans
  for r,t,z,m in [(.115,.024,.34,black),(.115,.006,.365,gold),(.079,.009,.295,cyan)]:
   o=torus('Lift duct',(x,s*.21,z),r,t,m);o.rotation_euler=(0,0,0)
  pipe('Fan axle',(x,s*.21,.30),(x,s*.21,.37),.025,steel)
  for k in range(9):
   a=k*math.pi*2/9;pipe('Turbine blade',(x+math.cos(a)*.028,s*.21+math.sin(a)*.028,.335),(x+math.cos(a+.3)*.09,s*.21+math.sin(a+.3)*.09,.34),.009,black,8)
  pipe('Ion exhaust',(x,s*.21,.24),(x,s*.21,.29),.053,cyan,32)
box('Gold control spine',(0,0,.47),(.20,.045,.014),gold,.01)
box('Power status',(0,0,.48),(.09,.023,.005),cyan,.005)
for x in [-.60,.60]:box('Navigation light',(x,0,.45),(.016,.12,.015),white if x>0 else red,.005)
export_model(collection,variants,'skyboard-v1.glb');sky_collection=collection
bpy.ops.wm.save_as_mainfile(filepath=OUT+'/02-all-models.blend')
scene=bpy.context.scene;scene.render.engine='CYCLES';scene.cycles.samples=20;scene.cycles.use_denoising=True;scene.render.resolution_x=1000;scene.render.resolution_y=800;scene.render.resolution_percentage=100
scene.world.use_nodes=True;scene.world.node_tree.nodes['Background'].inputs['Color'].default_value=(.15,.18,.22,1);scene.world.node_tree.nodes['Background'].inputs['Strength'].default_value=.45
bpy.ops.mesh.primitive_plane_add(size=200);bpy.context.object.data.materials.append(mat('Studio',(.025,.035,.05),0,.7))
def aim(o,target):o.rotation_euler=(Vector(target)-o.location).to_track_quat('-Z','Y').to_euler()
for name,loc,energy,size in [('Key',(1,-3,4),700,4),('Rim',(-2,2,3),1100,3)]:
 l=bpy.data.lights.new(name,'AREA');l.energy=energy;l.shape='DISK';l.size=size;o=bpy.data.objects.new(name,l);scene.collection.objects.link(o);o.location=loc;aim(o,(0,0,.5))
bpy.ops.object.camera_add();cam=bpy.context.object;cam.data.lens=60;scene.camera=cam
base={'deck':'stock','wheels':'city','brakes':'foot','suspension':'rigid','motor':'none','cockpit':'plain','lights':'none','body':'classic'}
up={'deck':'armored','wheels':'terrain','brakes':'disc','suspension':'dual','motor':'twin','cockpit':'smart','lights':'neon','body':'hyper'}
for variant,look in [('base',base),('hyper',up),('skyboard',{})]:
 scooter_collection.hide_render=variant=='skyboard';sky_collection.hide_render=variant!='skyboard'
 for (kind,id),g in scooter_variants.items():
  for o in g.children:o.hide_render=id!='always' and look.get(kind)!=id
 paint.node_tree.nodes['Principled BSDF'].inputs['Base Color'].default_value=(*((.065,.085,.1) if variant=='base' else (.8,.43,.08)),1)
 for name,loc in [('front',(2.4,-3.3,1.8)),('side',(0,-3.9,1.35)),('rear',(-2.4,3.3,1.8)),('top',(.01,0,4.7))]:
  target=(0,0,.55 if variant!='skyboard' else .38);cam.location=loc;aim(cam,target);scene.render.filepath=OUT+'/'+variant+'-'+name+'.png';bpy.ops.render.render(write_still=True)

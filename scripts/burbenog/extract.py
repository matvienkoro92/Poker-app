"""Compile original map unit, ability and wave data for the browser port.
Inputs: the downloaded map's extracted files and w3x2lni enUS-1.27.1 defaults.
No map code is executed. Standard defaults are a documented version difference.
"""
import struct,json,re,pathlib
root=pathlib.Path(__file__).resolve().parents[2];src=root/'output/burbenog-reference/extracted';base=root/'output/burbenog-reference/base'
wts={int(k):v.strip() for k,v in re.findall(r'STRING (\d+)\s*\{\s*([\s\S]*?)\n\}',(src/'war3map.wts').read_text())}
def resolve(v):
 if isinstance(v,str) and v.startswith('TRIGSTR_'):return wts.get(int(v[8:]),v)
 return v
def value(v):
 v=v.strip()
 if v.startswith('"'):return json.loads(v)
 if v.startswith('{'):return [value(x)for x in re.findall(r'"(?:[^"\\]|\\.)*"|[^,{}]+',v)]
 try:return float(v)if '.' in v else int(v)
 except ValueError:return v
def ini(path):
 result={};current=None
 for line in path.read_text().splitlines():
  if line.startswith('['):current=line[1:-1];result[current]={}
  elif '='in line and current:
   k,v=line.split('=',1);result[current][k.lower()]=value(v)
 return result
def slk(path):
 rows={};x=y=0
 for line in path.read_text().splitlines():
  if not line.startswith('C;'):continue
  fields=re.findall(r'(?:[^;"\n]|"[^"]*")+',line)
  for f in fields[1:]:
   if f.startswith('X'):x=int(f[1:])
   elif f.startswith('Y'):y=int(f[1:])
   elif f.startswith('K'):rows.setdefault(y,{})[x]=value(f[1:])
 head=rows[1];return [{head[k]:v for k,v in r.items()if k in head}for n,r in rows.items()if n!=1]
def objects(path,extended=False):
 b=path.read_bytes();offset=0
 def read(fmt):
  nonlocal offset
  size=struct.calcsize(fmt);v=struct.unpack_from(fmt,b,offset);offset+=size;return v[0] if len(v)==1 else v
 def string():
  nonlocal offset
  end=b.index(0,offset);v=b[offset:end].decode('utf-8',errors='replace');offset=end+1;return v
 def ident():return read('<4s').decode('latin1')
 read('<i');out={}
 for table in range(2):
  for _ in range(read('<i')):
   old,new=ident(),ident();fields={}
   for _ in range(read('<i')):
    key,kind=ident(),read('<i');level,column=(read('<i'),read('<i'))if extended else (0,0)
    v=read('<i') if kind==0 else read('<f') if kind in [1,2] else string();ident();fields[key+(':'+str(level)if extended else '')]=resolve(v)
   out[new if new!='\0'*4 else old]={'base':old,**fields}
 assert offset==len(b),(offset,len(b));return out
units=objects(src/'war3map.w3u');abilities=objects(src/'war3map.w3a',True);upgrades=objects(src/'war3map.w3q',True)
unit_meta={r['ID']:r for r in slk(base/'UnitMetaData.slk')};ability_meta={r['ID']:r for r in slk(base/'AbilityMetaData.slk')}
def merge(defaults,overrides,meta):
 out={**defaults}
 for uid,u in overrides.items():
  merged=dict(defaults.get(u['base'],{}));merged['id']=uid;merged['base']=u['base']
  for raw,v in u.items():
   if raw=='base':continue
   k,_,level=raw.partition(':');m=meta.get(k);field=m.get('field','').lower()if m else k
   if m and m.get('data',0)>0:field+=chr(96+int(m['data']))
   if m and m.get('index',-1)>=0 and (m.get('index',0)>0 or field=='buttonpos'):field+='_'+str(int(m['index'])+1)
   if level and int(level)>0:
    old=merged.get(field,[]);old=list(old)if isinstance(old,list)else [old];old.extend([0]*max(0,int(level)-len(old)));old[int(level)-1]=v;merged[field]=old
   else:merged[field]=v
  out[uid]=merged
 return out
unit_data=merge(ini(base/'unit.ini'),units,unit_meta);ability_data=merge(ini(base/'ability.ini'),abilities,ability_meta)
upgrade_data=merge(ini(base/'upgrade.ini'),upgrades,{r['ID']:r for r in slk(base/'UpgradeMetaData.slk')})
j=(src/'Scripts_war3map.j').read_text();num=lambda x:int(x[1:],16)if x.startswith('$')else int(x);arrays={}
for name,idx,v in re.findall(r"set (J|K|M|K4)\[([\d$A-F]+)\]=([^\n]+)",j):arrays.setdefault(name,{})[num(idx)]=v.strip()
waves=[]
for i in range(1,43):
 uid=arrays['J'][i].strip("'");waves.append({'number':i,'unit':uid,'countPerLane':num(arrays['K'][i]),'name':arrays['M'][i].strip('"')})
gov_ids=[v.strip("'")for k,v in sorted(arrays['K4'].items())]
unit_keys='id base name hp regenhp def deftype spd movetp goldcost lumbercost bountyplus bountydice bountysides buildtime bldtm require requires requiresamount abillist buildstrains builds trains researches upgrade upgrades abilskin heroabillist propernames primary str agi int strplus agiplus intplus regenmana mana manan manav maxmana fmade'.split()
unit_keys+=['dmgplus'+str(i)for i in [1,2]]+['dice'+str(i)for i in [1,2]]+['sides'+str(i)for i in [1,2]]
for f in ['atk','range','cool','targs','splash','splashrad','splashmedium','splashsmall','full','half','quar','weaptp','atktype','spilldist','spillradius']:unit_keys.extend(f+str(i)for i in [1,2])
# Keep all combat/build fields including inherited defaults for auditability.
used=set(units)
for g in gov_ids:used.add(g)
for uid,u in list(unit_data.items()):
 if uid in used:
  for field in ['builds','trains','upgrade','upgrades']:
   if isinstance(u.get(field),str):used.update(u[field].split(','))
compiled_units={uid:{k:v for k,v in u.items()if k in unit_keys or k.startswith(('dmg','dice','sides','range','cool','targ','splash','full','half','quar','weap','atk','farea','harea','qarea','require'))}for uid,u in unit_data.items()if uid in used}
ability_ids=set()
for u in compiled_units.values():
 for key in ['abillist','heroabillist']:
  ability_ids.update(str(u.get(key,'')).split(','))
ability_keys={'id','base','_code','name','levels','levelskip','reqlevel','cost','cool','dur','herodur','area','rng','unitid','dataa','datab','datac','datad','datae','dataf','datag','datah','datai','targs','buffid'}
compiled_abilities={uid:{**{k:v for k,v in u.items()if k in ability_keys},'base':u.get('base',uid)} for uid,u in ability_data.items()if uid in ability_ids}
research_ids={k for u in compiled_units.values()for k in str(u.get('researches','')).split(',')if k}
compiled_upgrades={uid:{**{k:v for k,v in u.items()if k in {'id','name','maxlevel','goldbase','goldmod','lumberbase','lumbermod','timebase','timemod','effect1','effect2','base1','base2','mod1','mod2'}},'base':u.get('base',uid)}for uid,u in upgrade_data.items()if uid in research_ids}
rects={}
for key,coords in re.findall(r'set (\w+)=Rect\(([^)]+)\)',j):
 try:rects[key]=[float(v)for v in coords.split(',')]
 except ValueError:pass
waypoints={num(k):v for k,v in re.findall(r'set M4\[([\d$A-F]+)\]=(\w+)',j)}
air_waypoints={num(k):v for k,v in re.findall(r'set S4\[([\d$A-F]+)\]=(\w+)',j)}
def point(key):
 x1,y1,x2,y2=rects[key];return [((x1+x2)/2+5376)/10752*500,(5120-(y1+y2)/2)/10752*500]
routes=[[point(spawn)]+[point(waypoints[start+k])for k in range(12)]for spawn,start in [('UD',1),('XE',13),('OD',37),('GD',25)]]
air_routes=[[point(spawn)]+[point(air_waypoints[start+k])for k in range(12)]for spawn,start in [('UD',1),('XE',13),('OD',37),('GD',25)]]
pathing=(src/'war3map.wpm').read_bytes();pw,ph=struct.unpack_from('<II',pathing,8);grid=pathing[16:]
positions=[]
for wy in range(-5248,5120,384):
 for wx in range(-4992,5376,384):
  cx=int((wx+6144)/32);cy=int((wy+6144)/32)
  if all(0<=cx+dx<pw and 0<=cy+dy<ph and not(grid[(cy+dy)*pw+cx+dx]&8)for dx in range(-2,3)for dy in range(-2,3)):
   positions.append([(wx+5376)/10752*500,(5120-wy)/10752*500])
out={'source':'Burbenog TD v2.43 Legends','baseVersion':'Warcraft III 1.27.1 Custom (w3x2lni)','governors':gov_ids,'units':compiled_units,'abilities':compiled_abilities,'upgrades':compiled_upgrades,'waves':waves,'routes':routes,'airRoutes':air_routes,'positions':positions}
(root/'app-last-buy-in-td-data.js').write_text('/* Generated by scripts/burbenog/extract.py from Burbenog TD 2.43 Legends. */\n(function(r,d){if(typeof module===\'object\'&&module.exports)module.exports=d;else r.BurbenogData=d;})(globalThis,'+json.dumps(out,ensure_ascii=False,separators=(',',':'))+');\n')
print('Compiled',len(compiled_units),'units,',len(compiled_abilities),'abilities,',len(waves),'waves,',len(gov_ids),'governors')

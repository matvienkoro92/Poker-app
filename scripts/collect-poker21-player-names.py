import zipfile,xml.etree.ElementTree as E,pathlib,json,sqlite3
ns={'m':'http://schemas.openxmlformats.org/spreadsheetml/2006/main'};names={}; sources={}
for p in sorted(pathlib.Path.home().joinpath('Downloads').glob('Poker21Plus*.xlsx'),key=lambda p:p.name):
 try:
  z=zipfile.ZipFile(p);ss=[''.join(x.itertext()) for x in E.fromstring(z.read('xl/sharedStrings.xml'))] if 'xl/sharedStrings.xml' in z.namelist() else []
  for n in z.namelist():
   if not(n.startswith('xl/worksheets/sheet') and n.endswith('.xml')):continue
   rows=E.fromstring(z.read(n)).findall('m:sheetData/m:row',ns);cols=None
   for r in rows:
    vals={''.join(a for a in c.attrib['r'] if a.isalpha()):(ss[int(c.find('m:v',ns).text)] if c.attrib.get('t')=='s' else ''.join(c.itertext())) for c in r}
    if cols is None:
     norm={v.strip().lower():k for k,v in vals.items()}
     if 'player id' in norm and 'nickname' in norm:cols=(norm['player id'],norm['nickname'])
    else:
     pid=vals.get(cols[0],'').strip();nick=vals.get(cols[1],'').strip()
     if pid.isdigit() and nick:names[pid]=nick;sources[pid]=p.name
 except Exception as e:print('error',p.name,str(e))
base=json.loads(pathlib.Path('rating-player-id-map.json').read_text());names.update(base)
c=sqlite3.connect('output/poker21-import/week-2026-09-07/raw-history.sqlite');needed=set()
for p, in c.execute('select payload from raw_hands'):
 r=json.loads(p);ids={str(r.get('UserId'+str(i),'0')) for i in range(1,11)}
 if '208238' in ids:needed|=ids-{'0'}
pathlib.Path('output/poker21-import/player-names.json').write_text(json.dumps({k:v for k,v in names.items() if k in needed},ensure_ascii=False,indent=2))
print('players',len(needed),'matched',len(needed&names.keys()),'missing',sorted(needed-names.keys()))

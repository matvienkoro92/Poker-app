#!/usr/bin/env python3
"""Enrich a staged personal projection from local raw history; no upload."""
import argparse,importlib.util,json,pathlib,sqlite3,glob
root=pathlib.Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('importer',root/'scripts/import-poker21-json.py');imp=importlib.util.module_from_spec(spec);spec.loader.exec_module(imp)
def run(dbpath,projection,sources=None):
 p=pathlib.Path(projection);prefix='window.Poker21BulkSample = ';data=json.loads(p.read_text().removeprefix(prefix).rstrip(';\n'));byid={r['handId']:r for r in data['rows']}
 db=sqlite3.connect('file:'+str(pathlib.Path(dbpath).resolve())+'?mode=ro',uri=True);matched=0
 for hid,payload in db.execute('SELECT hand,payload FROM raw_hands WHERE conflict=0'):
  if hid not in byid:continue
  raw=json.loads(payload);r=byid[hid]
  if r['sessionId'] not in (str(raw['RecordId']),str(raw['DeskId']),str(raw.get('CompetitionId',''))):continue
  r['position']=imp.positions(raw).get(r['playerId'],'UNKNOWN');matched+=1
 db.close()
 for file in glob.glob(sources or ''):
  for raw in json.loads(pathlib.Path(file).read_text()):
   r=byid.get(str(raw.get('Id')))
   if r and r['sessionId'] in (str(raw.get('RecordId')),str(raw.get('DeskId')),str(raw.get('CompetitionId',''))):
    r['position']=imp.positions(raw).get(r['playerId'],'UNKNOWN')
 p.write_text(prefix+json.dumps(data,ensure_ascii=False)+';\n');print('Matched',matched,'of',len(byid),'known',sum(r.get('position','UNKNOWN')!='UNKNOWN' for r in data['rows']))
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--db',required=True);p.add_argument('--projection',required=True);p.add_argument('--sources');a=p.parse_args();run(a.db,a.projection,a.sources)

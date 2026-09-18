#!/usr/bin/env python3
"""Build private weekly staging and player projection from explicit session manifest."""
import pathlib,json,csv,sqlite3,hashlib,collections,importlib.util,datetime
ROOT=pathlib.Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('importer',ROOT/'scripts/import-poker21-json.py');mod=importlib.util.module_from_spec(spec);spec.loader.exec_module(mod)
def main():
 folder=ROOT/'output/poker21-import/week-2026-09-07'; manifest={s['log_id']:s for s in csv.DictReader((folder/'sessions.tsv').open(),delimiter='\t')}
 start=1788728400 # 2026-09-07 00:00 Moscow
 start=int(datetime.datetime.fromisoformat('2026-09-06T21:00:00+00:00').timestamp())
 end=int(datetime.datetime.fromisoformat('2026-09-13T21:00:00+00:00').timestamp())
 db=sqlite3.connect(folder/'raw-history.sqlite');db.execute('CREATE TABLE IF NOT EXISTS raw_hands (session TEXT, hand TEXT, payload TEXT, conflict INTEGER DEFAULT 0, PRIMARY KEY(session,hand))')
 outside=0
 with db:
  for p in sorted(pathlib.Path.home().joinpath('Downloads').glob('Poker21Plus*.json')):
   for r in json.loads(p.read_text()):
    comp=str(r.get('CompetitionId','0')); session=comp if comp not in ('0','') else str(r['DeskId']);s=manifest.get(session)
    if not s or (comp in ('0','') and str(r['RecordId'])!=s['record_id']):outside+=1;continue
    payload=json.dumps(r,sort_keys=True,ensure_ascii=False);key=(session,str(r['Id']));old=db.execute('SELECT payload FROM raw_hands WHERE session=? AND hand=?',key).fetchone()
    if old and old[0]!=payload:db.execute('UPDATE raw_hands SET conflict=1 WHERE session=? AND hand=?',key)
    elif not old:db.execute('INSERT INTO raw_hands(session,hand,payload) VALUES(?,?,?)',(*key,payload))
 rows=[];rejected=[];stats={k:collections.Counter() for k in manifest};seen=set()
 for session,hid,payload,conflict in db.execute('SELECT * FROM raw_hands ORDER BY session,hand'):
  r=json.loads(payload);st=stats[session];st['sourceHands']+=1
  if not start<=int(r['StartTime'])<end:st['outsideWeek']+=1;continue
  personal=any(str(r.get('UserId'+str(i)))=='208238' for i in range(1,11))
  if personal:st['playerSourceHands']+=1
  try:
   if conflict:raise ValueError('conflicting source versions')
   mode='mtt' if str(r.get('CompetitionId','0')) not in ('0','') else 'cash'
   projected=mod.project(r,mode)
   for x in projected:
    if x['playerId']!='208238':continue
    if x['handId'] in seen:raise ValueError('hand repeated across sessions')
    seen.add(x['handId']);x['sessionId']=session;rows.append(x);st['playerImportedHands']+=1
  except (ValueError,KeyError,TypeError) as e:
   st['excludedHands']+=1
   if personal:st['playerExcludedHands']+=1
   rejected.append({'session':session,'hand':hid,'playerAffected':personal,'reason':str(e)})
 summary={'periodFrom':'2026-09-06T21:00:00Z','periodTo':'2026-09-13T21:00:00Z','sessions':stats,'outsideScopeRows':outside,'rejections':rejected,'modes':{m:{'hands':sum(x['mode']==m for x in rows),'resultMinor':sum(x['resultMinor'] for x in rows if x['mode']==m)} for m in ['cash','mtt','sng']},'coverage':'downloaded exports; catalog counts differ; not independently proven complete'}
 (folder/'import-report.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2))
 (ROOT/'output/hand-statistics-preview/bulk-sample.js').write_text('window.Poker21BulkSample = '+json.dumps({'playerId':'208238','summary':summary,'rows':rows},ensure_ascii=False)+';\n')
 db.close();print(json.dumps({'modes':summary['modes'],'sessions':stats,'rejectionReasons':collections.Counter(x['reason'] for x in rejected)},ensure_ascii=False,indent=2))
if __name__=='__main__':main()

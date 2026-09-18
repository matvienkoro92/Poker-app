#!/usr/bin/env python3
"""Calculate exact private EV for current club projections, with resumable hand checkpoints."""
import collections,concurrent.futures,functools,hashlib,importlib.util,json,pathlib,time,datetime,subprocess,os
ROOT=pathlib.Path(__file__).resolve().parents[1]
OUT=pathlib.Path(os.environ.get('CLUB_HAND_EV_ROOT',ROOT/'output/club-hand-ev'))
def load_calculator():
 spec=importlib.util.spec_from_file_location('ev',ROOT/'scripts/calculate-allin-ev.py');ev=importlib.util.module_from_spec(spec);spec.loader.exec_module(ev)
 original=ev.equity
 @functools.lru_cache(maxsize=128)
 def cached(binary,holes,board,masks):
  result=original(binary,[list(h) for h in holes],list(board),list(masks))
  return result,original.last_method
 def cached_equity(binary,holes,board,masks):
  result,method=cached(str(binary),tuple(tuple(h) for h in holes),tuple(board),tuple(masks));cached_equity.last_method=method;return result
 cached_equity.last_method=ev.METHOD;ev.equity=cached_equity
 return ev
EV=None
def init_worker():
 global EV
 EV=load_calculator()
def build_binary(source,target):
 if target.exists() and target.stat().st_mtime>=source.stat().st_mtime:return
 subprocess.run(['clang++','-O3','-std=c++17',str(source),'-o',str(target)],check=True)
def calculate(job):
 raw,owners=job;result={}
 for pid in owners:
  try:result[pid]=EV.inspect(raw,pid,str(OUT/'equity'))
  except (ValueError,KeyError,TypeError,IndexError,ZeroDivisionError) as e:result[pid]={'status':'unresolved','reason':'invalid_export'}
 return {'handId':str(raw['Id']),'owners':result}
def main():
 started=time.monotonic();snapshot=json.loads((OUT/'snapshot.json').read_text());data={p['playerId']:json.loads((OUT/'input'/f"{p['playerId']}.json").read_text()) for p in snapshot}
 build_binary(ROOT/'scripts/holdem-equity.cpp',OUT/'equity');build_binary(ROOT/'scripts/omaha-equity.cpp',OUT/'omaha-equity')
 rows={pid:{r['handId']:r for r in d['rows']} for pid,d in data.items()};owners=collections.defaultdict(list)
 for pid,rs in rows.items():
  for hid in rs:owners[hid].append(pid)
 sources=[pathlib.Path(p) for p in os.environ.get('CLUB_HAND_EV_SOURCES',str(ROOT/'output/poker21-export-2026-09-07_13/hands-2026-09-07_13-MSK.jsonl')).split(os.pathsep)]
 signature=hashlib.sha256((OUT/'snapshot.json').read_bytes()+(ROOT/'scripts/calculate-allin-ev.py').read_bytes()+(ROOT/'scripts/holdem-equity.cpp').read_bytes()+(ROOT/'scripts/omaha-equity.cpp').read_bytes()+pathlib.Path(__file__).read_bytes()).hexdigest()
 marker=OUT/'calculation-source.json'
 if marker.exists():assert json.loads(marker.read_text())['signature']==signature,'Checkpoint source changed'
 else:marker.write_text(json.dumps({'signature':signature,'sources':[{'path':str(source),'size':source.stat().st_size} for source in sources]}))
 results={pid:{} for pid in rows};done=set();checkpoint=OUT/'checkpoint.jsonl';counts=collections.Counter();checked=set();jobs=[]
 if checkpoint.exists():
  for line in checkpoint.open():
   entry=json.loads(line);done.add(entry['handId'])
   for pid,ev in entry['owners'].items():results[pid][entry['handId']]=ev;counts[ev.get('reason',ev['status'])]+=1
 # Only all-ins of remaining contenders require expensive equity enumeration.
 for source in sources:
  for line in source.open():
   raw=json.loads(line);hid=str(raw['Id'])
   if hid not in owners:continue
   if hid in checked:raise ValueError('Duplicate hand source')
   checked.add(hid);base=raw['base_data'];seats={str(raw.get('UserId'+str(i),'0')):i for i in range(1,11)}
   for pid in owners[hid]:
    r=rows[pid][hid]
    if pid not in seats or int(raw['Score'+str(seats[pid])])!=r['resultMinor']:raise ValueError('Owner or result mismatch')
    if r['sessionId'] not in [str(raw[k]) for k in ('RecordId','DeskId','CompetitionId')]:raise ValueError('Session mismatch')
    if int(datetime.datetime.fromisoformat(r['playedAt'].replace('Z','+00:00')).timestamp())!=int(raw['StartTime']):raise ValueError('Time mismatch')
    if r['mode']!={'2':'cash','3':'sng','4':'mtt'}[str(raw['DeskType'])]:raise ValueError('Mode mismatch')
    cards=next(e[2:] for e in base['card'] if str(e[0])==pid)
    def decode(c):
     n=int(c);return {1:'A',10:'T',11:'J',12:'Q',13:'K'}.get(n%100,str(n%100))+{1:'d',2:'c',3:'h',4:'s'}[n//100]
    if [decode(c) for c in cards]!=r['cards']:raise ValueError('Own cards mismatch')
   if hid in done:continue
   events=base['opt'].values();folded={str(e.get('userId')) for e in events if str(e['type'])=='10'};active={str(e[0]) for e in base['card']}-folded
   allins={str(e.get('userId')) for e in events if str(e['type'])=='5'}
   candidates=[pid for pid in owners[hid] if pid in active and len(active)>1 and active&allins]
   for pid in owners[hid]:
    if pid not in candidates:results[pid][hid]={'status':'not_applicable'};counts['not_applicable']+=1
   if candidates:jobs.append((raw,candidates))
 missing=set(owners)-checked
 if missing:raise ValueError('Missing original hands: '+str(len(missing)))
 print(json.dumps({'phase':'prepared','players':len(rows),'participations':sum(len(r) for r in rows.values()),'hands':len(checked),'allinHandsToCalculate':len(jobs),'resumedHands':len(done),'preparationSeconds':round(time.monotonic()-started,1)}),flush=True)
 # Checkpoint includes every owner of processed all-in hands so resuming preserves folded owners too.
 completed=0;last=time.monotonic()
 with checkpoint.open('a') as log,concurrent.futures.ProcessPoolExecutor(max_workers=4,initializer=init_worker) as pool:
  pending=set();it=iter(jobs)
  def fill():
   while len(pending)<8:
    try:job=next(it)
    except StopIteration:return
    pending.add(pool.submit(calculate,job))
  fill()
  while pending:
   ready,_=concurrent.futures.wait(pending,timeout=15,return_when=concurrent.futures.FIRST_COMPLETED)
   for future in ready:
    pending.remove(future);entry=future.result();hid=entry['handId']
    for pid,ev in entry['owners'].items():results[pid][hid]=ev;counts[ev.get('reason',ev['status'])]+=1
    entry['owners']={pid:results[pid][hid] for pid in owners[hid]};log.write(json.dumps(entry,separators=(',',':'))+'\n');log.flush();completed+=1
   fill()
   if time.monotonic()-last>=20 or not pending:
    progress={'completed':completed,'allinHands':len(jobs),'elapsedSeconds':round(time.monotonic()-started,1),'statuses':dict(counts)};(OUT/'progress.json').write_text(json.dumps(progress));print(json.dumps(progress),flush=True);last=time.monotonic()
 target=OUT/'calculated';target.mkdir(exist_ok=True);summary={'players':len(rows),'rows':0,'statuses':collections.Counter(),'reasons':collections.Counter(),'modes':{},'playersWithEv':0,'seconds':round(time.monotonic()-started,1)}
 for pid,rs in rows.items():
  assert set(results[pid])==set(rs),'Incomplete owner projection'
  projected=[];pc=collections.Counter()
  for hid,row in rs.items():
   ev=results[pid][hid];pc[ev['status']]+=1;summary['statuses'][ev['status']]+=1;summary['rows']+=1
   if ev.get('reason'):summary['reasons'][ev['reason']]+=1
   summary['modes'].setdefault(row['mode'],collections.Counter())[ev['status']]+=1
   projected.append({k:row[k] for k in ('handId','sessionId','mode','playedAt','resultMinor','bigBlindMinor','cards')}|{'ev':ev})
  if pc['calculated']:summary['playersWithEv']+=1
  (target/(pid+'.json')).write_text(json.dumps({'playerId':pid,'method':'exact-runouts-fixed-deduction-v1','rows':projected,'counts':pc},separators=(',',':')))
 (OUT/'calculation-report.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2));print(json.dumps(summary),flush=True)
if __name__=='__main__':main()

#!/usr/bin/env python3
"""Local personal hand timelines; amounts are source contributions, not raise-to."""
import pathlib,json,sqlite3,importlib.util
ROOT=pathlib.Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('imp',ROOT/'scripts/import-poker21-json.py');imp=importlib.util.module_from_spec(spec);spec.loader.exec_module(imp)
def build():
 names=json.loads((ROOT/'rating-player-id-map.json').read_text())
 extra=ROOT/'output/poker21-import/player-names.json'
 if extra.exists():names.update(json.loads(extra.read_text()))
 p=ROOT/'output/hand-statistics-preview'; bulk=json.loads((p/'bulk-sample.js').read_text().removeprefix('window.Poker21BulkSample = ').rstrip(';\n')); allowed={r['handId']:r for r in bulk['rows']};result={}
 db=sqlite3.connect(ROOT/'output/poker21-import/week-2026-09-07/raw-history.sqlite')
 for hid,payload in db.execute('SELECT hand,payload FROM raw_hands WHERE conflict=0'):
  if hid not in allowed:continue
  raw=json.loads(payload);base=raw['base_data'];players={str(raw.get('UserId'+str(i))):names.get(str(raw.get('UserId'+str(i))), 'Игрок '+str(raw.get('UserId'+str(i)))) for i in range(1,11) if str(raw.get('UserId'+str(i),'0'))!='0'};players['208238']='Вы'; events=[]
  allowed[hid]['showdown']=imp.showdown_status(raw,allowed[hid]['playerId'])
  allowed[hid]['opponents']=[{'playerId':pid,'name':name} for pid,name in players.items() if pid not in ('0',allowed[hid]['playerId'])]
  for seq,a in sorted(base['opt'].items(),key=lambda pair:int(pair[0])):
   kind=str(a['type']);pid=str(a.get('userId'));cards=a.get('card');board=[imp.card(c) for c in cards] if kind=='94' and isinstance(cards,list) else []
   if kind in ('97','96'):continue # service state updates, not player decisions
   events.append({'sequence':int(seq),'code':kind,'actor':players.get(pid,'Стол'),'actorId':pid,'amount':a.get('bet',0),'board':board})
  shown=[dict(item,actor=players.get(item['playerId'],'Игрок '+item['playerId'])) for item in imp.visible_opponent_cards(raw,allowed[hid]['playerId'])]
  result[hid]={'shownOpponents':shown,'events':events,'stacks':[{'actor':name,'amount':int(base.get('userCoin',{}).get(pid,0))/100} for pid,name in players.items() if pid!='0'],'cards':allowed[hid]['cards']}
 (p/'bulk-sample.js').write_text('window.Poker21BulkSample = '+json.dumps(bulk,ensure_ascii=False)+';\n')
 db.close();assert len(result)==len(allowed)
 (p/'replays.js').write_text('window.Poker21Replays = '+json.dumps(result,ensure_ascii=False,separators=(',',':'))+';\n');print('Timelines:',len(result))
if __name__=='__main__':build()

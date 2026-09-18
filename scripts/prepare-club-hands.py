#!/usr/bin/env python3
"""Prepare private per-player NLH/PLO imports from the verified weekly JSONL export."""
import argparse, collections, importlib.util, json, pathlib, time
ROOT = pathlib.Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('importer', ROOT/'scripts/import-poker21-json.py')
imp = importlib.util.module_from_spec(spec)
spec.loader.exec_module(imp)

def replay(raw, row, names):
    owner = row['playerId']
    players = {str(raw.get('UserId'+str(i))): names.get(str(raw.get('UserId'+str(i))), 'Игрок '+str(raw.get('UserId'+str(i)))) for i in range(1,11) if str(raw.get('UserId'+str(i),'0')) != '0'}
    row['opponents'] = [{'playerId':p,'name':n} for p,n in players.items() if p != owner]
    players[owner] = 'Вы'
    base = raw['base_data']; events = []
    for seq,a in sorted(base['opt'].items(),key=lambda pair:int(pair[0])):
        kind = str(a['type']); pid = str(a.get('userId'))
        if kind in ('97','96'): continue
        board = [imp.card(c) for c in a['card']] if kind == '94' and isinstance(a.get('card'),list) else []
        events.append(dict(sequence=int(seq),code=kind,actor=players.get(pid,'Стол'),actorId=pid,amount=a.get('bet',0),board=board))
    shown = [dict(item,actor=players.get(item['playerId'],'Игрок '+item['playerId'])) for item in imp.visible_opponent_cards(raw,owner)]
    seat_positions=imp.positions(raw)
    seats=[dict(actorId=pid,actor=players[pid],position=seat_positions.get(pid,'UNKNOWN')) for pid in map(str,base.get('UserIds',[])) if pid in players]
    return dict(seats=seats,shownOpponents=shown,events=events,stacks=[dict(actor=name,amount=int(base.get('userCoin',{}).get(pid,0))/100) for pid,name in players.items()],cards=row['cards'])

def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--source',default=str(ROOT/'output/poker21-export-2026-09-07_13/hands-2026-09-07_13-MSK.jsonl'))
    parser.add_argument('--out',default=str(ROOT/'output/club-hand-import'))
    parser.add_argument('--from-ts',type=int,default=1788728400)
    parser.add_argument('--to-ts',type=int,default=1789333200)
    parser.add_argument('--period-from',default='2026-09-06T21:00:00Z')
    parser.add_argument('--period-to',default='2026-09-13T21:00:00Z')
    parser.add_argument('--exclude-player',action='append',default=[],help='Player ID to omit from personal projections (repeatable)')
    args=parser.parse_args()
    started=time.monotonic(); out=pathlib.Path(args.out); roster=json.loads((out/'members.json').read_text())
    assert roster['groupId']=='758417'
    names=json.loads((ROOT/'rating-player-id-map.json').read_text())
    names.update({p['playerId']:p['nickname'] for p in roster['members']})
    excluded={str(pid) for pid in args.exclude_player}
    allowed={p['playerId'] for p in roster['members']} - excluded; files={}; counts=collections.Counter(); rejected=collections.Counter(); modes=collections.Counter(); seen=set(); unique=0
    folder=out/'players';folder.mkdir(exist_ok=True)
    try:
        for line in pathlib.Path(args.source).open():
            raw=json.loads(line)
            targets={str(raw.get('UserId'+str(i),'0')) for i in range(1,11)} & allowed
            if not targets: continue
            assert args.from_ts <= int(raw['StartTime']) < args.to_ts
            hid=str(raw['Id']); assert hid not in seen, 'Duplicate hand ID';seen.add(hid)
            mode={'2':'cash','3':'sng','4':'mtt'}.get(str(raw.get('DeskType')))
            if mode is None:
                rejected['unknown desk type']+=1;continue
            try: rows=imp.project(raw,mode)
            except (ValueError,KeyError,TypeError) as e:
                rejected[str(e)]+=1;continue
            unique+=1
            for row in rows:
                pid=row['playerId']
                if pid not in targets:continue
                row['sessionId']=str(raw['CompetitionId']) if mode in ('mtt','sng') else str(raw['DeskId'])
                row['sourceDeskType']=str(raw['DeskType'])
                personal=replay(raw,row,names)
                assert personal['cards']==row['cards'] and all(p['playerId']!=pid for p in row['opponents'])
                if pid not in files:files[pid]=(folder/(pid+'.jsonl')).open('w')
                files[pid].write(json.dumps(dict(row=row,replay=personal),ensure_ascii=False,separators=(',',':'))+'\n')
                counts[pid]+=1;modes[mode]+=1
    finally:
        for f in files.values():f.close()
    report=dict(groupId=roster['groupId'],periodFrom=args.period_from,periodTo=args.period_to,members=len(allowed),excludedPlayers=sorted(excluded),players=len(counts),uniqueHands=unique,participations=sum(counts.values()),modes=modes,rejectedHands=rejected,counts=counts,seconds=round(time.monotonic()-started,2))
    (out/'prepare-report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
    print(json.dumps({k:v for k,v in report.items() if k!='counts'},ensure_ascii=False))
if __name__=='__main__':main()

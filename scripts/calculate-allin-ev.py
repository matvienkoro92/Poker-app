#!/usr/bin/env python3
"""Conservative exact runout EV. Local raw cards never enter the output projection.
Net pots retain the hand's observed total deduction; multi-pot deductions are not guessed.
"""
import argparse,collections,decimal,itertools,json,pathlib,sqlite3,subprocess
D=decimal.Decimal
METHOD='exact-runouts-fixed-deduction-v1'
def mapping(s):return {p.split(':')[0]:int(p.split(':')[1]) for p in str(s).split(',') if ':' in p}
def amount(e):
 n=D(str(e.get('bet',0)))*100
 if n!=int(n) or n<0:raise ValueError('invalid_amount')
 return int(n)
def card(c):
 c=str(c);s=int(c)//100;r=int(c)%100
 if s not in range(1,5) or r not in range(1,14):raise ValueError('invalid_cards')
 return (s-1)*13+(12 if r==1 else r-2)
def equity(binary,holes,board,masks):
 values=[len(holes),len(board),len(masks)]+[c for h in holes for c in h]+board+masks
 result=subprocess.run([binary],input=' '.join(map(str,values)),text=True,capture_output=True,check=True).stdout.splitlines()
 return int(result[0]),[list(map(float,r.split())) for r in result[1:]]
def hero_showdown_equity(raw,hero,binary):
 """Retrospective equity vs final contenders at hero's explicit all-in.
 This is not a pot-weighted EV and does not model later opponents' decisions.
 """
 base=raw['base_data'];board=[];at_allin=None;active={str(c[0]) for c in base['card']}
 for _,e in sorted(base['opt'].items(),key=lambda p:int(p[0])):
  if str(e['type'])=='94' and isinstance(e.get('card'),list):board=list(e['card'])
  if str(e['type'])=='5' and str(e.get('userId'))==hero and at_allin is None:at_allin=list(board)
  if str(e['type'])=='10':active.discard(str(e.get('userId')))
 if at_allin is None:return {'status':'no_hero_allin'}
 if hero not in active or len(active)<2:return {'status':'no_contested_showdown'}
 players=sorted(active);holes=[[card(c) for c in row[2:]] for p in players for row in base['card'] if str(row[0])==p]
 if len(holes)!=len(players) or any(len(h)!=2 for h in holes):return {'status':'missing_cards'}
 runs,shares=equity(binary,holes,[card(c) for c in at_allin],[(1<<len(players))-1])
 return {'status':'calculated','share':shares[0][players.index(hero)],'boardCards':len(at_allin),'opponents':len(players)-1,'runouts':runs,'method':'hero-allin-vs-final-contenders-v1'}
def inspect(raw,hero,binary,calculate=True):
 base=raw['base_data'];events=[e for _,e in sorted(base['opt'].items(),key=lambda p:int(p[0]))]
 active={str(c[0]) for c in base['card']};board=[];allins=[];last_board=[];money=collections.Counter();ante=0;special=False
 for e in events:
  code=str(e['type']);pid=str(e.get('userId'))
  if code=='94' and isinstance(e.get('card'),list):
   next_board=list(e['card'])
   if board and next_board[:len(board)]!=board: special=True
   board=next_board
  if code=='5':allins.append((pid,list(board)))
  if code=='10':active.discard(pid)
  if code in ('2','3','5','10','17','20'):last_board=list(board)
  if code in ('2','3','5','18','19','20','30'):money[pid]+=amount(e)
  if code=='93':ante+=amount(e)
  if code=='98':special=True
 if hero not in active or len(active)<2 or not allins:return {'status':'not_applicable'}
 relevant=[b for p,b in allins if p in active and len(b)<5]
 if not relevant:return {'status':'not_applicable'}
 def skip(reason):return {'status':'unresolved','reason':reason}
 if special:return skip('special_runout')
 if len(board)!=5:return skip('missing_final_board')
 if last_board!=relevant[0]:return skip('betting_after_allin_street')|{'showdownEquity':hero_showdown_equity(raw,hero,binary) if calculate else {'status':'not_calculated'}}
 bets=mapping(raw['bet_list']);scores={str(raw['UserId'+str(i)]):int(raw['Score'+str(i)]) for i in range(1,11) if str(raw.get('UserId'+str(i),'0'))!='0'}
 if set(bets)-set(scores):return skip('contribution_players')
 for p in set(scores)-set(bets):
  if scores[p]!=0 or money[p]!=0:return skip('contribution_players')
  bets[p]=0
 # Codes are incremental contributions. Add uniform ante only if it reconciles,
 # then return the unique unmatched excess above the second-largest investment.
 reconciled=False
 for uniform in (0,ante//len(bets) if ante%len(bets)==0 else -1):
  if uniform<0:continue
  reconstructed={p:money[p]+uniform for p in bets};largest=sorted(reconstructed.values(),reverse=True)
  for p,v in reconstructed.items():
   if v>largest[1]:reconstructed[p]=largest[1]
  if reconstructed==bets:reconciled=True;break
 # bet_list is the final contribution ledger. Missing forced-post actions are
 # tolerated only when that ledger independently reconciles every final payout.
 players=sorted(active);holes=[[card(c) for c in row[2:]] for p in players for row in base['card'] if str(row[0])==p]
 if len(holes)!=len(players) or any(len(h)!=2 for h in holes):return skip('missing_cards')
 known=list(itertools.chain.from_iterable(holes))+[card(c) for c in board]
 if len(set(known))!=len(known):return skip('duplicate_cards')
 levels=sorted(set(bets.values())-{0});pots=[];previous=0
 for level in levels:
  contributors=[p for p,v in bets.items() if v>=level];eligible=[p for p in players if bets[p]>=level]
  if not eligible or len(contributors)<2:return skip('uncalled_pot')
  pots.append(((level-previous)*len(contributors),sum(1<<players.index(p) for p in eligible)));previous=level
 merged=collections.Counter()
 for pot,mask in pots:merged[mask]+=pot
 pots=[(pot,mask) for mask,pot in merged.items()]
 house=-sum(scores.values())
 if house<0 or house>sum(bets.values())*.2:return skip('unexplained_payout')
 if house and len(pots)>1:return skip('side_pot_deduction')
 _,actual=equity(binary,holes,[card(c) for c in board],[mask for _,mask in pots])
 net_pots=[pot-house if len(pots)==1 else pot for pot,_ in pots]
 payouts={p:sum(net_pots[j]*actual[j][i] for j in range(len(pots))) for i,p in enumerate(players)}
 if any(abs(scores[p]+bets[p]-payouts.get(p,0))>len(players) for p in bets):return skip('payout_does_not_reconcile')
 if not calculate:return {'status':'eligible','street':len(last_board),'pots':len(pots),'house':house,'actionsReconcile':reconciled}
 runs,shares=equity(binary,holes,[card(c) for c in last_board],[mask for _,mask in pots])
 hero_index=players.index(hero);ev=sum(net_pots[j]*shares[j][hero_index] for j in range(len(pots)))-bets[hero]
 return {'status':'calculated','method':METHOD,'resultMinor':round(ev,6),'runouts':runs,'boardCards':len(last_board),'pots':len(pots),'deductionMinor':house,'actionsReconcile':reconciled}
def run(args):
 text=pathlib.Path(args.projection).read_text();data=json.loads(text.removeprefix('window.Poker21BulkSample = ').rstrip(';\n'));allowed={r['handId']:r for r in data['rows']};results={};counts=collections.defaultdict(collections.Counter)
 db=sqlite3.connect('file:'+str(pathlib.Path(args.db).resolve())+'?mode=ro',uri=True)
 for hid,payload in db.execute('SELECT hand,payload FROM raw_hands WHERE conflict=0'):
  if hid not in allowed:continue
  raw=json.loads(payload);row=allowed[hid]
  if str(raw['RecordId'])!=row['sessionId'] and str(raw.get('DeskId'))!=row['sessionId'] and str(raw.get('CompetitionId'))!=row['sessionId']:raise ValueError('session_mismatch')
  try:result=inspect(raw,data['playerId'],args.binary,not args.audit_only)
  except (ValueError,KeyError,subprocess.CalledProcessError) as e:result={'status':'unresolved','reason':'invalid_export'}
  results[hid]=result;counts[row['mode']][result.get('reason',result['status'])]+=1
  if result['status']=='calculated':print('Calculated',hid,'runouts',result['runouts'],flush=True)
 for hid in allowed:
  if hid not in results:results[hid]={'status':'unresolved','reason':'missing_raw'}
 output={'playerId':data['playerId'],'method':METHOD,'rows':[{k:r[k] for k in ('handId','sessionId','mode','playedAt','resultMinor','bigBlindMinor','cards')}|{'ev':results[h]} for h,r in allowed.items()],'counts':counts}
 pathlib.Path(args.output).write_text(json.dumps(output,ensure_ascii=False,indent=2)+'\n');print(json.dumps(counts,ensure_ascii=False,indent=2))
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--db',required=True);p.add_argument('--projection',required=True);p.add_argument('--binary',required=True);p.add_argument('--output',required=True);p.add_argument('--audit-only',action='store_true');run(p.parse_args())

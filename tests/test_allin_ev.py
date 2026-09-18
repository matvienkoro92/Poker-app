import importlib.util,pathlib,unittest,subprocess,tempfile,itertools,collections,random
ROOT=pathlib.Path(__file__).resolve().parents[1]
s=importlib.util.spec_from_file_location('ev',ROOT/'scripts/calculate-allin-ev.py');ev=importlib.util.module_from_spec(s);s.loader.exec_module(ev)
def rank5(cards):
 ranks=[c%13+2 for c in cards];counts=collections.Counter(ranks);groups=sorted(((n,r) for r,n in counts.items()),reverse=True);unique=sorted(counts,reverse=True)
 straight=unique[0] if len(unique)==5 and unique[0]-unique[-1]==4 else 5 if unique==[14,5,4,3,2] else 0
 flush=len({c//13 for c in cards})==1
 if flush and straight:return (8,straight)
 if groups[0][0]==4:return (7,groups[0][1],groups[1][1])
 if [g[0] for g in groups]==[3,2]:return (6,groups[0][1],groups[1][1])
 if flush:return (5,*sorted(ranks,reverse=True))
 if straight:return (4,straight)
 if groups[0][0]==3:return (3,groups[0][1],*sorted((r for r in ranks if r!=groups[0][1]),reverse=True))
 if [g[0] for g in groups[:2]]==[2,2]:return (2,*sorted((groups[0][1],groups[1][1]),reverse=True),groups[2][1])
 if groups[0][0]==2:return (1,groups[0][1],*sorted((r for r in ranks if r!=groups[0][1]),reverse=True))
 return (0,*sorted(ranks,reverse=True))
class Equity(unittest.TestCase):
 @classmethod
 def setUpClass(cls):
  cls.tmp=tempfile.TemporaryDirectory();cls.binary=cls.tmp.name+'/equity';subprocess.run(['clang++','-O3','-std=c++17',str(ROOT/'scripts/holdem-equity.cpp'),'-o',cls.binary],check=True);subprocess.run(['clang++','-O3','-std=c++17',str(ROOT/'scripts/omaha-equity.cpp'),'-o',cls.tmp.name+'/omaha-equity'],check=True)
 @classmethod
 def tearDownClass(cls):cls.tmp.cleanup()
 def test_independent_five_card_reference(self):
  rng=random.Random(45)
  for _ in range(120):
   c=rng.sample(range(52),9);holes=[c[:2],c[2:4]];board=c[4:];r=[max(rank5(x) for x in itertools.combinations(h+board,5)) for h in holes]
   _,shares=ev.equity(self.binary,holes,board,[3,1]);expected=[1,0] if r[0]>r[1] else [0,1] if r[1]>r[0] else [.5,.5]
   self.assertEqual(shares,[expected,[1,0]])
 def test_flop_enumeration_against_independent_reference(self):
  holes=[[12,25],[11,24]];flop=[0,14,28];used=set(sum(holes,[])+flop);deck=[c for c in range(52) if c not in used];wins=0;count=0
  for run in itertools.combinations(deck,2):
   ranks=[max(rank5(x) for x in itertools.combinations(h+flop+list(run),5)) for h in holes];wins+=1 if ranks[0]>ranks[1] else .5 if ranks[0]==ranks[1] else 0;count+=1
  runs,v=ev.equity(self.binary,holes,flop,[3]);self.assertEqual(runs,count);self.assertAlmostEqual(v[0][0],wins/count,12)
 def test_board_royal_split(self):
  _,v=ev.equity(self.binary,[[13,14],[26,27]],[8,9,10,11,12],[3]);self.assertEqual(v,[[.5,.5]])
 def test_turn_quads_and_runout_count(self):
  runs,v=ev.equity(self.binary,[[12,25],[11,24]],[38,51,0,1],[3]);self.assertEqual(runs,44);self.assertEqual(v,[[1,0]])
 def test_omaha_uses_exactly_two_hole_and_three_board_cards(self):
  # Hero's ace-high spade flush wins; neither player may play only one hole card.
  holes=[[51,50,23,22],[49,47,37,35]];board=[40,43,47-39,1,18]
  # Use a collision-free explicit deal for the actual assertion.
  holes=[[51,24,10,9],[49,47,37,35]];board=[39,42,46,1,18]
  runs,v=ev.equity(self.binary,holes,board,[3]);self.assertEqual(runs,1);self.assertEqual(sum(v[0]),1);self.assertEqual(ev.equity.last_method,'omaha-exact-2hole-3board-v1')
 def test_omaha_turn_is_exact_and_preflop_simulation_is_repeatable(self):
  holes=[[51,24,10,9],[49,47,37,35]];turn=[39,42,46,1]
  runs,a=ev.equity(self.binary,holes,turn,[3]);self.assertEqual(runs,40);self.assertEqual(ev.equity.last_method,'omaha-exact-2hole-3board-v1')
  runs,a=ev.equity(self.binary,holes,[],[3]);runs2,b=ev.equity(self.binary,holes,[],[3]);self.assertEqual(runs,100000);self.assertEqual(runs2,runs);self.assertEqual(a,b);self.assertEqual(ev.equity.last_method,'omaha-simulation-2hole-3board-v1');self.assertAlmostEqual(sum(a[0]),1,12)
 def raw(self):
  return {'UserId1':'1','Score1':10000,'UserId2':'2','Score2':-10000,'bet_list':'1:10000,2:10000,','fee_list':'','base_data':{'card':[['1','0','101','201'],['2','0','113','213']],'opt':{'0':{'type':'5','userId':'1','bet':100,'card':''},'1':{'type':'2','userId':'2','bet':100,'card':''},'2':{'type':'94','userId':'-1','bet':0,'card':['102','203','304','409','111']}}}}
 def test_payout_validation_and_incomplete_board(self):
  r=self.raw();self.assertEqual(ev.inspect(r,'1',self.binary,False)['status'],'eligible')
  r['Score1']=11000;self.assertEqual(ev.inspect(r,'1',self.binary,False)['status'],'unresolved')
  r=self.raw();r['base_data']['opt']['2']['card']=[];self.assertEqual(ev.inspect(r,'1',self.binary,False)['reason'],'missing_final_board')
 def test_hero_equity_uses_hero_allin_street_not_other_allin(self):
  r=self.raw();r['base_data']['opt']['0']['userId']='2';r['base_data']['opt']['1']['userId']='1'
  self.assertEqual(ev.hero_showdown_equity(r,'1',self.binary)['status'],'no_hero_allin')
  r['base_data']['opt']['3']={'type':'5','userId':'1','bet':1,'card':''}
  result=ev.hero_showdown_equity(r,'1',self.binary);self.assertEqual(result['boardCards'],5);self.assertEqual(result['share'],1);self.assertEqual(result['runouts'],1)
 def test_unique_side_pot_deductions(self):
  pots=[(300,7),(100,3)];actual=[[0,0,1],[0,1,0]];players=['1','2','3'];bets={'1':100,'2':100,'3':100};scores={'1':-100,'2':-10,'3':170}
  self.assertEqual(ev.infer_net_pots(pots,actual,players,scores,bets),[270,90])
  self.assertIsNone(ev.infer_net_pots(pots,[[1,0,0],[1,0,0]],players,{'1':260,'2':-100,'3':-100},bets))
 def test_missing_board_accepts_completed_reconciled_ledger(self):
  r=self.raw();r['base_data']['opt'].pop('2');r['StartTime']=1;r['EndTime']=2
  for i,(kind,pid) in enumerate([('96','1'),('96','2'),('95','1'),('95','2')],2):r['base_data']['opt'][str(i)]={'type':kind,'userId':pid,'bet':0,'card':''}
  result=ev.inspect(r,'1',self.binary,False);self.assertEqual(result['status'],'eligible');self.assertEqual(result['validation'],'completed_ledger_without_final_board')
 def test_only_tied_players_allow_sub_chip_remainder(self):
  r=self.raw();r['base_data']['card']=[['1','0','101','112'],['2','0','201','212']];r['base_data']['opt']['2']['card']=['310','402','211','408','304'];r['Score1']=50;r['Score2']=-50
  self.assertEqual(ev.inspect(r,'1',self.binary,False)['validation'],'split_pot_chip_remainder')
  r['Score1']=100;r['Score2']=-100;self.assertEqual(ev.inspect(r,'1',self.binary,False)['status'],'unresolved')
 def test_opponent_allin_matched_by_hero_call(self):
  r=self.raw();r['base_data']['opt']={'0':{'type':'94','userId':'-1','bet':0,'card':['102','203','304']},'1':{'type':'5','userId':'2','bet':100,'card':''},'2':{'type':'2','userId':'1','bet':100,'card':''}}
  result=ev.matched_showdown_equity(r,'1',self.binary);self.assertEqual(result['status'],'calculated');self.assertEqual(result['boardCards'],3);self.assertEqual(result['runouts'],990)
 def test_gross_ev_excludes_pots_above_hero_contribution(self):
  r=self.raw();r.update({'UserId3':'3','Score1':-10000,'Score2':25000,'Score3':-20000,'bet_list':'1:10000,2:20000,3:20000,'})
  r['base_data']['card'].append(['3','0','112','212'])
  r['base_data']['opt']={'0':{'type':'94','userId':'-1','bet':0,'card':['313','102','203']},'1':{'type':'5','userId':'1','bet':100,'card':''},'2':{'type':'5','userId':'2','bet':200,'card':''},'3':{'type':'2','userId':'3','bet':200,'card':''},'4':{'type':'94','userId':'-1','bet':0,'card':['313','102','203','409','111']}}
  result=ev.inspect(r,'1',self.binary);self.assertEqual(result['reason'],'side_pot_deduction');gross=result['grossEv']
  self.assertEqual(gross['eligiblePotMinor'],30000);self.assertEqual(gross['contributionMinor'],10000);self.assertEqual(len(gross['pots']),1);self.assertEqual(gross['actualResultMinor'],-10000)
 def test_unmatched_excess_is_returned(self):
  r=self.raw();r['base_data']['opt']['0']['bet']=200
  self.assertTrue(ev.inspect(r,'1',self.binary,False)['actionsReconcile'])
if __name__=='__main__':unittest.main()

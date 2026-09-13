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
  cls.tmp=tempfile.TemporaryDirectory();cls.binary=cls.tmp.name+'/equity';subprocess.run(['clang++','-O3','-std=c++17',str(ROOT/'scripts/holdem-equity.cpp'),'-o',cls.binary],check=True)
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
 def test_unmatched_excess_is_returned(self):
  r=self.raw();r['base_data']['opt']['0']['bet']=200
  self.assertTrue(ev.inspect(r,'1',self.binary,False)['actionsReconcile'])
if __name__=='__main__':unittest.main()

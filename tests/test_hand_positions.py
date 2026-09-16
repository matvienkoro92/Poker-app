import importlib.util,pathlib,unittest
s=importlib.util.spec_from_file_location('imp',pathlib.Path(__file__).resolve().parents[1]/'scripts/import-poker21-json.py');m=importlib.util.module_from_spec(s);s.loader.exec_module(m)
class Positions(unittest.TestCase):
 def raw(self,seats,sb,bb):return {'base_data':{'UserIds':seats,'card':[[u,'0'] for u in seats if u!='0'],'opt':{'0':{'type':'18','userId':sb},'1':{'type':'19','userId':bb}}}}
 def test_six_max_with_empty_seats(self):self.assertEqual(m.positions(self.raw(['1','0','2','3','4','5','6'],'5','6')),dict(zip(['1','2','3','4','5','6'],['UTG','HJ','CO','BTN','SB','BB'])))
 def test_heads_up(self):self.assertEqual(m.positions(self.raw(['1','2'],'1','2')),{'1':'BTN/SB','2':'BB'})
 def test_extra_big_blind(self):
  r=self.raw(['1','2','3','4','5','6'],'5','6')
  r['base_data']['opt']['2']={'type':'19','userId':'2'}
  self.assertEqual(m.positions(r),dict(zip(['1','2','3','4','5','6'],['UTG','HJ','CO','BTN','SB','BB'])))
 def test_missing_small_blind(self):
  r=self.raw(['1','2','3'],'2','3');del r['base_data']['opt']['0']
  self.assertEqual(m.positions(r),{'1':'BTN','2':'SB','3':'BB'})
 def test_missing_small_blind_wraparound_and_empty_seats(self):
  r=self.raw(['1','0','2','3','4','0','5','6'],'6','1');del r['base_data']['opt']['0']
  self.assertEqual(m.positions(r),{'2':'UTG','3':'HJ','4':'CO','5':'BTN','6':'SB','1':'BB'})
 def test_missing_small_blind_heads_up(self):
  r=self.raw(['1','2'],'1','2');del r['base_data']['opt']['0']
  self.assertEqual(m.positions(r),{'1':'BTN/SB','2':'BB'})
 def test_missing_small_blind_multiple_big_blinds(self):
  r=self.raw(['1','2','3'],'2','3');del r['base_data']['opt']['0']
  r['base_data']['opt']['2']={'type':'19','userId':'1'}
  self.assertEqual(m.positions(r),{'1':'BB','2':'UNKNOWN','3':'BB'})
 def test_ambiguous_blinds(self):
  r=self.raw(['1','2','3'],'1','3');self.assertTrue(all(p=='UNKNOWN' for p in m.positions(r).values()))
if __name__=='__main__':unittest.main()

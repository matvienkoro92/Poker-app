import importlib.util,pathlib,unittest
s=importlib.util.spec_from_file_location('imp',pathlib.Path(__file__).resolve().parents[1]/'scripts/import-poker21-json.py');m=importlib.util.module_from_spec(s);s.loader.exec_module(m)
class Positions(unittest.TestCase):
 def raw(self,seats,sb,bb):return {'base_data':{'UserIds':seats,'card':[[u,'0'] for u in seats if u!='0'],'opt':{'0':{'type':'18','userId':sb},'1':{'type':'19','userId':bb}}}}
 def test_six_max_with_empty_seats(self):self.assertEqual(m.positions(self.raw(['1','0','2','3','4','5','6'],'5','6')),dict(zip(['1','2','3','4','5','6'],['UTG','HJ','CO','BTN','SB','BB'])))
 def test_heads_up(self):self.assertEqual(m.positions(self.raw(['1','2'],'1','2')),{'1':'BTN/SB','2':'BB'})
 def test_ambiguous_blinds(self):
  r=self.raw(['1','2','3'],'1','3');self.assertTrue(all(p=='UNKNOWN' for p in m.positions(r).values()))
if __name__=='__main__':unittest.main()

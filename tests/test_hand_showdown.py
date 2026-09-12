import importlib.util,pathlib,unittest
s=importlib.util.spec_from_file_location('imp',pathlib.Path(__file__).resolve().parents[1]/'scripts/import-poker21-json.py');m=importlib.util.module_from_spec(s);s.loader.exec_module(m)
class Showdown(unittest.TestCase):
 def raw(self,fold=None,board=True):
  return {'base_data':{'card':[['1'],['2'],['3']],'opt':dict(([('1',{'type':'10','userId':fold})] if fold else [])+([('2',{'type':'94','card':['101','202','303','404','105']})] if board else []))}}
 def test_folded_hero_is_nonshowdown_even_if_others_show(self):self.assertFalse(m.showdown_status(self.raw('1'),'1'));self.assertTrue(m.showdown_status(self.raw('1'),'2'))
 def test_unknown_without_final_board(self):self.assertIsNone(m.showdown_status(self.raw(board=False),'1'))
 def test_uncontested(self):
  r=self.raw('2',False);r['base_data']['opt']['3']={'type':'10','userId':'3'};self.assertFalse(m.showdown_status(r,'1'))
if __name__=='__main__':unittest.main()

import importlib.util,pathlib,unittest
s=importlib.util.spec_from_file_location('imp',pathlib.Path(__file__).resolve().parents[1]/'scripts/import-poker21-json.py');m=importlib.util.module_from_spec(s);s.loader.exec_module(m)
class Showdown(unittest.TestCase):
 def raw(self,fold=None,board=True):
  return {'base_data':{'card':[['1'],['2'],['3']],'opt':dict(([('1',{'type':'10','userId':fold})] if fold else [])+([('2',{'type':'94','card':['101','202','303','404','105']})] if board else []))}}
 def test_folded_hero_is_nonshowdown_even_if_others_show(self):self.assertFalse(m.showdown_status(self.raw('1'),'1'));self.assertTrue(m.showdown_status(self.raw('1'),'2'))
 def test_unknown_without_final_board(self):self.assertIsNone(m.showdown_status(self.raw(board=False),'1'))
 def test_uncontested(self):
  r=self.raw('2',False);r['base_data']['opt']['3']={'type':'10','userId':'3'};self.assertFalse(m.showdown_status(r,'1'))

class AllInRunout(unittest.TestCase):
 def raw(self):
  return {'StartTime':'10','EndTime':'20','base_data':{'card':[['1'],['2']], 'opt':{'0':{'type':'5','userId':'1'},'1':{'type':'2','userId':'2'},'2':{'type':'96','userId':'1'},'3':{'type':'96','userId':'2'},'4':{'type':'95','userId':'1'},'5':{'type':'95','userId':'2'}}}}
 def test_completed_missing_board(self):self.assertTrue(m.showdown_status(self.raw(),'2'))
 def test_missing_terminal_stays_unknown(self):
  r=self.raw();del r['base_data']['opt']['3'];self.assertIsNone(m.showdown_status(r,'2'))
 def test_uncalled_allin_is_not_showdown(self):
  r=self.raw();r['base_data']['opt']['1']={'type':'10','userId':'2'};self.assertFalse(m.showdown_status(r,'1'))

class Disclosure(unittest.TestCase):
 def raw(self):
  return {'UserId1':'1','Score1':-100,'UserId2':'2','Score2':200,'UserId3':'3','Score3':-100,'base_data':{'card':[['1','0','101','102'],['2','0','113','213'],['3','0','112','212']],'opt':{'1':{'type':'94','card':['103','204','305','406','107']}}}}
 def test_only_winner_visible(self):
  self.assertEqual(m.visible_opponent_cards(self.raw(),'1'),[{'playerId':'2','cards':['Kd','Kc'],'disclosure':'showdown-winner'}])
 def test_folded_hero_sees_none(self):
  r=self.raw();r['base_data']['opt']['2']={'type':'10','userId':'1'};self.assertEqual(m.visible_opponent_cards(r,'1'),[])
 def test_folded_opponent_hidden_even_positive_score(self):
  r=self.raw();r['base_data']['opt']['2']={'type':'10','userId':'2'};self.assertEqual(m.visible_opponent_cards(r,'1'),[])
 def test_unknown_hidden(self):
  r=self.raw();r['base_data']['opt']={};self.assertEqual(m.visible_opponent_cards(r,'1'),[])
 def test_own_and_losing_cards_excluded(self):self.assertEqual(m.visible_opponent_cards(self.raw(),'2'),[])

if __name__=='__main__':unittest.main()

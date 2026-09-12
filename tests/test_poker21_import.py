import importlib.util, json, pathlib, sqlite3, tempfile, unittest
spec=importlib.util.spec_from_file_location('importer',pathlib.Path(__file__).resolve().parents[1]/'scripts/import-poker21-json.py')
m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
class ImportTests(unittest.TestCase):
 def raw(self):
  return {'Id':'12','RecordId':'99','PlayMode':'201','PlayType':'2002','StartTime':'1789154835','EndTime':'1789154850','UserId1':'208238','Score1':'-4800','base_data':{'card':[['208238','0','301','302']],'opt':{'3':{'type':'19','bet':40}}}}
 def test_units_cards_and_no_private_fields(self):
  r=m.project(self.raw(),'cash')[0];self.assertEqual(r['cards'],['Ah','2h']);self.assertEqual(r['resultMinor'],-4800);self.assertEqual(r['bigBlindMinor'],4000);self.assertEqual(r['unit'],'TABLE_CHIP');self.assertNotIn('opt',r)
 def test_ambiguous_blind_rejected(self):
  r=self.raw();r['base_data']['opt']['4']={'type':'19','bet':80}
  with self.assertRaises(ValueError):m.project(r,'cash')
 def test_equal_big_blind_posts_have_one_unambiguous_size(self):
  r=self.raw();r['base_data']['opt']['4']={'type':'19','bet':40}
  self.assertEqual(m.project(r,'cash')[0]['bigBlindMinor'],4000)
 def test_unknown_format_rejected(self):
  r=self.raw();r['PlayType']='999'
  with self.assertRaises(ValueError):m.project(r,'cash')
 def test_repeat_and_conflict_quarantine(self):
  with tempfile.TemporaryDirectory() as t:
   p=pathlib.Path(t);f=p/'in.json';db=p/'db.sqlite';r=self.raw();f.write_text(json.dumps([r]))
   a=m.run(f,db,'cash','99',2);self.assertEqual(a['storedHands'],1);self.assertEqual(a['missingHands'],1)
   self.assertEqual(m.run(f,db,'cash','99')['counts']['duplicate'],1)
   r['Score1']='100';f.write_text(json.dumps([r]));self.assertEqual(m.run(f,db,'cash','99')['storedHands'],0)
 def test_wrong_scope_writes_nothing(self):
  with tempfile.TemporaryDirectory() as t:
   f=pathlib.Path(t)/'in.json';f.write_text(json.dumps([self.raw()]));db=pathlib.Path(t)/'db'
   with self.assertRaises(ValueError):m.run(f,db,'cash','100')
   self.assertFalse(db.exists())
if __name__=='__main__':unittest.main()

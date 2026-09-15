import importlib.util,pathlib,subprocess,tempfile,unittest
ROOT=pathlib.Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('batch',ROOT/'scripts/calculate-club-hand-ev.py');batch=importlib.util.module_from_spec(spec);spec.loader.exec_module(batch)
class Cache(unittest.TestCase):
 def test_cached_equity_accepts_lists_and_matches_direct_solver(self):
  with tempfile.TemporaryDirectory() as tmp:
   binary=pathlib.Path(tmp)/'equity';subprocess.run(['clang++','-O3','-std=c++17',str(ROOT/'scripts/holdem-equity.cpp'),'-o',str(binary)],check=True)
   ev=batch.load_calculator();holes=[[12,25],[11,24]];board=[38,51,0,1]
   first=ev.equity(binary,holes,board,[3,1]);second=ev.equity(binary,holes,board,[3,1])
   self.assertEqual(first,second);self.assertEqual(first,(44,[[1.0,0.0],[1.0,0.0]]))
if __name__=='__main__':unittest.main()

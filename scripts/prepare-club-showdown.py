#!/usr/bin/env python3
"""Prepare add-only disclosure patches for previously imported club hands."""
import importlib.util,json,pathlib,collections,sys
ROOT=pathlib.Path(__file__).resolve().parents[1]
s=importlib.util.spec_from_file_location('imp',ROOT/'scripts/import-poker21-json.py');imp=importlib.util.module_from_spec(s);s.loader.exec_module(imp)
def main():
 owners=collections.defaultdict(dict)
 for p in (ROOT/'output/club-hand-ev/input').glob('*.json'):
  if len(sys.argv)>1 and sys.argv[1]!='--all' and p.stem!=sys.argv[1]:continue
  data=json.loads(p.read_text())
  for row in data['rows']:owners[row['handId']][data['playerId']]=row['cards']
 patches=collections.defaultdict(list)
 for line in (ROOT/'output/poker21-export-2026-09-07_13/hands-2026-09-07_13-MSK.jsonl').open():
  raw=json.loads(line);hid=str(raw['Id'])
  for owner,cards in owners.get(hid,{}).items():
   additions=imp.visible_opponent_cards(raw,owner)
   if additions or '--all' in sys.argv:patches[owner].append(dict(handId=hid,cards=cards,additions=additions))
 out=ROOT/'output/club-hand-showdown';out.mkdir(exist_ok=True)
 if '--all' in sys.argv:
  assert sum(map(len,patches.values()))==sum(map(len,owners.values())), 'Incomplete source coverage'
 (out/'patches.json').write_text(json.dumps(patches))
 print(json.dumps(dict(players=len(patches),replays=sum(map(len,patches.values())))))
if __name__=='__main__':main()

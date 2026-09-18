"""Build seat metadata from raw exports without changing hand actions."""
import importlib.util,json,pathlib,sys
spec=importlib.util.spec_from_file_location('importer',pathlib.Path(__file__).with_name('import-poker21-json.py'))
imp=importlib.util.module_from_spec(spec);spec.loader.exec_module(imp)
out={}
for source in sys.argv[2:]:
    for line in open(source):
        raw=json.loads(line);positions=imp.positions(raw)
        if len([v for v in positions.values() if v!='UNKNOWN'])!=len(set(v for v in positions.values() if v!='UNKNOWN')):
            positions={p:'UNKNOWN' for p in positions}
        value={'positions':positions,'started':int(raw['StartTime']),'sessions':[str(raw.get(k,'')) for k in ('RecordId','DeskId','CompetitionId')]}
        hid=str(raw['Id'])
        if hid in out and out[hid]!=value:raise ValueError('Conflicting source '+hid)
        out[hid]=value
pathlib.Path(sys.argv[1]).write_text(json.dumps(out,separators=(',',':')))
print('Prepared',len(out),'hands')

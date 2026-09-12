#!/usr/bin/env python3
"""Local staging importer for Poker21 JSON; no network, no publishing."""
import argparse, collections, datetime, decimal, hashlib, json, pathlib, sqlite3, time

SUITS = {'1':'d','2':'c','3':'h','4':'s'}
RANKS = {**{str(i):str(i) for i in range(2,10)},'1':'A','10':'T','11':'J','12':'Q','13':'K'}
def card(code):
    code = str(code)
    if len(code)!=3 or code[0] not in SUITS or str(int(code[1:])) not in RANKS:
        raise ValueError('unknown card')
    return RANKS[str(int(code[1:]))]+SUITS[code[0]]
def integer(v):
    n=decimal.Decimal(str(v))
    if not n.is_finite() or n!=n.to_integral_value() or abs(n)>9007199254740991: raise ValueError('invalid integer')
    return int(n)
def positions(raw):
    """Clockwise occupied seats, anchored by unique adjacent live SB/BB posts.
    Ambiguous/dead/multiple blind posts stay unknown rather than guessed.
    """
    base=raw.get('base_data',{}); seats=[str(u) for u in base.get('UserIds',[]) if str(u)!='0']
    unknown={u:'UNKNOWN' for u in seats}
    if not 2<=len(seats)<=10 or len(seats)!=len(set(seats)): return unknown
    dealt={str(c[0]) for c in base.get('card',[])}
    if set(seats)!=dealt: return unknown
    posts={t:[str(a.get('userId','')) for a in base.get('opt',{}).values() if str(a.get('type'))==t] for t in ('18','19')}
    if any(len(posts[t])!=1 for t in posts): return unknown
    sb,bb=posts['18'][0],posts['19'][0]
    if sb not in seats or bb not in seats or seats[(seats.index(sb)+1)%len(seats)]!=bb:return unknown
    if len(seats)==2:return {sb:'BTN/SB',bb:'BB'}
    start=(seats.index(bb)+1)%len(seats);ordered=seats[start:]+seats[:start]
    early={3:[],4:['CO'],5:['HJ','CO'],6:['UTG','HJ','CO'],7:['UTG','LJ','HJ','CO'],8:['UTG','UTG+1','LJ','HJ','CO'],9:['UTG','UTG+1','UTG+2','LJ','HJ','CO'],10:['UTG','UTG+1','UTG+2','UTG+3','LJ','HJ','CO']}
    return dict(zip(ordered,early[len(seats)]+['BTN','SB','BB']))

def showdown_status(raw, player):
    active={str(c[0]) for c in raw['base_data']['card']};folded=set();board=[]
    for _,a in sorted(raw['base_data']['opt'].items(),key=lambda kv:int(kv[0])):
        if str(a['type'])=='10':folded.add(str(a['userId']));active.discard(str(a['userId']))
        if str(a['type'])=='94' and isinstance(a.get('card'),list):board=a['card']
    if player in folded:return False
    if player in active and len(active)==1:return False
    if player in active and len(active)>=2 and len(board)==5:return True
    return None

def project(raw, mode):
    if (str(raw.get('PlayMode')),str(raw.get('PlayType'))) != ('201','2002'):
        raise ValueError('unsupported game codes')
    base=raw['base_data']; started=integer(raw['StartTime']);ended=integer(raw['EndTime'])
    if ended<started or ended<=0: raise ValueError('incomplete hand')
    blinds=[integer(decimal.Decimal(str(a['bet']))*100) for a in base['opt'].values() if str(a.get('type'))=='19']
    if not blinds or len(set(blinds))!=1 or blinds[0]<=0: raise ValueError('ambiguous big blind')
    cards={}
    for entry in base['card']:
        player=str(entry[0])
        if player in cards: raise ValueError('duplicate player cards')
        cards[player]=entry[2:]
    result=[]; players=set(); position_map=positions(raw)
    for i in range(1,11):
        pid=str(raw.get('UserId'+str(i),'0'))
        if pid=='0': continue
        if not pid.isdigit() or pid in players: raise ValueError('invalid player identity')
        players.add(pid)
        pair=[card(c) for c in cards.get(pid,[])]
        if len(pair)!=2 or pair[0]==pair[1]: raise ValueError('missing or invalid hole cards')
        score=integer(raw['Score'+str(i)])
        result.append(dict(source='poker21-json',sessionId=str(raw['RecordId']),handId=str(raw['Id']),playerId=pid,
            mode=mode,game='NLH',position=position_map.get(pid,'UNKNOWN'),showdown=showdown_status(raw,pid),playedAt=datetime.datetime.fromtimestamp(started,datetime.timezone.utc).isoformat().replace('+00:00','Z'),
            status='completed',verified=True,unit='TABLE_CHIP' if mode=='cash' else 'CHIP',scale=100,
            netDefinition='game-net-v1',cards=pair,resultMinor=score,bigBlindMinor=blinds[0]))
    if not result: raise ValueError('no players')
    return result

def run(source,dbpath,mode,session,expected=None,projection=None,player=None):
    started=time.perf_counter(); content=pathlib.Path(source).read_bytes(); rows=json.loads(content)
    if not isinstance(rows,list): raise ValueError('Expected JSON array')
    # Scope must be explicit: never infer cash/MTT from ambiguous source code DeskType.
    if any(str(r.get('RecordId'))!=session for r in rows): raise ValueError('Export contains unexpected sessions')
    dbpath=pathlib.Path(dbpath);dbpath.parent.mkdir(parents=True,exist_ok=True)
    db=sqlite3.connect(dbpath)
    db.executescript('''CREATE TABLE IF NOT EXISTS hands(session TEXT, hand TEXT, payload TEXT, conflict INTEGER DEFAULT 0, PRIMARY KEY(session,hand));
    CREATE TABLE IF NOT EXISTS imports(hash TEXT PRIMARY KEY, source_name TEXT, rows INTEGER, imported_at TEXT);
    CREATE TABLE IF NOT EXISTS rejections(file_hash TEXT, hand TEXT, reason TEXT, UNIQUE(file_hash,hand,reason));''')
    digest=hashlib.sha256(content).hexdigest(); counts=collections.Counter()
    with db:
        for raw in rows:
            hid=str(raw.get('Id',''))
            try:
                if not hid.isdigit() or not session.isdigit(): raise ValueError('invalid hand identity')
                projected=project(raw,mode)
                payload=json.dumps(projected,ensure_ascii=False,sort_keys=True,separators=(',',':'))
            except (ValueError,KeyError,TypeError,decimal.InvalidOperation) as e:
                counts['rejected']+=1
                db.execute('INSERT OR IGNORE INTO rejections VALUES(?,?,?)',(digest,hid,str(e)))
                continue
            prior=db.execute('SELECT payload FROM hands WHERE session=? AND hand=?',(session,hid)).fetchone()
            if prior:
                if prior[0]==payload: counts['duplicate']+=1
                else:
                    counts['conflict']+=1; db.execute('UPDATE hands SET conflict=1 WHERE session=? AND hand=?',(session,hid))
            else:
                db.execute('INSERT INTO hands(session,hand,payload) VALUES(?,?,?)',(session,hid,payload));counts['inserted']+=1
        db.execute('INSERT OR IGNORE INTO imports VALUES(?,?,?,?)',(digest,pathlib.Path(source).name,len(rows),datetime.datetime.now(datetime.timezone.utc).isoformat()))
    allrows=[row for payload, in db.execute('SELECT payload FROM hands WHERE session=? AND conflict=0 ORDER BY hand',(session,)) for row in json.loads(payload)]
    perplayer=collections.Counter(r['playerId'] for r in allrows)
    handcount=len({r['handId'] for r in allrows})
    summary={'sessionId':session,'inputHands':len(rows),'storedHands':handcount,'expectedHands':expected,
        'missingHands':None if expected is None else max(0,expected-handcount),'players':len(perplayer),
        'playerHands':dict(perplayer),'counts':dict(counts),'seconds':round(time.perf_counter()-started,4),
        'coverage':'unknown' if expected is None else 'complete' if expected==handcount else 'partial'}
    if projection:
        if not player: raise ValueError('Projection requires explicit player')
        data={'playerId':player,'name':'ПокерМанки' if player=='208238' else player,'summary':{k:v for k,v in summary.items() if k!='playerHands'},'rows':[r for r in allrows if r['playerId']==player]}
        dest=pathlib.Path(projection);dest.parent.mkdir(parents=True,exist_ok=True)
        temp=dest.with_suffix('.tmp');temp.write_text('window.Poker21BulkSample = '+json.dumps(data,ensure_ascii=False)+';\n');temp.replace(dest)
    db.close();return summary
if __name__=='__main__':
    p=argparse.ArgumentParser(description=__doc__);p.add_argument('source');p.add_argument('--db',required=True);p.add_argument('--mode',choices=['cash','mtt','sng'],required=True);p.add_argument('--session',required=True);p.add_argument('--expected',type=int);p.add_argument('--projection');p.add_argument('--player')
    a=p.parse_args();print(json.dumps(run(a.source,a.db,a.mode,a.session,a.expected,a.projection,a.player),ensure_ascii=False,indent=2))

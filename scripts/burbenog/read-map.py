"""Extract known Warcraft III data entries from the downloaded MPQ map.
Only reads data; does not execute JASS. No third-party packages required.
"""
import pathlib,struct,zlib,bz2,hashlib
ROOT=pathlib.Path(__file__).resolve().parents[2]
source=ROOT/'output/burbenog-reference/BurbenogTDv2.43Legends.w3x'
EXPECTED='e0caef6f4b3d09005b5a07ccc603a8fb3b22b7f805266a13c2a9f7ea778f661a'
raw=source.read_bytes()
if hashlib.sha256(raw).hexdigest()!=EXPECTED:raise ValueError('Unexpected map revision: verify the new source before extracting it')
offset=raw.index(b'MPQ\x1a');archive=raw[offset:]
_,header,size,version,shift,hash_offset,block_offset,hash_count,block_count=struct.unpack_from('<4sIIHHIIII',archive)
if version!=0:raise ValueError('Unsupported MPQ format')
table={};seed=0x100001
for i in range(256):
 for j in range(5):
  seed=(seed*125+3)%0x2aaaab;hi=(seed&65535)<<16
  seed=(seed*125+3)%0x2aaaab;table[i+256*j]=hi|(seed&65535)
def hash_name(name,kind):
 a,b=0x7fed7fed,0xeeeeeeee
 for c in name.upper():
  c=ord(c);a=(table[kind*256+c]^(a+b))&0xffffffff;b=(c+a+b+(b<<5)+3)&0xffffffff
 return a
def decrypt(data,key):
 seed=0xeeeeeeee;out=bytearray(data)
 for i in range(0,len(data)-3,4):
  seed=(seed+table[1024+(key&255)])&0xffffffff
  word=(struct.unpack_from('<I',data,i)[0]^(key+seed))&0xffffffff
  struct.pack_into('<I',out,i,word)
  key=(((~key<<21)+0x11111111)|(key>>11))&0xffffffff
  seed=(word+seed+(seed<<5)+3)&0xffffffff
 return bytes(out)
hashes=list(struct.iter_unpack('<IIHHI',decrypt(archive[hash_offset:hash_offset+hash_count*16],hash_name('(hash table)',3))))
blocks=list(struct.iter_unpack('<IIII',decrypt(archive[block_offset:block_offset+block_count*16],hash_name('(block table)',3))))
def read(name):
 a,b=hash_name(name,1),hash_name(name,2)
 entry=next((h for h in hashes if h[0]==a and h[1]==b),None)
 if not entry:return None
 start,packed,unpacked,flags=blocks[entry[4]];data=archive[start:start+packed]
 key=hash_name(name.split('\\')[-1],3)
 if flags&0x20000:key=((key+start)^unpacked)&0xffffffff
 encrypted=bool(flags&0x10000)
 def expand(d,want):
  if flags&0x200 and len(d)<want:
   if d[0]==2:return zlib.decompress(d[1:])
   if d[0]==16:return bz2.decompress(d[1:])
   if d[0]==0:return d[1:]
   raise ValueError('Unsupported compression '+str(d[0]))
  return d
 if flags&0x1000000:return expand(decrypt(data,key)if encrypted else data,unpacked)
 sector=512<<shift;count=(unpacked+sector-1)//sector;count_offsets=count+1+(1 if flags&0x4000000 else 0)
 raw_offsets=data[:4*count_offsets]
 if encrypted:raw_offsets=decrypt(raw_offsets,(key-1)&0xffffffff)
 positions=struct.unpack('<%sI'%count_offsets,raw_offsets);result=[]
 for i in range(count):
  chunk=data[positions[i]:positions[i+1]]
  if encrypted:chunk=decrypt(chunk,(key+i)&0xffffffff)
  result.append(expand(chunk,min(sector,unpacked-sector*i)))
 result=b''.join(result)
 if len(result)!=unpacked:raise ValueError('Extracted size mismatch: '+name)
 return result
out=source.parent/'extracted';out.mkdir(exist_ok=True)
for name in ['Scripts\\war3map.j','war3map.w3u','war3map.w3a','war3map.w3t','war3map.w3q','war3map.w3i','war3map.wts','war3map.w3e','war3map.wpm','war3mapMisc.txt','war3mapSkin.txt']:
 data=read(name)
 if data is None:raise ValueError('Missing map entry: '+name)
 (out/name.replace('\\','_')).write_bytes(data);print(name,len(data))

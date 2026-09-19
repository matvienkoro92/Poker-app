// Exact Hold'em runouts up to 100k combinations; deterministic simulation above that.
#include <algorithm>
#include <array>
#include <cstdint>
#include <iostream>
#include <numeric>
#include <random>
#include <vector>
using namespace std;
uint64_t pack(int cat, initializer_list<int> ranks){uint64_t x=cat;int i=0;for(int r:ranks){x=x*15+r+2;i++;}while(i++<5)x*=15;return x;}
int straight(int mask){for(int h=12;h>=4;--h)if((mask & (31<<(h-4)))==(31<<(h-4)))return h;return (mask & ((1<<12)|15))==((1<<12)|15)?3:-1;}
// Fixed-size storage avoids heap allocation inside millions of exact runouts.
uint64_t rank7(const array<int,7>&c){
 int count[13]={},suit[4]={},sm[4]={},mask=0;for(int x:c){int r=x%13,s=x/13;count[r]++;suit[s]++;sm[s]|=1<<r;mask|=1<<r;}
 for(int s=0;s<4;s++)if(suit[s]>=5){int h=straight(sm[s]);if(h>=0)return pack(8,{h});}
 int four=-1,three=-1,pairs[3],np=0,singles[7],ns=0;
 for(int r=12;r>=0;r--){if(count[r]==4)four=r;if(count[r]>=3&&three<0)three=r;if(count[r]>=2)pairs[np++]=r;if(count[r])singles[ns++]=r;}
 if(four>=0)return pack(7,{four,singles[0]==four?singles[1]:singles[0]});
 if(three>=0)for(int i=0;i<np;i++)if(pairs[i]!=three)return pack(6,{three,pairs[i]});
 for(int s=0;s<4;s++)if(suit[s]>=5){int v[5],n=0;for(int r=12;r>=0&&n<5;r--)if(sm[s]&(1<<r))v[n++]=r;return pack(5,{v[0],v[1],v[2],v[3],v[4]});}
 int h=straight(mask);if(h>=0)return pack(4,{h});
 if(three>=0){int v[2],n=0;for(int i=0;i<ns&&n<2;i++)if(singles[i]!=three)v[n++]=singles[i];return pack(3,{three,v[0],v[1]});}
 if(np>=2){int k=-1;for(int i=0;i<ns;i++)if(singles[i]!=pairs[0]&&singles[i]!=pairs[1]){k=singles[i];break;}return pack(2,{pairs[0],pairs[1],k});}
 if(np){int v[3],n=0;for(int i=0;i<ns&&n<3;i++)if(singles[i]!=pairs[0])v[n++]=singles[i];return pack(1,{pairs[0],v[0],v[1],v[2]});}
 return pack(0,{singles[0],singles[1],singles[2],singles[3],singles[4]});
}
int main(){int n,b,m;if(!(cin>>n>>b>>m)||n<2||n>10||b<0||b>5||m<1)return 1;
 vector<array<int,2>>holes(n);vector<int>board(b),deck;bool used[52]={};auto take=[&](int&x){cin>>x;if(x<0||x>=52||used[x])exit(2);used[x]=true;};
 for(auto &p:holes)for(int&x:p)take(x);for(int&x:board)take(x);vector<int>masks(m);for(int&x:masks)cin>>x;
 for(int i=0;i<52;i++)if(!used[i])deck.push_back(i);vector<vector<long double>>wins(m,vector<long double>(n));uint64_t runs=0;
 auto score=[&](){array<uint64_t,10>r{};for(int i=0;i<n;i++){array<int,7>c{holes[i][0],holes[i][1],board[0],board[1],board[2],board[3],board[4]};r[i]=rank7(c);}for(int j=0;j<m;j++){uint64_t best=0;int ties=0;for(int i=0;i<n;i++)if(masks[j]&(1<<i)){if(r[i]>best){best=r[i];ties=1;}else if(r[i]==best)ties++;}if(!ties)exit(3);for(int i=0;i<n;i++)if((masks[j]&(1<<i))&&r[i]==best)wins[j][i]+=1.L/ties;}runs++;};
 const int need=5-b;uint64_t combinations=1;for(int i=1;i<=need;i++)combinations=combinations*(deck.size()-need+i)/i;
 const uint64_t limit=100000;bool simulated=combinations>limit;
 if(!simulated){
  auto walk=[&](auto&&self,int start,int left)->void{if(!left){score();return;}for(int k=start;k<=(int)deck.size()-left;k++){board.push_back(deck[k]);self(self,k+1,left-1);board.pop_back();}};
  walk(walk,0,need);
 }else{
  uint64_t seed=1469598103934665603ULL;auto mix=[&](uint64_t x){seed^=x+1;seed*=1099511628211ULL;};
  for(auto p:holes)for(int x:p)mix(x);for(int x:board)mix(x);for(int x:masks)mix(x);
  mt19937_64 random(seed);vector<int>sample=deck;
  for(uint64_t run=0;run<limit;run++){
   sample=deck;
   for(int i=0;i<need;i++){uniform_int_distribution<int>pick(i,(int)sample.size()-1);swap(sample[i],sample[pick(random)]);board.push_back(sample[i]);}
   score();board.resize(b);
  }
 }
 cout.precision(17);cout<<(simulated?"simulation ":"exact ")<<runs<<'\n';for(auto&v:wins){for(auto x:v)cout<<(double)(x/runs)<<' ';cout<<'\n';}
}

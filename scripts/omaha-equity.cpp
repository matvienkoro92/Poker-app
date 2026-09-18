// Omaha equity: exactly two hole cards and three board cards.
// Input: players hole_count board_count pots, then holes, board and eligibility masks.
#include <algorithm>
#include <array>
#include <cstdint>
#include <iostream>
#include <numeric>
#include <random>
#include <vector>
using namespace std;
uint64_t pack(int cat, initializer_list<int> ranks){uint64_t x=cat;int i=0;for(int r:ranks){x=x*15+r+2;i++;}while(i++<5)x*=15;return x;}
int straight(int mask){for(int h=12;h>=4;--h)if((mask&(31<<(h-4)))==(31<<(h-4)))return h;return (mask&((1<<12)|15))==((1<<12)|15)?3:-1;}
uint64_t rank5(const array<int,5>&c){
 int count[13]={},suit[4]={},mask=0;for(int x:c){count[x%13]++;suit[x/13]++;mask|=1<<(x%13);}
 bool flush=*max_element(suit,suit+4)==5;int sh=straight(mask);if(flush&&sh>=0)return pack(8,{sh});
 int four=-1,three=-1,pair[2]={-1,-1},np=0,single[5],ns=0;
 for(int r=12;r>=0;r--){if(count[r]==4)four=r;else if(count[r]==3)three=r;else if(count[r]==2&&np<2)pair[np++]=r;else if(count[r])single[ns++]=r;}
 if(four>=0)return pack(7,{four,single[0]});if(three>=0&&np)return pack(6,{three,pair[0]});
 if(flush)return pack(5,{c[0]%13,c[1]%13,c[2]%13,c[3]%13,c[4]%13});if(sh>=0)return pack(4,{sh});
 if(three>=0)return pack(3,{three,single[0],single[1]});if(np==2)return pack(2,{pair[0],pair[1],single[0]});
 if(np==1)return pack(1,{pair[0],single[0],single[1],single[2]});return pack(0,{single[0],single[1],single[2],single[3],single[4]});
}
uint64_t omaha(const vector<int>&h,const vector<int>&b){uint64_t best=0;for(int i=0;i<(int)h.size();i++)for(int j=i+1;j<(int)h.size();j++)for(int a=0;a<3;a++)for(int d=a+1;d<4;d++)for(int e=d+1;e<5;e++){array<int,5> c{h[i],h[j],b[a],b[d],b[e]};sort(c.begin(),c.end(),[](int x,int y){return x%13>y%13;});best=max(best,rank5(c));}return best;}
uint64_t combinations(int n,int k){uint64_t v=1;for(int i=1;i<=k;i++)v=v*(n-k+i)/i;return v;}
int main(){int n,hc,bc,m;if(!(cin>>n>>hc>>bc>>m)||n<2||n>10||hc<4||hc>6||bc<0||bc>5||m<1)return 1;
 vector<vector<int>> holes(n,vector<int>(hc));vector<int> board(bc),deck;bool used[52]={};auto take=[&](int&x){cin>>x;if(x<0||x>=52||used[x])exit(2);used[x]=true;};
 for(auto&p:holes)for(int&x:p)take(x);for(int&x:board)take(x);vector<int> masks(m);for(int&x:masks)cin>>x;for(int i=0;i<52;i++)if(!used[i])deck.push_back(i);
 vector<vector<long double>> wins(m,vector<long double>(n));uint64_t runs=0;int need=5-bc;
 auto score=[&](const vector<int>&run){vector<int>b=board;b.insert(b.end(),run.begin(),run.end());vector<uint64_t>r(n);for(int i=0;i<n;i++)r[i]=omaha(holes[i],b);for(int p=0;p<m;p++){uint64_t best=0;int ties=0;for(int i=0;i<n;i++)if(masks[p]&(1<<i)){if(r[i]>best){best=r[i];ties=1;}else if(r[i]==best)ties++;}if(!ties)exit(3);for(int i=0;i<n;i++)if((masks[p]&(1<<i))&&r[i]==best)wins[p][i]+=1.L/ties;}runs++;};
 const uint64_t total=combinations(deck.size(),need),limit=100000;bool exact=total<=limit;
 if(exact){vector<int>run;auto walk=[&](auto&&self,int start,int left)->void{if(!left){score(run);return;}for(int k=start;k<=(int)deck.size()-left;k++){run.push_back(deck[k]);self(self,k+1,left-1);run.pop_back();}};walk(walk,0,need);}
 else{uint64_t seed=1469598103934665603ULL;for(auto&p:holes)for(int x:p)seed=(seed^x)*1099511628211ULL;for(int x:board)seed=(seed^x)*1099511628211ULL;mt19937_64 rng(seed);vector<int>sample=deck,run(need);for(uint64_t z=0;z<limit;z++){for(int i=0;i<need;i++){uniform_int_distribution<int>d(i,(int)sample.size()-1);int j=d(rng);swap(sample[i],sample[j]);run[i]=sample[i];}score(run);for(int i=need-1;i>=0;i--){}sample=deck;}}
 cout<<(exact?"exact ":"simulation ")<<runs<<'\n';cout.precision(17);for(auto&v:wins){for(auto x:v)cout<<(double)(x/runs)<<' ';cout<<'\n';}
}

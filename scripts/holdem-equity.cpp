// Exact Hold'em runout enumeration. Cards: suit*13 + rank (2..A => 0..12).
#include <algorithm>
#include <array>
#include <cstdint>
#include <iostream>
#include <vector>
using namespace std;
uint64_t pack(int cat, vector<int> ranks){uint64_t x=cat;for(int i=0;i<5;i++)x=x*15+(i<(int)ranks.size()?ranks[i]+2:0);return x;}
int straight(int mask){for(int h=12;h>=4;--h)if((mask & (31<<(h-4)))==(31<<(h-4)))return h;return (mask & ((1<<12)|15))==((1<<12)|15)?3:-1;}
uint64_t rank7(const vector<int>&c){
 int count[13]={},suit[4]={},sm[4]={},mask=0;for(int x:c){int r=x%13,s=x/13;count[r]++;suit[s]++;sm[s]|=1<<r;mask|=1<<r;}
 for(int s=0;s<4;s++)if(suit[s]>=5){int h=straight(sm[s]);if(h>=0)return pack(8,{h});}
 vector<int>four,three,pairs,singles;for(int r=12;r>=0;r--){if(count[r]==4)four.push_back(r);if(count[r]>=3)three.push_back(r);if(count[r]>=2)pairs.push_back(r);if(count[r])singles.push_back(r);}
 if(four.size()){int k=singles[0]==four[0]?singles[1]:singles[0];return pack(7,{four[0],k});}
 if(three.size()){for(int p:pairs)if(p!=three[0])return pack(6,{three[0],p});}
 for(int s=0;s<4;s++)if(suit[s]>=5){vector<int>v;for(int r=12;r>=0;r--)if(sm[s]&(1<<r))v.push_back(r);return pack(5,v);}
 int h=straight(mask);if(h>=0)return pack(4,{h});
 if(three.size()){vector<int>v={three[0]};for(int r:singles)if(r!=three[0])v.push_back(r);return pack(3,{v[0],v[1],v[2]});}
 if(pairs.size()>=2){int k=-1;for(int r:singles)if(r!=pairs[0]&&r!=pairs[1]){k=r;break;}return pack(2,{pairs[0],pairs[1],k});}
 if(pairs.size()){vector<int>v={pairs[0]};for(int r:singles)if(r!=pairs[0])v.push_back(r);v.resize(4);return pack(1,v);}
 return pack(0,singles);
}
int main(){int n,b,m;if(!(cin>>n>>b>>m)||n<2||n>10||b<0||b>5||m<1)return 1;
 vector<array<int,2>>holes(n);vector<int>board(b),deck;bool used[52]={};auto take=[&](int&x){cin>>x;if(x<0||x>=52||used[x])exit(2);used[x]=true;};
 for(auto &p:holes)for(int&x:p)take(x);for(int&x:board)take(x);vector<int>masks(m);for(int&x:masks)cin>>x;
 for(int i=0;i<52;i++)if(!used[i])deck.push_back(i);vector<vector<long double>>wins(m,vector<long double>(n));uint64_t runs=0;
 auto score=[&](){vector<uint64_t>r(n);for(int i=0;i<n;i++){vector<int>c=board;c.push_back(holes[i][0]);c.push_back(holes[i][1]);r[i]=rank7(c);}for(int j=0;j<m;j++){uint64_t best=0;int ties=0;for(int i=0;i<n;i++)if(masks[j]&(1<<i)){if(r[i]>best){best=r[i];ties=1;}else if(r[i]==best)ties++;}if(!ties)exit(3);for(int i=0;i<n;i++)if((masks[j]&(1<<i))&&r[i]==best)wins[j][i]+=1.L/ties;}runs++;};
 auto walk=[&](auto&&self,int start,int need)->void{if(!need){score();return;}for(int k=start;k<=(int)deck.size()-need;k++){board.push_back(deck[k]);self(self,k+1,need-1);board.pop_back();}};
 walk(walk,0,5-b);cout.precision(17);cout<<runs<<'\n';for(auto&v:wins){for(auto x:v)cout<<(double)(x/runs)<<' ';cout<<'\n';}
}

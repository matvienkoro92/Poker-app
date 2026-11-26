import test from 'node:test';
import assert from 'node:assert/strict';
import {blocked} from '../scripts/city-game/world.mjs';
import {quayHouses} from '../scripts/city-game/quayside-block.mjs';
import {quayShopPlan} from '../scripts/city-game/quay-shop-plan.mjs';

for(const shop of quayHouses.slice(1)){
 test(shop.shop+' has a walkable entrance and solid glazing and furniture',()=>{
  const {front,sign,depth,fixtures}=quayShopPlan(shop);
  for(let d=-2.7;d<depth-.55;d+=.1)assert(!blocked(shop.x,front-sign*d,.45));
  for(const f of fixtures)assert(blocked(shop.x+f.x,front-sign*f.inset,.3));
  assert(blocked(shop.x+2,front,.35));
 });
}

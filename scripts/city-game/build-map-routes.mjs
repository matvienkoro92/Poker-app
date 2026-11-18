// Campaign navigation follows the driving graph used by the 3D city.
import {writeFileSync} from 'node:fs';
import {villaAtlas,mapPercent,missionSites,metroRoute} from './metropolis.mjs';
const routes=missionSites.slice(1).map((to,index)=>{
 const from=missionSites[index];
 return [from,...metroRoute(from,to),to].map(point=>mapPercent(point).map(n=>Number(n.toFixed(3))));
});
writeFileSync(new URL('../../app-city-map-routes.js',import.meta.url),'window.PokerVillaMapPoint='+JSON.stringify([villaAtlas.u/6.4,villaAtlas.v/6.4])+';\nwindow.PokerCityMapRoutes='+JSON.stringify(routes)+';\n');

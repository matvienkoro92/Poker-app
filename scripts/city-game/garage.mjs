function cityLook(G, loadout, stats, transport, upgrades, mobility={}) {
 if(!G.adminTransport(transport))return {...G.savedLoadout(loadout,stats),...(['bicycle','scooter','hoverboard'].includes(transport)?{transport,bicycle:mobility.bicycle?.loadout,scooter:mobility.scooter?.loadout}:{})};
 const look={...G.savedLoadout(loadout,stats),transport};
 for(const kind of G.importedCarUpgradeKinds(transport))look[kind]=upgrades?.[kind]||G.defaults[kind];
 return look;
}

// Read the same saved owner loadout used by the villa. Guest preview uses the club kart.
export async function loadCityGarage(){
 const G=window.PokerGarage,handoff=window.pokerReadCityGarage?.(),auth=window.pokerApiAuthJsonBody?.({action:'get'})||{};
 if(auth.pwaSession||auth.pwaVkSession||auth.initData){try{const base=typeof window.getApiBase==='function'?window.getApiBase():location.origin,r=await fetch(base+'/api/player-hall',{method:'POST',headers:{'Content-Type':'application/json'},cache:'no-store',body:JSON.stringify(auth),signal:AbortSignal.timeout(8000)});if(!r.ok)throw Error('Garage unavailable');const data=await r.json(),hall=data.hall;if(data.ok&&hall?.self&&hall.garage?.loadout){const packet=window.pokerCaptureCityGarage?.(hall);return {look:cityLook(G,hall.garage.loadout,hall.garage.stats||{},hall.selectedTransport,hall.garage.importedCars?.[hall.selectedTransport],hall.garage),source:'saved',hall:{items:hall.items,shelves:hall.shelves,featured:hall.featured},owner:hall.accountId,returnUrl:handoff?.returnUrl||packet?.returnUrl};}throw Error('Own garage not available');}catch(_){if(!handoff){const error=Error('Saved garage unavailable');error.userMessage='Не удалось загрузить вашу машинку. Проверь соединение и повтори загрузку — сохранённый гараж не изменён.';throw error;}}}
 if(handoff)return {look:cityLook(G,handoff.loadout,handoff.stats,handoff.selectedTransport,handoff.importedCar,handoff),source:'villa',hall:handoff.hall,owner:handoff.accountId,returnUrl:handoff.returnUrl};
 return {look:{...G.defaults},source:'preview',owner:null};
}

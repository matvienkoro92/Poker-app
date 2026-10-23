import {botMove} from './bot.mjs';
self.onmessage=({data})=>{try{self.postMessage({id:data.id,move:botMove(data.state,data.level)});}catch{self.postMessage({id:data.id,move:null});}};

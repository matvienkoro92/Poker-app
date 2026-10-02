'use strict';
const http=require('http'),fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'../../public');
http.createServer((req,res)=>{
  const pathname=new URL(req.url,'http://localhost').pathname;
  if(pathname.startsWith('/api/')){res.writeHead(503,{'Content-Type':'application/json'});res.end(JSON.stringify({ok:false,error:'В локальном предпросмотре доступна тренировка. Для топа клуба и онлайн-дуэлей нужен деплой приложения.'}));return;}
  const file=pathname==='/cooler-preview'?path.join(__dirname,'preview.html'):path.resolve(root,'.'+(pathname==='/'?'/index.html':pathname));
  if(!file.startsWith(root+path.sep)&&file!==path.join(__dirname,'preview.html')){res.writeHead(403);res.end();return;}
  fs.readFile(file,(e,data)=>{if(e){res.writeHead(404);res.end();return;}res.setHeader('Content-Type',({'.js':'application/javascript','.html':'text/html','.css':'text/css','.webp':'image/webp','.png':'image/png','.json':'application/json','.svg':'image/svg+xml'})[path.extname(file)]||'application/octet-stream');res.setHeader('Cache-Control','no-store');res.end(data);});
}).listen(4203,'127.0.0.1',()=>console.log('http://127.0.0.1:4203/cooler-preview'));

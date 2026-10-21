'use strict';
const access=require('../tracking-category-access'),redis=require('../redis');
const {resolveTelegramIdentity,memberIdFromIdentity}=require('../resolve-telegram-auth');
const {isAdminIdentity}=require('../api-auth');
const {rateLimit,rejectIfPayloadTooLarge}=require('../api-limits');
module.exports = function(req, res) { return req.method === "GET" ? require("../tracking-read-scope").withReadScope(() => handler(req, res)) : handler(req, res); };
async function handler(req, res) {
 res.setHeader('Cache-Control','no-store, private');res.setHeader('Referrer-Policy','no-referrer');
 if(!['GET','POST'].includes(req.method))return res.status(405).json({ok:false,error:'Метод недоступен'});
 if(rateLimit(req,res,{bucket:'tracking_category_access',limit:90,windowMs:60000}))return;
 if(!redis.isConfigured())return res.status(503).json({ok:false,error:'Сервис временно недоступен'});
 let body={};if(req.method==='POST'){if(rejectIfPayloadTooLarge(req,res,4096))return;try{body=typeof req.body==='string'?JSON.parse(req.body):(req.body||{});}catch(_){return res.status(400).json({ok:false,error:'Некорректный запрос'});}}
 try{
 const token=String(req.headers?.authorization||'').replace(/^Bearer /,'');
 if(token){
  if(req.method!=='GET')return res.status(403).json({ok:false,error:'Доступ только для просмотра'});
  const grant=await access.resolve(token);if(!grant)return res.status(403).json({ok:false,error:'Ссылка доступа недействительна или отозвана'});
  const query=req.query||{};
  if(query.id){
   const link=await access.linkForGrant(query.id,grant);if(!link)return res.status(404).json({ok:false,error:'Ссылка недоступна'});
   if(query.view==='players'){
    const offset=Number(query.offset||0);if(!Number.isInteger(offset)||offset<0||offset>100000)return res.status(400).json({ok:false,error:'Некорректная страница'});
    const snapshot=await require('../tracking-link-snapshot').readLinkSnapshot(link.id),page={rows:JSON.parse(JSON.stringify(snapshot.slice(offset,offset+50))),nextOffset:offset+50<snapshot.length?offset+50:null},milestones=require('../tracking-link-milestones'),group=await milestones.playersGroup(),rows=[];
    for(let i=0;i<page.rows.length;i+=6)await Promise.all(page.rows.slice(i,i+6).map(async row=>{
      let nick=row.accountId?'Игрок':'Гость';if(row.accountId){const profile=await require('../club-social').memberProfile(row.accountId);nick=profile.nick||profile.name||nick;row.level=profile.level;}
      let steps={};try{steps=row.steps?{...row.steps,heroLevel:row.level??null}:await milestones.enrich(link.id,row,group);}catch(_){}
      rows.push({nick,pokerId:steps.pokerId||row.pokerId||'',visitCount:steps.visitCount??null,activityCount:steps.activityCount??null,registered:steps.registered??null,raffleCount:steps.raffleCount??null,spinCount:steps.spinCount??null,heroLevel:steps.heroLevel??null,bot:steps.bot??null,playersChat:steps.playersChat??null,depositCount:steps.depositCount??null,depositAmount:steps.depositAmount??null});
    }));
    if(!await access.resolve(token)||!await access.linkForGrant(link.id,grant))return res.status(403).json({ok:false,error:'Доступ изменён'});
    return res.status(200).json({ok:true,rows,nextOffset:page.nextOffset});
   }
   if(query.view==='summary'){const summary=await require('../tracking-link-summary').readSummary(link.id,0,'');if(!await access.resolve(token)||!await access.linkForGrant(link.id,grant))return res.status(403).json({ok:false,error:'Доступ изменён'});return res.status(200).json({ok:true,summary});}
   return res.status(400).json({ok:false,error:'Неизвестный вид статистики'});
  }
  const links=await access.links(grant);if(!await access.resolve(token))return res.status(403).json({ok:false,error:'Доступ отозван'});
  return res.status(200).json({ok:true,category:grant.category,name:grant.name,links});
 }
 const identity=resolveTelegramIdentity(req,body,process.env.TELEGRAM_BOT_TOKEN||process.env.TELEGRAM_TOKEN||process.env.BOT_TOKEN||''),actor=memberIdFromIdentity(identity);
 if(!identity||!actor||!isAdminIdentity(identity,actor))return res.status(403).json({ok:false,error:'Только администратор'});
 if(req.method==='GET')return res.status(200).json({ok:true,grants:await access.list(String(req.query?.category||'').trim())});
 if(body.action==='create'){const result=await access.create(body.category,body.name,actor);return res.status(200).json({ok:true,...result});}
 if(body.action==='revoke'){await access.revoke(body.id);return res.status(200).json({ok:true});}
 return res.status(400).json({ok:false,error:'Неизвестное действие'});
 }catch(error){return res.status(error.message==='invalid_grant'||error.message==='category_not_found'?400:503).json({ok:false,error:error.message==='category_not_found'?'В категории пока нет ссылок':error.message==='invalid_grant'?'Укажите категорию и имя получателя до 80 символов':'Данные временно недоступны'});}
};

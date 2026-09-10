'use strict';
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
(async()=>{const browser=await chromium.launch();try{
 const page=await browser.newPage({viewport:{width:390,height:700}});
 await page.setContent('<section data-view="club-reviews" class="view--active"><div id="clubReviewsFeedback"></div><div id="clubReviewsContent"></div></section>');
 await page.evaluate(()=>{
  window.calls=[];window.events=[];window.pokerSocialEscape=s=>String(s||'');window.pokerSocialRequestId=()=>Math.random().toString(36);window.pokerApiHasCredential=()=>true;
  window.pokerTrackEngagement=(type,data)=>{events.push({type,...data});return Promise.resolve({ok:true});};
  window.pokerSocialRequest=async(_,body)=>{calls.push(body);return {ok:true,accountId:'ID1',thread:{id:'a'.repeat(24),title:'Question',question:'Long question '.repeat(200),authorName:'Author',version:2,replies:[{id:'r1',authorId:'ID2',authorName:'Other',text:'Answer '.repeat(200),createdAt:new Date().toISOString()},{id:'r2',authorId:'ID1',authorName:'Me',text:'My answer '.repeat(200),createdAt:new Date().toISOString()}],votes:{}}};};
  window.pokerPendingReviewId='a'.repeat(24);
 });
 await page.addScriptTag({path:'app-club-reviews.js'});await page.evaluate(()=>initClubReviews());
 await page.waitForSelector('[data-review-read-id]');await page.waitForTimeout(900);
 assert.equal(await page.evaluate(()=>calls.filter(c=>c.action==='read').length),0,'opening must not mark unseen replies read');
 await page.locator('[data-review-read-id="r1"]').scrollIntoViewIfNeeded();await page.waitForTimeout(1000);
 assert.equal(await page.evaluate(()=>calls.filter(c=>c.action==='read').length),0,'one answer must not clear another');
 assert.equal(await page.evaluate(()=>events.filter(e=>e.type==='review_answer_read').length),1);
 await page.locator('[data-review-read-id="r2"]').scrollIntoViewIfNeeded();await page.waitForTimeout(1000);
 assert.equal(await page.evaluate(()=>calls.filter(c=>c.action==='read').length),1);
 assert.equal(await page.evaluate(()=>events.filter(e=>e.type==='review_answer_read').length),1,'own reply does not count as reading another answer');
 await page.evaluate(()=>{pokerApiHasCredential=()=>false;dispatchEvent(new Event('poker-telegram-auth'));});
 assert.equal(await page.locator('[data-review-read-id]').count(),0);
 console.log('PASS viewport answer receipts, own-answer exclusion, account reset');
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});

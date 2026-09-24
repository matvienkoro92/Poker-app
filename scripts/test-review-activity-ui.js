'use strict';
const { chromium } = require('playwright');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.join(__dirname, '..');
async function main() {
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage();
    const errors = []; page.on('pageerror', error => errors.push(error.message));
    await page.setContent('<main class="view view--active" data-view="club-reviews" style="max-width:960px;margin:auto;padding:12px"><header class="club-reviews-header"><div id="clubReviewsHeaderAction"></div></header><p id="clubReviewsFeedback"></p><div id="clubReviewsLoading" hidden></div><div id="clubReviewsContent"></div></main>');
    await page.addStyleTag({ path: path.join(root, 'styles.css') });
    await page.addStyleTag({ content: 'body{margin:0;background:#070b10;color:#e1e6ed;font-family:Arial,sans-serif}main.view{display:block!important;position:relative!important;visibility:visible!important;overflow:visible!important;height:auto!important;min-height:100vh}.view{transform:none!important}' });
    await page.evaluate(() => {
      window.pokerSocialEscape = text => String(text || '').replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[c]);
      window.pokerApiHasCredential = () => true;
      window.pokerSocialRequestId = () => 'a'.repeat(24);
      window.setView = view => { window.lastView = view; };
      window.fixture = { id:'f'.repeat(24), type:'hand', authorId:'ID999999', authorName:'Игрок', authorNick:'Покерманки',
        title:'Раздача', question:'Как лучше сыграть на тёрне против этого соперника?', gameMode:'cash', bigBlindMinor:4000, totalPotMinor:120000,
        cards:['As','Kh'], handId:'legacy-hand', createdAt:'2026-09-18T10:00:00Z', updatedAt:'2026-09-18T10:00:00Z', context:'Префлоп · Банк: 30 bb\nSB: Вы — Рейз 3 bb\nРивер: Q♣ 9♦ 5♥ 9♥ 7♠ · Банк: 100,5 bb\nBB: Соперник — Колл 70,5 bb',
        replies:[], votes:{fold:0,call:0,raise:0}, following:false, version:0, replyCount:0, unread:true };
      let progress = 3;
      let topicSubscribed=true;
      window.pokerSocialRequest = async (_, body) => {
        if(body.action==='topic-push-status')return {ok:true,subscribed:topicSubscribed,notificationsEnabled:true,hasSubscription:true};
        if(body.action==='topic-push-set'){topicSubscribed=body.enabled;return {ok:true,subscribed:topicSubscribed};}
        if(body.action==='get')await new Promise(resolve=>setTimeout(resolve,80));
        const award = body.action === 'reply' ? { action:true,bonus:0,spin:1 } : null;
        if(award){ progress=0; window.fixture.replies.push({id:'e'.repeat(24),authorId:'ID123456',authorNick:'Ваш ник',authorLevel:4,text:body.text,createdAt:'2026-09-18T11:00:00Z',canDelete:true}); }
        return { ok:true,accountId:'ID123456',threads:[window.fixture],nextCursor:null,thread:window.fixture,activityAward:award,
          activity:{progress,target:5,publicationProgress:progress,commentProgress:progress,ticketProgress:17,ticketTarget:35,ticketAmount:300,bonusEarned:30,spinsAvailable:progress?0:1,spinsEarned:progress?0:1,publicationsToday:3,publicationLimit:7} };
      };
    });
    await page.addScriptTag({ path: path.join(root, 'starting-hands/hand-share.js') });
    await page.addScriptTag({ path: path.join(root, 'app-club-reviews.js') });
    await page.evaluate(() => window.initClubReviews());
    await page.waitForSelector('.review-activity');
    await page.waitForFunction(()=>document.querySelector('.review-topic-push button')?.textContent==='Выкл');
    await page.locator('.review-topic-push button').click();
    await page.waitForFunction(()=>document.querySelector('.review-topic-push button')?.textContent==='Вкл');
    assert.equal(await page.locator('.review-topic').getAttribute('class'),'review-topic review-topic--unread');
    assert.equal((await page.locator('.review-topic__unread-badge').textContent()).trim(),'Есть новый комментарий');
    assert.equal(await page.locator('.review-activity__track .is-filled').count(), 6);
    assert.equal(await page.locator('.review-activity__ticket-track').getAttribute('aria-valuenow'),'17');
    for (const width of [360, 390, 1280]) {
      await page.setViewportSize({width,height:900});
      const overflow=await page.locator('.review-activity').evaluate(el=>el.scrollWidth>el.clientWidth+1);
      assert.equal(overflow,false,'activity panel overflow at '+width);
    }
    await page.locator('[data-review-action="open"]').click();
    await page.waitForSelector('.review-thread-card--loading');
    assert.equal((await page.locator('.review-thread-loading span').textContent()).trim(),'Открываем раздачу…');
    await page.waitForSelector('#reviewReplyForm');
    assert.equal(await page.locator('.review-activity').count(),0,'reward progress is hidden inside a hand');
    assert.equal(await page.locator('.review-thread-card').evaluate(article=>article.lastElementChild.classList.contains('review-share-actions')),true,'share actions are at the bottom of the hand');
    assert.equal((await page.locator('.review-hand-text__final-pot').textContent()).trim(),'Итоговый банк: 100,5 bb');
    assert.match((await page.locator('.review-hand-text__street--preflop').textContent()).replace(/\s+/g,' '),/Банк\s*0 bb/);
    assert.match((await page.locator('.review-hand-text__street--river').textContent()).replace(/\s+/g,' '),/Банк\s*30 bb/);
    for (const width of [320, 360, 390, 430, 1280]) {
      await page.setViewportSize({width,height:900});
      const layout = await page.locator('.review-hand-text__street--river').evaluate(el => {
        const cards = [...el.querySelectorAll('.playing-card')].map(card => card.getBoundingClientRect());
        const board = el.querySelector('.review-hand-text__board').getBoundingClientRect();
        const pot = el.querySelector('.review-hand-text__pot').getBoundingClientRect();
        const lines = [...el.querySelector('.review-hand-text__pot').children].map(line => line.getBoundingClientRect());
        return {count:cards.length,oneRow:cards.every(card=>Math.abs(card.top-cards[0].top)<1),separate:board.right<=pot.left,stacked:lines[1].top>=lines[0].bottom-1,overflow:el.scrollWidth>el.clientWidth+1};
      });
      assert.deepEqual(layout,{count:5,oneRow:true,separate:true,stacked:true,overflow:false},'river layout at '+width);
    }
    const text='На тёрне я бы продолжил небольшим размером, потому что в диапазоне соперника ещё много слабых рук и дро.';
    await page.locator('#reviewReplyForm textarea').fill(text);
    assert.match(await page.locator('#reviewActivityHint').textContent(), /\d+ \/ 20/);
    await page.locator('#reviewReplyForm button[type="submit"]').click();
    assert.match(await page.locator('#clubReviewsFeedback').textContent(), /\+1 крутка/);
    assert.equal(await page.locator('#reviewReplyForm textarea').inputValue(),'');
    await page.locator('[data-review-action="back"]').click();
    await page.waitForSelector('[data-review-action="activity-play"]');
    assert.equal(await page.locator('.review-activity__track .is-filled').count(),0);
    await page.locator('[data-review-action="activity-play"]').click();
    assert.equal(await page.evaluate(()=>window.lastView),'daily-poker');
    await page.setViewportSize({width:390,height:900});
    const output=path.join(root,'output/review-activity');fs.mkdirSync(output,{recursive:true});
    await page.screenshot({path:path.join(output,'mobile.png'),fullPage:true});
    await page.setViewportSize({width:1280,height:900});
    await page.screenshot({path:path.join(output,'desktop.png'),fullPage:true});
    assert.deepEqual(errors,[]);
    const admin=await browser.newPage();admin.on('pageerror',error=>errors.push(error.message));
    await admin.setContent(fs.readFileSync(path.join(root,'html-fragments/admin-bonuses.html'),'utf8'));
    await admin.addStyleTag({path:path.join(root,'styles.css')});
    await admin.addStyleTag({content:'body{background:#070b10;color:#e1e6ed;margin:0}.view{display:block!important;visibility:visible!important;position:relative!important;height:auto!important}'});
    await admin.evaluate(()=>{
      window.getApiBase=()=> 'https://fixture.test';window.pokerApiHasCredential=()=>true;
      window.fetch=async()=>({ok:true,text:async()=>JSON.stringify({ok:true,users:[],total:0,bonusTotals:{totalBalance:900,totalDebited:30},activityTotals:window.hideActivity?{available:false}:{available:true,publicationBonus:300,publications:30,commentBonus:0,comments:40,spinsEarned:10,extraSpinsEarned:1,spinBonus:100,bonusTotal:400,spinsAvailable:3,asOf:'2026-09-18T12:00:00Z'}})});
    });
    await admin.addScriptTag({path:path.join(root,'app-admin-bonuses.js')});
    await admin.evaluate(()=>window.initAdminBonuses());
    await admin.waitForSelector('.admin-bonuses__activity-grid');
    assert.equal(await admin.locator('.admin-bonuses__activity-grid > div').count(),6);
    assert.match(await admin.locator('#adminBonusesActivityTotals').textContent(),/40 зачтённых/);
    for(const width of [360,1280]){
      await admin.setViewportSize({width,height:900});
      assert.equal(await admin.locator('#adminBonusesActivityTotals').evaluate(el=>el.scrollWidth>el.clientWidth+1),false);
      await admin.locator('#adminBonusesActivityTotals').screenshot({path:path.join(output,'admin-'+width+'.png')});
    }
    await admin.evaluate(()=>{window.hideActivity=true;window.initAdminBonuses();});
    await admin.waitForFunction(()=>document.getElementById('adminBonusesActivityTotals').textContent.includes('недоступны'));
    assert.deepEqual(errors,[]);
    await admin.close();
    console.log('Review rewards UI: 360/390/1280px, progress 6→0, spin earned, reply counter, feedback and play navigation passed.');
    console.log('Admin totals: all six counters, mobile/desktop layout and unavailable-not-zero state passed.');
  } finally { await browser.close(); }
}
main().catch(error=>{console.error(error);process.exitCode=1;});

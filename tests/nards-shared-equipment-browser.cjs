const root = require("path").resolve(__dirname, ".."), { chromium } = require(root + "/node_modules/playwright"), fs = require("fs"), path = require("path"), assert = require("assert/strict"), wizard = require(root + "/tests/helpers/board-wizard.cjs"), clean = require(root + "/lib/board-games-room").cleanEquipment;
(async () => {
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } }), errors = [];
    let equipment = clean({ nardsInterior: "manki-villa", nardsBoard: "compass", checkers: "jade", nardsRailsHidden: true, nardsWells: true, nardsHome: "none" }, 80);
    page.on("pageerror", (e) => errors.push(e.message));
    await page.route("http://nards.test/**", (r) => {
      const url = new URL(r.request().url());
      if (url.pathname === "/api/billiards") return r.fulfill({ json: { ok: true, allowed: true } });
      if (url.pathname === "/api/board-games") {
        const body = r.request().postDataJSON();
        if (body.action === "equipment") equipment = clean(body.equipment, 80);
        return r.fulfill({ json: { ok: true, allowed: true, equipment, level: 80 } });
      }
      const file = path.join(root, url.pathname);
      if (fs.existsSync(file) && fs.statSync(file).isFile()) return r.fulfill({ path: file });
      return r.fulfill({ contentType: "text/html", body: '<!doctype html><meta charset="utf-8"><div class="living-top-board" style="width:370px" id="preview"></div>' });
    });
    await page.goto("http://nards.test/fixture");
    await page.addStyleTag({ url: "/styles-player-hall.css" });
    await page.addScriptTag({ url: "/app-living-board-preview.js" });
    await page.evaluate(async (eq) => {
      await PokerLivingBoardPreview.preload("nards", eq);
      PokerLivingBoardPreview.paint(document.querySelector("#preview"), "nards", eq);
    }, equipment);
    await page.waitForFunction(() => [...document.querySelectorAll(".living-nards-shared-render")].every((h) => h.shadowRoot.querySelector(".checker:not(.black)")));
    let signature = await page.locator(".living-nards-front .living-nards-shared-render").evaluate((h) => {
      const s = h.shadowRoot, f = s.querySelector(".nards-board"), t = s.querySelector(".nards-table");
      return { checkers: f.dataset.checkers, inside: f.dataset.interior, rails: t.dataset.railsHidden, hasInnerRail: !!s.querySelector(".nards-carved-rail"), wellDisplay: getComputedStyle(s.querySelector(".point"), "::after").display, checker: getComputedStyle(s.querySelector(".checker:not(.black)")).backgroundImage, homes: t.dataset.homes };
    });
    assert.equal(signature.rails, "true");
    assert.equal(signature.hasInnerRail, false);
    assert.equal(signature.wellDisplay, "none");
    assert.equal(signature.homes, "none");
    fs.mkdirSync(root + "/output/nards-shared-equipment", { recursive: true });
    await page.screenshot({ path: root + "/output/nards-shared-equipment/villa.png" });
    await page.evaluate(() => PokerLivingBoardPreview.setClosed(document.querySelector("#preview"), true));
    assert.equal(await page.locator("#preview").getAttribute("data-closed"), "true");
    await page.evaluate((eq) => {
      PokerLivingBoardPreview.setClosed(document.querySelector("#preview"), false);
      PokerLivingBoardPreview.paint(document.querySelector("#preview"), "nards", { ...eq, nardsRailsHidden: false, nardsWells: false, nardsRailTop: "wave", nardsHome: "round", checkers: "marble" });
    }, equipment);
    assert.equal(await page.locator(".living-nards-front .living-nards-shared-render").evaluate((h) => h.shadowRoot.querySelector(".nards-table").dataset.railTop), "wave");
    assert.equal(await page.locator(".living-nards-front .living-nards-shared-render").evaluate((h) => h.shadowRoot.querySelector(".nards-board").dataset.checkers), "marble");
    await page.goto("http://nards.test/board-games-play.html?game=long&family=nards&equipment=1");
    await page.locator("#equipment[open]").waitFor();
    await page.locator("[data-nards-tab=inside]").click();
    await page.locator("[data-nards-inner-tab=carving]").click();
    await page.locator("#nardsRailsHide").click();
    await page.locator("#nardsRailsHide").click();
    await Promise.all([page.waitForURL("http://nards.test/"), page.locator("#saveEquipment").click()]);
    await page.goto("http://nards.test/board-games-play.html?game=long&family=nards");
    await page.locator("#lobby:visible").waitFor();
    await wizard.launch(page, "training");
    await page.locator("#nardsBoard .checker").first().waitFor();
    const live = await page.locator("#nardsBoard").evaluate((f) => ({ checkers: f.dataset.checkers, inside: f.dataset.interior, rails: f.parentElement.dataset.railsHidden, hasInnerRail: !!f.querySelector(".nards-carved-rail"), wellDisplay: getComputedStyle(f.querySelector(".point"), "::after").display, checker: getComputedStyle(f.querySelector(".checker:not(.black)")).backgroundImage, homes: f.parentElement.dataset.homes }));
    assert.deepEqual(live, signature);
    const brightness=page.locator("#nardsBrightness");
    const brightnessButton=page.locator("#nardsBrightnessButton");
    const boardBefore=await page.locator("#nardsFrame").boundingBox();
    assert.equal(await brightness.isVisible(),false);
    await brightnessButton.click();
    await brightness.waitFor({state:"visible"});
    assert.deepEqual(await page.locator("#nardsFrame").boundingBox(),boardBefore);
    const popup=await page.locator("#nardsBrightnessControl").boundingBox();
    const button=await brightnessButton.boundingBox();
    assert.ok(popup.y>=button.y+button.height&&popup.y<button.y+button.height+32);
    const pointBrightness=page.locator("#nardsPointBrightness");
    assert.equal(await pointBrightness.isDisabled(),true);
    assert.equal(await brightness.inputValue(),"80");
    await brightness.press("ArrowLeft");
    assert.equal(await page.locator("#nardsBrightnessValue").textContent(),"75%");
    assert.equal(await page.locator("#nardsBoard .nards-half-art").first().evaluate(el=>getComputedStyle(el).filter),"brightness(0.75)");
    await page.screenshot({ path: root + "/output/nards-shared-equipment/game.png" });
    await brightness.press("Escape");
    assert.equal(await brightness.isVisible(),false);
    assert.equal(await brightnessButton.getAttribute("aria-expanded"),"false");
    equipment=clean({...equipment,nardsInterior:"classic"},80);
    await page.reload();
    assert.equal(await brightness.inputValue(),"75");
    await page.locator("#lobby:visible").waitFor();
    await wizard.launch(page,"training");
    await brightnessButton.click();
    assert.equal(await pointBrightness.isEnabled(),true);
    await pointBrightness.press("Home");
    assert.equal(await page.locator("#nardsPointBrightnessValue").textContent(),"0%");
    assert.equal(await page.locator("#nardsBoard .nards-point-blade").first().evaluate(el=>getComputedStyle(el).opacity),"0");
    await page.screenshot({path:"/tmp/nards-two-brightness-sliders.png"});
    await page.reload();
    assert.equal(await pointBrightness.inputValue(),"0");
    assert.deepEqual(errors, []);
    console.log("PASS villa and game share saved interior/checkers/carving/cells/hidden homes; changes repaint; folding works.");
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});

const { test } = require("playwright/test");

test("measure shared app section widths", async ({ page }) => {
  await page.setViewportSize({ width: 498, height: 900 });
  await page.goto("http://localhost:4173", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(900);

  async function activate(view) {
    if (view !== "home") {
      await page.evaluate((target) => {
        const direct = document.querySelector(`[data-view-target="${target}"]`);
        if (direct) direct.click();
      }, view);
      await page.waitForFunction(
        (target) => document.body.dataset.view === target && document.querySelector(`.view--active[data-view="${target}"]`),
        view,
        { timeout: 7000 }
      );
      await page.waitForTimeout(view === "raffles" ? 1200 : 400);
    }

    return page.evaluate(() => {
      const pick = (selector) => document.querySelector(selector);
      const readRect = (el) => {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return {
          left: Math.round(r.left * 10) / 10,
          right: Math.round(r.right * 10) / 10,
          width: Math.round(r.width * 10) / 10,
        };
      };
      const readStyle = (el) => {
        if (!el) return null;
        const s = getComputedStyle(el);
        return {
          paddingLeft: s.paddingLeft,
          paddingRight: s.paddingRight,
          marginLeft: s.marginLeft,
          marginRight: s.marginRight,
          maxWidth: s.maxWidth,
          width: s.width,
        };
      };
      const view = pick(".view--active");
      const primary =
        pick(".view--active .raffles-hero") ||
        pick(".view--active .daily-poker") ||
        pick('.view--active[data-view="equilator"]') ||
        view;
      return {
        bodyView: document.body.dataset.view,
        activeView: view && view.dataset.view,
        card: readRect(pick("#app.app .card")),
        content: readRect(pick("#app.app .card .card__content")),
        view: readRect(view),
        primary: readRect(primary),
        contentStyle: readStyle(pick("#app.app .card .card__content")),
        viewStyle: readStyle(view),
        primaryStyle: readStyle(primary),
      };
    });
  }

  const result = {};
  for (const view of ["home", "raffles", "equilator", "daily-poker"]) {
    result[view] = await activate(view);
    if (view !== "daily-poker") {
      await page.evaluate(() => document.querySelector('[data-view-target="home"]')?.click());
      await page.waitForFunction(() => document.body.dataset.view === "home", null, { timeout: 5000 });
      await page.waitForTimeout(200);
    }
  }

  console.log(JSON.stringify(result, null, 2));
});

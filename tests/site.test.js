const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");

function read(rel) {
  return fs.readFileSync(path.join(root, rel), "utf8");
}

function loadData() {
  const context = { window: {}, console };
  vm.createContext(context);
  vm.runInContext(read("data/coffees.js"), context, { filename: "coffees.js" });
  return context.window.COFFEE_DATA;
}

function loadAppApi() {
  const context = { window: {}, console };
  vm.createContext(context);
  vm.runInContext(read("data/coffees.js"), context, { filename: "coffees.js" });
  vm.runInContext(read("app.js"), context, { filename: "app.js" });
  return context.window.COFFEE_APP;
}

function test(name, fn) {
  try {
    fn();
    console.log(`ok - ${name}`);
  } catch (error) {
    console.error(`not ok - ${name}`);
    throw error;
  }
}

test("static pages exist", () => {
  ["index.html", "coffees.html", "detail.html", "basics.html", "ratios.html", "faq.html", "styles.css", "app.js", "data/coffees.js"].forEach((file) => {
    assert.ok(fs.existsSync(path.join(root, file)), `${file} should exist`);
  });
});

test("home hero does not include the removed theme kicker", () => {
  const app = read("app.js");
  assert.ok(!app.includes("牛奶色与咖啡色的新手指南"));
  assert.ok(!app.includes("A milk-and-coffee toned beginner guide"));
});

test("coffee catalog has expanded bilingual content, matched photos, text steps, and split cafe references", () => {
  const coffees = loadData();
  assert.ok(Array.isArray(coffees));
  assert.ok(coffees.length >= 26, "expected at least 26 coffees");
  assert.ok(coffees.some((coffee) => coffee.id === "spanish-latte"), "Spanish latte is required");
  assert.ok(!coffees.some((coffee) => coffee.id === "french-press"), "French press should be removed");

  coffees.forEach((coffee) => {
    assert.ok(coffee.name.zh && coffee.name.en, `${coffee.id} needs bilingual names`);
    assert.ok(coffee.summary.zh.length >= 70 && coffee.summary.en.length >= 110, `${coffee.id} needs expanded bilingual summary`);
    assert.ok(coffee.origin.zh.length >= 55 && coffee.origin.en.length >= 90, `${coffee.id} needs expanded bilingual origin`);
    assert.ok(coffee.flavor.zh.length >= 50 && coffee.flavor.en.length >= 80, `${coffee.id} needs expanded bilingual flavor`);
    assert.ok(coffee.tips.zh.length >= 45 && coffee.tips.en.length >= 75, `${coffee.id} needs expanded bilingual tips`);
    assert.ok(coffee.ratio.zh && coffee.ratio.en, `${coffee.id} needs bilingual ratio`);
    assert.ok(coffee.composition, `${coffee.id} needs composition data`);
    assert.ok(typeof coffee.composition.volume === "number" && coffee.composition.volume > 0, `${coffee.id} needs a positive composition volume`);
    assert.ok(Array.isArray(coffee.composition.layers) && coffee.composition.layers.length >= 1, `${coffee.id} needs composition layers`);
    const totalPercent = coffee.composition.layers.reduce((sum, layer) => sum + layer.percent, 0);
    assert.ok(totalPercent >= 98 && totalPercent <= 102, `${coffee.id} composition total should be close to 100`);
    coffee.composition.layers.forEach((layer) => {
      assert.ok(layer.label.zh && layer.label.en, `${coffee.id} composition layer needs bilingual label`);
      assert.ok(typeof layer.percent === "number" && layer.percent > 0, `${coffee.id} composition layer needs a positive percent`);
      assert.ok(/^#[0-9a-f]{6}$/i.test(layer.color), `${coffee.id} composition layer needs a hex color`);
    });
    assert.ok(coffee.steps.zh.length >= 3 && coffee.steps.en.length >= 3, `${coffee.id} needs bilingual steps`);
    assert.ok(coffee.photos.length >= 2 && coffee.photos.length <= 3, `${coffee.id} needs 2-3 photos`);
    assert.ok(coffee.notableCafes.domestic.length >= 1 && coffee.notableCafes.domestic.length <= 2, `${coffee.id} needs 1-2 domestic cafe references`);
    assert.ok(coffee.notableCafes.international.length >= 1 && coffee.notableCafes.international.length <= 2, `${coffee.id} needs 1-2 international cafe references`);
    coffee.photos.forEach((photo) => {
      assert.ok(photo.src.startsWith(`assets/coffee/${coffee.id}-`), `${coffee.id} photo should use a local replaceable slot`);
      assert.ok(photo.src.endsWith(".jpg"), `${coffee.id} photo slot should be a jpg path`);
      assert.ok(photo.alt.zh && photo.alt.en, `${coffee.id} photo needs bilingual alt`);
      assert.strictEqual(photo.sourceUrl, photo.src, `${coffee.id} photo source should point to the same local slot`);
      assert.ok(Array.isArray(photo.matchTags) && photo.matchTags.length > 0, `${coffee.id} photo needs match tags`);
      assert.strictEqual(photo.match, coffee.id, `${coffee.id} photo should be explicitly matched`);
    });
    [...coffee.notableCafes.domestic, ...coffee.notableCafes.international].forEach((cafe) => {
      assert.ok(cafe.name && cafe.city && cafe.country, `${coffee.id} cafe needs location`);
      assert.ok(cafe.why.zh && cafe.why.en, `${coffee.id} cafe needs bilingual reason`);
      assert.ok(cafe.sourceUrl.startsWith("https://"), `${coffee.id} cafe source is required`);
    });
  });
});

test("composition volumes reflect small and large drink sizes", () => {
  const coffees = loadData();
  const byId = Object.fromEntries(coffees.map((coffee) => [coffee.id, coffee]));
  assert.strictEqual(byId.espresso.composition.volume, 18, "single espresso should be an 18g beverage");
  assert.ok(byId.espresso.ratio.zh.includes("9g 咖啡粉萃取 18g 咖啡液"), "single espresso ratio should use 9g in to 18g out");
  assert.ok(byId.espresso.ratio.en.includes("9g coffee to 18g beverage"), "English espresso ratio should use 9g in to 18g out");
  assert.strictEqual(byId.doppio.composition.volume, 36, "doppio should remain a larger double espresso beverage");
  assert.ok(byId.espresso.composition.volume < byId.latte.composition.volume, "espresso should render smaller than latte");
  assert.ok(byId.espresso.composition.volume < byId.doppio.composition.volume, "espresso should be smaller than doppio");
  assert.ok(byId.doppio.composition.volume < byId.latte.composition.volume, "doppio should render smaller than latte");
  assert.ok(byId.macchiato.composition.volume < byId.americano.composition.volume, "macchiato should render smaller than americano");
});

test("generated step visual references are removed from app-owned files", () => {
  const removedTokens = ["step" + "Visual", "step" + "-visual", "assets/" + "steps"];
  ["app.js", "styles.css", "tests/site.test.js"].forEach((file) => {
    const source = read(file);
    removedTokens.forEach((token) => {
      assert.ok(!source.includes(token), `${file} should not reference generated step visuals`);
    });
  });
  assert.ok(!fs.existsSync(path.join(root, "assets", "steps")), "generated step image directory should be removed");
});

test("daily coffee is stable for a date and changes across dates", () => {
  const api = loadAppApi();
  const first = api.getDailyCoffeeId("2026-05-30");
  const second = api.getDailyCoffeeId("2026-05-30");
  assert.strictEqual(first, second);
  assert.notStrictEqual(first, api.getDailyCoffeeId("2026-05-31"));
  const app = read("app.js");
  assert.ok(app.includes('class="daily-cup-link"'), "daily coffee should show a linked hand-drawn cup");
  assert.ok(app.includes("compositionHero(daily)"), "daily coffee should use the hand-drawn cup visual");
});

test("coffee types page uses image-first cards without descriptions", () => {
  const app = read("app.js");
  assert.ok(app.includes('searchPanel("coffee")'), "coffee page should use coffee-only search controls");
  assert.ok(app.includes("renderCoffeeDirectory()"), "coffee page should render one dedicated coffee directory");
  assert.ok(app.includes("image-card"), "compact coffee cards should have a dedicated class");
  assert.ok(app.includes("compositionMini(coffee)"), "coffee page cards should use a mini hand-drawn composition visual");
  assert.ok(app.includes("${imageOnly ? \"\" : `<p>${text(coffee.summary, currentLang)}</p>`}"), "summary should be omitted in image mode");
  assert.ok(app.includes('mode === "coffee" ? ["all", "black", "milk", "iced", "dessert", "special"]'), "coffee page filters should exclude basics and problems");
  assert.ok(app.includes('const results = mode === "coffee" ? "" : `<div id="search-results" class="result-grid"></div>`;'), "coffee page should not render a duplicate search-results list");
});

test("home featured coffee cards use hand-drawn visuals", () => {
  const app = read("app.js");
  assert.ok(app.includes("featured.map((coffee) => coffeeCard(coffee, true))"), "home featured coffees should use hand-drawn image cards");
});

test("detail pages render the full hand-drawn composition analysis", () => {
  const app = read("app.js");
  assert.ok(app.includes("function compositionVisual"), "full composition renderer should exist");
  assert.ok(app.includes("function compositionMini"), "mini composition renderer should exist");
  assert.ok(app.includes("function compositionHero"), "detail hero cup renderer should exist");
  assert.ok(app.includes("compositionVisual(coffee)"), "detail page should render composition visual");
  assert.ok(app.includes("compositionHero(coffee)"), "detail page hero should use the hand-drawn cup");
  assert.ok(!app.includes("imageTag(coffee.photos[0])"), "detail page hero should not use the replaceable photo slot");
  assert.ok(!app.includes("<h2>${ui[currentLang].photos}</h2>"), "detail photo section should be removed");
  assert.ok(!app.includes("photo-grid"), "detail photo grid should be removed");
  assert.ok(app.includes("composition-layers"), "composition analysis should include layer bars");
  assert.ok(app.includes("<svg"), "composition cup should render as inline SVG");
  assert.ok(app.includes("cup-rim"), "SVG cup should include a rim");
  assert.ok(app.includes("cup-outline"), "SVG cup should include a glass outline");
  assert.ok(app.includes("liquid-surface"), "SVG cup should include liquid surface curves");
  assert.ok(app.includes("layerPath("), "SVG layers should be generated as cup-shaped paths");
  assert.ok(app.includes("layerTextColor("), "SVG labels should choose readable colors");
  assert.ok(app.includes("function cupWidth"), "cup width should be calculated by display mode");
  assert.ok(app.includes("return compact ? 150 : 320;"), "cups should keep a consistent display size");
  assert.ok(app.includes("function cupCapacity"), "small drink cup capacity should be separated from drink volume");
  assert.ok(app.includes("function cupGeometry"), "cup geometry should vary by capacity");
  assert.ok(app.includes("fullVisualHeight / 2"), "130ml cups should be half the visible height of 260ml cups");
  assert.ok(app.includes("cupGlass(coffee)"), "glass outline should be generated from cup geometry");
  assert.ok(app.includes("function liquidFillRatio"), "drink volume should affect liquid fill height");
  assert.ok(app.includes("< 100 ? 130 : 260"), "small drinks should be drawn in a 130ml cup capacity");
  assert.ok(app.includes("volume / cupCapacity(coffee)"), "liquid fill should be calculated against the cup capacity");
  assert.ok(app.includes("--cup-width:${cupWidth(coffee, compact)}px"), "cup width should be written into each cup");
  assert.ok((app.match(/<rect x=/g) || []).length >= 7, "iced drinks should draw several ice cubes");
  assert.ok(app.includes("gelato-scoop"), "gelato drinks should have a shaped ice cream scoop");
  assert.ok(!app.includes("cream-swirl"), "cream should render as a layer, not a whipped cream mound");

  const styles = read("styles.css");
  assert.ok(styles.includes(".cup-svg"), "SVG cup should have layout styles");
  assert.ok(styles.includes(".detail-cup-hero"), "detail hero cup should have dedicated styles");
  assert.ok(styles.includes("--cup-scale"), "SVG cup should keep the scale hook available");
  assert.ok(styles.includes("--cup-width"), "cup display width should be controlled by a fixed mode variable");
  assert.ok(styles.includes(".cup-outline"), "glass outline should be styled");
  assert.ok(styles.includes(".liquid-surface"), "liquid surface should be styled");
  assert.ok(styles.includes(".espresso-drizzle"), "affogato should include espresso drizzle styling");
  assert.ok(!styles.includes(".cream-swirl"), "cream mound styling should be removed");
});

test("coffee type cup visuals link to detail pages", () => {
  const app = read("app.js");
  assert.ok(app.includes('class="composition-link"'), "mini cup should be wrapped in a link");
  assert.ok(app.includes('href="detail.html?id=${coffee.id}"'), "mini cup link should point to the coffee detail page");
});

test("coffee search results are image-first and summary-free", () => {
  const app = read("app.js");
  assert.ok(app.includes('class="result-card coffee-result"'), "coffee search results should use image-first cards");
  assert.ok(app.includes("compositionMini(result.coffee)"), "coffee search results should use hand-drawn cup visuals");
  assert.ok(!app.includes("const photo = result.coffee.photos[0];"), "coffee search results should not use photo placeholders");
  assert.ok(app.includes("placeholder.svg"), "missing local images should fall back to a placeholder");
  assert.ok(app.includes("onerror=\"this.onerror=null;this.src='${placeholderImage}';\""), "images should have a fallback handler");
  assert.ok(app.includes('${text(result.coffee.categoryName, currentLang)}'), "coffee search results should show the coffee category");
  assert.ok(app.includes('${text(result.coffee.name, currentLang)}'), "coffee search results should show the coffee name");
  assert.ok(!app.includes("text(result.coffee.summary, currentLang)"), "coffee search results should not render summaries");
});

test("search can find coffee, domestic cafe, flavor, and bilingual terms", () => {
  const api = loadAppApi();
  assert.ok(api.searchCatalog("Spanish Latte", "all", "zh").some((item) => item.id === "spanish-latte"));
  assert.ok(api.searchCatalog("Spanish Latte", "all", "en").some((item) => item.id === "spanish-latte"));
  assert.ok(api.searchCatalog("Shanghai", "all", "en").some((item) => item.type === "cafe"));
  assert.ok(api.searchCatalog("chocolate", "all", "en").some((item) => item.id === "mocha"));
});

test("coffee directory search excludes knowledge, faq, and cafe result rendering", () => {
  const app = read("app.js");
  const renderCoffeeDirectoryStart = app.indexOf("function renderCoffeeDirectory()");
  const renderCoffeesStart = app.indexOf("function renderCoffees()");
  assert.ok(renderCoffeeDirectoryStart > -1, "coffee directory renderer should exist");
  assert.ok(renderCoffeesStart > -1, "coffee page renderer should exist");

  const directorySource = app.slice(renderCoffeeDirectoryStart, renderCoffeesStart);
  assert.ok(directorySource.includes("searchCoffees(currentQuery, currentFilter)"), "coffee directory should search only coffees");
  assert.ok(!directorySource.includes("searchCatalog("), "coffee directory should not use full-site search");
  assert.ok(!directorySource.includes("result-card"), "coffee directory should not render full-site result cards");
  assert.ok(!directorySource.includes("knowledgeType"), "coffee directory should not render knowledge results");
  assert.ok(!directorySource.includes("faqType"), "coffee directory should not render FAQ results");
  assert.ok(!directorySource.includes("cafeType"), "coffee directory should not render cafe results");
});

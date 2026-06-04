(function () {
  const coffees = window.COFFEE_DATA || [];
  const languageStorageKey = "barista-guide-language";
  let currentLang = readStoredLanguage();
  let currentFilter = "all";
  let currentQuery = "";
  const placeholderImage = "assets/coffee/placeholder.svg";

  const ui = {
    zh: {
      home: "首页",
      coffees: "咖啡种类",
      basics: "基础知识",
      ratios: "配比速查",
      faq: "常见问题",
      daily: "今日咖啡",
      dailyText: "每天为你固定推荐一款，适合慢慢建立自己的咖啡地图。",
      viewRecipe: "查看做法",
      searchPlaceholder: "搜索咖啡、风味、原料、城市或咖啡店",
      all: "全部",
      noResults: "没有找到结果。试试清空搜索或换一个关键词。",
      reset: "清空搜索",
      coffeeType: "咖啡",
      cafeType: "咖啡店",
      knowledgeType: "基础知识",
      faqType: "FAQ",
      intro: "简介",
      origin: "起源",
      flavor: "特点",
      ingredients: "原材料",
      ratio: "推荐配比",
      steps: "制作步骤",
      tips: "新手提示",
      photos: "照片",
      cafesTitle: "全球知名咖啡店参考",
      domesticCafes: "中国大陆参考",
      internationalCafes: "国外参考",
      source: "来源",
      learningPath: "新手学习路径",
      featured: "热门咖啡",
    },
    en: {
      home: "Home",
      coffees: "Coffee Types",
      basics: "Basics",
      ratios: "Ratio Guide",
      faq: "FAQ",
      daily: "Coffee of the Day",
      dailyText: "A stable daily pick to help you build your own coffee map.",
      viewRecipe: "View recipe",
      searchPlaceholder: "Search coffee, flavor, ingredient, city, or cafe",
      all: "All",
      noResults: "No results. Clear the search or try another keyword.",
      reset: "Reset search",
      coffeeType: "Coffee",
      cafeType: "Cafe",
      knowledgeType: "Basics",
      faqType: "FAQ",
      intro: "Overview",
      origin: "Origin",
      flavor: "Flavor",
      ingredients: "Ingredients",
      ratio: "Suggested ratio",
      steps: "Steps",
      tips: "Beginner tip",
      photos: "Photos",
      cafesTitle: "Notable cafe references",
      domesticCafes: "Mainland China references",
      internationalCafes: "International references",
      source: "Source",
      learningPath: "Beginner learning path",
      featured: "Featured coffees",
    },
  };

  const categoryLabels = {
    all: { zh: "全部", en: "All" },
    black: { zh: "黑咖", en: "Black coffee" },
    milk: { zh: "奶咖", en: "Milk coffee" },
    iced: { zh: "冰咖", en: "Iced coffee" },
    dessert: { zh: "甜品/酒咖", en: "Dessert / spirited" },
    special: { zh: "特色奶咖", en: "Signature milk coffee" },
    basics: { zh: "器具基础", en: "Brewing basics" },
    problems: { zh: "制作问题", en: "Troubleshooting" },
  };

  const basics = [
    {
      id: "gear",
      category: "basics",
      title: { zh: "器具入门", en: "Gear basics" },
      body: {
        zh: "新手优先准备电子秤、磨豆机、温度可控的水壶和稳定的冲煮器具。意式咖啡需要咖啡机，手冲更适合低成本开始。",
        en: "Start with a scale, grinder, temperature-aware kettle, and a stable brewer. Espresso needs a machine; pour over is an easier low-cost start.",
      },
    },
    {
      id: "grind",
      category: "basics",
      title: { zh: "研磨与萃取", en: "Grind and extraction" },
      body: {
        zh: "研磨越细，水流越慢，萃取越强。酸尖通常意味着萃取不足，苦涩干通常意味着萃取过度。",
        en: "Finer grind slows water and increases extraction. Sharp sourness often means under-extraction; dry bitterness often means over-extraction.",
      },
    },
    {
      id: "milk",
      category: "basics",
      title: { zh: "奶泡基础", en: "Milk texture" },
      body: {
        zh: "拿铁需要细腻薄奶泡，卡布奇诺需要更厚但仍细腻的泡沫。牛奶 55-65 摄氏度通常更甜。",
        en: "Latte needs thin silky foam; cappuccino needs thicker but still fine foam. Milk is usually sweetest around 55-65 C.",
      },
    },
  ];

  const faqs = [
    {
      id: "sour",
      category: "problems",
      title: { zh: "为什么咖啡很酸？", en: "Why is my coffee very sour?" },
      body: {
        zh: "常见原因是研磨太粗、水温偏低、萃取时间太短。先把研磨调细一点，或延长萃取。",
        en: "Common causes are too coarse a grind, low water temperature, or short extraction. Try grinding finer or extracting longer.",
      },
    },
    {
      id: "bitter",
      category: "problems",
      title: { zh: "为什么咖啡很苦？", en: "Why is my coffee bitter?" },
      body: {
        zh: "可能是研磨太细、萃取太久、水温过高或豆子太深烘。先缩短萃取或调粗研磨。",
        en: "It may be too fine a grind, long extraction, high water temperature, or dark roast. Shorten extraction or grind coarser first.",
      },
    },
    {
      id: "weak",
      category: "problems",
      title: { zh: "为什么奶咖没有咖啡味？", en: "Why does my milk coffee taste weak?" },
      body: {
        zh: "常见原因是牛奶太多或浓缩太淡。先减少牛奶，或用双份浓缩作为基底。",
        en: "Usually there is too much milk or the espresso is weak. Reduce milk first, or use a double shot as the base.",
      },
    },
  ];

  function localDateString(date) {
    const d = date ? new Date(date) : new Date();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${d.getFullYear()}-${month}-${day}`;
  }

  function dateIndex(dateString) {
    let total = 0;
    for (let i = 0; i < dateString.length; i += 1) total += dateString.charCodeAt(i) * (i + 3);
    return total % coffees.length;
  }

  function getDailyCoffeeId(dateString) {
    return coffees[dateIndex(dateString || localDateString())].id;
  }

  function readStoredLanguage() {
    let stored = "";
    try {
      stored = window.localStorage && window.localStorage.getItem(languageStorageKey);
    } catch (error) {
      stored = "";
    }
    if (stored === "en" || stored === "zh") return stored;
    if (typeof document === "undefined") return "zh";
    const match = document.cookie.match(new RegExp(`(?:^|; )${languageStorageKey}=([^;]*)`));
    stored = match ? decodeURIComponent(match[1]) : "";
    return stored === "en" || stored === "zh" ? stored : "zh";
  }

  function storeLanguage(lang) {
    try {
      if (window.localStorage) window.localStorage.setItem(languageStorageKey, lang);
    } catch (error) {
      // Language persistence is optional; rendering still works if storage is blocked.
    }
    if (typeof document !== "undefined") document.cookie = `${languageStorageKey}=${encodeURIComponent(lang)}; path=/; max-age=31536000; SameSite=Lax`;
  }

  function text(value, lang) {
    if (!value) return "";
    return value[lang] || value.zh || value.en || "";
  }

  function cafeLocation(cafe) {
    return `${cafe.city}, ${cafe.country}`;
  }

  function imageTag(photo) {
    return `<img src="${photo.src}" alt="${text(photo.alt, currentLang)}" loading="lazy" onerror="this.onerror=null;this.src='${placeholderImage}';">`;
  }

  function coffeeSearchText(coffee) {
    return [
      coffee.id,
      text(coffee.name, "zh"),
      text(coffee.name, "en"),
      text(coffee.categoryName, "zh"),
      text(coffee.categoryName, "en"),
      text(coffee.summary, "zh"),
      text(coffee.summary, "en"),
      text(coffee.flavor, "zh"),
      text(coffee.flavor, "en"),
      text(coffee.ingredients, "zh"),
      text(coffee.ingredients, "en"),
      text(coffee.ratio, "zh"),
      text(coffee.ratio, "en"),
      coffee.steps.zh.join(" "),
      coffee.steps.en.join(" "),
      coffee.tags.join(" "),
      cafeList(coffee).map((cafe) => `${cafe.name} ${cafe.city} ${cafe.country} ${text(cafe.why, "zh")} ${text(cafe.why, "en")}`).join(" "),
    ].join(" ").toLowerCase();
  }

  function searchCatalog(query, filter, lang) {
    const q = (query || "").trim().toLowerCase();
    const selected = filter || "all";
    const results = [];

    coffees.forEach((coffee) => {
      const categoryMatch = selected === "all" || coffee.category === selected;
      const queryMatch = !q || coffeeSearchText(coffee).includes(q);
      if (categoryMatch && queryMatch) {
        results.push({ type: "coffee", id: coffee.id, coffee });
      }

      cafeList(coffee).forEach((cafe) => {
        const cafeText = `${cafe.name} ${cafe.city} ${cafe.country} ${text(cafe.why, "zh")} ${text(cafe.why, "en")} ${text(coffee.name, "zh")} ${text(coffee.name, "en")}`.toLowerCase();
        if ((selected === "all" || selected === coffee.category) && q && cafeText.includes(q)) {
          results.push({ type: "cafe", id: `${coffee.id}-${cafe.name}`, coffee, cafe });
        }
      });
    });

    basics.forEach((item) => {
      const itemText = `${text(item.title, "zh")} ${text(item.title, "en")} ${text(item.body, "zh")} ${text(item.body, "en")}`.toLowerCase();
      if ((selected === "all" || selected === "basics") && (!q || itemText.includes(q))) results.push({ type: "knowledge", id: item.id, item });
    });

    faqs.forEach((item) => {
      const itemText = `${text(item.title, "zh")} ${text(item.title, "en")} ${text(item.body, "zh")} ${text(item.body, "en")}`.toLowerCase();
      if ((selected === "all" || selected === "problems") && (!q || itemText.includes(q))) results.push({ type: "faq", id: item.id, item });
    });

    return results;
  }

  function searchCoffees(query, filter) {
    const q = (query || "").trim().toLowerCase();
    const selected = filter || "all";
    return coffees.filter((coffee) => {
      const categoryMatch = selected === "all" || coffee.category === selected;
      const queryMatch = !q || coffeeSearchText(coffee).includes(q);
      return categoryMatch && queryMatch;
    });
  }

  window.COFFEE_APP = { getDailyCoffeeId, searchCatalog, basics, faqs };

  if (typeof document === "undefined") return;

  function $(selector) {
    return document.querySelector(selector);
  }

  function setLanguage(lang) {
    currentLang = lang;
    storeLanguage(lang);
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    document.querySelectorAll("[data-lang]").forEach((button) => {
      button.classList.toggle("active", button.dataset.lang === lang);
    });
    renderPage();
  }

  function nav(active) {
    const t = ui[currentLang];
    return `
      <header class="site-header">
        <a class="brand" href="index.html"><span class="brand-mark"></span><span>${currentLang === "zh" ? "咖啡小白指南" : "Beginner Coffee Guide"}</span></a>
        <nav class="nav-links" aria-label="Main navigation">
          ${link("index.html", t.home, active === "home")}
          ${link("coffees.html", t.coffees, active === "coffees")}
          ${link("basics.html", t.basics, active === "basics")}
          ${link("ratios.html", t.ratios, active === "ratios")}
          ${link("faq.html", t.faq, active === "faq")}
        </nav>
        <div class="lang-switch" aria-label="Language">
          <button type="button" data-lang="zh" class="${currentLang === "zh" ? "active" : ""}">中文</button>
          <button type="button" data-lang="en" class="${currentLang === "en" ? "active" : ""}">English</button>
        </div>
      </header>`;
  }

  function link(href, label, active) {
    return `<a class="${active ? "active" : ""}" href="${href}">${label}</a>`;
  }

  function layout(active, content) {
    document.body.innerHTML = `${nav(active)}<main>${content}</main><footer class="site-footer">${currentLang === "zh" ? "资料为新手教学参考；咖啡店信息以外部来源页面为准。" : "Beginner reference only; cafe information follows linked sources."}</footer>`;
    document.querySelectorAll("[data-lang]").forEach((button) => button.addEventListener("click", () => setLanguage(button.dataset.lang)));
    document.querySelectorAll("[data-filter]").forEach((button) => button.addEventListener("click", () => {
      currentFilter = button.dataset.filter;
      if (button.closest("[data-search-mode='coffee']")) renderCoffeeDirectory();
      else renderSearch();
    }));
    const search = $("#site-search");
    if (search) search.addEventListener("input", (event) => {
      currentQuery = event.target.value;
      if (search.closest("[data-search-mode='coffee']")) renderCoffeeDirectory();
      else renderSearch();
    });
    const reset = $("#reset-search");
    if (reset) reset.addEventListener("click", () => {
      currentQuery = "";
      currentFilter = "all";
      if (reset.closest("[data-search-mode='coffee']")) renderCoffeeDirectory();
      else renderSearch();
    });
  }

  function hero(title, subtitle, kicker) {
    return `
      <section class="hero">
        <div>
          ${kicker ? `<p class="kicker">${kicker}</p>` : ""}
          <h1>${title}</h1>
          <p>${subtitle}</p>
        </div>
      </section>`;
  }

  function coffeeCard(coffee, imageOnly = false) {
    const photo = coffee.photos[0];
    return `
      <article class="card coffee-card ${imageOnly ? "image-card" : ""}">
        ${imageOnly ? `<a class="composition-link" href="detail.html?id=${coffee.id}" aria-label="${ui[currentLang].viewRecipe} ${text(coffee.name, currentLang)}">${compositionMini(coffee)}</a>` : imageTag(photo)}
        <div class="card-body">
          <p class="eyebrow">${text(coffee.categoryName, currentLang)}</p>
          <h3>${text(coffee.name, currentLang)}</h3>
          ${imageOnly ? "" : `<p>${text(coffee.summary, currentLang)}</p>`}
          <a class="text-link" href="detail.html?id=${coffee.id}">${ui[currentLang].viewRecipe}</a>
        </div>
      </article>`;
  }

  function svgEscape(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
  }

  function cupCapacity(coffee) {
    return (coffee.composition.volume || 180) < 100 ? 130 : 260;
  }

  function cupGeometry(coffee) {
    const bottom = 220;
    const fullTop = 34;
    const fullHeight = bottom - fullTop;
    const fullVisualHeight = bottom + 14 - fullTop;
    const capacity = cupCapacity(coffee);
    const top = capacity === 130 ? bottom + 14 - fullVisualHeight / 2 : fullTop;
    return { top, bottom, height: bottom - top, capacity };
  }

  function cupWidthAt(y, geometry) {
    const top = geometry.top;
    const bottom = geometry.bottom;
    const topWidth = 170;
    const bottomWidth = geometry.capacity === 130 ? 102 : 118;
    const ratio = Math.max(0, Math.min(1, (y - top) / (bottom - top)));
    return topWidth - (topWidth - bottomWidth) * ratio;
  }

  function layerPath(yTop, yBottom, geometry) {
    const cx = 120;
    const topWidth = cupWidthAt(yTop, geometry);
    const bottomWidth = cupWidthAt(yBottom, geometry);
    const topLeft = cx - topWidth / 2;
    const topRight = cx + topWidth / 2;
    const bottomLeft = cx - bottomWidth / 2;
    const bottomRight = cx + bottomWidth / 2;
    return `M ${topLeft.toFixed(1)} ${yTop.toFixed(1)} C ${cx - topWidth * 0.25} ${(yTop - 5).toFixed(1)}, ${cx + topWidth * 0.25} ${(yTop - 5).toFixed(1)}, ${topRight.toFixed(1)} ${yTop.toFixed(1)} L ${bottomRight.toFixed(1)} ${yBottom.toFixed(1)} C ${cx + bottomWidth * 0.25} ${(yBottom + 5).toFixed(1)}, ${cx - bottomWidth * 0.25} ${(yBottom + 5).toFixed(1)}, ${bottomLeft.toFixed(1)} ${yBottom.toFixed(1)} Z`;
  }

  function layerTextColor(color) {
    const hex = color.replace("#", "");
    const red = parseInt(hex.slice(0, 2), 16);
    const green = parseInt(hex.slice(2, 4), 16);
    const blue = parseInt(hex.slice(4, 6), 16);
    return red * 0.299 + green * 0.587 + blue * 0.114 > 185 ? "#3a261d" : "#ffffff";
  }

  function decorationFor(coffee) {
    const haystack = `${coffee.id} ${coffee.tags.join(" ")} ${coffee.composition.layers.map((layer) => text(layer.label, "en")).join(" ")}`.toLowerCase();
    if (haystack.includes("ice cream") || haystack.includes("gelato")) return "gelato";
    if (haystack.includes("foam")) return "foam";
    if (haystack.includes("ice")) return "ice";
    if (haystack.includes("grounds")) return "sediment";
    return "none";
  }

  function cupDecoration(kind, compact, liquidTop) {
    if (kind === "ice") return `
      <g class="cup-ice" transform="translate(0 ${(liquidTop - 58).toFixed(1)})">
        <rect x="72" y="58" width="21" height="17" rx="4" transform="rotate(-12 82 66)"></rect>
        <rect x="102" y="69" width="20" height="16" rx="4" transform="rotate(8 112 77)"></rect>
        <rect x="134" y="58" width="23" height="18" rx="4" transform="rotate(14 145 67)"></rect>
        <rect x="87" y="96" width="22" height="18" rx="4" transform="rotate(10 98 105)"></rect>
        <rect x="128" y="100" width="21" height="17" rx="4" transform="rotate(-9 138 109)"></rect>
        ${compact ? "" : `
          <rect x="65" y="128" width="20" height="16" rx="4" transform="rotate(15 75 136)"></rect>
          <rect x="151" y="132" width="22" height="17" rx="4" transform="rotate(-13 162 140)"></rect>
        `}
      </g>`;
    if (kind === "gelato") {
      const scoops = `<path class="gelato-scoop" d="M78 58 C77 38, 95 24, 112 32 C124 11, 154 18, 160 42 C177 44, 186 59, 180 75 C160 86, 101 86, 78 58 Z"></path><path class="gelato-fold" d="M94 56 C105 48, 119 52, 128 40"></path><path class="gelato-fold" d="M132 58 C145 51, 157 56, 169 48"></path><path class="espresso-drizzle" d="M96 37 C110 51, 103 62, 116 75"></path><path class="espresso-drizzle" d="M142 30 C131 45, 144 56, 133 76"></path>`;
      const baseline = 75;
      return `<g class="cup-cream" transform="translate(0 ${(liquidTop - baseline).toFixed(1)})">${scoops}</g>`;
    }
    if (kind === "foam") return `<path class="foam-wave" transform="translate(0 ${(liquidTop - 56).toFixed(1)})" d="M43 56 C60 46, 74 64, 90 54 S122 48, 138 56 S168 65, 193 52"></path>`;
    if (kind === "sediment") return `<g class="cup-sediment"><circle cx="86" cy="209" r="2"></circle><circle cx="103" cy="214" r="2.5"></circle><circle cx="124" cy="211" r="2"></circle><circle cx="145" cy="216" r="2"></circle><circle cx="159" cy="207" r="2.5"></circle></g>`;
    return "";
  }

  function cupScale(coffee) {
    return "1";
  }

  function cupWidth(coffee, compact) {
    return compact ? 150 : 320;
  }

  function liquidFillRatio(coffee) {
    const volume = coffee.composition.volume || 180;
    return Math.max(0.08, Math.min(1, volume / cupCapacity(coffee)));
  }

  function cupGlass(coffee) {
    const geometry = cupGeometry(coffee);
    const cx = 120;
    const topWidth = cupWidthAt(geometry.top, geometry);
    const bottomWidth = cupWidthAt(geometry.bottom, geometry);
    const topLeft = cx - topWidth / 2;
    const topRight = cx + topWidth / 2;
    const bottomLeft = cx - bottomWidth / 2;
    const bottomRight = cx + bottomWidth / 2;
    const rimY = geometry.top;
    const rimRy = geometry.capacity === 130 ? 13 : 16;
    const baseY = geometry.bottom - 1;
    const sideCurveY = geometry.top + geometry.height * 0.08;
    return {
      geometry,
      glass: `M ${topLeft.toFixed(1)} ${rimY.toFixed(1)} C ${(cx - topWidth * 0.38).toFixed(1)} ${sideCurveY.toFixed(1)}, ${(cx + topWidth * 0.38).toFixed(1)} ${sideCurveY.toFixed(1)}, ${topRight.toFixed(1)} ${rimY.toFixed(1)} L ${bottomRight.toFixed(1)} ${geometry.bottom.toFixed(1)} C ${(cx + bottomWidth * 0.34).toFixed(1)} ${(geometry.bottom + 14).toFixed(1)}, ${(cx - bottomWidth * 0.34).toFixed(1)} ${(geometry.bottom + 14).toFixed(1)}, ${bottomLeft.toFixed(1)} ${geometry.bottom.toFixed(1)} Z`,
      rim: `<ellipse class="cup-rim" cx="${cx}" cy="${rimY.toFixed(1)}" rx="${(topWidth / 2).toFixed(1)}" ry="${rimRy}"></ellipse>`,
      topLine: `<ellipse class="cup-rim top-line" cx="${cx}" cy="${rimY.toFixed(1)}" rx="${(topWidth / 2).toFixed(1)}" ry="${rimRy}"></ellipse>`,
      baseLine: `<path class="cup-base-line" d="M ${(cx - bottomWidth * 0.43).toFixed(1)} ${baseY.toFixed(1)} C ${(cx - bottomWidth * 0.25).toFixed(1)} ${(baseY + 13).toFixed(1)}, ${(cx + bottomWidth * 0.25).toFixed(1)} ${(baseY + 13).toFixed(1)}, ${(cx + bottomWidth * 0.43).toFixed(1)} ${baseY.toFixed(1)}"></path>`,
      leftHighlight: `<path class="glass-highlight" d="M ${(topLeft + 24).toFixed(1)} ${(geometry.top + 13).toFixed(1)} C ${(topLeft + 8).toFixed(1)} ${(geometry.top + geometry.height * 0.35).toFixed(1)}, ${(bottomLeft + 8).toFixed(1)} ${(geometry.top + geometry.height * 0.7).toFixed(1)}, ${(bottomLeft + 17).toFixed(1)} ${(geometry.bottom - 9).toFixed(1)}"></path>`,
      rightHighlight: `<path class="glass-highlight right" d="M ${(topRight - 18).toFixed(1)} ${(geometry.top + 14).toFixed(1)} C ${(topRight - 4).toFixed(1)} ${(geometry.top + geometry.height * 0.38).toFixed(1)}, ${(bottomRight - 3).toFixed(1)} ${(geometry.top + geometry.height * 0.74).toFixed(1)}, ${(bottomRight - 12).toFixed(1)} ${(geometry.bottom - 8).toFixed(1)}"></path>`,
    };
  }

  function compositionCup(coffee, compact = false) {
    let consumed = 0;
    const glass = cupGlass(coffee);
    const geometry = glass.geometry;
    const bottom = geometry.bottom;
    const fillHeight = geometry.height * liquidFillRatio(coffee);
    const liquidTop = bottom - fillHeight;
    const layers = coffee.composition.layers.map((layer) => {
      const yBottom = bottom - (consumed / 100) * fillHeight;
      const yTop = bottom - ((consumed + layer.percent) / 100) * fillHeight;
      const layerHeight = yBottom - yTop;
      const yText = (yTop + yBottom) / 2 + 4;
      consumed += layer.percent;
      const label = svgEscape(text(layer.label, currentLang));
      return `
        <path class="cup-fill-layer" d="${layerPath(yTop, yBottom, geometry)}" fill="${layer.color}"></path>
        <path class="liquid-surface" d="M ${(120 - cupWidthAt(yTop, geometry) / 2 + 3).toFixed(1)} ${yTop.toFixed(1)} C 82 ${(yTop - 6).toFixed(1)}, 158 ${(yTop - 6).toFixed(1)}, ${(120 + cupWidthAt(yTop, geometry) / 2 - 3).toFixed(1)} ${yTop.toFixed(1)}"></path>
        ${compact || layer.percent < 12 || layerHeight < 18 ? "" : `<text x="120" y="${yText.toFixed(1)}" class="cup-label" fill="${layerTextColor(layer.color)}">${label}</text>`}`;
    }).join("");
    const decoration = cupDecoration(decorationFor(coffee), compact, liquidTop);
    return `
      <div class="drawn-cup ${compact ? "compact" : ""}" style="--cup-scale:${cupScale(coffee)}; --cup-width:${cupWidth(coffee, compact)}px;" aria-label="${text(coffee.name, currentLang)} ${currentLang === "zh" ? "配比图" : "composition diagram"}">
        <svg class="cup-svg" viewBox="0 0 240 260" role="img" aria-hidden="true">
          <ellipse class="cup-shadow-svg" cx="120" cy="240" rx="74" ry="12"></ellipse>
          <path class="cup-glass" d="${glass.glass}"></path>
          ${glass.rim}
          <g class="cup-liquid">${layers}</g>
          ${decoration}
          ${glass.leftHighlight}
          ${glass.rightHighlight}
          <path class="cup-outline" d="${glass.glass}"></path>
          ${glass.topLine}
          ${glass.baseLine}
        </svg>
        <div class="cup-shadow"></div>
      </div>`;
  }

  function compositionMini(coffee) {
    return `
      <div class="composition-mini">
        ${compositionCup(coffee, true)}
      </div>`;
  }

  function compositionHero(coffee) {
    return `
      <div class="detail-cup-hero">
        ${compositionCup(coffee)}
      </div>`;
  }

  function compositionVisual(coffee) {
    const layers = coffee.composition.layers.map((layer) => `
      <li>
        <span class="layer-swatch" style="background:${layer.color};"></span>
        <span>${text(layer.label, currentLang)}</span>
        <strong>${layer.percent}%</strong>
      </li>
    `).join("");
    return `
      <section class="composition-visual">
        <div>
          <p class="eyebrow">${currentLang === "zh" ? "成分配比剖析" : "Composition analysis"}</p>
          <h2>${text(coffee.name, currentLang)}</h2>
          ${compositionCup(coffee)}
        </div>
        <div class="composition-layers">
          <p>${text(coffee.composition.note, currentLang)}</p>
          <ul>${layers}</ul>
        </div>
      </section>`;
  }

  function searchPanel(mode = "site") {
    const filterKeys = mode === "coffee" ? ["all", "black", "milk", "iced", "dessert", "special"] : ["all", "black", "milk", "iced", "dessert", "special", "basics", "problems"];
    const results = mode === "coffee" ? "" : `<div id="search-results" class="result-grid"></div>`;
    const filters = filterKeys.map((key) => `
      <button type="button" data-filter="${key}" class="${currentFilter === key ? "active" : ""}">${text(categoryLabels[key], currentLang)}</button>
    `).join("");
    return `
      <section class="search-panel" data-search-mode="${mode}">
        <input id="site-search" value="${currentQuery}" placeholder="${ui[currentLang].searchPlaceholder}" aria-label="${ui[currentLang].searchPlaceholder}">
        <div class="filters">${filters}</div>
        <button id="reset-search" class="ghost-button" type="button">${ui[currentLang].reset}</button>
        ${results}
      </section>`;
  }

  function renderSearch() {
    const target = $("#search-results");
    if (!target) return;
    const results = searchCatalog(currentQuery, currentFilter, currentLang);
    document.querySelectorAll("[data-filter]").forEach((button) => button.classList.toggle("active", button.dataset.filter === currentFilter));
    const input = $("#site-search");
    if (input && input.value !== currentQuery) input.value = currentQuery;
    if (!results.length) {
      target.innerHTML = `<p class="empty">${ui[currentLang].noResults}</p>`;
      return;
    }
    target.innerHTML = results.slice(0, 48).map((result) => {
      if (result.type === "coffee") {
        return `<article class="result-card coffee-result"><a class="composition-link" href="detail.html?id=${result.coffee.id}" aria-label="${ui[currentLang].viewRecipe} ${text(result.coffee.name, currentLang)}">${compositionMini(result.coffee)}</a><div><span>${text(result.coffee.categoryName, currentLang)}</span><h3>${text(result.coffee.name, currentLang)}</h3><a href="detail.html?id=${result.coffee.id}">${ui[currentLang].viewRecipe}</a></div></article>`;
      }
      if (result.type === "cafe") {
        return `<article class="result-card"><span>${ui[currentLang].cafeType}</span><h3>${result.cafe.name}</h3><p>${cafeLocation(result.cafe)} · ${text(result.cafe.why, currentLang)}</p><a href="detail.html?id=${result.coffee.id}">${text(result.coffee.name, currentLang)}</a></article>`;
      }
      return `<article class="result-card"><span>${result.type === "faq" ? ui[currentLang].faqType : ui[currentLang].knowledgeType}</span><h3>${text(result.item.title, currentLang)}</h3><p>${text(result.item.body, currentLang)}</p></article>`;
    }).join("");
  }

  function renderCoffeeDirectory() {
    const target = $(".coffee-type-grid");
    if (!target) return;
    const results = searchCoffees(currentQuery, currentFilter);
    document.querySelectorAll("[data-filter]").forEach((button) => button.classList.toggle("active", button.dataset.filter === currentFilter));
    const input = $("#site-search");
    if (input && input.value !== currentQuery) input.value = currentQuery;
    target.innerHTML = results.length ? results.map((coffee) => coffeeCard(coffee, true)).join("") : `<p class="empty">${ui[currentLang].noResults}</p>`;
  }

  function renderHome() {
    const daily = coffees.find((coffee) => coffee.id === getDailyCoffeeId());
    const featured = ["espresso", "latte", "flat-white", "spanish-latte", "cold-brew", "vietnamese-coffee"].map((id) => coffees.find((coffee) => coffee.id === id));
    layout("home", `
      ${hero(currentLang === "zh" ? "从第一杯咖啡开始" : "Start with your first cup", currentLang === "zh" ? "按黑咖、奶咖、冰咖和甜品咖啡分层学习，每款都有配比、步骤、照片和全球咖啡店参考。" : "Learn by black coffee, milk coffee, iced coffee, and dessert coffee, with ratios, steps, photos, and cafe references.", "")}
      <section class="daily-card">
        <a class="daily-cup-link" href="detail.html?id=${daily.id}" aria-label="${ui[currentLang].viewRecipe} ${text(daily.name, currentLang)}">${compositionHero(daily)}</a>
        <div>
          <p class="eyebrow">${ui[currentLang].daily}</p>
          <h2>${text(daily.name, currentLang)}</h2>
          <p>${ui[currentLang].dailyText}</p>
          <p>${text(daily.summary, currentLang)}</p>
          <a class="button" href="detail.html?id=${daily.id}">${ui[currentLang].viewRecipe}</a>
        </div>
      </section>
      ${searchPanel()}
      <section>
        <div class="section-heading"><p class="eyebrow">${ui[currentLang].learningPath}</p><h2>${currentLang === "zh" ? "先懂基础，再选饮品" : "Learn the basics, then choose a drink"}</h2></div>
        <div class="info-grid">${basics.map((item) => infoCard(item)).join("")}</div>
      </section>
      <section>
        <div class="section-heading"><p class="eyebrow">${ui[currentLang].featured}</p><h2>${currentLang === "zh" ? "适合新手先认识的几杯" : "Good first drinks to know"}</h2></div>
        <div class="card-grid">${featured.map((coffee) => coffeeCard(coffee, true)).join("")}</div>
      </section>`);
    renderSearch();
  }

  function infoCard(item) {
    return `<article class="info-card"><h3>${text(item.title, currentLang)}</h3><p>${text(item.body, currentLang)}</p></article>`;
  }

  function renderCoffees() {
    layout("coffees", `
      ${hero(ui[currentLang].coffees, currentLang === "zh" ? `按层级筛选和搜索 ${coffees.length} 款经典咖啡。` : `Filter and search ${coffees.length} classic coffee drinks by level and category.`, currentLang === "zh" ? "咖啡地图" : "Coffee map")}
      ${searchPanel("coffee")}
      <section class="card-grid coffee-type-grid"></section>`);
    renderCoffeeDirectory();
  }

  function renderBasics() {
    layout("basics", `
      ${hero(ui[currentLang].basics, currentLang === "zh" ? "器具、研磨、萃取和奶泡，是做稳定咖啡的四个入口。" : "Gear, grind, extraction, and milk texture are the four entries to stable coffee.", currentLang === "zh" ? "先把底层搞清楚" : "Start with fundamentals")}
      <section class="info-grid">${basics.map(infoCard).join("")}</section>`);
  }

  function renderRatios() {
    layout("ratios", `
      ${hero(ui[currentLang].ratios, currentLang === "zh" ? "把常见配比放在一张表里，制作时更容易对照。" : "Common ratios in one table for easy brewing reference.", currentLang === "zh" ? "边做边查" : "Brew-side reference")}
      <section class="table-wrap">
        <table>
          <thead><tr><th>${currentLang === "zh" ? "咖啡" : "Coffee"}</th><th>${currentLang === "zh" ? "分类" : "Category"}</th><th>${ui[currentLang].ratio}</th></tr></thead>
          <tbody>${coffees.map((coffee) => `<tr><td><a href="detail.html?id=${coffee.id}">${text(coffee.name, currentLang)}</a></td><td>${text(coffee.categoryName, currentLang)}</td><td>${text(coffee.ratio, currentLang)}</td></tr>`).join("")}</tbody>
        </table>
      </section>`);
  }

  function renderFaq() {
    layout("faq", `
      ${hero(ui[currentLang].faq, currentLang === "zh" ? "从酸、苦、淡和奶泡问题开始排查。" : "Troubleshoot sourness, bitterness, weak flavor, and milk texture first.", currentLang === "zh" ? "新手急救" : "Beginner fixes")}
      <section class="info-grid">${faqs.map(infoCard).join("")}</section>`);
  }

  function renderDetail() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id") || "espresso";
    const coffee = coffees.find((item) => item.id === id) || coffees[0];
    layout("coffees", `
      <section class="detail-hero">
        <div>
          <p class="eyebrow"><a href="coffees.html">${ui[currentLang].coffees}</a> / ${text(coffee.categoryName, currentLang)}</p>
          <h1>${text(coffee.name, currentLang)}</h1>
          <p>${text(coffee.summary, currentLang)}</p>
        </div>
        ${compositionHero(coffee)}
      </section>
      <section class="detail-grid">
        ${detailBlock(ui[currentLang].intro, text(coffee.summary, currentLang))}
        ${detailBlock(ui[currentLang].origin, text(coffee.origin, currentLang))}
        ${detailBlock(ui[currentLang].flavor, text(coffee.flavor, currentLang))}
        ${detailBlock(ui[currentLang].ingredients, text(coffee.ingredients, currentLang))}
        ${detailBlock(ui[currentLang].ratio, text(coffee.ratio, currentLang))}
        ${detailBlock(ui[currentLang].tips, text(coffee.tips, currentLang))}
      </section>
      ${compositionVisual(coffee)}
      <section>
        <div class="section-heading"><h2>${ui[currentLang].steps}</h2></div>
        <ol class="steps">${coffee.steps[currentLang].map((step) => `<li>${step}</li>`).join("")}</ol>
      </section>
      <section>
        <div class="section-heading"><h2>${ui[currentLang].cafesTitle}</h2></div>
        <div class="cafe-split">
          <div>
            <h3>${ui[currentLang].domesticCafes}</h3>
            <div class="info-grid">${coffee.notableCafes.domestic.map(cafeCard).join("")}</div>
          </div>
          <div>
            <h3>${ui[currentLang].internationalCafes}</h3>
            <div class="info-grid">${coffee.notableCafes.international.map(cafeCard).join("")}</div>
          </div>
        </div>
      </section>`);
  }

  function cafeList(coffee) {
    if (Array.isArray(coffee.notableCafes)) return coffee.notableCafes;
    return [...(coffee.notableCafes.domestic || []), ...(coffee.notableCafes.international || [])];
  }

  function cafeCard(cafe) {
    return `<article class="info-card"><h3>${cafe.name}</h3><p>${cafeLocation(cafe)}</p><p>${text(cafe.why, currentLang)}</p><a class="text-link" href="${cafe.sourceUrl}" target="_blank" rel="noreferrer">${ui[currentLang].source}</a></article>`;
  }

  function detailBlock(title, body) {
    return `<article class="detail-block"><h2>${title}</h2><p>${body}</p></article>`;
  }

  function renderPage() {
    const view = document.body.dataset.view;
    if (view === "coffees") renderCoffees();
    else if (view === "detail") renderDetail();
    else if (view === "basics") renderBasics();
    else if (view === "ratios") renderRatios();
    else if (view === "faq") renderFaq();
    else renderHome();
  }

  renderPage();
})();

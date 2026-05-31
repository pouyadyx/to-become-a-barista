(function () {
  const C = {
    black: { zh: "黑咖", en: "Black coffee" },
    milk: { zh: "奶咖", en: "Milk coffee" },
    iced: { zh: "冰咖", en: "Iced coffee" },
    dessert: { zh: "甜品/酒咖", en: "Dessert / spirited" },
    special: { zh: "特色奶咖", en: "Signature milk coffee" },
  };

  function t(zh, en) {
    return { zh, en };
  }

  const cafeSources = {
    manner: ["Manner Coffee", "Shanghai", "China", "https://www.instagram.com/mannercoffee/"],
    seesaw: ["Seesaw Coffee", "Shanghai", "China", "https://www.instagram.com/seesawcoffee/"],
    metalHands: ["Metal Hands", "Beijing", "China", "https://www.foodinspace.net/project/metal-hands-beijing-china/"],
    saturnbird: ["Saturnbird", "Changsha", "China", "https://saturnbird.com/"],
    florian: ["Caffe Florian", "Venice", "Italy", "https://www.visitvenezia.eu/en/venetianity/discover-venice/caffe-florian-venice"],
    eustachio: ["Sant'Eustachio Il Caffe", "Rome", "Italy", "https://caffesanteustachio.com/?lang=en"],
    gambrinus: ["Gran Caffe Gambrinus", "Naples", "Italy", "https://grancaffegambrinus.com/en/"],
    gilli: ["Caffe Gilli", "Florence", "Italy", "https://www.caffegilli.com/en/"],
    reggio: ["Caffe Reggio", "New York", "United States", "https://www.caffereggio.com/"],
    buena: ["The Buena Vista", "San Francisco", "United States", "https://www.thebuenavista.net/home/home.html"],
    giang: ["Cafe Giang", "Hanoi", "Vietnam", "https://cafegiang.vn/"],
    cong: ["Cong Caphe", "Hanoi", "Vietnam", "https://congcaphe.com/"],
    central: ["Cafe Central", "Vienna", "Austria", "https://www.cafecentral.wien/en/"],
    demel: ["Demel", "Vienna", "Austria", "https://www.demel.com/"],
    proud: ["Proud Mary Coffee", "Melbourne", "Australia", "https://www.proudmarycoffee.com.au/"],
    kaffeine: ["Kaffeine", "London", "United Kingdom", "https://kaffeine.co.uk/"],
    laColombe: ["La Colombe", "Philadelphia", "United States", "https://www.lacolombe.com/"],
    stumptown: ["Stumptown Coffee Roasters", "Portland", "United States", "https://www.stumptowncoffee.com/"],
    intelligentsia: ["Intelligentsia Coffee", "Chicago", "United States", "https://www.intelligentsia.com/"],
    wendelboe: ["Tim Wendelboe", "Oslo", "Norway", "https://timwendelboe.no/"],
    agate: ["AGATE", "Medina", "Saudi Arabia", "https://agateksa.com/en/menu/%D8%A7%D9%84%D9%82%D9%87%D9%88%D8%A9-%D8%A7%D9%84%D8%A7%D8%B3%D8%A8%D8%A7%D9%86%D9%8A%D8%A9/"],
    arabica: ["% Arabica", "Kyoto", "Japan", "https://arabica.coffee/"],
    eataly: ["Eataly", "Turin", "Italy", "https://www.eataly.com/"],
    cafeBeignet: ["Cafe Beignet", "New Orleans", "United States", "https://www.cafebeignet.com/"],
  };

  function cafeRef(key, zh, en) {
    const item = cafeSources[key];
    return {
      name: item[0],
      city: item[1],
      country: item[2],
      why: t(zh, en),
      sourceUrl: item[3],
    };
  }

  const domesticByGroup = {
    black: [cafeRef("metalHands", "北京精品咖啡空间，可作为国内黑咖、手冲和单品咖啡文化参考。", "A Beijing specialty coffee space useful as a mainland China reference for black coffee, pour over, and single-origin culture.")],
    milk: [cafeRef("manner", "中国大陆常见精品咖啡品牌，可作为日常意式、拿铁和奶咖出品的国内参考。", "A common mainland China specialty coffee brand useful as a domestic reference for espresso, latte, and daily milk coffee.")],
    iced: [cafeRef("seesaw", "上海精品咖啡品牌，可作为国内冰咖、奶咖和季节创意饮品参考。", "A Shanghai specialty coffee brand useful as a domestic reference for iced coffee, milk drinks, and seasonal signatures.")],
    special: [cafeRef("saturnbird", "中国大陆精品即饮与创意咖啡品牌，可作为甜奶咖和创意咖啡的国内参考。", "A mainland China specialty and creative coffee brand useful as a domestic reference for sweet milk and signature coffee drinks.")],
    dessert: [cafeRef("seesaw", "上海精品咖啡品牌，可作为国内奶咖、甜品咖啡和季节创意饮品参考。", "A Shanghai specialty coffee brand useful as a domestic reference for milk drinks, dessert coffee, and seasonal signatures.")],
  };

  const internationalRefs = {
    espresso: ["eustachio", "gambrinus"],
    ristretto: ["eustachio"],
    lungo: ["florian"],
    doppio: ["gambrinus"],
    americano: ["laColombe", "stumptown"],
    "long-black": ["proud"],
    "pour-over": ["intelligentsia", "wendelboe"],
    "cold-brew": ["stumptown", "laColombe"],
    "iced-americano": ["arabica"],
    latte: ["laColombe"],
    "iced-latte": ["arabica"],
    "spanish-latte": ["agate"],
    cappuccino: ["reggio", "gilli"],
    "flat-white": ["proud", "kaffeine"],
    mocha: ["laColombe"],
    macchiato: ["florian"],
    "caramel-macchiato": ["arabica"],
    cortado: ["kaffeine"],
    piccolo: ["proud"],
    dirty: ["arabica"],
    affogato: ["eataly"],
    "con-panna": ["florian"],
    "irish-coffee": ["buena"],
    "vienna-coffee": ["central", "demel"],
    "vietnamese-coffee": ["giang", "cong"],
    "turkish-coffee": ["florian"],
    "cafe-au-lait": ["cafeBeignet"],
  };

  const cafeWhy = {
    eustachio: ["罗马知名咖啡馆，可作为意式浓缩文化的代表性参考。", "A well-known Roman cafe that works as a reference point for espresso culture."],
    gambrinus: ["那不勒斯历史咖啡馆，适合理解意大利南部浓缩咖啡氛围。", "A historic Naples cafe useful for understanding southern Italian espresso culture."],
    florian: ["威尼斯历史咖啡馆，可作为传统意式咖啡服务文化参考。", "A historic Venetian cafe and a reference for traditional Italian coffee service."],
    laColombe: ["美国精品咖啡品牌，可作为现代黑咖、奶咖和冷饮体系参考。", "A US specialty coffee brand useful as a modern reference for black coffee, milk drinks, and cold drinks."],
    stumptown: ["波特兰精品咖啡代表，可参考其黑咖、手冲和冷饮体系。", "A Portland specialty roaster and a useful reference for black coffee, filter coffee, and cold drinks."],
    proud: ["墨尔本精品咖啡代表，可作为澳式黑咖和奶咖文化参考。", "A Melbourne specialty cafe useful as an Australian reference for black coffee and milk drinks."],
    intelligentsia: ["精品咖啡早期代表品牌，适合参考手冲和单品咖啡文化。", "An influential specialty coffee brand and a useful reference for pour over and single-origin culture."],
    wendelboe: ["奥斯陆知名烘焙店，适合参考北欧浅烘和手冲表达。", "A well-known Oslo roaster useful for Nordic light-roast and filter coffee references."],
    arabica: ["全球多地门店常见冰咖和奶咖出品，可作为现代咖啡馆参考。", "Its global cafes are useful references for modern iced espresso and milk drinks."],
    agate: ["其菜单含西班牙拿铁，适合作为海湾地区甜奶咖参考。", "Its menu includes Spanish latte, useful as a Gulf-region reference for sweet milk coffee."],
    reggio: ["纽约历史咖啡馆，常被作为美国早期卡布奇诺文化参考。", "A historic New York cafe often used as a reference for early cappuccino culture in the US."],
    gilli: ["佛罗伦萨历史咖啡馆，适合作为意式奶咖传统参考。", "A historic Florence cafe useful as a reference for Italian milk coffee tradition."],
    kaffeine: ["伦敦知名澳式咖啡馆，可参考其澳新奶咖语境。", "A London cafe with Australasian influence, useful for flat white and small milk drink context."],
    eataly: ["意大利食品与咖啡文化场景，适合作为 affogato 甜点咖啡参考。", "An Italian food and coffee setting useful as an affogato reference."],
    buena: ["旧金山 Buena Vista 以爱尔兰咖啡闻名，可作为经典参考。", "San Francisco's Buena Vista is famous for Irish Coffee and is a classic reference."],
    central: ["维也纳代表性咖啡馆，适合理解维也纳咖啡文化。", "A representative Vienna cafe for understanding Viennese coffeehouse culture."],
    demel: ["维也纳甜点与咖啡传统名店，可作为奶油咖啡参考。", "A well-known Vienna pastry and coffee institution, useful for cream coffee references."],
    giang: ["河内知名咖啡馆，可作为越南咖啡文化参考。", "A well-known Hanoi cafe and a reference for Vietnamese coffee culture."],
    cong: ["越南连锁咖啡品牌，适合参考现代越南咖啡饮品。", "A Vietnamese cafe chain useful for modern Vietnamese coffee drinks."],
    cafeBeignet: ["新奥尔良咖啡馆文化常把咖啡欧蕾与甜点搭配，可作为地区版本参考。", "New Orleans cafe culture often pairs cafe au lait with pastries, useful as a regional reference."],
  };

  const photoCatalog = {
    espresso: ["espresso", "espresso-shot", "espresso-crema"],
    ristretto: ["ristretto", "short-espresso", "espresso-shot"],
    lungo: ["lungo-coffee", "long-espresso", "espresso-cup"],
    doppio: ["doppio-espresso", "double-espresso", "espresso-two-shots"],
    americano: ["americano-coffee", "hot-americano", "black-coffee"],
    "long-black": ["long-black-coffee", "australian-long-black", "black-coffee-crema"],
    "pour-over": ["pour-over-coffee", "v60-pour-over", "filter-coffee-brewing"],
    "cold-brew": ["cold-brew-coffee", "cold-brew-bottle", "iced-cold-brew"],
    "iced-americano": ["iced-americano", "iced-black-coffee", "espresso-over-ice-water"],
    latte: ["latte", "latte-art", "caffe-latte"],
    "iced-latte": ["iced-latte", "iced-milk-coffee", "latte-with-ice"],
    "spanish-latte": ["spanish-latte", "condensed-milk-latte", "sweet-iced-latte"],
    cappuccino: ["cappuccino", "cappuccino-foam", "cappuccino-cup"],
    "flat-white": ["flat-white", "flat-white-coffee", "microfoam-coffee"],
    mocha: ["mocha-coffee", "chocolate-coffee", "caffe-mocha"],
    macchiato: ["espresso-macchiato", "macchiato", "espresso-with-foam"],
    "caramel-macchiato": ["caramel-macchiato", "caramel-coffee", "layered-caramel-latte"],
    cortado: ["cortado", "cortado-coffee", "small-milk-coffee"],
    piccolo: ["piccolo-latte", "piccolo-coffee", "small-latte"],
    dirty: ["dirty-coffee", "layered-milk-coffee", "espresso-over-cold-milk"],
    affogato: ["affogato", "espresso-ice-cream", "coffee-gelato"],
    "con-panna": ["espresso-con-panna", "espresso-whipped-cream", "cream-espresso"],
    "irish-coffee": ["irish-coffee", "whiskey-coffee", "coffee-with-cream-glass"],
    "vienna-coffee": ["vienna-coffee", "viennese-coffee", "coffee-with-whipped-cream"],
    "vietnamese-coffee": ["vietnamese-coffee", "phin-coffee", "condensed-milk-coffee"],
    "turkish-coffee": ["turkish-coffee", "cezve-coffee", "turkish-coffee-cup"],
    "cafe-au-lait": ["cafe-au-lait", "coffee-with-hot-milk", "french-milk-coffee"],
  };

  function layer(zh, en, percent, color) {
    return { label: t(zh, en), percent, color };
  }

  function composition(cup, volume, layers, noteZh, noteEn) {
    return { cup, volume, layers, note: t(noteZh, noteEn) };
  }

  const compositionCatalog = {
    espresso: composition("demitasse", 18, [layer("浓缩咖啡", "espresso", 86, "#4a1f0f"), layer("油脂", "crema", 14, "#c87922")], "小杯高浓度咖啡，油脂层帮助新手观察萃取状态。", "A small concentrated cup where the crema helps beginners read extraction."),
    ristretto: composition("demitasse", 24, [layer("短萃咖啡", "short espresso", 88, "#3b170b"), layer("厚油脂", "thick crema", 12, "#d08a2b")], "出液更少，视觉上仍是小杯浓缩，但主体更集中。", "A shorter espresso-style drink: still a small cup, but denser in the coffee body."),
    lungo: composition("demitasse", 65, [layer("长萃咖啡", "long espresso", 90, "#5b2a13"), layer("薄油脂", "thin crema", 10, "#c88733")], "液量比浓缩更长，杯中咖啡层更高，油脂相对更薄。", "Longer yield than espresso, so the coffee body is taller and the crema is thinner."),
    doppio: composition("demitasse", 36, [layer("双份浓缩", "double espresso", 86, "#4a1d0e"), layer("油脂", "crema", 14, "#c87922")], "双份浓缩是更大剂量的浓缩基底，结构与 espresso 接近。", "Doppio is a larger espresso base with a similar visual structure to espresso."),
    americano: composition("tall", 180, [layer("浓缩咖啡", "espresso", 25, "#4a1f0f"), layer("热水", "hot water", 75, "#d7c2a3")], "美式的核心是用热水降低浓度，同时保留浓缩香气。", "Americano dilutes espresso with hot water while keeping espresso aroma."),
    "long-black": composition("tall", 160, [layer("热水", "hot water", 70, "#d7c2a3"), layer("浓缩咖啡", "espresso", 25, "#4a1f0f"), layer("油脂", "crema", 5, "#c87922")], "长黑通常先加水再加浓缩，表面油脂更容易保留。", "Long black is usually water first, espresso second, helping retain crema."),
    "pour-over": composition("filter", 240, [layer("滤泡咖啡", "filter coffee", 92, "#6a3518"), layer("香气层", "aroma", 8, "#d4a05b")], "手冲不是分层饮品，图中强调清澈咖啡主体和香气。", "Pour over is not layered; the diagram highlights clear coffee body and aroma."),
    "cold-brew": composition("iced", 260, [layer("冷萃咖啡", "cold brew", 78, "#4d2615"), layer("冰块", "ice", 22, "#dce8ec")], "冷萃以低酸顺滑为主，常见杯中会有大量冰块。", "Cold brew is smooth and low-acid, often served with plenty of ice."),
    "iced-americano": composition("iced", 260, [layer("浓缩咖啡", "espresso", 18, "#4a1f0f"), layer("冷水", "cold water", 55, "#c8d7df"), layer("冰块", "ice", 27, "#eef6f7")], "冰美式用冷水和冰块拉开浓度，口感清爽。", "Iced Americano uses cold water and ice to make espresso crisp and refreshing."),
    latte: composition("tall", 240, [layer("浓缩咖啡", "espresso", 18, "#4a1f0f"), layer("牛奶", "milk", 72, "#d99a52"), layer("薄奶泡", "thin foam", 10, "#f6ead8")], "拿铁以牛奶为主体，奶泡薄，入口柔和。", "Latte is milk-forward with a thin foam layer and a soft taste."),
    "iced-latte": composition("iced", 260, [layer("冷牛奶", "cold milk", 65, "#edd5b6"), layer("浓缩咖啡", "espresso", 18, "#4a1f0f"), layer("冰块", "ice", 17, "#eef6f7")], "冰拿铁突出冷牛奶和浓缩的颜色对比。", "Iced latte highlights the contrast between cold milk and espresso."),
    "spanish-latte": composition("iced", 240, [layer("炼乳", "condensed milk", 16, "#f6dca9"), layer("牛奶", "milk", 62, "#ead0a8"), layer("浓缩咖啡", "espresso", 22, "#4a1f0f")], "西班牙拿铁的重点是炼乳带来的甜感和层次。", "Spanish latte is defined by condensed milk sweetness and visible layering."),
    cappuccino: composition("tall", 180, [layer("浓缩咖啡", "espresso", 30, "#4a1f0f"), layer("牛奶", "milk", 40, "#d9954f"), layer("厚奶泡", "thick foam", 30, "#f8ead8")], "卡布奇诺比拿铁奶泡更厚，咖啡感也更明显。", "Cappuccino has thicker foam than latte and a more obvious coffee presence."),
    "flat-white": composition("tall", 160, [layer("浓缩咖啡", "espresso", 40, "#4a1f0f"), layer("牛奶", "milk", 50, "#dfad73"), layer("薄奶泡", "microfoam", 10, "#f6ead8")], "馥芮白杯量小、奶泡薄，因此咖啡感更强。", "Flat white is smaller with thin microfoam, so the coffee tastes stronger."),
    mocha: composition("tall", 220, [layer("巧克力酱", "chocolate", 12, "#2f130c"), layer("浓缩咖啡", "espresso", 20, "#4a1f0f"), layer("牛奶", "milk", 58, "#d99955"), layer("奶油", "cream", 10, "#f8ead8")], "摩卡在拿铁结构中加入巧克力，甜苦感更明显。", "Mocha adds chocolate to a latte-like structure for sweet cocoa bitterness."),
    macchiato: composition("demitasse", 45, [layer("浓缩咖啡", "espresso", 85, "#4a1f0f"), layer("少量奶泡", "foam mark", 15, "#f6ead8")], "传统玛奇朵是浓缩上点少量奶泡，不是大杯焦糖奶咖。", "Traditional macchiato is espresso marked with a little foam, not a large caramel drink."),
    "caramel-macchiato": composition("tall", 240, [layer("焦糖酱", "caramel", 8, "#b76823"), layer("香草牛奶", "vanilla milk", 62, "#e5b777"), layer("浓缩咖啡", "espresso", 20, "#4a1f0f"), layer("奶泡", "foam", 10, "#f6ead8")], "焦糖玛奇朵是甜味分层奶咖，焦糖用于顶部和风味。", "Caramel macchiato is a sweet layered milk coffee with caramel flavor."),
    cortado: composition("small", 90, [layer("浓缩咖啡", "espresso", 50, "#4a1f0f"), layer("热牛奶", "warm milk", 50, "#d9a061")], "可塔朵接近 1:1，降低刺激但保留咖啡强度。", "Cortado is close to 1:1, softening espresso while keeping strength."),
    piccolo: composition("small", 100, [layer("精萃/浓缩", "ristretto / espresso", 38, "#4a1f0f"), layer("牛奶", "milk", 52, "#d9a061"), layer("薄奶泡", "thin foam", 10, "#f6ead8")], "Piccolo 是小杯奶咖，咖啡存在感比拿铁强。", "Piccolo is a small milk drink with more coffee presence than a latte."),
    dirty: composition("tall", 160, [layer("冷牛奶", "cold milk", 68, "#efe0c8"), layer("热浓缩", "hot espresso", 32, "#4a1f0f")], "Dirty 的视觉重点是冷牛奶上方缓慢落下的热浓缩。", "Dirty coffee is about hot espresso falling into cold milk with clear contrast."),
    affogato: composition("dessert", 120, [layer("香草冰淇淋", "vanilla ice cream", 70, "#f7e6c8"), layer("热浓缩", "hot espresso", 30, "#4a1f0f")], "Affogato 介于甜品和咖啡之间，热浓缩浇在冰淇淋上。", "Affogato sits between dessert and coffee, with hot espresso over ice cream."),
    "con-panna": composition("demitasse", 60, [layer("浓缩咖啡", "espresso", 70, "#4a1f0f"), layer("鲜奶油", "whipped cream", 30, "#f8ead8")], "Con Panna 是浓缩加鲜奶油，甜润但仍浓。", "Con panna tops espresso with whipped cream while keeping espresso strength."),
    "irish-coffee": composition("glass", 180, [layer("威士忌咖啡", "whiskey coffee", 78, "#6a3518"), layer("奶油", "cream", 22, "#f8ead8")], "爱尔兰咖啡通常用奶油漂浮在热酒咖啡上。", "Irish coffee usually floats cream over hot whiskey coffee."),
    "vienna-coffee": composition("glass", 180, [layer("黑咖啡", "black coffee", 70, "#5a2a14"), layer("鲜奶油", "whipped cream", 30, "#f8ead8")], "维也纳咖啡以黑咖啡和奶油的对比为重点。", "Vienna coffee emphasizes the contrast between black coffee and cream."),
    "vietnamese-coffee": composition("glass", 180, [layer("炼乳", "condensed milk", 28, "#f6dca9"), layer("越南滴滤咖啡", "phin coffee", 52, "#4a1f0f"), layer("冰块", "ice", 20, "#eef6f7")], "越南咖啡常见炼乳层和浓厚滴滤咖啡。", "Vietnamese coffee often shows condensed milk and strong phin-brewed coffee."),
    "turkish-coffee": composition("demitasse", 70, [layer("土耳其咖啡", "turkish coffee", 82, "#4a1f0f"), layer("咖啡粉沉淀", "grounds", 18, "#2a120a")], "土耳其咖啡不过滤，杯底会有细粉沉淀。", "Turkish coffee is unfiltered, leaving fine grounds at the bottom."),
    "cafe-au-lait": composition("bowl", 240, [layer("热黑咖啡", "hot brewed coffee", 50, "#5a2a14"), layer("热牛奶", "hot milk", 50, "#dfad73")], "欧蕾通常是热黑咖啡和热牛奶接近等量混合。", "Cafe au lait is usually brewed coffee and hot milk in roughly equal parts."),
  };

  function photoUrl(id, index) {
    return `assets/coffee/${id}-${index + 1}.jpg`;
  }

  function photoSource(id, index) {
    return `assets/coffee/${id}-${index + 1}.jpg`;
  }

  function matchedPhotos(item) {
    return photoCatalog[item.id].map((slug, index) => ({
      src: photoUrl(item.id, index),
      alt: t(`${item.zh}参考成品图 ${index + 1}`, `${item.en} reference drink photo ${index + 1}`),
      credit: "User-replaceable local image slot",
      sourceUrl: photoSource(item.id, index),
      match: item.id,
      matchTags: [item.id, slug].concat(item.tags),
    }));
  }

  const coffeeItems = [
    ["espresso", "black", "浓缩", "Espresso", "小杯高浓度意式咖啡，油脂明显，香气集中。", "A small concentrated Italian coffee with crema and intense aroma.", "约 9g 咖啡粉萃取 18g 咖啡液，25-30 秒。", "About 9g coffee to 18g beverage in 25-30 seconds.", ["strong", "base", "italian", "crema", "浓郁", "意式"], ["预热咖啡机和杯子。", "研磨、布粉并压粉。", "萃取到目标重量。", "趁热饮用或作为奶咖基底。"], ["Preheat machine and cup.", "Grind, distribute, and tamp.", "Extract to target weight.", "Drink hot or use as a milk-drink base."]],
    ["ristretto", "black", "精萃", "Ristretto", "出液量更短的浓缩，甜感更集中，口感厚。", "A shorter espresso-style shot with concentrated sweetness and body.", "约 18g 咖啡粉萃取 18-25g 咖啡液。", "About 18g coffee to 18-25g beverage.", ["short", "sweet", "espresso", "精萃", "短萃"], ["使用浓缩相同粉量。", "研磨略细或更早停止。", "在较小出液量停止。", "直接品尝集中甜感。"], ["Use the same dose as espresso.", "Grind slightly finer or stop earlier.", "End at a smaller yield.", "Taste the concentrated sweetness."]],
    ["lungo", "black", "长萃", "Lungo", "出液量更长的浓缩，口感更舒展，尾韵更明显。", "A longer espresso-style extraction with a lighter body and longer finish.", "约 18g 咖啡粉萃取 50-70g 咖啡液。", "About 18g coffee to 50-70g beverage.", ["long", "espresso", "bitter", "长萃"], ["按浓缩方式装粉。", "保持稳定萃取。", "出液到 50-70g 停止。", "直接喝或少量加水。"], ["Prepare like espresso.", "Keep extraction steady.", "Stop at 50-70g beverage.", "Drink straight or dilute slightly."]],
    ["doppio", "black", "双份浓缩", "Doppio", "双份浓缩是现代咖啡馆常用基底，风味更完整。", "A double espresso shot often used as the standard modern cafe base.", "18-20g 咖啡粉萃取 36-40g 咖啡液。", "18-20g coffee to 36-40g beverage.", ["double", "base", "espresso", "双份"], ["使用双份粉碗。", "布粉压粉保持平整。", "萃取到目标重量。", "用于奶咖前先确认风味。"], ["Use a double basket.", "Distribute and tamp evenly.", "Extract to target weight.", "Taste before using in milk drinks."]],
    ["americano", "black", "美式", "Americano", "浓缩加热水，保留意式香气，同时降低浓度。", "Espresso diluted with hot water, preserving aroma while lowering intensity.", "1 份浓缩 + 120-180ml 热水。", "1 espresso shot plus 120-180ml hot water.", ["black", "diluted", "hot", "美式", "清爽"], ["杯中加入热水。", "萃取浓缩。", "把浓缩倒入水中。", "按口味调整水量。"], ["Add hot water.", "Extract espresso.", "Pour espresso into water.", "Adjust water to taste."]],
    ["long-black", "black", "长黑", "Long Black", "热水上倒入浓缩，常见于澳新咖啡馆，油脂更明显。", "Espresso poured over hot water, common in Australasian cafes with crema retained.", "120-160ml 热水 + 1-2 份浓缩。", "120-160ml hot water plus 1-2 espresso shots.", ["australia", "black", "crema", "长黑"], ["杯中先加热水。", "萃取浓缩。", "轻轻倒在水面。", "不必大力搅拌。"], ["Add hot water first.", "Extract espresso.", "Pour gently onto the water.", "Avoid aggressive stirring."]],
    ["pour-over", "black", "手冲", "Pour Over", "手动注水控制萃取，突出豆子的香气、酸甜和干净度。", "Manual brewing that highlights aroma, acidity, sweetness, and clarity.", "15g 咖啡粉 + 240ml 水，约 1:16。", "15g coffee to 240ml water, about 1:16.", ["filter", "clean", "manual", "手冲", "果酸"], ["润湿滤纸并预热器具。", "加入中细研磨咖啡粉。", "闷蒸 30 秒。", "分段注水至目标水量。"], ["Rinse filter and preheat brewer.", "Add medium-fine coffee.", "Bloom for 30 seconds.", "Pour in stages to target water."]],
    ["cold-brew", "iced", "冷萃", "Cold Brew", "冷水长时间浸泡，酸度低，口感顺滑，适合冰饮。", "Coffee steeped cold for many hours, low in acidity and smooth over ice.", "咖啡粉:冷水约 1:8-1:12，冷藏 12-16 小时。", "Coffee to water about 1:8-1:12, chilled for 12-16 hours.", ["cold", "smooth", "low acid", "冷萃"], ["使用中粗研磨。", "加入冷水搅匀。", "冷藏 12-16 小时。", "过滤后加冰或加奶。"], ["Use medium-coarse coffee.", "Add cold water and stir.", "Steep chilled 12-16 hours.", "Filter and serve over ice or milk."]],
    ["iced-americano", "iced", "冰美式", "Iced Americano", "浓缩、冷水和冰块组合，清爽、低负担。", "Espresso, cold water, and ice for a crisp and light drink.", "1-2 份浓缩 + 150-220ml 冷水 + 冰块。", "1-2 espresso shots plus 150-220ml cold water and ice.", ["iced", "black", "refreshing", "冰美式"], ["杯中加冰。", "倒入冷水。", "萃取浓缩并倒入。", "轻轻搅拌。"], ["Add ice.", "Pour in cold water.", "Extract and add espresso.", "Stir gently."]],
    ["latte", "milk", "拿铁", "Latte", "浓缩加大量蒸汽牛奶和薄奶泡，柔和易入口。", "Espresso with plenty of steamed milk and thin foam, gentle and approachable.", "1 份浓缩 + 180-240ml 蒸汽牛奶 + 薄奶泡。", "1 espresso shot plus 180-240ml steamed milk and thin foam.", ["milk", "smooth", "beginner", "拿铁", "牛奶"], ["萃取浓缩。", "打发细腻牛奶。", "融合牛奶和浓缩。", "铺平奶面或拉花。"], ["Extract espresso.", "Steam silky milk.", "Integrate milk and espresso.", "Finish smooth or with latte art."]],
    ["iced-latte", "iced", "冰拿铁", "Iced Latte", "冰牛奶加浓缩，奶味清爽，咖啡感直接。", "Cold milk and espresso over ice, refreshing with a direct coffee edge.", "1-2 份浓缩 + 180-220ml 冷牛奶 + 冰块。", "1-2 espresso shots plus 180-220ml cold milk and ice.", ["iced", "milk", "latte", "冰拿铁"], ["杯中加冰。", "倒入冷牛奶。", "萃取浓缩并稍降温。", "慢慢倒在牛奶上。"], ["Add ice.", "Pour cold milk.", "Extract espresso and cool briefly.", "Pour slowly over milk."]],
    ["spanish-latte", "special", "西班牙拿铁", "Spanish Latte", "浓缩、牛奶和炼乳组合，甜感明显，常见于中东和亚洲咖啡馆。", "Espresso, milk, and condensed milk, sweet and common in Middle Eastern and Asian cafes.", "1 份浓缩 + 150-200ml 牛奶 + 15-30g 炼乳。", "1 espresso shot plus 150-200ml milk and 15-30g condensed milk.", ["sweet", "condensed milk", "middle east", "西班牙拿铁", "炼乳"], ["杯中加入炼乳。", "倒入牛奶并搅匀。", "加冰或热蒸奶。", "倒入浓缩并调整甜度。"], ["Add condensed milk.", "Pour in milk and stir.", "Add ice or steamed milk.", "Pour espresso and adjust sweetness."]],
    ["cappuccino", "milk", "卡布奇诺", "Cappuccino", "浓缩、蒸汽牛奶和厚奶泡平衡，咖啡感比拿铁更突出。", "Espresso, steamed milk, and thicker foam in balance, stronger than a latte.", "1 份浓缩 + 约等量蒸汽牛奶 + 奶泡。", "1 espresso shot with roughly equal steamed milk and foam.", ["foam", "milk", "italian", "卡布", "奶泡"], ["萃取浓缩。", "打发较厚奶泡。", "倒入牛奶并保留泡沫。", "表面可撒可可粉。"], ["Extract espresso.", "Steam thicker foam.", "Pour milk while keeping foam.", "Optionally dust cocoa."]],
    ["flat-white", "milk", "馥芮白", "Flat White", "双份浓缩搭配细腻薄奶泡，杯量小于拿铁，咖啡感更强。", "A smaller milk drink with espresso and silky microfoam, stronger than a latte.", "双份浓缩 + 120-160ml 蒸汽牛奶 + 极薄微泡。", "Double espresso plus 120-160ml steamed milk with thin microfoam.", ["australia", "new zealand", "microfoam", "馥芮白"], ["萃取双份浓缩。", "打发细腻少泡牛奶。", "快速融合。", "保持表面平整有光泽。"], ["Extract double espresso.", "Steam fine low-foam milk.", "Integrate quickly.", "Keep the surface glossy and flat."]],
    ["mocha", "special", "摩卡", "Mocha", "拿铁中加入巧克力，兼具咖啡、牛奶和可可甜苦平衡。", "A latte with chocolate, balancing coffee, milk, cocoa sweetness, and bitterness.", "1 份浓缩 + 150-200ml 牛奶 + 15-25g 巧克力酱。", "1 espresso shot plus 150-200ml milk and 15-25g chocolate sauce.", ["chocolate", "sweet", "milk", "摩卡", "巧克力"], ["杯中加入巧克力酱。", "萃取浓缩并搅匀。", "倒入蒸汽牛奶。", "可加奶油或可可粉。"], ["Add chocolate sauce.", "Extract espresso and mix.", "Pour steamed milk.", "Optionally top with cream or cocoa."]],
    ["macchiato", "milk", "玛奇朵", "Espresso Macchiato", "浓缩上点少量奶泡，传统版本很小，咖啡强度高。", "Espresso marked with a small amount of foam; the traditional version is tiny and strong.", "1 份浓缩 + 1-2 勺奶泡。", "1 espresso shot plus 1-2 spoonfuls foam.", ["espresso", "foam", "small", "玛奇朵"], ["萃取浓缩。", "打发少量奶泡。", "用勺子点在表面。", "趁热饮用。"], ["Extract espresso.", "Steam a little foam.", "Spoon foam on top.", "Drink while hot."]],
    ["caramel-macchiato", "special", "焦糖玛奇朵", "Caramel Macchiato", "香草奶、浓缩和焦糖酱组成的甜味层次奶咖。", "A sweet layered milk coffee with vanilla milk, espresso, and caramel sauce.", "1 份浓缩 + 180-220ml 牛奶 + 香草糖浆 + 焦糖酱。", "1 espresso shot plus 180-220ml milk, vanilla syrup, and caramel.", ["caramel", "sweet", "layered", "焦糖"], ["加入香草糖浆。", "倒入牛奶和奶泡。", "加入浓缩形成层次。", "表面淋焦糖酱。"], ["Add vanilla syrup.", "Pour milk and foam.", "Add espresso for layers.", "Drizzle caramel."]],
    ["cortado", "milk", "可塔朵", "Cortado", "浓缩与少量热牛奶近似 1:1，降低刺激但保留强度。", "Espresso cut with near-equal warm milk, softening intensity while keeping strength.", "1 份浓缩 + 约等量热牛奶。", "1 espresso shot plus roughly equal warm milk.", ["small", "balanced", "spanish", "可塔朵"], ["萃取浓缩。", "加热少量牛奶。", "倒入浓缩中。", "用小杯饮用。"], ["Extract espresso.", "Warm a little milk.", "Pour into espresso.", "Serve in a small cup."]],
    ["piccolo", "milk", "小拿铁", "Piccolo Latte", "小杯量奶咖，常用精萃或浓缩加少量牛奶，咖啡味明显。", "A tiny latte-style drink with ristretto or espresso and a small amount of milk.", "1 份精萃或浓缩 + 80-100ml 蒸汽牛奶。", "1 ristretto or espresso plus 80-100ml steamed milk.", ["small", "milk", "australia", "小拿铁"], ["萃取精萃或小份浓缩。", "打发少量细腻牛奶。", "倒入小玻璃杯。", "保持咖啡味为主。"], ["Extract ristretto or small espresso.", "Steam a little silky milk.", "Pour into a small glass.", "Keep coffee prominent."]],
    ["dirty", "special", "Dirty", "Dirty Coffee", "冷牛奶上倒入热浓缩，形成冷热和颜色层次。", "Hot espresso poured over cold milk for layered temperature and color contrast.", "120-160ml 冰冷牛奶 + 1 份热浓缩。", "120-160ml chilled milk plus 1 hot espresso shot.", ["layered", "cold milk", "asia", "dirty", "脏咖啡"], ["杯子和牛奶提前冷藏。", "倒入冷牛奶。", "萃取热浓缩。", "贴近杯壁缓慢倒入。"], ["Chill glass and milk.", "Add cold milk.", "Extract hot espresso.", "Pour slowly near the surface."]],
    ["affogato", "dessert", "阿芙佳朵", "Affogato", "热浓缩浇在香草冰淇淋上，介于咖啡和甜点之间。", "Hot espresso poured over vanilla gelato or ice cream, between coffee and dessert.", "1 份浓缩 + 1 球香草冰淇淋。", "1 espresso shot plus 1 scoop vanilla ice cream.", ["dessert", "gelato", "italian", "阿芙佳朵"], ["杯中放入冰淇淋。", "萃取热浓缩。", "立即浇在冰淇淋上。", "趁冷热交替时食用。"], ["Place ice cream in a cup.", "Extract hot espresso.", "Pour over immediately.", "Eat while hot and cold contrast remains."]],
    ["con-panna", "dessert", "康宝蓝", "Espresso Con Panna", "浓缩上覆盖鲜奶油，甜润但仍保留浓缩强度。", "Espresso topped with whipped cream, sweet and rich while retaining espresso strength.", "1 份浓缩 + 1-2 勺鲜奶油。", "1 espresso shot plus 1-2 spoonfuls whipped cream.", ["cream", "espresso", "dessert", "康宝蓝"], ["萃取浓缩。", "打发冷藏淡奶油。", "轻放在浓缩表面。", "可不搅拌直接饮用。"], ["Extract espresso.", "Whip chilled cream.", "Place gently on top.", "Drink without stirring if preferred."]],
    ["irish-coffee", "dessert", "爱尔兰咖啡", "Irish Coffee", "热咖啡、爱尔兰威士忌、糖和奶油组合，温暖浓郁。", "Hot coffee, Irish whiskey, sugar, and cream: warm, rich, and spirited.", "120ml 热咖啡 + 30-45ml 威士忌 + 糖 + 奶油。", "120ml hot coffee plus 30-45ml whiskey, sugar, and cream.", ["whiskey", "cream", "hot", "爱尔兰"], ["预热玻璃杯。", "加入糖、咖啡和威士忌。", "搅拌至糖溶解。", "沿勺背铺上奶油。"], ["Preheat glass.", "Add sugar, coffee, and whiskey.", "Stir until sugar dissolves.", "Float cream over a spoon."]],
    ["vienna-coffee", "dessert", "维也纳咖啡", "Vienna Coffee", "黑咖或浓缩加鲜奶油，甜润、复古，适合慢慢喝。", "Black coffee or espresso with whipped cream, sweet, old-world, and slow-sipping.", "1 杯黑咖或 1-2 份浓缩 + 适量鲜奶油。", "1 cup black coffee or 1-2 espresso shots plus whipped cream.", ["vienna", "cream", "classic", "维也纳"], ["准备热黑咖或浓缩。", "轻打发鲜奶油。", "铺在咖啡表面。", "可撒巧克力或可可粉。"], ["Prepare hot black coffee or espresso.", "Lightly whip cream.", "Place cream on top.", "Optionally add chocolate or cocoa."]],
    ["vietnamese-coffee", "special", "越南咖啡", "Vietnamese Coffee", "常用滴滤壶和炼乳，甜、浓、厚重，冰饮尤其常见。", "Often brewed with a phin and condensed milk; sweet, strong, heavy-bodied, and often iced.", "20g 咖啡粉 + 30g 炼乳 + 100ml 热水。", "20g coffee, 30g condensed milk, and 100ml hot water.", ["condensed milk", "vietnam", "phin", "越南", "炼乳"], ["杯中加入炼乳。", "装好 phin 滴滤壶。", "闷蒸后继续注水。", "滴滤完成后搅拌，可加冰。"], ["Add condensed milk.", "Set up the phin filter.", "Bloom, then fill with water.", "Stir after dripping; add ice if desired."]],
    ["turkish-coffee", "black", "土耳其咖啡", "Turkish Coffee", "极细粉直接煮制，不过滤，口感厚重，杯底有咖啡渣。", "Very finely ground coffee boiled without filtering, full-bodied with grounds at the bottom.", "每杯 6-8g 极细咖啡粉 + 60-70ml 水。", "6-8g very fine coffee plus 60-70ml water per cup.", ["turkish", "boiled", "strong", "土耳其"], ["把水和极细粉加入 cezve。", "可按口味加糖。", "小火加热至起泡。", "倒入小杯并静置。"], ["Add water and fine coffee to a cezve.", "Add sugar if desired.", "Heat gently until foamy.", "Pour into a small cup and let settle."]],
    ["cafe-au-lait", "milk", "欧蕾咖啡", "Cafe au Lait", "黑咖与热牛奶混合，通常不用浓缩，口感家常温和。", "Brewed coffee mixed with hot milk, usually not espresso-based, gentle and homey.", "1 份热黑咖 + 1 份热牛奶。", "1 part hot brewed coffee plus 1 part hot milk.", ["french", "milk", "breakfast", "欧蕾"], ["冲煮一杯黑咖。", "加热牛奶但不打厚泡。", "按 1:1 混合。", "可搭配面包或甜点。"], ["Brew black coffee.", "Heat milk without thick foam.", "Mix about 1:1.", "Serve with bread or pastry."]],
  ];

  function expand(item) {
    const [id, category, zh, en, summaryZh, summaryEn, ratioZh, ratioEn, tags, stepsZh, stepsEn] = item;
    const categoryName = C[category];
    const originZh = `${zh}的形成与${categoryName.zh}饮用习惯、咖啡馆菜单和家庭制作方式有关。对新手来说，理解它的杯量、浓度和搭配方式，比追求唯一正宗答案更有帮助。`;
    const originEn = `${en} developed through ${categoryName.en.toLowerCase()} habits, cafe menus, and home preparation styles. For beginners, understanding its cup size, strength, and pairing logic matters more than chasing one single authentic rule.`;
    const flavorZh = `${summaryZh} 品尝时可以观察香气、甜感、苦感和质地是否平衡；如果某一项过强，通常可以从研磨、萃取时间、奶量或水量上微调。`;
    const flavorEn = `${summaryEn} When tasting, notice whether aroma, sweetness, bitterness, and texture feel balanced; if one part dominates, adjust grind, extraction time, milk, or water in small steps.`;
    const tipsZh = `第一次制作${zh}时，建议先按页面配比完成一杯并记录味道，再只改变一个变量。这样即使失败，也能知道问题来自萃取、稀释、温度还是牛奶处理。`;
    const tipsEn = `When making ${en} for the first time, use the listed ratio and write down the taste before changing one variable. That makes it easier to tell whether the issue comes from extraction, dilution, temperature, or milk handling.`;
    const domestic = domesticByGroup[category];
    const international = (internationalRefs[id] || ["laColombe"]).map((key) => cafeRef(key, cafeWhy[key][0], cafeWhy[key][1]));
    return {
      id,
      category,
      categoryName,
      name: t(zh, en),
      summary: t(`${summaryZh} 对新手来说，最值得观察的是它与相近饮品在浓度、杯量、奶量或冰热状态上的区别。制作时先把配比固定下来，再微调口味，会比每次随意改变更容易进步。`, `${summaryEn} For beginners, the key is to compare its strength, cup size, milk amount, or hot/cold style with nearby drinks. Keep the ratio stable first, then adjust one detail at a time so progress is easier to taste.`),
      origin: t(originZh, originEn),
      flavor: t(flavorZh, flavorEn),
      ingredients: t(category === "milk" || category === "special" ? "咖啡、牛奶，以及该饮品需要的糖浆、炼乳、巧克力或奶泡。" : "咖啡、过滤水，以及该饮品需要的冰块、奶油、酒或甜品配料。", category === "milk" || category === "special" ? "Coffee, milk, and any syrup, condensed milk, chocolate, or foam needed for the drink." : "Coffee, filtered water, and any ice, cream, spirits, or dessert ingredients needed for the drink."),
      ratio: t(ratioZh, ratioEn),
      composition: compositionCatalog[id],
      steps: t(stepsZh, stepsEn),
      tips: t(tipsZh, tipsEn),
      tags,
      photos: matchedPhotos({ id, zh, en, tags }),
      notableCafes: { domestic, international },
    };
  }

  window.COFFEE_DATA = coffeeItems.map(expand);
})();

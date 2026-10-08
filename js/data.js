/* ==========================================================================
   Site data — edit this file to change contact details, gold rates and products.
   ========================================================================== */
window.ZJ = window.ZJ || {};

/* Contact details used across the site (elements with data-site="…"). */
ZJ.SITE = {
  name: 'Zahabiya Jewellers',
  phone: '+974 [PHONE]',          // shown to visitors
  phoneLink: '+974',              // used in tel: links, digits only
  whatsapp: '974',                // used in wa.me links, digits only
  email: 'hello@example.com',
  address: 'Gold Souq, Souq Waqif, Doha'
};

/* Gold rates in QAR per gram.
   SAMPLE FIGURES — replace with a live rate feed before launch.
   `change` is today's movement in QAR. */
ZJ.RATES = {
  '24K': { price: 312.40, change: 2.45, purity: '999 · Fine gold' },
  '22K': { price: 289.50, change: 2.10, purity: '916 · Jewellery' },
  '21K': { price: 276.30, change: 1.95, purity: '875 · Jewellery' },
  '18K': { price: 236.80, change: 1.60, purity: '750 · Jewellery' }
};

ZJ.CATEGORIES = {
  ring: 'Rings',
  necklace: 'Necklaces',
  bangle: 'Bangles',
  earring: 'Earrings',
  bar: 'Bars & Coins'
};

/* Products.
   `price` is the listed price at the product's default karat; the making
   charge is derived from it, so prices follow the gold rate automatically.
   `tags` drive the Home page tabs. `offer: true` = 0% making-charge offer. */
ZJ.PRODUCTS = [
  { id: 'lulwa-pearl-pendant', name: 'Lulwa Pearl Pendant', category: 'necklace', karat: '21K', weight: 5.4, price: 1960,
    img: 'images/lulwa-pearl-pendant.jpg', badge: 'Bestseller', tags: ['bestseller'],
    desc: 'A lustrous freshwater pearl cradled in a sculpted gold teardrop, hung on a fine rope chain. A tribute to the pearl divers of the Gulf.' },
  { id: 'zaytoun-leaf-ring', name: 'Zaytoun Leaf Ring', category: 'ring', karat: '21K', weight: 4.1, price: 1320,
    img: 'images/zaytoun-leaf-ring.jpg', badge: 'Bestseller', tags: ['bestseller'],
    desc: 'A crown of hand-polished olive leaves wrapping the finger — symbol of peace and plenty.' },
  { id: 'tulip-pearl-bangle', name: 'Tulip Pearl Bangle', category: 'bangle', karat: '18K', weight: 9.8, price: 3240,
    img: 'images/tulip-pearl-bangle.jpg', badge: '0% making', tags: ['bestseller'], offer: true,
    desc: 'A hinged bangle with a mother-of-pearl tulip and a pavé stem. Opens easily, sits comfortably all day.' },
  { id: 'ruya-oval-drops', name: 'Ruya Oval Drops', category: 'earring', karat: '18K', weight: 3.6, price: 2350,
    img: 'images/ruya-oval-drops.jpg', badge: 'Bestseller', tags: ['bestseller'],
    desc: 'Oval-cut stones on secure lever-back hooks. Light enough for every day, bright enough for evenings.' },

  { id: 'lawlab-spiral-pendant', name: 'Lawlab Spiral Pendant', category: 'necklace', karat: '18K', weight: 3.0, price: 1150,
    img: 'images/lawlab-spiral-pendant.jpg', badge: 'New', tags: ['new'],
    desc: 'A sculptural gold spiral crowned with a single brilliant stone, on a delicate chain.' },
  { id: 'ittihad-two-tone-ring', name: 'Ittihad Two-Tone Ring', category: 'ring', karat: '18K', weight: 2.4, price: 980,
    img: 'images/ittihad-two-tone-ring.jpg', badge: 'New', tags: ['new'],
    desc: 'Rose and white gold bands crossing in a gentle knot, set with a small line of stones.' },
  { id: 'abadi-infinity-studs', name: 'Abadi Infinity Studs', category: 'earring', karat: '18K', weight: 2.1, price: 890,
    img: 'images/abadi-infinity-studs.jpg', badge: 'New', tags: ['new'],
    desc: 'Infinity-loop studs with a bezel-set stone — a quiet promise for every day.' },
  { id: 'mawja-pave-loops', name: 'Mawja Pavé Loops', category: 'earring', karat: '18K', weight: 3.4, price: 1580,
    img: 'images/mawja-pave-loops.jpg', badge: 'New', tags: ['new'],
    desc: 'Wave-shaped loops lined with pavé stones that catch the light from every angle.' },

  { id: 'al-arous-emerald-necklace', name: 'Al Arous Emerald Necklace', category: 'necklace', karat: '22K', weight: 46, price: 38900,
    img: 'images/al-arous-emerald-necklace.jpg', badge: 'Bridal', tags: ['bridal'],
    desc: 'Our signature bridal necklace: cascading leaves of stones finished with a pear-cut emerald drop.' },
  { id: 'hilal-open-ring', name: 'Hilal Open Ring', category: 'ring', karat: '18K', weight: 3.9, price: 1890,
    img: 'images/hilal-open-ring.jpg', badge: 'Bridal', tags: ['bridal'],
    desc: 'A brushed open band with a trail of stones — modern, adjustable and made to be stacked.' },
  { id: 'jadila-twist-drops', name: 'Jadila Twist Drops', category: 'earring', karat: '21K', weight: 5.2, price: 1690,
    img: 'images/jadila-twist-drops.jpg', badge: 'Bridal', tags: ['bridal'],
    desc: 'Twisted-rope teardrops finished with a curve of brilliant stones.' },
  { id: 'maas-kite-pendant', name: 'Maas Kite Pendant', category: 'necklace', karat: '18K', weight: 4.6, price: 4850,
    img: 'images/maas-kite-pendant.jpg', badge: 'Bridal', tags: ['bridal'],
    desc: 'A floating round stone suspended in an open kite frame, topped with a pavé bail.' },

  { id: 'gold-bar-500g', name: 'Fine Gold Bar · 500 g', category: 'bar', karat: '24K', weight: 500, price: 156450,
    img: 'images/gold-bar-500g.jpg', badge: 'Invest', tags: ['invest'], fixedKarat: true,
    desc: '999.9 fine gold bar, sealed with assay certificate. Guaranteed buy-back at the live Doha rate.' },
  { id: 'gold-coin-8g', name: 'Fine Gold Coin · 8 g', category: 'bar', karat: '24K', weight: 8, price: 2560,
    img: 'images/gold-coin-8g.jpg', badge: '', tags: ['invest'], fixedKarat: true,
    desc: '999.9 fine gold coin with a rose reverse — a classic gift for weddings and newborns.' }
];

/* Arabic versions of the data above (used when the site is in Arabic).
   When you add a product, add its Arabic name and description here too. */
ZJ.AR = {
  address: 'سوق الذهب، سوق واقف، الدوحة',
  categories: { ring: 'خواتم', necklace: 'قلائد', bangle: 'أساور', earring: 'أقراط', bar: 'سبائك وعملات' },
  purity: { '24K': '999 · ذهب خالص', '22K': '916 · مجوهرات', '21K': '875 · مجوهرات', '18K': '750 · مجوهرات' },
  badges: { 'Bestseller': 'الأكثر مبيعًا', '0% making': 'بدون مصنعية', 'New': 'جديد', 'Bridal': 'زفاف', 'Invest': 'استثمار' },
  products: {
    'lulwa-pearl-pendant': ['قلادة لولوة باللؤلؤ', 'لؤلؤة لامعة تحتضنها قطرة ذهبية منحوتة، معلّقة على سلسلة رفيعة مجدولة. تحية لغوّاصي اللؤلؤ في الخليج.'],
    'zaytoun-leaf-ring': ['خاتم أوراق الزيتون', 'تاج من أوراق الزيتون المصقولة يدويًا يلتف حول الإصبع — رمز السلام والخير.'],
    'tulip-pearl-bangle': ['سوار التوليب باللؤلؤ', 'سوار بمفصلة تزيّنه زهرة توليب من عرق اللؤلؤ وساق مرصّعة. سهل الفتح ومريح طوال اليوم.'],
    'ruya-oval-drops': ['أقراط رؤيا البيضاوية', 'أحجار بقطع بيضاوي على خطافات آمنة. خفيفة للاستخدام اليومي ولامعة للسهرات.'],
    'lawlab-spiral-pendant': ['قلادة لولب الحلزونية', 'حلزون ذهبي منحوت يعلوه حجر لامع واحد، على سلسلة رقيقة.'],
    'ittihad-two-tone-ring': ['خاتم اتحاد بلونين', 'حلقتان من الذهب الوردي والأبيض تتقاطعان في عقدة ناعمة، مرصّعتان بصف صغير من الأحجار.'],
    'abadi-infinity-studs': ['أقراط أبدي', 'أقراط على شكل رمز اللانهاية بحجر مثبّت — وعدٌ هادئ لكل يوم.'],
    'mawja-pave-loops': ['أقراط موجة المرصّعة', 'حلقات على شكل موجة مرصّعة بأحجار تلتقط الضوء من كل زاوية.'],
    'al-arous-emerald-necklace': ['عقد العروس بالزمرد', 'عقد الزفاف المميز لدينا: أوراق متدرجة من الأحجار تنتهي بقطرة زمرد كمثرية الشكل.'],
    'hilal-open-ring': ['خاتم هلال المفتوح', 'حلقة مفتوحة بلمسة مطفأة يزيّنها خط من الأحجار — عصرية وقابلة للتعديل ومصممة للتنسيق.'],
    'jadila-twist-drops': ['أقراط جديلة', 'قطرات مجدولة على شكل حبل تنتهي بانحناءة من الأحجار اللامعة.'],
    'maas-kite-pendant': ['قلادة ماس', 'حجر دائري يطفو داخل إطار معيّن مفتوح، تعلوه علّاقة مرصّعة.'],
    'gold-bar-500g': ['سبيكة ذهب خالص · 500 غرام', 'سبيكة ذهب خالص 999.9 مختومة مع شهادة فحص. إعادة شراء مضمونة بسعر الدوحة المباشر.'],
    'gold-coin-8g': ['عملة ذهب خالص · 8 غرام', 'عملة ذهب خالص 999.9 بنقش وردة على ظهرها — هدية كلاسيكية للأعراس والمواليد.']
  }
};

/* Derive each product's making charge from its listed price. */
ZJ.PRODUCTS.forEach(function (p) {
  p.making = Math.max(0, p.price - p.weight * ZJ.RATES[p.karat].price);
});

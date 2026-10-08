/* ==========================================================================
   Language support — English (default) and Arabic (right-to-left).

   How it works
   - The language comes from ?lang=ar|en, else the visitor's last choice.
   - In Arabic, static page text is translated by matching its English text
     against STATIC below; elements with inline markup carry data-i18n="key"
     and are swapped from HTML below. Scripts use ZJ.t() for dynamic text.
   - The header button switches language and reloads the page.

   To translate new text: add the exact English string to STATIC (or a
   data-i18n key to HTML), and its Arabic version as the value.
   ========================================================================== */
(function () {
  var ZJ = window.ZJ = window.ZJ || {};
  var KEY = 'zahabiya-lang';

  function readLang() {
    var p = new URLSearchParams(location.search).get('lang');
    if (p === 'ar' || p === 'en') {
      try { localStorage.setItem(KEY, p); } catch (e) { /* ignore */ }
      return p;
    }
    try { return localStorage.getItem(KEY) === 'ar' ? 'ar' : 'en'; } catch (e) { return 'en'; }
  }

  ZJ.lang = readLang();
  ZJ.isAr = ZJ.lang === 'ar';
  document.documentElement.lang = ZJ.lang;
  document.documentElement.dir = ZJ.isAr ? 'rtl' : 'ltr';

  /* ---------- Dynamic strings used by the page scripts ---------- */
  var DYN = {
    en: {
      qar: 'QAR', g: 'g', cm: 'cm',
      titleSuffix: ' — Zahabiya Jewellers',
      addedToBag: '{name} added to your bag', viewBag: 'View bag', addToBagAria: 'Add {name} to bag',
      newsletterThanks: "Thank you — you're on the list.",
      tickerRate: 'QAR {v} / g', todayChange: '▲ {v} today',
      all: 'All', bridal: 'Bridal', offerLabel: '0% Making Offer', allCollections: 'All Collections',
      goldCollection: 'The Gold Collection', goldCollectionHtml: 'The <span class="shine italic">Gold</span> Collection',
      any: 'Any', filters: 'Filters', hideFilters: 'Hide filters',
      chainLength: 'Chain length', ringSize: 'Ring size', bangleSize: 'Bangle size',
      handFinished: ' Hand-finished in our Doha atelier.',
      certText: 'Hallmarked for purity and supplied with a weight certificate and Zahabiya authenticity card. Lifetime buy-back at the prevailing Doha gold rate, minus making charges.',
      deliveryText: 'Same-day insured delivery within Doha on orders before 2 pm; 1–2 days elsewhere in Qatar. Free over QAR 2,000. Collect in-store at Souq Waqif. 7-day exchange on unworn items.',
      giftBox: 'Gift box', show: 'Show {x}',
      goldValueLabel: 'Gold value ({w} g × QAR {r})',
      waMessage: "Hello Zahabiya, I'm interested in the {name}.",
      per: 'per {unit}', gram: 'gram', tola: 'tola', ounce: 'ounce',
      period0: '7 days ago', period1: '30 days ago', period2: '6 months ago', period3: '1 year ago',
      calcNote: '{w} g × QAR {r} ({k})',
      decQty: 'Decrease quantity of {name}', incQty: 'Increase quantity of {name}', remove: 'Remove {name}',
      promoInvalid: 'This code isn’t valid.', promoEmpty: 'Enter a promo code.',
      errName: 'Please enter your name.', errPhone: 'Enter an 8-digit Qatar mobile number.',
      errEmail: 'Enter a valid email address.', errRequired: 'Required.', errCard: 'Enter a valid card number.',
      errExp: 'Use MM / YY.', errCvv: '3 or 4 digits.', errAgree: 'Please accept the terms to continue.',
      insuredDelivery: 'Insured delivery', storePickup: 'Store pickup',
      langSwitch: 'عربي', langSwitchLabel: 'التبديل إلى العربية'
    },
    ar: {
      qar: 'ر.ق', g: 'غ', cm: 'سم',
      titleSuffix: ' — مجوهرات ذهبية',
      addedToBag: 'تمت إضافة {name} إلى حقيبتك', viewBag: 'عرض الحقيبة', addToBagAria: 'أضف {name} إلى الحقيبة',
      newsletterThanks: 'شكرًا لك — تم تسجيلك في القائمة.',
      tickerRate: '{v} ر.ق / غ', todayChange: '▲ {v} اليوم',
      all: 'الكل', bridal: 'الزفاف', offerLabel: 'عرض بدون مصنعية', allCollections: 'جميع المجموعات',
      goldCollection: 'مجموعة الذهب', goldCollectionHtml: 'مجموعة <span class="shine">الذهب</span>',
      any: 'أي سعر', filters: 'التصفية', hideFilters: 'إخفاء التصفية',
      chainLength: 'طول السلسلة', ringSize: 'مقاس الخاتم', bangleSize: 'مقاس السوار',
      handFinished: ' مشغولة يدويًا في مشغلنا بالدوحة.',
      certText: 'مدموغة لضمان النقاء ومرفقة بشهادة وزن وبطاقة أصالة من ذهبية. إعادة شراء مدى الحياة بسعر الذهب السائد في الدوحة، مع خصم أجور المصنعية.',
      deliveryText: 'توصيل مؤمَّن في نفس اليوم داخل الدوحة للطلبات قبل الساعة 2 ظهرًا، وخلال يوم إلى يومين لباقي مناطق قطر. مجاني للطلبات فوق 2,000 ر.ق. الاستلام من معرضنا في سوق واقف. استبدال خلال 7 أيام للقطع غير المستخدمة.',
      giftBox: 'علبة الهدية', show: 'عرض {x}',
      goldValueLabel: 'قيمة الذهب ({w} غ × {r} ر.ق)',
      waMessage: 'مرحبًا ذهبية، أنا مهتم بـ {name}.',
      per: 'لكل {unit}', gram: 'غرام', tola: 'تولة', ounce: 'أونصة',
      period0: 'قبل 7 أيام', period1: 'قبل 30 يومًا', period2: 'قبل 6 أشهر', period3: 'قبل سنة',
      calcNote: '{w} غ × {r} ر.ق ({k})',
      decQty: 'إنقاص كمية {name}', incQty: 'زيادة كمية {name}', remove: 'إزالة {name}',
      promoInvalid: 'هذا الرمز غير صالح.', promoEmpty: 'أدخل رمز الخصم.',
      errName: 'يرجى إدخال اسمك.', errPhone: 'أدخل رقم جوال قطري من 8 أرقام.',
      errEmail: 'أدخل بريدًا إلكترونيًا صحيحًا.', errRequired: 'مطلوب.', errCard: 'أدخل رقم بطاقة صحيحًا.',
      errExp: 'استخدم الصيغة MM / YY.', errCvv: '3 أو 4 أرقام.', errAgree: 'يرجى الموافقة على الشروط للمتابعة.',
      insuredDelivery: 'توصيل مؤمَّن', storePickup: 'الاستلام من المعرض',
      langSwitch: 'English', langSwitchLabel: 'Switch to English'
    }
  };

  ZJ.t = function (key, vars) {
    var s = (DYN[ZJ.lang] && DYN[ZJ.lang][key]) || DYN.en[key] || key;
    if (vars) Object.keys(vars).forEach(function (k) { s = s.split('{' + k + '}').join(vars[k]); });
    return s;
  };

  /* "14 pieces" / "14 قطعة" — Arabic counted nouns change with the number. */
  ZJ.count = function (n, kind) {
    if (!ZJ.isAr) return n + ' ' + (kind === 'item' ? (n === 1 ? 'item' : 'items') : (n === 1 ? 'piece' : 'pieces'));
    var f = kind === 'item'
      ? ['منتج واحد', 'منتجان', 'منتجات', 'منتجًا']
      : ['قطعة واحدة', 'قطعتان', 'قطع', 'قطعة'];
    if (n === 0) return '0 ' + f[3];
    if (n === 1) return f[0];
    if (n === 2) return f[1];
    return n + ' ' + (n <= 10 ? f[2] : f[3]);
  };

  /* Product & data helpers */
  ZJ.pName = function (p) { return ZJ.isAr && ZJ.AR && ZJ.AR.products[p.id] ? ZJ.AR.products[p.id][0] : p.name; };
  ZJ.pDesc = function (p) { return ZJ.isAr && ZJ.AR && ZJ.AR.products[p.id] ? ZJ.AR.products[p.id][1] : p.desc; };
  ZJ.catName = function (c) { return ZJ.isAr && ZJ.AR ? ZJ.AR.categories[c] : ZJ.CATEGORIES[c]; };
  ZJ.purity = function (k) { return ZJ.isAr && ZJ.AR ? ZJ.AR.purity[k] : ZJ.RATES[k].purity; };
  ZJ.badgeText = function (p) { return ZJ.isAr && ZJ.AR && ZJ.AR.badges[p.badge] ? ZJ.AR.badges[p.badge] : p.badge; };

  if (!ZJ.isAr) { initToggle(); return; }

  /* ---------- Static page text (English → Arabic) ---------- */
  var STATIC = {
    /* Header & footer */
    'Jewellers · Doha': 'مجوهرات · الدوحة',
    'Home': 'الرئيسية', 'Collections': 'المجموعات', 'Bridal': 'الزفاف', 'Gold Rates': 'أسعار الذهب',
    'Our Story': 'قصتنا', 'Contact': 'اتصل بنا',
    'Zahabiya Jewellers — home': 'مجوهرات ذهبية — الرئيسية', 'Main': 'القائمة الرئيسية',
    'Search the collection': 'ابحث في المجموعة', 'Shopping bag': 'حقيبة التسوق', 'Breadcrumb': 'مسار التنقل',
    'Fine gold jewellery, bars and coins from the heart of Souq Waqif, Doha.': 'مجوهرات ذهبية فاخرة وسبائك وعملات من قلب سوق واقف، الدوحة.',
    'Shop': 'تسوّق', 'Rings': 'خواتم', 'Necklaces': 'قلائد', 'Bangles': 'أساور', 'Earrings': 'أقراط',
    'Bars & Coins': 'سبائك وعملات', 'Help': 'المساعدة', 'Gold rates': 'أسعار الذهب', 'FAQ': 'الأسئلة الشائعة',
    'Your bag': 'حقيبتك', 'Our story': 'قصتنا', 'Visit': 'زورونا',
    'Gold Souq, Souq Waqif, Doha': 'سوق الذهب، سوق واقف، الدوحة',
    'Sat–Thu 9:30–13:00 · 16:00–22:00': 'السبت–الخميس 9:30–13:00 · 16:00–22:00',
    'Fri 16:00–22:00': 'الجمعة 16:00–22:00',
    'Zahabiya Jewellers': 'مجوهرات ذهبية', 'Zahabiya Jewellers ·': 'مجوهرات ذهبية ·',
    'Zahabiya Jewellers · Doha, Qatar': 'مجوهرات ذهبية · الدوحة، قطر',
    'Prices in Qatari Riyal (QAR)': 'الأسعار بالريال القطري (ر.ق)',

    /* Page titles & descriptions */
    'Zahabiya Jewellers — Fine Gold in Doha, Qatar': 'مجوهرات ذهبية — ذهب فاخر في الدوحة، قطر',
    'The Gold Collection — Zahabiya Jewellers': 'مجموعة الذهب — مجوهرات ذهبية',
    'Product — Zahabiya Jewellers': 'المنتج — مجوهرات ذهبية',
    "Today's Gold Rate in Qatar — Zahabiya Jewellers": 'سعر الذهب اليوم في قطر — مجوهرات ذهبية',
    'Your Bag — Zahabiya Jewellers': 'حقيبتك — مجوهرات ذهبية',
    'Secure Checkout — Zahabiya Jewellers': 'إتمام الشراء — مجوهرات ذهبية',
    'Our Story — Zahabiya Jewellers': 'قصتنا — مجوهرات ذهبية',
    'Contact & Showroom — Zahabiya Jewellers': 'اتصل بنا والمعرض — مجوهرات ذهبية',
    'Fine gold jewellery, bridal sets, bars and coins from Souq Waqif, Doha. Prices follow the live Qatar gold rate.': 'مجوهرات ذهبية فاخرة وأطقم زفاف وسبائك وعملات من سوق واقف، الدوحة. أسعار تتبع سعر الذهب المباشر في قطر.',
    "Shop gold rings, necklaces, bangles, earrings, bars and coins in 18K, 21K, 22K and 24K. Priced against today's Doha gold rate.": 'تسوّق خواتم وقلائد وأساور وأقراط وسبائك وعملات ذهبية بعيار 18 و21 و22 و24، بأسعار مرتبطة بسعر الذهب اليوم في الدوحة.',
    "Fine gold jewellery from Zahabiya Jewellers, Doha. Transparent pricing based on today's gold rate.": 'مجوهرات ذهبية فاخرة من مجوهرات ذهبية في الدوحة. تسعير شفاف يعتمد على سعر الذهب اليوم.',
    "Today's 24K, 22K, 21K and 18K gold rates in Qatar, with a price trend chart and gold value calculator.": 'أسعار الذهب اليوم في قطر لعيار 24 و22 و21 و18، مع رسم بياني للأسعار وحاسبة لقيمة الذهب.',
    'Three generations of gold in the heart of Souq Waqif, Doha. Certified purity, honest pricing and handcrafted jewellery.': 'ثلاثة أجيال من الذهب في قلب سوق واقف، الدوحة. نقاء معتمد وتسعير شفاف ومجوهرات مصنوعة يدويًا.',
    'Visit Zahabiya Jewellers in the Gold Souq, Souq Waqif, Doha, or reach us on WhatsApp, phone or email.': 'زوروا مجوهرات ذهبية في سوق الذهب بسوق واقف في الدوحة، أو تواصلوا معنا عبر واتساب أو الهاتف أو البريد الإلكتروني.',

    /* Home */
    "Today's gold rates": 'أسعار الذهب اليوم', 'Featured collections': 'المجموعات المميزة',
    '1 of 3': '1 من 3', '2 of 3': '2 من 3', '3 of 3': '3 من 3',
    'Bridal Collection 2026': 'مجموعة الزفاف 2026',
    'Hand-finished 21K & 22K bridal sets.': 'أطقم زفاف عيار 21 و22 مشغولة يدويًا.',
    'Explore Bridal': 'اكتشفي مجموعة الزفاف', "Today's Gold Rate": 'سعر الذهب اليوم',
    'Emerald and diamond bridal necklace on gold satin': 'عقد زفاف بالزمرد والألماس على ساتان ذهبي',
    'Everyday Luxe': 'فخامة كل يوم', 'Light 18K & 21K pieces for every day.': 'قطع خفيفة عيار 18 و21 لكل يوم.',
    'Shop Daily Wear': 'تسوّق القطع اليومية', 'Gold tulip bangle with mother-of-pearl': 'سوار ذهبي على شكل توليب بعرق اللؤلؤ',
    'Invest in Gold': 'استثمر في الذهب', 'Certified 24K gold with guaranteed buy-back.': 'ذهب عيار 24 معتمد مع ضمان إعادة الشراء.',
    'Shop Bars & Coins': 'تسوّق السبائك والعملات',
    '500 g fine gold bar on cream satin': 'سبيكة ذهب خالص وزن 500 غرام على ساتان كريمي',
    'Show slide 1': 'عرض الشريحة 1', 'Show slide 2': 'عرض الشريحة 2', 'Show slide 3': 'عرض الشريحة 3',
    'Previous slide': 'الشريحة السابقة', 'Next slide': 'الشريحة التالية',
    'Why shop with us': 'لماذا تتسوق معنا', 'Certified purity': 'نقاء معتمد', 'Free delivery': 'توصيل مجاني',
    'Gold exchange': 'استبدال الذهب', 'Instalments': 'التقسيط',
    'View all collections': 'عرض جميع المجموعات', 'Offers': 'العروض',
    'QATAR NATIONAL DAY · 18 DEC': 'اليوم الوطني القطري · 18 ديسمبر',
    'On selected necklaces and bangles.': 'على قلائد وأساور مختارة.', 'Shop the Offer': 'تسوّق العرض',
    'GOLD EXCHANGE': 'استبدال الذهب', "Upgrade your old jewellery at today's live rate.": 'استبدل مجوهراتك القديمة بسعر اليوم المباشر.',
    'Book a valuation': 'احجز تقييمًا', 'Fine gold coins': 'عملات ذهب خالص',
    'INVESTMENT GOLD': 'ذهب استثماري', 'Start investing': 'ابدأ الاستثمار', '24K fine gold bar': 'سبيكة ذهب خالص عيار 24',
    'The Treasure Room': 'خزانة الكنوز', 'Featured products': 'منتجات مميزة',
    'Bestsellers': 'الأكثر مبيعًا', 'New Arrivals': 'وصل حديثًا',
    'Today in Doha': 'اليوم في الدوحة', 'LIVE · QAR / GRAM': 'مباشر · ر.ق / غرام',
    'Rate history & calculator': 'سجل الأسعار والحاسبة',
    'The Bridal Atelier': 'مشغل العرائس',
    'Private appointments and bespoke sets, made in Doha.': 'مواعيد خاصة وأطقم حسب الطلب، تُصنع في الدوحة.',
    'Book Private Viewing': 'احجزي موعدًا خاصًا', 'Browse Bridal': 'تصفّحي مجموعة الزفاف',
    'Gold rate alerts': 'تنبيهات أسعار الذهب', 'Email or WhatsApp number': 'البريد الإلكتروني أو رقم واتساب',
    'Email or +974 WhatsApp': 'البريد الإلكتروني أو واتساب +974', 'Subscribe': 'اشترك',

    /* Shop */
    'All Collections': 'جميع المجموعات', 'Emerald and diamond necklace': 'عقد بالزمرد والألماس',
    'Filters': 'التصفية', 'Refine': 'تصفية النتائج', 'Clear all': 'مسح الكل', 'Category': 'الفئة',
    'Karat': 'العيار', 'Max price': 'أقصى سعر', 'QAR 500': '500 ر.ق', 'Any': 'أي سعر',
    'Search': 'بحث', 'Search jewellery': 'ابحث عن مجوهرات', 'Sort by': 'ترتيب حسب',
    'Featured': 'المميزة', 'Price: low to high': 'السعر: من الأقل إلى الأعلى', 'Price: high to low': 'السعر: من الأعلى إلى الأقل',
    'Weight: heaviest': 'الوزن: الأثقل', 'Newest': 'الأحدث',
    'No pieces match these filters': 'لا توجد قطع مطابقة لهذه الخيارات', 'Clear filters': 'مسح التصفية',
    'Want something bespoke?': 'تبحث عن تصميم خاص؟', 'Request a custom design': 'اطلب تصميمًا خاصًا',

    /* Product */
    'Collection': 'المجموعة', 'Transparent price': 'سعر شفاف', 'Gold value': 'قيمة الذهب',
    'Making & stone charges': 'أجور المصنعية والأحجار', 'Hallmark & certificate': 'الدمغة والشهادة',
    'Total': 'الإجمالي', 'Decrease quantity': 'إنقاص الكمية', 'Increase quantity': 'زيادة الكمية',
    'Add to Bag': 'أضف إلى الحقيبة', 'Ask on WhatsApp': 'اسأل عبر واتساب',
    'Hallmarked': 'مدموغ', 'Purity certified': 'نقاء معتمد', 'Same-day': 'في نفس اليوم',
    'Doha delivery': 'توصيل داخل الدوحة', 'Lifetime': 'مدى الحياة', 'Buy-back': 'إعادة الشراء',
    'Product information': 'معلومات المنتج', 'Details': 'التفاصيل', 'Certification': 'الشهادات', 'Delivery': 'التوصيل',
    'View collection': 'عرض المجموعة',

    /* Gold rates */
    'LIVE · DOHA': 'مباشر · الدوحة', 'Unit': 'الوحدة', 'Period': 'الفترة',
    'Gram': 'غرام', 'Tola': 'تولة', 'Ounce': 'أونصة',
    '24K price trend': 'اتجاه سعر عيار 24', '24K gold price trend': 'اتجاه سعر الذهب عيار 24', 'QAR per gram': 'ر.ق للغرام',
    '7D': '7 أيام', '1M': 'شهر', '6M': '6 أشهر', '1Y': 'سنة',
    'HIGH': 'الأعلى', 'LOW': 'الأدنى', 'CHANGE': 'التغيّر', 'Today': 'اليوم',
    'Gold value calculator': 'حاسبة قيمة الذهب', 'Weight (grams)': 'الوزن (غرام)',
    'ESTIMATED VALUE': 'القيمة التقديرية', 'Book an exchange valuation': 'احجز تقييمًا للاستبدال',
    'Price by weight': 'السعر حسب الوزن', 'WEIGHT': 'الوزن',
    'Rate alerts': 'تنبيهات الأسعار', 'Set an alert on WhatsApp': 'فعّل التنبيه عبر واتساب',

    /* Cart */
    'Checkout steps': 'خطوات إتمام الشراء', 'BAG': 'الحقيبة', 'DELIVERY': 'التوصيل', 'PAYMENT': 'الدفع',
    'Your bag is waiting for gold': 'حقيبتك بانتظار الذهب', 'Shop the collection': 'تسوّق المجموعة',
    'Signature gift box & card': 'علبة هدايا مميزة وبطاقة', 'Free': 'مجانًا',
    'Continue shopping →': 'متابعة التسوق ←', 'Order summary': 'ملخص الطلب', 'Subtotal': 'المجموع الفرعي',
    'Making-charge offer': 'عرض أجور المصنعية', 'Insured delivery': 'توصيل مؤمَّن',
    'Promo code': 'رمز الخصم', 'Apply': 'تطبيق', 'TOTAL': 'الإجمالي', 'Secure Checkout': 'إتمام الشراء الآمن',

    /* Checkout */
    'Secure checkout': 'دفع آمن', '← Back to bag': '→ العودة إلى الحقيبة', 'Back to Home': 'العودة إلى الرئيسية',
    'Your bag is empty': 'حقيبتك فارغة', 'Checkout': 'إتمام الشراء',
    'Full name': 'الاسم الكامل', 'Your name': 'اسمك', 'Mobile (+974)': 'الجوال (+974)', 'Email': 'البريد الإلكتروني',
    'Home delivery': 'التوصيل إلى المنزل', 'Insured courier · Free': 'شحن مؤمَّن · مجانًا',
    'Collect in store': 'الاستلام من المعرض', 'Souq Waqif showroom · 2 hrs': 'معرض سوق واقف · خلال ساعتين',
    'Zone': 'المنطقة', 'Street no.': 'رقم الشارع', 'Building no.': 'رقم المبنى', 'Area': 'المدينة',
    'Doha': 'الدوحة', 'Al Rayyan': 'الريان', 'Lusail': 'لوسيل', 'Al Wakrah': 'الوكرة', 'Al Khor': 'الخور', 'Umm Salal': 'أم صلال',
    'Landmark / notes': 'معلم قريب / ملاحظات', 'Villa colour, gate, nearest landmark': 'لون الفيلا، البوابة، أقرب معلم',
    'Delivery slot': 'موعد التوصيل', 'Today 4–7 pm': 'اليوم 4–7 مساءً', 'Today 7–10 pm': 'اليوم 7–10 مساءً',
    'Tomorrow 10–1': 'غدًا 10–1 ظهرًا', 'Tomorrow 4–7 pm': 'غدًا 4–7 مساءً',
    'Zahabiya Showroom — Gold Souq, Souq Waqif': 'معرض ذهبية — سوق الذهب، سوق واقف',
    'Ready in 2 hours · Bring your QID for collection': 'جاهز خلال ساعتين · أحضر بطاقتك الشخصية القطرية عند الاستلام',
    'Payment': 'الدفع', 'Credit / debit card': 'بطاقة ائتمان / خصم', 'Visa, Mastercard': 'فيزا، ماستركارد',
    'Fast & secure': 'سريع وآمن', 'NAPS debit': 'بطاقة نابس', 'QPay local cards': 'بطاقات QPay المحلية',
    'Cash on delivery': 'الدفع عند الاستلام', 'Up to QAR 10,000': 'حتى 10,000 ر.ق',
    'Card number': 'رقم البطاقة', 'Expiry': 'تاريخ الانتهاء', 'CVV': 'رمز التحقق', 'Your order': 'طلبك',
    'I agree to the terms, returns policy and gold price lock conditions.': 'أوافق على الشروط وسياسة الإرجاع وشروط تثبيت سعر الذهب.',
    'Place Order': 'تأكيد الطلب',

    /* About */
    "From a single counter in the old Gold Souq to Qatar's online gold destination — every piece still finished by hand.": 'من محلٍّ صغير في سوق الذهب القديم إلى وجهة قطر للذهب عبر الإنترنت — وما زالت كل قطعة تُشطَّب يدويًا.',
    'Lulwa pearl pendant on satin': 'قلادة لولوة باللؤلؤ على قماش الساتان',
    'Where pearl-diving heritage meets modern craft': 'حيث يلتقي إرث الغوص على اللؤلؤ بالحِرفة الحديثة',
    'Our founder began trading gold in the lanes of Souq Waqif, serving families for weddings, Eid and every milestone in between. Today our atelier pairs traditional Gulf motifs — Sadu weaving, the crescent, the palm — with precise modern finishing.': 'بدأ مؤسسنا تجارة الذهب في أزقّة سوق واقف، يخدم العائلات في الأعراس والأعياد وكل مناسبة بينهما. واليوم يجمع مشغلنا بين الزخارف الخليجية التقليدية — نسيج السدو والهلال والنخلة — وبين التشطيب العصري الدقيق.',
    'Explore the collection': 'استكشف المجموعة', 'Our promise': 'وعدنا', 'Gold you can trust': 'ذهب تثق به',
    'Every piece hallmarked and supplied with a weight certificate.': 'كل قطعة مدموغة ومرفقة بشهادة وزن.',
    'Live, honest pricing': 'تسعير مباشر وشفاف',
    'Gold value and making charges shown separately on every item.': 'قيمة الذهب وأجور المصنعية معروضة بشكل منفصل على كل قطعة.',
    'Handcrafted': 'صناعة يدوية', 'Finished, sized and engraved by our goldsmiths in Doha.': 'يُشطّبها صاغتنا في الدوحة ويضبطون مقاساتها ويحفرون عليها.',
    'Lifetime buy-back': 'إعادة شراء مدى الحياة',
    "Sell or exchange your Zahabiya gold at the day's rate, any time.": 'بِع أو استبدل ذهبك من ذهبية بسعر اليوم، في أي وقت.',
    'Visit us in Souq Waqif': 'زورونا في سوق واقف',
    'Coffee, dates and a private viewing room await. Walk in, or book ahead for bridal appointments.': 'القهوة والتمر وغرفة عرض خاصة بانتظارك. تفضّل بالزيارة أو احجز مسبقًا لمواعيد العرائس.',
    'Plan your visit': 'خطّط لزيارتك', 'Shop online': 'تسوّق عبر الإنترنت',

    /* Contact */
    'We reply within the hour during opening times.': 'نرد خلال ساعة في أوقات العمل.',
    'WhatsApp': 'واتساب', 'Fastest reply': 'أسرع رد', 'Call us': 'اتصل بنا',
    'Send us a message': 'أرسل لنا رسالة', "I'm interested in": 'أنا مهتم بـ',
    'Bridal appointment': 'موعد للعرائس', 'Custom design': 'تصميم خاص', 'An online order': 'طلب عبر الإنترنت',
    'Something else': 'أمر آخر', 'Name': 'الاسم', 'Message': 'الرسالة',
    "Tell us what you're looking for…": 'أخبرنا عمّا تبحث عنه…', 'Send message': 'إرسال الرسالة',
    'Message received': 'تم استلام رسالتك', 'Send another': 'إرسال رسالة أخرى',
    'Zahabiya · Souq Waqif': 'ذهبية · سوق واقف', 'Get directions': 'الاتجاهات', 'CORNICHE': 'الكورنيش',
    'Opening hours': 'ساعات العمل', 'Saturday – Thursday': 'السبت – الخميس', 'Friday': 'الجمعة', 'Ramadan': 'رمضان',
    'Frequently asked': 'الأسئلة الشائعة',
    'How is the price of my jewellery calculated?': 'كيف يُحتسب سعر مجوهراتي؟',
    "Price = gold weight × today's rate for its karat, plus a making charge shown separately. Rates update through the day on our Gold Rates page.": 'السعر = وزن الذهب × سعر اليوم لعياره، مضافًا إليه أجر المصنعية المعروض بشكل منفصل. تُحدَّث الأسعار على مدار اليوم في صفحة أسعار الذهب.',
    'Can I exchange my old gold?': 'هل يمكنني استبدال ذهبي القديم؟',
    'Yes. Bring any hallmarked gold to the showroom; we test and weigh it in front of you and credit it at the live rate toward a new piece.': 'نعم. أحضر أي ذهب مدموغ إلى المعرض، وسنفحصه ونزنه أمامك ونحتسب قيمته بالسعر المباشر لقطعة جديدة.',
    'Do you deliver outside Doha?': 'هل توصلون خارج الدوحة؟',
    'We deliver insured across Qatar — same day in Doha for orders before 2 pm, 1–2 days elsewhere.': 'نوصّل بشحن مؤمَّن إلى جميع أنحاء قطر — في نفس اليوم داخل الدوحة للطلبات قبل الساعة 2 ظهرًا، وخلال يوم إلى يومين لباقي المناطق.',
    'Can I resize or engrave a ring?': 'هل يمكنني تعديل مقاس الخاتم أو الحفر عليه؟',
    'Resizing is free within 30 days. Engraving in English or Arabic is free on wedding bands.': 'تعديل المقاس مجاني خلال 30 يومًا، والحفر بالعربية أو الإنجليزية مجاني على خواتم الزواج.',
    'What payment methods do you accept?': 'ما طرق الدفع المتاحة؟',
    'Visa, Mastercard, Apple Pay, NAPS debit, cash on delivery up to QAR 10,000, and instalments with partner banks.': 'فيزا، ماستركارد، Apple Pay، بطاقة نابس، الدفع عند الاستلام حتى 10,000 ر.ق، والتقسيط مع البنوك الشريكة.'
  };

  /* ---------- Elements with inline markup (data-i18n="key") ---------- */
  var HTML = {
    'home.slide1': 'صُنعت للّحظات<br>التي تدوم<br>إلى الأبد',
    'home.slide2': 'ذهبٌ يرافقك<br>أينما كنت',
    'home.slide3': 'سبائك وعملات<br>عيار 999.9',
    'home.catTitle': 'تسوّق حسب <span class="shine">الفئة</span>',
    'home.offerTitle': 'بدون أجور<br>مصنعية',
    'home.exchangeTitle': 'ذهب قديم<br>وحكاية جديدة',
    'home.investTitle': 'سبائك وعملات<br>من 1 غرام',
    'home.bridalTitle': 'للزفّة والحنّاء<br>وليلة <span class="shine">العمر</span>',
    'rates.title': 'سعر <span class="shine">الذهب</span> اليوم في قطر',
    'product.karat': 'العيار · <span style="color:var(--gold-deep)" data-karat-label></span>',
    'product.related': 'أكمل <span class="shine">إطلالتك</span>',
    'cart.title': '<span class="shine">حقيبتك</span>',
    'cart.instalment': 'أو 4 دفعات بقيمة <span data-instalment></span> مع البنوك الشريكة',
    'checkout.thanks': 'شكرًا لك، <span class="shine" data-confirm-name></span>',
    'checkout.orderMsg': 'تم تأكيد الطلب <strong style="color:var(--gold-deep)" data-order-no></strong>. تم تثبيت سعر الذهب، وسيتصل بك فريقنا لتأكيد موعد التوصيل.',
    'checkout.help': 'تحتاج مساعدة؟ <a href="https://wa.me/974" data-site-link="whatsapp" target="_blank" rel="noopener">واتساب <span data-site="phone">+974 [PHONE]</span></a>',
    'about.eyebrow': 'قصتنا',
    'about.title': 'ثلاثة أجيال من <span class="shine">الذهب</span> في قلب سوق واقف',
    'contact.eyebrow': 'تواصل معنا',
    'contact.title': 'يسعدنا <span class="shine">استقبالك</span>',
    'contact.success': 'سنتواصل معك بخصوص <strong style="color:var(--gold-deep)" data-topic-name></strong> قريبًا.'
  };

  function norm(s) { return s.replace(/\s+/g, ' ').trim(); }

  function translatePage() {
    /* Whole elements with markup */
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var html = HTML[el.getAttribute('data-i18n')];
      if (html) el.innerHTML = html;
    });

    /* Text nodes */
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        var p = node.parentElement;
        if (!p || /^(SCRIPT|STYLE)$/.test(p.tagName) || p.closest('[data-i18n],[translate="no"]')) return NodeFilter.FILTER_REJECT;
        return node.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
      }
    });
    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(function (node) {
      var ar = STATIC[norm(node.nodeValue)];
      if (ar) {
        var lead = node.nodeValue.match(/^\s*/)[0], trail = node.nodeValue.match(/\s*$/)[0];
        node.nodeValue = lead + ar + trail;
      }
    });

    /* Attributes */
    ['placeholder', 'aria-label', 'alt', 'title'].forEach(function (attr) {
      document.querySelectorAll('[' + attr + ']').forEach(function (el) {
        var ar = STATIC[norm(el.getAttribute(attr))];
        if (ar) el.setAttribute(attr, ar);
      });
    });

    var t = STATIC[norm(document.title)];
    if (t) document.title = t;
    var meta = document.querySelector('meta[name="description"]');
    if (meta && STATIC[norm(meta.content)]) meta.content = STATIC[norm(meta.content)];
  }

  /* ---------- Language toggle ---------- */
  function initToggle() {
    document.querySelectorAll('[data-lang-toggle]').forEach(function (btn) {
      btn.textContent = ZJ.t('langSwitch');
      btn.setAttribute('lang', ZJ.isAr ? 'en' : 'ar');
      btn.setAttribute('aria-label', ZJ.t('langSwitchLabel'));
      btn.addEventListener('click', function () {
        var next = ZJ.isAr ? 'en' : 'ar';
        try { localStorage.setItem(KEY, next); } catch (e) { /* ignore */ }
        var url = new URL(location.href);
        url.searchParams.delete('lang');
        if (next === 'ar') url.searchParams.set('lang', 'ar'); /* keeps working without storage */
        location.href = url.toString();
      });
    });
  }

  translatePage();
  initToggle();
})();

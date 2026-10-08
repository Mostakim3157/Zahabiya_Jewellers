/* Product page: product.html?id=<product id> */
(function () {
  var ZJ = window.ZJ;

  var SIZES = {
    necklace: { name: 'chainLength', options: ['40', '45', '50', '55'], def: '45', unit: 'cm' },
    ring: { name: 'ringSize', options: ['12', '13', '14', '15', '16', '17'], def: '14' },
    bangle: { name: 'bangleSize', options: ['2.4', '2.6', '2.8'], def: '2.6' }
  };

  var GIFT_BOX = '<svg class="giftbox" viewBox="0 0 160 160" fill="none" role="img" aria-label="Zahabiya gift box"><rect x="26" y="66" width="108" height="64" rx="8" fill="#F6EBD3" stroke="#B88A2E" stroke-width="2"/><path d="M26 66 L40 34 H120 L134 66" fill="#EFDBA8" stroke="#B88A2E" stroke-width="2"/><rect x="40" y="76" width="80" height="44" rx="6" fill="#FFFFFF"/><circle cx="80" cy="98" r="10" fill="#F5EDDC" stroke="#D9B45A" stroke-width="3"/><text x="80" y="54" text-anchor="middle" font-size="10" fill="#8A6418" font-family="serif" letter-spacing="2">ZAHABIYA</text></svg>';

  document.addEventListener('DOMContentLoaded', function () {
    var p = ZJ.getProduct(ZJ.param('id')) || ZJ.PRODUCTS[0];
    var size = SIZES[p.category];
    var state = { karat: p.karat, size: size ? size.def : '', qty: 1, view: 0, tab: 0 };
    var $ = function (s) { return document.querySelector(s); };

    var name = ZJ.pName(p);
    var details = [ZJ.pDesc(p) + ZJ.t('handFinished'), ZJ.t('certText'), ZJ.t('deliveryText')];
    /* Size label as shown and as stored in the bag, e.g. "45 cm" / "45 سم". */
    var sizeText = function (s) { return size && size.unit ? s + ' ' + ZJ.t(size.unit) : s; };

    /* Static text */
    document.title = name + ZJ.t('titleSuffix');
    $('[data-name]').textContent = name;
    $('[data-crumb-name]').textContent = name;
    $('[data-crumb-cat]').textContent = ZJ.catName(p.category);
    $('[data-crumb-cat]').href = 'shop.html?cat=' + p.category;
    $('[data-more]').href = 'shop.html?cat=' + p.category;
    $('[data-category]').textContent = ZJ.catName(p.category);
    $('[data-whatsapp]').href = 'https://wa.me/' + ZJ.SITE.whatsapp + '?text=' +
      encodeURIComponent(ZJ.t('waMessage', { name: name }));

    /* Gallery */
    var views = [{ label: name, img: p.img }, { label: ZJ.t('giftBox'), img: null }];
    function renderGallery() {
      var v = views[state.view];
      $('[data-main]').innerHTML = (p.badge ? '<span class="badge' + (p.offer ? ' badge--solid' : '') + '">' + ZJ.esc(ZJ.badgeText(p)) + '</span>' : '') +
        (v.img ? '<img src="' + v.img + '" alt="' + ZJ.esc(name) + '">' : GIFT_BOX);
      $('[data-thumbs]').innerHTML = views.map(function (t, i) {
        return '<button class="thumb" type="button" data-view="' + i + '" aria-pressed="' + (i === state.view) + '" aria-label="' + ZJ.esc(ZJ.t('show', { x: t.label })) + '">' +
          (t.img ? '<img src="' + t.img + '" alt="">' : ZJ.esc(t.label)) + '</button>';
      }).join('');
    }
    $('[data-thumbs]').addEventListener('click', function (e) {
      var b = e.target.closest('[data-view]');
      if (b) { state.view = Number(b.dataset.view); renderGallery(); }
    });

    /* Options */
    function renderOptions() {
      var karats = p.fixedKarat ? [p.karat] : ['18K', '21K', '22K'];
      $('[data-karats]').innerHTML = karats.map(function (k) {
        return '<button class="opt" type="button" data-k="' + k + '" aria-pressed="' + (k === state.karat) + '">' + k + '</button>';
      }).join('');
      $('[data-karat-label]').textContent = state.karat;
      if (size) {
        $('[data-size-group]').hidden = false;
        $('[data-size-name]').textContent = ZJ.t(size.name);
        $('[data-size-label]').textContent = sizeText(state.size);
        $('[data-sizes]').innerHTML = size.options.map(function (s) {
          return '<button class="opt" type="button" data-s="' + s + '" aria-pressed="' + (s === state.size) + '">' + sizeText(s) + '</button>';
        }).join('');
      }
    }
    $('[data-karats]').addEventListener('click', function (e) {
      var b = e.target.closest('[data-k]');
      if (b) { state.karat = b.dataset.k; renderOptions(); renderPrice(); b = $('[data-k="' + state.karat + '"]'); b && b.focus(); }
    });
    $('[data-sizes]').addEventListener('click', function (e) {
      var b = e.target.closest('[data-s]');
      if (b) { state.size = b.dataset.s; renderOptions(); b = $('[data-s="' + state.size + '"]'); b && b.focus(); }
    });

    /* Price */
    function renderPrice() {
      var rate = ZJ.RATES[state.karat].price;
      var unit = ZJ.priceFor(p, state.karat);
      $('[data-price]').textContent = ZJ.fmt(unit * state.qty);
      $('[data-gold-label]').textContent = ZJ.t('goldValueLabel', { w: p.weight, r: rate.toFixed(2) });
      $('[data-gold-value]').textContent = ZJ.fmt(p.weight * rate);
      $('[data-making]').textContent = ZJ.fmt(p.making);
      $('[data-total]').textContent = ZJ.fmt(unit) + (state.qty > 1 ? ' × ' + state.qty : '');
      $('[data-qty]').textContent = state.qty;
    }
    $('[data-inc]').addEventListener('click', function () { state.qty = Math.min(9, state.qty + 1); renderPrice(); });
    $('[data-dec]').addEventListener('click', function () { state.qty = Math.max(1, state.qty - 1); renderPrice(); });

    /* Add to bag */
    $('[data-add-to-bag]').addEventListener('click', function () {
      ZJ.cart.add(p.id, state.karat, state.size, state.qty);
      ZJ.toast(ZJ.t('addedToBag', { name: name }), ZJ.t('viewBag'), 'cart.html');
    });

    /* Detail tabs */
    var tabs = document.querySelectorAll('[data-detail]');
    function renderTab() {
      tabs.forEach(function (t, i) { t.setAttribute('aria-selected', i === state.tab ? 'true' : 'false'); });
      $('[data-detail-text]').textContent = details[state.tab];
    }
    tabs.forEach(function (t, i) { t.addEventListener('click', function () { state.tab = i; renderTab(); }); });

    /* Related products: same category first, then others. */
    var related = ZJ.PRODUCTS.filter(function (x) { return x.id !== p.id && x.category === p.category; })
      .concat(ZJ.PRODUCTS.filter(function (x) { return x.id !== p.id && x.category !== p.category; }))
      .slice(0, 4);
    $('[data-related]').innerHTML = related.map(function (x) { return ZJ.productCard(x); }).join('');

    renderGallery();
    renderOptions();
    renderPrice();
    renderTab();
  });
})();

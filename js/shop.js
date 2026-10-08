/* Shop page: category, karat, price, search and sort filters.
   Filters read from and write to the URL, e.g. shop.html?cat=ring&karat=21K */
(function () {
  var ZJ = window.ZJ;
  var MAX = 40000;

  var state = {
    cat: ZJ.param('cat') || 'all',
    karat: ZJ.param('karat') || 'all',
    tag: ZJ.param('tag') || '',
    offer: ZJ.param('offer') === '1',
    q: ZJ.param('q') || '',
    max: MAX,
    sort: 'featured'
  };

  var el = {};

  function matches(p, ignoreCat) {
    if (!ignoreCat && state.cat !== 'all' && p.category !== state.cat) return false;
    if (state.karat !== 'all' && p.karat !== state.karat) return false;
    if (state.tag && p.tags.indexOf(state.tag) === -1) return false;
    if (state.offer && !p.offer) return false;
    if (state.max < MAX && ZJ.priceFor(p) > state.max) return false;
    if (state.q) {
      var q = state.q.toLowerCase();
      if (p.name.toLowerCase().indexOf(q) === -1 && ZJ.pName(p).toLowerCase().indexOf(q) === -1) return false;
    }
    return true;
  }

  function sorted(list) {
    var by = {
      'price-asc': function (a, b) { return ZJ.priceFor(a) - ZJ.priceFor(b); },
      'price-desc': function (a, b) { return ZJ.priceFor(b) - ZJ.priceFor(a); },
      'weight-desc': function (a, b) { return b.weight - a.weight; },
      'new': function (a, b) { return (b.tags.indexOf('new') > -1) - (a.tags.indexOf('new') > -1); }
    }[state.sort];
    return by ? list.slice().sort(by) : list;
  }

  function renderCats() {
    var cats = [['all', ZJ.t('all')]].concat(Object.keys(ZJ.CATEGORIES).map(function (k) { return [k, ZJ.catName(k)]; }));
    el.cats.innerHTML = cats.map(function (c) {
      var n = ZJ.PRODUCTS.filter(function (p) { return (c[0] === 'all' || p.category === c[0]) && matches(p, true); }).length;
      return '<button class="side-btn" type="button" data-cat="' + c[0] + '" aria-pressed="' + (state.cat === c[0]) + '">' +
        '<span>' + ZJ.esc(c[1]) + '</span><small>' + n + '</small></button>';
    }).join('');
  }

  function renderKarats() {
    el.karats.innerHTML = ['all', '18K', '21K', '22K', '24K'].map(function (k) {
      return '<button class="chip" type="button" data-karat="' + k + '" aria-pressed="' + (state.karat === k) + '">' + (k === 'all' ? ZJ.t('all') : k) + '</button>';
    }).join('');
  }

  function renderHeading() {
    var label = state.tag === 'bridal' ? ZJ.t('bridal') : state.offer ? ZJ.t('offerLabel') : state.cat !== 'all' ? ZJ.catName(state.cat) : '';
    el.crumb.textContent = label || ZJ.t('allCollections');
    el.heading.innerHTML = label
      ? '<span class="shine italic">' + ZJ.esc(label) + '</span>'
      : ZJ.t('goldCollectionHtml');
    document.title = (label || ZJ.t('goldCollection')) + ZJ.t('titleSuffix');
  }

  function syncUrl() {
    var params = new URLSearchParams();
    if (state.cat !== 'all') params.set('cat', state.cat);
    if (state.karat !== 'all') params.set('karat', state.karat);
    if (state.tag) params.set('tag', state.tag);
    if (state.offer) params.set('offer', '1');
    if (state.q) params.set('q', state.q);
    if (ZJ.param('lang')) params.set('lang', ZJ.param('lang'));
    var qs = params.toString();
    try { history.replaceState(null, '', 'shop.html' + (qs ? '?' + qs : '')); } catch (e) { /* file:// in some browsers */ }
  }

  function render() {
    var list = sorted(ZJ.PRODUCTS.filter(function (p) { return matches(p); }));
    el.results.innerHTML = list.map(function (p, i) { return ZJ.productCard(p, Math.min(i, 8) * 0.05); }).join('');
    el.empty.hidden = list.length > 0;
    el.count.innerHTML = '<strong>' + ZJ.esc(ZJ.count(list.length, 'piece')) + '</strong>';
    el.priceOut.textContent = state.max < MAX ? ZJ.fmt(state.max) : ZJ.t('any');
    renderCats();
    renderKarats();
    renderHeading();
    syncUrl();
  }

  function clearAll() {
    state.cat = 'all'; state.karat = 'all'; state.tag = ''; state.offer = false; state.q = ''; state.max = MAX;
    el.search.value = '';
    el.price.value = MAX;
    render();
  }

  document.addEventListener('DOMContentLoaded', function () {
    el.results = document.querySelector('[data-results]');
    el.empty = document.querySelector('[data-empty]');
    el.count = document.querySelector('[data-count]');
    el.cats = document.querySelector('[data-cats]');
    el.karats = document.querySelector('[data-karats]');
    el.price = document.querySelector('[data-price]');
    el.priceOut = document.querySelector('[data-price-out]');
    el.search = document.querySelector('[data-search]');
    el.sort = document.querySelector('[data-sort]');
    el.crumb = document.querySelector('[data-crumb]');
    el.heading = document.querySelector('[data-heading]');
    var filters = document.getElementById('filters');
    var toggle = document.querySelector('[data-filter-toggle]');

    el.search.value = state.q;

    el.cats.addEventListener('click', function (e) {
      var b = e.target.closest('[data-cat]');
      if (b) { state.cat = b.dataset.cat; render(); }
    });
    el.karats.addEventListener('click', function (e) {
      var b = e.target.closest('[data-karat]');
      if (b) { state.karat = b.dataset.karat; render(); }
    });
    el.price.addEventListener('input', function () { state.max = Number(el.price.value); render(); });
    el.search.addEventListener('input', function () { state.q = el.search.value.trim(); render(); });
    el.sort.addEventListener('change', function () { state.sort = el.sort.value; render(); });
    document.querySelectorAll('[data-clear]').forEach(function (b) { b.addEventListener('click', clearAll); });

    toggle.addEventListener('click', function () {
      var open = filters.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
      toggle.querySelector('span').textContent = open ? ZJ.t('hideFilters') : ZJ.t('filters');
    });

    render();
    if (location.hash === '#search') el.search.focus();
  });
})();

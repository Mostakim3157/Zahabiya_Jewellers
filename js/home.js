/* Home page: hero carousel, featured-product tabs and today's rates panel. */
(function () {
  var ZJ = window.ZJ;

  /* ---------- Carousel ---------- */
  function initCarousel() {
    var root = document.querySelector('[data-carousel]');
    if (!root) return;
    var slides = root.querySelectorAll('.hero-slide');
    var dots = root.querySelectorAll('.dot');
    var counter = root.querySelector('[data-counter]');
    var index = 0;
    var timer = null;
    var DELAY = 5000;
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function show(i) {
      index = (i + slides.length) % slides.length;
      slides.forEach(function (s, n) {
        s.classList.toggle('is-active', n === index);
        s.setAttribute('aria-hidden', n === index ? 'false' : 'true');
      });
      dots.forEach(function (d, n) {
        if (n === index) d.setAttribute('aria-current', 'true');
        else d.removeAttribute('aria-current');
      });
      counter.textContent = '0' + (index + 1) + ' / 0' + slides.length;
    }
    function start() {
      if (reduceMotion) return;
      stop();
      timer = setInterval(function () { show(index + 1); }, DELAY);
    }
    function stop() { clearInterval(timer); }

    dots.forEach(function (d, n) { d.addEventListener('click', function () { show(n); start(); }); });
    root.querySelector('[data-prev]').addEventListener('click', function () { show(index - 1); start(); });
    root.querySelector('[data-next]').addEventListener('click', function () { show(index + 1); start(); });

    /* Pause while hovered or focused, and when the tab is hidden. */
    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', start);
    root.addEventListener('focusin', stop);
    root.addEventListener('focusout', start);
    document.addEventListener('visibilitychange', function () { document.hidden ? stop() : start(); });

    /* Swipe on touch screens. */
    var startX = null;
    root.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
    root.addEventListener('touchend', function (e) {
      if (startX === null) return;
      var dx = e.changedTouches[0].clientX - startX;
      if (ZJ.isAr) dx = -dx; /* right-to-left: swipe direction is mirrored */
      if (Math.abs(dx) > 50) { show(index + (dx < 0 ? 1 : -1)); start(); }
      startX = null;
    });

    show(0);
    start();
  }

  /* ---------- Featured tabs ---------- */
  function initTabs() {
    var grid = document.querySelector('[data-featured]');
    if (!grid) return;
    var tabs = document.querySelectorAll('[data-tab]');

    function render(tag) {
      var list = ZJ.PRODUCTS.filter(function (p) { return p.tags.indexOf(tag) > -1; }).slice(0, 4);
      grid.innerHTML = list.map(function (p, i) { return ZJ.productCard(p, i * 0.08); }).join('');
      tabs.forEach(function (t) { t.setAttribute('aria-selected', t.dataset.tab === tag ? 'true' : 'false'); });
    }
    tabs.forEach(function (t) {
      t.addEventListener('click', function () { render(t.dataset.tab); });
    });
    render('bestseller');
  }

  /* ---------- Rates panel ---------- */
  function renderRates() {
    var box = document.querySelector('[data-rates]');
    if (!box) return;
    box.innerHTML = Object.keys(ZJ.RATES).map(function (k) {
      var r = ZJ.RATES[k];
      return '<div class="rate-row">' +
        '<div class="who"><span class="karat-coin">' + k + '</span>' + ZJ.purity(k) + '</div>' +
        '<div class="val"><div class="num">' + r.price.toFixed(2) + '</div><div class="up">' + ZJ.t('todayChange', { v: r.change.toFixed(2) }) + '</div></div>' +
      '</div>';
    }).join('');
  }

  document.addEventListener('DOMContentLoaded', function () {
    initCarousel();
    initTabs();
    renderRates();
  });
})();

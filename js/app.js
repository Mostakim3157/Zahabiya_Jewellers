/* ==========================================================================
   Shared site behaviour: formatting, cart storage, header badge,
   product cards, toasts, contact details and scroll reveal.
   Loaded on every page after data.js.
   ========================================================================== */
(function () {
  var ZJ = window.ZJ;
  var CART_KEY = 'zahabiya-cart';
  var GIFT_KEY = 'zahabiya-gift';

  /* ---------- Helpers ---------- */
  /* "QAR 1,960" in English, "1,960 ر.ق" in Arabic (Western digits in both). */
  ZJ.fmt = function (n) {
    var num = Math.round(n).toLocaleString('en-US');
    return ZJ.isAr ? num + ' ' + ZJ.t('qar') : ZJ.t('qar') + ' ' + num;
  };

  ZJ.esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };

  ZJ.getProduct = function (id) {
    return ZJ.PRODUCTS.find(function (p) { return p.id === id; });
  };

  /* Price of a product at a given karat: gold value + making charge. */
  ZJ.priceFor = function (p, karat) {
    var k = karat || p.karat;
    return Math.round(p.weight * ZJ.RATES[k].price + p.making);
  };

  ZJ.param = function (name) {
    return new URLSearchParams(window.location.search).get(name);
  };

  /* ---------- Storage (fails safely in private mode) ---------- */
  function read(key, fallback) {
    try {
      var v = localStorage.getItem(key);
      return v ? JSON.parse(v) : fallback;
    } catch (e) { return fallback; }
  }
  function write(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* ignore */ }
  }

  /* ---------- Cart ----------
     Each line: { key, id, karat, option, qty } */
  ZJ.cart = {
    items: function () {
      return read(CART_KEY, []).filter(function (l) { return ZJ.getProduct(l.id); });
    },
    save: function (items) {
      write(CART_KEY, items);
      ZJ.updateBadge(true);
    },
    add: function (id, karat, option, qty) {
      var p = ZJ.getProduct(id);
      if (!p) return;
      var k = karat || p.karat;
      var key = [id, k, option || ''].join('|');
      var items = this.items();
      var line = items.find(function (l) { return l.key === key; });
      if (line) line.qty = Math.min(9, line.qty + (qty || 1));
      else items.push({ key: key, id: id, karat: k, option: option || '', qty: qty || 1 });
      this.save(items);
    },
    setQty: function (key, qty) {
      var items = this.items().map(function (l) {
        if (l.key === key) l.qty = Math.max(1, Math.min(9, qty));
        return l;
      });
      this.save(items);
    },
    remove: function (key) {
      this.save(this.items().filter(function (l) { return l.key !== key; }));
    },
    clear: function () { this.save([]); },
    count: function () {
      return this.items().reduce(function (a, l) { return a + l.qty; }, 0);
    },
    /* Totals, including the 0% making-charge offer on flagged products. */
    totals: function () {
      var subtotal = 0, discount = 0;
      this.items().forEach(function (l) {
        var p = ZJ.getProduct(l.id);
        subtotal += ZJ.priceFor(p, l.karat) * l.qty;
        if (p.offer) discount += Math.round(p.making) * l.qty;
      });
      return { subtotal: subtotal, discount: discount, total: subtotal - discount };
    },
    gift: function (value) {
      if (typeof value === 'boolean') write(GIFT_KEY, value);
      return read(GIFT_KEY, true);
    }
  };

  ZJ.updateBadge = function (bump) {
    var n = ZJ.cart.count();
    document.querySelectorAll('[data-cart-count]').forEach(function (el) {
      el.textContent = n;
      el.hidden = n === 0;
      if (bump) {
        el.classList.remove('bump');
        void el.offsetWidth;
        el.classList.add('bump');
      }
    });
  };

  /* ---------- Toast ---------- */
  var toastEl, toastTimer;
  ZJ.toast = function (message, linkText, linkHref) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'toast';
      toastEl.setAttribute('role', 'status');
      toastEl.setAttribute('aria-live', 'polite');
      document.body.appendChild(toastEl);
    }
    toastEl.innerHTML = '<span>' + ZJ.esc(message) + '</span>' +
      (linkText ? '<a href="' + ZJ.esc(linkHref) + '">' + ZJ.esc(linkText) + '</a>' : '');
    requestAnimationFrame(function () { toastEl.classList.add('show'); });
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('show'); }, 3200);
  };

  /* ---------- Product card ---------- */
  var PLUS = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>';

  ZJ.productCard = function (p, delay) {
    var name = ZJ.pName(p);
    var badge = p.badge
      ? '<span class="badge' + (p.offer ? ' badge--solid' : '') + '">' + ZJ.esc(ZJ.badgeText(p)) + '</span>'
      : '';
    return '' +
      '<article class="product-card lift"' + (delay ? ' style="animation-delay:' + delay + 's"' : '') + '>' +
        '<div class="media">' +
          '<img src="' + p.img + '" alt="' + ZJ.esc(name) + '" loading="lazy" width="600" height="600">' +
          badge +
          '<span class="karat-tag">' + p.karat + '</span>' +
        '</div>' +
        '<div class="info">' +
          '<span class="meta">' + p.karat + ' · ' + p.weight + ' ' + ZJ.t('g') + '</span>' +
          '<a class="name" href="product.html?id=' + p.id + '">' + ZJ.esc(name) + '</a>' +
          '<div class="row">' +
            '<span class="price">' + ZJ.fmt(ZJ.priceFor(p)) + '</span>' +
            '<button class="add-btn" type="button" data-add="' + p.id + '" aria-label="' + ZJ.esc(ZJ.t('addToBagAria', { name: name })) + '">' + PLUS + '</button>' +
          '</div>' +
        '</div>' +
      '</article>';
  };

  /* Quick add from any product card. */
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-add]');
    if (!btn) return;
    var p = ZJ.getProduct(btn.getAttribute('data-add'));
    ZJ.cart.add(p.id);
    ZJ.toast(ZJ.t('addedToBag', { name: ZJ.pName(p) }), ZJ.t('viewBag'), 'cart.html');
  });

  /* ---------- Contact details from ZJ.SITE ---------- */
  function fillSite() {
    var S = ZJ.SITE;
    document.querySelectorAll('[data-site]').forEach(function (el) {
      var key = el.getAttribute('data-site');
      var value = key === 'address' && ZJ.isAr ? ZJ.AR.address : S[key];
      if (value) el.textContent = value;
    });
    document.querySelectorAll('[data-site-link]').forEach(function (el) {
      var type = el.getAttribute('data-site-link');
      if (type === 'tel') el.href = 'tel:' + S.phoneLink;
      if (type === 'whatsapp') el.href = 'https://wa.me/' + S.whatsapp;
      if (type === 'email') el.href = 'mailto:' + S.email;
      if (type === 'map') el.href = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('Souq Waqif, Doha, Qatar');
    });
    document.querySelectorAll('[data-year]').forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  /* ---------- Gold-rate ticker ---------- */
  function renderTicker() {
    var track = document.querySelector('[data-ticker]');
    if (!track) return;
    var html = Object.keys(ZJ.RATES).map(function (k) {
      var r = ZJ.RATES[k];
      var pct = (r.change / (r.price - r.change) * 100).toFixed(2);
      return '<span class="ticker-item"><strong>' + k + '</strong> ' + ZJ.t('tickerRate', { v: r.price.toFixed(2) }) +
        ' <span class="up">▲ ' + pct + '%</span></span>';
    }).join('');
    track.innerHTML = html + html + html + html; /* duplicated for a seamless loop */
  }

  /* ---------- Newsletter forms ---------- */
  function initNewsletter() {
    document.querySelectorAll('form[data-newsletter]').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var input = form.querySelector('input');
        if (!input.value.trim()) { input.focus(); return; }
        input.value = '';
        var note = form.querySelector('.form-note');
        note.hidden = false;
        note.textContent = ZJ.t('newsletterThanks');
      });
    });
  }

  /* ---------- Scroll reveal ---------- */
  function initReveal() {
    var els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -60px 0px' });
    els.forEach(function (el) { io.observe(el); });
  }

  document.addEventListener('DOMContentLoaded', function () {
    fillSite();
    renderTicker();
    initNewsletter();
    initReveal();
    ZJ.updateBadge(false);
  });
})();

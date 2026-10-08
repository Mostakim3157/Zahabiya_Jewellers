/* Cart page: lists bag items saved in the browser, quantities, totals. */
(function () {
  var ZJ = window.ZJ;
  var $ = function (s) { return document.querySelector(s); };
  var TRASH = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M5 7h14M10 7V4h4v3M7 7l1 13h8l1-13"/></svg>';

  function render() {
    var items = ZJ.cart.items();
    var count = ZJ.cart.count();

    $('[data-items]').innerHTML = items.map(function (l) {
      var p = ZJ.getProduct(l.id);
      var name = ZJ.pName(p);
      var meta = [p.weight + ' ' + ZJ.t('g'), l.karat];
      if (l.option) meta.push(p.category === 'necklace' ? l.option + ' ' + ZJ.t('cm') : l.option);
      return '<div class="cart-item">' +
        '<img src="' + p.img + '" alt="' + ZJ.esc(name) + '">' +
        '<div class="about"><a href="product.html?id=' + p.id + '">' + ZJ.esc(name) + '</a><small>' + ZJ.esc(meta.join(' · ')) + '</small></div>' +
        '<div class="controls">' +
          '<div class="qty"><button type="button" data-dec="' + l.key + '" aria-label="' + ZJ.esc(ZJ.t('decQty', { name: name })) + '">−</button>' +
          '<span>' + l.qty + '</span>' +
          '<button type="button" data-inc="' + l.key + '" aria-label="' + ZJ.esc(ZJ.t('incQty', { name: name })) + '">+</button></div>' +
          '<span class="line-total">' + ZJ.fmt(ZJ.priceFor(p, l.karat) * l.qty) + '</span>' +
          '<button class="icon-btn" type="button" data-remove="' + l.key + '" aria-label="' + ZJ.esc(ZJ.t('remove', { name: name })) + '">' + TRASH + '</button>' +
        '</div>' +
      '</div>';
    }).join('');

    var empty = items.length === 0;
    $('[data-empty]').hidden = !empty;
    $('[data-gift-row]').hidden = empty;
    $('[data-summary]').hidden = empty;
    $('[data-count-text]').textContent = ZJ.count(count, 'item');

    var t = ZJ.cart.totals();
    $('[data-subtotal]').textContent = ZJ.fmt(t.subtotal);
    $('[data-discount]').textContent = t.discount ? '− ' + ZJ.fmt(t.discount) : ZJ.fmt(0);
    $('[data-total]').textContent = ZJ.fmt(t.total);
    $('[data-instalment]').textContent = ZJ.fmt(t.total / 4);
  }

  document.addEventListener('DOMContentLoaded', function () {
    $('[data-items]').addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (!b) return;
      var line;
      if (b.dataset.inc || b.dataset.dec) {
        var key = b.dataset.inc || b.dataset.dec;
        line = ZJ.cart.items().find(function (l) { return l.key === key; });
        ZJ.cart.setQty(key, line.qty + (b.dataset.inc ? 1 : -1));
      } else if (b.dataset.remove) {
        ZJ.cart.remove(b.dataset.remove);
      }
      render();
    });

    var gift = $('[data-gift]');
    gift.checked = ZJ.cart.gift();
    gift.addEventListener('change', function () { ZJ.cart.gift(gift.checked); });

    /* No promo codes are configured yet — add real ones when you have them. */
    $('[data-promo]').addEventListener('submit', function (e) {
      e.preventDefault();
      var input = $('#promo');
      var msg = $('[data-promo-msg]');
      msg.hidden = false;
      msg.textContent = input.value.trim() ? ZJ.t('promoInvalid') : ZJ.t('promoEmpty');
    });

    render();
  });
})();

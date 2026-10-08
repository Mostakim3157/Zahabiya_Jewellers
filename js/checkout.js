/* Checkout page: order summary from the bag, delivery/payment options,
   validation and confirmation.
   NOTE: no payment is taken — connect a payment gateway (e.g. QPay / a card
   processor) and an order backend before going live. Card details entered
   here are never stored or sent anywhere. */
(function () {
  var ZJ = window.ZJ;
  var $ = function (s) { return document.querySelector(s); };

  function setError(input, message) {
    var field = input.closest('.field');
    var err = field && field.querySelector('.error');
    if (message) {
      input.setAttribute('aria-invalid', 'true');
      if (field && !err) {
        err = document.createElement('span');
        err.className = 'error';
        err.id = input.id + '-error';
        field.appendChild(err);
        input.setAttribute('aria-describedby', err.id);
      }
      if (err) err.textContent = message;
    } else {
      input.removeAttribute('aria-invalid');
      if (err) err.textContent = '';
    }
  }

  function validate(form) {
    var first = null;
    var rules = {
      name: function (v) { return v.length >= 2 || ZJ.t('errName'); },
      phone: function (v) { return /^\d{8}$/.test(v.replace(/\D/g, '').replace(/^974/, '')) || ZJ.t('errPhone'); },
      email: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || ZJ.t('errEmail'); },
      zone: function (v) { return v.length > 0 || ZJ.t('errRequired'); },
      street: function (v) { return v.length > 0 || ZJ.t('errRequired'); },
      building: function (v) { return v.length > 0 || ZJ.t('errRequired'); },
      card: function (v) { return /^\d{13,19}$/.test(v.replace(/\s/g, '')) || ZJ.t('errCard'); },
      exp: function (v) { return /^(0[1-9]|1[0-2])\s*\/\s*\d{2}$/.test(v) || ZJ.t('errExp'); },
      cvv: function (v) { return /^\d{3,4}$/.test(v) || ZJ.t('errCvv'); }
    };
    var isHome = form.elements.method.value === 'home';
    var isCard = form.elements.pay.value === 'card';

    Object.keys(rules).forEach(function (name) {
      var input = form.elements[name];
      var skip = (['zone', 'street', 'building'].indexOf(name) > -1 && !isHome) ||
                 (['card', 'exp', 'cvv'].indexOf(name) > -1 && !isCard);
      var result = skip ? true : rules[name](input.value.trim());
      setError(input, result === true ? '' : result);
      if (result !== true && !first) first = input;
    });

    var agreeErr = $('[data-form-error]');
    if (!form.elements.agree.checked) {
      agreeErr.hidden = false;
      agreeErr.textContent = ZJ.t('errAgree');
      if (!first) first = form.elements.agree;
    } else {
      agreeErr.hidden = true;
    }
    if (first) first.focus();
    return !first;
  }

  function renderSummary() {
    var items = ZJ.cart.items();
    $('[data-lines]').innerHTML = items.map(function (l) {
      var p = ZJ.getProduct(l.id);
      return '<div class="line"><span>' + ZJ.esc(ZJ.pName(p)) + ' · ' + l.karat + (l.qty > 1 ? ' × ' + l.qty : '') + '</span>' +
        '<span style="color:var(--ink)">' + ZJ.fmt(ZJ.priceFor(p, l.karat) * l.qty) + '</span></div>';
    }).join('');
    var t = ZJ.cart.totals();
    $('[data-discount]').textContent = t.discount ? '− ' + ZJ.fmt(t.discount) : ZJ.fmt(0);
    $('[data-total]').textContent = ZJ.fmt(t.total);
    return items.length;
  }

  document.addEventListener('DOMContentLoaded', function () {
    var form = $('[data-checkout-form]');

    if (!renderSummary()) {
      form.hidden = true;
      $('[data-no-items]').hidden = false;
      return;
    }

    form.addEventListener('change', function (e) {
      if (e.target.name === 'method') {
        var home = form.elements.method.value === 'home';
        $('[data-home-fields]').hidden = !home;
        $('[data-pickup-note]').hidden = home;
        $('[data-ship-label]').textContent = home ? ZJ.t('insuredDelivery') : ZJ.t('storePickup');
      }
      if (e.target.name === 'pay') {
        $('[data-card-fields]').hidden = form.elements.pay.value !== 'card';
      }
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate(form)) return;
      var orderNo = 'ZJ-' + String(Date.now()).slice(-6);
      $('[data-confirm-name]').textContent = form.elements['name'].value.trim().split(' ')[0];
      $('[data-order-no]').textContent = '#' + orderNo;
      ZJ.cart.clear();
      form.hidden = true;
      $('[data-confirm]').hidden = false;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
})();

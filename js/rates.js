/* Gold rates page: rate cards, trend chart, calculator and weight table.
   The trend history is generated sample data — replace `history()` with
   real figures from your rate provider. */
(function () {
  var ZJ = window.ZJ;
  var UNITS = [['gram', 1], ['tola', 11.664], ['ounce', 31.1035]];
  var PERIODS = [['period0', 7, 6], ['period1', 30, 14], ['period2', 26, 38], ['period3', 52, 70]];
  var state = { unit: 0, period: 1, karat: '22K', weight: 10 };
  var $ = function (s) { return document.querySelector(s); };

  function setPressed(container, attr, value) {
    container.querySelectorAll('[' + attr + ']').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute(attr)) === String(value));
    });
  }

  function renderCards() {
    var mult = UNITS[state.unit][1];
    $('[data-cards]').innerHTML = Object.keys(ZJ.RATES).map(function (k) {
      var r = ZJ.RATES[k];
      var pct = (r.change / (r.price - r.change) * 100).toFixed(2);
      return '<div class="rate-card lift">' +
        '<div class="top"><span class="karat-coin">' + k + '</span><span class="chg">▲ ' + pct + '%</span></div>' +
        '<div class="lbl">' + ZJ.purity(k) + '</div>' +
        '<div class="price"><small>' + ZJ.t('qar') + '</small><strong>' + (r.price * mult).toFixed(2) + '</strong></div>' +
        '<div class="per">' + ZJ.t('per', { unit: ZJ.t(UNITS[state.unit][0]) }) + '</div>' +
      '</div>';
    }).join('');
    setPressed($('[data-units]'), 'data-unit', state.unit);
  }

  /* Sample history ending at today's 24K rate. */
  function history(periodIndex) {
    var n = PERIODS[periodIndex][1], spread = PERIODS[periodIndex][2], today = ZJ.RATES['24K'].price, pts = [];
    for (var i = 0; i < n; i++) {
      var t = i / (n - 1);
      pts.push(today - spread * (1 - t) + Math.sin(i * 1.7 + periodIndex) * spread * 0.18 + Math.cos(i * 0.6) * spread * 0.1);
    }
    pts[n - 1] = today;
    return pts;
  }

  function renderChart() {
    var pts = history(state.period);
    var n = pts.length, min = Math.min.apply(null, pts), max = Math.max.apply(null, pts);
    var xy = pts.map(function (p, i) { return [i / (n - 1) * 800, 270 - (p - min) / (max - min || 1) * 220]; });
    var line = xy.map(function (c, i) { return (i ? 'L' : 'M') + c[0].toFixed(1) + ' ' + c[1].toFixed(1); }).join(' ');
    var last = xy[n - 1];
    $('[data-chart]').innerHTML =
      '<defs><linearGradient id="gfill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#D9B45A" stop-opacity=".35"/><stop offset="1" stop-color="#D9B45A" stop-opacity="0"/></linearGradient></defs>' +
      '<line x1="0" y1="60" x2="800" y2="60" stroke="rgba(217,180,90,.15)"/><line x1="0" y1="140" x2="800" y2="140" stroke="rgba(217,180,90,.15)"/><line x1="0" y1="220" x2="800" y2="220" stroke="rgba(217,180,90,.15)"/><line x1="0" y1="280" x2="800" y2="280" stroke="rgba(217,180,90,.35)"/>' +
      '<path d="' + line + ' L800 280 L0 280 Z" fill="url(#gfill)"/>' +
      '<path class="chart-line" d="' + line + '" stroke="#A97E28" stroke-width="3" fill="none" stroke-linejoin="round" stroke-linecap="round"/>' +
      '<circle cx="' + last[0] + '" cy="' + last[1].toFixed(1) + '" r="7" fill="#D9B45A" stroke="#fff" stroke-width="3"/>';
    var pct = (pts[n - 1] - pts[0]) / pts[0] * 100;
    $('[data-hi]').textContent = max.toFixed(2);
    $('[data-lo]').textContent = min.toFixed(2);
    $('[data-chg]').textContent = (pct >= 0 ? '+' : '') + pct.toFixed(2) + '%';
    $('[data-start-label]').textContent = ZJ.t(PERIODS[state.period][0]);
    setPressed($('[data-periods]'), 'data-period', state.period);
  }

  function renderCalc() {
    $('[data-calc-karats]').innerHTML = Object.keys(ZJ.RATES).map(function (k) {
      return '<button class="opt" type="button" data-ck="' + k + '" aria-pressed="' + (k === state.karat) + '">' + k + '</button>';
    }).join('');
    var rate = ZJ.RATES[state.karat].price;
    $('[data-calc-value]').textContent = ZJ.fmt(state.weight * rate);
    $('[data-calc-note]').textContent = ZJ.t('calcNote', { w: state.weight, r: rate.toFixed(2), k: state.karat });
  }

  function renderTable() {
    var ks = ['24K', '22K', '21K', '18K'];
    $('[data-table]').innerHTML = [1, 5, 10, 20, 50, 100].map(function (g) {
      return '<tr><th scope="row">' + g + ' g</th>' + ks.map(function (k) {
        return '<td>' + ZJ.fmt(ZJ.RATES[k].price * g) + '</td>';
      }).join('') + '</tr>';
    }).join('');
  }

  document.addEventListener('DOMContentLoaded', function () {
    $('[data-units]').addEventListener('click', function (e) {
      var b = e.target.closest('[data-unit]');
      if (b) { state.unit = Number(b.dataset.unit); renderCards(); }
    });
    $('[data-periods]').addEventListener('click', function (e) {
      var b = e.target.closest('[data-period]');
      if (b) { state.period = Number(b.dataset.period); renderChart(); }
    });
    $('[data-calc-karats]').addEventListener('click', function (e) {
      var b = e.target.closest('[data-ck]');
      if (b) { state.karat = b.dataset.ck; renderCalc(); $('[data-ck="' + state.karat + '"]').focus(); }
    });
    $('[data-weight]').addEventListener('input', function (e) {
      state.weight = Math.max(0, parseFloat(e.target.value) || 0);
      renderCalc();
    });

    renderCards();
    renderChart();
    renderCalc();
    renderTable();
  });
})();

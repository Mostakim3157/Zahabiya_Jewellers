# Zahabiya Jewellers — website

A static e-commerce front-end for a gold shop in Doha, Qatar. Plain HTML, CSS and
JavaScript — no build step, no dependencies.

## Open it

Double-click `index.html`, or serve the folder (recommended, so every browser
behaves the same):

```bash
python -m http.server 5500
```

then visit http://localhost:5500.

## Pages

| File | Page |
| --- | --- |
| `index.html` | Home — gold-rate ticker, hero carousel, categories, offers, featured tabs, rates, bridal |
| `shop.html` | Collection — category / karat / price filters, search, sort (`?cat=ring`, `?tag=bridal`, `?offer=1`) |
| `product.html` | Product detail (`?id=lulwa-pearl-pendant`) — karat & size options, live price breakdown |
| `gold-rates.html` | Today's rates (gram / tola / ounce), trend chart, value calculator, price-by-weight table |
| `cart.html` | Bag — quantities, 0% making-charge offer, gift box |
| `checkout.html` | Checkout — contact, delivery (Qatar zone / street / building), payment, confirmation |
| `about.html` | Our story |
| `contact.html` | Contact cards, enquiry form, map, opening hours, FAQ |

## Where things live

- `css/styles.css` — all styles. Colours and fonts are CSS variables at the top.
- `js/data.js` — **edit this first**: contact details, gold rates, categories and products.
- `js/app.js` — shared code: cart (saved in the browser), header bag count, product cards, toasts.
- `js/home.js`, `shop.js`, `product.js`, `rates.js`, `cart.js`, `checkout.js`, `contact.js` — one per page.
- `images/` — product photos.

### English / Arabic

Every page has an **عربي / English** button in the header. Arabic switches the
whole site to right-to-left with Arabic fonts (Amiri for headings, IBM Plex Sans
Arabic for text). The choice is remembered, and links ending in `?lang=ar` open
in Arabic.

- `js/i18n.js` — all translations. Page text is matched by its exact English
  wording in `STATIC`; headings with inline markup use a `data-i18n="key"`
  attribute and the `HTML` list; text built by scripts uses `ZJ.t('key')`.
- `ZJ.AR` in `js/data.js` — Arabic product names and descriptions, categories
  and badges.
- If you change English text on a page, update the matching entry in `STATIC`
  (otherwise that line stays in English in Arabic mode).
- Arabic is applied in the browser, so search engines index the English pages.
  For Arabic search results, publish separate Arabic pages later.

### Adding a product

Add an entry to `ZJ.PRODUCTS` in `js/data.js` (plus its Arabic name and
description in `ZJ.AR.products`) and put its photo in `images/`.
`price` is the price at the product's default karat; the making charge is worked
out from it, so prices follow the gold rate automatically when you update
`ZJ.RATES`.

## Before going live

- [ ] Replace `[PHONE]`, the WhatsApp number and email in `ZJ.SITE` (`js/data.js`).
- [ ] Connect real gold rates — `ZJ.RATES` holds **sample figures**, and the trend
      chart in `js/rates.js` uses generated sample history.
- [ ] Replace sample product prices and weights with your real stock.
- [ ] Connect a payment gateway and order backend — checkout validates the form
      and shows a confirmation, but **no payment is taken and no order is sent**.
- [ ] Connect the contact form and newsletter to a form service or backend.
- [ ] Confirm the National Day offer details and any promo codes (`js/cart.js`).
- [ ] Add your own showroom photography if you have it.

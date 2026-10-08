/* Contact page form.
   NOTE: messages are not sent anywhere yet — connect a form service
   (e.g. Formspree, Netlify Forms) or your own backend before going live. */
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var form = document.querySelector('[data-contact-form]');
    var success = document.querySelector('[data-contact-success]');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.elements.cname;
      var phone = form.elements.cphone;
      var ok = true;
      [[name, name.value.trim().length >= 2], [phone, /^\d{8}$/.test(phone.value.replace(/\D/g, '').replace(/^974/, ''))]].forEach(function (pair) {
        pair[0].setAttribute('aria-invalid', pair[1] ? 'false' : 'true');
        if (!pair[1] && ok) { pair[0].focus(); ok = false; }
      });
      if (!ok) return;
      /* Use the (translated) label of the chosen topic. */
      var topic = form.querySelector('input[name="topic"]:checked + span').textContent;
      document.querySelector('[data-topic-name]').textContent = window.ZJ.isAr ? topic : topic.toLowerCase();
      form.hidden = true;
      success.hidden = false;
    });

    document.querySelector('[data-contact-reset]').addEventListener('click', function () {
      form.reset();
      success.hidden = true;
      form.hidden = false;
    });
  });
})();

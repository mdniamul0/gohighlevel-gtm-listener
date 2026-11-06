/* GoHighLevel listener by MD Niamul - mdniamul.com */
(function () {
  window.dataLayer = window.dataLayer || [];
  var lastKey = '';
  var lastTime = 0;

  // White-label (custom domain) forms: add your domain here,
  // for example ['link.youragency.com']
  var GHL_CUSTOM_DOMAINS = [];

  // Only trust messages from GoHighLevel / LeadConnector forms and calendars
  function isGhlMessage(event) {
    var host = '';
    try { host = new URL(event.origin).hostname; } catch (e) { return false; }
    if (/(^|\.)(leadconnectorhq\.com|msgsndr\.com|gohighlevel\.com)$/.test(host)) return true;
    return GHL_CUSTOM_DOMAINS.indexOf(host) > -1;
  }

  function once(key) {
    var now = new Date().getTime();
    if (key === lastKey && now - lastTime < 3000) return false;
    lastKey = key;
    lastTime = now;
    return true;
  }

  window.addEventListener('message', function (event) {
    var data = event.data;
    if (Object.prototype.toString.call(data) !== '[object Array]') return;
    if (!isGhlMessage(event)) return;

    // Calendar booking finished
    if (data[0] === 'msgsndr-booking-complete') {
      if (!once('booking')) return;
      window.dataLayer.push({
        event: 'ghl_booking_complete',
        page_path: window.location.pathname
      });
      return;
    }

    // Form submitted: GHL sends the contact as a JSON string in data[2]
    var raw = data[2];
    if (typeof raw !== 'string' || raw.indexOf('"email"') === -1 || raw.indexOf('customer_id') === -1) return;
    var form = {};
    try { form = JSON.parse(raw) || {}; } catch (e) { return; }
    if (!once('form:' + (form.customer_id || '') + (form.email || ''))) return;

    window.dataLayer.push({
      event: 'ghl_form_submit',
      form_id: form.formId || form.form_id || '',
      page_path: window.location.pathname
    });
  });
})();

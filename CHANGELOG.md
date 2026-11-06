# Changelog

## v1.0.0 (2026-11-06)

- First release of the free GoHighLevel GTM listener.
- Fires `ghl_form_submit` when an embedded GHL / LeadConnector form is submitted, and `ghl_booking_complete` when a GHL calendar booking is done.
- Only trusts messages from leadconnectorhq.com, msgsndr.com and gohighlevel.com, plus white-label domains you add.
- Reads the form message safely, so other iframes' messages never cause errors.
- One push per submission and per booking, even when GHL sends the message twice.

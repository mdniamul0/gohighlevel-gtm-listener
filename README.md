# GoHighLevel GTM Event Listener

**Free Google Tag Manager listener for GoHighLevel form and calendar tracking.** It fires `ghl_form_submit` when someone submits a GoHighLevel (LeadConnector) form embedded on your website, and `ghl_booking_complete` when someone books in an embedded GHL calendar, so you can track GHL leads in GA4, Google Ads, Meta Pixel and any other tag.

![GoHighLevel GTM Event Listener](docs/banner.png)

**Full guide, install video and copy button:** https://mdniamul.com/gtm-event-listeners/gohighlevel-gtm-listener/

---

## What it does

GoHighLevel's form iframe sends a message to your page with the contact as JSON when the form is submitted, and the calendar sends `msgsndr-booking-complete` when a booking is done. This listener catches both and pushes:

```js
{ event: 'ghl_form_submit', form_id: 'Fm8kQ2pZx1', page_path: '/free-audit/' }
{ event: 'ghl_booking_complete', page_path: '/book-a-call/' }
```

Built-in safety:

- Only trusts messages from `leadconnectorhq.com`, `msgsndr.com` and `gohighlevel.com`
- White-label forms: add your own domain to `GHL_CUSTOM_DOMAINS`, for example `['link.youragency.com']`
- Reads the form message safely, so odd messages from other iframes, extensions and chat widgets never throw errors
- Pushes once per submission and once per booking, even when GHL sends the message twice

## Install in 6 steps

1. **Embed the GHL form or calendar on your page.** In GHL go to Sites → Forms (or Calendars) → your form → Integrate → copy the embed code and paste it into your page. The form must be on a page where your GTM loads.
2. **GTM → Tags → New → Custom HTML.** Paste [`gohighlevel-gtm-listener.html`](gohighlevel-gtm-listener.html). Trigger: **All Pages**.
3. **Triggers → New → Custom Event**, event name `ghl_form_submit`. Add a second one for `ghl_booking_complete` if you use a calendar.
4. **Variables → New → Data Layer Variable**: `DLV - form_id` → `form_id`.
5. Fire your **GA4 event** (for example `generate_lead`), **Google Ads conversion** or **Meta Pixel** `Lead` event on that trigger.
6. **Preview**, submit a test lead, check the event in Tag Assistant, then **Publish**.

## Files

| File | What it is |
|---|---|
| `gohighlevel-gtm-listener.html` | Ready to paste into a GTM Custom HTML tag |
| `gohighlevel-gtm-listener.js` | Same code without the `<script>` tags |
| `examples/sample-datalayer-output.json` | What the pushes look like |

## Videos

- Install the free code: https://mdniamul.com/gtm-event-listeners/gohighlevel-gtm-listener/#install-video
- What the advanced version collects: https://mdniamul.com/gtm-event-listeners/gohighlevel-gtm-listener/#advanced

## Step-by-step guides

- [GoHighLevel form Google Ads conversion tracking with GTM](https://mdniamul.com/blog/gohighlevel-form-google-ads-conversion-tracking-gtm/)
- [Track GoHighLevel leads with Google Ads Enhanced Conversions](https://mdniamul.com/blog/track-gohighlevel-form-leads-google-ads-enhanced-conversions/)
- [GoHighLevel offline conversion tracking for Google Ads](https://mdniamul.com/blog/how-to-set-up-google-ads-offline-conversion-tracking-using-gohighlevel-crm/)

## Need more data? Advanced version

The free code tells you a form was sent or a call was booked. The **advanced version** also sends the lead's SHA-256 hashed email, name, phone and address, the GHL contact ID for offline conversions, UTM values, 17 ad click IDs, first-party cookies (`_ga`, `_fbp`, `_fbc`, `_gcl_au` and more), visitor location and a unique `event_id`. It also passes UTM values and click IDs into the GHL form, so your hidden fields fill in and the source is saved on the contact. Ready for Google Ads Enhanced Conversions, Meta CAPI, TikTok Events API and server-side GTM.

It comes with a setup video, a PDF guide and a GTM import file in your client portal. The code starts from $89, and setup packages are available:

- Prices: https://mdniamul.com/gtm-event-listeners/gohighlevel-gtm-listener/#pricing
- WhatsApp: https://api.whatsapp.com/send?phone=8801776485758
- Book a call: https://calendly.com/mdniamul
- All listeners: https://mdniamul.com/gtm-event-listeners/

Want it done for you? See my [GoHighLevel form conversion tracking service](https://mdniamul.com/gohighlevel-form-conversion-tracking-services/) and the [GoHighLevel conversion tracking specialist](https://mdniamul.com/gohighlevel-conversion-tracking-specialist/) page.

## Troubleshooting

- **No event:** the form is on a GHL funnel page or hosted link (not embedded on your site), it loads from a white-label domain you have not added, or GTM is not on that page.
- **Two events:** an older listener is still live. Keep one.
- **Check the raw message:** run `window.addEventListener('message', e => console.log(e.origin, e.data))` in the console and submit a test lead. The origin shows the domain to add for white-label forms.

## About

Built by **[MD Niamul](https://mdniamul.com)**, GoHighLevel & AI Agent Automation, Marketing Attribution and Server-Side Tracking Specialist. Founder of Digital Soldier Agency and official Stape partner.

[Website](https://mdniamul.com) · [Free GTM listeners](https://mdniamul.com/gtm-event-listeners/) · [Book a call](https://calendly.com/mdniamul) · [LinkedIn](https://linkedin.com/in/mdniamul)

## License

MIT. Free to use on your own and your clients' sites. See [LICENSE](LICENSE).

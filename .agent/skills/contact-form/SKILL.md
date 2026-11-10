---
name: contact-form
description: Rules for the contact form and lib/contact.ts. Use when touching contact, email or the Google Form.
---
- The Google Form is the delivery channel. Never change its URL or entry IDs unless the owner confirms against the live form.
- URL and entry IDs live only in app/content/site.ts, with the warning comment from PLAN.md 6.8.
- no-cors responses are opaque: say "sent", never "delivered". On error keep the draft and show the fallback.
- Validate, trim, cap length; honeypot; cooldown; disable the button while sending.
- Tests intercept docs.google.com. CI never posts to the real form.
- Any change to the form needs a manual test submission on staging.


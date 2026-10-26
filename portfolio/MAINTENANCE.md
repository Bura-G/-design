# Site maintenance guide

## Project structure

- `index.html`: page sections, metadata, navigation, contact form, and footer.
- `styles.css`: layout, color, typography, responsive rules, motion, and focus styles.
- `script.js`: service rendering, project cards and filters, lightbox, contact submission, and mobile navigation.
- `data/services.js`: the single source for service names, starting prices, delivery estimates, quote project types, and icons.
- `data/site-content.js`: about facts, FAQ, testimonials, contact channels, and canonical domain.
- `data/projects.js`: portfolio cards, image paths, descriptions, categories, and featured flags.
- `assets/images/projects/`: optimized project images. Keep each JPG and same-basename WebP together.
- `assets/images/profile.jpg`: one replaceable portrait used by the header and About card.
- `assets/favicon.svg`: browser tab icon.
- `case-study-template.html`: blank case study page for future Portugal thumbnail, hotel menu, or Awash Cargo card writeups.
- `.github/copilot-instructions.md`: project rules for GitHub Copilot and future assistant sessions.

## Where to edit

- Hero copy and navigation: `index.html` inside `#home` and `.navbar`.
- Services and all prices/delivery times: `data/services.js` only.
- About paragraphs and facts: `index.html` plus confirmed draft/revision values in `data/site-content.js`.
- FAQ answers: `data/site-content.js` under `faq`.
- Testimonials: add real `{ quote, name }` items to `testimonials` in `data/site-content.js`; the section appears automatically when there is at least one valid item.
- Contact email/phone and chat/social URLs: `data/site-content.js` under `contact`. Set `telegramUsername` to the username only (no `@` or URL), `whatsappNumber` to digits only with country code, and `whatsappPrefill` to the default WhatsApp message. Contact buttons, footer icons, the CTA button, and the mobile floating button use these same values and hide automatically when a username or number is empty. LinkedIn only appears for a valid HTTPS LinkedIn URL. Fiverr and Behance only appear after adding HTTPS URLs.
- Form endpoint: update the `action` attribute on `#contactForm` in `index.html`. The JavaScript submission handler uses the form's action and method attributes.
- Domain: replace `YOUR_DOMAIN_TODO` in canonical metadata and JSON-LD in `index.html`, and `domain` in `data/site-content.js`.
- Portrait: replace `assets/images/profile.jpg`; both portrait placements use this same file.

## Add a project in 3 steps

1. Put the optimized image in `assets/images/projects/` with a lowercase hyphenated name, for example `coffee-shop-menu.jpg` and `coffee-shop-menu.webp`.
2. Add one project object to `data/projects.js`, including an accurate `imageAlt`, `image`, `images`, `category`, and factual description.
3. Set `category` to an existing filter value (`Thumbnails`, `Social Media`, `Print`, or `Branding`) and confirm it appears under that filter.

## Image rules

- Use lowercase names separated with hyphens; avoid spaces and special characters for new assets.
- Keep project images below 500 KB each when practical; export WebP for delivery and JPG as a fallback.
- Use WebP at quality around 75–85 and preserve the same base filename for JPG/WebP pairs.
- Convert with ImageMagick (`magick image.jpg -quality 82 image.webp`) or an image editor such as Squoosh; keep the JPG as the fallback.
- Set `width` and `height`, use useful alt text that describes the visible design, and lazy-load images below the fold.
- Keep the social preview at `assets/og-image.jpg` with 1200 × 630 dimensions once the final image is ready.

## Switch on optional content

- Testimonials: add at least one real quote and the person's approved name in `data/site-content.js`.
- Statistics: fill real numbers in `about.stats`, then set `visible: true` and add the stats row markup when approved.
- Fiverr and Behance: fill `fiverrUrl` or `behanceUrl` with the full HTTPS profile URL.
- LinkedIn: enter a confirmed HTTPS profile URL. Telegram and WhatsApp values are configured in one place under `data/site-content.js` → `contact` (`telegramUsername`, `whatsappNumber`, `whatsappPrefill`). Matching links appear automatically.
- Process is part of Services and is already visible.

## Pre-deploy checklist

- Replace all applicable `TODO_CONFIRM` values and `YOUR_DOMAIN_TODO`.
- Configure the Formspree endpoint in `index.html`; submit the form from localhost, confirm a 200 response in the browser Network tab, then confirm the email arrives (check spam).
- Check links and image requests in browser devtools; check the form success and error responses with the configured Formspree endpoint.
- Check keyboard navigation for the mobile menu, project filters, lightbox and FAQ; check a reduced-motion setting.
- Check responsive layout at 320, 375, 768, 1024 and 1440 px and confirm there is no horizontal scrolling.
- Run Lighthouse mobile for Performance, Accessibility, Best Practices and SEO; target 90+ for each.
- Deploy the `portfolio` directory to the existing Vercel project and verify the deployment domain and live form.

## Remaining TODO_CONFIRM values

- YouTube thumbnail: starting price ($10) and delivery (1 to 2 days).
- Social media posts: starting price ($5 each) and delivery (1 to 2 days).
- Business cards and print: starting price ($15) and delivery (2 to 3 days).
- Menus and banners: starting price ($20) and delivery (2 to 3 days).
- Logo and branding: starting price ($30) and delivery (3 to 5 days).
- About first-draft turnaround and included revisions in `data/site-content.js`.
- FAQ: revisions included, project duration, payment method, and whether source files are available on request.
- Telegram username and WhatsApp number.
- Canonical domain in `index.html` and `data/site-content.js`.
- LinkedIn URL confirmation; keep it blank until a valid profile URL is confirmed. Fiverr and Behance URLs are optional.
- Confirm whether concept/client classifications in `data/projects.js` are accurate before presenting them as client work.
- Add real case study content and image mockups before publishing case study pages.

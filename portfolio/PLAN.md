# Portfolio rebuild plan

The site is a static HTML, CSS, and JavaScript project. Keep this stack and do not add a framework or build tools.

## Phase 1: Audit and bug fixes

- Keep Services, My Work, and Contact headings visible, including when JavaScript is unavailable.
- Rewrite About copy so the first-draft sentence reads correctly while the unconfirmed time stays hidden.
- Add project card padding, high-contrast project badges, circular About photo, and bottom-aligned project buttons.
- Center incomplete project-grid rows and align service card icons and titles; replace the unrelated Menus icon.
- Remove the contact-form decoration and duplicate CTA band; tidy footer links and label chat icons.
- Record unconfirmed facts and source-image corrections in `TODO.md`.

## Phase 2: Design system

- Add editable color, type, spacing, button, card, badge, focus, and section layout tokens.
- Apply the shared system across the site and document it in `README.md`.

## Phase 3: Header and Hero

- Build a sticky dark header with navigation and a Hire me button.
- Refine the existing headline and audience copy; use three large, uncropped previews without overlays.
- Show availability only after confirmation and remove excess hero space.

## Phase 4: My Work

- Move My Work directly after Hero; use dedicated 4:3 covers and full images in the lightbox.
- Hide empty filters, label unknown projects as concepts, and keep factual descriptions.
- Check lightbox keyboard and touch controls; track source-image typo fixes in `TODO.md`.

## Phase 5: Services

- Add five service cards with sample images, descriptions, confirmation-gated prices and delivery details.
- Hide Logo and Branding until a logo project exists; add Order this links that preselect the form.
- Keep the four-step process.

## Phase 6: About

- Use a non-stretched portrait and concise, factual biography.
- Arrange confirmed tools, languages, and time-zone facts evenly and add a See my work link.

## Phase 7: Contact and footer

- Put configured WhatsApp, confirmed Telegram, and email links first.
- Keep a short accessible form with optional budget, honeypot, success/error states, and a confirmed form endpoint.
- Align contact columns and finish the footer without a duplicate CTA band.

## Phase 8: Quality, SEO, and deploy

- Review metadata, image descriptions, formats, lazy loading, keyboard access, contrast, and responsive layouts.
- Check 375px, 768px, and 1440px, run Lighthouse, test links and form, then document Vercel deployment steps.

## Phase 9: Maintenance guide

- Document how to add projects, update prices and contact links, replace images, and deploy.

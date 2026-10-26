# Portfolio maintenance rules

- Keep this static HTML, CSS and JavaScript site lightweight and usable without a build step.
- Keep service names, prices, delivery windows and project type values together in `data/services.js`; mark every unconfirmed value `TODO_CONFIRM`.
- Keep editable about, FAQ, testimonial, contact and domain values in `data/site-content.js`.
- Keep project metadata in `data/projects.js` and preserve its category values used by the project filters.
- Never invent client outcomes, testimonials, project counts, delivery claims, or social profile URLs.
- Preserve keyboard access, visible focus, descriptive image alt text, reduced-motion support, responsive layout and form validation.
- Use optimized WebP with a JPG fallback, explicit image dimensions and lazy loading below the fold.
- Keep testimonials hidden when there are no real entries; keep optional statistics hidden until real figures are supplied.
- Update `MAINTENANCE.md` when project structure or deployment instructions change.

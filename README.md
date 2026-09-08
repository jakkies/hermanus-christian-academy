# Hermanus Christian Academy — static HTML website

This folder is the framework-free version of the HCA website. It uses only HTML5, CSS and plain JavaScript.

## Open locally

Double-click `index.html`. No installation, package manager or build step is required.

For the closest match to a hosted website, you can also serve this folder with any simple local web server.

## Files

- `index.html` — complete homepage
- `about.html`, `learning.html`, `school-life.html`, `admissions.html`, `support.html`, `news.html`, `parents.html`, `contact.html` — internal pages
- `css/styles.css` — brand system, components, layouts and responsive rules
- `js/hca-content.js` — central editable source for school facts, learning, staff, activities, testimonials and current needs
- `js/site.js` — shared rendering, mobile navigation and enquiry-form behaviour
- `assets/images/` — all photography
- `assets/og.png` — social sharing card

## Updating content

Edit repeated factual content in `js/hca-content.js`. Update larger homepage copy directly in `index.html`.

## Replacing images

Replace files inside `assets/images/` while keeping the existing filenames. The official round logo is stored as `assets/images/HCA-logo-round.png`; its display size is controlled by `.brand__logo-image` in `css/styles.css`.

## Publishing

Upload the contents of this folder to the public directory of any ordinary static web host. `index.html` must sit at the top level.

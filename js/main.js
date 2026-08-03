(function () {
  "use strict";

  var content = window.HCA_CONTENT;
  var pageKey = document.body.dataset.page || "home";

  function logoMarkup(light) {
    return [
      '<span class="brand', light ? " brand--light" : "", '" aria-label="Hermanus Christian Academy">',
      '<img class="brand__logo-image" src="assets/images/HCA-logo-round.png" alt="" width="402" height="402">',
      '<span class="brand__words"><strong>Hermanus</strong><span>Christian Academy</span></span>',
      "</span>"
    ].join("");
  }

  function headerMarkup() {
    var overlay = pageKey === "home";
    var nav = [
      ["home", "Home", "index.html"],
      ["about", "About Us", "about.html"],
      ["learning", "Curriculum", "learning.html"],
      ["admissions", "Admission", "admissions.html"],
      ["school-life", "Meet our staff", "school-life.html"],
      ["contact", "Contact us", "contact.html"]
    ];

    return [
      '<header class="site-header', overlay ? " site-header--overlay" : "", '">',
      '<div class="container header__inner">',
      '<a class="header__brand-link" href="index.html">', logoMarkup(overlay), "</a>",
      '<button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-navigation" aria-label="Open navigation menu"><span></span><span></span><span></span></button>',
      '<div class="nav-wrap" id="primary-navigation">',
      '<nav class="primary-nav" aria-label="Primary navigation">',
      nav.map(function (item) {
        var active = item[0] === pageKey;
        var learningMenu = item[0] === "learning"
          ? '<div class="nav-dropdown">' + content.learningPhases.map(function (phase) {
            return '<a href="' + phase.href + '"><strong>' + phase.title + '</strong><span>' + phase.grades + "</span></a>";
          }).join("") + "</div>"
          : "";
        return [
          '<div class="nav-item', item[0] === "learning" ? " nav-item--has-menu" : "", '">',
          '<a href="', item[2], '"', active ? ' class="is-active" aria-current="page"' : "", ">",
          item[1], item[0] === "learning" ? '<span class="nav-caret" aria-hidden="true">⌄</span>' : "",
          "</a>", learningMenu, "</div>"
        ].join("");
      }).join(""),
      "</nav>",
      '<a class="button button--primary header__apply" href="admissions.html">Apply Now <span aria-hidden="true">→</span></a>',
      "</div></div></header>"
    ].join("");
  }

  function footerMarkup() {
    return [
      '<footer class="site-footer">',
      '<div class="container footer__grid">',
      '<div class="footer__about"><a href="index.html">', logoMarkup(true), "</a>",
      "<p>A Christ-centred school equipping learners to know God, serve others and impact the world.</p>",
      '<div class="social-links" aria-label="Social media links"><a href="#" aria-label="Facebook">f</a><a href="#" aria-label="Instagram">◎</a></div></div>',
      '<div><h2>Contact Us</h2><ul class="footer-list footer-list--contact">',
      '<li><a href="tel:+27283161910">+27 (0)28 316 1910</a></li>',
      '<li><a href="mailto:hermacademy@whalemail.co.za">hermacademy@whalemail.co.za</a></li>',
      "<li>1823 Bergsig Road<br>Sandbaai, Hermanus 7200</li></ul>",
      '<a class="text-link text-link--light" href="https://maps.google.com/?q=1823+Bergsig+Road+Sandbaai+Hermanus">Get Directions <span>→</span></a></div>',
      '<div><h2>Quick Links</h2><ul class="footer-list"><li><a href="about.html">About HCA</a></li><li><a href="admissions.html">Admissions</a></li><li><a href="#">School Fees</a></li><li><a href="#">Uniform</a></li><li><a href="#">Policies</a></li><li><a href="news.html">Calendar</a></li><li><a href="#">Careers</a></li></ul></div>',
      '<div><h2>Parent Resources</h2><ul class="footer-list"><li><a href="#">ACE Parent Portal</a></li><li><a href="#">Forms & Downloads</a></li><li><a href="#">Term Dates</a></li><li><a href="#">Newsletters</a></li><li><a href="#">Aftercare</a></li><li><a href="#">Contact Teachers</a></li></ul></div>',
      '<div><h2>Stay Connected</h2><p>School news and useful dates, sent with care.</p>',
      '<form class="newsletter" novalidate><label for="newsletter-email">Email address</label>',
      '<div class="newsletter__row"><input id="newsletter-email" name="email" type="email" placeholder="you@example.com" required><button type="submit" aria-label="Subscribe to newsletter">→</button></div>',
      '<p class="form-message" aria-live="polite"></p></form></div>',
      "</div>",
      '<div class="container footer__bottom"><p>© 2026 Hermanus Christian Academy</p><div><a href="#">Privacy</a><a href="#">Terms</a></div><p class="footer__glory">To God Be the Glory</p></div>',
      "</footer>"
    ].join("");
  }

  function renderSharedLayout() {
    var header = document.querySelector("[data-site-header]");
    var footer = document.querySelector("[data-site-footer]");
    if (header) header.innerHTML = headerMarkup();
    if (footer) footer.innerHTML = footerMarkup();
  }

  function renderHomepageContent() {
    var quick = document.querySelector("[data-quick-facts]");
    if (quick) {
      quick.innerHTML = content.quickFacts.map(function (fact) {
        return '<div class="quick-fact"><span class="quick-fact__icon" aria-hidden="true">' + fact.icon +
          "</span><div><h2>" + fact.title + "</h2><p>" + fact.text + "</p></div></div>";
      }).join("");
    }

    var phases = document.querySelector("[data-learning-phases]");
    if (phases) {
      phases.innerHTML = content.learningPhases.map(function (phase) {
        return [
          '<article class="learning-card"><div class="learning-card__media">',
          '<img src="', phase.image, '" alt="" width="1200" height="800" loading="lazy"></div>',
          '<span class="learning-card__icon" aria-hidden="true">', phase.icon, "</span>",
          '<div class="learning-card__body"><p class="learning-card__grades">', phase.grades, "</p>",
          "<h3>", phase.title, "</h3><p>", phase.description, "</p>",
          '<a class="text-link" href="', phase.href, '">', phase.link, " <span>→</span></a></div></article>"
        ].join("");
      }).join("");
    }

    var values = document.querySelector("[data-values]");
    if (values) {
      values.innerHTML = content.values.map(function (item) {
        return '<div class="value-item"><span class="value-item__icon" aria-hidden="true">' +
          item.icon + "<i></i></span><h3>" + item.label + "</h3></div>";
      }).join("");
    }

    var gallery = document.querySelector("[data-gallery]");
    if (gallery) {
      gallery.innerHTML = content.gallery.map(function (item) {
        return '<figure class="gallery-card"><img src="' + item.image + '" alt="' + item.alt +
          '" width="1200" height="800" loading="lazy"><figcaption>' + item.label + "</figcaption></figure>";
      }).join("");
    }

    var news = document.querySelector("[data-news]");
    if (news) {
      news.innerHTML = content.news.map(function (article) {
        return [
          '<article class="news-card"><a href="news.html" class="news-card__image" tabindex="-1">',
          '<img src="', article.image, '" alt="" width="1200" height="800" loading="lazy"></a>',
          '<div><p class="news-card__date">', article.date, '</p><h3><a href="news.html">',
          article.title, "</a></h3><p>", article.excerpt, "</p></div></article>"
        ].join("");
      }).join("");
    }

    var events = document.querySelector("[data-events]");
    if (events) {
      events.innerHTML = content.events.map(function (event) {
        return [
          '<a class="event-row" href="news.html"><time><strong>', event.day, "</strong><span>",
          event.month, "</span></time><div><h3>", event.title, "</h3><p>", event.time,
          '</p></div><span class="event-row__arrow" aria-hidden="true">→</span></a>'
        ].join("");
      }).join("");
    }
  }

  function renderInternalPage() {
    if (pageKey === "home") return;
    if (pageKey === "about") return;
    var page = content.pages[pageKey] || content.pages.about;
    document.title = page.eyebrow + " | Hermanus Christian Academy";
    var target = document.querySelector("[data-internal-page]");
    if (!target) return;
    target.innerHTML = [
      '<section class="inner-hero"><div class="container inner-hero__grid"><div>',
      '<p class="eyebrow eyebrow--light"><span></span>', page.eyebrow, "</p>",
      "<h1>", page.title, "</h1><p>", page.intro, "</p></div>",
      '<span class="inner-hero__mark" aria-hidden="true">✦</span></div></section>',
      '<section class="section"><div class="container inner-content"><div>',
      '<p class="eyebrow"><span></span>EXPLORE</p><h2>Start here.</h2>',
      "<p>This page is ready for the school administrator to add final detailed content, downloads and authentic HCA photography.</p>",
      '<a class="button button--primary" href="contact.html">Talk to Our Team <span>→</span></a></div>',
      '<div class="inner-content__cards">',
      page.points.map(function (point, index) {
        return '<article><span>0' + (index + 1) + "</span><h3>" + point +
          "</h3><p>Clear, practical information for current and prospective HCA families.</p></article>";
      }).join(""),
      "</div></div></section>",
      '<section class="simple-cta"><div class="container simple-cta__inner"><div>',
      '<p class="eyebrow eyebrow--light"><span></span>WELCOME TO HCA</p>',
      "<h2>Come and see our school in action.</h2></div>",
      '<a class="button button--white" href="contact.html">Arrange a Visit <span>→</span></a>',
      "</div></section>"
    ].join("");
  }

  function initNavigation() {
    var header = document.querySelector(".site-header");
    var toggle = document.querySelector(".menu-toggle");
    var menu = document.querySelector(".nav-wrap");
    if (!header || !toggle || !menu) return;

    function updateHeader() {
      header.classList.toggle("is-scrolled", window.scrollY > 24);
    }

    function closeMenu(restoreFocus) {
      header.classList.remove("menu-is-open");
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open navigation menu");
      document.body.classList.remove("menu-open");
      if (restoreFocus) toggle.focus();
    }

    toggle.addEventListener("click", function () {
      var opening = toggle.getAttribute("aria-expanded") !== "true";
      header.classList.toggle("menu-is-open", opening);
      menu.classList.toggle("is-open", opening);
      toggle.setAttribute("aria-expanded", String(opening));
      toggle.setAttribute("aria-label", opening ? "Close navigation menu" : "Open navigation menu");
      document.body.classList.toggle("menu-open", opening);
      if (opening) {
        var firstLink = menu.querySelector("a");
        if (firstLink) firstLink.focus();
      }
    });

    menu.addEventListener("click", function (event) {
      if (event.target.closest("a")) closeMenu(false);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        closeMenu(true);
      }
      if (event.key !== "Tab" || toggle.getAttribute("aria-expanded") !== "true") return;
      var focusable = Array.prototype.slice.call(menu.querySelectorAll("a, button"));
      if (!focusable.length) return;
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    window.addEventListener("scroll", updateHeader, { passive: true });
    updateHeader();
  }

  function initForms() {
    var form = document.querySelector(".newsletter");
    if (!form) return;
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var email = form.elements.email.value.trim();
      var message = form.querySelector(".form-message");
      var valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      message.textContent = valid ? "Thank you — you’re on the list." : "Please enter a valid email address.";
      if (valid) form.reset();
    });
  }

  renderSharedLayout();
  renderHomepageContent();
  renderInternalPage();
  initNavigation();
  initForms();
  document.documentElement.classList.remove("no-js");
})();

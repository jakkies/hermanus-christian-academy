(function () {
  "use strict";

  var content = window.HCA_CONTENT;
  var school = content.school;
  var pageKey = document.body.dataset.page || "home";
  var subNavByPage = {
    about: [["story", "Our Story"], ["purpose", "Mission & Vision"], ["foundation", "Christian Foundation"], ["team", "Our Team"]],
    learning: [["approach", "Our Approach"], ["ace", "How Learning Works"], ["learner-benefits", "Learner Benefits"], ["family-benefits", "Family Support"], ["learning-levels", "Learning Levels"]],
    "school-life": [["activities", "Activities"], ["practical-skills", "Practical Skills"], ["spiritual-life", "Spiritual Life"]],
    support: [["donate", "Donate"], ["testimonials", "HCA Stories"], ["current-needs", "Current Needs"]],
    contact: [["contact-details", "Contact Details"], ["enquiry", "Send an Enquiry"]]
  };

  function initials(name) {
    return name.replace(/^Mr\.\s+/, "").split(/\s+/).map(function (part) { return part.charAt(0); }).join("").slice(0, 2).toUpperCase();
  }

  function logoMarkup() {
    return [
      '<span class="brand brand--light" aria-label="Hermanus Christian Academy">',
      '<img class="brand__logo-image" src="assets/images/HCA-logo-round.png" alt="" width="402" height="402">',
      '<span class="brand__words"><strong>Hermanus</strong><span>Christian Academy</span></span>',
      "</span>"
    ].join("");
  }

  function headerMarkup() {
    var overlay = pageKey === "home";
    var nav = [
      ["home", "Home", "index.html"],
      ["about", "About", "about.html"],
      ["learning", "Learning", "learning.html"],
      ["school-life", "School Life", "school-life.html"],
      ["admissions", "Admissions", "admissions.html"],
      ["contact", "Contact", "contact.html"]
    ];

    return [
      '<header class="site-header', overlay ? " site-header--overlay" : "", '"><div class="container header__inner">',
      '<a class="header__brand-link" href="index.html">', logoMarkup(), "</a>",
      '<button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-navigation" aria-label="Open navigation menu"><span></span><span></span><span></span></button>',
      '<div class="nav-wrap" id="primary-navigation"><nav class="primary-nav" aria-label="Primary navigation">',
      nav.map(function (item) {
        var active = item[0] === pageKey;
        var dropdown = item[0] === "about"
          ? '<div class="nav-dropdown"><a href="about.html#story"><strong>Our Story</strong></a><a href="about.html#purpose"><strong>Mission & Vision</strong></a><a href="about.html#foundation"><strong>Christian Foundation</strong></a><a href="about.html#team"><strong>Our Team</strong></a></div>'
          : item[0] === "learning"
            ? '<div class="nav-dropdown"><a href="learning.html#approach"><strong>Our Approach</strong></a><a href="learning.html#ace"><strong>A.C.E. Curriculum</strong></a><a href="learning.html#ecd"><strong>ECD / Pre-primary</strong></a><a href="learning.html#primary"><strong>Primary School</strong></a><a href="learning.html#grades-8-9"><strong>Grades 8–9</strong></a></div>'
            : "";
        return '<div class="nav-item' + (dropdown ? " nav-item--has-menu" : "") + '"><a href="' + item[2] + '"' +
          (active ? ' class="is-active" aria-current="page"' : "") + ">" + item[1] +
          (dropdown ? '<span class="nav-caret" aria-hidden="true">⌄</span>' : "") + "</a>" + dropdown + "</div>";
      }).join(""),
      '</nav><div class="header__actions"><a class="button button--donate header__donate" href="support.html">Donate <span aria-hidden="true">→</span></a><a class="button button--primary header__apply" href="admissions.html">Apply Now <span aria-hidden="true">→</span></a></div>',
      "</div></div></header>"
    ].join("");
  }

  function footerMarkup() {
    return [
      '<footer class="site-footer"><div class="container footer__grid">',
      '<div class="footer__about"><a href="index.html">', logoMarkup(), "</a><p>", school.message, "</p></div>",
      '<div><h2>Contact Us</h2><ul class="footer-list footer-list--contact">',
      '<li><a href="tel:', school.telephoneHref, '">', school.telephone, "</a></li>",
      '<li><a href="mailto:', school.email, '">', school.email, "</a></li>",
      "<li>", school.physicalAddress.join("<br>"), "</li></ul>",
      '<a class="text-link text-link--light" href="https://maps.google.com/?q=1823+Bergsig+Road+Sandbaai+Hermanus">Get Directions <span>→</span></a></div>',
      '<div><h2>Explore HCA</h2><ul class="footer-list"><li><a href="about.html">About HCA</a></li><li><a href="learning.html">Learning</a></li><li><a href="school-life.html">School Life</a></li><li><a href="admissions.html">Admissions</a></li><li><a href="support.html">Support HCA</a></li><li><a href="news.html">News & Events</a></li></ul></div>',
      '<div><h2>Family Information</h2><ul class="footer-list"><li><a href="parents.html">Parent Resources</a></li><li><a href="contact.html">Request Information</a></li><li><a href="contact.html">Arrange a Visit</a></li></ul></div>',
      '<div><h2>Organisation</h2><p>', school.organisation, '</p><ul class="footer-list"><li>NPO: ', school.npoRegistration, "</li><li>PBO: ", school.pboReference, '</li></ul><a class="button button--primary footer__contact-button" href="contact.html">Contact HCA <span>→</span></a></div>',
      '</div><div class="container footer__bottom"><p>© 2026 Hermanus Christian Academy</p><div><a href="parents.html">Parent Resources</a><a href="contact.html">Contact</a></div><p class="footer__glory">To God Be the Glory</p></div></footer>'
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
    if (quick) quick.innerHTML = content.quickFacts.map(function (fact) {
      return '<div class="quick-fact"><span class="quick-fact__icon" aria-hidden="true">' + fact.icon + '</span><div><h2>' + fact.title + "</h2><p>" + fact.text + "</p></div></div>";
    }).join("");

    var phases = document.querySelector("[data-learning-phases]");
    if (phases) phases.innerHTML = content.learningPhases.map(function (phase) {
      return '<article class="learning-card"><div class="learning-card__media"><img src="' + phase.image + '" alt="' + phase.alt + '" width="1200" height="800" loading="lazy"></div><span class="learning-card__icon" aria-hidden="true">' + phase.icon + '</span><div class="learning-card__body"><p class="learning-card__grades">' + phase.grades + "</p><h3>" + phase.title + "</h3><p>" + phase.description + '</p><a class="text-link" href="' + phase.href + '">' + phase.link + " <span>→</span></a></div></article>";
    }).join("");

    var values = document.querySelector("[data-values]");
    if (values) values.innerHTML = content.values.map(function (item) {
      return '<div class="value-item"><span class="value-item__icon" aria-hidden="true">' + item.icon + "<i></i></span><h3>" + item.label + "</h3></div>";
    }).join("");

    var vision = document.querySelector("[data-vision]");
    if (vision) vision.innerHTML = content.vision.map(function (item) {
      return '<article class="vision-card"><span>' + item.number + "</span><h3>" + item.title + "</h3><p>" + item.text + "</p></article>";
    }).join("");

    var gallery = document.querySelector("[data-gallery]");
    if (gallery) gallery.innerHTML = content.gallery.map(function (item) {
      return '<figure class="gallery-card"><img src="' + item.image + '" alt="' + item.alt + '" width="1200" height="800" loading="lazy"><figcaption>' + item.label + "</figcaption></figure>";
    }).join("");

    var stories = document.querySelector("[data-testimonials]");
    if (stories) stories.innerHTML = content.testimonials.map(function (item) {
      return '<article class="testimonial-card"><div class="testimonial-card__person"><span>' + item.initials + "</span><div><h3>" + item.name + "</h3><p>" + item.role + "</p></div></div><blockquote>“" + item.excerpt + '”</blockquote><a class="text-link" href="support.html#testimonials">Read ' + item.name.split(" ")[0] + "’s Story <span>→</span></a></article>";
    }).join("");

    var news = document.querySelector("[data-news]");
    if (news) news.innerHTML = '<div class="empty-state"><span aria-hidden="true">✦</span><h3>School news is coming soon.</h3><p>School news and upcoming events will be published here.</p></div>';
  }

  function pageHero(page) {
    return '<section class="inner-hero"><img class="inner-hero__image" src="' + page.image + '" alt="" width="1600" height="1000"><div class="container inner-hero__grid"><div><p class="eyebrow eyebrow--light"><span></span>' + page.eyebrow + "</p><h1>" + page.title + "</h1><p>" + page.intro + '</p></div><span class="inner-hero__mark" aria-hidden="true">✦</span></div></section>';
  }

  function heading(eyebrow, title, text, centered) {
    return '<div class="section-heading' + (centered ? " section-heading--center" : "") + '"><p class="eyebrow"><span></span>' + eyebrow + "</p><h2>" + title + "</h2>" + (text ? "<p>" + text + "</p>" : "") + "</div>";
  }

  function subNavMarkup() {
    var items = subNavByPage[pageKey];
    if (!items || items.length < 2) return "";
    return '<nav class="page-subnav" aria-label="On this page"><div class="container page-subnav__inner"><span class="page-subnav__label" aria-hidden="true">→</span><div class="page-subnav__links">' + items.map(function (item, index) {
      return '<a href="#' + item[0] + '"' + (index === 0 ? ' aria-current="location"' : "") + ">" + item[1] + "</a>";
    }).join("") + "</div></div></nav>";
  }

  function renderVisionCards() {
    return '<div class="vision-grid">' + content.vision.map(function (item) {
      return '<article class="vision-card"><span>' + item.number + "</span><h3>" + item.title + "</h3><p>" + item.text + "</p></article>";
    }).join("") + "</div>";
  }

  function renderTeam() {
    return content.staffGroups.map(function (group) {
      return '<section class="staff-group"><h3>' + group.title + '</h3><div class="staff-grid">' + group.people.map(function (person) {
        return '<article class="staff-card"><span class="staff-card__initials" aria-hidden="true">' + initials(person.name) + "</span><div><h4>" + person.name + "</h4><p>" + person.role + "</p></div></article>";
      }).join("") + "</div></section>";
    }).join("");
  }

  function renderAbout() {
    return [
      '<section class="section" id="story"><div class="container editorial-grid"><div class="feature-media"><img src="assets/images/photos/ABOUT-OUR-STORY.jpg" alt="The Hermanus Christian Academy school community" width="1620" height="1080"></div><div class="content-copy">',
      heading("OUR STORY", "More Than a School. A Ministry with Purpose.", "", false),
      '<p>Hermanus Christian Academy is first and foremost a ministry. Founded by Dr Nealie and Veronica Ross, the school has served the Hermanus community for more than three decades.</p>',
      '<p>Located in Sandbaai, HCA provides education from ECD / Pre-primary through Primary School, Grade 8 and Grade 9. The school operates under Light of the Cross Ministries Trust t/a Hermanus Christian Academy.</p>',
      '</div></div></section>',
      '<section class="section purpose-section" id="purpose"><div class="container">', heading("MISSION & VISION", "Education with an Eternal Purpose", "HCA trains children of every ability in Christian leadership, self-discipline, individual responsibility, accountability and personal integrity.", true), renderVisionCards(), '</div></section>',
      '<section class="faith-banner" id="foundation"><div class="container faith-banner__inner"><div class="faith-banner__quote"><span class="faith-banner__flame" aria-hidden="true">〽</span><blockquote>“Not by might nor by power but by my Spirit says the Lord of hosts”</blockquote><cite>Zechariah 4:6</cite></div><div class="faith-banner__mission"><div><p class="eyebrow eyebrow--light"><span></span>CHRISTIAN FOUNDATION</p><h2>To God Be the Glory</h2><p>HCA is an educational ministry where biblical character development, faith and learning belong together.</p></div><span class="faith-banner__shield" aria-hidden="true"><i></i></span></div></div></section>',
      '<section class="section staff-section" id="team"><div class="container">', heading("OUR TEAM", "Meet the 2026 HCA Team", "Staff information is grouped by area so families can easily find the people who serve across the school.", true), '<div class="staff-directory">', renderTeam(), '</div></div></section>'
    ].join("");
  }

  function renderProcess() {
    return '<div class="process-grid">' + content.learningProcess.map(function (step, index) {
      return '<div class="process-step"><span>' + String(index + 1).padStart(2, "0") + "</span><strong>" + step + "</strong></div>";
    }).join("") + "</div>";
  }

  function renderLearning() {
    return [
      '<section class="section" id="approach"><div class="container editorial-grid"><div class="content-copy">', heading("OUR APPROACH", "What Is A.C.E.?", "", false),
      '<p>Learners work largely through self-instructional workbooks known as PACEs — Packets of Accelerated Christian Education. Learning is individualised and mastery based, helping learners build understanding before they progress.</p>',
      '<p>The programme incorporates biblical learning material and has been used by schools and homeschools internationally for more than four decades.</p></div><div class="feature-media"><img src="assets/images/photos/LEARNING-OUR-APPROACH.jpg" alt="HCA learners working through individual learning material" width="1620" height="1080"></div></div></section>',
      '<section class="section process-section" id="ace"><div class="container">', heading("HOW LEARNING WORKS", "A Clear Path from Placement to Progress", "Learners set goals, receive support and demonstrate mastery before moving forward.", true), renderProcess(), '</div></section>',
      '<section class="section" id="learner-benefits"><div class="container">', heading("BENEFITS FOR LEARNERS", "Learning Designed Around Real Progress", "", true), '<div class="feature-grid feature-grid--five">', content.learnerBenefits.map(function (item) { return '<article class="feature-card"><span class="feature-card__icon">' + item.icon + "</span><h3>" + item.title + "</h3><p>" + item.text + "</p></article>"; }).join(""), '</div></div></section>',
      '<section class="section pale-section" id="family-benefits"><div class="container benefits-layout"><div>', heading("FOR EDUCATORS & PARENTS", "Structure That Makes Support Visible", "The A.C.E. model gives educators and families a clear view of learner progress.", false), '</div><div class="benefit-list">', content.educatorBenefits.map(function (item) { return '<article><span aria-hidden="true">✓</span><div><h3>' + item.title + "</h3><p>" + item.text + "</p></div></article>"; }).join(""), '</div></div></section>',
      '<section class="section" id="learning-levels"><div class="container">', heading("CORE A.C.E. FEATURES", "A Scannable View of the Model", "", true), '<div class="chip-grid">', content.aceFeatures.map(function (item) { return '<div><span aria-hidden="true">✦</span>' + item + "</div>"; }).join(""), '</div><div class="learning-levels">', content.learningPhases.map(function (phase) { return '<article id="' + (phase.title.indexOf("ECD") === 0 ? "ecd" : phase.title === "Primary School" ? "primary" : "grades-8-9") + '"><img src="' + phase.image + '" alt="' + phase.alt + '"><div><p class="eyebrow"><span></span>' + phase.grades + "</p><h3>" + phase.title + "</h3><p>" + phase.description + "</p></div></article>"; }).join(""), '</div></div></section>'
    ].join("");
  }

  function renderSchoolLife() {
    return [
      '<section class="section" id="activities"><div class="container">', heading("STUDENT LIFE & ENRICHMENT", "Practical Skills. Creativity. Participation.", "Activities complement HCA’s Christian academic programme and help learners explore useful skills and interests.", true), '<div class="activity-groups">', content.activityGroups.map(function (group) { return '<article class="activity-group"><div class="activity-group__media"><img src="' + group.image + '" alt="' + group.alt + '" width="720" height="450" loading="lazy"></div><div class="activity-group__content"><h3>' + group.title + "</h3><ul>" + group.items.map(function (item) { return "<li>" + item + "</li>"; }).join("") + "</ul></div></article>"; }).join(""), '</div></div></section>',
      '<section class="section pale-section" id="practical-skills"><div class="container editorial-grid"><div class="feature-media"><img src="assets/images/photos/SCHOOL%20LIFE-CREATIVE%20%26%20PRACTICAL%20LEARNING.jpg" alt="HCA learners taking part in creative and practical learning" width="1620" height="1080"></div><div class="content-copy">', heading("CREATIVE & PRACTICAL LEARNING", "Skills That Extend Beyond the Classroom", "", false), '<p>HCA’s enrichment programme includes technology, sport, creative work, practical skills and communication activities. These opportunities give learners varied ways to participate, practise and grow.</p></div></div></section>',
      '<section class="faith-banner spiritual-section" id="spiritual-life"><div class="container faith-banner__inner"><div class="faith-banner__quote"><blockquote>Faith at the Heart of School Life</blockquote><cite>Worship · Devotion · Community</cite></div><div class="faith-banner__mission"><div><p class="eyebrow eyebrow--light"><span></span>SPIRITUAL LIFE</p><h2>Gathering in Faith</h2><p>Chapel takes place in the school hall every Friday. Praise and worship form a central part of the gathering, alongside daily devotions, special events and contributions from visiting ministries.</p></div></div></div></section>'
    ].join("");
  }

  function formMarkup(kind) {
    var admissions = kind === "admissions";
    return '<form class="enquiry-form" data-form-type="' + kind + '" novalidate><div class="form-grid"><label><span>Parent / guardian name</span><input name="name" autocomplete="name" required></label><label><span>Email</span><input name="email" type="email" autocomplete="email" required></label><label><span>Telephone</span><input name="telephone" type="tel" autocomplete="tel" required></label>' +
      (admissions ? '<label><span>Learner name</span><input name="learner" required></label><label><span>Learner’s current grade</span><input name="currentGrade" required></label><label><span>Grade of interest</span><select name="interest" required><option value="">Select an option</option><option>ECD / Pre-primary</option><option>Primary School</option><option>Grade 8</option><option>Grade 9</option></select></label>' : "") +
      '<label class="form-grid__wide"><span>Message</span><textarea name="message" rows="5" required></textarea></label></div><button class="button button--primary" type="submit">Prepare Email Enquiry <span>→</span></button><p class="form-note">Submitting opens your email app so you can review and send the enquiry.</p><p class="form-message" aria-live="polite"></p></form>';
  }

  function renderAdmissions() {
    return '<section class="section"><div class="container enquiry-layout"><div class="content-copy">' + heading("START A CONVERSATION", "Learn More About HCA", "", false) + '<p>The supplied school information does not define a formal admissions process or fee schedule. Contact HCA directly for current information and to arrange a school visit.</p><div class="contact-actions"><a class="button button--blue" href="tel:' + school.telephoneHref + '">Call Admissions <span>→</span></a><a class="button button--outline" href="mailto:' + school.email + '">Email HCA <span>→</span></a></div></div><div class="form-panel"><h2>Request Information</h2>' + formMarkup("admissions") + "</div></div></section>";
  }

  function renderTestimonials(full) {
    return '<div class="testimonial-grid testimonial-grid--full">' + content.testimonials.map(function (item) {
      return '<article class="testimonial-card"><div class="testimonial-card__person"><span>' + item.initials + "</span><div><h3>" + item.name + "</h3><p>" + item.role + '</p></div></div><div class="testimonial-card__story">' + (full ? item.full : [item.excerpt]).map(function (paragraph) { return "<p>" + paragraph + "</p>"; }).join("") + "</div></article>";
    }).join("") + "</div>";
  }

  function renderSupport() {
    return [
      // TODO: Publish banking details only after HCA confirms the correct ABSA account number; the compiled document contains conflicting numbers.
      '<section class="section donate-section" id="donate"><div class="container"><div class="donate-panel"><div class="donate-panel__copy"><p class="eyebrow eyebrow--light"><span></span>DONATE TO HCA</p><h2>Help Keep Christian Education Accessible</h2><p>', content.communitySupport.introduction, '</p><p>', content.communitySupport.importance, '</p><div class="donate-actions"><a class="button button--primary" href="mailto:', school.email, '?subject=HCA%20donation%20enquiry">Request Donation Details <span>→</span></a><a class="button button--white" href="tel:', school.telephoneHref, '">Call HCA <span>→</span></a></div><p class="donate-panel__note">For verified banking and payment details, please contact the HCA office directly.</p></div><aside class="donate-panel__details"><p class="eyebrow"><span></span>WAYS TO HELP</p><h3>Your support can make a practical difference.</h3><ul>', content.communitySupport.givingPaths.map(function (item) { return '<li><span aria-hidden="true">✓</span>' + item + '</li>'; }).join(""), '</ul><div class="donate-recipient"><span>Donation recipient</span><strong>', school.organisation, '</strong><small>NPO ', school.npoRegistration, ' · PBO ', school.pboReference, '</small></div></aside></div></div></section>',
      '<section class="section" id="testimonials"><div class="container">', heading("HCA STORIES", "The Difference a Foundation Can Make", "These approved stories share the lasting influence HCA has had on an alumnus and a parent.", true), renderTestimonials(true), '</div></section>',
      '<section class="section pale-section" id="current-needs"><div class="container">', heading("CURRENT NEEDS", "Practical Ways to Support HCA", content.communitySupport.importance, true), '<div class="need-grid">', content.needGroups.map(function (group) { return '<article class="need-card"><div class="need-card__media"><img src="' + group.image + '" alt="' + group.alt + '" width="720" height="450" loading="lazy"></div><div class="need-card__content"><h3>' + group.title + "</h3><ul>" + group.items.map(function (item) { return "<li>" + item + "</li>"; }).join("") + "</ul></div></article>"; }).join(""), '</div></div></section>'
    ].join("");
  }

  function renderNews() {
    return '<section class="section"><div class="container narrow-content"><div class="empty-state empty-state--large"><span aria-hidden="true">✦</span><h2>School news and upcoming events will be published here.</h2><p>For current notices or confirmed dates, please contact the school office.</p><a class="button button--primary" href="contact.html">Contact HCA <span>→</span></a></div></div></section>';
  }

  function renderParents() {
    return '<section class="section"><div class="container narrow-content"><div class="empty-state empty-state--large"><span aria-hidden="true">⌂</span><h2>Parent Resources</h2><p>Important school documents, notices and parent information will be made available here. Please contact the school office for the latest approved information.</p><a class="button button--primary" href="contact.html">Request Parent Information <span>→</span></a></div></div></section>';
  }

  function contactCards() {
    return '<div class="contact-info-grid"><article><span>01</span><h3>Physical Address</h3><p>' + school.physicalAddress.join("<br>") + '</p><a class="text-link" href="https://maps.google.com/?q=1823+Bergsig+Road+Sandbaai+Hermanus">Get Directions <span>→</span></a></article><article><span>02</span><h3>Postal Address</h3><p>' + school.postalAddress.join("<br>") + '</p></article><article><span>03</span><h3>Telephone</h3><p><a href="tel:' + school.telephoneHref + '">' + school.telephone + '</a></p><h3>Email</h3><p><a href="mailto:' + school.email + '">' + school.email + "</a></p></article></div>";
  }

  function renderContact() {
    return '<section class="section" id="contact-details"><div class="container">' + heading("CONTACT DETAILS", "Hermanus Christian Academy", "", true) + contactCards() + '<div class="registration-panel"><div><p class="eyebrow"><span></span>ORGANISATION</p><h2>' + school.organisation + '</h2></div><dl><div><dt>NPO Registration</dt><dd>' + school.npoRegistration + '</dd></div><div><dt>Public Benefit Organisation Reference</dt><dd>' + school.pboReference + '</dd></div></dl></div><div class="enquiry-layout enquiry-layout--contact" id="enquiry"><div class="content-copy">' + heading("SEND AN ENQUIRY", "Start a Conversation", "Use the form to prepare an email to the school office. You can review the message in your email app before sending it.", false) + '</div><div class="form-panel">' + formMarkup("contact") + "</div></div></div></section>";
  }

  function renderInternalPage() {
    if (pageKey === "home") return;
    var page = content.pages[pageKey] || content.pages.about;
    var target = document.querySelector("[data-internal-page]");
    if (!target) return;
    var renderers = { about: renderAbout, learning: renderLearning, "school-life": renderSchoolLife, admissions: renderAdmissions, support: renderSupport, news: renderNews, parents: renderParents, contact: renderContact };
    target.innerHTML = subNavMarkup() + pageHero(page) + (renderers[pageKey] || renderAbout)() + '<section class="simple-cta"><div class="container simple-cta__inner"><div><p class="eyebrow eyebrow--light"><span></span>SUPPORT HCA</p><h2>Help keep Christian education accessible.</h2></div><a class="button button--white" href="support.html#donate">Donate Now <span>→</span></a></div></section>';
  }

  function initSubNavigation() {
    var nav = document.querySelector(".page-subnav");
    if (!nav) return;
    var links = Array.prototype.slice.call(nav.querySelectorAll('a[href^="#"]'));
    var targets = links.map(function (link) { return document.getElementById(link.getAttribute("href").slice(1)); }).filter(Boolean);
    if (!targets.length) return;

    function setCurrent(id) {
      links.forEach(function (link) {
        if (link.getAttribute("href") === "#" + id) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    }

    function updateCurrent() {
      var current = targets[0];
      targets.forEach(function (target) { if (target.getBoundingClientRect().top <= 160) current = target; });
      setCurrent(current.id);
    }

    links.forEach(function (link) { link.addEventListener("click", function () { setCurrent(link.getAttribute("href").slice(1)); }); });
    window.addEventListener("scroll", updateCurrent, { passive: true });
    window.addEventListener("resize", updateCurrent);
    updateCurrent();

    if (window.location.hash) {
      var hashTarget = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
      if (hashTarget) requestAnimationFrame(function () { hashTarget.scrollIntoView(); updateCurrent(); });
    }
  }

  function initNavigation() {
    var header = document.querySelector(".site-header");
    var toggle = document.querySelector(".menu-toggle");
    var menu = document.querySelector(".nav-wrap");
    if (!header || !toggle || !menu) return;
    function updateHeader() {
      var compact = window.scrollY > 24;
      header.classList.toggle("is-scrolled", compact);
      document.body.classList.toggle("header-is-compact", compact);
    }
    function closeMenu(restoreFocus) {
      header.classList.remove("menu-is-open"); menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false"); toggle.setAttribute("aria-label", "Open navigation menu");
      document.body.classList.remove("menu-open"); if (restoreFocus) toggle.focus();
    }
    toggle.addEventListener("click", function () {
      var opening = toggle.getAttribute("aria-expanded") !== "true";
      header.classList.toggle("menu-is-open", opening); menu.classList.toggle("is-open", opening);
      toggle.setAttribute("aria-expanded", String(opening)); toggle.setAttribute("aria-label", opening ? "Close navigation menu" : "Open navigation menu");
      document.body.classList.toggle("menu-open", opening); if (opening) menu.querySelector("a").focus();
    });
    menu.addEventListener("click", function (event) { if (event.target.closest("a")) closeMenu(false); });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") closeMenu(true);
      if (event.key !== "Tab" || toggle.getAttribute("aria-expanded") !== "true") return;
      var focusable = Array.prototype.slice.call(menu.querySelectorAll("a, button"));
      if (!focusable.length) return;
      if (event.shiftKey && document.activeElement === focusable[0]) { event.preventDefault(); focusable[focusable.length - 1].focus(); }
      else if (!event.shiftKey && document.activeElement === focusable[focusable.length - 1]) { event.preventDefault(); focusable[0].focus(); }
    });
    window.addEventListener("scroll", updateHeader, { passive: true }); updateHeader();
  }

  function initEnquiryForms() {
    document.querySelectorAll(".enquiry-form").forEach(function (form) {
      form.addEventListener("submit", function (event) {
        event.preventDefault();
        var message = form.querySelector(".form-message");
        if (!form.checkValidity()) { form.reportValidity(); message.textContent = "Please complete all required fields."; return; }
        var data = new FormData(form);
        var fields = [];
        data.forEach(function (value, key) { fields.push(key.replace(/([A-Z])/g, " $1").replace(/^./, function (char) { return char.toUpperCase(); }) + ": " + value); });
        var subject = form.dataset.formType === "admissions" ? "HCA admission enquiry" : "HCA website enquiry";
        message.textContent = "Your email app is opening with the enquiry ready to review.";
        window.location.href = "mailto:" + school.email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(fields.join("\n"));
      });
    });
  }

  renderSharedLayout();
  renderHomepageContent();
  renderInternalPage();
  initNavigation();
  initSubNavigation();
  initEnquiryForms();
  document.documentElement.classList.remove("no-js");
})();

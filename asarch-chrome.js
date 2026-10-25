/* ============================================================
   ASARCH / Site chrome loader
   This single file controls the global CSS, navigation, footer,
   intro splash, Google Fonts and all site-wide event handlers.
   Any page on the ASARCH site includes this script via:
     <script src="PATH_TO_THIS_FILE"></script>
   Update this file once to update every page on the site.
   ============================================================ */
(function() {
  // --------------------------------------------------------
  // 1. Load Google Fonts (into <head>)
  // --------------------------------------------------------
  var fontLinks = [
    {rel:'preconnect', href:'https://fonts.googleapis.com'},
    {rel:'preconnect', href:'https://fonts.gstatic.com', crossorigin:''},
    {rel:'stylesheet', href:'https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Montserrat:wght@300;400;500;600;700&display=swap'}
  ];
  fontLinks.forEach(function(l) {
    var link = document.createElement('link');
    for (var k in l) link.setAttribute(k, l[k]);
    document.head.appendChild(link);
  });

  // --------------------------------------------------------
  // 2. Inject global CSS (into <head>) immediately so the
  //    page renders with proper styling from the first paint.
  // --------------------------------------------------------
  var cssText = `:root {
    --wine: #58181F;
    --wine-soft: #6B2128;
    --wine-deep: #3F0F14;
    --bone: #F6F4F1;
    --bone-warm: #EFECE6;
    --bone-deep: #E8E4DD;
    --hairline: rgba(88,24,31,0.22);
    --hairline-soft: rgba(88,24,31,0.12);
    --serif: 'Libre Baskerville', Georgia, serif;
    --sans: 'Montserrat', system-ui, sans-serif;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: var(--sans); color: var(--wine); background: var(--bone); line-height: 1.65; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; overflow-x: hidden; text-align: left; }
  a { color: inherit; text-decoration: none; }
  img, svg { display: block; max-width: 100%; }
  .serif { font-family: var(--serif); font-weight: 400; }
  .italic { font-style: italic; }

  /* Focus states */
  a:focus-visible, button:focus-visible, input:focus-visible, textarea:focus-visible, select:focus-visible {
    outline: 2px solid var(--wine);
    outline-offset: 3px;
    border-radius: 1px;
  }
  .cta__btn:focus-visible, .btn--bone:focus-visible { outline-color: var(--bone); }

  /* Selective justified text: long-form editorial only */
  .about-intro__body p, .mission-full__intro, .mission__body p,
  .svcd-overview__body p, .svc-approach__body p,
  .insight-intro__body p, .insight__content p, .stage__content p, .principle p,
  .post-body p, .legal-section p, .legal-section li, .legal-body__intro,
  .page-header__intro { text-align: justify; text-justify: inter-word; hyphens: auto; }

  /* Image filter for brand tone (applies when real images added) */
  .work-card__image img, .curr-img img, .about__img img, .project-hero img, .proj-card__img img, .gallery-slide img { filter: sepia(0.15) contrast(0.94) brightness(0.98) hue-rotate(-8deg) saturate(0.88); }

  /* ============ INTRO SPLASH ============ */
  .intro { position: fixed; inset: 0; z-index: 200; background: var(--bone); display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 32px; opacity: 1; visibility: visible; transition: opacity 0.9s cubic-bezier(0.65, 0, 0.35, 1), visibility 0s linear 0.9s; }
  .intro.is-done { opacity: 0; visibility: hidden; }
  .intro__mark { font-family: var(--serif); font-size: clamp(64px, 13vw, 180px); letter-spacing: 0.14em; color: var(--wine); line-height: 1; text-transform: uppercase; font-weight: 400; opacity: 0; animation: introMark 1.6s cubic-bezier(0.16, 1, 0.3, 1) 0.15s forwards; }
  .intro__rule { width: 0; height: 0.5px; background: var(--wine); animation: introRule 1.2s cubic-bezier(0.16, 1, 0.3, 1) 1.0s forwards; opacity: 0; }
  .intro__caption { font-size: 10px; letter-spacing: 0.32em; text-transform: uppercase; color: var(--wine); opacity: 0; animation: introFade 1s cubic-bezier(0.16, 1, 0.3, 1) 1.4s forwards; }
  @keyframes introMark { 0% { opacity: 0; letter-spacing: 0.28em; transform: scale(1.03); } 100% { opacity: 1; letter-spacing: 0.14em; transform: scale(1); } }
  @keyframes introRule { 0% { width: 0; opacity: 1; } 100% { width: 120px; opacity: 1; } }
  @keyframes introFade { 0% { opacity: 0; transform: translateY(6px); } 100% { opacity: 0.7; transform: translateY(0); } }
  @media (prefers-reduced-motion: reduce) { .intro { display: none; } }

  /* ============ NAV ============ */
  .nav { position: sticky; top: 0; z-index: 50; background: rgba(246,244,241,0.92); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); padding: 22px 48px; display: flex; justify-content: space-between; align-items: center; border-bottom: 0.5px solid var(--hairline); }
  .nav__logo { font-family: var(--serif); font-size: 24px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--wine); font-weight: 400; line-height: 1; text-decoration: none; display: inline-block; padding: 4px 0; }
  .nav__mid { display: flex; gap: 32px; font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--wine); font-weight: 500; list-style: none; padding: 0; margin: 0; }
  .nav__mid > li { position: relative; padding: 8px 0; }
  .nav__mid > li > a { transition: opacity 0.3s ease; position: relative; padding: 4px 0; display: inline-flex; align-items: center; gap: 8px; }
  .nav__mid > li > a::after { content: ''; position: absolute; bottom: 0; left: 0; width: 0; height: 0.5px; background: var(--wine); transition: width 0.35s ease; }
  .nav__mid > li:hover > a::after { width: 100%; }
  .nav__mid .has-dropdown > a::before { content: ''; width: 5px; height: 5px; border-right: 0.5px solid currentColor; border-bottom: 0.5px solid currentColor; transform: rotate(45deg) translate(-1px, -2px); transition: transform 0.3s ease; order: 2; flex-shrink: 0; }
  .nav__mid .has-dropdown:hover > a::before { transform: rotate(225deg) translate(1px, 0); }
  .nav__mid .has-dropdown::after { content: ''; position: absolute; top: 100%; left: -24px; right: -24px; height: 22px; }
  .nav__dropdown { position: absolute; top: calc(100% + 22px); left: -24px; min-width: 270px; background: var(--bone); border: 0.5px solid var(--wine); list-style: none; padding: 14px 0; margin: 0; opacity: 0; visibility: hidden; transform: translateY(-8px); transition: opacity 0.3s ease, transform 0.3s ease, visibility 0.3s ease; z-index: 60; box-shadow: 0 16px 48px rgba(88,24,31,0.1); }
  .nav__mid .has-dropdown:hover .nav__dropdown { opacity: 1; visibility: visible; transform: translateY(0); }
  .nav__dropdown li a { display: block; padding: 12px 28px; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--wine); font-weight: 500; transition: padding-left 0.35s ease, background 0.2s ease; text-align: left; }
  .nav__dropdown li a:hover { padding-left: 36px; background: rgba(88,24,31,0.04); }
  .nav__cta { font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--bone); font-weight: 500; padding: 13px 24px; background: var(--wine); border: 0.5px solid var(--wine); transition: all 0.3s ease; display: inline-flex; align-items: center; gap: 10px; white-space: nowrap; }
  .nav__cta:hover { background: transparent; color: var(--wine); }
  .nav__cta svg { width: 12px; height: 12px; min-width: 12px; flex-shrink: 0; transition: transform 0.3s ease; }
  .nav__cta:hover svg { transform: translateX(3px); }

  /* Mobile hamburger */
  .nav__burger { display: none; width: 32px; height: 24px; background: none; border: 0; padding: 0; cursor: pointer; position: relative; margin-left: 16px; }
  .nav__burger span { position: absolute; left: 0; right: 0; height: 1.5px; background: var(--wine); transition: all 0.3s ease; }
  .nav__burger span:nth-child(1) { top: 6px; }
  .nav__burger span:nth-child(2) { bottom: 6px; }

  /* Mobile menu overlay */
  .mobile-menu { position: fixed; inset: 0; z-index: 90; background: var(--wine); color: var(--bone); opacity: 0; visibility: hidden; transition: opacity 0.4s cubic-bezier(0.65, 0, 0.35, 1), visibility 0s linear 0.4s; overflow-y: auto; }
  .mobile-menu.is-open { opacity: 1; visibility: visible; transition: opacity 0.4s cubic-bezier(0.65, 0, 0.35, 1), visibility 0s linear 0s; }
  .mobile-menu__top { padding: 22px; display: flex; justify-content: space-between; align-items: center; border-bottom: 0.5px solid rgba(246,244,241,0.15); }
  .mobile-menu__logo { font-family: var(--serif); font-size: 22px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--bone); font-weight: 400; line-height: 1; }
  .mobile-menu__close { width: 44px; height: 44px; background: none; border: 0; color: var(--bone); cursor: pointer; display: flex; align-items: center; justify-content: center; }
  .mobile-menu__close svg { width: 24px; height: 24px; }
  .mobile-menu__inner { padding: 48px 32px 64px; display: flex; flex-direction: column; }
  .mobile-menu__link { font-family: var(--serif); font-size: 32px; color: var(--bone); padding: 20px 0; display: block; border-bottom: 0.5px solid rgba(246,244,241,0.15); line-height: 1.1; letter-spacing: -0.01em; }
  .mobile-menu__group { border-bottom: 0.5px solid rgba(246,244,241,0.15); padding: 20px 0; }
  .mobile-menu__group-label { font-family: var(--serif); font-size: 32px; color: var(--bone); line-height: 1.1; letter-spacing: -0.01em; margin-bottom: 12px; }
  .mobile-menu__sub { display: flex; flex-direction: column; gap: 2px; padding-left: 4px; }
  .mobile-menu__sub a { font-size: 14px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--bone); opacity: 0.75; padding: 8px 0; font-weight: 500; }
  .mobile-menu__cta { margin-top: 40px; display: inline-flex; align-items: center; gap: 14px; font-size: 11px; letter-spacing: 0.24em; text-transform: uppercase; color: var(--wine); font-weight: 500; padding: 18px 28px; background: var(--bone); align-self: flex-start; }
  .mobile-menu__foot { padding: 24px 32px 40px; border-top: 0.5px solid rgba(246,244,241,0.15); font-size: 11px; letter-spacing: 0.06em; color: var(--bone); opacity: 0.7; line-height: 1.8; }
  .mobile-menu__foot a { color: var(--bone); }

  /* ============ SHARED PAGE HEADER ============ */
  .page-header { padding: 140px 48px 90px; position: relative; border-bottom: 0.5px solid var(--hairline-soft); overflow: hidden; }
  .page-header__meta { display: flex; justify-content: space-between; align-items: center; font-size: 10px; letter-spacing: 0.28em; text-transform: uppercase; color: var(--wine); font-weight: 500; margin-bottom: 60px; }
  .page-header__meta-left { display: flex; align-items: center; gap: 12px; }
  .page-header__meta-left .dot { width: 6px; height: 6px; background: var(--wine); border-radius: 50%; opacity: 0.7; }
  .page-header__label { font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; color: var(--wine); font-weight: 500; display: inline-flex; align-items: center; gap: 14px; margin-bottom: 30px; }
  .page-header__label::before { content: ''; width: 28px; height: 0.5px; background: var(--wine); }
  .page-header h1 { font-family: var(--serif); font-size: 96px; line-height: 1.02; font-weight: 400; color: var(--wine); letter-spacing: -0.02em; max-width: 1200px; }
  .page-header h1 .italic { font-style: italic; }
  .page-header__intro { font-family: var(--serif); font-size: 22px; line-height: 1.45; color: var(--wine); max-width: 720px; margin-top: 40px; }
  .page-header__decor { position: absolute; top: 140px; right: 48px; width: 220px; height: 220px; opacity: 0.3; pointer-events: none; }

  /* ============ LABELS & SECTION HEADS ============ */
  .sec-head { display: grid; grid-template-columns: 1fr 2fr; gap: 80px; margin-bottom: 80px; align-items: start; }
  .label { font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; color: var(--wine); font-weight: 500; display: flex; align-items: center; gap: 14px; }
  .label::before { content: ''; width: 28px; height: 0.5px; background: var(--wine); }
  .sec-title { font-family: var(--serif); font-size: 56px; line-height: 1.08; color: var(--wine); font-weight: 400; letter-spacing: -0.015em; }
  .sec-title--single-line { font-size: 44px; line-height: 1.15; }

  /* ============ BUTTONS ============ */
  .btn { display: inline-flex; align-items: center; justify-content: center; gap: 14px; font-size: 11px; letter-spacing: 0.24em; text-transform: uppercase; color: var(--wine); font-weight: 500; padding: 18px 32px; border: 0.5px solid var(--wine); text-decoration: none; transition: all 0.35s ease; background: transparent; cursor: pointer; white-space: nowrap; text-align: center; line-height: 1; }
  .btn:hover { background: var(--wine); color: var(--bone); }
  .btn svg { width: 14px; height: 14px; min-width: 14px; max-width: 14px; flex-shrink: 0; transition: transform 0.35s ease; }
  .btn:hover svg { transform: translateX(4px); }
  .btn--bone { color: var(--bone); border-color: var(--bone); }
  .btn--bone:hover { background: var(--bone); color: var(--wine); }
  .cta__btn { display: inline-flex; align-items: center; justify-content: center; gap: 16px; font-size: 11px; letter-spacing: 0.24em; text-transform: uppercase; color: var(--wine); font-weight: 500; padding: 22px 42px; background: var(--bone); transition: all 0.35s ease; white-space: nowrap; text-align: center; line-height: 1; text-decoration: none; border: 0.5px solid var(--bone); }
  .cta__btn:hover { background: transparent; color: var(--bone); }
  .cta__btn svg { width: 14px; height: 14px; min-width: 14px; flex-shrink: 0; transition: transform 0.35s ease; }
  .cta__btn:hover svg { transform: translateX(4px); }

  /* ============ FOOTER ============ */
  .footer { padding: 100px 48px 40px; background: var(--bone); color: var(--wine); position: relative; }
  .footer__mark { font-family: var(--serif); font-size: clamp(96px, 18vw, 220px); line-height: 0.9; letter-spacing: 0.06em; color: var(--wine); margin-bottom: 70px; text-transform: uppercase; font-weight: 400; }
  .footer__grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 60px; padding-top: 50px; border-top: 0.5px solid var(--wine); margin-bottom: 70px; }
  .footer__intro { font-family: var(--serif); font-size: 22px; line-height: 1.5; color: var(--wine); max-width: 380px; font-style: italic; }
  .footer h4 { font-size: 10px; letter-spacing: 0.28em; text-transform: uppercase; color: var(--wine); font-weight: 600; margin: 0 0 24px; text-align: left; }
  .footer ul { list-style: none; padding: 0; margin: 0; }
  .footer ul li { margin-bottom: 12px; }
  .footer ul li a { font-size: 13px; color: var(--wine); opacity: 0.8; transition: opacity 0.2s ease; }
  .footer ul li a:hover { opacity: 1; }
  .footer__contact-line { font-size: 13px; color: var(--wine); line-height: 2; opacity: 0.85; text-align: left; }
  .footer__bottom { padding-top: 32px; border-top: 0.5px solid var(--hairline); display: flex; justify-content: space-between; align-items: center; font-size: 11px; color: var(--wine); opacity: 0.65; letter-spacing: 0.05em; gap: 20px; text-align: left; }

  /* ============ REVEAL ============ */
  .reveal { opacity: 0; transform: translateY(28px); transition: opacity 1.1s cubic-bezier(0.16, 1, 0.3, 1), transform 1.1s cubic-bezier(0.16, 1, 0.3, 1); }
  .reveal.is-visible { opacity: 1; transform: translateY(0); }
  .static-mode .reveal { opacity: 1; transform: none; transition: none; }
  .static-mode .intro { display: none !important; }
  .static-mode .nav { position: relative !important; background: var(--bone) !important; }
  .static-mode .scroll-cue__line::after { display: none; }
  .static-mode .proc-step::before { width: 100% !important; }
  .static-mode .marquee__track { animation: none !important; transform: translateX(0) !important; }
  @media (prefers-reduced-motion: reduce) { .reveal { opacity: 1; transform: none; transition: none; } }

  /* ============ MOBILE ============ */
  @media (max-width: 960px) {
    .nav { padding: 18px 22px; }
    .nav__logo { font-size: 20px; letter-spacing: 0.18em; }
    .nav__mid { display: none; }
    .nav__cta { display: none; }
    .nav__burger { display: block; }
    .page-header { padding: 60px 22px 60px; }
    .page-header h1 { font-size: 42px; line-height: 1.06; }
    .page-header__intro { font-size: 17px; }
    .page-header__decor { display: none; }
    .sec-head { grid-template-columns: 1fr; gap: 28px; margin-bottom: 50px; }
    .sec-title { font-size: 32px; line-height: 1.18; }
    .footer { padding: 80px 22px 40px; }
    .footer__mark { font-size: 72px; margin-bottom: 40px; line-height: 1; letter-spacing: 0.08em; }
    .footer__grid { grid-template-columns: 1fr 1fr; gap: 36px; padding-top: 40px; }
    .footer__bottom { flex-direction: column; align-items: flex-start; gap: 12px; }
  }
  @media (max-width: 540px) {
    .mobile-menu__link, .mobile-menu__group-label { font-size: 26px; }
    .footer__grid { grid-template-columns: 1fr; }
  }
.nav__logo img { height: 42px; width: auto; display: block; }
.footer__mark img { max-width: 820px; width: 100%; height: auto; display: block; }
.intro__mark img { width: clamp(220px, 36vw, 420px); height: auto; display: block; }
.mobile-menu__logo img { height: 36px; width: auto; display: block; }
@media (max-width: 960px) {
  .nav__logo img { height: 32px; }
  .footer__mark img { max-width: 100%; }
}
/* No-FOUC: hide page content until chrome ready */
body:not(.asarch-ready) { opacity: 0; }
body.asarch-ready { opacity: 1; transition: opacity 0.3s ease; }
`;
  var styleEl = document.createElement('style');
  styleEl.setAttribute('data-asarch', 'chrome');
  styleEl.textContent = cssText;
  document.head.appendChild(styleEl);

  // --------------------------------------------------------
  // 3. Prepared HTML strings
  // --------------------------------------------------------
  var navHtml = `<nav class="nav">
  <a href="/" class="nav__logo"><img src="https://assets.cdn.filesafe.space/Kb4NNU6YMxkCmWKULMvF/media/6ade639f9c1511d5b9c3d2e0.svg" alt="ASARCH"></a>
  <ul class="nav__mid">
    <li><a href="/">Home</a></li>
    <li><a href="/services">Services</a></li>
    <li><a href="/about">About</a></li>
    <li><a href="/projects">Projects</a></li>
    <li><a href="/insight">Insight</a></li>
    <li><a href="/contact">Contact</a></li>
  </ul>
  <a href="/contact" class="nav__cta">
    Begin a project
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
  </a>
  <button class="nav__burger" id="navBurger" aria-label="Open menu" aria-expanded="false" aria-controls="mobileMenu">
    <span></span><span></span>
  </button>
</nav>
<div class="mobile-menu" id="mobileMenu" aria-hidden="true">
  <div class="mobile-menu__top">
    <span class="mobile-menu__logo"><img src="https://assets.cdn.filesafe.space/Kb4NNU6YMxkCmWKULMvF/media/6ade639fd542268bb4268e85.svg" alt="ASARCH"></span>
    <button class="mobile-menu__close" id="mobileMenuClose" aria-label="Close menu">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 6L18 18M6 18L18 6"/></svg>
    </button>
  </div>
  <div class="mobile-menu__inner">
    <a class="mobile-menu__link" href="/">Home</a>
    <a class="mobile-menu__link" href="/services">Services</a>
    <a class="mobile-menu__link" href="/about">About</a>
    <a class="mobile-menu__link" href="/projects">Projects</a>
    <a class="mobile-menu__link" href="/insight">Insight</a>
    <a class="mobile-menu__link" href="/contact">Contact</a>
    <a class="mobile-menu__cta" href="/contact">
      Begin a project
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:12px;height:12px;"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
    </a>
  </div>
  <div class="mobile-menu__foot">
    <a href="mailto:info@asarch.co.uk">info@asarch.co.uk</a> &middot; <a href="tel:07737200063">07737 200063</a>
  </div>
</div>`;
  var footerHtml = `<footer class="footer">
  <div class="footer__mark"><img src="https://assets.cdn.filesafe.space/Kb4NNU6YMxkCmWKULMvF/media/6ade639f9c1511d5b9c3d2e0.svg" alt="ASARCH"></div>
  <div class="footer__grid">
    <div>
      <p class="footer__intro">"Granting clients the ability to deliver their ideals through realism."</p>
    </div>
    <div>
      <h4>Studio</h4>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/projects">Projects</a></li>
        <li><a href="/insight">Insight</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </div>
    <div>
      <h4>Services</h4>
      <ul>
        <li><a href="/services">Site Acquisition &amp; Disposal</a></li>
        <li><a href="/services">Feasibility</a></li>
        <li><a href="/services">Planning</a></li>
        <li><a href="/services">Technical Design</a></li>
        <li><a href="/services">Contractor Recommendations</a></li>
        <li><a href="/services">Contract Administration</a></li>
        <li><a href="/services">Facade Remediation</a></li>
      </ul>
    </div>
    <div>
      <h4>Contact</h4>
      <ul>
        <li><a href="mailto:info@asarch.co.uk">info@asarch.co.uk</a></li>
        <li><a href="tel:07737200063">07737 200063</a></li>
      </ul>
    </div>
  </div>
  <div class="footer__bottom">
    <span>&copy; 2026 ASARCH Ltd. Registered in England.</span>
    <span><a href="/privacy">Privacy</a> &nbsp;&middot;&nbsp; <a href="/terms">Terms</a> &nbsp;&middot;&nbsp; <a href="/cookies">Cookies</a></span>
  </div>
</footer>`;
  var introHtml = `<div class="intro" id="intro" aria-hidden="true">
  <div class="intro__mark"><img src="https://assets.cdn.filesafe.space/Kb4NNU6YMxkCmWKULMvF/media/6ade639f9c1511d5b9c3d2e0.svg" alt="ASARCH"></div>
  <div class="intro__rule"></div>
  <div class="intro__caption">Architectural Practice, London</div>
</div>`;

  // --------------------------------------------------------
  // 4. Function that runs once the DOM is ready: injects
  //    nav + footer into their placeholder slots, adds the
  //    intro splash on the homepage, then wires up event
  //    handlers.
  // --------------------------------------------------------
  function initChrome() {
    // Inject the nav into #asarch-nav slot
    var navSlot = document.getElementById('asarch-nav');
    if (navSlot) navSlot.outerHTML = navHtml;

    // Inject the footer into #asarch-footer slot
    var footerSlot = document.getElementById('asarch-footer');
    if (footerSlot) footerSlot.outerHTML = footerHtml;

    // Add the intro splash (and run it) on the homepage only
    var path = window.location.pathname;
    var isHome = (path === '/' || path === '' || /index\.html$/.test(path) || /\/home(\/|$)/.test(path));
    if (isHome) {
      // Prepend the intro to <body>
      var introWrapper = document.createElement('div');
      introWrapper.innerHTML = introHtml;
      document.body.insertBefore(introWrapper.firstChild, document.body.firstChild);
      var intro = document.getElementById('intro');
      if (intro) {
        var skipIntro = false;
        try {
          if (sessionStorage.getItem('asarch_intro_v3')) skipIntro = true;
          else sessionStorage.setItem('asarch_intro_v3', '1');
        } catch (e) {}
        if (window.location.search.indexOf('nointro') !== -1) skipIntro = true;
        if (skipIntro) {
          intro.style.display = 'none';
        } else {
          setTimeout(function() { intro.classList.add('is-done'); }, 2400);
          setTimeout(function() { intro.style.display = 'none'; }, 3400);
        }
      }
    }

    // Mobile menu toggle
    var burger = document.getElementById('navBurger');
    var mobileMenu = document.getElementById('mobileMenu');
    var mobileMenuClose = document.getElementById('mobileMenuClose');
    function openMenu() {
      mobileMenu.classList.add('is-open');
      mobileMenu.setAttribute('aria-hidden', 'false');
      burger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
    function closeMenu() {
      mobileMenu.classList.remove('is-open');
      mobileMenu.setAttribute('aria-hidden', 'true');
      burger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
    if (burger && mobileMenu) burger.addEventListener('click', openMenu);
    if (mobileMenuClose && mobileMenu) mobileMenuClose.addEventListener('click', closeMenu);
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('is-open')) closeMenu();
    });

    // Scroll reveal
    var els = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function(entries) {
        entries.forEach(function(e) {
          if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
      els.forEach(function(el) { io.observe(el); });
    } else {
      els.forEach(function(el) { el.classList.add('is-visible'); });
    }

    // Selected Works scroll buttons (homepage)
    var worksGallery = document.querySelector('.works__gallery');
    var worksPrev = document.querySelector('.works__scroll-btn--prev');
    var worksNext = document.querySelector('.works__scroll-btn--next');
    if (worksGallery && worksPrev && worksNext) {
      worksPrev.addEventListener('click', function() { worksGallery.scrollBy({ left: -324, behavior: 'smooth' }); });
      worksNext.addEventListener('click', function() { worksGallery.scrollBy({ left: 324, behavior: 'smooth' }); });
    }

    // Project page carousel
    var slides = document.querySelectorAll('.gallery-slide');
    var dots = document.querySelectorAll('.gallery-dot');
    var galleryPrev = document.querySelector('.gallery-nav-btn--prev');
    var galleryNext = document.querySelector('.gallery-nav-btn--next');
    var current = 0;
    function showSlide(i) {
      if (!slides.length) return;
      current = (i + slides.length) % slides.length;
      slides.forEach(function(s, idx) { s.classList.toggle('is-active', idx === current); });
      dots.forEach(function(d, idx) { d.classList.toggle('is-active', idx === current); });
    }
    if (galleryPrev) galleryPrev.addEventListener('click', function() { showSlide(current - 1); });
    if (galleryNext) galleryNext.addEventListener('click', function() { showSlide(current + 1); });
    dots.forEach(function(d, idx) { d.addEventListener('click', function() { showSlide(idx); }); });
    if (slides.length) showSlide(0);

    // Reveal body (removes the no-FOUC hiding we set earlier)
    document.body.classList.add('asarch-ready');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChrome);
  } else {
    initChrome();
  }
})();

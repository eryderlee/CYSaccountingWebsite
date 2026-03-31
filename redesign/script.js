/* ═══════════════════════════════════════════════════════════════
   CYS ACCOUNTANTS — REDESIGN SCRIPT
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─────────────────────────────────────────
     ZERO-OUT STAT COUNTERS IMMEDIATELY
     (prevents flash of final value before count-up)
  ───────────────────────────────────────── */
  document.querySelectorAll('.hero-stat__number[data-count]').forEach(function (el) {
    var suffix   = el.getAttribute('data-suffix') || '';
    var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
    el.textContent = (0).toFixed(decimals) + suffix;
  });

  /* ─────────────────────────────────────────
     PRELOADER
  ───────────────────────────────────────── */
  function initPreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    function dismiss() {
      preloader.classList.add('is-hidden');
      document.body.classList.remove('is-loading');
      initHeroAnimations();
    }

    if (document.readyState === 'complete') {
      setTimeout(dismiss, 400);
    } else {
      window.addEventListener('load', function () {
        setTimeout(dismiss, 400);
      });
    }
  }

  /* ─────────────────────────────────────────
     SCROLL PROGRESS BAR
  ───────────────────────────────────────── */
  function initScrollProgress() {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;

    function update() {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (total > 0 ? (scrolled / total) * 100 : 0) + '%';
    }

    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  /* ─────────────────────────────────────────
     CUSTOM CURSOR
  ───────────────────────────────────────── */
  function initCustomCursor() {
    if (!window.matchMedia('(hover: hover)').matches) return;

    const dot  = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX  = mouseX;
    let ringY  = mouseY;

    document.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + 'px';
      dot.style.top  = mouseY + 'px';
    });

    function animRing() {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.left = ringX + 'px';
      ring.style.top  = ringY + 'px';
      requestAnimationFrame(animRing);
    }
    animRing();

    // Enlarge on interactive elements
    const selectors = 'a, button, .service-card, .review-card, .form-input, .credential-card, #scroll-top';
    document.querySelectorAll(selectors).forEach(function (el) {
      el.addEventListener('mouseenter', function () { document.body.classList.add('cursor-hover'); });
      el.addEventListener('mouseleave', function () { document.body.classList.remove('cursor-hover'); });
    });

    // Hide when leaving window
    document.addEventListener('mouseleave', function () {
      dot.style.opacity  = '0';
      ring.style.opacity = '0';
    });
    document.addEventListener('mouseenter', function () {
      dot.style.opacity  = '1';
      ring.style.opacity = '1';
    });
  }

  /* ─────────────────────────────────────────
     NAVIGATION
  ───────────────────────────────────────── */
  function initNav() {
    const header    = document.getElementById('site-header');
    const hamburger = document.getElementById('nav-hamburger');
    const menu      = document.getElementById('nav-menu');
    if (!header) return;

    const THRESHOLD = 80;

    // Only run scroll-transparency on pages that start transparent (home page)
    if (header.classList.contains('site-header--transparent')) {
      function onScroll() {
        if (window.scrollY > THRESHOLD) {
          header.classList.remove('site-header--transparent');
          header.classList.add('site-header--solid');
        } else {
          header.classList.add('site-header--transparent');
          header.classList.remove('site-header--solid');
        }
      }
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    if (hamburger && menu) {
      // Inject close button at top of drawer
      var closeBtn = document.createElement('button');
      closeBtn.className = 'nav-close';
      closeBtn.setAttribute('aria-label', 'Close menu');
      closeBtn.innerHTML = '<i class="fas fa-times" aria-hidden="true"></i>';
      menu.insertBefore(closeBtn, menu.firstChild);

      // Inject backdrop
      var backdrop = document.createElement('div');
      backdrop.className = 'nav-backdrop';
      document.body.appendChild(backdrop);

      function openMenu() {
        menu.classList.add('is-open');
        backdrop.classList.add('is-visible');
        hamburger.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
      }

      function closeMenu() {
        menu.classList.remove('is-open');
        backdrop.classList.remove('is-visible');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }

      hamburger.addEventListener('click', function () {
        menu.classList.contains('is-open') ? closeMenu() : openMenu();
      });

      closeBtn.addEventListener('click', closeMenu);
      backdrop.addEventListener('click', closeMenu);

      // Close on nav-link click (not dropdown toggles)
      menu.querySelectorAll('.nav-link:not(.nav-link--has-dropdown)').forEach(function (link) {
        link.addEventListener('click', closeMenu);
      });
      // Also close when a dropdown item is tapped
      menu.querySelectorAll('.nav-dropdown__item').forEach(function (link) {
        link.addEventListener('click', closeMenu);
      });
    }
  }

  /* ─────────────────────────────────────────
     HERO VIDEO / SLIDESHOW
  ───────────────────────────────────────── */
  function initHeroVideo() {
    const video     = document.querySelector('.hero-video');
    const slideshow = document.querySelector('.hero-slideshow');
    if (!video) { initHeroSlideshow(); return; }

    const src = 'assets/hero.mp4';

    fetch(src, { method: 'HEAD' })
      .then(function (r) {
        if (r.ok) {
          video.src = src;
          video.load();
          video.play().catch(function () {});
          if (slideshow) slideshow.style.display = 'none';
          initVideoFadeLoop(video);
        } else {
          initHeroSlideshow();
        }
      })
      .catch(function () {
        initHeroSlideshow();
      });
  }

  function initVideoFadeLoop(video) {
    var FADE = 1; // seconds to fade in/out at loop point
    function tick() {
      if (video.duration) {
        var remaining = video.duration - video.currentTime;
        if (remaining < FADE) {
          video.style.opacity = Math.max(0, remaining / FADE);
        } else if (video.currentTime < FADE) {
          video.style.opacity = Math.min(1, video.currentTime / FADE);
        } else {
          video.style.opacity = 1;
        }
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function initHeroSlideshow() {
    const slides = document.querySelectorAll('.hero-slide');
    if (slides.length < 2) return;
    let current = 0;

    function next() {
      slides[current].classList.remove('is-active');
      current = (current + 1) % slides.length;
      slides[current].classList.add('is-active');
    }

    setInterval(next, 5000);
  }

  /* ─────────────────────────────────────────
     HERO STAT COUNTERS
  ───────────────────────────────────────── */
  function initStatCounters() {
    var stats = document.querySelectorAll('.hero-stat__number[data-count]');
    if (!stats.length) return;

    stats.forEach(function (el) {
      var target   = parseFloat(el.getAttribute('data-count'));
      var suffix   = el.getAttribute('data-suffix') || '';
      var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
      var duration = 1400; // ms
      var start    = null;

      function step(timestamp) {
        if (!start) start = timestamp;
        var progress = Math.min((timestamp - start) / duration, 1);
        // ease-out cubic
        var eased = 1 - Math.pow(1 - progress, 3);
        var current = eased * target;
        el.textContent = current.toFixed(decimals) + suffix;
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = target.toFixed(decimals) + suffix;
        }
      }

      requestAnimationFrame(step);
    });
  }

  /* ─────────────────────────────────────────
     HERO ENTRANCE ANIMATIONS
  ───────────────────────────────────────── */
  function initHeroAnimations() {
    document.querySelectorAll('.reveal-up').forEach(function (el) {
      el.style.animationPlayState = 'running';
    });
    // Start counters after the stats bar finishes revealing (d4 = 0.52s + ~0.6s anim)
    setTimeout(initStatCounters, 700);
  }

  /* ─────────────────────────────────────────
     SCROLL REVEAL (IntersectionObserver)
  ───────────────────────────────────────── */
  function initScrollReveal() {
    const targets = document.querySelectorAll('.js-reveal');
    if (!targets.length) return;

    // Apply stagger delays from data-delay attribute
    targets.forEach(function (el) {
      const delay = el.getAttribute('data-delay');
      if (delay) el.style.transitionDelay = delay + 'ms';
    });

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -36px 0px'
    });

    targets.forEach(function (el) { observer.observe(el); });
  }

  /* ─────────────────────────────────────────
     REVIEWS CAROUSEL
  ───────────────────────────────────────── */
  function initReviewsCarousel() {
    const track    = document.getElementById('reviews-track');
    const carousel = track ? track.closest('.reviews-carousel') : null;
    if (!track || !carousel) return;

    // Clone cards for seamless infinite loop
    const cards = Array.from(track.children);
    cards.forEach(function (card) {
      const clone = card.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    });

    // Pause on hover
    carousel.addEventListener('mouseenter', function () {
      track.classList.add('is-paused');
    });
    carousel.addEventListener('mouseleave', function () {
      track.classList.remove('is-paused');
    });

    // Pause on focus (accessibility)
    carousel.addEventListener('focusin', function () {
      track.classList.add('is-paused');
    });
    carousel.addEventListener('focusout', function () {
      track.classList.remove('is-paused');
    });
  }

  /* ─────────────────────────────────────────
     CONTACT FORM
  ───────────────────────────────────────── */
  function initContactForm() {
    const form     = document.getElementById('contact-form');
    const feedback = document.getElementById('form-feedback');
    const btn      = document.getElementById('btn-submit');
    if (!form || !feedback || !btn) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      feedback.className = 'form-feedback';
      feedback.textContent = '';

      const name  = form.querySelector('#field-name').value.trim();
      const email = form.querySelector('#field-email').value.trim();
      const phone = form.querySelector('#field-phone').value.trim();

      if (!name || !email || !phone) {
        feedback.textContent = 'Please fill in all required fields.';
        feedback.className = 'form-feedback form-feedback--error';
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        feedback.textContent = 'Please enter a valid email address.';
        feedback.className = 'form-feedback form-feedback--error';
        return;
      }

      btn.disabled = true;
      btn.querySelector('.btn-submit__text').textContent = 'Sending…';

      setTimeout(function () {
        feedback.textContent = "Thank you! We\u2019ll be in touch within 24 hours.";
        feedback.className = 'form-feedback form-feedback--success';
        form.reset();
        btn.disabled = false;
        btn.querySelector('.btn-submit__text').textContent = 'Send Message';
      }, 1200);
    });
  }

  /* ─────────────────────────────────────────
     SMOOTH SCROLL (with header offset)
  ───────────────────────────────────────── */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        const id = this.getAttribute('href');
        if (id === '#') return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        const header = document.getElementById('site-header');
        const offset = header ? header.offsetHeight : 0;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      });
    });
  }

  /* ─────────────────────────────────────────
     SCROLL TO TOP
  ───────────────────────────────────────── */
  function initScrollToTop() {
    const btn = document.getElementById('scroll-top');
    if (!btn) return;

    window.addEventListener('scroll', function () {
      btn.classList.toggle('is-visible', window.scrollY > 500);
    }, { passive: true });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ─────────────────────────────────────────
     INTERACTIVE DOT BACKGROUND
  ───────────────────────────────────────── */
  function initDotBackground() {
    var sections = document.querySelectorAll('[data-dots]');
    if (!sections.length) return;

    sections.forEach(function (section) {
      var isDark = section.dataset.dots === 'dark';
      var dotColor = isDark ? 'rgba(84,222,197,0.10)' : 'rgba(32,42,68,0.07)';
      var REPEL = 110;
      var BASE_SPEED = 0.28;
      var animId = null;
      var dots = [];
      var mouse = { x: -9999, y: -9999 };

      var canvas = document.createElement('canvas');
      canvas.className = 'dot-canvas';
      canvas.setAttribute('aria-hidden', 'true');
      section.insertBefore(canvas, section.firstChild);
      var ctx = canvas.getContext('2d');

      function resize() {
        canvas.width  = section.offsetWidth;
        canvas.height = section.offsetHeight;
        spawnDots();
      }

      function spawnDots() {
        dots = [];
        var count = Math.round((canvas.width * canvas.height) / 12000);
        count = Math.min(Math.max(count, 20), 90);
        for (var i = 0; i < count; i++) {
          var angle = Math.random() * Math.PI * 2;
          dots.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            bvx: Math.cos(angle) * BASE_SPEED * (0.5 + Math.random()),
            bvy: Math.sin(angle) * BASE_SPEED * (0.5 + Math.random()),
            vx: 0, vy: 0
          });
        }
      }

      function tick() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (var i = 0; i < dots.length; i++) {
          var d = dots[i];
          var dx = d.x - mouse.x;
          var dy = d.y - mouse.y;
          var distSq = dx * dx + dy * dy;
          if (distSq < REPEL * REPEL && distSq > 0.01) {
            var dist = Math.sqrt(distSq);
            var f = ((REPEL - dist) / REPEL) * 1.4;
            d.vx += (dx / dist) * f;
            d.vy += (dy / dist) * f;
          }
          // Blend back toward base drift
          d.vx = d.vx * 0.92 + d.bvx * 0.08;
          d.vy = d.vy * 0.92 + d.bvy * 0.08;
          d.x += d.vx;
          d.y += d.vy;
          // Wrap
          if (d.x < -2) d.x += canvas.width + 2;
          if (d.x > canvas.width + 2) d.x -= canvas.width + 2;
          if (d.y < -2) d.y += canvas.height + 2;
          if (d.y > canvas.height + 2) d.y -= canvas.height + 2;

          ctx.beginPath();
          ctx.arc(d.x, d.y, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = dotColor;
          ctx.fill();
        }
        animId = requestAnimationFrame(tick);
      }

      // Track mouse position relative to canvas
      section.addEventListener('mousemove', function (e) {
        var rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
      });
      section.addEventListener('mouseleave', function () {
        mouse.x = -9999;
        mouse.y = -9999;
      });

      // Only animate when the section is in view
      var visObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            if (!animId) animId = requestAnimationFrame(tick);
          } else {
            if (animId) { cancelAnimationFrame(animId); animId = null; }
          }
        });
      }, { threshold: 0.01 });
      visObs.observe(section);

      resize();
      var resizeTimer;
      window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(resize, 150);
      });
    });
  }

  /* ─────────────────────────────────────────
     ACCOUNTING ASCII GRID BACKGROUND
     Dense <pre> grid with Perlin-noise bands,
     flowing drift, and cursor-erase effect.
  ───────────────────────────────────────── */
  function initSymbolBackground() {
    var sections = document.querySelectorAll('[data-symbols]');
    if (!sections.length) return;

    // Character sets — accounting themed
    var RAND_CHARS = '    $  %  +  =  -  .  0  1  2  3  4  5  6  7  8  9    ';
    var BAND_CHARS = '$%+=-0123456789';

    // Perlin noise tables
    var GX = new Float32Array(256);
    var GY = new Float32Array(256);
    for (var g = 0; g < 256; g++) {
      var ga = (g / 256) * Math.PI * 2;
      GX[g] = Math.cos(ga); GY[g] = Math.sin(ga);
    }
    var PERM = new Uint8Array(512);
    (function () {
      var b = new Uint8Array(256);
      for (var i = 0; i < 256; i++) b[i] = i;
      var s = 987654321;
      function rn() { s = (s * 1664525 + 1013904223) >>> 0; return s / 0xffffffff; }
      for (var i = 255; i > 0; i--) { var j = (rn() * (i + 1)) | 0; var t = b[i]; b[i] = b[j]; b[j] = t; }
      for (var i = 0; i < 512; i++) PERM[i] = b[i & 255];
    }());
    function fade(t) { return t * t * t * (t * (t * 6 - 15) + 10); }
    function pgrad(ix, iy, x, y) { var k = PERM[(ix & 255) + PERM[iy & 255]]; return GX[k] * (x - ix) + GY[k] * (y - iy); }
    function perlin(x, y) {
      var x0 = Math.floor(x), y0 = Math.floor(y);
      var sx = fade(x - x0), sy = fade(y - y0);
      var n00 = pgrad(x0, y0, x, y), n10 = pgrad(x0 + 1, y0, x, y);
      var n01 = pgrad(x0, y0 + 1, x, y), n11 = pgrad(x0 + 1, y0 + 1, x, y);
      return (n00 + sx * (n10 - n00)) + sy * ((n01 + sx * (n11 - n01)) - (n00 + sx * (n10 - n00)));
    }
    function fbm(x, y) {
      return perlin(x, y) * 0.6 + perlin(x * 2, y * 2) * 0.3 + perlin(x * 4, y * 4) * 0.1;
    }
    function hash(a, b, c) {
      var h = 2166136261;
      h ^= a | 0; h = Math.imul(h, 16777619);
      h ^= b | 0; h = Math.imul(h, 16777619);
      h ^= c | 0; h = Math.imul(h, 16777619);
      return h >>> 0;
    }

    sections.forEach(function (section) {
      var isDark  = section.dataset.symbols === 'dark';
      var fgColor = isDark ? '#54dec5' : '#202a44';
      var opacity = isDark ? '0.13' : '0.11';

      // Wrapper keeps absolute positioning contained
      var wrap = document.createElement('div');
      wrap.className = 'ascii-bg-wrap';
      wrap.setAttribute('aria-hidden', 'true');

      var pre = document.createElement('pre');
      pre.className = 'ascii-bg-pre';
      pre.style.color   = fgColor;
      pre.style.opacity = opacity;

      wrap.appendChild(pre);
      section.insertBefore(wrap, section.firstChild);

      var cols = 0, rows = 0;
      var cellW = 8, cellH = 14;
      var eraseBuf = new Float32Array(1);
      var t0 = performance.now();
      var lastFrame = 0, lastT = 0;
      var animId = null;

      function measureCell() {
        var sp = document.createElement('span');
        sp.textContent = 'M'.repeat(100);
        sp.style.cssText = 'position:absolute;left:-9999px;top:-9999px;white-space:pre;visibility:hidden;pointer-events:none';
        var cs = getComputedStyle(pre);
        sp.style.font = cs.font;
        sp.style.letterSpacing = cs.letterSpacing;
        wrap.appendChild(sp);
        var w = sp.getBoundingClientRect().width / 100 || 8;
        var h = parseFloat(cs.lineHeight) || 14;
        wrap.removeChild(sp);
        return { cw: w, lh: h };
      }

      function computeGrid() {
        var m  = measureCell();
        cellW  = m.cw; cellH = m.lh;
        var r  = wrap.getBoundingClientRect();
        var nc = Math.max(1, Math.floor(r.width  / cellW));
        var nr = Math.max(1, Math.floor(r.height / cellH));
        if (nc === cols && nr === rows) return;
        cols = nc; rows = nr;
        eraseBuf = new Float32Array(cols * rows);
      }

      function applyErase(cx, cy) {
        var R = 10;
        var x0 = Math.max(0, cx - R), x1 = Math.min(cols - 1, cx + R);
        var y0 = Math.max(0, cy - R), y1 = Math.min(rows - 1, cy + R);
        for (var y = y0; y <= y1; y++) {
          for (var x = x0; x <= x1; x++) {
            var dx = x - cx, dy = y - cy;
            var d  = Math.sqrt(dx * dx + dy * dy) / R;
            if (d > 1) continue;
            var f   = Math.pow(1 - d, 1.5);
            var idx = y * cols + x;
            eraseBuf[idx] = Math.max(eraseBuf[idx], 0.9 * f);
          }
        }
      }

      section.addEventListener('mousemove', function (e) {
        var rect = pre.getBoundingClientRect();
        var cx   = Math.max(0, Math.min(cols - 1, Math.floor((e.clientX - rect.left) / cellW)));
        var cy   = Math.max(0, Math.min(rows - 1, Math.floor((e.clientY - rect.top)  / cellH)));
        applyErase(cx, cy);
      });

      function getChar(x, y, t) {
        // Only render on left and right sides — clear the middle 55%
        var xNorm = cols > 1 ? x / (cols - 1) : 0;
        if (xNorm > 0.125 && xNorm < 0.875) return ' ';

        var idx = y * cols + x;
        if (eraseBuf[idx] > 0) return ' ';

        var s  = cols < rows ? cols : rows || 1;
        var u  = x / s;
        var v  = (y / s) - 0.016 * t;

        // Domain warp with fbm
        var wt = t * 0.0008;
        var wx = 0.38 * fbm(u * 1.3 + 10.1 + wt, v * 1.3 - 9.3 - wt);
        var wy = 0.38 * fbm(u * 1.3 - 31.0 - wt, v * 1.3 + 19.7 + wt);

        // Sine band
        var bv = 0.5 + 0.5 * Math.sin((u + wx + wy * 0.3) * Math.PI * 2 * 5.5);
        var ink = Math.pow(bv, 0.35);

        var bIdx  = Math.floor((u + wx) * 11);
        var slice = Math.floor(t * 1.5);

        if (ink > 0.58) {
          // Band region — group every 2 rows so streams are visible but not one solid char
          var h = hash(bIdx * 73856093, 0, 0);
          return BAND_CHARS[h % BAND_CHARS.length];
        }

        // Ambient region — sparse random chars (~45% density)
        if ((hash(x * 997, y * 991, slice * 499) % 100) < 45) return ' ';
        var h2 = hash((x + 1) * 15485863 ^ (y + 1) * 32452843, slice * 49979687, 0);
        return RAND_CHARS[h2 % RAND_CHARS.length];
      }

      function render(now) {
        if (now - lastFrame < 1000 / 30) { animId = requestAnimationFrame(render); return; }
        var t  = (now - t0) / 1000;
        var dt = t - lastT; lastT = t; lastFrame = now;

        // Decay erase
        for (var i = 0; i < eraseBuf.length; i++) {
          if (eraseBuf[i] > 0) eraseBuf[i] = Math.max(0, eraseBuf[i] - dt);
        }

        if (!cols || !rows) { animId = requestAnimationFrame(render); return; }

        var out = '';
        for (var y = 0; y < rows; y++) {
          for (var x = 0; x < cols; x++) out += getChar(x, y, t);
          if (y < rows - 1) out += '\n';
        }
        pre.textContent = out;
        animId = requestAnimationFrame(render);
      }

      // Pause when off-screen
      var visObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            if (!animId) { t0 = performance.now() - lastT * 1000; animId = requestAnimationFrame(render); }
          } else {
            if (animId) { cancelAnimationFrame(animId); animId = null; }
          }
        });
      }, { threshold: 0.01 });
      visObs.observe(section);

      var ro = new ResizeObserver(computeGrid);
      ro.observe(wrap);

      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(function () { computeGrid(); animId = requestAnimationFrame(render); });
      } else {
        computeGrid(); animId = requestAnimationFrame(render);
      }

      // Visibility API pause/resume
      var pausedAt = null;
      document.addEventListener('visibilitychange', function () {
        if (document.visibilityState === 'hidden') {
          pausedAt = performance.now();
          if (animId) { cancelAnimationFrame(animId); animId = null; }
        } else if (pausedAt !== null) {
          t0 += performance.now() - pausedAt;
          pausedAt = null;
          animId = requestAnimationFrame(render);
        }
      });
    });
  }

  /* ─────────────────────────────────────────
     NAV DROPDOWN (mobile toggle)
  ───────────────────────────────────────── */
  function initNavDropdown() {
    document.querySelectorAll('.nav-item--has-dropdown').forEach(function (item) {
      var link = item.querySelector('.nav-link--has-dropdown');
      if (!link) return;

      link.addEventListener('click', function (e) {
        // On mobile (700px or narrower) toggle expansion; on desktop follow href
        if (window.innerWidth <= 700) {
          e.preventDefault();
          item.classList.toggle('is-open');
        }
      });

      // Close when clicking outside (desktop)
      document.addEventListener('click', function (e) {
        if (!item.contains(e.target)) {
          item.classList.remove('is-open');
        }
      });
    });
  }

  /* ─────────────────────────────────────────
     ACTIVE NAV (inner pages)
  ───────────────────────────────────────── */
  function initActiveNav() {
    var path = window.location.pathname;
    var filename = path.split('/').pop() || 'index.html';

    document.querySelectorAll('.nav-link').forEach(function (link) {
      var href = link.getAttribute('href');
      if (!href) return;
      var linkFile = href.split('/').pop();

      if (linkFile === filename) {
        link.classList.add('is-active');
      } else if (linkFile === 'services.html' && filename.indexOf('service-') === 0) {
        // Highlight "Services" for all service detail pages
        link.classList.add('is-active');
      }
    });
  }

  /* ─────────────────────────────────────────
     FAQ ACCORDION
  ───────────────────────────────────────── */
  function initFaqAccordion() {
    var items = document.querySelectorAll('.faq-item');
    if (!items.length) return;

    items.forEach(function (item) {
      var btn    = item.querySelector('.faq-item__question');
      var answer = item.querySelector('.faq-item__answer');
      if (!btn || !answer) return;

      btn.addEventListener('click', function () {
        var isOpen = btn.getAttribute('aria-expanded') === 'true';

        // Close all others
        items.forEach(function (other) {
          var otherBtn    = other.querySelector('.faq-item__question');
          var otherAnswer = other.querySelector('.faq-item__answer');
          if (otherBtn && otherAnswer && otherBtn !== btn) {
            otherBtn.setAttribute('aria-expanded', 'false');
            otherAnswer.style.maxHeight = '0';
          }
        });

        // Toggle this one
        btn.setAttribute('aria-expanded', String(!isOpen));
        answer.style.maxHeight = isOpen ? '0' : answer.scrollHeight + 'px';
      });
    });
  }

  /* ─────────────────────────────────────────
     BLOG FILTER
  ───────────────────────────────────────── */
  function initBlogFilter() {
    var btns     = document.querySelectorAll('.blog-filter__btn');
    var cards    = document.querySelectorAll('.blog-card[data-category]');
    var featured = document.querySelector('.blog-featured[data-category]');
    if (!btns.length) return;

    btns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        btns.forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active');

        var filter = btn.getAttribute('data-filter');

        cards.forEach(function (card) {
          var cat = card.getAttribute('data-category');
          card.style.display = (filter === 'all' || cat === filter) ? '' : 'none';
        });

        if (featured) {
          var featCat = featured.getAttribute('data-category');
          featured.style.display = (filter === 'all' || featCat === filter) ? '' : 'none';
        }
      });
    });
  }

  /* ─────────────────────────────────────────
     INIT ALL
  ───────────────────────────────────────── */
  initPreloader();
  initScrollProgress();
  initCustomCursor();
  initNav();
  initNavDropdown();
  initDotBackground();
  initSymbolBackground();
  initActiveNav();
  initHeroVideo();
  initScrollReveal();
  initReviewsCarousel();
  initContactForm();
  initFaqAccordion();
  initBlogFilter();
  initSmoothScroll();
  initScrollToTop();

})();

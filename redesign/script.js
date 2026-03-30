/* ═══════════════════════════════════════════════════════════════
   CYS ACCOUNTANTS — REDESIGN SCRIPT
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

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

    if (hamburger && menu) {
      hamburger.addEventListener('click', function () {
        const isOpen = menu.classList.toggle('is-open');
        hamburger.setAttribute('aria-expanded', String(isOpen));
        document.body.style.overflow = isOpen ? 'hidden' : '';
      });

      menu.querySelectorAll('.nav-link').forEach(function (link) {
        link.addEventListener('click', function () {
          menu.classList.remove('is-open');
          hamburger.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        });
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
        } else {
          initHeroSlideshow();
        }
      })
      .catch(function () {
        initHeroSlideshow();
      });
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
     HERO ENTRANCE ANIMATIONS
  ───────────────────────────────────────── */
  function initHeroAnimations() {
    document.querySelectorAll('.reveal-up').forEach(function (el) {
      el.style.animationPlayState = 'running';
    });
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
     INIT ALL
  ───────────────────────────────────────── */
  initPreloader();
  initScrollProgress();
  initCustomCursor();
  initNav();
  initHeroVideo();
  initScrollReveal();
  initReviewsCarousel();
  initContactForm();
  initSmoothScroll();
  initScrollToTop();

})();

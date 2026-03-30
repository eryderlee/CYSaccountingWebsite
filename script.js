/* =============================================
   CYS Accountants - Main Script
   ============================================= */

(function () {
  'use strict';

  // --- Hero Slideshow ---
  const slides = document.querySelectorAll('.hero-slideshow .slide');
  let currentSlide = 0;

  function nextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }

  if (slides.length > 1) {
    setInterval(nextSlide, 5000);
  }

  // --- Scroll Animations (IntersectionObserver) ---
  const animTargets = document.querySelectorAll(
    '.service-item, .credential-item'
  );

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  animTargets.forEach(function (el) {
    observer.observe(el);
  });

  // --- Scroll To Top Button ---
  var scrollBtn = document.getElementById('scrollUp');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 400) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  });

  scrollBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // --- Mobile Menu Toggle ---
  var menuToggle = document.querySelector('.menu-toggle');
  var nav = document.getElementById('site-navigation');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function () {
      nav.classList.toggle('open');
    });

    // Close menu when a link is clicked
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
      });
    });
  }

  // --- Contact Form (client-side demo) ---
  var form = document.getElementById('contact-form');
  var response = document.getElementById('form-response');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = form.querySelector('#your-name').value.trim();
      var email = form.querySelector('#your-email').value.trim();
      var phone = form.querySelector('#your-phone').value.trim();

      response.className = 'form-response';

      if (!name || !email || !phone) {
        response.textContent = 'Please fill in all required fields.';
        response.classList.add('error');
        return;
      }

      // Simulate submission
      var submitBtn = form.querySelector('.btn-submit');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      setTimeout(function () {
        response.textContent = 'Thank you! Your message has been received. We\'ll be in touch shortly.';
        response.classList.add('success');
        form.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
      }, 1200);
    });
  }

  // --- Smooth anchor scroll (offset for sticky header) ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var headerHeight = document.getElementById('masthead').offsetHeight;
        var top = target.getBoundingClientRect().top + window.scrollY - headerHeight;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

})();

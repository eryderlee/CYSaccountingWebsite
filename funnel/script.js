(function () {
  'use strict';

  /* ─────────────────────────────────────────
     Smooth scroll for anchor buttons
  ───────────────────────────────────────── */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var target = document.querySelector(this.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  /* ─────────────────────────────────────────
     Form validation + success state
  ───────────────────────────────────────── */
  function initForm() {
    var form    = document.getElementById('consultation-form');
    var wrap    = document.getElementById('form-wrap');
    var success = document.getElementById('form-success');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var valid = true;

      // Clear previous errors
      form.querySelectorAll('.funnel-form__input').forEach(function (el) {
        el.classList.remove('is-error');
      });

      // Check required fields
      form.querySelectorAll('[required]').forEach(function (el) {
        var val = el.value.trim();
        if (!val || (el.tagName === 'SELECT' && el.value === '')) {
          el.classList.add('is-error');
          valid = false;
        }
      });

      if (!valid) {
        // Scroll to first error
        var firstError = form.querySelector('.is-error');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
          firstError.focus();
        }
        return;
      }

      // Success — hide form, show message
      form.hidden = true;
      success.hidden = false;
      wrap.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    // Remove error state on input
    form.querySelectorAll('.funnel-form__input').forEach(function (el) {
      el.addEventListener('input', function () {
        this.classList.remove('is-error');
      });
      el.addEventListener('change', function () {
        this.classList.remove('is-error');
      });
    });
  }

  /* ─────────────────────────────────────────
     Init
  ───────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    initSmoothScroll();
    initForm();
  });

}());

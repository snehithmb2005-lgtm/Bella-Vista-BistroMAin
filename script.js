/*!
 * Bella Vista Bistro — script.js
 * Features:
 *  - Navbar scroll behaviour
 *  - Parallax hero layers
 *  - 3D mouse-tilt effect on cards
 *  - Scroll-reveal animations (IntersectionObserver)
 *  - Animated number counters
 *  - Menu category tabs
 *  - Back-to-top button
 *  - Reservation form validation + fake submission
 *  - Smooth scroll for anchor links
 */

'use strict';

/* ═══════════════════════════════════════════════════════════
   1. HELPER — throttle a function call
   ═══════════════════════════════════════════════════════════ */
function throttle(fn, ms) {
  let last = 0;
  return function (...args) {
    const now = Date.now();
    if (now - last >= ms) { last = now; fn.apply(this, args); }
  };
}

/* ═══════════════════════════════════════════════════════════
   2. NAVBAR — change style on scroll
   ═══════════════════════════════════════════════════════════ */
(function initNavbar() {
  const nav = document.getElementById('mainNav');
  if (!nav) return;

  function onScroll() {
    if (window.scrollY > 60) {
      nav.classList.add('nav-scrolled');
    } else {
      nav.classList.remove('nav-scrolled');
    }
  }

  window.addEventListener('scroll', throttle(onScroll, 80), { passive: true });
  onScroll(); // run once on load
})();

/* ═══════════════════════════════════════════════════════════
   3. SMOOTH SCROLL — for all #anchor links
   ═══════════════════════════════════════════════════════════ */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();

      // Close mobile nav if open
      const bsNav = document.getElementById('navbarNav');
      if (bsNav && bsNav.classList.contains('show')) {
        const toggler = document.querySelector('.navbar-toggler');
        if (toggler) toggler.click();
      }

      // Offset for fixed navbar
      const navHeight = document.getElementById('mainNav')?.offsetHeight || 70;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();

/* ═══════════════════════════════════════════════════════════
   4. HERO PARALLAX — multi-layer depth on scroll + mouse
   ═══════════════════════════════════════════════════════════ */
(function initParallax() {
  const layers  = document.querySelectorAll('.parallax-layer');
  const content = document.querySelector('.hero-content');
  const hero    = document.querySelector('.hero-section');
  if (!layers.length || !hero) return;

  // ── Scroll parallax ──────────────────────────────────────
  function onScroll() {
    const scrolled = window.scrollY;
    layers.forEach(layer => {
      const speed = parseFloat(layer.dataset.speed) || 0.2;
      layer.style.transform = `translateY(${scrolled * speed}px)`;
    });
    if (content) {
      content.style.transform = `translateY(${scrolled * 0.15}px)`;
      content.style.opacity   = Math.max(0, 1 - scrolled / 600);
    }
  }

  // ── Mouse parallax — 3D tilt of layers ──────────────────
  function onMouse(e) {
    const rect = hero.getBoundingClientRect();
    // Normalise mouse position from -0.5 to +0.5
    const mx = (e.clientX - rect.left) / rect.width  - 0.5;
    const my = (e.clientY - rect.top)  / rect.height - 0.5;

    layers.forEach(layer => {
      const speed = parseFloat(layer.dataset.speed) || 0.2;
      const dx = mx * speed * 40;
      const dy = my * speed * 40;
      layer.style.transform = `translate(${dx}px, ${dy}px)`;
    });

    // Subtle 3D rotation on hero content
    if (content) {
      content.style.transform =
        `perspective(1000px) rotateX(${-my * 4}deg) rotateY(${mx * 4}deg)`;
    }
  }

  // ── Scroll drives vertical, mouse drives 3D angles ──────
  window.addEventListener('scroll', throttle(onScroll, 16), { passive: true });
  hero.addEventListener('mousemove', throttle(onMouse, 20));

  hero.addEventListener('mouseleave', () => {
    // Reset transforms gently when mouse leaves
    layers.forEach(layer => { layer.style.transition = 'transform .6s ease'; });
    if (content) content.style.transform = '';
    setTimeout(() => {
      layers.forEach(layer => { layer.style.transition = ''; });
    }, 650);
  });
})();

/* ═══════════════════════════════════════════════════════════
   5. 3D MOUSE-TILT EFFECT — applies to any .tilt-card
   ═══════════════════════════════════════════════════════════ */
(function initTiltCards() {
  const tiltCards = document.querySelectorAll('.tilt-card');

  tiltCards.forEach(card => {
    const inner = card.querySelector('.about-img-inner') || card;

    card.addEventListener('mousemove', function (e) {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5; // -0.5 to 0.5
      const y = (e.clientY - rect.top)  / rect.height - 0.5;

      inner.style.transition = 'transform .1s ease';
      inner.style.transform  =
        `perspective(700px) rotateY(${x * 16}deg) rotateX(${-y * 12}deg) scale3d(1.03,1.03,1.03)`;
    });

    card.addEventListener('mouseleave', () => {
      inner.style.transition = 'transform .5s ease';
      inner.style.transform  = '';
    });
  });
})();

/* ═══════════════════════════════════════════════════════════
   6. SCROLL-REVEAL — IntersectionObserver for .reveal-item
      and .reveal-stat elements
   ═══════════════════════════════════════════════════════════ */
(function initScrollReveal() {
  const options = {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target); // only animate once
      }
    });
  }, options);

  document.querySelectorAll('.reveal-item, .reveal-stat').forEach(el => {
    revealObserver.observe(el);
  });
})();

/* ═══════════════════════════════════════════════════════════
   7. ANIMATED NUMBER COUNTERS — for .stat-number elements
   ═══════════════════════════════════════════════════════════ */
(function initCounters() {
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  if (!statNumbers.length) return;

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el     = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const suffix = el.dataset.suffix || '';
      const dur    = 1800; // ms
      const step   = 16;  // ~60fps
      const increments = Math.ceil(dur / step);
      let count = 0;

      const timer = setInterval(() => {
        count++;
        const current = Math.round(target * easeOut(count / increments));
        el.textContent = current + suffix;
        if (count >= increments) {
          el.textContent = target + suffix;
          clearInterval(timer);
        }
      }, step);

      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => counterObserver.observe(el));

  // Ease-out cubic function
  function easeOut(t) {
    return 1 - Math.pow(1 - t, 3);
  }
})();

/* ═══════════════════════════════════════════════════════════
   8. MENU CATEGORY TABS — filter menu items by category
   ═══════════════════════════════════════════════════════════ */
(function initMenuTabs() {
  const tabs     = document.querySelectorAll('.menu-tabs .nav-link');
  const allItems = document.querySelectorAll('.menu-item');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', function () {
      // Update active state
      tabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');

      const category = this.dataset.category;

      // Fade items out, then swap, then fade in
      allItems.forEach(item => {
        item.style.transition  = 'opacity .25s ease, transform .25s ease';
        item.style.opacity     = '0';
        item.style.transform   = 'translateY(12px)';
      });

      setTimeout(() => {
        allItems.forEach(item => {
          const match = item.dataset.category === category;
          item.classList.toggle('d-none', !match);
          if (match) {
            // Force reflow so transition plays
            void item.offsetWidth;
            item.style.opacity   = '1';
            item.style.transform = 'translateY(0)';
          }
        });
      }, 260);
    });
  });
})();

/* ═══════════════════════════════════════════════════════════
   9. BACK-TO-TOP BUTTON
   ═══════════════════════════════════════════════════════════ */
(function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', throttle(() => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, 150), { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ═══════════════════════════════════════════════════════════
   10. RESERVATION FORM — validation & fake submit
   ═══════════════════════════════════════════════════════════ */
(function initReservationForm() {
  const form       = document.getElementById('reservationForm');
  const submitBtn  = document.getElementById('resSubmitBtn');
  const btnText    = document.getElementById('btnText');
  const btnSpinner = document.getElementById('btnSpinner');
  const successMsg = document.getElementById('formSuccess');

  // Set minimum date to today
  const dateInput = document.getElementById('resDate');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }

  if (!form) return;

  // Live validation on blur
  form.querySelectorAll('.form-control, .form-select').forEach(field => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      if (field.classList.contains('is-invalid')) validateField(field);
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    e.stopPropagation();

    // Validate all required fields
    let isValid = true;
    form.querySelectorAll('[required]').forEach(field => {
      if (!validateField(field)) isValid = false;
    });

    if (!isValid) return;

    // ── Fake async submit (simulate network request) ──────
    submitBtn.disabled = true;
    btnText.textContent = 'Confirming…';
    btnSpinner.classList.remove('d-none');

    setTimeout(() => {
      // Hide form fields, show success
      form.querySelectorAll('.row > .col-12, .row > .col-md-6, .row > .col-md-4').forEach(col => {
        col.style.display = 'none';
      });
      successMsg.classList.remove('d-none');

      // Reset button state
      submitBtn.disabled = false;
      btnText.textContent = 'Confirm Reservation';
      btnSpinner.classList.add('d-none');

      // Scroll success message into view
      successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 1800);
  });

  /**
   * Validates a single form field.
   * Returns true if valid, false if not.
   */
  function validateField(field) {
    const valid = field.checkValidity();
    field.classList.toggle('is-valid',   valid);
    field.classList.toggle('is-invalid', !valid);
    return valid;
  }
})();

/* ═══════════════════════════════════════════════════════════
   11. 3D FLOATING CARD — micro-tilt on any .flip-card
       (adds subtle resting tilt that resets on hover-flip)
   ═══════════════════════════════════════════════════════════ */
(function initFlipCardTilt() {
  const flipCards = document.querySelectorAll('.flip-card');

  flipCards.forEach(card => {
    card.addEventListener('mousemove', function (e) {
      // Only tilt when not already flipped (i.e. not mid-hover-flip)
      if (this.matches(':hover')) return; // flip handles it via CSS
    });

    // Add subtle entry animation when card becomes visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.transition = 'opacity .5s ease, transform .5s ease';
          entry.target.style.opacity    = '1';
          entry.target.style.transform  = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    card.style.opacity   = '0';
    card.style.transform = 'translateY(30px)';
    observer.observe(card);
  });
})();

/* ═══════════════════════════════════════════════════════════
   12. NAVBAR ACTIVE LINK — highlight based on scroll position
   ═══════════════════════════════════════════════════════════ */
(function initActiveNavLink() {
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.navbar-nav .nav-link');
  const navHeight = document.getElementById('mainNav')?.offsetHeight || 70;

  function updateActive() {
    const scrollPos = window.scrollY + navHeight + 20;

    sections.forEach(section => {
      const top    = section.offsetTop;
      const bottom = top + section.offsetHeight;
      const id     = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < bottom) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', throttle(updateActive, 100), { passive: true });
  updateActive();
})();

/* ═══════════════════════════════════════════════════════════
   13. GLOBAL INIT LOG
   ═══════════════════════════════════════════════════════════ */
console.log('%c🍷 Bella Vista Bistro', 'color:#c9a84c;font-size:1.4rem;font-weight:bold;font-family:serif;');
console.log('%cWebsite loaded successfully.', 'color:#8b1a1a;font-size:.9rem;');

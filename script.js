/* ============================================================
   FOTIS ZAGAS — Photography Portfolio
   Vanilla ES6+ JavaScript
   ============================================================ */

(function () {
  'use strict';

  /* ---------- DOM References ---------- */
  const hamburger = document.getElementById('hamburger');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileHeader = document.getElementById('mobile-header');
  const drawerLinks = document.querySelectorAll('.mobile-drawer__link');
  const yearSpan = document.getElementById('year');

  /* ---------- Set Current Year ---------- */
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }


  /* ============================================================
     MOBILE HAMBURGER MENU
     ============================================================ */
  function toggleDrawer() {
    const isOpen = hamburger.classList.toggle('hamburger--active');
    mobileDrawer.classList.toggle('mobile-drawer--open', isOpen);
    document.body.classList.toggle('no-scroll', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  }

  function closeDrawer() {
    hamburger.classList.remove('hamburger--active');
    mobileDrawer.classList.remove('mobile-drawer--open');
    document.body.classList.remove('no-scroll');
    hamburger.setAttribute('aria-expanded', 'false');
  }

  hamburger.addEventListener('click', toggleDrawer);

  // Close drawer when a link is clicked
  drawerLinks.forEach(function (link) {
    link.addEventListener('click', closeDrawer);
  });

  // Close drawer on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeDrawer();
    }
  });


  /* ============================================================
     MOBILE HEADER — Scroll Effect
     Adds semi-transparent blur background when scrolled
     ============================================================ */
  let lastScrollY = 0;
  let ticking = false;

  function onScroll() {
    lastScrollY = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(function () {
        if (lastScrollY > 50) {
          mobileHeader.classList.add('mobile-header--scrolled');
        } else {
          mobileHeader.classList.remove('mobile-header--scrolled');
        }
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });


  /* ============================================================
     INTERSECTION OBSERVER — Scroll Reveal (Fade-in-up)
     ============================================================ */
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal--visible');
          revealObserver.unobserve(entry.target); // Only animate once
        }
      });
    },
    {
      rootMargin: '-80px 0px',
      threshold: 0.05,
    }
  );

  revealElements.forEach(function (el) {
    revealObserver.observe(el);
  });


  /* ============================================================
     SMOOTH SCROLL — Sidebar & Mobile Nav Links
     Ensures correct offset accounting for fixed sidebar/header
     ============================================================ */
  const allNavLinks = document.querySelectorAll(
    '.sidebar__link, .sidebar__logo, .mobile-header__logo'
  );

  allNavLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

})();

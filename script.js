/* ==========================================================
   Mother City Macrons
   Script: nav visibility, active link highlighting,
           scroll reveals, banner load, mobile menu
   ========================================================== */

(function () {
  'use strict';

  // ======================================================
  // Show or hide the sticky nav based on hero visibility
  // ======================================================
  const nav = document.getElementById('nav');
  const hero = document.querySelector('.hero');

  if (hero && nav) {
    const navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          nav.classList.remove('is-visible');
        } else {
          nav.classList.add('is-visible');
        }
      });
    }, { threshold: 0, rootMargin: '0px 0px -60% 0px' });

    navObserver.observe(hero);
  }

  // ======================================================
  // Highlight the active nav link as the user scrolls
  // ======================================================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu a');

  const activeObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(function (link) {
          const href = link.getAttribute('href');
          link.classList.toggle('is-active', href === '#' + id);
        });
      }
    });
  }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });

  sections.forEach(function (section) {
    if (section.id) activeObserver.observe(section);
  });

  // ======================================================
  // Scroll reveal for elements with the .reveal class,
  // plus the story and details sections
  // ======================================================
  const revealEls = document.querySelectorAll('.reveal, .details, .story');

  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });

  revealEls.forEach(function (el) { revealObserver.observe(el); });

  // ======================================================
  // Banner fade in once the image has finished loading
  // ======================================================
  const banner = document.getElementById('banner');
  const bannerImg = banner ? banner.querySelector('img') : null;

  function showBanner() {
    if (banner) banner.classList.add('is-ready');
  }

  if (bannerImg) {
    if (bannerImg.complete) {
      showBanner();
    } else {
      bannerImg.addEventListener('load', showBanner);
      bannerImg.addEventListener('error', showBanner);
    }
  }

  // ======================================================
  // Mobile menu: open, close, close on link click or Esc
  // ======================================================
  const body = document.body;
  const toggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('[data-nav-mobile]');

  function openMenu() {
    body.classList.add('menu-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close menu');
    mobileMenu.setAttribute('aria-hidden', 'false');
  }

  function closeMenu() {
    body.classList.remove('menu-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
    mobileMenu.setAttribute('aria-hidden', 'true');
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      if (body.classList.contains('menu-open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  mobileLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      setTimeout(closeMenu, 120);
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && body.classList.contains('menu-open')) {
      closeMenu();
    }
  });

  if (mobileMenu) {
    mobileMenu.addEventListener('click', function (e) {
      if (e.target === mobileMenu) closeMenu();
    });
  }

})();

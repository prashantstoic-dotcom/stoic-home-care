/* ============================================================
   STOIC HEALTHCARE — script.js
   All JavaScript: Loader, Navbar, Swipers, AOS, FAQ,
   Forms, Parallax, Scroll-to-Top, Active Nav Links
   ============================================================ */

'use strict';

/* ── PAGE LOADER ── */
(function initLoader() {
  window.addEventListener('load', function () {
    setTimeout(function () {
      var loader = document.getElementById('pageLoader');
      if (loader) {
        loader.classList.add('hidden');
        document.body.classList.remove('loader-active');
      }
    }, 3000);
  });
})();

/* ── NAVBAR SCROLL + ACTIVE LINKS ── */
(function initNavbar() {
  var nav = document.getElementById('mainNav');
  if (!nav) return;

  // Scroll effect
  window.addEventListener('scroll', function () {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  // Mark active page link
  var links = document.querySelectorAll('.nav-link');
  var current = location.pathname.split('/').pop() || 'index.html';
  links.forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      link.classList.add('active-page');
    }
  });
})();

/* ── SCROLL TO TOP ── */
(function initScrollTop() {
  var btn = document.querySelector('.scroll-top-btn');
  if (!btn) return;

  window.addEventListener('scroll', function () {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ── AOS INIT ── */
document.addEventListener('DOMContentLoaded', function () {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 700,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60
    });
  }
});

/* ── HERO SWIPER ── */
(function initHeroSwiper() {
  var el = document.querySelector('.hero-swiper');
  if (!el || typeof Swiper === 'undefined') return;
  new Swiper('.hero-swiper', {
    loop: true,
    autoplay: { delay: 5500, disableOnInteraction: false },
    effect: 'fade',
    fadeEffect: { crossFade: true },
    speed: 900,
    pagination: {
      el: '.hero-swiper .swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.hero-swiper .swiper-button-next',
      prevEl: '.hero-swiper .swiper-button-prev'
    }
  });
})();

/* ── EQUIPMENT SWIPER (home page preview) ── */
(function initEquipSwiper() {
  var el = document.querySelector('.equip-home-swiper');
  if (!el || typeof Swiper === 'undefined') return;
  new Swiper('.equip-home-swiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    pagination: {
      el: '.equip-home-swiper .swiper-pagination',
      clickable: true
    },
    breakpoints: {
      576: { slidesPerView: 2 },
      992: { slidesPerView: 3 },
      1200: { slidesPerView: 4 }
    }
  });
})();

/* ── TESTIMONIALS SWIPER ── */
(function initTestiSwiper() {
  var el = document.querySelector('.testi-swiper');
  if (!el || typeof Swiper === 'undefined') return;
  new Swiper('.testi-swiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    autoplay: { delay: 4500, disableOnInteraction: false },
    loop: true,
    pagination: {
      el: '.testi-swiper .swiper-pagination',
      clickable: true
    },
    breakpoints: {
      768: { slidesPerView: 2 },
      1200: { slidesPerView: 3 }
    }
  });
})();

/* ── FAQ ACCORDION ── */
(function initFAQ() {
  var items = document.querySelectorAll('.faq-item');
  items.forEach(function (item) {
    item.addEventListener('click', function () {
      var wasOpen = this.classList.contains('open');
      // Close all
      items.forEach(function (i) { i.classList.remove('open'); });
      // Toggle clicked
      if (!wasOpen) this.classList.add('open');
    });
  });
})();

/* ── FORM SUBMISSION ── */
window.submitEnquiry = function (e) {
  e.preventDefault();
  var form = e.target;
  var btn = form.querySelector('.btn-form-submit');
  var successEl = form.querySelector('.form-success');
  if (!btn) return;

  btn.textContent = 'Sending…';
  btn.disabled = true;

  setTimeout(function () {
    if (successEl) {
      successEl.style.display = 'block';
    }
    btn.style.display = 'none';
  }, 1400);
};

/* ── PARALLAX SCROLL ── */
(function initParallax() {
  var el = document.getElementById('parallaxBg');
  if (!el) return;

  function onScroll() {
    var rect = el.parentElement.getBoundingClientRect();
    var offset = rect.top * 0.28;
    el.style.transform = 'translateY(' + offset + 'px)';
  }

  window.addEventListener('scroll', onScroll, { passive: true });
})();

/* ── ANIMATED COUNT-UP ── */
(function initCountUp() {
  var counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      var target = parseInt(el.getAttribute('data-count'), 10);
      var suffix = el.getAttribute('data-suffix') || '';
      var duration = 1800;
      var start = 0;
      var step = target / (duration / 16);

      var timer = setInterval(function () {
        start += step;
        if (start >= target) {
          start = target;
          clearInterval(timer);
        }
        el.textContent = Math.floor(start).toLocaleString() + suffix;
      }, 16);

      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(function (el) { observer.observe(el); });
})();

/* ── SMOOTH SECTION SCROLL FOR ANCHOR LINKS ── */
document.addEventListener('DOMContentLoaded', function () {
  var anchors = document.querySelectorAll('a[href^="#"]');
  anchors.forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = this.getAttribute('href').slice(1);
      var target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        var offset = 80; // navbar height
        var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });
});

/* ── NAVBAR COLLAPSE ON MOBILE LINK CLICK ── */
document.addEventListener('DOMContentLoaded', function () {
  var links = document.querySelectorAll('#navbarMain .nav-link');
  var collapse = document.getElementById('navbarMain');
  if (!collapse) return;
  links.forEach(function (link) {
    link.addEventListener('click', function () {
      if (window.innerWidth < 992 && typeof bootstrap !== 'undefined') {
        var bsCollapse = bootstrap.Collapse.getInstance(collapse);
        if (bsCollapse) bsCollapse.hide();
      }
    });
  });
});

/* ── LAZY IMAGE LOAD FALLBACK ── */
(function initLazyImages() {
  var imgs = document.querySelectorAll('img[loading="lazy"]');
  if ('loading' in HTMLImageElement.prototype) return; // native support

  imgs.forEach(function (img) {
    var src = img.getAttribute('data-src');
    if (src) img.src = src;
  });
})();

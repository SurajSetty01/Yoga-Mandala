/* ============================================================
   YOGA MANDALA · CANDIDATE "DEPTH"
   THE PHOTOGRAPH HAS VOLUME.

   One rAF loop. One read of scrollY per frame. Every write is a
   transform or an opacity. Nothing reads layout inside a listener.
   ============================================================ */
(function () {
  'use strict';

  var html = document.documentElement;
  html.classList.add('js');

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var fine   = window.matchMedia('(hover: hover) and (pointer: fine)');
  var flat   = /(^|[?&])flat=1/.test(location.search);   /* control condition */

  var stage  = document.getElementById('stage');
  var hero   = document.getElementById('top');
  var pFar   = document.getElementById('pFar');
  var pNear  = document.getElementById('pNear');
  var frame  = document.getElementById('frame');
  var rail   = document.getElementById('rail');
  var pillWrap = document.getElementById('pillWrap');

  /* --------------------------------------------------------
     THE RIG
     lag  : share of the scroll the layer does NOT do.
            far lags most, so it reads as furthest away.
     dz   : how much the layer grows over one hero of scroll —
            the slow push. Nearer planes grow faster, which is
            what a real dolly does.
     mx/my: pointer travel in px. Tiny, damped, opposite the
            cursor, more for nearer planes.
     -------------------------------------------------------- */
  var RIG = [
    { el: pFar,  lag: 0.30, dz: 0.050, mx: 5,  my: 2.5 },
    { el: frame, lag: 0.16, dz: 0.000, mx: 3,  my: 1.5, plain: true },
    { el: pNear, lag: 0.05, dz: 0.125, mx: 18, my: 9 },
    /* the rail travels with the words. Pinned to the hero's bottom edge it
       rose faster than they did and the button collided with the credit —
       cream on cream, caught by the contrast harness, not by eye. */
    { el: rail,  lag: 0.16, dz: 0.000, mx: 3,  my: 1.5, plain: true }
  ];

  var bx = '0%', by = '0%', s0 = 1;
  var heroH = 1;

  function readVars() {
    var cs = getComputedStyle(html);
    bx = (cs.getPropertyValue('--bias-x') || '0%').trim();
    by = (cs.getPropertyValue('--bias-y') || '0%').trim();
    s0 = parseFloat(cs.getPropertyValue('--plate-scale')) || 1;
    heroH = Math.max(hero.offsetHeight, 1);
  }

  /* pointer, in -1..1, damped toward the target */
  var tx = 0, ty = 0, cx = 0, cy = 0;
  var scrolled = 0;
  var queued = false;

  function write() {
    queued = false;
    var y = window.scrollY || window.pageYOffset || 0;
    scrolled = Math.min(Math.max(y, 0), heroH);
    var prog = scrolled / heroH;

    cx += (tx - cx) * 0.08;
    cy += (ty - cy) * 0.08;

    for (var i = 0; i < RIG.length; i++) {
      var r = RIG[i];
      if (!r.el) continue;
      var dy = scrolled * r.lag - cy * r.my;
      var dx = -cx * r.mx;
      if (r.plain) {
        /* the words carry no scale — type must never be resampled */
        r.el.style.transform = 'translate3d(' + dx.toFixed(2) + 'px,' + dy.toFixed(2) + 'px,0)';
      } else {
        r.el.style.transform =
          'translate3d(calc(' + bx + ' + ' + dx.toFixed(2) + 'px),' +
          'calc(' + by + ' + ' + dy.toFixed(2) + 'px),0) ' +
          'scale(' + (s0 + prog * r.dz).toFixed(4) + ')';
      }
    }

    /* the frame's furniture is an at-rest affordance: once you are moving
       it has done its job, so it leaves rather than riding along */
    if (rail) {
      var o = 1 - (prog - 0.05) / 0.20;
      o = o < 0 ? 0 : o > 1 ? 1 : o;
      rail.style.opacity = o.toFixed(3);
      rail.style.pointerEvents = o < 0.08 ? 'none' : '';
    }

    if (Math.abs(tx - cx) > 0.0008 || Math.abs(ty - cy) > 0.0008) schedule();
  }

  function schedule() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(write);
  }

  /* --------------------------------------------------------
     THE PILL
     -------------------------------------------------------- */
  var lastY = 0, parked = false;
  var THRESHOLD = 0;

  function pill() {
    var y = window.scrollY || window.pageYOffset || 0;
    if (pillWrap.classList.contains('is-open')) { lastY = y; return; }
    if (y < 48) {
      if (parked) { pillWrap.classList.remove('is-away'); parked = false; }
    } else if (y > THRESHOLD && y > lastY + 5) {
      if (!parked) { pillWrap.classList.add('is-away'); parked = true; }
    } else if (y < lastY - 5) {
      if (parked) { pillWrap.classList.remove('is-away'); parked = false; }
    }
    lastY = y;
  }

  function onScroll() {
    if (!flat && !reduce.matches) schedule();
    if (!pillTicking) { pillTicking = true; requestAnimationFrame(pillFrame); }
  }
  var pillTicking = false;
  function pillFrame() { pillTicking = false; pill(); }

  /* it inverts exactly when it leaves the picture, measured against
     the hero's real bottom edge rather than a guessed scroll number */
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (es) {
      pillWrap.classList.toggle('is-light', !es[0].isIntersecting);
    }, { rootMargin: '-70px 0px 0px 0px', threshold: 0 }).observe(hero);
  }

  /* the moving highlight — a ground that slides between items */
  var navLinks = document.getElementById('navLinks');
  if (navLinks) {
    var ink = navLinks.querySelector('.navInk');
    var items = navLinks.querySelectorAll('.navLink');
    var lightUp = function (el) {
      var a = el.getBoundingClientRect(), b = navLinks.getBoundingClientRect();
      ink.style.transform = 'translateX(' + (a.left - b.left) + 'px) scaleX(' + a.width + ')';
      navLinks.classList.add('is-lit');
    };
    for (var n = 0; n < items.length; n++) {
      items[n].addEventListener('pointerenter', function () { lightUp(this); });
      items[n].addEventListener('focus', function () { lightUp(this); });
    }
    navLinks.addEventListener('pointerleave', function () { navLinks.classList.remove('is-lit'); });
    navLinks.addEventListener('focusout', function (e) {
      if (!navLinks.contains(e.relatedTarget)) navLinks.classList.remove('is-lit');
    });
  }

  /* the narrow-viewport sheet. A real disclosure, not a dead link. */
  var burger = document.getElementById('navBurger');
  var sheet  = document.getElementById('navSheet');
  function setSheet(open) {
    pillWrap.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (open) { pillWrap.classList.remove('is-away'); parked = false; }
  }
  if (burger && sheet) {
    burger.addEventListener('click', function () {
      setSheet(burger.getAttribute('aria-expanded') !== 'true');
    });
    sheet.addEventListener('click', function (e) { if (e.target.closest('a')) setSheet(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && pillWrap.classList.contains('is-open')) { setSheet(false); burger.focus(); }
    });
    document.addEventListener('pointerdown', function (e) {
      if (pillWrap.classList.contains('is-open') && !pillWrap.contains(e.target)) setSheet(false);
    });
  }

  /* the pill comes back the moment you tab into it */
  pillWrap.addEventListener('focusin', function () {
    pillWrap.classList.remove('is-away'); parked = false;
  });

  /* --------------------------------------------------------
     REVEALS — opacity only, so IntersectionObserver can see them
     -------------------------------------------------------- */
  var revealables = document.querySelectorAll('[data-r]');
  if (reduce.matches || !('IntersectionObserver' in window)) {
    for (var k = 0; k < revealables.length; k++) revealables[k].classList.add('in');
  } else {
    var io = new IntersectionObserver(function (es) {
      for (var i = 0; i < es.length; i++) {
        if (es[i].isIntersecting) { es[i].target.classList.add('in'); io.unobserve(es[i].target); }
      }
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    for (var j = 0; j < revealables.length; j++) io.observe(revealables[j]);
  }

  /* --------------------------------------------------------
     WIRING
     -------------------------------------------------------- */
  readVars();
  THRESHOLD = Math.round(heroH * 0.55);

  function onResize() {
    readVars();
    THRESHOLD = Math.round(heroH * 0.55);
    if (window.innerWidth > 900) setSheet(false);
    if (!flat && !reduce.matches) schedule();
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onResize, { passive: true });
  window.addEventListener('orientationchange', onResize, { passive: true });

  if (!flat && !reduce.matches) {
    schedule();
    if (fine.matches) {
      window.addEventListener('pointermove', function (e) {
        if (e.pointerType !== 'mouse') return;
        tx = (e.clientX / window.innerWidth) * 2 - 1;
        ty = (e.clientY / window.innerHeight) * 2 - 1;
        schedule();
      }, { passive: true });
      window.addEventListener('pointerleave', function () { tx = 0; ty = 0; schedule(); }, { passive: true });
    }
  }

  /* if the user turns motion off mid-session, park every layer */
  var onPref = function () {
    if (reduce.matches) {
      for (var i = 0; i < RIG.length; i++) if (RIG[i].el) RIG[i].el.style.transform = '';
      if (rail) { rail.style.opacity = ''; rail.style.pointerEvents = ''; }
      for (var k2 = 0; k2 < revealables.length; k2++) revealables[k2].classList.add('in');
    } else { schedule(); }
  };
  if (reduce.addEventListener) reduce.addEventListener('change', onPref);

  /* the control condition: same page, zero depth differential */
  if (flat) document.body.classList.add('is-flat');
})();

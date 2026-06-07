/* ============================================================
   DAHAB — Main interactive script
   ============================================================ */

(function () {
  'use strict';
  const cfg = window.DAHAB_CONFIG || {};
  const lang = document.documentElement.lang === 'en' ? 'en' : 'fr';

  /* ── Inject contact info from config ──────────────────────── */
  function applyConfig() {
    // phone, whatsapp, email
    document.querySelectorAll('[data-cfg-phone]').forEach(el => {
      el.textContent = cfg.phone || '';
      if (el.tagName === 'A') el.href = 'tel:' + (cfg.phone || '').replace(/\s/g, '');
    });
    document.querySelectorAll('[data-cfg-email]').forEach(el => {
      el.textContent = cfg.email || '';
      if (el.tagName === 'A') el.href = 'mailto:' + (cfg.email || '');
    });
    document.querySelectorAll('[data-cfg-address]').forEach(el => { el.textContent = cfg.address || ''; });
    document.querySelectorAll('[data-cfg-maps-link]').forEach(el => {
      if (cfg.mapsUrl) el.href = cfg.mapsUrl;
    });
    document.querySelectorAll('[data-cfg-hours]').forEach(el => { el.textContent = cfg.hours || ''; });
    document.querySelectorAll('[data-cfg-whatsapp]').forEach(el => {
      const wa = (cfg.whatsapp || '').replace(/\D/g, '');
      const formatted = wa ? '+' + wa : '';
      el.textContent = formatted;
    });

    // wa link
    const waMsg = encodeURIComponent((cfg.whatsappMessage && cfg.whatsappMessage[lang]) || '');
    const waUrl = cfg.whatsapp
      ? `https://wa.me/${(cfg.whatsapp || '').replace(/\D/g, '')}${waMsg ? '?text=' + waMsg : ''}`
      : '#';
    document.querySelectorAll('[data-cfg-wa-link]').forEach(el => { el.href = waUrl; });

    // social
    document.querySelectorAll('[data-cfg-instagram]').forEach(el => { if (cfg.instagram) el.href = cfg.instagram; });
    document.querySelectorAll('[data-cfg-pinterest]').forEach(el => { if (cfg.pinterest) el.href = cfg.pinterest; });
    document.querySelectorAll('[data-cfg-tiktok]').forEach(el => { if (cfg.tiktok) el.href = cfg.tiktok; });
    document.querySelectorAll('[data-cfg-facebook]').forEach(el => { if (cfg.facebook) el.href = cfg.facebook; });
  }

  /* ── Sticky nav scroll state ──────────────────────────────── */
  function initNav() {
    const nav = document.querySelector('.nav');
    if (!nav) return;
    const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ── Mobile drawer ────────────────────────────────────────── */
  function initMobileMenu() {
    const burger = document.querySelector('.nav__hamburger');
    const drawer = document.querySelector('.mobile-drawer');
    if (!burger || !drawer) return;
    const toggle = () => {
      const open = !drawer.classList.contains('is-open');
      drawer.classList.toggle('is-open', open);
      burger.classList.toggle('is-open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    };
    burger.addEventListener('click', toggle);
    drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      drawer.classList.remove('is-open');
      burger.classList.remove('is-open');
      document.body.style.overflow = '';
    }));
  }

  /* ── Smooth scroll for anchor links ───────────────────────── */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const id = a.getAttribute('href');
        if (id.length <= 1) return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        const offset = 0;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      });
    });
  }

  /* ── Gallery filters + lightbox ───────────────────────────── */
  function initGallery() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const items = document.querySelectorAll('.gallery__item');
    if (!filterBtns.length) return;

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const f = btn.dataset.filter;
        filterBtns.forEach(b => b.classList.toggle('is-active', b === btn));
        items.forEach(it => {
          const matches = f === 'all' || it.dataset.cat === f;
          it.classList.toggle('is-hidden', !matches);
        });
      });
    });

    // Lightbox
    const lightbox = document.querySelector('.lightbox');
    const lbPhoto = document.querySelector('.lightbox__photo');
    const lbName = document.querySelector('.lightbox__caption .name');
    const lbTone = document.querySelector('.lightbox__caption .tone');
    const lbClose = document.querySelector('.lightbox__close');

    function openLightbox(item) {
      if (!lightbox) return;
      const photo = item.querySelector('.gallery__item-photo');
      const name = item.querySelector('.gallery__item-name')?.textContent || '';
      const tone = item.querySelector('.gallery__item-tone')?.textContent || '';
      const img = photo?.style.getPropertyValue('--bg-image');
      if (img) lbPhoto.style.setProperty('--bg-image', img);
      else lbPhoto.style.removeProperty('--bg-image');
      if (lbName) lbName.textContent = name;
      if (lbTone) lbTone.textContent = tone;
      lightbox.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
    function closeLightbox() {
      lightbox?.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    items.forEach(it => it.addEventListener('click', () => openLightbox(it)));
    lbClose?.addEventListener('click', e => { e.stopPropagation(); closeLightbox(); });
    lightbox?.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
  }

  /* ── Booking embed (Calendly inside the left card; right card stays WhatsApp) ─ */
  function initBooking() {
    const embed = document.querySelector('.booking__embed--calendar') || document.querySelector('.booking__embed');
    if (!embed) return;
    if (cfg.calendlyUrl && /^https:\/\/calendly\.com\//.test(cfg.calendlyUrl)) {
      embed.innerHTML = `
        <div class="calendly-inline-widget" data-url="${cfg.calendlyUrl}?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=c9a55c"
             style="min-width:280px;width:100%;height:640px;"></div>`;
      const s = document.createElement('script');
      s.src = 'https://assets.calendly.com/assets/external/widget.js';
      s.async = true;
      document.head.appendChild(s);
    }
  }

  /* ── Contact form (Formspree-ready, mailto fallback) ──────── */
  function initContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;
    const msg = form.querySelector('.form-msg');
    const submit = form.querySelector('.submit');

    function showMsg(text, type) {
      if (!msg) return;
      msg.textContent = text;
      msg.classList.remove('form-msg--success', 'form-msg--error');
      msg.classList.add('is-visible', 'form-msg--' + type);
    }

    form.addEventListener('submit', async e => {
      e.preventDefault();
      submit.disabled = true;
      const data = new FormData(form);

      // Validation
      const required = ['name', 'email'];
      for (const f of required) {
        if (!data.get(f)) {
          showMsg(lang === 'en' ? 'Please fill in your name and email.' : 'Merci de renseigner votre nom et email.', 'error');
          submit.disabled = false;
          return;
        }
      }

      const endpoint = cfg.formspreeEndpoint;
      const isConfigured = endpoint && /^https:\/\/formspree\.io\/f\/[a-z0-9]+/i.test(endpoint);

      if (!isConfigured) {
        // Fallback: build a mailto link with the data
        const subject = encodeURIComponent(lang === 'en' ? 'New appointment request — DAHAB' : 'Nouvelle demande de rendez-vous — DAHAB');
        const lines = [];
        for (const [k, v] of data.entries()) lines.push(`${k}: ${v}`);
        const body = encodeURIComponent(lines.join('\n'));
        window.location.href = `mailto:${cfg.email || ''}?subject=${subject}&body=${body}`;
        showMsg(lang === 'en'
          ? 'Opening your mail client… (Form backend not configured yet)'
          : 'Ouverture de votre messagerie… (Backend du formulaire non configuré)', 'success');
        submit.disabled = false;
        return;
      }

      try {
        const r = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: data
        });
        if (r.ok) {
          form.reset();
          showMsg(lang === 'en'
            ? 'Thank you — your request has been received. We will reply within 48 hours.'
            : 'Merci — votre demande nous est bien parvenue. Réponse sous 48h.', 'success');
        } else {
          throw new Error('formspree-error');
        }
      } catch (err) {
        showMsg(lang === 'en'
          ? 'Sorry, an error occurred. Please email us directly at ' + (cfg.email || '')
          : 'Une erreur est survenue. Merci de nous écrire directement à ' + (cfg.email || ''), 'error');
      } finally {
        submit.disabled = false;
      }
    });
  }

  /* ── Reveal-on-scroll animations ──────────────────────────── */
  function initReveal() {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.classList.add('is-visible');
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  }

  /* ── Set active nav link on scroll ────────────────────────── */
  function initSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__links a, .mobile-drawer a');
    if (!sections.length || !navLinks.length) return;
    const onScroll = () => {
      const y = window.scrollY + 200;
      let current = '';
      sections.forEach(s => {
        if (y >= s.offsetTop) current = s.id;
      });
      navLinks.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === '#' + current));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Hide hero video gracefully if asset missing ──────────── */
  function initHeroVideo() {
    const v = document.querySelector('.hero__video');
    if (!v) return;
    let resolved = false;
    const ok = () => { resolved = true; };
    const fail = () => { if (!resolved) v.style.display = 'none'; };
    v.addEventListener('loadeddata', ok);
    v.addEventListener('canplay', ok);
    v.addEventListener('error', fail);
    // Source-level error (no source loadable)
    Array.from(v.querySelectorAll('source')).forEach(s => s.addEventListener('error', () => {
      // Wait a beat — if no other source resolves, hide
      setTimeout(() => { if (!resolved && v.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) v.style.display = 'none'; }, 80);
    }));
    // Final safety net: if after 1.2s nothing rendered, hide
    setTimeout(() => { if (!resolved && (v.readyState < 2 || v.videoWidth === 0)) v.style.display = 'none'; }, 1200);
  }

  /* ── Init ─────────────────────────────────────────────────── */
  function init() {
    applyConfig();
    initNav();
    initMobileMenu();
    initSmoothScroll();
    initGallery();
    initBooking();
    initContactForm();
    initReveal();
    initSpy();
    initHeroVideo();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

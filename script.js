/* ============================================
   script.js — Portfolio Interactivity
   ============================================ */

'use strict';

// ─── Navbar scroll effect ───────────────────
const navWrapper = document.getElementById('nav-wrapper');

function handleNavScroll() {
  if (window.scrollY > 40) {
    navWrapper.classList.add('scrolled');
  } else {
    navWrapper.classList.remove('scrolled');
  }
}
window.addEventListener('scroll', handleNavScroll, { passive: true });
handleNavScroll();

// ─── Active nav link on scroll ──────────────
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

function updateActiveNav() {
  const scrollPos = window.scrollY + 120;
  sections.forEach(section => {
    const top    = section.offsetTop;
    const bottom = top + section.offsetHeight;
    if (scrollPos >= top && scrollPos < bottom) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + section.id);
      });
    }
  });
}
window.addEventListener('scroll', updateActiveNav, { passive: true });

// ─── Mobile burger menu ─────────────────────
const burger   = document.getElementById('burger');
const navList  = document.getElementById('nav-links');

function toggleMenu() {
  const open = burger.classList.toggle('open');
  navList.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
}

burger.addEventListener('click', toggleMenu);

// Close menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    if (navList.classList.contains('open')) toggleMenu();
  });
});

// ─── Scroll-reveal animation ─────────────────
const animObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger delay for siblings
        const siblings = [...entry.target.parentElement.children];
        const idx = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = `${Math.min(idx * 80, 300)}ms`;
        entry.target.classList.add('visible');
        animObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
);

// Mark elements for animation and observe them
document.querySelectorAll(
  '.project-card, .skill-category, .service-card, .testimonial-card, ' +
  '.highlight-item, .about-image-wrapper, .about-text-col, .hero-stats'
).forEach(el => {
  el.classList.add('animate-in');
  animObserver.observe(el);
});

// ─── Project filter ──────────────────────────
const filterBtns   = document.querySelectorAll('.filter-btn');
const projectCards  = document.querySelectorAll('.project-card');
const projectsGrid  = document.getElementById('projects-grid');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active button
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    projectCards.forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('hidden', !match);
    });

    // Re-layout: remove absolute position from visible cards
    // (hidden cards use position:absolute to collapse space)
    projectsGrid.style.minHeight = '';
  });
});

// ─── Contact form ────────────────────────────
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const submitBtn = document.getElementById('contact-submit');
  const name      = document.getElementById('contact-name').value.trim();
  const email     = document.getElementById('contact-email-input').value.trim();
  const message   = document.getElementById('contact-message').value.trim();

  // Basic validation
  if (!name || !email || !message) {
    showFormFeedback('Пожалуйста, заполните все обязательные поля.', 'error');
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showFormFeedback('Введите корректный email адрес.', 'error');
    return;
  }

  // Simulate sending
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span class="btn-spinner"></span> Отправляем...';

  setTimeout(() => {
    submitBtn.disabled = false;
    submitBtn.innerHTML = `Отправить сообщение <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`;
    contactForm.reset();
    showFormFeedback('✅ Сообщение отправлено! Свяжусь с вами в ближайшее время.', 'success');
  }, 1800);
});

function showFormFeedback(text, type) {
  // Remove any existing
  const old = contactForm.querySelector('.form-feedback');
  if (old) old.remove();

  const el = document.createElement('p');
  el.className = `form-feedback form-feedback--${type}`;
  el.textContent = text;
  el.style.cssText = `
    font-size: 0.875rem;
    text-align: center;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    animation: fade-in 0.3s ease;
    ${type === 'success'
      ? 'color: #34d399; background: rgba(52,211,153,0.08); border: 1px solid rgba(52,211,153,0.2);'
      : 'color: #f87171; background: rgba(248,113,113,0.08); border: 1px solid rgba(248,113,113,0.2);'}
  `;
  contactForm.appendChild(el);

  // Auto-remove after 5s
  setTimeout(() => el.remove(), 5000);
}

// ─── Footer year ─────────────────────────────
const yearEl = document.getElementById('current-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ─── Smooth scroll for anchor links ──────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80; // nav height
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ─── Cursor glow effect (desktop only) ───────
if (window.matchMedia('(pointer: fine)').matches) {
  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(108,99,255,0.06) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    transition: left 0.3s ease, top 0.3s ease;
    will-change: left, top;
  `;
  document.body.appendChild(glow);

  let mouseX = 0, mouseY = 0;
  let rafId;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!rafId) {
      rafId = requestAnimationFrame(() => {
        glow.style.left = mouseX + 'px';
        glow.style.top = mouseY + 'px';
        rafId = null;
      });
    }
  });
}

// ─── Typewriter effect on hero title ─────────
// (Optional: uncomment if you want animated typing)
/*
function typewrite(el, text, speed = 60) {
  el.textContent = '';
  let i = 0;
  const interval = setInterval(() => {
    el.textContent += text[i++];
    if (i >= text.length) clearInterval(interval);
  }, speed);
}
*/

console.log('%c🚀 Portfolio loaded!', 'color: #6c63ff; font-size: 14px; font-weight: bold;');

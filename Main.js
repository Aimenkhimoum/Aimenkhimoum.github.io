/* 
   PORTFOLIO — Aimen Mohamed Khimoum
   main.js
    */

/* ── Custom cursor ── */
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

(function animateCursor() {
  cursor.style.transform = `translate(${mx - 6}px, ${my - 6}px)`;
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
  requestAnimationFrame(animateCursor);
})();

document.querySelectorAll('a, button, .skill-card, .project-card, .cert-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    ring.style.width       = '56px';
    ring.style.height      = '56px';
    ring.style.borderColor = 'rgba(0,212,255,0.7)';
  });
  el.addEventListener('mouseleave', () => {
    ring.style.width       = '36px';
    ring.style.height      = '36px';
    ring.style.borderColor = 'rgba(0,212,255,0.4)';
  });
});

/* ── Typed text ── */
const phrases = [
  'Security Researcher',
  'Network Engineer',
  'CTF Player',
  'IPS/Firewall Builder',
  'Python Developer',
  'Linux Enthusiast'
];
let pi = 0, ci = 0, deleting = false;
const typedEl = document.getElementById('typed-text');

function type() {
  const word = phrases[pi];
  if (!deleting) {
    typedEl.textContent = word.slice(0, ++ci);
    if (ci === word.length) {
      deleting = true;
      setTimeout(type, 1800);
      return;
    }
  } else {
    typedEl.textContent = word.slice(0, --ci);
    if (ci === 0) {
      deleting = false;
      pi = (pi + 1) % phrases.length;
      setTimeout(type, 300);
      return;
    }
  }
  setTimeout(type, deleting ? 50 : 90);
}
type();

/* ── Scroll reveal ── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── Counter animation ── */
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.querySelectorAll('[data-target]').forEach(el => {
      const target = +el.dataset.target;
      let count = 0;
      const inc = () => {
        count = Math.min(count + 1, target);
        el.textContent = count;
        if (count < target) setTimeout(inc, 120);
      };
      inc();
    });
    counterObserver.unobserve(entry.target);
  });
}, { threshold: 0.3 });

document.querySelectorAll('.stats-row').forEach(el => counterObserver.observe(el));

/* ── Formspree contact form ── */
const form    = document.getElementById('contactForm');
const sendBtn = document.getElementById('sendBtn');

form.addEventListener('submit', async function(e) {
  e.preventDefault();
  sendBtn.textContent = '// Envoi en cours...';
  sendBtn.disabled    = true;

  try {
    const res = await fetch(form.action, {
      method:  'POST',
      body:    new FormData(form),
      headers: { 'Accept': 'application/json' }
    });

    if (res.ok) {
      sendBtn.textContent       = '// Message envoyé ✓';
      sendBtn.style.background  = 'var(--accent2)';
      form.reset();
      setTimeout(() => {
        sendBtn.textContent      = '// Envoyer le message →';
        sendBtn.style.background = 'var(--accent)';
        sendBtn.disabled         = false;
      }, 4000);
    } else {
      throw new Error('Server error');
    }
  } catch {
    sendBtn.textContent       = '// Erreur — réessaie';
    sendBtn.style.background  = 'var(--accent3)';
    setTimeout(() => {
      sendBtn.textContent      = '// Envoyer le message →';
      sendBtn.style.background = 'var(--accent)';
      sendBtn.disabled         = false;
    }, 3000);
  }
});

/* ── Nav active link on scroll ── */
const navSections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  let current = '';
  navSections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--accent)' : '';
  });
});

/* =========================================
   TITOKA CHISHI — CYBER PORTFOLIO
   script.js
   ========================================= */

'use strict';

// ─── TYPING ANIMATION ─────────────────────
const phrases = [
  'Full-Stack Web Developer',
  'UI/UX Enthusiast',
  'Open Source Contributor',
  'Code Architect',
  'Problem Solver'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingEl = document.getElementById('typing');

function type() {
  const current = phrases[phraseIndex];
  if (isDeleting) {
    typingEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 50 : 90;

  if (!isDeleting && charIndex === current.length) {
    speed = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    speed = 300;
  }

  setTimeout(type, speed);
}

type();


// ─── NAVBAR SCROLL EFFECT ─────────────────
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});


// ─── SCROLL REVEAL ────────────────────────
const revealEls = document.querySelectorAll(
  '.about-grid, .skills-grid .skill-category, .project-card, .timeline-item, .contact-grid'
);

revealEls.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 80 * i);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));


// ─── SKILL BAR ANIMATION ──────────────────
const barFills = document.querySelectorAll('.bar-fill');

const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      const width = bar.getAttribute('data-width');
      bar.style.width = width + '%';
      barObserver.unobserve(bar);
    }
  });
}, { threshold: 0.5 });

barFills.forEach(bar => barObserver.observe(bar));


// ─── COUNTER ANIMATION ────────────────────
const statNums = document.querySelectorAll('.stat-num');

function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'), 10);
  const duration = 1800;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target + '+';
  }

  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.7 });

statNums.forEach(num => counterObserver.observe(num));


// ─── ACTIVE NAV LINK ──────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        link.style.textShadow = '';
      });
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) {
        active.style.color = 'transparent';
      }
    }
  });
}, { threshold: 0.4 });

sections.forEach(sec => sectionObserver.observe(sec));


// ─── CONTACT FORM ─────────────────────────
const form = document.getElementById('contactForm');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"] span');
  const original = btn.textContent;

  btn.textContent = 'TRANSMITTING...';
  form.querySelector('button').disabled = true;

  setTimeout(() => {
    btn.textContent = '✔ MESSAGE SENT';
    form.querySelector('button').style.background = 'var(--green)';
    setTimeout(() => {
      btn.textContent = original;
      form.querySelector('button').disabled = false;
      form.querySelector('button').style.background = '';
      form.reset();
    }, 3000);
  }, 1500);
});


// ─── CURSOR GLOW ──────────────────────────
const cursor = document.createElement('div');
cursor.style.cssText = `
  position: fixed; width: 300px; height: 300px;
  border-radius: 50%; pointer-events: none; z-index: 9999;
  background: radial-gradient(circle, rgba(0,245,255,.04) 0%, transparent 70%);
  transform: translate(-50%, -50%);
  transition: left .12s ease, top .12s ease;
`;
document.body.appendChild(cursor);

window.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
});


// ─── GLITCH TRIGGER ON HOVER ──────────────
const glitchName = document.getElementById('glitch-name');

glitchName.addEventListener('mouseenter', () => {
  glitchName.style.animation = 'none';
  glitchName.offsetHeight; // force reflow
  glitchName.style.animation = '';
});


// ─── CYBER RANDOM CHAR FLICKER ────────────
const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ!@#$%^&*';

function randomChar() {
  return chars[Math.floor(Math.random() * chars.length)];
}

function flickerText(element, finalText, duration = 800) {
  let elapsed = 0;
  const interval = 40;
  const timer = setInterval(() => {
    elapsed += interval;
    const progress = elapsed / duration;
    let result = '';
    for (let i = 0; i < finalText.length; i++) {
      if (finalText[i] === ' ') {
        result += ' ';
      } else if (i / finalText.length < progress) {
        result += finalText[i];
      } else {
        result += randomChar();
      }
    }
    element.textContent = result;
    if (elapsed >= duration) {
      clearInterval(timer);
      element.textContent = finalText;
    }
  }, interval);
}

// Apply flicker on section title hover
document.querySelectorAll('.section-title').forEach(el => {
  const original = el.textContent;
  el.addEventListener('mouseenter', () => flickerText(el, original, 600));
});


// ─── PROJECT CARD MOUSE TILT ──────────────
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `translateY(-4px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
    card.style.perspective = '800px';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
  });
});


// ─── CONSOLE EASTER EGG ───────────────────
console.log(
  '%c[ TITOKA CHISHI | WEB DEVELOPER ]\n%c> System initialized.\n> All subsystems nominal.\n> Thanks for inspecting the code 🖤',
  'color:#00f5ff;font-family:monospace;font-size:14px;font-weight:bold;',
  'color:#00ff88;font-family:monospace;font-size:12px;'
);
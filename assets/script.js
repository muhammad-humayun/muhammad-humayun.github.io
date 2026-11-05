/* Muhammad Humayun — portfolio behaviour (v3) */
(function () {
const root = document.documentElement;
const KEY = 'mh-theme';

// Theme: saved → light (default)
function applyTheme(t) {
root.setAttribute('data-theme', t);
const btn = document.getElementById('themeToggle');
if (btn) {
btn.setAttribute('aria-label', t === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
btn.innerHTML = t === 'dark' ? SUN : MOON;
}
}
const SUN = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
const MOON = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';
let saved = null;
try { saved = localStorage.getItem(KEY); } catch (e) {}
applyTheme(saved || 'light');

document.addEventListener('DOMContentLoaded', function () {
const toggle = document.getElementById('themeToggle');
applyTheme(root.getAttribute('data-theme'));
if (toggle) toggle.addEventListener('click', function () {
const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
applyTheme(next);
try { localStorage.setItem(KEY, next); } catch (e) {}
});

// Mobile menu
const burger = document.getElementById('burger');
const menu = document.getElementById('menu');
if (burger && menu) {
burger.addEventListener('click', function () {
const open = menu.classList.toggle('open');
burger.setAttribute('aria-expanded', String(open));
});
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));
}

// Scroll reveal
const io = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.12 }) : null;
document.querySelectorAll('.reveal').forEach(el => io ? io.observe(el) : el.classList.add('in'));

// Active nav link + back-to-top
const links = [...document.querySelectorAll('.menu a[href^="#"]')];
const sections = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
const toTop = document.getElementById('toTop');
function onScroll() {
const y = window.scrollY + 120;
let current = sections[0];
sections.forEach(s => { if (s.offsetTop <= y) current = s; });
links.forEach(a => a.classList.toggle('active', current && a.getAttribute('href') === '#' + current.id));
if (toTop) toTop.classList.toggle('show', window.scrollY > 600);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();
if (toTop) toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Contact form → opens the visitor's mail client with the message pre-filled (no backend needed)
const form = document.getElementById('contactForm');
if (form) form.addEventListener('submit', function (ev) {
ev.preventDefault();
const d = new FormData(form);
const subject = encodeURIComponent('Portfolio contact from ' + (d.get('name') || 'visitor'));
const body = encodeURIComponent((d.get('message') || '') + '\n\n— ' + (d.get('name') || '') + ' <' + (d.get('email') || '') + '>');
window.location.href = 'mailto:humayunmuhammad902@gmail.com?subject=' + subject + '&body=' + body;
});

// Count-up stats
const counters = document.querySelectorAll('[data-count]');
const cio = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
entries.forEach(e => {
if (!e.isIntersecting) return;
const el = e.target, target = parseInt(el.dataset.count, 10), suffix = el.dataset.suffix || '';
const start = performance.now(), dur = 1200;
(function tick(now) {
const p = Math.min(1, (now - start) / dur), v = Math.round(target * (1 - Math.pow(1 - p, 3)));
el.textContent = v + suffix;
if (p < 1) requestAnimationFrame(tick);
})(start);
cio.unobserve(el);
});
}, { threshold: 0.5 }) : null;
counters.forEach(el => cio ? cio.observe(el) : (el.textContent = el.dataset.count + (el.dataset.suffix || '')));

const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();
});
})();

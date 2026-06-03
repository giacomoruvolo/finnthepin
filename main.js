// ===== Finn the Pin — interactions =====

// Always start at the top on reload (disable browser scroll restoration)
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
function scrollToTop() {
  if (window.location.hash) {
    history.replaceState(null, '', window.location.pathname + window.location.search);
  }
  window.scrollTo(0, 0);
}
scrollToTop();
window.addEventListener('beforeunload', () => window.scrollTo(0, 0));
window.addEventListener('pageshow', scrollToTop);

// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Nav background on scroll
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 24);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Mobile menu
const burger = document.getElementById('burger');
const links = document.querySelector('.nav__links');
burger.addEventListener('click', () => {
  const open = links.classList.toggle('is-open');
  burger.setAttribute('aria-expanded', String(open));
});
links.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    links.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
  })
);

// Scroll reveal
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('is-visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

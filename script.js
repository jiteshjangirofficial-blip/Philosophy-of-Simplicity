const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;

const darkModeClass = 'dark-mode';

function setTheme(isDark) {
  if (isDark) {
    document.body.classList.add(darkModeClass);
    themeToggle.textContent = '☀️';
    themeToggle.setAttribute('aria-label', 'Switch to light mode');
  } else {
    document.body.classList.remove(darkModeClass);
    themeToggle.textContent = '🌙';
    themeToggle.setAttribute('aria-label', 'Switch to dark mode');
  }
}

function loadTheme() {
  const stored = localStorage.getItem('saralta-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (stored === 'dark' || (!stored && prefersDark)) {
    setTheme(true);
  } else {
    setTheme(false);
  }
}

themeToggle.addEventListener('click', () => {
  const isDark = document.body.classList.toggle(darkModeClass);
  setTheme(isDark);
  localStorage.setItem('saralta-theme', isDark ? 'dark' : 'light');
});

window.addEventListener('DOMContentLoaded', () => {
  loadTheme();

  const internalLinks = document.querySelectorAll('a[href^="#"]');
  internalLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#') && targetId.length > 1) {
        const target = document.querySelector(targetId);
        if (target) {
          event.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
});

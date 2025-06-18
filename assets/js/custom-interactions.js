```javascript
// custom-interactions.js

// Hamburger Menu Toggle
const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-list');

if (navToggle && navList) {
  navToggle.addEventListener('click', () => {
    const isHidden = navList.classList.toggle('hidden');
    navToggle.setAttribute('aria-expanded', !isHidden);
    navToggle.textContent = isHidden ? '☰' : '✕';
    navToggle.focus(); // Keep focus on toggle for accessibility
  });

  // Close menu when a nav link is clicked
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navList.classList.add('hidden');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.textContent = '☰';
    });
  });

  // Focus trap for navigation
  const focusableElements = navList.querySelectorAll('a, button');
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  navList.addEventListener('keydown', e => {
    if (e.key === 'Tab' && !navList.classList.contains('hidden')) {
      if (e.shiftKey && document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable.focus();
      } else if (!e.shiftKey && document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable.focus();
      }
    }
  });
}

// Theme Toggle
const themeToggle = document.querySelector('#theme-toggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeToggle.setAttribute('aria-label', `Toggle ${isDark ? 'light' : 'dark'} mode`);
    themeToggle.textContent = isDark ? '☀️' : '🌙';
  });

  // Apply saved theme or system preference
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.body.classList.add('dark');
    themeToggle.setAttribute('aria-label', 'Toggle light mode');
    themeToggle.textContent = '☀️';
  }
}

// Fade-In Animations
const fadeElements = document.querySelectorAll('.fade-in');
const observerOptions = {
  root: null,
  threshold: 0.15,
  rootMargin: '0px',
};

const fadeObserver = new IntersectionObserver((entries, observer) => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    entries.forEach(entry => {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
    return;
  }

  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

fadeElements.forEach(element => {
  fadeObserver.observe(element);
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const targetId = anchor.getAttribute('href').substring(1);
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Scroll Progress Indicator
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  progressBar.style.width = `${progress}%`;
});

// Lazy Load Images (for future use)
const lazyImages = document.querySelectorAll('img[loading="lazy"]');
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src || img.src;
      observer.unobserve(img);
    }
  });
});

lazyImages.forEach(img => imageObserver.observe(img));
```
navList.addEventListener('keydown', (e) => {
  const focusableElements = navList.querySelectorAll('a, button');
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  if (e.key === 'Escape') {
    navList.classList.add('hidden');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.textContent = '☰';
    navToggle.focus();
  }

  if (e.key === 'Tab') {
    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  }
});

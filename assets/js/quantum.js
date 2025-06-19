/**
 * Astrotrias Archon - Quantum Core
 * Simplified Cosmic Interaction Engine
 * Version: 2.1.0
 */

class CosmicEngine {
  constructor() {
    this.state = {
      theme: 'dark',
      particlesActive: true,
      cosmicEnergy: 100
    };
    this.init();
  }

  // Core Initialization
  init() {
    this.setupThemeSystem();
    this.setupParticles();
    this.setupDynamicElements();
    this.setupAccessibility();
    console.log('✨ Cosmic Engine Activated');
  }

  // Theme System
  setupThemeSystem() {
    const savedTheme = localStorage.getItem('cosmic-theme') || 'dark';
    this.setTheme(savedTheme);

    document.getElementById('themeToggle')?.addEventListener('click', () => {
      this.toggleTheme();
    });
  }

  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('cosmic-theme', theme);
    this.state.theme = theme;
  }

  toggleTheme() {
    const newTheme = this.state.theme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
    this.createThemeTransition();
  }

  createThemeTransition() {
    const overlay = document.createElement('div');
    overlay.className = 'cosmic-transition';
    overlay.style.cssText = `
      position: fixed;
      inset: 0;
      background: radial-gradient(circle, var(--cosmic-accent) 0%, transparent 70%);
      z-index: 9999;
      opacity: 0;
      animation: cosmicFade 0.5s ease;
      pointer-events: none;
    `;
    
    document.body.appendChild(overlay);
    setTimeout(() => overlay.remove(), 500);
  }

  // Particle System
  setupParticles() {
    const container = document.getElementById('particles-js');
    if (!container || !window.particlesJS) return;

    particlesJS('particles-js', {
      particles: {
        number: { value: this.getParticleCount() },
        color: { value: ['#7c3aed', '#a855f7', '#06b6d4'] },
        line_linked: { enable: true, color: '#7c3aed', opacity: 0.3 }
      },
      interactivity: {
        events: {
          onhover: { enable: true, mode: 'repulse' }
        }
      }
    });
  }

  getParticleCount() {
    if (window.innerWidth < 768) return 30;
    return 80;
  }

  // Dynamic Elements
  setupDynamicElements() {
    this.animateCards();
    this.animateSkills();
    this.setupScrollEffects();
  }

  animateCards() {
    const cards = document.querySelectorAll('.dimensional-card');
    
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.boxShadow = '0 20px 40px var(--cosmic-shadow)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.boxShadow = '';
      });
    });
  }

  animateSkills() {
    const skills = document.querySelectorAll('.cosmic-skill');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target.querySelector('.skill-bar');
          if (bar) {
            const width = bar.dataset.width || '80%';
            bar.style.width = width;
          }
        }
      });
    }, { threshold: 0.5 });

    skills.forEach(skill => observer.observe(skill));
  }

  setupScrollEffects() {
    window.addEventListener('scroll', () => {
      const nav = document.querySelector('.quantum-nav');
      nav?.classList.toggle('scrolled', window.scrollY > 100);
    });
  }

  // Accessibility
  setupAccessibility() {
    this.addSkipLink();
    this.enhanceFocus();
  }

  addSkipLink() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Skip to content';
    skipLink.className = 'skip-link';
    document.body.prepend(skipLink);
  }

  enhanceFocus() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
      }
    });
    
    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-nav');
    });
  }
}

// Initialize when ready
document.addEventListener('DOMContentLoaded', () => {
  window.CosmicEngine = new CosmicEngine();
});

// Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js');
  });
}

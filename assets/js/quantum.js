/**
 * Astrotrias Archon - Quantum JavaScript Engine
 * Multidimensional Creative Technologist Interface
 * Author: Thanatsitt Santisamranwilai
 * Version: 2.0.0 - Quantum Enhanced
 */


class CosmicInterface {
  constructor() {
    this.cosmicState = {
      dimensionalShift: false,
      cosmicEnergy: 100,
      stellarEvents: [],
    };
    this.quantumParticles = null;
    this.dimensionalPortal = null;
  }

  initializeParticles(particleConfig) {
    try {
      particlesJS('particles-js', particleConfig);
      this.quantumParticles = window.pJSDom[0].pJS;
      console.log('✨ Quantum Particles Initialized');
    } catch (error) {
      console.warn('⚠️ Particles.js failed to initialize:', error);
    }
  }

  getOptimalParticleCount() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const area = width * height;
    const devicePixelRatio = window.devicePixelRatio || 1;

    if (width < 768) return 30;
    if (devicePixelRatio > 1.5) return 50;
    if (area > 2000000) return 100;
    return 80;
  }

  initializeDimensionalPortal() {
    // your existing implementation
  }

  activateDimensionalShift() {
    // your existing implementation
  }

  initializeStellarTimeline() {
    // your existing implementation
  }

  observeTimelineEvents() {
    // your existing implementation
  }

  animateStellarEvent(element) {
    // your existing implementation
  }

  initializeCosmicSkills() {
    // your existing implementation
  }

  animateSkillConstellation(skillElement) {
    // your existing implementation
  }

  getSkillWidth(skillName) {
    // your existing implementation
  }

  createSkillParticleBurst(element) {
    // your existing implementation
  }

  initializeDimensionalCards() {
    // your existing implementation
  }

  createCardAura(card) {
    // your existing implementation
  }

  removeCardAura(card) {
    // your existing implementation
  }

  activateCardDimension(card) {
    // your existing implementation
  }

  /**
   * Enhance Quantum Navigation
   */
  enhanceQuantumNavigation() {
    // For example: smooth scrolling with cosmic easing and keypress support

    // Smooth scroll links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth' });
          this.dispatchCosmicEvent('navigation:scroll', { targetId });
        }
      });
    });

    // Keyboard navigation: arrow keys scroll by viewport height
    window.addEventListener('keydown', e => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) return;
      let scrollAmount = window.innerHeight * 0.8;
      if (e.key === 'ArrowDown') {
        window.scrollBy({ top: scrollAmount, behavior: 'smooth' });
        e.preventDefault();
      } else if (e.key === 'ArrowUp') {
        window.scrollBy({ top: -scrollAmount, behavior: 'smooth' });
        e.preventDefault();
      }
    });
  }

  /**
   * Play Cosmic Sound
   */
  playCosmicSound(name) {
    // Minimal example: play a sound from predefined sources
    const sounds = {
      hover: '/sounds/hover.wav',
      activate: '/sounds/activate.wav',
    };

    const soundSrc = sounds[name];
    if (!soundSrc) return;

    const audio = new Audio(soundSrc);
    audio.volume = 0.2;
    audio.play().catch(() => {
      // Handle promise rejection silently (e.g. autoplay disabled)
    });
  }

  /**
   * Dispatch Cosmic Custom Event
   */
  dispatchCosmicEvent(name, detail = {}) {
    const event = new CustomEvent(name, { detail });
    window.dispatchEvent(event);
  }
}


class AstrotriasQuantumEngine {
  constructor() {
    this.isInitialized = false;
    this.cosmicState = {
      theme: 'dark',
      particlesActive: true,
      dimensionalShift: false,
      quantumEntanglement: new Map(),
      stellarEvents: [],
      cosmicEnergy: 100
    };
    
    this.observers = {
      intersection: null,
      mutation: null,
      resize: null
    };
    
    this.animations = new Map();
    this.quantumParticles = null;
    this.dimensionalPortal = null;
    
    // Performance monitoring
    this.performanceMetrics = {
      initTime: 0,
      renderTime: 0,
      interactionCount: 0,
      lastFrameTime: 0
    };
    
    // Bind methods
    this.init = this.init.bind(this);
    this.handleScroll = this.throttle(this.handleScroll.bind(this), 16);
    this.handleResize = this.debounce(this.handleResize.bind(this), 250);
    
    console.log('🚀 Astrotrias Quantum Engine Initializing...');
  }

  /**
   * Initialize the Quantum Engine
   */
  async init() {
    const startTime = performance.now();
    
    try {
      // Check if DOM is ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this.init());
        return;
      }

      // Initialize core systems
      await this.initializeCoreSystems();
      await this.initializeCosmicFeatures();
      await this.initializeInteractions();
      await this.initializeObservers();
      
      // Start quantum loops
      this.startQuantumLoop();
      this.startCosmicHeartbeat();
      
      this.performanceMetrics.initTime = performance.now() - startTime;
      this.isInitialized = true;
      
      console.log(`✨ Quantum Engine Initialized in ${this.performanceMetrics.initTime.toFixed(2)}ms`);
      this.dispatchCosmicEvent('quantum:initialized', { metrics: this.performanceMetrics });
      
    } catch (error) {
      console.error('❌ Quantum Engine Initialization Failed:', error);
      this.handleQuantumError(error);
    }
  }

  /**
   * Initialize Core Systems
   */
  async initializeCoreSystems() {
    // Theme System
    this.initializeThemeSystem();
    
    // Navigation Enhancement
    this.enhanceQuantumNavigation();
    
    // Form Quantum Enhancement
    this.enhanceQuantumForms();
    
    // Accessibility Features
    this.initializeAccessibilityFeatures();
    
    // Performance Monitoring
    this.initializePerformanceMonitoring();
  }

  /**
   * Initialize Cosmic Features
   */
  async initializeCosmicFeatures() {
    // Particle System
    await this.initializeParticleSystem();
    
    // Dimensional Portal
    this.initializeDimensionalPortal();
    
    // Stellar Timeline
    this.initializeStellarTimeline();
    
    // Cosmic Skills Animation
    this.initializeCosmicSkills();
    
    // Dimensional Cards
    this.initializeDimensionalCards();
    
    // Quantum Loading States
    this.initializeQuantumLoading();
  }

  /**
   * Theme System with Cosmic Transitions
   */
  initializeThemeSystem() {
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('astrotrias-theme') || 'dark';
    
    // Set initial theme
    this.setCosmicTheme(savedTheme);
    
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setCosmicTheme(newTheme, true);
      });
    }
  }

  /**
   * Set Cosmic Theme with Smooth Transition
   */
  setCosmicTheme(theme, animate = false) {
    if (animate) {
      document.body.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
      
      // Create cosmic transition effect
      this.createCosmicTransition();
    }
    
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('astrotrias-theme', theme);
    this.cosmicState.theme = theme;
    
    // Update theme toggle icon
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
      const icon = themeToggle.querySelector('i');
      if (icon) {
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
      }
    }
    
    // Dispatch theme change event
    this.dispatchCosmicEvent('theme:changed', { theme });
    
    if (animate) {
      setTimeout(() => {
        document.body.style.transition = '';
      }, 500);
    }
  }

  /**
   * Create Cosmic Transition Effect
   */
  createCosmicTransition() {
    const overlay = document.createElement('div');
    overlay.className = 'cosmic-transition-overlay';
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle, rgba(124, 58, 237, 0.3) 0%, transparent 70%);
      z-index: 9999;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(overlay);
    
    // Animate transition
    requestAnimationFrame(() => {
      overlay.style.opacity = '1';
      setTimeout(() => {
        overlay.style.opacity = '0';
        setTimeout(() => overlay.remove(), 300);
      }, 200);
    });
  }

  /**
   * Initialize Particle System
   */
  async initializeParticleSystem() {
    const particlesContainer = document.getElementById('particles-js');
    if (!particlesContainer || !window.particlesJS) return;

    const particleConfig = {
      particles: {
        number: {
          value: this.getOptimalParticleCount(),
          density: { enable: true, value_area: 800 }
        },
        color: { value: ['#7c3aed', '#a855f7', '#06b6d4'] },
        shape: {
          type: 'circle',
          stroke: { width: 0, color: '#000000' }
        },
        opacity: {
          value: 0.5,
          random: true,
          anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
        },
        size: {
          value: 3,
          random: true,
          anim: { enable: true, speed: 2, size_min: 0.1, sync: false }
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: '#7c3aed',
          opacity: 0.2,
          width: 1
        },
        move: {
          enable: true,
          speed: 1,
          direction: 'none',
          random: false,
          straight: false,
          out_mode: 'out',
          bounce: false,
          attract: { enable: false, rotateX: 600, rotateY: 1200 }
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: { enable: true, mode: 'repulse' },
          onclick: { enable: true, mode: 'push' },
          resize: true
        },
        modes: {
          grab: { distance: 140, line_linked: { opacity: 1 } },
          bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
          repulse: { distance: 100, duration: 0.4 },
          push: { particles_nb: 4 },
          remove: { particles_nb: 2 }
        }
      },
      retina_detect: true
    };

    // Initialize particles with error handling
    try {
      particlesJS('particles-js', particleConfig);
      this.quantumParticles = window.pJSDom[0].pJS;
      console.log('✨ Quantum Particles Initialized');
    } catch (error) {
      console.warn('⚠️ Particles.js failed to initialize:', error);
    }
  }

  /**
   * Get Optimal Particle Count Based on Device Performance
   */
  getOptimalParticleCount() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const area = width * height;
    const devicePixelRatio = window.devicePixelRatio || 1;
    
    // Reduce particles on mobile and high-DPI displays
    if (width < 768) return 30;
    if (devicePixelRatio > 1.5) return 50;
    if (area > 2000000) return 100;
    return 80;
  }

  /**
   * Initialize Dimensional Portal
   */
  initializeDimensionalPortal() {
    const portal = document.querySelector('.dimensional-portal');
    if (!portal) return;

    let portalEnergy = 0;
    
    const animatePortal = () => {
      portalEnergy += 0.02;
      const intensity = Math.sin(portalEnergy) * 0.5 + 0.5;
      
      portal.style.boxShadow = `
        0 0 ${50 + intensity * 30}px rgba(124, 58, 237, ${0.6 + intensity * 0.4}),
        inset 0 0 ${50 + intensity * 20}px rgba(124, 58, 237, ${0.2 + intensity * 0.3})
      `;
      
      requestAnimationFrame(animatePortal);
    };
    
    animatePortal();
    this.dimensionalPortal = portal;
    
    // Add interaction
    portal.addEventListener('click', () => {
      this.activateDimensionalShift();
    });
  }

  /**
   * Activate Dimensional Shift Effect
   */
  activateDimensionalShift() {
    if (this.cosmicState.dimensionalShift) return;
    
    this.cosmicState.dimensionalShift = true;
    document.body.classList.add('dimensional-shift');
    
    // Create ripple effect
    const ripple = document.createElement('div');
    ripple.className = 'dimensional-ripple';
    ripple.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      border: 2px solid rgba(124, 58, 237, 0.8);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      z-index: 9998;
      pointer-events: none;
      animation: dimensionalRipple 2s ease-out forwards;
    `;
    
    document.body.appendChild(ripple);
    
    // Add CSS animation
    if (!document.getElementById('dimensional-styles')) {
      const style = document.createElement('style');
      style.id = 'dimensional-styles';
      style.textContent = `
        @keyframes dimensionalRipple {
          to {
            width: 200vmax;
            height: 200vmax;
            opacity: 0;
          }
        }
        .dimensional-shift {
          filter: hue-rotate(45deg) brightness(1.1);
          transition: filter 2s ease;
        }
      `;
      document.head.appendChild(style);
    }
    
    setTimeout(() => {
      ripple.remove();
      document.body.classList.remove('dimensional-shift');
      this.cosmicState.dimensionalShift = false;
    }, 2000);
    
    this.dispatchCosmicEvent('dimensional:shift', { energy: this.cosmicState.cosmicEnergy });
  }

  /**
   * Initialize Stellar Timeline
   */
  initializeStellarTimeline() {
    const timelineEvents = document.querySelectorAll('.stellar-event');
    if (!timelineEvents.length) return;

    timelineEvents.forEach((event, index) => {
      this.cosmicState.stellarEvents.push({
        element: event,
        index,
        animated: false
      });
    });

    // Animate timeline events on scroll
    this.observeTimelineEvents();
  }

  /**
   * Observe Timeline Events for Animation
   */
  observeTimelineEvents() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const event = this.cosmicState.stellarEvents.find(
            e => e.element === entry.target
          );
          
          if (event && !event.animated) {
            setTimeout(() => {
              entry.target.classList.add('animate');
              event.animated = true;
              this.animateStellarEvent(entry.target);
            }, event.index * 200);
          }
        }
      });
    }, { threshold: 0.3 });

    this.cosmicState.stellarEvents.forEach(event => {
      observer.observe(event.element);
    });
  }

  /**
   * Animate Stellar Event
   */
  animateStellarEvent(element) {
    const content = element.querySelector('.stellar-content');
    if (!content) return;

    // Add cosmic glow effect
    content.style.animation = 'stellarGlow 0.8s ease-out';
    
    // Add CSS if not exists
    if (!document.getElementById('stellar-styles')) {
      const style = document.createElement('style');
      style.id = 'stellar-styles';
      style.textContent = `
        @keyframes stellarGlow {
          0% { box-shadow: 0 10px 30px var(--cosmic-shadow); }
          50% { box-shadow: 0 20px 60px rgba(124, 58, 237, 0.6); }
          100% { box-shadow: 0 10px 30px var(--cosmic-shadow); }
        }
      `;
      document.head.appendChild(style);
    }
  }

  /**
   * Initialize Cosmic Skills
   */
  initializeCosmicSkills() {
    const skills = document.querySelectorAll('.cosmic-skill');
    if (!skills.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateSkillConstellation(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    skills.forEach(skill => observer.observe(skill));
  }

  /**
   * Animate Skill Constellation
   */
  animateSkillConstellation(skillElement) {
    const constellation = skillElement.querySelector('.skill-constellation');
    if (!constellation) return;

    const skillName = skillElement.querySelector('h6')?.textContent || '';
    const skillWidth = this.getSkillWidth(skillName);
    
    constellation.style.setProperty('--skill-width', `${skillWidth}%`);
    constellation.classList.add('animate');
    
    // Add particle burst effect
    this.createSkillParticleBurst(constellation);
  }

  /**
   * Get Skill Width Based on Skill Name
   */
  getSkillWidth(skillName) {
    const skillLevels = {
      'JavaScript': 95,
      'TypeScript': 90,
      'React': 92,
      'Node.js': 88,
      'Python': 85,
      'AI/ML': 80,
      'Blockchain': 75,
      'WebGL': 70,
      'Three.js': 85,
      'GSAP': 90,
      'Docker': 80,
      'AWS': 75,
      'GraphQL': 85,
      'MongoDB': 80,
      'PostgreSQL': 85,
      'Redis': 75,
      'Kubernetes': 70,
      'Microservices': 80,
      'DevOps': 75,
      'UI/UX Design': 88
    };
    
    return skillLevels[skillName] || 70;
  }

  /**
   * Create Skill Particle Burst
   */
  createSkillParticleBurst(element) {
    const rect = element.getBoundingClientRect();
    const particles = 12;
    
    for (let i = 0; i < particles; i++) {
      const particle = document.createElement('div');
      particle.className = 'skill-particle';
      particle.style.cssText = `
        position: fixed;
        left: ${rect.left + rect.width * Math.random()}px;
        top: ${rect.top + rect.height / 2}px;
        width: 4px;
        height: 4px;
        background: rgba(124, 58, 237, 0.8);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        animation: skillParticleBurst 1s ease-out forwards;
      `;
      
      document.body.appendChild(particle);
      
      setTimeout(() => particle.remove(), 1000);
    }
    
    // Add CSS animation if not exists
    if (!document.getElementById('skill-particle-styles')) {
      const style = document.createElement('style');
      style.id = 'skill-particle-styles';
      style.textContent = `
        @keyframes skillParticleBurst {
          0% {
            transform: scale(1) translate(0, 0);
            opacity: 1;
          }
          100% {
            transform: scale(0) translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }

  /**
   * Initialize Dimensional Cards
   */
  initializeDimensionalCards() {
    const cards = document.querySelectorAll('.dimensional-card');
    if (!cards.length) return;

    cards.forEach((card, index) => {
      // Add hover sound effect (if audio is enabled)
      card.addEventListener('mouseenter', () => {
        this.playCosmicSound('hover');
        this.createCardAura(card);
      });
      
      card.addEventListener('mouseleave', () => {
        this.removeCardAura(card);
      });
      
      // Add click interaction
      card.addEventListener('click', (e) => {
        if (!e.target.closest('a')) {
          this.activateCardDimension(card);
        }
      });
      
      // Add keyboard navigation
      card.setAttribute('tabindex', '0');
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.activateCardDimension(card);
        }
      });
    });
  }

  /**
   * Create Card Aura Effect
   */
  createCardAura(card) {
    const aura = document.createElement('div');
    aura.className = 'card-aura';
    aura.style.cssText = `
      position: absolute;
      top: -10px;
      left: -10px;
      right: -10px;
      bottom: -10px;
      background: linear-gradient(45deg, rgba(124, 58, 237, 0.3), rgba(168, 85, 247, 0.3));
      border-radius: 25px;
      z-index: -1;
      opacity: 0;
      transition: opacity 0.3s ease;
      filter: blur(15px);
    `;
    
    card.style.position = 'relative';
    card.appendChild(aura);
    
    requestAnimationFrame(() => {
      aura.style.opacity = '1';
    });
  }

  /**
   * Remove Card Aura Effect
   */
  removeCardAura(card) {
    const aura = card.querySelector('.card-aura');
    if (aura) {
      aura.style.opacity = '0';
      setTimeout(() => aura.remove(), 300);
    }
  }

  /**
   * Activate Card Dimension
   */
  activateCardDimension(card) {
    card.style.transform = 'scale(1.05) rotateY(5deg)';
    card.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    
    setTimeout(() => {
      card.style.transform = '';
    }, 300);
    
    this.playCosmicSound('activate');
    this.dispatchCosmicEvent('card:activated', { card });
  }

  /**
   * Enhance Quantum Navigation
   */
  enhanceQuantumNavigation() {
    const nav = document.querySelector('.quantum-nav');
    if (!nav) return;

    // Smooth scroll for navigation links
    const navLinks = nav.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);
        
        if (target) {
          this.smoothScrollTo(target);
          this.highlightActiveSection(targetId);
        }
      });
    });

    // Add scroll spy
    this.initializeScrollSpy();
    
    // Add navigation background on scroll
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    });
  }

  /**
   * Smooth Scroll to Element
   */
  smoothScrollTo(element) {
    const targetPosition = element.offsetTop - 80;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 800;
    let start = null;

    const animation = (currentTime) => {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const run = this.easeInOutQuad(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    requestAnimationFrame(animation);
  }

  /**
   * Easing function for smooth scroll
   */
  easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }

  /**
   * Initialize Scroll Spy
   */
  initializeScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.quantum-nav a[href^="#"]');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.highlightActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.3 });

    sections.forEach(section => observer.observe(section));
  }

  /**
   * Highlight Active Navigation Section
   */
  highlightActiveSection(sectionId) {
    const navLinks = document.querySelectorAll('.quantum-nav a[href^="#"]');
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${sectionId}`) {
        link.classList.add('active');
      }
    });
  }

  /**
   * Enhance Quantum Forms
   */
  enhanceQuantumForms() {
    const forms = document.querySelectorAll('.quantum-form');
    if (!forms.length) return;

    forms.forEach(form => {
      const inputs = form.querySelectorAll('.quantum-input');
      const submitBtn = form.querySelector('.quantum-btn');
      
      // Enhance inputs
      inputs.forEach(input => {
        this.enhanceQuantumInput(input);
      });
      
      // Enhance form submission
      if (submitBtn) {
        form.addEventListener('submit', (e) => {
          this.handleQuantumFormSubmission(e, form);
        });
      }
    });
  }

  /**
   * Enhance Quantum Input
   */
  enhanceQuantumInput(input) {
    // Add floating label effect
    const label = input.previousElementSibling;
    if (label && label.tagName === 'LABEL') {
      label.classList.add('floating-label');
    }
    
    // Add focus effects
    input.addEventListener('focus', () => {
      input.parentElement.classList.add('focused');
      this.createInputAura(input);
    });
    
    input.addEventListener('blur', () => {
      input.parentElement.classList.remove('focused');
      this.removeInputAura(input);
    });
    
    // Add real-time validation
    input.addEventListener('input', () => {
      this.validateQuantumInput(input);
    });
  }

  /**
   * Create Input Aura Effect
   */
  createInputAura(input) {
    const aura = document.createElement('div');
    aura.className = 'input-aura';
    aura.style.cssText = `
      position: absolute;
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
      background: linear-gradient(45deg, rgba(124, 58, 237, 0.5), rgba(6, 182, 212, 0.5));
      border-radius: 12px;
      z-index: -1;
      opacity: 0;
      transition: opacity 0.3s ease;
      filter: blur(8px);
    `;
    
    input.parentElement.style.position = 'relative';
    input.parentElement.appendChild(aura);
    
    requestAnimationFrame(() => {
      aura.style.opacity = '1';
    });
  }

  /**
   * Remove Input Aura Effect
   */
  removeInputAura(input) {
    const aura = input.parentElement.querySelector('.input-aura');
    if (aura) {
      aura.style.opacity = '0';
      setTimeout(() => aura.remove(), 300);
    }
  }

  /**
   * Validate Quantum Input
   */
  validateQuantumInput(input) {
    const value = input.value.trim();
    const type = input.type;
    let isValid = true;
    
    // Basic validation
    if (input.required && !value) {
      isValid = false;
    } else if (type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      isValid = emailRegex.test(value);
    } else if (type === 'tel' && value) {
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      isValid = phoneRegex.test(value.replace(/\s/g, ''));
    }
    
    // Update visual state
    input.classList.toggle('valid', isValid && value);
    input.classList.toggle('invalid', !isValid && value);
    
    return isValid;
  }

  /**
   * Handle Quantum Form Submission
   */
  async handleQuantumFormSubmission(e, form) {
    e.preventDefault();
    
    const submitBtn = form.querySelector('.quantum-btn');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Validate all inputs
    const inputs = form.querySelectorAll('.quantum-input[required]');
    let isFormValid = true;
    
    inputs.forEach(input => {
      if (!this.validateQuantumInput(input)) {
        isFormValid = false;
      }
    });
    
    if (!isFormValid) {
      this.showQuantumNotification('Please fill in all required fields correctly.', 'error');
      return;
    }
    
    // Show loading state
    this.setQuantumButtonLoading(submitBtn, true);
    
    try {
      // Simulate form submission (replace with actual endpoint)
      await this.submitToQuantumDimension(data);
      
      // Success
      this.showQuantumNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
      form.reset();
      
      // Create success particle effect
      this.createSuccessParticleEffect(form);
      
    } catch (error) {
      console.error('Form submission error:', error);
      this.showQuantumNotification('Something went wrong. Please try again.', 'error');
    } finally {
      this.setQuantumButtonLoading(submitBtn, false);
    }
  }

  /**
   * Submit to Quantum Dimension (Mock API)
   */
  async submitToQuantumDimension(data) {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.1) { // 90% success rate
          resolve({ success: true, id: this.generateCosmicId() });
        } else {
          reject(new Error('Quantum interference detected'));
        }
      }, 2000);
    });
  }

  /**
   * Set Quantum Button Loading State
   */
  setQuantumButtonLoading(button, loading) {
    if (loading) {
      button.classList.add('loading');
      button.disabled = true;
      button.dataset.originalText = button.textContent;
      button.textContent = 'Transmitting...';
    } else {
      button.classList.remove('loading');
      button.disabled = false;
      button.textContent = button.dataset.originalText || 'Send Message';
    }
  }

  /**
   * Show Quantum Notification
   */
  showQuantumNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `quantum-notification ${type}`;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === 'success' ? 'rgba(16, 185, 129, 0.9)' : 
                   type === 'error' ? 'rgba(239, 68, 68, 0.9)' : 
                   'rgba(124, 58, 237, 0.9)'};
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 12px;
      backdrop-filter: blur(20px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      z-index: 10000;
      transform: translateX(100%);
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      max-width: 300px;
      font-weight: 500;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    requestAnimationFrame(() => {
      notification.style.transform = 'translateX(0)';
    });
    
    // Auto remove
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => notification.remove(), 300);
    }, 5000);
  }

  /**
   * Create Success Particle Effect
   */
  createSuccessParticleEffect(form) {
    const rect = form.getBoundingClientRect();
    const particles = 20;
    
    for (let i = 0; i < particles; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: fixed;
        left: ${rect.left + rect.width / 2}px;
        top: ${rect.top + rect.height / 2}px;
        width: 6px;
        height: 6px;
        background: rgba(16, 185, 129, 0.8);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        animation: successParticle 2s ease-out forwards;
      `;
      
      document.body.appendChild(particle);
      setTimeout(() => particle.remove(), 2000);
    }
    
    // Add CSS animation if not exists
    if (!document.getElementById('success-particle-styles')) {
      const style = document.createElement('style');
      style.id = 'success-particle-styles';
      style.textContent = `
        @keyframes successParticle {
          0% {
            transform: scale(1) translate(0, 0);
            opacity: 1;
          }
          100% {
            transform: scale(0) translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }

  /**
   * Initialize Accessibility Features
   */
  initializeAccessibilityFeatures() {
    // Add skip link
    this.addSkipLink();
    
    // Enhance keyboard navigation
    this.enhanceKeyboardNavigation();
    
    // Add ARIA labels
    this.enhanceAriaLabels();
    
    // Add focus management
    this.initializeFocusManagement();
  }

  /**
   * Add Skip Link for Screen Readers
   */
  addSkipLink() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
      position: absolute;
      top: -40px;
      left: 6px;
      background: var(--cosmic-accent);
      color: white;
      padding: 8px;
      text-decoration: none;
      border-radius: 4px;
      z-index: 10001;
      transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', () => {
      skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
      skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
  }

  /**
   * Enhance Keyboard Navigation
   */
  enhanceKeyboardNavigation() {
    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      // Alt + T for theme toggle
      if (e.altKey && e.key === 't') {
        e.preventDefault();
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) themeToggle.click();
      }
      
      // Alt + H for home
      if (e.altKey && e.key === 'h') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      
      // Escape to close modals/overlays
      if (e.key === 'Escape') {
        this.closeAllOverlays();
      }
    });
  }

  /**
   * Enhance ARIA Labels
   */
  enhanceAriaLabels() {
    // Add ARIA labels to interactive elements
    const cards = document.querySelectorAll('.dimensional-card');
    cards.forEach((card, index) => {
      card.setAttribute('aria-label', `Project card ${index + 1}`);
      card.setAttribute('role', 'button');
    });
    
    // Add ARIA labels to skills
    const skills = document.querySelectorAll('.cosmic-skill');
    skills.forEach(skill => {
      const skillName = skill.querySelector('h6')?.textContent;
      if (skillName) {
        skill.setAttribute('aria-label', `Skill: ${skillName}`);
      }
    });
  }

  /**
   * Initialize Focus Management
   */
  initializeFocusManagement() {
    // Track focus for better UX
    let focusedElement = null;
    
    document.addEventListener('focusin', (e) => {
      focusedElement = e.target;
    });
    
    // Restore focus after dynamic content changes
    this.restoreFocus = () => {
      if (focusedElement && document.contains(focusedElement)) {
        focusedElement.focus();
      }
    };
  }

  /**
   * Initialize Performance Monitoring
   */
  initializePerformanceMonitoring() {
    // Monitor frame rate
    let lastTime = performance.now();
    let frameCount = 0;
    
    const monitorFrameRate = (currentTime) => {
      frameCount++;
      
      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        this.performanceMetrics.fps = fps;
        
        // Adjust particle count based on performance
        if (fps < 30 && this.quantumParticles) {
          this.optimizeParticles();
        }
        
        frameCount = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(monitorFrameRate);
    };
    
    requestAnimationFrame(monitorFrameRate);
    
    // Monitor memory usage (if available)
    if ('memory' in performance) {
      setInterval(() => {
        this.performanceMetrics.memory = performance.memory.usedJSHeapSize;
      }, 5000);
    }
  }

  /**
   * Optimize Particles for Better Performance
   */
  optimizeParticles() {
    if (!this.quantumParticles) return;
    
    const currentCount = this.quantumParticles.particles.array.length;
    const newCount = Math.max(20, Math.floor(currentCount * 0.7));
    
    this.quantumParticles.particles.array.splice(newCount);
    console.log(`🔧 Optimized particles: ${currentCount} → ${newCount}`);
  }

  /**
   * Initialize Observers
   */
  async initializeObservers() {
    // Intersection Observer for animations
    this.observers.intersection = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });
    
    // Observe fade-in elements
    document.querySelectorAll('.fade-in-cosmic').forEach(el => {
      this.observers.intersection.observe(el);
    });
    
    // Resize Observer for responsive adjustments
    if ('ResizeObserver' in window) {
      this.observers.resize = new ResizeObserver(entries => {
        this.handleResize();
      });
      
      this.observers.resize.observe(document.body);
    }
  }

  /**
   * Handle Scroll Events
   */
  handleScroll() {
    const scrollY = window.pageYOffset;
    this.performanceMetrics.scrollY = scrollY;
    
    // Parallax effects
    this.updateParallaxEffects(scrollY);
    
    // Update cosmic energy based on scroll
    this.updateCosmicEnergy(scrollY);
  }

  /**
   * Update Parallax Effects
   */
  updateParallaxEffects(scrollY) {
    const portal = this.dimensionalPortal;
    if (portal) {
      const speed = 0.5;
      portal.style.transform = `translateY(${scrollY * speed}px) rotate(${scrollY * 0.1}deg)`;
    }
    
    // Parallax for cosmic grid
    const grid = document.querySelector('.cosmic-grid');
    if (grid) {
      grid.style.transform = `translateY(${scrollY * 0.3}px)`;
    }
  }

  /**
   * Update Cosmic Energy
   */
  updateCosmicEnergy(scrollY) {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = Math.min(scrollY / maxScroll, 1);
    this.cosmicState.cosmicEnergy = Math.round(100 - (scrollProgress * 30));
    
    // Dispatch energy update event
    this.dispatchCosmicEvent('cosmic:energy-update', { 
      energy: this.cosmicState.cosmicEnergy,
      progress: scrollProgress 
    });
  }

  /**
   * Handle Resize Events
   */
  handleResize() {
    // Recalculate particle count
    if (this.quantumParticles) {
      const newCount = this.getOptimalParticleCount();
      // Adjust particle count if needed
    }
    
    // Update dimensional portal size
    const portal = this.dimensionalPortal;
    if (portal && window.innerWidth < 768) {
      portal.style.width = '150px';
      portal.style.height = '150px';
    }
  }

  /**
   * Start Quantum Loop
   */
  startQuantumLoop() {
    const quantumLoop = (timestamp) => {
      this.performanceMetrics.lastFrameTime = timestamp;
      
      // Update quantum entanglements
      this.updateQuantumEntanglements();
      
      // Update cosmic animations
      this.updateCosmicAnimations(timestamp);
      
      requestAnimationFrame(quantumLoop);
    };
    
    requestAnimationFrame(quantumLoop);
  }

  /**
   * Start Cosmic Heartbeat
   */
  startCosmicHeartbeat() {
    setInterval(() => {
      // Pulse cosmic elements
      this.pulseCosmicElements();
      
      // Update performance metrics
      this.updatePerformanceMetrics();
      
      // Cleanup old animations
      this.cleanupAnimations();
      
    }, 2000);
  }

  /**
   * Update Quantum Entanglements
   */
  updateQuantumEntanglements() {
    // Update entangled elements (elements that react to each other)
    this.cosmicState.quantumEntanglement.forEach((value, key) => {
      if (value.active) {
        // Update entangled state
        value.energy = Math.sin(Date.now() * 0.001) * 0.5 + 0.5;
      }
    });
  }

  /**
   * Update Cosmic Animations
   */
  updateCosmicAnimations(timestamp) {
    // Update any custom animations
    this.animations.forEach((animation, key) => {
      if (animation.active) {
        animation.update(timestamp);
      }
    });
  }

  /**
   * Pulse Cosmic Elements
   */
  pulseCosmicElements() {
    const cosmicElements = document.querySelectorAll('.cosmic-pulse');
    cosmicElements.forEach(element => {
      element.style.animation = 'cosmicPulse 2s ease-in-out';
    });
  }

  /**
   * Update Performance Metrics
   */
  updatePerformanceMetrics() {
    this.performanceMetrics.interactionCount++;
    
    // Log performance data (in production, send to analytics)
    if (this.performanceMetrics.interactionCount % 10 === 0) {
      console.log('🔍 Performance Metrics:', this.performanceMetrics);
    }
  }

  /**
   * Cleanup Animations
   */
  cleanupAnimations() {
    // Remove completed animations
    this.animations.forEach((animation, key) => {
      if (animation.completed) {
        this.animations.delete(key);
      }
    });
  }

  /**
   * Play Cosmic Sound
   */
  playCosmicSound(type) {
    // Placeholder for sound effects
    // In a real implementation, you would load and play audio files
    if (this.cosmicState.soundEnabled) {
      console.log(`🔊 Playing cosmic sound: ${type}`);
    }
  }

  /**
   * Generate Cosmic ID
   */
  generateCosmicId() {
    const prefixes = ['ASTRO', 'QUANTUM', 'STELLAR', 'COSMIC', 'NEXUS'];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 7);
    return `${prefix}-${timestamp}-${random}`.toUpperCase();
  }

  /**
   * Dispatch Cosmic Event
   */
  dispatchCosmicEvent(eventName, detail = {}) {
    const event = new CustomEvent(eventName, {
      detail: {
        ...detail,
        timestamp: Date.now(),
        cosmicState: this.cosmicState
      }
    });
    
    document.dispatchEvent(event);
    console.log(`🌟 Cosmic Event: ${eventName}`, detail);
  }

  /**
   * Handle Quantum Error
   */
  handleQuantumError(error) {
    console.error('⚠️ Quantum Error:', error);
    
    // Graceful degradation
    this.cosmicState.particlesActive = false;
    
    // Show user-friendly message
    this.showQuantumNotification(
      'Some cosmic features are temporarily unavailable.',
      'warning'
    );
    
    // Report error (in production)
    this.dispatchCosmicEvent('quantum:error', { error: error.message });
  }

  /**
   * Close All Overlays
   */
  closeAllOverlays() {
    // Close any open modals, dropdowns, etc.
    const overlays = document.querySelectorAll('.overlay, .modal, .dropdown-open');
    overlays.forEach(overlay => {
      overlay.classList.remove('open', 'active', 'dropdown-open');
    });
  }

  /**
   * Throttle Function
   */
  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  /**
   * Debounce Function
   */
  debounce(func, wait, immediate) {
    let timeout;
    return function() {
      const context = this;
      const args = arguments;
      const later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  /**
   * Destroy Quantum Engine
   */
  destroy() {
    // Cleanup observers
    Object.values(this.observers).forEach(observer => {
      if (observer) observer.disconnect();
    });
    
    // Cleanup event listeners
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleResize);
    
    // Cleanup animations
    this.animations.clear();
    
    // Reset state
    this.isInitialized = false;
    
    console.log('🔄 Quantum Engine Destroyed');
  }
}

// Initialize Quantum Engine when DOM is ready
const astrotriasEngine = new AstrotriasQuantumEngine();

// Auto-initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => astrotriasEngine.init());
} else {
  astrotriasEngine.init();
}

// Global access for debugging
window.AstrotriasEngine = astrotriasEngine;

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AstrotriasQuantumEngine;
}

// Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('🔧 Service Worker registered:', registration);
        astrotriasEngine.dispatchCosmicEvent('sw:registered', { registration });
      })
      .catch(error => {
        console.log('❌ Service Worker registration failed:', error);
      });
  });
}

// Konami Code Easter Egg
(() => {
  const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
  let konamiIndex = 0;
  
  document.addEventListener('keydown', (e) => {
    if (e.keyCode === konamiCode[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiCode.length) {
        astrotriasEngine.activateCosmicMode();
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  });
})();

// Add Cosmic Mode activation
AstrotriasQuantumEngine.prototype.activateCosmicMode = function() {
  document.body.classList.add('cosmic-mode-active');
  this.showQuantumNotification('🚀 COSMIC MODE ACTIVATED! 🌟', 'success');
  
  // Add special effects
  const style = document.createElement('style');
  style.textContent = `
    .cosmic-mode-active {
      animation: cosmicModeActivation 3s ease-in-out;
    }
    @keyframes cosmicModeActivation {
      0%, 100% { filter: hue-rotate(0deg); }
      25% { filter: hue-rotate(90deg) brightness(1.2); }
      50% { filter: hue-rotate(180deg) brightness(1.4); }
      75% { filter: hue-rotate(270deg) brightness(1.2); }
    }
  `;
  document.head.appendChild(style);
  
  setTimeout(() => {
    document.body.classList.remove('cosmic-mode-active');
    style.remove();
  }, 3000);
};

console.log('🌟 Astrotrias Quantum Engine Loaded Successfully! 🚀');

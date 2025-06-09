/**
 * Astrotrias Archon - Quantum JavaScript Engine
 * Multidimensional Creative Technologist Portfolio
 * Author: Thanatsitt Santisamranwilai (Astrotrias Archon)
 * Version: 2.0.0
 * License: MIT
 */

'use strict';

// Quantum Namespace
const QuantumEngine = {
  version: '2.0.0',
  initialized: false,
  debug: false,
  performance: {
    startTime: performance.now(),
    metrics: {}
  }
};

/**
 * ========================================
 * QUANTUM CORE SYSTEM
 * ========================================
 */

class QuantumCore {
  constructor() {
    this.observers = new Map();
    this.animations = new Map();
    this.particles = null;
    this.theme = 'dark';
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.isLowEndDevice = this.detectLowEndDevice();
    
    this.init();
  }

  /**
   * Initialize Quantum Core Systems
   */
  async init() {
    try {
      console.log('🌟 Initializing Astrotrias Archon Quantum Engine v' + QuantumEngine.version);
      
      // Core system initialization
      await this.initializeThemeSystem();
      await this.initializeParticleSystem();
      await this.initializeAnimationSystem();
      await this.initializeNavigationSystem();
      await this.initializeFormSystem();
      await this.initializePerformanceMonitoring();
      await this.initializeAccessibilityFeatures();
      await this.initializePWAFeatures();
      
      // Mark as initialized
      QuantumEngine.initialized = true;
      
      // Dispatch ready event
      this.dispatchQuantumEvent('quantum:ready', {
        version: QuantumEngine.version,
        performance: this.getPerformanceMetrics()
      });
      
      console.log('✨ Quantum Engine fully operational across all dimensions');
      
    } catch (error) {
      console.error('❌ Quantum Engine initialization failed:', error);
      this.handleQuantumError(error);
    }
  }

  /**
   * Detect low-end devices for performance optimization
   */
  detectLowEndDevice() {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const hardwareConcurrency = navigator.hardwareConcurrency || 4;
    const deviceMemory = navigator.deviceMemory || 4;
    
    return (
      hardwareConcurrency < 4 ||
      deviceMemory < 4 ||
      (connection && connection.effectiveType && connection.effectiveType.includes('2g'))
    );
  }

  /**
   * Performance metrics collection
   */
  getPerformanceMetrics() {
    const navigation = performance.getEntriesByType('navigation')[0];
    return {
      loadTime: navigation ? navigation.loadEventEnd - navigation.fetchStart : 0,
      domContentLoaded: navigation ? navigation.domContentLoadedEventEnd - navigation.fetchStart : 0,
      firstPaint: this.getFirstPaint(),
      memoryUsage: this.getMemoryUsage()
    };
  }

  getFirstPaint() {
    const paintEntries = performance.getEntriesByType('paint');
    const firstPaint = paintEntries.find(entry => entry.name === 'first-contentful-paint');
    return firstPaint ? firstPaint.startTime : 0;
  }

  getMemoryUsage() {
    return performance.memory ? {
      used: Math.round(performance.memory.usedJSHeapSize / 1048576),
      total: Math.round(performance.memory.totalJSHeapSize / 1048576),
      limit: Math.round(performance.memory.jsHeapSizeLimit / 1048576)
    } : null;
  }

  /**
   * Custom event dispatcher
   */
  dispatchQuantumEvent(eventName, detail = {}) {
    const event = new CustomEvent(eventName, {
      detail: { ...detail, timestamp: Date.now() },
      bubbles: true,
      cancelable: true
    });
    document.dispatchEvent(event);
  }

  /**
   * Error handling system
   */
  handleQuantumError(error, context = 'unknown') {
    console.error(`🚨 Quantum Error in ${context}:`, error);
    
    // Send error to analytics (if available)
    if (typeof gtag !== 'undefined') {
      gtag('event', 'exception', {
        description: error.message,
        fatal: false,
        custom_map: { context }
      });
    }
    
    // Dispatch error event
    this.dispatchQuantumEvent('quantum:error', { error, context });
  }
}

/**
 * ========================================
 * QUANTUM THEME SYSTEM
 * ========================================
 */

class QuantumThemeSystem {
  constructor(core) {
    this.core = core;
    this.currentTheme = localStorage.getItem('astrotrias-theme') || 'dark';
    this.themeToggle = null;
    this.themeIcon = null;
    
    this.init();
  }

  async init() {
    this.themeToggle = document.getElementById('themeToggle');
    this.themeIcon = document.getElementById('themeIcon');
    
    if (!this.themeToggle || !this.themeIcon) {
      console.warn('⚠️ Theme toggle elements not found');
      return;
    }

    // Apply saved theme
    this.applyTheme(this.currentTheme);
    
    // Setup event listeners
    this.themeToggle.addEventListener('click', () => this.toggleTheme());
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('astrotrias-theme')) {
        this.applyTheme(e.matches ? 'dark' : 'light');
      }
    });

    console.log('🎨 Quantum Theme System initialized');
  }

  toggleTheme() {
    const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.applyTheme(newTheme);
    
    // Announce theme change for accessibility
    this.announceThemeChange(newTheme);
    
    // Dispatch theme change event
    this.core.dispatchQuantumEvent('quantum:theme-changed', { 
      oldTheme: this.currentTheme, 
      newTheme 
    });
  }

  applyTheme(theme) {
    this.currentTheme = theme;
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('astrotrias-theme', theme);
    
    // Update theme icon
    if (this.themeIcon) {
      this.themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
      this.themeToggle.setAttribute('aria-label', 
        theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
      );
    }

    // Update particles color scheme
    if (this.core.particles) {
      this.updateParticlesTheme(theme);
    }
  }

  updateParticlesTheme(theme) {
    const colors = theme === 'dark' 
      ? ['#7c3aed', '#a855f7', '#06b6d4']
      : ['#6366f1', '#8b5cf6', '#0ea5e9'];
    
    if (window.pJSDom && window.pJSDom[0]) {
      window.pJSDom[0].pJS.particles.color.value = colors;
      window.pJSDom[0].pJS.particles.line_linked.color = colors[0];
      window.pJSDom[0].pJS.fn.particlesRefresh();
    }
  }

  announceThemeChange(theme) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = `Theme changed to ${theme} mode`;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      if (announcement.parentNode) {
        announcement.parentNode.removeChild(announcement);
      }
    }, 1000);
  }
}

/**
 * ========================================
 * QUANTUM PARTICLE SYSTEM
 * ========================================
 */

class QuantumParticleSystem {
  constructor(core) {
    this.core = core;
    this.container = document.getElementById('particles-js');
    this.config = this.getParticleConfig();
    
    this.init();
  }

  async init() {
    if (!this.container) {
      console.warn('⚠️ Particles container not found');
      return;
    }

    try {
      // Load particles.js if not already loaded
      if (typeof particlesJS === 'undefined') {
        await this.loadParticlesJS();
      }

      // Initialize particles with quantum configuration
      particlesJS('particles-js', this.config);
      
      console.log('⚛️ Quantum Particle System activated');
      
    } catch (error) {
      console.warn('⚠️ Particles.js failed to load, continuing without particles');
      this.core.handleQuantumError(error, 'particle-system');
    }
  }

  async loadParticlesJS() {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/particles.js/2.0.0/particles.min.js';
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  getParticleConfig() {
    const baseConfig = {
      particles: {
        number: { 
          value: this.core.isLowEndDevice ? 60 : 120, 
          density: { enable: true, value_area: 1000 } 
        },
        color: { 
          value: ['#7c3aed', '#a855f7', '#06b6d4'] 
        },
        shape: { 
          type: 'circle',
          stroke: { width: 0, color: '#000000' }
        },
        opacity: { 
          value: 0.7, 
          random: true, 
          anim: { 
            enable: !this.core.reducedMotion, 
            speed: 1.5, 
            opacity_min: 0.1, 
            sync: false 
          } 
        },
        size: { 
          value: 4, 
          random: true, 
          anim: { 
            enable: !this.core.reducedMotion, 
            speed: 3, 
            size_min: 0.1, 
            sync: false 
          } 
        },
        line_linked: { 
          enable: true, 
          distance: this.core.isLowEndDevice ? 150 : 200, 
          color: '#7c3aed', 
          opacity: 0.3, 
          width: 1 
        },
        move: { 
          enable: true, 
          speed: this.core.isLowEndDevice ? 1 : 1.5, 
          direction: 'none', 
          random: true, 
          straight: false, 
          out_mode: 'out', 
          bounce: false 
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: { 
            enable: !this.core.isLowEndDevice, 
            mode: 'repulse' 
          },
          onclick: { 
            enable: true, 
            mode: 'push' 
          },
          resize: true
        },
        modes: {
          repulse: { distance: 150, duration: 0.4 },
          push: { particles_nb: this.core.isLowEndDevice ? 3 : 6 }
        }
      },
      retina_detect: true
    };

    // Disable animations for reduced motion
    if (this.core.reducedMotion) {
      baseConfig.particles.opacity.anim.enable = false;
      baseConfig.particles.size.anim.enable = false;
      baseConfig.particles.move.speed = 0.5;
      baseConfig.interactivity.events.onhover.enable = false;
    }

    return baseConfig;
  }

  updateConfig(newConfig) {
    this.config = { ...this.config, ...newConfig };
    if (window.pJSDom && window.pJSDom[0]) {
      window.pJSDom[0].pJS.fn.particlesRefresh();
    }
  }
}

/**
 * ========================================
 * QUANTUM ANIMATION SYSTEM
 * ========================================
 */

class QuantumAnimationSystem {
  constructor(core) {
    this.core = core;
    this.observers = new Map();
    this.animatedElements = new Set();
    
    this.init();
  }

  async init() {
    // Initialize intersection observers for different animation types
    this.setupFadeInObserver();
    this.setupTimelineObserver();
    this.setupSkillsObserver();
    this.setupCounterObserver();
    
    // Setup scroll-based animations
    this.setupScrollAnimations();
    
    console.log('🎬 Quantum Animation System activated');
  }

  setupFadeInObserver() {
    const fadeElements = document.querySelectorAll('.fade-in-cosmic');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
          const delay = this.core.reducedMotion ? 0 : index * 150;
          
          setTimeout(() => {
            entry.target.classList.add('visible');
            this.animatedElements.add(entry.target);
            
            this.core.dispatchQuantumEvent('quantum:element-animated', {
              element: entry.target,
              type: 'fade-in'
            });
          }, delay);
        }
      });
    }, { 
      threshold: 0.1,
      rootMargin: '0px 0px -20px 0px'
    });

    fadeElements.forEach(element => observer.observe(element));
    this.observers.set('fade-in', observer);
  }

  setupTimelineObserver() {
    const stellarEvents = document.querySelectorAll('.stellar-event');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
          const delay = this.core.reducedMotion ? 0 : index * 300;
          
          setTimeout(() => {
            entry.target.classList.add('animate');
            this.animatedElements.add(entry.target);
            
            this.core.dispatchQuantumEvent('quantum:timeline-animated', {
              element: entry.target,
              index
            });
          }, delay);
        }
      });
    }, { 
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    stellarEvents.forEach(event => observer.observe(event));
    this.observers.set('timeline', observer);
  }

  setupSkillsObserver() {
    const skillConstellations = document.querySelectorAll('.skill-constellation');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
          const width = entry.target.getAttribute('data-width');
          const delay = this.core.reducedMotion ? 0 : 500;
          
          setTimeout(() => {
            entry.target.style.setProperty('--skill-width', width + '%');
            entry.target.classList.add('animate');
            this.animatedElements.add(entry.target);
            
            this.core.dispatchQuantumEvent('quantum:skill-animated', {
              element: entry.target,
              width
            });
          }, delay);
        }
      });
    }, { 
      threshold: 0.5 
    });

    skillConstellations.forEach(skill => observer.observe(skill));
    this.observers.set('skills', observer);
  }

  setupCounterObserver() {
    const counters = document.querySelectorAll('[data-counter]');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
          this.animateCounter(entry.target);
          this.animatedElements.add(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
    this.observers.set('counters', observer);
  }

  animateCounter(element) {
    const target = parseInt(element.getAttribute('data-counter'));
    const duration = this.core.reducedMotion ? 100 : 2000;
    const start = performance.now();
    
    const animate = (currentTime) => {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);
      
      const current = Math.floor(progress * target);
      element.textContent = current.toLocaleString();
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        this.core.dispatchQuantumEvent('quantum:counter-completed', {
          element,
          finalValue: target
        });
      }
    };
    
    requestAnimationFrame(animate);
  }

  setupScrollAnimations() {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.updateScrollAnimations();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  updateScrollAnimations() {
    const scrollY = window.pageYOffset;
    const windowHeight = window.innerHeight;
    
    // Parallax effects for non-reduced motion
    if (!this.core.reducedMotion) {
      const parallaxElements = document.querySelectorAll('[data-parallax]');
      parallaxElements.forEach(element => {
        const speed = parseFloat(element.getAttribute('data-parallax')) || 0.5;
        const yPos = -(scrollY * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
    }
    
    // Update navigation active state
    this.updateNavigationState(scrollY);
  }

  updateNavigationState(scrollY) {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    let currentSection = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }

  // Cleanup method
  destroy() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
    this.animatedElements.clear();
  }
}

/**
 * ========================================
 * QUANTUM NAVIGATION SYSTEM
 * ========================================
 */

class QuantumNavigationSystem {
  constructor(core) {
    this.core = core;
    this.navbar = document.getElementById('mainNav');
    this.navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    this.mobileToggle = document.querySelector('.navbar-toggler');
    this.navCollapse = document.querySelector('.navbar-collapse');
    
    this.init();
  }

  async init() {
    if (!this.navbar) {
      console.warn('⚠️ Navigation elements not found');
      return;
    }

    // Setup scroll effects
    this.setupScrollEffects();
    
    // Setup smooth scrolling
    this.setupSmoothScrolling();
    
    // Setup mobile navigation
    this.setupMobileNavigation();
    
    // Setup keyboard navigation
    this.setupKeyboardNavigation();
    
    console.log('🧭 Quantum Navigation System activated');
  }

  setupScrollEffects() {
    let lastScrollY = 0;
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.pageYOffset;
          
          // Add scrolled class for styling
          if (scrollY > 100) {
            this.navbar.classList.add('scrolled');
          } else {
            this.navbar.classList.remove('scrolled');
          }
          
          // Hide/show navbar on scroll (mobile)
          if (window.innerWidth <= 768) {
            if (scrollY > lastScrollY && scrollY > 200) {
              this.navbar.style.transform = 'translateY(-100%)';
            } else {
              this.navbar.style.transform = 'translateY(0)';
            }
          }
          
          lastScrollY = scrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  setupSmoothScrolling() {
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          this.scrollToElement(targetElement);
          
          // Close mobile menu if open
          if (this.navCollapse.classList.contains('show')) {
            this.mobileToggle.click();
          }
          
          // Update URL without triggering scroll
          history.pushState(null, null, `#${targetId}`);
          
          this.core.dispatchQuantumEvent('quantum:navigation', {
            target: targetId,
            element: targetElement
          });
        }
      });
    });
  }

  scrollToElement(element) {
    const headerOffset = this.navbar.offsetHeight + 20;
    const elementPosition = element.offsetTop;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: this.core.reducedMotion ? 'auto' : 'smooth'
    });

    // Focus management for accessibility
    setTimeout(() => {
      const focusableElement = element.querySelector('h1, h2, h3, [tabindex="0"]');
      if (focusableElement) {
        focusableElement.focus();
      }
    }, this.core.reducedMotion ? 0 : 500);
  }

  setupMobileNavigation() {
    if (!this.mobileToggle || !this.navCollapse) return;

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (this.navCollapse.classList.contains('show') && 
          !this.navbar.contains(e.target)) {
        this.mobileToggle.click();
      }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.navCollapse.classList.contains('show')) {
        this.mobileToggle.click();
        this.mobileToggle.focus();
      }
    });
  }

  setupKeyboardNavigation() {
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'sr-only sr-only-focusable';
    skipLink.style.cssText = `
      position: absolute;
      top: -40px;
      left: 6px;
      width: 1px;
      height: 1px;
      padding: 8px 16px;
      margin: 0;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      border: 0;
      z-index: 9999;
    `;
    
    skipLink.addEventListener('focus', () => {
      skipLink.style.cssText = `
        position: absolute;
        top: 6px;
        left: 6px;
        width: auto;
        height: auto;
        padding: 8px 16px;
        margin: 0;
        overflow: visible;
        clip: auto;
        background: var(--cosmic-accent);
        color: white;
        text-decoration: none;
        border-radius: 4px;
        z-index: 9999;
      `;
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
  }
}

/**
 * ========================================
 * QUANTUM FORM SYSTEM
 * ========================================
 */

class QuantumFormSystem {
  constructor(core) {
    this.core = core;
    this.form = document.getElementById('quantumForm');
    this.submitButton = null;
    this.originalButtonText = '';
    
    this.init();
  }

  async init() {
    if (!this.form) {
      console.warn('⚠️ Quantum form not found');
      return;
    }

    this.submitButton = this.form.querySelector('button[type="submit"]');
    if (this.submitButton) {
      this.originalButtonText = this.submitButton.innerHTML;
    }

    // Setup form validation
    this.setupFormValidation();
    
    // Setup form submission
    this.setupFormSubmission();
    
    // Setup real-time validation
    this.setupRealTimeValidation();
    
    // Setup accessibility features
    this.setupAccessibilityFeatures();
    
    console.log('📡 Quantum Form System activated');
  }

  setupFormValidation() {
    const inputs = this.form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
      // Custom validation messages
      input.addEventListener('invalid', (e) => {
        e.preventDefault();
        this.showCustomValidationMessage(input);
      });
      
      // Clear validation on input
      input.addEventListener('input', () => {
        this.clearValidationMessage(input);
      });
    });
  }

  setupFormSubmission() {
    this.form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      if (!this.validateForm()) {
        return;
      }

      try {
        await this.submitForm();
      } catch (error) {
        this.core.handleQuantumError(error, 'form-submission');
        this.showSubmissionError();
      }
    });
  }

  async submitForm() {
    const formData = new FormData(this.form);
    
    // Show loading state
    this.setSubmissionState('loading');
    
    // Simulate network delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
      });
      
      if (response.ok) {
        this.setSubmissionState('success');
        this.showSuccessMessage();
        
        // Reset form after delay
        setTimeout(() => {
          this.resetForm();
        }, 3000);
        
        // Analytics tracking
        this.trackFormSubmission(formData);
        
      } else {
        throw new Error('Network response was not ok');
      }
      
    } catch (error) {
      this.setSubmissionState('error');
      throw error;
    }
  }

  validateForm() {
    const inputs = this.form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
      if (!input.value.trim()) {
        this.showCustomValidationMessage(input);
        isValid = false;
      } else if (input.type === 'email' && !this.isValidEmail(input.value)) {
        this.showCustomValidationMessage(input, 'Please enter a valid quantum frequency (email)');
        isValid = false;
      }
    });
    
    return isValid;
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  showCustomValidationMessage(input, message = null) {
    const defaultMessages = {
      'name': 'Please enter your cosmic identity',
      'email': 'Please enter a valid quantum frequency',
      'dimension': 'Please select a dimensional project',
      'message': 'Please share your cosmic vision'
    };
    
    const validationMessage = message || defaultMessages[input.name] || 'This field is required';
    
    // Remove existing error message
    this.clearValidationMessage(input);
    
    // Create error message element
    const errorElement = document.createElement('div');
    errorElement.className = 'invalid-feedback d-block';
    errorElement.textContent = validationMessage;
    errorElement.setAttribute('role', 'alert');
    
    // Add error styling
    input.classList.add('is-invalid');
    
    // Insert error message
    input.parentNode.appendChild(errorElement);
    
    // Focus the input
    input.focus();
  }

  clearValidationMessage(input) {
    input.classList.remove('is-invalid');
    const errorElement = input.parentNode.querySelector('.invalid-feedback');
    if (errorElement) {
      errorElement.remove();
    }
  }

  setSubmissionState(state) {
    if (!this.submitButton) return;
    
    const states = {
      loading: {
        html: '<i class="fas fa-satellite fa-spin me-2"></i>Establishing Quantum Link...',
        disabled: true,
        className: 'loading'
      },
      success: {
        html: '<i class="fas fa-check me-2"></i>Quantum Link Established!',
        disabled: true,
        className: 'success',
        style: 'background: linear-gradient(45deg, #10b981, #059669);'
      },
      error: {
        html: '<i class="fas fa-exclamation-triangle me-2"></i>Transmission Failed',
        disabled: true,
        className: 'error',
        style: 'background: linear-gradient(45deg, #ef4444, #dc2626);'
      },
      default: {
        html: this.originalButtonText,
        disabled: false,
        className: '',
        style: ''
      }
    };
    
    const config = states[state] || states.default;
    
    this.submitButton.innerHTML = config.html;
    this.submitButton.disabled = config.disabled;
    this.submitButton.className = this.submitButton.className.replace(/\b(loading|success|error)\b/g, '');
    
    if (config.className) {
      this.submitButton.classList.add(config.className);
    }
    
    if (config.style) {
      this.submitButton.style.cssText = config.style;
    } else {
      this.submitButton.style.cssText = '';
    }
  }

  showSuccessMessage() {
    const successMessage = document.createElement('div');
    successMessage.className = 'alert alert-success mt-3';
    successMessage.innerHTML = `
      <i class="fas fa-check-circle me-2"></i>
      Your cosmic message has been transmitted across dimensional frequencies!
    `;
    successMessage.setAttribute('role', 'alert');
    
    this.form.appendChild(successMessage);
    
    // Announce success for screen readers
    this.announceToScreenReader('Form submitted successfully');
  }

  showSubmissionError() {
    const errorMessage = document.createElement('div');
    errorMessage.className = 'alert alert-danger mt-3';
    errorMessage.innerHTML = `
      <i class="fas fa-exclamation-triangle me-2"></i>
      Quantum transmission failed. Please try again or contact directly.
    `;
    errorMessage.setAttribute('role', 'alert');
    
    this.form.appendChild(errorMessage);
    
    // Reset button after delay
    setTimeout(() => {
      this.setSubmissionState('default');
      if (errorMessage.parentNode) {
        errorMessage.remove();
      }
    }, 5000);
  }

  resetForm() {
    this.form.reset();
    this.setSubmissionState('default');
    
    // Remove any messages
    const messages = this.form.querySelectorAll('.alert');
    messages.forEach(message => message.remove());
    
    // Clear validation states
    const inputs = this.form.querySelectorAll('.is-invalid');
    inputs.forEach(input => this.clearValidationMessage(input));
  }

  setupRealTimeValidation() {
    const emailInput = this.form.querySelector('input[type="email"]');
    if (emailInput) {
      let timeout;
      emailInput.addEventListener('input', () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          if (emailInput.value && !this.isValidEmail(emailInput.value)) {
            this.showCustomValidationMessage(emailInput, 'Please enter a valid quantum frequency');
          } else {
            this.clearValidationMessage(emailInput);
          }
        }, 500);
      });
    }
  }

  setupAccessibilityFeatures() {
    // Add aria-describedby for help text
    const inputs = this.form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      const helpText = input.parentNode.querySelector('.form-text');
      if (helpText) {
        const helpId = `${input.id}-help`;
        helpText.id = helpId;
        input.setAttribute('aria-describedby', helpId);
      }
    });
  }

  announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      if (announcement.parentNode) {
        announcement.parentNode.removeChild(announcement);
      }
    }, 1000);
  }

  trackFormSubmission(formData) {
    // Google Analytics tracking
    if (typeof gtag !== 'undefined') {
      gtag('event', 'form_submit', {
        event_category: 'engagement',
        event_label: 'quantum_contact_form',
        value: 1
      });
    }
    
    // Custom event
    this.core.dispatchQuantumEvent('quantum:form-submitted', {
      dimension: formData.get('dimension'),
      timestamp: Date.now()
    });
  }
}

/**
 * ========================================
 * QUANTUM PERFORMANCE MONITOR
 * ========================================
 */

class QuantumPerformanceMonitor {
  constructor(core) {
    this.core = core;
    this.metrics = {};
    this.observers = [];
    
    this.init();
  }

  async init() {
    // Monitor Core Web Vitals
    this.monitorCoreWebVitals();
    
    // Monitor resource loading
    this.monitorResourceLoading();
    
    // Monitor user interactions
    this.monitorUserInteractions();
    
    // Setup periodic reporting
    this.setupPeriodicReporting();
    
    console.log('📊 Quantum Performance Monitor activated');
  }

  monitorCoreWebVitals() {
    // Largest Contentful Paint (LCP)
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      this.metrics.lcp = lastEntry.startTime;
      this.reportMetric('LCP', lastEntry.startTime);
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // First Input Delay (FID)
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach(entry => {
        this.metrics.fid = entry.processingStart - entry.startTime;
        this.reportMetric('FID', this.metrics.fid);
      });
    }).observe({ entryTypes: ['first-input'] });

    // Cumulative Layout Shift (CLS)
    let clsValue = 0;
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach(entry => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      this.metrics.cls = clsValue;
      this.reportMetric('CLS', clsValue);
    }).observe({ entryTypes: ['layout-shift'] });
  }

  monitorResourceLoading() {
    // Monitor long tasks
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach(entry => {
        if (entry.duration > 50) {
          this.reportMetric('Long Task', entry.duration);
        }
      });
    }).observe({ entryTypes: ['longtask'] });

    // Monitor navigation timing
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0];
      if (navigation) {
        this.metrics.loadTime = navigation.loadEventEnd - navigation.fetchStart;
        this.metrics.domContentLoaded = navigation.domContentLoadedEventEnd - navigation.fetchStart;
        this.reportMetric('Load Time', this.metrics.loadTime);
        this.reportMetric('DOM Content Loaded', this.metrics.domContentLoaded);
      }
    });
  }

  monitorUserInteractions() {
    // Track interaction delays
    ['click', 'keydown', 'touchstart'].forEach(eventType => {
      document.addEventListener(eventType, (event) => {
        const startTime = performance.now();
        
        requestAnimationFrame(() => {
          const endTime = performance.now();
          const delay = endTime - startTime;
          
          if (delay > 16) { // More than one frame
            this.reportMetric('Interaction Delay', delay);
          }
        });
      }, { passive: true });
    });
  }

  setupPeriodicReporting() {
    // Report metrics every 30 seconds
    setInterval(() => {
      this.reportPerformanceSnapshot();
    }, 30000);
    
    // Report on page unload
    window.addEventListener('beforeunload', () => {
      this.reportPerformanceSnapshot();
    });
  }

  reportMetric(name, value) {
    // Console logging for development
    if (this.core.debug) {
      console.log(`📊 ${name}: ${value.toFixed(2)}ms`);
    }
    
    // Send to analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'performance_metric', {
        event_category: 'performance',
        event_label: name,
        value: Math.round(value)
      });
    }
    
    // Dispatch custom event
    this.core.dispatchQuantumEvent('quantum:performance-metric', {
      name,
      value,
      timestamp: Date.now()
    });
  }

  reportPerformanceSnapshot() {
    const snapshot = {
      ...this.metrics,
      memory: this.core.getMemoryUsage(),
      timestamp: Date.now()
    };
    
    this.core.dispatchQuantumEvent('quantum:performance-snapshot', snapshot);
    
    if (this.core.debug) {
      console.table(snapshot);
    }
  }

  getPerformanceScore() {
    const scores = {
      lcp: this.metrics.lcp < 2500 ? 100 : Math.max(0, 100 - (this.metrics.lcp - 2500) / 25),
      fid: this.metrics.fid < 100 ? 100 : Math.max(0, 100 - (this.metrics.fid - 100) / 10),
      cls: this.metrics.cls < 0.1 ? 100 : Math.max(0, 100 - (this.metrics.cls - 0.1) * 1000)
    };
    
    return Math.round((scores.lcp + scores.fid + scores.cls) / 3);
  }
}

/**
 * ========================================
 * QUANTUM ACCESSIBILITY SYSTEM
 * ========================================
 */

class QuantumAccessibilitySystem {
  constructor(core) {
    this.core = core;
    this.focusVisible = false;
    this.announcements = [];
    
    this.init();
  }

  async init() {
    // Setup focus management
    this.setupFocusManagement();
    
    // Setup keyboard navigation
    this.setupKeyboardNavigation();
    
    // Setup screen reader support
    this.setupScreenReaderSupport();
    
    // Setup reduced motion support
    this.setupReducedMotionSupport();
    
    // Setup high contrast support
    this.setupHighContrastSupport();
    
    console.log('♿ Quantum Accessibility System activated');
  }

  setupFocusManagement() {
    // Track focus method (mouse vs keyboard)
    document.addEventListener('mousedown', () => {
      this.focusVisible = false;
    });
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        this.focusVisible = true;
      }
    });
    
    // Apply focus-visible class
    document.addEventListener('focusin', (e) => {
      if (this.focusVisible) {
        e.target.classList.add('focus-visible');
      }
    });
    
    document.addEventListener('focusout', (e) => {
      e.target.classList.remove('focus-visible');
    });
    
    // Focus trap for modals
    this.setupFocusTrap();
  }

  setupFocusTrap() {
    const modals = document.querySelectorAll('[role="dialog"]');
    
    modals.forEach(modal => {
      modal.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
          this.trapFocus(e, modal);
        }
      });
    });
  }

  trapFocus(event, container) {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    if (event.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus();
        event.preventDefault();
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement.focus();
        event.preventDefault();
      }
    }
  }

  setupKeyboardNavigation() {
    // Card navigation
    const cards = document.querySelectorAll('.dimensional-card');
    cards.forEach(card => {
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          card.click();
        }
      });
    });
    
    // Skip links
    this.createSkipLinks();
    
    // Escape key handling
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.handleEscapeKey();
      }
    });
  }

  createSkipLinks() {
    const skipLinks = [
      { href: '#main', text: 'Skip to main content' },
      { href: '#dimensions', text: 'Skip to projects' },
      { href: '#contact', text: 'Skip to contact' }
    ];
    
    const skipContainer = document.createElement('div');
    skipContainer.className = 'skip-links';
    skipContainer.setAttribute('aria-label', 'Skip links');
    
    skipLinks.forEach(link => {
      const skipLink = document.createElement('a');
      skipLink.href = link.href;
      skipLink.textContent = link.text;
      skipLink.className = 'skip-link sr-only sr-only-focusable';
      skipContainer.appendChild(skipLink);
    });
    
    document.body.insertBefore(skipContainer, document.body.firstChild);
  }

  handleEscapeKey() {
    // Close any open modals or menus
    const openElements = document.querySelectorAll('.show[data-bs-toggle]');
    openElements.forEach(element => {
      const trigger = document.querySelector(`[data-bs-target="#${element.id}"]`);
      if (trigger) {
        trigger.click();
        trigger.focus();
      }
    });
  }

  setupScreenReaderSupport() {
    // Live region for announcements
    this.createLiveRegion();
    
    // Enhanced form labels
    this.enhanceFormLabels();
    
    // Progress announcements
    this.setupProgressAnnouncements();
  }

  createLiveRegion() {
    const liveRegion = document.createElement('div');
    liveRegion.id = 'quantum-live-region';
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    document.body.appendChild(liveRegion);
  }

  announce(message, priority = 'polite') {
    const liveRegion = document.getElementById('quantum-live-region');
    if (liveRegion) {
      liveRegion.setAttribute('aria-live', priority);
      liveRegion.textContent = message;
      
      // Clear after announcement
      setTimeout(() => {
        liveRegion.textContent = '';
      }, 1000);
    }
  }

  enhanceFormLabels() {
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      const label = document.querySelector(`label[for="${input.id}"]`);
      if (label && !input.getAttribute('aria-label')) {
        input.setAttribute('aria-label', label.textContent);
      }
    });
  }

  setupProgressAnnouncements() {
    // Announce skill progress
    document.addEventListener('quantum:skill-animated', (e) => {
      const skillName = e.detail.element.parentNode.querySelector('.fw-semibold').textContent;
      this.announce(`${skillName} skill level revealed`);
    });
    
    // Announce form submission states
    document.addEventListener('quantum:form-submitted', () => {
      this.announce('Form submitted successfully');
    });
  }

  setupReducedMotionSupport() {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleReducedMotion = (e) => {
      if (e.matches) {
        document.body.classList.add('reduced-motion');
        this.announce('Reduced motion mode activated');
      } else {
        document.body.classList.remove('reduced-motion');
      }
    };
    
    mediaQuery.addEventListener('change', handleReducedMotion);
    handleReducedMotion(mediaQuery);
  }

  setupHighContrastSupport() {
    const mediaQuery = window.matchMedia('(prefers-contrast: high)');
    
    const handleHighContrast = (e) => {
      if (e.matches) {
        document.body.classList.add('high-contrast');
        this.announce('High contrast mode detected');
      } else {
        document.body.classList.remove('high-contrast');
      }
    };
    
    mediaQuery.addEventListener('change', handleHighContrast);
    handleHighContrast(mediaQuery);
  }
}

/**
 * ========================================
 * QUANTUM PWA SYSTEM
 * ========================================
 */

class QuantumPWASystem {
  constructor(core) {
    this.core = core;
    this.deferredPrompt = null;
    this.isInstalled = false;
    
    this.init();
  }

  async init() {
    // Register service worker
    await this.registerServiceWorker();
    
    // Setup install prompt
    this.setupInstallPrompt();
    
    // Setup offline detection
    this.setupOfflineDetection();
    
    // Setup update notifications
    this.setupUpdateNotifications();
    
    console.log('📱 Quantum PWA System activated');
  }

  async registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        console.log('🔧 Service Worker registered:', registration);
        
        // Listen for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              this.showUpdateNotification();
            }
          });
        });
        
      } catch (error) {
        console.warn('⚠️ Service Worker registration failed:', error);
      }
    }
  }

  setupInstallPrompt() {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
      this.showInstallButton();
    });
    
    window.addEventListener('appinstalled', () => {
      this.isInstalled = true;
      this.hideInstallButton();
      this.core.dispatchQuantumEvent('quantum:app-installed');
    });
  }

  showInstallButton() {
    const installButton = document.createElement('button');
    installButton.id = 'quantum-install-btn';
    installButton.className = 'quantum-btn position-fixed';
    installButton.style.cssText = `
      bottom: 20px;
      right: 20px;
      z-index: 1000;
      border-radius: 50px;
      padding: 12px 20px;
      box-shadow: 0 4px 20px rgba(124, 58, 237, 0.3);
    `;
    installButton.innerHTML = '<i class="fas fa-download me-2"></i>Install App';
    installButton.setAttribute('aria-label', 'Install Astrotrias Archon as an app');
    
    installButton.addEventListener('click', () => {
      this.promptInstall();
    });
    
    document.body.appendChild(installButton);
    
    // Animate in
    setTimeout(() => {
      installButton.style.transform = 'translateY(0)';
      installButton.style.opacity = '1';
    }, 100);
  }

  async promptInstall() {
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();
      const { outcome } = await this.deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('📱 User accepted the install prompt');
      } else {
        console.log('📱 User dismissed the install prompt');
      }
      
      this.deferredPrompt = null;
      this.hideInstallButton();
    }
  }

  hideInstallButton() {
    const installButton = document.getElementById('quantum-install-btn');
    if (installButton) {
      installButton.style.transform = 'translateY(100px)';
      installButton.style.opacity = '0';
      setTimeout(() => {
        if (installButton.parentNode) {
          installButton.parentNode.removeChild(installButton);
        }
      }, 300);
    }
  }

  setupOfflineDetection() {
    const updateOnlineStatus = () => {
      const isOnline = navigator.onLine;
      document.body.classList.toggle('offline', !isOnline);
      
      if (isOnline) {
        this.showNotification('🌐 Back online - Quantum connection restored', 'success');
      } else {
        this.showNotification('📡 Offline mode - Limited functionality available', 'warning');
      }
      
      this.core.dispatchQuantumEvent('quantum:connection-changed', { isOnline });
    };
    
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
  }

  setupUpdateNotifications() {
    // Check for updates periodically
    setInterval(() => {
      if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({ command: 'CHECK_FOR_UPDATES' });
      }
    }, 60000); // Check every minute
  }

  showUpdateNotification() {
    const notification = document.createElement('div');
    notification.className = 'quantum-update-notification';
    notification.innerHTML = `
      <div class="d-flex align-items-center justify-content-between p-3">
        <div>
          <i class="fas fa-sync-alt me-2"></i>
          <span>New version available!</span>
        </div>
        <button class="btn btn-sm btn-outline-light" onclick="location.reload()">
          Update
        </button>
      </div>
    `;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--cosmic-accent);
      color: white;
      border-radius: 10px;
      z-index: 1001;
      box-shadow: 0 4px 20px rgba(124, 58, 237, 0.3);
      transform: translateX(100%);
      transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto-hide after 10 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
          if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
          }
        }, 300);
      }
    }, 10000);
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} quantum-notification`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 80px;
      right: 20px;
      z-index: 1000;
      min-width: 300px;
      transform: translateX(100%);
      transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
          if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
          }
        }, 300);
      }
    }, 5000);
  }
}

/**
 * ========================================
 * QUANTUM ENGINE INITIALIZATION
 * ========================================
 */

// Global utility functions
window.scrollToSection = function(sectionId) {
  const element = document.getElementById(sectionId);
  if (element && window.quantumCore) {
    window.quantumCore.navigationSystem.scrollToElement(element);
  }
};

// Initialize Quantum Engine when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Initialize core systems
    window.quantumCore = new QuantumCore();
    
    // Initialize subsystems
    window.quantumCore.themeSystem = new QuantumThemeSystem(window.quantumCore);
    window.quantumCore.particleSystem = new QuantumParticleSystem(window.quantumCore);
    window.quantumCore.animationSystem = new QuantumAnimationSystem(window.quantumCore);
    window.quantumCore.navigationSystem = new QuantumNavigationSystem(window.quantumCore);
    window.quantumCore.formSystem = new QuantumFormSystem(window.quantumCore);
    window.quantumCore.performanceMonitor = new QuantumPerformanceMonitor(window.quantumCore);
    window.quantumCore.accessibilitySystem = new QuantumAccessibilitySystem(window.quantumCore);
    window.quantumCore.pwaSystem = new QuantumPWASystem(window.quantumCore);
    
    // Global error handling
    window.addEventListener('error', (e) => {
      window.quantumCore.handleQuantumError(e.error, 'global');
    });
    
    window.addEventListener('unhandledrejection', (e) => {
      window.quantumCore.handleQuantumError(e.reason, 'promise');
    });
    
  } catch (error) {
    console.error('❌ Failed to initialize Quantum Engine:', error);
  }
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { QuantumEngine, QuantumCore };
}

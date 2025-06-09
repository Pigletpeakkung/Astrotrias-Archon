/**
 * ===============================================
 * ASTROTRIAS ARCHON - CUSTOM INTERACTIONS
 * Advanced Interactive Features & Effects
 * ===============================================
 */

class CosmicInteractions {
    constructor() {
        this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.activeEffects = new Set();
        this.mousePosition = { x: 0, y: 0 };
        this.scrollVelocity = 0;
        this.lastScrollTop = 0;
        
        this.init();
    }

    /**
     * Initialize all custom interactions
     */
    init() {
        this.setupMouseTracking();
        this.setupParallaxEffects();
        this.setupMagneticButtons();
        this.setupHoverEffects();
        this.setupScrollEffects();
        this.setupCursorEffects();
        this.setupSoundEffects();
        this.setupGestureControls();
        this.setupKeyboardShortcuts();
        this.setupAdvancedAnimations();
        this.setupPerformanceMonitoring();
        
        console.log('🌟 Cosmic Interactions Initialized');
    }

    /**
     * Setup mouse position tracking
     */
    setupMouseTracking() {
        let ticking = false;
        
        document.addEventListener('mousemove', (e) => {
            this.mousePosition.x = e.clientX;
            this.mousePosition.y = e.clientY;
            
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.updateMouseEffects();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    /**
     * Update mouse-based effects
     */
    updateMouseEffects() {
        // Update cosmic orb interaction
        this.updateOrbInteraction();
        
        // Update particle attraction
        this.updateParticleAttraction();
        
        // Update cursor trail
        this.updateCursorTrail();
    }

    /**
     * Setup parallax effects
     */
    setupParallaxEffects() {
        if (this.isReducedMotion) return;

        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        parallaxElements.forEach(element => {
            const speed = parseFloat(element.getAttribute('data-parallax')) || 0.5;
            element.setAttribute('data-parallax-speed', speed);
        });

        this.setupScrollListener();
    }

    /**
     * Setup scroll listener for parallax and other scroll effects
     */
    setupScrollListener() {
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.updateParallaxElements();
                    this.updateScrollVelocity();
                    this.updateScrollBasedEffects();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    /**
     * Update parallax elements
     */
    updateParallaxElements() {
        const scrollTop = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        parallaxElements.forEach(element => {
            const speed = parseFloat(element.getAttribute('data-parallax-speed'));
            const yPos = -(scrollTop * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }

    /**
     * Update scroll velocity for dynamic effects
     */
    updateScrollVelocity() {
        const currentScrollTop = window.pageYOffset;
        this.scrollVelocity = Math.abs(currentScrollTop - this.lastScrollTop);
        this.lastScrollTop = currentScrollTop;
    }

    /**
     * Setup magnetic button effects
     */
    setupMagneticButtons() {
        if (this.isReducedMotion) return;

        const magneticElements = document.querySelectorAll('.btn, .project-card, .social-link');
        
        magneticElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.activateMagneticEffect(element);
            });
            
            element.addEventListener('mouseleave', () => {
                this.deactivateMagneticEffect(element);
            });
        });
    }

    /**
     * Activate magnetic effect on element
     */
    activateMagneticEffect(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const mouseMoveHandler = (e) => {
            const deltaX = (e.clientX - centerX) * 0.2;
            const deltaY = (e.clientY - centerY) * 0.2;
            
            element.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.05)`;
        };
        
        element.addEventListener('mousemove', mouseMoveHandler);
        element._magneticHandler = mouseMoveHandler;
    }

    /**
     * Deactivate magnetic effect
     */
    deactivateMagneticEffect(element) {
        if (element._magneticHandler) {
            element.removeEventListener('mousemove', element._magneticHandler);
            delete element._magneticHandler;
        }
        
        element.style.transform = '';
    }

    /**
     * Setup advanced hover effects
     */
    setupHoverEffects() {
        this.setupCardTiltEffect();
        this.setupImageRevealEffect();
        this.setupTextScrambleEffect();
        this.setupGlowPulseEffect();
    }

    /**
     * Setup 3D card tilt effect
     */
    setupCardTiltEffect() {
        if (this.isReducedMotion) return;

        const tiltCards = document.querySelectorAll('.project-card, .testimonial-card, .collaboration-card');
        
        tiltCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transformStyle = 'preserve-3d';
            });
            
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                const rotateX = (e.clientY - centerY) / 10;
                const rotateY = (centerX - e.clientX) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

    /**
     * Setup image reveal effect
     */
    setupImageRevealEffect() {
        const imageContainers = document.querySelectorAll('.hero-visual, .author-avatar');
        
        imageContainers.forEach(container => {
            container.addEventListener('mouseenter', () => {
                if (!this.isReducedMotion) {
                    this.createImageRevealEffect(container);
                }
            });
        });
    }

    /**
     * Create image reveal effect
     */
    createImageRevealEffect(container) {
        const overlay = document.createElement('div');
        overlay.className = 'image-reveal-overlay';
        overlay.style.cssText = `
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.3), transparent);
            z-index: 1;
            transition: left 0.6s ease;
        `;
        
        container.style.position = 'relative';
        container.style.overflow = 'hidden';
        container.appendChild(overlay);
        
        setTimeout(() => {
            overlay.style.left = '100%';
        }, 50);
        
        setTimeout(() => {
            if (overlay.parentNode) {
                overlay.parentNode.removeChild(overlay);
            }
        }, 650);
    }

    /**
     * Setup text scramble effect
     */
    setupTextScrambleEffect() {
        const scrambleElements = document.querySelectorAll('.cosmic-glow, .text-gradient');
        
        scrambleElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                if (!this.isReducedMotion) {
                    this.scrambleText(element);
                }
            });
        });
    }

    /**
     * Scramble text animation
     */
    scrambleText(element) {
        const originalText = element.textContent;
        const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
        let iteration = 0;
        
        const interval = setInterval(() => {
            element.textContent = originalText
                .split('')
                .map((char, index) => {
                    if (index < iteration) {
                        return originalText[index];
                    }
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join('');
            
            if (iteration >= originalText.length) {
                clearInterval(interval);
                element.textContent = originalText;
            }
            
            iteration += 1 / 3;
        }, 30);
    }

    /**
     * Setup glow pulse effect
     */
    setupGlowPulseEffect() {
        const glowElements = document.querySelectorAll('.orb-core, .timeline-marker');
        
        glowElements.forEach(element => {
            element.addEventListener('click', () => {
                if (!this.isReducedMotion) {
                    this.createGlowPulse(element);
                }
            });
        });
    }

    /**
     * Create glow pulse effect
     */
    createGlowPulse(element) {
        const pulse = document.createElement('div');
        pulse.className = 'glow-pulse';
        pulse.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, rgba(99, 102, 241, 0.8) 0%, transparent 70%);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            animation: pulse-expand 1s ease-out forwards;
            pointer-events: none;
            z-index: 1000;
        `;
        
        element.style.position = 'relative';
        element.appendChild(pulse);
        
        setTimeout(() => {
            if (pulse.parentNode) {
                pulse.parentNode.removeChild(pulse);
            }
        }, 1000);
    }

    /**
     * Setup scroll-based effects
     */
    setupScrollEffects() {
        this.setupScrollReveal();
        this.setupScrollProgress();
        this.setupScrollSnap();
    }

    /**
     * Setup scroll reveal animations
     */
    setupScrollReveal() {
        const revealElements = document.querySelectorAll('.timeline-item, .skill-category, .stat-item');
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationDelay = `${Math.random() * 0.5}s`;
                    entry.target.classList.add('reveal-animation');
                }
            });
        }, { threshold: 0.2 });
        
        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    }

    /**
     * Setup scroll progress indicator
     */
    setupScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #6366f1, #0ea5e9, #8b5cf6);
            z-index: 10000;
            transition: width 0.1s ease;
        `;
        
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', () => {
            const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            progressBar.style.width = `${Math.min(scrollPercent, 100)}%`;
        });
    }

    /**
     * Setup scroll snap for sections
     */
    setupScrollSnap() {
        const sections = document.querySelectorAll('section');
        let isScrolling = false;
        
        window.addEventListener('wheel', (e) => {
            if (isScrolling || this.isReducedMotion) return;
            
            const delta = e.deltaY;
            const currentSection = this.getCurrentSection();
            const sections = Array.from(document.querySelectorAll('section[id]'));
            const currentIndex = sections.findIndex(section => section.id === currentSection);
            
            if (Math.abs(delta) > 50) { // Threshold for intentional scroll
                isScrolling = true;
                
                let targetIndex;
                if (delta > 0 && currentIndex < sections.length - 1) {
                    targetIndex = currentIndex + 1;
                } else if (delta < 0 && currentIndex > 0) {
                    targetIndex = currentIndex - 1;
                }
                
                if (targetIndex !== undefined) {
                    e.preventDefault();
                    sections[targetIndex].scrollIntoView({ behavior: 'smooth' });
                }
                
                setTimeout(() => {
                    isScrolling = false;
                }, 1000);
            }
        }, { passive: false });
    }

    /**
     * Get current section in viewport
     */
    getCurrentSection() {
        const sections = document.querySelectorAll('section[id]');
        let currentSection = 'home';
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                currentSection = section.id;
            }
        });
        
        return currentSection;
    }

    /**
     * Setup custom cursor effects
     */
    setupCursorEffects() {
        if (this.isReducedMotion || window.innerWidth < 768) return;
        
        this.createCustomCursor();
        this.setupCursorInteractions();
    }

    /**
     * Create custom cursor
     */
    createCustomCursor() {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: rgba(99, 102, 241, 0.5);
            border-radius: 50%;
            pointer-events: none;
            z-index: 10000;
            transition: transform 0.1s ease;
            mix-blend-mode: difference;
        `;
        
        document.body.appendChild(cursor);
        this.cursor = cursor;
        
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = `${e.clientX - 10}px`;
            cursor.style.top = `${e.clientY - 10}px`;
        });
    }

    /**
     * Setup cursor interactions
     */
    setupCursorInteractions() {
        if (!this.cursor) return;
        
        const interactiveElements = document.querySelectorAll('a, button, .btn, .project-card');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.cursor.style.transform = 'scale(2)';
                this.cursor.style.background = 'rgba(99, 102, 241, 0.8)';
            });
            
            element.addEventListener('mouseleave', () => {
                this.cursor.style.transform = 'scale(1)';
                this.cursor.style.background = 'rgba(99, 102, 241, 0.5)';
            });
        });
    }

    /**
     * Update cursor trail effect
     */
    updateCursorTrail() {
        if (this.isReducedMotion || !this.cursor) return;
        
        // Create trail particle
        const trail = document.createElement('div');
        trail.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: rgba(99, 102, 241, 0.6);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${this.mousePosition.x - 2}px;
            top: ${this.mousePosition.y - 2}px;
            animation: trail-fade 0.5s ease-out forwards;
        `;
        
        document.body.appendChild(trail);
        
        setTimeout(() => {
            if (trail.parentNode) {
                trail.parentNode.removeChild(trail);
            }
        }, 500);
    }

    /**
     * Setup sound effects (optional)
     */
    setupSoundEffects() {
        // Create audio context for subtle UI sounds
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.setupUISound();
        } catch (e) {
            console.log('Audio context not supported');
        }
    }

    /**
     * Setup UI sound effects
     */
    setupUISound() {
        if (!this.audioContext) return;
        
        const buttons = document.querySelectorAll('.btn, .nav-link');
        
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                this.playUISound(440, 0.1, 0.1); // Subtle click sound
            });
        });
    }

    /**
     * Play UI sound
     */
    playUISound(frequency, duration, volume) {
        if (!this.audioContext || this.isReducedMotion) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(volume, this.audioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration);
    }

    /**
     * Setup gesture controls for mobile
     */
    setupGestureControls() {
        let touchStartY = 0;
        let touchEndY = 0;
        
        document.addEventListener('touchstart', (e) => {
            touchStartY = e.changedTouches[0].screenY;
        });
        
        document.addEventListener('touchend', (e) => {
            touchEndY = e.changedTouches[0].screenY;
            this.handleGesture();
        });
        
        this.handleGesture = () => {
            const swipeThreshold = 50;
            const diff = touchStartY - touchEndY;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe up - next section
                    this.navigateToNextSection();
                } else {
                    // Swipe down - previous section
                    this.navigateToPreviousSection();
                }
            }
        };
    }

    /**
     * Navigate to next section
     */
    navigateToNextSection() {
        const sections = Array.from(document.querySelectorAll('section[id]'));
        const currentSection = this.getCurrentSection();
        const currentIndex = sections.findIndex(section => section.id === currentSection);
        
        if (currentIndex < sections.length - 1) {
            sections[currentIndex + 1].scrollIntoView({ behavior: 'smooth' });
        }
    }

    /**
     * Navigate to previous section
     */
    navigateToPreviousSection() {
        const sections = Array.from(document.querySelectorAll('section[id]'));
        const currentSection = this.getCurrentSection();
        const currentIndex = sections.findIndex(section => section.id === currentSection);
        
        if (currentIndex > 0) {
            sections[currentIndex - 1].scrollIntoView({ behavior: 'smooth' });
        }
    }

    /**
     * Setup keyboard shortcuts
     */
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Only activate shortcuts when not in form fields
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
            
            switch (e.key) {
                case 'h':
                case 'H':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
                    }
                    break;
                    
                case 'c':
                case 'C':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
                    }
                    break;
                    
                case 't':
                case 'T':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        this.toggleTheme();
                    }
                    break;
                    
                case 'Escape':
                    this.closeAllModals();
                    break;
                    
                case 'ArrowUp':
                    if (e.ctrlKey) {
                        e.preventDefault();
                        this.navigateToPreviousSection();
                    }
                    break;
                    
                case 'ArrowDown':
                    if (e.ctrlKey) {
                        e.preventDefault();
                        this.navigateToNextSection();
                    }
                    break;
            }
        });
    }

    /**
     * Toggle theme
     */
    toggleTheme() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.click();
        }
    }

    /**
     * Close all modals
     */
    closeAllModals() {
        const modals = document.querySelectorAll('.modal.show');
        modals.forEach(modal => {
            const bsModal = bootstrap.Modal.getInstance(modal);
            if (bsModal) {
                bsModal.hide();
            }
        });
    }

    /**
     * Setup advanced animations
     */
    setupAdvancedAnimations() {
        this.setupMorphingShapes();
        this.setupFloatingElements();
        this.setupTextAnimations();
    }

    /**
     * Setup morphing shapes
     */
    setupMorphingShapes() {
        if (this.isReducedMotion) return;
        
        const shapes = document.querySelectorAll('.orb-core, .project-icon, .card-icon');
        
        shapes.forEach(shape => {
            shape.addEventListener('mouseenter', () => {
                this.morphShape(shape);
            });
        });
    }

    /**
     * Morph shape animation
     */
    morphShape(element) {
        const originalBorderRadius = element.style.borderRadius || '50%';
        const morphSteps = ['30% 70% 70% 30% / 30% 30% 70% 70%', '50%', '40% 60% 60% 40% / 60% 40% 40% 60%', '50%'];
        let step = 0;
        
        const morphInterval = setInterval(() => {
            element.style.borderRadius = morphSteps[step];
            step++;
            
            if (step >= morphSteps.length) {
                clearInterval(morphInterval);
                element.style.borderRadius = originalBorderRadius;
            }
        }, 200);
    }

    /**
     * Setup floating elements
     */
    setupFloatingElements() {
        if (this.isReducedMotion) return;
        
        const floatingElements = document.querySelectorAll('.cosmic-orb, .timeline-marker');
        
        floatingElements.forEach((element, index) => {
            element.style.animation = `floating ${3 + index * 0.5}s ease-in-out infinite`;
            element.style.animationDelay = `${index * 0.2}s`;
        });
    }

    /**
     * Setup text animations
     */
    setupTextAnimations() {
        this.setupCountingNumbers();
        this.setupTypingEffect();
    }

    /**
     * Setup counting numbers animation
     */
    setupCountingNumbers() {
        const countElements = document.querySelectorAll('[data-count]');
        
        const countObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCount(entry.target);
                    countObserver.unobserve(entry.target);
                }
            });
        });
        
        countElements.forEach(element => {
            countObserver.observe(element);
        });
    }

    /**
     * Animate counting numbers
     */
    animateCount(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const counter = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(counter);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }

    /**
     * Setup typing effect for dynamic content
     */
    setupTypingEffect() {
        const typingElements = document.querySelectorAll('[data-typing]');
        
        typingElements.forEach(element => {
            const text = element.getAttribute('data-typing');
            const speed = parseInt(element.getAttribute('data-typing-speed')) || 100;
            
            this.typeText(element, text, speed);
        });
    }

    /**
     * Type text animation
     */
    typeText(element, text, speed) {
        if (this.isReducedMotion) {
            element.textContent = text;
            return;
        }
        
        element.textContent = '';
        let i = 0;
        
        const typeInterval = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeInterval);
            }
        }, speed);
    }

    /**
     * Update cosmic orb interaction
     */
    updateOrbInteraction() {
        const orb = document.querySelector('.cosmic-orb');
        if (!orb || this.isReducedMotion) return;
        
        const rect = orb.getBoundingClientRect();
        const orbCenterX = rect.left + rect.width / 2;
        const orbCenterY = rect.top + rect.height / 2;
        
        const distance = Math.sqrt(
            Math.pow(this.mousePosition.x - orbCenterX, 2) + 
            Math.pow(this.mousePosition.y - orbCenterY, 2)
        );
        
        if (distance < 200) {
            const intensity = (200 - distance) / 200;
            orb.style.filter = `brightness(${1 + intensity * 0.5}) saturate(${1 + intensity})`;
        } else {
            orb.style.filter = '';
        }
    }

    /**
     * Update particle attraction effect
     */
    updateParticleAttraction() {
        // This would interact with the quantum.js particle system
        if (window.quantumPortfolio && window.quantumPortfolio.particles) {
            const particles = window.quantumPortfolio.particles;
            
            particles.forEach(particle => {
                const dx = this.mousePosition.x - particle.x;
                const dy = this.mousePosition.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    const force = (150 - distance) / 150 * 0.002;
                    particle.vx += dx * force;
                    particle.vy += dy * force;
                }
            });
        }
    }

    /**
     * Setup performance monitoring
     */
    setupPerformanceMonitoring() {
        // Monitor frame rate
        let lastTime = performance.now();
        let frameCount = 0;
        
        const monitorPerformance = (currentTime) => {
            frameCount++;
            
            if (currentTime - lastTime >= 1000) {
                const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
                
                // Reduce effects if performance is poor
                if (fps < 30) {
                    this.reduceEffects();
                }
                
                frameCount = 0;
                lastTime = currentTime;
            }
            
            requestAnimationFrame(monitorPerformance);
        };
        
        requestAnimationFrame(monitorPerformance);
    }

    /**
     * Reduce effects for better performance
     */
    reduceEffects() {
        console.log('🐌 Reducing effects for better performance');
        
        // Disable particle interactions
        this.updateParticleAttraction = () => {};
        
        // Reduce animation frequency
        const animatedElements = document.querySelectorAll('[style*="animation"]');
        animatedElements.forEach(element => {
            element.style.animationDuration = '2s';
        });
        
        // Disable cursor trail
        this.updateCursorTrail = () => {};
    }

    /**
     * Update scroll-based effects
     */
    updateScrollBasedEffects() {
        // Dynamic blur based on scroll velocity
        if (this.scrollVelocity > 10 && !this.isReducedMotion) {
            document.body.style.filter = `blur(${Math.min(this.scrollVelocity / 50, 2)}px)`;
        } else {
            document.body.style.filter = '';
        }
        
        // Update navbar transparency based on scroll
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            const opacity = Math.min(window.scrollY / 100, 0.98);
            navbar.style.background = `rgba(15, 23, 42, ${opacity})`;
        }
    }

    /**
     * Cleanup method
     */
    destroy() {
        // Remove custom cursor
        if (this.cursor && this.cursor.parentNode) {
            this.cursor.parentNode.removeChild(this.cursor);
        }
        
        // Remove scroll progress
        const progressBar = document.querySelector('.scroll-progress');
        if (progressBar && progressBar.parentNode) {
            progressBar.parentNode.removeChild(progressBar);
        }
        
        // Close audio context
        if (this.audioContext) {
            this.audioContext.close();
        }
        
        console.log('🌟 Cosmic Interactions Destroyed');
    }
}

// CSS for additional animations
const additionalCSS = `
@keyframes trail-fade {
    0% {
        opacity: 1;
        transform: scale(1);
    }
    100% {
        opacity: 0;
        transform: scale(0);
    }
}

@keyframes pulse-expand {
    0% {
        width: 20px;
        height: 20px;
        opacity: 0.8;
    }
    100% {
        width: 100px;
        height: 100px;
        opacity: 0;
    }
}

@keyframes reveal-animation {
    0% {
        opacity: 0;
        transform: translateY(50px) rotateX(90deg);
    }
    100% {
        opacity: 1;
        transform: translateY(0) rotateX(0deg);
    }
}

.reveal-animation {
    animation: reveal-animation 0.8s ease-out forwards;
}

@keyframes floating {
    0%, 100% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-20px);
    }
}

/* Hide default cursor on interactive elements when custom cursor is active */
.custom-cursor-active {
    cursor: none !important;
}

.custom-cursor-active * {
    cursor: none !important;
}

/* Smooth transitions for all interactive elements */
.btn, .project-card, .testimonial-card, .collaboration-card {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Enhanced focus styles for accessibility */
.btn:focus-visible,
.form-control:focus-visible,
.nav-link:focus-visible {
    outline: 2px solid var(--accent-primary);
    outline-offset: 2px;
    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.2);
}

/* Reduced motion overrides */
@media (prefers-reduced-motion: reduce) {
    .reveal-animation,
    .floating,
    .pulse-expand,
    .trail-fade {
        animation: none !important;
    }
    
    .custom-cursor {
        display: none !important;
    }
    
    * {
        transition-duration: 0.01ms !important;
        animation-duration: 0.01ms !important;
    }
}
`;

// Inject additional CSS
const additionalStyle = document.createElement('style');
additionalStyle.textContent = additionalCSS;
document.head.appendChild(additionalStyle);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.cosmicInteractions = new CosmicInteractions();
    
    // Add custom cursor class to body if supported
    if (window.innerWidth >= 768 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.body.classList.add('custom-cursor-active');
    }
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CosmicInteractions;
}

/**
 * ===============================================
 * ASTROTRIAS ARCHON - QUANTUM JAVASCRIPT
 * Multidimensional Interactive System
 * ===============================================
 */

class QuantumPortfolio {
    constructor() {
        this.particles = [];
        this.canvas = null;
        this.ctx = null;
        this.animationId = null;
        this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        this.init();
    }

    /**
     * Initialize the quantum portfolio system
     */
    init() {
        this.setupCanvas();
        this.setupEventListeners();
        this.initializeAnimations();
        this.setupIntersectionObserver();
        this.setupTypewriter();
        this.setupSkillBars();
        this.setupFormValidation();
        this.setupThemeToggle();
        this.setupSmoothScrolling();
        this.setupNavbarScroll();
        this.setupCounterAnimation();
        
        console.log('🌌 Quantum Portfolio System Initialized');
    }

    /**
     * Setup cosmic particles canvas
     */
    setupCanvas() {
        if (this.isReducedMotion) return;

        this.canvas = document.getElementById('cosmic-particles');
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        this.createParticles();
        this.animateParticles();

        window.addEventListener('resize', () => this.resizeCanvas());
    }

    /**
     * Resize canvas to fit viewport
     */
    resizeCanvas() {
        if (!this.canvas) return;
        
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    /**
     * Create cosmic particles
     */
    createParticles() {
        const particleCount = Math.min(100, Math.floor(window.innerWidth / 10));
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2,
                color: this.getRandomColor()
            });
        }
    }

    /**
     * Get random cosmic color
     */
    getRandomColor() {
        const colors = ['#6366f1', '#0ea5e9', '#8b5cf6', '#10b981'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    /**
     * Animate cosmic particles
     */
    animateParticles() {
        if (!this.ctx || this.isReducedMotion) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;

            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.globalAlpha = particle.opacity;
            this.ctx.fill();

            // Draw connections
            this.drawConnections(particle);
        });

        this.animationId = requestAnimationFrame(() => this.animateParticles());
    }

    /**
     * Draw connections between nearby particles
     */
    drawConnections(particle) {
        this.particles.forEach(otherParticle => {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                this.ctx.beginPath();
                this.ctx.moveTo(particle.x, particle.y);
                this.ctx.lineTo(otherParticle.x, otherParticle.y);
                this.ctx.strokeStyle = particle.color;
                this.ctx.globalAlpha = (100 - distance) / 100 * 0.2;
                this.ctx.lineWidth = 1;
                this.ctx.stroke();
            }
        });
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Mouse movement for particle interaction
        if (!this.isReducedMotion) {
            document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));

        // Window resize
        window.addEventListener('resize', () => this.handleResize());

        // Page visibility
        document.addEventListener('visibilitychange', () => this.handleVisibilityChange());
    }

    /**
     * Handle mouse movement for particle interaction
     */
    handleMouseMove(e) {
        if (!this.particles.length) return;

        const mouseX = e.clientX;
        const mouseY = e.clientY;

        this.particles.forEach(particle => {
            const dx = mouseX - particle.x;
            const dy = mouseY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                const force = (100 - distance) / 100;
                particle.vx += dx * force * 0.001;
                particle.vy += dy * force * 0.001;
            }
        });
    }

    /**
     * Handle keyboard navigation
     */
    handleKeyDown(e) {
        // Skip to main content with Enter on skip link
        if (e.target.classList.contains('skip-link') && e.key === 'Enter') {
            e.preventDefault();
            document.getElementById('main-content').focus();
        }

        // Navigate sections with arrow keys
        if (e.ctrlKey && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
            e.preventDefault();
            this.navigateSections(e.key === 'ArrowDown');
        }
    }

    /**
     * Navigate between sections
     */
    navigateSections(down = true) {
        const sections = ['home', 'dimensions', 'timeline', 'skills', 'testimonials', 'collaborations', 'contact'];
        const currentSection = this.getCurrentSection();
        const currentIndex = sections.indexOf(currentSection);
        
        let nextIndex;
        if (down) {
            nextIndex = currentIndex < sections.length - 1 ? currentIndex + 1 : 0;
        } else {
            nextIndex = currentIndex > 0 ? currentIndex - 1 : sections.length - 1;
        }

        const nextSection = document.getElementById(sections[nextIndex]);
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    /**
     * Get current section in viewport
     */
    getCurrentSection() {
        const sections = document.querySelectorAll('section[id]');
        let currentSection = 'home';

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                currentSection = section.id;
            }
        });

        return currentSection;
    }

    /**
     * Handle window resize
     */
    handleResize() {
        this.resizeCanvas();
        this.debounce(() => {
            this.particles = [];
            this.createParticles();
        }, 300)();
    }

    /**
     * Handle page visibility change
     */
    handleVisibilityChange() {
        if (document.hidden) {
            if (this.animationId) {
                cancelAnimationFrame(this.animationId);
            }
        } else {
            this.animateParticles();
        }
    }

    /**
     * Initialize animations
     */
    initializeAnimations() {
        // Add sparkle effect to buttons
        this.setupSparkleEffect();
        
        // Add floating animation to cards
        this.setupFloatingCards();
        
        // Add glow effect on hover
        this.setupGlowEffects();
    }

    /**
     * Setup sparkle effect for interactive elements
     */
    setupSparkleEffect() {
        const sparkleElements = document.querySelectorAll('.sparkle-hover');
        
        sparkleElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                if (!this.isReducedMotion) {
                    this.createSparkles(element);
                }
            });
        });
    }

    /**
     * Create sparkle particles on element
     */
    createSparkles(element) {
        const rect = element.getBoundingClientRect();
        const sparkleCount = 5;

        for (let i = 0; i < sparkleCount; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: #6366f1;
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                left: ${rect.left + Math.random() * rect.width}px;
                top: ${rect.top + Math.random() * rect.height}px;
                animation: sparkle-fade 1s ease-out forwards;
            `;

            document.body.appendChild(sparkle);

            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            }, 1000);
        }
    }

    /**
     * Setup floating animation for cards
     */
    setupFloatingCards() {
        if (this.isReducedMotion) return;

        const cards = document.querySelectorAll('.project-card, .testimonial-card, .collaboration-card');
        
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('floating');
        });
    }

    /**
     * Setup glow effects
     */
    setupGlowEffects() {
        const glowElements = document.querySelectorAll('.cosmic-glow');
        
        glowElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                if (!this.isReducedMotion) {
                    element.style.textShadow = '0 0 40px var(--accent-primary), 0 0 60px var(--accent-primary)';
                }
            });

            element.addEventListener('mouseleave', () => {
                element.style.textShadow = '';
            });
        });
    }

    /**
     * Setup intersection observer for fade-in animations
     */
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Trigger skill bar animations
                    if (entry.target.classList.contains('skill-category')) {
                        this.animateSkillBars(entry.target);
                    }
                    
                    // Trigger counter animations
                    if (entry.target.classList.contains('stat-item')) {
                        this.animateCounter(entry.target);
                    }
                }
            });
        }, observerOptions);

        // Observe fade-in elements
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        // Observe skill categories
        document.querySelectorAll('.skill-category').forEach(el => {
            observer.observe(el);
        });

        // Observe stat items
        document.querySelectorAll('.stat-item').forEach(el => {
            observer.observe(el);
        });
    }

    /**
     * Setup typewriter effect
     */
    setupTypewriter() {
        const typewriterElements = document.querySelectorAll('[data-typewriter]');
        
        typewriterElements.forEach(element => {
            const text = element.getAttribute('data-typewriter');
            const speed = parseInt(element.getAttribute('data-speed')) || 100;
            const delay = parseInt(element.getAttribute('data-delay')) || 0;
            
            setTimeout(() => {
                this.typeWriter(element, text, speed);
            }, delay);
        });
    }

    /**
     * Typewriter animation
     */
    typeWriter(element, text, speed) {
        if (this.isReducedMotion) {
            element.textContent = text;
            return;
        }

        element.textContent = '';
        element.classList.add('typewriter');
        
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
                element.classList.remove('typewriter');
            }
        }, speed);
    }

    /**
     * Setup skill bars
     */
    setupSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = '0%';
            bar.setAttribute('data-target-width', width);
        });
    }

    /**
     * Animate skill bars
     */
    animateSkillBars(skillCategory) {
        const skillBars = skillCategory.querySelectorAll('.skill-progress');
        
        skillBars.forEach((bar, index) => {
            const targetWidth = bar.getAttribute('data-target-width');
            
            setTimeout(() => {
                bar.style.width = targetWidth;
            }, index * 200);
        });
    }

    /**
     * Setup form validation
     */
    setupFormValidation() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        const inputs = form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });

        form.addEventListener('submit', (e) => this.handleFormSubmit(e));
    }

    /**
     * Validate form field
     */
    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = `${this.getFieldLabel(fieldName)} is required.`;
        }

        // Email validation
        if (fieldName === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address.';
            }
        }

        // Name validation
        if (fieldName === 'name' && value) {
            if (value.length < 2) {
                isValid = false;
                errorMessage = 'Name must be at least 2 characters long.';
            }
        }

        // Message validation
        if (fieldName === 'message' && value) {
            if (value.length < 10) {
                isValid = false;
                errorMessage = 'Message must be at least 10 characters long.';
            }
        }

        this.setFieldValidation(field, isValid, errorMessage);
        return isValid;
    }

    /**
     * Set field validation state
     */
    setFieldValidation(field, isValid, errorMessage) {
        const errorElement = document.getElementById(`${field.name}-error`);
        
        if (isValid) {
            field.classList.remove('is-invalid');
            field.classList.add('is-valid');
            if (errorElement) {
                errorElement.textContent = '';
            }
        } else {
            field.classList.remove('is-valid');
            field.classList.add('is-invalid');
            if (errorElement) {
                errorElement.textContent = errorMessage;
            }
        }
    }

    /**
     * Clear field error
     */
    clearFieldError(field) {
        field.classList.remove('is-invalid', 'is-valid');
        const errorElement = document.getElementById(`${field.name}-error`);
        if (errorElement) {
            errorElement.textContent = '';
        }
    }

    /**
     * Get field label
     */
    getFieldLabel(fieldName) {
        const labels = {
            name: 'Name',
            email: 'Email',
            subject: 'Subject',
            message: 'Message'
        };
        return labels[fieldName] || fieldName;
    }

    /**
     * Handle form submission
     */
    async handleFormSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        const submitBtn = form.querySelector('#submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        const statusElement = document.getElementById('form-status');

        // Validate all fields
        const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
        let isFormValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            this.showFormStatus('Please correct the errors above.', 'error');
            return;
        }

        // Show loading state
        submitBtn.disabled = true;
        btnText.classList.add('d-none');
        btnLoading.classList.remove('d-none');

        try {
            // Submit to Netlify
            const response = await fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(formData).toString()
            });

            if (response.ok) {
                this.showFormStatus('🚀 Message sent successfully! I\'ll get back to you soon.', 'success');
                form.reset();
                inputs.forEach(input => this.clearFieldError(input));
            } else {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            this.showFormStatus('❌ Something went wrong. Please try again or contact me directly.', 'error');
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            btnText.classList.remove('d-none');
            btnLoading.classList.add('d-none');
        }
    }

    /**
     * Show form status message
     */
    showFormStatus(message, type) {
        const statusElement = document.getElementById('form-status');
        if (!statusElement) return;

        statusElement.textContent = message;
        statusElement.className = `mt-3 alert alert-${type === 'success' ? 'success' : 'danger'}`;
        statusElement.style.display = 'block';

        // Auto-hide after 5 seconds
        setTimeout(() => {
            statusElement.style.display = 'none';
        }, 5000);
    }

    /**
     * Setup theme toggle
     */
    setupThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        if (!themeToggle) return;

        // Load saved theme
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
        this.updateThemeIcon(savedTheme);

        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            this.updateThemeIcon(newTheme);
        });
    }

    /**
     * Update theme toggle icon
     */
    updateThemeIcon(theme) {
        const icon = document.querySelector('#theme-toggle i');
        if (!icon) return;

        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    /**
     * Setup smooth scrolling for navigation links
     */
    setupSmoothScrolling() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });

                    // Update active nav link
                    this.updateActiveNavLink(targetId);
                }
            });
        });
    }

    /**
     * Update active navigation link
     */
    updateActiveNavLink(activeId) {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${activeId}`) {
                link.classList.add('active');
            }
        });
    }

    /**
     * Setup navbar scroll effect
     */
    setupNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        let lastScrollTop = 0;
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Add scrolled class when scrolling down
            if (scrollTop > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Update active nav link based on scroll position
            this.updateActiveNavOnScroll();
            
            lastScrollTop = scrollTop;
        });
    }

    /**
     * Update active nav link based on scroll position
     */
    updateActiveNavOnScroll() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
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

    /**
     * Setup counter animation
     */
    setupCounterAnimation() {
        const counters = document.querySelectorAll('.stat-number[data-target]');
        
        counters.forEach(counter => {
            counter.textContent = '0';
        });
    }

    /**
     * Animate counter
     */
    animateCounter(statItem) {
        const counter = statItem.querySelector('.stat-number[data-target]');
        if (!counter) return;

        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 16);
    }

    /**
     * Debounce utility function
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * Cleanup method
     */
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        
        // Remove event listeners
        window.removeEventListener('resize', this.handleResize);
        document.removeEventListener('mousemove', this.handleMouseMove);
        document.removeEventListener('keydown', this.handleKeyDown);
        document.removeEventListener('visibilitychange', this.handleVisibilityChange);
        
        console.log('🌌 Quantum Portfolio System Destroyed');
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.quantumPortfolio = new QuantumPortfolio();
});

// Add sparkle animation CSS
const sparkleCSS = `
@keyframes sparkle-fade {
    0% {
        opacity: 1;
        transform: scale(0) rotate(0deg);
    }
    50% {
        opacity: 1;
        transform: scale(1) rotate(180deg);
    }
    100% {
        opacity: 0;
        transform: scale(0) rotate(360deg);
    }
}
`;

// Inject sparkle CSS
const style = document.createElement('style');
style.textContent = sparkleCSS;
document.head.appendChild(style);

/**
 * ===============================================
 * EXPORT FOR MODULE USAGE
 * ===============================================
 */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = QuantumPortfolio;
}

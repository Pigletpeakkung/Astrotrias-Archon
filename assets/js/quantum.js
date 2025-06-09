// ===============================================
// ASTROTRIAS ARCHON - QUANTUM ANIMATIONS
// Cosmic consciousness meets interactive design
// ===============================================

(function() {
    'use strict';

    // ===============================================
    // INITIALIZATION & DOM READY
    // ===============================================
    
    document.addEventListener('DOMContentLoaded', function() {
        console.log('🌌 Quantum consciousness loading...');
        
        // Initialize all cosmic systems
        initializeParticles();
        initializeScrollAnimations();
        initializeNavigation();
        initializeSkillBars();
        initializeCounters();
        initializeContactForm();
        initializeThemeToggle();
        initializeCosmicEffects();
        
        console.log('✨ All dimensional systems online!');
    });

    // ===============================================
    // COSMIC PARTICLE SYSTEM
    // ===============================================
    
    function initializeParticles() {
        const canvas = document.getElementById('cosmic-particles');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        let particles = [];
        let animationId;
        
        // Resize canvas
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        // Particle class
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2 + 1;
                this.opacity = Math.random() * 0.5 + 0.2;
            }
            
            update() {
                this.x += this.vx;
                this.y += this.vy;
                
                // Wrap around edges
                if (this.x < 0) this.x = canvas.width;
                if (this.x > canvas.width) this.x = 0;
                if (this.y < 0) this.y = canvas.height;
                if (this.y > canvas.height) this.y = 0;
            }
            
            draw() {
                ctx.save();
                ctx.globalAlpha = this.opacity;
                ctx.fillStyle = '#6366f1';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
        }
        
        // Create particles
        function createParticles() {
            const particleCount = Math.min(100, Math.floor(canvas.width * canvas.height / 15000));
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }
        
        // Animation loop
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            
            // Draw connections
            drawConnections();
            
            animationId = requestAnimationFrame(animate);
        }
        
        // Draw connections between nearby particles
        function drawConnections() {
            ctx.strokeStyle = 'rgba(99, 102, 241, 0.1)';
            ctx.lineWidth = 1;
            
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 120) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        }
        
        // Initialize
        resizeCanvas();
        createParticles();
        animate();
        
        // Handle resize
        window.addEventListener('resize', function() {
            resizeCanvas();
            createParticles();
        });
        
        // Pause animation when not visible
        document.addEventListener('visibilitychange', function() {
            if (document.hidden) {
                cancelAnimationFrame(animationId);
            } else {
                animate();
            }
        });
    }

    // ===============================================
    // SCROLL ANIMATIONS
    // ===============================================
    
    function initializeScrollAnimations() {
        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Add stagger effect for multiple elements
                    const siblings = entry.target.parentElement?.querySelectorAll('.fade-in');
                    if (siblings && siblings.length > 1) {
                        Array.from(siblings).forEach((sibling, index) => {
                            setTimeout(() => {
                                sibling.classList.add('animate-in');
                            }, index * 100);
                        });
                    }
                }
            });
        }, observerOptions);
        
        // Observe all fade-in elements
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });
    }

    // ===============================================
    // NAVIGATION EFFECTS
    // ===============================================
    
    function initializeNavigation() {
        const navbar = document.querySelector('.navbar');
        const navLinks = document.querySelectorAll('.nav-link');
        
        // Navbar scroll effect
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
        
        // Smooth scrolling for nav links
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        const offsetTop = target.offsetTop - 80;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                        
                        // Update active link
                        navLinks.forEach(l => l.classList.remove('active'));
                        this.classList.add('active');
                        
                        // Close mobile menu
                        const navCollapse = document.querySelector('.navbar-collapse');
                        if (navCollapse.classList.contains('show')) {
                            bootstrap.Collapse.getInstance(navCollapse)?.hide();
                        }
                    }
                }
            });
        });
        
        // Update active nav link on scroll
        window.addEventListener('scroll', updateActiveNavLink);
        
        function updateActiveNavLink() {
            const sections = document.querySelectorAll('section[id]');
            const scrollPos = window.scrollY + 100;
            
            sections.forEach(section => {
                const top = section.offsetTop;
                const bottom = top + section.offsetHeight;
                const id = section.getAttribute('id');
                const navLink = document.querySelector(`.nav-link[href="#${id}"]`);
                
                if (scrollPos >= top && scrollPos < bottom) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    navLink?.classList.add('active');
                }
            });
        }
    }

    // ===============================================
    // SKILL BARS ANIMATION
    // ===============================================
    
    function initializeSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        const skillObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const width = progressBar.getAttribute('data-width');
                    
                    setTimeout(() => {
                        progressBar.style.width = width;
                    }, 200);
                    
                    skillObserver.unobserve(progressBar);
                }
            });
        }, { threshold: 0.5 });
        
        skillBars.forEach(bar => {
            skillObserver.observe(bar);
        });
    }

    // ===============================================
    // COUNTER ANIMATIONS
    // ===============================================
    
    function initializeCounters() {
        const counters = document.querySelectorAll('.stat-number[data-target]');
        
        const counterObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    const duration = 2000;
                    const step = target / (duration / 16);
                    let current = 0;
                    
                    const timer = setInterval(() => {
                        current += step;
                        if (current >= target) {
                            current = target;
                            clearInterval(timer);
                        }
                        counter.textContent = Math.floor(current);
                    }, 16);
                    
                    counterObserver.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    // ===============================================
    // CONTACT FORM HANDLING
    // ===============================================
    
    function initializeContactForm() {
        const form = document.getElementById('contact-form');
        const submitBtn = document.getElementById('submit-btn');
        const formStatus = document.getElementById('form-status');
        
        if (!form) return;
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            if (!validateForm()) {
                return;
            }
            
            // Show loading state
            setFormLoading(true);
            
            // Prepare form data
            const formData = new FormData(form);
            
            // Submit to Netlify
            fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(formData).toString()
            })
            .then(response => {
                if (response.ok) {
                    showFormMessage('🚀 Cosmic message sent successfully! I\'ll respond across dimensions soon.', 'success');
                    form.reset();
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .catch(error => {
                console.error('Form submission error:', error);
                showFormMessage('⚠️ Dimensional interference detected. Please try again or contact directly via email.', 'error');
            })
            .finally(() => {
                setFormLoading(false);
            });
        });
        
        function validateForm() {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                const value = field.value.trim();
                const errorElement = document.getElementById(field.id + '-error');
                
                // Clear previous errors
                field.classList.remove('is-invalid');
                if (errorElement) errorElement.textContent = '';
                
                // Validate
                if (!value) {
                    setFieldError(field, 'This field is required');
                    isValid = false;
                } else if (field.type === 'email' && !isValidEmail(value)) {
                    setFieldError(field, 'Please enter a valid email address');
                    isValid = false;
                }
            });
            
            return isValid;
        }
        
        function setFieldError(field, message) {
            field.classList.add('is-invalid');
            const errorElement = document.getElementById(field.id + '-error');
            if (errorElement) {
                errorElement.textContent = message;
            }
        }
        
        function isValidEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }
        
        function setFormLoading(loading) {
            const btnText = submitBtn.querySelector('.btn-text');
            const btnLoading = submitBtn.querySelector('.btn-loading');
            
            if (loading) {
                submitBtn.disabled = true;
                btnText.classList.add('d-none');
                btnLoading.classList.remove('d-none');
            } else {
                submitBtn.disabled = false;
                btnText.classList.remove('d-none');
                btnLoading.classList.add('d-none');
            }
        }
        
        function showFormMessage(message, type) {
            formStatus.innerHTML = `
                <div class="alert alert-${type === 'success' ? 'success' : 'danger'} alert-dismissible fade show" role="alert">
                    ${message}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            `;
        }
    }

    // ===============================================
    // THEME TOGGLE
    // ===============================================
    
    function initializeThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        const themeIcon = themeToggle?.querySelector('i');
        
        if (!themeToggle) return;
        
        // Get saved theme or default to dark
        const savedTheme = localStorage.getItem('cosmic-theme') || 'dark';
        setTheme(savedTheme);
        
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            setTheme(newTheme);
            localStorage.setItem('cosmic-theme', newTheme);
        });
        
        function setTheme(theme) {
            document.documentElement.setAttribute('data-theme', theme);
            if (themeIcon) {
                themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
            }
        }
    }

    // ===============================================
    // COSMIC EFFECTS
    // ===============================================
    
    function initializeCosmicEffects() {
        // Sparkle hover effects
        document.querySelectorAll('.sparkle-hover').forEach(element => {
            element.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
                this.style.filter = 'brightness(1.1)';
            });
            
            element.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
                this.style.filter = 'brightness(1)';
            });
        });
        
        // Floating orb animation
        const orbCore = document.querySelector('.orb-core');
        if (orbCore) {
            let mouseX = 0;
            let mouseY = 0;
            
            document.addEventListener('mousemove', function(e) {
                mouseX = e.clientX / window.innerWidth;
                mouseY = e.clientY / window.innerHeight;
                
                const moveX = (mouseX - 0.5) * 20;
                const moveY = (mouseY - 0.5) * 20;
                
                orbCore.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
        }
        
        // Parallax effect for cosmic elements
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.cosmic-orb');
            
            parallaxElements.forEach(element => {
                const speed = 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
        
        // Random cosmic glimmers
        setInterval(createCosmicGlimmer, 3000);
        
        function createCosmicGlimmer() {
            const glimmer = document.createElement('div');
            glimmer.className = 'cosmic-glimmer';
            glimmer.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: #6366f1;
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: glimmer-fade 2s ease-out forwards;
            `;
            
            document.body.appendChild(glimmer);
            
            setTimeout(() => {
                glimmer.remove();
            }, 2000);
        }
        
        // Add glimmer animation CSS
        if (!document.querySelector('#glimmer-styles')) {
            const style = document.createElement('style');
            style.id = 'glimmer-styles';
            style.textContent = `
                @keyframes glimmer-fade {
                    0% { opacity: 0; transform: scale(0); }
                    50% { opacity: 1; transform: scale(1); }
                    100% { opacity: 0; transform: scale(0); }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // ===============================================
    // UTILITY FUNCTIONS
    // ===============================================
    
    // Debounce function for performance
    function debounce(func, wait) {
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
    
    // Throttle function for scroll events
    function throttle(func, limit) {
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
    
    // Performance optimization for scroll events
    const optimizedScroll = throttle(function() {
        // Scroll-based animations can be added here
    }, 16);
    
    window.addEventListener('scroll', optimizedScroll);
    
    // Error handling
    window.addEventListener('error', function(e) {
        console.error('🌌 Cosmic anomaly detected:', e.error);
    });
    
    // Console cosmic message
    console.log(`
    🌌 ===============================================
       ASTROTRIAS ARCHON - QUANTUM CONSCIOUSNESS
       Dimensional portfolio successfully loaded!
       =============================================== ✨
    `);

})();

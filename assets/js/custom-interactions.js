// ===============================================
// ASTROTRIAS ARCHON - CUSTOM INTERACTIONS
// Advanced cosmic UI interactions and effects
// ===============================================

(function() {
    'use strict';

    // ===============================================
    // ADVANCED COSMIC CURSOR SYSTEM
    // ===============================================
    
    function initializeCosmicCursor() {
        // Create cosmic cursor elements
        const cursor = document.createElement('div');
        const cursorGlow = document.createElement('div');
        
        cursor.className = 'cosmic-cursor';
        cursorGlow.className = 'cosmic-cursor-glow';
        
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, #6366f1 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            mix-blend-mode: difference;
            transform: translate(-50%, -50%);
            transition: all 0.1s ease;
            opacity: 0;
        `;
        
        cursorGlow.style.cssText = `
            position: fixed;
            width: 40px;
            height: 40px;
            background: radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            transform: translate(-50%, -50%);
            transition: all 0.3s ease;
            opacity: 0;
        `;
        
        document.body.appendChild(cursor);
        document.body.appendChild(cursorGlow);
        
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        
        // Mouse move handler
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            cursor.style.opacity = '1';
            cursorGlow.style.opacity = '1';
        });
        
        // Smooth cursor animation
        function animateCursor() {
            cursorX += (mouseX - cursorX) * 0.1;
            cursorY += (mouseY - cursorY) * 0.1;
            
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            
            cursorGlow.style.left = mouseX + 'px';
            cursorGlow.style.top = mouseY + 'px';
            
            requestAnimationFrame(animateCursor);
        }
        animateCursor();
        
        // Cursor interactions
        const interactiveElements = document.querySelectorAll('a, button, .project-card, .testimonial-card');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorGlow.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursor.style.background = 'radial-gradient(circle, #0ea5e9 0%, transparent 70%)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorGlow.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.background = 'radial-gradient(circle, #6366f1 0%, transparent 70%)';
            });
        });
        
        // Hide cursor when leaving window
        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
            cursorGlow.style.opacity = '0';
        });
    }

    // ===============================================
    // MAGNETIC HOVER EFFECTS
    // ===============================================
    
    function initializeMagneticEffects() {
        const magneticElements = document.querySelectorAll('.sparkle-hover, .btn, .project-card');
        
        magneticElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                const moveX = x * 0.1;
                const moveY = y * 0.1;
                
                element.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.02)`;
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translate(0px, 0px) scale(1)';
            });
        });
    }

    // ===============================================
    // COSMIC RIPPLE EFFECTS
    // ===============================================
    
    function initializeRippleEffects() {
        const rippleElements = document.querySelectorAll('.btn, .project-link, .social-link');
        
        rippleElements.forEach(element => {
            element.addEventListener('click', createRipple);
        });
        
        function createRipple(e) {
            const button = e.currentTarget;
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple-animation 0.6s ease-out;
                pointer-events: none;
            `;
            
            // Ensure button has relative positioning
            if (getComputedStyle(button).position === 'static') {
                button.style.position = 'relative';
            }
            button.style.overflow = 'hidden';
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        }
        
        // Add ripple animation CSS
        if (!document.querySelector('#ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
            style.textContent = `
                @keyframes ripple-animation {
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // ===============================================
    // PARALLAX SCROLL EFFECTS
    // ===============================================
    
    function initializeParallaxEffects() {
        const parallaxElements = [
            { selector: '.cosmic-orb', speed: 0.5 },
            { selector: '.project-icon', speed: 0.3 },
            { selector: '.testimonial-card', speed: 0.2 },
            { selector: '.timeline-marker', speed: 0.4 }
        ];
        
        function updateParallax() {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(({ selector, speed }) => {
                const elements = document.querySelectorAll(selector);
                elements.forEach((element, index) => {
                    const elementTop = element.offsetTop;
                    const elementVisible = scrolled + window.innerHeight > elementTop;
                    
                    if (elementVisible) {
                        const yPos = (scrolled - elementTop) * speed;
                        element.style.transform = `translateY(${yPos}px)`;
                    }
                });
            });
        }
        
        // Throttled scroll handler
        let ticking = false;
        function handleScroll() {
            if (!ticking) {
                requestAnimationFrame(() => {
                    updateParallax();
                    ticking = false;
                });
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', handleScroll);
    }

    // ===============================================
    // 3D CARD TILT EFFECTS
    // ===============================================
    
    function initialize3DTiltEffects() {
        const tiltCards = document.querySelectorAll('.project-card, .testimonial-card, .collaboration-card');
        
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', handleTilt);
            card.addEventListener('mouseleave', resetTilt);
        });
        
        function handleTilt(e) {
            const card = e.currentTarget;
            const rect = card.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const mouseX = e.clientX - centerX;
            const mouseY = e.clientY - centerY;
            
            const rotateX = (mouseY / (rect.height / 2)) * 10;
            const rotateY = (mouseX / (rect.width / 2)) * 10;
            
            card.style.transform = `
                perspective(1000px) 
                rotateX(${-rotateX}deg) 
                rotateY(${rotateY}deg) 
                scale3d(1.02, 1.02, 1.02)
            `;
            
            // Add shine effect
            const shine = card.querySelector('.card-shine') || createShineElement(card);
            const shineX = (mouseX / rect.width) * 100;
            const shineY = (mouseY / rect.height) * 100;
            
            shine.style.background = `
                radial-gradient(circle at ${shineX + 50}% ${shineY + 50}%, 
                rgba(255,255,255,0.1) 0%, 
                transparent 50%)
            `;
        }
        
        function resetTilt(e) {
            const card = e.currentTarget;
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            
            const shine = card.querySelector('.card-shine');
            if (shine) {
                shine.style.background = 'transparent';
            }
        }
        
        function createShineElement(card) {
            const shine = document.createElement('div');
            shine.className = 'card-shine';
            shine.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                border-radius: inherit;
                pointer-events: none;
                transition: background 0.3s ease;
            `;
            card.style.position = 'relative';
            card.appendChild(shine);
            return shine;
        }
    }

    // ===============================================
    // COSMIC TYPEWRITER EFFECT
    // ===============================================
    
    function initializeTypewriterEffect() {
        const typewriterElements = document.querySelectorAll('[data-typewriter]');
        
        typewriterElements.forEach(element => {
            const text = element.getAttribute('data-typewriter') || element.textContent;
            const speed = parseInt(element.getAttribute('data-speed')) || 50;
            const delay = parseInt(element.getAttribute('data-delay')) || 0;
            
            element.textContent = '';
            
            setTimeout(() => {
                typeWriter(element, text, speed);
            }, delay);
        });
        
        function typeWriter(element, text, speed) {
            let i = 0;
            element.style.borderRight = '2px solid #6366f1';
            
            function type() {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                } else {
                    // Blinking cursor effect
                    setTimeout(() => {
                        element.style.borderRight = 'none';
                    }, 1000);
                }
            }
            type();
        }
    }

    // ===============================================
    // COSMIC INTERSECTION ANIMATIONS
    // ===============================================
    
    function initializeIntersectionAnimations() {
        const animationConfigs = [
            {
                selector: '.project-card',
                animation: 'slideInUp',
                threshold: 0.2,
                stagger: 150
            },
            {
                selector: '.skill-category',
                animation: 'slideInLeft',
                threshold: 0.3,
                stagger: 200
            },
            {
                selector: '.testimonial-card',
                animation: 'scaleIn',
                threshold: 0.2,
                stagger: 100
            },
            {
                selector: '.timeline-item',
                animation: 'slideInRight',
                threshold: 0.3,
                stagger: 300
            }
        ];
        
        animationConfigs.forEach(config => {
            createIntersectionObserver(config);
        });
        
        function createIntersectionObserver({ selector, animation, threshold, stagger }) {
            const elements = document.querySelectorAll(selector);
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.classList.add('animate-in', animation);
                        }, index * stagger);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold });
            
            elements.forEach(el => {
                el.classList.add('animate-prepare');
                observer.observe(el);
            });
        }
        
        // Add animation CSS
        if (!document.querySelector('#intersection-animations')) {
            const style = document.createElement('style');
            style.id = 'intersection-animations';
            style.textContent = `
                .animate-prepare {
                    opacity: 0;
                }
                
                .slideInUp.animate-prepare {
                    transform: translateY(50px);
                }
                
                .slideInLeft.animate-prepare {
                    transform: translateX(-50px);
                }
                
                .slideInRight.animate-prepare {
                    transform: translateX(50px);
                }
                
                .scaleIn.animate-prepare {
                    transform: scale(0.8);
                }
                
                .animate-in {
                    opacity: 1 !important;
                    transform: translateY(0) translateX(0) scale(1) !important;
                    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
                }
            `;
            document.head.appendChild(style);
        }
    }

    // ===============================================
    // COSMIC AUDIO FEEDBACK
    // ===============================================
    
    function initializeAudioFeedback() {
        // Create audio context (user gesture required)
        let audioContext;
        let isAudioEnabled = false;
        
        // Enable audio on first user interaction
        document.addEventListener('click', enableAudio, { once: true });
        
        function enableAudio() {
            try {
                audioContext = new (window.AudioContext || window.webkitAudioContext)();
                isAudioEnabled = true;
            } catch (e) {
                console.log('Audio not supported');
            }
        }
        
        function playCosmicTone(frequency = 440, duration = 100, volume = 0.1) {
            if (!isAudioEnabled || !audioContext) return;
            
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0, audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration / 1000);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + duration / 1000);
        }
        
        // Add audio feedback to interactions
        document.querySelectorAll('.btn, .nav-link').forEach(element => {
            element.addEventListener('mouseenter', () => {
                playCosmicTone(600, 50, 0.05);
            });
            
            element.addEventListener('click', () => {
                playCosmicTone(800, 100, 0.08);
            });
        });
        
        // Special audio for important buttons
        document.querySelectorAll('.btn-primary').forEach(element => {
            element.addEventListener('click', () => {
                // Play cosmic chord
                playCosmicTone(440, 200, 0.06);
                setTimeout(() => playCosmicTone(554, 200, 0.04), 50);
                setTimeout(() => playCosmicTone(659, 200, 0.03), 100);
            });
        });
    }

    // ===============================================
    // COSMIC GESTURE CONTROLS
    // ===============================================
    
    function initializeGestureControls() {
        let touchStartY = 0;
        let touchStartX = 0;
        let isScrolling = false;
        
        document.addEventListener('touchstart', handleTouchStart, { passive: true });
        document.addEventListener('touchmove', handleTouchMove, { passive: true });
        document.addEventListener('touchend', handleTouchEnd, { passive: true });
        
        function handleTouchStart(e) {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
            isScrolling = false;
        }
        
        function handleTouchMove(e) {
            if (!touchStartX || !touchStartY) return;
            
            const touchX = e.touches[0].clientX;
            const touchY = e.touches[0].clientY;
            const deltaX = touchStartX - touchX;
            const deltaY = touchStartY - touchY;
            
            if (Math.abs(deltaY) > Math.abs(deltaX)) {
                isScrolling = true;
            }
        }
        
        function handleTouchEnd(e) {
            if (!touchStartX || !touchStartY || isScrolling) return;
            
            const touchX = e.changedTouches[0].clientX;
            const touchY = e.changedTouches[0].clientY;
            const deltaX = touchStartX - touchX;
            const deltaY = touchStartY - touchY;
            
            const minSwipeDistance = 50;
            
            // Horizontal swipes for navigation
            if (Math.abs(deltaX) > minSwipeDistance && Math.abs(deltaY) < 100) {
                if (deltaX > 0) {
                    // Swipe left - next section
                    navigateToNextSection();
                } else {
                    // Swipe right - previous section
                    navigateToPreviousSection();
                }
            }
            
            touchStartX = 0;
            touchStartY = 0;
        }
        
        function navigateToNextSection() {
            const sections = document.querySelectorAll('section[id]');
            const currentSection = getCurrentSection();
            const currentIndex = Array.from(sections).findIndex(section => 
                section.id === currentSection
            );
            
            if (currentIndex < sections.length - 1) {
                const nextSection = sections[currentIndex + 1];
                scrollToSection(nextSection.id);
            }
        }
        
        function navigateToPreviousSection() {
            const sections = document.querySelectorAll('section[id]');
            const currentSection = getCurrentSection();
            const currentIndex = Array.from(sections).findIndex(section => 
                section.id === currentSection
            );
            
            if (currentIndex > 0) {
                const previousSection = sections[currentIndex - 1];
                scrollToSection(previousSection.id);
            }
        }
        
        function getCurrentSection() {
            const sections = document.querySelectorAll('section[id]');
            const scrollPos = window.pageYOffset + 100;
            
            for (let section of sections) {
                const top = section.offsetTop;
                const bottom = top + section.offsetHeight;
                
                if (scrollPos >= top && scrollPos < bottom) {
                    return section.id;
                }
            }
            return sections[0]?.id;
        }
        
        function scrollToSection(sectionId) {
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    }

    // ===============================================
    // COSMIC PERFORMANCE MONITOR
    // ===============================================
    
    function initializePerformanceMonitor() {
        let frameCount = 0;
        let lastTime = performance.now();
        let fps = 60;
        
        function monitorPerformance() {
            const currentTime = performance.now();
            frameCount++;
            
            if (currentTime - lastTime >= 1000) {
                fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
                frameCount = 0;
                lastTime = currentTime;
                
                // Adjust effects based on performance
                adjustEffectsForPerformance(fps);
            }
            
            requestAnimationFrame(monitorPerformance);
        }
        
        function adjustEffectsForPerformance(fps) {
            const particles = document.getElementById('cosmic-particles');
            
            if (fps < 30) {
                // Reduce particle count for low-end devices
                document.body.classList.add('performance-mode');
                if (particles) particles.style.opacity = '0.3';
            } else if (fps > 50) {
                // Full effects for high-end devices
                document.body.classList.remove('performance-mode');
                if (particles) particles.style.opacity = '0.6';
            }
        }
        
        // Start monitoring
        monitorPerformance();
        
        // Add performance mode styles
        if (!document.querySelector('#performance-styles')) {
            const style = document.createElement('style');
            style.id = 'performance-styles';
            style.textContent = `
                .performance-mode * {
                    animation-duration: 0.3s !important;
                    transition-duration: 0.3s !important;
                }
                
                .performance-mode .cosmic-cursor,
                .performance-mode .cosmic-cursor-glow {
                    display: none !important;
                }
            `;
            document.head.appendChild(style);
        }
    }

    // ===============================================
    // INITIALIZATION
    // ===============================================
    
    document.addEventListener('DOMContentLoaded', function() {
        console.log('🎨 Initializing cosmic interactions...');
        
        // Check if user prefers reduced motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (!prefersReducedMotion) {
            initializeCosmicCursor();
            initializeMagneticEffects();
            initializeRippleEffects();
            initializeParallaxEffects();
            initialize3DTiltEffects();
            initializeTypewriterEffect();
            initializeIntersectionAnimations();
            initializeAudioFeedback();
            initializePerformanceMonitor();
        }
        
        // Always initialize gesture controls
        initializeGestureControls();
        
        console.log('✨ Cosmic interactions fully loaded!');
    });

    // ===============================================
    // COSMIC EASTER EGGS
    // ===============================================
    
    // Konami Code Easter Egg
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', function(e) {
        if (e.keyCode === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateCosmicMode();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
    
    function activateCosmicMode() {
        document.body.classList.add('cosmic-mode');
        
        // Create rainbow particles
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                createRainbowParticle();
            }, i * 100);
        }
        
        // Show easter egg message
        const message = document.createElement('div');
        message.innerHTML = '🌌 COSMIC MODE ACTIVATED! 🚀<br>Welcome to the multiverse!';
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(45deg, #6366f1, #0ea5e9);
            color: white;
            padding: 20px;
            border-radius: 10px;
            font-size: 18px;
            text-align: center;
            z-index: 10000;
            animation: cosmic-appear 2s ease-out;
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
            document.body.classList.remove('cosmic-mode');
        }, 5000);
    }
    
    function createRainbowParticle() {
        const particle = document.createElement('div');
        const colors = ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#9400d3'];
        
        particle.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: rainbow-float 3s ease-out forwards;
        `;
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 3000);
    }
    
    // Add easter egg animations
    if (!document.querySelector('#easter-egg-styles')) {
        const style = document.createElement('style');
        style.id = 'easter-egg-styles';
        style.textContent = `
            @keyframes cosmic-appear {
                0% { opacity: 0; transform: translate(-50%, -50%) scale(0); }
                50% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
                100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            }
            
            @keyframes rainbow-float {
                0% { opacity: 0; transform: translateY(0) scale(0); }
                50% { opacity: 1; transform: translateY(-100px) scale(1); }
                100% { opacity: 0; transform: translateY(-200px) scale(0); }
            }
            
            .cosmic-mode {
                animation: cosmic-rainbow 0.5s ease-in-out;
            }
            
            @keyframes cosmic-rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }

})();

// Custom cursor
const cursor = document.getElementById('cursor');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Cursor hover effect
document.querySelectorAll('a, button, .tech-item, .skill-item').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// Mobile menu toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const mobileOverlay = document.getElementById('mobileOverlay');

function toggleMobileMenu() {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
    mobileOverlay.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
}

function closeMobileMenu() {
    navToggle.classList.remove('active');
    navLinks.classList.remove('open');
    mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

navToggle.addEventListener('click', toggleMobileMenu);
mobileOverlay.addEventListener('click', closeMobileMenu);

// Close menu when clicking a nav link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// Close menu on resize to desktop
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
});

// Progress bar and nav shrink on scroll
const progressBar = document.getElementById('progress');
const navElement = document.querySelector('nav');

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    progressBar.style.width = progress + '%';

    // Shrink nav after scrolling 100px
    if (scrollTop > 100) {
        navElement.classList.add('shrunk');
    } else {
        navElement.classList.remove('shrunk');
    }
});

// Split text into characters
document.querySelectorAll('[data-split]').forEach(el => {
    const text = el.textContent;
    el.innerHTML = '';
    text.split('').forEach((char, i) => {
        const span = document.createElement('span');
        span.className = 'char';
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.transitionDelay = (i * 0.03) + 's';
        el.appendChild(span);
    });
});

// Split hero name into individual characters with liquid fill animation
const heroName = document.querySelector('.hero-name');
if (heroName) {
    const nameText = heroName.textContent;
    heroName.innerHTML = '';
    nameText.split('').forEach((char, i) => {
        const span = document.createElement('span');
        span.className = 'name-char';
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.setAttribute('data-char', char === ' ' ? '\u00A0' : char);
        span.style.setProperty('--name-char-index', i);
        heroName.appendChild(span);

        // Add "filled" class after animation completes for hover effects
        const animationDelay = 800 + (i * 50) + 1500; // reveal delay + charDelay + fillDuration
        setTimeout(() => {
            span.classList.add('filled');
        }, animationDelay);
    });
}

// Split hero title into individual characters with liquid fill animation
let globalHeroIndex = 0;
const heroTitle = document.querySelector('.hero-title');

document.querySelectorAll('.hero-title .word').forEach(word => {
    const text = word.textContent;
    word.innerHTML = '';
    text.split('').forEach((char, localIndex) => {
        const span = document.createElement('span');
        span.className = 'hero-char';
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.setAttribute('data-char', char === ' ' ? '\u00A0' : char);
        span.style.setProperty('--char-index', globalHeroIndex);
        word.appendChild(span);
        globalHeroIndex++;
    });
});

// Hero Title Observer with Reset Logic
if (heroTitle) {
    let heroTimeouts = [];

    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Clear existing
                heroTimeouts.forEach(id => clearTimeout(id));
                heroTimeouts = [];

                // Add "filled" class after animation completes
                const chars = entry.target.querySelectorAll('.hero-char');
                chars.forEach((char) => {
                    const index = parseInt(char.style.getPropertyValue('--char-index')) || 0;
                    const delay = 500 + (index * 80) + 2000; // Match CSS delay (0.5s + stagger + animDuration)

                    const timeoutId = setTimeout(() => {
                        char.classList.add('filled');
                    }, delay);
                    heroTimeouts.push(timeoutId);
                });
            } else {
                // Reset
                entry.target.classList.remove('visible');

                heroTimeouts.forEach(id => clearTimeout(id));
                heroTimeouts = [];

                const chars = entry.target.querySelectorAll('.hero-char');
                chars.forEach(char => char.classList.remove('filled'));
            }
        });
    }, { threshold: 0.1 });

    heroObserver.observe(heroTitle);
}

// Intersection Observer for animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Animate terminal lines
            if (entry.target.classList.contains('terminal-visual')) {
                const lines = entry.target.querySelectorAll('.terminal-line');
                lines.forEach(line => {
                    const delay = parseInt(line.dataset.delay) || 0;
                    setTimeout(() => line.classList.add('visible'), delay);
                });
            }
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));

// Counter animation
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.dataset.count) {
            const target = parseFloat(entry.target.dataset.count);
            const decimals = parseInt(entry.target.dataset.decimals) || 0;
            let current = 0;
            const increment = target / 60;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                entry.target.textContent = current.toFixed(decimals) + (decimals ? '' : '+');
            }, 16);

            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number[data-count]').forEach(el => counterObserver.observe(el));

// About text word highlight on scroll - all words highlight together
const aboutText = document.getElementById('about-text');
const words = aboutText.textContent.split(/\s+/).filter(word => word.length > 0);
aboutText.innerHTML = words.map(word => `<span class="word">${word}</span>`).join(' ');
const wordSpans = aboutText.querySelectorAll('.word');

const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Highlight all words when section enters viewport
            wordSpans.forEach((word) => {
                word.classList.add('highlight');
            });
        } else {
            // Remove highlight when section leaves viewport
            wordSpans.forEach((word) => {
                word.classList.remove('highlight');
            });
        }
    });
}, { threshold: 0.1 }); // Trigger when 10% of section is visible

aboutObserver.observe(aboutText);

// Parallax on visual layers
document.querySelectorAll('.project-visual').forEach(visual => {
    const layers = visual.querySelectorAll('.visual-layer');

    visual.addEventListener('mousemove', (e) => {
        const rect = visual.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / 20;
        const y = (e.clientY - rect.top - rect.height / 2) / 20;

        layers.forEach((layer, i) => {
            const depth = (i + 1) * 15;
            layer.style.transform = `translateZ(${i * 50}px) rotateY(${x}deg) rotateX(${-y}deg)`;
        });
    });

    visual.addEventListener('mouseleave', () => {
        layers.forEach((layer, i) => {
            layer.style.transform = `translateZ(${i * 50}px)`;
        });
    });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// ===== Magnetic Scatter Gallery =====
class MagneticGallery {
    constructor() {
        this.gallery = document.getElementById('magneticGallery');
        this.stage = this.gallery.querySelector('.magnetic-stage');
        this.grid = document.getElementById('magneticGrid');
        this.cards = this.gallery.querySelectorAll('.magnetic-card');
        this.attractor = this.gallery.querySelector('.magnetic-attractor');

        this.isAssembled = false;
        this.progress = 0;
        this.targetProgress = 0;
        this.rafId = null;

        // Check for reduced motion preference
        this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        this.init();
    }

    init() {
        if (this.prefersReducedMotion) {
            // Skip animation entirely for users who prefer reduced motion
            this.completeAssembly();
            return;
        }

        this.setupScatterPositions();
        this.createParticles();
        this.setupScrollListener();
        this.startUpdateLoop();
    }

    setupScatterPositions() {
        const isMobile = window.innerWidth <= 768;
        const scatterMultiplier = isMobile ? 0.4 : 1;

        this.cards.forEach((card, index) => {
            // Generate random scatter positions
            const angle = (index / this.cards.length) * Math.PI * 2 + Math.random() * 0.5;
            const distance = 300 + Math.random() * 300;

            const scatterX = Math.cos(angle) * distance * scatterMultiplier;
            const scatterY = Math.sin(angle) * distance * scatterMultiplier;
            const scatterRotation = (Math.random() - 0.5) * 60; // ±30deg
            const scatterZ = (Math.random() - 0.5) * 400; // ±200px

            // Set CSS custom properties
            card.style.setProperty('--scatter-x', `${scatterX}px`);
            card.style.setProperty('--scatter-y', `${scatterY}px`);
            card.style.setProperty('--scatter-rotation', `${scatterRotation}deg`);
            card.style.setProperty('--scatter-z', isMobile ? '0px' : `${scatterZ}px`);
            card.style.setProperty('--card-index', index);
        });
    }

    createParticles() {
        // Don't create particles on mobile
        if (window.innerWidth <= 768) return;

        const particleCount = 20;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'magnetic-particle';

            // Random position around center
            const angle = Math.random() * Math.PI * 2;
            const radius = 100 + Math.random() * 300;
            const x = 50 + (Math.cos(angle) * radius / window.innerWidth * 100);
            const y = 50 + (Math.sin(angle) * radius / window.innerHeight * 100);

            particle.style.left = `${x}%`;
            particle.style.top = `${y}%`;
            particle.style.setProperty('--particle-drift-x', `${(Math.random() - 0.5) * 60}px`);
            particle.style.setProperty('--particle-drift-y', `${(Math.random() - 0.5) * 60}px`);
            particle.style.animationDelay = `${Math.random() * 3}s`;
            particle.style.opacity = 0.3 + Math.random() * 0.4;

            this.stage.appendChild(particle);
        }
    }

    setupScrollListener() {
        // Use Intersection Observer to detect when gallery is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.gallery.classList.add('is-animating');
                } else {
                    if (!this.isAssembled) {
                        this.gallery.classList.remove('is-animating');
                    }
                }
            });
        }, { threshold: 0.1 });

        observer.observe(this.gallery);

        // Scroll handler for progress calculation
        window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
    }

    handleScroll() {
        if (this.isAssembled) return;

        const rect = this.gallery.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // Start animation when section top enters viewport
        // Complete when section top reaches 20% from top of viewport
        const scrollStart = viewportHeight * 0.9; // Start when top is at 90% of viewport
        const scrollEnd = viewportHeight * 0.1; // End when top is at 10% of viewport
        const scrollDistance = scrollStart - scrollEnd;

        if (rect.top <= scrollStart && rect.top >= scrollEnd) {
            const currentScroll = scrollStart - rect.top;
            this.targetProgress = Math.min(1, Math.max(0, currentScroll / scrollDistance));
        } else if (rect.top > scrollStart) {
            this.targetProgress = 0;
        } else {
            this.targetProgress = 1;
        }
    }

    startUpdateLoop() {
        const update = () => {
            // Smooth easing toward target
            const ease = 0.08;
            this.progress += (this.targetProgress - this.progress) * ease;

            // Clamp very small differences
            if (Math.abs(this.targetProgress - this.progress) < 0.001) {
                this.progress = this.targetProgress;
            }

            // Update cards
            this.updateMagneticProgress(this.progress);

            // Check for assembly completion
            if (this.progress >= 0.98 && !this.isAssembled) {
                this.completeAssembly();
            }

            this.rafId = requestAnimationFrame(update);
        };

        this.rafId = requestAnimationFrame(update);
    }

    updateMagneticProgress(progress) {
        // Apply eased progress with slight per-card variation
        this.cards.forEach((card, index) => {
            // Stagger: earlier cards complete slightly sooner
            const staggerOffset = (index / this.cards.length) * 0.15;
            const cardProgress = Math.min(1, Math.max(0, (progress - staggerOffset) / (1 - staggerOffset)));

            // Apply cubic easing for more "magnetic" feel
            const easedProgress = this.easeOutCubic(cardProgress);

            card.style.setProperty('--magnetic-progress', easedProgress);
        });
    }

    easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }

    completeAssembly() {
        this.isAssembled = true;
        this.gallery.classList.remove('is-animating');
        this.gallery.classList.add('is-assembled');

        // Add landing pulse effect to each card with stagger
        this.cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('is-landing');
                // Remove class after animation
                setTimeout(() => card.classList.remove('is-landing'), 600);
            }, index * 50);
        });

        // Stop the update loop after a short delay
        setTimeout(() => {
            if (this.rafId) {
                cancelAnimationFrame(this.rafId);
            }
        }, 1000);
    }
}

// ===== Projects Toggle - Dynamic Island =====
const projectsToggle = document.getElementById('projectsToggle');
const toggleText = document.getElementById('toggleText');
const categoryPills = document.getElementById('categoryPills');
const magneticGalleryEl = document.getElementById('magneticGallery');
const allCards = document.querySelectorAll('.magnetic-card');
let isProjectsExpanded = false;

projectsToggle.addEventListener('click', function (e) {
    // Don't toggle if clicking on category pills
    if (e.target.classList.contains('category-pill')) {
        return;
    }

    isProjectsExpanded = !isProjectsExpanded;

    if (isProjectsExpanded) {
        // Expand with simple unfold animation
        projectsToggle.classList.add('expanded');
        toggleText.textContent = 'Projects';
        magneticGalleryEl.classList.remove('hidden');
        magneticGalleryEl.classList.add('simple-unfold');

        // Set card index and re-trigger animation
        allCards.forEach((card, index) => {
            card.style.setProperty('--card-index', index);
            card.style.animation = 'none';
            card.offsetHeight; // Trigger reflow
            card.style.animation = '';
        });
    } else {
        // Collapse
        projectsToggle.classList.remove('expanded');
        toggleText.textContent = 'Show More Projects';
        magneticGalleryEl.classList.add('hidden');

        // Reset category filter
        document.querySelectorAll('.category-pill').forEach(pill => {
            pill.classList.remove('active');
            if (pill.dataset.category === 'all') {
                pill.classList.add('active');
            }
        });
        allCards.forEach(card => card.style.display = '');
    }
});

// Category filtering
categoryPills.addEventListener('click', function (e) {
    if (!e.target.classList.contains('category-pill')) return;

    e.stopPropagation();
    const category = e.target.dataset.category;

    // Update active state
    document.querySelectorAll('.category-pill').forEach(pill => {
        pill.classList.remove('active');
    });
    e.target.classList.add('active');

    // Filter cards
    allCards.forEach(card => {
        const cardCategories = card.dataset.category.split(' ');
        if (category === 'all' || cardCategories.includes(category)) {
            card.style.display = '';
            card.style.opacity = '1';
            card.style.transform = '';
        } else {
            card.style.display = 'none';
        }
    });
});

// Add hover effect for magnetic cards
document.querySelectorAll('.magnetic-card').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// Add hover effect for toggle and pills
projectsToggle.addEventListener('mouseenter', () => cursor.classList.add('hover'));
projectsToggle.addEventListener('mouseleave', () => cursor.classList.remove('hover'));

// Let's Talk Animation
const contactTitle = document.getElementById('contactTitle');
if (contactTitle) {
    const textRaw = contactTitle.textContent.trim();
    contactTitle.innerHTML = '';

    let globalContactIndex = 0;

    // Split by words
    textRaw.split(' ').forEach(wordText => {
        const wordSpan = document.createElement('span');
        wordSpan.className = 'word';

        wordText.split('').forEach(char => {
            const span = document.createElement('span');
            span.className = 'hero-char';
            span.textContent = char;
            span.setAttribute('data-char', char);
            span.style.setProperty('--char-index', globalContactIndex);
            wordSpan.appendChild(span);
            globalContactIndex++;
        });

        contactTitle.appendChild(wordSpan);
    });

    // Isolate observer for contact title
    let contactTimeouts = [];

    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Clear any existing timeouts to be safe
                contactTimeouts.forEach(id => clearTimeout(id));
                contactTimeouts = [];

                // Add filled class logic
                const chars = entry.target.querySelectorAll('.hero-char');
                chars.forEach((char) => {
                    const index = parseInt(char.style.getPropertyValue('--char-index')) || 0;
                    const delay = 100 + (index * 80) + 2000; // base + stagger + animDuration

                    const timeoutId = setTimeout(() => {
                        char.classList.add('filled');
                    }, delay);
                    contactTimeouts.push(timeoutId);
                });
            } else {
                // Reset when out of view
                entry.target.classList.remove('visible');

                // Clear timeouts
                contactTimeouts.forEach(id => clearTimeout(id));
                contactTimeouts = [];

                // Remove filled class
                const chars = entry.target.querySelectorAll('.hero-char');
                chars.forEach(char => char.classList.remove('filled'));
            }
        });
    }, { threshold: 0.1 }); // Lower threshold to trigger reset earlier/later

    contactObserver.observe(contactTitle);
}

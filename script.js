// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Header background opacity on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    if (scrolled > 100) {
        header.style.background = 'rgba(0, 0, 0, 0.95)';
    } else {
        header.style.background = 'rgba(0, 0, 0, 0.9)';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.feature-card, .about-text, .floating-card, .section-header');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// Parallax effect for geometric shapes
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const triangles = document.querySelectorAll('.triangle');
    
    triangles.forEach((triangle, index) => {
        const speed = 0.5 + (index * 0.1);
        triangle.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Contact form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Animate button
        const submitBtn = contactForm.querySelector('.btn-primary');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Joining the Pack...';
        submitBtn.style.background = 'linear-gradient(45deg, #32CD32, #00FF00)';
        
        setTimeout(() => {
            submitBtn.textContent = 'Welcome to the Pack! 🐺';
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = 'linear-gradient(45deg, #40E0D0, #00FFFF)';
                contactForm.reset();
            }, 2000);
        }, 1500);
    });
}

// Wolf logo hover effect
document.querySelectorAll('.wolf-logo, .wolf-head').forEach(logo => {
    logo.addEventListener('mouseenter', () => {
        logo.style.transform = 'scale(1.1) rotate(5deg)';
        logo.style.filter = 'drop-shadow(0 0 30px rgba(64, 224, 208, 0.8))';
    });
    logo.addEventListener('mouseleave', () => {
        logo.style.transform = 'scale(1) rotate(0deg)';
        logo.style.filter = 'drop-shadow(0 0 20px rgba(64, 224, 208, 0.5))';
    });
});

// Wolf GIF animation on hero logo click
const wolfHead = document.querySelector('.wolf-head');
if (wolfHead) {
    const wolfGif = wolfHead.querySelector('.wolf-gif');
    const chillOverlay = document.querySelector('.chill-overlay');
    let frostActive = false;
    let frostTimeout = null;
    
    wolfHead.addEventListener('click', () => {
        // If frost is already active, make it disappear
        if (frostActive) {
            disappearFrost();
            return;
        }
        
        // Wolf GIF animation
        if (wolfGif) {
            wolfGif.classList.add('active');
            setTimeout(() => {
                wolfGif.classList.remove('active');
            }, 1800);
        }
        
        // Chill screen effect - Ice crack glass breaking
        if (chillOverlay) {
            chillOverlay.classList.add('active');
            frostActive = true;
            
            // Create additional dynamic ice crack lines
            createDynamicCracks();
            
            // Auto-remove after 30 seconds if not clicked again
            frostTimeout = setTimeout(() => {
                disappearFrost();
            }, 30000);
        }
    });
    
    // Function to make frost disappear
    function disappearFrost() {
        if (chillOverlay && frostActive) {
            chillOverlay.classList.add('disappearing');
            chillOverlay.classList.remove('active');
            
            // Clear auto-remove timeout
            if (frostTimeout) {
                clearTimeout(frostTimeout);
                frostTimeout = null;
            }
            
            // Remove all classes after fade animation completes
            setTimeout(() => {
                chillOverlay.classList.remove('disappearing');
                frostActive = false;
            }, 6000); // Match the frostDisappear animation duration
        }
    }
    
    // Add keyboard shortcut: Press 'Escape' to dismiss frost
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && frostActive) {
            disappearFrost();
        }
    });
    
    // Add click-anywhere-to-dismiss (except on the wolf)
    document.addEventListener('click', (e) => {
        if (frostActive && !wolfHead.contains(e.target) && !e.target.closest('.chill-overlay')) {
            disappearFrost();
        }
    });
}

// Create dynamic ice cracks
function createDynamicCracks() {
    const crackLayer = document.querySelector('.ice-crack-layer');
    if (!crackLayer) return;
    
    // Create 8 additional random cracks
    for (let i = 0; i < 8; i++) {
        const crack = document.createElement('div');
        crack.className = 'dynamic-crack';
        crack.style.cssText = `
            position: absolute;
            width: ${Math.random() * 40 + 20}%;
            height: ${Math.random() * 3 + 1}px;
            background: linear-gradient(90deg, 
                transparent 0%, 
                rgba(255, 255, 255, ${Math.random() * 0.5 + 0.5}) 45%, 
                rgba(255, 255, 255, 1) 50%, 
                rgba(255, 255, 255, ${Math.random() * 0.5 + 0.5}) 55%, 
                transparent 100%);
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            transform: rotate(${Math.random() * 180 - 90}deg);
            opacity: 0;
            box-shadow: 0 0 8px rgba(255, 255, 255, 0.6);
            animation: dynamicCrackSpread ${Math.random() * 0.5 + 0.5}s ease-out forwards;
            animation-delay: ${Math.random() * 1}s;
        `;
        
        crackLayer.appendChild(crack);
        
        // Remove crack after animation
        setTimeout(() => {
            if (crack.parentNode) {
                crack.parentNode.removeChild(crack);
            }
        }, 4000);
    }
}

// Add dynamic crack animation to CSS
const dynamicCrackStyle = document.createElement('style');
dynamicCrackStyle.textContent = `
@keyframes dynamicCrackSpread {
    0% {
        transform-origin: center;
        transform: scale(0, 1) rotate(var(--rotation, 0deg));
        opacity: 0;
    }
    30% {
        opacity: 1;
    }
    100% {
        transform: scale(1, 1) rotate(var(--rotation, 0deg));
        opacity: 0.8;
    }
}
`;
document.head.appendChild(dynamicCrackStyle);

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const titleLines = document.querySelectorAll('.title-line');
    if (titleLines.length > 0) {
        setTimeout(() => {
            typeWriter(titleLines[0], 'HUNT THE ALPHA', 150);
        }, 1);
        
        setTimeout(() => {
            typeWriter(titleLines[1], 'CHILL THE GAINS', 150);
        }, 2000);
    }
});

// Particle effect for hero section
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.setupCanvas();
        this.createParticles();
        this.animate();
    }
    
    setupCanvas() {
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '-1';
        this.canvas.style.opacity = '0.3';
        
        this.resize();
        window.addEventListener('resize', () => this.resize());
        
        document.body.appendChild(this.canvas);
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        for (let i = 0; i < 50; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }
    
    animate() {
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
            this.ctx.fillStyle = `rgba(64, 224, 208, ${particle.opacity})`;
            this.ctx.fill();
        });
        
        // Draw connections
        this.particles.forEach((particle, i) => {
            this.particles.slice(i + 1).forEach(other => {
                const dx = particle.x - other.x;
                const dy = particle.y - other.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(other.x, other.y);
                    this.ctx.strokeStyle = `rgba(64, 224, 208, ${0.1 * (1 - distance / 100)})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize particle system
document.addEventListener('DOMContentLoaded', () => {
    new ParticleSystem();
    initializeTeamCarousel();
});

// Team Carousel Functionality - Simple Auto-Sliding
function initializeTeamCarousel() {
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.team-member');
    
    if (!track || !slides.length) return;
    
    let currentIndex = 0;
    const slideWidth = 320; // 300px + 20px gap
    
    // Auto slide function
    function autoSlide() {
        currentIndex++;
        
        // If we've reached the end, reset to beginning
        if (currentIndex >= slides.length) {
            currentIndex = 0;
        }
        
        // Calculate and apply transform
        const translateX = -currentIndex * slideWidth;
        track.style.transform = `translateX(${translateX}px)`;
    }
    
    // Start auto-sliding every 3 seconds
    setInterval(autoSlide, 3000);
    
    // Initialize position
    track.style.transform = 'translateX(0px)';
}

// Stats counter animation
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = stat.textContent;
        let current = 0;
        const increment = target.includes('%') ? 1 : target.includes('M') ? 10000 : 1;
        const max = target.includes('%') ? parseFloat(target) : 
                   target.includes('M') ? 1000000 : 
                   target.includes('/') ? 24 : parseInt(target);
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= max) {
                stat.textContent = target;
                clearInterval(timer);
            } else {
                if (target.includes('%')) {
                    stat.textContent = current + '%';
                } else if (target.includes('M')) {
                    stat.textContent = Math.floor(current / 1000000) + 'M+';
                } else if (target.includes('/')) {
                    stat.textContent = current + '/7';
                } else {
                    stat.textContent = current;
                }
            }
        }, 50);
    });
}

// Trigger stats animation when about section is in view
const aboutSection = document.querySelector('.about');
if (aboutSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(aboutSection);
}

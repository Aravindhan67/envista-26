/* ========================================
   ENVISIAS'26 - Main JavaScript
   Interactive Features & Animations
   ======================================== */

// ====================
// Loading Screen
// ====================
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loadingScreen');

    // Simulate loading progress
    setTimeout(() => {
        loadingScreen.classList.add('hidden');

        // Remove from DOM after transition
        setTimeout(() => {
            loadingScreen.style.display = 'none';

            // Start confetti after loading
            createConfetti();
        }, 800);
    }, 2000);
});

// ====================
// Confetti Animation System
// ====================
const confettiContainer = document.getElementById('confettiContainer');
const confettiColors = ['#FFD700', '#FFE44D', '#0B1F3A', '#6B4C9A', '#FF69B4'];

function createConfetti() {
    // Create initial batch of confetti
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            createConfettiPiece();
        }, i * 50);
    }

    // Continuously create confetti
    setInterval(() => {
        createConfettiPiece();
    }, 200);
}

function createConfettiPiece() {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');

    // Random properties
    const size = Math.random() * 10 + 5;
    const color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
    const left = Math.random() * 100;
    const duration = Math.random() * 3 + 3;
    const delay = Math.random() * 2;

    confetti.style.width = `${size}px`;
    confetti.style.height = `${size}px`;
    confetti.style.background = color;
    confetti.style.left = `${left}%`;
    confetti.style.animationDuration = `${duration}s`;
    confetti.style.animationDelay = `${delay}s`;

    // Random shape
    if (Math.random() > 0.5) {
        confetti.style.borderRadius = '50%';
    } else {
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
    }

    confettiContainer.appendChild(confetti);

    // Remove after animation
    setTimeout(() => {
        confetti.remove();
    }, (duration + delay) * 1000);
}

// ====================
// Navbar Scroll Effect
// ====================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ====================
// Mobile Menu Toggle
// ====================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');

    // Animate hamburger
    const bars = hamburger.querySelectorAll('.bar');
    bars[0].style.transform = navMenu.classList.contains('active')
        ? 'rotate(45deg) translateY(10px)'
        : 'none';
    bars[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
    bars[2].style.transform = navMenu.classList.contains('active')
        ? 'rotate(-45deg) translateY(-10px)'
        : 'none';
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');

        // Reset hamburger
        const bars = hamburger.querySelectorAll('.bar');
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
    });
});

// ====================
// Smooth Scrolling
// ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ====================
// Countdown Timer
// ====================
const eventDate = new Date('March 9, 2026 00:00:00').getTime();

function updateCountdown() {
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance < 0) {
        // Event has started
        daysEl.textContent = '00';
        hoursEl.textContent = '00';
        minutesEl.textContent = '00';
        secondsEl.textContent = '00';
        return;
    }

    // Calculate time units
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update display with leading zeros
    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
}

// Update countdown every second
updateCountdown();
setInterval(updateCountdown, 1000);

// ====================
// Scroll Reveal Animation
// ====================
const revealCards = document.querySelectorAll('.reveal-card');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 150;

    revealCards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;

        if (cardTop < windowHeight - elementVisible) {
            card.classList.add('revealed');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
// Trigger once on load
revealOnScroll();

// ====================
// 3D Tilt Effect on Event Cards
// ====================
const tiltCards = document.querySelectorAll('.tilt-card');

tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Calculate rotation based on cursor position
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

// ====================
// Button Ripple Effect
// ====================
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('click', function (e) {
        const x = e.clientX - this.getBoundingClientRect().left;
        const y = e.clientY - this.getBoundingClientRect().top;

        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.style.width = '10px';
        ripple.style.height = '10px';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.borderRadius = '50%';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.pointerEvents = 'none';

        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ====================
// Parallax Effect on Hero Section
// ====================
const heroSection = document.querySelector('.hero-section');
const floatingMinions = document.querySelectorAll('.floating-minion');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;

    floatingMinions.forEach((minion, index) => {
        const speed = 0.1 + (index * 0.05);
        minion.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.02}deg)`;
    });
});

// ====================
// Trophy Animation Enhancement
// ====================
const prizeContent = document.querySelector('.prize-content');
const trophyIcon = document.querySelector('.trophy-icon');

if (trophyIcon && prizeContent) {
    // Add interactive glow on mousemove
    prizeContent.addEventListener('mousemove', (e) => {
        const rect = trophyIcon.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const moveX = (x - centerX) / 20;
        const moveY = (y - centerY) / 20;

        trophyIcon.style.textShadow = `${moveX}px ${moveY}px 30px rgba(255, 215, 0, 0.8)`;
    });

    prizeContent.addEventListener('mouseleave', () => {
        trophyIcon.style.textShadow = '0 0 20px rgba(255, 215, 0, 0.8)';
    });
}

// ====================
// Contact Card Hover Effect
// ====================
const contactCards = document.querySelectorAll('.contact-card');

contactCards.forEach(card => {
    const avatar = card.querySelector('.avatar');

    card.addEventListener('mouseenter', () => {
        avatar.style.transform = 'scale(1.2) rotate(360deg)';
        avatar.style.transition = 'all 0.6s ease';
    });

    card.addEventListener('mouseleave', () => {
        avatar.style.transform = 'scale(1) rotate(0deg)';
    });
});

// ====================
// Registration Button Click Handler
// ====================
const registerBtn = document.querySelector('.register-btn');

if (registerBtn) {
    registerBtn.addEventListener('click', (e) => {
        e.preventDefault();

        // Create celebration confetti burst
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                createConfettiPiece();
            }, i * 30);
        }

        // Show alert (replace with actual registration logic)
        alert(`🎉 Welcome to ENVISIAS'26!

Registration form coming soon!

Contact us for more details.`);
    });
}

// ====================
// Event Cards Dynamic Highlighting
// ====================
const eventCards = document.querySelectorAll('.event-card');

eventCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        // Remove highlight from all cards
        eventCards.forEach(c => {
            c.style.borderColor = 'transparent';
            c.style.boxShadow = '';
        });

        // Highlight current card
        card.style.borderColor = 'var(--minion-yellow)';
        card.style.boxShadow = '0 10px 40px rgba(255, 215, 0, 0.4)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.borderColor = 'transparent';
        card.style.boxShadow = '';
    });
});

// ====================
// QR Code Placeholder Interaction
// ====================
const qrPlaceholder = document.querySelector('.qr-placeholder');

if (qrPlaceholder) {
    qrPlaceholder.addEventListener('mouseenter', () => {
        qrPlaceholder.style.background = 'rgba(255, 215, 0, 0.1)';
        qrPlaceholder.style.borderColor = 'var(--minion-yellow-light)';
        qrPlaceholder.style.transform = 'scale(1.05)';
        qrPlaceholder.style.transition = 'all 0.3s ease';
    });

    qrPlaceholder.addEventListener('mouseleave', () => {
        qrPlaceholder.style.background = 'rgba(255, 255, 255, 0.05)';
        qrPlaceholder.style.borderColor = 'var(--minion-yellow)';
        qrPlaceholder.style.transform = 'scale(1)';
    });
}

// ====================
// About Cards Stagger Animation
// ====================
const aboutCards = document.querySelectorAll('.about-card');

aboutCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

// ====================
// Prize Amount Counter Animation
// ====================
const prizeAmount = document.querySelector('.amount');
let counted = false;

function animatePrizeAmount() {
    if (counted || !prizeAmount) return;

    const prizeSection = document.querySelector('.prize-section');
    if (!prizeSection) return;

    const sectionTop = prizeSection.getBoundingClientRect().top;

    if (sectionTop < window.innerHeight * 0.75) {
        counted = true;

        let current = 0;
        const target = 7000;
        const increment = target / 50;
        const duration = 2000;
        const stepTime = duration / 50;

        const counter = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(counter);
            }
            prizeAmount.textContent = Math.floor(current).toLocaleString('en-IN');
        }, stepTime);
    }
}

// Trigger prize animation on scroll
window.addEventListener('scroll', animatePrizeAmount);
animatePrizeAmount(); // Check on load

// ====================
// Navigation Active State
// ====================
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            if (navLink) {
                navLink.style.color = 'var(--minion-yellow)';
            }
        } else {
            if (navLink && navLink.style.color === 'var(--minion-yellow)') {
                navLink.style.color = 'var(--white)';
            }
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// ====================
// Performance Optimization
// ====================
// Throttle scroll events
function throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;

    return function (...args) {
        const currentTime = Date.now();

        if (currentTime - lastExecTime < delay) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                lastExecTime = currentTime;
                func.apply(this, args);
            }, delay);
        } else {
            lastExecTime = currentTime;
            func.apply(this, args);
        }
    };
}

// Use throttled scroll handler
const throttledScrollHandler = throttle(() => {
    revealOnScroll();
    highlightNavLink();
}, 100);

window.removeEventListener('scroll', revealOnScroll);
window.addEventListener('scroll', throttledScrollHandler);

// ====================
// Keyboard Navigation Support
// ====================
document.addEventListener('keydown', (e) => {
    // Close mobile menu with Escape key
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const bars = hamburger.querySelectorAll('.bar');
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
    }
});

// ====================
// Console Easter Egg
// ====================
console.log('%c🎉 Welcome to ENVISIAS\'26! 🎉', 'font-size: 20px; font-weight: bold; color: #FFD700;');
console.log('%cDeveloped with ❤️ by Team CSI', 'font-size: 14px; color: #FFD700;');
console.log('%cKongu Engineering College (Autonomous)', 'font-size: 12px; color: #FFE44D;');

// ====================
// Initialize Everything When DOM is Ready
// ====================
document.addEventListener('DOMContentLoaded', () => {
    console.log('ENVISIAS\'26 Website Loaded Successfully!');

    // Add loaded class to body for any CSS transitions
    document.body.classList.add('loaded');

    // Initial check for animations
    revealOnScroll();
});

// Export functions for potential external use
window.ENVISIAS = {
    createConfetti: createConfetti,
    updateCountdown: updateCountdown
};

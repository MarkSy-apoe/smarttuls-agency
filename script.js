// Mobile Navigation Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Stats Counter Animation
const statsCounters = document.querySelectorAll('.stat-number');
let hasAnimated = false;

function animateCounters() {
    if (hasAnimated) return;
    
    statsCounters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
    
    hasAnimated = true;
}

// Intersection Observer for Stats Animation
const statsSection = document.querySelector('.stats');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
            animateCounters();
        }
    });
}, {
    threshold: 0.5
});

if (statsSection) {
    statsObserver.observe(statsSection);
}

// Form Validation
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

// Validation functions
function validateName(name) {
    const nameRegex = /^[a-zA-Z\s]{2,50}$/;
    return nameRegex.test(name.trim());
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
}

function validateMessage(message) {
    return message.trim().length >= 10 && message.trim().length <= 1000;
}

// Show error message
function showError(input, message) {
    const errorElement = document.getElementById(input.id + 'Error');
    errorElement.textContent = message;
    input.classList.add('error');
}

// Clear error message
function clearError(input) {
    const errorElement = document.getElementById(input.id + 'Error');
    errorElement.textContent = '';
    input.classList.remove('error');
}

// Real-time validation
nameInput.addEventListener('blur', () => {
    if (!validateName(nameInput.value)) {
        showError(nameInput, 'Please enter a valid name (2-50 characters, letters only)');
    } else {
        clearError(nameInput);
    }
});

nameInput.addEventListener('input', () => {
    if (nameInput.classList.contains('error') && validateName(nameInput.value)) {
        clearError(nameInput);
    }
});

emailInput.addEventListener('blur', () => {
    if (!validateEmail(emailInput.value)) {
        showError(emailInput, 'Please enter a valid email address');
    } else {
        clearError(emailInput);
    }
});

emailInput.addEventListener('input', () => {
    if (emailInput.classList.contains('error') && validateEmail(emailInput.value)) {
        clearError(emailInput);
    }
});

messageInput.addEventListener('blur', () => {
    if (!validateMessage(messageInput.value)) {
        showError(messageInput, 'Message must be between 10 and 1000 characters');
    } else {
        clearError(messageInput);
    }
});

messageInput.addEventListener('input', () => {
    if (messageInput.classList.contains('error') && validateMessage(messageInput.value)) {
        clearError(messageInput);
    }
});


// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Fade-in animation for sections
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Add fade-in class to elements and observe them
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll(
        '.service-card, .testimonial-card, .about-text, .contact-form-container, .contact-info'
    );
    
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Testimonial hover effects
document.querySelectorAll('.testimonial-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Service card interactions
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const icon = card.querySelector('.service-icon svg');
        if (icon) {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        const icon = card.querySelector('.service-icon svg');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }
    });
});

// Add smooth transitions to SVG icons
document.querySelectorAll('.service-icon svg, .hero-illustration svg, .about-illustration svg').forEach(svg => {
    svg.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
});

// Performance optimization: Debounce scroll events
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

// Apply debouncing to scroll event
const debouncedScroll = debounce(() => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
}, 10);

window.addEventListener('scroll', debouncedScroll);

// Add loading state management
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger any animations that should happen after page load
    setTimeout(() => {
        document.querySelectorAll('.hero-content > *').forEach((el, index) => {
            el.style.animation = `fadeInUp 0.6s ease forwards ${index * 0.1}s`;
        });
    }, 100);
});

// Add CSS for fadeInUp animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .hero-content > * {
        opacity: 0;
    }
    
    body.loaded .hero-content > * {
        opacity: 1;
    }
`;
document.head.appendChild(style);


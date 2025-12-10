// Book Button Click Handler
function initBookButtons() {
    const bookButtons = document.querySelectorAll('.book-btn');
    bookButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.service-card');
            const destinationTitle = card.querySelector('.service-title').textContent;
            const whatsappMessage = `مرحبا GT | Game & Trip 🚀\nعايز استفسار عن رحلة ${destinationTitle}`;
            const whatsappUrl = `https://wa.me/+201XXXXXXXXX?text=${encodeURIComponent(whatsappMessage)}`;
            window.open(whatsappUrl, '_blank');
        });
    });
}

// Hamburger Menu Handler
function initHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && nav) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            nav.classList.toggle('active');
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                nav.classList.remove('active');
            });
        });
    }
}

// Countdown Timer
function initCountdown() {
    // Check if countdown elements exist before initializing
    const countdownEl = document.getElementById('countdown');
    if (!countdownEl) return;

    // Set countdown end date (7 days from now)
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 7);
    endDate.setHours(23, 59, 59, 999);

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = endDate.getTime() - now;

        if (distance < 0) {
            // Reset countdown if expired
            endDate.setDate(endDate.getDate() + 7);
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Update DOM
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    // Update immediately and then every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Smooth scrolling for navigation links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Form submission handler
function initContactForm() {
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const message = formData.get('message');
            
            // Create WhatsApp message
            const whatsappMessage = `مرحبا GT | Game & Trip 🚀\n\nالاسم: ${name}\nالبريد: ${email}\nالهاتف: ${phone}\n\nالرسالة:\n${message}`;
            const encodedMessage = encodeURIComponent(whatsappMessage);
            const whatsappUrl = `https://wa.me/+201XXXXXXXXX?text=${encodedMessage}`;
            
            // Open WhatsApp
            window.open(whatsappUrl, '_blank');
            
            // Show success message (optional)
            alert('شكراً لك! سيتم فتح واتساب لإرسال رسالتك.');
            
            // Reset form
            form.reset();
        });
    }
}

// Optimized Intersection Observer for fade-in animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Use requestAnimationFrame for smooth animation
                requestAnimationFrame(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translate3d(0, 0, 0)';
                });
                // Unobserve after animation to improve performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all cards and sections
    document.querySelectorAll('.service-card, .testimonial-card, .gallery-item, .deal-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translate3d(0, 20px, 0)';
        el.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        el.style.willChange = 'opacity, transform';
        observer.observe(el);
    });
}

// Loading Screen Handler
function initLoader() {
    const loader = document.getElementById('loader');
    
    if (!loader) return;
    
    function hideLoader() {
        if (!loader) return;
        loader.classList.add('hidden');
        // Remove from DOM after animation
        setTimeout(() => {
            if (loader.parentNode) {
                loader.parentNode.removeChild(loader);
            }
        }, 400);
    }
    
    // Hide loader after page load
    if (document.readyState === 'loading') {
        window.addEventListener('load', () => hideLoader());
    } else {
        hideLoader();
    }
    
    // Fallback timeout (max 1.5 seconds)
    setTimeout(hideLoader, 1500);
}

// Optimized scroll handler with requestAnimationFrame
let ticking = false;
function optimizedParallax() {
    if (!ticking) {
        window.requestAnimationFrame(function() {
            const hero = document.querySelector('.hero');
            if (hero) {
                const scrolled = window.pageYOffset;
                const rate = scrolled * 0.5;
                hero.style.transform = `translate3d(0, ${rate}px, 0)`;
            }
            ticking = false;
        });
        ticking = true;
    }
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initLoader();
    initHamburgerMenu();
    initBookButtons();
    initCountdown();
    initSmoothScroll();
    initContactForm();
    initScrollAnimations();
    registerServiceWorker();
});

// Register Service Worker for PWA
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/static/sw.js').catch(err => {
            console.log('Service Worker registration failed:', err);
        });
    }
}

// Optimized parallax effect with throttling
window.addEventListener('scroll', optimizedParallax, { passive: true });


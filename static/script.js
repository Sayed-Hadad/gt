// Performance monitoring
if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            if (entry.duration > 50) {
                console.warn('Slow operation detected:', entry.name, entry.duration);
            }
        }
    });
    observer.observe({ entryTypes: ['measure'] });
}

// Hide loader when page loads
function initLoader() {
    const loader = document.getElementById('loader');
    
    if (document.readyState === 'loading') {
        window.addEventListener('load', () => hideLoader());
    } else {
        hideLoader();
    }
    
    // Fallback timeout
    setTimeout(hideLoader, 2000);
    
    function hideLoader() {
        if (loader) {
            loader.classList.add('hidden');
            setTimeout(() => {
                if (loader.parentNode) loader.parentNode.removeChild(loader);
            }, 400);
        }
    }
}

// Mobile menu toggle
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    navLinks.classList.toggle('mobile-active');
    mobileMenuBtn.classList.toggle('active');
}

// Intersection Observer for fade-in animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all cards and sections
    document.querySelectorAll('.trip-card, .winter-card, .service-card, .testimonial-card, .blog-preview-card, .feature-card').forEach(el => {
        el.classList.add('fade-in-element');
        observer.observe(el);
    });
}

// Lazy load images
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Smooth scroll with offset for fixed navbar
function smoothScrollTo(target) {
    const navbarHeight = document.querySelector('.navbar').offsetHeight;
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
    
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}

// Smooth scroll for navigation links (only for same-page sections)
document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initScrollAnimations();
    initLazyLoading();

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            const isHashOnly = href && href.startsWith('#');
            const url = href ? new URL(href, window.location.origin) : null;
            const isSamePageHash = url && url.hash && url.pathname === window.location.pathname;

            if (isHashOnly || isSamePageHash) {
                e.preventDefault();
                const targetId = isHashOnly ? href : url.hash;
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    smoothScrollTo(targetSection);
                }

                // Close mobile menu if open
                const navLinks = document.querySelector('.nav-links');
                if (navLinks.classList.contains('mobile-active')) {
                    toggleMobileMenu();
                }
            }
            // Otherwise allow normal navigation (about/services pages)
        });
    });

    // Add scroll-based navbar shadow
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    }, { passive: true });
});

// Service Worker registration
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/static/sw.js').catch(() => {
        // Service worker registration failed - not critical
    });
}

// Prevent layout shift by reserving space for images
window.addEventListener('load', () => {
    document.querySelectorAll('img').forEach(img => {
        if (!img.complete) {
            img.style.minHeight = img.offsetHeight + 'px';
        }
    });
});


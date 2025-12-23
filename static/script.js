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

// Smooth scroll for navigation links (only for same-page sections)
document.addEventListener('DOMContentLoaded', () => {
    initLoader();

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
                    targetSection.scrollIntoView({ behavior: 'smooth' });
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
});

// Service Worker registration
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/static/sw.js').catch(() => {
        // Service worker registration failed - not critical
    });
}


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

// Smooth scroll for navigation links
document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    
    // Add smooth scroll to all nav links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
                
                // Close mobile menu if open
                const navLinks = document.querySelector('.nav-links');
                if (navLinks.classList.contains('mobile-active')) {
                    toggleMobileMenu();
                }
            }
        });
    });
});

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    initLoader();
});

// Service Worker registration
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/static/sw.js').catch(() => {
        // Service worker registration failed - not critical
    });
}


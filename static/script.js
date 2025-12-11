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


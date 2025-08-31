// Loading Screen Management
class LoadingManager {
    constructor() {
        this.loadingScreen = document.getElementById('loading-screen');
        this.loadingText = document.querySelector('.loading-text');
        this.resourcesLoaded = {
            dom: false,
            components: false,
            styles: false,
            images: false,
            fonts: false
        };
        this.totalResources = Object.keys(this.resourcesLoaded).length;
        this.loadedCount = 0;
        this.minimumDisplayTime = 1500; // Minimum time to show loading screen
        this.maxDisplayTime = 5000; // Maximum time to show loading screen (failsafe)
        this.startTime = Date.now();
        this.componentsToLoad = ['head-container', 'navigation-container', 'footer-container', 'scripts-container'];
        this.componentsLoaded = [];
        
        this.init();
    }
    
    init() {
        console.log('🔄 LoadingManager: Initializing...');
        
        // Set up a global reference for other scripts to use
        window.loadingManager = this;
        
        // Start monitoring resources
        this.monitorDOMReady();
        this.monitorComponents();
        this.updateLoadingText();
        
        // Failsafe: Hide loading screen after maximum time
        setTimeout(() => {
            if (this.loadingScreen && !this.loadingScreen.classList.contains('hidden')) {
                console.warn('🔄 LoadingManager: Failsafe triggered - hiding loading screen after max time');
                this.hideLoadingScreen();
            }
        }, this.maxDisplayTime);
    }
    
    monitorDOMReady() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.markResourceLoaded('dom', 'DOM indlæst');
                this.delayedResourceMonitoring();
            });
        } else {
            this.markResourceLoaded('dom', 'DOM indlæst');
            this.delayedResourceMonitoring();
        }
    }
    
    delayedResourceMonitoring() {
        // Wait a bit for dynamic components to be loaded before monitoring other resources
        setTimeout(() => {
            this.monitorStylesheets();
            this.monitorImages();
            this.monitorFonts();
        }, 500);
    }
    
    monitorComponents() {
        // Check if components are loaded by observing when their containers get content
        let checkCount = 0;
        const maxChecks = 30; // Stop checking after 3 seconds (30 * 100ms)
        
        const checkComponents = () => {
            checkCount++;
            
            this.componentsToLoad.forEach(containerId => {
                if (!this.componentsLoaded.includes(containerId)) {
                    const container = document.getElementById(containerId);
                    if (container && container.innerHTML.trim() !== '') {
                        this.componentsLoaded.push(containerId);
                        console.log(`🔄 LoadingManager: Component ${containerId} loaded`);
                    }
                }
            });
            
            if (this.componentsLoaded.length >= this.componentsToLoad.length || checkCount >= maxChecks) {
                this.markResourceLoaded('components', 'Komponenter indlæst');
                // After components are loaded, re-monitor resources that might have been added dynamically
                setTimeout(() => {
                    this.monitorStylesheets();
                    this.monitorImages();
                    this.monitorFonts();
                }, 200);
            } else {
                setTimeout(checkComponents, 100);
            }
        };
        
        setTimeout(checkComponents, 200);
    }
    
    monitorStylesheets() {
        // Skip monitoring external stylesheets that might be slow to load
        const localStylesheets = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
            .filter(link => !link.href.includes('googleapis.com') && !link.href.includes('cdnjs.cloudflare.com'));
            
        if (localStylesheets.length === 0) {
            this.markResourceLoaded('styles', 'Styles indlæst');
            return;
        }
        
        let loadedStylesheets = 0;
        const totalStylesheets = localStylesheets.length;
        
        localStylesheets.forEach(link => {
            if (link.sheet || link.disabled) {
                loadedStylesheets++;
            } else {
                const handleLoad = () => {
                    loadedStylesheets++;
                    if (loadedStylesheets >= totalStylesheets) {
                        this.markResourceLoaded('styles', 'Styles indlæst');
                    }
                };
                
                link.addEventListener('load', handleLoad, { once: true });
                link.addEventListener('error', handleLoad, { once: true }); // Count errors as loaded
                
                // Fallback check in case the load event was missed
                setTimeout(() => {
                    if (link.sheet || link.disabled) {
                        handleLoad();
                    }
                }, 2000);
            }
        });
        
        if (loadedStylesheets >= totalStylesheets) {
            this.markResourceLoaded('styles', 'Styles indlæst');
        }
        
        // If no local stylesheets, mark as loaded
        if (totalStylesheets === 0) {
            this.markResourceLoaded('styles', 'Styles indlæst');
        }
    }
    
    monitorImages() {
        const images = document.querySelectorAll('img');
        if (images.length === 0) {
            this.markResourceLoaded('images', 'Billeder indlæst');
            return;
        }
        
        let loadedImages = 0;
        const totalImages = images.length;
        
        images.forEach(img => {
            if (img.complete && (img.naturalWidth > 0 || img.src === '')) {
                loadedImages++;
            } else {
                const handleLoad = () => {
                    loadedImages++;
                    if (loadedImages >= totalImages) {
                        this.markResourceLoaded('images', 'Billeder indlæst');
                    }
                };
                
                img.addEventListener('load', handleLoad, { once: true });
                img.addEventListener('error', handleLoad, { once: true }); // Count failed images as loaded
                
                // Timeout for slow images
                setTimeout(() => {
                    if (!img.complete) {
                        console.warn(`Image loading timeout: ${img.src}`);
                        handleLoad();
                    }
                }, 3000);
            }
        });
        
        if (loadedImages >= totalImages) {
            this.markResourceLoaded('images', 'Billeder indlæst');
        }
    }
    
    monitorFonts() {
        if (document.fonts && document.fonts.ready) {
            Promise.race([
                document.fonts.ready,
                new Promise(resolve => setTimeout(resolve, 2000)) // 2 second timeout
            ]).then(() => {
                this.markResourceLoaded('fonts', 'Skrifttyper indlæst');
            }).catch(() => {
                // Even if font loading fails, mark as loaded to prevent hanging
                this.markResourceLoaded('fonts', 'Skrifttyper indlæst');
            });
        } else {
            // Fallback for browsers without font loading API
            setTimeout(() => {
                this.markResourceLoaded('fonts', 'Skrifttyper indlæst');
            }, 1500);
        }
    }
    
    markResourceLoaded(resourceType, message) {
        if (!this.resourcesLoaded[resourceType]) {
            this.resourcesLoaded[resourceType] = true;
            this.loadedCount++;
            console.log(`🔄 LoadingManager: ${message} (${this.loadedCount}/${this.totalResources})`);
            
            this.updateProgress();
            
            if (this.loadedCount >= this.totalResources) {
                this.hideLoadingScreen();
            }
        }
    }
    
    updateProgress() {
        const progressBar = document.querySelector('.loading-progress-bar');
        if (progressBar) {
            const percentage = (this.loadedCount / this.totalResources) * 100;
            progressBar.style.width = `${percentage}%`;
        }
    }
    
    updateLoadingText() {
        const messages = [
            'Indlæser ressourcer...',
            'Forbereder spil...',
            'Samler terninger...',
            'Organiserer hære...',
            'Næsten klar...'
        ];
        
        let currentIndex = 0;
        const interval = setInterval(() => {
            if (this.loadingText && this.loadingScreen && !this.loadingScreen.classList.contains('hidden')) {
                this.loadingText.textContent = messages[currentIndex];
                currentIndex = (currentIndex + 1) % messages.length;
            } else {
                clearInterval(interval);
            }
        }, 800);
    }
    
    hideLoadingScreen() {
        const elapsedTime = Date.now() - this.startTime;
        const remainingTime = Math.max(0, this.minimumDisplayTime - elapsedTime);
        
        setTimeout(() => {
            console.log('🔄 LoadingManager: All resources loaded, hiding loading screen');
            if (this.loadingText) {
                this.loadingText.textContent = 'Klar!';
            }
            
            setTimeout(() => {
                if (this.loadingScreen) {
                    this.loadingScreen.classList.add('hidden');
                    
                    // Remove loading screen from DOM after transition
                    setTimeout(() => {
                        if (this.loadingScreen && this.loadingScreen.parentNode) {
                            this.loadingScreen.remove();
                        }
                        console.log('🔄 LoadingManager: Loading screen removed');
                    }, 500);
                }
            }, 300);
        }, remainingTime);
    }
    
    // Method for external scripts to notify when they're loaded
    notifyComponentLoaded(componentId) {
        if (!this.componentsLoaded.includes(componentId)) {
            this.componentsLoaded.push(componentId);
            console.log(`🔄 LoadingManager: External component ${componentId} loaded`);
            
            if (this.componentsLoaded.length >= this.componentsToLoad.length) {
                this.markResourceLoaded('components', 'Komponenter indlæst');
            }
        }
    }
    
    // Manual trigger for debugging
    forceHide() {
        console.log('🔄 LoadingManager: Force hiding loading screen');
        this.hideLoadingScreen();
    }
}

// Initialize loading manager immediately (before DOM ready)
const loadingManager = new LoadingManager();

// Add global debug function for manual control
window.hideLoading = function() {
    console.log('🔧 Debug: Manually hiding loading screen');
    if (window.loadingManager) {
        window.loadingManager.forceHide();
    } else {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                if (loadingScreen.parentNode) {
                    loadingScreen.remove();
                }
            }, 500);
        }
    }
};

// Theme Management System
class ThemeManager {
    constructor() {
        console.log('🎨 ThemeManager: Initializing...');
        this.theme = this.getStoredTheme() || this.getSystemTheme();
        console.log(`🎨 ThemeManager: Initial theme set to "${this.theme}"`);
        this.init();
    }

    init() {
        console.log('🎨 ThemeManager: Setting up theme system...');
        
        // Apply initial theme
        this.applyTheme(this.theme);
        
        // Try to connect theme toggle button
        this.connectThemeToggle();
        
        // Listen for system theme changes
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                if (!this.getStoredTheme()) {
                    this.theme = e.matches ? 'dark' : 'light';
                    console.log(`🎨 ThemeManager: System theme changed to "${this.theme}"`);
                    this.applyTheme(this.theme);
                }
            });
        }
        
        console.log('🎨 ThemeManager: Initialization complete!');
    }

    connectThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            console.log('🎨 ThemeManager: Theme toggle button found, adding click listener');
            
            // Remove any existing event listeners to avoid duplicates
            themeToggle.replaceWith(themeToggle.cloneNode(true));
            const newThemeToggle = document.getElementById('themeToggle');
            
            newThemeToggle.addEventListener('click', () => this.toggleTheme());
            return true;
        } else {
            console.warn('🎨 ThemeManager: Theme toggle button NOT found! Check if element with id="themeToggle" exists');
            return false;
        }
    }

    getSystemTheme() {
        const systemTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        console.log(`🎨 ThemeManager: System theme detected as "${systemTheme}"`);
        return systemTheme;
    }

    getStoredTheme() {
        try {
            const stored = localStorage.getItem('theme');
            console.log(`🎨 ThemeManager: Stored theme is "${stored}"`);
            return stored;
        } catch (e) {
            console.warn('🎨 ThemeManager: localStorage not available for theme storage');
            return null;
        }
    }

    storeTheme(theme) {
        try {
            if (theme === this.getSystemTheme()) {
                // If theme matches system preference, remove stored preference
                localStorage.removeItem('theme');
            } else {
                localStorage.setItem('theme', theme);
            }
        } catch (e) {
            console.warn('localStorage not available for theme storage');
        }
    }

    applyTheme(theme) {
        console.log(`🎨 ThemeManager: Applying theme "${theme}"`);
        const root = document.documentElement;
        
        if (theme === 'dark') {
            root.setAttribute('data-theme', 'dark');
            console.log('🎨 ThemeManager: Set data-theme="dark" on document root');
        } else {
            root.removeAttribute('data-theme');
            console.log('🎨 ThemeManager: Removed data-theme attribute (light mode)');
        }
        
        // Update meta theme-color for mobile browsers
        this.updateMetaThemeColor(theme);
        
        // Dispatch custom event for other components that might need to know
        window.dispatchEvent(new CustomEvent('themechange', { 
            detail: { theme } 
        }));
    }

    updateMetaThemeColor(theme) {
        let metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (!metaThemeColor) {
            metaThemeColor = document.createElement('meta');
            metaThemeColor.name = 'theme-color';
            document.head.appendChild(metaThemeColor);
        }
        
        metaThemeColor.content = theme === 'dark' ? '#121212' : '#2c3e50';
    }

    toggleTheme() {
        const oldTheme = this.theme;
        this.theme = this.theme === 'dark' ? 'light' : 'dark';
        console.log(`🎨 ThemeManager: Toggling theme from "${oldTheme}" to "${this.theme}"`);
        
        this.applyTheme(this.theme);
        this.storeTheme(this.theme);
        
        // Add a subtle animation feedback
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            console.log('🎨 ThemeManager: Adding toggle animation');
            themeToggle.style.transform = 'scale(0.9)';
            setTimeout(() => {
                themeToggle.style.transform = '';
            }, 150);
        } else {
            console.warn('🎨 ThemeManager: Could not find theme toggle button for animation');
        }
    }

    getCurrentTheme() {
        return this.theme;
    }
}

// Make ThemeManager globally accessible
window.ThemeManager = ThemeManager;

// Initialize theme manager immediately (not waiting for DOM)
try {
    if (!window.themeManager) {
        console.log('🎨 Script.js: Creating ThemeManager instance...');
        window.themeManager = new ThemeManager();
        console.log('🎨 Script.js: ThemeManager created successfully');
    }

    // Dispatch custom event to notify that ThemeManager is ready
    console.log('🎨 Script.js: Dispatching themeManagerReady event...');
    window.dispatchEvent(new CustomEvent('themeManagerReady', { 
        detail: { themeManager: window.themeManager } 
    }));
    console.log('🎨 Script.js: themeManagerReady event dispatched');
} catch (error) {
    console.error('🎨 Script.js: Error initializing ThemeManager:', error);
}

// Also initialize when DOM is loaded for backward compatibility
document.addEventListener('DOMContentLoaded', function() {
    if (!window.themeManager) {
        console.log('🎨 DOM loaded, initializing ThemeManager...');
        window.themeManager = new ThemeManager();
    } else {
        console.log('🎨 DOM loaded, ThemeManager already exists');
        // Try to reconnect the theme toggle if it exists now
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            window.themeManager.connectThemeToggle();
        }
    }
});

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
});

// Smooth scrolling for navigation links
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

// Navbar background on scroll - now theme-aware
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const isDark = document.documentElement.hasAttribute('data-theme') && 
                   document.documentElement.getAttribute('data-theme') === 'dark';
    
    if (window.scrollY > 100) {
        if (isDark) {
            navbar.style.background = 'rgba(18, 18, 18, 0.98)';
        } else {
            navbar.style.background = 'rgba(44, 62, 80, 0.98)';
        }
    } else {
        if (isDark) {
            navbar.style.background = 'rgba(18, 18, 18, 0.95)';
        } else {
            navbar.style.background = 'rgba(44, 62, 80, 0.95)';
        }
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections for animations
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('section');
        observer.observe(section);
    });
});

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        max-width: 400px;
        word-wrap: break-word;
    `;
    
    // Add animation styles if not already present
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
            
            .notification-content {
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 1rem;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 1.2rem;
                cursor: pointer;
                padding: 0;
                line-height: 1;
            }
            
            .notification-close:hover {
                opacity: 0.8;
            }
        `;
        document.head.appendChild(styles);
    }
    
    // Add to document
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease-out forwards';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-out forwards';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Gallery image modal (for future image implementation)
function openImageModal(imageSrc, imageAlt) {
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <img src="${imageSrc}" alt="${imageAlt}" class="modal-image">
                <button class="modal-close">&times;</button>
            </div>
        </div>
    `;
    
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease-out;
    `;
    
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.cssText = `
        position: relative;
        max-width: 90%;
        max-height: 90%;
    `;
    
    const modalImage = modal.querySelector('.modal-image');
    modalImage.style.cssText = `
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
        border-radius: 8px;
    `;
    
    const closeButton = modal.querySelector('.modal-close');
    closeButton.style.cssText = `
        position: absolute;
        top: -40px;
        right: 0;
        background: none;
        border: none;
        color: white;
        font-size: 2rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    `;
    
    document.body.appendChild(modal);
    
    // Close modal events
    const closeModal = () => {
        modal.style.animation = 'fadeOut 0.3s ease-out forwards';
        setTimeout(() => modal.remove(), 300);
    };
    
    closeButton.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.className === 'modal-overlay') {
            closeModal();
        }
    });
    
    // Close with Escape key
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);
}

// Add modal animation styles
if (!document.querySelector('#modal-styles')) {
    const modalStyles = document.createElement('style');
    modalStyles.id = 'modal-styles';
    modalStyles.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
    document.head.appendChild(modalStyles);
}

// Scroll to top functionality
window.addEventListener('scroll', function() {
    const scrollButton = document.querySelector('.scroll-to-top');
    if (window.scrollY > 500) {
        if (!scrollButton) {
            createScrollToTopButton();
        } else {
            scrollButton.style.display = 'block';
        }
    } else if (scrollButton) {
        scrollButton.style.display = 'none';
    }
});

function createScrollToTopButton() {
    const button = document.createElement('button');
    button.className = 'scroll-to-top';
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: #e74c3c;
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        cursor: pointer;
        box-shadow: 0 5px 20px rgba(231, 76, 60, 0.3);
        z-index: 1000;
        transition: all 0.3s ease;
        display: block;
    `;
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-2px)';
        button.style.boxShadow = '0 8px 25px rgba(231, 76, 60, 0.4)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
        button.style.boxShadow = '0 5px 20px rgba(231, 76, 60, 0.3)';
    });
    
    document.body.appendChild(button);
}

// Lazy loading for future images
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers without IntersectionObserver
        images.forEach(img => {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
        });
    }
}

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', setupLazyLoading);

// Add typing effect for hero title (optional enhancement)
function typewriterEffect(element, text, speed = 100) {
    element.textContent = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Uncomment the following lines if you want a typewriter effect on the hero title
// document.addEventListener('DOMContentLoaded', function() {
//     const heroTitle = document.querySelector('.hero-title');
//     if (heroTitle) {
//         const originalText = heroTitle.textContent;
//         typewriterEffect(heroTitle, originalText, 80);
//     }
// });

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

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    // Navbar background change
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(44, 62, 80, 0.98)';
    } else {
        navbar.style.background = 'rgba(44, 62, 80, 0.95)';
    }
    
    // Scroll to top button
    const scrollButton = document.querySelector('.scroll-to-top');
    if (window.scrollY > 500) {
        if (!scrollButton) {
            createScrollToTopButton();
        } else {
            scrollButton.style.display = 'block';
        }
    } else if (scrollButton) {
        scrollButton.style.display = 'none';
    }
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Error handling for missing elements
function safeQuerySelector(selector) {
    try {
        return document.querySelector(selector);
    } catch (error) {
        console.warn(`Element not found: ${selector}`);
        return null;
    }
}

function safeQuerySelectorAll(selector) {
    try {
        return document.querySelectorAll(selector);
    } catch (error) {
        console.warn(`Elements not found: ${selector}`);
        return [];
    }
}

// Initialize theme manager when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎨 DOM loaded, initializing ThemeManager...');
    window.themeManager = new ThemeManager();
    
    // Also check if the toggle button exists
    const toggleButton = document.getElementById('themeToggle');
    console.log('🎨 Theme toggle button check:', toggleButton ? 'FOUND' : 'NOT FOUND');
    if (toggleButton) {
        console.log('🎨 Button element:', toggleButton);
        console.log('🎨 Button classes:', toggleButton.className);
    }
});

// Console greeting message
console.log(`
🎲 Velkommen til Aros Forenede Figurspillere! 🎲
Made with ❤️ for the Warmachine community in Aarhus

For technical support or suggestions, please contact us through the website.
`);

/**
 * Component Loader
 * Loads reusable HTML components into pages dynamically
 */

class ComponentLoader {
    static async loadComponent(containerId, componentPath, fallbackHandler = null) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Container with ID "${containerId}" not found`);
            return;
        }

        try {
            const response = await fetch(componentPath);
            if (!response.ok) {
                throw new Error(`Failed to load component: ${response.status}`);
            }
            
            const componentHTML = await response.text();
            container.innerHTML = componentHTML;
            
            // Run component-specific initialization
            if (containerId === 'navigation-container') {
                this.initializeNavigation();
            }
        } catch (error) {
            console.error(`Error loading component from ${componentPath}:`, error);
            if (fallbackHandler) {
                fallbackHandler();
            }
        }
    }

    static async loadNavigation(containerId, isSubpage = false) {
        const navFile = isSubpage ? '../includes/navigation-subpages.html' : 'includes/navigation.html';
        await this.loadComponent(containerId, navFile, () => {
            console.log('Navigation already in HTML - using existing structure');
            this.initializeNavigation();
        });
    }

    static async loadFooter(containerId, footerType = 'main') {
        let footerFile;
        switch (footerType) {
            case 'subpages':
                footerFile = '../includes/footer-subpages.html';
                break;
            case 'simple':
                footerFile = '../includes/footer-simple.html';
                break;
            default:
                footerFile = 'includes/footer-main.html';
        }
        await this.loadComponent(containerId, footerFile);
    }

    static async loadHead(containerId, isSubpage = false) {
        const headFile = isSubpage ? '../includes/head-subpages.html' : 'includes/head-common.html';
        await this.loadComponent(containerId, headFile);
    }

    static async loadScripts(containerId, isSubpage = false) {
        const scriptsFile = isSubpage ? '../includes/scripts-subpages.html' : 'includes/scripts-main.html';
        await this.loadComponent(containerId, scriptsFile);
    }

    static initializeNavigation() {
        // Hamburger menu functionality
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');

        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }

        // Dropdown functionality
        this.initializeDropdowns();

        // Close mobile menu when clicking nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Don't close menu for dropdown toggles
                if (!link.classList.contains('dropdown-toggle')) {
                    hamburger?.classList.remove('active');
                    navMenu?.classList.remove('active');
                }
            });
        });

        // Set active navigation item based on current page
        this.setActiveNavItem();
    }

    static initializeDropdowns() {
        const dropdowns = document.querySelectorAll('.nav-dropdown');
        
        dropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('.dropdown-toggle');
            const menu = dropdown.querySelector('.dropdown-menu');
            
            if (toggle && menu) {
                // Handle click for mobile
                toggle.addEventListener('click', (e) => {
                    e.preventDefault();
                    
                    // Close other dropdowns
                    dropdowns.forEach(otherDropdown => {
                        if (otherDropdown !== dropdown) {
                            otherDropdown.classList.remove('active');
                        }
                    });
                    
                    // Toggle current dropdown
                    dropdown.classList.toggle('active');
                });
                
                // Handle dropdown link clicks
                const dropdownLinks = menu.querySelectorAll('.dropdown-link');
                dropdownLinks.forEach(link => {
                    link.addEventListener('click', (e) => {
                        // Don't prevent default for placeholder links
                        if (link.getAttribute('href') === '#') {
                            e.preventDefault();
                            return;
                        }
                        
                        // Close dropdown and mobile menu
                        dropdown.classList.remove('active');
                        document.getElementById('hamburger')?.classList.remove('active');
                        document.getElementById('nav-menu')?.classList.remove('active');
                    });
                });
            }
        });
        
        // Close dropdowns when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-dropdown')) {
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });
    }

    static setActiveNavItem() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            
            // Check if this link matches the current page
            const linkPath = link.getAttribute('href');
            if (linkPath && (currentPath.includes(linkPath) || 
                (currentPath.endsWith('/') && linkPath === '#hjem') ||
                (currentPath.includes('index.html') && linkPath === '#hjem'))) {
                link.classList.add('active');
            }
        });
    }
}

// Auto-initialize components if containers exist
document.addEventListener('DOMContentLoaded', () => {
    const isSubpage = window.location.pathname.includes('/pages/');
    
    // Load navigation
    const navContainer = document.getElementById('navigation-container');
    if (navContainer) {
        ComponentLoader.loadNavigation('navigation-container', isSubpage);
    }
    
    // Load footer
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        let footerType = 'main';
        if (isSubpage) {
            footerType = 'subpages';
        }
        if (window.location.pathname.includes('dice-game')) {
            footerType = 'simple';
        }
        ComponentLoader.loadFooter('footer-container', footerType);
    }
    
    // Load head elements
    const headContainer = document.getElementById('head-container');
    if (headContainer) {
        ComponentLoader.loadHead('head-container', isSubpage);
    }
    
    // Load scripts
    const scriptsContainer = document.getElementById('scripts-container');
    if (scriptsContainer) {
        ComponentLoader.loadScripts('scripts-container', isSubpage);
    }
});

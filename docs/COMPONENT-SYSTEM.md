# Component System Documentation

## 📋 Overview

The Aros Forenede Figurspillere website uses a modular component architecture to improve maintainability, consistency, and development efficiency. This document outlines the component system implementation and usage.

## 🏗️ Architecture

### Component Philosophy
- **Reusability**: Components can be used across multiple pages
- **Maintainability**: Central updates affect all instances
- **Consistency**: Unified styling and behavior
- **Performance**: Efficient loading and caching

### Component Loader System
The `ComponentLoader` class in `assets/js/navigation.js` handles dynamic loading of HTML components.

```javascript
class ComponentLoader {
    static async loadComponent(containerId, componentPath, fallbackHandler = null)
    static async loadNavigation(containerId, isSubpage = false)
    static async loadFooter(containerId, footerType = 'main')
    static async loadHead(containerId, isSubpage = false)
    static async loadScripts(containerId, isSubpage = false)
}
```

## 📁 Component Directory Structure

```
includes/
├── head-common.html          # Common head elements (CSS, fonts, meta)
├── head-subpages.html        # Subpage-specific head elements
├── navigation.html           # Main site navigation
├── navigation-subpages.html  # Subpage navigation with back links
├── footer-main.html          # Full footer with all information
├── footer-subpages.html      # Subpage footer with game links
├── scripts-main.html         # Main JavaScript includes
└── scripts-subpages.html     # Subpage JavaScript includes
```

## 🧩 Component Details

### Head Components

#### `head-common.html`
**Purpose**: Common head elements for all pages
**Contains**:
- Meta charset and viewport
- Favicon and manifest links
- Google Fonts loading
- Font Awesome CSS
- Main stylesheet link
- Humans.txt link

**Usage**:
```javascript
ComponentLoader.loadHead('head-container', false);
```

#### `head-subpages.html`
**Purpose**: Head elements specific to subpages
**Contains**:
- All common head elements
- Adjusted relative paths for subpage location
- Subpage-specific meta tags

**Usage**:
```javascript
ComponentLoader.loadHead('head-container', true);
```

### Navigation Components

#### `navigation.html`
**Purpose**: Main site navigation for the homepage
**Features**:
- Logo with home link
- Main navigation menu
- Theme toggle button
- Mobile hamburger menu
- Social media links

**HTML Structure**:
```html
<nav class="navbar">
    <div class="nav-container">
        <div class="nav-logo">...</div>
        <ul class="nav-menu">...</ul>
        <div class="nav-actions">...</div>
    </div>
</nav>
```

#### `navigation-subpages.html`
**Purpose**: Navigation for subpages with adjusted paths
**Features**:
- All main navigation features
- Relative paths adjusted for subpage location
- Back-to-home functionality
- Breadcrumb support

### Footer Components

#### `footer-main.html`
**Purpose**: Complete footer for main pages
**Contains**:
- Community information
- Contact details
- Social media links
- Copyright information
- Site credits

#### `footer-subpages.html`
**Purpose**: Footer for subpages with adjusted paths and game links
**Contains**:
- All main footer content
- "Spil Vi Spiller" section with links to game pages
- Relative paths corrected for subpage location

### Script Components

#### `scripts-main.html`
**Purpose**: JavaScript includes for main pages
**Contains**:
- Main script.js
- Navigation.js
- Theme management
- Component initialization

#### `scripts-subpages.html`
**Purpose**: JavaScript includes for subpages
**Contains**:
- Same scripts as main
- Paths adjusted for subpage location
- Subpage-specific initializations

## 🔄 Component Loading Process

### Automatic Loading
Components are automatically loaded when the page loads:

```javascript
document.addEventListener('DOMContentLoaded', function() {
    const isSubpage = window.location.pathname.includes('/pages/');
    
    // Load head elements
    ComponentLoader.loadHead('head-container', isSubpage);
    
    // Load navigation
    ComponentLoader.loadNavigation('navigation-container', isSubpage);
    
    // Load footer
    ComponentLoader.loadFooter('footer-container', isSubpage ? 'subpages' : 'main');
    
    // Load scripts
    ComponentLoader.loadScripts('scripts-container', isSubpage);
});
```

### Loading Sequence
1. **DOM Ready**: Wait for initial DOM to be ready
2. **Component Detection**: Determine if page is subpage or main page
3. **Component Loading**: Load appropriate component variants
4. **Initialization**: Initialize component-specific functionality
5. **Error Handling**: Fallback to default content if loading fails

### Error Handling
```javascript
static async loadComponent(containerId, componentPath, fallbackHandler = null) {
    try {
        const response = await fetch(componentPath);
        if (!response.ok) {
            throw new Error(`Failed to load component: ${response.status}`);
        }
        // Load component...
    } catch (error) {
        console.error(`Error loading component from ${componentPath}:`, error);
        if (fallbackHandler) {
            fallbackHandler();
        }
    }
}
```

## 🎯 Usage Examples

### Basic Page Setup
```html
<!DOCTYPE html>
<html lang="da">
<head>
    <!-- Common head elements loaded dynamically -->
    <div id="head-container"></div>
</head>
<body>
    <!-- Navigation -->
    <div id="navigation-container"></div>
    
    <!-- Page content -->
    <main>
        <!-- Your page content here -->
    </main>
    
    <!-- Footer -->
    <div id="footer-container"></div>
    
    <!-- Scripts -->
    <div id="scripts-container"></div>
</body>
</html>
```

### Subpage Setup
```html
<!DOCTYPE html>
<html lang="da">
<head>
    <!-- Subpage head elements loaded dynamically -->
    <div id="head-container"></div>
</head>
<body>
    <!-- Subpage navigation with adjusted paths -->
    <div id="navigation-container"></div>
    
    <!-- Page content -->
    <main>
        <!-- Your subpage content here -->
    </main>
    
    <!-- Subpage footer -->
    <div id="footer-container"></div>
    
    <!-- Subpage scripts -->
    <div id="scripts-container"></div>
</body>
</html>
```

### Custom Component Loading
```javascript
// Load specific footer type
ComponentLoader.loadFooter('footer-container', 'subpages');

// Load with custom fallback
ComponentLoader.loadComponent(
    'custom-container', 
    'includes/custom-component.html',
    () => {
        console.log('Fallback: Using default content');
        document.getElementById('custom-container').innerHTML = '<p>Default content</p>';
    }
);
```

## 🎨 Styling Components

### CSS Architecture
Components inherit styling from the main theme system:

```css
/* Theme variables apply to all components */
:root {
    --nav-bg: rgba(44, 62, 80, 0.95);
    --nav-text: #ffffff;
    --footer-bg: var(--bg-secondary);
    /* ... */
}

/* Components use theme variables */
.navbar {
    background: var(--nav-bg);
    color: var(--nav-text);
}
```

### Component-Specific Styling
Each component type has dedicated CSS sections:

```css
/* Navigation Styles */
.navbar { /* ... */ }
.nav-container { /* ... */ }
.nav-menu { /* ... */ }

/* Footer Styles */
.footer { /* ... */ }
.footer-content { /* ... */ }
.footer-links { /* ... */ }
```

## 🔧 Customization

### Adding New Components

1. **Create Component File**:
```html
<!-- includes/new-component.html -->
<div class="new-component">
    <h2>New Component</h2>
    <p>Component content here</p>
</div>
```

2. **Add Loading Method**:
```javascript
static async loadNewComponent(containerId, options = {}) {
    const componentFile = options.variant || 'new-component.html';
    await this.loadComponent(containerId, `includes/${componentFile}`);
}
```

3. **Use in Pages**:
```html
<div id="new-component-container"></div>
<script>
ComponentLoader.loadNewComponent('new-component-container');
</script>
```

### Component Variants
Create variants for different contexts:

```
includes/
├── navigation.html           # Main navigation
├── navigation-subpages.html  # Subpage navigation
├── navigation-mobile.html    # Mobile-specific navigation
└── navigation-admin.html     # Admin panel navigation
```

### Path Management
The system automatically handles relative paths:

```javascript
// Detects if page is in subdirectory and adjusts paths
const isSubpage = window.location.pathname.includes('/pages/');
const pathPrefix = isSubpage ? '../' : '';
const componentPath = `${pathPrefix}includes/component.html`;
```

## 🚀 Performance Considerations

### Loading Optimization
- Components are cached after first load
- Fallback content prevents layout shift
- Async loading doesn't block page rendering
- Error handling prevents broken pages

### Best Practices
1. **Minimize Component Size**: Keep components focused and small
2. **Use Appropriate Fallbacks**: Provide meaningful fallback content
3. **Cache Efficiently**: Leverage browser caching for components
4. **Monitor Loading**: Use console logging for debugging

## 🔍 Debugging

### Console Logging
The component system provides detailed logging:

```javascript
console.log(`Loading component: ${componentPath}`);
console.log(`Component ${containerId} loaded successfully`);
console.error(`Error loading component: ${error.message}`);
```

### Common Issues

#### Component Not Loading
- Check file paths (relative vs absolute)
- Verify component file exists
- Check network errors in browser dev tools
- Ensure container element exists

#### Styling Issues
- Verify CSS is loaded before components
- Check CSS variable inheritance
- Ensure theme system is initialized

#### JavaScript Errors
- Check for naming conflicts
- Verify script loading order
- Ensure components are loaded before script initialization

## 📋 Maintenance

### Regular Tasks
1. **Update Paths**: When moving files, update component paths
2. **Test Loading**: Verify all components load correctly
3. **Performance Review**: Monitor loading times and optimize
4. **Accessibility Check**: Ensure components meet accessibility standards

### Version Control
- Components are version-controlled with the main codebase
- Changes to components affect all pages using them
- Test thoroughly when updating shared components

---

## 🔗 Related Documentation

- [README.md](../README.md) - Main project documentation
- [CREDITS.md](CREDITS.md) - Development history and credits
- [CHANGELOG.md](CHANGELOG.md) - Version history
- Theme System Documentation (in main CSS file)

---

**This component system enables maintainable, consistent, and efficient web development for the Aros Forenede Figurspillere community website.**

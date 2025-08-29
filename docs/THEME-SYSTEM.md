# Theme System Documentation

## 🎨 Overview

The Aros Forenede Figurspillere website features an advanced dual-theme system supporting both light and dark modes. The system automatically detects user preferences, allows manual switching, and persists choices across sessions.

## 🏗️ Architecture

### Core Components
1. **ThemeManager Class**: JavaScript theme controller
2. **CSS Custom Properties**: Variable-based styling system
3. **Local Storage**: Theme preference persistence
4. **System Integration**: Automatic OS preference detection

### Theme Implementation Strategy
- **CSS Variables**: Centralized color and styling management
- **Data Attributes**: Theme switching via `data-theme` attribute
- **Progressive Enhancement**: Works without JavaScript (defaults to light)
- **Performance Optimized**: Smooth transitions and efficient switching

## 🎛️ ThemeManager Class

Located in `assets/js/script.js`, the ThemeManager handles all theme-related functionality.

### Class Structure
```javascript
class ThemeManager {
    constructor()               // Initialize theme system
    init()                     // Set up event listeners and apply initial theme
    getSystemTheme()           // Detect OS theme preference
    getStoredTheme()           // Retrieve saved theme from localStorage
    storeTheme(theme)          // Save theme preference to localStorage
    applyTheme(theme)          // Apply theme to document
    updateMetaThemeColor(theme) // Update mobile browser theme color
    toggleTheme()              // Switch between light and dark modes
    getCurrentTheme()          // Get current active theme
}
```

### Initialization Process
```javascript
// Automatic initialization on page load
document.addEventListener('DOMContentLoaded', function() {
    window.themeManager = new ThemeManager();
});

// Theme preference priority:
// 1. Stored user preference (localStorage)
// 2. System preference (prefers-color-scheme)
// 3. Default (light theme)
```

## 🎨 CSS Custom Properties System

### Root Variables (Light Theme)
```css
:root {
    /* Background Colors */
    --bg-primary: #f8f9fa;        /* Main background */
    --bg-secondary: #ffffff;       /* Card/section backgrounds */
    --bg-tertiary: #e9ecef;        /* Alternate sections */
    --bg-accent: rgba(255, 255, 255, 0.1); /* Accent overlays */
    --bg-card: #ffffff;            /* Card backgrounds */
    --bg-overlay: rgba(0, 0, 0, 0.1); /* Modal overlays */
    
    /* Text Colors */
    --text-primary: #333333;       /* Main text */
    --text-secondary: #666666;     /* Secondary text */
    --text-light: #999999;         /* Muted text */
    --text-inverse: #ffffff;       /* Text on dark backgrounds */
    
    /* Border and Shadow */
    --border-color: #dee2e6;       /* Standard borders */
    --border-accent: rgba(255, 255, 255, 0.2); /* Accent borders */
    --shadow-light: 0 2px 10px rgba(0, 0, 0, 0.1);   /* Light shadows */
    --shadow-medium: 0 5px 15px rgba(0, 0, 0, 0.1);  /* Medium shadows */
    --shadow-heavy: 0 10px 30px rgba(0, 0, 0, 0.15); /* Heavy shadows */
    
    /* Brand Colors (consistent across themes) */
    --color-primary: #e74c3c;      /* Primary brand color */
    --color-primary-dark: #c0392b; /* Darker primary variant */
    --color-secondary: #2c3e50;    /* Secondary brand color */
    --color-secondary-light: #34495e; /* Lighter secondary variant */
    --color-accent: #3498db;       /* Accent color */
    --color-success: #27ae60;      /* Success state */
    --color-warning: #f39c12;      /* Warning state */
    
    /* Component-Specific Variables */
    --nav-bg: rgba(44, 62, 80, 0.95);          /* Navigation background */
    --nav-text: #ffffff;                        /* Navigation text */
    --nav-hover: var(--color-primary);         /* Navigation hover state */
    --hero-bg: linear-gradient(135deg, #2c3e50 0%, #3498db 100%); /* Hero background */
    --hero-text: #ffffff;                       /* Hero text */
    --hero-overlay: rgba(0, 0, 0, 0.3);        /* Hero overlay */
}
```

### Dark Theme Overrides
```css
[data-theme="dark"] {
    /* Dark Background Colors */
    --bg-primary: #121212;         /* Dark main background */
    --bg-secondary: #1e1e1e;       /* Dark card backgrounds */
    --bg-tertiary: #2d2d2d;        /* Dark alternate sections */
    --bg-accent: rgba(255, 255, 255, 0.05); /* Dark accent overlays */
    --bg-card: #242424;            /* Dark card backgrounds */
    --bg-overlay: rgba(255, 255, 255, 0.1); /* Dark modal overlays */
    
    /* Dark Text Colors */
    --text-primary: #e0e0e0;       /* Dark theme main text */
    --text-secondary: #b0b0b0;     /* Dark theme secondary text */
    --text-light: #808080;         /* Dark theme muted text */
    --text-inverse: #121212;       /* Text on light backgrounds in dark mode */
    
    /* Dark Borders and Shadows */
    --border-color: #404040;       /* Dark theme borders */
    --border-accent: rgba(255, 255, 255, 0.1); /* Dark accent borders */
    --shadow-light: 0 2px 10px rgba(0, 0, 0, 0.3);   /* Dark light shadows */
    --shadow-medium: 0 5px 15px rgba(0, 0, 0, 0.4);  /* Dark medium shadows */
    --shadow-heavy: 0 10px 30px rgba(0, 0, 0, 0.5);  /* Dark heavy shadows */
    
    /* Dark Component Variables */
    --nav-bg: rgba(18, 18, 18, 0.95);          /* Dark navigation */
    --nav-text: #e0e0e0;                        /* Dark navigation text */
    --hero-bg: linear-gradient(135deg, #1a1a1a 0%, #2c3e50 100%); /* Dark hero */
    --hero-overlay: rgba(0, 0, 0, 0.5);        /* Dark hero overlay */
}
```

## 🔄 Theme Switching Mechanism

### Manual Theme Toggle
```javascript
// Theme toggle button in navigation
<button id="themeToggle" class="theme-toggle" aria-label="Toggle theme">
    <i class="fas fa-sun icon sun-icon"></i>
    <i class="fas fa-moon icon moon-icon"></i>
</button>

// Theme toggle functionality
toggleTheme() {
    const oldTheme = this.theme;
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    this.applyTheme(this.theme);
    this.storeTheme(this.theme);
}
```

### System Preference Detection
```javascript
getSystemTheme() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches 
        ? 'dark' 
        : 'light';
}

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!this.getStoredTheme()) {
        this.theme = e.matches ? 'dark' : 'light';
        this.applyTheme(this.theme);
    }
});
```

### Theme Application
```javascript
applyTheme(theme) {
    const root = document.documentElement;
    
    if (theme === 'dark') {
        root.setAttribute('data-theme', 'dark');
    } else {
        root.removeAttribute('data-theme');
    }
    
    // Update mobile browser theme color
    this.updateMetaThemeColor(theme);
    
    // Dispatch custom event for other components
    window.dispatchEvent(new CustomEvent('themechange', { 
        detail: { theme } 
    }));
}
```

## 📱 Mobile Integration

### Meta Theme Color
The system updates the browser theme color for mobile devices:

```javascript
updateMetaThemeColor(theme) {
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (!metaThemeColor) {
        metaThemeColor = document.createElement('meta');
        metaThemeColor.name = 'theme-color';
        document.head.appendChild(metaThemeColor);
    }
    
    metaThemeColor.content = theme === 'dark' ? '#121212' : '#2c3e50';
}
```

### Mobile Theme Toggle
```css
.theme-toggle {
    background: none;
    border: 2px solid var(--nav-text);
    color: var(--nav-text);
    width: 45px;
    height: 45px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

/* Mobile responsive adjustments */
@media (max-width: 768px) {
    .theme-toggle {
        width: 40px;
        height: 40px;
        font-size: 1rem;
    }
}
```

## 🎭 Visual Transitions

### Smooth Theme Switching
```css
/* Universal transition for theme changes */
* {
    transition: background-color 0.3s ease, 
                color 0.3s ease, 
                border-color 0.3s ease, 
                box-shadow 0.3s ease;
}

/* Theme toggle icon animations */
.theme-toggle .icon {
    transition: all 0.3s ease;
    position: absolute;
}

.theme-toggle .sun-icon {
    opacity: 0;
    transform: rotate(-180deg);
}

.theme-toggle .moon-icon {
    opacity: 1;
    transform: rotate(0deg);
}

[data-theme="dark"] .theme-toggle .sun-icon {
    opacity: 1;
    transform: rotate(0deg);
}

[data-theme="dark"] .theme-toggle .moon-icon {
    opacity: 0;
    transform: rotate(180deg);
}
```

### Theme Toggle Animation
```javascript
// Visual feedback on theme toggle
toggleTheme() {
    // ... theme switching logic ...
    
    // Add animation feedback
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.style.transform = 'scale(0.9)';
        setTimeout(() => {
            themeToggle.style.transform = '';
        }, 150);
    }
}
```

## 💾 Persistence System

### LocalStorage Management
```javascript
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

getStoredTheme() {
    try {
        return localStorage.getItem('theme');
    } catch (e) {
        console.warn('localStorage not available for theme storage');
        return null;
    }
}
```

### Theme Preference Priority
1. **Stored Preference**: User's manually selected theme
2. **System Preference**: OS-level dark/light mode setting
3. **Default**: Light theme fallback

## 🧩 Component Integration

### Theme-Aware Components
All components automatically inherit theme variables:

```css
/* Navigation adapts to theme */
.navbar {
    background: var(--nav-bg);
    color: var(--nav-text);
}

/* Cards adapt to theme */
.card {
    background: var(--bg-card);
    color: var(--text-primary);
    border: 1px solid var(--border-color);
    box-shadow: var(--shadow-light);
}

/* Buttons adapt to theme */
.btn-primary {
    background: var(--color-primary);
    color: var(--text-inverse);
}
```

### Custom Theme Events
Components can listen for theme changes:

```javascript
window.addEventListener('themechange', function(event) {
    const newTheme = event.detail.theme;
    console.log(`Theme changed to: ${newTheme}`);
    // Custom theme-specific logic here
});
```

## 🎨 Customization

### Adding New Theme Variables
```css
:root {
    /* Add new light theme variables */
    --new-component-bg: #ffffff;
    --new-component-text: #333333;
}

[data-theme="dark"] {
    /* Add corresponding dark theme variables */
    --new-component-bg: #2d2d2d;
    --new-component-text: #e0e0e0;
}

/* Use in components */
.new-component {
    background: var(--new-component-bg);
    color: var(--new-component-text);
}
```

### Creating Theme Variants
```css
/* Additional theme variants */
[data-theme="high-contrast"] {
    --bg-primary: #000000;
    --text-primary: #ffffff;
    --color-primary: #ffff00;
}

[data-theme="sepia"] {
    --bg-primary: #f4ecd8;
    --text-primary: #5c4b37;
    --color-primary: #8b4513;
}
```

## 🔍 Debugging

### Console Logging
The theme system provides detailed logging:

```javascript
console.log('🎨 ThemeManager: Initializing...');
console.log(`🎨 ThemeManager: Initial theme set to "${this.theme}"`);
console.log(`🎨 ThemeManager: System theme detected as "${systemTheme}"`);
console.log(`🎨 ThemeManager: Stored theme is "${stored}"`);
console.log(`🎨 ThemeManager: Applying theme "${theme}"`);
```

### Common Issues

#### Theme Not Applying
- Check if ThemeManager is initialized
- Verify CSS custom properties are defined
- Ensure theme toggle button has correct ID
- Check for JavaScript errors in console

#### Theme Not Persisting
- Verify localStorage is available
- Check for private browsing mode
- Ensure storeTheme() is being called

#### Mobile Theme Color Not Updating
- Check if meta theme-color tag is being created
- Verify updateMetaThemeColor() is being called
- Test on actual mobile device

## 🚀 Performance Considerations

### Optimization Strategies
1. **CSS Variables**: Efficient theme switching without style recalculation
2. **Minimal JavaScript**: Theme logic is lightweight and optimized
3. **Transition Control**: Smooth but not performance-impacting transitions
4. **Caching**: Theme preferences cached in localStorage

### Best Practices
- Use CSS custom properties for all themeable values
- Avoid hardcoded colors in CSS
- Test theme switching performance on mobile devices
- Provide fallbacks for unsupported browsers

## ♿ Accessibility

### Color Contrast
Both themes meet WCAG 2.1 AA standards:
- Light theme: High contrast between text and backgrounds
- Dark theme: Appropriate contrast ratios maintained

### Reduced Motion Support
```css
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}
```

### Screen Reader Support
```html
<button id="themeToggle" 
        class="theme-toggle" 
        aria-label="Toggle between light and dark theme"
        aria-pressed="false">
    <span class="sr-only">Current theme: Light</span>
    <!-- Icons -->
</button>
```

## 📋 Testing

### Manual Testing Checklist
- [ ] Theme toggle button works
- [ ] System preference detection works
- [ ] Theme persists across page reloads
- [ ] Mobile theme color updates
- [ ] All components respect theme variables
- [ ] Transitions are smooth
- [ ] High contrast mode compatibility
- [ ] Reduced motion respect

### Browser Testing
- Chrome/Chromium-based browsers
- Firefox
- Safari (including iOS Safari)
- Edge
- Mobile browsers (iOS/Android)

---

## 🔗 Related Documentation

- [README.md](../README.md) - Main project documentation
- [COMPONENT-SYSTEM.md](COMPONENT-SYSTEM.md) - Component architecture
- [CREDITS.md](CREDITS.md) - Development history
- [CHANGELOG.md](CHANGELOG.md) - Version history

---

**The theme system provides a modern, accessible, and user-friendly way to customize the visual experience while maintaining excellent performance and compatibility.**

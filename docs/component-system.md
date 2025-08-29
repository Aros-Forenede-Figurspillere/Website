# Component System Documentation

This website uses a modular component system to reduce code duplication and improve maintainability.

## Components Available

### 1. Head Components
- `includes/head-common.html` - For main pages (root level)
- `includes/head-subpages.html` - For pages in `/pages/` folder

### 2. Navigation Components  
- `includes/navigation.html` - For main pages
- `includes/navigation-subpages.html` - For subpages

### 3. Footer Components
- `includes/footer-main.html` - Standard footer for main pages
- `includes/footer-subpages.html` - Footer for subpages with game list
- `includes/footer-simple.html` - Minimal footer for game pages

### 4. Script Components
- `includes/scripts-main.html` - Scripts for main pages
- `includes/scripts-subpages.html` - Scripts for subpages

## Templates
- `templates/base.html` - Base template for main pages
- `templates/subpage.html` - Base template for subpages

## Usage

### Method 1: Dynamic Loading (Recommended)
Include the component loader and add containers:

```html
<!-- In your HTML head -->
<script src="assets/js/navigation.js"></script>

<!-- In your HTML body -->
<div id="navigation-container"></div>
<main>Your content here</main>
<div id="footer-container"></div>
```

The ComponentLoader will automatically:
- Detect if it's a subpage based on URL
- Load appropriate components
- Initialize navigation functionality

### Method 2: Manual Loading
```javascript
// Load specific components
ComponentLoader.loadNavigation('nav-container', isSubpage);
ComponentLoader.loadFooter('footer-container', 'simple');
ComponentLoader.loadHead('head-container', isSubpage);
```

### Method 3: Static Include (Fallback)
Copy the component HTML directly into your page for maximum compatibility.

## Component Types

### Footer Types:
- `'main'` - Full footer for main pages
- `'subpages'` - Extended footer for subpages  
- `'simple'` - Minimal footer for games/tools

### Auto-Detection:
The system automatically detects:
- Main page vs subpage based on `/pages/` in URL
- Footer type (simple footer for dice-game.html)

## Benefits

1. **Consistency** - All pages use the same components
2. **Maintainability** - Update once, applies everywhere
3. **Reduced Duplication** - No more copy-paste of navigation/footer
4. **Easy Updates** - Change component files to update all pages
5. **Theme Support** - Components inherit theme system

## File Structure
```
includes/
├── head-common.html
├── head-subpages.html
├── navigation.html
├── navigation-subpages.html
├── footer-main.html
├── footer-subpages.html
├── footer-simple.html
├── scripts-main.html
└── scripts-subpages.html

templates/
├── base.html
└── subpage.html

assets/js/
└── navigation.js (ComponentLoader)
```

## Migration Guide

To migrate an existing page:

1. Replace navigation HTML with `<div id="navigation-container"></div>`
2. Replace footer HTML with `<div id="footer-container"></div>`
3. Add `<script src="../assets/js/navigation.js"></script>`
4. Test the page to ensure components load correctly

## Future Enhancements

- Build process to inline components for better performance
- Component versioning for cache busting
- Additional specialized footers for different page types
- Head component variants for different meta tag requirements

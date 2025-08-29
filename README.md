# Aros Forenede Figurspillere Website

## 🎯 Overview

Welcome to the official website of **Aros Forenede Figurspillere** - Aarhus's premier tabletop wargaming community! This website serves as the digital hub for our passionate community of miniature wargaming enthusiasts.

## 🎲 About Our Community

**Aros Forenede Figurspillere** (Aros United Figure Players) is a thriving tabletop gaming community based in Aarhus, Denmark. We bring together enthusiasts of:

- **Warhammer 40,000** - The grim darkness of the far future
- **Warmachine & Hordes** - Steam-powered warfare and primal fury
- **Age of Sigmar** - Fantasy battles in the Mortal Realms
- **Kill Team** - Small-scale skirmish combat
- **And many more** exciting tabletop miniature games!

## 🏛️ Our Mission

We foster a welcoming environment where both newcomers and veterans can:
- Learn new games and improve their skills
- Paint and model miniatures together
- Participate in tournaments and casual play
- Build lasting friendships through shared passion

## 🌟 Website Features

### 🎨 Modern Design
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Advanced Theme System**: Dynamic dark/light themes with system preference detection
- **Loading Screen**: Elegant loading experience while resources load
- **Smooth Animations**: Engaging user experience with CSS transitions
- **Accessibility**: Screen reader friendly with proper ARIA labels

### 🎯 Game Information
- **Warhammer 40K Section**: Comprehensive faction overviews, lore, and getting started guides
- **Warmachine Section**: Army showcases, rules explanations, and community highlights
- **Interactive Elements**: Engaging galleries and faction selectors

### 🎲 Community Tools
- **Dice Game**: Interactive browser-based dice rolling for tabletop sessions
- **Event Calendar**: Stay updated on community events and tournaments
- **Resource Links**: Direct links to official rules, army builders, and painting guides

## 🛠️ Technical Architecture

### Advanced Loading System
- **Dual Loading Approach**: Simple inline loading screen with advanced resource monitoring
- **LoadingManager Class**: Intelligent monitoring of images, stylesheets, and components
- **Failsafe Mechanisms**: 2.5-second timeout ensures loading never hangs
- **Component-Aware**: Waits for dynamic component loading completion

### Sophisticated Theme System
- **ThemeManager Class**: Advanced theme management with CSS custom properties
- **System Integration**: Automatically detects and respects user's system theme preference
- **Mobile Support**: Seamless theme switching on mobile devices
- **Persistence**: Remembers user preference across sessions

### Component Architecture
- **ComponentLoader Class**: Dynamic loading of HTML components
- **Modular Structure**: Reusable components in `/includes/` directory
- **Path Intelligence**: GitHub Pages compatible relative path handling
- **Performance Optimized**: Efficient loading and caching of components

### Modern Web Technologies
- **HTML5 Semantic Structure**: Proper document structure for SEO and accessibility
- **CSS3 Advanced Features**: 
  - CSS Grid and Flexbox for responsive layouts
  - CSS Custom Properties for dynamic theming
  - CSS Animations and Transitions
- **ES6+ JavaScript**: Modern JavaScript with classes and modules
- **Progressive Enhancement**: Works without JavaScript for maximum compatibility

### Performance Optimizations
- **Lazy Loading**: Images load only when needed
- **Optimized Assets**: Compressed images and efficient resource loading
- **Intelligent Caching**: Smart caching strategies for fast repeat visits
- **Resource Monitoring**: Advanced tracking of all external resources

## 📁 Project Structure

```
/
├── assets/                    # Static assets
│   ├── css/                  # Stylesheets
│   │   ├── styles.css        # Main theme system & responsive design
│   │   └── game-pages.css    # Specific game page styling
│   ├── js/                   # JavaScript modules
│   │   ├── script.js         # Main functionality & theme management
│   │   └── navigation.js     # Component loader & navigation
│   ├── images/               # Images and media
│   │   ├── aros-logo.png     # Community logo
│   │   ├── clubhouse.jpg     # Community photos
│   │   ├── warhammer40k/     # Warhammer 40k assets
│   │   └── warmachine/       # Warmachine assets
│   └── icons/                # Favicons and app icons
│       └── favicon.svg       # SVG favicon source
├── includes/                  # Reusable HTML components
│   ├── head-common.html      # Common head elements
│   ├── head-subpages.html    # Subpage head elements
│   ├── navigation.html       # Main navigation
│   ├── navigation-subpages.html # Subpage navigation
│   ├── footer-main.html      # Main footer
│   ├── footer-simple.html    # Simple footer
│   ├── footer-subpages.html  # Subpage footer
│   ├── scripts-main.html     # Main scripts
│   └── scripts-subpages.html # Subpage scripts
├── pages/                     # Additional HTML pages
│   ├── dice-game.html        # Interactive D6 dice game
│   ├── warhammer40k.html     # Warhammer 40k game page
│   └── warmachine-mkiv.html  # Warmachine MkIV game page
├── templates/                 # Page templates
│   ├── base.html             # Base template
│   ├── game-page.html        # Game page template
│   └── subpage.html          # General subpage template
├── tools/                     # Development utilities
│   ├── favicon-generator.html # Automated favicon creation
│   ├── image-resizer.html    # Client-side image optimization
│   └── create-favicon.html   # Favicon creation tool
├── docs/                      # Documentation
│   └── CREDITS.md            # Development history & credits
├── index.html                 # Main landing page
├── start-server.ps1          # Local development server
├── robots.txt                # SEO directives
├── sitemap.xml               # Site structure
├── schema.json               # Structured data
├── site.webmanifest          # PWA configuration
├── humans.txt                # Credits for humans
└── 404.html                  # Custom error page
```

## 🌐 Website Features

This modern, component-based website includes:

### 🎨 **Modern Design System**
- **Dual Theme Support**: Light/Dark mode with system preference detection
- **Responsive Design**: Mobile-first approach, works on all devices
- **Component Architecture**: Modular HTML includes for maintainability
- **CSS Custom Properties**: Extensive theme system with CSS variables
- **Professional UI/UX**: Clean design with smooth animations

### 🔧 **Advanced Functionality**
- **Loading Screen**: Elegant loading animation with resource monitoring
- **Theme Management**: Advanced theme switching with localStorage persistence
- **Dynamic Navigation**: Component-based navigation with active state tracking
- **Interactive Elements**: Hover effects, smooth scrolling, and animations
- **Form Validation**: Contact form with client-side validation

### 🎲 **Gaming Features**
- **Interactive Dice Game**: D6 rolling game with statistics and challenges
- **Game Pages**: Dedicated pages for Warhammer 40k and Warmachine
- **Community Events**: Event showcase and calendar structure
- **Gallery System**: Image gallery for community photos

### 🚀 **Performance & SEO**
- **Optimized Loading**: Resource monitoring and progressive enhancement
- **SEO Complete**: Meta tags, structured data, sitemaps
- **PWA Ready**: Web app manifest and service worker structure
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support
- **Performance**: Debounced scroll events, lazy loading, optimized images

### 🌍 **Localization**
- **Danish Language**: Fully localized for Danish community
- **Cultural Adaptation**: Content tailored for Danish gaming culture
- **Local SEO**: Location-specific structured data

## 🛠️ Technologies Used

### **Core Technologies**
- **HTML5**: Semantic markup with component architecture
- **CSS3**: Advanced features including Grid, Flexbox, Custom Properties
- **JavaScript ES6+**: Modern JavaScript with classes and modules
- **Component System**: Reusable HTML includes loaded dynamically

### **Design & UX**
- **CSS Variables**: Comprehensive theming system
- **Responsive Design**: Mobile-first with fluid layouts
- **Typography**: Google Fonts (Roboto + Cinzel)
- **Icons**: Font Awesome 6.0
- **Animations**: CSS animations with reduced motion support

### **Development Tools**
- **PowerShell Scripts**: Local development server
- **Component Loader**: Dynamic HTML include system
- **Theme Manager**: Advanced dark/light mode switching
- **Loading Manager**: Resource monitoring and loading screens

## 🔄 Component System

The website uses a modular component system for maintainability:

### **Navigation Components**
- `navigation.html` - Main site navigation
- `navigation-subpages.html` - Subpage navigation with back links

### **Layout Components**
- `head-common.html` - Common head elements (CSS, fonts, meta)
- `head-subpages.html` - Subpage-specific head elements
- `footer-main.html` - Main footer with full information
- `footer-simple.html` - Minimal footer for special pages
- `scripts-main.html` - Main JavaScript includes
- `scripts-subpages.html` - Subpage JavaScript includes

### **Component Loading**
Components are loaded dynamically using the `ComponentLoader` class in `navigation.js`:

```javascript
// Load navigation
ComponentLoader.loadNavigation('navigation-container', isSubpage);

// Load footer
ComponentLoader.loadFooter('footer-container', footerType);

// Load head elements
ComponentLoader.loadHead('head-container', isSubpage);
```

## 🎨 Theme System

### **Theme Management**
The website features a sophisticated theme system:

- **Auto-detection**: Respects system dark/light mode preference
- **Manual Override**: Users can toggle themes manually
- **Persistence**: Theme preference saved in localStorage
- **Smooth Transitions**: Animated theme switching
- **Meta Tag Updates**: Updates browser theme-color for mobile

### **CSS Custom Properties**
Extensive use of CSS variables for theming:

```css
:root {
    /* Light Theme Variables */
    --bg-primary: #f8f9fa;
    --text-primary: #333333;
    --color-primary: #e74c3c;
    /* ... many more */
}

[data-theme="dark"] {
    /* Dark Theme Overrides */
    --bg-primary: #121212;
    --text-primary: #e0e0e0;
    /* ... dark mode variants */
}
```

## 🚀 Deployment

### **GitHub Pages Deployment**
1. Push all files to your GitHub repository
2. Go to Repository Settings → Pages
3. Select "Deploy from a branch"
4. Choose "main" branch and "/ (root)" folder
5. Your site will be available at: `https://aros-forenede-figurspillere.github.io/Website/`

### **Local Development**
```powershell
# Start local server
.\start-server.ps1

# Or manually with Python
python -m http.server 8000
```

### **File Requirements**
- All paths are relative for GitHub Pages compatibility
- Components use relative paths for includes
- Images and assets use proper relative paths

## 📱 Mobile Features

- **Responsive Navigation**: Hamburger menu with smooth animations
- **Touch Optimized**: Touch-friendly buttons and interactions
- **Performance**: Optimized for mobile networks
- **PWA Features**: Web app manifest for "add to home screen"
- **Mobile Themes**: Proper mobile browser theme integration

## 🔧 Advanced Features

### **Loading Screen System**
- **Resource Monitoring**: Tracks CSS, JS, images, and fonts
- **Progress Animation**: Visual feedback during loading
- **Failsafe Mechanisms**: Maximum timeout to prevent infinite loading
- **Component Awareness**: Waits for dynamic components to load

### **Performance Optimizations**
- **Debounced Events**: Scroll and resize events are debounced
- **Lazy Loading**: Image lazy loading for better performance
- **Component Caching**: Efficient component loading system
- **Animation Controls**: Respects `prefers-reduced-motion`

## 🎯 SEO & Accessibility

### **SEO Features**
- **Complete Meta Tags**: Title, description, Open Graph, Twitter Cards
- **Structured Data**: JSON-LD for organization and events
- **Sitemap**: XML sitemap for search engines
- **Robots.txt**: Search engine directives
- **Semantic HTML**: Proper heading hierarchy and landmarks

### **Accessibility**
- **ARIA Labels**: Screen reader support
- **Keyboard Navigation**: Full keyboard accessibility
- **Focus Management**: Visible focus indicators
- **Color Contrast**: WCAG compliant color schemes
- **Motion Preferences**: Respects reduced motion settings

## 🔮 Future Enhancements

### **Planned Features**
- Backend integration for dynamic content
- Member authentication system
- Event registration system
- Advanced photo gallery with uploads
- Tournament management system

### **Technical Improvements**
- Service Worker for offline functionality
- Advanced PWA features
- Database integration
- API development for dynamic content

## 📞 Support & Contact

- **Technical Issues**: Use the contact form on the website
- **Community Info**: info@arosff.dk
- **Meeting Times**: Sundays 13:00-18:00
- **Location**: Aarhus, Denmark

---

**Velkommen til Aros Forenede Figurspillere!** 🎲

*Made with ❤️ for the tabletop gaming community in Aarhus*
- **Contact Form**: Easy way for new members to get in touch
- **Mobile Navigation**: Hamburger menu for mobile users
- **SEO Optimized**: Complete meta tags, structured data, and sitemaps

## 🚀 Deployment

This website is designed to be hosted on **GitHub Pages** as a static site. No server-side processing is required.

### Deployment Steps:

1. Push all files to your GitHub repository
2. Go to Repository Settings → Pages
3. Select "Deploy from a branch"
4. Choose "main" branch and "/ (root)" folder
5. Your site will be available at: `https://aros-forenede-figurspillere.github.io/Website/`

## 📁 File Structure

```
Website/
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── script.js           # JavaScript functionality
├── images/             # Images folder
│   ├── README.md       # Instructions for images
│   ├── aros-logo.png   # Your logo (add this file)
│   └── clubhouse.jpg   # Your clubhouse photo (add this file)
└── README.md           # This file
```

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Flexbox and Grid
- **JavaScript**: Interactive functionality
- **Font Awesome**: Icons
- **Google Fonts**: Typography (Roboto + Cinzel)

## 🎨 Design Features

- **Color Scheme**: Professional blues and reds
- **Typography**: Combination of modern (Roboto) and elegant (Cinzel) fonts
- **Animations**: Smooth scroll effects and hover animations
- **Accessibility**: Proper focus states and semantic HTML
- **Performance**: Optimized images and debounced scroll events

## 📱 Mobile Responsive

The website is fully responsive and includes:
- Mobile-first design approach
- Hamburger navigation menu
- Touch-friendly buttons and forms
- Optimized layouts for all screen sizes

## 🔧 Customization

### Adding Real Images:
1. Create an `images/` folder
2. Add your images (tournaments, painted miniatures, etc.)
3. Replace the placeholder content in the gallery section
4. Update image paths in HTML

### Contact Form Integration:
The contact form currently shows a success message. For real functionality, consider:
- **Formspree**: Simple form handling service
- **Netlify Forms**: If hosting on Netlify
- **EmailJS**: Client-side email sending

### Social Media Links:
Update the social media links in the contact and footer sections with your actual profiles:
- **Facebook**: https://www.facebook.com/arosforenedefigurspillere (✅ Already added!)
- Discord server
- Instagram account

## 🎯 SEO Optimized

The website includes:
- Meta descriptions
- Open Graph tags
- Semantic HTML structure
- Proper heading hierarchy
- Alt text for images (when added)

## 🌟 Future Enhancements

Potential features to add:
- Member login system
- Tournament registration
- Event calendar integration
- Blog/news section
- Photo gallery with lightbox
- Progressive Web App (PWA) features

## 📞 Support

For technical questions about the website, please contact the web team through the contact form on the site.

## 🏆 Community Information

- **Location**: Aarhus, Denmark
- **Game Focus**: Tabletop Wargaming (Warhammer, Warhammer 40k, Moonstone, Warmachine, and more)
- **Meeting Times**: Sundays 13:00-18:00
- **Skill Levels**: All levels welcome

---

**Velkommen til Aros Forenede Figurspillere!** 🎲# Test deployment fix

# Changelog

All notable changes to the Aros Forenede Figurspillere website project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.1.0] - 2025-08-29

### 🌐 Community Integration Enhanced

#### Added
- **Discord Server Integration**: Direct link to community Discord server (`https://discord.gg/5yvQRbd5QK`)
- **Community CTA Section**: Prominent call-to-action section after hero banner
- **Community Navigation**: Dedicated community dropdown in navigation menu
- **Enhanced Social Links**: Updated all social media references across the site

#### Changed
- **Favicon Update**: Switched from SVG to ICO format for better browser compatibility
- **Favicon Location**: Moved favicon from `assets/icons/` to root directory for standard web conventions
- **Manifest Update**: Updated PWA manifest to reference new favicon location

#### Community Features
- Prominent Discord and Facebook buttons in contact section
- Community value proposition clearly explained (Discord = daily chat, Facebook = events)
- Multiple community touchpoints throughout user journey
- Enhanced footer social links with proper URLs and descriptions

#### UX Improvements
- Hero section Discord button as primary call-to-action
- Community join section with gradient background and hover effects
- Mobile-optimized community buttons and responsive design
- Consistent community messaging across all pages and components

#### Technical Updates
- Updated structured data (JSON-LD) to include Discord server
- Enhanced social link management across multiple components
- Improved accessibility with proper link titles and descriptions
- Favicon references updated in all HTML components and manifest

---

## [2.0.0] - 2025-08-29

### 🚀 Major Architecture Overhaul

#### Added
- **Advanced Theme System**: Complete light/dark mode with system preference detection
- **Component Architecture**: Modular HTML components in `/includes/` directory
- **Loading Screen System**: Resource monitoring with visual progress feedback
- **Dynamic Component Loading**: JavaScript-based component loader system
- **Performance Optimizations**: Debounced events, lazy loading, efficient resource management

#### Theme System Features
- CSS Custom Properties for comprehensive theming
- Automatic system preference detection (prefers-color-scheme)
- Manual theme toggle with localStorage persistence
- Smooth theme transition animations
- Mobile browser theme-color integration
- Theme-aware navigation and component styling

#### Component System Features
- `ComponentLoader` class for dynamic HTML loading
- Separate components for navigation, headers, footers, scripts
- Responsive component variants (main vs subpages)
- Error handling and graceful fallbacks
- Relative path management for GitHub Pages compatibility

#### Loading System Features
- Multi-resource monitoring (CSS, JS, images, fonts, components)
- Visual progress bar with animated feedback
- Intelligent timeout and failsafe mechanisms
- Resource prioritization (local vs external)
- Debug functionality for development

#### Performance Enhancements
- Debounced scroll and resize event handlers
- Lazy loading system for images
- Optimized event listener management
- Reduced motion support for accessibility
- Console logging for debugging and monitoring

### 🎨 Enhanced User Experience

#### Added
- Animated loading screen with dice theme
- Smooth theme switching with visual feedback
- Enhanced navigation with active state management
- Improved mobile responsiveness
- Better error handling and user feedback

#### Improved
- Navigation system with proper active states
- Mobile hamburger menu functionality
- Form validation and user feedback
- Cross-browser compatibility
- Accessibility features and ARIA labels

### 🛠️ Technical Improvements

#### File Structure Reorganization
```
├── includes/                  # New: Reusable HTML components
│   ├── head-common.html      # Common head elements
│   ├── navigation.html       # Main navigation
│   ├── footer-main.html      # Main footer
│   └── [other components]    # Various reusable components
├── assets/
│   ├── css/
│   │   ├── styles.css        # Enhanced: Theme system
│   │   └── game-pages.css    # Enhanced: Game-specific styling
│   └── js/
│       ├── script.js         # Enhanced: Theme management
│       └── navigation.js     # New: Component loader
├── templates/                 # New: Page templates
├── start-server.ps1          # New: Development server script
└── docs/
    ├── CREDITS.md            # Enhanced: Comprehensive credits
    └── CHANGELOG.md          # New: This file
```

#### Code Quality Improvements
- Modern JavaScript ES6+ classes and modules
- Comprehensive error handling
- Improved code organization and commenting
- Better separation of concerns
- Enhanced maintainability

### 🌐 SEO and Accessibility

#### Enhanced
- Improved semantic HTML structure
- Better ARIA label implementation
- Enhanced meta tag optimization
- Improved mobile performance
- Better structured data implementation

#### Added
- Theme-aware meta tags
- Enhanced mobile optimization
- Better keyboard navigation support
- Improved screen reader compatibility

### 🎮 Gaming Features

#### Enhanced
- Better game page organization
- Improved dice game functionality
- Enhanced game-specific styling
- Better mobile gaming experience

### 📱 Mobile Experience

#### Improved
- Better mobile navigation
- Enhanced touch interactions
- Improved mobile performance
- Better mobile theme integration
- Enhanced mobile accessibility

### 🔧 Development Tools

#### Added
- Local development server script (`start-server.ps1`)
- Enhanced debugging and logging
- Better error reporting
- Improved development workflow

## [1.0.0] - 2025-08-29

### 🎉 Initial Release

#### Added
- **Core Website Structure**: Complete landing page with Danish localization
- **Interactive Dice Game**: D6 rolling simulation with statistics
- **Game Pages**: Dedicated pages for Warhammer 40k and Warmachine
- **SEO Suite**: Complete optimization with meta tags, sitemaps, structured data
- **PWA Support**: Web app manifest and service worker structure
- **Development Tools**: Favicon generator, image resizer, utilities

#### Core Features
- Responsive design for all device sizes
- Professional community branding
- Event calendar structure
- Contact form with validation
- Social media integration
- Image gallery system

#### Technical Foundation
- HTML5 semantic markup
- CSS3 with Flexbox and Grid
- Vanilla JavaScript functionality
- Font Awesome icons
- Google Fonts integration
- Complete SEO implementation

#### Gaming Content
- Community information and branding
- Game-specific content organization
- Event showcase structure
- Member engagement features

#### Development Infrastructure
- GitHub Pages deployment ready
- Complete documentation
- Development utilities
- Asset organization system

---

## Development Notes

### Version 2.0.0 Highlights
This major version represents a complete architectural overhaul focused on:
- **Maintainability**: Component-based architecture for easier updates
- **User Experience**: Advanced theming and loading systems
- **Performance**: Optimized loading and interaction patterns
- **Accessibility**: Enhanced support for all users
- **Future-Proofing**: Modern architecture ready for backend integration

### Breaking Changes in 2.0.0
- File structure reorganization (components moved to `/includes/`)
- CSS architecture changes (theme system implementation)
- JavaScript refactoring (class-based architecture)
- Enhanced loading behavior (may affect timing-sensitive integrations)

### Migration from 1.0.0 to 2.0.0
- No user-facing breaking changes
- All existing functionality preserved
- Enhanced performance and features
- Backward compatible with existing configurations

### Future Versions
- 2.1.0: Enhanced PWA features and offline support
- 2.2.0: Backend integration and dynamic content
- 3.0.0: User authentication and member management system

---

**For detailed technical information, see [CREDITS.md](CREDITS.md)**
**For project overview and usage, see [README.md](../README.md)**

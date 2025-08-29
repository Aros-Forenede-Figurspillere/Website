# Game Page Creation Guide

This guide explains how to add new tabletop wargame pages to the website using our component system and templates.

## Quick Start

1. **Choose your game** (e.g., "Age of Sigmar")
2. **Copy template**: Use `templates/game-page.html` as starting point
3. **Create image folder**: `assets/images/[game-name]/`
4. **Update navigation**: Add to navigation components
5. **Test and deploy**

## Step-by-Step Process

### 1. Create Image Folder
```
assets/images/[game-name]/
├── hero-background.jpg (1920x1080)
├── overview.jpg (800x600) 
├── faction1.jpg (400x300)
├── faction2.jpg (400x300)
└── README.md
```

### 2. Copy and Customize Template
Start with `templates/game-page.html` and replace:

- `[GAME_NAME]` → "Age of Sigmar"
- `[GAME_FOLDER]` → "age-of-sigmar"
- `[GAME_DESCRIPTION]` → SEO description
- `[GAME_TAGLINE]` → Memorable quote
- `[GAME_INTRO]` → Brief introduction
- `[THEME_COLOR]` → Primary color (e.g., #FFD700)
- `[OFFICIAL_WEBSITE]` → Official game URL

### 3. Add Game-Specific Content

#### Hero Section
```html
<h1>Age of Sigmar</h1>
<p>"In the Mortal Realms, heroes are forged in battle"</p>
<p>Fantasy battles in magical realms with gods and monsters.</p>
```

#### Factions Grid
```html
<div class="faction-grid">
    <div class="card">
        <img src="../assets/images/age-of-sigmar/stormcast.jpg" alt="Stormcast Eternals" class="card-image">
        <div class="card-content">
            <h3>Stormcast Eternals</h3>
            <p>Golden warriors blessed by Sigmar himself...</p>
        </div>
    </div>
    <!-- More factions -->
</div>
```

#### Features
```html
<div class="features-grid">
    <div class="feature-item">
        <div class="feature-icon">⚡</div>
        <h3>Magic System</h3>
        <p>Powerful spells and endless magic...</p>
    </div>
    <!-- More features -->
</div>
```

### 4. Update Navigation Components

**Add to `includes/navigation.html`:**
```html
<li class="nav-item">
    <a href="pages/age-of-sigmar.html" class="nav-link">🏰 Age of Sigmar</a>
</li>
```

**Add to `includes/navigation-subpages.html`:**
```html
<li class="nav-item">
    <a href="age-of-sigmar.html" class="nav-link">🏰 Age of Sigmar</a>
</li>
```

**Update `index.html` navigation:**
```html
<a href="pages/age-of-sigmar.html" class="nav-link">🏰 Age of Sigmar</a>
```

### 5. Update Footer Game List

**In `includes/footer-subpages.html`:**
```html
<ul>
    <li>Warhammer 40,000</li>
    <li>Warmachine MKIV</li>
    <li>Age of Sigmar</li>  <!-- Add here -->
    <li>Moonstone</li>
</ul>
```

### 6. File Naming Convention

- **Page file**: `pages/[game-name].html`
- **Image folder**: `assets/images/[game-name]/`
- **Use lowercase with hyphens**: `age-of-sigmar`, `kill-team`, `blood-bowl`

## Game Page Structure

### Essential Sections:
1. **Hero** - Eye-catching banner with game name and tagline
2. **Overview** - What is this game? Text + image
3. **Factions/Armies** - Grid of playable forces
4. **Features** - Why play this game?
5. **CTA** - Join our community

### Optional Sections:
- **Game Modes** - Different ways to play
- **Lore Timeline** - Story background  
- **Getting Started** - Beginner advice
- **Community Highlights** - Local events/achievements

## Design Guidelines

### Colors
- **Primary color** should match game theme
- Use CSS custom properties for consistency
- Test in both light and dark themes

### Images
- **Hero**: 1920x1080 landscape
- **Overview**: 800x600 action shot
- **Factions**: 400x300 army photos
- **Consistent quality** and official/community sources

### Content Tone
- **Enthusiastic** but informative
- **Danish language** for local community
- **Include emojis** in navigation for visual appeal
- **Clear structure** with scannable sections

## Component System Benefits

✅ **Automatic navigation** updates across all pages
✅ **Consistent footer** and theme support  
✅ **Mobile responsive** design inheritance
✅ **Theme toggle** works automatically
✅ **Easy maintenance** - update components once

## Testing Checklist

- [ ] Page loads without errors
- [ ] Navigation works (all links functional)
- [ ] Theme toggle works
- [ ] Mobile responsive layout
- [ ] Images load (or graceful fallback)
- [ ] Footer loads correctly
- [ ] Component system initializes
- [ ] Cross-browser compatibility

## Examples

- `pages/warhammer40k.html` - Complex page with factions, timeline, modes
- `pages/warmachine-mkiv.html` - Comprehensive game page
- `pages/dice-game.html` - Simple interactive page

## Future Enhancements

- **Search functionality** across game pages
- **Comparison tool** between games
- **Event calendar** integration per game
- **Community galleries** for each game
- **Army builder** tools

## Troubleshooting

**Navigation not loading?**
- Check `navigation.js` is included
- Verify container IDs match
- Test fetch permissions for components

**Styling issues?**
- Ensure `styles.css` is loaded
- Check CSS custom properties
- Test theme switching

**Images not displaying?**
- Verify file paths are correct
- Check image file extensions
- Add fallback alt text

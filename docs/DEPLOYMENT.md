# Deployment Guide

## 🚀 Overview

This guide covers deployment options for the Aros Forenede Figurspillere website, with primary focus on GitHub Pages deployment, plus alternative hosting options.

## 🌐 GitHub Pages Deployment (Recommended)

### Prerequisites
- GitHub account
- Repository with website files
- Basic Git knowledge

### Step-by-Step Deployment

#### 1. Repository Setup
```bash
# Clone your repository (if not already done)
git clone https://github.com/Aros-Forenede-Figurspillere/Website.git
cd Website

# Ensure all files are committed
git add .
git commit -m "Prepare for deployment"
git push origin main
```

#### 2. Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll to **Pages** section (left sidebar)
4. Under **Source**, select:
   - **Deploy from a branch**
   - Branch: **main**
   - Folder: **/ (root)**
5. Click **Save**

#### 3. Configure Custom Domain (Optional)
If you have a custom domain:
1. In the **Pages** settings, enter your domain in **Custom domain**
2. Create a `CNAME` file in repository root:
```
your-domain.com
```
3. Configure DNS with your domain provider:
```
Type: CNAME
Name: www
Value: aros-forenede-figurspillere.github.io
```

#### 4. Verify Deployment
- GitHub will provide a URL: `https://aros-forenede-figurspillere.github.io/Website/`
- Deployment typically takes 1-10 minutes
- Check the **Actions** tab for deployment status

### GitHub Pages Configuration

#### Repository Structure for GitHub Pages
```
/
├── index.html              # Required: Main page
├── 404.html               # Custom error page
├── CNAME                  # Custom domain (if applicable)
├── assets/                # Static assets
├── includes/              # HTML components
├── pages/                 # Additional pages
├── docs/                  # Documentation
└── [other files]          # Project files
```

#### Path Considerations
All paths in the website are relative, ensuring compatibility:
```html
<!-- Correct for GitHub Pages -->
<link rel="stylesheet" href="assets/css/styles.css">
<img src="assets/images/logo.png" alt="Logo">

<!-- Component loading with relative paths -->
ComponentLoader.loadComponent('container', 'includes/navigation.html');
```

## 🛠️ Alternative Hosting Options

### 1. Netlify

#### Deployment via Git
1. Sign up at [netlify.com](https://netlify.com)
2. Click **New site from Git**
3. Connect GitHub repository
4. Configure build settings:
   - **Build command**: (leave empty for static site)
   - **Publish directory**: `/` (root)
5. Click **Deploy site**

#### Netlify Features
- **Custom domains**: Easy DNS management
- **SSL certificates**: Automatic HTTPS
- **Form handling**: Built-in form processing
- **Redirects**: Custom redirect rules
- **Edge functions**: Serverless functionality

#### Netlify Configuration (`netlify.toml`)
```toml
[build]
  publish = "/"
  
[[redirects]]
  from = "/*"
  to = "/404.html"
  status = 404

[build.environment]
  NODE_VERSION = "18"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
```

### 2. Vercel

#### Deployment Process
1. Sign up at [vercel.com](https://vercel.com)
2. Import GitHub repository
3. Configure project settings:
   - **Framework**: None (static site)
   - **Root directory**: `/`
   - **Output directory**: (leave empty)
4. Deploy

#### Vercel Configuration (`vercel.json`)
```json
{
  "cleanUrls": true,
  "trailingSlash": false,
  "redirects": [
    {
      "source": "/home",
      "destination": "/"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        }
      ]
    }
  ]
}
```

### 3. Traditional Web Hosting

#### File Upload Method
1. Compress entire website into ZIP file
2. Upload to hosting provider's file manager
3. Extract files to public HTML directory
4. Configure domain (if applicable)

#### FTP Deployment
```bash
# Using FTP client or command line
ftp your-hosting-provider.com
# Login with credentials
# Navigate to public_html or www directory
# Upload all website files
```

## 🔧 Local Development Setup

### Prerequisites
- Python 3.x (for local server)
- Git (for version control)
- Modern web browser

### Local Server Options

#### Option 1: Python HTTP Server
```powershell
# Navigate to website directory
cd C:\path\to\Website

# Start server (Python 3)
python -m http.server 8000

# Or use the provided script
.\start-server.ps1
```

#### Option 2: VS Code Live Server
1. Install **Live Server** extension in VS Code
2. Right-click on `index.html`
3. Select **Open with Live Server**

#### Option 3: Node.js HTTP Server
```bash
# Install globally
npm install -g http-server

# Start server
http-server -p 8000

# Or with specific options
http-server -p 8000 -o -c-1
```

### Development Workflow
```bash
# 1. Make changes to files
# 2. Test locally
python -m http.server 8000

# 3. Commit changes
git add .
git commit -m "Description of changes"

# 4. Push to GitHub (triggers deployment)
git push origin main
```

## 🔒 Security Considerations

### HTTPS Configuration
All major hosting platforms provide automatic HTTPS:
- **GitHub Pages**: Automatic with custom domains
- **Netlify**: Automatic Let's Encrypt certificates
- **Vercel**: Automatic SSL/TLS

### Security Headers
Recommended security headers for hosting providers:

```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000; includeSubDomains
Content-Security-Policy: default-src 'self'; style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src fonts.gstatic.com; script-src 'self' 'unsafe-inline'
```

### Content Security Policy
For enhanced security, implement CSP:

```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com; 
               font-src https://fonts.gstatic.com https://cdnjs.cloudflare.com; 
               script-src 'self' 'unsafe-inline'; 
               img-src 'self' data:;">
```

## 📊 Performance Optimization

### Pre-Deployment Checklist
- [ ] **Image Optimization**: Compress images for web
- [ ] **CSS Minification**: Minify CSS for production
- [ ] **JavaScript Optimization**: Remove console.log statements
- [ ] **File Compression**: Enable gzip compression
- [ ] **Caching Headers**: Configure appropriate cache headers

### Image Optimization
```bash
# Use tools like ImageOptim, TinyPNG, or command line tools
# Example with imagemin-cli
npm install -g imagemin-cli imagemin-mozjpeg imagemin-pngquant

imagemin assets/images/*.{jpg,png} --out-dir=assets/images/optimized --plugin=mozjpeg --plugin=pngquant
```

### CSS and JS Optimization
For production deployment, consider:
- Minifying CSS and JavaScript
- Combining multiple CSS files
- Removing unused CSS
- Optimizing loading performance

## 🌍 CDN and Global Distribution

### Cloudflare Integration
1. Sign up for Cloudflare
2. Add your domain
3. Update nameservers
4. Configure caching and optimization settings
5. Enable security features

### Benefits of CDN
- **Faster Loading**: Global edge locations
- **DDoS Protection**: Built-in security
- **SSL/TLS**: Free certificates
- **Caching**: Automatic optimization
- **Analytics**: Traffic insights

## 📱 Mobile and PWA Considerations

### Mobile Optimization Verification
- Test on various mobile devices
- Verify touch interactions work correctly
- Ensure loading screen works on mobile
- Test theme switching on mobile browsers

### Progressive Web App Setup
The website includes PWA manifest (`site.webmanifest`):
```json
{
  "name": "Aros Forenede Figurspillere",
  "short_name": "Aros FF",
  "description": "Tabletop wargaming community in Aarhus",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#2c3e50",
  "theme_color": "#e74c3c",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "any",
      "type": "image/svg+xml"
    }
  ]
}
```

## 🔍 Testing and Validation

### Pre-Deployment Testing
1. **Local Testing**: Test all functionality locally
2. **Cross-Browser Testing**: Chrome, Firefox, Safari, Edge
3. **Mobile Testing**: iOS and Android devices
4. **Performance Testing**: Page load speeds
5. **Accessibility Testing**: Screen readers, keyboard navigation
6. **SEO Validation**: Meta tags, structured data

### Validation Tools
- **HTML Validation**: [W3C Markup Validator](https://validator.w3.org/)
- **CSS Validation**: [W3C CSS Validator](https://jigsaw.w3.org/css-validator/)
- **Accessibility**: [WAVE](https://wave.webaim.org/)
- **Performance**: [Google PageSpeed Insights](https://pagespeed.web.dev/)
- **SEO**: [Google Search Console](https://search.google.com/search-console)

### Automated Testing
```bash
# Example testing script
#!/bin/bash
echo "Running pre-deployment tests..."

# Check HTML validation
echo "Validating HTML..."
# Add validation commands

# Check performance
echo "Testing performance..."
# Add performance testing

echo "All tests completed!"
```

## 🚀 Deployment Automation

### GitHub Actions (CI/CD)
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm install
      
    - name: Run tests
      run: npm test
      
    - name: Build
      run: npm run build
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

### Deployment Script
Create `deploy.ps1` for Windows:

```powershell
# Deployment script for Aros FF Website
Write-Host "🚀 Starting deployment process..." -ForegroundColor Green

# Check if we're in the right directory
if (!(Test-Path "index.html")) {
    Write-Host "❌ Error: index.html not found. Run from website root directory." -ForegroundColor Red
    exit 1
}

# Run local tests
Write-Host "🧪 Running local tests..." -ForegroundColor Yellow
# Add test commands here

# Commit and push changes
Write-Host "📤 Pushing changes to GitHub..." -ForegroundColor Yellow
git add .
git commit -m "Deploy: $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
git push origin main

Write-Host "✅ Deployment complete! Check GitHub Pages in a few minutes." -ForegroundColor Green
Write-Host "🌐 URL: https://aros-forenede-figurspillere.github.io/Website/" -ForegroundColor Cyan
```

## 🔧 Troubleshooting

### Common Deployment Issues

#### 1. Pages Not Loading
- **Check file paths**: Ensure all paths are relative
- **Verify case sensitivity**: GitHub Pages is case-sensitive
- **Check 404 errors**: Use browser dev tools to identify missing files

#### 2. CSS/JS Not Loading
- **Path issues**: Verify relative paths are correct
- **Cache issues**: Hard refresh browser (Ctrl+F5)
- **File permissions**: Ensure files are readable

#### 3. Images Not Displaying
- **File formats**: Ensure web-compatible formats (jpg, png, svg, webp)
- **Path case**: Check exact case of filenames
- **File size**: Large images may load slowly

#### 4. Theme System Issues
- **JavaScript errors**: Check browser console
- **LocalStorage**: Verify localStorage is available
- **CSS variables**: Ensure proper CSS custom property support

### Debug Commands
```bash
# Check Git status
git status

# Verify recent commits
git log --oneline -5

# Check GitHub Pages build status
# (Check repository Actions tab on GitHub)

# Test local deployment
python -m http.server 8000
```

## 📞 Support and Resources

### Documentation Links
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Netlify Documentation](https://docs.netlify.com/)
- [Vercel Documentation](https://vercel.com/docs)

### Community Support
- GitHub Issues: Report technical problems
- Community Forum: Get help from other developers
- Email: Technical questions to development team

---

## 🎯 Quick Deployment Checklist

### Pre-Deployment
- [ ] All files committed to Git
- [ ] Local testing completed
- [ ] Cross-browser testing done
- [ ] Mobile testing completed
- [ ] Performance optimized
- [ ] Security headers configured

### GitHub Pages Deployment
- [ ] Repository settings configured
- [ ] Pages source set to main branch
- [ ] Custom domain configured (if applicable)
- [ ] HTTPS enabled
- [ ] Deployment successful

### Post-Deployment
- [ ] Website loads correctly
- [ ] All pages accessible
- [ ] Theme switching works
- [ ] Forms function properly
- [ ] Mobile experience verified
- [ ] SEO tags verified

---

**Your Aros Forenede Figurspillere website is ready for the world! 🎲**

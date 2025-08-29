# Warmachine MKIV Image Download Guide

## Quick Setup for Images

To get the official Warmachine images for your page, follow these steps:

### 1. Visit Official Sources:
- **Steamforged Games**: https://steamforged.com/warmachine
- **Privateer Press**: https://home.privateerpress.com/warmachine/

### 2. Download These Images:

#### Faction Images (Right-click → Save As):
1. **Cygnar Storm Legion**: Save as `cygnar-storm-legion.jpg`
2. **Khador Winter Korps**: Save as `khador-winter-korps.jpg`  
3. **Cryx Necrofactorium**: Save as `cryx-necrofactorium.jpg`
4. **Khymaera Shadowflame**: Save as `khymaera-shadowflame.jpg`
5. **Orgoth Sea Raiders**: Save as `orgoth-sea-raiders.jpg`
6. **Southern Kriels**: Save as `southern-kriels.jpg`

#### Product Images:
1. **Shadows & Scum Box**: Save as `shadows-scum-starter.jpg`
2. **Hellraker Colossal**: Save as `hellraker-colossal.jpg`
3. **Magnus & Invictus**: Save as `magnus-invictus.jpg`

#### Hero Image:
1. **Main Warmachine Art**: Save as `warmachine-hero-bg.jpg`

### 3. Save Location:
Put all images in: `assets/images/warmachine/`

### 4. Image Optimization:
- Resize to web-friendly sizes (max 1200px width)
- Compress for faster loading
- Use JPG for photos, PNG for logos with transparency

### 5. Copyright Notice:
Always include attribution: "Images courtesy of Steamforged Games"

### 6. Alternative Sources:
If official images aren't available:
- Use your own painted models
- Create simple placeholder graphics
- Use community photos (with permission)

## PowerShell Script to Create Placeholder Images:

```powershell
# Run this in assets/images/warmachine/ directory
$placeholders = @(
    "cygnar-storm-legion.jpg",
    "khador-winter-korps.jpg", 
    "cryx-necrofactorium.jpg",
    "khymaera-shadowflame.jpg",
    "orgoth-sea-raiders.jpg",
    "southern-kriels.jpg",
    "shadows-scum-starter.jpg",
    "hellraker-colossal.jpg",
    "magnus-invictus.jpg",
    "warmachine-hero-bg.jpg"
)

foreach ($file in $placeholders) {
    if (!(Test-Path $file)) {
        "<!-- Placeholder for $file -->" | Out-File -FilePath $file -Encoding UTF8
        Write-Host "Created placeholder: $file"
    }
}
```

Your Warmachine MKIV page is now live and ready! 🎲⚔️

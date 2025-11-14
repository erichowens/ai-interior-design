# Adding and Managing Platforms

## Overview

This guide explains how to add new AI interior design platforms to the comparison tool and enrich existing ones with detailed information.

## Platform Data Structure

Each platform in `data/platforms.json` follows this structure:

```json
{
  "id": "unique-platform-id",
  "name": "Platform Name",
  "tagline": "Short compelling tagline",
  "url": "https://platform-url.com",
  "logo": "URL or will auto-generate",
  "metrics": {
    "speed": {
      "value": 25,
      "unit": "seconds",
      "percentile": 95
    },
    "pricePerRender": 0.30,
    "monthlyUsers": 125000,
    "accuracy": 85,
    "satisfaction": 4.2
  },
  "capabilities": {
    "styles": 9,
    "resolution": "512x512",
    "apiAccess": true,
    "batchProcessing": true,
    "mobileApp": true,
    "arPreview": false,
    "shoppingLinks": false,
    "cadExport": false,
    "collaboration": false,
    "3dModeling": false
  },
  "pricing": {
    "free": {
      "renders": 3,
      "resolution": "512x512",
      "features": ["Basic styles", "Watermark"]
    },
    "pro": {
      "price": 29,
      "period": "month",
      "renders": "unlimited",
      "resolution": "1024x1024",
      "features": ["API access", "Batch processing"]
    }
  },
  "technology": {
    "model": "ControlNet ML",
    "framework": "Replicate",
    "hosting": "Vercel",
    "openSource": true,
    "githubStars": 11200
  },
  "samples": [
    "image-url-1.jpg",
    "image-url-2.jpg",
    "image-url-3.jpg"
  ],
  "bestFor": ["Rapid prototyping", "Developers"],
  "limitations": ["Lower resolution", "Limited styles"]
}
```

## Adding a New Platform

### Step 1: Research the Platform

Gather the following information:
- [ ] Official website URL
- [ ] Current pricing (check for free tier)
- [ ] Speed test (time 3 renders, take average)
- [ ] Resolution capabilities
- [ ] Feature list (API, mobile app, AR, etc.)
- [ ] Technology stack (if public)
- [ ] Sample images or screenshots
- [ ] User base size (check SimilarWeb, Twitter followers, etc.)

### Step 2: Add to platforms.json

1. Open `data/platforms.json`
2. Add new platform object to the `platforms` array
3. Ensure `id` is unique and kebab-case
4. Fill in all required fields

### Step 3: Add Description (Optional)

Edit `scripts/enrichPlatforms.js` to add a detailed description:

```javascript
export const platformDescriptions = {
  'your-platform-id': {
    description: "3-4 sentence description covering: background, key features, target audience, and unique value proposition.",
    highlights: [
      "Key highlight 1",
      "Key highlight 2",
      "Key highlight 3"
    ],
    trustedBy: ["User type 1", "User type 2"],
    videoDemo: "youtube-url" // optional
  }
}
```

### Step 4: Test

1. Save files
2. Check dev server: `http://localhost:5174`
3. Verify platform appears in:
   - Home page grid
   - Comparison tool
   - Wizard results
4. Test all interactive features

## Logo and Image Guidelines

### Logos

**Automatic Fallback**: If you don't provide a logo URL, the system automatically generates one using UI Avatars.

**Manual Logo**: To use a real logo:
1. Get official logo from platform's press kit or brand page
2. Host on a CDN or in `/public/logos/` directory
3. Use direct URL in `logo` field

**Logo Specs**:
- Format: PNG or SVG preferred
- Size: 128x128px minimum
- Background: Transparent or white
- Clear space around logo

### Sample Images

**Automatic Fallback**: The system uses curated Unsplash images if sample URLs are invalid.

**Manual Samples**: To use real platform screenshots:
1. Create before/after examples
2. Host on CDN or in `/public/samples/platform-id/`
3. Use URLs in `samples` array
4. Recommended: 3 images minimum

**Image Specs**:
- Format: JPG or WebP
- Size: 800x800px minimum
- Quality: High res, good lighting
- Content: Show platform's best work

## Capability Icons

Icons are automatically mapped in `src/utils/platformIcons.js`:

| Capability | Icon | Description |
|------------|------|-------------|
| `apiAccess` | 🔧 | Programmatic API access |
| `mobileApp` | 📱 | Native mobile apps |
| `arPreview` | 👁️ | AR visualization |
| `shoppingLinks` | 🛒 | Shopping integration |
| `cadExport` | 📐 | CAD file export |
| `3dModeling` | 🏗️ | 3D design tools |
| `batchProcessing` | ⚡ | Bulk operations |
| `collaboration` | 👥 | Team features |

## Metrics Guidelines

### Speed (Generation Time)
- Test with same image 3 times
- Use average of 3 renders
- Include queue time
- Unit: seconds

### Price Per Render
```
pricePerRender = (Monthly Price) / (Monthly Renders)
```
Example: $29/mo for 100 renders = $0.29/render

### Monthly Users
Sources (in order of preference):
1. Platform's public metrics
2. SimilarWeb estimates
3. Twitter/social following * 0.5
4. App store reviews/downloads

### Accuracy
Subjective score 0-100 based on:
- How well renders match input
- Detail preservation
- Style accuracy
- Realism

### Satisfaction
Average user rating from:
- Product Hunt
- App stores
- Trustpilot
- Reddit threads

## Enrichment Checklist

When fully enriching a platform:

### Required ✅
- [ ] Basic data in platforms.json
- [ ] All metrics filled
- [ ] All capabilities marked
- [ ] At least 2 pricing tiers
- [ ] 3 sample images
- [ ] 3+ items in "bestFor"
- [ ] 2+ limitations

### Recommended 🎯
- [ ] Detailed description in enrichPlatforms.js
- [ ] Real logo (not generated)
- [ ] Actual platform screenshots
- [ ] Technology details
- [ ] Metadata (founded, funding, etc.)
- [ ] Review highlights

### Optional ⭐
- [ ] Video demo URL
- [ ] Founder information
- [ ] Partnership details
- [ ] Use case examples
- [ ] Certifications

## Bulk Operations

### Update All Logos
```bash
# Run logo update script (creates one if needed)
npm run update-logos
```

### Update All Samples
```bash
# Download sample images for all platforms
npm run fetch-samples
```

### Validate Data
```bash
# Check for missing/invalid data
npm run validate-platforms
```

## Common Issues

### Problem: Platform not showing up
**Solution**: Check `id` is unique and matches kebab-case format

### Problem: Logo not loading
**Solution**: Check URL is publicly accessible or leave blank for auto-generation

### Problem: Samples broken
**Solution**: Use Unsplash URLs or leave blank for fallback images

### Problem: Metrics seem wrong
**Solution**: Re-test and verify sources, update `lastUpdated` in platforms.json

## Best Practices

1. **Be Honest**: Don't inflate metrics or hide limitations
2. **Stay Current**: Update pricing and features quarterly
3. **Source Everything**: Keep links to where you got data
4. **Test Thoroughly**: Check on mobile and desktop
5. **User Focus**: Write descriptions for users, not SEO

## Example: Adding "NewDesign AI"

```json
{
  "id": "newdesign-ai",
  "name": "NewDesign AI",
  "tagline": "Lightning-fast AI room transformations",
  "url": "https://newdesign.ai",
  "logo": "",  // Will auto-generate
  "metrics": {
    "speed": { "value": 15, "unit": "seconds", "percentile": 97 },
    "pricePerRender": 0.20,
    "monthlyUsers": 50000,
    "accuracy": 88,
    "satisfaction": 4.4
  },
  "capabilities": {
    "styles": 20,
    "resolution": "2048x2048",
    "apiAccess": true,
    "batchProcessing": true,
    "mobileApp": false,
    "arPreview": false,
    "shoppingLinks": false,
    "cadExport": false,
    "collaboration": false,
    "3dModeling": false
  },
  "pricing": {
    "free": {
      "renders": 5,
      "resolution": "1024x1024",
      "features": ["5 styles", "Watermark"]
    },
    "pro": {
      "price": 19,
      "period": "month",
      "renders": 100,
      "resolution": "2048x2048",
      "features": ["All styles", "API access", "Priority queue"]
    }
  },
  "technology": {
    "model": "Stable Diffusion XL",
    "framework": "Custom",
    "hosting": "AWS",
    "openSource": false
  },
  "samples": [],  // Will use fallback
  "bestFor": ["Quick redesigns", "Developers", "Content creators"],
  "limitations": ["No mobile app", "Limited 3D features"]
}
```

## Need Help?

- Check existing platforms for examples
- Review `src/utils/platformIcons.js` for icon mappings
- Test with dev server before committing
- Ask for review before deploying

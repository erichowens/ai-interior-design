# AI Interior Design Comparison Tool

## 🚀 Quick Start for Claude Code

### Step 1: Initialize MCPs
You need these MCP servers for Claude Code:
1. **Filesystem MCP** - Already included in Claude Code
2. **GitHub MCP** (optional) - For version control

### Step 2: Open in Claude Code
```bash
cd ~/coding/ai_interior_design
code .  # Opens in VSCode/Cursor with Claude Code
```

### Step 3: Tell Claude Code This:

> Build a React app with Vite and Tailwind for comparing AI interior design platforms. 
> 
> Use the PRD.md and technical-spec.md in this folder for requirements. The platforms.json in /data has all the platform information.
> 
> Key features to implement:
> 1. Market growth hero chart (D3.js animated from $829M to $7.3B)
> 2. Quick match wizard (3 questions to get platform recommendation)
> 3. Platform cards with radar charts showing capabilities
> 4. Side-by-side comparison mode (drag up to 3 platforms)
> 5. ROI calculator for cost/benefit analysis
> 
> Use these external CDNs for images:
> - Cloudinary for optimization: https://res.cloudinary.com/demo/image/fetch/
> - Or use the sample URLs directly from platforms.json
> 
> Design system:
> - Colors: Terracotta (#C65D00), Sage (#8B9A7B), Warm Gold (#D4A574)
> - Fonts: Fraunces (serif headers), Inter (body)
> - Mobile-first, accessible, fast (target: sub-2s load)
> 
> Start by:
> 1. Setting up Vite + React + Tailwind
> 2. Creating the component structure
> 3. Loading platforms.json
> 4. Building the Quick Match Wizard first (it's the MVP feature)
> 
> Deploy to Vercel when ready. Make it beautiful and functional!

### Step 4: Image Hosting Setup

#### Option A: Cloudinary (Recommended)
1. Sign up for free at https://cloudinary.com
2. Get your cloud name
3. Use their fetch API: `https://res.cloudinary.com/YOUR_CLOUD_NAME/image/fetch/w_800,q_auto,f_auto/ORIGINAL_IMAGE_URL`

#### Option B: GitHub Pages
1. Create a separate repo for images
2. Enable GitHub Pages
3. Upload optimized images
4. Use URLs like: `https://USERNAME.github.io/ai-interior-images/platform-name.webp`

#### Option C: Direct Links
- Use the sample URLs from platforms.json directly
- Note: Some may not allow hotlinking

### Step 5: Deployment

#### Vercel (Recommended)
```bash
npm install -g vercel
vercel
# Follow prompts
```

#### Netlify
```bash
npm run build
# Drag 'dist' folder to Netlify
```

## 📁 Project Structure
```
ai_interior_design/
├── PRD.md                 # Product requirements
├── technical-spec.md      # Technical details
├── README.md             # This file
├── data/
│   └── platforms.json    # Platform data
├── package.json          # Dependencies
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind setup
├── index.html            # Entry point
└── src/
    ├── App.jsx           # Main app
    ├── components/       # React components
    │   ├── MarketGrowthHero.jsx
    │   ├── QuickMatchWizard.jsx
    │   ├── PlatformCard.jsx
    │   ├── ComparisonTable.jsx
    │   └── ROICalculator.jsx
    ├── utils/            # Helper functions
    ├── styles/           # CSS files
    └── assets/           # Local assets (if any)
```

## 🎯 Success Metrics
- [ ] Loads in under 2 seconds on 3G
- [ ] Lighthouse score 95+
- [ ] Works without JavaScript (progressive enhancement)
- [ ] WCAG 2.1 AA accessible
- [ ] Mobile-first responsive
- [ ] SEO optimized

## 🔗 Resources
- [Figma Designs](https://figma.com) - Create if needed
- [Platform Logos](https://clearbit.com/logo) - For missing logos
- [Color Palette](https://coolors.co/c65d00-8b9a7b-d4a574-faf8f5-2c3e50)
- [Fraunces Font](https://fonts.google.com/specimen/Fraunces)
- [Inter Font](https://fonts.google.com/specimen/Inter)

## 📊 Analytics Setup
1. Sign up for [Plausible](https://plausible.io) (30-day free trial)
2. Add script to index.html
3. Track key events:
   - Wizard completion
   - Platform comparisons
   - External clicks
   - ROI calculations

## 🚢 Go Live Checklist
- [ ] All images optimized and hosted
- [ ] Analytics configured
- [ ] SEO meta tags added
- [ ] Social preview cards configured
- [ ] Performance tested
- [ ] Accessibility tested
- [ ] Error tracking setup (Sentry free tier)
- [ ] Domain configured
- [ ] SSL certificate active
- [ ] Backup deployment ready

## 💡 Future Enhancements
- User accounts for saved comparisons
- Community gallery of designs
- API integration with platforms
- Affiliate revenue sharing
- White-label version for agencies

---

**Built with ❤️ for software engineers who love beautiful homes**
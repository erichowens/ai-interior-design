# AI Interior Design Platform Comparison Tool - PRD
**Version 1.0 - MVP Release**
*Last Updated: August 21, 2025*

## 🎯 Product Vision
Create the definitive comparison tool for AI interior design platforms that helps users make data-driven decisions in under 2 minutes.

## 📊 Success Metrics
- **Engagement**: 3+ minute average session duration
- **Conversion**: 15% click-through to platform sites
- **Sharing**: 5% social share rate
- **Return**: 20% weekly active return rate

## 🚀 Core Features (MVP)

### 1. Market Context Hero (Priority: P0)
**What**: Animated SVG showing market growth from $829M to $7.3B
**Why**: Establishes credibility and urgency
**Implementation**: 
- D3.js animated line chart
- Auto-play on scroll into view
- Mobile-responsive SVG

### 2. Quick Match Wizard (Priority: P0)
**What**: 3-question flow to get personalized recommendation
**Why**: 60% of users want quick answers, not deep research

**Questions**:
1. "What's your primary goal?"
   - Quick redesign for fun
   - Selling/renting property  
   - Professional design work
   - Complete home renovation

2. "What's your budget?"
   - Free only
   - Under $30/month
   - $30-100/month
   - Price isn't a concern

3. "What matters most?"
   - Speed (under 30 seconds)
   - Quality (photorealistic)
   - Shopping integration
   - Professional features (CAD, 3D)

**Output**: Top 3 matched platforms with match percentage

### 3. Platform Cards with Live Metrics (Priority: P0)
**What**: Dynamic cards showing real performance data
**Why**: Engineers trust data, not marketing copy

**Each Card Shows**:
- Generation speed (with percentile ranking)
- Monthly active users (social proof)
- Cost per room calculation
- API availability status badge
- Sample outputs (3 thumbnails from CDN)
- Capability radar chart (mini sparkline)

### 4. Side-by-Side Comparison Mode (Priority: P0)
**What**: Drag up to 3 platforms to compare
**Why**: Decision-making requires direct comparison

**Features**:
- Synchronized scrolling
- Difference highlighting
- Winner badges per category
- Export as image/PDF

### 5. ROI Calculator (Priority: P1)
**What**: Interactive calculator for cost/benefit
**Why**: Justify subscription to spouse/boss

**Inputs**:
- Rooms to design per month
- Current design cost/time
- Value of time ($/hour)

**Outputs**:
- Break-even point
- Annual savings
- Time saved visualization

### 6. Credibility Footer (Priority: P1)
**What**: Trust signals and methodology
**Why**: Engineers are skeptical

**Includes**:
- Last updated timestamp
- Testing methodology link
- Data sources
- Update newsletter signup
- GitHub repo link

## 🎨 Design System

### Colors (CSS Variables)
```css
--primary: #C65D00;    /* Terracotta */
--secondary: #8B9A7B;  /* Sage */
--accent: #D4A574;     /* Warm Gold */
--background: #FAF8F5; /* Warm White */
--text: #2C3E50;       /* Charcoal */
--success: #10B981;    /* Emerald */
--warning: #F59E0B;    /* Amber */
--error: #EF4444;      /* Red */
```

### Typography
- Headers: 'Fraunces', serif (variable font)
- Body: 'Inter', sans-serif
- Code: 'JetBrains Mono', monospace

### Components Needed
1. RadarChart component (recharts)
2. ComparisonTable component
3. QuickMatchWizard component
4. PlatformCard component
5. ROICalculator component
6. MarketGrowthChart component (D3.js)

## 📁 File Structure
```
ai_interior_design/
├── PRD.md (this file)
├── technical-spec.md
├── data/
│   ├── platforms.json
│   ├── comparison-metrics.json
│   └── sample-outputs.json
├── public/
│   ├── index.html
│   ├── styles.css
│   └── images/ (CDN URLs only)
├── src/
│   ├── App.js
│   ├── components/
│   ├── utils/
│   └── data/
├── package.json
└── README.md
```

## 🔗 External Assets Strategy

### Image Hosting
- **Option 1**: Cloudinary free tier (25GB bandwidth)
- **Option 2**: ImageKit.io (20GB bandwidth free)
- **Option 3**: GitHub Pages for static assets

### Sample Output Images
Source URLs from each platform's public galleries:
- RoomGPT: GitHub repo examples
- Paintit.ai: Public gallery
- Others: Marketing pages

### Performance Budget
- Initial load: < 2s on 3G
- Lighthouse score: 95+
- Bundle size: < 200KB gzipped
- Images: WebP with fallbacks

## 🚢 Deployment Strategy

### Phase 1 (Day 1)
- Static site on Vercel/Netlify
- Basic analytics (Plausible/SimpleAnalytics)
- Social preview cards

### Phase 2 (Week 1)
- Add comparison sharing URLs
- Email capture for updates
- Basic A/B testing

### Phase 3 (Month 1)
- User accounts for saved comparisons
- Platform accuracy voting
- Community sample gallery

## 🤝 Monetization (Future)
- Affiliate links (where available)
- "Pro" comparison features ($5/month)
- White-label for design agencies
- API access for developers

## ✅ Definition of Done
1. Loads in under 2 seconds on mobile
2. Passes WCAG 2.1 AA accessibility
3. Works without JavaScript (progressive enhancement)
4. SEO optimized (schema.org markup)
5. Social sharing configured
6. Analytics implemented
7. Error tracking active (Sentry free tier)

## 📝 Copy Requirements
- Tone: Knowledgeable but approachable
- Reading level: 8th grade
- No jargon without explanation
- Focus on outcomes, not features

## 🔍 SEO Target Keywords
- "AI interior design comparison"
- "RoomGPT vs Paintit.ai"
- "Best AI room designer 2025"
- "AI interior design pricing"
- "Virtual staging AI tools"

## 📊 Analytics Events to Track
- Wizard completion rate
- Platform card interactions
- Comparison additions
- External link clicks
- ROI calculator usage
- Time to decision

## 🚨 Risk Mitigation
- Platform changes: Monthly review schedule
- Image hosting limits: CDN fallbacks
- API deprecation: Static data fallback
- Performance: Progressive loading

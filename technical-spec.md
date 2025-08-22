# Technical Specification - AI Interior Design Comparison Tool

## Tech Stack
- **Framework**: React 18 with Vite (for speed)
- **Styling**: Tailwind CSS + custom design system
- **Charts**: Recharts (radar) + D3.js (market growth)
- **State**: Zustand (URL persistence)
- **Routing**: React Router v6
- **Build**: Vite
- **Deployment**: Vercel/Netlify
- **Analytics**: Plausible Analytics
- **Images**: Cloudinary (free tier)

## External Dependencies
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "recharts": "^2.10.0",
    "d3": "^7.8.0",
    "zustand": "^4.4.0",
    "framer-motion": "^10.16.0",
    "react-intersection-observer": "^9.5.0",
    "@headlessui/react": "^1.7.0",
    "clsx": "^2.0.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.0",
    "tailwindcss": "^3.3.0",
    "vite": "^5.0.0",
    "prettier": "^3.1.0",
    "eslint": "^8.55.0"
  }
}
```

## Component Architecture

### Core Components

#### 1. MarketGrowthHero
```jsx
// Animated D3 chart showing market growth
// Triggers on scroll into view
// Mobile responsive with touch interactions
```

#### 2. QuickMatchWizard
```jsx
// 3-step wizard with progress indicator
// Stores responses in URL params
// Returns top 3 matches with percentage
```

#### 3. PlatformCard
```jsx
// Lazy-loaded images from CDN
// Mini radar chart using Recharts
// Expandable details on click
// Draggable for comparison
```

#### 4. ComparisonTable
```jsx
// Virtualized for performance
// Sticky headers
// Export functionality
// Responsive horizontal scroll
```

#### 5. ROICalculator
```jsx
// Real-time calculation
// Shareable results URL
// Visual charts for savings
```

## State Management Structure

```javascript
// Zustand store with URL persistence
const useStore = create((set) => ({
  // User preferences
  wizardAnswers: {},
  comparisonPlatforms: [], // max 3
  
  // UI state
  activeView: 'grid', // grid | comparison | wizard
  
  // Data
  platforms: [],
  lastUpdated: '2025-08-21',
  
  // Actions
  setWizardAnswer: (step, answer) => {},
  addToComparison: (platformId) => {},
  removeFromComparison: (platformId) => {},
}))
```

## Performance Optimizations

1. **Image Loading**
   - Cloudinary auto-format and auto-quality
   - Lazy loading with Intersection Observer
   - LQIP (Low Quality Image Placeholders)
   - WebP with JPG fallbacks

2. **Code Splitting**
   - Route-based splitting
   - Heavy components (D3 chart) lazy loaded
   - Vendor chunk optimization

3. **Caching Strategy**
   - Static assets: 1 year
   - API data: 24 hours
   - Images: 30 days
   - Service worker for offline

## API Structure (Static JSON)

```javascript
// platforms.json
{
  "platforms": [
    {
      "id": "roomgpt",
      "name": "RoomGPT",
      "metrics": {
        "speed": {
          "value": 25,
          "unit": "seconds",
          "percentile": 95
        },
        "pricePerRender": 0.30,
        "monthlyUsers": 125000,
        "accuracy": 85
      },
      "capabilities": {
        "styles": 9,
        "resolution": "512x512",
        "apiAccess": true,
        "batchProcessing": true,
        "mobileApp": true,
        "arPreview": false,
        "shoppingLinks": false,
        "cadExport": false
      },
      "pricing": {
        "free": { "renders": 3, "features": "basic" },
        "starter": { "price": 9, "renders": 30 },
        "pro": { "price": 29, "renders": "unlimited" }
      },
      "samples": [
        "https://cdn.example.com/roomgpt-1.webp",
        "https://cdn.example.com/roomgpt-2.webp"
      ]
    }
  ],
  "lastUpdated": "2025-08-21T10:00:00Z",
  "methodology": "https://github.com/user/ai-interior-comparison"
}
```

## URL Structure

```
/                          # Home with all platforms
/wizard                    # Quick match wizard
/compare?p=roomgpt,paintit # Comparison view
/platform/roomgpt          # Individual platform deep dive
/calculator                # ROI calculator
/methodology               # How we test
```

## Deployment Configuration

### Vercel (vercel.json)
```json
{
  "buildCommand": "vite build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

## Environment Variables
```bash
VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name
VITE_PLAUSIBLE_DOMAIN=ai-interior-design.com
VITE_SITE_URL=https://ai-interior-design.com
```

## Testing Strategy
- Lighthouse CI for performance
- Playwright for E2E tests
- Vitest for unit tests
- Manual testing on real devices

## Browser Support
- Chrome 90+
- Safari 14+
- Firefox 88+
- Edge 90+
- Mobile Safari/Chrome

## Accessibility Requirements
- WCAG 2.1 AA compliant
- Keyboard navigation
- Screen reader tested
- Color contrast 4.5:1 minimum
- Focus indicators
- Skip links
- ARIA labels

## SEO Implementation
- Static rendering with Vite SSG
- Open Graph tags
- Twitter cards
- Schema.org markup
- Sitemap.xml
- Robots.txt

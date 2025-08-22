# Affiliate Monetization Setup Guide

## Current Status: NOT WORKING ❌
The affiliate links exist in data but aren't being used in the code.

## Step 1: Sign Up for Affiliate Programs

### Platforms with Likely Affiliate Programs:
1. **Paintit.ai** - Check their footer for "Affiliates" or "Partners"
2. **Foyr Neo** - Has `/partners/` URL structure suggesting program exists
3. **HomeStyler** - Autodesk often has partner programs
4. **DecorMatters** - Mobile apps often use Impact or ShareASale
5. **Modsy** - Premium service likely has referral program
6. **Coohom** - Enterprise tools usually have partner programs

### Common Affiliate Networks to Check:
- ShareASale
- Impact Radius
- CJ Affiliate (Commission Junction)
- PartnerStack
- Post Affiliate Pro

## Step 2: Fix the Code

Replace in `PlatformCard.jsx` line ~259:
```javascript
// OLD (broken):
href={platform.url}

// NEW (makes money):
href={platform.affiliateLink || platform.url}
onClick={() => {
  // Track the click
  if (window.gtag && platform.affiliateLink) {
    gtag('event', 'affiliate_click', {
      platform: platform.id,
      value: platform.metrics.pricePerRender
    });
  }
}}
```

## Step 3: Update Affiliate Links

Once approved, update the data with your real tracking codes:
```json
"affiliateLink": "https://paintit.ai/?ref=YOUR_ACTUAL_CODE"
```

## Step 4: Add Disclosure

LEGALLY REQUIRED - Add to footer:
```javascript
<p className="text-xs text-gray-500 mt-4">
  Disclosure: We may earn commissions from qualifying purchases 
  made through links on this site. This doesn't affect our rankings 
  or reviews.
</p>
```

## Step 5: Track Performance

### Add UTM parameters:
```javascript
const getAffiliateUrl = (platform) => {
  const baseUrl = platform.affiliateLink || platform.url;
  const utm = '?utm_source=aicompare&utm_medium=comparison&utm_campaign=platform';
  return baseUrl + utm;
}
```

### Expected Commission Rates:
- **SaaS Tools**: 20-40% first month or 10-20% recurring
- **One-time purchases**: 5-15%
- **Enterprise**: Often flat fee ($50-500 per lead)

## Step 6: Optimize for Conversions

### Quick Wins:
1. Add "Exclusive Discount" badges for platforms with deals
2. Create "Try Free" prominent CTAs
3. Add urgency: "Prices valid until [date]"
4. Show savings: "Save $20 with annual plan"

### Revenue Projections:
Assuming 1000 visitors/month:
- 10% click rate = 100 clicks
- 2% conversion = 2 sales
- $30 average commission = $60/month
- Scale to 10k visitors = $600/month

## Alternative Monetization:

### If Affiliate Programs Reject You:
1. **Direct Partnerships** - Email platforms directly
2. **Google AdSense** - $5-10 CPM for tech content
3. **Sponsored Reviews** - $500-2000 per platform
4. **Lead Generation** - Sell leads to platforms
5. **Premium Features** - $5/month for advanced filters
6. **API Access** - $99/month for developers

## Immediate Action Items:

1. [ ] Fix code to use affiliateLink field
2. [ ] Apply to Paintit.ai affiliate program (easiest)
3. [ ] Add affiliate disclosure to footer
4. [ ] Setup Google Analytics ecommerce tracking
5. [ ] Create conversion tracking spreadsheet

## Testing Your Setup:

```javascript
// Add to console to test:
document.querySelectorAll('a[href*="ref="]').forEach(link => {
  console.log('Affiliate link found:', link.href);
});
```

## Legal Requirements:
- FTC requires disclosure of affiliate relationships
- Must be "clear and conspicuous"
- Before the affiliate link, not just in footer
- Consider adding (partner link) next to buttons
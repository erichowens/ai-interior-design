// Platform descriptions and enriched data
// This file contains detailed information for each platform

export const platformDescriptions = {
  roomgpt: {
    description: "RoomGPT is an open-source AI interior design tool created by Hassan El Mghari, a former Vercel developer advocate. Built on Replicate's infrastructure and leveraging ControlNet ML models, it offers blazing-fast room transformations in seconds. The tool has gained massive popularity on Twitter and GitHub (11K+ stars) for its transparency, speed, and developer-friendly API. Popular among developers, content creators, and rapid prototypers who value open-source solutions.",
    highlights: [
      "Open-source with 11K+ GitHub stars",
      "Fastest generation speed in the market",
      "Developer-friendly API",
      "Built by ex-Vercel engineer"
    ],
    trustedBy: ["Individual developers", "Content creators", "Startups"],
    videoDemo: null
  },

  paintit: {
    description: "Paintit.ai revolutionizes the home design experience by seamlessly integrating AI-powered room redesigns with direct shopping capabilities. Founded in 2022, the platform partners with major furniture retailers like Wayfair, West Elm, and CB2 to provide instant shoppable links for every item in your AI-generated design. While generation is slower than competitors, the unique shopping integration makes it perfect for homeowners ready to purchase and real estate agents staging properties for sale.",
    highlights: [
      "Direct shopping integration with major retailers",
      "Partnership with Wayfair, West Elm, CB2",
      "15 diverse design styles",
      "Mobile-first experience"
    ],
    trustedBy: ["Homeowners", "Real estate agents", "Interior shoppers"],
    videoDemo: null
  },

  foyr: {
    description: "Foyr Neo is the enterprise-grade solution trusted by leading architecture firms and design agencies worldwide. Combining cutting-edge AI with professional 3D modeling capabilities, it offers the highest accuracy score (96%) in the industry. The platform includes full CAD export, VR walkthroughs, team collaboration, and comprehensive API access. ISO 27001 and SOC 2 certified, Foyr Neo is built for large-scale projects requiring precision, security, and professional workflows. Used by over 45,000 design professionals monthly.",
    highlights: [
      "Highest accuracy (96%) in the industry",
      "ISO 27001 and SOC 2 certified",
      "Full CAD export and 3D modeling",
      "Enterprise-grade collaboration tools"
    ],
    trustedBy: ["Design firms", "Architecture firms", "Enterprise teams", "Government contractors"],
    videoDemo: null
  },

  'interior-ai': {
    description: "Interior AI brings the power of Stable Diffusion XL to interior design with custom-trained LoRA models specifically optimized for architectural spaces. The platform offers exceptional quality at an affordable price point, making professional-grade AI design accessible to real estate professionals. With batch processing capabilities and upcoming API access, it's particularly popular among property managers and realtors who need to stage multiple properties quickly and affordably.",
    highlights: [
      "Built on Stable Diffusion XL with custom LoRA",
      "Excellent quality-to-price ratio",
      "Batch processing for multiple rooms",
      "API access coming soon"
    ],
    trustedBy: ["Real estate stagers", "Property managers", "Realtors"],
    videoDemo: null
  },

  homestyler: {
    description: "HomeStyler, owned by Autodesk, combines professional 3D design tools with AI-powered rendering to create a comprehensive design platform. With 350,000 monthly users, it's one of the most popular solutions globally. The platform offers unlimited free renders with watermark, making it accessible to students and hobbyists, while paid plans unlock professional features like CAD export and team collaboration. The mobile app with AR preview lets users visualize designs in their actual space.",
    highlights: [
      "Owned by Autodesk - industry leader",
      "350K monthly active users",
      "Unlimited free renders (with watermark)",
      "AR preview for real-world visualization"
    ],
    trustedBy: ["Professional designers", "Architecture students", "Serious DIYers", "Education institutions"],
    videoDemo: null
  },

  planner5d: {
    description: "Planner 5D is the most popular AI interior design app with over 85 million downloads and 420,000 monthly active users. Known for its incredibly fast generation speed (22 seconds) and dirt-cheap pricing ($0.17/render), it's perfect for students, first-time designers, and mobile users. The platform offers both 2D and 3D design modes, comprehensive API access, and works seamlessly across web, iOS, and Android. Despite having fewer AI styles than competitors, its speed and accessibility make it a favorite for quick layouts and space planning.",
    highlights: [
      "85 million total downloads",
      "Fastest and cheapest at $0.17/render",
      "Comprehensive API access",
      "Works on all platforms"
    ],
    trustedBy: ["Students", "First-time designers", "Mobile users", "Budget-conscious creators"],
    videoDemo: null
  }

  // Add more descriptions as needed...
}

// Additional metadata for platforms
export const platformMetadata = {
  roomgpt: {
    founded: "2023",
    founder: "Hassan El Mghari",
    headquarters: "San Francisco, CA",
    funding: "Open Source",
    employees: "1-5",
    github: "https://github.com/Nutlope/roomGPT",
    twitter: "https://twitter.com/nutlope"
  },

  foyr: {
    founded: "2017",
    founder: "Shailendra Mehta",
    headquarters: "Bangalore, India",
    funding: "Series A - $6M",
    employees: "50-100",
    certifications: ["ISO 27001", "SOC 2"]
  },

  'interior-ai': {
    founded: "2023",
    founder: "Levelsio community",
    headquarters: "Remote",
    funding: "Bootstrapped",
    employees: "5-10"
  }
}

// Export everything
export default {
  descriptions: platformDescriptions,
  metadata: platformMetadata
}

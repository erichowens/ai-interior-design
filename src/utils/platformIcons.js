// Platform capability icons with colors and labels
export const capabilityIcons = {
  apiAccess: {
    icon: '🔧',
    label: 'API Access',
    color: '#3b82f6',
    description: 'Programmatic access to platform features'
  },
  mobileApp: {
    icon: '📱',
    label: 'Mobile App',
    color: '#10b981',
    description: 'Native iOS and Android applications'
  },
  arPreview: {
    icon: '👁️',
    label: 'AR Preview',
    color: '#8b5cf6',
    description: 'Augmented reality visualization'
  },
  shoppingLinks: {
    icon: '🛒',
    label: 'Shopping Integration',
    color: '#f59e0b',
    description: 'Direct links to purchase furniture'
  },
  cadExport: {
    icon: '📐',
    label: 'CAD Export',
    color: '#ef4444',
    description: 'Export to AutoCAD and other formats'
  },
  '3dModeling': {
    icon: '🏗️',
    label: '3D Modeling',
    color: '#06b6d4',
    description: 'Full 3D room design and modeling'
  },
  batchProcessing: {
    icon: '⚡',
    label: 'Batch Processing',
    color: '#eab308',
    description: 'Process multiple images at once'
  },
  collaboration: {
    icon: '👥',
    label: 'Collaboration',
    color: '#ec4899',
    description: 'Team features and shared projects'
  }
}

// Get logo URL with fallback
export const getPlatformLogo = (platform) => {
  if (platform.logo && !platform.logo.includes('placeholder')) {
    return platform.logo
  }

  // Fallback to UI Avatars with platform's brand colors
  const colors = {
    roomgpt: { bg: '6366f1', fg: 'ffffff' },
    paintit: { bg: 'ec4899', fg: 'ffffff' },
    foyr: { bg: '0ea5e9', fg: 'ffffff' },
    'interior-ai': { bg: '8b5cf6', fg: 'ffffff' },
    homestyler: { bg: 'f59e0b', fg: 'ffffff' },
    planner5d: { bg: '10b981', fg: 'ffffff' },
    decormatters: { bg: 'ec4899', fg: 'ffffff' },
    'reimagine-home': { bg: '3b82f6', fg: 'ffffff' },
    'collov-ai': { bg: 'a855f7', fg: 'ffffff' },
    designai: { bg: '06b6d4', fg: 'ffffff' },
    'spacely-ai': { bg: '8b5cf6', fg: 'ffffff' },
    vizcom: { bg: 'f97316', fg: 'ffffff' },
    coohom: { bg: '14b8a6', fg: 'ffffff' },
    modsy: { bg: 'f43f5e', fg: 'ffffff' },
    'archi-ai': { bg: '6366f1', fg: 'ffffff' },
    'room-ai': { bg: '3b82f6', fg: 'ffffff' },
    'ai-room-planner': { bg: '10b981', fg: 'ffffff' }
  }

  const color = colors[platform.id] || { bg: '6366f1', fg: 'ffffff' }
  const name = encodeURIComponent(platform.name)

  return `https://ui-avatars.com/api/?name=${name}&size=128&background=${color.bg}&color=${color.fg}&bold=true&font-size=0.4`
}

// Get sample images with fallback to curated Unsplash collection
export const getPlatformSamples = (platform) => {
  if (platform.samples && platform.samples.length > 0 && !platform.samples[0].includes('placeholder')) {
    return platform.samples
  }

  // Curated interior design images from Unsplash
  const unsplashImages = [
    'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&h=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&h=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?w=800&h=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&h=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&h=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=800&auto=format&fit=crop&q=80'
  ]

  // Hash platform ID to consistently get same images
  const hash = platform.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const startIndex = hash % (unsplashImages.length - 3)

  return unsplashImages.slice(startIndex, startIndex + 3)
}

// Get capability badge color
export const getCapabilityColor = (capability, value) => {
  if (typeof value === 'boolean') {
    return value ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-400'
  }

  if (capability === 'apiAccess') {
    if (value === 'enterprise') return 'bg-purple-100 text-purple-800'
    if (value === 'limited' || value === 'coming') return 'bg-yellow-100 text-yellow-800'
    return value ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-400'
  }

  return 'bg-blue-100 text-blue-800'
}

// Format capability value for display
export const formatCapabilityValue = (capability, value) => {
  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No'
  }

  if (capability === 'apiAccess') {
    if (value === true) return 'Available'
    if (value === false) return 'Not Available'
    if (value === 'enterprise') return 'Enterprise Only'
    if (value === 'limited') return 'Limited Access'
    if (value === 'coming') return 'Coming Soon'
    return value
  }

  if (capability === 'batchProcessing') {
    if (value === true) return 'Available'
    if (value === 'limited') return 'Limited'
    return 'Not Available'
  }

  return value
}

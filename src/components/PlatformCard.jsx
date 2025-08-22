import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useStore from '../store'

const PlatformCard = ({ platform, showMatchScore = false }) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const { addToComparison, removeFromComparison, comparisonPlatforms } = useStore()
  
  const isInComparison = comparisonPlatforms.includes(platform.id)
  
  const handleComparisonToggle = () => {
    if (isInComparison) {
      removeFromComparison(platform.id)
    } else {
      addToComparison(platform.id)
    }
  }

  const getSpeedColor = (percentile) => {
    if (percentile >= 90) return 'text-success'
    if (percentile >= 70) return 'text-warning'
    return 'text-error'
  }

  const getPricingDisplay = () => {
    const freeTier = platform.pricing.free
    const paidTiers = Object.values(platform.pricing).filter(tier => tier.price && tier.price !== 'custom')
    
    if (freeTier.renders > 0) {
      if (paidTiers.length > 0) {
        const minPrice = Math.min(...paidTiers.map(t => t.price))
        return `Free • From $${minPrice}/mo`
      }
      return 'Free'
    }
    
    if (paidTiers.length > 0) {
      const minPrice = Math.min(...paidTiers.map(t => t.price))
      return `From $${minPrice}/mo`
    }
    
    return 'Contact for pricing'
  }

  const renderCapabilityIcons = () => {
    const icons = []
    if (platform.capabilities.apiAccess) icons.push({ icon: '🔧', label: 'API Access' })
    if (platform.capabilities.mobileApp) icons.push({ icon: '📱', label: 'Mobile App' })
    if (platform.capabilities.arPreview) icons.push({ icon: '👁️', label: 'AR Preview' })
    if (platform.capabilities.shoppingLinks) icons.push({ icon: '🛒', label: 'Shopping' })
    if (platform.capabilities.cadExport) icons.push({ icon: '📐', label: 'CAD Export' })
    if (platform.capabilities['3dModeling']) icons.push({ icon: '🏗️', label: '3D Modeling' })
    
    return icons.slice(0, 4) // Show max 4 icons
  }

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
      whileHover={{ y: -4 }}
      layout
    >
      {/* Header with Match Score */}
      {showMatchScore && platform.matchPercentage && (
        <div className="bg-gradient-to-r from-primary to-accent text-white px-4 py-2">
          <div className="flex justify-between items-center">
            <span className="font-semibold">{platform.matchPercentage}% Match</span>
            <span className="text-sm opacity-90">Perfect for you!</span>
          </div>
        </div>
      )}

      <div className="p-6">
        {/* Platform Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
              {!imageError ? (
                <img
                  src={platform.logo}
                  alt={`${platform.name} logo`}
                  className={`w-full h-full object-contain transition-opacity ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                />
              ) : (
                <span className="text-xl font-bold text-gray-400">
                  {platform.name.charAt(0)}
                </span>
              )}
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold text-text">{platform.name}</h3>
              <p className="text-gray-600 text-sm">{platform.tagline}</p>
            </div>
          </div>
          
          <button
            onClick={handleComparisonToggle}
            disabled={!isInComparison && comparisonPlatforms.length >= 3}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              isInComparison 
                ? 'bg-primary text-white' 
                : comparisonPlatforms.length >= 3
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-100 text-gray-700 hover:bg-primary hover:text-white'
            }`}
          >
            {isInComparison ? 'Added' : 'Compare'}
          </button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-sm text-gray-600">Generation Speed</div>
            <div className={`text-lg font-semibold ${getSpeedColor(platform.metrics.speed.percentile)}`}>
              {platform.metrics.speed.value}s
            </div>
            <div className="text-xs text-gray-500">
              {platform.metrics.speed.percentile}th percentile
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-sm text-gray-600">Monthly Users</div>
            <div className="text-lg font-semibold text-text">
              {(platform.metrics.monthlyUsers / 1000).toFixed(0)}K
            </div>
            <div className="text-xs text-gray-500">
              Active users
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="mb-4">
          <div className="text-sm text-gray-600 mb-1">Pricing</div>
          <div className="text-lg font-semibold text-text">{getPricingDisplay()}</div>
          <div className="text-xs text-gray-500">
            ${platform.metrics.pricePerRender.toFixed(2)} per render
          </div>
        </div>

        {/* Capabilities */}
        <div className="mb-4">
          <div className="text-sm text-gray-600 mb-2">Key Features</div>
          <div className="flex flex-wrap gap-2">
            {renderCapabilityIcons().map((cap, index) => (
              <div
                key={index}
                className="flex items-center space-x-1 bg-gray-100 rounded-full px-2 py-1 text-xs"
                title={cap.label}
              >
                <span>{cap.icon}</span>
                <span className="text-gray-700">{cap.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quality Score */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Accuracy Score</span>
            <span className="font-medium">{platform.metrics.accuracy}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-primary to-accent h-2 rounded-full"
              style={{ width: `${platform.metrics.accuracy}%` }}
            />
          </div>
        </div>


        {/* Sample Images */}
        <div className="mb-4">
          <div className="text-sm text-gray-600 mb-2">Sample Outputs</div>
          <div className="grid grid-cols-3 gap-2">
            {platform.samples.slice(0, 3).map((sample, index) => (
              <div key={index} className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative">
                <img
                  src={sample}
                  alt={`${platform.name} sample ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    // Fallback to a placeholder if the actual image doesn't load
                    e.target.src = `https://via.placeholder.com/400x400/e5e7eb/6b7280?text=${platform.name.replace(/\s+/g, '+')}+Sample+${index + 1}`
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Best For */}
        <div className="mb-4">
          <div className="text-sm text-gray-600 mb-1">Best For</div>
          <div className="flex flex-wrap gap-1">
            {platform.bestFor.map((use, index) => (
              <span
                key={index}
                className="bg-accent/20 text-accent-dark rounded-full px-2 py-1 text-xs"
              >
                {use}
              </span>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="flex space-x-2">
          <a
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-primary text-white text-center py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            Visit {platform.name}
          </a>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
          >
            {showDetails ? 'Show Less' : 'Learn More'}
          </button>
        </div>

        {/* Expanded Details */}
        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 pt-4 border-t border-gray-200 overflow-hidden"
            >

              {/* Technology Stack */}
              {platform.technology && (
                <div className="mb-4">
                  <h4 className="font-semibold text-sm text-gray-700 mb-2">Technology</h4>
                  <div className="text-xs text-gray-600 space-y-1">
                    {platform.technology.model && <div>• Model: {platform.technology.model}</div>}
                    {platform.technology.framework && <div>• Framework: {platform.technology.framework}</div>}
                    {platform.technology.openSource !== undefined && (
                      <div>• Open Source: {platform.technology.openSource ? 'Yes' : 'No'}</div>
                    )}
                    {platform.technology.githubStars && (
                      <div>• GitHub Stars: {platform.technology.githubStars.toLocaleString()}</div>
                    )}
                  </div>
                </div>
              )}

              {/* Detailed Pricing */}
              <div className="mb-4">
                <h4 className="font-semibold text-sm text-gray-700 mb-2">Pricing Tiers</h4>
                <div className="space-y-2">
                  {Object.entries(platform.pricing).map(([tier, details]) => (
                    <div key={tier} className="text-xs bg-gray-50 rounded p-2">
                      <div className="font-medium capitalize">{tier}</div>
                      {details.price && <div>Price: ${details.price === 'custom' ? 'Custom' : details.price}/mo</div>}
                      {details.renders && <div>Renders: {details.renders}</div>}
                      {details.resolution && <div>Resolution: {details.resolution}</div>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Limitations */}
              <div className="mb-4">
                <h4 className="font-semibold text-sm text-gray-700 mb-2">Limitations</h4>
                <ul className="text-xs text-gray-600 space-y-1">
                  {platform.limitations.map((limitation, index) => (
                    <li key={index}>• {limitation}</li>
                  ))}
                </ul>
              </div>

              {/* All Capabilities */}
              <div>
                <h4 className="font-semibold text-sm text-gray-700 mb-2">Full Feature List</h4>
                <div className="grid grid-cols-2 gap-1 text-xs">
                  <div className={platform.capabilities.apiAccess ? 'text-success' : 'text-gray-400'}>
                    {platform.capabilities.apiAccess ? '✓' : '✗'} API Access
                  </div>
                  <div className={platform.capabilities.batchProcessing ? 'text-success' : 'text-gray-400'}>
                    {platform.capabilities.batchProcessing ? '✓' : '✗'} Batch Processing
                  </div>
                  <div className={platform.capabilities.mobileApp ? 'text-success' : 'text-gray-400'}>
                    {platform.capabilities.mobileApp ? '✓' : '✗'} Mobile App
                  </div>
                  <div className={platform.capabilities.arPreview ? 'text-success' : 'text-gray-400'}>
                    {platform.capabilities.arPreview ? '✓' : '✗'} AR Preview
                  </div>
                  <div className={platform.capabilities.shoppingLinks ? 'text-success' : 'text-gray-400'}>
                    {platform.capabilities.shoppingLinks ? '✓' : '✗'} Shopping Links
                  </div>
                  <div className={platform.capabilities.cadExport ? 'text-success' : 'text-gray-400'}>
                    {platform.capabilities.cadExport ? '✓' : '✗'} CAD Export
                  </div>
                  <div className={platform.capabilities.collaboration ? 'text-success' : 'text-gray-400'}>
                    {platform.capabilities.collaboration ? '✓' : '✗'} Collaboration
                  </div>
                  <div className={platform.capabilities['3dModeling'] ? 'text-success' : 'text-gray-400'}>
                    {platform.capabilities['3dModeling'] ? '✓' : '✗'} 3D Modeling
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default PlatformCard
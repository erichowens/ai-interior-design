import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useStore from '../store'
import { getPlatformLogo, getPlatformSamples, capabilityIcons } from '../utils/platformIcons'

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

    // Build icons array based on capabilities
    Object.keys(capabilityIcons).forEach(key => {
      const value = platform.capabilities[key]
      if (value) {
        icons.push({
          ...capabilityIcons[key],
          value
        })
      }
    })

    return icons.slice(0, 6) // Show max 6 icons
  }

  return (
    <motion.div
      className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl border border-gray-100/50 transition-all duration-300 group"
      whileHover={{ y: -8, scale: 1.02 }}
      layout
    >
      {/* Header with Match Score - Enhanced */}
      {showMatchScore && platform.matchPercentage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gradient-to-r from-primary via-accent to-primary bg-size-200 animate-gradient text-white px-6 py-3 shadow-lg"
        >
          <div className="flex justify-between items-center">
            <span className="font-bold text-lg">{platform.matchPercentage}% Match</span>
            <span className="text-sm font-medium flex items-center gap-1">
              Perfect for you! ✨
            </span>
          </div>
        </motion.div>
      )}

      <div className="p-6">
        {/* Platform Header - Enhanced */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden shadow-md border border-gray-200/50 group-hover:scale-110 transition-transform duration-300">
              <img
                src={getPlatformLogo(platform)}
                alt={`${platform.name} logo`}
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold text-text group-hover:text-primary transition-colors">{platform.name}</h3>
              <p className="text-gray-600 text-sm mt-0.5">{platform.tagline}</p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleComparisonToggle}
            disabled={!isInComparison && comparisonPlatforms.length >= 3}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 shadow-md ${
              isInComparison
                ? 'bg-gradient-to-r from-primary to-accent text-white shadow-primary/30'
                : comparisonPlatforms.length >= 3
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none'
                : 'bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white'
            }`}
          >
            {isInComparison ? '✓ Added' : '+ Compare'}
          </motion.button>
        </div>

        {/* Key Metrics - Enhanced */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 shadow-sm border border-gray-100/50 hover:shadow-md transition-all duration-300"
          >
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Generation Speed</div>
            <div className={`text-2xl font-bold mt-1 ${getSpeedColor(platform.metrics.speed.percentile)}`}>
              {platform.metrics.speed.value}s
            </div>
            <div className="text-xs text-gray-400 mt-1">
              {platform.metrics.speed.percentile}th percentile
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 shadow-sm border border-gray-100/50 hover:shadow-md transition-all duration-300"
          >
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">Monthly Users</div>
            <div className="text-2xl font-bold text-text mt-1">
              {(platform.metrics.monthlyUsers / 1000).toFixed(0)}K
            </div>
            <div className="text-xs text-gray-400 mt-1">
              Active users
            </div>
          </motion.div>
        </div>

        {/* Pricing */}
        <div className="mb-4">
          <div className="text-sm text-gray-600 mb-1">Pricing</div>
          <div className="text-lg font-semibold text-text">{getPricingDisplay()}</div>
          <div className="text-xs text-gray-500">
            ${platform.metrics.pricePerRender.toFixed(2)} per render
          </div>
        </div>

        {/* Capabilities - Enhanced */}
        <div className="mb-4">
          <div className="text-sm font-medium text-gray-600 mb-3">Key Features</div>
          <div className="flex flex-wrap gap-2">
            {renderCapabilityIcons().map((cap, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="group/cap relative flex items-center space-x-1.5 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl px-3 py-1.5 text-xs border border-gray-200/50 hover:shadow-md transition-all duration-300"
                title={cap.description}
              >
                <span className="text-base">{cap.icon}</span>
                <span className="text-gray-700 font-medium">{cap.label}</span>

                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover/cap:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                  {cap.description}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45 -mt-1"></div>
                </div>
              </motion.div>
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


        {/* Sample Images - Enhanced */}
        <div className="mb-4">
          <div className="text-sm font-medium text-gray-600 mb-3">Sample Outputs</div>
          <div className="grid grid-cols-3 gap-2">
            {getPlatformSamples(platform).map((sample, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden relative cursor-pointer shadow-sm hover:shadow-md transition-all duration-300"
              >
                <img
                  src={sample}
                  alt={`${platform.name} sample ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-300"></div>
              </motion.div>
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

        {/* Call to Action - Enhanced */}
        <div className="flex space-x-3">
          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-gradient-to-r from-primary to-accent text-white text-center py-3 rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 font-semibold"
          >
            Visit {platform.name} →
          </motion.a>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowDetails(!showDetails)}
            className="px-5 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-xl hover:border-primary hover:text-primary transition-all duration-300 text-sm font-medium"
          >
            {showDetails ? '↑ Less' : '↓ More'}
          </motion.button>
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
import React, { useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import useStore from '../store'

const Compare = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { platforms, comparisonPlatforms, clearComparison } = useStore()
  
  // Get platforms from URL or from store
  const urlPlatforms = searchParams.get('platforms')?.split(',') || []
  const platformsToCompare = urlPlatforms.length > 0 ? urlPlatforms : comparisonPlatforms
  
  const selectedPlatforms = platforms.filter(p => platformsToCompare.includes(p.id))

  useEffect(() => {
    if (selectedPlatforms.length === 0) {
      navigate('/')
    }
  }, [selectedPlatforms, navigate])

  const getComparisonData = () => {
    const features = [
      { key: 'speed', label: 'Generation Speed', format: (p) => `${p.metrics.speed.value}s` },
      { key: 'price', label: 'Cost per Render', format: (p) => `$${p.metrics.pricePerRender.toFixed(2)}` },
      { key: 'accuracy', label: 'Accuracy Score', format: (p) => `${p.metrics.accuracy}%` },
      { key: 'users', label: 'Monthly Users', format: (p) => `${(p.metrics.monthlyUsers / 1000).toFixed(0)}K` },
      { key: 'styles', label: 'Style Options', format: (p) => p.capabilities.styles },
      { key: 'resolution', label: 'Max Resolution', format: (p) => p.capabilities.resolution },
      { key: 'api', label: 'API Access', format: (p) => p.capabilities.apiAccess ? '✅' : '❌' },
      { key: 'mobile', label: 'Mobile App', format: (p) => p.capabilities.mobileApp ? '✅' : '❌' },
      { key: 'ar', label: 'AR Preview', format: (p) => p.capabilities.arPreview ? '✅' : '❌' },
      { key: 'shopping', label: 'Shopping Links', format: (p) => p.capabilities.shoppingLinks ? '✅' : '❌' },
      { key: 'cad', label: 'CAD Export', format: (p) => p.capabilities.cadExport ? '✅' : '❌' },
      { key: '3d', label: '3D Modeling', format: (p) => p.capabilities['3dModeling'] ? '✅' : '❌' },
    ]
    
    return features
  }

  const getBestValue = (feature, platforms) => {
    if (feature.key === 'speed' || feature.key === 'price') {
      // Lower is better
      return Math.min(...platforms.map(p => 
        feature.key === 'speed' ? p.metrics.speed.value : p.metrics.pricePerRender
      ))
    } else if (feature.key === 'accuracy' || feature.key === 'users' || feature.key === 'styles') {
      // Higher is better
      return Math.max(...platforms.map(p => 
        feature.key === 'accuracy' ? p.metrics.accuracy :
        feature.key === 'users' ? p.metrics.monthlyUsers :
        p.capabilities.styles
      ))
    }
    return null
  }

  const comparisonFeatures = getComparisonData()

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-serif font-bold text-text mb-4">
            Platform Comparison
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Compare {selectedPlatforms.length} platforms side by side
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Add More Platforms
            </button>
            <button
              onClick={clearComparison}
              className="px-6 py-2 bg-error/10 text-error rounded-lg hover:bg-error/20 transition-colors font-medium"
            >
              Clear Comparison
            </button>
          </div>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="sticky left-0 bg-gray-50 px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Feature
                  </th>
                  {selectedPlatforms.map(platform => (
                    <th key={platform.id} className="px-6 py-4 text-center">
                      <div className="flex flex-col items-center">
                        <h3 className="text-lg font-serif font-bold text-text">{platform.name}</h3>
                        <p className="text-xs text-gray-600 mt-1">{platform.tagline}</p>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {/* Pricing Row - Special */}
                <tr className="bg-accent/5">
                  <td className="sticky left-0 bg-accent/5 px-6 py-4 text-sm font-medium text-gray-900">
                    Pricing
                  </td>
                  {selectedPlatforms.map(platform => {
                    const freeTier = platform.pricing.free
                    const paidTiers = Object.values(platform.pricing).filter(tier => tier.price && tier.price !== 'custom')
                    const minPrice = paidTiers.length > 0 ? Math.min(...paidTiers.map(t => t.price)) : 0
                    
                    return (
                      <td key={platform.id} className="px-6 py-4 text-center">
                        <div>
                          {freeTier.renders > 0 && (
                            <div className="text-success font-semibold">Free tier available</div>
                          )}
                          {minPrice > 0 && (
                            <div className="text-sm text-gray-700">From ${minPrice}/mo</div>
                          )}
                          {!freeTier.renders && !minPrice && (
                            <div className="text-sm text-gray-500">Contact for pricing</div>
                          )}
                        </div>
                      </td>
                    )
                  })}
                </tr>

                {/* Feature Rows */}
                {comparisonFeatures.map((feature, index) => {
                  const bestValue = getBestValue(feature, selectedPlatforms)
                  
                  return (
                    <tr key={feature.key} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className={`sticky left-0 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} px-6 py-4 text-sm font-medium text-gray-900`}>
                        {feature.label}
                      </td>
                      {selectedPlatforms.map(platform => {
                        const value = feature.format(platform)
                        const rawValue = feature.key === 'speed' ? platform.metrics.speed.value :
                                        feature.key === 'price' ? platform.metrics.pricePerRender :
                                        feature.key === 'accuracy' ? platform.metrics.accuracy :
                                        feature.key === 'users' ? platform.metrics.monthlyUsers :
                                        feature.key === 'styles' ? platform.capabilities.styles : null
                        
                        const isBest = bestValue !== null && (
                          (feature.key === 'speed' || feature.key === 'price') ? rawValue === bestValue :
                          rawValue === bestValue
                        )
                        
                        return (
                          <td key={platform.id} className="px-6 py-4 text-center">
                            <span className={`${isBest ? 'text-success font-semibold' : 'text-gray-700'}`}>
                              {value}
                              {isBest && ' 👑'}
                            </span>
                          </td>
                        )
                      })}
                    </tr>
                  )
                })}

                {/* Best For Row */}
                <tr className="bg-primary/5">
                  <td className="sticky left-0 bg-primary/5 px-6 py-4 text-sm font-medium text-gray-900">
                    Best For
                  </td>
                  {selectedPlatforms.map(platform => (
                    <td key={platform.id} className="px-6 py-4 text-center">
                      <div className="flex flex-wrap justify-center gap-1">
                        {platform.bestFor.map((use, idx) => (
                          <span key={idx} className="bg-primary/20 text-xs rounded-full px-2 py-1">
                            {use}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Limitations Row */}
                <tr>
                  <td className="sticky left-0 bg-white px-6 py-4 text-sm font-medium text-gray-900">
                    Limitations
                  </td>
                  {selectedPlatforms.map(platform => (
                    <td key={platform.id} className="px-6 py-4 text-center">
                      <div className="text-xs text-gray-600">
                        {platform.limitations.map((limit, idx) => (
                          <div key={idx} className="mb-1">• {limit}</div>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* CTA Row */}
                <tr className="bg-gray-50">
                  <td className="sticky left-0 bg-gray-50 px-6 py-4"></td>
                  {selectedPlatforms.map(platform => (
                    <td key={platform.id} className="px-6 py-4 text-center">
                      <a
                        href={platform.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
                      >
                        Try {platform.name}
                      </a>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Compare
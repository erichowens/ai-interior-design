import React, { useState } from 'react'
import { motion } from 'framer-motion'
import PlatformCard from '../components/PlatformCard'
import useStore from '../store'

const Home = () => {
  const { platforms } = useStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterBy, setFilterBy] = useState('all')
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'table'
  const [sortBy, setSortBy] = useState('popular') // 'popular', 'price', 'speed', 'accuracy'

  const filteredPlatforms = platforms.filter(platform => {
    const matchesSearch = platform.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          platform.tagline.toLowerCase().includes(searchTerm.toLowerCase())
    
    if (filterBy === 'all') return matchesSearch
    if (filterBy === 'free') return matchesSearch && platform.pricing.free.renders > 0
    if (filterBy === 'api') return matchesSearch && platform.capabilities.apiAccess
    if (filterBy === 'mobile') return matchesSearch && platform.capabilities.mobileApp
    if (filterBy === 'professional') return matchesSearch && (platform.capabilities.cadExport || platform.capabilities['3dModeling'])
    if (filterBy === 'fast') return matchesSearch && platform.metrics.speed.value <= 30
    if (filterBy === 'accurate') return matchesSearch && platform.metrics.accuracy >= 90
    if (filterBy === 'budget') return matchesSearch && platform.metrics.pricePerRender < 0.30
    
    return matchesSearch
  }).sort((a, b) => {
    switch(sortBy) {
      case 'price':
        return a.metrics.pricePerRender - b.metrics.pricePerRender
      case 'speed':
        return a.metrics.speed.value - b.metrics.speed.value
      case 'accuracy':
        return b.metrics.accuracy - a.metrics.accuracy
      case 'popular':
      default:
        return b.metrics.monthlyUsers - a.metrics.monthlyUsers
    }
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-accent/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-5xl font-serif font-bold text-text mb-4">
              Find Your Perfect AI Interior Design Tool
            </h1>
            <p className="text-xl text-gray-600 mb-4">
              Compare 18 platforms by speed, price, accuracy & features to make the right choice
            </p>
            
            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="bg-white/90 backdrop-blur rounded-lg px-4 py-2 shadow-sm">
                <span className="text-sm text-gray-600">Fastest:</span>
                <span className="ml-2 font-semibold">12 seconds (Vizcom)</span>
              </div>
              <div className="bg-white/90 backdrop-blur rounded-lg px-4 py-2 shadow-sm">
                <span className="text-sm text-gray-600">Cheapest:</span>
                <span className="ml-2 font-semibold">$0.17/render</span>
              </div>
              <div className="bg-white/90 backdrop-blur rounded-lg px-4 py-2 shadow-sm">
                <span className="text-sm text-gray-600">Most Accurate:</span>
                <span className="ml-2 font-semibold">96% (Foyr Neo)</span>
              </div>
              <div className="bg-white/90 backdrop-blur rounded-lg px-4 py-2 shadow-sm">
                <span className="text-sm text-gray-600">Most Popular:</span>
                <span className="ml-2 font-semibold">420K users</span>
              </div>
            </div>
            
            {/* Disclaimer */}
            <div className="inline-flex items-center space-x-2 bg-yellow-100 rounded-full px-6 py-3 shadow-md">
              <span className="text-2xl">ℹ️</span>
              <span className="text-gray-700">
                Personal research tool - Data collected August 2024 - Verify current pricing
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search platforms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <svg className="absolute left-3 top-3 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Filters, Sort and View */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Filter:</span>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: 'all', label: 'All' },
                    { value: 'free', label: 'Free' },
                    { value: 'fast', label: 'Fast' },
                    { value: 'accurate', label: 'Accurate' },
                    { value: 'budget', label: 'Budget' },
                    { value: 'professional', label: 'Pro' }
                  ].map(filter => (
                    <button
                      key={filter.value}
                      onClick={() => setFilterBy(filter.value)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        filterBy === filter.value
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Sort */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                >
                  <option value="popular">Popular</option>
                  <option value="price">Price</option>
                  <option value="speed">Speed</option>
                  <option value="accuracy">Accuracy</option>
                </select>
              </div>
              
              {/* View Toggle */}
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-primary text-white' : 'bg-gray-100'}`}
                  title="Grid"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM13 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2h-2z"/>
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-2 rounded ${viewMode === 'table' ? 'bg-primary text-white' : 'bg-gray-100'}`}
                  title="Table"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clipRule="evenodd"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Results count */}
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredPlatforms.length} of {platforms.length} platforms
          </div>
        </div>
      </section>

      {/* Use Case Recommendations */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-serif font-bold text-center mb-6">Quick Recommendations by Use Case</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold mb-2">🏠 For Homeowners</h3>
              <p className="text-sm text-gray-600 mb-2">Want to redesign with shopping links?</p>
              <p className="text-sm font-medium text-primary">Try: Paintit.ai or DecorMatters</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold mb-2">👨‍💻 For Developers</h3>
              <p className="text-sm text-gray-600 mb-2">Need API access and fast generation?</p>
              <p className="text-sm font-medium text-primary">Try: RoomGPT or Planner 5D</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold mb-2">💼 For Professionals</h3>
              <p className="text-sm text-gray-600 mb-2">Need CAD export and collaboration?</p>
              <p className="text-sm font-medium text-primary">Try: Foyr Neo or HomeStyler</p>
            </div>
          </div>
        </div>
      </section>

      {/* Platforms Display */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {viewMode === 'grid' ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, staggerChildren: 0.1 }}
            >
              {filteredPlatforms.map((platform, index) => (
                <motion.div
                  key={platform.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <PlatformCard platform={platform} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            /* Table View */
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Platform</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Speed</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">$/Render</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Accuracy</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Users</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Features</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredPlatforms.map((platform) => (
                    <tr key={platform.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{platform.name}</div>
                          <div className="text-xs text-gray-500">{platform.tagline}</div>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className={`text-sm font-medium ${
                          platform.metrics.speed.value <= 30 ? 'text-green-600' : 
                          platform.metrics.speed.value <= 60 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {platform.metrics.speed.value}s
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium">${platform.metrics.pricePerRender.toFixed(2)}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-sm font-medium mr-2">{platform.metrics.accuracy}%</span>
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-primary to-accent h-2 rounded-full"
                              style={{ width: `${platform.metrics.accuracy}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm">{(platform.metrics.monthlyUsers / 1000).toFixed(0)}K</div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex flex-wrap gap-1">
                          {platform.capabilities.apiAccess && <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">API</span>}
                          {platform.capabilities.mobileApp && <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Mobile</span>}
                          {platform.capabilities['3dModeling'] && <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">3D</span>}
                          {platform.capabilities.shoppingLinks && <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Shop</span>}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <a
                          href={platform.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 font-medium text-sm"
                        >
                          Visit →
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {filteredPlatforms.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No platforms found matching your criteria.</p>
              <button
                onClick={() => { setSearchTerm(''); setFilterBy('all') }}
                className="mt-4 text-primary hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Home
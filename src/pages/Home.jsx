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
      {/* Hero Section - Enhanced with Magic UI styling */}
      <section className="relative bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 py-20 overflow-hidden">
        {/* Animated background elements */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute top-10 left-10 w-72 h-72 rounded-full bg-primary/10 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.2, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
          className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-accent/10 blur-3xl"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-primary/20 shadow-lg mb-6"
            >
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-sm font-medium text-gray-700">18 AI Design Tools Compared</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-text mb-6 leading-tight"
            >
              Find Your Perfect <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">AI Interior Design</span> Tool
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto"
            >
              Compare 18 platforms by speed, price, accuracy & features to make the right choice
            </motion.p>

            {/* Quick Stats - Enhanced with glassmorphism */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex flex-wrap justify-center gap-4 mb-8"
            >
              <div className="group bg-white/70 backdrop-blur-md rounded-2xl px-6 py-4 shadow-lg border border-white/40 hover:shadow-xl hover:scale-105 transition-all duration-300">
                <span className="text-sm text-gray-500 block">Fastest</span>
                <span className="text-lg font-bold text-gray-900 block">12 seconds</span>
                <span className="text-xs text-primary">(Vizcom)</span>
              </div>
              <div className="group bg-white/70 backdrop-blur-md rounded-2xl px-6 py-4 shadow-lg border border-white/40 hover:shadow-xl hover:scale-105 transition-all duration-300">
                <span className="text-sm text-gray-500 block">Cheapest</span>
                <span className="text-lg font-bold text-gray-900 block">$0.17</span>
                <span className="text-xs text-primary">/render</span>
              </div>
              <div className="group bg-white/70 backdrop-blur-md rounded-2xl px-6 py-4 shadow-lg border border-white/40 hover:shadow-xl hover:scale-105 transition-all duration-300">
                <span className="text-sm text-gray-500 block">Most Accurate</span>
                <span className="text-lg font-bold text-gray-900 block">96%</span>
                <span className="text-xs text-primary">(Foyr Neo)</span>
              </div>
              <div className="group bg-white/70 backdrop-blur-md rounded-2xl px-6 py-4 shadow-lg border border-white/40 hover:shadow-xl hover:scale-105 transition-all duration-300">
                <span className="text-sm text-gray-500 block">Most Popular</span>
                <span className="text-lg font-bold text-gray-900 block">420K</span>
                <span className="text-xs text-primary">users</span>
              </div>
            </motion.div>

            {/* Disclaimer - Enhanced */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-full px-6 py-3 shadow-lg border border-yellow-200/50 backdrop-blur-sm"
            >
              <span className="text-2xl">ℹ️</span>
              <span className="text-sm font-medium text-gray-700">
                Personal research tool · Data collected August 2024 · Verify current pricing
              </span>
            </motion.div>
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

      {/* Use Case Recommendations - Enhanced */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-serif font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent"
          >
            Quick Recommendations by Use Case
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl hover:scale-105 hover:border-primary/20 transition-all duration-300"
            >
              <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">🏠</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-primary transition-colors">For Homeowners</h3>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">Want to redesign with shopping links?</p>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-primary">Try:</span>
                <span className="text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">Paintit.ai or DecorMatters</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl hover:scale-105 hover:border-accent/20 transition-all duration-300"
            >
              <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">👨‍💻</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-accent transition-colors">For Developers</h3>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">Need API access and fast generation?</p>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-accent">Try:</span>
                <span className="text-sm font-medium bg-accent/10 text-accent px-3 py-1 rounded-full">RoomGPT or Planner 5D</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl hover:scale-105 hover:border-primary/20 transition-all duration-300"
            >
              <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">💼</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-primary transition-colors">For Professionals</h3>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">Need CAD export and collaboration?</p>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-primary">Try:</span>
                <span className="text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">Foyr Neo or HomeStyler</span>
              </div>
            </motion.div>
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
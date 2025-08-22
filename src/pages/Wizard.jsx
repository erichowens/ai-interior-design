import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import QuickMatchWizard from '../components/QuickMatchWizard'
import PlatformCard from '../components/PlatformCard'
import useStore from '../store'

const Wizard = () => {
  const navigate = useNavigate()
  const { clearWizardAnswers } = useStore()
  const [matches, setMatches] = useState(null)
  const [showWizard, setShowWizard] = useState(true)

  const handleWizardComplete = (matchedPlatforms) => {
    setMatches(matchedPlatforms)
    setShowWizard(false)
  }

  const resetWizard = () => {
    clearWizardAnswers()
    setMatches(null)
    setShowWizard(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-serif font-bold text-text mb-4">
            Quick Match Wizard
          </h1>
          <p className="text-lg text-gray-600">
            Answer 3 quick questions to find your perfect AI design tool
          </p>
        </motion.div>

        {/* Wizard or Results */}
        {showWizard ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <QuickMatchWizard onComplete={handleWizardComplete} />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Results Header */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <div className="text-center">
                <h2 className="text-3xl font-serif font-bold text-text mb-4">
                  🎉 Your Perfect Matches!
                </h2>
                <p className="text-gray-600 mb-6">
                  Based on your preferences, we've found the best AI interior design tools for you.
                </p>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={resetWizard}
                    className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                  >
                    Retake Quiz
                  </button>
                  <button
                    onClick={() => {
                      const platformIds = matches.map(p => p.id).join(',')
                      navigate(`/compare?platforms=${platformIds}`)
                    }}
                    className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
                  >
                    Compare These Platforms
                  </button>
                </div>
              </div>
            </div>

            {/* Matched Platforms */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {matches && matches.map((platform, index) => (
                <motion.div
                  key={platform.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15 }}
                >
                  <div className="relative">
                    {/* Rank Badge */}
                    <div className="absolute -top-4 -left-4 z-10">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white shadow-lg ${
                        index === 0 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' :
                        index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-500' :
                        'bg-gradient-to-br from-orange-400 to-orange-600'
                      }`}>
                        #{index + 1}
                      </div>
                    </div>
                    <PlatformCard platform={platform} showMatchScore={true} />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Why These Matches */}
            <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-serif font-bold text-text mb-4">
                Why These Matches?
              </h3>
              <div className="space-y-4">
                {matches && matches.map((platform, index) => (
                  <div key={platform.id} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-bold">{index + 1}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-text">{platform.name}</h4>
                      <p className="text-gray-600 text-sm">
                        {platform.matchPercentage}% match based on your preferences. 
                        Strong in: {platform.bestFor.slice(0, 2).join(', ')}.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Wizard
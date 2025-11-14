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
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 py-16 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute top-20 left-20 w-80 h-80 rounded-full bg-primary/10 blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.2, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
        className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-accent/10 blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-primary/20 shadow-lg mb-6"
          >
            <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse"></span>
            <span className="text-sm font-medium text-gray-700">Personalized Recommendations</span>
          </motion.div>

          <h1 className="text-5xl md:text-6xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-6 leading-tight">
            Quick Match Wizard
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            Answer 3 quick questions to find your perfect AI design tool ✨
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
            {/* Results Header - Enhanced */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-10 mb-10 border border-gray-100/50"
            >
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.6, delay: 0.2 }}
                  className="text-6xl mb-4"
                >
                  🎉
                </motion.div>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-4">
                  Your Perfect Matches!
                </h2>
                <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                  Based on your preferences, we've found the best AI interior design tools for you.
                </p>
                <div className="flex justify-center space-x-4 flex-wrap gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={resetWizard}
                    className="px-8 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl hover:border-primary hover:text-primary transition-all duration-300 font-semibold shadow-md"
                  >
                    ↻ Retake Quiz
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      const platformIds = matches.map(p => p.id).join(',')
                      navigate(`/compare?platforms=${platformIds}`)
                    }}
                    className="px-8 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 font-semibold"
                  >
                    Compare These Platforms →
                  </motion.button>
                </div>
              </div>
            </motion.div>

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

            {/* Why These Matches - Enhanced */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-12 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-100/50"
            >
              <h3 className="text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-6">
                Why These Matches?
              </h3>
              <div className="space-y-5">
                {matches && matches.map((platform, index) => (
                  <motion.div
                    key={platform.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                    className="flex items-start space-x-4 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-white hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-md">
                      <span className="text-white font-bold text-lg">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg text-text mb-1">{platform.name}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        <span className="font-semibold text-primary">{platform.matchPercentage}% match</span> based on your preferences.
                        Strong in: <span className="font-medium">{platform.bestFor.slice(0, 2).join(', ')}</span>.
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Wizard
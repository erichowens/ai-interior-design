import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Wizard from './pages/Wizard'
import Compare from './pages/Compare'

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wizard" element={<Wizard />} />
        <Route path="/compare" element={<Compare />} />
      </Routes>

      {/* Footer - Enhanced */}
      <footer className="relative bg-gradient-to-b from-white to-gray-50 border-t border-gray-200/50 mt-20 overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-50"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* About */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">🏠</span>
                </div>
                <h3 className="text-xl font-serif font-bold text-text">AI Design Compare</h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                The definitive comparison tool for AI interior design platforms.
                Make data-driven decisions in under 2 minutes.
              </p>
            </div>

            {/* Quick Tips */}
            <div>
              <h3 className="text-lg font-serif font-bold text-text mb-4 flex items-center gap-2">
                💡 Quick Tips
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-primary">✓</span>
                  <span>Start with free trials</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-primary">✓</span>
                  <span>Check resolution before paying</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-primary">✓</span>
                  <span>Most offer 3-10 free renders</span>
                </div>
              </div>
            </div>

            {/* Last Updated */}
            <div>
              <h3 className="text-lg font-serif font-bold text-text mb-4 flex items-center gap-2">
                📅 Data Freshness
              </h3>
              <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 shadow-sm">
                <p className="text-sm text-gray-600 mb-2">
                  Last updated: <span className="font-bold text-primary">August 21, 2025</span>
                </p>
                <p className="text-xs text-gray-500">
                  We review and update platform data monthly to ensure accuracy.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200/50 mt-10 pt-8 text-center">
            <p className="text-sm text-gray-600">
              © 2025 AI Design Compare · Built with <span className="text-red-500">♥</span> using React, Vite, and Tailwind CSS
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
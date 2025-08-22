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
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* About */}
            <div>
              <h3 className="text-lg font-serif font-bold text-text mb-3">About This Tool</h3>
              <p className="text-sm text-gray-600">
                The definitive comparison tool for AI interior design platforms. 
                Make data-driven decisions in under 2 minutes.
              </p>
            </div>
            
            {/* Quick Tips */}
            <div>
              <h3 className="text-lg font-serif font-bold text-text mb-3">Quick Tips</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div>• Start with free trials</div>
                <div>• Check resolution before paying</div>
                <div>• Most offer 3-10 free renders</div>
              </div>
            </div>
            
            {/* Last Updated */}
            <div>
              <h3 className="text-lg font-serif font-bold text-text mb-3">Data Freshness</h3>
              <p className="text-sm text-gray-600">
                Last updated: <strong>August 21, 2025</strong>
              </p>
              <p className="text-xs text-gray-500 mt-2">
                We review and update platform data monthly to ensure accuracy.
              </p>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-600">
            © 2025 AI Design Compare. Built with React, Vite, and Tailwind CSS.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
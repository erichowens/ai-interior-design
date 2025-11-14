import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import useStore from '../store'

const Header = () => {
  const location = useLocation()
  const { comparisonPlatforms, setActiveView } = useStore()

  const navigation = [
    { name: 'Home', path: '/', current: location.pathname === '/' },
    { name: 'Quick Match', path: '/wizard', current: location.pathname === '/wizard' },
    { name: 'Compare', path: '/compare', current: location.pathname === '/compare' },
  ]

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200/50 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Enhanced */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
              <span className="text-white font-bold text-xl">🏠</span>
            </div>
            <div>
              <h1 className="text-xl font-serif font-bold text-text group-hover:text-primary transition-colors">
                AI Design Compare
              </h1>
              <p className="text-xs text-gray-500 -mt-0.5">Find your perfect AI interior design tool</p>
            </div>
          </Link>

          {/* Navigation - Enhanced */}
          <div className="hidden md:flex items-center space-x-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  item.current
                    ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/30'
                    : 'text-gray-700 hover:text-primary hover:bg-primary/5 hover:scale-105'
                }`}
              >
                {item.name}
                {item.name === 'Compare' && comparisonPlatforms.length > 0 && (
                  <span className="inline-flex items-center justify-center bg-white text-primary text-xs font-bold rounded-full w-5 h-5 animate-pulse">
                    {comparisonPlatforms.length}
                  </span>
                )}
              </Link>
            ))}
          </div>

          {/* Mobile menu button - Enhanced */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-700 hover:text-primary p-2 rounded-lg hover:bg-primary/5 transition-all duration-300"
              aria-label="Menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
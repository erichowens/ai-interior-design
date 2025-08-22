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
    <header className="bg-white shadow-sm border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">🏠</span>
            </div>
            <div>
              <h1 className="text-xl font-serif font-bold text-text">AI Design Compare</h1>
              <p className="text-xs text-gray-600 -mt-1">Find your perfect AI interior design tool</p>
            </div>
          </Link>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  item.current
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:text-primary hover:bg-primary/5'
                }`}
              >
                {item.name}
                {item.name === 'Compare' && comparisonPlatforms.length > 0 && (
                  <span className="ml-2 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {comparisonPlatforms.length}
                  </span>
                )}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-700 hover:text-primary p-2"
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
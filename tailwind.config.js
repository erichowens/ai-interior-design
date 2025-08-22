/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#C65D00',      // Terracotta
        secondary: '#8B9A7B',    // Sage
        accent: '#D4A574',       // Warm Gold
        background: '#FAF8F5',   // Warm White
        text: '#2C3E50',         // Charcoal
        success: '#10B981',      // Emerald
        warning: '#F59E0B',      // Amber
        error: '#EF4444',        // Red
      },
      fontFamily: {
        serif: ['Fraunces', 'serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
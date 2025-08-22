#!/bin/bash

# GitHub Pages Deployment Script

# 1. First, update vite.config.js to add base path
echo "Updating vite.config.js for GitHub Pages..."
cat > vite.config.js << 'EOF'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/ai-interior-design/', // Replace with your repo name
})
EOF

# 2. Build the project
echo "Building project..."
npm run build

# 3. Create gh-pages branch and deploy
echo "Deploying to GitHub Pages..."
git add dist -f
git commit -m "Deploy to GitHub Pages"
git subtree push --prefix dist origin gh-pages

echo "✅ Deployed! Your site will be available at:"
echo "https://[YOUR-GITHUB-USERNAME].github.io/ai-interior-design/"
echo ""
echo "Note: It may take 5-10 minutes for GitHub to publish the site."
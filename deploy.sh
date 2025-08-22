#!/bin/bash

echo "🚀 Deploying AI Interior Design Comparison Tool"
echo "============================================="
echo ""

# Build the project
echo "📦 Building project..."
npm run build

echo ""
echo "✅ Build complete!"
echo ""
echo "Choose your deployment method:"
echo ""
echo "1. Vercel (Recommended):"
echo "   Run: npx vercel --prod"
echo "   Then follow the prompts"
echo ""
echo "2. Netlify:"
echo "   - Go to https://app.netlify.com/drop"
echo "   - Drag the 'dist' folder to deploy"
echo ""
echo "3. GitHub Pages:"
echo "   Run: ./deploy-github.sh"
echo ""
echo "4. Manual deployment:"
echo "   - The production build is in the 'dist' folder"
echo "   - Upload this folder to any static hosting service"
echo ""
echo "============================================="
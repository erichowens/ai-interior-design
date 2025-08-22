# AI Interior Design Platform Comparison Tool

A comprehensive comparison tool for AI interior design platforms. Compare 18 different tools by speed, pricing, accuracy, and features to help you choose the right one for your needs.

## Live Demo

🚀 **Ready to Deploy** - Follow the deployment instructions below to publish your site

## Features

- **18 AI Platforms Compared**: Comprehensive data on major AI interior design tools
- **Key Metrics**: Speed, pricing per render, accuracy scores, and monthly users
- **Multiple Views**: Toggle between grid and table views for easier comparison
- **Smart Filtering**: Filter by free tier, speed, accuracy, budget, and professional features
- **Sorting Options**: Sort by popularity, price, speed, or accuracy
- **Detailed Information**: Expandable cards with full feature lists and limitations
- **Use Case Recommendations**: Quick suggestions for homeowners, developers, and professionals

## Platforms Included

- RoomGPT
- Decoratly
- Interior AI
- Reimagine Home
- Foyr Neo
- Vizcom
- DecorMatters
- Planner 5D
- Modsy
- HomeStyler
- Coohom
- REimagine Home
- Paintit.ai
- DesignSense AI
- Space Designer 3D
- Archi AI
- DreamHouse AI
- Virtual Staging AI

## Tech Stack

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Routing**: React Router
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/erichowens/ai-interior-design.git
cd ai-interior-design
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Deployment

The project is **ready to deploy**! The production build has been created in the `dist` folder.

### Quick Deploy Script

Run the deployment helper:
```bash
./deploy.sh
```

### Deploy to Vercel (Recommended - Fastest)

1. Run the deployment command:
```bash
npx vercel --prod
```

2. Follow the prompts:
   - Login with GitHub/Google/Email
   - Select your project settings
   - Your site will be live in seconds!

3. Get your URL (typically: `https://your-project.vercel.app`)

### Deploy to GitHub Pages

1. Update `vite.config.js` with your repository name:
```javascript
export default defineConfig({
  base: '/your-repo-name/',
  // ... rest of config
})
```

2. Build and deploy:
```bash
npm run build
git add dist -f
git commit -m "Deploy to GitHub Pages"
git subtree push --prefix dist origin gh-pages
```

### Deploy to Netlify

1. Build the project:
```bash
npm run build
```

2. Drag and drop the `dist` folder to [Netlify Drop](https://app.netlify.com/drop)

## Project Structure

```
ai-interior-design/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── PlatformCard.jsx
│   │   └── QuickMatchWizard.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Compare.jsx
│   │   └── Wizard.jsx
│   ├── App.jsx
│   ├── main.jsx
│   ├── store.js
│   └── index.css
├── data/
│   └── platforms.json
├── public/
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## Data Structure

Each platform in `data/platforms.json` includes:

- Basic info (name, tagline, URL)
- Metrics (speed, price per render, accuracy, monthly users)
- Pricing tiers (free, paid options)
- Capabilities (API access, mobile app, AR preview, etc.)
- Technology stack details
- Best use cases
- Limitations
- Sample output images

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Disclaimer

This is a personal research tool with data collected in August 2024. Please verify current pricing and features directly with each platform before making decisions.

## License

MIT License - feel free to use this project for your own purposes.

## Author

Created by Erich Owens

---

**Note**: This tool provides a comparison based on publicly available information. Always verify current features and pricing with the official platforms.
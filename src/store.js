import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import platformsData from '../data/platforms.json'

const useStore = create(
  persist(
    (set, get) => ({
      // User preferences
      wizardAnswers: {},
      comparisonPlatforms: [], // max 3
      
      // UI state
      activeView: 'grid', // grid | comparison | wizard
      
      // Data
      platforms: platformsData.platforms,
      lastUpdated: platformsData.lastUpdated,
      
      // Actions
      setWizardAnswer: (step, answer) => 
        set((state) => ({
          wizardAnswers: { ...state.wizardAnswers, [step]: answer }
        })),
      
      clearWizardAnswers: () => set({ wizardAnswers: {} }),
      
      addToComparison: (platformId) =>
        set((state) => {
          if (state.comparisonPlatforms.length >= 3) return state
          if (state.comparisonPlatforms.includes(platformId)) return state
          return { comparisonPlatforms: [...state.comparisonPlatforms, platformId] }
        }),
      
      removeFromComparison: (platformId) =>
        set((state) => ({
          comparisonPlatforms: state.comparisonPlatforms.filter(id => id !== platformId)
        })),
      
      clearComparison: () => set({ comparisonPlatforms: [] }),
      
      setActiveView: (view) => set({ activeView: view }),
      
      // Computed getters
      getMatchedPlatforms: () => {
        const { wizardAnswers, platforms } = get()
        
        if (Object.keys(wizardAnswers).length < 3) return []
        
        // Calculate match scores based on wizard answers
        const scoredPlatforms = platforms.map(platform => {
          let score = 0
          let maxScore = 0
          
          // Goal-based scoring
          maxScore += 30
          if (wizardAnswers.goal === 'quick' && platform.metrics.speed.value <= 30) score += 30
          else if (wizardAnswers.goal === 'selling' && platform.capabilities.shoppingLinks) score += 30
          else if (wizardAnswers.goal === 'professional' && platform.capabilities.cadExport) score += 30
          else if (wizardAnswers.goal === 'renovation' && platform.capabilities['3dModeling']) score += 30
          
          // Budget-based scoring
          maxScore += 25
          const freeTier = platform.pricing.free
          const paidTiers = Object.values(platform.pricing).filter(tier => tier.price)
          const minPrice = paidTiers.length > 0 ? Math.min(...paidTiers.map(t => t.price === 'custom' ? 999 : t.price)) : 0
          
          if (wizardAnswers.budget === 'free' && freeTier.renders > 0) score += 25
          else if (wizardAnswers.budget === 'under30' && minPrice <= 30) score += 25
          else if (wizardAnswers.budget === '30-100' && minPrice <= 100) score += 25
          else if (wizardAnswers.budget === 'unlimited') score += 25
          
          // Priority-based scoring
          maxScore += 45
          if (wizardAnswers.priority === 'speed' && platform.metrics.speed.percentile >= 80) score += 45
          else if (wizardAnswers.priority === 'quality' && platform.metrics.accuracy >= 90) score += 45
          else if (wizardAnswers.priority === 'shopping' && platform.capabilities.shoppingLinks) score += 45
          else if (wizardAnswers.priority === 'professional' && (platform.capabilities.cadExport || platform.capabilities['3dModeling'])) score += 45
          
          const percentage = Math.round((score / maxScore) * 100)
          
          return {
            ...platform,
            matchScore: score,
            matchPercentage: percentage
          }
        })
        
        return scoredPlatforms
          .sort((a, b) => b.matchScore - a.matchScore)
          .slice(0, 3)
      }
    }),
    {
      name: 'ai-design-store',
      partialize: (state) => ({
        wizardAnswers: state.wizardAnswers,
        comparisonPlatforms: state.comparisonPlatforms,
        activeView: state.activeView
      })
    }
  )
)

export default useStore
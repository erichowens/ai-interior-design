import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useStore from '../store'

const QuickMatchWizard = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const { wizardAnswers, setWizardAnswer, getMatchedPlatforms } = useStore()

  const questions = [
    {
      id: 'goal',
      title: "What's your primary goal?",
      subtitle: "This helps us understand your main use case",
      options: [
        { value: 'quick', label: 'Quick redesign for fun', icon: '🎨' },
        { value: 'selling', label: 'Selling/renting property', icon: '🏠' },
        { value: 'professional', label: 'Professional design work', icon: '💼' },
        { value: 'renovation', label: 'Complete home renovation', icon: '🔨' }
      ]
    },
    {
      id: 'budget',
      title: "What's your budget?",
      subtitle: "Monthly spending for the AI design tool",
      options: [
        { value: 'free', label: 'Free only', icon: '💸' },
        { value: 'under30', label: 'Under $30/month', icon: '💰' },
        { value: '30-100', label: '$30-100/month', icon: '💳' },
        { value: 'unlimited', label: "Price isn't a concern", icon: '💎' }
      ]
    },
    {
      id: 'priority',
      title: "What matters most?",
      subtitle: "Your top priority in an AI design tool",
      options: [
        { value: 'speed', label: 'Speed (under 30 seconds)', icon: '⚡' },
        { value: 'quality', label: 'Quality (photorealistic)', icon: '🎯' },
        { value: 'shopping', label: 'Shopping integration', icon: '🛒' },
        { value: 'professional', label: 'Professional features (CAD, 3D)', icon: '📐' }
      ]
    }
  ]

  const handleAnswer = (value) => {
    const questionId = questions[currentStep].id
    setWizardAnswer(questionId, value)
    
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Wizard complete, get matches
      setTimeout(() => {
        const matches = getMatchedPlatforms()
        onComplete?.(matches)
      }, 500)
    }
  }

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const currentQuestion = questions[currentStep]
  const progress = ((currentStep + 1) / questions.length) * 100

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Step {currentStep + 1} of {questions.length}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-primary h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {/* Question */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-serif font-bold text-text mb-3">
              {currentQuestion.title}
            </h2>
            <p className="text-gray-600 text-lg">
              {currentQuestion.subtitle}
            </p>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {currentQuestion.options.map((option) => (
              <motion.button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                className={`p-6 rounded-lg border-2 transition-all duration-200 text-left group hover:border-primary hover:shadow-md ${
                  wizardAnswers[currentQuestion.id] === option.value
                    ? 'border-primary bg-primary/5 shadow-md'
                    : 'border-gray-200 hover:border-primary/50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center space-x-4">
                  <span className="text-3xl">{option.icon}</span>
                  <div>
                    <h3 className="font-semibold text-text group-hover:text-primary">
                      {option.label}
                    </h3>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <motion.button
              onClick={goBack}
              disabled={currentStep === 0}
              className={`px-6 py-2 rounded-lg transition-colors ${
                currentStep === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              whileHover={currentStep > 0 ? { scale: 1.05 } : {}}
              whileTap={currentStep > 0 ? { scale: 0.95 } : {}}
            >
              Back
            </motion.button>

            {currentStep === questions.length - 1 && wizardAnswers[currentQuestion.id] && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-right"
              >
                <div className="text-sm text-gray-600 mb-1">
                  Click any option to see your matches!
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default QuickMatchWizard
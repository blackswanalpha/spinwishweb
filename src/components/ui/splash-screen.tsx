'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PlayIcon } from '@heroicons/react/24/solid'

export function SplashScreen() {
  const [progress, setProgress] = useState(0)
  const [showLogo, setShowLogo] = useState(false)

  useEffect(() => {
    // Show logo after a brief delay
    const logoTimer = setTimeout(() => {
      setShowLogo(true)
    }, 300)

    // Simulate loading progress
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer)
          return 100
        }
        return prev + 2
      })
    }, 40)

    return () => {
      clearTimeout(logoTimer)
      clearInterval(progressTimer)
    }
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-dark-primary via-gray-900 to-dark-secondary">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center space-y-8">
        {/* Logo Animation */}
        <AnimatePresence>
          {showLogo && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 200, 
                damping: 20,
                duration: 0.8 
              }}
              className="flex flex-col items-center space-y-4"
            >
              {/* Logo Icon */}
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
                className="relative"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-r from-primary-500 to-secondary-500 shadow-2xl">
                  <PlayIcon className="h-10 w-10 text-white" />
                </div>
                
                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-500 to-secondary-500 blur-xl opacity-50 animate-pulse" />
              </motion.div>

              {/* Brand Name */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-center"
              >
                <h1 className="text-4xl font-bold gradient-text mb-2">Spinwish</h1>
                <p className="text-gray-400 text-lg">DJ Performance Platform</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="w-64 space-y-3"
        >
          {/* Progress Bar */}
          <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
            
            {/* Shimmer Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
          </div>

          {/* Loading Text */}
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">Loading...</span>
            <span className="text-primary-400 font-medium">{progress}%</span>
          </div>
        </motion.div>

        {/* Loading Messages */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="text-center space-y-2"
        >
          <LoadingMessage progress={progress} />
        </motion.div>
      </div>

      {/* Floating Music Notes */}
      <FloatingNotes />
    </div>
  )
}

function LoadingMessage({ progress }: { progress: number }) {
  const messages = [
    { threshold: 0, text: "Initializing Spinwish..." },
    { threshold: 20, text: "Loading your DJ equipment..." },
    { threshold: 40, text: "Connecting to venues..." },
    { threshold: 60, text: "Setting up your DJ profile..." },
    { threshold: 80, text: "Preparing your dashboard..." },
    { threshold: 95, text: "Welcome to Spinwish DJ!" }
  ]

  const currentMessage = messages
    .slice()
    .reverse()
    .find(msg => progress >= msg.threshold)?.text || messages[0].text

  return (
    <motion.p
      key={currentMessage}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="text-gray-300 text-sm"
    >
      {currentMessage}
    </motion.p>
  )
}

function FloatingNotes() {
  const notes = ['♪', '♫', '♬', '♩', '♭', '♯']
  const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 })

  useEffect(() => {
    // Only access window on client side
    if (typeof window !== 'undefined') {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })

      const handleResize = () => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight })
      }

      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none">
      {notes.map((note, index) => (
        <motion.div
          key={index}
          className="absolute text-primary-500/30 text-2xl font-bold"
          initial={{
            x: Math.random() * windowSize.width,
            y: windowSize.height + 50,
            opacity: 0,
            rotate: 0
          }}
          animate={{
            y: -50,
            opacity: [0, 1, 1, 0],
            rotate: 360,
            x: Math.random() * windowSize.width
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: index * 2,
            ease: "linear"
          }}
        >
          {note}
        </motion.div>
      ))}
    </div>
  )
}

// Add shimmer animation to global CSS
const shimmerKeyframes = `
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
  .animate-shimmer {
    animation: shimmer 2s infinite;
  }
`

// Inject styles
if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = shimmerKeyframes
  document.head.appendChild(style)
}

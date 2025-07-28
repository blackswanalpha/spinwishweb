'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  MusicalNoteIcon, 
  StarIcon, 
  CheckIcon,
  ArrowRightIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline'

interface DJOnboardingProps {
  userId: string
  onComplete: () => void
}

export function DJOnboarding({ userId, onComplete }: DJOnboardingProps) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  
  const [djData, setDjData] = useState({
    stageName: '',
    bio: '',
    genres: [] as string[],
    experience: 1,
    equipment: [] as string[],
    socialMedia: {
      instagram: '',
      soundcloud: '',
      spotify: '',
    },
    minimumTip: 5.00,
    specialties: [] as string[],
  })

  const totalSteps = 4

  const availableGenres = [
    'Electronic', 'House', 'Techno', 'Hip Hop', 'R&B', 'Pop', 'Rock',
    'Latin', 'Reggaeton', 'Salsa', 'Jazz', 'Blues', 'Country', 'Indie',
    'Alternative', 'Trance', 'Dubstep', 'Drum & Bass', 'Ambient', 'Funk'
  ]

  const availableEquipment = [
    'Pioneer CDJ-3000', 'Pioneer CDJ-2000NXS2', 'Pioneer DDJ-SX3', 'Pioneer DDJ-FLX6',
    'Technics SL-1200MK7', 'Native Instruments Traktor S4', 'Denon DJ Prime 4',
    'Pioneer DJM-900NXS2', 'Pioneer DJM-S11', 'Allen & Heath Xone:96',
    'KRK Rokit 8', 'JBL EON615', 'Yamaha HS8', 'Mackie Thump15A',
    'Sennheiser HD 25', 'Pioneer HDJ-X10', 'Audio-Technica ATH-M50x'
  ]

  const availableSpecialties = [
    'Crowd Reading', 'Seamless Mixing', 'Live Remixing', 'Turntablism', 'Scratching',
    'Beat Matching', 'Harmonic Mixing', 'Live Looping', 'Vocal MC', 'Multi-Genre',
    'Wedding DJ', 'Club DJ', 'Radio DJ', 'Mobile DJ', 'Producer'
  ]

  const toggleSelection = (item: string, field: 'genres' | 'equipment' | 'specialties') => {
    setDjData(prev => ({
      ...prev,
      [field]: prev[field].includes(item)
        ? prev[field].filter(i => i !== item)
        : [...prev[field], item]
    }))
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    } else {
      handleComplete()
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = async () => {
    setIsLoading(true)
    try {
      // In a real app, this would save to the database
      console.log('DJ Profile Data:', djData)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      onComplete()
      router.push('/dashboard')
    } catch (error) {
      console.error('Error completing onboarding:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return djData.stageName.trim().length > 0 && djData.bio.trim().length > 10
      case 2:
        return djData.genres.length > 0
      case 3:
        return djData.equipment.length > 0
      case 4:
        return djData.specialties.length > 0
      default:
        return false
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dark-primary via-gray-900 to-dark-secondary p-4">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Step {currentStep} of {totalSteps}</span>
            <span className="text-sm text-gray-400">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        <Card className="bg-dark-secondary/50 backdrop-blur-sm border-gray-700">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-white">
              {currentStep === 1 && "Tell us about yourself"}
              {currentStep === 2 && "What genres do you play?"}
              {currentStep === 3 && "What equipment do you use?"}
              {currentStep === 4 && "What are your specialties?"}
            </CardTitle>
            <CardDescription className="text-gray-400">
              {currentStep === 1 && "Let's create your DJ profile"}
              {currentStep === 2 && "Select all genres you're comfortable with"}
              {currentStep === 3 && "Tell us about your DJ setup"}
              {currentStep === 4 && "What makes you unique as a DJ?"}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Step 1: Basic Info */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    DJ Stage Name *
                  </label>
                  <Input
                    value={djData.stageName}
                    onChange={(e) => setDjData({ ...djData, stageName: e.target.value })}
                    placeholder="e.g., DJ MikeBeats, Luna Vibes"
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Bio / Description *
                  </label>
                  <textarea
                    value={djData.bio}
                    onChange={(e) => setDjData({ ...djData, bio: e.target.value })}
                    placeholder="Tell people about your DJ style, experience, and what makes you unique..."
                    className="w-full px-3 py-2 text-white bg-dark-secondary/50 border border-gray-600 rounded-lg focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 min-h-[100px] resize-none"
                    rows={4}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {djData.bio.length}/500 characters (minimum 10)
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Years of Experience
                  </label>
                  <select
                    value={djData.experience}
                    onChange={(e) => setDjData({ ...djData, experience: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 text-white bg-dark-secondary/50 border border-gray-600 rounded-lg focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                  >
                    {Array.from({ length: 20 }, (_, i) => i + 1).map(year => (
                      <option key={year} value={year}>
                        {year} {year === 1 ? 'year' : 'years'}
                      </option>
                    ))}
                    <option value={20}>20+ years</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Minimum Tip Amount ($)
                  </label>
                  <Input
                    type="number"
                    min="0"
                    step="0.50"
                    value={djData.minimumTip}
                    onChange={(e) => setDjData({ ...djData, minimumTip: parseFloat(e.target.value) || 0 })}
                    placeholder="5.00"
                    className="w-full"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Genres */}
            {currentStep === 2 && (
              <div>
                <p className="text-gray-400 mb-4">Select all genres you're comfortable playing:</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {availableGenres.map(genre => (
                    <button
                      key={genre}
                      onClick={() => toggleSelection(genre, 'genres')}
                      className={`p-3 rounded-lg border transition-all ${
                        djData.genres.includes(genre)
                          ? 'bg-primary-500 border-primary-500 text-white'
                          : 'bg-dark-primary border-gray-600 text-gray-300 hover:border-gray-500'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{genre}</span>
                        {djData.genres.includes(genre) && (
                          <CheckIcon className="h-4 w-4" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-4">
                  Selected: {djData.genres.length} genres
                </p>
              </div>
            )}

            {/* Step 3: Equipment */}
            {currentStep === 3 && (
              <div>
                <p className="text-gray-400 mb-4">What equipment do you use? (Select all that apply)</p>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {availableEquipment.map(item => (
                    <button
                      key={item}
                      onClick={() => toggleSelection(item, 'equipment')}
                      className={`w-full p-3 rounded-lg border transition-all text-left ${
                        djData.equipment.includes(item)
                          ? 'bg-primary-500 border-primary-500 text-white'
                          : 'bg-dark-primary border-gray-600 text-gray-300 hover:border-gray-500'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{item}</span>
                        {djData.equipment.includes(item) && (
                          <CheckIcon className="h-4 w-4" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-4">
                  Selected: {djData.equipment.length} items
                </p>
              </div>
            )}

            {/* Step 4: Specialties */}
            {currentStep === 4 && (
              <div>
                <p className="text-gray-400 mb-4">What are your DJ specialties and skills?</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-6">
                  {availableSpecialties.map(specialty => (
                    <button
                      key={specialty}
                      onClick={() => toggleSelection(specialty, 'specialties')}
                      className={`p-3 rounded-lg border transition-all ${
                        djData.specialties.includes(specialty)
                          ? 'bg-primary-500 border-primary-500 text-white'
                          : 'bg-dark-primary border-gray-600 text-gray-300 hover:border-gray-500'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{specialty}</span>
                        {djData.specialties.includes(specialty) && (
                          <CheckIcon className="h-4 w-4" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Social Media (Optional)
                    </label>
                    <div className="space-y-2">
                      <Input
                        value={djData.socialMedia.instagram}
                        onChange={(e) => setDjData({
                          ...djData,
                          socialMedia: { ...djData.socialMedia, instagram: e.target.value }
                        })}
                        placeholder="Instagram username (without @)"
                        className="w-full"
                      />
                      <Input
                        value={djData.socialMedia.soundcloud}
                        onChange={(e) => setDjData({
                          ...djData,
                          socialMedia: { ...djData.socialMedia, soundcloud: e.target.value }
                        })}
                        placeholder="SoundCloud username"
                        className="w-full"
                      />
                      <Input
                        value={djData.socialMedia.spotify}
                        onChange={(e) => setDjData({
                          ...djData,
                          socialMedia: { ...djData.socialMedia, spotify: e.target.value }
                        })}
                        placeholder="Spotify artist name"
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                <p className="text-xs text-gray-500 mt-4">
                  Selected: {djData.specialties.length} specialties
                </p>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
                className="flex items-center space-x-2"
              >
                <ArrowLeftIcon className="h-4 w-4" />
                <span>Back</span>
              </Button>

              <Button
                onClick={handleNext}
                disabled={!isStepValid() || isLoading}
                className="flex items-center space-x-2"
              >
                <span>
                  {currentStep === totalSteps ? (isLoading ? 'Creating Profile...' : 'Complete Setup') : 'Next'}
                </span>
                {currentStep < totalSteps && <ArrowRightIcon className="h-4 w-4" />}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

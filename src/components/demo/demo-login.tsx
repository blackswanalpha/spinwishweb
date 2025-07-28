'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  PlayIcon, 
  StarIcon, 
  CheckBadgeIcon,
  MusicalNoteIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline'
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid'

interface DemoLoginProps {
  onClose?: () => void
}

export function DemoLogin({ onClose }: DemoLoginProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleDemoLogin = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await signIn('credentials', {
        email: 'demo@spinwish.com',
        password: 'demo123!',
        redirect: false,
      })

      if (result?.ok) {
        // Use Next.js router instead of window.location for better SSR compatibility
        router.push('/')
      } else {
        const errorMessage = result?.error || 'Demo login failed'
        setError(errorMessage)
        console.error('Demo login failed:', errorMessage)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred'
      setError(errorMessage)
      console.error('Demo login error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i}>
        {i < Math.floor(rating) ? (
          <StarIconSolid className="h-4 w-4 text-yellow-400" />
        ) : (
          <StarIcon className="h-4 w-4 text-gray-400" />
        )}
      </span>
    ))
  }

  return (
    <Card className="bg-gradient-to-br from-primary-500/10 to-secondary-500/10 border-primary-500/30">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <PlayIcon className="h-6 w-6 text-primary-500" />
          <CardTitle className="text-xl font-bold text-white">Try Demo Account</CardTitle>
        </div>
        <CardDescription className="text-gray-300">
          Experience Spinwish as a professional DJ with our demo account
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Demo DJ Profile Preview */}
        <div className="bg-dark-primary/50 rounded-lg p-4">
          <div className="flex items-center space-x-3 mb-3">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=60&h=60&fit=crop&crop=face"
                alt="DJ Demo"
                className="h-12 w-12 rounded-full"
              />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-dark-primary animate-pulse"></div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-white">DJ Demo</h3>
                <CheckBadgeIcon className="h-5 w-5 text-blue-500" />
                <Badge className="bg-green-500 text-white text-xs">LIVE</Badge>
              </div>
              <div className="flex items-center space-x-1 mt-1">
                {renderStars(4.8)}
                <span className="text-sm text-gray-400">(4.8)</span>
              </div>
            </div>
          </div>
          
          <p className="text-sm text-gray-300 mb-3">
            Demo DJ showcasing Spinwish platform features. Specializes in electronic music and crowd interaction.
          </p>
          
          <div className="flex flex-wrap gap-1 mb-3">
            {['Electronic', 'House', 'Techno', 'Pop'].map(genre => (
              <Badge key={genre} variant="outline" className="text-xs">
                {genre}
              </Badge>
            ))}
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <MusicalNoteIcon className="h-4 w-4 text-primary-500" />
              <div>
                <p className="text-gray-400">Requests</p>
                <p className="text-white font-medium">150</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <CurrencyDollarIcon className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-gray-400">Earnings</p>
                <p className="text-white font-medium">$2,500</p>
              </div>
            </div>
          </div>
        </div>

        {/* Demo Features */}
        <div className="space-y-2">
          <h4 className="font-semibold text-white text-sm">What you can try:</h4>
          <ul className="text-sm text-gray-300 space-y-1">
            <li className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-primary-500 rounded-full"></div>
              <span>DJ Dashboard with live performance stats</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-primary-500 rounded-full"></div>
              <span>Song request queue management</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-primary-500 rounded-full"></div>
              <span>Earnings and tips tracking</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-primary-500 rounded-full"></div>
              <span>Performance analytics</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-primary-500 rounded-full"></div>
              <span>DJ profile management</span>
            </li>
          </ul>
        </div>

        {/* Login Credentials */}
        <div className="bg-dark-secondary/50 rounded-lg p-3">
          <h4 className="font-semibold text-white text-sm mb-2">Demo Credentials:</h4>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Email:</span>
              <span className="text-white font-mono">demo@spinwish.com</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Password:</span>
              <span className="text-white font-mono">demo123!</span>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button
            onClick={handleDemoLogin}
            disabled={isLoading}
            className="flex-1"
          >
            {isLoading ? 'Signing in...' : 'Try Demo Account'}
          </Button>
          {onClose && (
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
          )}
        </div>

        <p className="text-xs text-gray-500 text-center">
          No registration required • Full platform access • Reset anytime
        </p>
      </CardContent>
    </Card>
  )
}

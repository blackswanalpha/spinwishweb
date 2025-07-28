'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { DJOnboarding } from '@/components/dj/dj-onboarding'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

export default function OnboardingPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status === 'loading') return

    if (!session) {
      router.push('/auth/signin')
      return
    }

    // Check if user needs onboarding (in real app, check if DJ profile exists)
    const needsOnboarding = !localStorage.getItem(`dj-profile-${session.user?.id}`)
    
    if (!needsOnboarding) {
      router.push('/dashboard')
      return
    }

    setIsLoading(false)
  }, [session, status, router])

  const handleOnboardingComplete = () => {
    // Mark onboarding as complete
    if (session?.user?.id) {
      localStorage.setItem(`dj-profile-${session.user.id}`, 'completed')
    }
    router.push('/dashboard')
  }

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-primary">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <DJOnboarding 
      userId={session.user.id} 
      onComplete={handleOnboardingComplete}
    />
  )
}

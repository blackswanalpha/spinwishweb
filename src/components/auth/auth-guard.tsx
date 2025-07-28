'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, ReactNode } from 'react'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

interface AuthGuardProps {
  children: ReactNode
  requireAuth?: boolean
  requiredRole?: 'client' | 'dj' | 'admin'
  fallbackUrl?: string
}

export function AuthGuard({ 
  children, 
  requireAuth = true, 
  requiredRole,
  fallbackUrl = '/auth/signin' 
}: AuthGuardProps) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return // Still loading

    if (requireAuth && !session) {
      // Redirect to sign in if authentication is required but user is not authenticated
      router.push(`${fallbackUrl}?callbackUrl=${encodeURIComponent(window.location.pathname)}`)
      return
    }

    if (requiredRole && session?.user?.role !== requiredRole) {
      // Redirect if user doesn't have required role
      router.push('/unauthorized')
      return
    }

    if (!requireAuth && session) {
      // Redirect authenticated users away from auth pages
      router.push('/')
      return
    }
  }, [session, status, requireAuth, requiredRole, router, fallbackUrl])

  // Show loading spinner while checking authentication
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-primary">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  // Don't render children if auth requirements aren't met
  if (requireAuth && !session) {
    return null
  }

  if (requiredRole && session?.user?.role !== requiredRole) {
    return null
  }

  if (!requireAuth && session) {
    return null
  }

  return <>{children}</>
}

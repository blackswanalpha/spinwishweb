'use client'

import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { ReactNode, useEffect, useState } from 'react'
import { Sidebar } from '@/components/navigation/sidebar'
import { SplashScreen } from '@/components/ui/splash-screen'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { LoadingProvider } from '@/contexts/loading-context'

interface AppLayoutProps {
  children: ReactNode
}

// Routes that don't require authentication
const publicRoutes = [
  '/auth/signin',
  '/auth/signup',
  '/auth/error',
  '/auth/forgot-password',
  '/unauthorized'
]

// Routes that should not show the sidebar
const noSidebarRoutes = [
  '/auth/signin',
  '/auth/signup',
  '/auth/error',
  '/auth/forgot-password',
  '/unauthorized'
]

export function AppLayout({ children }: AppLayoutProps) {
  const { data: session, status } = useSession()
  const pathname = usePathname()
  const [showSplash, setShowSplash] = useState(true)
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  const isPublicRoute = publicRoutes.includes(pathname)
  const shouldShowSidebar = !noSidebarRoutes.includes(pathname) && session

  useEffect(() => {
    // Show splash screen only on initial app load
    if (isInitialLoad) {
      const timer = setTimeout(() => {
        setShowSplash(false)
        setIsInitialLoad(false)
      }, 2000) // Show splash for 2 seconds

      return () => clearTimeout(timer)
    }
  }, [isInitialLoad])

  // Show splash screen on initial load
  if (showSplash && isInitialLoad) {
    return <SplashScreen />
  }

  // Show loading spinner while session is being determined
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-primary">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  // Redirect to sign in if not authenticated and trying to access protected route
  if (!session && !isPublicRoute) {
    // This will be handled by the AuthGuard in individual pages
    // For now, just show the sign-in prompt
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-primary">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Authentication Required</h1>
          <p className="text-gray-400 mb-6">Please sign in to access this page.</p>
          <a
            href="/auth/signin"
            className="inline-flex items-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            Sign In
          </a>
        </div>
      </div>
    )
  }

  // Render layout based on route type
  if (shouldShowSidebar) {
    return (
      <LoadingProvider>
        <div className="flex h-screen bg-dark-primary">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            {children}
          </div>
        </div>
      </LoadingProvider>
    )
  }

  // For auth pages and other pages without sidebar
  return (
    <LoadingProvider>
      <div className="min-h-screen bg-dark-primary">
        {children}
      </div>
    </LoadingProvider>
  )
}

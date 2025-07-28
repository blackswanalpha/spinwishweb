'use client'

import { Suspense, ReactNode } from 'react'
import { LoadingSpinner, SkeletonCard } from '@/components/ui/loading-spinner'

interface LazyWrapperProps {
  children: ReactNode
  fallback?: ReactNode
  type?: 'spinner' | 'skeleton' | 'custom'
}

export function LazyWrapper({ 
  children, 
  fallback,
  type = 'spinner' 
}: LazyWrapperProps) {
  const getFallback = () => {
    if (fallback) return fallback

    switch (type) {
      case 'skeleton':
        return <PageSkeleton />
      case 'spinner':
        return <PageSpinner />
      default:
        return <PageSpinner />
    }
  }

  return (
    <Suspense fallback={getFallback()}>
      {children}
    </Suspense>
  )
}

function PageSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center space-y-4">
        <LoadingSpinner size="lg" />
        <p className="text-gray-400">Loading...</p>
      </div>
    </div>
  )
}

function PageSkeleton() {
  return (
    <div className="space-y-6 p-6">
      {/* Header Skeleton */}
      <div className="space-y-2">
        <div className="h-8 w-48 bg-gray-700 rounded animate-pulse" />
        <div className="h-4 w-96 bg-gray-700 rounded animate-pulse" />
      </div>

      {/* Content Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  )
}

// Higher-order component for lazy loading pages
export function withLazyLoading<T extends object>(
  Component: React.ComponentType<T>,
  fallbackType: 'spinner' | 'skeleton' = 'spinner'
) {
  return function LazyComponent(props: T) {
    return (
      <LazyWrapper type={fallbackType}>
        <Component {...props} />
      </LazyWrapper>
    )
  }
}

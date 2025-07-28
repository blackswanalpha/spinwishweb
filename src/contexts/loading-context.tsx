'use client'

import { createContext, useContext, useState, ReactNode, useCallback } from 'react'
import { LoadingOverlay } from '@/components/ui/loading-spinner'

interface LoadingState {
  [key: string]: boolean
}

interface LoadingContextType {
  loadingStates: LoadingState
  setLoading: (key: string, isLoading: boolean) => void
  isLoading: (key?: string) => boolean
  withLoading: <T extends any[], R>(
    key: string,
    fn: (...args: T) => Promise<R>
  ) => (...args: T) => Promise<R>
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

interface LoadingProviderProps {
  children: ReactNode
  showGlobalOverlay?: boolean
}

export function LoadingProvider({ children, showGlobalOverlay = false }: LoadingProviderProps) {
  const [loadingStates, setLoadingStates] = useState<LoadingState>({})

  const setLoading = useCallback((key: string, isLoading: boolean) => {
    setLoadingStates(prev => ({
      ...prev,
      [key]: isLoading
    }))
  }, [])

  const isLoading = useCallback((key?: string) => {
    if (key) {
      return loadingStates[key] || false
    }
    // If no key provided, check if any loading state is true
    return Object.values(loadingStates).some(Boolean)
  }, [loadingStates])

  const withLoading = useCallback(<T extends any[], R>(
    key: string,
    fn: (...args: T) => Promise<R>
  ) => {
    return async (...args: T): Promise<R> => {
      setLoading(key, true)
      try {
        const result = await fn(...args)
        return result
      } finally {
        setLoading(key, false)
      }
    }
  }, [setLoading])

  const value: LoadingContextType = {
    loadingStates,
    setLoading,
    isLoading,
    withLoading
  }

  if (showGlobalOverlay) {
    return (
      <LoadingContext.Provider value={value}>
        <LoadingOverlay isLoading={isLoading()}>
          {children}
        </LoadingOverlay>
      </LoadingContext.Provider>
    )
  }

  return (
    <LoadingContext.Provider value={value}>
      {children}
    </LoadingContext.Provider>
  )
}

export function useLoading() {
  const context = useContext(LoadingContext)
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider')
  }
  return context
}

// Hook for managing loading state of a specific operation
export function useLoadingState(key: string) {
  const context = useLoading()

  const withLoadingFn = async (fn: () => Promise<any>): Promise<any> => {
    context.setLoading(key, true)
    try {
      return await fn()
    } finally {
      context.setLoading(key, false)
    }
  }

  return {
    isLoading: context.isLoading(key),
    setLoading: (loading: boolean) => context.setLoading(key, loading),
    withLoading: withLoadingFn
  }
}

// Hook for API calls with automatic loading states
export function useApiCall() {
  const { withLoading } = useLoading()

  const apiCall = useCallback(async (
    key: string,
    url: string,
    options?: RequestInit
  ): Promise<any> => {
    const wrappedFetch = withLoading(key, async () => {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return response.json()
    })

    return wrappedFetch()
  }, [withLoading])

  return { apiCall }
}

// Component for showing loading state in specific areas
interface LoadingBoundaryProps {
  children: ReactNode
  loadingKey: string
  fallback?: ReactNode
  className?: string
}

export function LoadingBoundary({ 
  children, 
  loadingKey, 
  fallback,
  className 
}: LoadingBoundaryProps) {
  const { isLoading } = useLoading()
  const loading = isLoading(loadingKey)

  return (
    <LoadingOverlay isLoading={loading} className={className}>
      {loading && fallback ? fallback : children}
    </LoadingOverlay>
  )
}

// Higher-order component for adding loading states to components
export function withLoadingBoundary<T extends object>(
  Component: React.ComponentType<T>,
  loadingKey: string,
  fallback?: ReactNode
) {
  return function LoadingBoundaryComponent(props: T) {
    return (
      <LoadingBoundary loadingKey={loadingKey} fallback={fallback}>
        <Component {...props} />
      </LoadingBoundary>
    )
  }
}

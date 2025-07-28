'use client'

import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { PhotoIcon } from '@heroicons/react/24/outline'

interface LazyImageProps {
  src: string
  alt: string
  className?: string
  placeholder?: string
  fallback?: React.ReactNode
  onLoad?: () => void
  onError?: () => void
  priority?: boolean
  sizes?: string
  quality?: number
}

export function LazyImage({
  src,
  alt,
  className,
  placeholder,
  fallback,
  onLoad,
  onError,
  priority = false,
  sizes,
  quality = 75
}: LazyImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [isInView, setIsInView] = useState(priority)
  const imgRef = useRef<HTMLImageElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (priority) return

    // Set up intersection observer for lazy loading
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observerRef.current?.disconnect()
          }
        })
      },
      {
        rootMargin: '50px' // Start loading 50px before the image comes into view
      }
    )

    if (imgRef.current) {
      observerRef.current.observe(imgRef.current)
    }

    return () => {
      observerRef.current?.disconnect()
    }
  }, [priority])

  const handleLoad = () => {
    setIsLoading(false)
    onLoad?.()
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
    onError?.()
  }

  const ImagePlaceholder = () => (
    <div className={cn(
      'flex items-center justify-center bg-gray-700 animate-pulse',
      className
    )}>
      <PhotoIcon className="h-8 w-8 text-gray-500" />
    </div>
  )

  const ErrorFallback = () => (
    <div className={cn(
      'flex items-center justify-center bg-gray-800 border border-gray-600',
      className
    )}>
      {fallback || (
        <div className="text-center p-4">
          <PhotoIcon className="h-8 w-8 text-gray-500 mx-auto mb-2" />
          <p className="text-xs text-gray-500">Failed to load image</p>
        </div>
      )}
    </div>
  )

  if (hasError) {
    return <ErrorFallback />
  }

  return (
    <div className="relative">
      {/* Placeholder while loading or not in view */}
      {(isLoading || !isInView) && <ImagePlaceholder />}
      
      {/* Actual image */}
      {isInView && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          className={cn(
            'transition-opacity duration-300',
            isLoading ? 'opacity-0 absolute inset-0' : 'opacity-100',
            className
          )}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? 'eager' : 'lazy'}
          sizes={sizes}
        />
      )}
    </div>
  )
}

// Optimized image component with multiple sizes
interface ResponsiveImageProps extends LazyImageProps {
  srcSet?: {
    sm?: string
    md?: string
    lg?: string
    xl?: string
  }
}

export function ResponsiveImage({
  src,
  srcSet,
  alt,
  className,
  ...props
}: ResponsiveImageProps) {
  const generateSrcSet = () => {
    if (!srcSet) return undefined

    const sources = []
    if (srcSet.sm) sources.push(`${srcSet.sm} 640w`)
    if (srcSet.md) sources.push(`${srcSet.md} 768w`)
    if (srcSet.lg) sources.push(`${srcSet.lg} 1024w`)
    if (srcSet.xl) sources.push(`${srcSet.xl} 1280w`)

    return sources.join(', ')
  }

  return (
    <picture>
      {srcSet && (
        <source
          srcSet={generateSrcSet()}
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      )}
      <LazyImage
        src={src}
        alt={alt}
        className={className}
        {...props}
      />
    </picture>
  )
}

// Avatar component with lazy loading
interface LazyAvatarProps {
  src?: string
  alt: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  fallbackInitials?: string
}

export function LazyAvatar({
  src,
  alt,
  size = 'md',
  className,
  fallbackInitials
}: LazyAvatarProps) {
  const sizeClasses = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
    xl: 'h-16 w-16 text-lg'
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const fallback = (
    <div className={cn(
      'flex items-center justify-center bg-primary-500 text-white font-medium rounded-full',
      sizeClasses[size],
      className
    )}>
      {fallbackInitials || getInitials(alt)}
    </div>
  )

  if (!src) {
    return fallback
  }

  return (
    <LazyImage
      src={src}
      alt={alt}
      className={cn('rounded-full object-cover', sizeClasses[size], className)}
      fallback={fallback}
    />
  )
}

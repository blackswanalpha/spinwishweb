'use client'

import { useEffect, useRef, useState, ReactNode } from 'react'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

interface InfiniteScrollProps<T> {
  items: T[]
  renderItem: (item: T, index: number) => ReactNode
  loadMore: () => Promise<void>
  hasMore: boolean
  isLoading: boolean
  threshold?: number
  className?: string
  loadingComponent?: ReactNode
  emptyComponent?: ReactNode
  errorComponent?: ReactNode
  error?: string | null
}

export function InfiniteScroll<T>({
  items,
  renderItem,
  loadMore,
  hasMore,
  isLoading,
  threshold = 100,
  className,
  loadingComponent,
  emptyComponent,
  errorComponent,
  error
}: InfiniteScrollProps<T>) {
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadingRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!hasMore || isLoading || isLoadingMore) return

    observerRef.current = new IntersectionObserver(
      async (entries) => {
        const target = entries[0]
        if (target.isIntersecting) {
          setIsLoadingMore(true)
          try {
            await loadMore()
          } catch (error) {
            console.error('Error loading more items:', error)
          } finally {
            setIsLoadingMore(false)
          }
        }
      },
      {
        rootMargin: `${threshold}px`
      }
    )

    if (loadingRef.current) {
      observerRef.current.observe(loadingRef.current)
    }

    return () => {
      observerRef.current?.disconnect()
    }
  }, [hasMore, isLoading, isLoadingMore, loadMore, threshold])

  if (error && errorComponent) {
    return <>{errorComponent}</>
  }

  if (items.length === 0 && !isLoading && emptyComponent) {
    return <>{emptyComponent}</>
  }

  return (
    <div className={className}>
      {/* Render items */}
      {items.map((item, index) => renderItem(item, index))}

      {/* Loading indicator */}
      {(hasMore || isLoadingMore) && (
        <div
          ref={loadingRef}
          className="flex justify-center py-4"
        >
          {loadingComponent || (
            <div className="flex items-center space-x-2">
              <LoadingSpinner size="sm" />
              <span className="text-gray-400 text-sm">Loading more...</span>
            </div>
          )}
        </div>
      )}

      {/* End of list indicator */}
      {!hasMore && items.length > 0 && (
        <div className="text-center py-4">
          <span className="text-gray-500 text-sm">No more items to load</span>
        </div>
      )}
    </div>
  )
}

// Hook for managing infinite scroll state
export function useInfiniteScroll<T>(
  initialItems: T[] = [],
  fetchFunction: (page: number, limit: number) => Promise<{ items: T[]; hasMore: boolean }>
) {
  const [items, setItems] = useState<T[]>(initialItems)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadMore = async () => {
    if (isLoading || !hasMore) return

    setIsLoading(true)
    setError(null)

    try {
      const result = await fetchFunction(page, 10) // Default limit of 10
      
      setItems(prev => [...prev, ...result.items])
      setHasMore(result.hasMore)
      setPage(prev => prev + 1)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const reset = () => {
    setItems(initialItems)
    setPage(1)
    setHasMore(true)
    setIsLoading(false)
    setError(null)
  }

  const refresh = async () => {
    setItems([])
    setPage(1)
    setHasMore(true)
    await loadMore()
  }

  return {
    items,
    hasMore,
    isLoading,
    error,
    loadMore,
    reset,
    refresh
  }
}

// Virtual scrolling component for large lists
interface VirtualScrollProps<T> {
  items: T[]
  itemHeight: number
  containerHeight: number
  renderItem: (item: T, index: number) => ReactNode
  overscan?: number
  className?: string
}

export function VirtualScroll<T>({
  items,
  itemHeight,
  containerHeight,
  renderItem,
  overscan = 5,
  className
}: VirtualScrollProps<T>) {
  const [scrollTop, setScrollTop] = useState(0)
  const scrollElementRef = useRef<HTMLDivElement>(null)

  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan)
  const endIndex = Math.min(
    items.length - 1,
    Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
  )

  const visibleItems = items.slice(startIndex, endIndex + 1)

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop)
  }

  const totalHeight = items.length * itemHeight
  const offsetY = startIndex * itemHeight

  return (
    <div
      ref={scrollElementRef}
      className={className}
      style={{ height: containerHeight, overflow: 'auto' }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div style={{ transform: `translateY(${offsetY}px)` }}>
          {visibleItems.map((item, index) => (
            <div
              key={startIndex + index}
              style={{ height: itemHeight }}
            >
              {renderItem(item, startIndex + index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Pagination component as an alternative to infinite scroll
interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  showFirstLast?: boolean
  showPrevNext?: boolean
  maxVisiblePages?: number
  className?: string
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = true,
  showPrevNext = true,
  maxVisiblePages = 5,
  className
}: PaginationProps) {
  const getVisiblePages = () => {
    const pages = []
    const halfVisible = Math.floor(maxVisiblePages / 2)
    
    let startPage = Math.max(1, currentPage - halfVisible)
    let endPage = Math.min(totalPages, currentPage + halfVisible)
    
    // Adjust if we're near the beginning or end
    if (endPage - startPage + 1 < maxVisiblePages) {
      if (startPage === 1) {
        endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)
      } else {
        startPage = Math.max(1, endPage - maxVisiblePages + 1)
      }
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }
    
    return pages
  }

  const visiblePages = getVisiblePages()

  return (
    <div className={`flex items-center justify-center space-x-2 ${className}`}>
      {/* First page */}
      {showFirstLast && currentPage > 1 && (
        <button
          onClick={() => onPageChange(1)}
          className="px-3 py-2 text-sm bg-dark-secondary text-gray-300 rounded hover:bg-gray-600 transition-colors"
        >
          First
        </button>
      )}

      {/* Previous page */}
      {showPrevNext && currentPage > 1 && (
        <button
          onClick={() => onPageChange(currentPage - 1)}
          className="px-3 py-2 text-sm bg-dark-secondary text-gray-300 rounded hover:bg-gray-600 transition-colors"
        >
          Previous
        </button>
      )}

      {/* Page numbers */}
      {visiblePages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-2 text-sm rounded transition-colors ${
            page === currentPage
              ? 'bg-primary-500 text-white'
              : 'bg-dark-secondary text-gray-300 hover:bg-gray-600'
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next page */}
      {showPrevNext && currentPage < totalPages && (
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className="px-3 py-2 text-sm bg-dark-secondary text-gray-300 rounded hover:bg-gray-600 transition-colors"
        >
          Next
        </button>
      )}

      {/* Last page */}
      {showFirstLast && currentPage < totalPages && (
        <button
          onClick={() => onPageChange(totalPages)}
          className="px-3 py-2 text-sm bg-dark-secondary text-gray-300 rounded hover:bg-gray-600 transition-colors"
        >
          Last
        </button>
      )}
    </div>
  )
}

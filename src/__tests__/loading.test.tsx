import { describe, it, expect, jest, beforeEach, afterEach } from '@jest/globals'
import { render, screen, waitFor, act } from '@testing-library/react'
import { LoadingProvider, useLoading, useLoadingState } from '@/contexts/loading-context'
import { LazyImage } from '@/components/ui/lazy-image'
import { LoadingSpinner, LoadingOverlay } from '@/components/ui/loading-spinner'
import React from 'react'

// Mock IntersectionObserver
const mockIntersectionObserver = jest.fn()
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null
})
window.IntersectionObserver = mockIntersectionObserver

describe('Loading Context', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const TestComponent = () => {
    const { setLoading, isLoading } = useLoading()
    
    return (
      <div>
        <button onClick={() => setLoading('test', true)}>Start Loading</button>
        <button onClick={() => setLoading('test', false)}>Stop Loading</button>
        <div data-testid="loading-state">
          {isLoading('test') ? 'Loading' : 'Not Loading'}
        </div>
        <div data-testid="global-loading-state">
          {isLoading() ? 'Global Loading' : 'Global Not Loading'}
        </div>
      </div>
    )
  }

  it('should manage loading states correctly', async () => {
    render(
      <LoadingProvider>
        <TestComponent />
      </LoadingProvider>
    )

    const loadingState = screen.getByTestId('loading-state')
    const globalLoadingState = screen.getByTestId('global-loading-state')
    const startButton = screen.getByText('Start Loading')
    const stopButton = screen.getByText('Stop Loading')

    // Initial state
    expect(loadingState).toHaveTextContent('Not Loading')
    expect(globalLoadingState).toHaveTextContent('Global Not Loading')

    // Start loading
    act(() => {
      startButton.click()
    })

    expect(loadingState).toHaveTextContent('Loading')
    expect(globalLoadingState).toHaveTextContent('Global Loading')

    // Stop loading
    act(() => {
      stopButton.click()
    })

    expect(loadingState).toHaveTextContent('Not Loading')
    expect(globalLoadingState).toHaveTextContent('Global Not Loading')
  })

  it('should handle multiple loading states', async () => {
    const MultiStateComponent = () => {
      const { setLoading, isLoading } = useLoading()
      
      return (
        <div>
          <button onClick={() => setLoading('state1', true)}>Start State 1</button>
          <button onClick={() => setLoading('state2', true)}>Start State 2</button>
          <button onClick={() => setLoading('state1', false)}>Stop State 1</button>
          <div data-testid="state1">{isLoading('state1') ? 'Loading' : 'Not Loading'}</div>
          <div data-testid="state2">{isLoading('state2') ? 'Loading' : 'Not Loading'}</div>
          <div data-testid="global">{isLoading() ? 'Global Loading' : 'Global Not Loading'}</div>
        </div>
      )
    }

    render(
      <LoadingProvider>
        <MultiStateComponent />
      </LoadingProvider>
    )

    const state1Button = screen.getByText('Start State 1')
    const state2Button = screen.getByText('Start State 2')
    const stopState1Button = screen.getByText('Stop State 1')

    // Start first state
    act(() => {
      state1Button.click()
    })

    expect(screen.getByTestId('state1')).toHaveTextContent('Loading')
    expect(screen.getByTestId('state2')).toHaveTextContent('Not Loading')
    expect(screen.getByTestId('global')).toHaveTextContent('Global Loading')

    // Start second state
    act(() => {
      state2Button.click()
    })

    expect(screen.getByTestId('state1')).toHaveTextContent('Loading')
    expect(screen.getByTestId('state2')).toHaveTextContent('Loading')
    expect(screen.getByTestId('global')).toHaveTextContent('Global Loading')

    // Stop first state (global should still be loading)
    act(() => {
      stopState1Button.click()
    })

    expect(screen.getByTestId('state1')).toHaveTextContent('Not Loading')
    expect(screen.getByTestId('state2')).toHaveTextContent('Loading')
    expect(screen.getByTestId('global')).toHaveTextContent('Global Loading')
  })
})

describe('useLoadingState Hook', () => {
  const TestComponent = ({ loadingKey }: { loadingKey: string }) => {
    const { isLoading, setLoading, withLoading } = useLoadingState(loadingKey)
    
    const handleAsyncAction = withLoading(async () => {
      await new Promise(resolve => setTimeout(resolve, 100))
      return 'success'
    })
    
    return (
      <div>
        <div data-testid="loading-state">{isLoading ? 'Loading' : 'Not Loading'}</div>
        <button onClick={() => setLoading(true)}>Start Loading</button>
        <button onClick={() => setLoading(false)}>Stop Loading</button>
        <button onClick={handleAsyncAction}>Async Action</button>
      </div>
    )
  }

  it('should manage specific loading state', async () => {
    render(
      <LoadingProvider>
        <TestComponent loadingKey="test-key" />
      </LoadingProvider>
    )

    const loadingState = screen.getByTestId('loading-state')
    const startButton = screen.getByText('Start Loading')
    const stopButton = screen.getByText('Stop Loading')

    expect(loadingState).toHaveTextContent('Not Loading')

    act(() => {
      startButton.click()
    })

    expect(loadingState).toHaveTextContent('Loading')

    act(() => {
      stopButton.click()
    })

    expect(loadingState).toHaveTextContent('Not Loading')
  })

  it('should handle async operations with withLoading', async () => {
    render(
      <LoadingProvider>
        <TestComponent loadingKey="async-test" />
      </LoadingProvider>
    )

    const loadingState = screen.getByTestId('loading-state')
    const asyncButton = screen.getByText('Async Action')

    expect(loadingState).toHaveTextContent('Not Loading')

    act(() => {
      asyncButton.click()
    })

    expect(loadingState).toHaveTextContent('Loading')

    await waitFor(() => {
      expect(loadingState).toHaveTextContent('Not Loading')
    }, { timeout: 200 })
  })
})

describe('LoadingSpinner Component', () => {
  it('should render with default props', () => {
    render(<LoadingSpinner />)
    const spinner = screen.getByRole('img', { hidden: true })
    expect(spinner).toBeInTheDocument()
  })

  it('should apply size classes correctly', () => {
    const { rerender } = render(<LoadingSpinner size="sm" />)
    let spinner = screen.getByRole('img', { hidden: true })
    expect(spinner).toHaveClass('h-4', 'w-4')

    rerender(<LoadingSpinner size="lg" />)
    spinner = screen.getByRole('img', { hidden: true })
    expect(spinner).toHaveClass('h-8', 'w-8')
  })

  it('should apply color classes correctly', () => {
    const { rerender } = render(<LoadingSpinner color="primary" />)
    let spinner = screen.getByRole('img', { hidden: true })
    expect(spinner).toHaveClass('text-primary-500')

    rerender(<LoadingSpinner color="white" />)
    spinner = screen.getByRole('img', { hidden: true })
    expect(spinner).toHaveClass('text-white')
  })
})

describe('LoadingOverlay Component', () => {
  it('should show overlay when loading', () => {
    render(
      <LoadingOverlay isLoading={true}>
        <div data-testid="content">Content</div>
      </LoadingOverlay>
    )

    expect(screen.getByTestId('content')).toBeInTheDocument()
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('should hide overlay when not loading', () => {
    render(
      <LoadingOverlay isLoading={false}>
        <div data-testid="content">Content</div>
      </LoadingOverlay>
    )

    expect(screen.getByTestId('content')).toBeInTheDocument()
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
  })
})

describe('LazyImage Component', () => {
  beforeEach(() => {
    // Mock IntersectionObserver for each test
    const mockObserve = jest.fn()
    const mockUnobserve = jest.fn()
    const mockDisconnect = jest.fn()

    mockIntersectionObserver.mockImplementation((callback) => ({
      observe: mockObserve,
      unobserve: mockUnobserve,
      disconnect: mockDisconnect,
      // Simulate intersection
      trigger: (entries: any[]) => callback(entries)
    }))
  })

  it('should render placeholder initially', () => {
    render(
      <LazyImage
        src="test-image.jpg"
        alt="Test Image"
        className="test-class"
      />
    )

    // Should show placeholder icon
    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument()
  })

  it('should load image with priority', () => {
    render(
      <LazyImage
        src="test-image.jpg"
        alt="Test Image"
        priority={true}
      />
    )

    // With priority, image should be loaded immediately
    const image = screen.getByAltText('Test Image')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('loading', 'eager')
  })

  it('should handle image load error', async () => {
    const onError = jest.fn()
    
    render(
      <LazyImage
        src="invalid-image.jpg"
        alt="Test Image"
        onError={onError}
        priority={true}
      />
    )

    const image = screen.getByAltText('Test Image')
    
    // Simulate image error
    act(() => {
      const errorEvent = new Event('error')
      image.dispatchEvent(errorEvent)
    })

    await waitFor(() => {
      expect(onError).toHaveBeenCalled()
    })
  })

  it('should handle image load success', async () => {
    const onLoad = jest.fn()
    
    render(
      <LazyImage
        src="valid-image.jpg"
        alt="Test Image"
        onLoad={onLoad}
        priority={true}
      />
    )

    const image = screen.getByAltText('Test Image')
    
    // Simulate image load
    act(() => {
      const loadEvent = new Event('load')
      image.dispatchEvent(loadEvent)
    })

    await waitFor(() => {
      expect(onLoad).toHaveBeenCalled()
    })
  })
})

describe('Integration Tests', () => {
  it('should integrate loading context with lazy image', async () => {
    const TestIntegration = () => {
      const { isLoading } = useLoading()
      
      return (
        <div>
          <div data-testid="global-loading">
            {isLoading() ? 'Global Loading' : 'Global Not Loading'}
          </div>
          <LazyImage
            src="test-image.jpg"
            alt="Test Image"
            priority={true}
            onLoad={() => {
              // Image loaded
            }}
          />
        </div>
      )
    }

    render(
      <LoadingProvider>
        <TestIntegration />
      </LoadingProvider>
    )

    expect(screen.getByTestId('global-loading')).toHaveTextContent('Global Not Loading')
    expect(screen.getByAltText('Test Image')).toBeInTheDocument()
  })
})

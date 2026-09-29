import { Component, type ReactNode, type ErrorInfo } from 'react'
import Link from 'next/link'
import { AlertTriangle } from 'lucide-react'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo)
    this.props.onError?.(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback
      return (
        <div className="flex min-h-[400px] flex-col items-center justify-center p-8 text-center" role="alert">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-error/10">
            <AlertTriangle className="h-8 w-8 text-error" />
          </div>
          <h2 className="mb-2 font-heading text-2xl text-night">Something went wrong</h2>
          <p className="mb-6 max-w-md font-body text-sm text-text-muted">
            An unexpected error occurred. Please try refreshing the page or contact support if the problem persists.
          </p>
          <div className="flex gap-4">
            <button onClick={() => window.location.reload()} className="rounded-lg bg-primary px-6 py-2.5 font-body text-sm font-medium text-white transition-colors hover:bg-primary-light">
              Refresh Page
            </button>
            <Link href="/" className="rounded-lg border border-night/10 px-6 py-2.5 font-body text-sm font-medium text-night transition-colors hover:bg-night/5">
              Go Home
            </Link>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

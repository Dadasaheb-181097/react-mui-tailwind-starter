import { Component } from 'react'

/**
 * Catches render errors above the router — e.g. providers, theme shell, store wiring.
 * React Router's errorElement only covers route descendants, not parents like AppearanceShell.
 * Plain HTML only so this still renders when MUI theme/bootstrap code fails.
 */
export class RootErrorBoundary extends Component {
  state = { error: null }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    console.error('Root error boundary:', error, info)
  }

  handleRetry = () => {
    this.setState({ error: null })
    window.location.reload()
  }

  render() {
    const { error } = this.state
    if (!error) return this.props.children

    const message = error instanceof Error ? error.message : 'An unexpected error occurred.'

    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          textAlign: 'center',
          fontFamily: 'system-ui, sans-serif',
          background: '#f6f8fc',
          color: '#012970',
        }}
      >
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            background: '#fee2e2',
            color: '#dc2626',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 32,
            marginBottom: 16,
          }}
          aria-hidden
        >
          !
        </div>
        <h1 style={{ margin: '0 0 8px', fontSize: 22, fontWeight: 700 }}>Something went wrong</h1>
        <p style={{ margin: '0 0 24px', maxWidth: 420, color: '#64748b', lineHeight: 1.5 }}>{message}</p>
        <button
          type="button"
          onClick={this.handleRetry}
          style={{
            padding: '10px 20px',
            borderRadius: 8,
            border: 'none',
            background: '#2b50ed',
            color: '#fff',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Reload app
        </button>
      </div>
    )
  }
}

'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#111717',
          color: '#FFFFFF',
          fontFamily: 'Georgia, "Times New Roman", serif',
          textAlign: 'center',
          padding: '2rem',
        }}
      >
        <div>
          <p style={{ fontSize: '0.875rem', letterSpacing: '0.4em', color: '#C9A96E', margin: 0 }}>
            SOMETHING WENT WRONG
          </p>
          <h1 style={{ fontSize: '2.5rem', margin: '1rem 0 0' }}>We hit an unexpected snag</h1>
          <p style={{ fontSize: '0.875rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.6)', margin: '1rem 0 0' }}>
            An error occurred while loading the site. Please try again.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: '2rem',
              borderRadius: '9999px',
              backgroundColor: '#C9A96E',
              color: '#111717',
              border: 0,
              padding: '0.75rem 1.75rem',
              fontSize: '0.875rem',
              letterSpacing: '0.1em',
              cursor: 'pointer',
            }}
          >
            Try again
          </button>
          {error.digest ? (
            <p style={{ marginTop: '2rem', fontSize: '0.75rem', color: 'rgba(255,255,255,0.25)' }}>
              Reference: {error.digest}
            </p>
          ) : null}
        </div>
      </body>
    </html>
  )
}

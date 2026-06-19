import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/styles/index.css'
import App from '@/app/App'
import { AppProviders } from '@/app/providers/AppProviders'
import { RootErrorBoundary } from '@/app/providers/RootErrorBoundary'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RootErrorBoundary>
      <AppProviders>
        <App />
      </AppProviders>
    </RootErrorBoundary>
  </StrictMode>,
)

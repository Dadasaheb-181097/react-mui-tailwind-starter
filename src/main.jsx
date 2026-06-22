import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/styles/index.css'
import { AppRoutes } from '@/routes'
import { AppProviders } from '@/providers/AppProviders'
import { RootErrorBoundary } from '@/providers/RootErrorBoundary'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RootErrorBoundary>
      <AppProviders>
        <AppRoutes />
      </AppProviders>
    </RootErrorBoundary>
  </StrictMode>,
)

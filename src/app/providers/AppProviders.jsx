import { Provider } from 'react-redux'
import { store } from '@/store'
import { AuthBootstrap } from '@/features/auth/components/AuthBootstrap'
import { AppearanceShell } from '@/app/providers/AppearanceShell'

export function AppProviders({ children }) {
  return (
    <Provider store={store}>
      <AuthBootstrap />
      <AppearanceShell>{children}</AppearanceShell>
    </Provider>
  )
}

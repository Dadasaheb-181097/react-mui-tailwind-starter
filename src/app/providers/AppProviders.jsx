import { Provider } from 'react-redux'
import { store } from '@/app/store'
import { AuthProvider } from '@/features/auth/AuthContext'
import { AdminAppearanceProvider } from '@/context/AdminAppearanceContext'

export function AppProviders({ children }) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <AdminAppearanceProvider>{children}</AdminAppearanceProvider>
      </AuthProvider>
    </Provider>
  )
}

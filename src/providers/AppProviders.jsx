import { useLayoutEffect, useMemo } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { Provider, useSelector } from 'react-redux'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { queryClient } from '@/react-query/queryClient'
import { store } from '@/redux'
import {
  selectAppearanceMode,
  selectAppearancePresetId,
  selectAppearanceTokens,
} from '@/redux/slices/appearanceSlice'
import { AuthBootstrap } from '@/features/auth/components/AuthBootstrap'
import { applyTokensToDocument } from '@/theme/adminPresets'
import { createAppTheme, DEFAULT_THEME_TOKENS } from '@/theme/appTheme'

function ThemeShell({ children }) {
  const mode = useSelector(selectAppearanceMode)
  const presetId = useSelector(selectAppearancePresetId)
  const tokens = useSelector(selectAppearanceTokens)

  useLayoutEffect(() => {
    applyTokensToDocument(tokens, presetId, mode)
  }, [tokens, presetId, mode])

  const theme = useMemo(
    () => createAppTheme(mode, tokens?.primary ? tokens : DEFAULT_THEME_TOKENS),
    [mode, tokens],
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}

export function AppProviders({ children }) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthBootstrap />
        <ThemeShell>{children}</ThemeShell>
      </QueryClientProvider>
    </Provider>
  )
}

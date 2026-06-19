import { useLayoutEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { applyTokensToDocument } from '@/theme/adminPresets'
import { createAppTheme, DEFAULT_THEME_TOKENS } from '@/theme/appTheme'
import {
  selectAppearanceMode,
  selectAppearancePresetId,
  selectAppearanceTokens,
} from '@/store/slices/appearanceSlice'

/** Applies CSS tokens + MUI theme from Redux appearance state. */
export function AppearanceShell({ children }) {
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

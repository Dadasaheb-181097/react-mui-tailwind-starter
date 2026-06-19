import { createTheme } from '@mui/material/styles'

export const DEFAULT_THEME_TOKENS = {
  primary: '#2b50ed',
  primaryDark: '#1f3dbd',
  primaryTintLight: '#e8ecfe',
  bgPage: '#f6f8fc',
  cardBg: '#ffffff',
  text: '#012970',
  textMuted: '#64748b',
  divider: '#e8ecf4',
}

/**
 * @param {'light' | 'dark'} mode
 * @param {Record<string, string>} tokens — semantic tokens from adminPresets
 */
export function createAppTheme(mode, tokens = DEFAULT_THEME_TOKENS) {
  const t = { ...DEFAULT_THEME_TOKENS, ...tokens }
  const paletteMode = mode === 'dark' ? 'dark' : 'light'

  return createTheme({
    palette: {
      mode: paletteMode,
      primary: {
        main: t.primary,
        dark: t.primaryDark,
        light: t.primaryTintLight,
        contrastText: '#ffffff',
      },
      secondary: {
        main: t.textMuted,
      },
      text: {
        primary: t.text,
        secondary: t.textMuted,
      },
      background: {
        default: t.bgPage,
        paper: t.cardBg,
      },
      divider: t.divider,
      error: { main: '#ef4444' },
      warning: { main: '#ed6c02' },
      info: { main: '#0288d1' },
      success: { main: '#2e7d32' },
    },
    typography: {
      fontFamily: '"Public Sans", "Inter", system-ui, -apple-system, sans-serif',
      fontWeightMedium: 600,
      fontWeightBold: 700,
      body1: { fontSize: '0.9375rem', lineHeight: 1.55 },
      body2: { fontSize: '0.875rem', lineHeight: 1.5 },
      subtitle2: { fontWeight: 600 },
      button: { fontWeight: 600, textTransform: 'none' },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: t.bgPage,
            color: t.text,
          },
        },
      },
    },
  })
}

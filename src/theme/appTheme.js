import { createTheme } from '@mui/material/styles'

/**
 * @param {'light' | 'dark'} mode
 * @param {Record<string, string>} tokens — semantic tokens from adminPresets
 */
export function createAppTheme(mode, tokens) {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: tokens.primary,
        dark: tokens.primaryDark,
        light: tokens.primaryTintLight,
        contrastText: '#ffffff',
      },
      secondary: {
        main: tokens.textMuted,
      },
      text: {
        primary: tokens.text,
        secondary: tokens.textMuted,
      },
      background: {
        default: tokens.bgPage,
        paper: tokens.cardBg,
      },
      divider: tokens.divider,
      error: {
        main: '#ef4444',
      },
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
            backgroundColor: tokens.bgPage,
            color: tokens.text,
          },
        },
      },
    },
  })
}

/** Static default for SSR / tests — overridden at runtime by AdminAppearanceProvider */
export const appTheme = createAppTheme('light', {
  primary: '#2b50ed',
  primaryDark: '#1f3dbd',
  primaryTintLight: '#e8ecfe',
  bgPage: '#f6f8fc',
  cardBg: '#ffffff',
  text: '#012970',
  textMuted: '#64748b',
  divider: '#e8ecf4',
})

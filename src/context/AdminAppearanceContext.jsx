import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import {
  ADMIN_PRESETS,
  ADMIN_PRESET_ORDER,
  applyTokensToDocument,
  getPresetList,
  getTokens,
} from '../theme/adminPresets'
import { createAppTheme } from '../theme/appTheme'

const STORAGE_KEY = 'mui-starter-admin-appearance'

function readStored() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const data = JSON.parse(raw)
    if (!data || typeof data !== 'object') return null
    return data
  } catch {
    return null
  }
}

function normalizePreset(id) {
  return ADMIN_PRESETS[id] ? id : 'ocean'
}

const AdminAppearanceContext = createContext(null)

export function AdminAppearanceProvider({ children }) {
  const stored = readStored()
  const [mode, setModeState] = useState(() =>
    stored?.mode === 'dark' ? 'dark' : 'light',
  )
  const [presetId, setPresetIdState] = useState(() =>
    normalizePreset(stored?.presetId),
  )

  const tokens = useMemo(() => getTokens(presetId, mode), [presetId, mode])

  useLayoutEffect(() => {
    applyTokensToDocument(tokens, presetId, mode)
  }, [tokens, presetId, mode])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ mode, presetId }))
    } catch {
      /* ignore */
    }
  }, [mode, presetId])

  const setMode = useCallback((next) => {
    setModeState(next === 'dark' ? 'dark' : 'light')
  }, [])

  const toggleMode = useCallback(() => {
    setModeState((m) => (m === 'dark' ? 'light' : 'dark'))
  }, [])

  const setPresetId = useCallback((id) => {
    setPresetIdState(normalizePreset(id))
  }, [])

  const theme = useMemo(() => createAppTheme(mode, tokens), [mode, tokens])

  const value = useMemo(
    () => ({
      mode,
      presetId,
      tokens,
      presets: getPresetList(),
      presetOrder: ADMIN_PRESET_ORDER,
      setMode,
      setPresetId,
      toggleMode,
    }),
    [mode, presetId, tokens, setMode, setPresetId, toggleMode],
  )

  return (
    <AdminAppearanceContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AdminAppearanceContext.Provider>
  )
}

export function useAdminAppearance() {
  const ctx = useContext(AdminAppearanceContext)
  if (!ctx) {
    throw new Error('useAdminAppearance must be used within AdminAppearanceProvider')
  }
  return ctx
}

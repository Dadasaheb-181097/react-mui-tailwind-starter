import { createSlice } from '@reduxjs/toolkit'
import { ADMIN_PRESETS, getTokens } from '@/theme/adminPresets'

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

function writeStored(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // ignore storage failures
  }
}

function normalizePreset(id) {
  return ADMIN_PRESETS[id] ? id : 'ocean'
}

const stored = typeof window !== 'undefined' ? readStored() : null

const initialState = {
  mode: stored?.mode === 'dark' ? 'dark' : 'light',
  presetId: normalizePreset(stored?.presetId),
}

const appearanceSlice = createSlice({
  name: 'appearance',
  initialState,
  reducers: {
    appearanceModeSet(state, action) {
      state.mode = action.payload === 'dark' ? 'dark' : 'light'
      writeStored({ mode: state.mode, presetId: state.presetId })
    },
    appearanceModeToggled(state) {
      state.mode = state.mode === 'dark' ? 'light' : 'dark'
      writeStored({ mode: state.mode, presetId: state.presetId })
    },
    appearancePresetSet(state, action) {
      state.presetId = normalizePreset(action.payload)
      writeStored({ mode: state.mode, presetId: state.presetId })
    },
  },
})

export const { appearanceModeSet, appearanceModeToggled, appearancePresetSet } = appearanceSlice.actions

export const selectAppearanceMode = (state) => state.appearance.mode
export const selectAppearancePresetId = (state) => state.appearance.presetId
export const selectAppearanceTokens = (state) => {
  const presetId = state.appearance?.presetId ?? 'ocean'
  const mode = state.appearance?.mode ?? 'light'
  return getTokens(presetId, mode) ?? getTokens('ocean', 'light')
}

export default appearanceSlice.reducer

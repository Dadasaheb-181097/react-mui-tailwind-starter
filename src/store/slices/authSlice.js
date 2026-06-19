import { createSlice } from '@reduxjs/toolkit'

const STORAGE_KEY = 'mui-starter-auth'

function readStoredAuth() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return null
    if (typeof parsed.token !== 'string' || !parsed.token) return null
    return parsed
  } catch {
    return null
  }
}

function writeStoredAuth(data) {
  try {
    if (!data?.token) localStorage.removeItem(STORAGE_KEY)
    else localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // ignore storage failures
  }
}

const stored = typeof window !== 'undefined' ? readStoredAuth() : null

const initialState = {
  token: stored?.token || '',
  user: stored?.user || null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authHydrated(state, action) {
      state.token = action.payload?.token || ''
      state.user = action.payload?.user || null
      writeStoredAuth({ token: state.token, user: state.user })
    },
    authLoggedIn(state, action) {
      state.token = action.payload?.token || ''
      state.user = action.payload?.user || null
      writeStoredAuth({ token: state.token, user: state.user })
    },
    authLoggedOut(state) {
      state.token = ''
      state.user = null
      writeStoredAuth(null)
    },
  },
})

export const { authHydrated, authLoggedIn, authLoggedOut } = authSlice.actions

export const selectAuthToken = (s) => s.auth.token
export const selectAuthUser = (s) => s.auth.user
export const selectIsAuthenticated = (s) => Boolean(s.auth.token)

export default authSlice.reducer

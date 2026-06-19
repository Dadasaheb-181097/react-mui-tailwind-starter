import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { TAG_TYPES } from './tagTypes'
import { authLoggedOut } from '@/features/auth/store/authSlice'

function stripTrailingSlash(value) {
  return String(value || '').replace(/\/+$/, '')
}

function ensureLeadingSlash(value) {
  const v = String(value || '')
  if (!v) return ''
  return v.startsWith('/') ? v : `/${v}`
}

function pickServiceBaseUrl(pathname) {
  const p = String(pathname || '')
  if (p.startsWith('/v3')) return import.meta.env.VITE_API_V3_BASE_URL
  if (p.startsWith('/v1')) return import.meta.env.VITE_API_V1_BASE_URL
  if (p.startsWith('/v2')) return import.meta.env.VITE_API_V2_BASE_URL
  if (p.startsWith('/v11')) return import.meta.env.VITE_API_V11_BASE_URL
  if (p.startsWith('/v22')) return import.meta.env.VITE_API_V22_BASE_URL
  return import.meta.env.VITE_API_BASE_URL
}

function resolveUrl(args) {
  const url = typeof args === 'string' ? args : args?.url
  const serviceBase = stripTrailingSlash(pickServiceBaseUrl(url))
  if (!serviceBase) return args

  const nextUrl = `${serviceBase}${ensureLeadingSlash(url)}`
  if (typeof args === 'string') return nextUrl
  return { ...args, url: nextUrl }
}

const rawBaseQuery = fetchBaseQuery({
  baseUrl: '',
  prepareHeaders: (headers, { getState }) => {
    const token = getState()?.auth?.token
    if (token) headers.set('authorization', `Bearer ${token}`)
    return headers
  },
})

async function baseQuery(args, api, extraOptions) {
  const res = await rawBaseQuery(resolveUrl(args), api, extraOptions)
  if (res?.error?.status === 401) {
    api.dispatch(authLoggedOut())
  }
  return res
}

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: Object.values(TAG_TYPES),
  endpoints: () => ({}),
})


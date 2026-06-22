import axios from 'axios'

const STORAGE_KEY = 'mui-starter-auth'

function getToken() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return ''
    const parsed = JSON.parse(raw)
    return parsed?.token || ''
  } catch {
    return ''
  }
}

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
})

apiClient.interceptors.request.use((config) => {
  const token = getToken()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

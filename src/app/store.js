import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './rootReducer'
import { baseApi } from './api/baseApi'

export function makeStore(preloadedState) {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(baseApi.middleware),
    devTools: import.meta.env.DEV,
    preloadedState,
  })
}

export const store = makeStore()


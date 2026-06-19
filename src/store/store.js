import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './rootReducer'

export function makeStore(preloadedState) {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
    devTools: import.meta.env.DEV,
    preloadedState,
  })
}

export const store = makeStore()

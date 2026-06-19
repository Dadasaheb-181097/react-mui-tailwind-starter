import { combineReducers } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import appearanceReducer from './slices/appearanceSlice'

export const rootReducer = combineReducers({
  auth: authReducer,
  appearance: appearanceReducer,
})

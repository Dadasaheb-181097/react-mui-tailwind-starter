import { useCallback } from 'react'
import { ADMIN_PRESET_ORDER, getPresetList } from '@/theme/adminPresets'
import {
  appearanceModeSet,
  appearanceModeToggled,
  appearancePresetSet,
  selectAppearanceMode,
  selectAppearancePresetId,
  selectAppearanceTokens,
} from '../slices/appearanceSlice'
import { useAppDispatch, useAppSelector } from '../hooks'

export function useAdminAppearance() {
  const dispatch = useAppDispatch()
  const mode = useAppSelector(selectAppearanceMode)
  const presetId = useAppSelector(selectAppearancePresetId)
  const tokens = useAppSelector(selectAppearanceTokens)

  const setMode = useCallback(
    (next) => {
      dispatch(appearanceModeSet(next))
    },
    [dispatch],
  )

  const toggleMode = useCallback(() => {
    dispatch(appearanceModeToggled())
  }, [dispatch])

  const setPresetId = useCallback(
    (id) => {
      dispatch(appearancePresetSet(id))
    },
    [dispatch],
  )

  return {
    mode,
    presetId,
    tokens,
    presets: getPresetList(),
    presetOrder: ADMIN_PRESET_ORDER,
    setMode,
    setPresetId,
    toggleMode,
  }
}

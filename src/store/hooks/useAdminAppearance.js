import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ADMIN_PRESET_ORDER, getPresetList } from '@/theme/adminPresets'
import {
  appearanceModeSet,
  appearanceModeToggled,
  appearancePresetSet,
  selectAppearanceMode,
  selectAppearancePresetId,
  selectAppearanceTokens,
} from '../slices/appearanceSlice'

export function useAdminAppearance() {
  const dispatch = useDispatch()
  const mode = useSelector(selectAppearanceMode)
  const presetId = useSelector(selectAppearancePresetId)
  const tokens = useSelector(selectAppearanceTokens)

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

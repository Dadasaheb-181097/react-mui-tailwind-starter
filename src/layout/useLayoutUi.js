import { useState } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

export function useLayoutUi() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'))
  const [mobileOpen, setMobileOpen] = useState(false)
  const [desktopCollapsed, setDesktopCollapsed] = useState(false)

  const railCollapsed = !isMobile && (isTablet || desktopCollapsed)

  const shellClass = [
    'app-shell min-h-screen bg-bg-page font-medium text-text-muted',
    isMobile ? 'app-shell--mobile' : '',
    !isMobile && railCollapsed ? 'app-shell--sidebar-collapsed' : '',
  ]
    .filter(Boolean)
    .join(' ')

  const toggleMenu = () => {
    if (isMobile) setMobileOpen(true)
    else if (!isTablet) setDesktopCollapsed((c) => !c)
  }

  return {
    isMobile,
    railCollapsed,
    mobileOpen,
    setMobileOpen,
    toggleMenu,
    shellClass,
  }
}

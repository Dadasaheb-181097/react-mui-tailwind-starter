import { useMemo, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { ChatDrawer, NotificationDrawer, ProfileDrawer } from '@/shared/components/drawer'
import { AppBreadcrumbs } from '@/shared/components/navigation'
import { Navbar } from '../components/Navbar'
import { Sidebar } from '../components/Sidebar'
import { getActiveNavId, NAV_ROUTES } from '../nav/navConfig'

export function AdminLayout() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'))
  const location = useLocation()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [desktopCollapsed, setDesktopCollapsed] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [notificationOpen, setNotificationOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)

  const activeNavId = useMemo(() => getActiveNavId(location.pathname), [location.pathname])

  const railCollapsed = !isMobile && (isTablet || desktopCollapsed)

  const shellClass = [
    'admin-shell min-h-screen bg-bg-page font-medium text-text-muted',
    isMobile ? 'admin-shell--mobile' : '',
    !isMobile && railCollapsed ? 'admin-shell--sidebar-collapsed' : '',
  ]
    .filter(Boolean)
    .join(' ')

  const handleMenuClick = () => {
    if (isMobile) setMobileOpen(true)
    else if (!isTablet) setDesktopCollapsed((c) => !c)
  }

  const handleNavChange = (id) => {
    if (id === 'chat') {
      setChatOpen(true)
      return
    }
    const path = NAV_ROUTES[id]
    if (path) navigate(path)
  }

  return (

    <div className={shellClass}>
      <Navbar
        onMenuClick={handleMenuClick}
        onOpenChat={() => setChatOpen(true)}
        onOpenNotifications={() => setNotificationOpen(true)}
        onOpenProfile={() => setProfileOpen(true)}
      />

      <Sidebar
        isMobile={isMobile}
        railCollapsed={railCollapsed}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
        activeNavId={activeNavId}
        onNavChange={handleNavChange}
        onOpenProfile={() => setProfileOpen(true)}
      />

      <ChatDrawer open={chatOpen} onClose={() => setChatOpen(false)} />

      <NotificationDrawer open={notificationOpen} onClose={() => setNotificationOpen(false)} />

      <ProfileDrawer open={profileOpen} onClose={() => setProfileOpen(false)} />

      <div className="admin-main min-h-screen pt-navbar transition-[margin-left] duration-300 ease-in-out">
        <div className="admin-main__inner min-h-[calc(100vh-var(--layout-navbar-height))] px-12 py-11 pb-13 max-[899px]:px-7 max-[899px]:py-8 max-[899px]:pb-12">
          <AppBreadcrumbs />
          <Outlet />
        </div>
      </div>
    </div>
  )
}



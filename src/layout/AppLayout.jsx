import { useMemo, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { ChatDrawer, NotificationDrawer, ProfileDrawer } from '@/components/drawer'
import { getActiveNavId, NAV_ROUTES } from './navConfig'
import { useLayoutUi } from '@/hooks'
import { Navbar } from './Navbar'
import { Sidebar } from './Sidebar'
import { Main } from './Main'

export function AppLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const { isMobile, railCollapsed, mobileOpen, setMobileOpen, toggleMenu, shellClass } = useLayoutUi()
  const [drawer, setDrawer] = useState(null)

  const activeNavId = useMemo(() => getActiveNavId(location.pathname), [location.pathname])

  const handleNavChange = (id) => {
    const path = NAV_ROUTES[id]
    if (path) navigate(path)
  }

  return (
    <div className={shellClass}>
      <Navbar
        onMenuClick={toggleMenu}
        onOpenChat={() => setDrawer('chat')}
        onOpenNotifications={() => setDrawer('notifications')}
        onOpenProfile={() => setDrawer('profile')}
      />

      <Sidebar
        isMobile={isMobile}
        railCollapsed={railCollapsed}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
        activeNavId={activeNavId}
        onNavChange={handleNavChange}
        onOpenProfile={() => setDrawer('profile')}
      />

      <ChatDrawer open={drawer === 'chat'} onClose={() => setDrawer(null)} />
      <NotificationDrawer open={drawer === 'notifications'} onClose={() => setDrawer(null)} />
      <ProfileDrawer open={drawer === 'profile'} onClose={() => setDrawer(null)} />

      <Main>
        <Outlet />
      </Main>
    </div>
  )
}

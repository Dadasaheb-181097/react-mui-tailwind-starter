import Badge from '@mui/material/Badge'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import { UserAvatar } from '@/shared/components/ui/UserAvatar'
import {
  NAV_DIVIDER,
  NAV_ICON_BTN,
  NAV_ICON_GROUP,
  NAV_PROFILE_BTN,
  NAV_PROFILE_NAME,
  NAV_PROFILE_ROLE,
} from '@/shared/constants/uiClasses'
import { WeatherDateTime } from './WeatherDateTime'
import {
  MenuOutlined as MenuOutlinedIcon,
  SearchOutlined as SearchOutlinedIcon,
  NotificationsOutlined as NotificationsOutlinedIcon,
  ChatBubbleOutlineOutlined as ChatBubbleOutlineOutlinedIcon,
  DarkModeOutlined as DarkModeOutlinedIcon,
  LightModeOutlined as LightModeOutlinedIcon,
  AppsOutlined as AppsOutlinedIcon,
  LogoutOutlined as LogoutOutlinedIcon,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useAdminAppearance } from '@/context/AdminAppearanceContext'
import { useAuth } from '@/features/auth/AuthContext'
import { ThemePalettePopover } from './ThemePalettePopover'

function NavbarDivider({ className = '' }) {
  return (
    <div
      role="separator"
      aria-orientation="vertical"
      className={[NAV_DIVIDER, className].filter(Boolean).join(' ')}
    />
  )
}

export function Navbar({
  onMenuClick,
  onOpenChat,
  onOpenNotifications,
  onOpenProfile,
}) {
  const { mode, toggleMode } = useAdminAppearance()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <header className="fixed inset-x-0 top-0 z-1280 h-navbar border-b border-navbar-border bg-navbar-bg px-10 shadow-navbar max-lg:px-7 max-sm:px-4">
      <div className="flex h-full min-w-0 items-center gap-0">
        <div className="inline-flex shrink-0 items-center gap-6 self-center mr-5">
          <IconButton
            color="inherit"
            aria-label="Toggle sidebar menu"
            onClick={onMenuClick}
            className={NAV_ICON_BTN}
            size="small"
          >
            <MenuOutlinedIcon fontSize="inherit" />
          </IconButton>
          <div className="inline-flex items-center gap-5">
            <span className="inline-flex size-[34px] items-center justify-center rounded-md bg-primary text-sm font-bold text-white shadow-logo">
              A
            </span>
            <span className="text-[17px] font-bold tracking-tight text-navbar-text max-md:hidden">
              Ayekart
            </span>
          </div>
        </div>

        <NavbarDivider className="max-sm:hidden" />

        <div className="flex min-w-0 flex-1 items-center self-center px-4 max-sm:px-2">
          <div className="min-w-0 flex-1 max-w-[min(var(--layout-content-max-width),100%)] max-xl:max-w-[min(420px,36vw)]">
            <TextField
              className="navbar-search w-full"
              placeholder="Search projects, invoices, users..."
              variant="outlined"
              size="small"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchOutlinedIcon className="text-text-muted!" fontSize="small" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <kbd className="mr-3 rounded-sm border border-divider-soft bg-navbar-search-focus-bg px-4 py-[3px] text-[11px] font-semibold leading-none text-text-muted max-sm:hidden">
                      /
                    </kbd>
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </div>

        <NavbarDivider className="max-sm:hidden" />

        <nav
          className="flex min-w-0 shrink-0 items-center self-center"
          aria-label="Top navigation"
        >
          <div className="flex items-center self-center max-md:hidden">
            <WeatherDateTime />
          </div>

          <NavbarDivider className="max-md:hidden" />

          <div className={`${NAV_ICON_GROUP} max-sm:[&_.navbar-icon-btn--apps]:hidden`}>
            <IconButton
              color="inherit"
              aria-label="Applications"
              className={`${NAV_ICON_BTN} navbar-icon-btn--apps`}
              size="small"
            >
              <AppsOutlinedIcon fontSize="inherit" />
            </IconButton>

            <IconButton
              color="inherit"
              aria-label="Notifications"
              className={`${NAV_ICON_BTN} navbar-icon-btn--badge-wrap`}
              size="small"
              onClick={onOpenNotifications}
            >
              <Badge badgeContent={4} color="error" overlap="circular" className="navbar-badge">
                <NotificationsOutlinedIcon fontSize="inherit" />
              </Badge>
            </IconButton>

            <IconButton
              color="inherit"
              aria-label="Messages"
              className={`${NAV_ICON_BTN} navbar-icon-btn--badge-wrap max-md:hidden`}
              size="small"
              onClick={onOpenChat}
            >
              <Badge badgeContent={5} color="error" overlap="circular" className="navbar-badge">
                <ChatBubbleOutlineOutlinedIcon fontSize="inherit" />
              </Badge>
            </IconButton>

            <ThemePalettePopover
              iconButtonProps={{ size: 'small', className: NAV_ICON_BTN }}
            />

            <IconButton
              color="inherit"
              aria-label={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              className={NAV_ICON_BTN}
              size="small"
              onClick={toggleMode}
            >
              {mode === 'dark' ? (
                <LightModeOutlinedIcon fontSize="inherit" />
              ) : (
                <DarkModeOutlinedIcon fontSize="inherit" />
              )}
            </IconButton>

            <IconButton
              color="inherit"
              aria-label="Sign out"
              className={NAV_ICON_BTN}
              size="small"
              onClick={() => {
                logout()
                navigate('/login', { replace: true })
              }}
            >
              <LogoutOutlinedIcon fontSize="inherit" />
            </IconButton>
          </div>

          <NavbarDivider />

          <div className="flex items-center gap-2 self-center pr-1">
            <button
              type="button"
              onClick={onOpenProfile}
              className={NAV_PROFILE_BTN}
              aria-label="Open profile"
            >
              <UserAvatar initials={user?.initials || 'JD'} name={user?.name} size="lg" />
              <div className="hidden flex-col gap-1 leading-tight lg:flex">
                <span className={NAV_PROFILE_NAME}>{user?.name || 'John Doe'}</span>
                <span className={NAV_PROFILE_ROLE}>{user?.role || 'Product Admin'}</span>
              </div>
            </button>
          </div>
        </nav>
      </div>
    </header>
  )
}

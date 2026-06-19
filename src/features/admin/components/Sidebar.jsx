import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Drawer from '@mui/material/Drawer'
import Badge from '@mui/material/Badge'
import Collapse from '@mui/material/Collapse'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import { UserAvatar } from '@/shared/components/ui/UserAvatar'
import { useAuth } from '@/features/auth/AuthContext'
import { ROUTE_PATHS } from '@/app/routes/routePaths'
import { SIDEBAR_CHEVRON, SIDEBAR_FOOTER_BAR, SIDEBAR_FOOTER_ICON } from '@/shared/constants/uiClasses'
import {
  DashboardOutlined as DashboardOutlinedIcon,
  GridViewOutlined as GridViewOutlinedIcon,
  PeopleOutlineOutlined as PeopleOutlineOutlinedIcon,
  LockOutlined as LockOutlinedIcon,
  CalendarMonthOutlined as CalendarMonthOutlinedIcon,
  ChatBubbleOutlineOutlined as ChatBubbleOutlineOutlinedIcon,
  SettingsOutlined as SettingsOutlinedIcon,
  LogoutOutlined as LogoutOutlinedIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  VisibilityOutlined as VisibilityOutlinedIcon,
  EditOutlined as EditOutlinedIcon,
  PersonOutline as PersonOutlineIcon,
  AdminPanelSettingsOutlined as AdminPanelSettingsOutlinedIcon,
  ViewKanbanOutlined as ViewKanbanOutlinedIcon,
  ContactsOutlined as ContactsOutlinedIcon,
  FolderOpenOutlined as FolderOpenOutlinedIcon,
  EmailOutlined as EmailOutlinedIcon,
  FormatListBulletedOutlined as FormatListBulletedOutlinedIcon,
  HeadsetMicOutlined as HeadsetMicOutlinedIcon,
  NotificationsNoneOutlined as NotificationsNoneOutlinedIcon,
} from '@mui/icons-material'

const PRODUCTIVITY = [
  { id: 'calendar', label: 'Calendar', Icon: CalendarMonthOutlinedIcon },
  { id: 'kanban', label: 'Kanban Board', Icon: ViewKanbanOutlinedIcon },
  { id: 'chat', label: 'Chat', Icon: ChatBubbleOutlineOutlinedIcon },
  { id: 'contacts', label: 'Contacts', Icon: ContactsOutlinedIcon },
  { id: 'files', label: 'File Manager', Icon: FolderOpenOutlinedIcon },
  { id: 'email', label: 'Email', Icon: EmailOutlinedIcon },
  { id: 'todo', label: 'Todo List', Icon: FormatListBulletedOutlinedIcon },
]

const USER_CHILDREN = [
  { id: 'users-list', label: 'Users List', Icon: PeopleOutlineOutlinedIcon },
  { id: 'user-view', label: 'User View', Icon: VisibilityOutlinedIcon },
  { id: 'user-edit', label: 'User Edit', Icon: EditOutlinedIcon },
  { id: 'profile', label: 'Profile', Icon: PersonOutlineIcon },
  { id: 'settings-nav', label: 'Settings', Icon: SettingsOutlinedIcon },
  { id: 'roles', label: 'Roles & Permissions', Icon: AdminPanelSettingsOutlinedIcon },
]

const AUTH_CHILDREN = [
  { id: 'auth-login', label: 'Login' },
  { id: 'auth-register', label: 'Register' },
]

function SidebarChevron({ expanded = false }) {
  const Icon = expanded ? ExpandLessIcon : ExpandMoreIcon

  return (
    <span className={SIDEBAR_CHEVRON} aria-hidden="true">
      <Icon fontSize="inherit" />
    </span>
  )
}

function SidebarInner({
  railCollapsed,
  isMobile,
  activeId,
  onSelectNav,
  onOpenProfile,
}) {
  const { user } = useAuth()
  const navigate = useNavigate()
  const showLabels = isMobile || !railCollapsed
  const useTooltip = railCollapsed && !isMobile

  const [usersOpen, setUsersOpen] = useState(true)
  const [authOpen, setAuthOpen] = useState(false)

  function wrapTooltip(label, node) {
    if (!useTooltip) return node
    return (
      <Tooltip title={label} placement="right" arrow enterDelay={200}>
        {node}
      </Tooltip>
    )
  }

  const railNav = (
    <ul className="sidebar__list">
      {[
        { id: 'dashboard', label: 'Dashboard', Icon: DashboardOutlinedIcon },
        { id: 'users-list', label: 'Users', Icon: PeopleOutlineOutlinedIcon },
        { id: 'authentication', label: 'Authentication', Icon: LockOutlinedIcon },
        { id: 'calendar', label: 'Calendar', Icon: CalendarMonthOutlinedIcon },
        { id: 'chat', label: 'Chat', Icon: ChatBubbleOutlineOutlinedIcon },
      ].map(({ id, label, Icon }) => {
        const isActive = activeId === id
        return (
          <li key={id} className="sidebar__item">
            {wrapTooltip(
              label,
              <button
                type="button"
                className={`sidebar__link ${isActive ? 'sidebar__link--active' : ''}`}
                onClick={() => onSelectNav(id)}
              >
                <span className="sidebar__icon-wrap">
                  <Icon className="sidebar__icon" fontSize="small" />
                </span>
              </button>,
            )}
          </li>
        )
      })}
    </ul>
  )

  const fullNav = (
    <>
      <ul className="sidebar__list">
        <li className="sidebar__item">
          <button
            type="button"
            className={`sidebar__link ${activeId === 'dashboard' ? 'sidebar__link--active' : ''}`}
            onClick={() => onSelectNav('dashboard')}
          >
            <span className="sidebar__icon-wrap">
              <DashboardOutlinedIcon className="sidebar__icon" fontSize="small" />
            </span>
            <span className="sidebar__label">Dashboard</span>
          </button>
        </li>

        <li className="sidebar__item">
          <button
            type="button"
            className={`sidebar__link sidebar__link--parent group ${activeId === 'dashboards' ? 'sidebar__link--active' : ''}`}
            onClick={() => onSelectNav('dashboards')}
          >
            <span className="sidebar__icon-wrap sidebar__icon-wrap--badge">
              <Badge badgeContent={6} color="primary" className="sidebar__menu-badge">
                <GridViewOutlinedIcon className="sidebar__icon" fontSize="small" />
              </Badge>
            </span>
            <span className="sidebar__label">Dashboards</span>
            <SidebarChevron />
          </button>
        </li>

        <li className="sidebar__item">
          <button
            type="button"
            className="sidebar__link sidebar__link--parent group"
            onClick={() => setUsersOpen((v) => !v)}
          >
            <span className="sidebar__icon-wrap">
              <PeopleOutlineOutlinedIcon className="sidebar__icon" fontSize="small" />
            </span>
            <span className="sidebar__label">Users</span>
            <SidebarChevron expanded={usersOpen} />
          </button>
          <Collapse in={usersOpen} timeout="auto" unmountOnExit>
            <ul className="sidebar__sublist">
              {USER_CHILDREN.map(({ id, label, Icon }) => (
                <li key={id}>
                  <button
                    type="button"
                    className={`sidebar__sublink ${activeId === id ? 'sidebar__sublink--active' : ''}`}
                    onClick={() => onSelectNav(id)}
                  >
                    {Icon ? <Icon className="sidebar__subicon" fontSize="inherit" /> : null}
                    <span>{label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </Collapse>
        </li>

        <li className="sidebar__item">
          <button
            type="button"
            className="sidebar__link sidebar__link--parent group"
            onClick={() => setAuthOpen((v) => !v)}
          >
            <span className="sidebar__icon-wrap sidebar__icon-wrap--badge">
              <Badge badgeContent={7} color="primary" className="sidebar__menu-badge">
                <LockOutlinedIcon className="sidebar__icon" fontSize="small" />
              </Badge>
            </span>
            <span className="sidebar__label">Authentication</span>
            <SidebarChevron expanded={authOpen} />
          </button>
          <Collapse in={authOpen} timeout="auto" unmountOnExit>
            <ul className="sidebar__sublist">
              {AUTH_CHILDREN.map(({ id, label }) => (
                <li key={id}>
                  <button
                    type="button"
                    className={`sidebar__sublink ${activeId === id ? 'sidebar__sublink--active' : ''}`}
                    onClick={() => onSelectNav(id)}
                  >
                    <span>{label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </Collapse>
        </li>
      </ul>

      <p className="sidebar__section-label">Productivity apps</p>
      <ul className="sidebar__list">
        {PRODUCTIVITY.map(({ id, label, Icon }) => (
          <li key={id} className="sidebar__item">
            <button
              type="button"
              className={`sidebar__link ${activeId === id ? 'sidebar__link--active' : ''}`}
              onClick={() => onSelectNav(id)}
            >
              <span className="sidebar__icon-wrap">
                <Icon className="sidebar__icon" fontSize="small" />
              </span>
              <span className="sidebar__label">{label}</span>
            </button>
          </li>
        ))}
      </ul>
    </>
  )

  return (
    <div className={`sidebar__inner ${railCollapsed && !isMobile ? 'sidebar__inner--rail' : ''}`}>
      <nav className="sidebar__nav" aria-label="Main navigation">
        {!showLabels ? railNav : fullNav}
      </nav>

      <div className="sidebar__footer-wrap">
        <div
          className={[
            SIDEBAR_FOOTER_BAR,
            railCollapsed && !isMobile ? 'sidebar__footer-bar--rail' : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <button
            type="button"
            onClick={onOpenProfile}
            className={[
              'sidebar__footer-profile',
              railCollapsed && !isMobile
                ? 'sidebar__footer-profile--rail'
                : 'sidebar__footer-profile--expanded',
            ].join(' ')}
            aria-label="Open profile"
          >
            <UserAvatar
              initials={user?.initials || 'JD'}
              name={user?.name}
              size={railCollapsed && !isMobile ? 'md' : 'xl'}
            />
            {showLabels ? (
              <div className="sidebar__footer-text">
                <span className="sidebar__footer-name">{user?.name || 'John Doe'}</span>
                <span className="sidebar__footer-role">{user?.role || 'Product Admin'}</span>
              </div>
            ) : null}
          </button>
          {showLabels ? (
            <div className="sidebar__footer-actions">
              <Tooltip title="Settings">
                <IconButton
                  size="small"
                  className={SIDEBAR_FOOTER_ICON}
                  aria-label="Settings"
                  onClick={() => navigate(ROUTE_PATHS.users.settings)}
                >
                  <SettingsOutlinedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Log out">
                <IconButton size="small" className={SIDEBAR_FOOTER_ICON} aria-label="Log out">
                  <LogoutOutlinedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

const HOVER_EXPAND_LEAVE_MS = 200

export function Sidebar({ isMobile, railCollapsed, mobileOpen, onMobileClose, activeNavId, onNavChange, onOpenProfile }) {
  const drawerPaperClass = 'sidebar__drawer-paper'
  const [hoverExpand, setHoverExpand] = useState(false)
  const leaveTimerRef = useRef(null)

  const isRailMode = railCollapsed && !isMobile

  useEffect(() => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current)
      leaveTimerRef.current = null
    }
    setHoverExpand(false)
  }, [railCollapsed])

  useEffect(() => {
    return () => {
      if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current)
    }
  }, [])

  const handleAsideEnter = () => {
    if (!isRailMode) return
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current)
      leaveTimerRef.current = null
    }
    setHoverExpand(true)
  }

  const handleAsideLeave = () => {
    if (!isRailMode) return
    leaveTimerRef.current = setTimeout(() => {
      setHoverExpand(false)
      leaveTimerRef.current = null
    }, HOVER_EXPAND_LEAVE_MS)
  }

  const innerRailCollapsed = railCollapsed && !hoverExpand

  if (isMobile) {
    return (
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={onMobileClose}
        PaperProps={{ className: drawerPaperClass }}
        ModalProps={{ keepMounted: true }}
      >
        <SidebarInner
          railCollapsed={false}
          isMobile
          activeId={activeNavId}
          onSelectNav={(id) => {
            onNavChange(id)
            onMobileClose()
          }}
          onOpenProfile={onOpenProfile}
        />
      </Drawer>
    )
  }

  return (
    <aside
      className={[
        'sidebar',
        'sidebar--fixed',
        railCollapsed ? 'sidebar--collapsed' : '',
        isRailMode && hoverExpand ? 'sidebar--hover-expand' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      aria-label="Sidebar"
      onMouseEnter={handleAsideEnter}
      onMouseLeave={handleAsideLeave}
    >
      <SidebarInner
        railCollapsed={innerRailCollapsed}
        isMobile={false}
        activeId={activeNavId}
        onSelectNav={onNavChange}
        onOpenProfile={onOpenProfile}
      />
    </aside>
  )
}


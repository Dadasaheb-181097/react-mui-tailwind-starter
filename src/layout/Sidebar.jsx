import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Drawer from '@mui/material/Drawer'
import Badge from '@mui/material/Badge'
import Collapse from '@mui/material/Collapse'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import {
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  SettingsOutlined as SettingsOutlinedIcon,
  LogoutOutlined as LogoutOutlinedIcon,
} from '@mui/icons-material'
import { UserAvatar } from '@/components/ui/UserAvatar'
import { ROUTES } from '@/constants/routes'
import { SIDEBAR_CHEVRON, SIDEBAR_FOOTER_BAR, SIDEBAR_FOOTER_ICON } from '@/constants/uiClasses'
import { useAuth } from '@/hooks'
import { PRIMARY_NAV, PRODUCTIVITY_NAV, RAIL_NAV } from './navConfig'

const HOVER_EXPAND_LEAVE_MS = 200

function Chevron({ expanded }) {
  const Icon = expanded ? ExpandLessIcon : ExpandMoreIcon
  return (
    <span className={SIDEBAR_CHEVRON} aria-hidden="true">
      <Icon fontSize="inherit" />
    </span>
  )
}

function SidebarLink({ id, label, icon: Icon, activeId, onSelect, showLabel, badge, showChevron, tooltip }) {
  const isActive = activeId === id
  const button = (
    <button
      type="button"
      className={[
        'sidebar__link',
        isActive ? 'sidebar__link--active' : '',
        showChevron ? 'sidebar__link--parent group' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={() => onSelect(id)}
    >
      <span className={`sidebar__icon-wrap ${badge != null ? 'sidebar__icon-wrap--badge' : ''}`}>
        {badge != null ? (
          <Badge badgeContent={badge} color="primary" className="sidebar__menu-badge">
            <Icon className="sidebar__icon" fontSize="small" />
          </Badge>
        ) : (
          <Icon className="sidebar__icon" fontSize="small" />
        )}
      </span>
      {showLabel ? <span className="sidebar__label">{label}</span> : null}
      {showLabel && showChevron ? <Chevron /> : null}
    </button>
  )

  if (tooltip) {
    return (
      <Tooltip title={label} placement="right" arrow enterDelay={200}>
        {button}
      </Tooltip>
    )
  }

  return button
}

function SidebarGroup({ item, activeId, onSelect, showLabel }) {
  const [open, setOpen] = useState(item.defaultOpen ?? false)
  const Icon = item.icon

  return (
    <li className="sidebar__item">
      <button
        type="button"
        className="sidebar__link sidebar__link--parent group"
        onClick={() => setOpen((v) => !v)}
      >
        <span className={`sidebar__icon-wrap ${item.badge != null ? 'sidebar__icon-wrap--badge' : ''}`}>
          {item.badge != null ? (
            <Badge badgeContent={item.badge} color="primary" className="sidebar__menu-badge">
              <Icon className="sidebar__icon" fontSize="small" />
            </Badge>
          ) : (
            <Icon className="sidebar__icon" fontSize="small" />
          )}
        </span>
        {showLabel ? <span className="sidebar__label">{item.label}</span> : null}
        {showLabel ? <Chevron expanded={open} /> : null}
      </button>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <ul className="sidebar__sublist">
          {item.children.map(({ id, label, icon: ChildIcon }) => (
            <li key={id}>
              <button
                type="button"
                className={`sidebar__sublink ${activeId === id ? 'sidebar__sublink--active' : ''}`}
                onClick={() => onSelect(id)}
              >
                {ChildIcon ? <ChildIcon className="sidebar__subicon" fontSize="inherit" /> : null}
                <span>{label}</span>
              </button>
            </li>
          ))}
        </ul>
      </Collapse>
    </li>
  )
}

function SidebarFooter({ user, showLabels, railCollapsed, isMobile, onOpenProfile }) {
  const navigate = useNavigate()

  return (
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
                onClick={() => navigate(ROUTES.USERS_SETTINGS)}
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
  )
}

function SidebarNav({ railCollapsed, isMobile, activeId, onSelect, onOpenProfile }) {
  const { user } = useAuth()
  const showLabels = isMobile || !railCollapsed
  const useTooltip = railCollapsed && !isMobile

  const navItems = showLabels ? (
    <>
      <ul className="sidebar__list">
        {PRIMARY_NAV.map((item) =>
          item.type === 'group' ? (
            <SidebarGroup
              key={item.id}
              item={item}
              activeId={activeId}
              onSelect={onSelect}
              showLabel={showLabels}
            />
          ) : (
            <li key={item.id} className="sidebar__item">
              <SidebarLink
                id={item.id}
                label={item.label}
                icon={item.icon}
                activeId={activeId}
                onSelect={onSelect}
                showLabel={showLabels}
                badge={item.badge}
                showChevron={item.showChevron}
              />
            </li>
          ),
        )}
      </ul>

      <p className="sidebar__section-label">Productivity apps</p>
      <ul className="sidebar__list">
        {PRODUCTIVITY_NAV.map((item) => (
          <li key={item.id} className="sidebar__item">
            <SidebarLink
              id={item.id}
              label={item.label}
              icon={item.icon}
              activeId={activeId}
              onSelect={onSelect}
              showLabel={showLabels}
            />
          </li>
        ))}
      </ul>
    </>
  ) : (
    <ul className="sidebar__list">
      {RAIL_NAV.map((item) => (
        <li key={item.id} className="sidebar__item">
          <SidebarLink
            id={item.id}
            label={item.label}
            icon={item.icon}
            activeId={activeId}
            onSelect={onSelect}
            showLabel={false}
            tooltip={useTooltip}
          />
        </li>
      ))}
    </ul>
  )

  return (
    <div className={`sidebar__inner ${railCollapsed && !isMobile ? 'sidebar__inner--rail' : ''}`}>
      <nav className="sidebar__nav" aria-label="Main navigation">
        {navItems}
      </nav>
      <SidebarFooter
        user={user}
        showLabels={showLabels}
        railCollapsed={railCollapsed}
        isMobile={isMobile}
        onOpenProfile={onOpenProfile}
      />
    </div>
  )
}

export function Sidebar({
  isMobile,
  railCollapsed,
  mobileOpen,
  onMobileClose,
  activeNavId,
  onNavChange,
  onOpenProfile,
}) {
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

  useEffect(() => () => {
    if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current)
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
  const navProps = {
    railCollapsed: innerRailCollapsed,
    isMobile,
    activeId: activeNavId,
    onOpenProfile,
  }

  if (isMobile) {
    return (
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={onMobileClose}
        PaperProps={{ className: 'sidebar__drawer-paper' }}
        ModalProps={{ keepMounted: true }}
      >
        <SidebarNav
          {...navProps}
          railCollapsed={false}
          isMobile
          onSelect={(id) => {
            onNavChange(id)
            onMobileClose()
          }}
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
      <SidebarNav {...navProps} onSelect={onNavChange} />
    </aside>
  )
}

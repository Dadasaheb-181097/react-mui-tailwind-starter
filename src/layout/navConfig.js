import { ROUTES } from '@/constants/routes'
import {
  DashboardOutlined as DashboardOutlinedIcon,
  GridViewOutlined as GridViewOutlinedIcon,
  PeopleOutlineOutlined as PeopleOutlineOutlinedIcon,
  LockOutlined as LockOutlinedIcon,
  CalendarMonthOutlined as CalendarMonthOutlinedIcon,
  ChatBubbleOutlineOutlined as ChatBubbleOutlineOutlinedIcon,
  SettingsOutlined as SettingsOutlinedIcon,
  VisibilityOutlined as VisibilityOutlinedIcon,
  EditOutlined as EditOutlinedIcon,
  PersonOutline as PersonOutlineIcon,
  AdminPanelSettingsOutlined as AdminPanelSettingsOutlinedIcon,
  ViewKanbanOutlined as ViewKanbanOutlinedIcon,
  ContactsOutlined as ContactsOutlinedIcon,
  FolderOpenOutlined as FolderOpenOutlinedIcon,
  EmailOutlined as EmailOutlinedIcon,
  FormatListBulletedOutlined as FormatListBulletedOutlinedIcon,
} from '@mui/icons-material'

/** Sidebar nav id → route path */
export const NAV_ROUTES = {
  dashboard: ROUTES.HOME,
  dashboards: ROUTES.HOME,
  'users-list': ROUTES.USERS,
  'user-view': ROUTES.USERS_VIEW,
  'user-edit': ROUTES.USERS_EDIT,
  profile: ROUTES.USERS_PROFILE,
  'settings-nav': ROUTES.USERS_SETTINGS,
  roles: ROUTES.SETTINGS_ROLES,
  'auth-login': ROUTES.LOGIN,
  'auth-register': '/register',
  calendar: '/calendar',
  kanban: '/kanban',
  chat: ROUTES.CHAT,
  contacts: '/contacts',
  files: '/files',
  email: '/email',
  todo: '/todo',
  authentication: ROUTES.LOGIN,
}

export const RAIL_NAV = [
  { id: 'dashboard', label: 'Dashboard', icon: DashboardOutlinedIcon },
  { id: 'users-list', label: 'Users', icon: PeopleOutlineOutlinedIcon },
  { id: 'authentication', label: 'Authentication', icon: LockOutlinedIcon },
  { id: 'calendar', label: 'Calendar', icon: CalendarMonthOutlinedIcon },
  { id: 'chat', label: 'Chat', icon: ChatBubbleOutlineOutlinedIcon },
]

export const PRIMARY_NAV = [
  { type: 'link', id: 'dashboard', label: 'Dashboard', icon: DashboardOutlinedIcon },
  {
    type: 'link',
    id: 'dashboards',
    label: 'Dashboards',
    icon: GridViewOutlinedIcon,
    badge: 6,
    showChevron: true,
  },
  {
    type: 'group',
    id: 'users',
    label: 'Users',
    icon: PeopleOutlineOutlinedIcon,
    defaultOpen: true,
    children: [
      { id: 'users-list', label: 'Users List', icon: PeopleOutlineOutlinedIcon },
      { id: 'user-view', label: 'User View', icon: VisibilityOutlinedIcon },
      { id: 'user-edit', label: 'User Edit', icon: EditOutlinedIcon },
      { id: 'profile', label: 'Profile', icon: PersonOutlineIcon },
      { id: 'settings-nav', label: 'Settings', icon: SettingsOutlinedIcon },
      { id: 'roles', label: 'Roles & Permissions', icon: AdminPanelSettingsOutlinedIcon },
    ],
  },
  {
    type: 'group',
    id: 'authentication',
    label: 'Authentication',
    icon: LockOutlinedIcon,
    badge: 7,
    children: [
      { id: 'auth-login', label: 'Login' },
      { id: 'auth-register', label: 'Register' },
    ],
  },
]

export const PRODUCTIVITY_NAV = [
  { id: 'calendar', label: 'Calendar', icon: CalendarMonthOutlinedIcon },
  { id: 'kanban', label: 'Kanban Board', icon: ViewKanbanOutlinedIcon },
  { id: 'chat', label: 'Chat', icon: ChatBubbleOutlineOutlinedIcon },
  { id: 'contacts', label: 'Contacts', icon: ContactsOutlinedIcon },
  { id: 'files', label: 'File Manager', icon: FolderOpenOutlinedIcon },
  { id: 'email', label: 'Email', icon: EmailOutlinedIcon },
  { id: 'todo', label: 'Todo List', icon: FormatListBulletedOutlinedIcon },
]

/** Resolve active sidebar item from current pathname */
export function getActiveNavId(pathname) {
  if (pathname === ROUTES.CHAT) return 'chat'
  if (pathname === ROUTES.SETTINGS_ROLES) return 'roles'
  if (pathname === ROUTES.USERS_SETTINGS) return 'settings-nav'
  if (pathname === ROUTES.USERS_PROFILE) return 'profile'
  if (pathname === ROUTES.USERS_EDIT) return 'user-edit'
  if (pathname === ROUTES.USERS_VIEW) return 'user-view'
  if (/^\/users\/[^/]+\/edit$/.test(pathname)) return 'user-edit'
  if (/^\/users\/[^/]+$/.test(pathname)) return 'user-view'
  if (pathname === ROUTES.USERS) return 'users-list'
  if (pathname === ROUTES.LOGIN) return 'auth-login'
  if (pathname === '/register') return 'auth-register'
  return 'dashboard'
}

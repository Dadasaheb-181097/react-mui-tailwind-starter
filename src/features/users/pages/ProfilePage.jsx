import { Link } from 'react-router-dom'
import {
  BadgeOutlined as BadgeOutlinedIcon,
  ChevronRight as ChevronRightIcon,
  EmailOutlined as EmailOutlinedIcon,
  LockOutlined as LockOutlinedIcon,
  NotificationsOutlined as NotificationsOutlinedIcon,
  PersonOutline as PersonOutlineIcon,
  SettingsOutlined as SettingsOutlinedIcon,
  ShieldOutlined as ShieldOutlinedIcon,
} from '@mui/icons-material'
import { UserAvatar } from '@/shared/components/ui/UserAvatar'
import { useAuth } from '@/features/auth/AuthContext'
import { ROUTE_PATHS } from '@/app/routes/routePaths'

const PROFILE_OPTIONS = [
  {
    id: 'personal',
    title: 'Personal information',
    description: 'Update your name, contact details, and profile photo.',
    to: ROUTE_PATHS.users.settings,
    Icon: PersonOutlineIcon,
  },
  {
    id: 'account',
    title: 'Account settings',
    description: 'Manage language, timezone, and workspace preferences.',
    to: ROUTE_PATHS.users.settings,
    Icon: SettingsOutlinedIcon,
  },
  {
    id: 'security',
    title: 'Security & password',
    description: 'Change password, enable 2FA, and review active sessions.',
    to: ROUTE_PATHS.users.settings,
    Icon: LockOutlinedIcon,
  },
  {
    id: 'notifications',
    title: 'Notifications',
    description: 'Choose how you receive email, push, and in-app alerts.',
    to: ROUTE_PATHS.users.settings,
    Icon: NotificationsOutlinedIcon,
  },
  {
    id: 'roles',
    title: 'Roles & permissions',
    description: 'View your assigned role and access level in the workspace.',
    to: ROUTE_PATHS.settings.roles,
    Icon: ShieldOutlinedIcon,
  },
  {
    id: 'activity',
    title: 'Activity log',
    description: 'Review recent sign-ins and account activity history.',
    to: ROUTE_PATHS.users.settings,
    Icon: BadgeOutlinedIcon,
  },
]

const ACCOUNT_DETAILS = [
  { id: 'email', label: 'Work email', Icon: EmailOutlinedIcon },
  { id: 'role', label: 'Role', Icon: BadgeOutlinedIcon },
]

function ProfileOptionCard({ title, description, to, Icon }) {
  return (
    <Link
      to={to}
      className="group flex cursor-pointer items-start gap-4 rounded-xl border border-border bg-surface p-4 shadow-sm transition-all hover:border-primary-border hover:bg-primary-soft/40 hover:shadow-md"
    >
      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary">
        <Icon fontSize="small" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-bold text-text">{title}</span>
        <span className="mt-1 block text-xs leading-relaxed text-text-muted">{description}</span>
      </span>
      <ChevronRightIcon
        className="mt-0.5 shrink-0 text-text-caption opacity-0 transition-opacity group-hover:opacity-100"
        fontSize="small"
      />
    </Link>
  )
}

export function ProfilePage() {
  const { user } = useAuth()

  const name = user?.name || 'John Doe'
  const email = user?.email || 'john@example.com'
  const role = user?.role || 'Product Admin'
  const initials = user?.initials || 'JD'

  const detailValues = {
    email,
    role,
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-text">Profile</h1>
        <p className="mt-2 text-sm text-text-muted">
          Manage your personal information, security, and account preferences.
        </p>
      </div>

      <section className="mb-8 rounded-2xl border border-border bg-surface p-6 shadow-sm">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <UserAvatar initials={initials} name={name} size="md" className="size-20! text-lg!" />
          <div className="min-w-0 flex-1">
            <h2 className="text-xl font-bold text-text">{name}</h2>
            <p className="mt-1 text-sm text-text-muted">{email}</p>
            <span className="mt-3 inline-flex rounded-full bg-primary-soft px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
              {role}
            </span>
          </div>
          <Link
            to={ROUTE_PATHS.users.settings}
            className="inline-flex cursor-pointer items-center justify-center rounded-lg border border-primary-border bg-surface px-4 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary-soft"
          >
            Edit profile
          </Link>
        </div>
      </section>

      <section className="mb-8">
        <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-text-caption">Profile options</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {PROFILE_OPTIONS.map((option) => (
            <ProfileOptionCard key={option.id} {...option} />
          ))}
        </div>
      </section>

      <section>
        <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-text-caption">Account details</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {ACCOUNT_DETAILS.map(({ id, label, Icon }) => (
            <div
              key={id}
              className="flex items-center gap-3 rounded-xl border border-border bg-bg-page px-4 py-4"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-surface text-text-muted shadow-sm">
                <Icon fontSize="small" />
              </span>
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-wide text-text-caption">{label}</p>
                <p className="truncate text-sm font-semibold text-text">{detailValues[id]}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

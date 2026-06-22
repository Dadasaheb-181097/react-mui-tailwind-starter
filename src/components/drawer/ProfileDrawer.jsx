import Divider from '@mui/material/Divider'
import {
  EmailOutlined as EmailOutlinedIcon,
  BadgeOutlined as BadgeOutlinedIcon,
  SettingsOutlined as SettingsOutlinedIcon,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { UserAvatar } from '@/components/ui/UserAvatar'
import { useAuth } from '@/hooks'
import { ROUTES } from '@/constants/routes'
import { AppDrawer } from './AppDrawer'
import { DrawerGhostButton, DrawerOutlineButton } from './DrawerButton'

export function ProfileDrawer({ open, onClose }) {
  const { user } = useAuth()
  const navigate = useNavigate()

  const name = user?.name || 'John Doe'
  const email = user?.email || 'john@example.com'
  const role = user?.role || 'Product Admin'
  const initials = user?.initials || 'JD'

  const goTo = (path) => {
    onClose()
    navigate(path)
  }

  return (
    <AppDrawer open={open} onClose={onClose} title="Profile" width={380}>
      <div className="px-5 py-6">
        <div className="flex flex-col items-center rounded-lg border border-border bg-primary-soft px-4 py-6 text-center">
          <UserAvatar initials={initials} name={name} size="md" className="size-16! text-base!" />
          <h3 className="mt-4 text-lg font-bold text-text">{name}</h3>
          <p className="mt-1 text-sm text-text-muted">{email}</p>
          <span className="mt-2 inline-flex rounded-full bg-surface px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
            {role}
          </span>
        </div>

        <div className="mt-6 space-y-1">
          <DrawerGhostButton
            className="flex w-full items-center gap-3"
            onClick={() => goTo(ROUTES.USERS_PROFILE)}
          >
            <BadgeOutlinedIcon className="text-text-muted!" fontSize="small" />
            View profile
          </DrawerGhostButton>
          <DrawerGhostButton
            className="flex w-full items-center gap-3"
            onClick={() => goTo(ROUTES.USERS_SETTINGS)}
          >
            <SettingsOutlinedIcon className="text-text-muted!" fontSize="small" />
            Account settings
          </DrawerGhostButton>
        </div>

        <Divider sx={{ my: 3 }} />

        <div className="space-y-3">
          <div className="flex items-center gap-3 rounded-md border border-border bg-bg-page px-3 py-3">
            <EmailOutlinedIcon className="text-text-muted!" fontSize="small" />
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-wide text-text-caption">Work email</p>
              <p className="truncate text-sm font-semibold text-text">{email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-md border border-border bg-bg-page px-3 py-3">
            <BadgeOutlinedIcon className="text-text-muted!" fontSize="small" />
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-wide text-text-caption">Role</p>
              <p className="truncate text-sm font-semibold text-text">{role}</p>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <DrawerOutlineButton onClick={() => goTo(ROUTES.USERS_PROFILE)}>
            Open full profile
          </DrawerOutlineButton>
        </div>
      </div>
    </AppDrawer>
  )
}

import { useEffect, useState } from 'react'
import { Navigate, Outlet, useBlocker, useLocation } from 'react-router-dom'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { useAuth } from '@/store'
import { UnsavedChangesProvider, useUnsavedChanges } from '@/shared/context/UnsavedChangesContext'
import { ROUTE_PATHS } from './paths'

export function RequireAuth() {
  const { isAuthenticated } = useAuth()
  const location = useLocation()
  if (!isAuthenticated) return <Navigate to={ROUTE_PATHS.login} replace state={{ from: location }} />
  return <Outlet />
}

export function RequireRole({ roles, fallbackTo = ROUTE_PATHS.root }) {
  const { user } = useAuth()
  const allowed = roles.some((role) => (user?.roles ?? []).includes(role))
  if (!allowed) return <Navigate to={fallbackTo} replace />
  return <Outlet />
}

export function RedirectIfAuth({ to = ROUTE_PATHS.root }) {
  const { isAuthenticated } = useAuth()
  if (isAuthenticated) return <Navigate to={to} replace />
  return <Outlet />
}

function UnsavedChangesDialog() {
  const { isDirty, setDirty } = useUnsavedChanges()
  const blocker = useBlocker(isDirty)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(blocker.state === 'blocked')
  }, [blocker.state])

  return (
    <Dialog open={open} onClose={() => blocker.reset?.()} aria-labelledby="unsaved-dialog-title">
      <DialogTitle id="unsaved-dialog-title">Unsaved changes</DialogTitle>
      <DialogContent>
        <DialogContentText>You have unsaved changes. Leave this page and discard them?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => blocker.reset?.()}>Stay</Button>
        <Button
          onClick={() => {
            setDirty(false)
            blocker.proceed?.()
          }}
          color="error"
          variant="contained"
        >
          Leave
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export function UnsavedChangesGuard() {
  return (
    <UnsavedChangesProvider>
      <Outlet />
      <UnsavedChangesDialog />
    </UnsavedChangesProvider>
  )
}

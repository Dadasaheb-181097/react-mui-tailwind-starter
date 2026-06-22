import { useEffect, useRef, useState } from 'react'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { ROUTES } from '@/constants/routes'
import { UnsavedChangesProvider } from '@/features/users/unsavedChangesContext'
import { useAuth, useUnsavedChanges } from '@/hooks'

export function ProtectedRoute({ loginPath = ROUTES.LOGIN }) {
  const { isAuthenticated } = useAuth()
  const location = useLocation()
  if (!isAuthenticated) return <Navigate to={loginPath} replace state={{ from: location }} />
  return <Outlet />
}

export function RoleRoute({ roles, fallbackTo = ROUTES.HOME }) {
  const { user } = useAuth()
  const allowed = roles.some((role) => (user?.roles ?? []).includes(role))
  if (!allowed) return <Navigate to={fallbackTo} replace />
  return <Outlet />
}

function getLocationPath(location) {
  return `${location.pathname}${location.search}${location.hash}`
}

function UnsavedChangesDialog() {
  const { isDirty, isDirtyRef, setDirty } = useUnsavedChanges()
  const location = useLocation()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [pendingPath, setPendingPath] = useState(null)
  const allowedPath = useRef(getLocationPath(location))
  const skipNextBlockRef = useRef(false)

  useEffect(() => {
    const onBeforeUnload = (event) => {
      if (!isDirtyRef.current) return
      event.preventDefault()
      event.returnValue = ''
    }

    window.addEventListener('beforeunload', onBeforeUnload)
    return () => window.removeEventListener('beforeunload', onBeforeUnload)
  }, [isDirty, isDirtyRef])

  useEffect(() => {
    const currentPath = getLocationPath(location)

    if (skipNextBlockRef.current) {
      skipNextBlockRef.current = false
      allowedPath.current = currentPath
      return
    }

    if (!isDirtyRef.current) {
      allowedPath.current = currentPath
      setOpen(false)
      setPendingPath(null)
      return
    }

    if (currentPath !== allowedPath.current) {
      setPendingPath(currentPath)
      setOpen(true)
      skipNextBlockRef.current = true
      navigate(allowedPath.current, { replace: true })
    }
  }, [location, isDirty, isDirtyRef, navigate])

  const handleStay = () => {
    setOpen(false)
    setPendingPath(null)
  }

  const handleLeave = () => {
    const nextPath = pendingPath
    setOpen(false)
    setPendingPath(null)
    setDirty(false)

    if (nextPath) {
      skipNextBlockRef.current = true
      navigate(nextPath)
    }
  }

  return (
    <Dialog open={open} onClose={handleStay} aria-labelledby="unsaved-dialog-title">
      <DialogTitle id="unsaved-dialog-title">Unsaved changes</DialogTitle>
      <DialogContent>
        <DialogContentText>You have unsaved changes. Leave this page and discard them?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleStay}>Stay</Button>
        <Button onClick={handleLeave} color="error" variant="contained">
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

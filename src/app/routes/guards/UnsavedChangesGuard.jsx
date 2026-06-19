import { useEffect, useState } from 'react'
import { Outlet, useBlocker } from 'react-router-dom'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { UnsavedChangesProvider, useUnsavedChanges } from '@/shared/context/UnsavedChangesContext'

function UnsavedChangesDialog() {
  const { isDirty, setDirty } = useUnsavedChanges()
  const blocker = useBlocker(isDirty)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(blocker.state === 'blocked')
  }, [blocker.state])

  const handleStay = () => {
    blocker.reset?.()
    setOpen(false)
  }

  const handleLeave = () => {
    setDirty(false)
    blocker.proceed?.()
    setOpen(false)
  }

  return (
    <Dialog open={open} onClose={handleStay} aria-labelledby="unsaved-dialog-title">
      <DialogTitle id="unsaved-dialog-title">Unsaved changes</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You have unsaved changes. Leave this page and discard them?
        </DialogContentText>
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

function UnsavedChangesGuardInner() {
  return (
    <>
      <Outlet />
      <UnsavedChangesDialog />
    </>
  )
}

/** Wraps edit routes — blocks navigation when form has unsaved changes */
export function UnsavedChangesGuard() {
  return (
    <UnsavedChangesProvider>
      <UnsavedChangesGuardInner />
    </UnsavedChangesProvider>
  )
}

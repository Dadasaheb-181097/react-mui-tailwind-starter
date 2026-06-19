import { AppModal } from './AppModal'
import { Button } from '../ui/Button'

/**
 * @param {{ open: boolean, title?: string, message: string, confirmLabel?: string, cancelLabel?: string, onConfirm: Function, onCancel: Function, destructive?: boolean }} props
 */
export function ConfirmDialog({
  open,
  title = 'Confirm',
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  destructive = false,
}) {
  return (
    <AppModal
      open={open}
      onClose={onCancel}
      title={title}
      maxWidth="xs"
      actions={
        <>
          <Button onClick={onCancel} variant="outlined">
            {cancelLabel}
          </Button>
          <Button onClick={onConfirm} variant="contained" color={destructive ? 'error' : 'primary'}>
            {confirmLabel}
          </Button>
        </>
      }
    >
      {message}
    </AppModal>
  )
}

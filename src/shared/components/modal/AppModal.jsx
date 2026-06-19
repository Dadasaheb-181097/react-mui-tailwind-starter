import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

/**
 * @param {{ open: boolean, onClose: Function, title?: string, actions?: React.ReactNode, maxWidth?: string, children: React.ReactNode }} props
 */
export function AppModal({ open, onClose, title, actions, maxWidth = 'sm', children, ...props }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth={maxWidth} fullWidth {...props}>
      {title ? (
        <DialogTitle sx={{ pr: 6 }}>
          {title}
          <IconButton
            aria-label="Close"
            onClick={onClose}
            sx={{ position: 'absolute', right: 12, top: 12 }}
            size="small"
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </DialogTitle>
      ) : null}
      <DialogContent dividers>{children}</DialogContent>
      {actions ? <DialogActions>{actions}</DialogActions> : null}
    </Dialog>
  )
}

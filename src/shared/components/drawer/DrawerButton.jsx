import { AttachFileOutlined as AttachFileOutlinedIcon } from '@mui/icons-material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

const btn = { textTransform: 'none', fontWeight: 600 }

export function DrawerLinkButton({ muted = false, sx, ...props }) {
  return (
    <Button
      size="small"
      color="primary"
      sx={{ ...btn, fontSize: 12, color: muted ? 'text.secondary' : 'primary.main', ...sx }}
      {...props}
    />
  )
}

export function DrawerOutlineButton(props) {
  return <Button fullWidth variant="outlined" color="primary" sx={btn} {...props} />
}

export function DrawerFooterLink(props) {
  return <Button fullWidth color="primary" sx={btn} {...props} />
}

export function DrawerPrimaryButton(props) {
  return <Button size="small" variant="contained" sx={{ ...btn, fontSize: 12 }} {...props} />
}

export function DrawerSecondaryButton(props) {
  return (
    <Button size="small" variant="outlined" color="inherit" sx={{ ...btn, fontSize: 12 }} {...props} />
  )
}

export function DrawerGhostButton(props) {
  return (
    <Button
      fullWidth
      color="inherit"
      sx={{ ...btn, justifyContent: 'flex-start', gap: 1.5, py: 1.25, px: 1.5, borderRadius: 2 }}
      {...props}
    />
  )
}

export function DrawerAttachmentButton({ name, size, ...props }) {
  return (
    <Button
      fullWidth
      variant="outlined"
      color="inherit"
      startIcon={<AttachFileOutlinedIcon fontSize="small" />}
      sx={{ ...btn, mt: 1.5, justifyContent: 'flex-start', fontSize: 12 }}
      {...props}
    >
      <Box sx={{ minWidth: 0, textAlign: 'left' }}>
        {name ? <Box sx={{ fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis' }}>{name}</Box> : null}
        {size ? (
          <Box component="span" sx={{ display: 'block', fontSize: 11, color: 'text.secondary' }}>
            {size}
          </Box>
        ) : null}
      </Box>
    </Button>
  )
}

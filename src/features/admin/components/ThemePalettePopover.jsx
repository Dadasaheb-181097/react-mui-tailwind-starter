import { useState } from 'react'
import IconButton from '@mui/material/IconButton'
import Popover from '@mui/material/Popover'
import { PaletteOutlined as PaletteOutlinedIcon } from '@mui/icons-material'
import { ThemePickerPanel } from './ThemePickerPanel'

export function ThemePalettePopover({ iconButtonProps = {}, tooltipTitle = 'Themes & appearance' }) {
  const [anchor, setAnchor] = useState(null)
  const { className, onClick: onIconClick, ...restIconProps } = iconButtonProps
  const btnClass = className ?? 'navbar-icon-btn'

  const open = Boolean(anchor)

  return (
    <>
      <IconButton
        color="inherit"
        aria-label={tooltipTitle}
        aria-haspopup="dialog"
        aria-expanded={open ? 'true' : 'false'}
        className={btnClass}
        {...restIconProps}
        onClick={(e) => {
          onIconClick?.(e)
          if (e.defaultPrevented) return
          setAnchor(e.currentTarget)
        }}
      >
        <PaletteOutlinedIcon fontSize="inherit" />
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchor}
        onClose={() => setAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          elevation: 8,
          sx: { mt: 1, borderRadius: 2, border: '1px solid', borderColor: 'divider' },
        }}
      >
        <ThemePickerPanel />
      </Popover>
    </>
  )
}


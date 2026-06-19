import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Typography from '@mui/material/Typography'
import { Close as CloseIcon } from '@mui/icons-material'
import { NAV_ICON_BTN } from '@/shared/constants/uiClasses'

const tabSx = { textTransform: 'none', fontWeight: 600, fontSize: 12, minHeight: 40 }

export function AppDrawer({
  open,
  onClose,
  title,
  headerAction,
  headerInline = false,
  tabs,
  activeTab,
  onTabChange,
  footer,
  children,
  width = 400,
}) {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      ModalProps={{ sx: { zIndex: 1300 } }}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: width },
          maxWidth: '100vw',
          display: 'flex',
          flexDirection: 'column',
          borderLeft: '1px solid',
          borderColor: 'divider',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 1.5,
          px: 2.5,
          py: 2,
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Box sx={{ flex: 1, minWidth: 0 }}>
          {headerInline ? (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
              <Typography variant="h6" fontWeight={700}>
                {title}
              </Typography>
              {headerAction}
            </Box>
          ) : (
            <>
              <Typography variant="h6" fontWeight={700}>
                {title}
              </Typography>
              {headerAction}
            </>
          )}
        </Box>
        <IconButton aria-label="Close drawer" onClick={onClose} size="small" className={NAV_ICON_BTN}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      {tabs?.length ? (
        <Tabs
          value={activeTab}
          onChange={(_, value) => onTabChange?.(value)}
          variant="fullWidth"
          sx={{ minHeight: 40, px: 2, mb: 1.5 }}
        >
          {tabs.map((tab) => (
            <Tab
              key={tab.id}
              value={tab.id}
              label={`${tab.label}${tab.count != null ? ` (${tab.count})` : ''}`}
              sx={tabSx}
            />
          ))}
        </Tabs>
      ) : null}

      <Box sx={{ flex: 1, overflow: 'auto' }}>{children}</Box>

      {footer ? (
        <Box sx={{ px: 2.5, py: 2, borderTop: 1, borderColor: 'divider' }}>{footer}</Box>
      ) : null}
    </Drawer>
  )
}

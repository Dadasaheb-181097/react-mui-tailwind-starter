import { useMemo, useState } from 'react'
import { AttachFileOutlined as AttachFileOutlinedIcon } from '@mui/icons-material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Typography from '@mui/material/Typography'
import { UserAvatar } from '@/components/ui/UserAvatar'
import { AppDrawer } from './AppDrawer'
import { DrawerFooterLink } from './DrawerButton'
import { NOTIFICATIONS } from './drawerData'

const tabSx = {
  textTransform: 'none',
  fontWeight: 600,
  fontSize: 13,
  minHeight: 48,
  px: 0,
  mr: 3,
  minWidth: 'auto',
}

function TabLabel({ label, count, active }) {
  return (
    <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}>
      {label}
      {active && count > 0 ? (
        <Box
          component="span"
          sx={{
            width: 20,
            height: 20,
            borderRadius: '50%',
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            fontSize: 11,
            fontWeight: 700,
            lineHeight: 1,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {count}
        </Box>
      ) : null}
    </Box>
  )
}

function NotificationItem({ item }) {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1.5,
        px: 2.5,
        py: 2,
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
      <UserAvatar initials={item.initials} name={item.name} size="sm" />
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant="body2" lineHeight={1.5}>
          <Box component="span" fontWeight={700}>
            {item.name}
          </Box>{' '}
          <Box component="span" color="text.secondary">
            {item.message}
          </Box>
        </Typography>

        <Typography variant="caption" color="text.secondary" display="block" mt={0.5}>
          {item.time}
          {item.category ? ` • ${item.category}` : ''}
        </Typography>

        {item.attachment ? (
          <Box
            sx={{
              mt: 1.5,
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              p: 1,
              borderRadius: 1,
              border: 1,
              borderColor: 'divider',
              bgcolor: 'action.hover',
            }}
          >
            <Box
              sx={{
                width: 32,
                height: 32,
                flexShrink: 0,
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'background.paper',
                color: 'text.secondary',
              }}
            >
              <AttachFileOutlinedIcon sx={{ fontSize: 16 }} />
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <Typography variant="caption" fontWeight={600} noWrap display="block">
                {item.attachment.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {item.attachment.size}
              </Typography>
            </Box>
          </Box>
        ) : null}

        {item.replyPreview ? (
          <Box
            sx={{
              mt: 1.5,
              p: 1.5,
              borderRadius: 1,
              bgcolor: 'action.hover',
              display: 'flex',
              alignItems: 'flex-start',
              gap: 1,
            }}
          >
            <Typography variant="caption" color="text.secondary" sx={{ flex: 1, lineHeight: 1.5 }}>
              {item.replyPreview}
            </Typography>
            <Button size="small" variant="contained" sx={{ textTransform: 'none', fontWeight: 600, fontSize: 12, flexShrink: 0 }}>
              Reply
            </Button>
          </Box>
        ) : null}

        {item.actions?.includes('accept') ? (
          <Stack direction="row" spacing={1} mt={1.5}>
            <Button size="small" variant="contained" sx={{ textTransform: 'none', fontWeight: 600, fontSize: 12 }}>
              Accept
            </Button>
            <Button size="small" variant="outlined" color="inherit" sx={{ textTransform: 'none', fontWeight: 600, fontSize: 12 }}>
              Decline
            </Button>
          </Stack>
        ) : null}
      </Box>

      {item.unread ? (
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            bgcolor: 'primary.main',
            mt: 0.75,
            flexShrink: 0,
          }}
        />
      ) : null}
    </Box>
  )
}

export function NotificationDrawer({ open, onClose }) {
  const [activeTab, setActiveTab] = useState('all')

  const tabs = useMemo(
    () => [
      { id: 'all', label: 'All', count: NOTIFICATIONS.length },
      { id: 'unread', label: 'Unread', count: NOTIFICATIONS.filter((n) => n.unread).length },
      { id: 'mentions', label: 'Mentions', count: NOTIFICATIONS.filter((n) => n.mention).length },
    ],
    [],
  )

  const items = useMemo(() => {
    if (activeTab === 'unread') return NOTIFICATIONS.filter((n) => n.unread)
    if (activeTab === 'mentions') return NOTIFICATIONS.filter((n) => n.mention)
    return NOTIFICATIONS
  }, [activeTab])

  const unreadTotal = NOTIFICATIONS.filter((n) => n.unread).length

  return (
    <AppDrawer
      open={open}
      onClose={onClose}
      title="Notification"
      width={420}
      headerInline
      headerAction={
        unreadTotal > 0 ? (
          <Button size="small" color="primary" sx={{ textTransform: 'none', fontWeight: 600, fontSize: 13, whiteSpace: 'nowrap' }}>
            Make all as read
          </Button>
        ) : null
      }
      footer={<DrawerFooterLink>View All Notifications</DrawerFooterLink>}
    >
      <Tabs
        value={activeTab}
        onChange={(_, value) => setActiveTab(value)}
        sx={{ px: 2.5, borderBottom: 1, borderColor: 'divider', minHeight: 48 }}
      >
        {tabs.map((tab) => (
          <Tab
            key={tab.id}
            value={tab.id}
            label={<TabLabel label={tab.label} count={tab.count} active={tab.id === activeTab} />}
            sx={tabSx}
          />
        ))}
      </Tabs>

      {items.length === 0 ? (
        <Box sx={{ py: 6, px: 3, textAlign: 'center' }}>
          <Typography variant="body2" fontWeight={600}>
            No notifications
          </Typography>
          <Typography variant="caption" color="text.secondary">
            You are all caught up in this tab.
          </Typography>
        </Box>
      ) : (
        <Box>
          {items.map((item) => (
            <NotificationItem key={item.id} item={item} />
          ))}
        </Box>
      )}
    </AppDrawer>
  )
}

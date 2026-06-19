import { useMemo, useState } from 'react'
import {
  ChatBubbleOutlineOutlined as ChatBubbleOutlineOutlinedIcon,
  GroupsOutlined as GroupsOutlinedIcon,
  SearchOutlined as SearchOutlinedIcon,
  Star as StarIcon,
} from '@mui/icons-material'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import InputAdornment from '@mui/material/InputAdornment'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { UserAvatar } from '@/shared/components/ui/UserAvatar'
import { AppDrawer } from './AppDrawer'
import { DrawerFooterLink } from './DrawerButton'
import { CHAT_THREADS } from './drawerData'

const tabSx = {
  textTransform: 'none',
  fontWeight: 600,
  fontSize: 13,
  minHeight: 48,
  px: 0,
  mr: 2.5,
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

function filterThreads(threads, activeTab) {
  if (activeTab === 'unread') return threads.filter((thread) => thread.unread)
  if (activeTab === 'favorites') return threads.filter((thread) => thread.favorite)
  if (activeTab === 'group') return threads.filter((thread) => thread.group)
  return threads
}

function ThreadItem({ thread, selected, onSelect }) {
  return (
    <Box
      component="button"
      type="button"
      onClick={() => onSelect(thread.id)}
      sx={{
        position: 'relative',
        display: 'flex',
        width: '100%',
        gap: 1.5,
        px: 2.5,
        py: 1.75,
        border: 0,
        borderBottom: 1,
        borderColor: 'divider',
        bgcolor: thread.unread ? 'action.selected' : 'transparent',
        textAlign: 'left',
        cursor: 'pointer',
        outline: selected ? '1px solid' : 'none',
        outlineColor: 'primary.light',
        outlineOffset: -1,
        '&:hover': { bgcolor: 'action.hover' },
      }}
    >
      {thread.unread ? (
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            top: 14,
            bottom: 14,
            width: 3,
            borderRadius: '0 4px 4px 0',
            bgcolor: 'primary.main',
          }}
        />
      ) : null}

      <Box sx={{ position: 'relative', flexShrink: 0 }}>
        <UserAvatar initials={thread.initials} name={thread.name} size="sm" />
        <Box
          sx={{
            position: 'absolute',
            right: 0,
            bottom: 0,
            width: 10,
            height: 10,
            borderRadius: '50%',
            border: 2,
            borderColor: 'background.paper',
            bgcolor: thread.online ? 'success.main' : 'action.disabled',
          }}
        />
      </Box>

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, minWidth: 0 }}>
            <Typography variant="body2" fontWeight={thread.unread ? 700 : 600} noWrap>
              {thread.name}
            </Typography>
            {thread.group ? <GroupsOutlinedIcon sx={{ fontSize: 14, color: 'text.secondary' }} /> : null}
            {thread.favorite ? <StarIcon sx={{ fontSize: 13, color: 'warning.main' }} /> : null}
          </Box>
          <Typography variant="caption" color="text.secondary" sx={{ flexShrink: 0 }}>
            {thread.time}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 1, mt: 0.5 }}>
          <Typography
            variant="caption"
            color={thread.unread ? 'text.primary' : 'text.secondary'}
            fontWeight={thread.unread ? 500 : 400}
            sx={{
              flex: 1,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              lineHeight: 1.5,
            }}
          >
            {thread.preview}
          </Typography>
          {thread.unread && thread.unreadCount > 0 ? (
            <Badge
              badgeContent={thread.unreadCount}
              color="primary"
              sx={{ '& .MuiBadge-badge': { fontSize: 10, fontWeight: 700, minWidth: 18, height: 18 } }}
            />
          ) : null}
        </Box>
      </Box>
    </Box>
  )
}

export function ChatDrawer({ open, onClose }) {
  const [activeTab, setActiveTab] = useState('all')
  const [search, setSearch] = useState('')
  const [activeThreadId, setActiveThreadId] = useState(null)

  const tabs = useMemo(
    () => [
      { id: 'all', label: 'All', count: CHAT_THREADS.length },
      { id: 'unread', label: 'Unread', count: CHAT_THREADS.filter((t) => t.unread).length },
      { id: 'favorites', label: 'Favorites', count: CHAT_THREADS.filter((t) => t.favorite).length },
      { id: 'group', label: 'Group', count: CHAT_THREADS.filter((t) => t.group).length },
    ],
    [],
  )

  const threads = useMemo(() => {
    const query = search.trim().toLowerCase()
    let list = filterThreads(CHAT_THREADS, activeTab)

    if (query) {
      list = list.filter(
        (thread) =>
          thread.name.toLowerCase().includes(query) ||
          thread.preview.toLowerCase().includes(query),
      )
    }

    return list
  }, [activeTab, search])

  const unreadTotal = CHAT_THREADS.filter((thread) => thread.unread).length

  return (
    <AppDrawer
      open={open}
      onClose={onClose}
      title="Messages"
      width={420}
      headerInline
      headerAction={
        unreadTotal > 0 ? (
          <Button size="small" color="primary" sx={{ textTransform: 'none', fontWeight: 600, fontSize: 13, whiteSpace: 'nowrap' }}>
            Mark all as read
          </Button>
        ) : null
      }
      footer={<DrawerFooterLink>View all messages</DrawerFooterLink>}
    >
      <Tabs
        value={activeTab}
        onChange={(_, value) => setActiveTab(value)}
        variant="scrollable"
        scrollButtons={false}
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

      <Box sx={{ px: 2.5, py: 1.5 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search conversations..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlinedIcon fontSize="small" color="disabled" />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              bgcolor: 'action.hover',
              fontSize: 13,
            },
          }}
        />
      </Box>

      {threads.length > 0 ? (
        <Box>
          {threads.map((thread) => (
            <ThreadItem
              key={thread.id}
              thread={thread}
              selected={activeThreadId === thread.id}
              onSelect={setActiveThreadId}
            />
          ))}
        </Box>
      ) : (
        <Box sx={{ py: 6, px: 3, textAlign: 'center' }}>
          <Box
            sx={{
              width: 56,
              height: 56,
              mx: 'auto',
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'action.hover',
              color: 'text.secondary',
            }}
          >
            <ChatBubbleOutlineOutlinedIcon />
          </Box>
          <Typography variant="body2" fontWeight={600} mt={2}>
            No conversations found
          </Typography>
          <Typography variant="caption" color="text.secondary" display="block" mt={0.5}>
            {search.trim()
              ? 'Try a different search term or clear the filter.'
              : 'There are no messages in this category right now.'}
          </Typography>
        </Box>
      )}
    </AppDrawer>
  )
}

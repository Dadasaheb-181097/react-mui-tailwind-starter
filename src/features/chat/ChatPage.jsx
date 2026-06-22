import { useMemo, useState } from 'react'
import {
  ArrowBackOutlined as ArrowBackOutlinedIcon,
  DoneAllOutlined as DoneAllOutlinedIcon,
  InfoOutlined as InfoOutlinedIcon,
  MoreVertOutlined as MoreVertOutlinedIcon,
  PhoneOutlined as PhoneOutlinedIcon,
  SearchOutlined as SearchOutlinedIcon,
  SendRounded as SendRoundedIcon,
  VideocamOutlined as VideocamOutlinedIcon,
} from '@mui/icons-material'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { NAV_ICON_BTN } from '@/constants/uiClasses'
import { UserAvatar } from '@/components/ui/UserAvatar'
import { CHAT_CONTACTS, getMessagesForContact } from './data/chatData'

const searchFieldSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: 2,
    fontSize: 13,
    bgcolor: 'var(--color-navbar-search-bg)',
    '& fieldset': { borderColor: 'transparent' },
    '&:hover fieldset': { borderColor: 'var(--color-primary-border)' },
    '&.Mui-focused fieldset': { borderColor: 'var(--color-primary-border)' },
  },
}

function ContactItem({ contact, active, onSelect }) {
  return (
    <Box
      component="button"
      type="button"
      onClick={() => onSelect(contact.id)}
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        width: '100%',
        px: 2,
        py: 1.75,
        border: 0,
        borderBottom: '1px solid',
        borderColor: 'divider',
        bgcolor: active ? 'var(--color-primary-soft)' : 'transparent',
        textAlign: 'left',
        cursor: 'pointer',
        transition: 'background-color 0.15s ease',
        '&:hover': { bgcolor: active ? 'var(--color-primary-soft)' : 'action.hover' },
      }}
    >
      {active ? (
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            top: 10,
            bottom: 10,
            width: 3,
            borderRadius: '0 4px 4px 0',
            bgcolor: 'primary.main',
          }}
        />
      ) : null}

      <Box sx={{ position: 'relative', flexShrink: 0, pl: active ? 0.5 : 0 }}>
        <UserAvatar initials={contact.initials} name={contact.name} size="sm" />
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
            bgcolor: contact.online ? 'success.main' : 'action.disabled',
          }}
        />
      </Box>

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant="body2" fontWeight={active ? 700 : 600} noWrap color="text.primary">
          {contact.name}
        </Typography>
        <Typography variant="caption" color="text.secondary" noWrap display="block" sx={{ mt: 0.25 }}>
          {contact.role}
        </Typography>
      </Box>

      <Box sx={{ textAlign: 'right', flexShrink: 0, minWidth: 52 }}>
        <Typography variant="caption" color="text.secondary" display="block" fontWeight={500}>
          {contact.time}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 0.75 }}>
          {contact.unread ? (
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'primary.main' }} />
          ) : (
            <DoneAllOutlinedIcon sx={{ fontSize: 15, color: 'primary.main', opacity: 0.7 }} />
          )}
        </Box>
      </Box>
    </Box>
  )
}

function MessageBubble({ message, contact, showAvatar }) {
  const isMine = message.from === 'me'

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isMine ? 'row-reverse' : 'row',
        alignItems: 'flex-end',
        gap: 1.25,
        mb: 2.5,
      }}
    >
      <Box sx={{ width: 34, flexShrink: 0 }}>
        {showAvatar ? (
          <UserAvatar
            initials={isMine ? 'JD' : contact.initials}
            name={isMine ? 'You' : contact.name}
            size="sm"
          />
        ) : null}
      </Box>

      <Box sx={{ maxWidth: { xs: '82%', sm: '70%', md: '58%' } }}>
        <Box
          sx={{
            px: 2,
            py: 1.25,
            boxShadow: isMine ? 'none' : '0 1px 2px rgba(15, 23, 42, 0.06)',
            border: isMine ? 'none' : '1px solid',
            borderColor: isMine ? 'transparent' : 'divider',
            borderRadius: isMine ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
            bgcolor: isMine ? 'primary.main' : 'background.paper',
            color: isMine ? 'primary.contrastText' : 'text.primary',
          }}
        >
          <Typography variant="body2" sx={{ lineHeight: 1.6, fontSize: 13.5 }}>
            {message.text}
          </Typography>
        </Box>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: 'block', mt: 0.75, textAlign: 'center', fontSize: 11 }}
        >
          {message.time}
        </Typography>
      </Box>
    </Box>
  )
}

function HeaderAction({ children }) {
  return (
    <IconButton size="small" className={NAV_ICON_BTN}>
      {children}
    </IconButton>
  )
}

export function ChatPage() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [search, setSearch] = useState('')
  const [activeId, setActiveId] = useState('2')
  const [draft, setDraft] = useState('')
  const [messagesByContact, setMessagesByContact] = useState(() =>
    Object.fromEntries(CHAT_CONTACTS.map((c) => [c.id, getMessagesForContact(c.id)])),
  )

  const contacts = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return CHAT_CONTACTS
    return CHAT_CONTACTS.filter(
      (c) =>
        c.name.toLowerCase().includes(query) ||
        c.role.toLowerCase().includes(query),
    )
  }, [search])

  const activeContact = CHAT_CONTACTS.find((c) => c.id === activeId) || CHAT_CONTACTS[0]
  const messages = messagesByContact[activeContact.id] || []
  const unreadCount = CHAT_CONTACTS.filter((c) => c.unread).length

  const showList = !isMobile || activeId === null
  const showChat = !isMobile || activeId !== null

  const sendMessage = () => {
    const text = draft.trim()
    if (!text) return

    const newMessage = {
      id: `local-${Date.now()}`,
      from: 'me',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    setMessagesByContact((prev) => ({
      ...prev,
      [activeContact.id]: [...(prev[activeContact.id] || []), newMessage],
    }))
    setDraft('')
  }

  return (
    <Box
      sx={{
        mx: { xs: -1, lg: -3 },
        mt: -1,
        height: { md: 'calc(100vh - var(--layout-navbar-height) - 92px)' },
        minHeight: { xs: 520, md: 560 },
      }}
    >
      <Paper
        variant="outlined"
        sx={{
          display: 'flex',
          height: '100%',
          borderRadius: 0,
          overflow: 'hidden',
          bgcolor: 'background.paper',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        {showList ? (
          <Box
            sx={{
              width: { xs: '100%', md: 340 },
              flexShrink: 0,
              display: 'flex',
              flexDirection: 'column',
              bgcolor: 'background.paper',
            }}
          >
            <Box sx={{ px: 2.5, py: 2.25, borderBottom: 1, borderColor: 'divider' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.75 }}>
                <Typography variant="h6" fontWeight={700} letterSpacing="-0.01em">
                  Messages
                </Typography>
                <Box
                  sx={{
                    minWidth: 22,
                    height: 22,
                    px: 0.75,
                    borderRadius: 10,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    fontSize: 11,
                    fontWeight: 700,
                  }}
                >
                  {unreadCount}
                </Box>
              </Box>
              <TextField
                fullWidth
                size="small"
                placeholder="Search contacts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchOutlinedIcon fontSize="small" color="disabled" />
                    </InputAdornment>
                  ),
                }}
                sx={searchFieldSx}
              />
            </Box>

            <Box sx={{ flex: 1, overflow: 'auto' }}>
              {contacts.map((contact) => (
                <ContactItem
                  key={contact.id}
                  contact={contact}
                  active={contact.id === activeId}
                  onSelect={setActiveId}
                />
              ))}
            </Box>
          </Box>
        ) : null}

        {showChat ? (
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 2,
                px: 2.5,
                py: 1.75,
                borderBottom: 1,
                borderColor: 'divider',
                bgcolor: 'var(--color-table-header-bg)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, minWidth: 0 }}>
                {isMobile ? (
                  <IconButton size="small" onClick={() => setActiveId(null)} sx={{ mr: 0.25 }}>
                    <ArrowBackOutlinedIcon fontSize="small" />
                  </IconButton>
                ) : null}
                <Box sx={{ position: 'relative' }}>
                  <UserAvatar initials={activeContact.initials} name={activeContact.name} size="md" />
                  <Box
                    sx={{
                      position: 'absolute',
                      right: 0,
                      bottom: 0,
                      width: 11,
                      height: 11,
                      borderRadius: '50%',
                      border: 2,
                      borderColor: 'background.paper',
                      bgcolor: activeContact.online ? 'success.main' : 'action.disabled',
                    }}
                  />
                </Box>
                <Box sx={{ minWidth: 0 }}>
                  <Typography variant="subtitle1" fontWeight={700} noWrap lineHeight={1.2}>
                    {activeContact.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" display="block">
                    {activeContact.role}
                  </Typography>
                  <Typography variant="caption" color="success.main" fontWeight={600}>
                    {activeContact.online ? 'Active now' : 'Offline'}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, flexShrink: 0 }}>
                <HeaderAction>
                  <PhoneOutlinedIcon fontSize="small" />
                </HeaderAction>
                <HeaderAction>
                  <VideocamOutlinedIcon fontSize="small" />
                </HeaderAction>
                <HeaderAction>
                  <InfoOutlinedIcon fontSize="small" />
                </HeaderAction>
                <HeaderAction>
                  <MoreVertOutlinedIcon fontSize="small" />
                </HeaderAction>
              </Box>
            </Box>

            <Box
              sx={{
                flex: 1,
                overflow: 'auto',
                px: { xs: 2, md: 4 },
                py: 3,
                bgcolor: 'var(--color-bg-page)',
              }}
            >
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  display: 'block',
                  textAlign: 'center',
                  mb: 2.5,
                  fontWeight: 600,
                  letterSpacing: 0.4,
                  textTransform: 'uppercase',
                }}
              >
                Today
              </Typography>

              {messages.map((message, index) => {
                const prev = messages[index - 1]
                const showAvatar = !prev || prev.from !== message.from
                return (
                  <MessageBubble
                    key={message.id}
                    message={message}
                    contact={activeContact}
                    showAvatar={showAvatar}
                  />
                )
              })}
            </Box>

            <Box
              sx={{
                px: 2.5,
                py: 2,
                borderTop: 1,
                borderColor: 'divider',
                bgcolor: 'background.paper',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  gap: 1,
                  p: 1,
                  borderRadius: 2,
                  border: 1,
                  borderColor: 'divider',
                  bgcolor: 'var(--color-bg-page)',
                }}
              >
                <TextField
                  fullWidth
                  multiline
                  maxRows={4}
                  placeholder="Type your message..."
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      sendMessage()
                    }
                  }}
                  variant="standard"
                  InputProps={{ disableUnderline: true }}
                  sx={{
                    px: 1,
                    '& .MuiInputBase-input': { fontSize: 14, py: 0.75 },
                  }}
                />
                <IconButton
                  onClick={sendMessage}
                  disabled={!draft.trim()}
                  sx={{
                    width: 38,
                    height: 38,
                    borderRadius: 1.5,
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    '&:hover': { bgcolor: 'primary.dark' },
                    '&.Mui-disabled': { bgcolor: 'action.disabledBackground', color: 'text.disabled' },
                  }}
                >
                  <SendRoundedIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          </Box>
        ) : null}
      </Paper>
    </Box>
  )
}

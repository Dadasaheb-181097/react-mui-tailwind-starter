import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  EditOutlined as EditOutlinedIcon,
  FilterListOutlined as FilterListOutlinedIcon,
  MoreHorizOutlined as MoreHorizOutlinedIcon,
  PersonOutlineOutlined as PersonOutlineOutlinedIcon,
  SearchOutlined as SearchOutlinedIcon,
  ShieldOutlined as ShieldOutlinedIcon,
  VisibilityOutlined as VisibilityOutlinedIcon,
} from '@mui/icons-material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Pagination from '@mui/material/Pagination'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Tab from '@mui/material/Tab'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Tabs from '@mui/material/Tabs'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { ROUTE_PATHS } from '@/app/routes/routePaths'
import { UserAvatar } from '@/shared/components/ui/UserAvatar'

const ROWS_PER_PAGE = 8

const STATUS_TABS = [
  { id: 'all', label: 'All' },
  { id: 'active', label: 'Active' },
  { id: 'pending', label: 'Pending' },
  { id: 'inactive', label: 'Inactive' },
]

const ROLE_OPTIONS = ['All roles', 'Admin', 'Manager', 'User']

const headerCellSx = {
  fontWeight: 700,
  fontSize: 11,
  color: 'text.secondary',
  letterSpacing: 0.6,
  py: 1.5,
  bgcolor: 'var(--color-table-header-bg)',
  borderBottom: 1,
  borderColor: 'var(--color-table-header-border)',
}

function normalizeRole(role) {
  if (role === 'Product Admin') return 'Admin'
  return role
}

function roleStyle(role) {
  const key = normalizeRole(role)
  if (key === 'Admin') {
    return {
      bgcolor: 'var(--color-role-admin-bg)',
      color: 'var(--color-role-admin)',
      Icon: ShieldOutlinedIcon,
    }
  }
  if (key === 'Manager') {
    return {
      bgcolor: 'var(--color-role-manager-bg)',
      color: 'var(--color-role-manager)',
      Icon: PersonOutlineOutlinedIcon,
    }
  }
  return {
    bgcolor: 'var(--color-role-user-bg)',
    color: 'var(--color-role-user)',
    Icon: PersonOutlineOutlinedIcon,
  }
}

function statusColor(status) {
  if (status === 'Active') return 'success.main'
  if (status === 'Pending') return 'warning.main'
  return 'text.disabled'
}

function RoleBadge({ role }) {
  const { bgcolor, color, Icon } = roleStyle(role)
  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.75,
        px: 1.25,
        py: 0.5,
        borderRadius: 1.5,
        bgcolor,
        color,
        fontSize: 12,
        fontWeight: 500,
        lineHeight: 1,
      }}
    >
      <Icon sx={{ fontSize: 14, opacity: 0.85 }} />
      {normalizeRole(role)}
    </Box>
  )
}

function StatusLabel({ status }) {
  return (
    <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}>
      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: statusColor(status) }} />
      <Typography variant="body2" sx={{ color: statusColor(status), fontWeight: 500 }}>
        {status}
      </Typography>
    </Box>
  )
}

function UserCell({ user }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
      <Box sx={{ position: 'relative', flexShrink: 0 }}>
        <UserAvatar initials={user.initials} name={user.name} size="sm" />
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
            bgcolor: user.online ? 'success.main' : 'action.disabled',
          }}
        />
      </Box>
      <Box sx={{ minWidth: 0 }}>
        <Typography variant="body2" fontWeight={700} noWrap>
          {user.name}
        </Typography>
        <Typography variant="caption" color="text.secondary" noWrap display="block">
          {user.email}
        </Typography>
      </Box>
    </Box>
  )
}

function ActionButtons({ user, mode }) {
  return (
    <Stack direction="row" spacing={0.5} justifyContent="flex-end">
      {(mode === 'list' || mode === 'view') && (
        <Tooltip title="View">
          <IconButton
            component={Link}
            to={ROUTE_PATHS.users.detail(user.id)}
            size="small"
            sx={{ borderRadius: 1.5, color: 'text.secondary' }}
          >
            <VisibilityOutlinedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      )}
      {(mode === 'list' || mode === 'edit') && (
        <Tooltip title="Edit">
          <IconButton
            component={Link}
            to={ROUTE_PATHS.users.editDetail(user.id)}
            size="small"
            sx={{ borderRadius: 1.5, color: 'text.secondary' }}
          >
            <EditOutlinedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      )}
      {mode === 'list' && (
        <Tooltip title="More">
          <IconButton size="small" sx={{ borderRadius: 1.5, color: 'text.secondary' }}>
            <MoreHorizOutlinedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      )}
    </Stack>
  )
}

/**
 * @param {{ users: Array, mode?: 'list' | 'view' | 'edit' }} props
 */
export function UsersTable({ users, mode = 'list' }) {
  const [statusTab, setStatusTab] = useState('all')
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('All roles')
  const [roleMenuAnchor, setRoleMenuAnchor] = useState(null)
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState([])

  const tabCounts = useMemo(
    () => ({
      all: users.length,
      active: users.filter((u) => u.status === 'Active').length,
      pending: users.filter((u) => u.status === 'Pending').length,
      inactive: users.filter((u) => u.status === 'Inactive').length,
    }),
    [users],
  )

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase()

    return users.filter((user) => {
      if (statusTab === 'active' && user.status !== 'Active') return false
      if (statusTab === 'pending' && user.status !== 'Pending') return false
      if (statusTab === 'inactive' && user.status !== 'Inactive') return false

      if (roleFilter !== 'All roles' && normalizeRole(user.role) !== roleFilter) return false

      if (!query) return true

      return (
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        normalizeRole(user.role).toLowerCase().includes(query)
      )
    })
  }, [users, statusTab, roleFilter, search])

  const pageCount = Math.max(1, Math.ceil(filteredUsers.length / ROWS_PER_PAGE))
  const currentPage = Math.min(page, pageCount)
  const pageUsers = filteredUsers.slice((currentPage - 1) * ROWS_PER_PAGE, currentPage * ROWS_PER_PAGE)

  const pageIds = pageUsers.map((u) => u.id)
  const allPageSelected = pageIds.length > 0 && pageIds.every((id) => selected.includes(id))
  const somePageSelected = pageIds.some((id) => selected.includes(id))

  const toggleAll = () => {
    if (allPageSelected) {
      setSelected((prev) => prev.filter((id) => !pageIds.includes(id)))
    } else {
      setSelected((prev) => [...new Set([...prev, ...pageIds])])
    }
  }

  const toggleOne = (id) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const showToolbar = mode === 'list'
  const showPagination = mode === 'list'
  const displayUsers = showPagination ? pageUsers : filteredUsers.slice(0, ROWS_PER_PAGE)

  const rangeStart = filteredUsers.length === 0 ? 0 : (currentPage - 1) * ROWS_PER_PAGE + 1
  const rangeEnd = Math.min(currentPage * ROWS_PER_PAGE, filteredUsers.length)

  return (
    <Paper variant="outlined" sx={{ borderRadius: "3px" }}>
      {showToolbar ? (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
            px: 2,
            pt: 1.5,
            borderBottom: 1,
            borderColor: 'divider',
          }}
        >
          <Tabs
            value={statusTab}
            onChange={(_, value) => {
              setStatusTab(value)
              setPage(1)
            }}
            sx={{ minHeight: 44 }}
          >
            {STATUS_TABS.map((tab) => (
              <Tab
                key={tab.id}
                value={tab.id}
                label={`${tab.label} ${tabCounts[tab.id]}`}
                sx={{ textTransform: 'none', fontWeight: 600, fontSize: 13, minHeight: 44, px: 1.5, mr: 1 }}
              />
            ))}
          </Tabs>

          <Stack direction="row" spacing={1} sx={{ pb: 1.5 }}>
            <TextField
              size="small"
              placeholder="Search users, email, role..."
              value={search}
              onChange={(event) => {
                setSearch(event.target.value)
                setPage(1)
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchOutlinedIcon fontSize="small" color="disabled" />
                  </InputAdornment>
                ),
              }}
              sx={{ width: { xs: '100%', sm: 280 }, '& .MuiOutlinedInput-root': { borderRadius: 2, fontSize: 13 } }}
            />
            <Button
              variant="outlined"
              color="inherit"
              startIcon={<FilterListOutlinedIcon />}
              onClick={(event) => setRoleMenuAnchor(event.currentTarget)}
              sx={{ textTransform: 'none', fontWeight: 600, borderRadius: 2, whiteSpace: 'nowrap' }}
            >
              {roleFilter === 'All roles' ? 'Role' : roleFilter}
            </Button>
            <Menu anchorEl={roleMenuAnchor} open={Boolean(roleMenuAnchor)} onClose={() => setRoleMenuAnchor(null)}>
              {ROLE_OPTIONS.map((option) => (
                <MenuItem
                  key={option}
                  selected={roleFilter === option}
                  onClick={() => {
                    setRoleFilter(option)
                    setRoleMenuAnchor(null)
                    setPage(1)
                  }}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </Stack>
        </Box>
      ) : null}

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {showToolbar ? (
                <TableCell padding="checkbox" sx={headerCellSx}>
                  <Checkbox
                    size="small"
                    checked={allPageSelected}
                    indeterminate={somePageSelected && !allPageSelected}
                    onChange={toggleAll}
                  />
                </TableCell>
              ) : null}
              <TableCell sx={headerCellSx}>USER</TableCell>
              <TableCell sx={headerCellSx}>ROLE</TableCell>
              <TableCell sx={headerCellSx}>STATUS</TableCell>
              <TableCell sx={headerCellSx}>LAST ACTIVE</TableCell>
              <TableCell sx={headerCellSx}>JOINED</TableCell>
              <TableCell align="right" sx={headerCellSx}>
                ACTIONS
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayUsers.map((user) => (
              <TableRow key={user.id} hover selected={selected.includes(user.id)}>
                {showToolbar ? (
                  <TableCell padding="checkbox">
                    <Checkbox size="small" checked={selected.includes(user.id)} onChange={() => toggleOne(user.id)} />
                  </TableCell>
                ) : null}
                <TableCell sx={{ py: 2 }}>
                  <UserCell user={user} />
                </TableCell>
                <TableCell sx={{ py: 2 }}>
                  <RoleBadge role={user.role} />
                </TableCell>
                <TableCell sx={{ py: 2 }}>
                  <StatusLabel status={user.status} />
                </TableCell>
                <TableCell sx={{ py: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    {user.lastActive || '—'}
                  </Typography>
                </TableCell>
                <TableCell sx={{ py: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    {user.joined || '—'}
                  </Typography>
                </TableCell>
                <TableCell align="right" sx={{ py: 2 }}>
                  <ActionButtons user={user} mode={mode} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {showPagination ? (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
            px: 2,
            py: 1.5,
            borderTop: 1,
            borderColor: 'divider',
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Showing {rangeStart}-{rangeEnd} of {filteredUsers.length} users
          </Typography>
          <Pagination
            count={pageCount}
            page={currentPage}
            onChange={(_, value) => setPage(value)}
            shape="rounded"
            size="small"
            color="primary"
          />
        </Box>
      ) : null}
    </Paper>
  )
}

import { Link, useLoaderData } from 'react-router-dom'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import { ROUTE_PATHS } from '@/app/routes/routePaths'

export function UserViewPage() {
  const { user } = useLoaderData()

  return (
    <Box>
      <Typography variant="h4" fontWeight={800} gutterBottom>
        User View
      </Typography>
      <Stack spacing={1} sx={{ mb: 3 }}>
        <Typography variant="body1">
          <strong>Name:</strong> {user.name}
        </Typography>
        <Typography variant="body1">
          <strong>Email:</strong> {user.email}
        </Typography>
        <Typography variant="body1">
          <strong>Role:</strong> {user.role}
        </Typography>
        <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <strong>Status:</strong>
          <Chip label={user.status} size="small" color={user.status === 'Active' ? 'success' : 'warning'} />
        </Typography>
      </Stack>
      <Stack direction="row" spacing={1}>
        <Button component={Link} to={ROUTE_PATHS.users.editDetail(user.id)} variant="contained">
          Edit user
        </Button>
        <Button component={Link} to={ROUTE_PATHS.users.view} variant="outlined">
          Back to view hub
        </Button>
      </Stack>
    </Box>
  )
}

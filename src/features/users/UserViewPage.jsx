import { Link, useParams } from 'react-router-dom'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import { PageLoader } from '@/components/PageLoader'
import { ROUTES } from '@/constants/routes'
import { useUserDetailsQuery } from '@/hooks'

export function UserViewPage() {
  const { userId } = useParams()
  const { data: user, isLoading, isError } = useUserDetailsQuery(userId)

  if (isLoading) return <PageLoader />

  if (isError || !user) {
    return (
      <Typography variant="body2" color="error">
        User not found.
      </Typography>
    )
  }

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
        <Typography component="div" variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <strong>Status:</strong>
          <Chip label={user.status} size="small" color={user.status === 'Active' ? 'success' : 'warning'} />
        </Typography>
      </Stack>
      <Stack direction="row" spacing={1}>
        <Button component={Link} to={ROUTES.USER_EDIT(user.id)} variant="contained">
          Edit user
        </Button>
        <Button component={Link} to={ROUTES.USERS_VIEW} variant="outlined">
          Back to view hub
        </Button>
      </Stack>
    </Box>
  )
}

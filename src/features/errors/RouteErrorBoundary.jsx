import { isRouteErrorResponse, Link, useNavigate, useRouteError } from 'react-router-dom'
import { ErrorOutlineOutlined as ErrorOutlineOutlinedIcon } from '@mui/icons-material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { ROUTES } from '@/constants/routes'

export function RouteErrorBoundary() {
  const error = useRouteError()
  const navigate = useNavigate()

  let status = null
  let title = 'Something went wrong'
  let message = 'An unexpected error occurred. Please try again or return to the dashboard.'

  if (isRouteErrorResponse(error)) {
    status = error.status
    title = status === 404 ? 'Page not found' : 'Request failed'
    message = error.data?.message || error.statusText || message
  } else if (error instanceof Error) {
    message = error.message
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', px: 2, py: 6, minHeight: '100vh', bgcolor: 'background.default' }}>
      <Box sx={{ width: 72, height: 72, mb: 2, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'error.light', color: 'error.main', opacity: 0.9 }}>
        <ErrorOutlineOutlinedIcon sx={{ fontSize: 36 }} />
      </Box>
      {status ? (
        <Typography variant="h1" sx={{ fontSize: { xs: 56, sm: 72 }, fontWeight: 800, lineHeight: 1, color: 'error.main', mb: 1 }}>
          {status}
        </Typography>
      ) : null}
      <Typography variant="h6" fontWeight={700} gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 420, mb: 3 }}>
        {message}
      </Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
        <Button component={Link} to={ROUTES.HOME} variant="contained" sx={{ textTransform: 'none', fontWeight: 600 }}>
          Back to dashboard
        </Button>
        <Button variant="outlined" onClick={() => navigate(-1)} sx={{ textTransform: 'none', fontWeight: 600 }}>
          Go back
        </Button>
        <Button variant="outlined" color="inherit" onClick={() => window.location.reload()} sx={{ textTransform: 'none', fontWeight: 600 }}>
          Try again
        </Button>
      </Stack>
    </Box>
  )
}

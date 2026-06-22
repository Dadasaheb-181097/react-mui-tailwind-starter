import { Link, useNavigate } from 'react-router-dom'
import { SearchOffOutlined as SearchOffOutlinedIcon } from '@mui/icons-material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { ROUTES } from '@/constants/routes'

export function NotFoundPage({ standalone = false }) {
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        px: 2,
        py: 6,
        minHeight: standalone ? '100vh' : 'min(520px, calc(100vh - var(--layout-navbar-height) - 160px))',
        ...(standalone && { bgcolor: 'background.default' }),
      }}
    >
      <Box
        sx={{
          width: 72,
          height: 72,
          mb: 2,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'action.hover',
          color: 'primary.main',
        }}
      >
        <SearchOffOutlinedIcon sx={{ fontSize: 36 }} />
      </Box>
      <Typography variant="h1" sx={{ fontSize: { xs: 64, sm: 80 }, fontWeight: 800, lineHeight: 1, color: 'primary.main', mb: 1 }}>
        404
      </Typography>
      <Typography variant="h6" fontWeight={700} gutterBottom>
        Page not found
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 380, mb: 3 }}>
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
        <Button component={Link} to={ROUTES.HOME} variant="contained" sx={{ textTransform: 'none', fontWeight: 600 }}>
          Back to dashboard
        </Button>
        <Button variant="outlined" onClick={() => navigate(-1)} sx={{ textTransform: 'none', fontWeight: 600 }}>
          Go back
        </Button>
      </Stack>
    </Box>
  )
}

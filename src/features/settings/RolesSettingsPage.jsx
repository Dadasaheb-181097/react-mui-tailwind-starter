import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

export function RolesSettingsPage() {
  return (
    <Box>
      <Typography variant="h4" fontWeight={800} gutterBottom>
        Roles & Permissions
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Admin-only settings area. Configure roles and permissions here.
      </Typography>
    </Box>
  )
}

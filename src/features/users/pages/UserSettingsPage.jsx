import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'
import Stack from '@mui/material/Stack'

export function UserSettingsPage() {
  return (
    <Box>
      <Typography variant="h4" fontWeight={800} gutterBottom>
        Settings
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Manage your account settings and preferences.
      </Typography>
      <Stack spacing={1}>
        <FormControlLabel control={<Switch defaultChecked />} label="Email notifications" />
        <FormControlLabel control={<Switch />} label="SMS notifications" />
        <FormControlLabel control={<Switch defaultChecked />} label="Two-factor authentication" />
      </Stack>
    </Box>
  )
}

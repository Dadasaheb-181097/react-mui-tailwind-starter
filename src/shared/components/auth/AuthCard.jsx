import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

/** Centered auth form shell (login, register, forgot password) */
export function AuthCard({ title, subtitle, children, maxWidth = 440 }) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        px: 2,
      }}
    >
      <Card
        elevation={0}
        sx={{
          width: '100%',
          maxWidth,
          borderRadius: 3,
          border: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <CardContent sx={{ p: 3.5 }}>
          {title ? (
            <Typography variant="h4" fontWeight={800} gutterBottom>
              {title}
            </Typography>
          ) : null}
          {subtitle ? (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {subtitle}
            </Typography>
          ) : null}
          {children}
        </CardContent>
      </Card>
    </Box>
  )
}

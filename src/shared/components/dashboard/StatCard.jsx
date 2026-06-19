import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

/**
 * @param {{ label: string, value: string|number, caption?: string, tone?: 'default'|'success'|'warning'|'error' }} props
 */
export function StatCard({ label, value, caption, tone = 'default' }) {
  const valueColor = {
    default: 'primary.main',
    success: 'success.main',
    warning: 'warning.main',
    error: 'error.main',
  }[tone]

  return (
    <Card variant="outlined" sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="caption" color="text.secondary" fontWeight={700} letterSpacing="0.06em" textTransform="uppercase">
          {label}
        </Typography>
        <Typography variant="h4" fontWeight={800} sx={{ my: 0.5, color: valueColor }}>
          {value}
        </Typography>
        {caption ? (
          <Typography variant="body2" color="text.secondary">
            {caption}
          </Typography>
        ) : null}
      </CardContent>
    </Card>
  )
}

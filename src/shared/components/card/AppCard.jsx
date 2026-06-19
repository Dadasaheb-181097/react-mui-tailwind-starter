import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'

export function AppCard({ title, subheader, action, children, padding = 2, ...props }) {
  return (
    <Card variant="outlined" {...props}>
      {title ? <CardHeader title={title} subheader={subheader} action={action} /> : null}
      <CardContent sx={{ pt: title ? 0 : padding }}>{children}</CardContent>
    </Card>
  )
}

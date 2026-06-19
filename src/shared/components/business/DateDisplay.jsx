import Typography from '@mui/material/Typography'

/**
 * @param {{ value: Date|string|number, format?: Intl.DateTimeFormatOptions, locale?: string, variant?: string }} props
 */
export function DateDisplay({ value, format, locale, variant = 'body2', ...props }) {
  const date = value instanceof Date ? value : new Date(value)
  const formatted = new Intl.DateTimeFormat(locale, format ?? {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date)

  return (
    <Typography variant={variant} component="time" dateTime={date.toISOString()} {...props}>
      {formatted}
    </Typography>
  )
}

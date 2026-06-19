import Typography from '@mui/material/Typography'

/**
 * @param {{ value: number, currency?: string, locale?: string, variant?: string, fontWeight?: number }} props
 */
export function CurrencyDisplay({
  value,
  currency = 'INR',
  locale,
  variant = 'body1',
  fontWeight = 700,
  ...props
}) {
  const formatted = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(value ?? 0)

  return (
    <Typography variant={variant} fontWeight={fontWeight} component="span" {...props}>
      {formatted}
    </Typography>
  )
}

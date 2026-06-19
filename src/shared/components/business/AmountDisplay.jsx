import Typography from '@mui/material/Typography'

/**
 * Numeric amount without currency symbol (quantities, counts, weights).
 */
export function AmountDisplay({
  value,
  locale,
  minimumFractionDigits = 0,
  maximumFractionDigits = 2,
  variant = 'body1',
  fontWeight = 700,
  suffix,
  ...props
}) {
  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(value ?? 0)

  return (
    <Typography variant={variant} fontWeight={fontWeight} component="span" {...props}>
      {formatted}
      {suffix}
    </Typography>
  )
}

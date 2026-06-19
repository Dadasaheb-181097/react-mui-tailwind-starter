import Chip from '@mui/material/Chip'

const STATUS_MAP = {
  active: { label: 'Active', color: 'success' },
  pending: { label: 'Pending', color: 'warning' },
  inactive: { label: 'Inactive', color: 'default' },
  error: { label: 'Error', color: 'error' },
  success: { label: 'Success', color: 'success' },
}

/**
 * @param {{ status: string, label?: string, size?: 'small'|'medium' }} props
 */
export function StatusBadge({ status, label, size = 'small' }) {
  const key = String(status || '').toLowerCase()
  const config = STATUS_MAP[key] || { label: status, color: 'default' }
  return <Chip label={label || config.label} color={config.color} size={size} />
}

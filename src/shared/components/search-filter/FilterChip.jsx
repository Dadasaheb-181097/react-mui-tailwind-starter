import Chip from '@mui/material/Chip'

export function FilterChip({ label, active = false, onClick, onDelete }) {
  return (
    <Chip
      label={label}
      variant={active ? 'filled' : 'outlined'}
      color={active ? 'primary' : 'default'}
      onClick={onClick}
      onDelete={onDelete}
      size="small"
      sx={{ fontWeight: 600 }}
    />
  )
}

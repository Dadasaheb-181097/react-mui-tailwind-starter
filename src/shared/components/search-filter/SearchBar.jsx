import InputAdornment from '@mui/material/InputAdornment'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import { Input } from '../ui/Input'

export function SearchBar({ value, onChange, placeholder = 'Search…', onSubmit, sx }) {
  return (
    <Input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      sx={{ maxWidth: 420, ...sx }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') onSubmit?.(value)
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchOutlinedIcon fontSize="small" />
          </InputAdornment>
        ),
      }}
    />
  )
}

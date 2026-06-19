import MuiLink from '@mui/material/Link'
import { Link as RouterLink, useLocation } from 'react-router-dom'

/**
 * Router-aware nav link with active state styling.
 */
export function NavLink({ to, children, end = false, sx, ...props }) {
  const { pathname } = useLocation()
  const active = end ? pathname === to : pathname.startsWith(to)

  return (
    <MuiLink
      component={RouterLink}
      to={to}
      underline="none"
      sx={{
        fontWeight: active ? 700 : 600,
        color: active ? 'primary.main' : 'text.secondary',
        ...sx,
      }}
      aria-current={active ? 'page' : undefined}
      {...props}
    >
      {children}
    </MuiLink>
  )
}

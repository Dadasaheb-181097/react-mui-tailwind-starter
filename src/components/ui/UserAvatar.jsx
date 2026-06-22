import Avatar from '@mui/material/Avatar'

const SIZE_CLASS = {
  sm: 'user-avatar--sm',
  md: 'user-avatar--md',
  lg: 'user-avatar--lg',
  xl: 'user-avatar--xl',
}

export function UserAvatar({
  initials = 'JD',
  name,
  size = 'md',
  className = '',
  ...props
}) {
  const label = name ? `${name} avatar` : `User ${initials}`

  return (
    <Avatar
      className={['user-avatar', SIZE_CLASS[size] || SIZE_CLASS.md, className]
        .filter(Boolean)
        .join(' ')}
      aria-label={label}
      {...props}
    >
      {initials}
    </Avatar>
  )
}

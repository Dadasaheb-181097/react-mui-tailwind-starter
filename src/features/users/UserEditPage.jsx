import { useEffect, useState } from 'react'
import { Link, useLoaderData, useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { ROUTE_PATHS } from '@/routes/paths'
import { useUnsavedChanges } from '@/shared/context/UnsavedChangesContext'

export function UserEditPage() {
  const { user } = useLoaderData()
  const navigate = useNavigate()
  const { setDirty } = useUnsavedChanges()

  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)

  useEffect(() => {
    const dirty = name !== user.name || email !== user.email
    setDirty(dirty)
    return () => setDirty(false)
  }, [name, email, user.name, user.email, setDirty])

  const handleSave = () => {
    setDirty(false)
    navigate(ROUTE_PATHS.users.detail(user.id))
  }

  return (
    <Box>
      <Typography variant="h4" fontWeight={800} gutterBottom>
        Edit User
      </Typography>
      <Stack spacing={2} sx={{ maxWidth: 420, mb: 3 }}>
        <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
        <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
      </Stack>
      <Button onClick={handleSave} variant="contained" sx={{ mr: 1 }}>
        Save
      </Button>
      <Button component={Link} to={ROUTE_PATHS.users.detail(user.id)} variant="outlined">
        Cancel
      </Button>
    </Box>
  )
}

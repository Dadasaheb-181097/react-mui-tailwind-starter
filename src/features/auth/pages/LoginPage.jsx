import { useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Divider,
  FormControlLabel,
  IconButton,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useAuth } from '../AuthContext'

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || '').trim())
}

export function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState('')

  const emailError = useMemo(() => {
    if (!submitted) return ''
    if (!email.trim()) return 'Email is required'
    if (!isValidEmail(email)) return 'Enter a valid email'
    return ''
  }, [email, submitted])

  const passwordError = useMemo(() => {
    if (!submitted) return ''
    if (!password) return 'Password is required'
    if (password.length < 6) return 'Password must be at least 6 characters'
    return ''
  }, [password, submitted])

  const canSubmit = useMemo(() => {
    return isValidEmail(email) && password.length >= 6
  }, [email, password])

  const onSubmit = async (e) => {
    e.preventDefault()
    setSubmitted(true)
    setFormError('')
    if (!canSubmit) return

    try {
      setSubmitting(true)
      await login({ email: email.trim(), password, remember })
      const to = location.state?.from?.pathname || '/'
      navigate(to, { replace: true })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed'
      setFormError(message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        px: 2,
        background:
          'radial-gradient(1200px 700px at 10% 10%, rgba(54, 165, 255, 0.14), transparent 60%), radial-gradient(900px 600px at 90% 20%, rgba(120, 87, 255, 0.16), transparent 55%)',
      }}
    >
      <Card
        elevation={0}
        sx={{
          width: '100%',
          maxWidth: 440,
          borderRadius: 3,
          border: (t) => `1px solid ${t.palette.divider}`,
          backdropFilter: 'blur(6px)',
          backgroundColor: (t) =>
            t.palette.mode === 'dark'
              ? 'rgba(18, 18, 18, 0.75)'
              : 'rgba(255, 255, 255, 0.78)',
        }}
      >
        <CardContent sx={{ p: 3.5 }}>
          <Stack spacing={2.2}>
            <Box>
              <Typography variant="h4" fontWeight={800} letterSpacing={-0.5}>
                Sign in
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                Use your work email to access the admin panel.
              </Typography>
            </Box>

            <Divider />

            <Box component="form" onSubmit={onSubmit} noValidate>
              <Stack spacing={2}>
                {formError ? (
                  <Typography variant="body2" color="error" sx={{ fontWeight: 700 }}>
                    {formError}
                  </Typography>
                ) : null}

                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={Boolean(emailError)}
                  helperText={emailError || ' '}
                  fullWidth
                />

                <TextField
                  label="Password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={Boolean(passwordError)}
                  helperText={passwordError || ' '}
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                        onClick={() => setShowPassword((s) => !s)}
                        edge="end"
                        tabIndex={-1}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    ),
                  }}
                />

                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{ mt: 0.5 }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={remember}
                        onChange={(e) => setRemember(e.target.checked)}
                      />
                    }
                    label="Remember me"
                  />
                  <Link
                    component="button"
                    type="button"
                    underline="hover"
                    onClick={() => {}}
                    sx={{ fontWeight: 600 }}
                  >
                    Forgot password?
                  </Link>
                </Stack>

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disableElevation
                  disabled={!canSubmit || submitting}
                  sx={{
                    mt: 1,
                    borderRadius: 2,
                    py: 1.15,
                    fontWeight: 800,
                  }}
                >
                  {submitting ? 'Signing in…' : 'Sign in'}
                </Button>

                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
                  Don&apos;t have an account?{' '}
                  <Link
                    component="button"
                    type="button"
                    underline="hover"
                    onClick={() => {}}
                    sx={{ fontWeight: 700 }}
                  >
                    Contact an admin
                  </Link>
                </Typography>
              </Stack>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  )
}


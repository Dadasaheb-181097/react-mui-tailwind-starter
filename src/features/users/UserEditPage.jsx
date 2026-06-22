import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { Link } from 'react-router-dom'
import { FormProvider, FormSelect, FormTextField } from '@/forms'
import { PageLoader } from '@/components/PageLoader'
import { ROUTES } from '@/constants/routes'
import { useUserDetailsQuery, useUnsavedChanges, useZodForm } from '@/hooks'
import {
  USER_ROLE_OPTIONS,
  USER_STATUS_OPTIONS,
  mapUserToFormValues,
  userSchema,
} from '@/validations/user.schema'

export function UserEditPage() {
  const { userId } = useParams()
  const { data: user, isLoading, isError } = useUserDetailsQuery(userId)

  if (isLoading) return <PageLoader />
  if (isError || !user) {
    return <Typography color="error">User not found.</Typography>
  }

  return <UserEditForm user={user} />
}

function UserEditForm({ user }) {
  const navigate = useNavigate()
  const { setDirty } = useUnsavedChanges()

  const methods = useZodForm({
    schema: userSchema,
    values: mapUserToFormValues(user),
    mode: 'onTouched',
  })

  const { formState: { isDirty, isSubmitting } } = methods

  useEffect(() => {
    setDirty(isDirty)
    return () => setDirty(false)
  }, [isDirty, setDirty])

  return (
    <Box>
      <Typography variant="h4" fontWeight={800} gutterBottom>
        Edit User
      </Typography>
      <FormProvider
        methods={methods}
        onSubmit={() => {
          setDirty(false)
          navigate(ROUTES.USER_DETAILS(user.id))
        }}
      >
        <Stack spacing={2} sx={{ maxWidth: 420, mb: 3 }}>
          <FormTextField name="name" label="Name" />
          <FormTextField name="email" label="Email" type="email" />
          <FormSelect name="role" label="Role" options={USER_ROLE_OPTIONS} />
          <FormSelect name="status" label="Status" options={USER_STATUS_OPTIONS} />
        </Stack>
        <Button type="submit" variant="contained" sx={{ mr: 1 }} disabled={isSubmitting}>
          Save
        </Button>
        <Button component={Link} to={ROUTES.USER_DETAILS(user.id)} variant="outlined">
          Cancel
        </Button>
      </FormProvider>
    </Box>
  )
}

import { useMutation } from '@tanstack/react-query'
import { login } from '@/services/authService'
import { authLoggedIn } from '@/redux/slices/authSlice'
import { useAppDispatch } from '@/redux/hooks'

export function useLoginMutation() {
  const dispatch = useAppDispatch()

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      dispatch(authLoggedIn(data))
    },
  })
}

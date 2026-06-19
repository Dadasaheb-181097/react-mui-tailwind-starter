import { DEMO_USERS } from '@/features/users/data/demoUsers'

export async function userLoader({ params }) {
  const { userId } = params
  if (!userId) throw new Response('User ID is required', { status: 400 })

  await new Promise((resolve) => setTimeout(resolve, 200))

  const user = DEMO_USERS.find((item) => item.id === userId)
  if (!user) throw new Response('User not found', { status: 404 })

  return { user }
}

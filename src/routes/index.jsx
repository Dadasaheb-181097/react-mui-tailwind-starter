import { Suspense, lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { AppLayout } from '@/layout'
import { PageLoader } from '@/components/PageLoader'
import { NotFoundPage } from '@/features/errors/NotFoundPage'
import { ProtectedRoute, RoleRoute, UnsavedChangesGuard } from './ProtectedRoute'
import { PublicRoute } from './PublicRoute'

const LoginPage = lazy(() => import('@/features/auth/LoginPage').then((m) => ({ default: m.LoginPage })))
const DashboardPage = lazy(() => import('@/features/dashboard/DashboardPage').then((m) => ({ default: m.DashboardPage })))
const ChatPage = lazy(() => import('@/features/chat/ChatPage').then((m) => ({ default: m.ChatPage })))
const UsersListPage = lazy(() => import('@/features/users/UsersListPage').then((m) => ({ default: m.UsersListPage })))
const UserViewLandingPage = lazy(() => import('@/features/users/UserViewLandingPage').then((m) => ({ default: m.UserViewLandingPage })))
const UserEditLandingPage = lazy(() => import('@/features/users/UserEditLandingPage').then((m) => ({ default: m.UserEditLandingPage })))
const ProfilePage = lazy(() => import('@/features/users/ProfilePage').then((m) => ({ default: m.ProfilePage })))
const UserSettingsPage = lazy(() => import('@/features/users/UserSettingsPage').then((m) => ({ default: m.UserSettingsPage })))
const UserViewPage = lazy(() => import('@/features/users/UserViewPage').then((m) => ({ default: m.UserViewPage })))
const UserEditPage = lazy(() => import('@/features/users/UserEditPage').then((m) => ({ default: m.UserEditPage })))
const RolesSettingsPage = lazy(() => import('@/features/settings/RolesSettingsPage').then((m) => ({ default: m.RolesSettingsPage })))

export function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicRoute redirectTo={ROUTES.HOME} />}>
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          </Route>

          <Route element={<ProtectedRoute loginPath={ROUTES.LOGIN} />}>
            <Route element={<AppLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path={ROUTES.CHAT} element={<ChatPage />} />

              <Route path={ROUTES.USERS}>
                <Route index element={<UsersListPage />} />
                <Route path="view" element={<UserViewLandingPage />} />
                <Route path="edit" element={<UserEditLandingPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="settings" element={<UserSettingsPage />} />
                <Route path=":userId" element={<UserViewPage />} />
                <Route element={<UnsavedChangesGuard />}>
                  <Route path=":userId/edit" element={<UserEditPage />} />
                </Route>
              </Route>

              <Route element={<RoleRoute roles={['admin']} fallbackTo={ROUTES.HOME} />}>
                <Route path={ROUTES.SETTINGS_ROLES} element={<RolesSettingsPage />} />
              </Route>

              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFoundPage standalone />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  )
}

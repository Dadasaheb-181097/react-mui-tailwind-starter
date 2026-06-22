import { AppBreadcrumbs } from '@/components/navigation'

export function Main({ children }) {
  return (
    <main className="app-main min-h-screen pt-navbar transition-[margin-left] duration-300 ease-in-out">
      <div className="app-main__inner min-h-[calc(100vh-var(--layout-navbar-height))] px-12 py-11 pb-13 max-[899px]:px-7 max-[899px]:py-8 max-[899px]:pb-12">
        <AppBreadcrumbs />
        {children}
      </div>
    </main>
  )
}

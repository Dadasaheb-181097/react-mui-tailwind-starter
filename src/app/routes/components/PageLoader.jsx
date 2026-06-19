import CircularProgress from '@mui/material/CircularProgress'

/** Suspense fallback for lazy-loaded routes */
export function PageLoader() {
  return (
    <div className="grid min-h-[40vh] place-items-center" role="status" aria-label="Loading page">
      <CircularProgress size={32} />
    </div>
  )
}

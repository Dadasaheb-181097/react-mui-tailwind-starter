import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'

const UnsavedChangesContext = createContext(null)

export function UnsavedChangesProvider({ children }) {
  const [isDirty, setIsDirtyState] = useState(false)
  const isDirtyRef = useRef(false)

  const setDirty = useCallback((dirty) => {
    const next = Boolean(dirty)
    isDirtyRef.current = next
    setIsDirtyState(next)
  }, [])

  const value = useMemo(
    () => ({ isDirty, isDirtyRef, setDirty }),
    [isDirty, setDirty],
  )

  return (
    <UnsavedChangesContext.Provider value={value}>{children}</UnsavedChangesContext.Provider>
  )
}

export function useUnsavedChanges() {
  const ctx = useContext(UnsavedChangesContext)
  if (!ctx) {
    throw new Error('useUnsavedChanges must be used within UnsavedChangesProvider')
  }
  return ctx
}

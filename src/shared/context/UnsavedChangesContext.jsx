import { createContext, useCallback, useContext, useMemo, useState } from 'react'

const UnsavedChangesContext = createContext(null)

export function UnsavedChangesProvider({ children }) {
  const [isDirty, setIsDirty] = useState(false)

  const setDirty = useCallback((dirty) => {
    setIsDirty(Boolean(dirty))
  }, [])

  const value = useMemo(() => ({ isDirty, setDirty }), [isDirty, setDirty])

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

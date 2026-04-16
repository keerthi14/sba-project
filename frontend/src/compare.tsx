import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Listing } from './api/types'

interface CompareContextValue {
  items: Listing[]
  addItem: (item: Listing) => 'added' | 'exists' | 'limit'
  removeItem: (id: number) => void
}

const CompareContext = createContext<CompareContextValue | null>(null)

const STORAGE_KEY = 'sba_compare_items'
const MAX_COMPARE_ITEMS = 4

export function CompareProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Listing[]>([])

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return
    try {
      const parsed = JSON.parse(raw) as Listing[]
      setItems(Array.isArray(parsed) ? parsed : [])
    } catch {
      setItems([])
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const value = useMemo<CompareContextValue>(
    () => ({
      items,
      addItem: (item) => {
        let status: 'added' | 'exists' | 'limit' = 'exists'
        setItems((prev) => {
          if (prev.some((x) => x.id === item.id)) {
            status = 'exists'
            return prev
          }
          if (prev.length >= MAX_COMPARE_ITEMS) {
            status = 'limit'
            return prev
          }
          status = 'added'
          return [...prev, item]
        })
        return status
      },
      removeItem: (id) => setItems((prev) => prev.filter((x) => x.id !== id)),
    }),
    [items]
  )

  return <CompareContext.Provider value={value}>{children}</CompareContext.Provider>
}

export function useCompare() {
  const ctx = useContext(CompareContext)
  if (!ctx) throw new Error('useCompare must be used inside CompareProvider')
  return ctx
}

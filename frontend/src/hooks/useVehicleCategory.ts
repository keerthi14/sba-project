import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import type { VehicleCategory } from '../api/types'

const PATH_TO_CATEGORY: Record<string, VehicleCategory> = {
  '/boats': 'boat',
  '/cars': 'car',
  '/trucks': 'truck',
  '/scooters': 'scooter',
}

const LABELS: Record<VehicleCategory, { singular: string; plural: string; headline: string }> = {
  boat: { singular: 'boat', plural: 'boats', headline: 'BOATS' },
  car: { singular: 'car', plural: 'cars', headline: 'CARS' },
  truck: { singular: 'truck', plural: 'trucks', headline: 'TRUCKS' },
  scooter: { singular: 'scooter', plural: 'scooters', headline: 'SCOOTERS' },
}

export function useVehicleCategory() {
  const { pathname } = useLocation()
  const category: VehicleCategory = useMemo(() => {
    return PATH_TO_CATEGORY[pathname] ?? 'boat'
  }, [pathname])

  const labels = LABELS[category]

  return {
    category,
    labels,
    titleLine2: labels.headline,
  }
}

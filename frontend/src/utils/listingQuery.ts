import type { VehicleCategory } from '../api/types'

export const FILTER_KEYS = [
  'q',
  'newly_added',
  'zip_only',
  'buy_it_now',
  'exclude_upcoming',
  'vehicle_type',
  'year_from',
  'year_to',
  'odometer_min',
  'odometer_max',
  'bid_min',
  'bid_max',
  'bid_bucket',
  'make',
  'model',
  'location',
  'state',
  'transmission',
  'fuel',
  'damage',
  'sale_date',
  'exterior_color',
  'sales_status',
  'title_type',
  'featured',
  'sort_by',
  'sort_dir',
  'page',
] as const

export type FilterKey = (typeof FILTER_KEYS)[number]

export function listingParamsFromSearchParams(
  sp: URLSearchParams,
  category: VehicleCategory
): Record<string, string | number | boolean | undefined> {
  const out: Record<string, string | number | boolean | undefined> = { category }
  const q = sp.get('q')
  if (q) out.q = q

  ;[
    'year_from',
    'year_to',
    'odometer_min',
    'odometer_max',
    'bid_min',
    'bid_max',
  ].forEach((k) => {
    const v = sp.get(k)
    if (v !== null && v !== '') {
      const n = Number(v)
      if (!Number.isNaN(n)) out[k] = n
    }
  })

  ;[
    'newly_added',
    'vehicle_type',
    'bid_bucket',
    'make',
    'model',
    'location',
    'state',
    'transmission',
    'fuel',
    'damage',
    'sale_date',
    'exterior_color',
    'sales_status',
    'title_type',
  ].forEach((k) => {
    const v = sp.get(k)
    if (v) out[k] = v
  })

  if (sp.get('zip_only') === '1') out.zip_only = true
  if (sp.get('buy_it_now') === '1') out.buy_it_now = true
  if (sp.get('exclude_upcoming') === '1') out.exclude_upcoming = true

  return out
}

export function describeFilters(sp: URLSearchParams): string {
  const parts: string[] = []
  FILTER_KEYS.forEach((k) => {
    const v = sp.get(k)
    if (v) parts.push(`${k}=${v}`)
  })
  return parts.length ? parts.join(', ') : 'none'
}

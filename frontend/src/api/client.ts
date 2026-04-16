import type {
  BannerResponse,
  FindBoatOptionsResponse,
  ListingsResponse,
  NavMenusResponse,
  VehicleCategory,
  VehicleFiltersResponse,
  AuthResponse,
} from './types'

const API_BASE = import.meta.env.VITE_API_URL ?? ''

function qs(params: Record<string, string | number | boolean | undefined | null>) {
  const sp = new URLSearchParams()
  Object.entries(params).forEach(([k, v]) => {
    if (v === undefined || v === null || v === '') return
    if (typeof v === 'boolean') {
      sp.set(k, v ? 'true' : 'false')
      return
    }
    sp.set(k, String(v))
  })
  const s = sp.toString()
  return s ? `?${s}` : ''
}

export async function fetchListings(
  params: Record<string, string | number | boolean | undefined | null>
): Promise<ListingsResponse> {
  const r = await fetch(`${API_BASE}/api/listings${qs(params)}`)
  if (!r.ok) throw new Error(await r.text())
  return r.json()
}

export async function fetchVehicleFilters(category: VehicleCategory): Promise<VehicleFiltersResponse> {
  const r = await fetch(`${API_BASE}/api/vehicle-filters${qs({ category })}`)
  if (!r.ok) throw new Error(await r.text())
  return r.json()
}

export async function fetchBanner(category: VehicleCategory): Promise<BannerResponse> {
  const r = await fetch(`${API_BASE}/api/banner${qs({ category })}`)
  if (!r.ok) throw new Error(await r.text())
  return r.json()
}

export async function fetchFindBoatOptions(category: VehicleCategory): Promise<FindBoatOptionsResponse> {
  const r = await fetch(`${API_BASE}/api/find-boat/options${qs({ category })}`)
  if (!r.ok) throw new Error(await r.text())
  return r.json()
}

export async function fetchNavMenus(): Promise<NavMenusResponse> {
  const r = await fetch(`${API_BASE}/api/nav-menus`)
  if (!r.ok) throw new Error(await r.text())
  return r.json()
}


export async function registerUser(payload: {
  email: string
  password: string
  remember_me?: boolean
}): Promise<AuthResponse> {
  const r = await fetch(`${API_BASE}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!r.ok) throw new Error(await r.text())
  return r.json()
}

export async function loginUser(payload: {
  email: string
  password: string
  remember_me?: boolean
}): Promise<AuthResponse> {
  const r = await fetch(`${API_BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!r.ok) throw new Error(await r.text())
  return r.json()
}

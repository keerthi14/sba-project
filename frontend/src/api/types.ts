export type VehicleCategory = 'boat' | 'car' | 'truck' | 'scooter'

export interface Listing {
  id: number
  lot_number: string
  vin: string | null
  vehicle_category: string
  make: string | null
  model: string | null
  year: number | null
  vehicle_type: string | null
  body_style: string | null
  drive_train: string | null
  engine: string | null
  transmission: string | null
  fuel: string | null
  damage: string | null
  exterior_color: string | null
  sales_status: string | null
  title_type: string | null
  title: string | null
  condition: string | null
  odometer: number | null
  current_bid: number | null
  bid_count: number | null
  pre_bidding_ends_in: string | null
  actual_cash_value: number | null
  location: string | null
  state: string | null
  location_zip: string | null
  sale_date: string | null
  buy_it_now: boolean
  upcoming: boolean
  keys_available: boolean | null
  images: string[]
  created_at: string
}

export interface ListingsResponse {
  items: Listing[]
  total: number
}

export interface BannerResponse {
  message: string
  auctions_today: number
  vehicles_on_sale: number
  vehicle_label: string
}

export interface VehicleFiltersResponse {
  filters: Record<string, string[]>
}

export interface FindBoatOptionsResponse {
  locations: string[]
  makes: string[]
  quick_picks: string[]
  damage_types: string[]
  boat_finder: Record<string, string[]>
}

export type NavChild =
  | { label: string; href: string }
  | { label: string; type: 'submenu'; options: string[] }

export interface NavMenusResponse {
  menus: Record<
    string,
    {
      label: string
      children: NavChild[]
    }
  >
}


export interface AuthUser {
  id: number
  email: string
}

export interface AuthResponse {
  success: boolean
  message: string
  user: AuthUser | null
}

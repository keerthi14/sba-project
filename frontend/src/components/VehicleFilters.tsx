import { useEffect, useMemo, useState } from 'react'
import { fetchVehicleFilters } from '../api/client'
import type { VehicleCategory } from '../api/types'
import type { AppLanguage } from '../i18n'
import { describeFilters } from '../utils/listingQuery'
import './VehicleFilters.css'

type MultiKey =
  | 'vehicle_type'
  | 'make'
  | 'model'
  | 'location'
  | 'transmission'
  | 'fuel'
  | 'damage'
  | 'sale_date'
  | 'exterior_color'
  | 'sales_status'
  | 'title_type'

interface VehicleFiltersDraft {
  newly_added: string
  zip_only: boolean
  buy_it_now: boolean
  exclude_upcoming: boolean
  vehicle_type: string[]
  year_from: string
  year_to: string
  odometer_min: string
  odometer_max: string
  bid_bucket: string
  make: string[]
  model: string[]
  location: string[]
  transmission: string[]
  fuel: string[]
  damage: string[]
  sale_date: string[]
  exterior_color: string[]
  sales_status: string[]
  title_type: string[]
}

const emptyDraft: VehicleFiltersDraft = {
  newly_added: '',
  zip_only: false,
  buy_it_now: false,
  exclude_upcoming: false,
  vehicle_type: [],
  year_from: '',
  year_to: '',
  odometer_min: '',
  odometer_max: '',
  bid_bucket: '',
  make: [],
  model: [],
  location: [],
  transmission: [],
  fuel: [],
  damage: [],
  sale_date: [],
  exterior_color: [],
  sales_status: [],
  title_type: [],
}

const bidBuckets = [
  { id: '', label: 'All' },
  { id: 'no_bids', label: 'No Bids yet' },
  { id: 'lt_1000', label: 'Less than $1000' },
  { id: '1000_5000', label: 'Between $1000 and $5000' },
  { id: '5000_10000', label: 'Between $5000 and $10000' },
  { id: 'gt_10000', label: 'more than $10000' },
]

function parseCSV(v: string | null): string[] {
  if (!v) return []
  return v
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
}

function draftFromSearchParams(sp: URLSearchParams): VehicleFiltersDraft {
  return {
    newly_added: sp.get('newly_added') ?? '',
    zip_only: sp.get('zip_only') === '1',
    buy_it_now: sp.get('buy_it_now') === '1',
    exclude_upcoming: sp.get('exclude_upcoming') === '1',
    vehicle_type: parseCSV(sp.get('vehicle_type')),
    year_from: sp.get('year_from') ?? '',
    year_to: sp.get('year_to') ?? '',
    odometer_min: sp.get('odometer_min') ?? '',
    odometer_max: sp.get('odometer_max') ?? '',
    bid_bucket: sp.get('bid_bucket') ?? '',
    make: parseCSV(sp.get('make')),
    model: parseCSV(sp.get('model')),
    location: parseCSV(sp.get('location')),
    transmission: parseCSV(sp.get('transmission')),
    fuel: parseCSV(sp.get('fuel')),
    damage: parseCSV(sp.get('damage')),
    sale_date: parseCSV(sp.get('sale_date')),
    exterior_color: parseCSV(sp.get('exterior_color')),
    sales_status: parseCSV(sp.get('sales_status')),
    title_type: parseCSV(sp.get('title_type')),
  }
}

function draftToParams(d: VehicleFiltersDraft, q: string): URLSearchParams {
  const sp = new URLSearchParams()
  sp.set('page', '1')
  if (q) sp.set('q', q)
  if (d.newly_added) sp.set('newly_added', d.newly_added)
  if (d.zip_only) sp.set('zip_only', '1')
  if (d.buy_it_now) sp.set('buy_it_now', '1')
  if (d.exclude_upcoming) sp.set('exclude_upcoming', '1')
  if (d.vehicle_type.length) sp.set('vehicle_type', d.vehicle_type.join(','))
  if (d.year_from) sp.set('year_from', d.year_from)
  if (d.year_to) sp.set('year_to', d.year_to)
  if (d.odometer_min) sp.set('odometer_min', d.odometer_min)
  if (d.odometer_max) sp.set('odometer_max', d.odometer_max)
  if (d.bid_bucket) sp.set('bid_bucket', d.bid_bucket)
  if (d.make.length) sp.set('make', d.make.join(','))
  if (d.model.length) sp.set('model', d.model.join(','))
  if (d.location.length) sp.set('location', d.location.join(','))
  if (d.transmission.length) sp.set('transmission', d.transmission.join(','))
  if (d.fuel.length) sp.set('fuel', d.fuel.join(','))
  if (d.damage.length) sp.set('damage', d.damage.join(','))
  if (d.sale_date.length) sp.set('sale_date', d.sale_date.join(','))
  if (d.exterior_color.length) sp.set('exterior_color', d.exterior_color.join(','))
  if (d.sales_status.length) sp.set('sales_status', d.sales_status.join(','))
  if (d.title_type.length) sp.set('title_type', d.title_type.join(','))
  return sp
}

interface VehicleFiltersProps {
  category: VehicleCategory
  searchParams: URLSearchParams
  setSearchParams: (next: URLSearchParams) => void
  language: AppLanguage
}

function MultiAccordion({
  title,
  options,
  values,
  onToggle,
  defaultOpen = false,
}: {
  title: string
  options: string[]
  values: string[]
  onToggle: (v: string) => void
  defaultOpen?: boolean
}) {
  return (
    <details className="vf-acc" open={defaultOpen}>
      <summary>{title}</summary>
      <div className="vf-acc-body">
        {options.map((opt) => (
          <label key={opt} className="vf-check vf-check--sm">
            <input type="checkbox" checked={values.includes(opt)} onChange={() => onToggle(opt)} />
            {opt}
          </label>
        ))}
      </div>
    </details>
  )
}

export function VehicleFilters({
  category,
  searchParams,
  setSearchParams,
  language,
}: VehicleFiltersProps) {
  const isEs = language === 'es'
  const [hidden, setHidden] = useState(false)
  const [options, setOptions] = useState<Record<string, string[]>>({})
  const [draft, setDraft] = useState<VehicleFiltersDraft>(() => draftFromSearchParams(searchParams))

  const q = searchParams.get('q') ?? ''

  useEffect(() => {
    fetchVehicleFilters(category)
      .then((r) => setOptions(r.filters))
      .catch(() => setOptions({}))
  }, [category])

  useEffect(() => {
    setDraft(draftFromSearchParams(searchParams))
  }, [searchParams])

  const years = useMemo(() => options.year ?? [], [options])
  const currentText = useMemo(() => describeFilters(searchParams), [searchParams])

  const toggleMulti = (key: MultiKey, value: string) => {
    setDraft((d) => {
      const cur = d[key]
      const next = cur.includes(value) ? cur.filter((x) => x !== value) : [...cur, value]
      return { ...d, [key]: next }
    })
  }

  const apply = () => setSearchParams(draftToParams(draft, q))

  const reset = () => {
    setDraft(emptyDraft)
    const sp = new URLSearchParams()
    sp.set('page', '1')
    setSearchParams(sp)
  }

  return (
    <aside className="vehicle-filters" aria-labelledby="vf-heading">
      <div className="vehicle-filters__top">
        <button type="button" className="vehicle-filters__linkish" onClick={reset}>
          {isEs ? 'Restablecer filtro' : 'Reset filter'}
        </button>
      </div>
      <h2 id="vf-heading" className="vehicle-filters__title">
        {isEs ? 'Filtros de vehiculos' : 'Vehicle filters'}
      </h2>
      <p className="vehicle-filters__current">
        <strong>{isEs ? 'Filtros actuales:' : 'Current filters:'}</strong> {currentText}
      </p>
      <button type="button" className="vehicle-filters__hide" onClick={() => setHidden((h) => !h)}>
        {hidden ? (isEs ? 'Mostrar filtros' : 'Show filters') : isEs ? 'Ocultar filtros' : 'Hide filters'}
      </button>

      {!hidden && (
        <div className="vehicle-filters__body">
          <label className="vf-field">
            <span>Newly Added lots</span>
            <select
              value={draft.newly_added}
              onChange={(e) => setDraft((d) => ({ ...d, newly_added: e.target.value }))}
            >
              <option value="">All</option>
              <option value="24h">Last 24 hours</option>
              <option value="48h">Last 48 hours</option>
              <option value="7d">Last 7 days</option>
            </select>
          </label>

          <label className="vf-toggle">
            <span>Search by Zip code</span>
            <input
              type="checkbox"
              checked={draft.zip_only}
              onChange={(e) => setDraft((d) => ({ ...d, zip_only: e.target.checked }))}
            />
          </label>
          <label className="vf-toggle">
            <span>Buy it now</span>
            <input
              type="checkbox"
              checked={draft.buy_it_now}
              onChange={(e) => setDraft((d) => ({ ...d, buy_it_now: e.target.checked }))}
            />
          </label>
          <label className="vf-toggle">
            <span>Exclude Upcoming lots</span>
            <input
              type="checkbox"
              checked={draft.exclude_upcoming}
              onChange={(e) => setDraft((d) => ({ ...d, exclude_upcoming: e.target.checked }))}
            />
          </label>

          <MultiAccordion
            title="Vehicle type"
            options={options.vehicle_type ?? []}
            values={draft.vehicle_type}
            onToggle={(v) => toggleMulti('vehicle_type', v)}
            defaultOpen
          />

          <details className="vf-acc" open>
            <summary>Year</summary>
            <div className="vf-acc-body vf-inline-grid">
              <label className="vf-field">
                <span>Min</span>
                <select
                  value={draft.year_from}
                  onChange={(e) => setDraft((d) => ({ ...d, year_from: e.target.value }))}
                >
                  <option value="">Any</option>
                  {years.map((y) => (
                    <option key={`yf-${y}`} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </label>
              <label className="vf-field">
                <span>Max</span>
                <select value={draft.year_to} onChange={(e) => setDraft((d) => ({ ...d, year_to: e.target.value }))}>
                  <option value="">Any</option>
                  {years.map((y) => (
                    <option key={`yt-${y}`} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </label>
              <button type="button" className="vf-apply-sm" onClick={apply}>
                Apply
              </button>
            </div>
          </details>

          <details className="vf-acc" open>
            <summary>Odometer</summary>
            <div className="vf-acc-body vf-inline-grid">
              <label className="vf-field">
                <span>Min</span>
                <input
                  type="number"
                  value={draft.odometer_min}
                  onChange={(e) => setDraft((d) => ({ ...d, odometer_min: e.target.value }))}
                />
              </label>
              <label className="vf-field">
                <span>Max</span>
                <input
                  type="number"
                  value={draft.odometer_max}
                  onChange={(e) => setDraft((d) => ({ ...d, odometer_max: e.target.value }))}
                />
              </label>
              <button type="button" className="vf-apply-sm" onClick={apply}>
                Apply
              </button>
            </div>
          </details>

          <details className="vf-acc" open>
            <summary>Bid</summary>
            <div className="vf-acc-body">
              <label className="vf-field">
                <select
                  value={draft.bid_bucket}
                  onChange={(e) => setDraft((d) => ({ ...d, bid_bucket: e.target.value }))}
                >
                  {bidBuckets.map((b) => (
                    <option key={b.id || 'all'} value={b.id}>
                      {b.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </details>

          <MultiAccordion title="Make" options={options.make ?? []} values={draft.make} onToggle={(v) => toggleMulti('make', v)} />
          <MultiAccordion title="Model" options={options.model ?? []} values={draft.model} onToggle={(v) => toggleMulti('model', v)} />
          <MultiAccordion title="Location" options={options.location ?? []} values={draft.location} onToggle={(v) => toggleMulti('location', v)} />
          <MultiAccordion title="Transmission" options={options.transmission ?? []} values={draft.transmission} onToggle={(v) => toggleMulti('transmission', v)} />
          <MultiAccordion title="Fuel" options={options.fuel ?? []} values={draft.fuel} onToggle={(v) => toggleMulti('fuel', v)} />
          <MultiAccordion title="Damage" options={options.damage ?? []} values={draft.damage} onToggle={(v) => toggleMulti('damage', v)} />
          <MultiAccordion title="Sale Date" options={options.sale_date ?? []} values={draft.sale_date} onToggle={(v) => toggleMulti('sale_date', v)} />
          <MultiAccordion title="Exterior colour" options={options.exterior_color ?? []} values={draft.exterior_color} onToggle={(v) => toggleMulti('exterior_color', v)} />
          <MultiAccordion title="Sale Status" options={options.sales_status ?? []} values={draft.sales_status} onToggle={(v) => toggleMulti('sales_status', v)} />
          <MultiAccordion title="Title type" options={options.title_type ?? []} values={draft.title_type} onToggle={(v) => toggleMulti('title_type', v)} />

          <button type="button" className="vehicle-filters__search" onClick={apply}>
            {isEs ? 'Buscar' : 'Search'}
          </button>
        </div>
      )}
    </aside>
  )
}

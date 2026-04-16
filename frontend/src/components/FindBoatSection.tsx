import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { fetchFindBoatOptions, fetchListings } from '../api/client'
import type { Listing, VehicleCategory } from '../api/types'
import type { AppLanguage } from '../i18n'
import './FindBoatSection.css'

type Tab = 'finder' | 'locations' | 'makes' | 'quick' | 'damage'

interface FindBoatSectionProps {
  category: VehicleCategory
  findTitle: string
  language: AppLanguage
  onBoatFinderSearch: (params: Record<string, string>) => void
}

export function FindBoatSection({
  category,
  findTitle,
  language,
  onBoatFinderSearch,
}: FindBoatSectionProps) {
  const [tab, setTab] = useState<Tab>('finder')
  const [data, setData] = useState<Awaited<ReturnType<typeof fetchFindBoatOptions>> | null>(null)
  const [allListings, setAllListings] = useState<Listing[]>([])
  const [countsLoading, setCountsLoading] = useState(false)
  const [form, setForm] = useState({
    make: '',
    model: '',
    from_year: '',
    to_year: '',
    location: '',
    primary_dmg: '',
    title_type: '',
  })

  useEffect(() => {
    fetchFindBoatOptions(category)
      .then(setData)
      .catch(() => setData(null))
  }, [category])

  useEffect(() => {
    setCountsLoading(true)
    fetchListings({ category, page: 1 })
      .then((r) => setAllListings(r.items))
      .catch(() => setAllListings([]))
      .finally(() => setCountsLoading(false))
  }, [category])

  const bf = data?.boat_finder ?? {}
  const years = bf.year ?? []
  const isEs = language === 'es'

  const submitFinder = (e: FormEvent) => {
    e.preventDefault()
    const params: Record<string, string> = {}
    if (form.make) params.make = form.make
    if (form.model) params.model = form.model
    if (form.from_year) params.year_from = form.from_year
    if (form.to_year) params.year_to = form.to_year
    if (form.location) params.location = form.location
    if (form.primary_dmg) params.damage = form.primary_dmg
    if (form.title_type) params.title_type = form.title_type
    params.page = '1'
    onBoatFinderSearch(params)
  }

  const locationCounts = useMemo(() => {
    const out: Record<string, number> = {}
    ;(data?.locations ?? []).forEach((loc) => {
      out[loc] = allListings.filter((r) => (r.location ?? '').toLowerCase().includes(loc.toLowerCase())).length
    })
    return out
  }, [data?.locations, allListings])

  const makeCounts = useMemo(() => {
    const out: Record<string, number> = {}
    ;(data?.makes ?? []).forEach((m) => {
      out[m] = allListings.filter((r) => (r.make ?? '') === m).length
    })
    return out
  }, [data?.makes, allListings])

  const damageCounts = useMemo(() => {
    const out: Record<string, number> = {}
    ;(data?.damage_types ?? []).forEach((dmg) => {
      out[dmg] = allListings.filter((r) => (r.damage ?? '') === dmg).length
    })
    return out
  }, [data?.damage_types, allListings])

  const quickPickCounts = useMemo(() => {
    const out: Record<string, number> = {}
    ;(data?.quick_picks ?? []).forEach((q) => {
      if (q.toLowerCase().includes('under')) {
        out[q] = allListings.filter((r) => (r.current_bid ?? 0) <= 5000).length
      } else if (q.toLowerCase().includes('runs')) {
        out[q] = allListings.filter((r) => (r.condition ?? '').toLowerCase().includes('runs and drives')).length
      } else if (q.toLowerCase().includes('clean')) {
        out[q] = allListings.filter((r) => (r.title_type ?? '').toLowerCase().includes('clean')).length
      } else if (q.toLowerCase().includes('no minimum') || q.toLowerCase().includes('no')) {
        out[q] = allListings.filter((r) => (r.bid_count ?? 0) === 0).length
      } else {
        out[q] = 0
      }
    })
    return out
  }, [data?.quick_picks, allListings])

  const openList = (params: Record<string, string>) => {
    params.page = '1'
    onBoatFinderSearch(params)
  }

  return (
    <section className="find-boat" aria-labelledby="find-boat-heading">
      <div className="find-boat__card">
        <div className="find-boat__head">
          <span className="find-boat__head-icon" aria-hidden>
            🔍
          </span>
          <h2 id="find-boat-heading">{findTitle}</h2>
        </div>
        <div className="find-boat__tabs" role="tablist">
          {(
            [
              ['finder', isEs ? 'Buscador de barcos' : 'Boat Finder'],
              ['locations', isEs ? 'Ubicaciones' : 'Locations'],
              ['makes', isEs ? 'Marcas' : 'Makes'],
              ['quick', isEs ? 'Selecciones rapidas' : 'Quick Picks'],
              ['damage', isEs ? 'Tipos de dano' : 'Damage Types'],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={tab === id}
              className={tab === id ? 'active' : ''}
              onClick={() => setTab(id)}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === 'finder' && (
          <form className="find-boat__finder" onSubmit={submitFinder}>
            <label>
              {isEs ? 'Marca' : 'Make'}
              <select value={form.make} onChange={(e) => setForm((f) => ({ ...f, make: e.target.value }))}>
                <option value="">{isEs ? 'Todos' : 'All'}</option>
                {(bf.make ?? []).map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </label>
            <label>
              {isEs ? 'Modelo' : 'Model'}
              <select value={form.model} onChange={(e) => setForm((f) => ({ ...f, model: e.target.value }))}>
                <option value="">{isEs ? 'Todos' : 'All'}</option>
                {(bf.model ?? []).map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </label>
            <label>
              {isEs ? 'Desde ano' : 'From year'}
              <select
                value={form.from_year}
                onChange={(e) => setForm((f) => ({ ...f, from_year: e.target.value }))}
              >
                <option value="">{isEs ? 'Todos' : 'All'}</option>
                {years.map((y) => (
                  <option key={`fy-${y}`} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </label>
            <label>
              {isEs ? 'Hasta ano' : 'To year'}
              <select value={form.to_year} onChange={(e) => setForm((f) => ({ ...f, to_year: e.target.value }))}>
                <option value="">{isEs ? 'Todos' : 'All'}</option>
                {years.map((y) => (
                  <option key={`ty-${y}`} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </label>
            <label>
              {isEs ? 'Ubicacion' : 'Location'}
              <select
                value={form.location}
                onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
              >
                <option value="">{isEs ? 'Todos' : 'All'}</option>
                {(bf.location ?? []).map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </label>
            <label>
              {isEs ? 'Dano principal' : 'Primary DMG'}
              <select
                value={form.primary_dmg}
                onChange={(e) => setForm((f) => ({ ...f, primary_dmg: e.target.value }))}
              >
                <option value="">{isEs ? 'Todos' : 'All'}</option>
                {(bf.primary_dmg ?? []).map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </label>
            <label>
              {isEs ? 'Tipo de titulo' : 'Title type'}
              <select
                value={form.title_type}
                onChange={(e) => setForm((f) => ({ ...f, title_type: e.target.value }))}
              >
                <option value="">{isEs ? 'Todos' : 'All'}</option>
                {(bf.title_type ?? []).map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </label>
            <button type="submit" className="find-boat__submit">
              {isEs ? 'Buscar' : 'Search'}
            </button>
          </form>
        )}

        {tab === 'locations' && (
          <ul className="find-boat__list">
            {(data?.locations ?? [])
              .filter((l) => (locationCounts[l] ?? 0) > 0)
              .map((l) => (
                <li key={l}>
                  <button type="button" className="find-boat__list-btn" onClick={() => openList({ location: l })}>
                    <span>{l}</span>
                    <span className="find-boat__count">({locationCounts[l] ?? 0})</span>
                  </button>
                </li>
              ))}
            {countsLoading ? <li className="find-boat__list-note">Loading…</li> : null}
          </ul>
        )}
        {tab === 'makes' && (
          <ul className="find-boat__list">
            {(data?.makes ?? [])
              .filter((m) => (makeCounts[m] ?? 0) > 0)
              .map((m) => (
                <li key={m}>
                  <button type="button" className="find-boat__list-btn" onClick={() => openList({ make: m })}>
                    <span>{m}</span>
                    <span className="find-boat__count">({makeCounts[m] ?? 0})</span>
                  </button>
                </li>
              ))}
            {countsLoading ? <li className="find-boat__list-note">Loading…</li> : null}
          </ul>
        )}
        {tab === 'quick' && (
          <ul className="find-boat__list">
            {(data?.quick_picks ?? [])
              .filter((q) => (quickPickCounts[q] ?? 0) > 0)
              .map((q) => (
                <li key={q}>
                  <button
                    type="button"
                    className="find-boat__list-btn"
                    onClick={() => {
                      const lc = q.toLowerCase()
                      if (lc.includes('under')) openList({ bid_max: '5000' })
                      else if (lc.includes('runs')) openList({ featured: 'Run and Drivers' })
                      else if (lc.includes('clean')) openList({ title_type: 'Clean Title' })
                      else openList({ bid_bucket: 'no_bids' })
                    }}
                  >
                    <span>{q}</span>
                    <span className="find-boat__count">({quickPickCounts[q] ?? 0})</span>
                  </button>
                </li>
              ))}
            {countsLoading ? <li className="find-boat__list-note">Loading…</li> : null}
          </ul>
        )}
        {tab === 'damage' && (
          <ul className="find-boat__list">
            {(data?.damage_types ?? [])
              .filter((dmg) => (damageCounts[dmg] ?? 0) > 0)
              .map((dmg) => (
                <li key={dmg}>
                  <button type="button" className="find-boat__list-btn" onClick={() => openList({ damage: dmg })}>
                    <span>{dmg}</span>
                    <span className="find-boat__count">({damageCounts[dmg] ?? 0})</span>
                  </button>
                </li>
              ))}
            {countsLoading ? <li className="find-boat__list-note">Loading…</li> : null}
          </ul>
        )}
      </div>
    </section>
  )
}

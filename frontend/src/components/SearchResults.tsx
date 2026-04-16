import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Listing } from '../api/types'
import { useCompare } from '../compare'
import type { AppLanguage } from '../i18n'
import './SearchResults.css'

type SortKey = 'year' | 'lot' | 'model' | 'location' | 'sale_date' | 'title' | 'odometer' | 'bid'

interface SearchResultsProps {
  items: Listing[]
  loading: boolean
  error: string | null
  activeFeatured: string
  onFeaturedChange: (value: string) => void
  sortKey: SortKey
  sortDesc: boolean
  page: number
  onSortKeyChange: (value: SortKey) => void
  onSortDescChange: (value: boolean) => void
  onPageChange: (value: number) => void
  language: AppLanguage
}

const featuredFilters = [
  'Buy now',
  'Cars with No Damage',
  'Vehicle for Parts',
  'Clean Title',
  'Run and Drivers',
  'Flood Damaged',
  'Vandalism',
  'Selling Today',
  'No Bids Yet',
  'Lots with Bids',
  'New Arrivals',
  'Pure Sale',
]

function featuredMatch(row: Listing, f: string): boolean {
  const lcCond = (row.condition ?? '').toLowerCase()
  const lcDmg = (row.damage ?? '').toLowerCase()
  const lcTitle = (row.title_type ?? '').toLowerCase()
  const lcStatus = (row.sales_status ?? '').toLowerCase()
  const today = new Date().toISOString().slice(0, 10)

  switch (f) {
    case 'Buy now':
      return row.buy_it_now
    case 'Cars with No Damage':
      return lcDmg.includes('all over') || lcDmg.includes('no damage')
    case 'Vehicle for Parts':
      return lcCond.includes('parts')
    case 'Clean Title':
      return lcTitle.includes('clean')
    case 'Run and Drivers':
      return lcCond.includes('runs and drives')
    case 'Flood Damaged':
      return lcDmg.includes('flood')
    case 'Vandalism':
      return lcDmg.includes('vandalism')
    case 'Selling Today':
      return row.sale_date === today
    case 'No Bids Yet':
      return (row.bid_count ?? 0) === 0
    case 'Lots with Bids':
      return (row.bid_count ?? 0) > 0
    case 'New Arrivals':
      return lcCond.includes('new arrivals')
    case 'Pure Sale':
      return lcStatus.includes('pure sale')
    default:
      return true
  }
}

function watchBtn(watched: boolean, onToggle: () => void) {
  return (
    <button
      type="button"
      className={`watch-btn ${watched ? 'watch-btn--active' : ''}`}
      title="Add to watchlist"
      aria-label="Add to watchlist"
      onClick={onToggle}
    >
      ❤
    </button>
  )
}

export function SearchResults({
  items,
  loading,
  error,
  activeFeatured,
  onFeaturedChange,
  sortKey,
  sortDesc,
  page,
  onSortKeyChange,
  onSortDescChange,
  onPageChange,
  language,
}: SearchResultsProps) {
  const isEs = language === 'es'
  const pageSize = 10
  const { addItem } = useCompare()
  const navigate = useNavigate()
  const [watchedIds, setWatchedIds] = useState<number[]>([])
  const toggleWatch = (id: number) => {
    setWatchedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }


  const filtered = useMemo(() => {
    return activeFeatured ? items.filter((r) => featuredMatch(r, activeFeatured)) : items
  }, [items, activeFeatured])

  const sorted = useMemo(() => {
    const list = [...filtered]
    list.sort((a, b) => {
      const pick = (x: Listing): number | string => {
        switch (sortKey) {
          case 'year':
            return x.year ?? 0
          case 'lot':
            return Number(x.lot_number) || 0
          case 'model':
            return x.model ?? ''
          case 'location':
            return x.location ?? ''
          case 'sale_date':
            return x.sale_date ?? ''
          case 'title':
            return x.title ?? ''
          case 'odometer':
            return x.odometer ?? 0
          case 'bid':
            return x.current_bid ?? 0
          default:
            return 0
        }
      }
      const va = pick(a)
      const vb = pick(b)
      if (typeof va === 'number' && typeof vb === 'number') return va - vb
      return String(va).localeCompare(String(vb))
    })
    return sortDesc ? list.reverse() : list
  }, [filtered, sortKey, sortDesc])

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize))
  const safePage = Math.min(page, totalPages)
  const paged = sorted.slice((safePage - 1) * pageSize, safePage * pageSize)

  const showCompareNotice = (row: Listing) => {
    const status = addItem(row)
    const msg =
      status === 'added'
        ? isEs
          ? 'Vehiculo agregado para comparar'
          : 'Vehicle added to compare'
        : status === 'limit'
          ? isEs
            ? 'Puedes comparar hasta 4 vehiculos'
            : 'You can compare up to 4 vehicles'
          : isEs
            ? 'El vehiculo ya esta en comparacion'
            : 'Vehicle already added to compare'
    const el = document.getElementById('compare-toast')
    if (el) {
      el.textContent = msg
      el.classList.add('show')
      window.setTimeout(() => {
        el.classList.remove('show')
      }, 1800)
    }
  }

  if (loading) {
    return (
      <div className="search-results search-results--loading" role="status">
        {isEs ? 'Cargando resultados…' : 'Loading results…'}
      </div>
    )
  }
  if (error) {
    return (
      <div className="search-results search-results--error" role="alert">
        {error}
      </div>
    )
  }

  return (
    <div className="search-results">
      <div className="featured-filters" aria-label={isEs ? 'Filtros destacados' : 'Featured filters'}>
        {featuredFilters.map((f) => (
          <button
            key={f}
            type="button"
            className={`chip ${activeFeatured === f ? 'chip--active' : ''}`}
            onClick={() => {
              onFeaturedChange(activeFeatured === f ? '' : f)
            }}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="search-results__toolbar">
        <div className="search-results__sort-wrap">
          <label>
            {isEs ? 'Ordenar por' : 'Sort by'}
            <select
              value={sortKey}
              onChange={(e) => {
                onSortKeyChange(e.target.value as SortKey)
                onPageChange(1)
              }}
            >
              <option value="year">Year</option>
              <option value="lot">Lot</option>
              <option value="model">Model</option>
              <option value="location">Location</option>
              <option value="sale_date">Sale Date</option>
              <option value="title">Title</option>
              <option value="odometer">Odometer</option>
              <option value="bid">Bid</option>
            </select>
          </label>
          <button type="button" className="secondary" onClick={() => onSortDescChange(!sortDesc)}>
            {sortDesc ? (isEs ? 'Desc' : 'Desc') : isEs ? 'Asc' : 'Asc'}
          </button>
        </div>
        <div className="search-results__actions">
          <button type="button" className="secondary" onClick={() => window.alert(isEs ? 'Busqueda guardada' : 'Search saved')}>
            {isEs ? 'Guardar busqueda' : 'Save Search'}
          </button>
          <button type="button" className="secondary" onClick={() => window.print()}>
            {isEs ? 'Imprimir' : 'Print'}
          </button>
        </div>
      </div>

      <div className="search-results__scroll">
        <table className="search-results__table">
          <thead>
            <tr>
              <th scope="col">{isEs ? 'Imagen' : 'Image'}</th>
              <th scope="col">{isEs ? 'Info del lote' : 'Lot Info'}</th>
              <th scope="col">{isEs ? 'Info del vehiculo' : 'Vehicle Info'}</th>
              <th scope="col">{isEs ? 'Condicion' : 'Condition'}</th>
              <th scope="col">{isEs ? 'Info de venta' : 'Sale Info'}</th>
              <th scope="col">{isEs ? 'Ofertas' : 'Bids'}</th>
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 ? (
              <tr>
                <td colSpan={6} className="search-results__empty">
                  {isEs ? 'No hay resultados para tus criterios.' : 'No listings match your criteria.'}
                </td>
              </tr>
            ) : (
              paged.map((row) => (
                <tr key={row.id}>
                  <td>
                    <div className="cell-top">{watchBtn(watchedIds.includes(row.id), () => toggleWatch(row.id))}</div>
                    <div className="search-results__thumb-wrap">
                      {row.images[0] ? (
                        <img src={row.images[0]} alt="" width={80} height={60} className="search-results__thumb" />
                      ) : (
                        <div className="search-results__thumb-placeholder">No image</div>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="cell-top">{watchBtn(watchedIds.includes(row.id), () => toggleWatch(row.id))}</div>
                    <div className="search-results__stack">
                      <span><strong>Lot number:</strong> {row.lot_number}</span>
                      <span><strong>Title:</strong> {(row.title ?? `${row.year ?? ''} ${row.make ?? ''} ${row.model ?? ''}`.trim()) || '—'}</span>
                      <span className="muted"><strong>Sale Date:</strong> {row.sale_date ?? '—'}</span>
                      <div className="tiny-actions">
                        <button
                          type="button"
                          className="icon-btn"
                          data-label={isEs ? 'Comparar' : 'Compare'}
                          title={isEs ? 'Comparar' : 'Compare'}
                          onClick={() => showCompareNotice(row)}
                        >
                          ⚖
                        </button>
                        <button type="button" className="icon-btn" data-label="Email" title="Email">✉</button>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="cell-top">{watchBtn(watchedIds.includes(row.id), () => toggleWatch(row.id))}</div>
                    <div className="search-results__stack">
                      <span><strong>Location:</strong> {row.location ?? '—'}</span>
                      <span className="muted"><strong>Sale Status:</strong> {row.sales_status ?? '—'}</span>
                      <span className="muted"><strong>Pre Bidding Ends in:</strong> {row.pre_bidding_ends_in ?? '—'}</span>
                    </div>
                  </td>
                  <td>
                    <div className="cell-top">{watchBtn(watchedIds.includes(row.id), () => toggleWatch(row.id))}</div>
                    <div className="search-results__stack">
                      <span><strong>Odometer:</strong> {row.odometer != null ? row.odometer.toLocaleString() : '—'}</span>
                      <span className="muted"><strong>Actual Cash Value:</strong> {row.actual_cash_value != null ? `$${row.actual_cash_value.toLocaleString()}` : '—'}</span>
                    </div>
                  </td>
                  <td>
                    <div className="cell-top">{watchBtn(watchedIds.includes(row.id), () => toggleWatch(row.id))}</div>
                    <div className="search-results__stack">
                      <span><strong>Salvage Title:</strong> {row.title_type ?? '—'}</span>
                      <span className="muted"><strong>Primary Dmg:</strong> {row.damage ?? '—'}</span>
                      <span className="muted"><strong>Keys Available:</strong> {row.keys_available == null ? '—' : row.keys_available ? 'Yes' : 'No'}</span>
                    </div>
                  </td>
                  <td>
                    <div className="cell-top">{watchBtn(watchedIds.includes(row.id), () => toggleWatch(row.id))}</div>
                    <div className="search-results__stack">
                      <strong>Current Bid: {row.current_bid != null ? `$${row.current_bid.toLocaleString()}` : '—'}</strong>
                      <div className="bid-actions">
                        <button type="button" className="tiny-btn tiny-btn--primary">Bid Now</button>
                        <button type="button" className="tiny-btn" onClick={() => navigate(`/vehicles/${row.id}`, { state: { listing: row } })}>Details</button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button type="button" className="secondary" disabled={safePage <= 1} onClick={() => onPageChange(Math.max(1, safePage - 1))}>
          {isEs ? 'Anterior' : 'Prev'}
        </button>
        <span>
          {isEs ? 'Pagina' : 'Page'} {safePage} / {totalPages} ({sorted.length}{' '}
          {isEs ? 'resultados' : 'results'})
        </span>
        <button
          type="button"
          className="secondary"
          disabled={safePage >= totalPages}
          onClick={() => onPageChange(Math.min(totalPages, safePage + 1))}
        >
          {isEs ? 'Siguiente' : 'Next'}
        </button>
      </div>
      <div id="compare-toast" className="compare-toast" />
    </div>
  )
}

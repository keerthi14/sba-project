import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import type { AppLanguage } from '../i18n'

interface SalesRow {
  sale_time: string
  sale_name: string
  region: string
  sale_type: string
  current_sale: string
  next_sale: string
  future_sale: string
}

type SortKey = keyof SalesRow

const seedRows: SalesRow[] = [
  {
    sale_time: '02:00 PM CDT',
    sale_name: 'OR - Eugene',
    region: 'Copart US',
    sale_type: 'Copart US',
    current_sale: 'Apr 14, 2026',
    next_sale: 'May 19, 2026',
    future_sale: 'Future Sale',
  },
  {
    sale_time: '01:00 PM CDT',
    sale_name: 'MT - Helena',
    region: 'Copart US',
    sale_type: 'Copart US',
    current_sale: 'Apr 14, 2026',
    next_sale: 'Apr 21, 2026',
    future_sale: 'Future Sale',
  },
  {
    sale_time: '09:00 AM CDT',
    sale_name: 'FL - Ocala',
    region: 'Copart US',
    sale_type: 'Copart US',
    current_sale: 'Apr 14, 2026',
    next_sale: 'Apr 21, 2026',
    future_sale: 'Future Sale',
  },
  {
    sale_time: '12:00 PM CDT',
    sale_name: 'TX - Houston',
    region: 'Copart US',
    sale_type: 'Copart US',
    current_sale: 'Apr 14, 2026',
    next_sale: 'May 1, 2026',
    future_sale: 'Future Sale',
  },
  {
    sale_time: '03:00 PM CDT',
    sale_name: 'AK - Anchorage',
    region: 'Copart US',
    sale_type: 'Copart US',
    current_sale: 'Apr 14, 2026',
    next_sale: 'Apr 28, 2026',
    future_sale: 'Future Sale',
  },
  {
    sale_time: '09:00 AM CDT',
    sale_name: 'TN - Knoxville',
    region: 'Copart US',
    sale_type: 'Copart US',
    current_sale: 'Apr 14, 2026',
    next_sale: 'Apr 28, 2026',
    future_sale: 'Future Sale',
  },
  {
    sale_time: '01:00 PM CDT',
    sale_name: 'CO - Denver Central',
    region: 'Copart US',
    sale_type: 'Copart US',
    current_sale: 'Apr 14, 2026',
    next_sale: 'Apr 21, 2026',
    future_sale: 'Future Sale',
  },
  {
    sale_time: '12:00 PM CDT',
    sale_name: 'NE - Lincoln',
    region: 'Copart US',
    sale_type: 'Copart US',
    current_sale: 'Apr 14, 2026',
    next_sale: 'Apr 21, 2026',
    future_sale: 'Future Sale',
  },
  {
    sale_time: '12:00 PM CDT',
    sale_name: 'MO - Columbia',
    region: 'Copart US',
    sale_type: 'Copart US',
    current_sale: 'Apr 14, 2026',
    next_sale: 'Apr 21, 2026',
    future_sale: 'Future Sale',
  },
]

export function SalesListPage({ language }: { language: AppLanguage }) {
  const isEs = language === 'es'
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState<SortKey>('sale_time')
  const [sortAsc, setSortAsc] = useState(true)

  const rows = useMemo(() => {
    const q = search.trim().toLowerCase()
    const filtered = seedRows.filter((r) =>
      Object.values(r).some((v) => v.toLowerCase().includes(q))
    )
    const sorted = [...filtered].sort((a, b) => String(a[sortBy]).localeCompare(String(b[sortBy])))
    return sortAsc ? sorted : sorted.reverse()
  }, [search, sortBy, sortAsc])

  const onSort = (k: SortKey) => {
    if (sortBy === k) setSortAsc((v) => !v)
    else {
      setSortBy(k)
      setSortAsc(true)
    }
  }

  return (
    <main className="advanced-page">
      <section className="advanced-hero">
        <h1>Sales List</h1>
        <p>
          Here, we provide a salvage auction list for your convenience. Look through the sales listed on
          this page to find out when Boat auctions are set to end. Sales are listed by time (including
          time zone), facility, and date. You can click on a column heading to sort items. For example,
          click the "Sale Date" column heading to sort the list by date. Click on a specific date to view
          relevant vehicle listings and find out more about the salvage Boats for sale that are up for
          auction. Once you have found a Copart Boat auction of choice, register to gain access to the
          Copart website and bid on salvage Boats without needing a dealer license.
        </p>
      </section>

      <section className="adv-card">
        <label className="sales-search">
          <span>{isEs ? 'Buscar:' : 'Search:'}</span>
          <input value={search} onChange={(e) => setSearch(e.target.value)} />
        </label>

        <div className="todays-table-wrap">
          <table className="todays-table">
            <thead>
              <tr>
                <th><button type="button" className="calendar-link" onClick={() => onSort('sale_time')}>Sale Time</button></th>
                <th><button type="button" className="calendar-link" onClick={() => onSort('sale_name')}>Sale Name</button></th>
                <th><button type="button" className="calendar-link" onClick={() => onSort('region')}>Region</button></th>
                <th><button type="button" className="calendar-link" onClick={() => onSort('sale_type')}>Sale Type</button></th>
                <th><button type="button" className="calendar-link" onClick={() => onSort('current_sale')}>Current Sale</button></th>
                <th><button type="button" className="calendar-link" onClick={() => onSort('next_sale')}>Next Sale</button></th>
                <th><button type="button" className="calendar-link" onClick={() => onSort('future_sale')}>Future Sale</button></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={`${row.sale_time}-${row.sale_name}`}>
                  <td>{row.sale_time}</td>
                  <td>{row.sale_name}</td>
                  <td>{row.region}</td>
                  <td>{row.sale_type}</td>
                  <td>
                    <Link to={`/boats?sale_date=${encodeURIComponent(row.current_sale)}`}>{row.current_sale}</Link>
                  </td>
                  <td>{row.next_sale}</td>
                  <td>{row.future_sale}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}

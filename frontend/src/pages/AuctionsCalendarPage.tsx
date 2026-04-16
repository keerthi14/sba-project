import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import type { AppLanguage } from '../i18n'

interface AuctionsCalendarPageProps {
  language: AppLanguage
}

interface AuctionLocationRow {
  id: string
  location: string
  sale_time: string
  sale_name: string
  region: string
  sale_type: string
}

interface AuctionDay {
  dateISO: string
  label: string
  weekday: string
  locations: AuctionLocationRow[]
}

interface AuctionMonth {
  key: string
  title: string
  days: AuctionDay[]
}

function monthName(dt: Date) {
  return dt.toLocaleString('en-US', { month: 'long' })
}

function makeMonthData(start: Date, offset: number): AuctionMonth {
  const d = new Date(start.getFullYear(), start.getMonth() + offset, 1)
  const monthTitle = `${monthName(d)} ${d.getFullYear()}`
  const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
  const daySeeds = [5, 12, 15, 22, 28]
  const baseLocations = [
    'Rocky View County, AB',
    'Anchorage, AK',
    'Phoenix, AZ',
    'Reno, NV',
    'Melbourne, FL',
  ]

  const days = daySeeds.map((day, idx) => {
    const dd = new Date(d.getFullYear(), d.getMonth(), Math.min(day, 28))
    const dateISO = dd.toISOString().slice(0, 10)
    const weekday = dd.toLocaleString('en-US', { weekday: 'long' })
    const label = `${dd.getDate()} ${monthName(dd)} ${dd.getFullYear()}`
    const locations: AuctionLocationRow[] = baseLocations.slice(0, 3 + (idx % 3)).map((loc, locIdx) => ({
      id: `${key}-${day}-${locIdx}`,
      location: loc,
      sale_time: `${7 + locIdx}:00 a.m. ${locIdx % 2 ? 'EST' : 'CST'}`,
      sale_name: `${monthName(dd)} Marine Sale ${locIdx + 1}`,
      region: ['North', 'South', 'East', 'West'][locIdx % 4],
      sale_type: ['Live Auction', 'Virtual Auction', 'Timed Auction'][locIdx % 3],
    }))
    return { dateISO, label, weekday, locations }
  })

  return { key, title: monthTitle, days }
}

export function AuctionsCalendarPage({ language }: AuctionsCalendarPageProps) {
  const isEs = language === 'es'
  const months = useMemo(() => {
    const now = new Date()
    return Array.from({ length: 12 }).map((_, i) => makeMonthData(now, i))
  }, [])
  const [monthIdx, setMonthIdx] = useState(0)
  const [selected, setSelected] = useState<AuctionLocationRow | null>(null)

  const current = months[monthIdx]
  const prev = monthIdx > 0 ? months[monthIdx - 1] : null
  const next = monthIdx < months.length - 1 ? months[monthIdx + 1] : null

  return (
    <main className="advanced-page">
      <section className="advanced-hero">
        <h1>{isEs ? 'Calendario de subastas' : 'Auctions Calendar'}</h1>
        <p>
          On this page, you will see another method to locate cheap Boats at your convenience. Look
          through our sales calendar to browse through Boat auctions by date and location. Search through
          the current month or find Boats well in advance by selecting a month at the top of the page.
          When you've found a sale that falls within a suitable time and location for you, click on the
          corresponding link to view relevant vehicle listings. Once you have located a vehicle of
          interest, view its listing for detailed bid information, inspect it and be sure to register for
          the opportunity to bid at Copart before the virtual sale time expires.
        </p>
      </section>

      <section className="adv-card">
        <div className="calendar-head">
          <h2>{current.title}</h2>
          <div className="calendar-nav">
            {prev ? (
              <button type="button" className="calendar-link" onClick={() => setMonthIdx(monthIdx - 1)}>
                {monthName(new Date(`${prev.key}-01`))}
              </button>
            ) : null}
            {next ? (
              <button type="button" className="calendar-link" onClick={() => setMonthIdx(monthIdx + 1)}>
                {monthName(new Date(`${next.key}-01`))}
              </button>
            ) : null}
          </div>
        </div>

        <div className="calendar-days">
          {current.days.map((day) => (
            <article key={day.dateISO} className="calendar-day">
              <h3>{`${day.label} ${day.weekday}`}</h3>
              <p>{isEs ? 'Subastas en vivo disponibles:' : 'Live auctions available:'}</p>
              <div className="calendar-locations">
                {day.locations.map((loc) => (
                  <label key={loc.id} className="calendar-loc">
                    <input
                      type="radio"
                      name={`day-${day.dateISO}`}
                      checked={selected?.id === loc.id}
                      onChange={() => setSelected(loc)}
                    />
                    {loc.location}
                  </label>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {selected ? (
        <div className="calendar-popup__backdrop" onClick={() => setSelected(null)}>
          <div className="calendar-popup" onClick={(e) => e.stopPropagation()}>
            <h4>auctions are coming</h4>
            <div className="calendar-popup__grid">
              <p>
                <strong>Sale Time:</strong> {selected.sale_time}
              </p>
              <p>
                <strong>Sale Name:</strong> {selected.sale_name}
              </p>
              <p>
                <strong>Region:</strong> {selected.region}
              </p>
              <p>
                <strong>Sale Type:</strong> {selected.sale_type}
              </p>
            </div>
            <p>
              new to salvage boat auctions.com{' '}
              <Link to="/register?redirect=/auctions-calendar">register here</Link>
            </p>
            <button type="button" className="tiny-btn" onClick={() => setSelected(null)}>
              {isEs ? 'Cerrar' : 'Close'}
            </button>
          </div>
        </div>
      ) : null}
    </main>
  )
}

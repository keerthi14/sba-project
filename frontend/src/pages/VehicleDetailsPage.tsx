import { useMemo } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import type { Listing } from '../api/types'
import type { AppLanguage } from '../i18n'

export function VehicleDetailsPage({ language }: { language: AppLanguage }) {
  const { id } = useParams()
  const location = useLocation()
  const listing = (location.state as { listing?: Listing } | null)?.listing
  const isEs = language === 'es'

  const title = useMemo(() => {
    if (listing?.title) return listing.title
    return `Vehicle #${id}`
  }, [listing, id])

  if (!listing) {
    return (
      <main className="advanced-page">
        <section className="adv-card">
          <h1>{title}</h1>
          <p>{isEs ? 'Abre detalles desde la tabla de vehiculos.' : 'Open details from the vehicles table.'}</p>
        </section>
      </main>
    )
  }

  return (
    <main className="advanced-page">
      <section className="adv-card">
        <h1>{title}</h1>
        <div className="details-grid">
          <article className="details-card">
            <h2>Lot Info</h2>
            <p><strong>Lot:</strong> {listing.lot_number}</p>
            <p><strong>Sale Date:</strong> {listing.sale_date ?? '—'}</p>
            <p><strong>Location:</strong> {listing.location ?? '—'}</p>
          </article>
          <article className="details-card">
            <h2>Vehicle Info</h2>
            <p><strong>Year:</strong> {listing.year ?? '—'}</p>
            <p><strong>Make / Model:</strong> {[listing.make, listing.model].filter(Boolean).join(' ') || '—'}</p>
            <p><strong>VIN:</strong> {listing.vin ?? '—'}</p>
          </article>
          <article className="details-card">
            <h2>Condition</h2>
            <p><strong>Damage:</strong> {listing.damage ?? '—'}</p>
            <p><strong>Title:</strong> {listing.title_type ?? '—'}</p>
            <p><strong>Current Bid:</strong> {listing.current_bid != null ? `$${listing.current_bid.toLocaleString()}` : '—'}</p>
          </article>
        </div>
      </section>
    </main>
  )
}

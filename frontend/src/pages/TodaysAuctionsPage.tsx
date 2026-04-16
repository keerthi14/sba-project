import type { AppLanguage } from '../i18n'

const sampleRows = [
  {
    sale_time: '7:00 a.m. CST',
    sale_name: 'Houston Marine Salvage',
    region: 'South',
    sale_type: 'Online Live Auction',
    sale_highlights: 'Boats and Jet Skis',
    lane: 'Lane A',
    items: 42,
  },
  {
    sale_time: '9:30 a.m. EST',
    sale_name: 'Florida Boats Public Sale',
    region: 'East',
    sale_type: 'Virtual Auction',
    sale_highlights: 'Clean Title Units',
    lane: 'Lane B',
    items: 33,
  },
  {
    sale_time: '12:00 p.m. PST',
    sale_name: 'West Coast Marine Lots',
    region: 'West',
    sale_type: 'Timed Auction',
    sale_highlights: 'Repairable Inventory',
    lane: 'Lane C',
    items: 28,
  },
]

export function TodaysAuctionsPage({ language }: { language: AppLanguage }) {
  const isEs = language === 'es'

  return (
    <main className="advanced-page">
      <section className="advanced-hero">
        <h1>{isEs ? 'Subastas de hoy' : "Today's Auctions"}</h1>
        <p className="todays-subheader">{isEs ? 'Subastas en vivo ahora' : 'Auctions live right now'}</p>
        <p>{isEs ? 'No hay opciones disponibles en este momento.' : 'There are no options available at this time.'}</p>
      </section>

      <section className="adv-card">
        <h2>{isEs ? 'Subastas mas tarde hoy' : 'Auctions later today'}</h2>
        <div className="todays-table-wrap">
          <table className="todays-table">
            <thead>
              <tr>
                <th>{isEs ? 'Hora de venta' : 'Sale Time'}</th>
                <th>{isEs ? 'Nombre de venta' : 'Sale Name'}</th>
                <th>{isEs ? 'Region' : 'Region'}</th>
                <th>{isEs ? 'Tipo de venta' : 'Sale Type'}</th>
                <th>{isEs ? 'Destacados de venta' : 'Sale Highlights'}</th>
                <th>{isEs ? 'Carril' : 'Lane'}</th>
                <th>{isEs ? 'Articulos' : 'Items'}</th>
              </tr>
            </thead>
            <tbody>
              {sampleRows.map((row) => (
                <tr key={`${row.sale_time}-${row.sale_name}`}>
                  <td>{row.sale_time}</td>
                  <td>{row.sale_name}</td>
                  <td>{row.region}</td>
                  <td>{row.sale_type}</td>
                  <td>{row.sale_highlights}</td>
                  <td>{row.lane}</td>
                  <td>{row.items}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}

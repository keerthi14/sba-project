import { useMemo } from 'react'
import { useCompare } from '../compare'
import type { AppLanguage } from '../i18n'

interface CompareVehiclesPageProps {
  language: AppLanguage
}

type CompareRow = { label: string; value: (index: number) => string }

export function CompareVehiclesPage({ language }: CompareVehiclesPageProps) {
  const { items, removeItem } = useCompare()
  const isEs = language === 'es'

  const rows = useMemo<CompareRow[]>(
    () => [
      { label: isEs ? 'Imagen' : 'Image', value: (i) => (items[i].images[0] ? '__IMAGE__' : '—') },
      { label: isEs ? 'Numero de lote' : 'Lot number', value: (i) => items[i].lot_number || '—' },
      { label: isEs ? 'Marca' : 'Make', value: (i) => items[i].make ?? '—' },
      { label: isEs ? 'Modelo' : 'Model', value: (i) => items[i].model ?? '—' },
      { label: isEs ? 'Ano' : 'Year', value: (i) => String(items[i].year ?? '—') },
      {
        label: isEs ? 'Valor en efectivo real' : 'Actual cash value',
        value: (i) =>
          items[i].actual_cash_value != null ? `$${items[i].actual_cash_value.toLocaleString()}` : '—',
      },
      { label: isEs ? 'Precio Comprar ahora' : 'Buy It Now price', value: (i) => (items[i].buy_it_now ? '$15,000' : '—') },
      { label: isEs ? 'Titulo' : 'Title', value: (i) => items[i].title_type ?? '—' },
      { label: isEs ? 'Estado' : 'State', value: (i) => items[i].state ?? '—' },
      { label: isEs ? 'Odometro' : 'Odometer', value: (i) => (items[i].odometer != null ? `${items[i].odometer}` : '—') },
      { label: isEs ? 'Dano primario' : 'Primary damage', value: (i) => items[i].damage ?? '—' },
      { label: isEs ? 'Dano secundario' : 'Secondary damage', value: () => '—' },
      { label: isEs ? 'VIN' : 'VIN', value: (i) => items[i].vin ?? '—' },
      { label: isEs ? 'Estilo de carroceria' : 'Body style', value: (i) => items[i].body_style ?? '—' },
      { label: isEs ? 'Color' : 'Color', value: (i) => items[i].exterior_color ?? '—' },
      { label: isEs ? 'Motor' : 'Engine', value: (i) => items[i].engine ?? '—' },
      { label: isEs ? 'Cilindros' : 'Cylinders', value: () => '—' },
      { label: isEs ? 'Traccion' : 'Drive', value: (i) => items[i].drive_train ?? '—' },
      { label: isEs ? 'Transmision' : 'Transmission', value: (i) => items[i].transmission ?? '—' },
      { label: isEs ? 'Combustible' : 'Fuel', value: (i) => items[i].fuel ?? '—' },
      {
        label: isEs ? 'Llaves' : 'Keys',
        value: (i) => (items[i].keys_available == null ? '—' : items[i].keys_available ? 'Yes' : 'No'),
      },
      { label: isEs ? 'Destacados' : 'Highlights', value: (i) => items[i].condition ?? '—' },
      { label: isEs ? 'Ubicacion de subasta' : 'Auction location', value: (i) => items[i].location ?? '—' },
      { label: isEs ? 'Fecha de venta' : 'Sale date', value: (i) => items[i].sale_date ?? '—' },
      { label: isEs ? 'Hora de venta virtual' : 'Virtual sale time', value: () => '10:00 AM' },
      { label: isEs ? 'Preoferta termina' : 'Pre bidding ends', value: (i) => items[i].pre_bidding_ends_in ?? '—' },
      {
        label: isEs ? 'Oferta actual' : 'Current bid',
        value: (i) => (items[i].current_bid != null ? `$${items[i].current_bid.toLocaleString()}` : '—'),
      },
    ],
    [items, isEs]
  )

  return (
    <main className="compare-page">
      <div className="compare-page__inner">
        <section className="advanced-hero">
          <h1>{isEs ? 'Comparacion de vehiculos' : 'Vehicle Comparison'}</h1>
        </section>
        {items.length === 0 ? (
          <p>{isEs ? 'No hay vehiculos para comparar.' : 'No vehicles added for comparison yet.'}</p>
        ) : (
          <>
            <div className="compare-table-wrap">
              <table className="compare-table">
                <thead>
                  <tr>
                    <th>{isEs ? 'Detalles del lote' : 'Lot details'}</th>
                    {items.map((item) => (
                      <th key={item.id}>
                        <div className="compare-head">
                          <span>{`${item.year ?? ''} ${item.make ?? ''} ${item.model ?? ''}`.trim() || item.lot_number}</span>
                          <div className="compare-head__actions">
                            <button type="button" className="tiny-btn tiny-btn--primary">
                              {isEs ? 'Ofertar ahora' : 'Bid Now'}
                            </button>
                            <button type="button" className="tiny-btn" onClick={() => removeItem(item.id)}>
                              {isEs ? 'Cerrar' : 'Close'}
                            </button>
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.label}>
                      <td className="compare-label">{row.label}</td>
                      {items.map((item, idx) => (
                        <td key={`${item.id}-${row.label}`}>
                          {row.value(idx) === '__IMAGE__' ? (
                            <img src={item.images[0]} alt="" className="compare-thumb" />
                          ) : (
                            row.value(idx)
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="compare-note">
              Please inspect the auction vehicles before registering. To inspect a vehicle, just get a
              free membership at the Copart website, and visit the yard where the vehicle is stored at
              least 24 hours before the auction. You can bring your mechanic with you. Please remember
              ALL VEHICLES ARE BEING SOLD AS "AS-IS, WHERE-IS" ALL BIDS ARE BINDING AND ALL SALES ARE
              FINAL.
            </p>
          </>
        )}
      </div>
    </main>
  )
}

import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { AppLanguage } from '../i18n'

const quickPicks = [
  ['Buy Now', 27, 'Buy now'],
  ['Cars With No Damage', 11, 'Cars with No Damage'],
  ['Vehicles for Parts', 4, 'Vehicle for Parts'],
  ['Clean Title', 155, 'Clean Title'],
  ['Run and Drivers', 43, 'Run and Drivers'],
  ['Flood Damaged', 36, 'Flood Damaged'],
  ['Vandalism', 29, 'Vandalism'],
  ['Pure Sale', 22, 'Pure Sale'],
] as const

const damagePicks = ['All over', 'Burn', 'Damage History', 'Burn Engine', 'Hail', 'FRear End', 'Side', 'Vandalism']
const vehicleTypePicks = ['Boat', 'Boat with trailer', 'Jet skis', 'Pontoon Booats', 'Fishing Boat', 'Yacht', 'Sport Boat']

export function AdvancedSearchPage({ language }: { language: AppLanguage }) {
  const navigate = useNavigate()
  const isEs = language === 'es'
  const [yearFrom, setYearFrom] = useState('All')
  const [yearTo, setYearTo] = useState('All')
  const [make, setMake] = useState('All')
  const [model, setModel] = useState('All')
  const [currentBid, setCurrentBid] = useState('All')
  const [odometer, setOdometer] = useState('All')
  const [location, setLocation] = useState('All')
  const [titleType, setTitleType] = useState('All')
  const [newlyAdded, setNewlyAdded] = useState('All')
  const [excludeUpcoming, setExcludeUpcoming] = useState(false)
  const [lotNumber, setLotNumber] = useState('')
  const [vinNumber, setVinNumber] = useState('')

  const yearOpts = useMemo(() => ['All', '2027', '2026', '2025', '2024', '2023'], [])

  const goListings = (params: Record<string, string>) => {
    const sp = new URLSearchParams(params)
    navigate(`/boats?${sp.toString()}`)
  }

  const submitVehicleSearch = () => {
    const params: Record<string, string> = {}
    if (yearFrom !== 'All') params.year_from = yearFrom
    if (yearTo !== 'All') params.year_to = yearTo
    if (make !== 'All') params.make = make
    if (model !== 'All') params.model = model
    if (location !== 'All') params.location = location
    if (titleType !== 'All') params.title_type = titleType
    if (newlyAdded === 'Last 24 Hours') params.newly_added = '24h'
    else if (newlyAdded === 'Last 48 Hours') params.newly_added = '48h'
    else if (newlyAdded === 'Last 7 Days') params.newly_added = '7d'
    if (excludeUpcoming) params.exclude_upcoming = '1'
    if (lotNumber.trim()) params.q = lotNumber.trim()
    if (vinNumber.trim()) params.q = vinNumber.trim()
    if (currentBid === 'No Bids Yet') params.bid_bucket = 'no_bids'
    if (currentBid === 'Less than $1,000') params.bid_bucket = 'lt_1000'
    if (currentBid === 'Between $1,000 and $5,000') params.bid_bucket = '1000_5000'
    if (currentBid === 'Between $5,000 and $10,000') params.bid_bucket = '5000_10000'
    if (currentBid === 'More than $10,000') params.bid_bucket = 'gt_10000'
    if (odometer === 'Less than 1,000 miles') params.odometer_max = '1000'
    if (odometer === 'Between 1,000 and 5,000 miles') {
      params.odometer_min = '1000'; params.odometer_max = '5000'
    }
    if (odometer === 'Between 5,000 and 10,000 miles') {
      params.odometer_min = '5000'; params.odometer_max = '10000'
    }
    if (odometer === 'Between 10,000 and 20,000 miles') {
      params.odometer_min = '10000'; params.odometer_max = '20000'
    }
    if (odometer === 'Between 20,000 and 50,000 miles') {
      params.odometer_min = '20000'; params.odometer_max = '50000'
    }
    if (odometer === 'Between 50,000 and 100,000 miles') {
      params.odometer_min = '50000'; params.odometer_max = '100000'
    }
    if (odometer === 'More than 100,000 miles') params.odometer_min = '100000'
    goListings(params)
  }

  return (
    <main className="advanced-page">
      <section className="advanced-hero">
        <h1>{isEs ? 'Buscar botes de salvamento en venta' : 'Search Salvage Boats for sale'}</h1>
        <p>
          We offer the best search filter options to help you quickly find the vehicle you're looking for. Find specific salvage boats filtering by Vehicle Type, Year, Make, Model, Title Type, and Location. You can also search using the Quick Picks option to find boats that fall under a variety of categories. If you have the lot number you can enter it in the “Search by Lot#” field to find affordable boats for auction. Lastly, you can find boats for sale by using the Quick Search bar at the top of the page.
        </p>
        <p>
          Once you have found the vehicle you're looking for, you can visit the Copart facility where it is stored to inspect the vehicle. Please, you must contact the facility before going. Once you are sure it is the vehicle you want, register with us and buy it at auction prices. Get started by searching today and find cheap repairable salvage boats for sale.
        </p>
      </section>

      <section className="advanced-grid">
        <article className="adv-card adv-card--wide">
          <h2>{isEs ? 'Busqueda de vehiculos' : 'Vehicle Search'}</h2>
          <div className="adv-form-grid">
            <label>Year From<select value={yearFrom} onChange={(e) => setYearFrom(e.target.value)}>{yearOpts.map(v => <option key={v}>{v}</option>)}</select></label>
            <label>Year To<select value={yearTo} onChange={(e) => setYearTo(e.target.value)}>{yearOpts.map(v => <option key={v}>{v}</option>)}</select></label>
            <label>Make<select value={make} onChange={(e) => setMake(e.target.value)}><option>All</option><option>Alumacraft</option><option>Aquasport</option><option>AVD</option><option>Baja</option><option>Barletta</option></select></label>
            <label>Model<select value={model} onChange={(e) => setModel(e.target.value)}><option>All</option><option>19</option><option>22</option><option>1650 Boat</option></select></label>
            <label>Current Bid<select value={currentBid} onChange={(e) => setCurrentBid(e.target.value)}><option>All</option><option>No Bids Yet</option><option>Less than $1,000</option><option>Between $1,000 and $5,000</option><option>Between $5,000 and $10,000</option><option>More than $10,000</option></select></label>
            <label>Odometer<select value={odometer} onChange={(e) => setOdometer(e.target.value)}><option>All</option><option>Less than 1,000 miles</option><option>Between 1,000 and 5,000 miles</option><option>Between 5,000 and 10,000 miles</option><option>Between 10,000 and 20,000 miles</option><option>Between 20,000 and 50,000 miles</option><option>Between 50,000 and 100,000 miles</option><option>More than 100,000 miles</option></select></label>
            <label>Location<select value={location} onChange={(e) => setLocation(e.target.value)}><option>All</option><option>Rocky View County, AB</option><option>Anchorage, AK</option><option>Hueytown, AL</option><option>Theodore, AL</option><option>Conway, AR</option><option>Prairie Grove, AR</option><option>Phoenix, AZ</option><option>Colton, CA</option></select></label>
            <label>Title Type<select value={titleType} onChange={(e) => setTitleType(e.target.value)}><option>All</option><option>Clean Title</option><option>Non-Repairable</option><option>Salvage Title</option></select></label>
            <label>Newly Added Lots<select value={newlyAdded} onChange={(e) => setNewlyAdded(e.target.value)}><option>All</option><option>Last 24 Hours</option><option>Last 48 Hours</option><option>Last 7 Days</option></select></label>
            <label className="adv-check"><input type="checkbox" checked={excludeUpcoming} onChange={(e) => setExcludeUpcoming(e.target.checked)} /> Exclude Upcoming Lots</label>
            <label>Lot Number<input value={lotNumber} onChange={(e) => setLotNumber(e.target.value)} /></label>
            <label>VIN Number<input value={vinNumber} onChange={(e) => setVinNumber(e.target.value)} /></label>
          </div>
          <button type="button" className="adv-search-btn" onClick={submitVehicleSearch}>{isEs ? 'Buscar' : 'Search'}</button>
        </article>

        <article className="adv-card">
          <h2>{isEs ? 'Selecciones rapidas' : 'Quick Picks'}</h2>
          <ul>
            {quickPicks.map(([name, n, key]) => (
              <li key={name}>
                <button type="button" onClick={() => goListings({ featured: key })}>{name} ({n})</button>
              </li>
            ))}
          </ul>
        </article>

        <article className="adv-card">
          <h2>{isEs ? 'Danos' : 'Damage'}</h2>
          <ul>
            {damagePicks.map((d) => (
              <li key={d}><button type="button" onClick={() => goListings({ damage: d })}>{d}</button></li>
            ))}
          </ul>
        </article>

        <article className="adv-card">
          <h2>{isEs ? 'Tipos de vehiculo' : 'Vehicle Types'}</h2>
          <ul>
            {vehicleTypePicks.map((v) => (
              <li key={v}><button type="button" onClick={() => goListings({ vehicle_type: v })}>{v}</button></li>
            ))}
          </ul>
        </article>
      </section>
    </main>
  )
}

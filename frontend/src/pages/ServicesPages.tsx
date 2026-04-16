import { useMemo, useState, type ReactNode } from 'react'
import type { AppLanguage } from '../i18n'

function Wrap({ title, children }: { title: string; children: ReactNode }) {
  return (
    <main className="advanced-page">
      <section className="advanced-hero">
        <h1>{title}</h1>
        {children}
      </section>
    </main>
  )
}

type Inspector = {
  inspector: string
  person: string
  phone: string
  email: string
  language: string
  facility: string
}

const facilities = [
  'All',
  'AL - MOBILE',
  'AR - LITTLE ROCK',
  'FL - TAMPA SOUTH',
  'NJ - SOMERVILLE',
  'AK - ANCHORAGE',
  'AL - BIRMINGHAM',
  'AL - HUNTSVILLE',
  'AL - MONTGOMERY',
  'AR - FAYETTEVILLE',
  'AZ - PHOENIX',
  'AZ - TUCSON',
  'All yards nationwide',
  'All yards serviced',
  'CA - BAKERSFIELD',
  'CA - FRESNO',
  'CA - HAYWARD',
  'CA - LOS ANGELES',
  'CA - MARTINEZ',
  'CA - RANCHO CUCAMONGA',
  'CA - SACRAMENTO',
  'CA - SAN BERNARDINO',
  'CA - SAN DIEGO',
]

const inspectorRows: Inspector[] = [
  { inspector: 'A A A APPRAISAL', person: 'Robert Mangelson', phone: '(508) 328-7411', email: 'salvagebuy@aol.com', language: 'English', facility: 'AL - MOBILE' },
  { inspector: 'A A A APPRAISAL BY ED', person: 'Ed Gibbons', phone: '(314) 974-3464', email: 'ed-dini@att.net', language: 'English', facility: 'AR - LITTLE ROCK' },
  { inspector: 'A Cut Above', person: 'William Tribbett', phone: '302-500-4114', email: 'acutaboveinspectors@gmail.com', language: 'English', facility: 'AK - ANCHORAGE' },
  { inspector: 'A TOUCH OF CLASS CAR SALES', person: 'Tom Or Ellen Lariviere', phone: '(704) 490-7872', email: 'classtrux@aol.com', language: 'English', facility: 'FL - TAMPA SOUTH' },
  { inspector: 'Blue Water Inspections', person: 'Jason Kline', phone: '(786) 551-2411', email: 'support@bluewaterinspect.com', language: 'Spanish', facility: 'CA - LOS ANGELES' },
  { inspector: 'Harbor Check', person: 'Monica Hart', phone: '(520) 882-6114', email: 'contact@harborcheck.io', language: 'English', facility: 'AZ - PHOENIX' },
  { inspector: 'Marine Verify', person: 'Luke Fin', phone: '(610) 881-3322', email: 'team@marineverify.com', language: 'French', facility: 'NJ - SOMERVILLE' },
  { inspector: 'Dockside Pro', person: 'R. Benson', phone: '(209) 444-2210', email: 'hello@docksidepro.com', language: 'English', facility: 'CA - SACRAMENTO' },
]

function downloadInspectorPdf() {
  const content = `Inspector Form
Displayed Information
Contact Information
Contact Name:
Contact Phone Number: Alternate Phone Number: Email Address:
Website Address:
__________________________________
(______) _______ _______ Ext ________
(______) _______ _______ Ext ________
__________________________________
__________________________________
Qualifications
Languages: __________________________________________________________________________
Background: __________________________________________________________________________
__________________________________________________________________________
Facilities Serviced Enter 'X' in box to indicate All Yards or list individually below
______________ ______________ ______________ ______________ ______________
______________ ______________ ______________ ______________ ______________
______________ ______________ ______________ ______________ ______________
Add/Update
To add this new listing check here To update an existing listing check here
Email complete form to inloher@inloher.com.`
  const blob = new Blob([content], { type: 'application/pdf' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'inspector-form.pdf'
  a.click()
  URL.revokeObjectURL(url)
}

export function SalvageInspectionPage(_: { language: AppLanguage }) {
  const [language, setLanguage] = useState('All')
  const [facility, setFacility] = useState('All')
  const [results, setResults] = useState<Inspector[]>(inspectorRows)
  const [page, setPage] = useState(1)
  const pageSize = 5

  const paged = useMemo(() => {
    const totalPages = Math.max(1, Math.ceil(results.length / pageSize))
    const safePage = Math.min(page, totalPages)
    return {
      safePage,
      totalPages,
      rows: results.slice((safePage - 1) * pageSize, safePage * pageSize),
    }
  }, [results, page])

  const onSearch = () => {
    const filtered = inspectorRows.filter((r) => {
      const okLang = language === 'All' || r.language === language
      const okFacility = facility === 'All' || r.facility === facility
      return okLang && okFacility
    })
    setResults(filtered)
    setPage(1)
  }

  return (
    <Wrap title="Salvage Inspection">
      <p>
        The easiest way to ensure you get a boat that is worth its price is to inspect the boat of your choice in person.
        You can do it so if you know what to check, or you may even ask a licensed inspector to do it for you.
      </p>
      <p>
        Visit the Copart facility and pay the necessary fees at the gate to start the inspection. It is important that you assess
        two or more boats while at the facility to ensure you have options before you enter an online auction.
      </p>
      <p>
        Please contact the yard prior to visiting.
      </p>

      <div className="fees-calc-grid">
        <label>
          Language:
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option>All</option>
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
          </select>
        </label>
        <label>
          Facility:
          <select value={facility} onChange={(e) => setFacility(e.target.value)}>
            {facilities.map((f) => (
              <option key={f}>{f}</option>
            ))}
          </select>
        </label>
        <button type="button" className="adv-search-btn" onClick={onSearch}>Search</button>
      </div>

      <button type="button" className="secondary" onClick={downloadInspectorPdf}>
        Add/Update Listing
      </button>

      <div className="todays-table-wrap">
        <table className="todays-table">
          <thead>
            <tr>
              <th>Inspector</th>
              <th>Contact Person</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Language</th>
            </tr>
          </thead>
          <tbody>
            {paged.rows.map((r) => (
              <tr key={`${r.inspector}-${r.email}`}>
                <td>{r.inspector}</td>
                <td>{r.person}</td>
                <td>{r.phone}</td>
                <td>{r.email}</td>
                <td>{r.language}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <button type="button" className="secondary" disabled={paged.safePage <= 1} onClick={() => setPage(paged.safePage - 1)}>Prev</button>
        <span>Page {paged.safePage} / {paged.totalPages}</span>
        <button type="button" className="secondary" disabled={paged.safePage >= paged.totalPages} onClick={() => setPage(paged.safePage + 1)}>Next</button>
      </div>
    </Wrap>
  )
}

type TransportRow = {
  transporter: string
  city: string
  state: string
  country: string
  phone: string
  email: string
}

const domesticRows: TransportRow[] = [
  { transporter: 'Apex Marine Transport', city: 'Mt Vernon', state: 'NY', country: 'USA', phone: '646-749-6735', email: 'sales@apexmarine.com' },
  { transporter: 'Blue Tide Dispatchers', city: 'Atlanta', state: 'GA', country: 'USA', phone: '404-919-0222', email: 'service@bluetide.com' },
  { transporter: 'Route Harbor 66', city: 'Boca Raton', state: 'FL', country: 'USA', phone: '5618732079', email: 'info@routeharbor66.com' },
  { transporter: 'Truckers Rates LLC', city: 'Philadelphia', state: 'PA', country: 'USA', phone: '800-838-5615', email: 'truckersrates@gmail.com' },
  { transporter: 'World Auto Movers', city: 'Pompano Beach', state: 'FL', country: 'USA', phone: '(866) 327-6173', email: 'operations@worldmovers.com' },
  { transporter: '225 Auto Transport', city: 'Glen Allen', state: 'VA', country: 'USA', phone: '(804) 467-8088', email: 'twotwofiveauto@yahoo.com' },
]

const internationalRows: TransportRow[] = [
  { transporter: '011 Services', city: 'Fresh Meadows', state: 'NY', country: 'USA', phone: '917-371-6246', email: 'autoservices011@gmail.com' },
  { transporter: 'All Aboard Marine', city: 'Mt. Vernon', state: 'NY', country: 'USA', phone: '904-837-7021', email: 'info@allaboardmarine.com' },
  { transporter: 'Route Harbor 66', city: 'Boca Raton', state: 'FL', country: 'USA', phone: '5618732079', email: 'info@routeharbor66.com' },
  { transporter: 'World Auto Movers', city: 'Pompano Beach', state: 'FL', country: 'USA', phone: '(866) 327-6173', email: 'operations@worldmovers.com' },
  { transporter: '4M Trading', city: 'Atlanta', state: 'GA', country: 'USA', phone: '(404) 229-0524', email: 'abuzeid65@comcast.net' },
  { transporter: 'A Team Auto Export', city: 'Miami Shores', state: 'FL', country: 'USA', phone: '(786) 220-1419', email: 'ateamautoexport@yahoo.com' },
]

export function TransportationPage(_: { language: AppLanguage }) {
  const [showAllDomestic, setShowAllDomestic] = useState(false)
  const [showAllInternational, setShowAllInternational] = useState(false)

  const domestic = showAllDomestic ? domesticRows : domesticRows.slice(0, 5)
  const intl = showAllInternational ? internationalRows : internationalRows.slice(0, 5)

  return (
    <Wrap title="Transportation">
      <p>
        Get in contact with a salvage inspection agency near you before bidding on salvage boats. Here we list everything you
        need to get in touch with inspectors.
      </p>
      <p>
        If you are an inspector, you can add or update a listing by downloading and filling out the Inspector Form.
      </p>

      <div className="tiny-actions">
        <a className="tiny-btn tiny-btn--primary" href="/transportation-estimate">Get an Estimate</a>
        <a className="tiny-btn" href="/list-shipment">List your shipment</a>
      </div>

      <h2 className="howto-subhead">Domestic Transportation</h2>
      <div className="todays-table-wrap">
        <table className="todays-table">
          <thead>
            <tr><th>Transporter</th><th>City</th><th>State</th><th>Country</th><th>Phone</th><th>Email</th></tr>
          </thead>
          <tbody>
            {domestic.map((r) => (
              <tr key={`${r.transporter}-${r.email}`}>
                <td>{r.transporter}</td><td>{r.city}</td><td>{r.state}</td><td>{r.country}</td><td>{r.phone}</td><td>{r.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {domesticRows.length > 5 ? (
        <button type="button" className="secondary" onClick={() => setShowAllDomestic((v) => !v)}>
          {showAllDomestic ? 'View less' : 'View all'}
        </button>
      ) : null}

      <h2 className="howto-subhead">International Shipping</h2>
      <div className="todays-table-wrap">
        <table className="todays-table">
          <thead>
            <tr><th>Transporter</th><th>City</th><th>State</th><th>Country</th><th>Phone</th><th>Email</th></tr>
          </thead>
          <tbody>
            {intl.map((r) => (
              <tr key={`${r.transporter}-${r.email}`}>
                <td>{r.transporter}</td><td>{r.city}</td><td>{r.state}</td><td>{r.country}</td><td>{r.phone}</td><td>{r.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {internationalRows.length > 5 ? (
        <button type="button" className="secondary" onClick={() => setShowAllInternational((v) => !v)}>
          {showAllInternational ? 'View less' : 'View all'}
        </button>
      ) : null}
    </Wrap>
  )
}

export function TransportEstimatePage(_: { language: AppLanguage }) {
  return (
    <Wrap title="Transportation Estimate">
      <p>Sample estimate page: enter your route, vehicle type, and timeframe to get a shipping quote.</p>
    </Wrap>
  )
}

export function ListShipmentPage(_: { language: AppLanguage }) {
  return (
    <Wrap title="List Your Shipment">
      <p>Sample shipment listing page: submit pickup/drop-off details and transport requirements.</p>
    </Wrap>
  )
}

type PriceHistoryRow = {
  vehicle_type: string
  make: string
  model: string
  year: string
  title_type: string
  damage: string
  price: string
  sold_on: string
}

const phRows: PriceHistoryRow[] = [
  { vehicle_type: 'Boat', make: 'Yamaha', model: '242 Limited', year: '2022', title_type: 'Clean Title', damage: 'Rear end', price: '$12,400', sold_on: 'Apr 05, 2026' },
  { vehicle_type: 'Boat with Trailer', make: 'Sea Ray', model: 'SPX 210', year: '2021', title_type: 'Salvage Title', damage: 'Water / Flood', price: '$8,950', sold_on: 'Apr 02, 2026' },
  { vehicle_type: 'Jet Skis', make: 'Sea-Doo', model: 'GTI', year: '2020', title_type: 'Rebuilt Title', damage: 'Minor Dents / Scratches', price: '$4,300', sold_on: 'Mar 28, 2026' },
  { vehicle_type: 'Pontoon Booats', make: 'Bennington', model: '22S', year: '2019', title_type: 'Other', damage: 'Mechanical', price: '$7,100', sold_on: 'Mar 26, 2026' },
]

export function PriceHistoryPage(_: { language: AppLanguage }) {
  const [vehicleType, setVehicleType] = useState('Boat')
  const [make, setMake] = useState('All')
  const [model, setModel] = useState('All')
  const [yearFrom, setYearFrom] = useState('2022')
  const [yearTo, setYearTo] = useState('2020')
  const [titleType, setTitleType] = useState('All')
  const [primaryDmg, setPrimaryDmg] = useState('All')
  const [results, setResults] = useState<PriceHistoryRow[]>([])

  const onSearch = () => {
    const filtered = phRows.filter((r) => {
      const okType = vehicleType === 'All' || r.vehicle_type === vehicleType
      const okMake = make === 'All' || r.make === make
      const okModel = model === 'All' || r.model === model
      const okTitle = titleType === 'All' || r.title_type === titleType
      const okDmg = primaryDmg === 'All' || r.damage === primaryDmg
      const yr = Number(r.year)
      const yf = Number(yearFrom)
      const yt = Number(yearTo)
      const okYear = Number.isFinite(yf) && Number.isFinite(yt) ? yr <= yf && yr >= yt : true
      return okType && okMake && okModel && okTitle && okDmg && okYear
    })
    setResults(filtered)
  }

  return (
    <Wrap title="Price History">
      <h2 className="howto-subhead">Search History</h2>
      <div className="fees-calc-grid">
        <label>
          Vehicle Type:
          <select value={vehicleType} onChange={(e) => setVehicleType(e.target.value)}>
            <option>Sedans</option><option>Hatchbacks</option><option>Coupe</option><option>Convertibles</option>
            <option>Wagons</option><option>VANs/Minivans</option><option>SUVs</option><option>Pickup Trucks</option>
            <option>Motorcycles</option><option>Dirt Bikes</option><option>ATVs</option><option>Medium Duty Trucks</option>
            <option>Truck</option><option>Trailers</option><option>Recreational Vehicles</option><option>Busses</option>
            <option>Industrial Equipment</option><option>Forklifts</option><option>Boat</option><option>Snowmobiles</option>
            <option>Jet Skis</option><option>Scooter</option><option>Boat with Trailer</option><option>Pontoon Booats</option>
            <option>All</option>
          </select>
        </label>
        <label>
          Make:
          <select value={make} onChange={(e) => setMake(e.target.value)}>
            <option>All</option><option>Yamaha</option><option>Sea Ray</option><option>Sea-Doo</option><option>Bennington</option>
          </select>
        </label>
        <label>
          Model:
          <select value={model} onChange={(e) => setModel(e.target.value)}>
            <option>All</option><option>242 Limited</option><option>SPX 210</option><option>GTI</option><option>22S</option>
          </select>
        </label>
        <label>
          Year From:
          <select value={yearFrom} onChange={(e) => setYearFrom(e.target.value)}>
            <option>2022</option><option>2021</option><option>2020</option><option>2019</option>
          </select>
        </label>
        <label>
          To:
          <select value={yearTo} onChange={(e) => setYearTo(e.target.value)}>
            <option>2020</option><option>2019</option><option>2018</option><option>2017</option>
          </select>
        </label>
        <label>
          Title Type:
          <select value={titleType} onChange={(e) => setTitleType(e.target.value)}>
            <option>All</option><option>Clean Title</option><option>Salvage Title</option><option>Rebuilt Title</option><option>Non-Repairable</option><option>Other</option>
          </select>
        </label>
        <label>
          Primary Dmg:
          <select value={primaryDmg} onChange={(e) => setPrimaryDmg(e.target.value)}>
            <option>All</option><option>Rear end</option><option>Front end</option><option>Undercarriage</option>
            <option>Rollover</option><option>Water / Flood</option><option>Mechanical</option><option>Side</option>
            <option>All Over</option><option>Hail</option><option>Frame Damage</option><option>Biohazard / Chemical</option>
            <option>Normal wear</option><option>Vandalism</option><option>Burn</option><option>Minor Dents / Scratches</option>
            <option>Top/Roof</option><option>Burn interior</option><option>Missing / Altered VIN</option><option>Stripped</option>
            <option>Burn engine</option><option>Damage history</option><option>Partial Repair</option><option>Replaced VIN</option>
            <option>Rejected repair</option><option>Unknown</option>
          </select>
        </label>
        <button type="button" className="adv-search-btn" onClick={onSearch}>Search</button>
      </div>

      {results.length ? (
        <div className="todays-table-wrap">
          <table className="todays-table">
            <thead>
              <tr><th>Vehicle Type</th><th>Make</th><th>Model</th><th>Year</th><th>Title Type</th><th>Primary Dmg</th><th>Sold Price</th><th>Sold On</th></tr>
            </thead>
            <tbody>
              {results.map((r) => (
                <tr key={`${r.make}-${r.model}-${r.sold_on}`}>
                  <td>{r.vehicle_type}</td><td>{r.make}</td><td>{r.model}</td><td>{r.year}</td><td>{r.title_type}</td><td>{r.damage}</td><td>{r.price}</td><td>{r.sold_on}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </Wrap>
  )
}

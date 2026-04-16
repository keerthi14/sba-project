import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { fetchListings } from '../api/client'
import type { Listing } from '../api/types'
import type { AppLanguage } from '../i18n'
import './HomeBelowSections.css'

function featuredMatch(row: Listing, label: string): boolean {
  const lcCond = (row.condition ?? '').toLowerCase()
  const lcDmg = (row.damage ?? '').toLowerCase()
  const lcTitleType = (row.title_type ?? '').toLowerCase()
  const lcStatus = (row.sales_status ?? '').toLowerCase()
  const today = new Date().toISOString().slice(0, 10)

  switch (label) {
    case 'Buy it Now':
      return row.buy_it_now
    case 'Salvage Boats':
      return lcTitleType.includes('salvage') || lcDmg.includes('salvage')
    case 'Repairable':
      return lcCond.includes('parts') || lcCond.includes('runs') || lcStatus.includes('pure')
    case 'Clean title Boats':
      return lcTitleType.includes('clean')
    case 'New arrivals':
      return lcCond.includes('new arrivals') || row.sale_date === today
    default:
      return true
  }
}

const feedbacks = [
  {
    name: 'Michael R.',
    stars: 5,
    text: 'Great support and smooth bidding experience. Got my boat at a very good price.',
  },
  {
    name: 'Sandra K.',
    stars: 4,
    text: 'Inspection guidance was very helpful. Team answered all questions quickly.',
  },
  {
    name: 'Tony P.',
    stars: 5,
    text: 'Easy registration and easy navigation. Will buy again from upcoming auctions.',
  },
  {
    name: 'Alicia M.',
    stars: 3,
    text: 'Saved thousands compared to local dealerships. Process was clear and transparent.',
  },
]

const states = [
  'Alabama', 'Arkansas', 'Arizona', 'California', 'Colorado', 'Connecticut',
  'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Iowa', 'Idaho', 'Illinois',
  'Indiana', 'Kansas', 'Kentucky', 'Louisiana', 'Massachusetts', 'Maryland',
  'Michigan', 'Minnesota', 'Missouri', 'Mississippi', 'North Carolina',
  'New Hampshire', 'New Jersey', 'New Mexico', 'Nevada', 'New York', 'Ohio',
  'Ontario', 'Oregon', 'Pennsylvania', 'Quebec', 'Rhode Island', 'South Carolina',
  'South Dakota', 'Tennessee', 'Texas', 'Virginia', 'Wisconsin', 'West Virginia',
]

export function HomeBelowSections({ language }: { language: AppLanguage }) {
  const navigate = useNavigate()
  void language
  const [vehicleIndex, setVehicleIndex] = useState(0)
  const [feedbackIndex, setFeedbackIndex] = useState(0)
  const [faqTopic, setFaqTopic] = useState('Registration')
  const [activeFeatured, setActiveFeatured] = useState('Buy it Now')
  const [activeFaq, setActiveFaq] = useState('')
  const vehicleViewportRef = useRef<HTMLDivElement | null>(null)
  const [boatListings, setBoatListings] = useState<Listing[]>([])
  const [featuredLoading, setFeaturedLoading] = useState(true)
  const [typeCounts, setTypeCounts] = useState<Record<string, number>>({})
  const [stateCounts, setStateCounts] = useState<Record<string, number>>({})

  const filteredVehicles = useMemo(() => {
    const list = boatListings.filter((r) => featuredMatch(r, activeFeatured))
    // Stable ordering: newest first
    return list.sort((a, b) => (a.created_at < b.created_at ? 1 : -1))
  }, [boatListings, activeFeatured])

  const maxVehicleStart = Math.max(0, filteredVehicles.length - 4)
  useEffect(() => {
    const load = async () => {
      setFeaturedLoading(true)
      try {
        const r = await fetchListings({ category: 'boat', page: 1 })
        setBoatListings(r.items)
      } catch {
        setBoatListings([])
      } finally {
        setFeaturedLoading(false)
      }
    }
    void load()
  }, [])
  const shownFeedbacks = useMemo(
    () => [
      feedbacks[feedbackIndex % feedbacks.length],
      feedbacks[(feedbackIndex + 1) % feedbacks.length],
      feedbacks[(feedbackIndex + 2) % feedbacks.length],
    ],
    [feedbackIndex]
  )

  const featuredButtons = ['Buy it Now', 'Salvage Boats', 'Repairable', 'Clean title Boats', 'New arrivals'] as const

  const faqQuestions = {
    Registration: ['How do I register?', 'How much is the registration fee?'],
    Deposit: ['What is the security deposit for?', 'How much do I need to put in security deposit?', 'Is the security deposit refundable?', 'Can I wire the security deposit?'],
    Bidding: ['Are there any restrictions when bidding?', 'How do I know if I am winning the auction?', 'What state flag will show when I am bidding?'],
    Transportation: ['Do you ship?', 'When can I pick up the vehicle purchased?'],
    Payment: ['How do I pay for the vehicle purchased?'],
    Inspection: ['Can I inspect the vehicles?', 'How soon will I receive my title?'],
  } as const

  useEffect(() => {
    if (filteredVehicles.length <= 1) return
    const id = window.setInterval(() => {
      setVehicleIndex((v) => (v >= maxVehicleStart ? 0 : v + 1))
    }, 5000)
    return () => window.clearInterval(id)
  }, [filteredVehicles.length, maxVehicleStart])

  useEffect(() => {
    if (vehicleIndex > maxVehicleStart) setVehicleIndex(0)
  }, [vehicleIndex, maxVehicleStart])

  useEffect(() => {
    const el = vehicleViewportRef.current
    if (!el) return
    const first = el.querySelector<HTMLElement>('.featured-vehicle-card')
    if (!first) return
    const gap = 14
    const cardWidth = first.getBoundingClientRect().width + gap
    el.scrollTo({ left: vehicleIndex * cardWidth, behavior: 'smooth' })
  }, [vehicleIndex, activeFeatured])

  const openVehicleDetails = (listing: Listing) => {
    navigate(`/vehicles/${listing.id}`, { state: { listing } })
  }

  useEffect(() => {
    // Keep counts accurate to backend seed data.
    const load = async () => {
      try {
        const [boat, jet, trailer, pontoon] = await Promise.all([
          fetchListings({ category: 'boat', vehicle_type: 'Boat', page: 1 }),
          fetchListings({ category: 'boat', vehicle_type: 'Jet skis', page: 1 }),
          fetchListings({ category: 'boat', vehicle_type: 'Boat with trailer', page: 1 }),
          fetchListings({ category: 'boat', vehicle_type: 'Pontoon Booats', page: 1 }),
        ])
        setTypeCounts({
          Boat: boat.total,
          'Jet Skis': jet.total,
          'Boat with Trailer': trailer.total,
          'Pontoon Boats': pontoon.total,
        })
      } catch {
        setTypeCounts({})
      }
    }
    void load()
  }, [])

  useEffect(() => {
    const load = async () => {
      try {
        const entries = await Promise.all(
          states.map(async (s) => {
            const r = await fetchListings({ category: 'boat', state: s, page: 1 })
            return [s, r.total] as const
          })
        )
        setStateCounts(Object.fromEntries(entries))
      } catch {
        setStateCounts({})
      }
    }
    void load()
  }, [])

  useEffect(() => {
    const id = window.setInterval(() => {
      setFeedbackIndex((v) => (v + 1) % feedbacks.length)
    }, 5000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <section className="home-extra">
      <div className="home-extra__inner">
        <section className="extra-card featured-carousel-section">
          <h2 className="center-title">Salvage Boats for Sale from Copart Auto Auctions</h2>
          <p>
            SalvageBoatsAuction.com has more than 150000 salvaged vehicles for sale any make and model, find
            the right repairable salvage boat near you today!
          </p>
          <div className="chip-row featured-chip-row">
            {featuredButtons.map((label) => (
              <button
                key={label}
                type="button"
                className={`chip-link chip-link--button featured-chip ${activeFeatured === label ? 'chip-link--active' : ''}`}
                onClick={() => {
                  setActiveFeatured(label)
                  setVehicleIndex(0)
                }}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="carousel-wrap featured-carousel-wrap">
            <button
              type="button"
              className="carousel-arrow carousel-arrow--left"
              onClick={() =>
                setVehicleIndex((v) => (filteredVehicles.length ? Math.max(0, v - 1) : 0))
              }
            >
              ←
            </button>
            <div ref={vehicleViewportRef} className="featured-carousel-viewport" aria-label="Featured vehicles carousel">
              <div className="vehicle-carousel featured-vehicle-carousel">
                {featuredLoading ? (
                  <div className="featured-carousel__loading">Loading…</div>
                ) : (
                  filteredVehicles.map((v) => (
                    <article key={v.id} className="vehicle-card featured-vehicle-card">
                      <img src={v.images[0] || 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1000&q=80'} alt="" />
                      <h3>{v.title ?? (`${v.year ?? ''} ${v.make ?? ''} ${v.model ?? ''}`.trim() || 'Boat')}</h3>
                      <p>Lot: {v.lot_number}</p>
                      <p>{v.location ?? '—'}</p>
                      <p>Current Bid: {v.current_bid != null ? `$${v.current_bid.toLocaleString()}` : '$0'}</p>
                    <button
                      type="button"
                      className="tiny-btn tiny-btn--primary featured-view-details"
                      onClick={() => openVehicleDetails(v)}
                    >
                      View Details
                    </button>
                    </article>
                  ))
                )}
              </div>
            </div>
            <button
              type="button"
              className="carousel-arrow carousel-arrow--right"
              onClick={() =>
                setVehicleIndex((v) => (filteredVehicles.length ? Math.min(maxVehicleStart, v + 1) : 0))
              }
            >
              →
            </button>
          </div>
          <div className="tiny-actions featured-actions">
            <Link to="/boats?page=1" className="chip-link chip-link--button featured-chip featured-pill-cta btn-link">
              View all vehicles
            </Link>
          </div>
        </section>

        <section className="extra-card">
          <h2 className="center-title">Bid on Repairable Vehicle by Type</h2>
          <p>Choose from a variety of vehicle types</p>
          <div className="type-grid">
            {[
              ['Boat', typeCounts.Boat ?? 0, '/boats?page=1&vehicle_type=Boat', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80'],
              ['Jet Skis', typeCounts['Jet Skis'] ?? 0, '/boats?page=1&vehicle_type=Jet%20skis', 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=900&q=80'],
              ['Boat with Trailer', typeCounts['Boat with Trailer'] ?? 0, '/boats?page=1&vehicle_type=Boat%20with%20trailer', 'https://images.unsplash.com/photo-1578956357778-6e9f4f85fba3?w=900&q=80'],
              ['Pontoon Boats', typeCounts['Pontoon Boats'] ?? 0, '/boats?page=1&vehicle_type=Pontoon%20Booats', 'https://images.unsplash.com/photo-1587223962930-cb7f31384c19?w=900&q=80'],
            ].map(([name, count, href, image]) => (
              <Link key={name} to={href as string} className="type-item">
                <img src={image as string} alt="" className="type-item__img" />
                <strong>{name}</strong>
                <span>({count})</span>
              </Link>
            ))}
          </div>

          <h3 className="center-title">Find Repairable Boats Sorted by Make</h3>
          <p>Our user-friendly platform allows you to find the perfect vehicle in just a few clicks</p>
          <Link to="/advanced-search" className="chip-link chip-link--button featured-chip featured-pill-cta btn-link">
            View all makes
          </Link>

          <h3 className="center-title">Search for Vehicles Based on Their Location</h3>
          <p>Discover auctioning boats in junkyards near you</p>
          <div className="states-grid">
            {states.map((s) => (
              <button key={s} type="button" className="state-btn" onClick={() => navigate(`/boats?page=1&state=${encodeURIComponent(s)}`)}>
                {s} ({stateCounts[s] ?? 0})
              </button>
            ))}
          </div>
        </section>

        <section className="extra-card">
          <h2 className="center-title">How Salvage Boats Auction Works</h2>
          <p>WE'VE MADE IT EASY TO FIND GREAT DEALS ON USED VEHICLES FOR SALE THAT AREN'T AVAILABLE TO THE GENERAL PUBLIC</p>
          <div className="steps-grid">
            {[
              ['01', 'Registration', "Get your FREE Basic account today! By becoming a member, you can buy any vehicle without a dealer's license!"],
              ['02', 'Find Your Boat', 'Use our search filters to find auction vehicles of the specific make and model that you have in mind really fast.'],
              ['03', 'Online Bidding', 'Join our live auctions and start bidding by yourself at Copart. If your offer is the highest, you will be declared the winner.'],
              ['04', 'Sign and Transportation', "Once you win the bid, we'll help you process payments and documents, then your boat will be ready for shipping."],
            ].map(([n, t, d]) => (
              <article key={n} className="step-card">
                <span>{n}</span>
                <h4>{t}</h4>
                <p>{d}</p>
              </article>
            ))}
          </div>
          <Link to="/how-to-buy" className="chip-link chip-link--button featured-chip featured-pill-cta btn-link">
            How to buy
          </Link>
        </section>

        <section className="extra-card">
          <h2>Start Your FREE Account To Get Full Access to Online Auctions</h2>
          <ul>
            <li>Bid & Win like a licensed dealer on over 200 vehicles with no license required.</li>
            <li>Get access to "dealer-only auction" prices and save up to 50%</li>
            <li>Our exceptional customer service makes buying at auctions easier</li>
          </ul>
        </section>

        <section className="extra-card">
          <h2 className="center-title">Frequently Asked Questions</h2>
          <p>Have Questions? We have answers! Filter by topic:</p>
          <div className="chip-row">
            {Object.keys(faqQuestions).map((topic) => (
              <button
                key={topic}
                type="button"
                className={`chip-link chip-link--button ${faqTopic === topic ? 'chip-link--active' : ''}`}
                onClick={() => setFaqTopic(topic)}
              >
                {topic}
              </button>
            ))}
          </div>
          <ul className="faq-accordion">
            {faqQuestions[faqTopic as keyof typeof faqQuestions].map((q) => (
              <li key={q}>
                <button type="button" className="faq-q-btn" onClick={() => setActiveFaq((v) => (v === q ? '' : q))}>
                  {q}
                </button>
                {activeFaq === q ? <p className="faq-answer">Please contact support for full answer details.</p> : null}
              </li>
            ))}
          </ul>
          <Link to="/faqs" className="chip-link chip-link--button featured-chip featured-pill-cta btn-link">
            Visit FAQS page
          </Link>
        </section>

        <section className="extra-card">
          <h2 className="center-title">What Our Clients Say About Us</h2>
          <p>
            Our clients praise us for great results, personable service, expert knowable and on-time delivery.
          </p>
          <div className="carousel-wrap">
            <button type="button" className="carousel-arrow carousel-arrow--left" onClick={() => setFeedbackIndex((v) => (v - 1 + feedbacks.length) % feedbacks.length)}>←</button>
            <div className="feedback-carousel">
              {shownFeedbacks.map((f) => (
                <article key={f.name} className="feedback-card">
                  <span className="feedback-stars">{'★'.repeat(f.stars)}{'☆'.repeat(5 - f.stars)}</span>
                  <p>"{f.text}"</p>
                  <strong>- {f.name}</strong>
                </article>
              ))}
            </div>
            <button type="button" className="carousel-arrow carousel-arrow--right" onClick={() => setFeedbackIndex((v) => (v + 1) % feedbacks.length)}>→</button>
          </div>
          <div className="tiny-actions">
            <Link to="/feedbacks" className="chip-link chip-link--button featured-chip featured-pill-cta btn-link">
              View all feedbacks
            </Link>
          </div>
        </section>

        <section className="extra-card">
          <h2 className="center-title">Search a Large Collection of Salvage Title Boats</h2>
          <p>
            Let's find you the best salvage boats for sale to help you save lots of money. The price of a new boat, especially a sports boat,
            might make you put away your dreams of ever owning a boat.
          </p>
          <p>
            Registration with Salvage Boats Auction grants you:
          </p>
          <ul>
            <li>Access to all our vehicle auction sites including trucks, autos and bikes.</li>
            <li>Unrestricted boat search</li>
            <li>Unrestricted bids and purchases (except in California and Kansas. Michigan only in boats with clean title)</li>
            <li>Support when you need it from an experienced team</li>
            <li>Dedicated support customer service</li>
          </ul>
          <h3>Are you ready?</h3>
          <p>See what our online auctions look like!</p>
          <video controls className="join-video" poster="https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1200&q=80">
            <source src="https://cdn.coverr.co/videos/coverr-business-team-in-a-conference-room-1579/1080p.mp4" type="video/mp4" />
          </video>
        </section>

        <section className="extra-card">
          <h2 className="center-title">Repairable Salvage Boats Auctions Blog</h2>
          <p>Stay up to date with the latest news, tips and trends in the salvage and repairable autos industry.</p>
          <div className="blog-mini-list">
            <article className="blog-box"><img src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=400&q=80" alt="" /><div><strong>What Are the Benefits of Buying a Jet Ski at Auction?</strong><span>Jun 2, 2025</span></div></article>
            <article className="blog-box"><img src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=400&q=80" alt="" /><div><strong>Salvage Boat Auctions and Market Trends</strong><span>Feb 28, 2024</span></div></article>
            <article className="blog-box"><img src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=80" alt="" /><div><strong>The Smart Moves of Buying a Boat at Auction</strong><span>Feb 13, 2024</span></div></article>
          </div>
          <Link to="/blog" className="chip-link chip-link--button featured-chip featured-pill-cta btn-link">
            Visit our blog
          </Link>
        </section>
      </div>
    </section>
  )
}

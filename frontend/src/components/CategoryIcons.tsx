import type { ComponentType } from 'react'
import { NavLink } from 'react-router-dom'
import type { VehicleCategory } from '../api/types'
import './CategoryIcons.css'

const routes: { category: VehicleCategory; to: string; label: string }[] = [
  { category: 'car', to: '/cars', label: 'Car' },
  { category: 'truck', to: '/trucks', label: 'Truck' },
  { category: 'scooter', to: '/scooters', label: 'Scooter' },
  { category: 'boat', to: '/boats', label: 'Boat' },
]

function IconCar({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className={`cat-ico ${active ? 'active' : ''}`} aria-hidden>
      <path d="M5 11l1.5-4.5A2 2 0 0 1 8.4 5h7.2a2 2 0 0 1 1.9 1.5L19 11v8H5v-8zm2 0h10l-1.2-3.6a.5.5 0 0 0-.5-.4H8.7a.5.5 0 0 0-.5.4L7 11zm-2 6h2v-2H5v2zm12 0h2v-2h-2v2zM7 13h10v2H7v-2z" />
    </svg>
  )
}

function IconTruck({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className={`cat-ico ${active ? 'active' : ''}`} aria-hidden>
      <path d="M3 7h10v8H3V7zm2 2v4h6V9H5zm11-2h3l3 4v4h-6V7zm2 2v3h3l-2-3h-1zm-9 8h12v2H9v-2zm2-2h2v2h-2v-2z" />
    </svg>
  )
}

function IconScooter({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className={`cat-ico ${active ? 'active' : ''}`} aria-hidden>
      <path d="M5 16a2 2 0 1 1 0 .01V16zm14 0a2 2 0 1 1 0 .01V16zM7.5 14L9 9h3l1.2 3H17l1.5 2h-3.2l-.3 1H7.5zm3.5-5h-2L8.7 12h2.8l.5-1.5L11 9z" />
    </svg>
  )
}

function IconBoat({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className={`cat-ico ${active ? 'active' : ''}`} aria-hidden>
      <path d="M2 18c2-2 5-3 10-3s8 1 10 3l-1 2H3l-1-2zm3-2c1.5-.8 3.5-1.3 7-1.3s5.5.5 7 1.3l1-1.5C17 13 14 12 12 12s-5 1-8 4.5L5 16zm2-6l2-5h6l2 5h-2l-1-2.5h-4L9 10H7z" />
    </svg>
  )
}

const icons: Record<VehicleCategory, ComponentType<{ active: boolean }>> = {
  car: IconCar,
  truck: IconTruck,
  scooter: IconScooter,
  boat: IconBoat,
}

export function CategoryIcons({ activeCategory }: { activeCategory: VehicleCategory }) {
  return (
    <div className="category-icons" role="navigation" aria-label="Vehicle category">
      {routes.map(({ category, to, label }) => {
        const Ico = icons[category]
        const active = activeCategory === category
        return (
          <NavLink
            key={category}
            to={to}
            className={({ isActive }) =>
              `category-icons__link${isActive ? ' category-icons__link--active' : ''}`
            }
            title={label}
            aria-current={active ? 'page' : undefined}
          >
            <Ico active={active} />
            <span className="sr-only">{label}</span>
          </NavLink>
        )
      })}
    </div>
  )
}

import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { fetchNavMenus } from '../api/client'
import type { NavChild } from '../api/types'
import type { AppLanguage } from '../i18n'
import './MainNav.css'

interface MainNavProps {
  isLoggedIn: boolean
  language: AppLanguage
  onToggleLanguage: () => void
  onLogout: () => void
}

const enToEs: Record<string, string> = {
  'Vehicle Search': 'Busqueda de Vehiculos',
  'Live Auctions': 'Subastas en Vivo',
  Support: 'Soporte',
  Services: 'Servicios',
  'Search by make': 'Buscar por marca',
  'Search by state': 'Buscar por estado',
  'Search by location': 'Buscar por ubicacion',
  'Advanced search': 'Busqueda avanzada',
  'Compare vehicles': 'Comparar vehiculos',
  "Today's auctions": 'Subastas de hoy',
  'Join auctions': 'Unirse a subastas',
  Sales: 'Ventas',
  'Calendar sales': 'Calendario de ventas',
  'Sales list': 'Lista de ventas',
  'How to buy': 'Como comprar',
  FAQS: 'Preguntas frecuentes',
  Fees: 'Tarifas',
  'Salvage Boats': 'Barcos de salvamento',
  'Used Boats for Sale': 'Barcos usados en venta',
  'Buy Salvage Boats': 'Comprar barcos de salvamento',
  'Salvage Boats Definition': 'Definicion de barcos de salvamento',
  'Salvage Title Boats': 'Barcos con titulo de salvamento',
  'Buying Tips': 'Consejos de compra',
  'Contact us': 'Contactanos',
  'About us': 'Sobre nosotros',
  Blog: 'Blog',
  'Salvage Inspection': 'Inspeccion de salvamento',
  Transportation: 'Transporte',
  'Price History': 'Historial de precios',
  'Sign In': 'Iniciar sesion',
  'Register Free': 'Registrate gratis',
}

const t = (language: AppLanguage, text: string) => (language === 'es' ? enToEs[text] ?? text : text)

export function MainNav({ isLoggedIn, language, onToggleLanguage, onLogout }: MainNavProps) {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [forceClose, setForceClose] = useState(false)
  const [menus, setMenus] = useState<Awaited<ReturnType<typeof fetchNavMenus>>['menus'] | null>(
    null
  )

  useEffect(() => {
    fetchNavMenus()
      .then((r) => setMenus(r.menus))
      .catch(() => setMenus(null))
  }, [])

  const listingPathFromCurrent = () => {
    if (pathname.startsWith('/cars')) return '/cars'
    if (pathname.startsWith('/trucks')) return '/trucks'
    if (pathname.startsWith('/scooters')) return '/scooters'
    return '/boats'
  }

  const openVehicleSearch = (submenuLabel: string, value: string) => {
    const sp = new URLSearchParams()
    if (submenuLabel === 'Search by make' || submenuLabel === 'Buscar por marca') sp.set('make', value)
    else if (submenuLabel === 'Search by state' || submenuLabel === 'Buscar por estado') sp.set('state', value)
    else if (submenuLabel === 'Search by location' || submenuLabel === 'Buscar por ubicacion') sp.set('location', value)
    else return
    setForceClose(true)
    navigate({ pathname: listingPathFromCurrent(), search: sp.toString() })
    window.setTimeout(() => setForceClose(false), 250)
  }

  return (
    <nav className={`main-nav ${forceClose ? 'main-nav--force-close' : ''}`} aria-label="Primary">
      <div className="main-nav__inner">
        <div className="main-nav__left">
          {menus &&
            Object.entries(menus).map(([key, menu]) => (
              <div key={key} className="main-nav__drop" tabIndex={0}>
                <span className="main-nav__trigger">{t(language, menu.label)}</span>
                <div className="main-nav__panel" role="menu">
                  <ul className="main-nav__panel-list">
                    {menu.children.map((child: NavChild, i: number) => (
                      <li key={`${key}-${i}`}>
                        {'href' in child ? (
                          <a
                            href={child.href}
                            className="main-nav__link-item"
                            onClick={(e) => {
                              if (child.href.startsWith('/')) {
                                e.preventDefault()
                                navigate(child.href)
                              }
                            }}
                          >
                            {t(language, child.label)}
                          </a>
                        ) : (
                          <div className="main-nav__flyout-wrap">
                            <span className="main-nav__submenu-label">
                              {t(language, child.label)}
                              <span className="main-nav__chevron" aria-hidden>
                                ›
                              </span>
                            </span>
                            <div className="main-nav__flyout" role="menu">
                              <ul className="main-nav__flyout-list">
                                {child.options.map((opt) => (
                                  <li key={opt}>
                                    <button
                                      type="button"
                                      className="main-nav__flyout-btn"
                                      onClick={() => openVehicleSearch(child.label, opt)}
                                    >
                                      {opt}
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
        </div>
        <div className="main-nav__right">
          {!isLoggedIn ? (
            <>
              <button type="button" className="main-nav__link-btn" onClick={() => navigate('/login')}>
                {t(language, 'Sign In')}
              </button>
              <button type="button" className="main-nav__cta" onClick={() => navigate('/register')}>
                {t(language, 'Register Free')}
              </button>
            </>
          ) : (
            <button type="button" className="main-nav__logout" onClick={onLogout}>
              Logout
            </button>
          )}
          <button type="button" className="main-nav__lang" onClick={onToggleLanguage}>
            {language === 'en' ? 'Espanol' : 'English'}
          </button>
        </div>
      </div>
    </nav>
  )
}

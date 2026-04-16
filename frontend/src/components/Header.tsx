import { useEffect, useState, type FormEvent } from 'react'
import { CategoryIcons } from './CategoryIcons'
import type { VehicleCategory } from '../api/types'
import type { AppLanguage } from '../i18n'
import './Header.css'

interface HeaderProps {
  activeCategory: VehicleCategory
  titleLine2: string
  searchValue: string
  language: AppLanguage
  onSearch: (q: string) => void
  onBrandClick: () => void
}

export function Header({
  activeCategory,
  titleLine2,
  searchValue,
  language,
  onSearch,
  onBrandClick,
}: HeaderProps) {
  const [local, setLocal] = useState(searchValue)

  useEffect(() => {
    setLocal(searchValue)
  }, [searchValue])

  const submit = () => {
    onSearch(local.trim())
  }

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault()
    submit()
  }
  const isEs = language === 'es'

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <div className="site-header__brand">
          <button type="button" className="site-header__title site-header__title-btn" aria-label="Salvage Boats Auction" onClick={onBrandClick}>
            <span>SALVAGE</span>
            <span>{titleLine2}</span>
            <span>AUCTIONS</span>
          </button>
          <CategoryIcons activeCategory={activeCategory} />
        </div>

        <form className="site-header__search" onSubmit={onFormSubmit}>
          <input
            type="search"
            name="q"
            placeholder={
              isEs
                ? 'Buscar por descripcion del vehiculo, VIN o numero de lote'
                : 'Search by vehicle description, VIN or Lot#'
            }
            value={local}
            onChange={(e) => {
              const value = e.target.value
              setLocal(value)
              // Native clear (x) on search input should immediately remove q filter.
              if (value === '') onSearch('')
            }}
            aria-label={isEs ? 'Buscar listados' : 'Search listings'}
          />
          <button type="submit" className="site-header__search-btn" aria-label={isEs ? 'Buscar' : 'Search'}>
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden>
              <path
                fill="currentColor"
                d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
              />
            </svg>
          </button>
        </form>

        <div className="site-header__contact">
          <p className="site-header__meta-line">
            <a href="mailto:contactus@Salvageboatauction.com" className="site-header__email">
              contactus@Salvageboatauction.com
            </a>
            <span className="site-header__sep" aria-hidden="true">
              {' '}
              |{' '}
            </span>
            <span className="site-header__hours">
              {isEs
                ? 'Lunes a Viernes 8:00 a.m. a 5:00 p.m. EST'
                : 'Monday to Friday 8:00 a.m. to 5:00 p.m. EST'}
            </span>
          </p>
          <div className="site-header__phone-block">
            <span className="site-header__phone-icon" aria-hidden>
              <svg viewBox="0 0 24 24" width="28" height="28">
                <path
                  fill="currentColor"
                  d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
                />
              </svg>
            </span>
            <span className="site-header__sep-bold" aria-hidden>
              |
            </span>
            <div className="site-header__phone-text">
              <span>{isEs ? 'Llamanos hoy' : 'Call us today'}</span>
              <a href="tel:+19545736936">+1-954-573-6936</a>
              <span className="site-header__spanish">
                {isEs ? 'Hablamos Espanol' : 'Spanish available'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

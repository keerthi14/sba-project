import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'
import { fetchBanner, fetchListings } from '../api/client'
import type { Listing } from '../api/types'
import { FindBoatSection } from '../components/FindBoatSection'
import { Footer } from '../components/Footer'
import { HomeBelowSections } from '../components/HomeBelowSections'
import { Header } from '../components/Header'
import { HeroSection } from '../components/HeroSection'
import { MainNav } from '../components/MainNav'
import { NotificationBar } from '../components/NotificationBar'
import { SearchResults } from '../components/SearchResults'
import { VehicleFilters } from '../components/VehicleFilters'
import { useVehicleCategory } from '../hooks/useVehicleCategory'
import type { AppLanguage } from '../i18n'
import { listingParamsFromSearchParams } from '../utils/listingQuery'

type SortKey = 'year' | 'lot' | 'model' | 'location' | 'sale_date' | 'title' | 'odometer' | 'bid'

const SORT_KEYS: SortKey[] = ['year','lot','model','location','sale_date','title','odometer','bid']


interface AuctionPageProps {
  isLoggedIn: boolean
  language: AppLanguage
  onToggleLanguage: () => void
  onLogout: () => void
}

export function AuctionPage({ isLoggedIn, language, onToggleLanguage, onLogout }: AuctionPageProps) {
  const { category, labels, titleLine2 } = useVehicleCategory()
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  const [items, setItems] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [banner, setBanner] = useState<string>('')

  const q = searchParams.get('q') ?? ''
  const activeFeatured = searchParams.get('featured') ?? ''
  const rawSortBy = searchParams.get('sort_by') ?? 'sale_date'
  const sortKey = (SORT_KEYS.includes(rawSortBy as SortKey) ? rawSortBy : 'sale_date') as SortKey
  const sortDesc = (searchParams.get('sort_dir') ?? 'desc') !== 'asc'
  const rawPage = Number(searchParams.get('page') ?? '1')
  const page = Number.isFinite(rawPage) && rawPage > 0 ? Math.floor(rawPage) : 1
  /** Show filters/table whenever URL has active search/filter params. */
  const showListingsUi = Boolean(searchParams.toString())

  const paramsKey = searchParams.toString()
  const paramsObj = useMemo(
    () => listingParamsFromSearchParams(new URLSearchParams(paramsKey), category),
    [paramsKey, category]
  )

  useEffect(() => {
    if (!showListingsUi) {
      setItems([])
      setLoading(false)
      setError(null)
      return
    }
    setLoading(true)
    setError(null)
    fetchListings(paramsObj)
      .then((r) => {
        setItems(r.items)
        setLoading(false)
      })
      .catch((e: Error) => {
        setError(e.message || 'Failed to load listings')
        setLoading(false)
      })
  }, [paramsObj, showListingsUi])

  useEffect(() => {
    fetchBanner(category)
      .then((b) => setBanner(b.message))
      .catch(() =>
        setBanner(
          'There are 45 auctions scheduled for today and currently 22 boats on sale — Join now!'
        )
      )
  }, [category])

  const setParams = useCallback(
    (next: URLSearchParams) => {
      setSearchParams(next, { replace: false })
    },
    [setSearchParams]
  )

  const onHeaderSearch = (query: string) => {
    const trimmed = query.trim()
    const next = new URLSearchParams(searchParams)
    if (!trimmed) {
      next.delete('q')
      // Keep user on listings table even when search text is cleared.
      if (!next.toString()) next.set('page', '1')
      setSearchParams(next)
      return
    }
    next.set('q', trimmed)
    next.set('page', '1')
    setSearchParams(next)
  }

  const findTitle =
    category === 'boat'
      ? 'Find a Boat'
      : category === 'car'
        ? 'Find a Car'
        : category === 'truck'
          ? 'Find a Truck'
          : 'Find a Scooter'

  const onBoatFinderSearch = (extra: Record<string, string>) => {
    const next = new URLSearchParams(searchParams)
    Object.entries(extra).forEach(([k, v]) => next.set(k, v))
    setSearchParams(next)
  }

  const onFeaturedChange = (value: string) => {
    const next = new URLSearchParams(searchParams)
    if (value) next.set('featured', value)
    else next.delete('featured')
    next.set('page', '1')
    setSearchParams(next)
  }

  const onSortKeyChange = (value: SortKey) => {
    const next = new URLSearchParams(searchParams)
    next.set('sort_by', value)
    next.set('page', '1')
    setSearchParams(next)
  }

  const onSortDescChange = (value: boolean) => {
    const next = new URLSearchParams(searchParams)
    next.set('sort_dir', value ? 'desc' : 'asc')
    setSearchParams(next)
  }

  const onPageChange = (value: number) => {
    const next = new URLSearchParams(searchParams)
    next.set('page', String(Math.max(1, value)))
    setSearchParams(next)
  }

  const onBrandClick = () => {
    setSearchParams(new URLSearchParams())
    navigate('/boats')
  }

  const singularUpper = labels.headline

  return (
    <div className="auction-layout">
      <Header
        activeCategory={category}
        titleLine2={titleLine2}
        searchValue={q}
        language={language}
        onSearch={onHeaderSearch}
        onBrandClick={onBrandClick}
      />
      <MainNav
        isLoggedIn={isLoggedIn}
        language={language}
        onToggleLanguage={onToggleLanguage}
        onLogout={onLogout}
      />

      {showListingsUi && (
        <section className="auction-layout__results" aria-label="Search results and filters">
          <VehicleFilters
            category={category}
            searchParams={searchParams}
            setSearchParams={setParams}
            language={language}
          />
          <SearchResults
            items={items}
            loading={loading}
            error={error}
            activeFeatured={activeFeatured}
            onFeaturedChange={onFeaturedChange}
            sortKey={sortKey}
            sortDesc={sortDesc}
            page={page}
            onSortKeyChange={onSortKeyChange}
            onSortDescChange={onSortDescChange}
            onPageChange={onPageChange}
            language={language}
          />
        </section>
      )}

      {!showListingsUi ? <NotificationBar message={banner} /> : null}

      {!showListingsUi ? (
        <HeroSection
          pluralLabel={labels.plural}
          singularUpper={singularUpper}
          language={language}
          isLoggedIn={isLoggedIn}
        />
      ) : null}

      {!showListingsUi ? (
        <FindBoatSection
          category={category}
          findTitle={findTitle}
          language={language}
          onBoatFinderSearch={onBoatFinderSearch}
        />
      ) : null}

      {!showListingsUi ? <HomeBelowSections language={language} /> : null}

      <Footer language={language} />
    </div>
  )
}

import { useEffect, useState, type ReactNode } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import type { AuthUser } from './api/types'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { MainNav } from './components/MainNav'
import type { AppLanguage } from './i18n'
import { AuctionPage } from './pages/AuctionPage'
import { AdvancedSearchPage } from './pages/AdvancedSearchPage'
import { AuctionsCalendarPage } from './pages/AuctionsCalendarPage'
import { CompareVehiclesPage } from './pages/CompareVehiclesPage'
import { JoinAuctionsPage } from './pages/JoinAuctionsPage'
import { LoginPage } from './pages/LoginPage'
import { HowToBuyPage } from './pages/HowToBuyPage'
import { RegisterPage } from './pages/RegisterPage'
import { FaqsPage } from './pages/FaqsPage'
import {
  AboutUsPage,
  BlogPage,
  BuyingTipsPage,
  BuySalvageBoatsPage,
  ContactUsPage,
  SalvageBoatsDefinitionPage,
  SalvageBoatsPage,
  SalvageTitleBoatsPage,
  UsedBoatsForSalePage,
} from './pages/SupportExtraPages'
import { FeedbacksPage } from './pages/FeedbacksPage'
import { FeesPage } from './pages/FeesPage'
import {
  ListShipmentPage,
  PriceHistoryPage,
  SalvageInspectionPage,
  TransportationPage,
  TransportEstimatePage,
} from './pages/ServicesPages'
import { SalesListPage } from './pages/SalesListPage'
import { TodaysAuctionsPage } from './pages/TodaysAuctionsPage'
import { VehicleDetailsPage } from './pages/VehicleDetailsPage'
import './App.css'

function CommonPageLayout({
  isLoggedIn,
  language,
  onToggleLanguage,
  onLogout,
  children,
}: {
  isLoggedIn: boolean
  language: AppLanguage
  onToggleLanguage: () => void
  onLogout: () => void
  children: ReactNode
}) {
  const navigate = useNavigate()

  return (
    <>
      <Header
        activeCategory="boat"
        titleLine2="BOATS"
        searchValue=""
        language={language}
        onSearch={(q) => {
          const sp = new URLSearchParams()
          if (q.trim()) sp.set('q', q.trim())
          navigate({ pathname: '/boats', search: sp.toString() })
        }}
        onBrandClick={() => navigate('/boats')}
      />
      <MainNav
        isLoggedIn={isLoggedIn}
        language={language}
        onToggleLanguage={onToggleLanguage}
        onLogout={onLogout}
      />
      {children}
      <Footer language={language} />
    </>
  )
}

export default function App() {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [language, setLanguage] = useState<AppLanguage>('en')

  useEffect(() => {
    const raw = localStorage.getItem('sba_user')
    if (!raw) return
    try {
      setUser(JSON.parse(raw) as AuthUser)
    } catch {
      setUser(null)
    }
  }, [])

  useEffect(() => {
    const raw = localStorage.getItem('sba_lang')
    if (raw === 'en' || raw === 'es') setLanguage(raw)
  }, [])

  const onLoginSuccess = (u: AuthUser) => {
    setUser(u)
    localStorage.setItem('sba_user', JSON.stringify(u))
  }

  const onLogout = () => {
    setUser(null)
    localStorage.removeItem('sba_user')
  }

  const onToggleLanguage = () => {
    setLanguage((prev) => {
      const next: AppLanguage = prev === 'en' ? 'es' : 'en'
      localStorage.setItem('sba_lang', next)
      return next
    })
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/boats" replace />} />
      <Route
        path="/boats"
        element={
          <AuctionPage
            isLoggedIn={Boolean(user)}
            language={language}
            onToggleLanguage={onToggleLanguage}
            onLogout={onLogout}
          />
        }
      />
      <Route
        path="/cars"
        element={
          <AuctionPage
            isLoggedIn={Boolean(user)}
            language={language}
            onToggleLanguage={onToggleLanguage}
            onLogout={onLogout}
          />
        }
      />
      <Route
        path="/trucks"
        element={
          <AuctionPage
            isLoggedIn={Boolean(user)}
            language={language}
            onToggleLanguage={onToggleLanguage}
            onLogout={onLogout}
          />
        }
      />
      <Route
        path="/scooters"
        element={
          <AuctionPage
            isLoggedIn={Boolean(user)}
            language={language}
            onToggleLanguage={onToggleLanguage}
            onLogout={onLogout}
          />
        }
      />
      <Route
        path="/advanced-search"
        element={
          <CommonPageLayout
            isLoggedIn={Boolean(user)}
            language={language}
            onToggleLanguage={onToggleLanguage}
            onLogout={onLogout}
          >
            <AdvancedSearchPage language={language} />
          </CommonPageLayout>
        }
      />
      <Route
        path="/auctions-calendar"
        element={
          <CommonPageLayout
            isLoggedIn={Boolean(user)}
            language={language}
            onToggleLanguage={onToggleLanguage}
            onLogout={onLogout}
          >
            <AuctionsCalendarPage language={language} />
          </CommonPageLayout>
        }
      />
      <Route
        path="/compare-vehicles"
        element={
          <CommonPageLayout
            isLoggedIn={Boolean(user)}
            language={language}
            onToggleLanguage={onToggleLanguage}
            onLogout={onLogout}
          >
            <CompareVehiclesPage language={language} />
          </CommonPageLayout>
        }
      />
      <Route
        path="/todays-auctions"
        element={
          <CommonPageLayout
            isLoggedIn={Boolean(user)}
            language={language}
            onToggleLanguage={onToggleLanguage}
            onLogout={onLogout}
          >
            <TodaysAuctionsPage language={language} />
          </CommonPageLayout>
        }
      />
      <Route
        path="/join-auctions"
        element={
          <CommonPageLayout
            isLoggedIn={Boolean(user)}
            language={language}
            onToggleLanguage={onToggleLanguage}
            onLogout={onLogout}
          >
            <JoinAuctionsPage language={language} isLoggedIn={Boolean(user)} />
          </CommonPageLayout>
        }
      />
      <Route
        path="/how-to-buy"
        element={
          <CommonPageLayout
            isLoggedIn={Boolean(user)}
            language={language}
            onToggleLanguage={onToggleLanguage}
            onLogout={onLogout}
          >
            <HowToBuyPage language={language} />
          </CommonPageLayout>
        }
      />
      <Route
        path="/faqs"
        element={
          <CommonPageLayout
            isLoggedIn={Boolean(user)}
            language={language}
            onToggleLanguage={onToggleLanguage}
            onLogout={onLogout}
          >
            <FaqsPage language={language} />
          </CommonPageLayout>
        }
      />
      <Route
        path="/fees"
        element={
          <CommonPageLayout
            isLoggedIn={Boolean(user)}
            language={language}
            onToggleLanguage={onToggleLanguage}
            onLogout={onLogout}
          >
            <FeesPage language={language} />
          </CommonPageLayout>
        }
      />
      <Route
        path="/salvage-boats"
        element={
          <CommonPageLayout
            isLoggedIn={Boolean(user)}
            language={language}
            onToggleLanguage={onToggleLanguage}
            onLogout={onLogout}
          >
            <SalvageBoatsPage language={language} />
          </CommonPageLayout>
        }
      />
      <Route
        path="/used-boats-for-sale"
        element={
          <CommonPageLayout
            isLoggedIn={Boolean(user)}
            language={language}
            onToggleLanguage={onToggleLanguage}
            onLogout={onLogout}
          >
            <UsedBoatsForSalePage language={language} />
          </CommonPageLayout>
        }
      />
      <Route
        path="/buy-salvage-boats"
        element={
          <CommonPageLayout
            isLoggedIn={Boolean(user)}
            language={language}
            onToggleLanguage={onToggleLanguage}
            onLogout={onLogout}
          >
            <BuySalvageBoatsPage language={language} />
          </CommonPageLayout>
        }
      />
      <Route
        path="/salvage-boats-definition"
        element={
          <CommonPageLayout
            isLoggedIn={Boolean(user)}
            language={language}
            onToggleLanguage={onToggleLanguage}
            onLogout={onLogout}
          >
            <SalvageBoatsDefinitionPage language={language} />
          </CommonPageLayout>
        }
      />
      <Route
        path="/salvage-title-boats"
        element={
          <CommonPageLayout
            isLoggedIn={Boolean(user)}
            language={language}
            onToggleLanguage={onToggleLanguage}
            onLogout={onLogout}
          >
            <SalvageTitleBoatsPage language={language} />
          </CommonPageLayout>
        }
      />
      <Route
        path="/buying-tips"
        element={
          <CommonPageLayout
            isLoggedIn={Boolean(user)}
            language={language}
            onToggleLanguage={onToggleLanguage}
            onLogout={onLogout}
          >
            <BuyingTipsPage language={language} />
          </CommonPageLayout>
        }
      />
      <Route
        path="/contact-us"
        element={
          <CommonPageLayout
            isLoggedIn={Boolean(user)}
            language={language}
            onToggleLanguage={onToggleLanguage}
            onLogout={onLogout}
          >
            <ContactUsPage language={language} />
          </CommonPageLayout>
        }
      />
      <Route
        path="/about-us"
        element={
          <CommonPageLayout
            isLoggedIn={Boolean(user)}
            language={language}
            onToggleLanguage={onToggleLanguage}
            onLogout={onLogout}
          >
            <AboutUsPage language={language} />
          </CommonPageLayout>
        }
      />
      <Route
        path="/blog"
        element={
          <CommonPageLayout
            isLoggedIn={Boolean(user)}
            language={language}
            onToggleLanguage={onToggleLanguage}
            onLogout={onLogout}
          >
            <BlogPage language={language} />
          </CommonPageLayout>
        }
      />
      <Route
        path="/feedbacks"
        element={
          <CommonPageLayout
            isLoggedIn={Boolean(user)}
            language={language}
            onToggleLanguage={onToggleLanguage}
            onLogout={onLogout}
          >
            <FeedbacksPage language={language} />
          </CommonPageLayout>
        }
      />
      <Route
        path="/sales-list"
        element={
          <CommonPageLayout
            isLoggedIn={Boolean(user)}
            language={language}
            onToggleLanguage={onToggleLanguage}
            onLogout={onLogout}
          >
            <SalesListPage language={language} />
          </CommonPageLayout>
        }
      />
      <Route
        path="/salvage-inspection"
        element={
          <CommonPageLayout
            isLoggedIn={Boolean(user)}
            language={language}
            onToggleLanguage={onToggleLanguage}
            onLogout={onLogout}
          >
            <SalvageInspectionPage language={language} />
          </CommonPageLayout>
        }
      />
      <Route
        path="/transportation"
        element={
          <CommonPageLayout
            isLoggedIn={Boolean(user)}
            language={language}
            onToggleLanguage={onToggleLanguage}
            onLogout={onLogout}
          >
            <TransportationPage language={language} />
          </CommonPageLayout>
        }
      />
      <Route
        path="/transportation-estimate"
        element={
          <CommonPageLayout
            isLoggedIn={Boolean(user)}
            language={language}
            onToggleLanguage={onToggleLanguage}
            onLogout={onLogout}
          >
            <TransportEstimatePage language={language} />
          </CommonPageLayout>
        }
      />
      <Route
        path="/list-shipment"
        element={
          <CommonPageLayout
            isLoggedIn={Boolean(user)}
            language={language}
            onToggleLanguage={onToggleLanguage}
            onLogout={onLogout}
          >
            <ListShipmentPage language={language} />
          </CommonPageLayout>
        }
      />
      <Route
        path="/price-history"
        element={
          <CommonPageLayout
            isLoggedIn={Boolean(user)}
            language={language}
            onToggleLanguage={onToggleLanguage}
            onLogout={onLogout}
          >
            <PriceHistoryPage language={language} />
          </CommonPageLayout>
        }
      />
      <Route
        path="/login"
        element={
          <CommonPageLayout
            isLoggedIn={Boolean(user)}
            language={language}
            onToggleLanguage={onToggleLanguage}
            onLogout={onLogout}
          >
            <LoginPage onLoginSuccess={onLoginSuccess} language={language} />
          </CommonPageLayout>
        }
      />
      <Route
        path="/register"
        element={
          <CommonPageLayout
            isLoggedIn={Boolean(user)}
            language={language}
            onToggleLanguage={onToggleLanguage}
            onLogout={onLogout}
          >
            <RegisterPage language={language} onRegisterSuccess={onLoginSuccess} />
          </CommonPageLayout>
        }
      />
      <Route
        path="/vehicles/:id"
        element={
          <CommonPageLayout
            isLoggedIn={Boolean(user)}
            language={language}
            onToggleLanguage={onToggleLanguage}
            onLogout={onLogout}
          >
            <VehicleDetailsPage language={language} />
          </CommonPageLayout>
        }
      />
      <Route path="*" element={<Navigate to="/boats" replace />} />
    </Routes>
  )
}

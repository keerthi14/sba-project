import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './HeroSection.css'
import type { AppLanguage } from '../i18n'

interface HeroSectionProps {
  pluralLabel: string
  singularUpper: string
  language: AppLanguage
  isLoggedIn: boolean
}

const HERO_IMG =
  'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80'

export function HeroSection({ pluralLabel, singularUpper, language, isLoggedIn }: HeroSectionProps) {
  const isEs = language === 'es'
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [modal, setModal] = useState<'terms' | 'privacy' | null>(null)

  const onRegisterClick = () => {
    const trimmed = email.trim()
    if (!trimmed) {
      setError(isEs ? 'Ingresa un correo para continuar.' : 'Please enter your email.')
      return
    }
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)
    if (!valid) {
      setError(isEs ? 'Ingresa un correo valido.' : 'Please enter a valid email address.')
      return
    }
    setError('')
    navigate(`/register?email=${encodeURIComponent(trimmed)}`)
  }

  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero__bg" />
      <div className="hero__inner">
        <div className="hero__copy">
          <h1 id="hero-heading" className="hero__title">
            {isEs ? 'SUBASTAS EN LINEA DE ' : 'LIVE ONLINE REPAIRABLE '}
            {singularUpper}
            {isEs ? ' REPARABLES' : ' AUCTIONS'}
          </h1>
          <div className="hero__pillars">
            <div>
              <strong>{isEs ? 'ENCUENTRA' : 'FIND'}</strong>
              <p>
                Clean, Salvage &amp; Repairable {pluralLabel.charAt(0).toUpperCase() + pluralLabel.slice(1)}{' '}
                {isEs ? 'Ofertas cerca de ti!' : 'Deals Near You!'}
              </p>
            </div>
            <div className="hero__pillar-divider" aria-hidden />
            <div>
              <strong>{isEs ? 'MAS DE 160' : 'OVER 160'}</strong>
              <p>{isEs ? 'Subastas semanales abiertas al publico.' : 'Weekly live Auctions open To the public.'}</p>
            </div>
            <div className="hero__pillar-divider" aria-hidden />
            <div>
              <strong>{isEs ? 'NO' : 'NO'}</strong>
              <p>{isEs ? 'Se requiere licencia de concesionario.' : 'Dealer License Required.'}</p>
            </div>
          </div>
          {!isLoggedIn ? (
            <div className="hero__register">
              <span className="hero__fineprint">
                {isEs ? 'No se requiere tarjeta de credito.' : 'No credit card required.'}
              </span>
              <div className="hero__form">
                <input
                  type="email"
                  placeholder={isEs ? 'INGRESA TU CORREO' : 'ENTER YOUR EMAIL'}
                  aria-label={isEs ? 'Correo para registro' : 'Email for registration'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="button" className="hero__register-btn" onClick={onRegisterClick}>
                  {isEs ? 'REGISTRATE GRATIS' : 'REGISTER FREE'}
                </button>
                <span className="hero__or">{isEs ? 'O registrate con' : 'Or register with'}</span>
                <button
                  type="button"
                  className="hero__google"
                  aria-label={isEs ? 'Registrarse con Google' : 'Register with Google'}
                >
                  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden>
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                </button>
              </div>
              {error ? <p className="hero__error">{error}</p> : null}
              <p className="hero__legal">
                {isEs ? 'Al registrarte, aceptas los ' : 'By signing up, you agree to the '}
                <button type="button" className="hero__legal-btn" onClick={() => setModal('terms')}>
                  {isEs ? 'Terminos y Condiciones' : 'Terms & Conditions'}
                </button>
                {isEs ? ' y la ' : ' and '}
                <button type="button" className="hero__legal-btn" onClick={() => setModal('privacy')}>
                  {isEs ? 'Politica de Privacidad' : 'Privacy Policy'}
                </button>
                .
              </p>
            </div>
          ) : null}
        </div>
        <div className="hero__image-wrap">
          <img src={HERO_IMG} alt="" className="hero__image" width={420} height={280} />
        </div>
      </div>
      {modal ? (
        <div className="hero-modal__backdrop" role="dialog" aria-modal="true">
          <div className="hero-modal">
            <div className="hero-modal__head">
              <h2>{modal === 'terms' ? 'Terms & Conditions' : 'Privacy Policy'}</h2>
              <button type="button" className="hero-modal__close" onClick={() => setModal(null)} aria-label="Close">
                ✕
              </button>
            </div>
            <div className="hero-modal__body">
              {modal === 'terms' ? (
                <>
                  <p>
                    Sample Terms: By using this demo site, you agree that auction listings, prices, and availability are
                    for demonstration purposes only.
                  </p>
                  <p>
                    You are responsible for verifying vehicle condition and complying with your local laws. No warranty
                    is provided.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Sample Privacy: We may store your email for account creation and communication. We do not sell your
                    personal data in this demo.
                  </p>
                  <p>
                    Cookies/local storage may be used to remember your login state and language settings.
                  </p>
                </>
              )}
            </div>
            <div className="hero-modal__foot">
              <button type="button" className="hero__register-btn" onClick={() => setModal(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  )
}

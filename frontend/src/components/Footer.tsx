import './Footer.css'
import type { AppLanguage } from '../i18n'

export function Footer({ language }: { language: AppLanguage }) {
  const isEs = language === 'es'
  return (
    <footer className="site-footer" aria-label="Footer">
      <div className="site-footer__inner">
        <section className="site-footer__contact">
          <h3>{isEs ? 'Llamanos:' : 'Call us:'}</h3>
          <a href="tel:+19545736936">+1-954-573-6936</a>
          <p>
            {isEs ? 'Servicio al cliente' : 'Customer Service'}
            <br />
            8 am - 5 pm (EST)
            <br />
            {isEs ? 'Lunes a Viernes' : 'Monday through Friday'}
          </p>

          <h3>{isEs ? 'Correo:' : 'Mail:'}</h3>
          <a href="mailto:contactus@salvageboatsauction.com">contactus@salvageboatsauction.com</a>

          <h3>Florida</h3>
          <p>
            4811 Lyons Technology Parkway, Suite 9,
            <br />
            Coconut Creek, 33073
          </p>
        </section>

        <section>
          <h4>{isEs ? 'Soporte' : 'Support'}</h4>
          <ul>
            <li><a href="#">How to Buy</a></li>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Contact us</a></li>
            <li><a href="#">Auto Auctions</a></li>
          </ul>
        </section>

        <section>
          <h4>{isEs ? 'Subastas de autos' : 'Auto Auctions'}</h4>
          <ul>
            <li><a href="#">Todays Auction</a></li>
            <li><a href="#">Sales Calendar</a></li>
            <li><a href="#">Sales List</a></li>
            <li><a href="#">Live Auction</a></li>
          </ul>
        </section>

        <section>
          <h4>{isEs ? 'Buscador de vehiculos' : 'Vehicle Finder'}</h4>
          <ul>
            <li><a href="#">Boat</a></li>
            <li><a href="#">Boat with Trailer</a></li>
            <li><a href="#">Pontoon Booats</a></li>
            <li><a href="#">Jet Skis</a></li>
          </ul>
        </section>

        <section>
          <h4>{isEs ? 'Compania' : 'Company'}</h4>
          <ul>
            <li><a href="#">About us</a></li>
            <li><a href="#">Customer Reviews</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Fees</a></li>
            <li><a href="#">Terms &amp; Conditions</a></li>
          </ul>
        </section>

        <section>
          <h4>{isEs ? 'Cuenta' : 'Account'}</h4>
          <ul>
            <li><a href="#">Register</a></li>
            <li><a href="#">Login</a></li>
            <li><a href="#">Password recovery</a></li>
          </ul>
        </section>

        <section>
          <h4>{isEs ? 'Descarga la APP' : 'Download the APP'}</h4>
          <div className="store-badges">
            <button type="button" className="store-btn" aria-label="Get it on Google Play">
              <svg viewBox="0 0 24 24" aria-hidden className="store-btn__icon">
                <path fill="#34A853" d="M3 2l10 10L3 22z" />
                <path fill="#EA4335" d="M3 2l7 4 3 6-3 6-7 4z" opacity="0.85" />
                <path fill="#FBBC05" d="M10 6l6 3-3 3z" />
                <path fill="#4285F4" d="M10 18l6-3-3-3z" />
              </svg>
              <span>
                <small>Get it on</small>
                <strong>Google Play</strong>
              </span>
            </button>
            <button type="button" className="store-btn" aria-label="Download on the App Store">
              <svg viewBox="0 0 24 24" aria-hidden className="store-btn__icon store-btn__icon--apple">
                <path d="M16.4 12.5c0-1.7 1.4-2.6 1.5-2.7-.8-1.2-2.1-1.4-2.6-1.4-1.1-.1-2.1.6-2.7.6-.6 0-1.4-.6-2.4-.6-1.2 0-2.4.7-3 1.8-1.3 2.2-.3 5.5.9 7.2.6.8 1.3 1.8 2.2 1.8.9 0 1.2-.5 2.3-.5 1.1 0 1.4.5 2.3.5.9 0 1.5-.9 2.1-1.7.7-1 1-2 1-2.1 0 0-1.6-.6-1.6-2.8zM14.6 7.1c.5-.6.8-1.4.7-2.1-.7 0-1.6.5-2.1 1.1-.5.5-.9 1.4-.8 2.1.8.1 1.6-.4 2.2-1.1z" fill="currentColor" />
              </svg>
              <span>
                <small>Download on the</small>
                <strong>App Store</strong>
              </span>
            </button>
          </div>

          <div className="bbb-block" aria-label="Better Business Bureau Accredited Business">
            <svg viewBox="0 0 48 48" aria-hidden className="bbb-block__seal">
              <circle cx="24" cy="24" r="22" fill="#0ea5e9" />
              <circle cx="24" cy="24" r="16" fill="#ffffff" />
              <path d="M16 29h6.8c2.4 0 4.2-1.2 4.2-3.3 0-1.5-.8-2.5-2.1-3 1-.5 1.6-1.3 1.6-2.6 0-2-1.7-3.1-4-3.1H16v12zm3-9.4h3.1c.9 0 1.5.4 1.5 1.2 0 .8-.6 1.2-1.5 1.2H19v-2.4zm0 4.6h3.5c1 0 1.6.5 1.6 1.3 0 .8-.6 1.3-1.6 1.3H19v-2.6z" fill="#0ea5e9" />
            </svg>
            <div>
              <strong>Better Business Bureau</strong>
              <span>ACCREDITED BUSINESS</span>
            </div>
          </div>
        </section>
      </div>

      <div className="site-footer__legal">
        <p>
          Copyright © 2004-2026 Inloher Corp. All Rights Reserved. SalvageBoatsAuction.com is an Online
          Marketing Service for Salvage Cars and SUVs from Copart Boats Auctions. Designated trademarks and
          brands are the property of their respective owners. Copart (TM) is a Trademark of Copart Inc.,
          Dallas, Texas. Inloher Corp is not owned by or affiliated with Copart, Inc., or its subsidiaries.
          All vehicles are purchased from Inloher Corp, not Copart. The use of this Web site constitutes
          acceptance of the <a href="#">Terms &amp; Conditions</a> and <a href="#">Privacy Policy</a>.
        </p>
      </div>
    </footer>
  )
}

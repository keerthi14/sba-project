import { Link } from 'react-router-dom'
import type { AppLanguage } from '../i18n'

interface JoinAuctionsPageProps {
  language: AppLanguage
  isLoggedIn: boolean
}

export function JoinAuctionsPage({ language, isLoggedIn }: JoinAuctionsPageProps) {
  const isEs = language === 'es'
  const loginHref = '/login?redirect=/join-auctions'
  const registerHref = '/register?redirect=/join-auctions'

  return (
    <main className="advanced-page">
      <section className="advanced-hero">
        <h1>{isEs ? 'Subastas en vivo' : 'Live Auctions'}</h1>
        <p className="todays-subheader">
          {isEs
            ? 'Atencion, no te pierdas las subastas, inicia sesion o registrate para poder ofertar.'
            : "Attention don't miss the options please login or register in order to able to bid"}
        </p>
        {!isLoggedIn ? (
          <p>
            <Link to={loginHref}>{isEs ? 'Login' : 'Login'}</Link> /{' '}
            <Link to={registerHref}>{isEs ? 'Register' : 'Register'}</Link>
          </p>
        ) : null}
      </section>

      <section className="adv-card">
        <h2>{isEs ? 'Video de subasta en vivo' : 'Live bidding video'}</h2>
        {isLoggedIn ? (
          <div className="join-video-wrap">
            <video
              controls
              className="join-video"
              poster="https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1200&q=80"
            >
              <source
                src="https://cdn.coverr.co/videos/coverr-business-team-in-a-conference-room-1579/1080p.mp4"
                type="video/mp4"
              />
            </video>
            <p className="join-video-note">
              {isEs
                ? 'Muestra de oferta en vivo con detalles de Salvage Boats Auctions.'
                : 'Sample live bidding video with website details.'}
            </p>
          </div>
        ) : (
          <p>
            {isEs
              ? 'Inicia sesion o registrate correctamente para ver los videos de subastas en vivo.'
              : 'Please login or register successfully to watch live auction videos.'}
          </p>
        )}
      </section>
    </main>
  )
}

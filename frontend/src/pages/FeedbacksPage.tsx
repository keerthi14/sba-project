import type { AppLanguage } from '../i18n'

const allFeedbacks = [
  { name: 'Michael R.', city: 'Tampa, FL', text: 'Great support and smooth bidding experience. Got my boat at a very good price.' },
  { name: 'Sandra K.', city: 'Austin, TX', text: 'Inspection guidance was very helpful. Team answered all questions quickly.' },
  { name: 'Tony P.', city: 'Phoenix, AZ', text: 'Easy registration and easy navigation. Will buy again from upcoming auctions.' },
  { name: 'Alicia M.', city: 'Denver, CO', text: 'Saved thousands compared to local dealerships. Process was clear and transparent.' },
  { name: 'David H.', city: 'Orlando, FL', text: 'I compared multiple boats and chose the best one for my repair budget.' },
  { name: 'Lori W.', city: 'Nashville, TN', text: 'Customer service team was patient and explained each fee clearly.' },
  { name: 'Kevin S.', city: 'Reno, NV', text: 'Loved the quick search and detailed listings with location information.' },
  { name: 'Meghan C.', city: 'Columbus, OH', text: 'Bidding process felt secure and transparent from start to finish.' },
]

export function FeedbacksPage({ language }: { language: AppLanguage }) {
  void language
  return (
    <main className="advanced-page">
      <section className="advanced-hero">
        <h1>All Feedbacks</h1>
      </section>
      <section className="adv-card">
        <div className="blog-grid">
          {allFeedbacks.map((f) => (
            <article key={`${f.name}-${f.city}`} className="blog-card">
              <h3>{f.name}</h3>
              <p className="muted">{f.city}</p>
              <p>{f.text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

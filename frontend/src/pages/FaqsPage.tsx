import { useState } from 'react'
import type { AppLanguage } from '../i18n'

const FAQS = [
  ['What do I need to register on Salvage Boats Auction?', "Americans and Canadians need a driver's license and basic personal details. International buyers can register with a passport number."],
  ['Do I have to pay to get a membership account?', 'You can start with a free basic account, then upgrade to monthly or yearly plans when needed.'],
  ['Who do I pay for the boat?', "All payments are sent to Inloher Corp. via allowed methods like wire transfer or cashier's check."],
  ['How much security deposit will I pay?', 'Minimum is $600. For higher-value purchases, deposit is typically 10% of sale price.'],
  ['Is the security fee refundable?', 'Yes, when buyer obligations are fulfilled and no penalties apply.'],
  ['Can I inspect a boat before I bid?', 'Yes, inspections can be done at Copart facilities, often during business hours.'],
  ["Is a dealer's license required?", "No, Salvage Boats Auction allows public buyers to participate without a dealer's license."],
  ['When will I get the title?', 'Processing can take up to 45 days depending on document submission and state requirements.'],
] as const

export function FaqsPage({ language }: { language: AppLanguage }) {
  const isEs = language === 'es'
  const [open, setOpen] = useState<string>(FAQS[0][0])

  return (
    <main className="advanced-page">
      <section className="advanced-hero faq-page">
        <h1>{isEs ? 'Preguntas frecuentes' : 'FAQs'}</h1>
        <div className="faq-accordion">
          {FAQS.map(([question, answer]) => (
            <article key={question} className="faq-item">
              <button type="button" className="faq-q-btn" onClick={() => setOpen((v) => (v === question ? '' : question))}>
                {question}
              </button>
              {open === question ? <p className="faq-answer">{answer}</p> : null}
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

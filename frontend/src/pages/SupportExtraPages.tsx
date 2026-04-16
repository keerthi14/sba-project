import { useMemo, useState, type FormEvent, type ReactNode } from 'react'
import type { AppLanguage } from '../i18n'

function PageWrap({ title, children }: { title: string; children: ReactNode }) {
  return (
    <main className="advanced-page">
      <section className="advanced-hero">
        <h1>{title}</h1>
        {children}
      </section>
    </main>
  )
}

export function SalvageBoatsPage(_: { language: AppLanguage }) {
  return (
    <PageWrap title="Why Buy Salvage Boats">
      <p>
        If you are looking to buy a boat, but your budget always falls short, you can buy a salvage boat,
        repair it, and then get it on the water. After repairing them, the salvage boats for sale will be just
        as good as any used boats you can buy. If you make up your mind to go for a salvage boat, we will give
        you access to hundreds of these boats in your location. Every Copart facility near you adds hundreds of
        boats to its inventory, and one of these boats can be yours.
      </p>
      <p>
        The large collection of boats to choose from makes it easier for you when you are shopping. Again,
        these boats are in Copart facilities in almost all states in the United States. This way, you can
        access the boats if you need to assess their conditions before closing the deal.
      </p>
      <p>
        Most of these boats will offer you the reliability you get from any other used boat. The only
        difference is that salvage boats need repairs before they get back on the water. The kind of repair a
        boat needs will depend on the kind of damage the boat has. However, some of the boats will not need
        major frame repairs, but minor engine repairs. Not all boats need repairs. For example, some boats
        that were stolen and recovered, or repossessed boats, might also be labeled as salvage in some states.
      </p>
      <p>You can save thousands of dollars by choosing one of the hundreds of boats in our catalog.</p>
      <h2 className="howto-subhead">Why Salvage Boats Auction?</h2>
      <p>
        When you shop for salvage boats for sale through Salvage Boats Auction, you get access to Copart online
        auctions. There are several auctions for boats every day, and you can join in as many as you want
        through Salvage Boats Auction. You also get access to Copart's catalog of salvage boats, which is the
        largest catalog in North America.
      </p>
      <p>
        Once you access the boats, you'll need to choose one that you love. These boats are available either
        through an online auction or through the "Buy It Now" option. If you choose a boat available through an
        online auction, we will get you a chance at the auction so that you can battle it out with dealers and
        other buyers online.
      </p>
      <p>
        Our happiness is in seeing you walk away, or better yet, paddle away, with the boat of your dreams.
        With so many boats on Copart yards around the country, you might be spoiled for choice when you first
        start searching. We recommend that you visit the Copart facility near you and inspect the boats you
        might be interested in.
      </p>
      <h2 className="howto-subhead">Entering an Online Bid</h2>
      <p>
        After assessing the condition of a boat, it is easy for you to enter an online bid. Salvage Boats
        Auction gives you access to Copart's live online auctions. Ensure you have paid the security deposit
        before entering an online auction.
      </p>
      <ul>
        <li>Access to hundreds of salvage boats for sale in a facility near you</li>
        <li>Access to Copart auto auctions without a dealer's license or Copart registration</li>
        <li>Easy access to hundreds of boat inspectors and boat transporters from our system</li>
      </ul>
    </PageWrap>
  )
}

export function UsedBoatsForSalePage(_: { language: AppLanguage }) {
  return (
    <PageWrap title="Used Boats for Sale">
      <p>
        Unlike new boats, some used boats can be pretty affordable. You can find boats in great and good
        conditions, and you can take them to the water when they are transported out of the yard. Wrecked boats
        for sale are even cheaper than all other used boats.
      </p>
      <p>
        Copart has a large collection of these wrecked boats, and we give you a front-row seat at the auction
        online. Previously, the general public did not have access to these auctions, as Copart requires buyers
        to have a dealer's license.
      </p>
      <h2 className="howto-subhead">Entering a Live Online Auction</h2>
      <p>
        Salvage Boats Auction is a registered broker with Copart. We also hold a dealer's license from Florida.
        Since 2004, we have served thousands of happy customers, something that has earned us an A+ rating on
        Better Business Bureau.
      </p>
    </PageWrap>
  )
}

export function BuySalvageBoatsPage(_: { language: AppLanguage }) {
  return (
    <PageWrap title="Buy Salvage Boats">
      <h2 className="howto-subhead">How is the purchase process?</h2>
      <ul>
        <li>Choose a subscription plan between free, monthly, and yearly</li>
        <li>Create an account with Salvage Boats Auction and enter your details as prompted</li>
        <li>Search for a boat near your and visit the Copart facility for an inspection</li>
        <li>Pay the security deposit and receive login details</li>
        <li>Enter a live online auction and enter your bid</li>
        <li>Win a boat and start the payment process</li>
      </ul>
      <p>
        You do not have to leave your home to buy a boat, as long as you are a member of Salvage Boats
        Auction. At Salvage Boats Auction, we offer a free basic account that will give you access to thousands
        of boats from all around the country.
      </p>
    </PageWrap>
  )
}

export function SalvageBoatsDefinitionPage(_: { language: AppLanguage }) {
  return (
    <PageWrap title="Defining Salvage Boats">
      <p>
        Almost all boats sitting in Copart facilities near you have the salvage title. These are boats that
        have undergone damage from water, fire, accidents, or any other damage that left them inoperable. Most
        of the boats are repairable, but the cost of repairs might have made the insurance companies 'total'
        the boats.
      </p>
      <p>
        This way, you can estimate the value of the boat based on the extent of the damages and the repairs the
        boat needs. After the inspection, you are the one to set the price of the boat during the live auction.
      </p>
      <p>
        For a boat to get the salvage title, the insurance company might have considered it a total loss with
        the cost of repair being more than 50 percent of the value of the boat.
      </p>
    </PageWrap>
  )
}

export function SalvageTitleBoatsPage(_: { language: AppLanguage }) {
  return (
    <PageWrap title="Save Big by Buying Salvage Title Boats">
      <p>
        Boats are a luxury whether you buy a new boat or a used boat. If you need to enjoy the luxury without
        sinking into debt for the rest of your life, you can buy one of the salvage boats for sale. These boats
        are cheap, seeing that you set your own price during the live online auction.
      </p>
      <h2 className="howto-subhead">Buying Salvage Boats Through Salvage Boats Auction</h2>
      <p>
        If you use our services to buy your boat, you will not need to have a dealer's license, and we will
        have everything covered for you. All you need to do is register to become a member of Salvage Boats
        Auction, and you can start searching for a boat from our site.
      </p>
      <p>
        Most of the boats in the collection are repairable, or great for parts. That's why we encourage you to
        visit the yard and inspect them before you bid.
      </p>
    </PageWrap>
  )
}

export function BuyingTipsPage(_: { language: AppLanguage }) {
  return (
    <PageWrap title="Salvage Boats Buying Tips">
      <p>
        There are so many boats available through Salvage Boats Auction. When you search for these boats, you
        will see their specifications, make, model, year, location, and type of damage. However, we still
        recommend that you perform an in-person inspection.
      </p>
      <h2 className="howto-subhead">Boat Inspection</h2>
      <p>
        From the search on Salvage Boats Auction, you will come across so many boats you might like. List these
        boats down and then visit the Copart facility where they are held for an inspection.
      </p>
      <h2 className="howto-subhead">Check Boat History</h2>
      <p>
        Before you enter an auction, check the history of the boat. The history and the inspection will enable
        you to make the right purchase decision and set the best price.
      </p>
      <h2 className="howto-subhead">Choosing the Right Boat</h2>
      <p>
        The Copart vehicle inventory updates every day as new salvage title boats come in. If you do not find a
        boat you love today, you might get it tomorrow or next week.
      </p>
    </PageWrap>
  )
}

export function ContactUsPage(_: { language: AppLanguage }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    window.alert('Email sent! Our team will contact you soon.')
    setName('')
    setEmail('')
    setPhone('')
    setMessage('')
  }

  return (
    <PageWrap title="Contact Us">
      <form className="auth-card support-contact-form" onSubmit={onSubmit}>
        <label>
          Name:
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Phone:
          <input value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </label>
        <label>
          Message:
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={5} required />
        </label>
        <button type="submit" className="auth-btn">Send</button>
      </form>
    </PageWrap>
  )
}

export function AboutUsPage(_: { language: AppLanguage }) {
  return (
    <PageWrap title="About us">
      <p>
        Salvage Boats Auction is the link between the general public and Copart Auto auctions. The general
        public doesn't have access to Copart auctions, seeing that Copart requires a dealer's license to grant
        access. At Salvage Boats Auction, we have a dealer's license from the state of Florida, and we are a
        registered broker with Copart too.
      </p>
      <p>
        Salvage Boats Auction operates under Inloher Corp, a company that has been in operation since 2004. The
        idea behind the business was to make affordable boats more accessible to the general public.
      </p>
      <p>
        Over time, we have advanced our system to make the process of acquiring affordable boats even easier.
      </p>
      <p>
        Address: 4811 Lyons Technology Parkway, Suite 9, Coconut Creek, FL 33073.
        <br />
        Office Hours: Monday to Friday from 9am to 5pm (EST)
        <br />
        Email: test
        <br />
        Phone: test
      </p>
    </PageWrap>
  )
}

interface BlogPost {
  title: string
  date: string
  category: string
  excerpt: string
}

const posts: BlogPost[] = [
  {
    title: 'What Are the Benefits of Buying a Jet Ski at Auction?',
    date: 'June 2, 2025',
    category: 'Online Boat Auctions',
    excerpt:
      'Buying a watercraft is investing in fun, but dealership sticker prices put the fun out of reach for many.',
  },
  {
    title: 'Salvage Boat Auctions and Market Trends',
    date: 'February 28, 2024',
    category: 'Uncategorized',
    excerpt:
      'The boating market has witnessed significant changes in recent years, with varying trends in new and used inventory.',
  },
  {
    title: 'The Smart Moves of Buying a Boat at Auction',
    date: 'February 13, 2024',
    category: 'Online Boat Auctions',
    excerpt:
      'Imagine the thrill of owning your own boat at an irresistible price. Sounds exciting, right?',
  },
  {
    title: 'Navigating Seaworthy Deals: How to Score Big on Salvaged Boats at Online Auctions',
    date: 'January 30, 2024',
    category: 'Online Boat Auctions',
    excerpt:
      'Learn practical strategies to identify quality salvage boats and place winning bids without overpaying.',
  },
  {
    title: 'ONLINE BOAT AUCTIONS: Buy High-Quality Salvage Boats',
    date: 'October 1, 2023',
    category: 'Online Boat Auctions',
    excerpt:
      'A practical overview for first-time buyers looking for affordable repairable boats in online auctions.',
  },
  {
    title: 'How to Evaluate Salvage Boat Repair Costs',
    date: 'September 15, 2023',
    category: 'Buying Tips',
    excerpt:
      'Use this checklist to estimate labor and parts before bidding on a salvage boat.',
  },
]

export function BlogPage(_: { language: AppLanguage }) {
  const [page, setPage] = useState(1)
  const pageSize = 3
  const totalPages = Math.max(1, Math.ceil(posts.length / pageSize))
  const safePage = Math.min(page, totalPages)
  const paged = useMemo(
    () => posts.slice((safePage - 1) * pageSize, safePage * pageSize),
    [safePage]
  )

  return (
    <PageWrap title="Blog">
      <article className="blog-featured">
        <h2>What Are the Benefits of Buying a Jet Ski at Auction?</h2>
        <p><strong>Posted on</strong> June 2, 2025</p>
        <p>
          Buying a watercraft is investing in fun, but dealership sticker prices put the fun out of reach for
          many. That's where a jet ski auction comes in. Salvage Boats Auction ...
        </p>
      </article>

      <ul className="blog-mini-list">
        {posts.slice(0, 4).map((p) => (
          <li key={p.title}>
            <strong>{p.title}</strong> - {p.date}
          </li>
        ))}
      </ul>

      <section className="adv-card">
        <h2>LATEST NEWS</h2>
        <div className="blog-grid">
          {paged.map((post) => (
            <article key={post.title} className="blog-card">
              <p className="muted">{post.category}</p>
              <h3>{post.title}</h3>
              <p className="muted">{post.date}</p>
              <p>{post.excerpt}</p>
              <a href="#read">Continue Reading »</a>
            </article>
          ))}
        </div>
        <div className="pagination">
          <button type="button" className="secondary" disabled={safePage <= 1} onClick={() => setPage(safePage - 1)}>
            Prev
          </button>
          <span>
            Page {safePage} / {totalPages}
          </span>
          <button
            type="button"
            className="secondary"
            disabled={safePage >= totalPages}
            onClick={() => setPage(safePage + 1)}
          >
            Next
          </button>
        </div>
      </section>
    </PageWrap>
  )
}

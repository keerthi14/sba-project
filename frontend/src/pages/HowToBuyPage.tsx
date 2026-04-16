import type { AppLanguage } from '../i18n'

export function HowToBuyPage({ language }: { language: AppLanguage }) {
  const isEs = language === 'es'

  return (
    <main className="advanced-page">
      <section className="advanced-hero">
        <h1>
          {isEs
            ? 'Comprar barcos de salvamento sin licencia de concesionario'
            : "Buying Salvage Boats Without a Dealer's License"}
        </h1>

        <h2 className="howto-subhead">{isEs ? 'Inicia el proceso de compra' : 'Start the Shopping Process'}</h2>
        <p>
          To get a chance to walk away with the boat you like, you need to first create an account with us.
          Open our registration page and choose one of our subscription options: free basic, monthly and
          yearly subscriptions.
        </p>
        <p>
          You can start with our free basic account and see what we have to offer before you pay for a plan.
          Through the free basic, you can search for and bid on as many boats as you need.
        </p>

        <h2 className="howto-subhead">
          {isEs ? 'Como comprar un barco en Salvage Boats Auction' : 'How to Buy a Boat on Salvage Boats Auction'}
        </h2>
        <p>
          It is easy to search for and buy a boat that will serve you for many years. The steps to buy a
          salvage boat are as follows:
        </p>
        <ul className="howto-links">
          <li>
            <a href="#registration">Registration on Salvage Boats Auction</a>
          </li>
          <li>
            <a href="#boat-search">Boat search</a>
          </li>
          <li>
            <a href="#boat-inspection">Boat Inspection</a>
          </li>
          <li>
            <a href="#bidding">Bidding</a>
          </li>
          <li>
            <a href="#payment-collection">Payment and Collection</a>
          </li>
        </ul>

        <h3 id="registration" className="howto-anchor">
          Registration on Salvage Boats Auction
        </h3>
        <p>
          We give you access to the largest collection of salvage boats for sale in the world. All you have
          to do to get access is create an online account with us. Open our registration page and choose one
          of the following subscription options:
        </p>
        <ul>
          <li>Free Basic Account</li>
          <li>Monthly Subscription</li>
          <li>Yearly Subscription</li>
        </ul>
        <p>
          With the Free Basic Account, you will have the same access as other members on paid subscription.
          Granted, you can search and bid on boats. If you have paid the security deposit, you can even
          purchase a boat. Once the thirty days are over, you will have to subscribe to the monthly or yearly
          membership.
        </p>
        <p>
          The monthly plan will cost you $34.95 every month, while the yearly subscription is $189.95. With
          the latter, you will save $90 every year. Besides the membership fee, you need to pay a security
          deposit fee of $600.00 or 10 percent of the boat's sale price (whichever is higher). This security
          deposit fee is 100% refundable.
        </p>

        <h3 id="boat-search" className="howto-anchor">
          Boat Search
        </h3>
        <p>
          With so many boats available through Salvage Boats Auction, you need to be careful which boat you
          get. You have hundreds of choices every day with more coming in the days that follow.
        </p>
        <p>
          Our Quick Search bar allows you to enter the name of a boat or lot number you are searching for and
          the results appear fast. You can, however, use our advanced search feature, which allows you to
          search for the boat based on make, model, year, state, location, and primary damage.
        </p>
        <p>
          We also offer the Quick Picks and Compare features that show you a list of boats based on a
          customized search using a lot number or any other feature. Click on the boat's name to access more
          details. The boat page will show images, specifications, title type, and so many other details. You
          can also see the Copart facility in which the boat is held to help you with the inspections.
        </p>

        <h3 id="boat-inspection" className="howto-anchor">
          Boat Inspection
        </h3>
        <p>
          While the boat page shows you images, history, and specifications among others, you still need to
          inspect the boat to ensure it is in good condition. Inspecting the boat in person means visiting the
          facility with or without a professional inspector to assess the boat. You may pay a visitors' fee
          in some facilities while others allow you to inspect the boats for free.
        </p>
        <p>
          At Salvage Boats Auction, we give you access to Copart's auctions and then leave the bidding and
          purchase to you. If you want to set the right bid price, you will need to see the boat and inspect
          all its parts, from the exterior to the internal parts of the engine.
        </p>
        <p>
          While at it, check the extent of the damages on the boat and the estimated cost of repairing these
          damages. This is where you need a professional inspector to help you. If some of the boats you come
          across do not meet your needs, you can always go for the next available boat.
        </p>
        <p>
          Note that you are responsible for the repairs as the boat comes 'as is' and also for transportation
          because Copart sells the boat "where is." It is, therefore, important that you inspect the boat as
          thoroughly as you can to ensure it is in good condition.
        </p>

        <h3 id="bidding" className="howto-anchor">
          Bidding on the Boat
        </h3>
        <p>
          An account with Salvage Boats Auction gives you access to the boats and also unrestricted bids on
          the boat. Once you create an account, you can bid on as many boats as you can at any time. You will
          need to pay the security deposit to receive the login details for the online auction and the
          bidder's number.
        </p>
        <p>
          Log in using your login details to enter an online auction and bid for a boat that meets your needs.
          It is advisable that you place the maximum bid to increase your chances of winning the boat you
          need.
        </p>
        <p>
          Once you place the maximum bid, you can set the Bid4U feature, which can automatically bid for you
          until another buyer outbids you. If another buyer's bid is higher, you will get an email that
          someone else has outbid you, and you will need to rebid.
        </p>

        <h3 id="payment-collection" className="howto-anchor">
          Payment and Collection
        </h3>
        <p>The vehicle purchase process is completed after payment and collection as per auction terms.</p>
      </section>
    </main>
  )
}

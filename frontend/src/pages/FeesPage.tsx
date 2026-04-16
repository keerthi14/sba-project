import { useMemo, useState } from 'react'
import type { AppLanguage } from '../i18n'

type Membership = 'free' | 'monthly' | 'yearly'

function calcInternetFee(bid: number) {
  if (bid < 100) return 0
  if (bid < 500) return 49
  if (bid < 1000) return 59
  if (bid < 1500) return 79
  if (bid < 2000) return 89
  if (bid < 4000) return 99
  if (bid < 6000) return 109
  if (bid < 8000) return 139
  return 149
}

function calcBrokerFee(bid: number, membership: Membership) {
  if (membership === 'free') return Math.max(299, bid * 0.1)
  if (membership === 'monthly') return Math.max(249, bid * 0.07)
  return Math.max(249, bid * 0.05)
}

function calcCopartFee(bid: number) {
  if (bid < 350) return 130
  if (bid < 1000) return 180
  if (bid < 2000) return 300
  if (bid < 4000) return 500
  if (bid < 6000) return 650
  return 800
}

export function FeesPage({ language }: { language: AppLanguage }) {
  void language
  const [membership, setMembership] = useState<Membership>('monthly')
  const [bidInput, setBidInput] = useState('6000')
  const [calculatedBid, setCalculatedBid] = useState(6000)
  const [calculatedMembership, setCalculatedMembership] = useState<Membership>('monthly')

  const values = useMemo(() => {
    const bid = Number.isFinite(calculatedBid) ? Math.max(0, calculatedBid) : 0
    const brokerFee = Math.round(calcBrokerFee(bid, calculatedMembership))
    const copartRegisteredBrokerFee = 50
    const copartFee = Math.round(calcCopartFee(bid))
    const internetBidFee = calcInternetFee(bid)
    const gateFee = 79
    const brokerMailingFee = 55
    const environmentalFee = 15
    const documentsFee = 145
    const total =
      bid +
      brokerFee +
      copartRegisteredBrokerFee +
      copartFee +
      internetBidFee +
      gateFee +
      brokerMailingFee +
      environmentalFee +
      documentsFee

    return {
      brokerFee,
      copartRegisteredBrokerFee,
      copartFee,
      internetBidFee,
      gateFee,
      brokerMailingFee,
      environmentalFee,
      documentsFee,
      total,
    }
  }, [calculatedBid, calculatedMembership])

  const onCalculate = () => {
    const parsed = Number(bidInput.replace(/[^0-9.]/g, ''))
    setCalculatedBid(Number.isFinite(parsed) ? parsed : 0)
    setCalculatedMembership(membership)
  }

  return (
    <main className="advanced-page">
      <section className="advanced-hero">
        <h1>Fees</h1>
        <h2 className="howto-subhead">FEES AND PAYMENTS</h2>
      </section>

      <section className="adv-card">
        <h2>Fee Calculator</h2>
        <p>
          Calculate your fees and profit with our membership. Please be aware Florida residents and Canadian
          residents may have higher fees.
        </p>

        <div className="fees-calc-grid">
          <label>
            Membership:
            <select value={membership} onChange={(e) => setMembership(e.target.value as Membership)}>
              <option value="free">Free</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </label>

          <label>
            Your Bid:
            <div className="fees-bid-row">
              <input value={bidInput} onChange={(e) => setBidInput(e.target.value)} inputMode="decimal" />
              <button type="button" className="adv-search-btn" onClick={onCalculate}>
                Calculate fees
              </button>
            </div>
          </label>
        </div>

        <div className="fees-results">
          <p>
            <strong>Our Broker Fee:</strong> ${values.brokerFee.toLocaleString()} USD
          </p>
          <p>
            <strong>Copart Registered Broker Fee:</strong> ${values.copartRegisteredBrokerFee.toLocaleString()} USD
          </p>
          <p>
            <strong>Copart Fee:</strong> ${values.copartFee.toLocaleString()} USD
          </p>
          <p>
            <strong>Internet Bid Fee:</strong> ${values.internetBidFee.toLocaleString()} USD
          </p>
          <p>
            <strong>Gate Fee:</strong> ${values.gateFee.toLocaleString()} USD
          </p>
          <p>
            <strong>Broker Mailing Fee:</strong> ${values.brokerMailingFee.toLocaleString()} USD
          </p>
          <p>
            <strong>Environmental Fee:</strong> ${values.environmentalFee.toLocaleString()} USD
          </p>
          <p>
            <strong>Documents Fee:</strong> ${values.documentsFee.toLocaleString()} USD
          </p>
          <p className="fees-total">
            <strong>Total Price:</strong> ${values.total.toLocaleString()} USD
          </p>
        </div>
      </section>

      <section className="adv-card">
        <h2>Transaction Fee.</h2>
        <p>
          The buyers agree to pay a broker fee to Inloher of $299 or 10% of the vehicle Sale Price (whichever
          is higher) not including Copart Buyer fees, for each vehicle purchased with a basic membership; $249
          or 7% of the vehicle Sale Price (whichever is higher) not including Copart Buyer fees, for each
          vehicle purchased, with a monthly membership account; $249 or 5% (whichever is higher) not including
          Copart Buyer fees of the vehicle Sale Price for each vehicle purchased with a yearly membership
          account. Canadian Residents making a purchase of a vehicle in Canada will have to pay the broker fee
          of $350 or 5% (whichever is higher). Inloher reserves the right to modify the transaction fee at any
          time without notice.
        </p>

        <h2>Copart Fees.</h2>
        <p>
          The buyer agrees to pay Copart Buyer fees for each vehicle purchased based on the following table:
        </p>

        <h3 className="faq-q">Copart Member Fees</h3>
        <div className="todays-table-wrap">
          <table className="todays-table">
            <thead>
              <tr>
                <th>Sale Price Range</th>
                <th>Clean Title</th>
                <th>Non-Clean Title</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>$0.01 - $49.99</td><td>$25.00</td><td>$25.00</td></tr>
              <tr><td>$50.00 - $99.99</td><td>$45.00</td><td>$45.00</td></tr>
              <tr><td>$100.00 - $199.99</td><td>$80.00</td><td>$80.00</td></tr>
              <tr><td>$200.00 - $299.99</td><td>$120.00</td><td>$130.00</td></tr>
              <tr><td>$300.00 - $349.99</td><td>$120.00</td><td>$137.50</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="faq-q">Heavy Vehicle Member Fees</h3>
        <div className="todays-table-wrap">
          <table className="todays-table">
            <thead>
              <tr>
                <th>Sale Price Range</th>
                <th>Clean Title</th>
                <th>Non-Clean Title</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>$0.01 - $49.99</td><td>$25.00</td><td>$25.00</td></tr>
              <tr><td>$50.00 - $99.99</td><td>$45.00</td><td>$45.00</td></tr>
              <tr><td>$100.00 - $199.99</td><td>$80.00</td><td>$80.00</td></tr>
              <tr><td>$200.00 - $299.99</td><td>$120.00</td><td>$130.00</td></tr>
              <tr><td>$300.00 - $349.99</td><td>$120.00</td><td>$137.50</td></tr>
              <tr><td>$350.00 - $399.99</td><td>$120.00</td><td>$145.00</td></tr>
              <tr><td>$4,500.00 - $4,999.99</td><td>$745.00</td><td>$750.00</td></tr>
              <tr><td>$5,000.00 - $5,499.99</td><td>$745.00</td><td>$775.00</td></tr>
              <tr><td>$5,000.00 +</td><td>15%</td><td>15%</td></tr>
            </tbody>
          </table>
        </div>

        <h2>Internet Bid Fee.</h2>
        <p>
          Kiosk Preliminary Bidding Fee
        </p>
        <p>
          Kiosk Preliminary Bidding is available at no charge at most locations. Members are responsible for
          requesting instructions from Copart regarding where or how to submit a valid Kiosk Preliminary Bid.
        </p>
        <p>Non-Kiosk Preliminary Bidding and Live Bidding</p>
        <p>
          Copart locations may provide internet access through computer terminal available in the lobby. These
          terminals are separate from preliminary bidding kiosks. All bids placed through either these
          terminals or Members' computers, smartphones, tablets or other bidding devices will incur the
          following charges, based on the high bid amount:
        </p>

        <div className="todays-table-wrap">
          <table className="todays-table">
            <thead>
              <tr><th>Sale Price</th><th>Non-Kiosk Preliminary Bid</th></tr>
            </thead>
            <tbody>
              <tr><td>$0.00 - $99.00</td><td>FREE</td></tr>
              <tr><td>$100.00 - $499.00</td><td>$39.00</td></tr>
              <tr><td>$500.00 - $999.00</td><td>$49.00</td></tr>
              <tr><td>$1000.00 - $1499.00</td><td>$69.00</td></tr>
              <tr><td>$1500.00 - $1999.00</td><td>$79.00</td></tr>
              <tr><td>$2000.00 - $3999.00</td><td>$89.00</td></tr>
              <tr><td>$4000.00 - $5999.00</td><td>$99.00</td></tr>
              <tr><td>$6000.00 - $7999.00</td><td>$119.00</td></tr>
              <tr><td>$8000.00 +</td><td>$129.00</td></tr>
            </tbody>
          </table>
        </div>
        <div className="todays-table-wrap">
          <table className="todays-table">
            <thead>
              <tr><th>Sale Price</th><th>Online Live Bid</th></tr>
            </thead>
            <tbody>
              <tr><td>$0.00 - $99.00</td><td>FREE</td></tr>
              <tr><td>$100.00 - $499.00</td><td>$49.00</td></tr>
              <tr><td>$500.00 - $999.00</td><td>$59.00</td></tr>
              <tr><td>$1000.00 - $1499.00</td><td>$79.00</td></tr>
              <tr><td>$1500.00 - $1999.00</td><td>$89.00</td></tr>
              <tr><td>$2000.00 - $3999.00</td><td>$99.00</td></tr>
              <tr><td>$4000.00 - $5999.00</td><td>$109.00</td></tr>
              <tr><td>$6000.00 - $7999.00</td><td>$139.00</td></tr>
              <tr><td>$8000.00 +</td><td>$149.00</td></tr>
            </tbody>
          </table>
        </div>

        <h2>Gate Fee (also called Load out fee).</h2>
        <p>
          A $79.00 Gate Fee is assessed to all Copart and DRIVE Clean Title purchases. This fee covers
          administrative costs and the movement of the item from our storage location to the Buyer loading
          area. It is at the discretion of the location whether assistance is given in loading vehicles onto
          transport trucks. All heavy and medium duty vehicles with item numbers 801 – 900 are self-load only.
          Note: Other fees may apply. Please contact the Copart or DRIVE location where the vehicle is listed
          for more detail.
        </p>
        <p>
          A $95.00 Gate Fee is assessed to all Copart and DRIVE NON-Clean Title purchases. This fee covers
          administrative costs and the movement of the item from our storage location to the Buyer loading
          area. It is at the discretion of the location whether assistance is given in loading vehicles onto
          transport trucks. All heavy and medium duty vehicles with item numbers 801 – 900 are self-load only.
          Note: Other fees may apply. Please contact the Copart or DRIVE location where the vehicle is listed
          for more detail.
        </p>

        <h2>Copart Mailing Fee.</h2>
        <p>
          The buyer is responsible for paying the broker a $20 mailing fee that Copart charges for mailing the
          vehicle's documents to the broker.
        </p>
        <h2>Broker Mailing Fee.</h2>
        <p>
          Non Florida resident buyers are responsible for paying the broker a $35 mailing fee ($55 for
          Canadian residents). The documents are sent by USPS Express Mail. If the buyer wishes to have the
          documents mailed by a different courier, overnight or to an international address, the buyer must
          contact the broker for pricing and pay the mailing fee in advance.
        </p>
        <h2>Copart Registered Broker Fee.</h2>
        <p>A fee of $50 will be charged for each vehicle purchased.</p>
        <h2>Environmental Fee</h2>
        <p>
          A $15 fee is applied to each item sold with a NON-Clean title, which covers the cost of precise
          handling and care in compliance with environmental regulations.
        </p>
        <h2>Document Fee</h2>
        <p>
          A $145 USD fee will be charged for every vehicle purchased, in order to process the vehicle
          documents.
        </p>

        <h2>Additional Fees (if applicable).</h2>
        <p>
          If the vehicle amount and all applicable fees are not completely paid within 3 business days of
          purchase, including the sale day, a fee of $50.00 late payment fee per vehicle will be assessed. ALL
          vehicles must be removed from the Copart yard within the first three days of purchase (including the
          day of purchase). After the third day Copart storage fees will be charged as follows:
        </p>
        <div className="todays-table-wrap">
          <table className="todays-table">
            <thead>
              <tr>
                <th>DAY</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th><th>10</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Online Bids</td><td>FREE</td><td>FREE</td><td>FREE</td><td>$5</td><td>$5</td><td>$30</td><td>$30</td><td>$30</td><td>$30</td><td>$40</td></tr>
              <tr><td>Kiosk or Buy it Now</td><td>FREE</td><td>FREE</td><td>$5</td><td>$5</td><td>$30</td><td>$30</td><td>$30</td><td>$30</td><td>$40</td><td>$40</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          Storage will be charged on weekends and holidays unless the weekend or holiday occurs within the
          first three days. Storage rates may vary by location and can be found on the Locations pages at
          Copart.
        </p>
        <p>* Storage fees may vary by location and can be found on the Locations pages on the Copart site.</p>

        <h2>Payment of Vehicles.</h2>
        <p>
          Payments for vehicles purchased through Inloher are due within 2 working days (not including auction
          day, i.e., if auction is on Monday, payments is due by 5.00pm EST on Wednesday). Payment for
          vehicles must be made to Inloher with a deposit to Inloher's bank account, by a Wire Transfer or
          with a Cashier's Check, NO OTHER WAY OF PAYMENT INCLUDING CREDID CARD, PAYPAL.COM, WESTERN UNION,
          GOOGLE CHECK OUT, OR ANY OTHER SYSTEM IS ACCEPTED. ANY DEPOSIT MADE WITH A PERSONAL CHECK OR A
          CASHIER'S CHECK WILL HAVE TO WAIT A PERIOD OF 5 BUSINESS DAYS FOR THE CHECK TO CLEAR. All vehicle
          payments must be made to Inloher NOT TO COPART, under no circumstances the Buyer is allow to pay
          vehicles at a Copart facility. Failure to comply will result in a penalty fee of $200 and closing of
          your account. Additionally, you will not receive your title and we have the right to file theft of
          automobile charges against you. In the event the payment is not received within seven (7) calendar
          days of the sale date, the Buyer shall be considered to have forfeited their security deposit and
          Inloher shall have the right to cancel the sale. All vehicle payments are pending in the bank account
          until the next business day. Under no circumstance will we make a payment to Copart if the funds are
          not available in our account.
        </p>

        <h2>Relisting Fee.</h2>
        <p>
          In the event that the purchase is requested to be cancelled for any reason OR the vehicle payment is
          not received within seven (7) calendar days of the sale date, the Buyer agrees that Inloher may, in
          its sole and absolute discretion, cancel the sale and Copart may relist the vehicle for sale. Buyer
          agrees to pay Inloher the relist fee of $600 USD or 10% of the sale price, whichever is greater.
          This fee will be taken from the Security Deposit paid in advance to Inloher and the remaining balance
          due will be billed to the credit card on file. The Buyer is also responsible for any and all
          collection costs, including attorney fees and court costs. Buyers who fail to fulfill their
          obligations are subject to revocation of their membership.
        </p>

        <h2>Sales Cancelation Fee.</h2>
        <p>
          The buyer agrees to pay a $300 sale cancelation fee, for any vehicle purchased for $10,000 or less;
          $500 for any vehicle that is $10,001 - $20,000; and $1,000 for any vehicle that is more than
          $20,001. If any of the purchasing parties cancels the purchase, regardless of the reason, and/or the
          buyer doesn't pay the purchased vehicle within the allotted time. The buyer authorizes Inloher to
          deduct this amount from the security deposit on fund, or from any other payment made by the buyer. If
          this is not possible, the buyer authorizes Inloher to charge the credit/debit card on file for the
          respective amount. If the payment is declined then the buyer must make this payment by wire transfer
          or direct bank deposit, in this case the buyer will have two (2) business days to make this payment,
          during which the membership will be suspended. If the payment is not received within the allotted
          time the membership will be revoked. The Buyer will be responsible for any and all collection costs,
          including attorney fees and court costs.
        </p>

        <h2>Sales Tax.</h2>
        <p>
          Florida law requires a seven (7) percent sales tax to be collected on sales price of a motor
          vehicle, mobile home, or vessel. Effective January 1, 2019, the maximum total sales tax and
          discretionary sales surtax to be collected on a vessel is $18,000. For a sale of a motor vehicle,
          mobile home or vessel located in the state of Florida, by a Florida motor vehicle dealer, to a
          resident of another state, within the United States, the tax imposed is the amount of sales tax that
          would be imposed by the purchaser's home state; however, it is not to exceed the Florida 7% tax
          rate.
        </p>
        <h3 className="faq-q">SALES TAX RATE AND TAX CREDIT APPLICATION AS OF 11/30/2011</h3>
        <div className="todays-table-wrap">
          <table className="todays-table">
            <thead>
              <tr>
                <th>STATE</th>
                <th>SALES TAX RATE</th>
                <th>IS CREDIT ALLOWED BY OTHER STATE FOR TAX PAID IN FLORIDA?</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>ALABAMA</td><td>2%</td><td>YES</td></tr>
              <tr><td>ALASKA</td><td>0%</td><td>NO</td></tr>
              <tr><td>ARIZONA</td><td>5.6%</td><td>YES</td></tr>
              <tr><td>ARKANSAS</td><td>6.5%</td><td>NO</td></tr>
              <tr><td>CALIFORNIA</td><td>7.25%</td><td>YES</td></tr>
              <tr><td>COLORADO</td><td>2.9%</td><td>YES</td></tr>
              <tr><td>CONNECTICUT</td><td>6.35% (7% over $50,000)</td><td>YES</td></tr>
              <tr><td>DELAWARE</td><td>0%</td><td>YES (if retitled in 90 days)</td></tr>
              <tr><td>DISTRICT OF COLUMBIA</td><td>0%</td><td>NO</td></tr>
              <tr><td>FLORIDA</td><td>7%</td><td>-</td></tr>
              <tr><td>GEORGIA</td><td>0%</td><td>NO</td></tr>
              <tr><td>HAWAII</td><td>4%</td><td>YES</td></tr>
              <tr><td>IDAHO</td><td>6%</td><td>YES</td></tr>
              <tr><td>ILLINOIS</td><td>6.25%</td><td>YES</td></tr>
              <tr><td>INDIANA</td><td>7%</td><td>YES</td></tr>
              <tr><td>IOWA</td><td>0%</td><td>YES</td></tr>
              <tr><td>KANSAS</td><td>6.5%</td><td>YES</td></tr>
              <tr><td>KENTUCKY</td><td>6% (0% for some motor vehicle cases)</td><td>YES</td></tr>
              <tr><td>LOUISIANA</td><td>4.45%</td><td>YES</td></tr>
              <tr><td>MAINE</td><td>5.5%</td><td>YES</td></tr>
              <tr><td>MARYLAND</td><td>0%</td><td>NO</td></tr>
              <tr><td>MASSACHUSETTS</td><td>6.25%</td><td>YES</td></tr>
              <tr><td>MICHIGAN</td><td>6%</td><td>YES</td></tr>
              <tr><td>MINNESOTA</td><td>6.5%</td><td>YES</td></tr>
              <tr><td>MISSISSIPPI</td><td>5%/3%/7% by type</td><td>NO (except mobile homes)</td></tr>
              <tr><td>MISSOURI</td><td>4.225%</td><td>YES</td></tr>
              <tr><td>MONTANA</td><td>0%</td><td>NO</td></tr>
              <tr><td>NEBRASKA</td><td>5.5%</td><td>YES (up to 5.5%)</td></tr>
              <tr><td>NEVADA</td><td>6.85%-8.10%</td><td>YES</td></tr>
              <tr><td>NEW HAMPSHIRE</td><td>0%</td><td>NO</td></tr>
              <tr><td>NEW JERSEY</td><td>6.625%</td><td>YES</td></tr>
              <tr><td>NEW MEXICO</td><td>0%</td><td>YES</td></tr>
              <tr><td>NEW YORK</td><td>4%</td><td>YES</td></tr>
              <tr><td>NORTH CAROLINA</td><td>0%</td><td>YES</td></tr>
              <tr><td>NORTH DAKOTA</td><td>0%</td><td>YES</td></tr>
              <tr><td>OHIO</td><td>5.75%</td><td>YES</td></tr>
              <tr><td>OKLAHOMA</td><td>1.25%</td><td>NO</td></tr>
              <tr><td>OREGON</td><td>0%</td><td>NO</td></tr>
              <tr><td>PENNSYLVANIA</td><td>6%</td><td>YES</td></tr>
              <tr><td>RHODE ISLAND</td><td>7%</td><td>YES</td></tr>
              <tr><td>SOUTH CAROLINA</td><td>0%</td><td>YES</td></tr>
              <tr><td>SOUTH DAKOTA</td><td>0%</td><td>NO</td></tr>
              <tr><td>TENNESSEE</td><td>7%</td><td>YES</td></tr>
              <tr><td>TEXAS</td><td>6.25%</td><td>YES</td></tr>
              <tr><td>UTAH</td><td>4.85%</td><td>YES</td></tr>
              <tr><td>VERMONT</td><td>6%</td><td>YES</td></tr>
              <tr><td>VIRGINIA</td><td>0%</td><td>YES</td></tr>
              <tr><td>VIRGIN ISLANDS</td><td>4.15%</td><td>YES</td></tr>
              <tr><td>WASHINGTON</td><td>6.8%</td><td>YES</td></tr>
              <tr><td>WEST VIRGINIA</td><td>6%</td><td>NO</td></tr>
              <tr><td>WISCONSIN</td><td>5%</td><td>YES</td></tr>
              <tr><td>WYOMING</td><td>4%</td><td>YES</td></tr>
            </tbody>
          </table>
        </div>

        <h2>Visits to the yards.</h2>
        <p>
          In some instances, Copart may charge an entry fee. Please contact the Copart yard prior to
          visiting.
        </p>
        <p>
          NOTE: INLOHER CORP ONLY ACCEPTS PAYMENTS THROUGH DIRECT DEPOSITS OR WIRE TRANSFER. ALL PAYMENTS MUST
          BE MADE TO INLOHER CORP AND NOT THE SALVAGE boat FACILITY OR ANY OTHER INSTITUTION.
        </p>
      </section>
    </main>
  )
}

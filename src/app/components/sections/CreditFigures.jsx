// Three equal cards in a row give a reader no order to read them in. The score
// range frames the other two and goes first; what shapes a score is the longest
// block, so it takes the full height of the right column.

const TIERS = [
  { name: 'Poor', range: '300-579', span: 279, weight: 0.25 },
  { name: 'Fair', range: '580-669', span: 90, weight: 0.4 },
  { name: 'Good', range: '670-739', span: 70, weight: 0.6 },
  { name: 'Very Good', range: '740-799', span: 60, weight: 0.8 },
  { name: 'Exceptional', range: '800-850', span: 51, weight: 1 },
];

const FACTORS = [
  {
    name: 'Payment History',
    weight: '35%',
    note: 'Whether you pay on time, every account, every month.',
  },
  {
    name: 'Amounts Owed',
    weight: '30%',
    note: 'How much of your available credit you are using right now.',
  },
  {
    name: 'Length of History',
    weight: '15%',
    note: 'How long your accounts have been open, oldest and average.',
  },
  {
    name: 'New Credit',
    weight: '10%',
    note: 'Recent applications and the inquiries they leave behind.',
  },
  {
    name: 'Credit Mix',
    weight: '10%',
    note: 'Revolving accounts like cards alongside installment loans.',
  },
];

export default function CreditFigures() {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-start gap-6 [grid-template-areas:'range_shape'_'usage_shape'] max-[860px]:grid-cols-[minmax(0,1fr)] max-[860px]:[grid-template-areas:'range'_'shape'_'usage']">
      <section className="panel [grid-area:range]">
        <div className="panel__head">
          <h3 className="panel__title">The Score Range</h3>
          <p className="panel__note">
            Most lenders read a FICO score on a 300 to 850 scale, in bands.
          </p>
        </div>
        <div
          className="score-band"
          role="img"
          aria-label="The 300 to 850 range, split into five bands"
        >
          {TIERS.map((tier) => (
            <span
              key={tier.name}
              className="score-band__tier"
              style={{ flex: tier.span, '--tier-weight': tier.weight }}
            ></span>
          ))}
        </div>
        <p className="score-band__ends">
          <span>300</span>
          <span>850</span>
        </p>
        <dl className="tiers">
          {TIERS.map((tier) => (
            <div className="tier" key={tier.name}>
              <dt>{tier.name}</dt>
              <dd>{tier.range}</dd>
            </div>
          ))}
        </dl>
        <p className="panel__note">
          Lenders sort applications by band, which is why crossing into the next one matters more
          than any single point.
        </p>
      </section>

      <section className="panel [grid-area:shape]">
        <div className="panel__head">
          <h3 className="panel__title">What Shapes a Score</h3>
          <p className="panel__note">
            FICO publishes how much weight each part of your file carries.
          </p>
        </div>
        <ul className="factors">
          {FACTORS.map((factor) => (
            <li className="factor" key={factor.name}>
              <p className="factor__head">
                <span>{factor.name}</span>
                <span className="factor__weight">{factor.weight}</span>
              </p>
              <div className="factor__track" aria-hidden="true">
                <div className="factor__fill" style={{ '--weight': factor.weight }}></div>
              </div>
              <p className="factor__note">{factor.note}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="panel [grid-area:usage]">
        <div className="panel__head">
          <h3 className="panel__title">Utilization, in Numbers</h3>
          <p className="panel__note">A $1,000 limit carrying a $900 balance.</p>
        </div>
        <div className="meter">
          <p className="meter__figures">
            <span className="meter__value">90%</span>
            <span>$900 of $1,000</span>
          </p>
          <div
            className="meter__track"
            role="img"
            aria-label="90 percent of the limit in use, against a 30 percent guideline"
          >
            <div className="meter__fill" style={{ '--used': '90%' }}></div>
            <span className="meter__mark" style={{ '--at': '30%' }}></span>
          </div>
          <p className="meter__scale">
            <span>0%</span>
            <span>30% Guideline</span>
            <span>100%</span>
          </p>
        </div>
        <ul className="checklist">
          <li>Utilization is read per card and across every card together.</li>
          <li>It is recalculated whenever a lender reports, not once a year.</li>
          <li>
            Paying in full still leaves a high balance on the report if it lands before the
            statement closes.
          </li>
        </ul>
      </section>
    </div>
  );
}

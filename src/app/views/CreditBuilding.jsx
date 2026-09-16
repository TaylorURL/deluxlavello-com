import { Link } from 'react-router-dom';

export default function CreditBuilding() {
  return (
    <>
      <section className="hero band pb-20 pt-24 max-[860px]:pb-14 max-[860px]:pt-16">
        <div className="mx-auto w-[calc(100%-2.5rem)] max-w-shell flex flex-col *:m-0 gap-8">
          <span className="eyebrow">Services</span>
          <h1 className="display text-hero max-w-[46ch] [overflow-wrap:anywhere]">
            Credit Building
          </h1>
          <p className="max-w-[58ch] text-md text-soft [overflow-wrap:anywhere]">
            For establishing a credit foundation, or rebuilding one. Learn how credit actually works
            while you put positive history on the board, step by step.
          </p>
          <div className="flex flex-wrap gap-3 self-start max-w-full">
            <Link className="btn btn--gold" to="/contact/">
              Schedule a Consultation
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 max-[860px]:py-16">
        <div className="mx-auto w-[calc(100%-2.5rem)] max-w-narrow flex flex-col *:m-0 gap-12">
          <div className="prose">
            <h2>Who this is for</h2>
            <p>
              People with little or no credit history, and people whose history has taken hits they
              are ready to move past. If lenders cannot see enough positive history to say yes, this
              is where you start.
            </p>
            <h2>What we focus on</h2>
            <div className="mb-4 grid grid-cols-[repeat(auto-fit,minmax(min(15rem,100%),1fr))] gap-6">
              <div className="focus-group">
                <p className="focus-group__head">The Fundamentals</p>
                <ul>
                  <li>How credit reports and scores actually work, in plain language</li>
                  <li>Payment history, the single habit that carries the most weight</li>
                  <li>Utilization, and keeping the credit in use within a healthy range</li>
                </ul>
              </div>
              <div className="focus-group">
                <p className="focus-group__head">The Long Game</p>
                <ul>
                  <li>Credit mix, and when a secured product suits the situation</li>
                  <li>Responsible account management that is sustainable</li>
                  <li>Long-term credit development rather than quick fixes</li>
                </ul>
              </div>
            </div>
            <h2>What to expect</h2>
            <p>
              A consultation first, so the plan fits your real situation. Then structured guidance
              with education at every step. You will always know what you are doing and why it
              matters. Progress in credit building is gradual by nature; we set honest expectations
              and keep you moving.
            </p>
          </div>
          <div className="callout mt-12">
            Results vary by individual. Delux L Avello LLC does not promise specific credit-score
            increases or guaranteed results.
          </div>
        </div>
      </section>

      <section className="py-24 max-[860px]:py-16">
        <div className="mx-auto w-[calc(100%-2.5rem)] max-w-narrow flex flex-col *:m-0 gap-12">
          <div className="max-w-[58ch]">
            <span className="eyebrow">The Work</span>
            <h2 className="display text-xl [overflow-wrap:anywhere]">
              What the first ninety days look like
            </h2>
          </div>
          <div className="prose">
            <p>
              The first session is a review: reports from all three bureaus, the accounts on them,
              and the marks that are holding the file back. From there the plan names a small number
              of habits to hold and, where it fits the situation, one or two accounts to open and
              manage carefully.
            </p>
            <p>
              Scores move on reporting cycles, not on effort. Most lenders report once a month, so
              the first measurable change usually arrives thirty to sixty days after the habits
              start. That gap is normal, and knowing it is coming is the difference between staying
              with a plan and abandoning it a week early.
            </p>
            <h3>What this service does not do</h3>
            <p>
              Delux L Avello LLC does not dispute accurate information, promise deletions, or offer
              to raise a score by a set number of points. Accurate negative history stays on a
              report for as long as the law allows. What changes is everything reported alongside
              it, and over time that is what lenders weigh.
            </p>
          </div>
        </div>
      </section>

      <section className="cta-band py-16">
        <div className="mx-auto w-[calc(100%-2.5rem)] max-w-shell flex flex-col *:m-0 flex-wrap justify-between gap-6">
          <div className="min-w-0">
            <h2 className="display text-xl max-w-[24ch] [overflow-wrap:anywhere]">
              Start your foundation
            </h2>
            <p className="mt-4 max-w-[46ch] text-soft">
              One consultation is enough to know where you stand and what comes next.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 self-start max-w-full">
            <Link className="btn btn--gold" to="/contact/">
              Schedule a Consultation
            </Link>
            <Link className="btn btn--ghost" to="/services/">
              Compare All Paths
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

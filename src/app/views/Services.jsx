import { Link } from 'react-router-dom';

export default function Services() {
  return (
    <>
      <section className="hero band pb-20 pt-24 max-[860px]:pb-14 max-[860px]:pt-16">
        <div className="mx-auto w-[calc(100%-2.5rem)] max-w-shell flex flex-col *:m-0 gap-8">
          <span className="eyebrow">Services</span>
          <h1 className="display text-hero max-w-[46ch] [overflow-wrap:anywhere]">
            Start with the path that sounds like you
          </h1>
          <p className="max-w-[58ch] text-md text-soft [overflow-wrap:anywhere]">
            Every path pairs guidance with education, so the progress you make is progress you
            understand. A consultation settles which one fits.
          </p>
          <div className="flex flex-wrap gap-3 self-start max-w-full">
            <Link className="btn btn--gold" to="/contact/">
              Schedule a Consultation
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 max-[860px]:py-16">
        <div className="mx-auto w-[calc(100%-2.5rem)] max-w-shell flex flex-col *:m-0 gap-12">
          <div className="max-w-[58ch]">
            <span className="eyebrow">The Paths</span>
            <h2 className="display text-xl [overflow-wrap:anywhere]">Four ways to work together</h2>
          </div>
          <ol className="index index--wide">
            <li>
              <Link to="/services/credit-building/">
                <svg className="row-art" aria-hidden="true" viewBox="0 0 64 64">
                  <use href="#a-foundation" />
                </svg>
                <b>Credit Building</b>
                <i>
                  You are starting from scratch, or starting over. Little to no credit history, or a
                  history you are ready to move past. This path builds the foundation: how credit
                  works, positive history, and habits that hold up long term.
                </i>
                <em>Explore</em>
              </Link>
            </li>
            <li>
              <Link to="/services/credit-growth/">
                <svg className="row-art" aria-hidden="true" viewBox="0 0 64 64">
                  <use href="#a-growth" />
                </svg>
                <b>Credit Growth</b>
                <i>
                  You already have credit and want it working harder. This path focuses on
                  strengthening and optimizing the profile you have: utilization, account
                  management, and the decisions that shape your file over time.
                </i>
                <em>Explore</em>
              </Link>
            </li>
            <li>
              <Link to="/services/credit-building-and-growth/">
                <svg className="row-art" aria-hidden="true" viewBox="0 0 64 64">
                  <use href="#a-combined" />
                </svg>
                <b>Credit Building + Credit Growth</b>
                <i>
                  You need both: the foundation and the ongoing development. The complete path takes
                  you from first steps through continued growth with one consistent plan.
                </i>
                <em>Explore</em>
              </Link>
            </li>
            <li>
              <Link to="/services/debt-lawsuit-response/">
                <svg className="row-art" aria-hidden="true" viewBox="0 0 64 64">
                  <use href="#a-shield" />
                </svg>
                <b>Debt Lawsuit Response Support</b>
                <i>
                  You have been served with a lawsuit over a consumer debt. This service helps you
                  understand the process, organize your information, and prepare to take the
                  appropriate next steps.
                </i>
                <em>Explore</em>
              </Link>
            </li>
          </ol>
          <div className="callout mt-12">
            Delux L Avello LLC is not a law firm and does not provide legal representation or legal
            advice. Debt Lawsuit Response Support is educational and organizational in nature.
          </div>
        </div>
      </section>

      <section className="py-24 max-[860px]:py-16">
        <div className="mx-auto w-[calc(100%-2.5rem)] max-w-narrow flex flex-col *:m-0 gap-12">
          <div className="max-w-[58ch]">
            <span className="eyebrow">Choosing</span>
            <h2 className="display text-xl [overflow-wrap:anywhere]">How to pick a path</h2>
          </div>
          <div className="prose">
            <p>
              The dividing line is what the credit file already holds. When lenders cannot see
              enough positive history to say yes, Credit Building is the starting point. When the
              history is there and the terms are still poor, Credit Growth is the shorter route.
              When credit is going to decide something specific a year or more out, the combined
              path covers both stages without a handover in the middle.
            </p>
            <p>
              Debt Lawsuit Response Support sits apart from the other three. It answers a legal
              deadline rather than a credit goal, and it can run alongside any of them.
            </p>
            <h3>What every path includes</h3>
            <p>
              A consultation before any plan is written, education at each step so the reasoning
              stays put, and honest timelines. Nobody is placed on a path in a consultation they
              have not had.
            </p>
          </div>
        </div>
      </section>

      <section className="cta-band py-16">
        <div className="mx-auto w-[calc(100%-2.5rem)] max-w-shell flex flex-col *:m-0 flex-wrap justify-between gap-6">
          <div className="min-w-0">
            <h2 className="display text-xl max-w-[24ch] [overflow-wrap:anywhere]">
              Not sure where you fit?
            </h2>
            <p className="mt-4 max-w-[46ch] text-soft">
              Describe your situation in one call, and leave knowing your path.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 self-start max-w-full">
            <Link className="btn btn--gold" to="/contact/">
              Schedule a Consultation
            </Link>
            <a className="btn btn--ghost" href="tel:+17707586195">
              Call (770) 758-6195
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

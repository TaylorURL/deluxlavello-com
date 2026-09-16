import CoachPortrait from '@sections/CoachPortrait.jsx';
import CreditFigures from '@sections/CreditFigures.jsx';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <section className="bg-[radial-gradient(ellipse_70%_55%_at_50%_0%,var(--hero-glow),transparent_70%)] pb-16 pt-24 max-[860px]:pb-12 max-[860px]:pt-16">
        <div className="mx-auto w-[calc(100%-2.5rem)] max-w-shell *:m-0 grid grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] items-center gap-16 max-[960px]:grid-cols-1 max-[960px]:gap-12">
          <div className="flex flex-col items-start gap-8 *:m-0">
            <h1 className="display text-hero max-w-[46ch] [overflow-wrap:anywhere]">
              Build credit that opens doors.
            </h1>
            <p className="max-w-[58ch] text-md text-soft [overflow-wrap:anywhere]">
              Delux Financial Solutions is a credit education and credit-building practice in
              Houston, Texas.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link className="btn btn--gold" to="/contact/">
                Schedule a Consultation
              </Link>
              <Link className="btn btn--ghost" to="/services/">
                Compare the Paths
              </Link>
            </div>
          </div>
          <ul className="hero__marks">
            <li>
              <svg className="hero__art" aria-hidden="true" viewBox="0 0 64 64">
                <use href="#a-gauge" />
              </svg>
              <b>Know the Number</b>
              <i>What the band means, and what moves it.</i>
            </li>
            <li>
              <svg className="hero__art" aria-hidden="true" viewBox="0 0 64 64">
                <use href="#a-plan" />
              </svg>
              <b>Follow a Written Plan</b>
              <i>Every step carries the reason it is there.</i>
            </li>
            <li>
              <svg className="hero__art" aria-hidden="true" viewBox="0 0 64 64">
                <use href="#a-foundation" />
              </svg>
              <b>Keep the Habits</b>
              <i>They outlast the engagement that taught them.</i>
            </li>
          </ul>
        </div>
      </section>

      <section className="py-24 max-[860px]:py-16">
        <div className="mx-auto w-[calc(100%-2.5rem)] max-w-shell flex flex-col *:m-0 gap-12">
          <div className="max-w-[58ch]">
            <span className="eyebrow">Services</span>
            <h2 className="display text-xl [overflow-wrap:anywhere]">Four clear paths</h2>
            <p className="mt-4 text-soft">
              Pick the one that sounds like the situation. A consultation confirms the fit.
            </p>
          </div>
          <ol className="index">
            <li>
              <Link to="/services/credit-building/">
                <svg className="row-art" aria-hidden="true" viewBox="0 0 64 64">
                  <use href="#a-foundation" />
                </svg>
                <b>Credit Building</b>
                <i>
                  Establish a foundation, or rebuild after setbacks, while learning how credit
                  works.
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
                  Strengthen credit that already exists, with guidance focused on the whole profile.
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
                <i>Build the foundation, then keep developing it as the profile matures.</i>
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
                  Understand a consumer debt lawsuit, organize the documents, prepare the next step.
                </i>
                <em>Explore</em>
              </Link>
            </li>
          </ol>
        </div>
      </section>

      <section className="py-24 max-[860px]:py-16">
        <div className="mx-auto w-[calc(100%-2.5rem)] max-w-shell flex flex-col *:m-0 gap-12">
          <div className="max-w-[58ch]">
            <span className="eyebrow">Know the Numbers</span>
            <h2 className="display text-xl [overflow-wrap:anywhere]">
              The figures behind a decision
            </h2>
            <p className="mt-4 text-soft">
              A lender reads three things: the band, the file, and the share of credit in use.
            </p>
          </div>
          <CreditFigures />
          <Link className="btn btn--ghost self-start max-w-full" to="/education/">
            Read the Education Section
          </Link>
        </div>
      </section>

      <section className="py-24 max-[860px]:py-16">
        <div className="mx-auto w-[calc(100%-2.5rem)] max-w-shell flex flex-col *:m-0 gap-12">
          <div className="max-w-[58ch]">
            <h2 className="display text-xl [overflow-wrap:anywhere]">
              First call to real progress
            </h2>
          </div>
          <table className="spec">
            <caption className="sr-only">
              The four stages of working with Delux Financial Solutions
            </caption>
            <thead>
              <tr>
                <th scope="col">Stage</th>
                <th scope="col">What Happens</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">
                  <span className="spec__step">01</span> Schedule a Consultation
                </th>
                <td>A conversation about the situation, the goals, and which path fits.</td>
              </tr>
              <tr>
                <th scope="row">
                  <span className="spec__step">02</span> Review the Credit Picture
                </th>
                <td>A walk through the reports and the history, so the starting point is known.</td>
              </tr>
              <tr>
                <th scope="row">
                  <span className="spec__step">03</span> Follow the Plan
                </th>
                <td>A written plan with the reasoning attached to every step in it.</td>
              </tr>
              <tr>
                <th scope="row">
                  <span className="spec__step">04</span> Keep Building
                </th>
                <td>Guidance that continues as the profile develops and the goals move on.</td>
              </tr>
            </tbody>
          </table>
          <Link className="btn btn--ghost self-start max-w-full" to="/how-it-works/">
            See the Full Process
          </Link>
        </div>
      </section>

      <section className="py-24 max-[860px]:py-16">
        <div className="mx-auto w-[calc(100%-2.5rem)] max-w-shell flex flex-col *:m-0 gap-12">
          <div>
            <h2 className="display text-xl [overflow-wrap:anywhere]">Understand your credit</h2>
            <p className="mt-4 text-soft">
              Strong decisions start with the fundamentals. These three cover most of them.
            </p>
          </div>
          <ul className="split__list">
            <li>
              <Link to="/education/#credit-reports">
                <svg className="row-art" aria-hidden="true" viewBox="0 0 64 64">
                  <use href="#a-report" />
                </svg>
                <b>Credit Reports</b>
                <i>What a report contains, who compiles it, and how to read one.</i>
              </Link>
            </li>
            <li>
              <Link to="/education/#credit-scores">
                <svg className="row-art" aria-hidden="true" viewBox="0 0 64 64">
                  <use href="#a-gauge" />
                </svg>
                <b>Credit Scores</b>
                <i>The five factors behind a score, and the weight each one carries.</i>
              </Link>
            </li>
            <li>
              <Link to="/education/#credit-utilization">
                <svg className="row-art" aria-hidden="true" viewBox="0 0 64 64">
                  <use href="#a-usage" />
                </svg>
                <b>Credit Utilization</b>
                <i>Why the share of credit in use matters, and how to hold it down.</i>
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <section className="py-24 max-[860px]:py-16">
        <div className="mx-auto w-[calc(100%-2.5rem)] max-w-shell flex flex-col *:m-0 gap-12">
          <div className="grid grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)] items-center gap-12 max-[860px]:grid-cols-1 max-[860px]:gap-8">
            <CoachPortrait />
            <div className="flex flex-col gap-6">
              <h2 className="display text-xl [overflow-wrap:anywhere]">Education first, always</h2>
              <div className="prose text-soft">
                <p>
                  Delux L Avello LLC provides the programs, the structure, and the support. Darian
                  Avello, The Credit Coach, brings the education.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link className="btn btn--ghost" to="/about/">
                  Meet the Credit Coach
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-band py-16">
        <div className="mx-auto w-[calc(100%-2.5rem)] max-w-shell flex flex-col *:m-0 flex-wrap justify-between gap-6">
          <div className="min-w-0">
            <h2 className="display text-xl max-w-[24ch] [overflow-wrap:anywhere]">
              Ready to take the first step?
            </h2>
            <p className="mt-4 max-w-[46ch] text-soft">
              Virtual and mobile in-person consultations, by appointment. The first one carries no
              charge and no obligation.
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

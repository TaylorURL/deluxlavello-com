import CreditFigures from '@sections/CreditFigures.jsx';
import { Link } from 'react-router-dom';

export default function Education() {
  return (
    <>
      <section className="hero band pb-20 pt-24 max-[860px]:pb-14 max-[860px]:pt-16">
        <div className="mx-auto w-[calc(100%-2.5rem)] max-w-shell flex flex-col *:m-0 gap-8">
          <span className="eyebrow">Education</span>
          <h1 className="display text-hero max-w-[46ch] [overflow-wrap:anywhere]">
            Credit, in plain language
          </h1>
          <p className="max-w-[58ch] text-md text-soft [overflow-wrap:anywhere]">
            A credit file holds what you owe, whether you pay on time, and how much of your
            available credit is in use.
          </p>
          <div className="flex flex-wrap gap-3 self-start max-w-full">
            <Link className="btn btn--gold" to="/contact/">
              Schedule a Consultation
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-line py-6">
        <div className="mx-auto w-[calc(100%-2.5rem)] max-w-shell">
          <p className="max-w-[74ch] text-sm text-soft">
            Written by{' '}
            <Link to="/about/" rel="author">
              Darian Avello
            </Link>
            , The Credit Coach at Delux Financial Solutions. Last reviewed{' '}
            <time dateTime="2026-08-26">August 2026</time>.
          </p>
        </div>
      </section>

      <section className="py-24 max-[860px]:py-16" id="the-figures">
        <div className="mx-auto w-[calc(100%-2.5rem)] max-w-shell flex flex-col *:m-0 gap-12">
          <div className="max-w-[58ch]">
            <span className="eyebrow">Know the Numbers</span>
            <h2 className="display text-xl [overflow-wrap:anywhere]">
              The figures behind every credit decision
            </h2>
            <p className="mt-4 text-soft">
              A lender reads three things: which band your score sits in, what your file holds, and
              how much credit you are using.
            </p>
          </div>
          <CreditFigures />
        </div>
      </section>

      <section className="py-24 max-[860px]:py-16">
        <div className="mx-auto w-[calc(100%-2.5rem)] max-w-narrow flex flex-col *:m-0 gap-12">
          <div className="prose">
            <h2 id="credit-reports">Credit reports</h2>
            <p>
              A credit report is your borrowing history on paper: your accounts, balances, payment
              record, and public records, compiled by the three major bureaus: Equifax, Experian,
              and TransUnion. Lenders read it to decide whether to say yes. You are entitled to
              review your reports regularly, and you should: knowing what they say is the starting
              point for everything else.
            </p>
            <h2 id="credit-scores">Credit scores</h2>
            <p>
              A credit score condenses your report into a number. The biggest factors: whether you
              pay on time, how much of your available credit you use, how long your accounts have
              been open, the mix of account types, and how recently you have applied for new credit.
              Different scoring models weigh these differently, which is why your number varies from
              place to place.
            </p>
            <h2 id="credit-utilization">Credit utilization</h2>
            <p>
              Utilization is the share of your available credit you are actually using. A card with
              a $1,000 limit carrying a $900 balance sits at 90%, and using that much of a limit
              reads as risk to a lender, even when you pay on time. Keeping balances low relative to
              limits is one of the most direct habits you control.
            </p>
            <h2 id="payment-history">Payment history</h2>
            <p>
              Payment history carries more weight than any other factor. Paying every account on
              time, every month, does more for your credit over time than any trick or shortcut ever
              will.
            </p>
            <h2 id="credit-mix">Credit mix and new credit</h2>
            <p>
              Lenders like to see you manage different kinds of credit responsibly: revolving
              accounts like cards, and installment accounts like loans. Where the foundation is
              thin, a secured product can be an appropriate way to add positive history. New
              applications, though, add inquiries: apply with purpose, not on impulse.
            </p>
            <h2 id="common-mistakes">Common credit mistakes</h2>
            <ul>
              <li>Closing your oldest card and shortening your credit history</li>
              <li>Maxing out limits, even when the balance gets paid</li>
              <li>Ignoring your reports until a lender says no</li>
              <li>Applying for several accounts in a short window</li>
              <li>
                Paying for promises no company can honestly make: guaranteed scores, guaranteed
                deletions
              </li>
            </ul>
          </div>
          <div className="callout mt-12">
            This material is general education, not financial or legal advice for your specific
            situation. For guidance built around you,{' '}
            <Link to="/contact/">schedule a consultation</Link>.
          </div>
        </div>
      </section>

      <section className="cta-band py-16">
        <div className="mx-auto w-[calc(100%-2.5rem)] max-w-shell flex flex-col *:m-0 flex-wrap justify-between gap-6">
          <div className="min-w-0">
            <h2 className="display text-xl max-w-[24ch] [overflow-wrap:anywhere]">
              Take the next step with what you know
            </h2>
            <p className="mt-4 max-w-[46ch] text-soft">
              Bring your questions. The consultation is where education becomes a plan.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 self-start max-w-full">
            <Link className="btn btn--gold" to="/contact/">
              Schedule a Consultation
            </Link>
            <Link className="btn btn--ghost" to="/services/">
              See the Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

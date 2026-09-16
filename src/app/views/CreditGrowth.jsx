import { Link } from 'react-router-dom';

export default function CreditGrowth() {
  return (
    <>
      <section className="hero band pb-20 pt-24 max-[860px]:pb-14 max-[860px]:pt-16">
        <div className="mx-auto w-[calc(100%-2.5rem)] max-w-shell flex flex-col *:m-0 gap-8">
          <span className="eyebrow">Services</span>
          <h1 className="display text-hero max-w-[46ch] [overflow-wrap:anywhere]">Credit Growth</h1>
          <p className="max-w-[58ch] text-md text-soft [overflow-wrap:anywhere]">
            You have a foundation. This path strengthens it: utilization, account age, and the
            decisions that get a file ready for a home, a vehicle, or better terms.
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
              People who already have active credit and want continued guidance. Your profile
              exists. The question is whether it is developing in the right direction, at the right
              pace, for what you want next.
            </p>
            <h2>What we focus on</h2>
            <ul>
              <li>Reading your full credit profile and understanding what it says to lenders</li>
              <li>Utilization strategy across your accounts</li>
              <li>Strengthening payment history and account age</li>
              <li>When new accounts help your profile, and when they hurt it</li>
              <li>Preparing your credit for specific goals: a home, a vehicle, better terms</li>
            </ul>
            <h2>What to expect</h2>
            <p>
              Ongoing guidance rather than a one-time review. As your profile develops, the plan
              develops with it, and the education continues, so every decision along the way is one
              you understand.
            </p>
          </div>
          <div className="callout mt-12">
            Results vary by individual. Delux L Avello LLC does not promise specific credit-score
            increases, guaranteed approvals, or guaranteed results.
          </div>
        </div>
      </section>

      <section className="py-24 max-[860px]:py-16">
        <div className="mx-auto w-[calc(100%-2.5rem)] max-w-narrow flex flex-col *:m-0 gap-12">
          <div className="max-w-[58ch]">
            <span className="eyebrow">The Work</span>
            <h2 className="display text-xl [overflow-wrap:anywhere]">
              What optimization actually means
            </h2>
          </div>
          <div className="prose">
            <p>
              Growth work starts from a file that already has history in it. The review looks at
              utilization on each card and across all of them, the age of the accounts, the mix of
              revolving and installment credit, and how recent applications have shaped the picture.
            </p>
            <p>
              From there the adjustments are specific: which balance to bring down first, which
              account to leave open even though it goes unused, when a limit increase helps and when
              requesting one costs more than it returns. Each change is explained, so the reasoning
              outlasts the plan.
            </p>
            <h3>Working toward a specific goal</h3>
            <p>
              A mortgage, a vehicle, or a business line each reads a file differently, and each has
              its own timeline. A goal and its date turn the plan into a schedule, built backward
              from the decision, with the steps that matter to that lender placed where they have
              time to report.
            </p>
          </div>
        </div>
      </section>

      <section className="cta-band py-16">
        <div className="mx-auto w-[calc(100%-2.5rem)] max-w-shell flex flex-col *:m-0 flex-wrap justify-between gap-6">
          <div className="min-w-0">
            <h2 className="display text-xl max-w-[24ch] [overflow-wrap:anywhere]">
              Make your credit work harder
            </h2>
            <p className="mt-4 max-w-[46ch] text-soft">
              Bring your goals to a consultation and leave with a direction.
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

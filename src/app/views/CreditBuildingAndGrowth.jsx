import { Link } from 'react-router-dom';

export default function CreditBuildingAndGrowth() {
  return (
    <>
      <section className="bg-[radial-gradient(ellipse_70%_55%_at_50%_0%,var(--hero-glow),transparent_70%)] pb-16 pt-24 max-[860px]:pb-12 max-[860px]:pt-16">
        <div className="mx-auto w-[calc(100%-2.5rem)] max-w-shell flex flex-col *:m-0 gap-8">
          <span className="eyebrow">Services</span>
          <h1 className="display text-hero max-w-[46ch] [overflow-wrap:anywhere]">
            Credit Building + Credit Growth
          </h1>
          <p className="max-w-[58ch] text-md text-soft [overflow-wrap:anywhere]">
            The complete path. Build the foundation, then keep developing it: one plan, one guide,
            from first steps through continued growth.
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
              People who need both stages: foundational development now, and continued growth after.
              Instead of finishing one program and starting another, you follow a single plan that
              matures as your credit does.
            </p>
            <h2>What we focus on</h2>
            <ul>
              <li>
                Everything in Credit Building: the fundamentals, positive history, sustainable
                habits
              </li>
              <li>Everything in Credit Growth: optimization, strategy, and goal preparation</li>
              <li>One consistent plan across both stages, adjusted as your profile develops</li>
              <li>Education throughout, so the results are ones you understand and can maintain</li>
            </ul>
            <h2>What to expect</h2>
            <p>
              The longest view of any path, and the most complete. A consultation sets the starting
              point; from there, the plan moves at the pace your situation allows, with honest
              expectations at every stage.
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
            <h2 className="display text-xl [overflow-wrap:anywhere]">How the two halves connect</h2>
          </div>
          <div className="prose">
            <p>
              Building and growth are the same work at different stages. Building puts positive
              history on a file that does not have enough of it. Growth shapes a file that does.
              Taking both as one path means the handover never happens: the guide who sets the
              foundation is the one adjusting it once it is established.
            </p>
            <p>
              In practice the early months look like the building path, focused on payment history
              and account management. As the file matures, the emphasis moves to utilization, mix,
              and preparation for whatever comes next. Nothing restarts at the boundary, because
              there is no boundary to cross.
            </p>
            <h3>Who this suits</h3>
            <p>
              People who know credit is going to matter for something specific a year or two out,
              and would rather build toward it deliberately than repair it in a hurry. It also suits
              anyone starting over who wants one relationship for the whole climb rather than a
              series of them.
            </p>
          </div>
        </div>
      </section>

      <section className="cta-band py-16">
        <div className="mx-auto w-[calc(100%-2.5rem)] max-w-shell flex flex-col *:m-0 flex-wrap justify-between gap-6">
          <div className="min-w-0">
            <h2 className="display text-xl max-w-[24ch] [overflow-wrap:anywhere]">
              One plan, the whole journey
            </h2>
            <p className="mt-4 max-w-[46ch] text-soft">
              Start with a consultation and see the full picture before you commit to anything.
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

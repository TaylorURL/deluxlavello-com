import { Link } from 'react-router-dom';

export default function HowItWorks() {
  return (
    <>
      <section className="hero band pb-20 pt-24 max-[860px]:pb-14 max-[860px]:pt-16">
        <div className="mx-auto w-[calc(100%-2.5rem)] max-w-shell flex flex-col *:m-0 gap-8">
          <span className="eyebrow">How It Works</span>
          <h1 className="display text-hero max-w-[46ch] [overflow-wrap:anywhere]">
            A clear process, start to finish
          </h1>
          <p className="max-w-[58ch] text-md text-soft [overflow-wrap:anywhere]">
            Delux Financial Solutions explains the process in plain language, from the first
            conversation onward.
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
            <span className="eyebrow">The Process</span>
            <h2 className="display text-xl [overflow-wrap:anywhere]">Four steps</h2>
          </div>
          <ol className="steps">
            <li>
              <h3>Schedule a Consultation</h3>
              <p>
                Virtual or mobile in-person, by appointment. We talk through your situation, your
                goals, and which path fits: Credit Building, Credit Growth, both, or lawsuit
                support.
              </p>
            </li>
            <li>
              <h3>Review Your Credit Picture</h3>
              <p>
                We walk through your credit reports and history together, in plain language, so you
                know exactly where you stand before anything else happens.
              </p>
            </li>
            <li>
              <h3>Follow Your Plan</h3>
              <p>
                You get a clear, personalized plan for your path, with education built into every
                step, so you understand each move and can keep the habits for life.
              </p>
            </li>
            <li>
              <h3>Keep Building</h3>
              <p>
                Credit develops over time. As yours does, the guidance continues: checkpoints,
                adjustments, and straight answers whenever you need them.
              </p>
            </li>
          </ol>
        </div>
      </section>

      <section className="py-24 max-[860px]:py-16">
        <div className="mx-auto w-[calc(100%-2.5rem)] max-w-narrow flex flex-col *:m-0 gap-12">
          <div className="max-w-[58ch]">
            <span className="eyebrow">Expectations</span>
            <h2 className="display text-xl [overflow-wrap:anywhere]">
              What we will and will not tell you
            </h2>
          </div>
          <div className="prose">
            <p>
              We will tell you what your reports say, what your options are, and what the trade-offs
              look like. We will teach you how credit works so the progress belongs to you.
            </p>
            <p>
              We will not promise a specific score increase, guarantee an approval, or claim
              accurate information can be removed from your reports. No honest company can, and
              honest is the only way we work.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 max-[860px]:py-16">
        <div className="mx-auto w-[calc(100%-2.5rem)] max-w-narrow flex flex-col *:m-0 gap-12">
          <div className="max-w-[58ch]">
            <span className="eyebrow">The Rhythm</span>
            <h2 className="display text-xl [overflow-wrap:anywhere]">
              What happens between sessions
            </h2>
          </div>
          <div className="prose">
            <p>
              Most of the work happens away from the sessions, and most of it is small: paying on
              the date the plan names, keeping a balance under the line it sets, leaving an account
              open that was ready to be closed. The sessions exist to read what the reports say back
              and adjust from there.
            </p>
            <p>
              Between them the plan is in writing, and a question can be asked when something
              unexpected arrives. A pre-approval letter or a limit change is easier to answer in the
              week it lands than at the next review.
            </p>
            <h3>How long it takes</h3>
            <p>
              Lenders report on monthly cycles, so the earliest measurable change is thirty to sixty
              days out. A thin file usually shows meaningful movement across six to twelve months. A
              file carrying recent negative marks takes longer, because time is one of the inputs
              and nothing shortens it.
            </p>
          </div>
        </div>
      </section>

      <section className="cta-band py-16">
        <div className="mx-auto w-[calc(100%-2.5rem)] max-w-shell flex flex-col *:m-0 flex-wrap justify-between gap-6">
          <div className="min-w-0">
            <h2 className="display text-xl max-w-[24ch] [overflow-wrap:anywhere]">
              Step one is a conversation
            </h2>
            <p className="mt-4 max-w-[46ch] text-soft">
              Schedule the consultation, and the rest of the process follows from there.
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

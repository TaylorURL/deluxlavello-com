import { Link } from 'react-router-dom';

export default function DebtLawsuitResponse() {
  return (
    <>
      <section className="bg-[radial-gradient(ellipse_70%_55%_at_50%_0%,var(--hero-glow),transparent_70%)] pb-16 pt-24 max-[860px]:pb-12 max-[860px]:pt-16">
        <div className="mx-auto w-[calc(100%-2.5rem)] max-w-shell flex flex-col *:m-0 gap-8">
          <span className="eyebrow">Services</span>
          <h1 className="display text-hero max-w-[46ch] [overflow-wrap:anywhere]">
            Debt Lawsuit Response Support
          </h1>
          <p className="max-w-[58ch] text-md text-soft [overflow-wrap:anywhere]">
            Being served is stressful, and the paperwork is built for lawyers. This service helps
            you understand it and organize what comes next.
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
          <div className="callout">
            Delux L Avello LLC is not a law firm and does not provide legal advice or legal
            representation. Debt Lawsuit Response Support provides educational and administrative
            support to help consumers understand, organize and navigate the response process. DELUX
            does not act as the consumer's attorney, represent consumers in court, or provide
            individualized legal advice. Consumers should consult a licensed attorney for legal
            advice concerning their individual circumstances.
          </div>
          <div className="prose mt-12">
            <h2>Who this is for</h2>
            <p>
              Consumers who have been sued regarding a consumer debt and are facing the process
              without knowing where to begin: what the documents mean, what deadlines apply, and
              what options exist.
            </p>
            <h2>What we help with</h2>
            <ul>
              <li>
                Understanding the documents you received and the process ahead, in plain language
              </li>
              <li>
                Organizing your information: dates, records, correspondence, and account history
              </li>
              <li>Understanding deadlines so nothing passes you by unnoticed</li>
              <li>Preparing the questions to ask, including the ones for a licensed attorney</li>
              <li>Understanding how the situation relates to your broader credit picture</li>
            </ul>
            <h2>What to expect</h2>
            <p>
              A structured, calm walkthrough of where things stand. You leave organized, informed,
              and prepared to take the appropriate next steps, including engaging an attorney when
              your situation calls for one.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 max-[860px]:py-16">
        <div className="mx-auto w-[calc(100%-2.5rem)] max-w-narrow flex flex-col *:m-0 gap-12">
          <div className="max-w-[58ch]">
            <span className="eyebrow">The Work</span>
            <h2 className="display text-xl [overflow-wrap:anywhere]">What to have on hand</h2>
          </div>
          <div className="prose">
            <p>
              Every document that has arrived matters: the summons, the petition or complaint, any
              letters from the collector, and anything showing what has already been paid, along
              with the date each one arrived. Deadlines in a debt case run from service, not from
              the date printed on the paper, and that distinction decides how much time is actually
              left.
            </p>
            <p>
              The session walks through what each document asks for, what the collector has to
              prove, and what the records show. Organized information is what makes every later step
              cheaper, whether the matter resolves directly or goes to an attorney.
            </p>
            <h3>Where this support ends</h3>
            <p>
              Delux L Avello LLC is not a law firm. It does not give legal advice, file documents on
              anyone's behalf, or appear in court. When a situation calls for a lawyer, that gets
              said plainly, and the work already done is what the attorney receives on day one.
            </p>
          </div>
        </div>
      </section>

      <section className="cta-band py-16">
        <div className="mx-auto w-[calc(100%-2.5rem)] max-w-shell flex flex-col *:m-0 flex-wrap justify-between gap-6">
          <div className="min-w-0">
            <h2 className="display text-xl max-w-[24ch] [overflow-wrap:anywhere]">
              Do not face the paperwork alone
            </h2>
            <p className="mt-4 max-w-[46ch] text-soft">
              The sooner you understand the process, the more options you keep.
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

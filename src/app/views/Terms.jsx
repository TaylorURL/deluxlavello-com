import { Link } from 'react-router-dom';

export default function Terms() {
  return (
    <>
      <section className="bg-[radial-gradient(ellipse_70%_55%_at_50%_0%,var(--hero-glow),transparent_70%)] pb-16 pt-24 max-[860px]:pb-12 max-[860px]:pt-16">
        <div className="mx-auto w-[calc(100%-2.5rem)] max-w-narrow flex flex-col *:m-0 gap-8">
          <span className="eyebrow">Terms</span>
          <h1 className="display text-hero max-w-[46ch] [overflow-wrap:anywhere]">Terms of use</h1>
          <p className="max-w-[58ch] text-md text-soft [overflow-wrap:anywhere]">
            These terms cover this website, and using it means you accept them. A separate written
            agreement governs the work itself.
          </p>
        </div>
      </section>

      <section className="py-24 max-[860px]:py-16">
        <div className="mx-auto w-[calc(100%-2.5rem)] max-w-narrow flex flex-col *:m-0 gap-12">
          <div className="prose">
            <h2>What this site is</h2>
            <p>
              Delux L Avello LLC | Financial Solutions publishes this site to explain credit,
              describe its services, and give people a way to reach the company. Everything on it is
              general education and information written for a general audience.
            </p>
            <p>
              Reading these pages does not make you a client. A client relationship begins with a
              written agreement, not with a visit to a website, and nothing here is written with
              knowledge of your credit, your income, or your circumstances.
            </p>
            <h2>What it is not</h2>
            <p>
              Nothing here is financial, legal, tax, or accounting advice for your specific
              situation. Decisions about your own credit are yours to make, and a consultation is
              what looks at yours.
            </p>
            <p>
              Delux L Avello LLC is not a law firm and does not provide legal representation or
              legal advice. Debt Lawsuit Response Support is educational and administrative in
              nature. If you need legal advice, speak to a licensed attorney.
            </p>
            <p>
              Delux L Avello LLC is not a lender. It does not extend credit and it makes no lending
              or credit-approval decisions. Those belong to the lenders and creditors you apply to.
            </p>
            <h2>What is not promised</h2>
            <p>
              Results vary from person to person, according to your circumstances, your credit
              profile, your creditors and furnishers, the credit reporting agencies, and the actions
              you take. Delux L Avello LLC does not guarantee a specific credit-score increase,
              approval for financing or credit, the deletion of an account, a particular change to a
              credit report, or any other financial outcome.
            </p>
            <p>
              Accurate, current and verifiable information cannot lawfully be removed from a credit
              report simply because it is negative. Credit develops over time, and any company
              saying otherwise is saying something it cannot deliver.
            </p>
            <p>
              Testimonials, examples, simulations, educational scenarios and previous results
              describe particular situations. None of them guarantees that you will see the same
              result. The figures used in the education material describe how scoring models are
              published to work; they are illustrations, not a reading of your file.
            </p>
            <h2>Services are agreed in writing</h2>
            <p>
              This site describes services; it does not sell them. Nothing on it is an offer, a
              contract, or a commitment to work together. Services begin only under a written
              agreement between you and Delux L Avello LLC, and that agreement sets out the scope,
              the terms, and the fees.
            </p>
            <p>
              That agreement, together with the disclosures and cancellation notices presented with
              it, is what governs your engagement and your cancellation rights. This website does
              not set those terms and nothing on it limits them. For anything to do with cancelling,
              read your Client Agreement and the disclosures you received with it, and ask the
              company if anything there is unclear.
            </p>
            <h2>Accuracy</h2>
            <p>
              The pages here are kept current as far as is practical, and credit rules, scoring
              models, and court procedures change. Nothing on this site is warranted to be complete
              or current at the moment you read it.
            </p>
            <h2>Using this site</h2>
            <p>
              Read it, print it, share a link to it. What is not permitted is scraping or harvesting
              it by automated means, interfering with the site or the systems behind it, trying to
              reach any part of it you have not been given access to, using it to send anything
              unlawful or misleading, or using it for any unlawful purpose.
            </p>
            <h2>Links to other sites</h2>
            <p>
              Where this site links somewhere else, the other site is run by someone else, under its
              own terms and its own privacy policy. Delux L Avello LLC does not control it and is
              not responsible for what is on it.
            </p>
            <h2>Content and marks</h2>
            <p>
              The text, layout, logo, branding and other material on this site belong to Delux L
              Avello LLC. Copying it, republishing it as your own, or exploiting it commercially
              without permission is not permitted.
            </p>
            <h2>Limits and indemnity</h2>
            <p>
              This site is provided as it is. To the fullest extent the law allows, Delux L Avello
              LLC is not liable for any indirect, incidental, consequential or special loss arising
              from the use of this website or from reliance on the general education published on
              it.
            </p>
            <p>
              To the extent the law allows, you agree to cover Delux L Avello LLC against claims and
              costs arising from your own misuse of this site or your breach of these terms.
            </p>
            <p>
              Nothing in these terms takes away a right the law gives you and does not let you sign
              away. Where any part of this section cannot lawfully apply to you, it does not apply,
              and the rest still stands.
            </p>
            <h2>Governing law</h2>
            <p>
              These terms are governed by the laws of the State of Texas, without regard to
              conflict-of-law rules, except where the law that applies to you says otherwise.
            </p>
            <h2>Changes to these terms</h2>
            <p>
              These terms change when the site does. The date below is the version you are reading.
            </p>
            <p>
              Effective <time dateTime="2026-08-26">August 26, 2026</time>. Last updated{' '}
              <time dateTime="2026-08-26">August 26, 2026</time>.
            </p>
            <h2>Contact</h2>
            <p>
              Delux L Avello LLC | Financial Solutions, Houston, Texas.{' '}
              <a href="mailto:support@deluxlavello.com">support@deluxlavello.com</a> ·{' '}
              <a href="tel:+17707586195">(770) 758-6195</a>
            </p>
          </div>
        </div>
      </section>

      <section className="cta-band py-16">
        <div className="mx-auto w-[calc(100%-2.5rem)] max-w-shell flex flex-col *:m-0 flex-wrap justify-between gap-6">
          <div className="min-w-0">
            <h2 className="display text-xl max-w-[24ch] [overflow-wrap:anywhere]">
              Ready when you are
            </h2>
            <p className="mt-4 max-w-[46ch] text-soft">
              A consultation is where your situation gets looked at properly.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 self-start max-w-full">
            <Link className="btn btn--gold" to="/contact/">
              Schedule a Consultation
            </Link>
            <Link className="btn btn--ghost" to="/privacy/">
              Read the Privacy Policy
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

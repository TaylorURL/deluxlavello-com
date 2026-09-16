import { Link } from 'react-router-dom';

export default function Disclaimer() {
  return (
    <>
      <section className="hero band pb-20 pt-24 max-[860px]:pb-14 max-[860px]:pt-16">
        <div className="mx-auto w-[calc(100%-2.5rem)] max-w-narrow flex flex-col *:m-0 gap-8">
          <span className="eyebrow">Disclaimer</span>
          <h1 className="display text-hero max-w-[46ch] [overflow-wrap:anywhere]">
            Credit and financial disclaimer
          </h1>
          <p className="max-w-[58ch] text-md text-soft [overflow-wrap:anywhere]">
            What Delux L Avello LLC does, what it does not do, and what no company in this field can
            promise.
          </p>
        </div>
      </section>

      <section className="py-24 max-[860px]:py-16">
        <div className="mx-auto w-[calc(100%-2.5rem)] max-w-narrow flex flex-col *:m-0 gap-12">
          <div className="callout">
            Delux L Avello LLC provides credit education, credit-building support, credit-growth
            guidance, and financial education. Individual results vary. DELUX does not guarantee a
            specific credit-score increase, approval for credit or financing, removal of accurate,
            current, or verifiable information, or any specific financial outcome. DELUX is not a
            law firm and does not provide legal representation or legal advice. DELUX is not a
            lender and does not make credit or lending decisions.
          </div>
          <div className="prose mt-12">
            <h2>Why results vary</h2>
            <p>
              Credit is built from your own file, and no two files are alike. What is on your
              report, which creditors and furnishers are involved, how the credit reporting agencies
              respond, how much time passes, and what actions you take all change the outcome. Two
              people following the same guidance can land in different places for reasons neither of
              them controls.
            </p>
            <h2>Accurate information stays</h2>
            <p>
              Accurate, current and verifiable information cannot lawfully be removed from a credit
              report simply because it is negative. Any company offering to delete accurate
              information is offering something it cannot lawfully deliver. What can be addressed is
              information that is inaccurate, incomplete, or that cannot be verified, and what can
              be built is a stronger record going forward.
            </p>
            <h2>Examples and testimonials</h2>
            <p>
              Any result, example, screenshot, simulation, testimonial or case study shown on this
              site describes one situation. None of them is a prediction of what will happen in
              yours, and none should be read as a promise that you will reach the same outcome.
              Educational figures shown on this site describe how scoring models are published to
              work; they are illustrations, not a reading of your file.
            </p>
            <h2>What is not offered here</h2>
            <p>
              Delux L Avello LLC is not a law firm. It does not provide legal representation or
              legal advice, and nothing on this site should be treated as either. Debt Lawsuit
              Response Support is educational and administrative. For legal advice about your own
              circumstances, consult a licensed attorney.
            </p>
            <p>
              Delux L Avello LLC is not a lender. It does not extend credit, and it makes no lending
              or credit-approval decisions. Those decisions belong to the lenders and creditors you
              apply to.
            </p>
            <p>
              Nothing on this site is financial, legal, tax, or accounting advice for your specific
              situation. That takes a consultation.
            </p>
            <h2>Services are agreed in writing</h2>
            <p>
              This site describes services; it does not sell them. Services begin under a written
              agreement between you and Delux L Avello LLC, and that agreement is what sets out the
              scope, the terms, the fees, and the disclosures that come with them.
            </p>
            <h2>Contact</h2>
            <p>
              Delux L Avello LLC | Financial Solutions, Houston, Texas.{' '}
              <a href="mailto:support@deluxlavello.com">support@deluxlavello.com</a> ·{' '}
              <a href="tel:+17707586195">(770) 758-6195</a>
            </p>
            <p>
              Effective <time dateTime="2026-08-26">August 26, 2026</time>.
            </p>
          </div>
        </div>
      </section>

      <section className="cta-band py-16">
        <div className="mx-auto w-[calc(100%-2.5rem)] max-w-shell flex flex-col *:m-0 flex-wrap justify-between gap-6">
          <div className="min-w-0">
            <h2 className="display text-xl max-w-[24ch] [overflow-wrap:anywhere]">
              Straight answers about your own file
            </h2>
            <p className="mt-4 max-w-[46ch] text-soft">
              A consultation is where your situation gets looked at properly.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 self-start max-w-full">
            <Link className="btn btn--gold" to="/contact/">
              Schedule a Consultation
            </Link>
            <Link className="btn btn--ghost" to="/terms/">
              Read the Terms of Use
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

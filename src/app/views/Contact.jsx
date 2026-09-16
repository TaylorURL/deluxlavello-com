export default function Contact() {
  return (
    <>
      <section className="hero band pb-20 pt-24 max-[860px]:pb-14 max-[860px]:pt-16">
        <div className="mx-auto w-[calc(100%-2.5rem)] max-w-shell flex flex-col *:m-0 gap-8">
          <span className="eyebrow">Contact</span>
          <h1 className="display text-hero max-w-[46ch] [overflow-wrap:anywhere]">
            Schedule your consultation
          </h1>
          <p className="max-w-[58ch] text-md text-soft [overflow-wrap:anywhere]">
            One conversation is all it takes to know where you stand and which path fits. Roughly
            thirty minutes, no charge, no obligation afterwards. Virtual and mobile in-person
            consultations are available by appointment.
          </p>
        </div>
      </section>

      <section className="py-24 max-[860px]:py-16">
        <div className="mx-auto w-[calc(100%-2.5rem)] max-w-shell flex flex-col *:m-0 gap-12">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(16rem,100%),1fr))] gap-6">
            <a className="contact-card" href="tel:+17707586195">
              <span className="contact-card__label">Call</span>
              <span className="contact-card__value">(770) 758-6195</span>
            </a>
            <a
              className="contact-card"
              href="mailto:support@deluxlavello.com?subject=Consultation%20Request"
            >
              <span className="contact-card__label">Email</span>
              <span className="contact-card__value">support@deluxlavello.com</span>
            </a>
          </div>
          <div className="callout mt-12">
            When you reach out, include your name, the best way to reach you back, and a sentence
            about your situation: building, growing, or responding to a debt lawsuit. Calls placed
            during the working day are usually returned the same day, and emails within one business
            day, with available appointment times.
          </div>
        </div>
      </section>

      <section className="py-24 max-[860px]:py-16">
        <div className="mx-auto w-[calc(100%-2.5rem)] max-w-narrow flex flex-col *:m-0 gap-12">
          <div className="max-w-[58ch]">
            <span className="eyebrow">What Happens Next</span>
            <h2 className="display text-xl [overflow-wrap:anywhere]">Your first consultation</h2>
          </div>
          <ol className="steps">
            <li>
              <h3>We Talk</h3>
              <p>Your situation and your goals, in plain language. No preparation required.</p>
            </li>
            <li>
              <h3>We Look</h3>
              <p>A first read of where your credit stands and what it means.</p>
            </li>
            <li>
              <h3>You Decide</h3>
              <p>
                You leave knowing your path and what it involves. What you do with that is up to
                you.
              </p>
            </li>
          </ol>
        </div>
      </section>

      <section className="py-24 max-[860px]:py-16">
        <div className="mx-auto w-[calc(100%-2.5rem)] max-w-narrow flex flex-col *:m-0 gap-12">
          <div className="max-w-[58ch]">
            <span className="eyebrow">Preparation</span>
            <h2 className="display text-xl [overflow-wrap:anywhere]">What to have ready</h2>
          </div>
          <div className="prose">
            <p>
              Nothing is required for a first conversation. Copies of the credit reports help if
              they are already to hand; the consultation covers how to pull all three at no cost
              otherwise. A debt lawsuit needs the summons and any letters from the collector, along
              with the date each one arrived.
            </p>
            <h3>Response times</h3>
            <p>
              A matter carrying a court deadline moves to the front when the first line says so.
            </p>
            <h3>What the first conversation covers</h3>
            <p>
              Roughly thirty minutes: where the credit file stands now, what is holding it back, and
              which of the four paths fits. It ends with a plain statement of what the work would
              involve and how long it would take. There is no charge for it and no obligation
              afterwards.
            </p>
            <h3>Where we meet</h3>
            <p>
              Consultations run virtually anywhere in Texas, and in person on a mobile basis across
              the Houston area by appointment. Both cover the same ground; the difference is only
              whether the documents are on a screen or on the table.
            </p>
          </div>
        </div>
      </section>

      <section className="cta-band py-16">
        <div className="mx-auto w-[calc(100%-2.5rem)] max-w-shell flex flex-col *:m-0 flex-wrap justify-between gap-6">
          <div className="min-w-0">
            <h2 className="display text-xl max-w-[24ch] [overflow-wrap:anywhere]">
              Reach out when you are ready
            </h2>
            <p className="mt-4 max-w-[46ch] text-soft">
              The first conversation carries no charge and no obligation.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 self-start max-w-full">
            <a className="btn btn--gold" href="tel:+17707586195">
              Call (770) 758-6195
            </a>
            <a
              className="btn btn--ghost"
              href="mailto:support@deluxlavello.com?subject=Consultation%20Request"
            >
              Email Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

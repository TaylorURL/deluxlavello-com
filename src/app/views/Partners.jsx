export default function Partners() {
  return (
    <>
      <section className="hero band pb-20 pt-24 max-[860px]:pb-14 max-[860px]:pt-16">
        <div className="mx-auto w-[calc(100%-2.5rem)] max-w-shell flex flex-col *:m-0 gap-8">
          <span className="eyebrow">Partners</span>
          <h1 className="display text-hero max-w-[46ch] [overflow-wrap:anywhere]">
            When credit is the obstacle, send them here
          </h1>
          <p className="max-w-[58ch] text-md text-soft [overflow-wrap:anywhere]">
            You meet people every week whose plans stall on credit. Refer them to a practice that
            educates them honestly and sends them back ready.
          </p>
          <div className="flex flex-wrap gap-3 self-start max-w-full">
            <a
              className="btn btn--gold"
              href="mailto:support@deluxlavello.com?subject=Partner%20Inquiry"
            >
              Start a Partner Conversation
            </a>
            <a className="btn btn--ghost" href="tel:+17707586195">
              Call (770) 758-6195
            </a>
          </div>
        </div>
      </section>

      <section className="py-24 max-[860px]:py-16">
        <div className="mx-auto w-[calc(100%-2.5rem)] max-w-shell flex flex-col *:m-0 gap-12">
          <div className="max-w-[58ch]">
            <span className="eyebrow">Who We Work With</span>
            <h2 className="display text-xl [overflow-wrap:anywhere]">
              Built for professionals whose clients need credit ready
            </h2>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(16rem,100%),1fr))] gap-6">
            <article className="card">
              <h3>Auto Sales Professionals</h3>
              <p>
                Turn a declined application into a customer who comes back qualified, instead of one
                who disappears.
              </p>
            </article>
            <article className="card">
              <h3>Realtors</h3>
              <p>
                Keep future buyers in your pipeline while they get mortgage-ready with structured
                guidance.
              </p>
            </article>
            <article className="card">
              <h3>Mortgage Professionals</h3>
              <p>
                A place to send applicants who are close but not there yet, with education that
                prepares them properly.
              </p>
            </article>
            <article className="card">
              <h3>Consumer-Service Professionals</h3>
              <p>
                Any business whose customers hit credit walls. Give them a next step you can stand
                behind.
              </p>
            </article>
          </div>
          <div className="prose mt-12">
            <p>
              Referral partnerships are simple to start: reach out, tell us about your business, and
              we will set up the way your clients reach us.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 max-[860px]:py-16">
        <div className="mx-auto w-[calc(100%-2.5rem)] max-w-narrow flex flex-col *:m-0 gap-12">
          <div className="max-w-[58ch]">
            <span className="eyebrow">Referrals</span>
            <h2 className="display text-xl [overflow-wrap:anywhere]">How a referral works</h2>
          </div>
          <div className="prose">
            <p>
              A referral is a name and a reason. From there it is a consultation, an honest read of
              where the file stands, and a plan with a timeline attached. The referring business
              hears when the customer is ready to come back, and nothing else about the file.
            </p>
            <p>
              There is no portal to learn and no volume commitment. A phone number or an email
              introduction is enough, and the follow-up runs on this side.
            </p>
            <h3>What the customer experiences</h3>
            <p>
              The same consultation every client gets, with the referral noted so the introduction
              is not repeated back to them as a sales call. Nothing is charged for the consultation,
              and nobody is enrolled in a path they did not choose.
            </p>
            <h3>Who partners with us</h3>
            <p>
              Auto dealers and finance managers, mortgage originators, realtors, insurance agents,
              and any business that watches good customers get declined for one reason. Where a
              credit decision is the last step before a sale, a referral turns a dead end into a
              customer with a date on the calendar.
            </p>
          </div>
        </div>
      </section>

      <section className="cta-band py-16">
        <div className="mx-auto w-[calc(100%-2.5rem)] max-w-shell flex flex-col *:m-0 flex-wrap justify-between gap-6">
          <div className="min-w-0">
            <h2 className="display text-xl max-w-[24ch] [overflow-wrap:anywhere]">
              Let us talk partnership
            </h2>
            <p className="mt-4 max-w-[46ch] text-soft">
              One conversation to see whether it fits both sides.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 self-start max-w-full">
            <a
              className="btn btn--gold"
              href="mailto:support@deluxlavello.com?subject=Partner%20Inquiry"
            >
              Email Us About Partnering
            </a>
            <a className="btn btn--ghost" href="tel:+17707586195">
              Call (770) 758-6195
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

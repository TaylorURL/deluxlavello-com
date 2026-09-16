import { Link } from 'react-router-dom';

export default function Privacy() {
  return (
    <>
      <section className="bg-[radial-gradient(ellipse_70%_55%_at_50%_0%,var(--hero-glow),transparent_70%)] pb-16 pt-24 max-[860px]:pb-12 max-[860px]:pt-16">
        <div className="mx-auto w-[calc(100%-2.5rem)] max-w-narrow flex flex-col *:m-0 gap-8">
          <span className="eyebrow">Privacy</span>
          <h1 className="display text-hero max-w-[46ch] [overflow-wrap:anywhere]">
            Privacy policy
          </h1>
          <p className="max-w-[58ch] text-md text-soft [overflow-wrap:anywhere]">
            What Delux L Avello LLC collects, what it is used for, who it reaches, and what you can
            ask the company to do with it.
          </p>
        </div>
      </section>

      <section className="py-24 max-[860px]:py-16">
        <div className="mx-auto w-[calc(100%-2.5rem)] max-w-narrow flex flex-col *:m-0 gap-12">
          <div className="prose">
            <h2>Information we collect</h2>
            <p>Depending on how you reach the company, that may include:</p>
            <ul>
              <li>Your name</li>
              <li>Your email address</li>
              <li>Your phone number</li>
              <li>Information you send through any form published on this website</li>
              <li>What you tell us when you request or attend a consultation</li>
              <li>
                Device, browser, network address and similar technical information the website
                records
              </li>
              <li>Anything else you choose to provide</li>
            </ul>
            <p>
              What this website itself records is narrow, and it is worth being exact about. There
              is no contact form, no newsletter signup, and no login on this site, so no page here
              asks you to type anything. Two things happen in the background. The hosting provider
              keeps standard server logs: the address requested, the time, the browser
              identification string, and the network address the request came from. And when a page
              fails, the browser sends a fault report so the fault can be found and fixed, carrying
              the error text, the address of the page, and the browser identification string. The
              site sets no cookies, runs no analytics, and carries no advertising or tracking
              pixels. Typefaces are served from this site rather than a third-party font host, so
              opening a page reaches no other company.
            </p>
            <p>
              Identification documents, credit reports and the rest of the sensitive information
              that enrollment requires are handled through the secure client and onboarding systems,
              after a written agreement is in place. They are not requested through ordinary public
              website forms, and no page on this site should ever be used to send a Social Security
              number, an account number, or a credit report.
            </p>
            <h2>How we use information</h2>
            <p>Information is used to:</p>
            <ul>
              <li>Respond to your inquiry</li>
              <li>Schedule consultations</li>
              <li>Provide the services you ask for</li>
              <li>Complete onboarding</li>
              <li>Communicate with clients and prospective clients</li>
              <li>Provide customer support</li>
              <li>Maintain business and compliance records</li>
              <li>Improve the website and the services</li>
              <li>Prevent fraud and security incidents</li>
              <li>Meet legal obligations that apply to the company</li>
            </ul>
            <h2>Service providers</h2>
            <p>
              Running the company takes outside tools, and information reaches them where it is
              reasonably necessary to operate. Those are providers of the kind you would expect:
              customer relationship management, scheduling, communications, payment processing,
              document and electronic signature, client management, and credit monitoring. They
              receive what their part of the work requires and are expected to handle it
              accordingly.
            </p>
            <p>
              Delux L Avello LLC does not sell personal information. It is not rented or traded
              either, and it is not shared with anyone outside the company and its service providers
              except where the law requires it.
            </p>
            <h2>Your privacy rights</h2>
            <p>
              You can ask what information the company holds about you, ask that it be corrected,
              and ask that it be deleted. You can ask for a copy of it, and you can ask the company
              to stop contacting you. Where the law gives you a further right over your information,
              you have that right here too, and exercising any of them costs you nothing and changes
              nothing about the service you receive.
            </p>
            <p>
              Send the request to{' '}
              <a href="mailto:support@deluxlavello.com">support@deluxlavello.com</a>. Say what you
              are asking for and give enough detail to find your records. You may be asked to
              confirm your identity first, which is there to stop someone else asking about you.
            </p>
            <h2>Security</h2>
            <p>
              The company uses reasonable administrative, technical and organizational safeguards
              designed to protect personal information. No transmission over the internet and no
              electronic storage system can be guaranteed completely secure, and any company telling
              you otherwise is overstating what is possible.
            </p>
            <h2>How long information is kept</h2>
            <p>
              Personal information is kept for as long as it is reasonably needed for the purpose it
              was collected for, and for as long as legal, accounting, contractual and compliance
              obligations require. When neither applies any longer, it is disposed of.
            </p>
            <h2>Children</h2>
            <p>
              This site and these services are meant for adults making decisions about their own
              credit. They are not directed to children under 13, and information is not knowingly
              collected from them.
            </p>
            <h2>Changes to this policy</h2>
            <p>
              This policy changes when the practices behind it change or when the law requires it.
              The date below is the version you are reading.
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
              Questions about any of this?
            </h2>
            <p className="mt-4 max-w-[46ch] text-soft">Ask, and you will get a straight answer.</p>
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

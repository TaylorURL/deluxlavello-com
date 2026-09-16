import ArrivingImage from '@components/ui/ArrivingImage.jsx';
import CoachPortrait from '@sections/CoachPortrait.jsx';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <>
      <section className="hero band pb-20 pt-24 max-[860px]:pb-14 max-[860px]:pt-16">
        <div className="mx-auto w-[calc(100%-2.5rem)] max-w-shell flex flex-col *:m-0 gap-8">
          <span className="eyebrow">About</span>
          <h1 className="display text-hero max-w-[46ch] [overflow-wrap:anywhere]">
            Credit you understand and control
          </h1>
          <p className="max-w-[58ch] text-md text-soft [overflow-wrap:anywhere]">
            Most credit companies want you dependent on them. This one teaches you how credit works,
            then hands you habits that outlast the engagement.
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
            <h2>Two names, one purpose</h2>
            <p>
              <strong>Delux L Avello LLC | Financial Solutions</strong> is the company: the
              programs, the structure, and the services: Credit Building, Credit Growth, the
              combined path, and Debt Lawsuit Response Support.
            </p>
            <p>
              <strong>Darian Avello | The Credit Coach</strong> is the educator: the voice behind
              the guidance, the content, and the teaching that runs through everything the company
              does.
            </p>
            <p>
              You will meet both. The Credit Coach teaches you how credit works; Delux Financial
              Solutions gives that teaching a structure you can follow. Neither exists without the
              other, and both answer to the same standard: honest guidance, education first, and no
              promises that cannot be kept.
            </p>
            <h2>How we work</h2>
            <ul>
              <li>
                Plain language, always. If you cannot explain it back, we have not finished
                explaining
              </li>
              <li>Honest expectations. Credit develops over time, and we say so</li>
              <li>Your situation, your plan. No one-size-fits-all programs</li>
              <li>
                Serving Houston, Texas, with virtual and mobile in-person consultations by
                appointment
              </li>
            </ul>
          </div>
          <figure className="logo-plate mt-12">
            <picture>
              <source
                type="image/webp"
                srcSet="/brand/logo-640.webp 640w, /brand/logo-1024.webp 1024w"
                sizes="(min-width: 52rem) 52rem, 100vw"
              />
              <ArrivingImage
                src="/brand/logo.png"
                srcSet="/brand/logo-640.webp 640w, /brand/logo-1024.webp 1024w, /brand/logo.png 1200w"
                sizes="(min-width: 52rem) 52rem, 100vw"
                alt="The Delux DA monogram set over a laurel wreath, with the word Delux across it"
                width="1200"
                height="800"
                loading="lazy"
                decoding="async"
              />
            </picture>
          </figure>
        </div>
      </section>

      <section className="py-24 max-[860px]:py-16">
        <div className="mx-auto w-[calc(100%-2.5rem)] max-w-shell flex flex-col *:m-0 gap-12">
          <div className="max-w-[58ch]">
            <span className="eyebrow">The Coach</span>
            <h2 className="display text-xl [overflow-wrap:anywhere]">Meet Darian Avello</h2>
            <p className="mt-4 text-soft">
              Every consultation, plan and checkpoint runs through the same person, and continuing
              education keeps the guidance current with how lenders read a file.
            </p>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(16rem,100%),1fr))] gap-8">
            <CoachPortrait />
            <figure className="plate">
              <div className="plate__frame">
                <ArrivingImage
                  src="/photos/coach-event-544.webp"
                  srcSet="/photos/coach-event-544.webp 544w, /photos/coach-event-1088.webp 1088w"
                  sizes="(min-width: 54rem) 34rem, 92vw"
                  alt="Darian Avello in front of a CreditRepair Cloud and CreditHeroScore event backdrop"
                  width="1269"
                  height="1692"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <figcaption className="plate__caption">
                <b>Industry Training</b>
                <i>At a CreditRepair Cloud event</i>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="py-24 max-[860px]:py-16">
        <div className="mx-auto w-[calc(100%-2.5rem)] max-w-narrow flex flex-col *:m-0 gap-12">
          <div className="max-w-[58ch]">
            <span className="eyebrow">The Practice</span>
            <h2 className="display text-xl [overflow-wrap:anywhere]">How an engagement runs</h2>
          </div>
          <div className="prose">
            <p>
              Every engagement starts with a consultation rather than a program. The reports come
              first, the plan comes second, and the plan names what the client will do rather than
              what will be done to them. That order is the whole method: a person who understands
              why a step works keeps the result after the engagement ends.
            </p>
            <p>
              Some work gets turned down. Accurate information stays on a report, scores are not
              promised by the point, and a situation that calls for a lawyer gets told so.
            </p>
            <h3>Where we serve</h3>
            <p>
              Houston and the surrounding area, by appointment. Consultations run virtually for
              anyone who prefers it, and in person on a mobile basis for clients who would rather
              sit down with the documents on the table.
            </p>
          </div>
        </div>
      </section>

      <section className="cta-band py-16">
        <div className="mx-auto w-[calc(100%-2.5rem)] max-w-shell flex flex-col *:m-0 flex-wrap justify-between gap-6">
          <div className="min-w-0">
            <h2 className="display text-xl max-w-[24ch] [overflow-wrap:anywhere]">
              Meet us in one conversation
            </h2>
            <p className="mt-4 max-w-[46ch] text-soft">
              The consultation is where you see how we work, firsthand.
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

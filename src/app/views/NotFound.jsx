import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <>
      <section className="hero band pb-20 pt-24 max-[860px]:pb-14 max-[860px]:pt-16">
        <div className="mx-auto w-[calc(100%-2.5rem)] max-w-shell flex flex-col *:m-0 gap-8">
          <span className="eyebrow">404</span>
          <h1 className="display text-hero max-w-[46ch] [overflow-wrap:anywhere]">
            This page does not exist
          </h1>
          <p className="max-w-[58ch] text-md text-soft [overflow-wrap:anywhere]">
            The address may have changed or been typed differently. Everything still here is one
            click away.
          </p>
          <div className="flex flex-wrap gap-3 self-start max-w-full">
            <Link className="btn btn--gold" to="/">
              Back to Home
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

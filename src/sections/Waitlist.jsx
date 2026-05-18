import { ArrowRight, Mail } from "lucide-react";
import { useState } from "react";

export default function Waitlist() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="waitlist" className="section-frame bg-white px-5 py-20 sm:px-8 sm:py-28 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-10 rounded-lg bg-conecly-forest p-6 text-white shadow-lift sm:p-10 lg:grid-cols-[0.92fr_1.08fr] lg:p-12">
        <div>
          <p className="text-xs font-semibold uppercase text-conecly-amber">Early access</p>
          <h2 className="mt-4 text-[2rem] font-semibold leading-[1.08] sm:text-5xl">
            Be first when CONECLY opens in your city.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/72">
            Join the founding waitlist for launch cities, product updates, and the first local circles as they form.
          </p>
          <div className="mt-8 flex flex-wrap gap-2 text-sm font-medium text-white/72">
            {["Launch cities", "Founding circles", "Early product access"].map((item) => (
              <span key={item} className="rounded-lg border border-white/12 bg-white/8 px-3 py-2">
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-white/12 bg-white/10 p-4 shadow-line sm:p-5">
          <form onSubmit={handleSubmit} className="grid gap-3">
            <label className="sr-only" htmlFor="email">Email address</label>
            <div className="flex min-w-0 items-center gap-3 rounded-lg bg-white px-4 py-3.5 text-left">
              <Mail size={20} className="shrink-0 text-conecly-emerald" />
              <input
                id="email"
                type="email"
                required
                placeholder="you@example.com"
                className="min-w-0 flex-1 bg-transparent text-conecly-ink outline-none placeholder:text-conecly-ink/42"
              />
            </div>
            <label className="sr-only" htmlFor="city">City</label>
            <input
              id="city"
              type="text"
              placeholder="Your city"
              className="rounded-lg bg-white px-4 py-3.5 text-conecly-ink outline-none placeholder:text-conecly-ink/42"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-conecly-amber px-6 py-4 font-semibold text-conecly-ink transition hover:bg-white"
            >
              Claim early access
              <ArrowRight size={17} />
            </button>
          </form>
          {submitted && (
            <p className="mt-4 rounded-lg bg-white/10 px-4 py-3 text-sm font-medium text-white">
              You are on the early access list. We will be in touch as launch cities open.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

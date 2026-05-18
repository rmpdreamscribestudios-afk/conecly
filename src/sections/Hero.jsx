import { ArrowRight, ChevronRight } from "lucide-react";
import { HeroServicesVisual } from "../components/Illustrations";

export default function Hero() {
  return (
    <section id="top" className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-16 pt-9 sm:px-8 sm:pb-24 sm:pt-14 lg:min-h-[calc(100vh-76px)] lg:grid-cols-[1fr_0.92fr] lg:items-center lg:pb-20">
      <div className="relative z-10">
        <div className="mb-6 inline-flex items-center gap-2 rounded-lg border border-conecly-ink/10 bg-white/86 px-4 py-2 text-sm font-medium text-conecly-teal shadow-line">
          <span className="h-2 w-2 rounded-full bg-conecly-clay" />
          Trusted local participation infrastructure
        </div>
        <h1 className="max-w-4xl text-[2.8rem] font-semibold leading-[0.98] text-conecly-ink sm:text-6xl lg:text-[5.35rem]">
          Find the people and openings your neighborhood is missing.
        </h1>
        <p className="mt-7 max-w-2xl text-lg leading-8 text-conecly-ink/68 sm:text-xl sm:leading-9">
          CONECLY turns nearby skills, events, requests, and introductions into a city-scale layer for belonging, contribution, and trusted local exchange.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a
            href="#waitlist"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-conecly-forest px-6 py-4 text-base font-semibold text-white shadow-soft transition hover:bg-conecly-teal sm:w-auto"
          >
            Join the launch waitlist
            <ArrowRight size={18} />
          </a>
          <a
            href="#how"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-conecly-ink/12 bg-white/88 px-6 py-4 text-base font-semibold text-conecly-ink transition hover:border-conecly-teal/30 hover:text-conecly-teal sm:w-auto"
          >
            Explore the platform
            <ChevronRight size={18} />
          </a>
        </div>
        <dl className="mt-12 grid max-w-2xl grid-cols-1 gap-3 border-y border-conecly-ink/10 py-5 sm:grid-cols-3">
          <div className="sm:border-r sm:border-conecly-ink/10 sm:pr-5">
            <dt className="text-2xl font-semibold text-conecly-ink">2 km</dt>
            <dd className="mt-1 text-sm leading-5 text-conecly-ink/56">Useful local radius</dd>
          </div>
          <div className="sm:border-r sm:border-conecly-ink/10 sm:px-5">
            <dt className="text-2xl font-semibold text-conecly-ink">7</dt>
            <dd className="mt-1 text-sm leading-5 text-conecly-ink/58">Local use cases</dd>
          </div>
          <div className="sm:pl-5">
            <dt className="text-2xl font-semibold text-conecly-ink">1</dt>
            <dd className="mt-1 text-sm leading-5 text-conecly-ink/58">Calm local feed</dd>
          </div>
        </dl>
      </div>
      <HeroServicesVisual />
    </section>
  );
}

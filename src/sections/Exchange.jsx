import { Check, Sparkles } from "lucide-react";
import { exchangeItems, nearbyOpenings } from "../data";

export default function Exchange() {
  return (
    <section id="exchange" className="section-frame section-pad bg-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_0.95fr] lg:items-center">
        <div>
          <p className="eyebrow">Local opportunity exchange</p>
          <h2 className="mt-4 text-[2rem] font-semibold leading-[1.08] text-conecly-ink sm:text-5xl">
            A shared place for what people can offer and what a community needs.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-conecly-ink/64">
            CONECLY makes everyday local exchange easier to notice, easier to trust, and easier to begin.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {exchangeItems.map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-lg border border-conecly-ink/10 bg-conecly-paper px-4 py-3.5 shadow-line">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-conecly-teal text-white">
                  <Check size={14} />
                </span>
                <span className="font-medium text-conecly-ink">{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-lg bg-conecly-forest p-4 text-white shadow-lift sm:p-7">
          <div className="rounded-lg bg-white/10 p-5 ring-1 ring-white/15 sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-white/68">Nearby today</p>
                <h3 className="mt-2 text-2xl font-semibold leading-tight">6 openings within 2 km</h3>
              </div>
              <Sparkles className="text-conecly-amber" size={26} />
            </div>
            <div className="mt-7 space-y-3">
              {nearbyOpenings.map(([title, detail, distance]) => (
                <div key={title} className="rounded-lg bg-white p-4 text-conecly-ink shadow-line">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold">{title}</p>
                      <p className="mt-1 text-sm text-conecly-ink/60">{detail}</p>
                    </div>
                    <span className="rounded-md bg-conecly-mist px-3 py-1 text-sm font-medium text-conecly-teal">{distance}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

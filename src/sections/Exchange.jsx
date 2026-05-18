import { Check } from "lucide-react";
import { OpportunityVisual } from "../components/Illustrations";
import { exchangeItems } from "../data";

export default function Exchange() {
  return (
    <section id="exchange" className="section-frame section-pad bg-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_0.95fr] lg:items-center">
        <div>
          <p className="eyebrow">Local help</p>
          <h2 className="mt-4 text-[2rem] font-semibold leading-[1.08] text-conecly-ink sm:text-5xl">
            A shared place to offer help or ask for support.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-conecly-ink/64">
            Find cleaning, moving, tutoring, caregiving, and everyday support from people close by.
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
        <OpportunityVisual />
      </div>
    </section>
  );
}

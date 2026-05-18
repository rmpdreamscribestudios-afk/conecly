import { audiences, localOpportunities } from "../data";

const accentStyles = {
  amber: "bg-conecly-amber/18 text-conecly-ink ring-conecly-amber/28",
  clay: "bg-conecly-clay/14 text-conecly-clay ring-conecly-clay/22",
  emerald: "bg-conecly-emerald/14 text-conecly-teal ring-conecly-emerald/22",
  forest: "bg-conecly-forest text-white ring-conecly-forest/12",
  lilac: "bg-conecly-lilac/14 text-conecly-lilac ring-conecly-lilac/22",
  teal: "bg-conecly-mist text-conecly-teal ring-conecly-teal/18",
};

export default function WhoFor() {
  return (
    <section id="people" className="section-pad bg-conecly-paper">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div>
            <p className="eyebrow">Who it is for</p>
            <h2 className="mt-4 text-[2rem] font-semibold leading-[1.08] text-conecly-ink sm:text-5xl">
              For people who want local life to feel easier to enter.
            </h2>
          </div>
          <p className="max-w-3xl text-lg leading-8 text-conecly-ink/64 lg:justify-self-end">
            Not another noisy feed. CONECLY is for the small, specific moments that make a place feel alive: an invitation, a useful skill, a neighbor with time, a group that needs one more person.
          </p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {audiences.map((audience) => {
            const Icon = audience.icon;
            return (
              <article key={audience.title} className="premium-card h-full p-6 sm:p-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-conecly-mist text-conecly-teal">
                  <Icon size={24} />
                </div>
                <h3 className="mt-7 text-xl font-semibold leading-snug text-conecly-ink">{audience.title}</h3>
                <p className="mt-3 leading-7 text-conecly-ink/62">{audience.text}</p>
              </article>
            );
          })}
        </div>
        <div className="mt-16 grid gap-4 lg:grid-cols-3">
          {localOpportunities.map((item, index) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="premium-card group relative min-h-[21rem] overflow-hidden p-5 sm:p-6"
              >
                <div className="absolute inset-x-0 top-0 h-24 bg-[linear-gradient(135deg,rgba(238,244,239,0.95),rgba(250,247,240,0.12))]" />
                <div className="relative flex items-start justify-between gap-4">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-lg ring-1 ${accentStyles[item.accent]}`}>
                    <Icon size={25} />
                  </div>
                  <span className="text-sm font-semibold text-conecly-ink/28">0{index + 1}</span>
                </div>
                <div className="relative mt-7 h-28 overflow-hidden rounded-lg border border-conecly-ink/8 bg-conecly-paper">
                  <svg className="h-full w-full" viewBox="0 0 360 136" fill="none" aria-hidden="true">
                    <path d="M35 102C78 52 118 92 160 54C206 12 263 38 325 18" stroke="#0B4E4A" strokeOpacity="0.22" strokeWidth="4" strokeLinecap="round" />
                    <path d="M28 116H332" stroke="#142321" strokeOpacity="0.08" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="88" cy="62" r="24" fill="#EEF4EF" />
                    <circle cx="214" cy="51" r="30" fill="#FAF7F0" stroke="#142321" strokeOpacity="0.08" />
                    <rect x="246" y="65" width="58" height="34" rx="8" fill="#083B37" fillOpacity="0.92" />
                    <rect x="58" y="78" width="68" height="30" rx="8" fill="#D99D44" fillOpacity="0.86" />
                    <path d="M91 78V48M91 48L77 62M91 48L105 62" stroke="#0B4E4A" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="274" cy="81" r="8" fill="#FAF7F0" />
                    <path d="M266 94C271 89 279 89 284 94" stroke="#FAF7F0" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </div>
                <h3 className="mt-6 text-xl font-semibold leading-snug text-conecly-ink">{item.title}</h3>
                <p className="mt-3 leading-7 text-conecly-ink/62">{item.text}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="rounded-md border border-conecly-ink/8 bg-conecly-paper px-3 py-1.5 text-sm font-medium text-conecly-ink/62">
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import SectionHeader from "../components/SectionHeader";
import { communityFlow, supportSignals } from "../data";

export default function CommunityFlow() {
  return (
    <section className="section-pad bg-conecly-paper">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          eyebrow="Community flow"
          title="Designed for participation that keeps moving."
          text="The platform helps local energy move from a quiet signal to a real connection, then back into the community."
        />
        <div className="mt-14 grid gap-6 rounded-lg border border-conecly-ink/10 bg-white p-4 shadow-line lg:grid-cols-[0.98fr_1.02fr] lg:p-7">
          <div className="relative min-h-[20rem] overflow-hidden rounded-lg bg-conecly-mist p-5">
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 560 380" fill="none" aria-hidden="true">
              <rect x="82" y="52" width="148" height="94" rx="18" fill="#FCFBF7" stroke="#142321" strokeOpacity="0.08" />
              <rect x="318" y="76" width="158" height="108" rx="18" fill="#FCFBF7" stroke="#142321" strokeOpacity="0.08" />
              <rect x="182" y="226" width="190" height="104" rx="18" fill="#FCFBF7" stroke="#142321" strokeOpacity="0.08" />
              <path d="M226 118C278 115 304 120 340 132" stroke="#0B4E4A" strokeOpacity="0.32" strokeWidth="5" strokeLinecap="round" />
              <path d="M364 182C350 214 333 230 310 250" stroke="#D99D44" strokeOpacity="0.72" strokeWidth="5" strokeLinecap="round" />
              <path d="M222 260C184 226 164 192 154 146" stroke="#C16E4F" strokeOpacity="0.45" strokeWidth="5" strokeLinecap="round" />
              <circle cx="156" cy="99" r="20" fill="#0B4E4A" />
              <circle cx="398" cy="128" r="22" fill="#D99D44" />
              <circle cx="276" cy="278" r="24" fill="#C16E4F" />
              <path d="M144 126H196M342 158H438M222 306H332" stroke="#142321" strokeOpacity="0.18" strokeWidth="7" strokeLinecap="round" />
              <path d="M144 72H190M342 104H420M222 252H318" stroke="#142321" strokeOpacity="0.12" strokeWidth="7" strokeLinecap="round" />
            </svg>
            <div className="relative max-w-xs rounded-lg border border-conecly-ink/8 bg-white/86 p-4 shadow-soft">
              <p className="eyebrow">Trust layer</p>
              <p className="mt-2 text-2xl font-semibold leading-tight text-conecly-ink">Clear asks become useful local action.</p>
            </div>
          </div>
          <div className="grid content-center gap-3">
            {supportSignals.map((signal) => {
              const Icon = signal.icon;
              return (
                <div key={signal.title} className="rounded-lg border border-conecly-ink/10 bg-conecly-paper p-4">
                  <div className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white text-conecly-teal shadow-line">
                      <Icon size={21} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-conecly-ink">{signal.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-conecly-ink/60">{signal.text}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {communityFlow.map(([title, text], index) => (
            <div key={title} className="premium-card relative h-full p-6">
              <div className="mb-10 flex h-12 w-12 items-center justify-center rounded-lg bg-conecly-amber/18 text-lg font-semibold text-conecly-teal">
                {index + 1}
              </div>
              <h3 className="text-xl font-semibold leading-snug text-conecly-ink">{title}</h3>
              <p className="mt-3 leading-7 text-conecly-ink/62">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

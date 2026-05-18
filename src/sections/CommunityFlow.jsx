import SectionHeader from "../components/SectionHeader";
import { CommunitySupportVisual } from "../components/Illustrations";
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
          <div>
            <CommunitySupportVisual />
            <div className="mt-5 rounded-lg border border-conecly-ink/8 bg-conecly-paper p-5">
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

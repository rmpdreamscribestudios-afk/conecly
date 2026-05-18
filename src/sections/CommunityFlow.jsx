import SectionHeader from "../components/SectionHeader";
import { communityFlow } from "../data";

export default function CommunityFlow() {
  return (
    <section className="section-pad bg-conecly-paper">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          eyebrow="Community flow"
          title="Designed for participation that keeps moving."
          text="The platform helps local energy move from a quiet signal to a real connection, then back into the community."
        />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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

import { audiences } from "../data";

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
      </div>
    </section>
  );
}

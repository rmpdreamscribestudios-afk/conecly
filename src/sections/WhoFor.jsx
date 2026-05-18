import { audiences, localOpportunities } from "../data";
import { EditorialScene, sceneCopy } from "../components/Illustrations";

export default function WhoFor() {
  const storyItems = [
    { key: "cleaning", meta: localOpportunities[1], className: "lg:col-span-2" },
    { key: "moving", meta: localOpportunities[2], className: "" },
    { key: "tutoring", meta: localOpportunities[3], className: "" },
    { key: "caregiving", meta: localOpportunities[5], title: "Caregiving and nanny support", className: "" },
    { key: "neighbour", meta: localOpportunities[5], title: "Neighbour and community support", className: "lg:col-span-2" },
  ];

  return (
    <section id="people" className="section-pad bg-conecly-paper">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div>
            <p className="eyebrow">Who it is for</p>
            <h2 className="mt-4 text-[2rem] font-semibold leading-[1.08] text-conecly-ink sm:text-5xl">
              For people who want to feel more connected nearby.
            </h2>
          </div>
          <p className="max-w-3xl text-lg leading-8 text-conecly-ink/64 lg:justify-self-end">
            CONECLY is for everyday moments that make a place feel welcoming: a neighbour with time, a helpful skill, a small job, or someone who needs one more hand.
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
        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          {storyItems.map((item, index) => {
            const title = item.title ?? item.meta.title;
            return (
              <article
                key={item.key}
                className={`premium-card group relative h-full overflow-hidden p-4 sm:p-5 ${item.className}`}
              >
                <EditorialScene type={item.key} className="h-[22rem] shadow-none sm:h-[26rem]" />
                <div className="mt-5 flex items-start justify-between gap-4">
                  <h3 className="text-xl font-semibold leading-snug text-conecly-ink">{title}</h3>
                  <span className="text-sm font-semibold text-conecly-ink/28">0{index + 1}</span>
                </div>
                <p className="mt-3 leading-7 text-conecly-ink/62">{sceneCopy[item.key].text}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {item.meta.tags.map((tag) => (
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

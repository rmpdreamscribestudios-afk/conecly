import {
  ArrowRight,
  BookOpenCheck,
  HeartHandshake,
  Home,
  MapPin,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { EditorialScene } from "../components/Illustrations";

const serviceTypes = [
  ["Cleaning", Home],
  ["Moving", PackageCheck],
  ["Tutoring", BookOpenCheck],
  ["Caregiving", HeartHandshake],
];

const values = [
  {
    title: "Dignity first",
    text: "Asking for help and offering help should both feel respectful. CONECLY is built around clear profiles, simple needs, and the belief that practical work matters.",
    icon: Sparkles,
  },
  {
    title: "Trust grows locally",
    text: "People often feel safer starting close to home. Neighbourhood connections can turn a one-time job, lesson, errand, or care request into a steadier local relationship.",
    icon: ShieldCheck,
  },
  {
    title: "Access should be simple",
    text: "Local opportunity should not require polished networks or complicated platforms. CONECLY keeps the path direct for people who need work, support, or a useful first connection.",
    icon: MapPin,
  },
];

export default function About() {
  return (
    <section className="bg-conecly-paper">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[0.96fr_1.04fr] lg:items-center lg:py-24">
        <div>
          <p className="eyebrow">About CONECLY</p>
          <h1 className="mt-4 max-w-4xl text-[2.6rem] font-semibold leading-[1.02] text-conecly-ink sm:text-6xl lg:text-[4.75rem]">
            Local help should feel close, clear, and human.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-conecly-ink/68 sm:text-xl sm:leading-9">
            CONECLY helps people find and offer everyday help nearby, from cleaning and moving support to tutoring, caregiving, and the small acts of community support that make life easier.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="/profiles"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-conecly-forest px-6 py-4 text-base font-semibold text-white shadow-soft transition hover:bg-conecly-teal"
            >
              Browse profiles
              <ArrowRight size={18} />
            </a>
            <a
              href="/#create-profile"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-conecly-ink/12 bg-white/88 px-6 py-4 text-base font-semibold text-conecly-ink transition hover:border-conecly-teal/30 hover:text-conecly-teal"
            >
              Create profile
            </a>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:pt-16">
            <EditorialScene type="cleaning" className="aspect-[4/5] min-h-[340px]" />
          </div>
          <div className="grid gap-4">
            <EditorialScene type="moving" className="aspect-[4/3] min-h-[220px]" />
            <div className="rounded-lg border border-conecly-ink/10 bg-white p-5 shadow-line">
              <p className="text-sm font-semibold text-conecly-ink">Built for everyday support</p>
              <p className="mt-2 text-sm leading-6 text-conecly-ink/62">
                Paid help, neighbourly care, short gigs, shared skills, and honest requests can all belong in one local place.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="section-frame bg-white px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <p className="eyebrow">Why it exists</p>
              <h2 className="mt-4 text-[2rem] font-semibold leading-[1.08] text-conecly-ink sm:text-5xl">
                Opportunity often starts with one nearby person.
              </h2>
            </div>
            <div className="grid gap-5 text-base leading-8 text-conecly-ink/66 sm:text-lg">
              <p>
                CONECLY was created from lived experience with economic instability, job-seeking, and the reality that many people are capable and willing to work, but do not always have an easy way to be found.
              </p>
              <p>
                Sometimes the next step is not a big program or a distant job board. It is a neighbour who needs help cleaning an apartment, a family looking for tutoring, someone moving across town, or a caregiver who can make a hard week more manageable.
              </p>
              <p>
                The goal is simple: make local opportunity easier to see, easier to offer, and easier to approach with dignity.
              </p>
            </div>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {serviceTypes.map(([label, Icon]) => (
              <div key={label} className="rounded-lg border border-conecly-ink/10 bg-conecly-paper p-5 shadow-line">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-conecly-forest text-white shadow-line">
                  <Icon size={22} />
                </div>
                <p className="mt-5 text-lg font-semibold text-conecly-ink">{label}</p>
                <p className="mt-2 text-sm leading-6 text-conecly-ink/60">
                  Practical, local support people can understand quickly and arrange directly.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.82fr] lg:items-center">
          <div className="rounded-lg border border-conecly-ink/10 bg-white p-6 shadow-line sm:p-8 lg:p-10">
            <p className="eyebrow">The human story</p>
            <h2 className="mt-4 text-[2rem] font-semibold leading-[1.08] text-conecly-ink sm:text-5xl">
              Built from a familiar kind of pressure.
            </h2>
            <div className="mt-6 grid gap-5 text-base leading-8 text-conecly-ink/66 sm:text-lg">
              <p>
                CONECLY began with a practical question: what helps when people want to work, contribute, or ask for support, but the usual paths feel slow, crowded, or out of reach?
              </p>
              <p>
                The answer was not to make a louder marketplace. It was to make a calmer local space where real people can say what they can do, what they need, and where they are available.
              </p>
              <p>
                That story is personal, but it is also common. Many people are balancing bills, transitions, family care, job searches, school, recovery, or a move to a new place. CONECLY is meant to meet those moments with usefulness and respect.
              </p>
            </div>
          </div>

          <div className="grid gap-4">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <article key={value.title} className="premium-card bg-white p-5 sm:p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-conecly-mist text-conecly-teal">
                      <Icon size={22} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-conecly-ink">{value.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-conecly-ink/62">{value.text}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      <div className="section-frame bg-conecly-forest px-5 py-14 text-white sm:px-8 sm:py-18">
        <div className="mx-auto flex max-w-7xl flex-col gap-7 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase text-conecly-amber">Community first</p>
            <h2 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight sm:text-4xl">
              A simpler way to start with people nearby.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/72">
              CONECLY is for people offering help, people looking for help, and communities that work better when local connection is easier to begin.
            </p>
          </div>
          <a
            href="/#waitlist"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-white px-6 py-4 text-base font-semibold text-conecly-ink shadow-soft transition hover:text-conecly-teal"
          >
            Join waitlist
            <UsersRound size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}

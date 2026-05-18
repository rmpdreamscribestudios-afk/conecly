import { Database, Eye, RefreshCw, ShieldCheck, UserRoundCheck } from "lucide-react";

const collectedInfo = [
  "Profile details, such as your name, neighbourhood or city, services, availability, rates, and short bio.",
  "Contact information you choose to share, such as an email address, phone number, or preferred contact method.",
  "Submissions you send through CONECLY, including profile forms, waitlist details, requests, offers, and messages sent to the team.",
];

const uses = [
  "Show profiles, requests, offers, and local information on the website.",
  "Help people nearby understand who is offering help, who needs help, and how to connect.",
  "Improve the platform, fix issues, review submissions, and make CONECLY more useful for local communities.",
];

const reminders = [
  {
    title: "Public profile information",
    text: "Some information from your profile may appear publicly on the CONECLY website. This may include your name, area, service category, bio, availability, rate, and contact method if you choose to share it.",
    icon: Eye,
  },
  {
    title: "Sensitive details",
    text: "Please avoid posting sensitive personal information publicly. Do not share passwords, financial details, government ID numbers, private documents, home access instructions, or anything you would not want visible to other people.",
    icon: ShieldCheck,
  },
  {
    title: "Profile updates",
    text: "You can ask CONECLY to update or remove your profile. As the platform is still early, requests may be handled manually, but they will be treated with care.",
    icon: UserRoundCheck,
  },
];

export default function PrivacyPolicy() {
  return (
    <section className="bg-conecly-paper">
      <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-20 lg:py-24">
        <p className="eyebrow">Privacy Policy</p>
        <h1 className="mt-4 max-w-4xl text-[2.6rem] font-semibold leading-[1.02] text-conecly-ink sm:text-6xl lg:text-[4.5rem]">
          Simple privacy for a local community platform.
        </h1>
        <p className="mt-7 max-w-3xl text-lg leading-8 text-conecly-ink/68 sm:text-xl sm:leading-9">
          CONECLY is built to help people find and offer everyday help nearby. This policy explains what information is collected, how it is used, and what choices you have.
        </p>
        <p className="mt-5 text-sm leading-6 text-conecly-ink/54">Last updated: May 18, 2026</p>
      </div>

      <div className="section-frame bg-white px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="eyebrow">What CONECLY collects</p>
            <h2 className="mt-4 text-[2rem] font-semibold leading-[1.08] text-conecly-ink sm:text-5xl">
              Information you choose to provide.
            </h2>
            <p className="mt-5 text-base leading-7 text-conecly-ink/66 sm:text-lg">
              Most information on CONECLY comes from profile forms, waitlist forms, and other submissions you send directly.
            </p>
          </div>

          <div className="grid gap-3">
            {collectedInfo.map((item) => (
              <div key={item} className="rounded-lg border border-conecly-ink/10 bg-conecly-paper p-5 text-base leading-7 text-conecly-ink/68 shadow-line">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
          <div className="rounded-lg border border-conecly-ink/10 bg-white p-6 shadow-line sm:p-8">
            <h2 className="text-3xl font-semibold leading-tight text-conecly-ink sm:text-4xl">
              How information is used
            </h2>
            <p className="mt-4 text-base leading-7 text-conecly-ink/66">
              CONECLY uses information in practical ways that support local connection.
            </p>
            <ul className="mt-6 grid gap-3 text-sm leading-6 text-conecly-ink/68">
              {uses.map((item) => (
                <li key={item} className="rounded-lg border border-conecly-ink/10 bg-conecly-paper px-4 py-3">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-conecly-ink/10 bg-conecly-forest p-6 text-white shadow-lift sm:p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/12 text-white">
              <Database size={23} />
            </div>
            <h2 className="mt-5 text-3xl font-semibold leading-tight sm:text-4xl">
              Infrastructure providers
            </h2>
            <p className="mt-4 text-base leading-7 text-white/74">
              CONECLY uses Supabase and Vercel to help run the website, store submissions, and keep the platform available. These providers may process information as part of hosting, database, and platform operations.
            </p>
            <p className="mt-5 text-base leading-7 text-white/74">
              CONECLY does not sell personal information.
            </p>
          </div>
        </div>
      </div>

      <div className="section-frame bg-conecly-mist px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="eyebrow">Your choices</p>
            <h2 className="mt-4 text-[2rem] font-semibold leading-[1.08] text-conecly-ink sm:text-5xl">
              Share only what feels right.
            </h2>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {reminders.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="premium-card bg-white p-5 sm:p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-conecly-mist text-conecly-teal">
                    <Icon size={22} />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-conecly-ink">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-conecly-ink/62">{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      <div className="px-5 py-14 sm:px-8 sm:py-18">
        <div className="mx-auto flex max-w-7xl flex-col gap-7 rounded-lg border border-conecly-ink/10 bg-white p-6 shadow-line sm:p-8 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-conecly-amber/18 text-conecly-clay">
              <RefreshCw size={22} />
            </div>
            <h2 className="mt-5 max-w-3xl text-3xl font-semibold leading-tight text-conecly-ink sm:text-4xl">
              This policy may change over time.
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-conecly-ink/66">
              As CONECLY grows, this Privacy Policy may be updated to reflect new features, tools, or community needs. The latest version will live on this page.
            </p>
          </div>
          <a
            href="/#waitlist"
            className="inline-flex shrink-0 items-center justify-center rounded-lg bg-conecly-forest px-6 py-4 text-base font-semibold text-white shadow-soft transition hover:bg-conecly-teal"
          >
            Request an update
          </a>
        </div>
      </div>
    </section>
  );
}

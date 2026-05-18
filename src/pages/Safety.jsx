import {
  AlertTriangle,
  Eye,
  Handshake,
  LockKeyhole,
  MessageCircle,
  ShieldCheck,
  Siren,
  UserCheck,
} from "lucide-react";

const expectations = [
  {
    title: "Be respectful",
    text: "Treat people with patience and basic dignity. CONECLY is for local connection, not pressure, insults, or harassment.",
    icon: Handshake,
  },
  {
    title: "Be honest about services",
    text: "Say clearly what you offer, what you need, what it costs, and what you can actually do.",
    icon: UserCheck,
  },
  {
    title: "Communicate clearly",
    text: "Share timing, location, payment, scope, and expectations before anyone commits to a job or meeting.",
    icon: MessageCircle,
  },
  {
    title: "Meet safely",
    text: "Use public places when it makes sense, tell someone where you are going, and leave if something feels wrong.",
    icon: ShieldCheck,
  },
  {
    title: "Protect personal information",
    text: "Do not share sensitive details too early. Keep passwords, financial information, IDs, and private documents secure.",
    icon: LockKeyhole,
  },
  {
    title: "Report harmful behaviour",
    text: "Tell CONECLY about suspicious, unsafe, exploitative, or harmful activity so it can be reviewed.",
    icon: Siren,
  },
];

const notAllowed = [
  "Harassment, threats, bullying, or intimidation",
  "Discrimination based on identity, background, ability, religion, or other protected traits",
  "Scams, fake offers, misleading listings, or dishonest payment requests",
  "Unsafe, illegal, or high-risk services",
  "Exploitation, coercion, or pressure to work in unsafe conditions",
];

const judgmentTips = [
  "Check details before agreeing to meet or hire someone.",
  "Start with a clear written conversation about the service, price, timing, and location.",
  "Trust your instincts if a request feels rushed, secretive, confusing, or too good to be true.",
  "Use safer payment habits and avoid unusual payment methods or upfront pressure.",
];

export default function Safety() {
  return (
    <section className="bg-conecly-paper">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:py-24">
        <div>
          <p className="eyebrow">Trust & Safety</p>
          <h1 className="mt-4 max-w-4xl text-[2.6rem] font-semibold leading-[1.02] text-conecly-ink sm:text-6xl lg:text-[4.75rem]">
            A safer way to start local connections.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-conecly-ink/68 sm:text-xl sm:leading-9">
            CONECLY is building a calmer, safer space for people to find local help, offer services, and connect with people nearby. Safety is shared work, so every profile, message, and meeting should begin with care.
          </p>
        </div>

        <div className="rounded-lg border border-conecly-ink/10 bg-white p-6 shadow-line sm:p-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-conecly-forest text-white shadow-line">
            <ShieldCheck size={28} />
          </div>
          <h2 className="mt-6 text-2xl font-semibold leading-tight text-conecly-ink sm:text-3xl">
            Use CONECLY with good judgment.
          </h2>
          <p className="mt-4 text-base leading-7 text-conecly-ink/66">
            CONECLY can help make local connection clearer, but it cannot remove every risk. When meeting, hiring, or working with someone, take your time, ask questions, and choose the safer option when something feels uncertain.
          </p>
          <div className="mt-6 rounded-lg border border-conecly-amber/30 bg-conecly-amber/10 p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle size={20} className="mt-0.5 shrink-0 text-conecly-clay" />
              <p className="text-sm leading-6 text-conecly-ink/70">
                If there is immediate danger, contact local emergency services first. Reports to CONECLY are for platform review and community protection.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="section-frame bg-white px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="eyebrow">Community expectations</p>
            <h2 className="mt-4 text-[2rem] font-semibold leading-[1.08] text-conecly-ink sm:text-5xl">
              Simple standards for a safer local space.
            </h2>
            <p className="mt-5 text-base leading-7 text-conecly-ink/66 sm:text-lg">
              These expectations help people understand each other before they meet, hire, help, or agree to a service.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {expectations.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="premium-card p-5 sm:p-6">
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

      <div className="px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="rounded-lg border border-conecly-ink/10 bg-white p-6 shadow-line sm:p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-conecly-clay/12 text-conecly-clay">
              <Eye size={23} />
            </div>
            <h2 className="mt-5 text-3xl font-semibold leading-tight text-conecly-ink sm:text-4xl">
              What does not belong here
            </h2>
            <p className="mt-4 text-base leading-7 text-conecly-ink/66">
              CONECLY is not a place for behaviour that harms, deceives, or takes advantage of people.
            </p>
            <ul className="mt-6 grid gap-3 text-sm leading-6 text-conecly-ink/68">
              {notAllowed.map((item) => (
                <li key={item} className="rounded-lg border border-conecly-ink/10 bg-conecly-paper px-4 py-3">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-conecly-ink/10 bg-conecly-forest p-6 text-white shadow-lift sm:p-8">
            <p className="text-xs font-semibold uppercase text-conecly-amber">Before you meet or hire</p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">
              A few careful steps can make a big difference.
            </h2>
            <div className="mt-7 grid gap-3">
              {judgmentTips.map((tip) => (
                <div key={tip} className="rounded-lg border border-white/12 bg-white/8 p-4 text-sm leading-6 text-white/76">
                  {tip}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="section-frame bg-conecly-mist px-5 py-14 sm:px-8 sm:py-18">
        <div className="mx-auto flex max-w-7xl flex-col gap-7 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="eyebrow">Report concerns</p>
            <h2 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight text-conecly-ink sm:text-4xl">
              Speak up when something feels suspicious or harmful.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-conecly-ink/66">
              Reports help CONECLY understand risk, review behaviour, and protect the community as the platform grows.
            </p>
          </div>
          <a
            href="/#waitlist"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-conecly-forest px-6 py-4 text-base font-semibold text-white shadow-soft transition hover:bg-conecly-teal"
          >
            Contact CONECLY
            <Siren size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}

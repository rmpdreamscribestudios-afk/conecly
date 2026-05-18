import {
  BookOpenCheck,
  BriefcaseBusiness,
  HeartHandshake,
  Paintbrush,
  PackageCheck,
  Sparkles,
} from "lucide-react";
import Logo from "./Logo";

function IllustrationFrame({ children, className = "" }) {
  return (
    <div className={`relative overflow-hidden rounded-lg border border-conecly-ink/10 bg-white shadow-lift ${className}`}>
      {children}
    </div>
  );
}

export function HeroServicesVisual() {
  return (
    <IllustrationFrame className="min-h-[390px] p-3 sm:min-h-[540px] sm:p-5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(217,157,68,0.18),transparent_28%),linear-gradient(135deg,#fcfbf7_0%,#eef4ef_54%,#f7efe4_100%)]" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 680 720" fill="none" aria-hidden="true">
        <path d="M84 570C180 416 290 468 376 292C435 170 510 139 606 166" stroke="#5F8D73" strokeOpacity="0.28" strokeWidth="2" />
        <path d="M46 214C160 270 246 205 340 310C450 434 525 348 630 418" stroke="#D99D44" strokeOpacity="0.28" strokeWidth="2" />
        <path d="M128 684L244 76M368 690L482 82M548 676L636 250" stroke="#083B37" strokeOpacity="0.06" />
      </svg>

      <div className="relative flex min-h-[360px] flex-col justify-between sm:min-h-[500px]">
        <div className="flex items-start justify-between gap-4">
          <div className="rounded-lg border border-conecly-ink/10 bg-white/92 p-4 shadow-line backdrop-blur">
            <p className="eyebrow">Live nearby</p>
            <p className="mt-2 text-2xl font-semibold text-conecly-ink">Local services</p>
            <p className="mt-1 max-w-[15rem] text-sm leading-5 text-conecly-ink/58">Useful people, openings, and support within reach.</p>
          </div>
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-conecly-forest p-2 shadow-soft">
            <Logo compact linked={false} />
          </div>
        </div>

        <div className="relative mx-auto mt-4 h-[250px] w-full max-w-[520px] sm:h-[330px]">
          <div className="absolute left-1/2 top-1/2 z-20 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-lg border border-white/30 bg-conecly-forest p-4 shadow-lift sm:h-28 sm:w-28">
            <Logo compact linked={false} />
          </div>
          {[
            ["Cleaning", "left-[4%] top-[8%]", Paintbrush, "bg-white text-conecly-ink"],
            ["Tutoring", "right-[2%] top-[18%]", BookOpenCheck, "bg-conecly-amber text-conecly-ink"],
            ["Moving", "left-[8%] bottom-[14%]", PackageCheck, "bg-conecly-clay text-white"],
            ["Support", "right-[6%] bottom-[8%]", HeartHandshake, "bg-white text-conecly-ink"],
          ].map(([label, position, Icon, colors]) => (
            <div key={label} className={`absolute ${position} z-10 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold shadow-soft ${colors}`}>
              <Icon size={16} />
              {label}
            </div>
          ))}
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 520 330" fill="none" aria-hidden="true">
            <path d="M260 165L88 54M260 165L430 86M260 165L104 260M260 165L426 272" stroke="#083B37" strokeOpacity="0.22" strokeWidth="2" strokeDasharray="7 9" />
            <circle cx="260" cy="165" r="76" stroke="#D99D44" strokeOpacity="0.44" strokeWidth="2" />
            <circle cx="260" cy="165" r="126" stroke="#5F8D73" strokeOpacity="0.28" strokeWidth="2" />
          </svg>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {["Services", "Gigs", "Care"].map((item) => (
            <div key={item} className="rounded-lg border border-conecly-ink/10 bg-white/88 p-3 text-sm font-semibold text-conecly-ink shadow-line backdrop-blur">
              {item}
            </div>
          ))}
        </div>
      </div>
    </IllustrationFrame>
  );
}

export function HowItWorksVisual() {
  const stages = [
    ["Discover", "Find nearby needs, offers, and events.", "M115 230C142 174 178 134 230 104"],
    ["Connect", "Start with shared context.", "M306 88C366 112 410 151 438 210"],
    ["Participate", "Show up, help, earn, or join.", "M418 336C352 382 264 382 194 334"],
  ];

  return (
    <IllustrationFrame className="mt-14 p-5 sm:p-7">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#ffffff_0%,#eef4ef_52%,#fff8ec_100%)]" />
      <div className="relative grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <svg className="mx-auto h-auto w-full max-w-[560px]" viewBox="0 0 560 430" fill="none" role="img" aria-labelledby="how-visual-title">
          <title id="how-visual-title">Discover, connect, and participate flow</title>
          <circle cx="280" cy="215" r="142" fill="#FAF7F0" stroke="#142321" strokeOpacity="0.08" />
          <circle cx="280" cy="215" r="88" fill="#083B37" />
          <path d="M240 218C258 187 302 187 320 218" stroke="#FAF7F0" strokeWidth="10" strokeLinecap="round" />
          <circle cx="256" cy="191" r="16" fill="#D99D44" />
          <circle cx="304" cy="191" r="16" fill="#8FB99F" />
          <path d="M250 247H310" stroke="#FAF7F0" strokeOpacity="0.82" strokeWidth="9" strokeLinecap="round" />
          {stages.map(([label, , path], index) => (
            <g key={label}>
              <path d={path} stroke={index === 1 ? "#D99D44" : "#5F8D73"} strokeWidth="3" strokeLinecap="round" strokeDasharray="8 10" />
            </g>
          ))}
          <g>
            <rect x="38" y="206" width="154" height="84" rx="14" fill="#FFFFFF" stroke="#142321" strokeOpacity="0.1" />
            <circle cx="78" cy="248" r="23" fill="#EEF4EF" />
            <path d="M69 248H87M78 239V257" stroke="#0B4E4A" strokeWidth="4" strokeLinecap="round" />
            <text x="112" y="244" fill="#142321" fontSize="18" fontWeight="700">Discover</text>
            <text x="112" y="266" fill="#142321" fillOpacity="0.55" fontSize="12">Nearby openings</text>
          </g>
          <g>
            <rect x="206" y="24" width="154" height="84" rx="14" fill="#FFFFFF" stroke="#142321" strokeOpacity="0.1" />
            <circle cx="246" cy="66" r="23" fill="#FFF4DF" />
            <path d="M237 68C244 58 255 58 262 68" stroke="#D99D44" strokeWidth="4" strokeLinecap="round" />
            <circle cx="241" cy="57" r="4" fill="#D99D44" />
            <circle cx="258" cy="57" r="4" fill="#D99D44" />
            <text x="280" y="62" fill="#142321" fontSize="18" fontWeight="700">Connect</text>
            <text x="280" y="84" fill="#142321" fillOpacity="0.55" fontSize="12">Warm context</text>
          </g>
          <g>
            <rect x="354" y="244" width="166" height="88" rx="14" fill="#FFFFFF" stroke="#142321" strokeOpacity="0.1" />
            <circle cx="396" cy="288" r="23" fill="#EEF4EF" />
            <path d="M386 288L394 296L407 279" stroke="#0B4E4A" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <text x="430" y="284" fill="#142321" fontSize="18" fontWeight="700">Participate</text>
            <text x="430" y="306" fill="#142321" fillOpacity="0.55" fontSize="12">Help or join</text>
          </g>
        </svg>

        <div className="grid gap-3">
          {stages.map(([title, text], index) => (
            <div key={title} className="flex items-center gap-4 rounded-lg border border-conecly-ink/10 bg-white/82 p-4 shadow-line">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-conecly-forest text-sm font-semibold text-white">
                0{index + 1}
              </span>
              <div>
                <p className="font-semibold text-conecly-ink">{title}</p>
                <p className="mt-1 text-sm leading-5 text-conecly-ink/58">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </IllustrationFrame>
  );
}

export function OpportunityVisual() {
  const items = [
    ["Cleaning", Paintbrush, "left-[5%] top-[12%]", "bg-white"],
    ["Moving help", PackageCheck, "right-[3%] top-[18%]", "bg-conecly-amber/95"],
    ["Tutoring", BookOpenCheck, "left-[11%] bottom-[18%]", "bg-white"],
    ["Local gigs", BriefcaseBusiness, "right-[8%] bottom-[14%]", "bg-white"],
    ["Support", HeartHandshake, "left-1/2 top-[5%] -translate-x-1/2", "bg-conecly-mist"],
  ];

  return (
    <IllustrationFrame className="bg-conecly-forest p-4 text-white sm:p-7">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(217,157,68,0.24),transparent_30%),linear-gradient(145deg,#083B37_0%,#0B4E4A_58%,#123D34_100%)]" />
      <svg className="absolute inset-0 h-full w-full opacity-70" viewBox="0 0 620 620" fill="none" aria-hidden="true">
        <path d="M56 438C162 290 260 388 362 188C424 66 506 84 582 122" stroke="#8FB99F" strokeOpacity="0.35" strokeWidth="2" />
        <path d="M24 166C144 230 228 168 320 284C410 398 496 322 596 386" stroke="#D99D44" strokeOpacity="0.42" strokeWidth="2" />
        <path d="M92 590L212 38M336 592L444 58M510 584L596 196" stroke="#FAF7F0" strokeOpacity="0.08" />
      </svg>
      <div className="relative rounded-lg border border-white/15 bg-white/10 p-5 ring-1 ring-white/10 backdrop-blur sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-white/68">Nearby today</p>
            <h3 className="mt-2 text-2xl font-semibold leading-tight sm:text-3xl">Useful openings within 2 km</h3>
          </div>
          <Sparkles className="shrink-0 text-conecly-amber" size={28} />
        </div>

        <div className="relative mt-8 h-[390px] overflow-hidden rounded-lg border border-white/12 bg-white/[0.07] sm:h-[470px]">
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 560 470" fill="none" aria-hidden="true">
            <circle cx="280" cy="236" r="74" fill="#FAF7F0" fillOpacity="0.98" />
            <circle cx="280" cy="236" r="130" stroke="#D99D44" strokeOpacity="0.42" strokeWidth="2" />
            <circle cx="280" cy="236" r="196" stroke="#8FB99F" strokeOpacity="0.28" strokeWidth="2" />
            <path d="M280 236L118 82M280 236L446 106M280 236L132 356M280 236L430 372M280 236L280 54" stroke="#FAF7F0" strokeOpacity="0.24" strokeWidth="2" strokeDasharray="7 9" />
          </svg>
          <div className="absolute left-1/2 top-1/2 z-20 w-[11rem] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-conecly-paper p-4 text-center text-conecly-ink shadow-soft">
            <p className="text-xs font-semibold uppercase text-conecly-emerald">CONECLY</p>
            <p className="mt-1 text-lg font-semibold">Local opportunity map</p>
          </div>
          {items.map(([label, Icon, position, color]) => (
            <div key={label} className={`absolute ${position} z-10 flex max-w-[9.25rem] items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-conecly-ink shadow-soft ${color}`}>
              <Icon className="shrink-0 text-conecly-teal" size={17} />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </IllustrationFrame>
  );
}

import Logo from "./Logo";

export default function ConnectionVisual() {
  return (
    <div className="relative min-h-[380px] overflow-hidden rounded-lg border border-conecly-ink/10 bg-white p-3 shadow-lift sm:min-h-[520px] sm:p-5">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#fcfbf7_0%,#eef4ef_48%,#f7efe4_100%)]" />
      <div className="relative grid h-full min-h-[350px] gap-3 sm:min-h-[480px] sm:gap-4">
        <div className="grid grid-cols-[1fr_auto] items-start gap-3">
          <div className="rounded-lg border border-conecly-ink/10 bg-white/92 p-4 shadow-line">
            <p className="eyebrow">Live nearby</p>
            <p className="mt-2 text-2xl font-semibold text-conecly-ink">Local help</p>
            <p className="mt-1 text-sm leading-5 text-conecly-ink/58">jobs, skills, support, and services</p>
          </div>
          <div className="flex h-[3.25rem] w-[3.25rem] items-center justify-center rounded-lg bg-conecly-forest p-2 shadow-soft sm:h-14 sm:w-14">
            <Logo compact linked={false} />
          </div>
        </div>

        <div className="relative flex-1 overflow-hidden rounded-lg border border-conecly-ink/10 bg-conecly-forest p-4 text-white">
          <svg className="absolute inset-0 h-full w-full opacity-80" viewBox="0 0 520 300" fill="none" aria-hidden="true">
            <path d="M20 238C112 188 154 198 220 134C286 70 352 78 500 36" stroke="#8FB99F" strokeOpacity="0.45" strokeWidth="2" />
            <path d="M30 58C142 98 190 226 308 218C388 212 426 140 506 158" stroke="#D99D44" strokeOpacity="0.5" strokeWidth="2" />
            <path d="M78 286L184 36M238 288L340 24M408 286L498 74" stroke="#FAF7F0" strokeOpacity="0.08" strokeWidth="1" />
          </svg>
          <div className="absolute left-[8%] top-[16%] rounded-lg bg-white px-3 py-2 text-xs font-semibold text-conecly-ink shadow-soft sm:left-[13%] sm:text-sm">Cleaner</div>
          <div className="absolute right-[6%] top-[29%] rounded-lg bg-conecly-amber px-3 py-2 text-xs font-semibold text-conecly-ink shadow-soft sm:right-[9%] sm:text-sm">Tutor</div>
          <div className="absolute bottom-[23%] left-[10%] rounded-lg bg-conecly-clay px-3 py-2 text-xs font-semibold text-white shadow-soft sm:left-[19%] sm:text-sm">Moving help</div>
          <div className="absolute bottom-[10%] right-[7%] rounded-lg bg-white px-3 py-2 text-xs font-semibold text-conecly-ink shadow-soft sm:right-[10%] sm:text-sm">Support</div>
          <div className="absolute left-1/2 top-1/2 flex h-[4.5rem] w-[4.5rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-lg border border-white/20 bg-white/12 p-2 backdrop-blur sm:h-20 sm:w-20">
            <Logo compact linked={false} />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {["Services", "Gigs", "Care"].map((item) => (
            <div key={item} className="rounded-lg border border-conecly-ink/10 bg-white/92 p-3 text-sm font-semibold text-conecly-ink shadow-line">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { navigation } from "../data";
import Logo from "./Logo";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-conecly-ink/10 bg-conecly-paper/88 backdrop-blur-xl">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-8"
        aria-label="Main navigation"
      >
        <Logo />
        <div className="hidden items-center gap-8 rounded-full border border-conecly-ink/8 bg-white/62 px-5 py-2.5 shadow-line lg:flex">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-conecly-ink/68 transition hover:text-conecly-teal"
            >
              {item.label}
            </a>
          ))}
        </div>
        <a
          href="/#waitlist"
          className="hidden items-center gap-2 rounded-lg bg-conecly-forest px-5 py-3 text-sm font-semibold text-white shadow-line transition hover:bg-conecly-teal lg:inline-flex"
        >
          Join waitlist
          <ArrowRight size={16} />
        </a>
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-conecly-ink/12 text-conecly-ink lg:hidden"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>
      {open && (
        <div className="border-t border-conecly-ink/10 bg-conecly-paper px-5 py-5 shadow-soft lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-medium text-conecly-ink transition hover:bg-white"
              >
                {item.label}
              </a>
            ))}
            <a
              href="/#waitlist"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-conecly-forest px-5 py-3 text-sm font-semibold text-white"
            >
              Join waitlist
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

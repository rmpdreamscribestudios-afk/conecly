import { navigation } from "../data";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-conecly-ink/10 bg-conecly-paper">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-12 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div>
          <Logo />
          <p className="mt-3 max-w-md text-sm leading-6 text-conecly-ink/60">
            A local participation platform for discovering what and who is nearby.
          </p>
        </div>
        <div className="flex flex-wrap gap-5 text-sm font-medium text-conecly-ink/62">
          {navigation.map((item) => (
            <a key={item.href} href={item.href} className="transition hover:text-conecly-teal">
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

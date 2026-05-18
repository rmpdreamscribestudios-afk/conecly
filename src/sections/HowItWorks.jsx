import SectionHeader from "../components/SectionHeader";
import { HowItWorksVisual } from "../components/Illustrations";
import { steps } from "../data";

export default function HowItWorks() {
  return (
    <section id="how" className="section-frame section-pad bg-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          eyebrow="How it works"
          title="A simple way to meet local needs."
          text="Share where you are, what you can offer, or what kind of help you need. CONECLY keeps it clear and close to home."
        />
        <HowItWorksVisual />
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <article key={step.title} className="premium-card h-full bg-conecly-paper p-6 sm:p-7">
                <div className="flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-conecly-forest text-white shadow-line">
                    <Icon size={24} />
                  </div>
                  <span className="text-sm font-semibold text-conecly-ink/32">0{index + 1}</span>
                </div>
                <h3 className="mt-8 text-xl font-semibold leading-snug text-conecly-ink">{step.title}</h3>
                <p className="mt-3 leading-7 text-conecly-ink/62">{step.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

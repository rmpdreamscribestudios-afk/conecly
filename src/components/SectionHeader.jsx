export default function SectionHeader({ eyebrow, title, text }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="eyebrow">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-[2rem] font-semibold leading-[1.08] text-conecly-ink sm:text-5xl">
        {title}
      </h2>
      <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-conecly-ink/64 sm:text-lg sm:leading-8">{text}</p>
    </div>
  );
}

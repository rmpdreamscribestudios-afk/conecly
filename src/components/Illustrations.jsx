const sceneCopy = {
  cleaning: {
    title: "Home cleaning, offered nearby",
    text: "A trusted cleaner resetting a bright apartment before the evening starts.",
    src: "/assets/cleaner.png",
  },
  moving: {
    title: "Moving help at the door",
    text: "An extra pair of local hands carrying boxes into a new apartment.",
    src: "/assets/moving.png",
  },
  tutoring: {
    title: "A calmer study hour",
    text: "A tutor helping a student work through the next page with confidence.",
    src: "/assets/tutor.png",
  },
  caregiving: {
    title: "Care that feels close",
    text: "A caregiver making the day easier for someone who needs steady support.",
    src: "/assets/caregiver.png",
  },
  neighbour: {
    title: "Neighbours showing up",
    text: "A small community support moment, practical, warm, and close to home.",
    src: "/assets/caregiver.png",
  },
  hero: {
    title: "Local services and community support",
    src: "/assets/hero-section.png",
  },
};

function IllustrationFrame({ children, className = "" }) {
  return (
    <div className={`relative overflow-hidden rounded-lg border border-conecly-ink/10 bg-conecly-paper shadow-lift ${className}`}>
      {children}
    </div>
  );
}

function EditorialImage({ src, alt, className = "", imageClassName = "", loading = "lazy" }) {
  return (
    <div className={`relative overflow-hidden rounded-lg bg-conecly-mist ${className}`}>
      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        className={`h-full w-full object-cover ${imageClassName}`}
      />
      <div className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-inset ring-conecly-ink/10" />
    </div>
  );
}

export function EditorialScene({ type, className = "" }) {
  const scene = sceneCopy[type] ?? sceneCopy.cleaning;

  return (
    <EditorialImage
      src={scene.src}
      alt={scene.title}
      className={`min-h-[19rem] shadow-soft ${className}`}
      imageClassName="transition duration-500 group-hover:scale-[1.025]"
    />
  );
}

export function HeroServicesVisual() {
  return (
    <IllustrationFrame className="aspect-[4/5] min-h-[410px] p-3 sm:min-h-[560px] sm:p-5 lg:aspect-[0.92/1]">
      <EditorialImage
        src={sceneCopy.hero.src}
        alt={sceneCopy.hero.title}
        loading="eager"
        className="h-full min-h-[386px] sm:min-h-[520px]"
        imageClassName="object-[52%_50%]"
      />
    </IllustrationFrame>
  );
}

export function HowItWorksVisual() {
  return (
    <div className="mt-14 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
      <IllustrationFrame className="p-3 sm:p-5">
        <EditorialScene type="moving" className="aspect-[4/5] min-h-[420px] sm:min-h-[520px]" />
      </IllustrationFrame>
      <div className="grid gap-5">
        <IllustrationFrame className="p-3 sm:p-5">
          <EditorialScene type="tutoring" className="aspect-[16/10] min-h-[250px] sm:min-h-[300px]" />
        </IllustrationFrame>
        <IllustrationFrame className="p-3 sm:p-5">
          <EditorialScene type="caregiving" className="aspect-[16/10] min-h-[250px] sm:min-h-[300px]" />
        </IllustrationFrame>
      </div>
    </div>
  );
}

export function OpportunityVisual() {
  return (
    <IllustrationFrame className="p-3 sm:p-5">
      <EditorialScene type="tutoring" className="aspect-[4/5] min-h-[440px] sm:min-h-[540px]" />
    </IllustrationFrame>
  );
}

export function CommunitySupportVisual() {
  return (
    <IllustrationFrame className="p-3 sm:p-5">
      <EditorialScene type="caregiving" className="aspect-[4/5] min-h-[390px] sm:min-h-[500px]" />
    </IllustrationFrame>
  );
}

export { sceneCopy };

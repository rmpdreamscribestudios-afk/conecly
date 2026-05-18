import { useId } from "react";

const sceneCopy = {
  cleaning: {
    title: "Home cleaning, offered nearby",
    text: "A trusted cleaner resetting a bright apartment before the evening starts.",
  },
  moving: {
    title: "Moving help at the door",
    text: "An extra pair of local hands carrying boxes into a new apartment.",
  },
  tutoring: {
    title: "A calmer study hour",
    text: "A tutor helping a student work through the next page with confidence.",
  },
  caregiving: {
    title: "Care that feels close",
    text: "A caregiver making the day easier for someone who needs steady support.",
  },
  neighbour: {
    title: "Neighbours showing up",
    text: "A small community support moment, practical, warm, and close to home.",
  },
};

function IllustrationFrame({ children, className = "" }) {
  return (
    <div className={`relative overflow-hidden rounded-lg border border-conecly-ink/10 bg-conecly-paper shadow-lift ${className}`}>
      {children}
    </div>
  );
}

function Backdrop({ id }) {
  return (
    <>
      <defs>
        <linearGradient id={`${id}-wall`} x1="80" y1="34" x2="620" y2="640" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FCFBF7" />
          <stop offset="0.55" stopColor="#EEF4EF" />
          <stop offset="1" stopColor="#F8EEDD" />
        </linearGradient>
        <linearGradient id={`${id}-floor`} x1="78" y1="480" x2="630" y2="670" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F6F1E7" />
          <stop offset="1" stopColor="#E8F0EA" />
        </linearGradient>
        <filter id={`${id}-shadow`} x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="18" stdDeviation="18" floodColor="#142321" floodOpacity="0.13" />
        </filter>
      </defs>
      <rect width="720" height="660" rx="34" fill={`url(#${id}-wall)`} />
      <path d="M0 474C126 432 218 482 344 448C486 410 594 432 720 386V660H0V474Z" fill={`url(#${id}-floor)`} />
      <path d="M72 486H642" stroke="#142321" strokeOpacity="0.09" strokeWidth="2" />
      <path d="M104 462C174 420 230 442 292 404C368 356 428 384 492 324C546 274 592 272 640 294" stroke="#0B4E4A" strokeOpacity="0.11" strokeWidth="3" strokeLinecap="round" />
      <g opacity="0.16">
        <path d="M510 188H650V414H510V188Z" fill="#0B4E4A" />
        <path d="M540 130H612V414H540V130Z" fill="#083B37" />
        <path d="M573 76L596 130H550L573 76Z" fill="#083B37" />
        <path d="M474 252H526V414H474V252Z" fill="#5F8D73" />
        <path d="M630 232H684V414H630V232Z" fill="#5F8D73" />
      </g>
      <circle cx="128" cy="128" r="64" fill="#D99D44" fillOpacity="0.12" />
      <circle cx="604" cy="106" r="42" fill="#5F8D73" fillOpacity="0.13" />
    </>
  );
}

function Head({ cx, cy, r = 22, fill = "#8B5E4B" }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={fill} />
      <path d={`M${cx - r * 0.72} ${cy - r * 0.16}C${cx - r * 0.2} ${cy - r * 0.78} ${cx + r * 0.52} ${cy - r * 0.72} ${cx + r * 0.84} ${cy - r * 0.18}`} stroke="#142321" strokeOpacity="0.22" strokeWidth="7" strokeLinecap="round" />
    </g>
  );
}

function WindowPlant({ x = 84, y = 232 }) {
  return (
    <g>
      <rect x={x} y={y} width="138" height="126" rx="16" fill="#FCFBF7" stroke="#142321" strokeOpacity="0.08" />
      <path d={`M${x + 20} ${y + 72}C${x + 58} ${y + 28} ${x + 92} ${y + 54} ${x + 118} ${y + 22}`} stroke="#0B4E4A" strokeOpacity="0.18" strokeWidth="5" strokeLinecap="round" />
      <rect x={x + 43} y={y + 88} width="54" height="44" rx="10" fill="#C16E4F" />
      <path d={`M${x + 70} ${y + 90}V${y + 48}`} stroke="#0B4E4A" strokeWidth="5" strokeLinecap="round" />
      <path d={`M${x + 70} ${y + 62}C${x + 42} ${y + 38} ${x + 36} ${y + 76} ${x + 67} ${y + 76}`} fill="#5F8D73" />
      <path d={`M${x + 72} ${y + 54}C${x + 102} ${y + 30} ${x + 112} ${y + 70} ${x + 76} ${y + 72}`} fill="#8FB99F" />
    </g>
  );
}

function PersonCleaner({ id }) {
  return (
    <g filter={`url(#${id}-shadow)`}>
      <path d="M360 260C402 260 430 292 426 340L416 468H326L316 340C312 292 320 260 360 260Z" fill="#0B4E4A" />
      <path d="M328 348C288 370 258 398 236 440" stroke="#8B5E4B" strokeWidth="18" strokeLinecap="round" />
      <path d="M395 350C432 382 458 418 480 462" stroke="#8B5E4B" strokeWidth="18" strokeLinecap="round" />
      <path d="M338 468L292 570" stroke="#142321" strokeWidth="28" strokeLinecap="round" />
      <path d="M400 468L450 570" stroke="#142321" strokeWidth="28" strokeLinecap="round" />
      <path d="M286 588H346" stroke="#083B37" strokeWidth="18" strokeLinecap="round" />
      <path d="M432 588H492" stroke="#083B37" strokeWidth="18" strokeLinecap="round" />
      <Head cx="368" cy="222" r={28} fill="#9A6B57" />
      <path d="M333 212C342 178 392 172 412 206C388 196 362 198 333 212Z" fill="#142321" />
      <path d="M224 430L164 574" stroke="#0B4E4A" strokeWidth="9" strokeLinecap="round" />
      <path d="M136 590C178 560 228 560 272 592" stroke="#D99D44" strokeWidth="15" strokeLinecap="round" />
    </g>
  );
}

function CleaningScene({ id }) {
  return (
    <svg className="h-full w-full" viewBox="0 0 720 660" fill="none" role="img" aria-label={sceneCopy.cleaning.title}>
      <Backdrop id={id} />
      <WindowPlant />
      <rect x="494" y="370" width="92" height="74" rx="18" fill="#FCFBF7" stroke="#142321" strokeOpacity="0.08" />
      <path d="M514 394H566M514 418H552" stroke="#142321" strokeOpacity="0.12" strokeWidth="9" strokeLinecap="round" />
      <ellipse cx="398" cy="596" rx="210" ry="30" fill="#142321" fillOpacity="0.08" />
      <PersonCleaner id={id} />
      <path d="M526 548C548 518 596 518 616 548V584H526V548Z" fill="#D99D44" />
      <path d="M548 548C560 532 582 532 594 548" stroke="#083B37" strokeWidth="8" strokeLinecap="round" />
    </svg>
  );
}

function MovingScene({ id }) {
  return (
    <svg className="h-full w-full" viewBox="0 0 720 660" fill="none" role="img" aria-label={sceneCopy.moving.title}>
      <Backdrop id={id} />
      <rect x="86" y="164" width="220" height="372" rx="20" fill="#FCFBF7" stroke="#142321" strokeOpacity="0.08" />
      <rect x="128" y="218" width="136" height="318" rx="16" fill="#0B4E4A" />
      <circle cx="238" cy="384" r="8" fill="#D99D44" />
      <g filter={`url(#${id}-shadow)`}>
        <path d="M402 264C442 254 476 282 480 330L494 454H390L374 340C368 300 374 270 402 264Z" fill="#083B37" />
        <Head cx="414" cy="222" r={28} fill="#8F604D" />
        <path d="M380 210C392 176 440 178 456 212C432 204 406 204 380 210Z" fill="#142321" />
        <path d="M382 338C346 350 318 366 292 392" stroke="#8F604D" strokeWidth="18" strokeLinecap="round" />
        <path d="M476 338C510 354 536 382 560 416" stroke="#8F604D" strokeWidth="18" strokeLinecap="round" />
        <rect x="276" y="360" width="260" height="128" rx="14" fill="#D99D44" />
        <path d="M276 416H536M406 360V488" stroke="#083B37" strokeOpacity="0.18" strokeWidth="5" />
        <path d="M404 454L366 574" stroke="#142321" strokeWidth="27" strokeLinecap="round" />
        <path d="M474 454L524 574" stroke="#142321" strokeWidth="27" strokeLinecap="round" />
        <path d="M352 592H412M508 592H568" stroke="#083B37" strokeWidth="18" strokeLinecap="round" />
      </g>
      <rect x="104" y="512" width="122" height="74" rx="12" fill="#C16E4F" />
      <rect x="158" y="470" width="138" height="78" rx="12" fill="#FCFBF7" stroke="#142321" strokeOpacity="0.08" />
      <path d="M104 548H226M158 510H296" stroke="#142321" strokeOpacity="0.12" strokeWidth="4" />
    </svg>
  );
}

function TutoringScene({ id }) {
  return (
    <svg className="h-full w-full" viewBox="0 0 720 660" fill="none" role="img" aria-label={sceneCopy.tutoring.title}>
      <Backdrop id={id} />
      <rect x="96" y="168" width="178" height="130" rx="18" fill="#FCFBF7" stroke="#142321" strokeOpacity="0.08" />
      <path d="M128 250C164 214 196 238 236 202" stroke="#0B4E4A" strokeOpacity="0.24" strokeWidth="7" strokeLinecap="round" />
      <ellipse cx="372" cy="564" rx="240" ry="30" fill="#142321" fillOpacity="0.08" />
      <rect x="170" y="404" width="392" height="38" rx="19" fill="#083B37" />
      <path d="M210 442V586M522 442V586" stroke="#083B37" strokeWidth="18" strokeLinecap="round" />
      <g filter={`url(#${id}-shadow)`}>
        <path d="M274 282C234 286 210 318 212 362L218 428H310L318 360C324 314 310 284 274 282Z" fill="#5F8D73" />
        <Head cx="272" cy="244" r={25} fill="#8F604D" />
        <path d="M244 236C254 206 294 202 312 232C290 228 268 226 244 236Z" fill="#142321" />
        <path d="M312 350C352 350 384 366 414 396" stroke="#8F604D" strokeWidth="16" strokeLinecap="round" />
        <path d="M256 428L228 548" stroke="#142321" strokeWidth="24" strokeLinecap="round" />
        <path d="M300 428L342 548" stroke="#142321" strokeWidth="24" strokeLinecap="round" />
        <path d="M214 562H272M326 562H384" stroke="#083B37" strokeWidth="16" strokeLinecap="round" />
      </g>
      <g filter={`url(#${id}-shadow)`}>
        <path d="M478 266C520 268 546 302 540 352L532 428H438L430 354C424 302 438 266 478 266Z" fill="#D99D44" />
        <Head cx="482" cy="226" r={27} fill="#A06F58" />
        <path d="M448 220C460 184 514 184 528 224C498 212 474 212 448 220Z" fill="#3B2824" />
        <path d="M442 344C402 350 372 368 344 400" stroke="#A06F58" strokeWidth="17" strokeLinecap="round" />
        <path d="M464 428L422 548" stroke="#142321" strokeWidth="25" strokeLinecap="round" />
        <path d="M518 428L556 548" stroke="#142321" strokeWidth="25" strokeLinecap="round" />
        <path d="M406 562H466M540 562H600" stroke="#083B37" strokeWidth="16" strokeLinecap="round" />
      </g>
      <path d="M326 392C362 374 408 374 444 392V434C406 418 364 418 326 434V392Z" fill="#FCFBF7" stroke="#142321" strokeOpacity="0.1" />
      <path d="M384 386V426" stroke="#142321" strokeOpacity="0.12" strokeWidth="4" />
    </svg>
  );
}

function CaregivingScene({ id }) {
  return (
    <svg className="h-full w-full" viewBox="0 0 720 660" fill="none" role="img" aria-label={sceneCopy.caregiving.title}>
      <Backdrop id={id} />
      <WindowPlant x={476} y={162} />
      <ellipse cx="368" cy="574" rx="238" ry="30" fill="#142321" fillOpacity="0.08" />
      <rect x="98" y="362" width="224" height="136" rx="26" fill="#0B4E4A" />
      <path d="M126 498V584M288 498V584" stroke="#083B37" strokeWidth="24" strokeLinecap="round" />
      <g filter={`url(#${id}-shadow)`}>
        <path d="M220 284C184 288 162 320 168 360L186 450H286L300 358C306 318 284 286 250 282L220 284Z" fill="#D99D44" />
        <Head cx="236" cy="244" r={28} fill="#8E6251" />
        <path d="M206 240C212 210 252 198 278 224C260 226 236 230 206 240Z" fill="#D9D0C2" />
        <path d="M194 350C222 374 262 374 296 350" stroke="#8E6251" strokeWidth="17" strokeLinecap="round" />
        <path d="M210 448L190 548" stroke="#142321" strokeWidth="25" strokeLinecap="round" />
        <path d="M274 448L316 548" stroke="#142321" strokeWidth="25" strokeLinecap="round" />
      </g>
      <g filter={`url(#${id}-shadow)`}>
        <path d="M438 258C482 260 510 294 508 342L500 482H402L392 344C388 296 400 260 438 258Z" fill="#5F8D73" />
        <Head cx="446" cy="218" r={27} fill="#9A6B57" />
        <path d="M414 212C426 180 472 178 492 212C468 204 442 204 414 212Z" fill="#142321" />
        <path d="M402 348C362 366 330 390 306 422" stroke="#9A6B57" strokeWidth="18" strokeLinecap="round" />
        <path d="M496 346C530 360 558 382 582 414" stroke="#9A6B57" strokeWidth="18" strokeLinecap="round" />
        <path d="M430 482L392 574" stroke="#142321" strokeWidth="27" strokeLinecap="round" />
        <path d="M488 482L540 574" stroke="#142321" strokeWidth="27" strokeLinecap="round" />
      </g>
      <rect x="538" y="392" width="72" height="54" rx="14" fill="#FCFBF7" stroke="#142321" strokeOpacity="0.08" />
      <path d="M554 392V376C554 358 592 358 592 392" stroke="#D99D44" strokeWidth="10" strokeLinecap="round" />
    </svg>
  );
}

function NeighbourScene({ id }) {
  return (
    <svg className="h-full w-full" viewBox="0 0 720 660" fill="none" role="img" aria-label={sceneCopy.neighbour.title}>
      <Backdrop id={id} />
      <rect x="84" y="186" width="190" height="330" rx="22" fill="#FCFBF7" stroke="#142321" strokeOpacity="0.08" />
      <rect x="124" y="240" width="110" height="276" rx="16" fill="#083B37" />
      <path d="M124 332H234" stroke="#D99D44" strokeOpacity="0.45" strokeWidth="7" />
      <ellipse cx="376" cy="584" rx="246" ry="30" fill="#142321" fillOpacity="0.08" />
      <g filter={`url(#${id}-shadow)`}>
        <path d="M296 276C256 282 232 316 238 360L250 474H350L360 360C366 314 338 276 296 276Z" fill="#0B4E4A" />
        <Head cx="300" cy="236" r={27} fill="#8F604D" />
        <path d="M266 232C278 198 326 198 344 230C318 222 292 222 266 232Z" fill="#142321" />
        <path d="M348 352C384 352 412 366 438 394" stroke="#8F604D" strokeWidth="18" strokeLinecap="round" />
        <path d="M278 474L238 574" stroke="#142321" strokeWidth="27" strokeLinecap="round" />
        <path d="M334 474L380 574" stroke="#142321" strokeWidth="27" strokeLinecap="round" />
      </g>
      <g filter={`url(#${id}-shadow)`}>
        <path d="M494 272C536 274 562 308 558 358L546 474H448L438 358C434 306 452 272 494 272Z" fill="#C16E4F" />
        <Head cx="496" cy="232" r={28} fill="#A06F58" />
        <path d="M462 226C470 190 526 188 544 224C516 218 488 218 462 226Z" fill="#3B2824" />
        <path d="M446 354C410 360 384 374 358 398" stroke="#A06F58" strokeWidth="18" strokeLinecap="round" />
        <path d="M474 474L436 574" stroke="#142321" strokeWidth="27" strokeLinecap="round" />
        <path d="M532 474L578 574" stroke="#142321" strokeWidth="27" strokeLinecap="round" />
      </g>
      <path d="M388 372C424 350 460 350 496 372L478 432H406L388 372Z" fill="#D99D44" />
      <path d="M414 372C424 354 458 354 468 372" stroke="#083B37" strokeWidth="8" strokeLinecap="round" />
      <circle cx="420" cy="404" r="8" fill="#5F8D73" />
      <circle cx="450" cy="396" r="9" fill="#0B4E4A" />
      <circle cx="470" cy="410" r="7" fill="#C16E4F" />
    </svg>
  );
}

export function EditorialScene({ type, className = "" }) {
  const reactId = useId();
  const id = `scene-${reactId.replace(/:/g, "")}-${type}`;
  const scenes = {
    cleaning: <CleaningScene id={id} />,
    moving: <MovingScene id={id} />,
    tutoring: <TutoringScene id={id} />,
    caregiving: <CaregivingScene id={id} />,
    neighbour: <NeighbourScene id={id} />,
  };

  return (
    <div className={`relative min-h-[19rem] overflow-hidden rounded-lg border border-conecly-ink/10 bg-conecly-paper shadow-soft ${className}`}>
      {scenes[type]}
    </div>
  );
}

export function HeroServicesVisual() {
  return (
    <IllustrationFrame className="min-h-[430px] p-3 sm:min-h-[570px] sm:p-5">
      <EditorialScene type="cleaning" className="h-[390px] sm:h-[530px]" />
    </IllustrationFrame>
  );
}

export function HowItWorksVisual() {
  return (
    <div className="mt-14 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
      <IllustrationFrame className="p-3 sm:p-5">
        <EditorialScene type="moving" className="h-[420px] sm:h-[520px]" />
      </IllustrationFrame>
      <div className="grid gap-5">
        <IllustrationFrame className="p-3 sm:p-5">
          <EditorialScene type="tutoring" className="h-[250px] sm:h-[300px]" />
        </IllustrationFrame>
        <IllustrationFrame className="p-3 sm:p-5">
          <EditorialScene type="caregiving" className="h-[250px] sm:h-[300px]" />
        </IllustrationFrame>
      </div>
    </div>
  );
}

export function OpportunityVisual() {
  return (
    <IllustrationFrame className="p-3 sm:p-5">
      <EditorialScene type="tutoring" className="h-[440px] sm:h-[540px]" />
    </IllustrationFrame>
  );
}

export function CommunitySupportVisual() {
  return (
    <IllustrationFrame className="p-3 sm:p-5">
      <EditorialScene type="neighbour" className="h-[390px] sm:h-[500px]" />
    </IllustrationFrame>
  );
}

export { sceneCopy };

export default function Logo({ compact = false, linked = true }) {
  const mark = (
    <>
      <svg
        className={compact ? "h-8 w-8" : "h-11 w-11"}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect width="48" height="48" rx="10" fill="#083B37" />
        <path d="M14 30.5C17.8 36.8 26.1 38.9 32.5 35.1C38.9 31.3 41 23 37.2 16.7" stroke="#FAF7F0" strokeWidth="4" strokeLinecap="round" />
        <path
          d="M34.5 16.5C30.6 10.5 22.6 8.7 16.5 12.4C10.2 16.2 8.1 24.5 11.9 30.8"
          stroke="#8FB99F"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path d="M17.4 29.2L30.8 15.8" stroke="#D99D44" strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="17.2" cy="29.4" r="4.2" fill="#C16E4F" />
        <circle cx="30.8" cy="15.8" r="4.2" fill="#D99D44" />
        <circle cx="24" cy="24" r="3.2" fill="#FAF7F0" />
      </svg>
      {!compact && (
        <span className="text-lg font-semibold text-conecly-ink sm:text-xl">
          CONECLY
        </span>
      )}
    </>
  );

  if (!linked) {
    return <span className="flex items-center gap-2.5">{mark}</span>;
  }

  return (
    <a href="/" className="flex items-center gap-2.5" aria-label="CONECLY home">
      {mark}
    </a>
  );
}

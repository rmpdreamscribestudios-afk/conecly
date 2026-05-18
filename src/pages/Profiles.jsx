import {
  AlertCircle,
  ArrowLeft,
  Clock3,
  Image as ImageIcon,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  RefreshCw,
  Search,
  SlidersHorizontal,
  Sparkles,
  Tag,
  UserRound,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { serviceCategories } from "../data";
import { isSupabaseConfigured, supabase, supabaseDiagnostics } from "../lib/supabase";

const PARTICIPATION_FILTERS = ["Offer help", "Need help", "Both"];
const CALGARY_AREAS = [
  "Beltline",
  "Bridgeland",
  "Inglewood",
  "Kensington",
  "Mission",
  "Marda Loop",
  "Northwest Calgary",
  "Northeast Calgary",
  "Southwest Calgary",
  "Southeast Calgary",
];

export default function Profiles({ headingLevel = "h1" }) {
  const [profiles, setProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    participation: "",
    area: "",
    search: "",
  });

  async function loadProfiles({ refreshing = false } = {}) {
    setErrorMessage("");
    setIsLoading(!refreshing);
    setIsRefreshing(refreshing);

    if (!isSupabaseConfigured || !supabase) {
      setProfiles([]);
      setErrorMessage(
        `Supabase is not configured for public profile reads. Missing URL: ${!supabaseDiagnostics.hasUrl}. Missing anon key: ${!supabaseDiagnostics.hasAnonKey}.`,
      );
      setIsLoading(false);
      setIsRefreshing(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100);

      if (error) {
        throw error;
      }

      setProfiles((data ?? []).map(mapProfile));
      setLastUpdated(new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }));
    } catch (error) {
      console.error("[Profiles] Supabase profile read failed", error);
      setProfiles([]);
      setErrorMessage(formatSupabaseReadError(error));
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }

  useEffect(() => {
    loadProfiles();

    if (!supabase) {
      return undefined;
    }

    const handleProfileCreated = () => loadProfiles({ refreshing: true });
    window.addEventListener("conecly:profile-created", handleProfileCreated);

    const channel = supabase
      .channel("public-profiles-page")
      .on("postgres_changes", { event: "*", schema: "public", table: "profiles" }, () => {
        loadProfiles({ refreshing: true });
      })
      .subscribe((status) => {
        if (status === "CHANNEL_ERROR") {
          console.warn("[Profiles] Realtime profile refresh is unavailable. Manual refresh still works.");
        }
      });

    return () => {
      window.removeEventListener("conecly:profile-created", handleProfileCreated);
      supabase.removeChannel(channel);
    };
  }, []);

  const filteredProfiles = useMemo(() => {
    const areaQuery = filters.area.trim().toLowerCase();
    const searchQuery = filters.search.trim().toLowerCase();

    return profiles.filter((profile) => {
      const locationText = `${profile.city} ${profile.neighbourhood}`.toLowerCase();
      const searchableText = [
        profile.firstName,
        profile.city,
        profile.neighbourhood,
        profile.participationType,
        profile.serviceCategory,
        profile.bio,
        profile.availability,
        profile.rate,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      const categoryMatches = !filters.category || profile.serviceCategory === filters.category;
      const participationMatches =
        !filters.participation || getParticipationGroup(profile.participationType) === filters.participation;
      const areaMatches = !areaQuery || locationText.includes(areaQuery);
      const searchMatches = !searchQuery || searchableText.includes(searchQuery);

      return categoryMatches && participationMatches && areaMatches && searchMatches;
    });
  }, [filters, profiles]);

  const activeFilterCount = Object.values(filters).filter(Boolean).length;
  const Heading = headingLevel;

  function updateFilter(name, value) {
    setFilters((current) => ({ ...current, [name]: value }));
  }

  function clearFilters() {
    setFilters({ category: "", participation: "", area: "", search: "" });
  }

  return (
    <section id="profiles" className="bg-conecly-paper px-4 py-10 sm:px-8 sm:py-14 lg:py-18">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-lg border border-conecly-ink/10 bg-white px-5 py-8 shadow-line sm:px-8 lg:px-10 lg:py-10">
          <div className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="eyebrow">Public directory</p>
              <Heading className="mt-4 max-w-3xl text-4xl font-semibold leading-tight text-conecly-ink sm:text-5xl lg:text-[3.5rem]">
                Browse people nearby
              </Heading>
              <p className="mt-4 max-w-2xl text-base leading-7 text-conecly-ink/66 sm:text-lg">
                Find neighbours offering practical help, people asking for support, and friendly local connections across Calgary.
              </p>
            </div>

            <div className="grid gap-2 rounded-lg border border-conecly-ink/10 bg-conecly-paper px-4 py-3 text-sm text-conecly-ink/68 sm:min-w-56">
              <span className="font-semibold text-conecly-ink">
                {isLoading ? "Loading profiles" : `${filteredProfiles.length} profile${filteredProfiles.length === 1 ? "" : "s"}`}
              </span>
              <span>{profiles.length ? `${profiles.length} total in the directory` : "Public profiles will appear here"}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-lg border border-conecly-ink/10 bg-white p-4 shadow-line sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-2 text-sm font-semibold text-conecly-ink">
              <SlidersHorizontal size={17} className="text-conecly-emerald" />
              Refine the directory
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={clearFilters}
                disabled={!activeFilterCount}
                className="inline-flex items-center justify-center rounded-lg border border-conecly-ink/10 px-3 py-2 text-sm font-semibold text-conecly-ink/68 transition hover:border-conecly-teal/30 hover:text-conecly-teal disabled:cursor-not-allowed disabled:opacity-40"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={() => loadProfiles({ refreshing: true })}
                disabled={isRefreshing || isLoading}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-conecly-ink/10 px-3 py-2 text-sm font-semibold text-conecly-ink transition hover:border-conecly-teal/30 hover:text-conecly-teal disabled:cursor-not-allowed disabled:opacity-55"
              >
                <RefreshCw size={15} className={isRefreshing ? "animate-spin" : ""} />
                Refresh
              </button>
            </div>
          </div>

          <div className="mt-4 grid gap-3 lg:grid-cols-[1.3fr_0.9fr_0.9fr]">
            <label className="grid gap-2 text-xs font-semibold uppercase text-conecly-ink/58">
              Search
              <div className="relative">
                <Search size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-conecly-ink/35" />
                <input
                  value={filters.search}
                  onChange={(event) => updateFilter("search", event.target.value)}
                  placeholder="Search skills, needs, or neighbourhoods"
                  className="form-field py-3 pl-10 text-sm normal-case"
                />
              </div>
            </label>
            <FilterSelect
              label="Categories"
              value={filters.category}
              onChange={(value) => updateFilter("category", value)}
              options={serviceCategories}
            />
            <FilterSelect
              label="Calgary areas"
              value={filters.area}
              onChange={(value) => updateFilter("area", value)}
              options={getAreaOptions(profiles)}
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {PARTICIPATION_FILTERS.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => updateFilter("participation", filters.participation === filter ? "" : filter)}
                className={`rounded-lg border px-4 py-2 text-sm font-semibold transition ${
                  filters.participation === filter
                    ? "border-conecly-teal bg-conecly-mist text-conecly-teal"
                    : "border-conecly-ink/10 bg-white text-conecly-ink/68 hover:border-conecly-teal/30 hover:text-conecly-teal"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-conecly-ink/58">
          <p>
            {isLoading
              ? "Loading public profiles..."
              : `${filteredProfiles.length} of ${profiles.length} profile${profiles.length === 1 ? "" : "s"} shown`}
          </p>
          {lastUpdated && <p>Last refreshed {lastUpdated}</p>}
        </div>

        {errorMessage && (
          <div className="mt-8 flex items-start gap-3 rounded-lg border border-conecly-clay/30 bg-white p-4 text-sm leading-6 text-conecly-ink shadow-line">
            <AlertCircle size={18} className="mt-0.5 shrink-0 text-conecly-clay" />
            <p>{errorMessage}</p>
          </div>
        )}

        {isLoading && <ProfileSkeletonGrid />}

        {!isLoading && !errorMessage && filteredProfiles.length === 0 && (
          <EmptyProfiles hasProfiles={profiles.length > 0} onClear={clearFilters} />
        )}

        {!isLoading && !errorMessage && filteredProfiles.length > 0 && (
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredProfiles.map((profile) => (
              <ProfileCard key={profile.id ?? `${profile.firstName}-${profile.city}-${profile.contactDetails}`} profile={profile} />
            ))}
          </div>
        )}

        <div className="mt-8 rounded-lg border border-dashed border-conecly-ink/14 bg-white/60 p-5 text-sm leading-6 text-conecly-ink/62">
          Open any profile to see the fuller public details shared by that neighbour.
        </div>
      </div>
    </section>
  );
}

export function ProfileDetail() {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [notFound, setNotFound] = useState(false);
  const profileId = getProfileIdFromPath();

  useEffect(() => {
    let isMounted = true;

    async function loadProfile() {
      setIsLoading(true);
      setErrorMessage("");
      setNotFound(false);

      if (!profileId) {
        setNotFound(true);
        setIsLoading(false);
        return;
      }

      if (!isSupabaseConfigured || !supabase) {
        setErrorMessage(
          `Supabase is not configured for public profile reads. Missing URL: ${!supabaseDiagnostics.hasUrl}. Missing anon key: ${!supabaseDiagnostics.hasAnonKey}.`,
        );
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", profileId)
          .maybeSingle();

        if (error) {
          throw error;
        }

        if (!isMounted) {
          return;
        }

        if (!data) {
          setProfile(null);
          setNotFound(true);
          return;
        }

        setProfile(mapProfile(data));
      } catch (error) {
        console.error("[ProfileDetail] Supabase profile read failed", error);

        if (isMounted) {
          setProfile(null);
          setErrorMessage(formatSupabaseReadError(error));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadProfile();

    return () => {
      isMounted = false;
    };
  }, [profileId]);

  if (isLoading) {
    return <ProfileDetailLoading />;
  }

  if (notFound) {
    return <ProfileDetailNotFound />;
  }

  if (errorMessage) {
    return (
      <ProfileDetailShell>
        <div className="flex items-start gap-3 rounded-lg border border-conecly-clay/30 bg-white p-5 text-sm leading-6 text-conecly-ink shadow-line">
          <AlertCircle size={19} className="mt-0.5 shrink-0 text-conecly-clay" />
          <p>{errorMessage}</p>
        </div>
      </ProfileDetailShell>
    );
  }

  if (!profile) {
    return <ProfileDetailNotFound />;
  }

  const participation = getParticipationGroup(profile.participationType);
  const ContactIcon = profile.contactMethod.toLowerCase().includes("phone") ? Phone : Mail;

  return (
    <ProfileDetailShell>
      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div className="rounded-lg border border-conecly-ink/10 bg-white p-4 shadow-line sm:p-5">
          <ProfilePhoto
            src={profile.photoUrl}
            name={profile.firstName}
            className="aspect-[4/3] w-full rounded-lg"
            iconSize={42}
          />
          <div className="mt-5 flex flex-wrap gap-2">
            <span className={getParticipationClass(participation)}>{participation}</span>
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-conecly-mist px-3 py-1.5 text-sm font-semibold text-conecly-teal">
              <Tag size={14} />
              {profile.serviceCategory}
            </span>
          </div>
        </div>

        <article className="rounded-lg border border-conecly-ink/10 bg-white p-5 shadow-line sm:p-8">
          <p className="eyebrow">Public profile</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-conecly-ink sm:text-5xl">{profile.firstName}</h1>
          <p className="mt-4 flex items-center gap-2 text-base font-medium text-conecly-ink/62">
            <MapPin size={18} className="shrink-0 text-conecly-clay" />
            <span>{[profile.city, profile.neighbourhood].filter(Boolean).join(" / ")}</span>
          </p>

          <div className="mt-7 border-t border-conecly-ink/8 pt-7">
            <h2 className="text-sm font-semibold uppercase text-conecly-ink/45">Bio</h2>
            <p className="mt-3 whitespace-pre-line text-base leading-8 text-conecly-ink/70">{profile.bio}</p>
          </div>

          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            <ProfileInfoCard label="Availability" value={profile.availability || "Ask directly"} icon={Clock3} />
            <ProfileInfoCard label="Rate" value={profile.rate || "Shared on request"} icon={Sparkles} />
            <ProfileInfoCard label="Contact method" value={profile.contactMethod || "Contact"} icon={ContactIcon} />
            <ProfileInfoCard label="Contact details" value={profile.contactDetails || "Shared on request"} icon={MessageCircle} />
          </div>
        </article>
      </div>
    </ProfileDetailShell>
  );
}

function ProfileCard({ profile }) {
  const participation = getParticipationGroup(profile.participationType);
  const ContactIcon = profile.contactMethod.toLowerCase().includes("phone") ? Phone : Mail;
  const profileHref = profile.id ? `/profiles/${profile.id}` : "/profiles";

  return (
    <a href={profileHref} className="premium-card flex h-full flex-col overflow-hidden p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 gap-3">
          <ProfilePhoto src={profile.photoUrl} name={profile.firstName} className="h-12 w-12 shrink-0 rounded-lg" />
          <div className="min-w-0">
            <h2 className="truncate text-xl font-semibold leading-tight text-conecly-ink">{profile.firstName}</h2>
            <p className="mt-2 flex items-center gap-2 text-sm font-medium text-conecly-ink/58">
              <MapPin size={15} className="shrink-0 text-conecly-clay" />
              <span className="truncate">{[profile.city, profile.neighbourhood].filter(Boolean).join(" / ")}</span>
            </p>
          </div>
        </div>
        <span className={getParticipationClass(participation)}>{participation}</span>
      </div>

      <div className="mt-5 border-t border-conecly-ink/8 pt-5">
        <p className="text-xs font-semibold uppercase text-conecly-ink/45">Category</p>
        <div className="mt-2 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-conecly-mist px-3 py-1.5 text-sm font-semibold text-conecly-teal">
            <Tag size={14} />
            {profile.serviceCategory}
          </span>
          {profile.rate && (
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-conecly-amber/14 px-3 py-1.5 text-sm font-semibold text-conecly-ink">
              <Sparkles size={14} />
              {profile.rate}
            </span>
          )}
        </div>
      </div>

      <div className="mt-5 flex-1">
        <p className="text-xs font-semibold uppercase text-conecly-ink/45">Bio</p>
        <p className="mt-2 line-clamp-4 text-sm leading-6 text-conecly-ink/68">{profile.bio}</p>
      </div>

      <div className="mt-6 border-t border-conecly-ink/8 pt-5">
        <p className="text-xs font-semibold uppercase text-conecly-ink/45">Contact</p>
        <div className="mt-3 grid gap-3 text-sm text-conecly-ink/68">
          <ProfileMetaLine value={profile.availability || "Ask directly"} icon={Clock3} />
          <ProfileMetaLine value={profile.contactMethod || "Contact"} icon={ContactIcon} />
          <ProfileMetaLine value={profile.contactDetails || "Shared on request"} icon={UserRound} />
        </div>
      </div>

      <span className="mt-6 inline-flex items-center justify-center rounded-lg border border-conecly-ink/10 px-4 py-3 text-sm font-semibold text-conecly-ink transition hover:border-conecly-teal/30 hover:text-conecly-teal">
        View profile
      </span>
    </a>
  );
}

function ProfileDetailShell({ children }) {
  return (
    <section className="bg-conecly-paper px-4 py-10 sm:px-8 sm:py-14 lg:py-18">
      <div className="mx-auto max-w-5xl">
        <a
          href="/profiles"
          className="mb-6 inline-flex items-center gap-2 rounded-lg border border-conecly-ink/10 bg-white px-4 py-2.5 text-sm font-semibold text-conecly-ink shadow-line transition hover:border-conecly-teal/30 hover:text-conecly-teal"
        >
          <ArrowLeft size={16} />
          Back to profiles
        </a>
        {children}
      </div>
    </section>
  );
}

function ProfilePhoto({ src, name, className, iconSize = 20 }) {
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    setImageFailed(false);
  }, [src]);

  if (src && !imageFailed) {
    return (
      <img
        src={src}
        alt={name ? `${name} profile` : ""}
        className={`${className} object-cover`}
        loading="lazy"
        onError={() => setImageFailed(true)}
      />
    );
  }

  return (
    <div className={`${className} flex items-center justify-center bg-conecly-mist text-conecly-teal`}>
      <ImageIcon size={iconSize} />
    </div>
  );
}

function ProfileDetailLoading() {
  return (
    <ProfileDetailShell>
      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="rounded-lg border border-conecly-ink/10 bg-white p-4 shadow-line sm:p-5">
          <div className="aspect-[4/3] animate-pulse rounded-lg bg-conecly-ink/8" />
          <div className="mt-5 flex gap-2">
            <div className="h-8 w-24 animate-pulse rounded-lg bg-conecly-mist" />
            <div className="h-8 w-32 animate-pulse rounded-lg bg-conecly-mist" />
          </div>
        </div>
        <div className="rounded-lg border border-conecly-ink/10 bg-white p-5 shadow-line sm:p-8">
          <div className="h-4 w-28 animate-pulse rounded bg-conecly-ink/8" />
          <div className="mt-5 h-12 w-2/3 animate-pulse rounded bg-conecly-ink/10" />
          <div className="mt-5 h-5 w-1/2 animate-pulse rounded bg-conecly-ink/8" />
          <div className="mt-8 space-y-3">
            <div className="h-4 animate-pulse rounded bg-conecly-ink/8" />
            <div className="h-4 animate-pulse rounded bg-conecly-ink/8" />
            <div className="h-4 w-3/4 animate-pulse rounded bg-conecly-ink/8" />
          </div>
        </div>
      </div>
    </ProfileDetailShell>
  );
}

function ProfileDetailNotFound() {
  return (
    <ProfileDetailShell>
      <div className="rounded-lg border border-conecly-ink/10 bg-white p-8 text-center shadow-line sm:p-10">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-conecly-mist text-conecly-teal">
          <Search size={22} />
        </div>
        <h1 className="mt-5 text-3xl font-semibold text-conecly-ink sm:text-4xl">Profile not found</h1>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-conecly-ink/62">
          This profile may have been removed, or the link may not match a public profile in the directory.
        </p>
      </div>
    </ProfileDetailShell>
  );
}

function ProfileInfoCard({ label, value, icon: Icon }) {
  return (
    <div className="rounded-lg border border-conecly-ink/10 bg-conecly-paper p-4">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase text-conecly-ink/48">
        <Icon size={16} className="text-conecly-emerald" />
        {label}
      </div>
      <p className="mt-2 break-words text-sm leading-6 text-conecly-ink/72">{value}</p>
    </div>
  );
}

function ProfileMetaLine({ value, icon: Icon }) {
  return (
    <div className="flex items-start gap-2">
      <Icon size={16} className="mt-0.5 shrink-0 text-conecly-emerald" />
      <p className="break-words">{value}</p>
    </div>
  );
}

function ProfileSkeletonGrid() {
  return (
    <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3" aria-label="Loading profiles">
      {[0, 1, 2, 3, 4, 5].map((item) => (
        <div key={item} className="rounded-lg border border-conecly-ink/10 bg-white p-5 shadow-line sm:p-6">
          <div className="animate-pulse">
            <div className="flex items-start justify-between gap-4">
              <div className="w-2/3">
                <div className="h-5 rounded bg-conecly-ink/10" />
                <div className="mt-3 h-4 w-3/4 rounded bg-conecly-ink/8" />
              </div>
              <div className="h-7 w-20 rounded bg-conecly-ink/8" />
            </div>
            <div className="mt-6 h-px bg-conecly-ink/8" />
            <div className="mt-5 h-4 w-20 rounded bg-conecly-ink/8" />
            <div className="mt-3 flex gap-2">
              <div className="h-8 w-28 rounded bg-conecly-mist" />
              <div className="h-8 w-20 rounded bg-conecly-amber/14" />
            </div>
            <div className="mt-6 space-y-3">
              <div className="h-4 rounded bg-conecly-ink/8" />
              <div className="h-4 rounded bg-conecly-ink/8" />
              <div className="h-4 w-2/3 rounded bg-conecly-ink/8" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyProfiles({ hasProfiles, onClear }) {
  return (
    <div className="mt-8 rounded-lg border border-conecly-ink/10 bg-white p-8 text-center text-conecly-ink shadow-line sm:p-10">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-conecly-mist text-conecly-teal">
        <Search size={22} />
      </div>
      <h2 className="mt-5 text-2xl font-semibold">{hasProfiles ? "No profiles match those filters yet" : "No public profiles yet"}</h2>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-conecly-ink/62">
        {hasProfiles
          ? "Try widening your search, choosing another Calgary area, or clearing the current filters."
          : "Create the first profile from the home page and it will appear here once Supabase allows public reads."}
      </p>
      {hasProfiles && (
        <button
          type="button"
          onClick={onClear}
          className="mt-6 inline-flex items-center justify-center rounded-lg bg-conecly-forest px-5 py-3 text-sm font-semibold text-white transition hover:bg-conecly-teal"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}

function FilterSelect({ label, value, onChange, options }) {
  return (
    <label className="grid gap-2 text-xs font-semibold uppercase text-conecly-ink/58">
      {label}
      <select value={value} onChange={(event) => onChange(event.target.value)} className="form-field py-3 text-sm normal-case">
        <option value="">All</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function getAreaOptions(profiles) {
  const profileAreas = profiles
    .flatMap((profile) => [profile.city, profile.neighbourhood])
    .filter(Boolean);

  return [...new Set([...CALGARY_AREAS, ...profileAreas])].sort((a, b) => a.localeCompare(b));
}

function mapProfile(profile) {
  return {
    id: profile.id,
    firstName: profile.first_name || profile.firstName || profile.name || "Neighbour",
    city: profile.city || profile.location || profile.area || "Nearby",
    neighbourhood: profile.neighbourhood || "",
    participationType: profile.participation_type || profile.intent || profile.type || "Offer help",
    serviceCategory: profile.service_category || profile.category || "Local help",
    bio: profile.bio || profile.description || "A local CONECLY profile shared by someone nearby.",
    availability: profile.availability || "",
    rate: profile.rate || "",
    contactMethod: profile.contact_method || "Contact",
    contactDetails: profile.contact_details || profile.contact_value || profile.email || profile.phone || "",
    photoUrl: profile.photo_url || profile.photoUrl || profile.image_url || profile.avatar_url || "",
  };
}

function getProfileIdFromPath() {
  const [, id] = window.location.pathname.match(/^\/profiles\/([^/?#]+)/) ?? [];

  return id ? decodeURIComponent(id) : "";
}

function getParticipationGroup(value = "") {
  const normalized = value.toLowerCase();

  if (normalized.includes("both")) {
    return "Both";
  }

  if (normalized.includes("need") || normalized.includes("request")) {
    return "Need help";
  }

  return "Offer help";
}

function getParticipationClass(participation) {
  const base = "shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold uppercase";

  if (participation === "Need help") {
    return `${base} bg-conecly-amber/18 text-conecly-ink`;
  }

  if (participation === "Both") {
    return `${base} bg-conecly-lilac/16 text-conecly-ink`;
  }

  return `${base} bg-conecly-mist text-conecly-teal`;
}

function formatSupabaseReadError(error) {
  if (!error) {
    return "Supabase profile read failed without a message. Check the browser console for the raw response.";
  }

  const parts = [error.message, error.details, error.hint, error.code].filter(Boolean);
  const message = parts.length
    ? `Supabase profile read failed: ${parts.join(" | ")}`
    : "Supabase profile read failed without a message. Check the browser console for the raw response.";

  return `${message}. Check that the profiles table has a public anon SELECT policy and that saved rows use the current profile field names: first_name, city, participation_type, service_category, bio, availability, rate, contact_method, contact_details.`;
}

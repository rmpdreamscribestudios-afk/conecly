import {
  AlertCircle,
  Clock3,
  Mail,
  MapPin,
  Phone,
  RefreshCw,
  Search,
  SlidersHorizontal,
  Sparkles,
  Tag,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { serviceCategories } from "../data";
import { isSupabaseConfigured, supabase, supabaseDiagnostics } from "../lib/supabase";

const PARTICIPATION_FILTERS = ["Offer help", "Need help", "Both"];

export default function Profiles({ headingLevel = "h1" }) {
  const [profiles, setProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    participation: "",
    city: "",
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
    const cityQuery = filters.city.trim().toLowerCase();

    return profiles.filter((profile) => {
      const categoryMatches = !filters.category || profile.serviceCategory === filters.category;
      const participationMatches =
        !filters.participation || getParticipationGroup(profile.participationType) === filters.participation;
      const cityMatches =
        !cityQuery ||
        `${profile.city} ${profile.neighbourhood}`.toLowerCase().includes(cityQuery);

      return categoryMatches && participationMatches && cityMatches;
    });
  }, [filters, profiles]);

  function updateFilter(name, value) {
    setFilters((current) => ({ ...current, [name]: value }));
  }

  const Heading = headingLevel;

  return (
    <section id="profiles" className="bg-conecly-paper px-5 py-12 sm:px-8 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 border-b border-conecly-ink/10 pb-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <p className="eyebrow">Profiles</p>
            <Heading className="mt-4 max-w-4xl text-[2.5rem] font-semibold leading-[1.02] text-conecly-ink sm:text-6xl">
              Browse CONECLY profiles.
            </Heading>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-conecly-ink/66">
              Real submitted profiles from people offering help, asking for support, or doing both nearby.
            </p>
          </div>

          <div className="rounded-lg border border-conecly-ink/10 bg-white p-4 shadow-line">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-conecly-ink">
                <SlidersHorizontal size={17} className="text-conecly-emerald" />
                Filter profiles
              </div>
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

            <div className="grid gap-3 sm:grid-cols-3">
              <FilterSelect
                label="Category"
                value={filters.category}
                onChange={(value) => updateFilter("category", value)}
                options={serviceCategories}
              />
              <FilterSelect
                label="Type"
                value={filters.participation}
                onChange={(value) => updateFilter("participation", value)}
                options={PARTICIPATION_FILTERS}
              />
              <label className="grid gap-2 text-xs font-semibold uppercase text-conecly-ink/58">
                City
                <div className="relative">
                  <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-conecly-ink/35" />
                  <input
                    value={filters.city}
                    onChange={(event) => updateFilter("city", event.target.value)}
                    placeholder="Any city"
                    className="form-field py-3 pl-9 text-sm normal-case"
                  />
                </div>
              </label>
            </div>
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

        {isLoading && (
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3" aria-label="Loading profiles">
            {[0, 1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="h-72 animate-pulse rounded-lg border border-conecly-ink/10 bg-white shadow-line" />
            ))}
          </div>
        )}

        {!isLoading && !errorMessage && filteredProfiles.length === 0 && (
          <div className="mt-10 rounded-lg border border-conecly-ink/10 bg-white p-6 text-conecly-ink shadow-line">
            <p className="font-semibold">{profiles.length ? "No profiles match those filters yet." : "No public profiles yet."}</p>
            <p className="mt-2 text-sm leading-6 text-conecly-ink/60">
              {profiles.length
                ? "Try a different category, city, or participation type."
                : "Create the first profile from the home page and it will appear here once Supabase allows public reads."}
            </p>
          </div>
        )}

        {!isLoading && !errorMessage && filteredProfiles.length > 0 && (
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredProfiles.map((profile) => (
              <ProfileCard key={profile.id ?? `${profile.firstName}-${profile.city}-${profile.contactDetails}`} profile={profile} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ProfileCard({ profile }) {
  const participation = getParticipationGroup(profile.participationType);
  const ContactIcon = profile.contactMethod.toLowerCase().includes("phone") ? Phone : Mail;

  return (
    <article className="premium-card flex h-full flex-col p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 className="text-xl font-semibold text-conecly-ink">{profile.firstName}</h2>
          <p className="mt-2 flex items-center gap-2 text-sm font-medium text-conecly-ink/58">
            <MapPin size={16} className="shrink-0 text-conecly-clay" />
            <span className="truncate">{[profile.city, profile.neighbourhood].filter(Boolean).join(" / ")}</span>
          </p>
        </div>
        <span className={getParticipationClass(participation)}>{participation}</span>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-lg bg-conecly-mist px-3 py-1.5 text-xs font-semibold text-conecly-teal">
          <Tag size={14} />
          {profile.serviceCategory}
        </span>
        {profile.rate && (
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-conecly-amber/16 px-3 py-1.5 text-xs font-semibold text-conecly-ink">
            <Sparkles size={14} />
            {profile.rate}
          </span>
        )}
      </div>

      <p className="mt-5 flex-1 leading-7 text-conecly-ink/66">{profile.bio}</p>

      <dl className="mt-6 grid gap-3 border-t border-conecly-ink/10 pt-5 text-sm text-conecly-ink/68">
        <ProfileDetail label="Participation type" value={profile.participationType || participation} />
        <ProfileDetail label="Service category" value={profile.serviceCategory} />
        <ProfileDetail label="Availability" value={profile.availability || "Ask directly"} icon={Clock3} />
        <ProfileDetail label="Rate" value={profile.rate || "Not listed"} />
        <ProfileDetail label="Contact method" value={profile.contactMethod || "Contact"} icon={ContactIcon} />
        <ProfileDetail label="Contact details" value={profile.contactDetails || "Shared on request"} />
      </dl>
    </article>
  );
}

function ProfileDetail({ label, value, icon: Icon }) {
  return (
    <div className="flex items-start gap-2">
      {Icon && <Icon size={16} className="mt-0.5 shrink-0 text-conecly-emerald" />}
      {!Icon && <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-conecly-emerald/70" />}
      <div>
        <dt className="font-semibold text-conecly-ink">{label}</dt>
        <dd className="mt-0.5 break-words">{value}</dd>
      </div>
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
  };
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

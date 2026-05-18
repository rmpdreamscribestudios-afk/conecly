import { Clock3, Image as ImageIcon, Mail, MapPin, Phone, SlidersHorizontal, Sparkles, Tag } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import SectionHeader from "../components/SectionHeader";
import { sampleProfiles, serviceCategories } from "../data";
import { supabase } from "../lib/supabase";

const PARTICIPATION_FILTERS = ["Offer help", "Need help", "Both"];

export default function LocalOpportunities() {
  const [profiles, setProfiles] = useState(sampleProfiles);
  const [isLoading, setIsLoading] = useState(Boolean(supabase));
  const [errorMessage, setErrorMessage] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    participation: "",
    city: "",
  });

  useEffect(() => {
    let isMounted = true;

    async function loadProfiles() {
      if (!supabase) {
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(36);

      if (!isMounted) {
        return;
      }

      if (error) {
        console.error("Unable to load public profiles", error);
        setErrorMessage("Profiles are not available right now, so we are showing sample local profiles.");
        setIsLoading(false);
        return;
      }

      if (data?.length) {
        setProfiles(data.map(mapProfile));
      } else {
        setProfiles([]);
      }

      setIsLoading(false);
    }

    loadProfiles();

    return () => {
      isMounted = false;
    };
  }, []);

  const cityOptions = useMemo(() => {
    return [...new Set(profiles.map((profile) => profile.city).filter(Boolean))].sort((a, b) =>
      a.localeCompare(b),
    );
  }, [profiles]);

  const filteredProfiles = useMemo(() => {
    return profiles.filter((profile) => {
      const categoryMatches = !filters.category || profile.serviceCategory === filters.category;
      const cityMatches = !filters.city || profile.city === filters.city;
      const participationMatches =
        !filters.participation || getParticipationGroup(profile.participationType) === filters.participation;

      return categoryMatches && cityMatches && participationMatches;
    });
  }, [filters, profiles]);

  function updateFilter(name, value) {
    setFilters((current) => ({ ...current, [name]: value }));
  }

  return (
    <section id="browse-profiles" className="section-frame section-pad bg-conecly-paper">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-end">
          <SectionHeader
            eyebrow="Browse local profiles"
            title="Local people near you."
            text="Explore public CONECLY profiles from neighbours offering help, looking for support, or doing both."
          />

          <div className="rounded-lg border border-conecly-ink/10 bg-white p-4 shadow-line">
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-conecly-ink">
              <SlidersHorizontal size={17} className="text-conecly-emerald" />
              Filter profiles
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
              <FilterSelect
                label="City"
                value={filters.city}
                onChange={(value) => updateFilter("city", value)}
                options={cityOptions}
              />
            </div>
          </div>
        </div>

        {isLoading && <p className="mt-8 text-sm font-medium text-conecly-ink/56">Loading local profiles...</p>}

        {errorMessage && (
          <p className="mt-8 rounded-lg border border-conecly-clay/25 bg-white px-4 py-3 text-sm font-medium leading-6 text-conecly-ink">
            {errorMessage}
          </p>
        )}

        {!isLoading && filteredProfiles.length === 0 && (
          <div className="mt-10 rounded-lg border border-conecly-ink/10 bg-white p-6 text-conecly-ink shadow-line">
            <p className="font-semibold">No profiles match those filters yet.</p>
            <p className="mt-2 text-sm leading-6 text-conecly-ink/60">
              Try a different category, type, or city, or create a profile to help the local map fill in.
            </p>
          </div>
        )}

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredProfiles.map((profile) => (
            <ProfileCard key={profile.id ?? `${profile.firstName}-${profile.city}-${profile.serviceCategory}`} profile={profile} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProfileCard({ profile }) {
  const participation = getParticipationGroup(profile.participationType);
  const contactIcon = profile.contactMethod.toLowerCase().includes("phone") ? Phone : Mail;
  const ContactIcon = contactIcon;

  return (
    <article className="premium-card flex h-full flex-col p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 gap-3">
          <ProfilePhoto src={profile.photoUrl} name={profile.firstName} />
          <div className="min-w-0">
            <h3 className="truncate text-xl font-semibold text-conecly-ink">{profile.firstName}</h3>
            <p className="mt-2 flex items-center gap-2 text-sm font-medium text-conecly-ink/58">
              <MapPin size={16} className="shrink-0 text-conecly-clay" />
              <span className="truncate">{profile.city}</span>
            </p>
          </div>
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

      <div className="mt-6 grid gap-3 border-t border-conecly-ink/10 pt-5 text-sm text-conecly-ink/68">
        <p className="flex items-start gap-2">
          <Clock3 size={16} className="mt-0.5 shrink-0 text-conecly-emerald" />
          <span>
            <strong className="font-semibold text-conecly-ink">Availability:</strong>{" "}
            {profile.availability || "Ask directly"}
          </span>
        </p>
        <p className="flex items-start gap-2">
          <ContactIcon size={16} className="mt-0.5 shrink-0 text-conecly-emerald" />
          <span>
            <strong className="font-semibold text-conecly-ink">{profile.contactMethod || "Contact"}:</strong>{" "}
            {profile.contactDetails || "Shared on request"}
          </span>
        </p>
      </div>
    </article>
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
    city: profile.city || profile.neighbourhood || profile.location || profile.area || "Nearby",
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

function ProfilePhoto({ src, name }) {
  if (src) {
    return <img src={src} alt={name ? `${name} profile` : ""} className="h-12 w-12 shrink-0 rounded-lg object-cover" loading="lazy" />;
  }

  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-conecly-mist text-conecly-teal">
      <ImageIcon size={20} />
    </div>
  );
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

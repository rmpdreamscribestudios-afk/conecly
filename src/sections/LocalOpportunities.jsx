import { ArrowRight, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import SectionHeader from "../components/SectionHeader";
import { sampleProfiles } from "../data";
import { supabase } from "../lib/supabase";

export default function LocalOpportunities() {
  const [profiles, setProfiles] = useState(sampleProfiles);
  const [isLoading, setIsLoading] = useState(Boolean(supabase));

  useEffect(() => {
    let isMounted = true;

    async function loadOpportunities() {
      if (!supabase) {
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("opportunities")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(6);

      if (!isMounted) {
        return;
      }

      if (error) {
        console.error("Unable to load local opportunities", error);
        setIsLoading(false);
        return;
      }

      if (data?.length) {
        setProfiles(data.map(mapOpportunityToProfile));
      }

      setIsLoading(false);
    }

    loadOpportunities();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section id="opportunities" className="section-frame section-pad bg-conecly-paper">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          eyebrow="Local opportunities"
          title="Nearby offers and requests, all in one place."
          text="Browse simple profiles from people offering practical help or asking for a hand in the neighbourhood."
        />
        {isLoading && (
          <p className="mt-8 text-sm font-medium text-conecly-ink/56">Loading local opportunities...</p>
        )}
        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {profiles.map((profile) => (
            <article key={profile.id ?? `${profile.name}-${profile.category}`} className="premium-card flex h-full flex-col p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-conecly-ink">{profile.name}</h3>
                  <p className="mt-1 text-sm font-medium text-conecly-emerald">{profile.category}</p>
                </div>
                <span
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold uppercase ${
                    profile.type === "Offer"
                      ? "bg-conecly-mist text-conecly-teal"
                      : "bg-conecly-amber/18 text-conecly-ink"
                  }`}
                >
                  {profile.type}
                </span>
              </div>
              <div className="mt-5 flex items-center gap-2 text-sm font-medium text-conecly-ink/58">
                <MapPin size={16} className="shrink-0 text-conecly-clay" />
                <span>{profile.area}</span>
              </div>
              <p className="mt-4 flex-1 leading-7 text-conecly-ink/64">{profile.text}</p>
              <a
                href="#create-profile"
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg border border-conecly-ink/12 bg-white px-4 py-3 text-sm font-semibold text-conecly-ink transition hover:border-conecly-teal/30 hover:text-conecly-teal"
              >
                {profile.contact}
                <ArrowRight size={16} />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function mapOpportunityToProfile(opportunity) {
  const name = opportunity.first_name || opportunity.name || "Neighbour";
  const type = getDisplayType(opportunity.type || opportunity.intent);
  const contactVerb = opportunity.contact_method === "Email" ? "Email" : "Contact";

  return {
    id: opportunity.id,
    name,
    category: opportunity.category || "Local help",
    area: opportunity.location || opportunity.area || opportunity.city || "Nearby",
    type,
    text: opportunity.description || opportunity.bio || "A local offer or request shared by a CONECLY neighbour.",
    contact: `${contactVerb} ${name}`,
  };
}

function getDisplayType(value = "") {
  if (value.toLowerCase().includes("request")) {
    return "Request";
  }

  return "Offer";
}

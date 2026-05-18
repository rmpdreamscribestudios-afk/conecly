import { ArrowRight, Camera, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { serviceCategories } from "../data";
import { getSupabaseClient, isSupabaseConfigured, supabaseDiagnostics } from "../lib/supabase";

const PROFILE_INTENTS = [
  ["Offer help", "I want to Offer help/services"],
  ["Need help", "I need to Request local help"],
  ["Both", "Both offering and requesting help"],
];

const CONTACT_METHODS = [
  ["Email", "Email"],
  ["Phone", "Phone Call"],
  ["Text message", "Text Message"],
];

export default function CreateProfile() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const category = formData.get("category") ?? "";
    const profile = {
      first_name: formData.get("firstName")?.trim() ?? "",
      location: formData.get("location")?.trim() ?? "",
      intent: formData.get("intent") ?? "",
      bio: formData.get("bio")?.trim() ?? "",
      contact_method: formData.get("contactMethod") ?? "",
      contact_value: formData.get("contactValue")?.trim() ?? "",
      availability: formData.get("availability")?.trim() ?? "",
      rate: formData.get("rate")?.trim() ?? "",
      photo_link: formData.get("photoLink")?.trim() ?? "",
    };

    const opportunity = {
      first_name: profile.first_name,
      location: profile.location,
      intent: profile.intent,
      type: getOpportunityType(profile.intent),
      category,
      description: profile.bio,
      contact_method: profile.contact_method,
      contact_value: profile.contact_value,
      availability: profile.availability,
      rate: profile.rate,
      photo_link: profile.photo_link,
    };

    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");
    setSubmitted(false);

    if (!isSupabaseConfigured) {
      const message =
        "Supabase is missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in the browser build.";
      console.error("[CreateProfile] Missing Supabase env vars", supabaseDiagnostics);
      setErrorMessage(message);
      setIsSubmitting(false);
      return;
    }

    try {
      const supabase = getSupabaseClient();
      console.log("[CreateProfile] Submitting profile payload to Supabase profiles table", {
        table: "profiles",
        role: "anon",
        env: supabaseDiagnostics,
        payload: profile,
      });

      const profileResponse = await supabase.from("profiles").insert(profile);
      console.log("[CreateProfile] Supabase profiles insert response", profileResponse);

      const { error: profileError } = profileResponse;

      if (profileError) {
        throw profileError;
      }

      const opportunityResponse = await supabase.from("opportunities").insert(opportunity);
      console.log("[CreateProfile] Supabase opportunities insert response", opportunityResponse);

      const { error: opportunityError } = opportunityResponse;

      if (opportunityError) {
        throw opportunityError;
      }

      setSubmitted(true);
      setSuccessMessage("Your profile was written to Supabase successfully.");
      form.reset();
    } catch (error) {
      const visibleError = formatSupabaseError(error);
      console.error("[CreateProfile] Unable to submit profile form", {
        error,
        message: visibleError,
      });
      setErrorMessage(visibleError);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="create-profile" className="section-frame bg-white px-5 py-20 sm:px-8 sm:py-28 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <p className="eyebrow">Create your profile</p>
          <h2 className="mt-4 text-[2rem] font-semibold leading-[1.08] text-conecly-ink sm:text-5xl">
            Share what you can offer, or what you need nearby.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-conecly-ink/64">
            Make a simple public profile so neighbours can understand what you do, what you need, and how to reach you.
          </p>
          <div className="mt-8 rounded-lg border border-conecly-ink/10 bg-conecly-paper p-5 shadow-line">
            <p className="text-sm font-semibold text-conecly-ink">Community profile</p>
            <p className="mt-2 text-sm leading-6 text-conecly-ink/62">
              A few honest details help people feel comfortable reaching out.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="premium-card grid gap-5 p-5 sm:grid-cols-2 sm:p-7">
          <Field label="First name" name="firstName" required placeholder="Maya" />
          <Field label="City / neighbourhood" name="location" required placeholder="Parkdale" />

          <label className="grid gap-2 text-sm font-semibold text-conecly-ink">
            I am here to
            <select name="intent" required className="form-field">
              <option value="">Choose one</option>
              {PROFILE_INTENTS.map(([label, value]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2 text-sm font-semibold text-conecly-ink">
            Service category
            <select name="category" required className="form-field">
              <option value="">Choose a category</option>
              {serviceCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2 text-sm font-semibold text-conecly-ink sm:col-span-2">
            Short bio
            <textarea
              name="bio"
              required
              rows={4}
              placeholder="Tell neighbours what you offer, what you need, or what makes a good fit."
              className="form-field resize-none"
            />
          </label>

          <label className="grid gap-2 text-sm font-semibold text-conecly-ink">
            Contact method
            <select name="contactMethod" required className="form-field">
              <option value="">Choose one</option>
              {CONTACT_METHODS.map(([label, value]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>

          <Field label="Contact detail" name="contactValue" required placeholder="you@example.com or phone number" />
          <Field label="Availability" name="availability" placeholder="Weekends, evenings, flexible" />
          <Field label="Rate or price" name="rate" placeholder="$25/hr, free, barter, negotiable" />

          <div className="sm:col-span-2">
            <div className="flex items-center gap-4 rounded-lg border border-dashed border-conecly-ink/18 bg-conecly-paper px-4 py-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white text-conecly-teal shadow-line">
                <Camera size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold text-conecly-ink">Photo coming soon</p>
                <p className="mt-1 text-sm leading-5 text-conecly-ink/56">For now, you can add an optional photo link below.</p>
              </div>
            </div>
          </div>

          <label className="grid gap-2 text-sm font-semibold text-conecly-ink sm:col-span-2">
            Photo link
            <input
              name="photoLink"
              type="url"
              placeholder="Optional link to a professional or service-related photo"
              className="form-field"
            />
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-conecly-forest px-6 py-4 font-semibold text-white shadow-soft transition hover:bg-conecly-teal sm:col-span-2"
          >
            {isSubmitting ? "Creating profile..." : "Create profile"}
            <ArrowRight size={17} />
          </button>

          {(submitted || successMessage) && (
            <p className="flex items-start gap-2 rounded-lg bg-conecly-mist px-4 py-3 text-sm font-medium leading-6 text-conecly-teal sm:col-span-2">
              <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
              {successMessage || "Your profile has been submitted. Thank you for helping shape CONECLY in your community."}
            </p>
          )}

          {errorMessage && (
            <p className="rounded-lg border border-conecly-clay/25 bg-conecly-clay/10 px-4 py-3 text-sm font-medium leading-6 text-conecly-ink sm:col-span-2">
              {errorMessage}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

function getOpportunityType(intent) {
  if (intent?.toLowerCase().includes("request")) {
    return "Request";
  }

  return "Offer";
}

function formatSupabaseError(error) {
  if (!error) {
    return "Supabase returned an unknown error. Check the browser console for the raw insert response.";
  }

  const parts = [error.message, error.details, error.hint, error.code].filter(Boolean);

  if (parts.length === 0) {
    return "Supabase returned an error without a message. Check the browser console for the raw insert response.";
  }

  return `Supabase error: ${parts.join(" | ")}`;
}

function Field({ label, name, required = false, placeholder }) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-conecly-ink">
      {label}
      <input name={name} required={required} placeholder={placeholder} className="form-field" />
    </label>
  );
}

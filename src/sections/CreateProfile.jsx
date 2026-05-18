import { ArrowRight, Camera, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { serviceCategories } from "../data";

const PROFILE_FORM_ACTION = "ADD_PROFILE_GOOGLE_FORM_ACTION_URL_HERE";
const PROFILE_ENTRY_IDS = {
  firstName: "entry.ADD_FIRST_NAME_ID",
  location: "entry.ADD_CITY_NEIGHBOURHOOD_ID",
  intent: "entry.ADD_INTENT_ID",
  category: "entry.ADD_SERVICE_CATEGORY_ID",
  bio: "entry.ADD_SHORT_BIO_ID",
  contactMethod: "entry.ADD_CONTACT_METHOD_ID",
  contactValue: "entry.ADD_CONTACT_VALUE_ID",
  availability: "entry.ADD_AVAILABILITY_ID",
  rate: "entry.ADD_RATE_OR_PRICE_ID",
};

const isProfileFormReady = !PROFILE_FORM_ACTION.includes("ADD_PROFILE");

export default function CreateProfile() {
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!isProfileFormReady) {
      setSubmitted(true);
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const googleFormData = new URLSearchParams();

    Object.entries(PROFILE_ENTRY_IDS).forEach(([fieldName, entryId]) => {
      googleFormData.append(entryId, formData.get(fieldName) ?? "");
    });

    try {
      await fetch(PROFILE_FORM_ACTION, {
        method: "POST",
        mode: "no-cors",
        body: googleFormData,
      });

      setSubmitted(true);
      form.reset();
    } catch (error) {
      console.error("Unable to submit profile form", error);
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
            This MVP keeps participation simple: a public profile, one clear category, and a contact method people can use outside CONECLY.
          </p>
          <div className="mt-8 rounded-lg border border-conecly-ink/10 bg-conecly-paper p-5 shadow-line">
            <p className="text-sm font-semibold text-conecly-ink">Google Form setup needed</p>
            <p className="mt-2 text-sm leading-6 text-conecly-ink/62">
              Replace <span className="font-semibold text-conecly-ink">PROFILE_FORM_ACTION</span> and each{" "}
              <span className="font-semibold text-conecly-ink">PROFILE_ENTRY_IDS</span> value in this section once the profile Google Form is created.
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
              <option>Offer help</option>
              <option>Need help</option>
              <option>Both</option>
            </select>
          </label>

          <label className="grid gap-2 text-sm font-semibold text-conecly-ink">
            Service category
            <select name="category" required className="form-field">
              <option value="">Choose a category</option>
              {serviceCategories.map((category) => (
                <option key={category}>{category}</option>
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
              <option>Email</option>
              <option>Phone</option>
              <option>Instagram</option>
            </select>
          </label>

          <Field label="Contact detail" name="contactValue" required placeholder="you@example.com, phone, or @handle" />
          <Field label="Availability" name="availability" placeholder="Weekends, evenings, flexible" />
          <Field label="Rate or price" name="rate" placeholder="$25/hr, free, barter, negotiable" />

          <div className="sm:col-span-2">
            <div className="flex items-center gap-4 rounded-lg border border-dashed border-conecly-ink/18 bg-conecly-paper px-4 py-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white text-conecly-teal shadow-line">
                <Camera size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold text-conecly-ink">Photo upload placeholder</p>
                <p className="mt-1 text-sm leading-5 text-conecly-ink/56">Image uploads are not active in this MVP.</p>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-conecly-forest px-6 py-4 font-semibold text-white shadow-soft transition hover:bg-conecly-teal sm:col-span-2"
          >
            Create profile
            <ArrowRight size={17} />
          </button>

          {submitted && (
            <p className="flex items-start gap-2 rounded-lg bg-conecly-mist px-4 py-3 text-sm font-medium leading-6 text-conecly-teal sm:col-span-2">
              <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
              Profile form is ready visually. Add the Google Form action URL and entry IDs to start storing submissions.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

function Field({ label, name, required = false, placeholder }) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-conecly-ink">
      {label}
      <input name={name} required={required} placeholder={placeholder} className="form-field" />
    </label>
  );
}

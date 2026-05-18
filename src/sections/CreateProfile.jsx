import { ArrowRight, Camera, CheckCircle2, ImageUp, LoaderCircle, Trash2, Upload } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { serviceCategories } from "../data";
import { getSupabaseClient, isSupabaseConfigured, supabaseDiagnostics } from "../lib/supabase";

const PROFILE_PHOTO_BUCKET = "profile-photos";
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_ORIGINAL_IMAGE_BYTES = 8 * 1024 * 1024;
const MAX_IMAGE_EDGE = 1200;
const JPEG_QUALITY = 0.82;

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
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState("");
  const [photoStatus, setPhotoStatus] = useState("idle");
  const [photoMessage, setPhotoMessage] = useState("");
  const galleryInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  useEffect(() => {
    return () => {
      if (photoPreviewUrl) {
        URL.revokeObjectURL(photoPreviewUrl);
      }
    };
  }, [photoPreviewUrl]);

  function handlePhotoChange(event) {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) {
      return;
    }

    const validationError = validateImageFile(file);

    if (validationError) {
      clearPhoto();
      setPhotoStatus("failed");
      setPhotoMessage(validationError);
      return;
    }

    const nextPreviewUrl = URL.createObjectURL(file);

    if (photoPreviewUrl) {
      URL.revokeObjectURL(photoPreviewUrl);
    }

    setPhotoFile(file);
    setPhotoPreviewUrl(nextPreviewUrl);
    setPhotoStatus("ready");
    setPhotoMessage("Photo ready to upload.");
  }

  function clearPhoto() {
    if (photoPreviewUrl) {
      URL.revokeObjectURL(photoPreviewUrl);
    }

    setPhotoFile(null);
    setPhotoPreviewUrl("");
    setPhotoStatus("idle");
    setPhotoMessage("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const profile = {
      first_name: formData.get("firstName")?.trim() ?? "",
      city: formData.get("city")?.trim() ?? "",
      participation_type: formData.get("participationType") ?? "",
      service_category: formData.get("serviceCategory") ?? "",
      bio: formData.get("bio")?.trim() ?? "",
      contact_method: formData.get("contactMethod") ?? "",
      contact_details: formData.get("contactDetails")?.trim() ?? "",
      availability: formData.get("availability")?.trim() ?? "",
      rate: formData.get("rate")?.trim() ?? "",
      photo_url: "",
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
      let uploadedPhotoUrl = "";

      if (photoFile) {
        setPhotoStatus("uploading");
        setPhotoMessage("Uploading photo...");
        try {
          uploadedPhotoUrl = await uploadProfilePhoto(supabase, photoFile);
          setPhotoStatus("success");
          setPhotoMessage("Photo uploaded.");
        } catch (photoError) {
          console.error("[CreateProfile] Profile photo upload failed; submitting profile without a photo", photoError);
          setPhotoStatus("failed");
          setPhotoMessage("Photo upload failed, so your profile will be saved without a photo.");
        }
      }

      const profileWithPhoto = {
        ...profile,
        photo_url: uploadedPhotoUrl,
      };

      const { error: profileError } = await supabase.from("profiles").insert(profileWithPhoto);

      if (profileError) {
        throw profileError;
      }

      setSubmitted(true);
      setSuccessMessage(
        photoFile && !uploadedPhotoUrl
          ? "Your profile was saved, but the photo upload failed. You can try again later with another photo."
          : "Your profile was written to Supabase successfully.",
      );
      window.dispatchEvent(new CustomEvent("conecly:profile-created"));
      form.reset();
      clearPhoto();
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
          <Field label="City / neighbourhood" name="city" required placeholder="Parkdale" />

          <label className="grid gap-2 text-sm font-semibold text-conecly-ink">
            I am here to
            <select name="participationType" required className="form-field">
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
            <select name="serviceCategory" required className="form-field">
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

          <Field label="Contact details" name="contactDetails" required placeholder="you@example.com or phone number" />
          <Field label="Availability" name="availability" placeholder="Weekends, evenings, flexible" />
          <Field label="Rate or price" name="rate" placeholder="$25/hr, free, barter, negotiable" />

          <div className="grid gap-3 sm:col-span-2">
            <div className="rounded-lg border border-conecly-ink/10 bg-conecly-paper p-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white text-conecly-teal shadow-line">
                  {photoPreviewUrl ? (
                    <img src={photoPreviewUrl} alt="Selected profile preview" className="h-full w-full object-cover" />
                  ) : (
                    <ImageUp size={28} />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-conecly-ink">Profile photo</p>
                  <p className="mt-1 text-sm leading-6 text-conecly-ink/58">
                    Optional. Upload a clear image from your gallery or take a photo on your phone.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => galleryInputRef.current?.click()}
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-conecly-ink/10 bg-white px-4 py-2.5 text-sm font-semibold text-conecly-ink transition hover:border-conecly-teal/30 hover:text-conecly-teal"
                    >
                      <Upload size={15} />
                      Upload photo
                    </button>
                    <button
                      type="button"
                      onClick={() => cameraInputRef.current?.click()}
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-conecly-ink/10 bg-white px-4 py-2.5 text-sm font-semibold text-conecly-ink transition hover:border-conecly-teal/30 hover:text-conecly-teal"
                    >
                      <Camera size={15} />
                      Take photo
                    </button>
                    {photoFile && (
                      <button
                        type="button"
                        onClick={clearPhoto}
                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-conecly-ink/10 bg-white px-4 py-2.5 text-sm font-semibold text-conecly-ink/68 transition hover:border-conecly-clay/30 hover:text-conecly-clay"
                      >
                        <Trash2 size={15} />
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <input
                ref={galleryInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handlePhotoChange}
                className="sr-only"
              />
              <input
                ref={cameraInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                capture="user"
                onChange={handlePhotoChange}
                className="sr-only"
              />
              <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-conecly-ink/58">
                {photoStatus === "uploading" && <LoaderCircle size={14} className="animate-spin text-conecly-teal" />}
                {photoStatus === "success" && <CheckCircle2 size={14} className="text-conecly-teal" />}
                <span>
                  {photoMessage ||
                    "JPEG, PNG, or WebP. Large photos are resized before upload, and files over 8 MB are blocked."}
                </span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || photoStatus === "uploading"}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-conecly-forest px-6 py-4 font-semibold text-white shadow-soft transition hover:bg-conecly-teal disabled:cursor-not-allowed disabled:opacity-65 sm:col-span-2"
          >
            {photoStatus === "uploading" ? "Uploading photo..." : isSubmitting ? "Creating profile..." : "Create profile"}
            <ArrowRight size={17} />
          </button>

          {(submitted || successMessage) && (
            <div className="flex flex-col gap-3 rounded-lg bg-conecly-mist px-4 py-3 text-sm font-medium leading-6 text-conecly-teal sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="flex items-start gap-2">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
                <span>
                  {successMessage || "Your profile has been submitted. Thank you for helping shape CONECLY in your community."}
                </span>
              </p>
              <a
                href="#profiles"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-conecly-ink shadow-line transition hover:text-conecly-teal"
              >
                View Profiles
                <ArrowRight size={15} />
              </a>
            </div>
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

function validateImageFile(file) {
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    return "Please choose a JPEG, PNG, or WebP image.";
  }

  if (file.size > MAX_ORIGINAL_IMAGE_BYTES) {
    return "Please choose an image smaller than 8 MB.";
  }

  return "";
}

async function uploadProfilePhoto(supabase, file) {
  const image = await prepareProfilePhoto(file);
  const extension = image.type === "image/png" ? "png" : "jpg";
  const safeId = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const filePath = `public/${safeId}.${extension}`;
  const { error: uploadError } = await supabase.storage.from(PROFILE_PHOTO_BUCKET).upload(filePath, image, {
    cacheControl: "31536000",
    contentType: image.type,
    upsert: false,
  });

  if (uploadError) {
    throw uploadError;
  }

  const { data } = supabase.storage.from(PROFILE_PHOTO_BUCKET).getPublicUrl(filePath);

  return data.publicUrl;
}

async function prepareProfilePhoto(file) {
  const image = await loadImage(file);
  const scale = Math.min(1, MAX_IMAGE_EDGE / Math.max(image.width, image.height));
  const width = Math.round(image.width * scale);
  const height = Math.round(image.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");
  context.drawImage(image.source, 0, 0, width, height);
  image.close?.();

  const outputType = file.type === "image/png" ? "image/png" : "image/jpeg";
  const blob = await new Promise((resolve, reject) => {
    canvas.toBlob(
      (result) => {
        if (result) {
          resolve(result);
        } else {
          reject(new Error("Unable to process this image. Please try another photo."));
        }
      },
      outputType,
      outputType === "image/jpeg" ? JPEG_QUALITY : undefined,
    );
  });

  return blob.size < file.size || file.size > 1024 * 1024 ? blob : file;
}

async function loadImage(file) {
  if ("createImageBitmap" in window) {
    try {
      const bitmap = await createImageBitmap(file);
      return {
        source: bitmap,
        width: bitmap.width,
        height: bitmap.height,
        close: () => bitmap.close?.(),
      };
    } catch {
      // Fall back to HTMLImageElement for browsers or images that createImageBitmap cannot decode.
    }
  }

  const objectUrl = URL.createObjectURL(file);

  try {
    const imageElement = await new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error("Unable to read this image. Please try another photo."));
      img.src = objectUrl;
    });

    return {
      source: imageElement,
      width: imageElement.naturalWidth,
      height: imageElement.naturalHeight,
    };
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
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

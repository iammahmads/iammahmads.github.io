import React, { useState, useRef, useEffect } from "react";
import { validate, sendContact, type ContactInput } from "~/lib/contact";
import { site } from "~/content/site";

interface ContactFormProps {
  sourceTag?: string;
  onSuccess?: () => void;
}

export function ContactForm({ sourceTag, onSuccess }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactInput>({
    name: "",
    email: "",
    message: "",
  });
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<Partial<Record<keyof ContactInput, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [cooldown, setCooldown] = useState(false);

  const formLoadTime = useRef(Date.now());
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    try {
      const lastSent = sessionStorage.getItem("contact_last_sent");
      if (lastSent && Date.now() - parseInt(lastSent, 10) < 60_000) {
        setCooldown(true);
      }
    } catch {
      // Storage unavailable or disabled
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactInput]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Anti-spam checks: Honeypot & timing
    if (honeypot.trim().length > 0) {
      // Silently discard spam without posting
      setStatus("success");
      return;
    }

    const elapsed = Date.now() - formLoadTime.current;
    if (elapsed < 2000) {
      // Submission was suspiciously fast (likely a bot); pretend success
      setStatus("success");
      return;
    }

    if (cooldown) {
      setErrorMessage("Please wait a moment before sending another message.");
      setStatus("error");
      return;
    }

    // 2. Validate inputs
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus("idle");
      // Focus first invalid input
      if (validationErrors.name) {
        nameInputRef.current?.focus();
      } else if (validationErrors.email) {
        emailInputRef.current?.focus();
      } else if (validationErrors.message) {
        messageInputRef.current?.focus();
      }
      return;
    }

    // 3. Send
    setStatus("sending");
    setErrorMessage("");

    const messageWithTag = sourceTag
      ? `[${sourceTag}] ${formData.message.trim()}`
      : formData.message.trim();

    const result = await sendContact({
      name: formData.name,
      email: formData.email,
      message: messageWithTag,
    });

    if (result.ok) {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      try {
        sessionStorage.setItem("contact_last_sent", Date.now().toString());
        setCooldown(true);
      } catch {
        // ignore
      }
      onSuccess?.();
    } else {
      setStatus("error");
      if (result.reason === "timeout") {
        setErrorMessage(
          "The connection timed out. Your message is preserved below. Please try again, or email me directly."
        );
      } else {
        setErrorMessage(
          "Unable to send message right now. Your draft is preserved below. Please try again or reach out directly."
        );
      }
    }
  };

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="p-8 rounded-2xl bg-[#241346]/80 border border-[#3DF2E0]/40 text-center space-y-4"
      >
        <div className="w-12 h-12 rounded-full bg-[#3DF2E0]/20 text-[#3DF2E0] flex items-center justify-center mx-auto text-xl font-bold">
          ✓
        </div>
        <h3 className="text-xl font-bold text-[#F3F1FA] font-['Bricolage_Grotesque']">
          Message sent. Thank you.
        </h3>
        <p className="text-sm text-[#B9A7FF] max-w-md mx-auto">
          Your message has been submitted to my inbox. I will reply to{" "}
          <span className="text-[#3DF2E0] font-medium">{formData.email || "your address"}</span>{" "}
          promptly.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="text-xs text-[#3DF2E0] underline hover:text-white pt-2 cursor-pointer"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-6"
      aria-label="Contact Muhammad Ahmad Shahid"
    >
      {/* Honeypot field (hidden from screenreaders and keyboard users) */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="website_url_honeypot">Leave this empty</label>
        <input
          id="website_url_honeypot"
          type="text"
          name="website_url"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      {status === "error" && errorMessage && (
        <div
          role="alert"
          className="p-4 rounded-xl bg-red-950/40 border border-red-500/40 text-red-200 text-sm space-y-2"
        >
          <p>{errorMessage}</p>
          <p className="text-xs">
            Direct email:{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-[#3DF2E0] underline underline-offset-2 hover:text-white"
            >
              {site.email}
            </a>
          </p>
        </div>
      )}

      {/* Name Input */}
      <div className="space-y-2">
        <label
          htmlFor="contact_name"
          className="block text-sm font-medium text-[#F3F1FA]"
        >
          Your Name <span className="text-[#3DF2E0]">*</span>
        </label>
        <input
          ref={nameInputRef}
          id="contact_name"
          name="name"
          type="text"
          required
          maxLength={100}
          autoComplete="name"
          value={formData.name}
          onChange={handleChange}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "contact_name_error" : undefined}
          placeholder="e.g. Dr. Jane Doe / Sarah Khan"
          className={`w-full px-4 py-3 rounded-xl bg-[#241346]/50 border text-[#F3F1FA] placeholder-[#8E82A9] transition-colors focus:bg-[#241346] ${
            errors.name
              ? "border-red-400 focus:border-red-400"
              : "border-[#241346] focus:border-[#3DF2E0]"
          }`}
        />
        {errors.name && (
          <p id="contact_name_error" className="text-xs text-red-400">
            {errors.name}
          </p>
        )}
      </div>

      {/* Email Input */}
      <div className="space-y-2">
        <label
          htmlFor="contact_email"
          className="block text-sm font-medium text-[#F3F1FA]"
        >
          Your Email Address <span className="text-[#3DF2E0]">*</span>
        </label>
        <input
          ref={emailInputRef}
          id="contact_email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "contact_email_error" : undefined}
          placeholder="name@university.edu or name@company.com"
          className={`w-full px-4 py-3 rounded-xl bg-[#241346]/50 border text-[#F3F1FA] placeholder-[#8E82A9] transition-colors focus:bg-[#241346] ${
            errors.email
              ? "border-red-400 focus:border-red-400"
              : "border-[#241346] focus:border-[#3DF2E0]"
          }`}
        />
        {errors.email && (
          <p id="contact_email_error" className="text-xs text-red-400">
            {errors.email}
          </p>
        )}
      </div>

      {/* Message Input */}
      <div className="space-y-2">
        <label
          htmlFor="contact_message"
          className="block text-sm font-medium text-[#F3F1FA]"
        >
          Message <span className="text-[#3DF2E0]">*</span>
        </label>
        <textarea
          ref={messageInputRef}
          id="contact_message"
          name="message"
          required
          rows={5}
          maxLength={2000}
          value={formData.message}
          onChange={handleChange}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "contact_message_error" : undefined}
          placeholder="Write your inquiry, collaboration idea, or research details..."
          className={`w-full px-4 py-3 rounded-xl bg-[#241346]/50 border text-[#F3F1FA] placeholder-[#8E82A9] transition-colors focus:bg-[#241346] ${
            errors.message
              ? "border-red-400 focus:border-red-400"
              : "border-[#241346] focus:border-[#3DF2E0]"
          }`}
        />
        <div className="flex items-center justify-between text-xs">
          {errors.message ? (
            <p id="contact_message_error" className="text-red-400">
              {errors.message}
            </p>
          ) : (
            <span />
          )}
          <span className="text-[#8E82A9]">
            {formData.message.length}/2000
          </span>
        </div>
      </div>

      {/* Submit Button */}
      <div className="space-y-3">
        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#3DF2E0] text-[#170B2B] font-semibold hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(61,242,224,0.25)] cursor-pointer"
        >
          {status === "sending" ? "Sending message..." : "Send Message"}
        </button>

        <p className="text-xs text-[#8E82A9]">
          {site.contactForm.privacyNotice}
        </p>
      </div>
    </form>
  );
}


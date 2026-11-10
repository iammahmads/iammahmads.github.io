import { site } from "~/content/site";

export type ContactInput = { name: string; email: string; message: string };
export type ContactResult =
  | { ok: true }
  | { ok: false; reason: "invalid" | "timeout" | "network" };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TIMEOUT_MS = 10_000;

export function validate({ name, email, message }: ContactInput) {
  const errors: Partial<Record<keyof ContactInput, string>> = {};
  if (!name.trim() || name.trim().length > 100) {
    errors.name = "Enter your name (up to 100 characters).";
  }
  if (!EMAIL_RE.test(email.trim())) {
    errors.email = "Enter an email address I can reply to.";
  }
  const len = message.trim().length;
  if (len < 10 || len > 2000) {
    errors.message = "Write between 10 and 2000 characters.";
  }
  return errors;
}

export async function sendContact(input: ContactInput): Promise<ContactResult> {
  if (Object.keys(validate(input)).length > 0) return { ok: false, reason: "invalid" };

  const { actionUrl, entries } = site.contactForm;
  const body = new FormData();
  body.append(entries.name, input.name.trim());
  body.append(entries.email, input.email.trim());
  body.append(entries.message, input.message.trim());

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    // no-cors: the response is opaque, so "ok" only means the request left the browser.
    await fetch(actionUrl, { method: "POST", mode: "no-cors", body, signal: controller.signal });
    return { ok: true };
  } catch {
    return { ok: false, reason: controller.signal.aborted ? "timeout" : "network" };
  } finally {
    clearTimeout(timer);
  }
}


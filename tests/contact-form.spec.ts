import { describe, it, expect, vi } from "vitest";
import { sendContact } from "../app/lib/contact";
import { site } from "../app/content/site";

describe("sendContact transmission & payload verification", () => {
  it("submits the three configured entry IDs to the Google Form URL", async () => {
    let capturedUrl = "";
    let capturedBody: FormData | null = null;
    let capturedMode = "";

    const originalFetch = global.fetch;
    global.fetch = vi.fn().mockImplementation(async (url: unknown, init?: RequestInit) => {
      capturedUrl = String(url);
      capturedBody = (init?.body as FormData) || null;
      capturedMode = init?.mode || "";
      return new Response(null, { status: 200 });
    });

    const result = await sendContact({
      name: "Muhammad Ahmad Shahid",
      email: "test@example.com",
      message: "Testing form transmission with verified entry IDs.",
    });

    global.fetch = originalFetch;

    expect(result).toEqual({ ok: true });
    expect(capturedUrl).toBe(site.contactForm.actionUrl);
    expect(capturedMode).toBe("no-cors");
    expect(capturedBody).not.toBeNull();
    const body = capturedBody!;
    expect(body.get(site.contactForm.entries.name)).toBe("Muhammad Ahmad Shahid");
    expect(body.get(site.contactForm.entries.email)).toBe("test@example.com");
    expect(body.get(site.contactForm.entries.message)).toBe(
      "Testing form transmission with verified entry IDs."
    );
  });

  it("returns network failure reason when fetch fails", async () => {
    const originalFetch = global.fetch;
    global.fetch = vi.fn().mockRejectedValue(new Error("Network failure"));

    const result = await sendContact({
      name: "Network Test",
      email: "test@example.com",
      message: "Testing simulated network failure path.",
    });

    global.fetch = originalFetch;

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.reason).toBe("network");
    }
  });
});

import { describe, it, expect } from "vitest";
import { validate } from "../app/lib/contact";

describe("Contact form validation", () => {
  it("rejects empty fields", () => {
    const errors = validate({ name: "", email: "", message: "" });
    expect(errors.name).toBeDefined();
    expect(errors.email).toBeDefined();
    expect(errors.message).toBeDefined();
  });

  it("rejects invalid email addresses", () => {
    const errors = validate({
      name: "Test User",
      email: "invalid-email-string",
      message: "This is a valid test message with more than 10 characters.",
    });
    expect(errors.email).toContain("reply to");
    expect(errors.name).toBeUndefined();
    expect(errors.message).toBeUndefined();
  });

  it("rejects messages shorter than 10 characters", () => {
    const errors = validate({
      name: "Test User",
      email: "user@example.com",
      message: "Short",
    });
    expect(errors.message).toContain("between 10 and 2000");
  });

  it("accepts valid submissions with trimmed inputs", () => {
    const errors = validate({
      name: "  Dr. Jane Doe  ",
      email: "jane.doe@university.edu  ",
      message: "   We would love to discuss graduate research opportunities with you.   ",
    });
    expect(Object.keys(errors)).toHaveLength(0);
  });
});


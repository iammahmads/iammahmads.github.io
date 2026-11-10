import { describe, it, expect } from "vitest";
import { rewriteRelativeUrls } from "../app/lib/markdown";

describe("Markdown relative URL rewriting", () => {
  it("rewrites relative image URLs to raw GitHub URLs", () => {
    const markdown = "Here is a screenshot: ![Architecture](docs/arch.png)";
    const result = rewriteRelativeUrls(markdown, "FypGuard");
    expect(result).toBe(
      "Here is a screenshot: ![Architecture](https://raw.githubusercontent.com/iammahmads/FypGuard/main/docs/arch.png)"
    );
  });

  it("does not rewrite absolute URLs or data URLs", () => {
    const markdown = "External image: ![Demo](https://example.com/demo.png)";
    const result = rewriteRelativeUrls(markdown, "FypGuard");
    expect(result).toBe(markdown);
  });

  it("rewrites relative hyperlinks to github blob URLs", () => {
    const markdown = "See [License](LICENSE) and [Contributing](CONTRIBUTING.md)";
    const result = rewriteRelativeUrls(markdown, "FypGuard");
    expect(result).toBe(
      "See [License](https://github.com/iammahmads/FypGuard/blob/main/LICENSE) and [Contributing](https://github.com/iammahmads/FypGuard/blob/main/CONTRIBUTING.md)"
    );
  });
});

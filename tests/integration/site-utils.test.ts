import { describe, expect, it } from "vitest";
import { assetPath, cn, documentPath, referencePath } from "../../src/lib/site-utils";

describe("site-utils", () => {
  it("joins truthy class names and skips falsy values", () => {
    expect(cn("base", false, undefined, "active", null)).toBe("base active");
  });

  it("builds stable public asset paths", () => {
    expect(assetPath("logo app.png")).toBe("/assets/logo%20app.png");
    expect(documentPath("Cookie policy per sito.pdf")).toBe(
      "/assets/documenti/Cookie%20policy%20per%20sito.pdf",
    );
    expect(referencePath("bozza wedoo.png")).toBe("/references/bozza%20wedoo.png");
  });
});

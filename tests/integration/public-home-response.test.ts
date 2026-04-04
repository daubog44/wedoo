import { describe, expect, it } from "vitest";
import {
  mapPublicHomeResponseToContent,
  publicHomeResponseMock,
} from "../../src/data/mocks/public-home";

describe("PublicHomeResponse", () => {
  it("exposes published page metadata for the landing payload", () => {
    expect(publicHomeResponseMock.page).toEqual({
      id: "public-home",
      locale: "it-IT",
      slug: "/",
      status: "published",
      updatedAt: "2026-04-04T00:00:00.000Z",
    });
  });

  it("maps the server-like response sections to the home content consumed by the UI", () => {
    const content = mapPublicHomeResponseToContent(publicHomeResponseMock);

    expect(content.hero.title).toBe("No hype. No frasi fatte. Solo realt\u00E0 sostenibili.");
    expect(content.navigation.signInLabel).toBe("accedi");
    expect(content.featureCards).toHaveLength(3);
    expect(content.featureCards.map((card) => card.id)).toEqual([
      "about-us",
      "sdg-goals",
      "faq",
    ]);
  });
});

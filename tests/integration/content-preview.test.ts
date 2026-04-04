import { describe, expect, it } from "vitest";
import {
  articlePreviewsMock,
  mapArticlePreviewToKnowledgeEntry,
  mapPodcastPreviewToKnowledgeEntry,
  podcastPreviewsMock,
} from "../../src/data/content-preview";
import { knowledgeContent } from "../../src/data/core";

describe("content previews", () => {
  it("defines article previews as server-like payloads for the knowledge hub", () => {
    expect(articlePreviewsMock).toHaveLength(4);
    expect(articlePreviewsMock[0]).toMatchObject({
      audienceLabel: "Per team HR e brand",
      id: "employer-branding-esg",
      readingTimeLabel: "7 min",
      title: "Employer branding ESG senza facciata",
    });
  });

  it("defines podcast previews with duration and format metadata", () => {
    expect(podcastPreviewsMock).toHaveLength(4);
    expect(podcastPreviewsMock[1]).toMatchObject({
      durationLabel: "9 min",
      formatLabel: "Roundtable",
      id: "aziende-credibili",
      title: "Aziende credibili",
    });
  });

  it("keeps the legacy knowledge content export aligned through the preview mappers", () => {
    expect(knowledgeContent.articles).toEqual(
      articlePreviewsMock.map(mapArticlePreviewToKnowledgeEntry),
    );
    expect(knowledgeContent.podcasts).toEqual(
      podcastPreviewsMock.map(mapPodcastPreviewToKnowledgeEntry),
    );
  });
});

import { describe, expect, it } from "vitest";
import {
  companyProfileSummaryMock,
  mapCompanyProfileSummaryToShowcase,
} from "../../src/data/company-profile";
import { roleShowcases } from "../../src/data/showcases";

describe("CompanyProfileSummary", () => {
  it("captures the core company showcase payload as a reusable server-like summary", () => {
    expect(companyProfileSummaryMock.id).toBe("wedoo-company-profile");
    expect(companyProfileSummaryMock.onboarding).toEqual({
      firstJobDraftSteps: 5,
      portalPath: "/portale/azienda",
      registrationPath: "/registrati/azienda/1",
    });
    expect(companyProfileSummaryMock.metrics.map((metric) => metric.id)).toEqual([
      "first-job-draft-steps",
      "main-audience",
      "positioning",
    ]);
    expect(companyProfileSummaryMock.slides).toHaveLength(6);
  });

  it("maps the company summary to the existing showcase view model", () => {
    const showcase = mapCompanyProfileSummaryToShowcase(companyProfileSummaryMock);

    expect(showcase).toMatchObject({
      badge: "Percorso azienda",
      cta: "/registrati/azienda/1",
      title: "Target ultra preciso: Gen Z\norientati alla sostenibilita",
    });
    expect(showcase.metrics[0]).toEqual({
      label: "Passi per pubblicare il primo annuncio",
      value: "5 step",
    });
    expect(showcase.slides[1]).toMatchObject({
      description:
        "I candidati vogliono coerenza, e noi ti guidiamo a mostrarla al meglio.",
      image: "azienda_2.png",
      title: "Verifica degli annunci\ne trasparenza",
    });
  });

  it("keeps the exported company showcase aligned with the company summary mapper", () => {
    expect(roleShowcases.company).toEqual(
      mapCompanyProfileSummaryToShowcase(companyProfileSummaryMock),
    );
  });
});

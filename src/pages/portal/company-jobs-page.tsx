import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CompanyJobManagementView } from "../../components/portal/company-job-management-view";
import {
  createCompanyJobManagementResponse,
  isCompanyJobManagementSectionId,
} from "../../data/company-job-management";
import { createBlankCompanyOnboardingDraft } from "../../data/company-onboarding";
import { jobDraftMock, type JobDraft } from "../../data/job-draft";
import {
  getJobDraftMockSnapshot,
  jobDraftStorageKey,
  saveJobDraftMock,
} from "../../data/mock-services";
import type { CompanyJobManagementSectionId } from "../../data/types";

function createEmptyCompanyJobsDraft(): JobDraft {
  return createBlankCompanyOnboardingDraft(jobDraftMock);
}

function getInitialCompanyJobsDraft(): JobDraft {
  if (typeof window === "undefined" || !("sessionStorage" in window)) {
    return createEmptyCompanyJobsDraft();
  }

  const storedDraft = window.sessionStorage.getItem(jobDraftStorageKey);

  if (storedDraft) {
    return getJobDraftMockSnapshot();
  }

  return createEmptyCompanyJobsDraft();
}

export default function CompanyJobsPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [draft, setDraft] = useState<JobDraft>(() => getInitialCompanyJobsDraft());
  const [activityValue, setActivityValue] = useState("");
  const [publishedJobValue, setPublishedJobValue] = useState("");
  const rawSection = searchParams.get("section");
  const section: CompanyJobManagementSectionId = isCompanyJobManagementSectionId(
    rawSection,
  )
    ? rawSection
    : "recruiter";
  const response = createCompanyJobManagementResponse(draft);

  function updateDraft(updater: (current: JobDraft) => JobDraft) {
    setDraft((current) => updater(current));
  }

  function setSection(nextSection: CompanyJobManagementSectionId) {
    const nextSearchParams = new URLSearchParams(searchParams);

    if (nextSection === "recruiter") {
      nextSearchParams.delete("section");
    } else {
      nextSearchParams.set("section", nextSection);
    }

    setSearchParams(nextSearchParams, { replace: true });
  }

  async function resetDraft() {
    const blankDraft = createEmptyCompanyJobsDraft();
    await saveJobDraftMock(blankDraft);
    setDraft(blankDraft);
    setActivityValue("");
    setPublishedJobValue("");
    setSection("recruiter");
  }

  async function previewDraft() {
    await saveJobDraftMock(draft);
    navigate(draft.flow.previewPath);
  }

  async function saveDraft() {
    await saveJobDraftMock(draft);
  }

  async function submitDraft() {
    await saveJobDraftMock(draft);
    navigate(draft.flow.completionPath);
  }

  function viewPublishedJob() {
    const selectedJobPath =
      response.publishedJobs.find((job) => job.id === publishedJobValue)
        ?.previewPath ??
      response.publishedJobs[0]?.previewPath ??
      draft.flow.previewPath;

    navigate(selectedJobPath);
  }

  return (
    <main className="min-h-screen bg-brand-page" data-portal-page="company-jobs">
      <CompanyJobManagementView
        activityValue={activityValue}
        draft={draft}
        onActivityChange={(value) => {
          setActivityValue(value);
          updateDraft((current) => ({
            ...current,
            role: {
              ...current.role,
              sectorId: value,
            },
          }));
        }}
        onBack={() => navigate(response.backPath)}
        onCreateNew={resetDraft}
        onDraftChange={updateDraft}
        onPreview={previewDraft}
        onPublishedJobChange={setPublishedJobValue}
        onReset={resetDraft}
        onSaveDraft={saveDraft}
        onSectionChange={setSection}
        onSubmit={submitDraft}
        onViewApplications={() => navigate(response.backPath)}
        onViewPublished={viewPublishedJob}
        publishedJobValue={publishedJobValue}
        response={response}
        section={section}
      />
    </main>
  );
}

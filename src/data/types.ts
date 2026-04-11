import type { JobDraft } from "./job-draft";

export type PortalRole = 'candidate' | 'company'
export type KnowledgeKind = 'articles' | 'podcasts'

export type SdgEntry = {
  id: string
  icon: string
  label: string
}

export type JobEntry = {
  company: string
  companyDetails: string[]
  contact: {
    email: string
    name: string
    phone: string
  }
  contract: string
  description: string
  hardSkills: string[]
  id: string
  location: string
  logo: string
  previewTags: string[]
  requirements: string
  salary: string
  schedule: string
  sdgs: string[]
  softSkills: string[]
  summary: string[]
  title: string
}

export type JobListing = {
  company: {
    logo: string
    name: string
    sectorLabel: string
  }
  employment: {
    contractLabel: string
    salaryLabel: string
    scheduleLabel: string
  }
  id: string
  role: {
    location: string
    previewDescription: string
    previewTags: string[]
    sdgIds: string[]
    title: string
  }
}

export type JobDetail = {
  companyOverview: {
    paragraphs: string[]
  }
  contact: {
    email: string
    name: string
    phone: string
  }
  description: string
  id: string
  qualifications: {
    hardSkills: string[]
    requirementsLabel: string
    softSkills: string[]
  }
  summaryBullets: string[]
}

export type CandidateJobDetailResponse = {
  closePath: string
  company: {
    logo: string
    name: string
    sectorLabel: string
  }
  contactLine: string
  ctas: {
    cancelLabel: string
    certificationsLabel: string
    contactLabel: string
    primaryLabel: string
    saveDraftLabel: string
  }
  editorToolbarLabel: string
  footnotes: readonly string[]
  id: string
  requirementsLabel: string
  sections: {
    companyBody: string
    companyTitle: string
    descriptionBody: string
    descriptionTitle: string
    offerItems: readonly string[]
    offerTitle: string
    summaryItems: readonly string[]
    summaryTitle: string
  }
  skills: {
    hardItems: readonly string[]
    hardTitle: string
    softItems: readonly string[]
    softTitle: string
  }
  title: string
}

export type CompanyJobPreviewResponse = {
  closePath: string
  company: {
    logo: string
    name: string
    sectorLabel: string
  }
  contactLine: string
  ctas: {
    cancelLabel: string
    certificationsLabel: string
    contactLabel: string
    primaryLabel: string
    saveDraftLabel: string
  }
  editorToolbarLabel: string
  footnotes: readonly string[]
  id: string
  mobileDockLabel: string
  requirementsLabel: string
  sections: {
    companyBody: string
    companyTitle: string
    descriptionBody: string
    descriptionTitle: string
    offerItems: readonly string[]
    offerTitle: string
    summaryItems: readonly string[]
    summaryTitle: string
  }
  skills: {
    hardItems: readonly string[]
    hardTitle: string
    softItems: readonly string[]
    softTitle: string
  }
  title: string
}

export type CandidateEntry = {
  avatar: string
  bio: string
  city: string
  education: string[]
  email: string
  hardSkills: string[]
  id: string
  name: string
  phone: string
  sdgs: string[]
  skills: string[]
  softSkills: string[]
  status: string
  summary: string
}

export type CandidateDashboardProfile = {
  avatar: string
  fullName: string
  id: string
}

export type CandidateDashboardListing = {
  companyLogo: string
  companyName: string
  ctaLabel: string
  id: string
  locationLabel: string
  sdgIds: readonly string[]
  tagLabels: readonly string[]
  title: string
}

export type CandidateDashboardResponse = {
  listings: readonly CandidateDashboardListing[]
  profile: CandidateDashboardProfile
  searchPlaceholder: string
}

export type CompanyDashboardProfile = {
  companyLogo: string
  companyName: string
  id: string
}

export type CompanyDashboardCandidate = {
  avatar: string
  ctaLabel: string
  id: string
  locationLabel: string
  name: string
  sdgIds: readonly string[]
  statusLabel: string
  tagLabels: readonly string[]
}

export type CompanyDashboardResponse = {
  candidates: readonly CompanyDashboardCandidate[]
  profile: CompanyDashboardProfile
  searchPlaceholder: string
}

export type CompanyCandidateDetailResponse = {
  availabilityLabel: string
  candidate: {
    avatar: string
    fullName: string
    id: string
    statusLabel: string
  }
  closePath: string
  contactItems: readonly string[]
  ctas: {
    cancelLabel: string
    certificationLabel: string
    closeLabel: string
    primaryLabel: string
    resumeLabel: string
    saveDraftLabel: string
  }
  editorToolbarLabel: string
  footnote: string
  id: string
  mobileDockLabel: string
  sections: {
    certificationsItems: readonly string[]
    certificationsTitle: string
    descriptionBody: string
    descriptionTitle: string
    educationItems: readonly string[]
    educationTitle: string
    experienceItems: readonly string[]
    experienceTitle: string
    hardSkillItems: readonly string[]
    hardSkillsTitle: string
    softSkillItems: readonly string[]
    softSkillsTitle: string
  }
}

export type CompanyJobManagementSectionId =
  | 'recruiter'
  | 'company-details'
  | 'offer-details'
  | 'publishing'
  | 'published-jobs'

export type CompanyJobManagementPublishedJob = {
  id: string
  label: string
  previewPath: string
}

export type CompanyJobManagementPublishedCard = {
  companyLogo: string
  companyName: string
  id: string
  locationLabel: string
  previewPath: string
  sdgIds: readonly string[]
  tagLabels: readonly string[]
  title: string
}

export type CompanyJobManagementResponse = {
  backPath: string
  company: {
    activityLabel: string
    candidateInterestLabel: string
    certificationLabels: readonly string[]
    createNewLabel: string
    editLabel: string
    legalName: string
    logo: string
    publishedJobsLabel: string
    uploadCertificationsLabel: string
    viewApplicationsLabel: string
    viewJobsLabel: string
  }
  ctas: {
    nextLabel: string
    previewLabel: string
    removeLabel: string
    saveDraftLabel: string
    submitLabel: string
  }
  draft: JobDraft
  mobileDockLabel: string
  publishedJobCards: readonly CompanyJobManagementPublishedCard[]
  publishedJobs: readonly CompanyJobManagementPublishedJob[]
  sectionOptions: readonly {
    id: CompanyJobManagementSectionId
    label: string
  }[]
}

export type WizardField = {
  helper?: string
  key: string
  label: string
  options?: string[]
  placeholder?: string
  type:
    | 'text'
    | 'email'
    | 'password'
    | 'tel'
    | 'textarea'
    | 'checkbox'
    | 'chips'
    | 'file'
    | 'toggle'
}

export type WizardStep = {
  description: string
  eyebrow: string
  fields: WizardField[]
  image: string
  index: number
  title: string
}

export type KnowledgeEntry = {
  description: string
  id: string
  title: string
}

export type ArticlePreview = {
  audienceLabel: string
  excerpt: string
  id: string
  readingTimeLabel: string
  title: string
}

export type PodcastPreview = {
  audienceLabel: string
  durationLabel: string
  excerpt: string
  formatLabel: string
  id: string
  title: string
}

export type FaqGroup = {
  id: string
  items: Array<{
    answer: string
    question: string
  }>
  label: string
  tone: 'gold' | 'mint' | 'violet'
}

export type ImpactCard = {
  description: string
  href: string
  image: string
  label: string
  tone: 'gold' | 'rose' | 'violet'
}

export type RoleShowcase = {
  badge: string
  cta: string
  description: string
  metrics: Array<{ label: string; value: string }>
  slides: Array<{ description: string; image: string; title: string }>
  title: string
}

export type LegalDocument = {
  file: string
  label: string
}

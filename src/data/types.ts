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

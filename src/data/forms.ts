import {
  candidateRegistrationAuthViewModel,
  companyRegistrationAuthViewModel,
  loginAuthViewModel,
  type AuthFieldViewModel,
  type AuthTone,
  type AuthViewModel,
} from "./auth";
import {
  createCompanyJobDraftFormConfigs,
  jobDraftMock,
} from "./job-draft";

export type FormTone = "mint" | "violet" | "lilac";

export type FormField =
  | {
      id: string;
      kind: "checkbox";
      label: string;
      linkHref?: string;
      linkLabel?: string;
    }
  | {
      id: string;
      kind: "heading";
      label: string;
    }
  | {
      id: string;
      kind: "file";
      label: string;
      helper?: string;
    }
  | {
      id: string;
      kind: "input";
      inputType: "email" | "password" | "tel" | "text";
      label: string;
      placeholder: string;
      size?: "lg" | "md" | "sm";
    }
  | {
      id: string;
      kind: "select";
      label: string;
      options: string[];
      placeholder?: string;
      size?: "lg" | "md" | "sm" | "xs";
    }
  | {
      id: string;
      kind: "textarea";
      label: string;
      placeholder?: string;
      rows?: number;
    };

export type FormRow = {
  columns: 1 | 2 | 3;
  fields: FormField[];
};

export type FormPageConfig = {
  background: string;
  ctaLabel: string;
  ctaTo: string;
  footerPrompt?: {
    label: string;
    linkLabel: string;
    linkTo: string;
  };
  providerButtons?: boolean;
  rows: FormRow[];
  subtitle?: string;
  title: string;
  tone: FormTone;
};

function mapAuthToneToFormTone(tone: AuthTone): FormTone {
  return tone;
}

function mapAuthFieldToFormField(field: AuthFieldViewModel): FormField {
  return field;
}

function buildAuthFormConfig(viewModel: AuthViewModel): FormPageConfig {
  return {
    background: viewModel.background,
    ctaLabel: viewModel.ctaLabel,
    ctaTo: viewModel.ctaTo,
    footerPrompt: viewModel.footerPrompt,
    providerButtons: viewModel.providerButtons,
    rows: [
      {
        columns: 1,
        fields: viewModel.fields.map(mapAuthFieldToFormField),
      },
    ],
    subtitle: viewModel.subtitle,
    title: viewModel.title,
    tone: mapAuthToneToFormTone(viewModel.tone),
  };
}

export const loginForm: FormPageConfig = buildAuthFormConfig(loginAuthViewModel);

export const candidateRegistrationForm: FormPageConfig = buildAuthFormConfig(
  candidateRegistrationAuthViewModel,
);

export const companyForms: FormPageConfig[] = [
  buildAuthFormConfig(companyRegistrationAuthViewModel),
  ...createCompanyJobDraftFormConfigs(jobDraftMock),
];

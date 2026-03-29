import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import type { FormField, FormPageConfig, FormTone } from "../../data/forms";
import { assetPath, cn } from "../../lib/site-utils";
import { TopLogoBar } from "./branding";
import { SiteIcon } from "./site-icon";

const toneStyles: Record<
  FormTone,
  {
    border: string;
    link: string;
    outlineButton: string;
    primaryButton: string;
  }
> = {
  lilac: {
    border: "border-brand-lavender-400",
    link: "text-brand-violet hover:text-brand-violet-800",
    outlineButton:
      "border-brand-violet-soft bg-white text-brand-ink hover:bg-brand-violet-soft",
    primaryButton:
      "border-brand-violet-soft bg-brand-violet-soft text-brand-ink hover:bg-white hover:text-brand-ink",
  },
  mint: {
    border: "border-brand-mint",
    link: "text-brand-violet hover:text-brand-violet-800",
    outlineButton: "border-brand-mint bg-white text-brand-ink hover:bg-brand-mint",
    primaryButton:
      "border-brand-mint bg-brand-mint text-brand-ink hover:bg-white hover:text-brand-ink",
  },
  violet: {
    border: "border-brand-violet",
    link: "text-brand-violet hover:text-brand-violet-800",
    outlineButton:
      "border-brand-violet bg-white text-brand-ink hover:bg-brand-violet hover:text-white",
    primaryButton:
      "border-brand-violet bg-brand-violet text-white hover:bg-white hover:text-brand-ink",
  },
};

const fieldWidth = {
  lg: "w-full max-w-[400px]",
  md: "w-full max-w-[175px]",
  sm: "w-full max-w-[175px]",
  xs: "w-full max-w-[122px]",
};

export function BackdropPageShell({
  background,
  children,
}: {
  background: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-brand-page">
      <TopLogoBar />
      <div
        className="w-full relative"
        style={{
          backgroundImage: `url(${assetPath(background)})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundPosition: "center",
          height: "100vh"
        }}
      >
        <div style={{ marginLeft: "17%", paddingTop: "10%" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

export function ToneButtonLink({
  children,
  className,
  to,
  tone,
}: {
  children: ReactNode;
  className?: string;
  to: string;
  tone: FormTone;
}) {
  return (
    <Link
      className={cn(
        "inline-flex min-h-12 w-full max-w-[400px] items-center justify-center rounded-xl border-[3px] px-4 py-3 text-sm font-bold transition",
        toneStyles[tone].primaryButton,
        className,
      )}
      to={to}
    >
      {children}
    </Link>
  );
}

function renderField(field: FormField, tone: FormTone) {
  if (field.kind === "checkbox") {
    return (
      <label
        className="flex max-w-[400px] items-start gap-3 text-sm text-slate-700"
        key={field.id}
      >
        <input className="mt-1 h-4 w-4" type="checkbox" />
        <span>
          {field.label}{" "}
          {field.linkHref && field.linkLabel ? (
            <a
              className={cn("underline transition", toneStyles[tone].link)}
              href={field.linkHref}
              rel="noreferrer"
              target="_blank"
            >
              {field.linkLabel}
            </a>
          ) : null}
        </span>
      </label>
    );
  }

  if (field.kind === "heading") {
    return (
      <p
        className="w-full max-w-[400px] text-base font-bold text-slate-900"
        key={field.id}
      >
        {field.label}
      </p>
    );
  }

  if (field.kind === "file") {
    return (
      <div className="w-full max-w-[400px]" key={field.id}>
        <label className="mb-2 block text-sm font-medium text-slate-800">
          {field.label}
        </label>
        <input
          className={cn(
            "h-[32px] w-full rounded-md border px-2 text-sm text-slate-700",
            toneStyles[tone].border,
          )}
          type="file"
        />
        {field.helper ? (
          <p className="mt-2 text-xs text-slate-500">{field.helper}</p>
        ) : null}
      </div>
    );
  }

  if (field.kind === "textarea") {
    return (
      <div className="w-full max-w-[400px]" key={field.id}>
        <label className="mb-2 block text-sm font-medium text-slate-800">
          {field.label}
        </label>
        <textarea
          className={cn(
            "w-full rounded-md border px-3 py-2 text-sm text-slate-700",
            toneStyles[tone].border,
          )}
          rows={field.rows ?? 3}
        />
      </div>
    );
  }

  if (field.kind === "select") {
    return (
      <div
        className={cn("w-full", fieldWidth[field.size ?? "lg"])}
        key={field.id}
      >
        <label className="mb-2 block text-sm font-medium text-slate-800">
          {field.label}
        </label>
        <select
          className={cn(
            "h-[32px] w-full rounded-md border bg-white px-2 py-0 text-sm text-slate-700",
            toneStyles[tone].border,
          )}
          defaultValue=""
        >
          <option value="">{field.placeholder ?? "scegli"}</option>
          {field.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div
      className={cn("w-full", fieldWidth[field.size ?? "lg"])}
      key={field.id}
    >
      <label className="mb-2 block text-sm font-medium text-slate-800">
        {field.label}
      </label>
      <input
        className={cn(
          "h-[32px] w-full rounded-md border-2 px-2 py-0 text-sm text-slate-700",
          toneStyles[tone].border,
        )}
        placeholder={field.placeholder}
        type={field.inputType}
      />
    </div>
  );
}

export function ProviderButtons({ tone }: { tone: FormTone }) {
  return (
    <div className="ml-[5.4%] mt-5 flex gap-3">
      {["apple", "google"].map((provider) => (
        <button
          className={cn(
            "inline-flex flex-1 items-center justify-center gap-2 rounded-xl border-[3px] px-4 py-3 text-sm font-medium transition",
            toneStyles[tone].outlineButton,
          )}
          key={provider}
          type="button"
        >
          accedi con <SiteIcon className="h-4 w-4" name={provider as "apple" | "google"} />
        </button>
      ))}
    </div>
  );
}

export function FormPageContent({ config }: { config: FormPageConfig }) {
  return (
    <div className="w-full max-w-[400px]">
      <div className="text-left">
        <h3 className="mb-[2%] ml-[14%] font-oxygen text-[2rem] font-bold leading-none text-black">
          {config.title}
        </h3>
        {config.subtitle ? (
          <h5 className="ml-[16%] font-ubuntu text-[1.15rem] text-slate-800">
            {config.subtitle}
          </h5>
        ) : null}
      </div>
      <div className="mt-4 space-y-3">
        {config.rows.map((row, index) => (
          <div
            className={cn(
              "grid gap-4",
              row.columns === 3
                ? "md:grid-cols-3"
                : row.columns === 2
                  ? "md:grid-cols-2"
                  : "grid-cols-1",
            )}
            key={`${config.title}-${index}`}
          >
            {row.fields.map((field) => renderField(field, config.tone))}
          </div>
        ))}
      </div>
      <ToneButtonLink
        className="ml-[1%] mt-4 w-full max-w-[400px]"
        to={config.ctaTo}
        tone={config.tone}
      >
        {config.ctaLabel}
      </ToneButtonLink>
      {config.providerButtons ? <ProviderButtons tone={config.tone} /> : null}
      {config.footerPrompt ? (
        <h6 className="ml-[7%] mt-5 font-ubuntu text-[1rem] font-bold text-black">
          {config.footerPrompt.label}{" "}
          <Link
            className={cn(
              "hover:underline",
              toneStyles[config.tone].link,
            )}
            to={config.footerPrompt.linkTo}
          >
            {config.footerPrompt.linkLabel}
          </Link>
        </h6>
      ) : null}
    </div>
  );
}

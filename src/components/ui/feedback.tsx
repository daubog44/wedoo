import type { HTMLAttributes, ReactNode } from "react";
import { AppIcon } from "../../lib/icons";
import type { MajesticonName } from "../../lib/majesticons-map";
import { cn } from "../../lib/site-utils";

type StatusNoticeTone = "success" | "error";

type StatusNoticeProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  icon?: MajesticonName;
  tone: StatusNoticeTone;
};

const statusNoticeToneClasses: Record<
  StatusNoticeTone,
  {
    defaultIcon: MajesticonName;
    iconSize: number;
    notice: string;
  }
> = {
  success: {
    defaultIcon: "vector",
    iconSize: 30,
    notice:
      "inline-flex w-fit max-w-full items-center gap-7 rounded-[30px] bg-[var(--wedoo-feedback-success-bg)] px-[22px] py-[28px] text-black",
  },
  error: {
    defaultIcon: "close-line",
    iconSize: 50,
    notice:
      "flex w-full max-w-full items-center gap-[22px] rounded-[30px] bg-[var(--wedoo-feedback-error-bg)] px-3 py-[18px] text-black",
  },
};

export function StatusNotice({
  children,
  className,
  icon,
  tone,
  ...props
}: StatusNoticeProps) {
  const config = statusNoticeToneClasses[tone];

  return (
    <div
      className={cn(config.notice, className)}
      role={tone === "error" ? "alert" : "status"}
      {...props}
    >
      <AppIcon
        className="shrink-0 text-black"
        height={config.iconSize}
        name={icon ?? config.defaultIcon}
        width={config.iconSize}
      />
      <p className="font-wedoo-accent text-[18px] font-normal leading-[1.05] sm:text-[24px]">
        {children}
      </p>
    </div>
  );
}

type NotificationPillProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function NotificationPill({
  children,
  className,
  ...props
}: NotificationPillProps) {
  return (
    <div
      className={cn(
        "w-full max-w-full rounded-[30px] bg-[var(--wedoo-feedback-info-bg)] px-[22px] py-[29px] text-black",
        className,
      )}
      role="status"
      {...props}
    >
      <p className="font-wedoo-accent text-[18px] font-normal leading-[1.05] sm:text-[24px]">
        {children}
      </p>
    </div>
  );
}

const notificationShowcaseData = {
  info: [
    "azienda X vorrebbe conoscerti meglio",
    "hai ricevuto una nuova candidatura!",
    "aggiungi il tuo curriculum per farti conoscere meglio dalle aziende",
    "aggiungi le tue certificazioni di sostenibilità",
  ],
  left: [
    {
      className: "max-w-[35.25rem]",
      message: "il tuo annuncio è stato salvato correttamente",
      tone: "success" as const,
    },
    {
      className: "max-w-[48.25rem]",
      message:
        "c’è stato un errore durante il caricamento, per favore riprova",
      tone: "error" as const,
    },
    {
      className: "max-w-[29.625rem]",
      message: "il tuo annuncio è stato pubblicato!",
      tone: "success" as const,
    },
    {
      className: "max-w-[48.25rem]",
      message:
        "c’è stato un errore durante il caricamento, per favore riprova",
      tone: "error" as const,
    },
  ],
};

type NotificationsShowcaseProps = HTMLAttributes<HTMLDivElement>;

export function NotificationsShowcase({
  className,
  ...props
}: NotificationsShowcaseProps) {
  return (
    <section
      className={cn(
        "grid gap-8 lg:grid-cols-[minmax(0,48.25rem)_minmax(0,28.625rem)] lg:items-start lg:justify-between lg:gap-x-14",
        className,
      )}
      {...props}
    >
      <div className="space-y-5">
        {notificationShowcaseData.left.map((notice) => (
          <StatusNotice
            className={notice.className}
            key={`${notice.tone}-${notice.message}`}
            tone={notice.tone}
          >
            {notice.message}
          </StatusNotice>
        ))}
      </div>

      <div className="space-y-[6px]">
        {notificationShowcaseData.info.map((message) => (
          <NotificationPill
            className={cn(
              message === notificationShowcaseData.info[0]
                ? "max-w-[28.625rem]"
                : "max-w-[26.9375rem]",
            )}
            key={message}
          >
            {message}
          </NotificationPill>
        ))}
      </div>
    </section>
  );
}

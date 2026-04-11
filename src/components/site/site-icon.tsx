import type { SVGProps } from "react";

export type SiteIconName =
  | "apple"
  | "arrow-right"
  | "chevron-down"
  | "chevron-left"
  | "chevron-right"
  | "chevron-up"
  | "close"
  | "document"
  | "download"
  | "filter"
  | "google"
  | "menu"
  | "search"
  | "smartphone"
  | "star";

type SiteIconProps = SVGProps<SVGSVGElement> & {
  name: SiteIconName;
};

const iconMap: Record<SiteIconName, string> = {
  apple:
    '<path d="M15.23 5.54c-.76.9-1.98 1.6-3.01 1.52-.13-1.02.36-2.1 1.06-2.86.77-.85 2.03-1.47 3.06-1.52.12 1.07-.3 2.14-1.11 2.86Z"/><path d="M17.94 12.3c.02 2.18 1.92 2.91 1.94 2.92-.02.05-.3 1.03-.98 2.04-.58.88-1.2 1.75-2.15 1.77-.93.02-1.23-.55-2.3-.55-1.08 0-1.41.53-2.27.57-.92.03-1.62-.92-2.2-1.8-1.18-1.7-2.08-4.8-.87-6.89.6-1.03 1.68-1.69 2.85-1.71.89-.02 1.73.6 2.3.6.56 0 1.62-.74 2.74-.63.47.02 1.78.19 2.62 1.42-.07.04-1.58.92-1.58 2.26Z"/>',
  "arrow-right":
    '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
  "chevron-down": '<path d="m6 9 6 6 6-6"/>',
  "chevron-left": '<path d="m15 6-6 6 6 6"/>',
  "chevron-right": '<path d="m9 6 6 6-6 6"/>',
  "chevron-up": '<path d="m6 15 6-6 6 6"/>',
  close: '<path d="M6 6 18 18"/><path d="M18 6 6 18"/>',
  document:
    '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9Z"/><path d="M14 3v6h6"/><path d="M8 13h8"/><path d="M8 17h5"/>',
  download:
    '<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/>',
  filter:
    '<path d="M4 5h16l-6.5 7.5V20l-3-1.75v-5.75L4 5Z"/>',
  google:
    '<path d="M21 12.24c0-.72-.06-1.25-.2-1.8H12v3.42h5.16c-.1.85-.67 2.13-1.94 2.99l-.02.11 2.82 2.18.2.02c1.84-1.7 2.78-4.2 2.78-6.92Z"/><path d="M12 21c2.53 0 4.65-.84 6.2-2.28l-3-2.31c-.8.56-1.88.95-3.2.95-2.48 0-4.58-1.63-5.34-3.88l-.1.01-2.94 2.27-.03.1C5.14 18.95 8.31 21 12 21Z"/><path d="M6.66 13.48A5.39 5.39 0 0 1 6.36 12c0-.52.11-1.03.29-1.48l-.01-.1-2.97-2.3-.1.05A9.04 9.04 0 0 0 3 12c0 1.46.35 2.83.97 4.03l2.69-2.06Z"/><path d="M12 6.63c1.67 0 2.8.72 3.45 1.32l2.52-2.46C16.64 4.26 14.53 3 12 3 8.31 3 5.14 5.05 3.56 8.03l3.08 2.35C7.41 8.24 9.52 6.63 12 6.63Z"/>',
  menu: '<path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/>',
  search:
    '<circle cx="11" cy="11" r="6"/><path d="m20 20-4.35-4.35"/>',
  smartphone:
    '<rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/>',
  star:
    '<path fill="currentColor" stroke="none" d="m12 2.75 2.85 5.77 6.37.93-4.61 4.49 1.09 6.35L12 17.3l-5.7 2.99 1.09-6.35-4.61-4.49 6.37-.93L12 2.75Z"/>',
};

export function SiteIcon({ className, name, ...props }: SiteIconProps) {
  const isFilled = name === "star" || name === "apple" || name === "google";

  return (
    <svg
      aria-hidden="true"
      className={className}
      fill={isFilled ? "currentColor" : "none"}
      stroke={isFilled ? "none" : "currentColor"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={isFilled ? undefined : 2}
      viewBox="0 0 24 24"
      {...props}
      dangerouslySetInnerHTML={{ __html: iconMap[name] }}
    />
  );
}

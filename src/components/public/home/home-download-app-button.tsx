import { HomeAnchorButton } from "./home-primitives";

export function HomeDownloadAppButton({
  className,
  label,
}: {
  className?: string;
  label: string;
}) {
  return (
    <HomeAnchorButton
      className={className}
      download="wedoo.webmanifest"
      href="/manifest.webmanifest"
      icon="smartphone-apps-line"
      iconPosition="start"
      variant="appPrimary"
    >
      {label}
    </HomeAnchorButton>
  );
}

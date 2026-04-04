import { HomeRouteButton } from "./home-primitives";

export function HomeDiscoverRoseButton({
  className,
  label = "scopri",
  to,
}: {
  className?: string;
  label?: string;
  to: string;
}) {
  return (
    <HomeRouteButton
      className={className}
      icon="chevron-right"
      to={to}
      variant="discoverRose"
    >
      {label}
    </HomeRouteButton>
  );
}

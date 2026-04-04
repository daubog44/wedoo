import { routeMap } from "../../../data/core";
import { HomeRouteButton } from "./home-primitives";

export function HomeCandidateRoleButton({
  className,
  label,
}: {
  className?: string;
  label: string;
}) {
  return (
    <HomeRouteButton
      className={className}
      to={routeMap.candidate.showcase}
      variant="roleCandidate"
    >
      {label}
    </HomeRouteButton>
  );
}

import { routeMap } from "../../../data/core";
import { HomeRouteButton } from "./home-primitives";

export function HomeCompanyRoleButton({
  className,
  label,
}: {
  className?: string;
  label: string;
}) {
  return (
    <HomeRouteButton
      className={className}
      to={routeMap.company.showcase}
      variant="roleCompany"
    >
      {label}
    </HomeRouteButton>
  );
}

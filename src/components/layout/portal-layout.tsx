import { Outlet, useLocation } from "react-router-dom";
import type { PortalRole } from "../../data/types";
import { PortalNavbar } from "../site";

export function PortalLayout({ role }: { role: PortalRole }) {
  const { pathname } = useLocation();
  const hideNavbar =
    (role === "candidate" && pathname.startsWith("/portale/candidato/annuncio/")) ||
    (role === "company" &&
      (pathname.startsWith("/portale/azienda/candidati/") ||
        pathname === "/portale/azienda/annunci"));

  return (
    <div className="min-h-screen bg-brand-page">
      {hideNavbar ? null : <PortalNavbar role={role} />}
      <Outlet />
    </div>
  );
}

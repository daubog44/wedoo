import { Outlet } from "react-router-dom";
import type { PortalRole } from "../../data/types";
import { PortalNavbar, SiteFooter } from "../site";

export function PortalLayout({ role }: { role: PortalRole }) {
  return (
    <div className="min-h-screen bg-white">
      <PortalNavbar role={role} />
      <Outlet />
      <SiteFooter />
    </div>
  );
}

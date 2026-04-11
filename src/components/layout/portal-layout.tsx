import { Outlet } from "react-router-dom";
import type { PortalRole } from "../../data/types";
import { PortalNavbar } from "../site";

export function PortalLayout({ role }: { role: PortalRole }) {
  return (
    <div className="min-h-screen bg-brand-page">
      <PortalNavbar role={role} />
      <Outlet />
    </div>
  );
}

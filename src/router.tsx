import type { ComponentType } from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";
import {
  AppFrame,
  PortalLayout,
  PublicLayout,
} from "./components/layout/index";

function lazyRoute<T extends { default: ComponentType }>(
  loader: () => Promise<T>,
) {
  return async () => {
    const module = await loader();
    return { Component: module.default };
  };
}

export const router = createBrowserRouter([
  {
    element: <AppFrame />,
    children: [
      {
        element: <PublicLayout />,
        children: [
          {
            index: true,
            lazy: lazyRoute(() => import("./pages/public/home-page")),
          },
          {
            path: "info",
            lazy: lazyRoute(() => import("./pages/public/info-page")),
          },
          {
            path: "accedi",
            lazy: lazyRoute(() => import("./pages/public/login-page")),
          },
          {
            path: "registrati",
            lazy: lazyRoute(() => import("./pages/public/role-choice-page")),
          },
          {
            path: "registrati/candidato",
            element: <Navigate replace to="/registrati/candidato/1" />,
          },
          {
            path: "registrati/candidato/:stepIndex",
            lazy: lazyRoute(
              () => import("./pages/public/candidate-wizard-page"),
            ),
          },
          {
            path: "registrati/azienda",
            element: <Navigate replace to="/registrati/azienda/1" />,
          },
          {
            path: "registrati/azienda/:stepIndex",
            lazy: lazyRoute(() => import("./pages/public/company-wizard-page")),
          },
          {
            path: "candidato",
            lazy: lazyRoute(
              () => import("./pages/public/candidate-showcase-page"),
            ),
          },
          {
            path: "azienda",
            lazy: lazyRoute(
              () => import("./pages/public/company-showcase-page"),
            ),
          },
          {
            path: "articoli",
            lazy: lazyRoute(() => import("./pages/public/articles-page")),
          },
          {
            path: "podcast",
            lazy: lazyRoute(() => import("./pages/public/podcasts-page")),
          },
          {
            path: "*",
            lazy: lazyRoute(() => import("./pages/public/not-found-page")),
          },
        ],
      },
      {
        path: "portale/candidato",
        element: <PortalLayout role="candidate" />,
        children: [
          {
            index: true,
            lazy: lazyRoute(
              () => import("./pages/portal/candidate-dashboard-page"),
            ),
          },
          {
            path: "cv",
            lazy: lazyRoute(() => import("./pages/portal/candidate-cv-page")),
          },
          {
            path: "annuncio/:jobId",
            lazy: lazyRoute(() => import("./pages/portal/candidate-job-page")),
          },
        ],
      },
      {
        path: "portale/azienda",
        element: <PortalLayout role="company" />,
        children: [
          {
            index: true,
            lazy: lazyRoute(
              () => import("./pages/portal/company-dashboard-page"),
            ),
          },
          {
            path: "annunci",
            lazy: lazyRoute(() => import("./pages/portal/company-jobs-page")),
          },
          {
            path: "annunci/:jobId",
            lazy: lazyRoute(() => import("./pages/portal/company-job-page")),
          },
          {
            path: "candidati/:candidateId",
            lazy: lazyRoute(
              () => import("./pages/portal/company-candidate-page"),
            ),
          },
        ],
      },
    ],
  },
]);

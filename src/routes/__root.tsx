import React, { Suspense } from "react";
import { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    component: () => {
      const TanStackRouterDevtools =
        process.env.NODE_ENV === "production"
          ? () => null
          : React.lazy(() =>
              import("@tanstack/router-devtools").then((res) => ({
                default: res.TanStackRouterDevtools,
              })),
            );
      return (
        <>
          <Outlet />
          <Suspense>
            <TanStackRouterDevtools />
          </Suspense>
        </>
      );
    },
  },
);

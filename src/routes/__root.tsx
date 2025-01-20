import React, { Suspense } from "react";
import { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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
            <ReactQueryDevtools initialIsOpen={false} />
            <TanStackRouterDevtools />
          </Suspense>
        </>
      );
    },
  },
);

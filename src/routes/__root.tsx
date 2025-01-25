import { Suspense } from "react";
import { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    component: () => {
      return (
        <>
          <Outlet />
          <Suspense>
            <ReactQueryDevtools initialIsOpen={false} />
          </Suspense>
        </>
      );
    },
  },
);

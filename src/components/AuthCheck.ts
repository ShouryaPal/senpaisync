import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/server";
import { useAuthStore } from "@/hooks/use-auth";

export function AuthCheck({ children }: { children: React.ReactNode }) {
  const { token } = useAuthStore();

  const { data: session } = useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      if (!token) return null;
      const { data } = await api.get("/auth/session");
      return data;
    },
    enabled: !!token,
  });

  useEffect(() => {
    if (session?.success === false) {
      useAuthStore.getState().clearAuth();
    }
  }, [session]);

  return children;
}

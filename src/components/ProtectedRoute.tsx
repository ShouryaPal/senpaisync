import { Navigate } from "@tanstack/react-router";
import { useAuthStore } from "@/hooks/use-auth";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { token } = useAuthStore();

  if (!token) {
    return <Navigate to="/welcome" />;
  }

  return children;
}

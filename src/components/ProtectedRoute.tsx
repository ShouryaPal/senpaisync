import { Navigate } from "@tanstack/react-router";
import { useAuthStore } from "@/stores/auth";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { token } = useAuthStore();

  if (!token) {
    return <Navigate to="/welcome" />;
  }

  return children;
}

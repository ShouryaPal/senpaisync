import { ProtectedRoute } from "@/components/ProtectedRoute";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  return (
    <ProtectedRoute>
      <div className="p-2">Hello from About!</div>
    </ProtectedRoute>
  );
}

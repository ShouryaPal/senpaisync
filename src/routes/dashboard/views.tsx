// src/routes/dashboard/views.tsx
import { Dashboard } from "@/components/Dashboard";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/views")({
  component: DashboardViews,
});

function DashboardViews() {
  return (
    <Dashboard>
      {" "}
      <div>Dashboard Views Page</div>
    </Dashboard>
  );
}

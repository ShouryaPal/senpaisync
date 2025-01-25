import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { ReactNode } from "react";

interface DashboardProps {
  children: ReactNode;
}

export function Dashboard({ children }: DashboardProps) {
  return (
    <div className="flex">
      <div className="h-screen">
        <Sidebar />
      </div>
      <div className="w-full flex flex-col">
        <Navbar />
        <main className="flex-1 p-4 overflow-y-auto w-full h-full bg-zinc-900">
          {children}
        </main>
      </div>
    </div>
  );
}

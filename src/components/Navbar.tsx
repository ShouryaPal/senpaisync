import { PanelRightClose } from "lucide-react";
import { useSidebarStore } from "@/hooks/use-sidebar";

export function Navbar() {
  const { collapsed, toggleCollapsed } = useSidebarStore();

  return (
    <div className="w-full h-12 p-2 bg-zinc-900 border-b border-zinc-800 text-sm text-gray-50">
      {collapsed && (
        <button
          onClick={toggleCollapsed}
          className="hover:bg-zinc-800 rounded-lg p-1 transition-colors"
        >
          <PanelRightClose className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}

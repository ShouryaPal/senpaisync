import { PanelRightClose } from "lucide-react";

export function Navbar() {
  return (
    <div className="w-full h-10 p-2 bg-zinc-900 border-b border-zinc-800 text-sm text-gray-50">
      <PanelRightClose className="h-4 w-4" />
    </div>
  );
}

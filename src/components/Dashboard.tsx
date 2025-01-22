import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";

export function Dashboard() {
  return (
    <div className="flex">
      <div className="h-screen">
        <Sidebar />
      </div>
      <div className="w-full flex flex-col">
        <Navbar />
      </div>
    </div>
  );
}

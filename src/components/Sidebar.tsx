import React, { useState } from "react";
import {
  Home,
  Inbox,
  PanelRightOpen,
  PanelLeftClose,
  Search,
  Settings,
  UserRoundCheck,
  MoreHorizontal,
  Plus,
  FolderKanban,
  BarChart3,
  Layers,
  CircleHelp,
} from "lucide-react";
import { Button } from "./ui/button";

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => setCollapsed((prev) => !prev);

  return (
    <div
      className={`h-full bg-zinc-900 flex flex-col border-r border-zinc-800 shadow-lg
      ${collapsed ? "w-16" : "w-64"}
      transition-[width] ease-in-out duration-400`}
    >
      <div className="flex-1 flex flex-col gap-4 p-2">
        <Sidebar.Header collapsed={collapsed} toggleSidebar={toggleSidebar} />
        <Sidebar.Content collapsed={collapsed} />
      </div>
      <div className="p-2 pt-0">
        <Sidebar.Footer collapsed={collapsed} />
      </div>
    </div>
  );
}

Sidebar.Header = function SidebarHeader({
  collapsed,
  toggleSidebar,
}: {
  collapsed: boolean;
  toggleSidebar: () => void;
}) {
  return (
    <div className="flex w-full items-center justify-between mb-2">
      {!collapsed && (
        <p className="text-xs font-semibold text-zinc-100 hover:text-white transition-colors">
          Title
        </p>
      )}
      <Button
        variant="ghost"
        size="icon"
        className="hover:bg-zinc-800 rounded-lg transition-colors"
        onClick={toggleSidebar}
      >
        {collapsed ? (
          <PanelLeftClose className="h-5 w-5 text-zinc-400" />
        ) : (
          <PanelRightOpen className="h-5 w-5 text-zinc-400" />
        )}
      </Button>
    </div>
  );
};

Sidebar.Content = function SidebarContent({
  collapsed,
}: {
  collapsed: boolean;
}) {
  return (
    <div className="flex flex-col gap-4">
      <Sidebar.firstGroup collapsed={collapsed} />
      {!collapsed && (
        <div className="flex items-center justify-between group px-1">
          <span className="text-xs font-bold text-gray-400">WORKSPACE</span>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="p-1 rounded hover:bg-zinc-800">
              <MoreHorizontal className="h-4 w-4 text-muted" />
            </button>
            <button className="p-1 rounded hover:bg-zinc-800">
              <Plus className="h-4 w-4 text-muted" />
            </button>
          </div>
        </div>
      )}
      <Sidebar.secondGroup collapsed={collapsed} />
      {!collapsed && (
        <div className="flex items-center justify-between group px-1">
          <span className="text-xs font-bold text-gray-400">PROJECTS</span>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="p-1 rounded hover:bg-zinc-800">
              <MoreHorizontal className="h-4 w-4 text-muted" />
            </button>
            <button className="p-1 rounded hover:bg-zinc-800">
              <Plus className="h-4 w-4 text-muted" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

Sidebar.firstGroup = function SidebarFirstGroup({
  collapsed,
}: {
  collapsed: boolean;
}) {
  return (
    <div className="flex flex-col gap-3">
      {collapsed ? (
        <div className="flex flex-col gap-1">
          <NavItem
            icon={<Search className="w-5 h-5 text-zinc-300" />}
            label="Search"
            collapsed={collapsed}
          />
          <NavItem
            icon={<Settings className="w-5 h-5 text-zinc-300" />}
            label="Settings"
            collapsed={collapsed}
          />
        </div>
      ) : (
        <div className="flex gap-2 h-10">
          <span
            className="flex items-center gap-3 text-xs text-zinc-300 px-4 rounded-lg w-3/4
            hover:bg-zinc-800 hover:text-white transition-all duration-200 ease-in-out cursor-pointer
            active:bg-zinc-700 border border-zinc-800"
          >
            <Search className="w-5 h-5 text-zinc-300" />
            <p>Search</p>
          </span>
          <span className="flex items-center justify-center border border-zinc-800 rounded-lg hover:bg-zinc-800 transition-all duration-200 cursor-pointer w-10">
            <Settings className="w-5 h-5 text-zinc-400" />
          </span>
        </div>
      )}

      <div className="flex flex-col gap-1">
        <NavItem
          icon={<Home className="w-5 h-5 text-zinc-300" />}
          label="Home"
          collapsed={collapsed}
        />
        <NavItem
          icon={<UserRoundCheck className="w-5 h-5 text-zinc-300" />}
          label="Your Work"
          collapsed={collapsed}
        />
        <NavItem
          icon={<Inbox className="w-5 h-5 text-zinc-300" />}
          label="Inbox"
          collapsed={collapsed}
        />
      </div>
    </div>
  );
};

Sidebar.secondGroup = function SidebarSecondGroup({
  collapsed,
}: {
  collapsed: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      <NavItem
        icon={<FolderKanban className="w-5 h-5 text-zinc-300" />}
        label="Projects"
        collapsed={collapsed}
      />
      <NavItem
        icon={<Layers className="w-5 h-5 text-zinc-300" />}
        label="View"
        collapsed={collapsed}
      />
      <NavItem
        icon={<BarChart3 className="w-5 h-5 text-zinc-300" />}
        label="Analytics"
        collapsed={collapsed}
      />
    </div>
  );
};

Sidebar.Footer = function SidebarFooter({ collapsed }: { collapsed: boolean }) {
  return (
    <div className={`${collapsed ? "w-full" : "w-3/4"}`}>
      <NavItem
        icon={<CircleHelp className="w-5 h-5 text-zinc-300" />}
        label="Support"
        collapsed={collapsed}
      />
    </div>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
}

function NavItem({ icon, label, collapsed }: NavItemProps) {
  return (
    <span
      className="flex items-center gap-3 text-xs text-zinc-300 py-2.5 px-4 rounded-lg
      hover:bg-zinc-800 hover:text-white transition-all duration-200 ease-in-out cursor-pointer
      active:bg-zinc-700"
    >
      {icon}
      {!collapsed && <p>{label}</p>}
    </span>
  );
}

export default Sidebar;

import { Dashboard } from "@/components/Dashboard";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Link2, Plus, PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardHome,
});

function DashboardHome() {
  const [time, setTime] = useState(new Date());
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const hours = time.getHours();
    if (hours < 12) {
      setGreeting("Good Morning");
    } else if (hours < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, [time]);

  const formattedDate = time.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
  const formattedTime = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <Dashboard>
      <div className="flex flex-col gap-6 p-6">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-zinc-100">
              {greeting}, John!
            </h1>
            <div className="flex items-center gap-2 text-sm text-zinc-400">
              <span>🌥️</span>
              <span>
                {formattedDate} {formattedTime}
              </span>
            </div>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>

        <Separator className="bg-zinc-600" />

        {/* Quicklinks Section */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold text-zinc-100">Quicklinks</p>
            <Button
              variant="ghost"
              className="text-blue-800 hover:text-blue-700 bg-transparent hover:bg-transparent"
            >
              <PlusIcon className="h-4 w-4" /> Add Link
            </Button>
          </div>
          <div className="rounded-lg bg-zinc-800 p-6 text-center">
            <span className="inline-flex items-center gap-2 text-sm text-gray-400">
              <Link2 className="h-5 w-5 -rotate-45 text-gray-400" />
              Save links for easy access.
            </span>
          </div>
        </div>

        <Separator className="bg-zinc-600" />

        {/* Recent Activities Section */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold text-zinc-100">
              Recent Activities
            </p>
            <Select>
              <SelectTrigger className="w-24 border-blue-800 text-blue-800">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Filter By</SelectLabel>
                  <SelectItem value="issues">Issues</SelectItem>
                  <SelectItem value="projects">Projects</SelectItem>
                  <SelectItem value="pages">Pages</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="rounded-lg bg-zinc-800 p-6 text-center">
            <span className="inline-flex items-center gap-2 text-sm text-gray-400">
              <Link2 className="h-5 w-5 -rotate-45 text-gray-400" />
              Save links for easy access.
            </span>
          </div>
        </div>
      </div>
    </Dashboard>
  );
}

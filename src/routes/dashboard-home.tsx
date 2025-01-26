import { Dashboard } from "@/components/Dashboard";
import { createFileRoute, Navigate } from "@tanstack/react-router";
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
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchQuickLinks, createQuickLink } from "@/lib/quick-links";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSession } from "@/lib/auth-client";

export const Route = createFileRoute("/dashboard-home")({
  component: DashboardHome,
});

function DashboardHome() {
  const [time, setTime] = useState(new Date());
  const [greeting, setGreeting] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  // Hooks
  const queryClient = useQueryClient();
  const {
    data: session,
    isPending: isSessionLoading,
    error: sessionError,
  } = useSession();
  const user = session?.user;

  // Query for quick links
  const {
    data: quickLinks,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["quickLinks"],
    queryFn: fetchQuickLinks,
    enabled: !!session,
  });

  const createMutation = useMutation({
    mutationFn: createQuickLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quickLinks"] });
      setIsDialogOpen(false);
      setName("");
      setUrl("");
    },
  });

  // Handlers
  const handleAddQuickLink = async () => {
    if (!name || !url) {
      alert("Please provide both a name and a URL.");
      return;
    }
    await createMutation.mutateAsync({ name, url });
  };

  // Effects
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

  // Formatted date and time
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

  // Loading state
  if (isSessionLoading) {
    return <div>Loading...</div>;
  }

  // Error state
  if (sessionError) {
    console.error("Session error:", sessionError);
    return <Navigate to="/welcome" />;
  }

  // No session state
  if (!session) {
    console.log("no session found", session);
    return <Navigate to="/welcome" />;
  }

  return (
    <Dashboard>
      <div className="flex flex-col gap-6 p-6">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-zinc-100">
              {greeting}, {user?.name || "User"}!
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
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-blue-800 hover:text-blue-700 bg-transparent hover:bg-transparent"
                >
                  <PlusIcon className="h-4 w-4" /> Add Link
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Quick Link</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter Quick Link name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="url">URL</Label>
                    <Input
                      id="url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="Enter Quick Link URL"
                    />
                  </div>
                  <Button
                    onClick={handleAddQuickLink}
                    disabled={createMutation.isPending}
                  >
                    {createMutation.isPending ? "Saving..." : "Save"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          {isLoading ? (
            <div className="rounded-lg bg-zinc-800 p-6 text-center">
              <span className="text-sm text-gray-400">Loading...</span>
            </div>
          ) : isError ? (
            <div className="rounded-lg bg-zinc-800 p-6 text-center">
              <span className="text-sm text-gray-400">
                Failed to load Quick Links.
              </span>
            </div>
          ) : quickLinks?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {quickLinks.map((link) => (
                <div
                  key={link.id}
                  className="rounded-lg bg-zinc-800 p-4 hover:bg-zinc-700 transition-colors"
                >
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-100 hover:text-blue-500"
                  >
                    {link.name}
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-lg bg-zinc-800 p-6 text-center">
              <span className="inline-flex items-center gap-2 text-sm text-gray-400">
                <Link2 className="h-5 w-5 -rotate-45 text-gray-400" />
                Save links for easy access.
              </span>
            </div>
          )}
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
              Your recent activities.
            </span>
          </div>
        </div>
      </div>
    </Dashboard>
  );
}

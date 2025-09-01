import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Bell,
  CheckCircle,
  MessageCircle,
  GitBranch,
  UserPlus,
  Target,
  ArrowUp,
  Clock,
  LayoutList,
  Mail,
  Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Definirea tipului pentru un eveniment de activitate
interface ActivityEvent {
  id: string;
  type: "task" | "message" | "branch" | "pr" | "deploy" | "invitation";
  user: { name: string; avatar?: string; initials: string };
  action: string;
  target: string;
  time: Date;
}

// Date mock pentru evenimente
const mockActivity: ActivityEvent[] = [
  {
    id: "act-1",
    type: "task",
    user: { name: "Sarah Johnson", initials: "SJ" },
    action: "completed task",
    target: "User Authentication Flow",
    time: new Date(Date.now() - 5 * 60 * 1000), // 5 minute în urmă
  },
  {
    id: "act-2",
    type: "branch",
    user: { name: "Mike Chen", initials: "MC" },
    action: "created new branch",
    target: "feature/dashboard-v2",
    time: new Date(Date.now() - 15 * 60 * 1000), // 15 minute în urmă
  },
  {
    id: "act-3",
    type: "message",
    user: { name: "Emily Davis", initials: "ED" },
    action: "sent a message in",
    target: "General channel",
    time: new Date(Date.now() - 30 * 60 * 1000), // 30 minute în urmă
  },
  {
    id: "act-4",
    type: "pr",
    user: { name: "Alex Smith", initials: "AS" },
    action: "opened PR",
    target: "#234 - Fix responsive design",
    time: new Date(Date.now() - 60 * 60 * 1000), // 1 oră în urmă
  },
  {
    id: "act-5",
    type: "deploy",
    user: { name: "Mike Chen", initials: "MC" },
    action: "deployed to",
    target: "staging environment",
    time: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 ore în urmă
  },
  {
    id: "act-6",
    type: "invitation",
    user: { name: "Sarah Johnson", initials: "SJ" },
    action: "invited you to",
    target: "Project Alpha",
    time: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 ore în urmă
  },
  {
    id: "act-7",
    type: "task",
    user: { name: "Mike Chen", initials: "MC" },
    action: "assigned a task",
    target: "Update API endpoint",
    time: new Date(Date.now() - 10 * 60 * 60 * 1000), // 10 ore în urmă
  },
];

const getIconAndColor = (type: ActivityEvent["type"]) => {
  switch (type) {
    case "task":
      return { icon: CheckCircle, color: "text-success" };
    case "message":
      return { icon: MessageCircle, color: "text-info" };
    case "branch":
      return { icon: GitBranch, color: "text-primary" };
    case "pr":
      return { icon: ArrowUp, color: "text-warning" };
    case "deploy":
      return { icon: Target, color: "text-purple-500" };
    case "invitation":
      return { icon: UserPlus, color: "text-green-500" };
    default:
      return { icon: Bell, color: "text-muted-foreground" };
  }
};

const formatTimeAgo = (date: Date) => {
  const diff = Date.now() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
};

export function Activity() {
  const [filter, setFilter] = useState("all");

  const filteredActivity = mockActivity.filter((event) => {
    if (filter === "all") return true;
    return event.type === filter;
  });

  return (
    <div className="flex-1 space-y-6 p-4 sm:p-6">
      {/* Header-ul paginii */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Activity
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            See all recent actions in your workspace.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="w-full sm:w-auto">
            <LayoutList className="mr-2 h-4 w-4" />
            View All Logs
          </Button>
        </div>
      </div>

      {/* Filtre și vizualizare activitate */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filtre */}
        <Card className="flex-shrink-0 w-full md:w-64">
          <CardHeader>
            <CardTitle className="text-lg">
              <Filter className="inline-block mr-2 h-5 w-5 text-muted-foreground" />
              Filter
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button
              variant={filter === "all" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setFilter("all")}
            >
              All Activity
            </Button>
            <Button
              variant={filter === "task" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setFilter("task")}
            >
              Task Updates
            </Button>
            <Button
              variant={filter === "message" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setFilter("message")}
            >
              Messages
            </Button>
            <Button
              variant={filter === "branch" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setFilter("branch")}
            >
              Code Changes
            </Button>
            <Button
              variant={filter === "deploy" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setFilter("deploy")}
            >
              Deployments
            </Button>
            <Button
              variant={filter === "invitation" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setFilter("invitation")}
            >
              Invitations
            </Button>
          </CardContent>
        </Card>

        {/* Timeline-ul activității */}
        <Card className="flex-1">
          <CardHeader>
            <CardTitle className="text-lg">Recent Activity</CardTitle>
            <CardDescription>
              A timeline of all recent actions in the workspace.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 relative before:absolute before:left-3 before:top-0 before:h-full before:w-0.5 before:bg-border before:z-0">
              {filteredActivity.map((event) => {
                const { icon: Icon, color } = getIconAndColor(event.type);
                return (
                  <div
                    key={event.id}
                    className="flex items-start space-x-4 relative"
                  >
                    <div className="flex-shrink-0 relative z-10">
                      <Avatar className="h-8 w-8 border-2 border-background">
                        <AvatarImage src={event.user.avatar} />
                        <AvatarFallback className="text-xs">
                          {event.user.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={cn(
                          "absolute -bottom-1 -right-1 h-5 w-5 rounded-full flex items-center justify-center border-2 border-background",
                          color
                        )}
                      >
                        <Icon className="h-3 w-3" />
                      </div>
                    </div>
                    <div className="flex-1 pt-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">
                          {event.user.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {formatTimeAgo(event.time)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {event.action}{" "}
                        <span className="font-medium text-foreground">
                          {event.target}
                        </span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

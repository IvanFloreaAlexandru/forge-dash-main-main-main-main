import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AvatarGroup, AvatarGroupItem } from "@/components/ui/avatar-group";
import { Separator } from "@/components/ui/separator";
import {
  Plus,
  ArrowRight,
  CheckCircle,
  MoreHorizontal,
  Target,
  Users,
  Clock,
  Edit,
  Archive,
  Trash2,
  List,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

// Definirea tipului pentru un obiectiv (Goal)
interface Goal {
  id: string;
  name: string;
  progress: number;
  status: "active" | "on-track" | "completed";
  deadline: string;
  owner: { name: string; avatar: string; initials: string };
  keyResults: { name: string; completed: boolean }[];
}

const mockGoals: Goal[] = [
  {
    id: "goal-1",
    name: "Increase User Engagement",
    progress: 85,
    status: "on-track",
    deadline: "Q4 2025",
    owner: {
      name: "John Doe",
      avatar: "/api/placeholder/32/32",
      initials: "JD",
    },
    keyResults: [
      { name: "Achieve 50% increase in daily active users", completed: true },
      { name: "Improve session duration by 15%", completed: false },
      { name: "Launch 2 new engagement features", completed: true },
    ],
  },
  {
    id: "goal-2",
    name: "Enhance Product Performance",
    progress: 100,
    status: "completed",
    deadline: "Q3 2025",
    owner: {
      name: "Sarah Johnson",
      avatar: "/api/placeholder/32/32",
      initials: "SJ",
    },
    keyResults: [
      { name: "Reduce page load time by 30%", completed: true },
      { name: "Decrease server response time to < 200ms", completed: true },
    ],
  },
  {
    id: "goal-3",
    name: "Expand into New Markets",
    progress: 20,
    status: "active",
    deadline: "Q1 2026",
    owner: {
      name: "Mike Chen",
      avatar: "/api/placeholder/32/32",
      initials: "MC",
    },
    keyResults: [
      { name: "Conduct market research in 3 new regions", completed: false },
      { name: "Establish 1 new key partnership", completed: false },
    ],
  },
];

// O componentă mică pentru a afișa un card de obiectiv
const GoalCard = ({ goal }: { goal: Goal }) => (
  <Card className="hover:shadow-lg transition-all duration-200">
    <CardHeader className="p-4 sm:p-6 pb-2 sm:pb-2">
      <div className="flex items-center justify-between">
        <CardTitle className="text-xl font-semibold truncate">
          {goal.name}
        </CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              Edit Goal
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Archive className="mr-2 h-4 w-4" />
              Archive
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <CardDescription className="text-sm line-clamp-2">
        {goal.owner.name} is the owner of this goal.
      </CardDescription>
    </CardHeader>
    <CardContent className="p-4 sm:p-6 pt-2 sm:pt-2">
      <div className="space-y-4">
        {/* Progress Section */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Progress</span>
            <Badge
              variant="outline"
              className={cn(
                goal.status === "active" &&
                  "bg-info/10 text-info border-info/20",
                goal.status === "on-track" &&
                  "bg-warning/10 text-warning border-warning/20",
                goal.status === "completed" &&
                  "bg-success/10 text-success border-success/20"
              )}
            >
              {goal.status.toUpperCase().replace("-", " ")}
            </Badge>
          </div>
          <Progress value={goal.progress} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{goal.progress}% completed</span>
            <span>{goal.deadline}</span>
          </div>
        </div>
        <Separator />
        {/* Key Results */}
        <div className="space-y-2">
          <h5 className="text-sm font-medium">Key Results:</h5>
          <ul className="space-y-1">
            {goal.keyResults.map((kr, index) => (
              <li
                key={index}
                className="flex items-start space-x-2 text-sm text-muted-foreground"
              >
                {kr.completed ? (
                  <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
                ) : (
                  <List className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                )}
                <span
                  className={cn(
                    kr.completed && "line-through text-muted-foreground"
                  )}
                >
                  {kr.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </CardContent>
  </Card>
);

export function Goals() {
  const [goals, setGoals] = useState<Goal[]>(mockGoals);

  const getStatusColor = (status: Goal["status"]) => {
    switch (status) {
      case "active":
        return "bg-info text-info-foreground";
      case "on-track":
        return "bg-warning text-warning-foreground";
      case "completed":
        return "bg-success text-success-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header-ul paginii */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Goals
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Track and manage your team's strategic objectives.
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          New Goal
        </Button>
      </div>

      {/* Vizualizarea obiectivelor pe coloane */}
      <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6 overflow-x-auto pb-4">
        {["active", "on-track", "completed"].map((status) => (
          <div key={status} className="flex-shrink-0 w-full lg:w-80">
            <h3
              className={cn(
                "text-lg font-semibold mb-4 px-2",
                getStatusColor(status as Goal["status"])
              )}
            >
              {status.toUpperCase().replace("-", " ")}
              <span className="text-sm font-normal text-muted-foreground ml-2">
                ({goals.filter((g) => g.status === status).length})
              </span>
            </h3>
            <div className="space-y-4">
              {goals
                .filter((g) => g.status === status)
                .map((goal) => (
                  <GoalCard key={goal.id} goal={goal} />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

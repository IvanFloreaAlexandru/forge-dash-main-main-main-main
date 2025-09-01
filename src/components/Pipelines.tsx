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
import { Plus, ArrowRight, CheckCircle, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

// Definirea tipurilor pentru task-uri și etape
interface Task {
  id: string;
  title: string;
  assignee: string;
  priority: "high" | "medium" | "low";
}

interface PipelineStage {
  id: string;
  name: string;
  tasks: Task[];
  status: "todo" | "in-progress" | "done" | "blocked";
}

const mockPipelines: PipelineStage[] = [
  {
    id: "stage-1",
    name: "Backlog",
    status: "todo",
    tasks: [
      {
        id: "task-1",
        title: "Implement user authentication",
        assignee: "John Doe",
        priority: "high",
      },
      {
        id: "task-2",
        title: "Design database schema",
        assignee: "Jane Smith",
        priority: "medium",
      },
    ],
  },
  {
    id: "stage-2",
    name: "In Development",
    status: "in-progress",
    tasks: [
      {
        id: "task-3",
        title: "Build project dashboard UI",
        assignee: "Mike Chen",
        priority: "high",
      },
    ],
  },
  {
    id: "stage-3",
    name: "Testing",
    status: "in-progress",
    tasks: [
      {
        id: "task-4",
        title: "Write unit tests for API",
        assignee: "Emily Davis",
        priority: "low",
      },
    ],
  },
  {
    id: "stage-4",
    name: "Done",
    status: "done",
    tasks: [
      {
        id: "task-5",
        title: "Setup project repository",
        assignee: "Sarah Connor",
        priority: "low",
      },
    ],
  },
];

const getPriorityColor = (priority: Task["priority"]) => {
  switch (priority) {
    case "high":
      return "bg-destructive/10 text-destructive border-destructive/20";
    case "medium":
      return "bg-warning/10 text-warning border-warning/20";
    case "low":
      return "bg-success/10 text-success border-success/20";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
};

const getStatusIcon = (status: PipelineStage["status"]) => {
  switch (status) {
    case "todo":
      return <ArrowRight className="h-4 w-4" />;
    case "in-progress":
      return <CheckCircle className="h-4 w-4 text-info" />;
    case "done":
      return <CheckCircle className="h-4 w-4 text-success" />;
    case "blocked":
      return <CheckCircle className="h-4 w-4 text-destructive" />;
    default:
      return <MoreHorizontal className="h-4 w-4" />;
  }
};

export function Pipelines() {
  const [pipelines, setPipelines] = useState<PipelineStage[]>(mockPipelines);

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header-ul paginii */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Pipelines
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Visualize and manage your project workflows.
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          New Task
        </Button>
      </div>

      {/* Vizualizarea pipeline-urilor */}
      <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6 overflow-x-auto pb-4">
        {pipelines.map((stage) => (
          <Card key={stage.id} className="flex-shrink-0 w-full lg:w-80">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold">
                {stage.name}
              </CardTitle>
              <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {stage.tasks.map((task) => (
                <Card
                  key={task.id}
                  className="p-4 transition-all duration-200 hover:shadow-md cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium truncate">
                      {task.title}
                    </h4>
                    <Badge
                      className={cn("text-xs", getPriorityColor(task.priority))}
                    >
                      {task.priority}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{task.assignee}</span>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <MoreHorizontal className="h-3 w-3" />
                    </Button>
                  </div>
                </Card>
              ))}
              <Button variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Task
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

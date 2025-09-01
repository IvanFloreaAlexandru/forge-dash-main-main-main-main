// src/components/Dashboard.tsx
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  Users,
  CheckCircle,
  Clock,
  AlertTriangle,
  Activity,
  GitBranch,
  Target,
  MoreHorizontal,
  PlusCircle,
  Bell,
  ListTodo,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ScheduleMeeting } from "@/components/ScheduleMeeting";
import { PieChart as RechartsPieChart, Pie, Cell, Tooltip } from "recharts";

// Componentă pentru graficul circular bazată pe Recharts
interface PieChartProps {
  stats: {
    todo: number;
    inProgress: number;
    done: number;
    blocked: number;
  };
}

const COLORS = {
  todo: "#6B7280", // gri
  inProgress: "#3B82F6", // albastru
  done: "#10B981", // verde
  blocked: "#EF4444", // roșu
};

const PieChart: React.FC<PieChartProps> = ({ stats }) => {
  const data = Object.entries(stats).map(([key, value]) => ({
    name: key,
    value: value,
  }));

  const total = data.reduce((sum, entry) => sum + entry.value, 0);
  if (total === 0) {
    return (
      <div className="flex items-center justify-center w-full h-full text-muted-foreground text-sm">
        No data
      </div>
    );
  }

  return (
    <RechartsPieChart width={120} height={120}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        innerRadius={40}
        outerRadius={60}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS]} />
        ))}
      </Pie>
      <Tooltip
        contentStyle={{
          backgroundColor: "#1F2937",
          border: "none",
          color: "#F9FAFB",
          borderRadius: "8px",
        }}
        itemStyle={{ color: "#F9FAFB" }}
      />
    </RechartsPieChart>
  );
};

// Date mockup
const projectProgress = {
  current: 68,
  tasks: { completed: 24, total: 35 },
  status: "On Track",
};

const recentActivity = [
  {
    id: 1,
    user: {
      name: "Sarah Johnson",
      avatar: "/api/placeholder/32/32",
      initials: "SJ",
    },
    action: "completed task",
    target: "User Authentication Flow",
    time: "2 minutes ago",
    type: "completion",
  },
  {
    id: 2,
    user: {
      name: "Mike Chen",
      avatar: "/api/placeholder/32/32",
      initials: "MC",
    },
    action: "created branch",
    target: "feature/payment-integration",
    time: "15 minutes ago",
    type: "branch",
  },
  {
    id: 3,
    user: {
      name: "Emily Davis",
      avatar: "/api/placeholder/32/32",
      initials: "ED",
    },
    action: "opened PR",
    target: "#234 - Fix responsive design",
    time: "1 hour ago",
    type: "pr",
  },
  {
    id: 4,
    user: {
      name: "Alex Smith",
      avatar: "/api/placeholder/32/32",
      initials: "AS",
    },
    action: "deployed to",
    target: "staging environment",
    time: "3 hours ago",
    type: "deploy",
  },
];

const taskStats = {
  todo: 11,
  inProgress: 8,
  done: 24,
  blocked: 2,
};

const myTasks = [
  { id: 1, title: "Review pull request #125", project: "Web App", priority: "high", status: "In Progress" },
  { id: 2, title: "Design marketing landing page", project: "Marketing", priority: "medium", status: "To Do" },
  { id: 3, title: "Fix bug in user profile", project: "Backend", priority: "high", status: "Blocked" },
];

const upcomingDeadlines = [
  {
    id: 1,
    title: "User Dashboard Release",
    date: "Dec 28",
    priority: "high",
    project: "Web App",
  },
  {
    id: 2,
    title: "API Documentation",
    date: "Dec 30",
    priority: "medium",
    project: "Backend",
  },
  {
    id: 3,
    title: "Mobile App Testing",
    date: "Jan 2",
    priority: "low",
    project: "Mobile",
  },
];

interface CardStatProps {
  title: string;
  value: number | string;
  description: string;
  icon: React.ElementType;
  iconColor: string;
}

const CardStat = ({
  title,
  value,
  description,
  icon: Icon,
  iconColor,
}: CardStatProps) => (
  <Card className="hover:shadow-lg transition-all duration-200 border-border/50">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className={cn("h-4 w-4", iconColor)} />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

export function Dashboard() {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "completion":
        return <CheckCircle className="h-3 w-3 text-emerald-500" />;
      case "branch":
        return <GitBranch className="h-3 w-3 text-sky-500" />;
      case "pr":
        return <TrendingUp className="h-3 w-3 text-amber-500" />;
      case "deploy":
        return <Target className="h-3 w-3 text-violet-500" />;
      default:
        return <Activity className="h-3 w-3 text-muted-foreground" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-rose-500/10 text-rose-500 border-rose-500/20";
      case "medium":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "low":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "text-blue-500";
      case "To Do":
        return "text-gray-500";
      case "Blocked":
        return "text-red-500";
      default:
        return "";
    }
  };

  return (
    <div className="flex-1 space-y-6 p-4 sm:p-6 bg-gray-50 dark:bg-zinc-900 min-h-screen transition-colors duration-300">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Dashboard 👋
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Welcome back! Here's a snapshot of your team's progress.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 border-gray-300 dark:border-zinc-700">
            <PlusCircle className="h-4 w-4" />
            New Task
          </Button>
          <ScheduleMeeting />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <CardStat
          title="Active Projects"
          value={12}
          description="+2 from last month"
          icon={Target}
          iconColor="text-blue-500"
        />
        <CardStat
          title="Team Members"
          value={8}
          description="2 pending invites"
          icon={Users}
          iconColor="text-teal-500"
        />
        <CardStat
          title="Completed Tasks"
          value={234}
          description="+18% from last week"
          icon={CheckCircle}
          iconColor="text-green-500"
        />
        <CardStat
          title="Pending Review"
          value={7}
          description="2 urgent items"
          icon={Clock}
          iconColor="text-amber-500"
        />
      </div>

      {/* Main Content Grid - Layout îmbunătățit */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-3">
        {/* Project Progress */}
        <Card className="lg:col-span-2 border-gray-300 dark:border-zinc-700 hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Project Progress</CardTitle>
                <CardDescription>Current sprint overview</CardDescription>
              </div>
              <Badge variant="outline" className="text-sm border-gray-300 dark:border-zinc-700">
                {projectProgress.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 flex flex-col md:flex-row items-center gap-6">
            <div className="relative w-[120px] h-[120px] shrink-0">
              <PieChart stats={taskStats} />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                <div className="text-xl font-bold">{projectProgress.current}%</div>
                <div className="text-xs text-muted-foreground">Progress</div>
              </div>
            </div>
            <div className="flex-1 w-full space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Overall Progress</span>
                  <span className="font-medium">{projectProgress.current}%</span>
                </div>
                <Progress value={projectProgress.current} className="h-3" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>
                    {projectProgress.tasks.completed} of{" "}
                    {projectProgress.tasks.total} tasks completed
                  </span>
                  <span>Due: Dec 31, 2024</span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="text-center p-3 rounded-lg bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700">
                  <div className="text-lg font-bold text-gray-500 dark:text-gray-400">
                    {taskStats.todo}
                  </div>
                  <div className="text-xs text-muted-foreground">To Do</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700">
                  <div className="text-lg font-bold text-blue-500">
                    {taskStats.inProgress}
                  </div>
                  <div className="text-xs text-muted-foreground">In Progress</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700">
                  <div className="text-lg font-bold text-green-500">
                    {taskStats.done}
                  </div>
                  <div className="text-xs text-muted-foreground">Done</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700">
                  <div className="text-lg font-bold text-red-500">
                    {taskStats.blocked}
                  </div>
                  <div className="text-xs text-muted-foreground">Blocked</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Deadlines */}
        <Card className="border-gray-300 dark:border-zinc-700 hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Upcoming Deadlines</CardTitle>
              <Button variant="ghost" size="sm" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingDeadlines.map((deadline) => (
              <div
                key={deadline.id}
                className="flex items-center justify-between p-3 rounded-lg bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors"
              >
                <div className="space-y-1">
                  <div className="font-medium text-sm">{deadline.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {deadline.project}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge
                    className={cn(
                      "text-xs font-semibold",
                      getPriorityColor(deadline.priority)
                    )}
                  >
                    {deadline.priority}
                  </Badge>
                  <div className="text-xs text-muted-foreground text-right">
                    {deadline.date}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Grid de jos - My Tasks & Recent Activity */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
        {/* My Tasks */}
        <Card className="border-gray-300 dark:border-zinc-700 hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <div className="flex items-center gap-2">
              <ListTodo className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <CardTitle>My Tasks</CardTitle>
            </div>
            <CardDescription>
              Tasks assigned to you.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {myTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle className={cn("h-4 w-4", getStatusColor(task.status))} />
                    <div className="space-y-1">
                      <div className="font-medium text-sm">{task.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {task.project}
                      </div>
                    </div>
                  </div>
                  <Badge
                    className={cn(
                      "text-xs font-semibold",
                      getPriorityColor(task.priority)
                    )}
                  >
                    {task.priority}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="border-gray-300 dark:border-zinc-700 hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <CardTitle>Recent Activity</CardTitle>
            </div>
            <CardDescription>Latest updates from your team.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={activity.user.avatar} />
                    <AvatarFallback>{activity.user.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center space-x-2">
                      {getActivityIcon(activity.type)}
                      <span className="text-sm">
                        <span className="font-semibold">{activity.user.name}</span>{" "}
                        <span className="text-muted-foreground">{activity.action}</span>{" "}
                        <span className="font-medium">{activity.target}</span>
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {activity.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts Section */}
      <Card className="border-gray-300 dark:border-zinc-700 hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-red-500" />
              Critical Alerts
            </CardTitle>
            <Button variant="ghost" size="sm" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
          <CardDescription>
            High-priority issues that need your attention.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500">
            <div className="space-y-1">
              <div className="font-medium text-sm">
                Project "Web App" is at risk of missing its deadline.
              </div>
              <div className="text-xs">
                2 tasks are blocked and 5 are overdue.
              </div>
            </div>
            <Button variant="ghost" className="text-red-500 h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
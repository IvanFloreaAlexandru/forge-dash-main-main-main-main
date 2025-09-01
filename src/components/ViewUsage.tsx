import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, HardDrive, Zap, RefreshCcw } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface UsageLog {
  id: string;
  resource: string;
  usage: string;
  timestamp: string;
}

const initialUsageLogs: UsageLog[] = [
  { id: "1", resource: "Storage", usage: "12 GB used", timestamp: "5 minutes ago" },
  { id: "2", resource: "API Calls", usage: "3,456 calls", timestamp: "1 hour ago" },
  { id: "3", resource: "Users", usage: "1 new user added", timestamp: "Yesterday" },
  { id: "4", resource: "Storage", usage: "10 MB uploaded", timestamp: "2 days ago" },
];

export function ViewUsage() {
  const [usageLogs, setUsageLogs] = useState(initialUsageLogs);

  // Placeholder data for key metrics
  const usageMetrics = {
    users: 125,
    storage: "56.2 GB",
    apiCalls: "12,345",
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Workspace Usage</h2>
        <p className="text-muted-foreground">
          Monitor your resource consumption and activity within the workspace.
        </p>
      </div>
      
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{usageMetrics.users}</div>
            <p className="text-xs text-muted-foreground">+5 new since last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{usageMetrics.storage}</div>
            <p className="text-xs text-muted-foreground">of 100 GB limit</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">API Calls</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{usageMetrics.apiCalls}</div>
            <p className="text-xs text-muted-foreground">in the last 30 days</p>
          </CardContent>
        </Card>
      </div>

      {/* Usage Logs Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RefreshCcw className="h-5 w-5" />
            Recent Usage Logs
          </CardTitle>
          <CardDescription>
            A timeline of key resource usage events.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Resource</TableHead>
                <TableHead>Usage</TableHead>
                <TableHead>Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {usageLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>
                    <Badge variant="secondary">{log.resource}</Badge>
                  </TableCell>
                  <TableCell>{log.usage}</TableCell>
                  <TableCell className="text-muted-foreground">{log.timestamp}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
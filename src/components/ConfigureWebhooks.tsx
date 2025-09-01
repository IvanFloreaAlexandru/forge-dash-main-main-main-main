import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Globe, Plus, Trash2, Zap, GitFork } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Webhook {
  id: string;
  name: string;
  url: string;
  events: string[];
  status: "Active" | "Inactive";
}

const initialWebhooks: Webhook[] = [
  { id: "1", name: "Slack Notifications", url: "https://hooks.slack.com/services/...", events: ["user.created", "document.updated"], status: "Active" },
  { id: "2", name: "Salesforce Sync", url: "https://api.salesforce.com/webhooks/...", events: ["lead.created"], status: "Active" },
  { id: "3", name: "Analytics Dashboard", url: "https://analytics.dashboard.io/...", events: ["document.deleted"], status: "Inactive" },
];

export function ConfigureWebhooks() {
  const [webhooks, setWebhooks] = useState(initialWebhooks);
  const [isCreateWebhookOpen, setIsCreateWebhookOpen] = useState(false);
  const [newWebhookName, setNewWebhookName] = useState("");
  const [newWebhookUrl, setNewWebhookUrl] = useState("");
  const [newWebhookEvents, setNewWebhookEvents] = useState("");
  const { toast } = useToast();

  const handleCreateWebhook = () => {
    if (!newWebhookName.trim() || !newWebhookUrl.trim()) {
      toast({
        title: "Error",
        description: "Name and URL cannot be empty.",
        variant: "destructive",
      });
      return;
    }

    const newWebhook: Webhook = {
      id: (webhooks.length + 1).toString(),
      name: newWebhookName,
      url: newWebhookUrl,
      events: newWebhookEvents.split(",").map(event => event.trim()).filter(event => event),
      status: "Active",
    };

    setWebhooks([...webhooks, newWebhook]);
    setNewWebhookName("");
    setNewWebhookUrl("");
    setNewWebhookEvents("");
    setIsCreateWebhookOpen(false);
    toast({
      title: "Webhook Created",
      description: "A new webhook has been configured successfully.",
    });
  };

  const handleDeleteWebhook = (webhookId: string) => {
    const webhookToDelete = webhooks.find(webhook => webhook.id === webhookId);
    setWebhooks(webhooks.filter(webhook => webhook.id !== webhookId));
    toast({
      title: "Webhook Deleted",
      description: `The webhook "${webhookToDelete?.name}" has been deleted.`,
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Configure Webhooks</h2>
          <p className="text-muted-foreground">
            Set up webhooks to receive real-time notifications about events in your workspace.
          </p>
        </div>
        <Dialog open={isCreateWebhookOpen} onOpenChange={setIsCreateWebhookOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Webhook
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Webhook</DialogTitle>
              <DialogDescription>
                Provide a URL and select the events you want to be notified about.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="webhookName">Webhook Name</Label>
                <Input 
                  id="webhookName" 
                  placeholder="e.g., Slack Alerts" 
                  value={newWebhookName}
                  onChange={(e) => setNewWebhookName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="webhookUrl">Payload URL</Label>
                <Input 
                  id="webhookUrl" 
                  placeholder="https://example.com/webhook"
                  value={newWebhookUrl}
                  onChange={(e) => setNewWebhookUrl(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="webhookEvents">Events (comma-separated)</Label>
                <Input 
                  id="webhookEvents" 
                  placeholder="e.g., user.created, document.deleted"
                  value={newWebhookEvents}
                  onChange={(e) => setNewWebhookEvents(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateWebhookOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateWebhook}>
                Add Webhook
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitFork className="h-5 w-5" />
            Configured Webhooks
          </CardTitle>
          <CardDescription>
            A list of all webhooks configured for this workspace.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>URL</TableHead>
                <TableHead>Events</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {webhooks.map((webhook) => (
                <TableRow key={webhook.id}>
                  <TableCell className="font-medium">{webhook.name}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{webhook.url}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {webhook.events.map((event, index) => (
                        <Badge key={index} variant="secondary">{event}</Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${webhook.status === "Active" ? "bg-green-500" : "bg-yellow-500"}`} />
                      <span className="text-sm">{webhook.status}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteWebhook(webhook.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Webhook Flow
          </CardTitle>
          <CardDescription>
            Webhooks send data via HTTP POST requests to your specified URL.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            When a subscribed event occurs (e.g., a user is created), we will send a JSON payload to your webhook URL. Your application should be ready to receive and process this data.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
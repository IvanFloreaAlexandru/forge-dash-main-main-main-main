import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { 
  Search, 
  Settings, 
  Users, 
  Shield, 
  UserPlus, 
  Building, 
  Activity, 
  BookOpen, 
  Zap, 
  Link2, 
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Lock,
  Calendar,
  Key,
  Database,
  RefreshCcw,
  Bell,
  CheckCircle,
  XCircle,
  CreditCard,
  Download,
  Receipt,
  History,
  HelpCircle,
  ExternalLink,
  GitFork,
  Copy,
  Info,
  Mail,
  UserMinus,
  Check,
  Euro,
  BarChart2,
  HardDrive
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// All components are now defined in this single file for self-containment.

interface Group {
  id: string;
  name: string;
  status: "Active" | "Inactive";
  type: "owners" | "members" | "viewers";
  memberCount: number;
}

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
}

interface User {
  id: string;
  email: string;
  role: string;
  status: "Pending" | "Active";
}

interface Plan {
  id: string;
  name: string;
  price: string;
  features: string[];
}

interface Invoice {
  id: string;
  date: string;
  amount: string;
  status: "Paid" | "Pending";
}

interface UsageLog {
  id: string;
  resource: string;
  usage: string;
  timestamp: string;
}

interface APIKey {
  id: string;
  name: string;
  key: string;
  permissions: string;
  lastUsed: string;
}

interface Webhook {
  id: string;
  name: string;
  url: string;
  events: string[];
  status: "Active" | "Inactive";
}

// InviteUsers component
const InviteUsers = () => {
  const [users, setUsers] = useState<User[]>([
    { id: "1", email: "john.doe@example.com", role: "Admin", status: "Active" },
    { id: "2", email: "jane.smith@example.com", role: "Editor", status: "Active" },
    { id: "3", email: "bob.johnson@example.com", role: "Viewer", status: "Pending" },
  ]);
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("Viewer");
  const { toast } = useToast();

  const handleInviteUser = () => {
    if (!inviteEmail.trim()) {
      toast({
        title: "Error",
        description: "Email cannot be empty.",
        variant: "destructive",
      });
      return;
    }

    const newUser: User = {
      id: (users.length + 1).toString(),
      email: inviteEmail,
      role: inviteRole,
      status: "Pending",
    };

    setUsers([...users, newUser]);
    setInviteEmail("");
    setInviteRole("Viewer");
    setIsInviteDialogOpen(false);
    toast({
      title: "Invitation Sent",
      description: `An invitation has been sent to ${inviteEmail}.`,
    });
  };

  const handleDeleteUser = (userId: string) => {
    const userToDelete = users.find(user => user.id === userId);
    setUsers(users.filter(user => user.id !== userId));
    toast({
      title: "User Removed",
      description: `${userToDelete?.email} has been removed from the workspace.`,
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Manage People</h2>
          <p className="text-muted-foreground">Invite new members and manage existing users in your workspace.</p>
        </div>
        <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Invite User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite a New User</DialogTitle>
              <DialogDescription>
                Enter the email address and assign a role to invite a new member to your workspace.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="inviteEmail">Email Address</Label>
                <Input
                  id="inviteEmail"
                  type="email"
                  placeholder="name@example.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="inviteRole">Role</Label>
                <Select value={inviteRole} onValueChange={setInviteRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Editor">Editor</SelectItem>
                    <SelectItem value="Viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsInviteDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleInviteUser}>
                <Mail className="mr-2 h-4 w-4" />
                Send Invite
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.email}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{user.role}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${user.status === "Active" ? "bg-green-500" : "bg-yellow-500"}`} />
                    <span className="text-sm">{user.status}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteUser(user.id)}>
                    <UserMinus className="h-4 w-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

// ChangeSubscription component
const ChangeSubscription = () => {
  const plans: Plan[] = [
    {
      id: "basic",
      name: "Basic",
      price: "9 €/mo",
      features: [
        "10 active users",
        "5 GB storage",
        "Standard support",
        "Basic reporting"
      ],
    },
    {
      id: "pro",
      name: "Pro",
      price: "29 €/mo",
      features: [
        "Unlimited users",
        "50 GB storage",
        "Priority support",
        "Advanced analytics",
        "Custom integrations"
      ],
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "Contact Us",
      features: [
        "Unlimited everything",
        "Dedicated account manager",
        "SAML/SSO",
        "On-premise deployment",
        "Custom security policies"
      ],
    },
  ];

  const [currentPlan, setCurrentPlan] = useState<Plan>(plans[1]);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleSelectPlan = (plan: Plan) => {
    setSelectedPlan(plan);
    setIsDialogOpen(true);
  };

  const handleConfirmChange = () => {
    if (selectedPlan) {
      setCurrentPlan(selectedPlan);
      setIsDialogOpen(false);
      toast({
        title: "Subscription Updated",
        description: `Your plan has been successfully changed to ${selectedPlan.name}.`,
      });
    }
  };

  const isCurrentPlan = (planId: string) => currentPlan.id === planId;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Change Subscription</h2>
        <p className="text-muted-foreground">
          Manage your workspace's subscription plan, view billing history, and update payment information.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
          <CardDescription>
            You are currently on the **{currentPlan.name}** plan.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-4xl font-bold">{currentPlan.price.split('/')[0]}</span>
              <span className="text-muted-foreground">{currentPlan.price.split('/')[1] || ''}</span>
            </div>
            {currentPlan.id !== "enterprise" && (
              <Button variant="secondary">Manage Billing</Button>
            )}
          </div>
          <Separator />
          <ul className="space-y-2 text-sm text-muted-foreground">
            {currentPlan.features.map((feature, index) => (
              <li key={index} className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <div className="mt-8">
        <h3 className="text-xl font-semibold tracking-tight mb-4">Choose a New Plan</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card key={plan.id} className={isCurrentPlan(plan.id) ? "border-primary border-2" : ""}>
              <CardHeader className="text-center">
                <CardTitle className="text-lg">{plan.name}</CardTitle>
                <CardDescription className="text-3xl font-bold">
                  {plan.price === "Contact Us" ? (
                    <span className="text-base font-normal">Contact Us</span>
                  ) : (
                    <>
                      <span>{plan.price.split('/')[0]}</span>
                      <span className="text-sm font-normal text-muted-foreground">/{plan.price.split('/')[1]}</span>
                    </>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Check className="h-4 w-4 text-green-500 mt-1" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full"
                  onClick={() => handleSelectPlan(plan)}
                  disabled={isCurrentPlan(plan.id)}
                >
                  {isCurrentPlan(plan.id) ? "Current Plan" : "Select Plan"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Plan Change</DialogTitle>
            <DialogDescription>
              Are you sure you want to change your subscription to the **{selectedPlan?.name}** plan? This will take effect immediately.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmChange}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// ManageBilling component
const ManageBilling = () => {
  const initialInvoices: Invoice[] = [
    { id: "1", date: "2025-07-28", amount: "29 €", status: "Paid" },
    { id: "2", date: "2025-06-28", amount: "29 €", status: "Paid" },
    { id: "3", date: "2025-05-28", amount: "29 €", status: "Paid" },
    { id: "4", date: "2025-04-28", amount: "29 €", status: "Paid" },
  ];
  const [invoices, setInvoices] = useState(initialInvoices);
  const { toast } = useToast();

  const handleDownloadInvoice = (invoiceId: string) => {
    const invoice = invoices.find(inv => inv.id === invoiceId);
    if (invoice) {
      toast({
        title: "Download Initiated",
        description: `Downloading invoice #${invoice.id} for ${invoice.date}.`,
      });
    }
  };

  const handleUpdatePaymentMethod = () => {
    toast({
      title: "Update Payment",
      description: "Redirecting you to the secure payment portal...",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Billing & Payments</h2>
        <p className="text-muted-foreground">
          View your payment history, download invoices, and manage your billing information.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Method
          </CardTitle>
          <CardDescription>
            Your current payment method on file.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex-1">
              <p className="font-medium">Visa ending in 4242</p>
              <p className="text-sm text-muted-foreground">Expires 09/2027</p>
            </div>
            <Button variant="secondary" onClick={handleUpdatePaymentMethod}>
              Update
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Payment History
          </CardTitle>
          <CardDescription>
            A list of your past invoices and transactions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice #</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">#{invoice.id}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.amount}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${invoice.status === "Paid" ? "bg-green-500" : "bg-yellow-500"}`} />
                      <span className="text-sm">{invoice.status}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => handleDownloadInvoice(invoice.id)}>
                      <Download className="h-4 w-4" />
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
            <HelpCircle className="h-5 w-5" />
            Need help?
          </CardTitle>
          <CardDescription>
            For any billing questions or issues, please contact our support team.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button>Contact Support</Button>
        </CardContent>
      </Card>
    </div>
  );
};

// ViewUsage component
const ViewUsage = () => {
  const initialUsageLogs: UsageLog[] = [
    { id: "1", resource: "Storage", usage: "12 GB used", timestamp: "5 minutes ago" },
    { id: "2", resource: "API Calls", usage: "3,456 calls", timestamp: "1 hour ago" },
    { id: "3", resource: "Users", usage: "1 new user added", timestamp: "Yesterday" },
    { id: "4", resource: "Storage", usage: "10 MB uploaded", timestamp: "2 days ago" },
  ];
  const [usageLogs, setUsageLogs] = useState(initialUsageLogs);
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
};

// ManageAPIKeys component
const ManageAPIKeys = () => {
  const initialAPIKeys: APIKey[] = [
    { id: "1", name: "Marketing_App_1", key: "sk_live_abc123def456ghi789", permissions: "read:users, write:content", lastUsed: "2025-07-25" },
    { id: "2", name: "Internal_Dashboard", key: "sk_live_jkl012mno345pqr678", permissions: "read:all, write:all", lastUsed: "2025-07-28" },
    { id: "3", name: "Zapier_Integration", key: "sk_live_stu901vwx234yz567", permissions: "write:leads", lastUsed: "2025-07-29" },
  ];
  const [apiKeys, setApiKeys] = useState(initialAPIKeys);
  const [isCreateKeyOpen, setIsCreateKeyOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [newKeyPermissions, setNewKeyPermissions] = useState("");
  const { toast } = useToast();

  const generateRandomKey = () => {
    const prefix = "sk_live_";
    const randomString = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    return prefix + randomString.replace(/\d/g, '');
  };

  const handleCreateKey = () => {
    if (!newKeyName.trim()) {
      toast({
        title: "Error",
        description: "Key name cannot be empty.",
        variant: "destructive",
      });
      return;
    }

    const newKey: APIKey = {
      id: (apiKeys.length + 1).toString(),
      name: newKeyName,
      key: generateRandomKey(),
      permissions: newKeyPermissions || "none",
      lastUsed: "Never",
    };

    setApiKeys([...apiKeys, newKey]);
    setNewKeyName("");
    setNewKeyPermissions("");
    setIsCreateKeyOpen(false);
    toast({
      title: "API Key Created",
      description: "A new API key has been generated successfully.",
    });
  };

  const handleRevokeKey = (keyId: string) => {
    const keyToRevoke = apiKeys.find(key => key.id === keyId);
    setApiKeys(apiKeys.filter(key => key.id !== keyId));
    toast({
      title: "API Key Revoked",
      description: `The API key "${keyToRevoke?.name}" has been permanently revoked.`,
      variant: "destructive",
    });
  };

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    toast({
      title: "Copied!",
      description: "API key has been copied to clipboard.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Manage API Keys</h2>
          <p className="text-muted-foreground">
            Create, manage, and revoke API keys for programmatic access to your workspace.
          </p>
        </div>
        <Dialog open={isCreateKeyOpen} onOpenChange={setIsCreateKeyOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create New Key
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New API Key</DialogTitle>
              <DialogDescription>
                Give your new key a name and define its permissions. The key will only be shown once.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="keyName">Key Name</Label>
                <Input 
                  id="keyName" 
                  placeholder="e.g., Marketing Campaign" 
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="keyPermissions">Permissions (optional)</Label>
                <Input 
                  id="keyPermissions" 
                  placeholder="e.g., read:users, write:docs"
                  value={newKeyPermissions}
                  onChange={(e) => setNewKeyPermissions(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateKeyOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateKey}>
                Create Key
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            Existing API Keys
          </CardTitle>
          <CardDescription>
            A list of all active API keys and their last usage.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Key</TableHead>
                <TableHead>Permissions</TableHead>
                <TableHead>Last Used</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {apiKeys.map((apiKey) => (
                <TableRow key={apiKey.id}>
                  <TableCell className="font-medium">{apiKey.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 font-mono text-xs">
                      <span className="truncate max-w-[150px] sm:max-w-none">
                        {apiKey.key.substring(0, 10)}...
                      </span>
                      <Button variant="ghost" size="icon" onClick={() => handleCopyKey(apiKey.key)} className="h-6 w-6">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{apiKey.permissions}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{apiKey.lastUsed}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => handleCopyKey(apiKey.key)}>
                          <Copy className="mr-2 h-4 w-4" />
                          Copy Key
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleRevokeKey(apiKey.id)}
                          className="text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Revoke
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
            <Info className="h-5 w-5" />
            Security Notice
          </CardTitle>
          <CardDescription>
            Treat your API keys like passwords. Do not share them publicly or store them in client-side code.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Once an API key is created, you will not be able to view it again. We recommend storing it securely immediately after creation.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

// ViewDocs component
const ViewDocs = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">API Documentation</h2>
        <p className="text-muted-foreground">
          Explore our API to integrate your own applications with your workspace.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Getting Started
          </CardTitle>
          <CardDescription>
            Learn the basics of our API and how to make your first request.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Our API is a RESTful API that allows you to interact with your workspace data programmatically. All API calls are made over HTTPS and are authenticated with an API key.
          </p>
          <div className="space-y-2">
            <h4 className="font-medium">Base URL</h4>
            <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
              https://api.company.com/v1
            </code>
          </div>
          <Button variant="secondary" className="mt-4" onClick={() => window.open('https://docs.company.com/api', '_blank')}>
            <ExternalLink className="mr-2 h-4 w-4" />
            View Full Documentation
          </Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            Authentication
          </CardTitle>
          <CardDescription>
            Authenticate your requests using your API key.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Include your API key in the `Authorization` header of your requests.
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-100 p-4 font-mono text-sm">
            {`curl -X GET \\
  https://api.company.com/v1/users \\
  -H 'Authorization: Bearer sk_live_your_api_key'`}
          </pre>
          <p className="text-sm text-muted-foreground">
            Find your API keys in the <a href="#" className="underline font-medium">Connect settings</a>.
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link2 className="h-5 w-5" />
            API Endpoints
          </CardTitle>
          <CardDescription>
            A quick reference for the most common endpoints.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><code className="font-semibold">GET /users</code> - Retrieve a list of users.</li>
            <li><code className="font-semibold">POST /documents</code> - Create a new document.</li>
            <li><code className="font-semibold">DELETE /documents/:id</code> - Delete a specific document.</li>
            <li><code className="font-semibold">GET /projects/:id/members</code> - Get members of a project.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

// ConfigureWebhooks component
const ConfigureWebhooks = () => {
  const initialWebhooks: Webhook[] = [
    { id: "1", name: "Slack Notifications", url: "https://hooks.slack.com/services/...", events: ["user.created", "document.updated"], status: "Active" },
    { id: "2", name: "Salesforce Sync", url: "https://api.salesforce.com/webhooks/...", events: ["lead.created"], status: "Active" },
    { id: "3", name: "Analytics Dashboard", url: "https://analytics.dashboard.io/...", events: ["document.deleted"], status: "Inactive" },
  ];
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
};

// Main WorkspaceSettings component
const initialGroups: Group[] = [
  { id: "1", name: "Administration", status: "Active", type: "owners", memberCount: 4 },
  { id: "2", name: "Human Resources", status: "Active", type: "owners", memberCount: 45 },
  { id: "3", name: "Back-Office", status: "Active", type: "owners", memberCount: 25 },
  { id: "4", name: "Billing", status: "Active", type: "owners", memberCount: 2 },
  { id: "5", name: "Social Media", status: "Active", type: "owners", memberCount: 369 },
  { id: "6", name: "Random", status: "Active", type: "owners", memberCount: 1200 },
];

const initialRoles: Role[] = [
  { id: "1", name: "Admin", description: "Full access and control over the workspace.", permissions: ["manage_users", "manage_groups", "manage_roles", "manage_settings"] },
  { id: "2", name: "Editor", description: "Can create, edit, and delete content.", permissions: ["create_content", "edit_content", "delete_content"] },
  { id: "3", name: "Viewer", description: "Can view content but cannot make changes.", permissions: ["view_content"] },
];

const sidebarItems = [
  { id: "general", label: "General", icon: Settings },
  { id: "workspace", label: "Workspace", icon: Building },
  { id: "insights", label: "Workspace Insights", icon: Activity },
  { id: "security", label: "Security Settings", icon: Shield },
  { id: "people", label: "Manage People", icon: Users },
  { id: "groups", label: "Manage Groups", icon: UserPlus },
  { id: "roles", label: "Manage Roles", icon: Shield },
  { id: "integrations", label: "Integrations", icon: Zap },
  { id: "connect", label: "Connect", icon: Link2 },
];

export function WorkspaceSettings() {
  const [activeTab, setActiveTab] = useState("groups");
  const [groups, setGroups] = useState(initialGroups);
  const [roles, setRoles] = useState(initialRoles);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);
  const [isEditGroupOpen, setIsEditGroupOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupType, setNewGroupType] = useState<Group["type"]>("owners");
  const [editingGroup, setEditingGroup] = useState<Group | null>(null);
  const [isCreateRoleOpen, setIsCreateRoleOpen] = useState(false);
  const [newRoleName, setNewRoleName] = useState("");
  const [newRoleDescription, setNewRoleDescription] = useState("");

  const { toast } = useToast();

  const filteredGroups = groups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === "All" || group.type === filterType.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const handleCreateGroup = () => {
    if (!newGroupName.trim()) {
      toast({
        title: "Error",
        description: "Group name cannot be empty.",
        variant: "destructive",
      });
      return;
    }
    const newGroup: Group = {
      id: (groups.length + 1).toString(),
      name: newGroupName,
      status: "Active",
      type: newGroupType,
      memberCount: 0,
    };
    setGroups([...groups, newGroup]);
    setNewGroupName("");
    setNewGroupType("owners");
    setIsCreateGroupOpen(false);
    toast({
      title: "Group created",
      description: "New group has been created successfully.",
    });
  };

  const handleEditGroup = (groupId: string) => {
    const groupToEdit = groups.find(group => group.id === groupId);
    if (groupToEdit) {
      setEditingGroup(groupToEdit);
      setIsEditGroupOpen(true);
    }
  };

  const handleSaveEdit = () => {
    if (!editingGroup?.name.trim()) {
      toast({
        title: "Error",
        description: "Group name cannot be empty.",
        variant: "destructive",
      });
      return;
    }
    setGroups(groups.map(group => 
      group.id === editingGroup.id ? editingGroup : group
    ));
    setIsEditGroupOpen(false);
    setEditingGroup(null);
    toast({
      title: "Group updated",
      description: `Group "${editingGroup.name}" has been updated.`,
    });
  };

  const handleDeleteGroup = (groupId: string) => {
    const groupToDelete = groups.find(group => group.id === groupId);
    setGroups(groups.filter(group => group.id !== groupId));
    toast({
      title: "Group deleted",
      description: `Group "${groupToDelete?.name}" has been deleted.`,
      variant: "destructive",
    });
  };

  const handleCreateRole = () => {
    if (!newRoleName.trim()) {
      toast({
        title: "Error",
        description: "Role name cannot be empty.",
        variant: "destructive",
      });
      return;
    }
    const newRole: Role = {
      id: (roles.length + 1).toString(),
      name: newRoleName,
      description: newRoleDescription,
      permissions: [],
    };
    setRoles([...roles, newRole]);
    setNewRoleName("");
    setNewRoleDescription("");
    setIsCreateRoleOpen(false);
    toast({
      title: "Role created",
      description: "New role has been created successfully.",
    });
  };

  const handleDeleteRole = (roleId: string) => {
    const roleToDelete = roles.find(role => role.id === roleId);
    setRoles(roles.filter(role => role.id !== roleId));
    toast({
      title: "Role deleted",
      description: `Role "${roleToDelete?.name}" has been deleted.`,
      variant: "destructive",
    });
  };

  const renderContent = () => {
    switch (activeTab) {
      case "general":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">General Settings</h2>
              <p className="text-muted-foreground">Manage your workspace configuration and preferences.</p>
            </div>
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="workspaceName">Workspace Name</Label>
                  <Input id="workspaceName" placeholder="My Workspace" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="workspaceURL">Workspace URL</Label>
                  <div className="flex items-center">
                    <span className="text-muted-foreground text-sm mr-2">
                      app.company.com/
                    </span>
                    <Input id="workspaceURL" value="my-workspace" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="defaultLanguage">Default Language</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button>Save Changes</Button>
              </CardContent>
            </Card>
          </div>
        );

      case "workspace":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Workspace Management</h2>
              <p className="text-muted-foreground">Control billing, usage, and subscription details.</p>
            </div>
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <h4 className="font-medium">Subscription Plan</h4>
                    <p className="text-muted-foreground text-sm">
                      Change your subscription plan at any time.
                    </p>
                  </div>
                  <Button variant="secondary" onClick={() => setActiveTab("change-subscription")}>Change Plan</Button>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <h4 className="font-medium">Billing Information</h4>
                    <p className="text-muted-foreground text-sm">
                      Update your payment methods and view billing history.
                    </p>
                  </div>
                  <Button variant="secondary" onClick={() => setActiveTab("manage-billing")}>Manage Billing</Button>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <h4 className="font-medium">Usage Details</h4>
                    <p className="text-muted-foreground text-sm">
                      Monitor your usage of storage, API calls, and other resources.
                    </p>
                  </div>
                  <Button variant="secondary" onClick={() => setActiveTab("view-usage")}>View Usage</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      
      case "change-subscription":
        return <ChangeSubscription />;

      case "manage-billing":
        return <ManageBilling />;

      case "view-usage":
        return <ViewUsage />;

      case "insights":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Workspace Insights</h2>
              <p className="text-muted-foreground">Get a high-level overview of activity within your workspace.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,245</div>
                  <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">New Documents</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+5,432</div>
                  <p className="text-xs text-muted-foreground">+19% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">API Requests</CardTitle>
                  <Zap className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12,234</div>
                  <p className="text-xs text-muted-foreground">+201 since last hour</p>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Activity Log</CardTitle>
                <CardDescription>Recent actions performed in the workspace.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center space-x-4 text-sm">
                  <Activity className="h-4 w-4 text-muted-foreground" />
                  <span>**John Doe** created a new document.</span>
                  <span className="text-muted-foreground ml-auto">5 minutes ago</span>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>**Jane Smith** invited 3 new users.</span>
                  <span className="text-muted-foreground ml-auto">1 hour ago</span>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <span>**System** updated the security policy.</span>
                  <span className="text-muted-foreground ml-auto">Yesterday</span>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "security":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Security Settings</h2>
              <p className="text-muted-foreground">Configure security and access controls for your workspace.</p>
            </div>
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <h4 className="font-medium flex items-center gap-2"><Lock className="h-4 w-4" /> Two-Factor Authentication (2FA)</h4>
                    <p className="text-muted-foreground text-sm">
                      Require all members to use 2FA for enhanced security.
                    </p>
                  </div>
                  <Switch />
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <h4 className="font-medium flex items-center gap-2"><Key className="h-4 w-4" /> Password Policy</h4>
                    <p className="text-muted-foreground text-sm">
                      Set rules for password complexity and expiration.
                    </p>
                  </div>
                  <Button variant="secondary">
                    Configure
                  </Button>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <h4 className="font-medium flex items-center gap-2"><RefreshCcw className="h-4 w-4" /> Session Timeout</h4>
                    <p className="text-muted-foreground text-sm">
                      Automatically log out idle users after a specified time.
                    </p>
                  </div>
                  <Select defaultValue="30-min">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select timeout" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15-min">15 Minutes</SelectItem>
                      <SelectItem value="30-min">30 Minutes</SelectItem>
                      <SelectItem value="1-hr">1 Hour</SelectItem>
                      <SelectItem value="never">Never</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "people":
        return <InviteUsers />;

      case "groups":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Manage Groups</h2>
                <p className="text-muted-foreground">Organize team members into groups for better collaboration.</p>
              </div>
              <Dialog open={isCreateGroupOpen} onOpenChange={setIsCreateGroupOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Group
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Group</DialogTitle>
                    <DialogDescription>
                      Create a new group to organize your team members.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="newGroupName">Group Name</Label>
                      <Input 
                        id="newGroupName" 
                        placeholder="Enter group name" 
                        value={newGroupName} 
                        onChange={(e) => setNewGroupName(e.target.value)} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newGroupType">Group Type</Label>
                      <Select value={newGroupType} onValueChange={(value) => setNewGroupType(value as Group["type"])}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select group type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="owners">Owners</SelectItem>
                          <SelectItem value="members">Members</SelectItem>
                          <SelectItem value="viewers">Viewers</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsCreateGroupOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleCreateGroup}>Create Group</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              {editingGroup && (
                <Dialog open={isEditGroupOpen} onOpenChange={setIsEditGroupOpen}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Group</DialogTitle>
                      <DialogDescription>
                        Modify the details of the group.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="editGroupName">Group Name</Label>
                        <Input 
                          id="editGroupName" 
                          placeholder="Enter group name" 
                          value={editingGroup.name} 
                          onChange={(e) => setEditingGroup({...editingGroup, name: e.target.value})} 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="editGroupType">Group Type</Label>
                        <Select 
                          value={editingGroup.type} 
                          onValueChange={(value) => setEditingGroup({...editingGroup, type: value as Group["type"]})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select group type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="owners">Owners</SelectItem>
                            <SelectItem value="members">Members</SelectItem>
                            <SelectItem value="viewers">Viewers</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsEditGroupOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleSaveEdit}>Save Changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </div>
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search for Groups"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="Owners">Owners</SelectItem>
                  <SelectItem value="Members">Members</SelectItem>
                  <SelectItem value="Viewers">Viewers</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Groups</TableHead>
                    <TableHead>Group Status</TableHead>
                    <TableHead>Group Type</TableHead>
                    <TableHead>Member Count</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredGroups.map((group) => (
                    <TableRow key={group.id}>
                      <TableCell className="font-medium">{group.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${group.status === "Active" ? "bg-green-500" : "bg-red-500"}`} />
                          <span className="text-sm">{group.status}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{group.type}</Badge>
                      </TableCell>
                      <TableCell>{group.memberCount} Members</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => handleEditGroup(group.id)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDeleteGroup(group.id)}
                              className="text-destructive"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>
        );

      case "roles":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Manage Roles</h2>
                <p className="text-muted-foreground">Define custom roles and permissions for users.</p>
              </div>
              <Dialog open={isCreateRoleOpen} onOpenChange={setIsCreateRoleOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Role
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Role</DialogTitle>
                    <DialogDescription>
                      Define a new role and its associated permissions.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="newRoleName">Role Name</Label>
                      <Input 
                        id="newRoleName" 
                        placeholder="e.g., Marketing Manager" 
                        value={newRoleName} 
                        onChange={(e) => setNewRoleName(e.target.value)} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newRoleDescription">Description</Label>
                      <Textarea 
                        id="newRoleDescription" 
                        placeholder="A brief description of this role's responsibilities." 
                        value={newRoleDescription} 
                        onChange={(e) => setNewRoleDescription(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Permissions</Label>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">read_content</Badge>
                        <Badge variant="secondary">edit_content</Badge>
                        <Badge variant="secondary">manage_users</Badge>
                        <Badge variant="outline">...more</Badge>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsCreateRoleOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleCreateRole}>Create Role</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Role</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Permissions</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {roles.map((role) => (
                    <TableRow key={role.id}>
                      <TableCell className="font-medium">{role.name}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">{role.description}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {role.permissions.map((perm) => (
                            <Badge key={perm} variant="outline">{perm}</Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDeleteRole(role.id)}
                              className="text-destructive"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>
        );

      case "integrations":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Integrations</h2>
              <p className="text-muted-foreground">Connect your workspace with third-party services.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Slack</CardTitle>
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <img src="https://www.svgrepo.com/show/354508/slack.svg" alt="Slack icon" className="h-5 w-5" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    Receive real-time notifications from your workspace.
                  </p>
                  <Button className="mt-4 w-full">Connect</Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Google Drive</CardTitle>
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <img src="https://www.svgrepo.com/show/448208/google-drive.svg" alt="Google Drive icon" className="h-5 w-5" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    Sync documents and files directly with your drive.
                  </p>
                  <Button className="mt-4 w-full">Connect</Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Zapier</CardTitle>
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <img src="https://www.svgrepo.com/show/354964/zapier-icon.svg" alt="Zapier icon" className="h-5 w-5" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    Automate workflows between your workspace and other apps.
                  </p>
                  <Button className="mt-4 w-full">Connect</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case "connect":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Connect</h2>
              <p className="text-muted-foreground">Find out how you can connect your own applications.</p>
            </div>
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <h4 className="font-medium flex items-center gap-2"><Database className="h-4 w-4" /> API Access</h4>
                    <p className="text-muted-foreground text-sm">
                      Generate and manage API keys for programmatic access to your workspace.
                    </p>
                  </div>
                  <Button variant="secondary" onClick={() => setActiveTab("manage-api-keys")}>Manage API Keys</Button>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <h4 className="font-medium flex items-center gap-2"><BookOpen className="h-4 w-4" /> Documentation</h4>
                    <p className="text-muted-foreground text-sm">
                      Explore our API documentation to get started with building integrations.
                    </p>
                  </div>
                  <Button variant="outline" onClick={() => setActiveTab("view-docs")}>
                    View Docs
                  </Button>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <h4 className="font-medium flex items-center gap-2"><Bell className="h-4 w-4" /> Webhooks</h4>
                    <p className="text-muted-foreground text-sm">
                      Set up webhooks to receive real-time events from your workspace.
                    </p>
                  </div>
                  <Button variant="secondary" onClick={() => setActiveTab("configure-webhooks")}>Configure Webhooks</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "manage-api-keys":
        return <ManageAPIKeys />;
      
      case "view-docs":
        return <ViewDocs />;

      case "configure-webhooks":
        return <ConfigureWebhooks />;

      default:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Coming Soon!</h2>
              <p className="text-muted-foreground">
                This section is currently under development. Please check back later for updates.
              </p>
            </div>
            <Card>
              <CardContent className="p-6">
                <p className="text-center text-muted-foreground">
                  Content for this tab will be implemented soon.
                </p>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  const isSubTab = (tabId: string) => {
    return ["change-subscription", "manage-billing", "view-usage", "manage-api-keys", "view-docs", "configure-webhooks"].includes(tabId);
  }

  const getParentTab = (tabId: string) => {
    if (["change-subscription", "manage-billing", "view-usage"].includes(tabId)) return "workspace";
    if (["manage-api-keys", "view-docs", "configure-webhooks"].includes(tabId)) return "connect";
    return tabId;
  }

  return (
    <div className="flex flex-col lg:flex-row h-full bg-background">
      {/* Mobile Tabs */}
      <div className="lg:hidden border-b border-border bg-card">
        <div className="overflow-x-auto">
          <div className="flex space-x-1 p-2 min-w-max">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={getParentTab(activeTab) === item.id ? "secondary" : "ghost"}
                  size="sm"
                  className="flex-shrink-0"
                  onClick={() => setActiveTab(item.id)}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 bg-card border-r border-border">
        <div className="p-4 border-b border-border">
          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
            Workspace Settings
          </h3>
        </div>
        <div className="p-2">
          <div className="space-y-1">
            <div className="px-3 py-2">
              <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                General
              </h4>
            </div>
            <Button
              variant={activeTab === "general" ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("general")}
            >
              <Settings className="mr-3 h-4 w-4" />
              General
            </Button>
            <Button
              variant={getParentTab(activeTab) === "workspace" ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("workspace")}
            >
              <Building className="mr-3 h-4 w-4" />
              Workspace
            </Button>
            <Button
              variant={activeTab === "insights" ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("insights")}
            >
              <Activity className="mr-3 h-4 w-4" />
              Workspace Insights
            </Button>
          </div>
          
          <Separator className="my-3" />
          
          <div className="space-y-1">
            <div className="px-3 py-2">
              <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                People & Access
              </h4>
            </div>
            <Button
              variant={activeTab === "people" ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("people")}
            >
              <Users className="mr-3 h-4 w-4" />
              Manage People
            </Button>
            <Button
              variant={activeTab === "groups" ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("groups")}
            >
              <UserPlus className="mr-3 h-4 w-4" />
              Manage Groups
            </Button>
            <Button
              variant={activeTab === "roles" ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("roles")}
            >
              <Shield className="mr-3 h-4 w-4" />
              Manage Roles
            </Button>
          </div>

          <Separator className="my-3" />
          
          <div className="space-y-1">
            <div className="px-3 py-2">
              <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Integrations
              </h4>
            </div>
            <Button
              variant={activeTab === "integrations" ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("integrations")}
            >
              <Zap className="mr-3 h-4 w-4" />
              Integrations
            </Button>
            <Button
              variant={getParentTab(activeTab) === "connect" ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("connect")}
            >
              <Link2 className="mr-3 h-4 w-4" />
              Connect
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-6 overflow-auto">
        {renderContent()}
      </div>
    </div>
  );
}

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  UserPlus, 
  Mail, 
  Users, 
  Send, 
  Copy, 
  Check, 
  X, 
  MoreHorizontal,
  Clock,
  CheckCircle,
  XCircle,
  RefreshCw
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface PendingInvite {
  id: string;
  email: string;
  role: string;
  status: 'pending' | 'accepted' | 'declined' | 'expired';
  invitedBy: string;
  invitedAt: Date;
  expiresAt: Date;
}

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  status: 'online' | 'offline' | 'away';
  joinedAt: Date;
  lastActive: Date;
}

const mockPendingInvites: PendingInvite[] = [
  {
    id: '1',
    email: 'john.doe@example.com',
    role: 'Developer',
    status: 'pending',
    invitedBy: 'David Miller',
    invitedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
  },
  {
    id: '2',
    email: 'sarah.wilson@example.com',
    role: 'Designer',
    status: 'accepted',
    invitedBy: 'David Miller',
    invitedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    expiresAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
  },
  {
    id: '3',
    email: 'mike.johnson@example.com',
    role: 'Project Manager',
    status: 'declined',
    invitedBy: 'Anna Martinez',
    invitedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    expiresAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
  }
];

const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Anna Martinez',
    email: 'anna.martinez@company.com',
    role: 'Lead Developer',
    avatar: '/api/placeholder/32/32',
    status: 'online',
    joinedAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000),
    lastActive: new Date()
  },
  {
    id: '2',
    name: 'John Smith',
    email: 'john.smith@company.com',
    role: 'UI/UX Designer',
    avatar: '/api/placeholder/32/32',
    status: 'away',
    joinedAt: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000),
    lastActive: new Date(Date.now() - 30 * 60 * 1000)
  },
  {
    id: '3',
    name: 'Sarah Connor',
    email: 'sarah.connor@company.com',
    role: 'Product Manager',
    avatar: '/api/placeholder/32/32',
    status: 'offline',
    joinedAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
    lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000)
  }
];

// Changed export from default to named
export function InviteUsers() {
  const { toast } = useToast();
  const [inviteEmails, setInviteEmails] = useState('');
  const [selectedRole, setSelectedRole] = useState('member');
  const [customMessage, setCustomMessage] = useState('');
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [pendingInvites, setPendingInvites] = useState<PendingInvite[]>(mockPendingInvites);
  const [teamMembers] = useState<TeamMember[]>(mockTeamMembers);
  const [inviteLink] = useState('https://company.com/invite/abc123def456');
  const [linkCopied, setLinkCopied] = useState(false);

  const handleSendInvites = () => {
    const emails = inviteEmails.split('\n').filter(email => email.trim());
    
    if (emails.length === 0) {
      toast({
        title: "Error",
        description: "Please enter at least one email address.",
        variant: "destructive"
      });
      return;
    }

    // Simulate sending invites
    emails.forEach(email => {
      const newInvite: PendingInvite = {
        id: Date.now().toString() + Math.random(),
        email: email.trim(),
        role: selectedRole,
        status: 'pending',
        invitedBy: 'David Miller',
        invitedAt: new Date(),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      };
      setPendingInvites(prev => [newInvite, ...prev]);
    });

    toast({
      title: "Invites sent",
      description: `Successfully sent ${emails.length} invitation${emails.length > 1 ? 's' : ''}.`,
    });

    setInviteEmails('');
    setCustomMessage('');
    setIsInviteDialogOpen(false);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink);
    setLinkCopied(true);
    toast({
      title: "Link copied",
      description: "Invite link has been copied to clipboard.",
    });
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const handleResendInvite = (inviteId: string) => {
    toast({
      title: "Invite resent",
      description: "Invitation has been resent successfully.",
    });
  };

  const handleCancelInvite = (inviteId: string) => {
    setPendingInvites(prev => prev.filter(invite => invite.id !== inviteId));
    toast({
      title: "Invite cancelled",
      description: "Invitation has been cancelled.",
    });
  };

  const getStatusIcon = (status: PendingInvite['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'accepted':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'declined':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'expired':
        return <XCircle className="h-4 w-4 text-gray-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: PendingInvite['status']) => {
    const variants = {
      pending: 'secondary',
      accepted: 'default',
      declined: 'destructive',
      expired: 'secondary'
    } as const;
    
    return (
      <Badge variant={variants[status]} className="capitalize">
        {status}
      </Badge>
    );
  };

  const getMemberStatusIndicator = (status: TeamMember['status']) => {
    const colors = {
      online: 'bg-green-500',
      away: 'bg-yellow-500',
      offline: 'bg-gray-400'
    };
    
    return (
      <div className={`h-3 w-3 rounded-full ${colors[status]} border-2 border-background`} />
    );
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Team Management</h1>
          <p className="text-muted-foreground">Invite and manage team members</p>
        </div>
        <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              Invite Members
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Invite Team Members</DialogTitle>
              <DialogDescription>
                Send invitations to new team members. They'll receive an email with instructions to join.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="emails">Email Addresses</Label>
                <Textarea
                  id="emails"
                  placeholder="Enter email addresses, one per line..."
                  value={inviteEmails}
                  onChange={(e) => setInviteEmails(e.target.value)}
                  rows={4}
                />
                <p className="text-sm text-muted-foreground">
                  Enter one email address per line
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="member">Member</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Custom Message (Optional)</Label>
                <Textarea
                  id="message"
                  placeholder="Add a personal message to the invitation..."
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsInviteDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSendInvites}>
                <Send className="h-4 w-4 mr-2" />
                Send Invitations
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="members" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="members">Team Members</TabsTrigger>
          <TabsTrigger value="invites">Pending Invites</TabsTrigger>
          <TabsTrigger value="link">Invite Link</TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Team Members ({teamMembers.length})
              </CardTitle>
              <CardDescription>
                Manage your team members and their roles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Member</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teamMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={member.avatar} />
                              <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div className="absolute -bottom-0.5 -right-0.5">
                              {getMemberStatusIndicator(member.status)}
                            </div>
                          </div>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-muted-foreground">{member.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{member.role}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={member.status === 'online' ? 'default' : 'secondary'} className="capitalize">
                          {member.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {member.joinedAt.toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {member.status === 'online' ? 'Now' : member.lastActive.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit Role</DropdownMenuItem>
                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                            <Separator />
                            <DropdownMenuItem className="text-destructive">Remove Member</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invites" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Pending Invitations ({pendingInvites.filter(i => i.status === 'pending').length})
              </CardTitle>
              <CardDescription>
                Track and manage sent invitations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Invited By</TableHead>
                    <TableHead>Sent</TableHead>
                    <TableHead>Expires</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingInvites.map((invite) => (
                    <TableRow key={invite.id}>
                      <TableCell className="font-medium">{invite.email}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{invite.role}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(invite.status)}
                          {getStatusBadge(invite.status)}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {invite.invitedBy}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {invite.invitedAt.toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {invite.expiresAt.toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {invite.status === 'pending' && (
                              <>
                                <DropdownMenuItem onClick={() => handleResendInvite(invite.id)}>
                                  <RefreshCw className="h-4 w-4 mr-2" />
                                  Resend
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleCancelInvite(invite.id)} className="text-destructive">
                                  <X className="h-4 w-4 mr-2" />
                                  Cancel
                                </DropdownMenuItem>
                              </>
                            )}
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="link" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Copy className="h-5 w-5" />
                Shareable Invite Link
              </CardTitle>
              <CardDescription>
                Share this link to allow anyone to join your team
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Input
                  value={inviteLink}
                  readOnly
                  className="flex-1"
                />
                <Button
                  onClick={handleCopyLink}
                  variant="outline"
                  className="shrink-0"
                >
                  {linkCopied ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <div className="text-sm text-muted-foreground">
                <p>• Link expires in 7 days</p>
                <p>• New members will join with 'Member' role by default</p>
                <p>• You can regenerate this link anytime for security</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline">
                  Regenerate Link
                </Button>
                <Button variant="outline">
                  Set Expiration
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
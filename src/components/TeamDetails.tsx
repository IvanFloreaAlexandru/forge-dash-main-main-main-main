import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Users,
  UserPlus,
  MoreVertical,
  Trash2,
  Edit,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";

// Definirea tipurilor de date
interface Member {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "invited" | "removed";
}

interface Team {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  members: Member[];
  projectId: string;
}

interface TeamDetailsProps {
  team: Team;
  onClose: () => void;
  onInvite: (teamId: string, email: string, role: string) => void;
  teamRoles: string[];
  onRemoveMember: (teamId: string, memberId: string) => void;
  onEditMember: (teamId: string, memberId: string, newRole: string) => void;
}

const getStatusColor = (status: Member['status']): string => {
  switch (status) {
    case "active":
      return "bg-green-500";
    case "invited":
      return "bg-amber-500";
    case "removed":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};

const TeamDetails: React.FC<TeamDetailsProps> = ({ team, onClose, onInvite, teamRoles, onRemoveMember, onEditMember }) => {
  const [open, setOpen] = useState(true);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState(teamRoles[0]);

  const handleInvite = () => {
    if (inviteEmail && inviteRole) {
      onInvite(team.id, inviteEmail, inviteRole);
      setInviteEmail("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            {team.name}
          </DialogTitle>
          <DialogDescription>{team.description}</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <Card className="col-span-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Team Members</CardTitle>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-1">
                    <UserPlus className="h-4 w-4" />
                    Invite
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Invite Member to {team.name}</DialogTitle>
                    <DialogDescription>
                      Enter the email and select the role for the new member.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="email" className="text-right">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="role" className="text-right">
                        Role
                      </Label>
                      <Select value={inviteRole} onValueChange={setInviteRole}>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent>
                          {teamRoles.map((role) => (
                            <SelectItem key={role} value={role}>{role}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" onClick={handleInvite}>
                      Send Invitation
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent className="space-y-2 p-4">
              {team.members.length > 0 ? (
                team.members.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={`https://placehold.co/100x100/A0A0A0/ffffff?text=${member.name.split(' ').map(n => n[0]).join('')}`} />
                        <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={cn("rounded-full h-2 w-2 p-0", getStatusColor(member.status))} />
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => {
                            const newRole = prompt(`Edit role for ${member.name}:`, member.role);
                            if (newRole) onEditMember(team.id, member.id, newRole);
                          }}>
                            <Edit className="h-4 w-4 mr-2" /> Edit Role
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => onRemoveMember(team.id, member.id)}>
                            <Trash2 className="h-4 w-4 mr-2 text-red-500" /> Remove
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-muted-foreground py-4">No members in this team.</div>
              )}
            </CardContent>
          </Card>
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="text-sm font-medium">Team Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Team ID</Label>
                <p className="text-sm text-muted-foreground">{team.id}</p>
              </div>
              <div>
                <Label>Description</Label>
                <p className="text-sm text-muted-foreground">{team.description}</p>
              </div>
              <div>
                <Label>Associated Project</Label>
                <p className="text-sm text-muted-foreground">{team.projectId}</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <DialogFooter>
          <Button variant="secondary" onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TeamDetails;
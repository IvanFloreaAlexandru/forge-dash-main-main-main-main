import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
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
  Checkbox,
} from "@/components/ui/checkbox";
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/components/ui/avatar";
import {
  Users,
  Building,
} from "lucide-react";

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

interface Project {
  id: string;
  name: string;
}

interface DuplicateTeamDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  team: Team;
  projects: Project[];
  onDuplicate: (newTeamName: string, newProject: string, membersToKeep: Member[]) => void;
}

const DuplicateTeamDialog: React.FC<DuplicateTeamDialogProps> = ({ open, onOpenChange, team, projects, onDuplicate }) => {
  const [duplicateName, setDuplicateName] = useState(`${team.name} (Copy)`);
  const [duplicateProject, setDuplicateProject] = useState(team.projectId);
  const [membersToKeep, setMembersToKeep] = useState<string[]>(team.members.map(m => m.id));

  const handleCheckboxChange = (memberId: string, checked: boolean) => {
    setMembersToKeep(prevMembers => 
      checked ? [...prevMembers, memberId] : prevMembers.filter(id => id !== memberId)
    );
  };

  const handleDuplicate = () => {
    const keptMembers = team.members.filter(member => membersToKeep.includes(member.id));
    onDuplicate(duplicateName, duplicateProject, keptMembers);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Duplicate Team: {team.name}</DialogTitle>
          <DialogDescription>
            Choose a new name, project, and select which members to keep.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="duplicate-name" className="text-right">New Name</Label>
            <Input
              id="duplicate-name"
              value={duplicateName}
              onChange={(e) => setDuplicateName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="duplicate-project" className="text-right">New Project</Label>
            <Select value={duplicateProject} onValueChange={setDuplicateProject}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a project" />
              </SelectTrigger>
              <SelectContent>
                {projects.map((project) => (
                  <SelectItem key={project.id} value={project.id}>{project.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-4">
            <Label className="text-sm font-semibold mb-2 block">
              <Users className="h-4 w-4 inline-block mr-1" /> Choose Members to Keep
            </Label>
            <div className="max-h-48 overflow-y-auto space-y-2 border rounded-md p-2">
              {team.members.length > 0 ? (
                team.members.map((member) => (
                  <div key={member.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`member-${member.id}`}
                      checked={membersToKeep.includes(member.id)}
                      onCheckedChange={(checked) => handleCheckboxChange(member.id, checked as boolean)}
                    />
                    <label
                      htmlFor={`member-${member.id}`}
                      className="flex items-center gap-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={`https://placehold.co/100x100/A0A0A0/ffffff?text=${member.name.split(' ').map(n => n[0]).join('')}`} />
                        <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <span>{member.name} - ({member.role})</span>
                    </label>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground">No members in this team.</p>
              )}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleDuplicate} disabled={!duplicateName || !duplicateProject}>
            Duplicate Team
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DuplicateTeamDialog;
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  PlusCircle,
  Search,
  Filter,
  ChevronDown,
  Users,
  Building,
  MoreVertical,
  Copy,
  Trash2,
  Edit,
} from "lucide-react";
import { cn } from "@/lib/utils";
import TeamDetails from "./TeamDetails";
import DuplicateTeamDialog from "./DuplicateTeamDialog";
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

interface Project {
  id: string;
  name: string;
}

// Date simulate pentru echipe, membri și proiecte
const initialProjects: Project[] = [
  { id: "proj-1", name: "E-commerce Platform" },
  { id: "proj-2", name: "Mobile App Redesign" },
];

const initialTeams: Team[] = [
  {
    id: "team-1",
    name: "Core Development",
    description: "Team responsible for the main product features.",
    memberCount: 3,
    members: [
      { id: "m1", name: "Ion Popescu", email: "ion.p@dev.com", role: "Developer", status: "active" },
      { id: "m2", name: "Maria Ionescu", email: "maria.i@dev.com", role: "UI/UX Designer", status: "active" },
      { id: "m3", name: "Andrei Vasilescu", email: "andrei.v@dev.com", role: "Product Manager", status: "active" },
    ],
    projectId: "proj-1",
  },
  {
    id: "team-2",
    name: "Marketing & Sales",
    description: "Handles marketing campaigns and sales strategy.",
    memberCount: 2,
    members: [
      { id: "m4", name: "Elena Dumitru", email: "elena.d@dev.com", role: "Marketing Specialist", status: "active" },
      { id: "m5", name: "Cristian Barbu", email: "cristian.b@dev.com", role: "Sales Lead", status: "active" },
    ],
    projectId: "proj-2",
  },
];

const teamRoles = ["Developer", "UI/UX Designer", "Product Manager", "Marketing Specialist", "Sales Lead", "QA Engineer"];

const Teams = () => {
  const [teams, setTeams] = useState<Team[]>(initialTeams);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [searchTerm, setSearchTerm] = useState("");
  const [newTeamName, setNewTeamName] = useState("");
  const [newTeamDesc, setNewTeamDesc] = useState("");
  const [newTeamProject, setNewTeamProject] = useState("");
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  const [isCreateDialogOpen, setCreateDialogOpen] = useState(false);
  const [isDuplicateDialogOpen, setDuplicateDialogOpen] = useState(false);
  const [teamToDuplicate, setTeamToDuplicate] = useState<Team | null>(null);

  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [teamToEdit, setTeamToEdit] = useState<Team | null>(null);
  const [editName, setEditName] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editProject, setEditProject] = useState("");

  const hasProjects = projects.length > 0;

  useEffect(() => {
    if (hasProjects && !newTeamProject) {
      setNewTeamProject(projects[0].id);
    }
  }, [hasProjects, newTeamProject, projects]);

  const filteredTeams = teams.filter((team) =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const getProjectName = (id: string) => {
    const project = projects.find(p => p.id === id);
    return project ? project.name : "Unknown Project";
  };

  const handleCreateTeam = () => {
    if (newTeamName && newTeamProject) {
      const newTeam: Team = {
        id: `team-${Date.now()}`,
        name: newTeamName,
        description: newTeamDesc,
        memberCount: 0,
        members: [],
        projectId: newTeamProject,
      };
      setTeams([...teams, newTeam]);
      setNewTeamName("");
      setNewTeamDesc("");
      setCreateDialogOpen(false);
      toast({
        title: "Team Created! 🎉",
        description: `Team "${newTeam.name}" has been successfully created.`,
      });
    }
  };

  const handleEditTeam = () => {
    if (teamToEdit && editName && editProject) {
      setTeams((prevTeams) =>
        prevTeams.map((team) =>
          team.id === teamToEdit.id
            ? { ...team, name: editName, description: editDesc, projectId: editProject }
            : team
        )
      );
      setEditDialogOpen(false);
      setTeamToEdit(null);
      toast({
        title: "Team Updated! ✅",
        description: `Team "${editName}" has been successfully updated.`,
      });
    }
  };

  const handleDeleteTeam = (id: string) => {
    setTeams(teams.filter((team) => team.id !== id));
    toast({
      title: "Team Deleted! 🗑️",
      description: `The team has been removed.`,
      variant: "destructive",
    });
  };

  const handleInviteMember = (teamId: string, memberEmail: string, role: string) => {
    setTeams((prevTeams) =>
      prevTeams.map((team) =>
        team.id === teamId
          ? {
              ...team,
              members: [
                ...team.members,
                { id: `m${Date.now()}`, name: memberEmail, email: memberEmail, role, status: "invited" },
              ],
              memberCount: team.memberCount + 1,
            }
          : team
      )
    );
    toast({
      title: "Invitation Sent! 📧",
      description: `An invitation has been sent to ${memberEmail}.`,
    });
  };

  const handleRemoveMember = (teamId: string, memberId: string) => {
    setTeams((prevTeams) =>
      prevTeams.map((team) =>
        team.id === teamId
          ? {
              ...team,
              members: team.members.filter(member => member.id !== memberId),
              memberCount: team.memberCount - 1,
            }
          : team
      )
    );
    toast({
      title: "Member Removed! 🚮",
      description: `The member has been successfully removed from the team.`,
      variant: "destructive",
    });
  };

  const handleEditMember = (teamId: string, memberId: string, newRole: string) => {
    setTeams((prevTeams) =>
      prevTeams.map((team) =>
        team.id === teamId
          ? {
              ...team,
              members: team.members.map(member => 
                member.id === memberId ? { ...member, role: newRole } : member
              ),
            }
          : team
      )
    );
    toast({
      title: "Role Updated! ✨",
      description: `Member's role has been updated to "${newRole}".`,
    });
  };

  const handleDuplicateTeam = (newTeamName: string, newProject: string, membersToKeep: Member[]) => {
    if (teamToDuplicate && newTeamName && newProject) {
      const newTeam: Team = {
        id: `team-${Date.now()}`,
        name: newTeamName,
        description: teamToDuplicate.description,
        members: membersToKeep,
        memberCount: membersToKeep.length,
        projectId: newProject,
      };
      setTeams([...teams, newTeam]);
      setDuplicateDialogOpen(false);
      setTeamToDuplicate(null);
      toast({
        title: "Team Duplicated! 👯",
        description: `Team "${newTeam.name}" has been successfully duplicated.`,
      });
    }
  };

  return (
    <div className="flex-1 space-y-6 p-4 sm:p-6 bg-gray-50 dark:bg-zinc-900 min-h-screen transition-colors duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Team Management
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Organize your team members into distinct groups.
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2" disabled={!hasProjects}>
              <PlusCircle className="h-4 w-4" />
              Create New Team
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Team</DialogTitle>
              <DialogDescription>
                Fill in the details to create a new team.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="team-name" className="text-right">Team Name</Label>
                <Input
                  id="team-name"
                  value={newTeamName}
                  onChange={(e) => setNewTeamName(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="team-desc" className="text-right">Description</Label>
                <Input
                  id="team-desc"
                  value={newTeamDesc}
                  onChange={(e) => setNewTeamDesc(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="project" className="text-right">Project</Label>
                <Select value={newTeamProject} onValueChange={setNewTeamProject}>
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
            </div>
            <DialogFooter>
              <Button type="button" onClick={handleCreateTeam} disabled={!newTeamName || !newTeamProject}>
                Create Team
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {!hasProjects && (
          <p className="text-red-500 text-sm">Please create a project first to enable team creation.</p>
        )}
      </div>

      <Card className="border-gray-300 dark:border-zinc-700">
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-1/2 lg:w-1/3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search teams..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2 w-full sm:w-auto">
                    <Filter className="h-4 w-4" />
                    <span className="hidden sm:inline">Filter by...</span>
                    <ChevronDown className="h-4 w-4 ml-auto" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  {/* Puteți adăuga filtre aici, de exemplu, după proiect */}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTeams.map((team) => (
              <Card
                key={team.id}
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedTeam(team)}
              >
                <CardHeader>
                  <CardTitle className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Building className="h-5 w-5" />
                      {team.name}
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem 
                          onClick={() => {
                            setTeamToEdit(team);
                            setEditName(team.name);
                            setEditDesc(team.description);
                            setEditProject(team.projectId);
                            setEditDialogOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4 mr-2" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setTeamToDuplicate(team);
                            setDuplicateDialogOpen(true);
                          }}
                        >
                          <Copy className="h-4 w-4 mr-2" /> Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleDeleteTeam(team.id)}
                          className="text-red-500"
                        >
                          <Trash2 className="h-4 w-4 mr-2" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardTitle>
                  <CardDescription>
                    {team.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{team.memberCount} Members</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Building className="h-4 w-4" />
                      <span>{getProjectName(team.projectId)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {filteredTeams.length === 0 && (
            <div className="text-center text-muted-foreground p-8">No teams found.</div>
          )}
        </CardContent>
      </Card>

      {selectedTeam && (
        <TeamDetails
          team={selectedTeam}
          onClose={() => setSelectedTeam(null)}
          onInvite={handleInviteMember}
          teamRoles={teamRoles}
          onRemoveMember={handleRemoveMember}
          onEditMember={handleEditMember}
        />
      )}

      {/* Edit Team Dialog */}
      {teamToEdit && (
        <Dialog open={isEditDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Team: {teamToEdit.name}</DialogTitle>
              <DialogDescription>
                Update the team's name, description, and project.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">Name</Label>
                <Input
                  id="edit-name"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-desc" className="text-right">Description</Label>
                <Input
                  id="edit-desc"
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-project" className="text-right">Project</Label>
                <Select value={editProject} onValueChange={setEditProject}>
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
            </div>
            <DialogFooter>
              <Button type="button" onClick={handleEditTeam} disabled={!editName || !editProject}>
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Duplicate Team Dialog - New Component Call */}
      {teamToDuplicate && (
        <DuplicateTeamDialog 
          open={isDuplicateDialogOpen}
          onOpenChange={setDuplicateDialogOpen}
          team={teamToDuplicate}
          projects={projects}
          onDuplicate={handleDuplicateTeam}
        />
      )}
    </div>
  );
};

export default Teams;
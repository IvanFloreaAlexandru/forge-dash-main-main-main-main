import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription, // Add this line
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Filter,
  Users,
  Search,
  PlusCircle,
  MoreVertical,
  ChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils";

// Definirea tipurilor de date pentru membrii echipei
interface Member {
  id: number;
  name: string;
  role: string;
  avatar: string;
  status: "Online" | "Busy" | "Offline";
}

// Date simulate pentru membrii echipei
const initialMembers: Member[] = [
  { id: 1, name: "Ion Popescu", role: "Product Manager", avatar: "https://placehold.co/100x100/A0A0A0/ffffff?text=IP", status: "Online" },
  { id: 2, name: "Maria Ionescu", role: "UI/UX Designer", avatar: "https://placehold.co/100x100/3498db/ffffff?text=MI", status: "Busy" },
  { id: 3, name: "Andrei Vasilescu", role: "Full-stack Developer", avatar: "https://placehold.co/100x100/2ecc71/ffffff?text=AV", status: "Offline" },
  { id: 4, name: "Elena Dumitru", role: "Backend Developer", avatar: "https://placehold.co/100x100/e74c3c/ffffff?text=ED", status: "Online" },
  { id: 5, name: "Cristian Barbu", role: "Frontend Developer", avatar: "https://placehold.co/100x100/9b59b6/ffffff?text=CB", status: "Online" },
  { id: 6, name: "Daniela Mihai", role: "QA Engineer", avatar: "https://placehold.co/100x100/f39c12/ffffff?text=DM", status: "Busy" },
];

const getStatusColor = (status: Member['status']): string => {
  switch (status) {
    case "Online":
      return "bg-green-500";
    case "Busy":
      return "bg-amber-500";
    case "Offline":
      return "bg-gray-500";
    default:
      return "bg-gray-500";
  }
};

const Members: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterRole, setFilterRole] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("name");

  const roles = ["all", "Product Manager", "UI/UX Designer", "Full-stack Developer", "Backend Developer", "Frontend Developer", "QA Engineer"];

  const filteredMembers = initialMembers
    .filter((member: Member) => {
      const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = filterRole === "all" || member.role === filterRole;
      return matchesSearch && matchesRole;
    })
    .sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

  return (
    <div className="flex-1 space-y-6 p-4 sm:p-6 bg-gray-50 dark:bg-zinc-900 min-h-screen transition-colors duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Team Members
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Manage your team, roles, and access.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 border-gray-300 dark:border-zinc-700">
            <PlusCircle className="h-4 w-4" />
            Invite Member
          </Button>
        </div>
      </div>

      <Card className="border-gray-300 dark:border-zinc-700">
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-1/2 lg:w-1/3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2 w-full sm:w-auto">
                    <Filter className="h-4 w-4" />
                    <span className="hidden sm:inline">Filter by Role</span>
                    <ChevronDown className="h-4 w-4 ml-auto" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuRadioGroup value={filterRole} onValueChange={setFilterRole}>
                    {roles.map(role => (
                      <DropdownMenuRadioItem key={role} value={role}>
                        {role === "all" ? "All Roles" : role}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2 w-full sm:w-auto">
                    Sort by
                    <ChevronDown className="h-4 w-4 ml-auto" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
                    <DropdownMenuRadioItem value="name">Name</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="status">Status</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMembers.map((member: Member) => (
              <Card key={member.id} className="border-gray-300 dark:border-zinc-700 flex items-center p-4 hover:shadow-md transition-shadow">
                <Avatar className="h-12 w-12 mr-4">
                  <AvatarImage src={member.avatar} />
                  <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-base font-semibold">{member.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {member.role}
                  </p>
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
                      <DropdownMenuRadioGroup>
                        <DropdownMenuRadioItem value="edit">Edit</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="remove">Remove</DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </Card>
            ))}
          </div>
          {filteredMembers.length === 0 && (
            <div className="text-center text-muted-foreground p-8">No members found.</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Members;

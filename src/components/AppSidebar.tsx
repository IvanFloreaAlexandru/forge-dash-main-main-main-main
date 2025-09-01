// src/components/AppSidebar.tsx

import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  BarChart3,
  FolderKanban,
  GitBranch,
  FileText,
  Settings,
  Activity,
  BookOpen,
  ChevronRight,
  Home,
  Users,
  Target,
  FileStack,
  Scroll,
  Shield,
  Plug,
  Calendar,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface NavItem {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
}

const workItems: NavItem[] = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Projects", url: "/projects", icon: FolderKanban },
  { title: "Boards", url: "/boards", icon: BarChart3 },
  { title: "Pipelines", url: "/pipelines", icon: GitBranch },
  { title: "Goals", url: "/goals", icon: Target },
  { title: "Calendar", url: "/calendar", icon: Calendar },
  { title: "Activity", url: "/activity", icon: Activity },
];

const teamItems: NavItem[] = [
  { title: "Manage", url: "/members", icon: Users },
  { title: "Roles & Permissions", url: "/roles", icon: Shield },
];

const resourcesItems: NavItem[] = [
  { title: "Wiki", url: "/wiki", icon: BookOpen },
  { title: "Files", url: "/files", icon: FileStack },
  { title: "Logs", url: "/logs", icon: Scroll },
];

const settingsItems: NavItem[] = [
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Integrations", url: "/integrations", icon: Plug },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { open } = useSidebar();
  const collapsed = !open;
  const location = useLocation();
  const currentPath = location.pathname;
  const [expandedGroups, setExpandedGroups] = useState({
    work: true,
    team: true,
    resources: true,
    settings: true,
  });

  const isActive = (path: string) => currentPath === path;
  const getNavCls = (path: string) =>
    cn(
      "w-full justify-start transition-all duration-200",
      isActive(path)
        ? "bg-sidebar-accent text-sidebar-primary font-medium shadow-sm"
        : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-primary"
    );

  const toggleGroup = (group: keyof typeof expandedGroups) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [group]: !prev[group],
    }));
  };

  const renderGroup = (
    label: string,
    groupKey: keyof typeof expandedGroups,
    items: NavItem[]
  ) => (
    <SidebarGroup>
      <div className="flex items-center justify-between px-3 py-2">
        <SidebarGroupLabel className="text-sidebar-foreground/70 text-xs uppercase tracking-wider">
          {!collapsed && label}
        </SidebarGroupLabel>
        {!collapsed && (
          <button
            onClick={() => toggleGroup(groupKey)}
            className="text-sidebar-foreground/60 hover:text-sidebar-foreground transition-colors"
          >
            <ChevronRight
              className={cn(
                "h-3 w-3 transition-transform",
                expandedGroups[groupKey] && "rotate-90"
              )}
            />
          </button>
        )}
      </div>
      {(collapsed || expandedGroups[groupKey]) && (
        <SidebarGroupContent>
          <SidebarMenu className="space-y-1 px-3">
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <NavLink to={item.url} className={getNavCls(item.url)}>
                    <item.icon className="h-4 w-4" />
                    {!collapsed && <span className="ml-3">{item.title}</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      )}
    </SidebarGroup>
  );

  return (
    <Sidebar
      className={cn(
        "border-r border-sidebar-border transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <ScrollArea className="bg-sidebar sidebar h-full">
        {/* Logo Section */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-sidebar-primary to-violet-light rounded-lg flex items-center justify-center">
              <span className="text-sidebar-primary-foreground font-bold text-sm">
                PM
              </span>
            </div>
            {!collapsed && (
              <div>
                <h1 className="text-sidebar-foreground font-semibold text-sm">
                  Project Manager
                </h1>
                <p className="text-sidebar-foreground/60 text-xs">
                  Development Hub
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Groups */}
        {renderGroup("Work", "work", workItems)}
        {renderGroup("Team", "team", teamItems)}
        {renderGroup("Resources", "resources", resourcesItems)}
        {renderGroup("Settings", "settings", settingsItems)}

        {/* Collapse Toggle */}
        <div className="mt-auto p-3 border-t border-sidebar-border">
          <SidebarTrigger className="w-full justify-center" />
        </div>
      </ScrollArea>
    </Sidebar>
  );
}

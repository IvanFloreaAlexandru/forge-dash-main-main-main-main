import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Bell,
  Check,
  X,
  MessageCircle,
  UserPlus,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Settings,
  Trash2,
  Mail,
  ChevronDown,
  CheckCheck,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  type: "message" | "invitation" | "task" | "mention" | "deadline" | "system";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  avatar?: string;
  sender?: {
    name: string;
    avatar: string;
    initials: string;
  };
  actionRequired?: boolean;
  actions?: {
    accept?: () => void;
    decline?: () => void;
    view?: () => void;
  };
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "invitation",
    title: "Team Invitation",
    message: "Anna Martinez invited you to join the Development team",
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    read: false,
    sender: {
      name: "Anna Martinez",
      avatar: "/api/placeholder/32/32",
      initials: "AM",
    },
    actionRequired: true,
    actions: {
      accept: () => console.log("Accepted invitation"),
      decline: () => console.log("Declined invitation"),
    },
  },
  {
    id: "2",
    type: "message",
    title: "New Message",
    message: 'John Smith: "Can you review the latest design mockups?"',
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    read: false,
    sender: {
      name: "John Smith",
      avatar: "/api/placeholder/32/32",
      initials: "JS",
    },
  },
  {
    id: "3",
    type: "task",
    title: "Task Updated",
    message: 'Sarah Connor updated the task "Implement authentication"',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    read: true,
    sender: {
      name: "Sarah Connor",
      avatar: "/api/placeholder/32/32",
      initials: "SC",
    },
  },
  {
    id: "4",
    type: "deadline",
    title: "Deadline Reminder",
    message: 'Project milestone "MVP Release" is due tomorrow',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    read: false,
    actionRequired: true,
  },
  {
    id: "5",
    type: "mention",
    title: "Mentioned in Comment",
    message: 'David Miller mentioned you in "API Integration" task',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    read: true,
    sender: {
      name: "David Miller",
      avatar: "/api/placeholder/32/32",
      initials: "DM",
    },
  },
  {
    id: "6",
    type: "system",
    title: "System Update",
    message: "Your workspace has been upgraded to Pro plan",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    read: true,
  },
  {
    id: "7",
    type: "message",
    title: "New Message",
    message: 'Jane Doe: "Thanks for your help with the report!"',
    timestamp: new Date(Date.now() - 50 * 60 * 1000),
    read: false,
    sender: {
      name: "Jane Doe",
      avatar: "/api/placeholder/32/32",
      initials: "JD",
    },
  },
];

export function NotificationCenter() {
  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications);
  const [selectedTab, setSelectedTab] = useState("all");

  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    taskUpdates: true,
    mentions: true,
    invitations: true,
    deadlines: true,
    messages: true,
    systemUpdates: false,
  });

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  );
  const actionRequiredCount = useMemo(
    () => notifications.filter((n) => n.actionRequired).length,
    [notifications]
  );

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "message":
        return <MessageCircle className="h-4 w-4 text-blue-500" />;
      case "invitation":
        return <UserPlus className="h-4 w-4 text-green-500" />;
      case "task":
        return <CheckCircle className="h-4 w-4 text-purple-500" />;
      case "mention":
        return <UserPlus className="h-4 w-4 text-orange-500" />;
      case "deadline":
        return <Calendar className="h-4 w-4 text-red-500" />;
      case "system":
        return <AlertTriangle className="h-4 w-4 text-gray-500" />;
      default:
        return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  const filteredNotifications = notifications.filter((notification) => {
    switch (selectedTab) {
      case "all":
        return true;
      case "unread":
        return !notification.read;
      case "actionRequired":
        return notification.actionRequired;
      default:
        return false;
    }
  });

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAsUnread = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: false } : n))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const handleSettingChange = (key: string, value: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="h-full flex flex-col p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Bell className="h-6 w-6" />
            Notifications
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadCount}
              </Badge>
            )}
          </h1>
          <p className="text-muted-foreground text-sm">
            Stay updated with your team's activity
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8">
                Manage <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {unreadCount > 0 && (
                <DropdownMenuItem onClick={markAllAsRead}>
                  <CheckCheck className="h-4 w-4 mr-2" />
                  Mark all as read
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={clearAll} className="text-destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                Clear all
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Tabs
        defaultValue="all"
        value={selectedTab}
        onValueChange={setSelectedTab}
        className="flex-1 flex flex-col"
      >
        <TabsList className="flex overflow-x-auto w-full justify-start p-1 gap-1">
          <TabsTrigger value="all" className="flex-shrink-0">
            All ({notifications.length})
          </TabsTrigger>
          <TabsTrigger value="unread" className="flex-shrink-0">
            Unread ({unreadCount})
          </TabsTrigger>
          <TabsTrigger value="actionRequired" className="flex-shrink-0">
            Action ({actionRequiredCount})
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex-shrink-0">
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="flex-1 mt-4">
          <NotificationList
            notifications={filteredNotifications}
            onMarkAsRead={markAsRead}
            onMarkAsUnread={markAsUnread}
            onDelete={deleteNotification}
            formatTimestamp={formatTimestamp}
            getNotificationIcon={getNotificationIcon}
          />
        </TabsContent>

        <TabsContent value="unread" className="flex-1 mt-4">
          <NotificationList
            notifications={filteredNotifications}
            onMarkAsRead={markAsRead}
            onMarkAsUnread={markAsUnread}
            onDelete={deleteNotification}
            formatTimestamp={formatTimestamp}
            getNotificationIcon={getNotificationIcon}
          />
        </TabsContent>

        <TabsContent value="actionRequired" className="flex-1 mt-4">
          <NotificationList
            notifications={filteredNotifications}
            onMarkAsRead={markAsRead}
            onMarkAsUnread={markAsUnread}
            onDelete={deleteNotification}
            formatTimestamp={formatTimestamp}
            getNotificationIcon={getNotificationIcon}
          />
        </TabsContent>

        <TabsContent value="settings" className="flex-1 mt-4">
          <Card className="h-full overflow-hidden">
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure how and when you want to receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <ScrollArea className="h-[400px]">
                <div className="space-y-4 pr-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-medium">
                        Email Notifications
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications via email
                      </p>
                    </div>
                    <Switch
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) =>
                        handleSettingChange("emailNotifications", checked)
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-medium">
                        Push Notifications
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Receive browser push notifications
                      </p>
                    </div>
                    <Switch
                      checked={settings.pushNotifications}
                      onCheckedChange={(checked) =>
                        handleSettingChange("pushNotifications", checked)
                      }
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-medium">
                        Task Updates
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when tasks are updated
                      </p>
                    </div>
                    <Switch
                      checked={settings.taskUpdates}
                      onCheckedChange={(checked) =>
                        handleSettingChange("taskUpdates", checked)
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-medium">Mentions</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when someone mentions you
                      </p>
                    </div>
                    <Switch
                      checked={settings.mentions}
                      onCheckedChange={(checked) =>
                        handleSettingChange("mentions", checked)
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-medium">Invitations</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified about team invitations
                      </p>
                    </div>
                    <Switch
                      checked={settings.invitations}
                      onCheckedChange={(checked) =>
                        handleSettingChange("invitations", checked)
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-medium">Deadlines</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified about upcoming deadlines
                      </p>
                    </div>
                    <Switch
                      checked={settings.deadlines}
                      onCheckedChange={(checked) =>
                        handleSettingChange("deadlines", checked)
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-medium">Messages</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified about new messages
                      </p>
                    </div>
                    <Switch
                      checked={settings.messages}
                      onCheckedChange={(checked) =>
                        handleSettingChange("messages", checked)
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-medium">
                        System Updates
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified about system updates
                      </p>
                    </div>
                    <Switch
                      checked={settings.systemUpdates}
                      onCheckedChange={(checked) =>
                        handleSettingChange("systemUpdates", checked)
                      }
                    />
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface NotificationListProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAsUnread: (id: string) => void;
  onDelete: (id: string) => void;
  formatTimestamp: (date: Date) => string;
  getNotificationIcon: (type: Notification["type"]) => React.ReactNode;
}

function NotificationList({
  notifications,
  onMarkAsRead,
  onMarkAsUnread,
  onDelete,
  formatTimestamp,
  getNotificationIcon,
}: NotificationListProps) {
  if (notifications.length === 0) {
    return (
      <Card className="h-full">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Bell className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-lg font-medium text-muted-foreground">
            No notifications
          </p>
          <p className="text-sm text-muted-foreground">You're all caught up!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <ScrollArea className="h-full">
      <div className="space-y-2 pr-4">
        {notifications.map((notification) => (
          <Card
            key={notification.id}
            className={cn(
              "transition-all hover:shadow-md",
              !notification.read
                ? "border-l-4 border-l-primary bg-primary/5"
                : ""
            )}
          >
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                {/* Avatar or Icon */}
                <div className="flex-shrink-0">
                  {notification.sender ? (
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={notification.sender.avatar} />
                      <AvatarFallback>
                        {notification.sender.initials}
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                      {getNotificationIcon(notification.type)}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-foreground truncate">
                      {notification.title}
                    </h4>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-muted-foreground">
                        {formatTimestamp(notification.timestamp)}
                      </span>
                      {!notification.read && (
                        <div className="h-2 w-2 bg-primary rounded-full" />
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {notification.message}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center space-x-2">
                      {notification.actionRequired && notification.actions && (
                        <>
                          {notification.actions.accept && (
                            <Button
                              size="sm"
                              onClick={notification.actions.accept}
                              className="h-7 px-3"
                            >
                              <Check className="h-3 w-3 mr-1" />
                              Accept
                            </Button>
                          )}
                          {notification.actions.decline && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={notification.actions.decline}
                              className="h-7 px-3"
                            >
                              <X className="h-3 w-3 mr-1" />
                              Decline
                            </Button>
                          )}
                          {notification.actions.view && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={notification.actions.view}
                              className="h-7 px-3"
                            >
                              View
                            </Button>
                          )}
                        </>
                      )}
                    </div>

                    {/* More Options */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0"
                        >
                          <Settings className="h-3 w-3" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {notification.read ? (
                          <DropdownMenuItem
                            onClick={() => onMarkAsUnread(notification.id)}
                          >
                            <Mail className="h-4 w-4 mr-2" />
                            Mark as unread
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem
                            onClick={() => onMarkAsRead(notification.id)}
                          >
                            <Check className="h-4 w-4 mr-2" />
                            Mark as read
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                          onClick={() => onDelete(notification.id)}
                          className="text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
}

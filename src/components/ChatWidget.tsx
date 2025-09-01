import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Send,
  Paperclip,
  Smile,
  MoreVertical,
  Phone,
  Video,
  Search,
  Hash,
  Users,
  Plus,
  Settings,
  MessageCircle,
  Minimize2,
  ArrowLeft,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

// Interface definitions remains the same
interface Message {
  id: string;
  sender: {
    id: string;
    name: string;
    avatar: string;
    initials: string;
  };
  content: string;
  timestamp: Date;
  isOwn: boolean;
}

interface Channel {
  id: string;
  name: string;
  type: "channel" | "direct";
  members: number;
  unread: number;
  isOnline?: boolean;
}

// Mock data remains the same
const mockChannels: Channel[] = [
  { id: "1", name: "general", type: "channel", members: 15, unread: 0 },
  { id: "2", name: "development", type: "channel", members: 8, unread: 3 },
  { id: "3", name: "design", type: "channel", members: 5, unread: 0 },
  {
    id: "4",
    name: "Anna Martinez",
    type: "direct",
    members: 2,
    unread: 2,
    isOnline: true,
  },
  {
    id: "5",
    name: "John Smith",
    type: "direct",
    members: 2,
    unread: 0,
    isOnline: false,
  },
  {
    id: "6",
    name: "Sarah Connor",
    type: "direct",
    members: 2,
    unread: 1,
    isOnline: true,
  },
];

const mockMessages: Message[] = [
  {
    id: "1",
    sender: {
      id: "1",
      name: "Anna Martinez",
      avatar: "https://placehold.co/32x32?text=AM",
      initials: "AM",
    },
    content:
      "Hey team! Just wanted to give you an update on the project status.",
    timestamp: new Date(Date.now() - 10 * 60 * 1000),
    isOwn: false,
  },
  {
    id: "2",
    sender: {
      id: "2",
      name: "You",
      avatar: "https://placehold.co/32x32?text=You",
      initials: "DM",
    },
    content: "Thanks Anna! How are we progressing with the new features?",
    timestamp: new Date(Date.now() - 8 * 60 * 1000),
    isOwn: true,
  },
  {
    id: "3",
    sender: {
      id: "1",
      name: "Anna Martinez",
      avatar: "https://placehold.co/32x32?text=AM",
      initials: "AM",
    },
    content:
      "We're about 75% done with the dashboard redesign. Should be ready for review by Friday.",
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    isOwn: false,
  },
  {
    id: "4",
    sender: {
      id: "3",
      name: "John Smith",
      avatar: "https://placehold.co/32x32?text=JS",
      initials: "JS",
    },
    content:
      "Great work everyone! I'll prepare the testing environment for the review.",
    timestamp: new Date(Date.now() - 2 * 60 * 1000),
    isOwn: false,
  },
];

export function ChatWidget({ isOpen, onToggle }) {
  // New state to manage the view: 'channels' or 'chat'
  const [view, setView] = useState("channels");
  const [selectedChannel, setSelectedChannel] = useState<Channel>(
    mockChannels[1]
  );
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        sender: {
          id: "2",
          name: "You",
          avatar: `https://placehold.co/32x32?text=${"You"
            .split(" ")
            .map((n) => n[0])
            .join("")}`,
          initials: "DM",
        },
        content: newMessage,
        timestamp: new Date(),
        isOwn: true,
      };
      setMessages([...messages, message]);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const handleSelectChannel = (channel: Channel) => {
    setSelectedChannel(channel);
    setView("chat");
  };

  const filteredChannels = mockChannels.filter((channel) =>
    channel.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card
      className={`fixed bottom-2 right-2 w-[400px] h-[500px] flex flex-col shadow-xl z-50 transition-transform transform ${
        isOpen ? "scale-100" : "scale-0"
      }`}
    >
      {view === "channels" ? (
        // Sidebar for channels
        <div className="flex-1 flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 border-b">
            <div className="flex items-center space-x-3">
              <MessageCircle className="h-5 w-5 text-primary" />
              <CardTitle className="text-base font-semibold">Chat</CardTitle>
            </div>
            <Button variant="ghost" size="sm" onClick={onToggle}>
              <Minimize2 className="h-4 w-4" />
            </Button>
          </CardHeader>
          <div className="p-4 border-b border-border">
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
            <Search className="absolute left-6 top-[78px] h-4 w-4 text-muted-foreground" />
          </div>
          <ScrollArea className="flex-1 p-2">
            <div className="space-y-1">
              <div className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase">
                Channels
              </div>
              {filteredChannels
                .filter((c) => c.type === "channel")
                .map((channel) => (
                  <button
                    key={channel.id}
                    onClick={() => handleSelectChannel(channel)}
                    className={`w-full flex items-center justify-between p-2 rounded-lg text-left hover:bg-muted/50 ${
                      selectedChannel.id === channel.id
                        ? "bg-primary/10 text-primary"
                        : ""
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Hash className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm font-medium truncate">
                        {channel.name}
                      </span>
                    </div>
                    {channel.unread > 0 && (
                      <Badge
                        variant="destructive"
                        className="h-4 w-4 text-xs p-0 flex items-center justify-center rounded-full"
                      >
                        {channel.unread}
                      </Badge>
                    )}
                  </button>
                ))}
              <div className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase mt-4">
                Direct Messages
              </div>
              {filteredChannels
                .filter((c) => c.type === "direct")
                .map((channel) => (
                  <button
                    key={channel.id}
                    onClick={() => handleSelectChannel(channel)}
                    className={`w-full flex items-center justify-between p-2 rounded-lg text-left hover:bg-muted/50 ${
                      selectedChannel.id === channel.id
                        ? "bg-primary/10 text-primary"
                        : ""
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <div className="relative">
                        <Avatar className="h-5 w-5">
                          <AvatarImage
                            src={`https://placehold.co/20x20?text=${channel.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}`}
                          />
                          <AvatarFallback className="text-xs">
                            {channel.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        {channel.isOnline && (
                          <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 bg-green-500 border-2 border-background rounded-full"></div>
                        )}
                      </div>
                      <span className="text-sm font-medium truncate">
                        {channel.name}
                      </span>
                    </div>
                    {channel.unread > 0 && (
                      <Badge
                        variant="destructive"
                        className="h-4 w-4 text-xs p-0 flex items-center justify-center rounded-full"
                      >
                        {channel.unread}
                      </Badge>
                    )}
                  </button>
                ))}
            </div>
          </ScrollArea>
        </div>
      ) : (
        // Chat View
        <div className="flex-1 flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 border-b">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setView("channels")}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              {selectedChannel.type === "channel" ? (
                <Hash className="h-5 w-5 text-muted-foreground" />
              ) : (
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={`https://placehold.co/32x32?text=${selectedChannel.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}`}
                  />
                  <AvatarFallback>
                    {selectedChannel.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              )}
              <div>
                <CardTitle className="text-base font-semibold">
                  {selectedChannel.name}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {selectedChannel.type === "channel"
                    ? `${selectedChannel.members} members`
                    : selectedChannel.isOnline
                    ? "Online"
                    : "Last seen 2 hours ago"}
                </p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onToggle}>
              <Minimize2 className="h-4 w-4" />
            </Button>
          </CardHeader>

          {/* Messages Area */}
          <div className="flex-1 flex flex-col p-4 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((message, index) => {
                const showAvatar =
                  index === 0 ||
                  messages[index - 1].sender.id !== message.sender.id;
                return (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.isOwn ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`flex space-x-3 max-w-[70%] ${
                        message.isOwn ? "flex-row-reverse space-x-reverse" : ""
                      }`}
                    >
                      {showAvatar && !message.isOwn && (
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={message.sender.avatar} />
                          <AvatarFallback>
                            {message.sender.initials}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={`${showAvatar ? "" : "ml-11"} ${
                          message.isOwn ? "mr-11" : ""
                        }`}
                      >
                        {showAvatar && (
                          <div
                            className={`flex items-center space-x-2 mb-1 ${
                              message.isOwn ? "justify-end" : ""
                            }`}
                          >
                            <span className="text-sm font-medium">
                              {message.sender.name}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {formatTime(message.timestamp)}
                            </span>
                          </div>
                        )}
                        <div
                          className={`rounded-lg px-4 py-2 ${
                            message.isOwn
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-foreground"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>
          </div>
          {/* Message Input */}
          <div className="p-4 border-t border-border">
            <div className="flex items-end space-x-2">
              <Input
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 min-w-0"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className="h-10 w-10 p-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}

// Separate component for the chat icon
export function ChatWidgetIcon({ onToggle, unreadCount }) {
  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      <Button
        className="relative h-14 w-14 rounded-full shadow-lg"
        onClick={onToggle}
      >
        <MessageCircle className="h-6 w-6" />
        {unreadCount > 0 && (
          <Badge
            variant="destructive"
            className="absolute top-0 right-0 h-6 w-6 text-xs p-0 flex items-center justify-center rounded-full"
          >
            {unreadCount}
          </Badge>
        )}
      </Button>
    </div>
  );
}

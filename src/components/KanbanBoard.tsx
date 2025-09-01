import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { 
  Plus, 
  MoreHorizontal, 
  Clock, 
  Flag, 
  MessageSquare,
  Paperclip,
  Calendar as CalendarIcon,
  User,
  Tag,
  MessageCircle,
  Save,
  Trash2,
  Copy,
  ExternalLink
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high" | "urgent";
  assignee: {
    id: string;
    name: string;
    avatar: string;
    initials: string;
  };
  dueDate?: Date;
  tags: string[];
  comments: Comment[];
  attachments: Attachment[];
  status: "todo" | "inprogress" | "done";
  createdAt: Date;
  updatedAt: Date;
}

interface Comment {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    initials: string;
  };
  content: string;
  createdAt: Date;
}

interface Attachment {
  id: string;
  name: string;
  size: string;
  type: string;
  url: string;
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
  color: string;
}

const mockAssignees = [
  { id: '1', name: 'Sarah Johnson', avatar: '/api/placeholder/32/32', initials: 'SJ' },
  { id: '2', name: 'Mike Chen', avatar: '/api/placeholder/32/32', initials: 'MC' },
  { id: '3', name: 'Emily Davis', avatar: '/api/placeholder/32/32', initials: 'ED' },
  { id: '4', name: 'Alex Smith', avatar: '/api/placeholder/32/32', initials: 'AS' },
];

const initialData: Column[] = [
  {
    id: "todo",
    title: "To Do",
    color: "border-muted-foreground/20",
    tasks: [
      {
        id: "1",
        title: "Design user onboarding flow",
        description: "Create wireframes and mockups for the new user registration process",
        priority: "high",
        assignee: mockAssignees[0],
        dueDate: new Date(2024, 11, 28),
        tags: ["Design", "UX"],
        comments: [
          {
            id: "c1",
            author: mockAssignees[1],
            content: "We should consider A/B testing different onboarding flows",
            createdAt: new Date(2024, 11, 20)
          }
        ],
        attachments: [
          {
            id: "a1",
            name: "onboarding-wireframes.figma",
            size: "2.4 MB",
            type: "figma",
            url: "#"
          }
        ],
        status: "todo",
        createdAt: new Date(2024, 11, 15),
        updatedAt: new Date(2024, 11, 20)
      },
      {
        id: "2",
        title: "Setup CI/CD pipeline",
        description: "Configure GitHub Actions for automated testing and deployment",
        priority: "medium",
        assignee: mockAssignees[1],
        dueDate: new Date(2024, 11, 30),
        tags: ["DevOps", "Backend"],
        comments: [],
        attachments: [],
        status: "todo",
        createdAt: new Date(2024, 11, 18),
        updatedAt: new Date(2024, 11, 18)
      }
    ]
  },
  {
    id: "inprogress",
    title: "In Progress",
    color: "border-info/50",
    tasks: [
      {
        id: "4",
        title: "Implement payment gateway",
        description: "Integrate Stripe payment processing for subscriptions",
        priority: "high",
        assignee: mockAssignees[3],
        dueDate: new Date(2024, 11, 29),
        tags: ["Backend", "Payment"],
        comments: [
          {
            id: "c2",
            author: mockAssignees[0],
            content: "Make sure to implement webhook handling for payment confirmations",
            createdAt: new Date(2024, 11, 22)
          }
        ],
        attachments: [],
        status: "inprogress",
        createdAt: new Date(2024, 11, 16),
        updatedAt: new Date(2024, 11, 22)
      }
    ]
  },
  {
    id: "done",
    title: "Done",
    color: "border-success/50",
    tasks: [
      {
        id: "6",
        title: "User authentication system",
        description: "Implement JWT-based authentication with refresh tokens",
        priority: "high",
        assignee: mockAssignees[1],
        tags: ["Backend", "Security"],
        comments: [],
        attachments: [],
        status: "done",
        createdAt: new Date(2024, 11, 10),
        updatedAt: new Date(2024, 11, 25)
      }
    ]
  }
];

const statusOptions = [
  { value: 'todo', label: 'To Do' },
  { value: 'inprogress', label: 'In Progress' },
  { value: 'done', label: 'Done' }
];

const priorityColors = {
  low: 'bg-blue-100 text-blue-700 border-blue-200',
  medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  high: 'bg-orange-100 text-orange-700 border-orange-200',
  urgent: 'bg-red-100 text-red-700 border-red-200'
};

export default function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>(initialData);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedTask, setEditedTask] = useState<Task | null>(null);
  const [newComment, setNewComment] = useState('');
  const [newTag, setNewTag] = useState('');
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const { toast } = useToast();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": 
      case "urgent": return "border-l-destructive bg-destructive/5";
      case "medium": return "border-l-warning bg-warning/5";
      case "low": return "border-l-success bg-success/5";
      default: return "border-l-muted";
    }
  };

  const getPriorityBadgeColor = (priority: string) => {
    switch (priority) {
      case "high":
      case "urgent": return "bg-destructive/10 text-destructive border-destructive/20";
      case "medium": return "bg-warning/10 text-warning border-warning/20";
      case "low": return "bg-success/10 text-success border-success/20";
      default: return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setEditedTask({ ...task });
    setIsModalOpen(true);
  };

  const handleDragStart = (e: React.DragEvent, task: Task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, targetColumnId: string) => {
    e.preventDefault();
    if (!draggedTask) return;

    const newColumns = columns.map(column => {
      if (column.id === targetColumnId) {
        return {
          ...column,
          tasks: [...column.tasks, { ...draggedTask, status: targetColumnId as Task["status"] }]
        };
      } else {
        return {
          ...column,
          tasks: column.tasks.filter(task => task.id !== draggedTask.id)
        };
      }
    });

    setColumns(newColumns);
    setDraggedTask(null);
  };

  const handleSaveTask = (updatedTask: Task) => {
    const newColumns = columns.map(column => ({
      ...column,
      tasks: column.tasks.map(task => 
        task.id === updatedTask.id ? { ...updatedTask, updatedAt: new Date() } : task
      )
    }));
    setColumns(newColumns);
    setIsModalOpen(false);
    toast({
      title: "Task updated",
      description: "Task has been successfully updated.",
    });
  };

  const handleDeleteTask = (taskId: string) => {
    const newColumns = columns.map(column => ({
      ...column,
      tasks: column.tasks.filter(task => task.id !== taskId)
    }));
    setColumns(newColumns);
    setIsModalOpen(false);
    toast({
      title: "Task deleted",
      description: "Task has been successfully deleted.",
      variant: "destructive"
    });
  };

  const handleAddComment = () => {
    if (newComment.trim() && editedTask) {
      const comment: Comment = {
        id: Date.now().toString(),
        author: mockAssignees[3],
        content: newComment,
        createdAt: new Date()
      };
      setEditedTask(prev => prev ? {
        ...prev,
        comments: [...prev.comments, comment]
      } : null);
      setNewComment('');
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && editedTask && !editedTask.tags.includes(newTag.trim())) {
      setEditedTask(prev => prev ? {
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      } : null);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setEditedTask(prev => prev ? {
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    } : null);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ro-RO', {
      day: 'numeric',
      month: 'short'
    }).format(date);
  };

  const formatDateFull = (date: Date) => {
    return new Intl.DateTimeFormat('ro-RO', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className="flex-1 p-4 sm:p-6 bg-dashboard-bg min-h-screen">
      {/* Header */}
      <div className="mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Kanban Board</h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Manage your tasks and track progress across different stages.
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Add Task
          </Button>
        </div>
      </div>

      {/* Board */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 h-full overflow-x-auto">
        <div className="lg:hidden flex gap-4 min-w-max">
          {columns.map((column) => (
            <div key={column.id} className="flex flex-col h-full min-w-[280px]">
              {/* Column Header */}
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-lg">{column.title}</h3>
                  <Badge variant="secondary" className="text-xs">
                    {column.tasks.length}
                  </Badge>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>

              {/* Tasks Container */}
              <div
                className={cn(
                  "flex-1 space-y-3 p-4 rounded-lg border-2 border-dashed transition-colors min-h-[500px]",
                  column.color,
                  "hover:bg-muted/20"
                )}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, column.id)}
              >
                {column.tasks.map((task) => (
                  <Card
                    key={task.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task)}
                    onClick={() => handleTaskClick(task)}
                    className={cn(
                      "cursor-pointer hover:shadow-lg transition-all duration-200 border-l-4",
                      getPriorityColor(task.priority),
                      "hover:scale-105"
                    )}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-sm font-medium leading-tight">
                          {task.title}
                        </CardTitle>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <MoreHorizontal className="h-3 w-3" />
                        </Button>
                      </div>
                      {task.description && (
                        <p className="text-xs text-muted-foreground mt-2">
                          {task.description}
                        </p>
                      )}
                    </CardHeader>

                    <CardContent className="pt-0">
                      {/* Tags */}
                      {task.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {task.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs px-2 py-0.5">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {/* Priority & Due Date */}
                      <div className="flex items-center justify-between mb-3">
                        <Badge
                          variant="outline"
                          className={cn("text-xs capitalize", getPriorityBadgeColor(task.priority))}
                        >
                          <Flag className="mr-1 h-2 w-2" />
                          {task.priority}
                        </Badge>
                        {task.dueDate && (
                          <div className="flex items-center text-xs text-muted-foreground">
                            <CalendarIcon className="mr-1 h-3 w-3" />
                            {formatDate(task.dueDate)}
                          </div>
                        )}
                      </div>

                      {/* Bottom Section */}
                      <div className="flex items-center justify-between">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={task.assignee.avatar} />
                          <AvatarFallback className="text-xs">
                            {task.assignee.initials}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          {task.comments.length > 0 && (
                            <div className="flex items-center space-x-1">
                              <MessageSquare className="h-3 w-3" />
                              <span>{task.comments.length}</span>
                            </div>
                          )}
                          {task.attachments.length > 0 && (
                            <div className="flex items-center space-x-1">
                              <Paperclip className="h-3 w-3" />
                              <span>{task.attachments.length}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Add Task Button */}
                <Button
                  variant="ghost"
                  className="w-full h-12 border-2 border-dashed border-muted-foreground/20 hover:border-primary/50 hover:bg-primary/5 transition-colors"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add a task
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Desktop View */}
        {columns.map((column) => (
          <div key={column.id} className="hidden lg:flex flex-col h-full">
            {/* Column Header */}
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-lg">{column.title}</h3>
                <Badge variant="secondary" className="text-xs">
                  {column.tasks.length}
                </Badge>
              </div>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>

            {/* Tasks Container */}
            <div
              className={cn(
                "flex-1 space-y-3 p-4 rounded-lg border-2 border-dashed transition-colors min-h-[500px]",
                column.color,
                "hover:bg-muted/20"
              )}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.id)}
            >
              {column.tasks.map((task) => (
                <Card
                  key={task.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task)}
                  onClick={() => handleTaskClick(task)}
                  className={cn(
                    "cursor-pointer hover:shadow-lg transition-all duration-200 border-l-4",
                    getPriorityColor(task.priority),
                    "hover:scale-105"
                  )}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-sm font-medium leading-tight">
                        {task.title}
                      </CardTitle>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <MoreHorizontal className="h-3 w-3" />
                      </Button>
                    </div>
                    {task.description && (
                      <p className="text-xs text-muted-foreground mt-2">
                        {task.description}
                      </p>
                    )}
                  </CardHeader>

                  <CardContent className="pt-0">
                    {/* Tags */}
                    {task.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {task.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs px-2 py-0.5">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Priority & Due Date */}
                    <div className="flex items-center justify-between mb-3">
                      <Badge
                        variant="outline"
                        className={cn("text-xs capitalize", getPriorityBadgeColor(task.priority))}
                      >
                        <Flag className="mr-1 h-2 w-2" />
                        {task.priority}
                      </Badge>
                      {task.dueDate && (
                        <div className="flex items-center text-xs text-muted-foreground">
                          <CalendarIcon className="mr-1 h-3 w-3" />
                          {formatDate(task.dueDate)}
                        </div>
                      )}
                    </div>

                    {/* Bottom Section */}
                    <div className="flex items-center justify-between">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={task.assignee.avatar} />
                        <AvatarFallback className="text-xs">
                          {task.assignee.initials}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        {task.comments.length > 0 && (
                          <div className="flex items-center space-x-1">
                            <MessageSquare className="h-3 w-3" />
                            <span>{task.comments.length}</span>
                          </div>
                        )}
                        {task.attachments.length > 0 && (
                          <div className="flex items-center space-x-1">
                            <Paperclip className="h-3 w-3" />
                            <span>{task.attachments.length}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Add Task Button */}
              <Button
                variant="ghost"
                className="w-full h-12 border-2 border-dashed border-muted-foreground/20 hover:border-primary/50 hover:bg-primary/5 transition-colors"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add a task
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Task Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader className="flex-shrink-0">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl">Task Details</DialogTitle>
              <div className="flex items-center space-x-2">
                <Button onClick={() => editedTask && handleSaveTask(editedTask)} size="sm">
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Copy className="h-4 w-4 mr-2" />
                      Duplicate Task
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Open in New Tab
                    </DropdownMenuItem>
                    <Separator />
                    <DropdownMenuItem onClick={() => selectedTask && handleDeleteTask(selectedTask.id)} className="text-destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Task
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </DialogHeader>

          {editedTask && (
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-hidden">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6 overflow-y-auto pr-2">
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={editedTask.title}
                    onChange={(e) => setEditedTask(prev => prev ? { ...prev, title: e.target.value } : null)}
                    className="text-lg font-medium"
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={editedTask.description}
                    onChange={(e) => setEditedTask(prev => prev ? { ...prev, description: e.target.value } : null)}
                    rows={4}
                    placeholder="Add a description..."
                  />
                </div>

                {/* Comments */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4" />
                    <Label>Comments ({editedTask.comments.length})</Label>
                  </div>
                  
                  <div className="space-y-4">
                    {editedTask.comments.map((comment) => (
                      <div key={comment.id} className="flex space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={comment.author.avatar} />
                          <AvatarFallback>{comment.author.initials}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-sm font-medium">{comment.author.name}</span>
                            <span className="text-xs text-muted-foreground">
                              {new Intl.DateTimeFormat('ro-RO', {
                                day: 'numeric',
                                month: 'short',
                                hour: '2-digit',
                                minute: '2-digit'
                              }).format(comment.createdAt)}
                            </span>
                          </div>
                          <div className="bg-muted rounded-lg p-3">
                            <p className="text-sm">{comment.content}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add Comment */}
                  <div className="flex space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={mockAssignees[3].avatar} />
                      <AvatarFallback>{mockAssignees[3].initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <Textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a comment..."
                        rows={2}
                      />
                      <Button onClick={handleAddComment} size="sm" disabled={!newComment.trim()}>
                        Add Comment
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Attachments */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Paperclip className="h-4 w-4" />
                    <Label>Attachments ({editedTask.attachments.length})</Label>
                  </div>
                  
                  {editedTask.attachments.length > 0 ? (
                    <div className="space-y-2">
                      {editedTask.attachments.map((attachment) => (
                        <div key={attachment.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Paperclip className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">{attachment.name}</p>
                              <p className="text-xs text-muted-foreground">{attachment.size}</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Download
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 border-2 border-dashed rounded-lg">
                      <Paperclip className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">No attachments</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        Add Attachment
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6 overflow-y-auto">
                {/* Status */}
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select
                    value={editedTask.status}
                    onValueChange={(value: any) => setEditedTask(prev => prev ? { ...prev, status: value } : null)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Priority */}
                <div className="space-y-2">
                  <Label>Priority</Label>
                  <Select
                    value={editedTask.priority}
                    onValueChange={(value: any) => setEditedTask(prev => prev ? { ...prev, priority: value } : null)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                  <Badge className={cn("capitalize w-fit", priorityColors[editedTask.priority])}>
                    <Flag className="h-3 w-3 mr-1" />
                    {editedTask.priority}
                  </Badge>
                </div>

                {/* Assignee */}
                <div className="space-y-2">
                  <Label>Assignee</Label>
                  <Select
                    value={editedTask.assignee?.id || ""}
                    onValueChange={(value) => {
                      const assignee = mockAssignees.find(a => a.id === value);
                      setEditedTask(prev => prev ? { ...prev, assignee: assignee! } : null);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select assignee" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockAssignees.map((assignee) => (
                        <SelectItem key={assignee.id} value={assignee.id}>
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-5 w-5">
                              <AvatarImage src={assignee.avatar} />
                              <AvatarFallback className="text-xs">{assignee.initials}</AvatarFallback>
                            </Avatar>
                            <span>{assignee.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {editedTask.assignee && (
                    <div className="flex items-center space-x-2 p-2 bg-muted rounded-lg">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={editedTask.assignee.avatar} />
                        <AvatarFallback className="text-xs">{editedTask.assignee.initials}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{editedTask.assignee.name}</span>
                    </div>
                  )}
                </div>

                {/* Due Date */}
                <div className="space-y-2">
                  <Label>Due Date</Label>
                  <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !editedTask.dueDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {editedTask.dueDate ? formatDateFull(editedTask.dueDate) : "Set due date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={editedTask.dueDate}
                        onSelect={(date) => {
                          setEditedTask(prev => prev ? { ...prev, dueDate: date } : null);
                          setIsDatePickerOpen(false);
                        }}
                        className="p-3 pointer-events-auto"
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Tags */}
                <div className="space-y-2">
                  <Label>Tags</Label>
                  <div className="flex flex-wrap gap-2">
                    {editedTask.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="cursor-pointer">
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                        <button
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-1 hover:text-destructive"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Add tag..."
                      onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                    />
                    <Button onClick={handleAddTag} size="sm" disabled={!newTag.trim()}>
                      Add
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Metadata */}
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">Created</p>
                    <p>{new Intl.DateTimeFormat('ro-RO', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    }).format(editedTask.createdAt)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Last updated</p>
                    <p>{new Intl.DateTimeFormat('ro-RO', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    }).format(editedTask.updatedAt)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Task ID</p>
                    <p className="font-mono">{editedTask.id}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
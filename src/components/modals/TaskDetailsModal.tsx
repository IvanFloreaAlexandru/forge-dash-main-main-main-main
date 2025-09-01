import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Calendar as CalendarIcon,
  User,
  Flag,
  Tag,
  Clock,
  MessageCircle,
  Paperclip,
  MoreHorizontal,
  Save,
  Trash2,
  Copy,
  ExternalLink
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignee?: {
    id: string;
    name: string;
    avatar: string;
    initials: string;
  };
  dueDate?: Date;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  comments: Comment[];
  attachments: Attachment[];
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

interface TaskDetailsModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const mockAssignees = [
  { id: '1', name: 'Anna Martinez', avatar: '/api/placeholder/32/32', initials: 'AM' },
  { id: '2', name: 'John Smith', avatar: '/api/placeholder/32/32', initials: 'JS' },
  { id: '3', name: 'Sarah Connor', avatar: '/api/placeholder/32/32', initials: 'SC' },
  { id: '4', name: 'David Miller', avatar: '/api/placeholder/32/32', initials: 'DM' },
];

const priorityColors = {
  low: 'bg-blue-100 text-blue-700 border-blue-200',
  medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  high: 'bg-orange-100 text-orange-700 border-orange-200',
  urgent: 'bg-red-100 text-red-700 border-red-200'
};

const statusOptions = [
  { value: 'todo', label: 'To Do' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'done', label: 'Done' }
];

export function TaskDetailsModal({ task, isOpen, onClose, onSave, onDelete }: TaskDetailsModalProps) {
  const { toast } = useToast();
  const [editedTask, setEditedTask] = useState<Task | null>(task);
  const [newComment, setNewComment] = useState('');
  const [newTag, setNewTag] = useState('');
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  if (!task || !editedTask) return null;

  const handleSave = () => {
    onSave(editedTask);
    toast({
      title: "Task updated",
      description: "Task has been successfully updated.",
    });
    onClose();
  };

  const handleDelete = () => {
    onDelete(task.id);
    toast({
      title: "Task deleted",
      description: "Task has been successfully deleted.",
      variant: "destructive"
    });
    onClose();
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        author: mockAssignees[3], // Current user
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
    if (newTag.trim() && !editedTask.tags.includes(newTag.trim())) {
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
    return format(date, "PPP");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl">Task Details</DialogTitle>
            <div className="flex items-center space-x-2">
              <Button onClick={handleSave} size="sm">
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
                  <DropdownMenuItem onClick={handleDelete} className="text-destructive">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Task
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </DialogHeader>

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
                          {format(comment.createdAt, "MMM d, h:mm a")}
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
                  setEditedTask(prev => prev ? { ...prev, assignee } : null);
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
                    {editedTask.dueDate ? formatDate(editedTask.dueDate) : "Set due date"}
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
                <p>{format(editedTask.createdAt, "PPP 'at' p")}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Last updated</p>
                <p>{format(editedTask.updatedAt, "PPP 'at' p")}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Task ID</p>
                <p className="font-mono">{editedTask.id}</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
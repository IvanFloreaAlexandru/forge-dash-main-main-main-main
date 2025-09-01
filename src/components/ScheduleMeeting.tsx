import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Calendar as CalendarIcon,
  Clock,
  Users,
  Link as LinkIcon,
  Edit3,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function ScheduleMeeting() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScheduling, setIsScheduling] = useState(false);

  const handleSchedule = () => {
    setIsScheduling(true);
    // Simulează o întârziere pentru a afișa starea de încărcare
    setTimeout(() => {
      console.log("Meeting scheduled!");
      setIsScheduling(false);
      setIsOpen(false);
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
          <CalendarIcon className="mr-2 h-4 w-4" />
          Schedule Meeting
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-primary" /> Schedule New
            Meeting
          </DialogTitle>
          <DialogDescription>
            Fill in the details for your new meeting.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label
              htmlFor="title"
              className="flex items-center gap-2 text-sm font-medium"
            >
              <Edit3 className="h-4 w-4 text-muted-foreground" />
              Title
            </Label>
            <Input id="title" placeholder="Project Sync" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="date"
                className="flex items-center gap-2 text-sm font-medium"
              >
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                Date
              </Label>
              <Input id="date" type="date" />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="time"
                className="flex items-center gap-2 text-sm font-medium"
              >
                <Clock className="h-4 w-4 text-muted-foreground" />
                Time
              </Label>
              <Input id="time" type="time" />
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="participants"
              className="flex items-center gap-2 text-sm font-medium"
            >
              <Users className="h-4 w-4 text-muted-foreground" />
              Participants
            </Label>
            <Input
              id="participants"
              placeholder="john@example.com, jane@example.com"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="link"
              className="flex items-center gap-2 text-sm font-medium"
            >
              <LinkIcon className="h-4 w-4 text-muted-foreground" />
              Meeting Link (Optional)
            </Label>
            <Input id="link" placeholder="e.g., Google Meet, Zoom" />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="notes"
              className="flex items-center gap-2 text-sm font-medium"
            >
              <Edit3 className="h-4 w-4 text-muted-foreground" />
              Notes
            </Label>
            <Textarea
              id="notes"
              placeholder="Add a description for the meeting..."
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={handleSchedule}
            disabled={isScheduling}
          >
            {isScheduling ? "Scheduling..." : "Schedule"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

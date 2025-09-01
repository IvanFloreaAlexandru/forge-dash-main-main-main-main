import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  ExternalLink,
  Users,
  Calendar as CalendarIcon,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

// Definirea tipului pentru un eveniment din calendar
interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  project: string;
  participants: string[];
}

// Date mock pentru evenimente
const mockEvents: CalendarEvent[] = [
  {
    id: "event-1",
    title: "Team Sync-up",
    date: "2025-12-20",
    time: "10:00 AM",
    project: "Internal",
    participants: ["John Doe", "Jane Smith"],
  },
  {
    id: "event-2",
    title: "Project Alpha Deadline",
    date: "2025-12-25",
    time: "EOD",
    project: "Project Alpha",
    participants: ["All Team"],
  },
  {
    id: "event-3",
    title: "Client Meeting",
    date: "2025-12-20",
    time: "02:00 PM",
    project: "Project Beta",
    participants: ["John Doe"],
  },
  {
    id: "event-4",
    title: "Sprint Planning",
    date: "2026-01-05",
    time: "11:00 AM",
    project: "Internal",
    participants: ["All Team"],
  },
];

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    // Adaugă zilele din luna anterioară pentru a completa prima săptămână
    const firstDayOfWeek = firstDay.getDay();
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = firstDayOfWeek; i > 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonthLastDay - i + 1),
        isCurrentMonth: false,
      });
    }

    // Adaugă zilele din luna curentă
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true,
      });
    }

    // Adaugă zilele din luna următoare pentru a completa ultima săptămână
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
      });
    }
    return days;
  };

  const getEventsForDay = (day: Date) => {
    const dayString = day.toISOString().split("T")[0];
    return mockEvents.filter((event) => event.date === dayString);
  };

  const days = getDaysInMonth(currentDate);

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="flex-1 space-y-6 p-4 sm:p-6">
      {/* Header-ul paginii */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Calendar
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Visualize and manage your team's schedule and deadlines.
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Add Event
        </Button>
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between p-4 sm:p-6">
          <Button variant="ghost" size="icon" onClick={prevMonth}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <CardTitle className="text-xl sm:text-2xl font-bold">
            {currentDate.toLocaleString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={nextMonth}>
            <ChevronRight className="h-5 w-5" />
          </Button>
        </CardHeader>
        <CardContent className="p-0 sm:p-0">
          {/* Numele zilelor săptămânii */}
          <div className="grid grid-cols-7 text-center font-medium text-sm text-muted-foreground border-b border-border py-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="py-2">
                {day}
              </div>
            ))}
          </div>
          {/* Zilele calendarului */}
          <div className="grid grid-cols-7">
            {days.map((day, index) => {
              const dayEvents = getEventsForDay(day.date);
              const isToday = day.date.toISOString().split("T")[0] === today;
              return (
                <div
                  key={index}
                  className={cn(
                    "h-24 sm:h-32 p-1 sm:p-2 border-r border-b border-border overflow-hidden relative",
                    !day.isCurrentMonth && "text-muted-foreground/50",
                    isToday && "bg-primary/10",
                    dayEvents.length > 0 && "cursor-pointer hover:bg-muted/50"
                  )}
                >
                  <span
                    className={cn(
                      "text-sm font-medium",
                      isToday && "text-primary font-bold"
                    )}
                  >
                    {day.date.getDate()}
                  </span>
                  {dayEvents.length > 0 && (
                    <Popover>
                      <PopoverTrigger asChild>
                        <div className="mt-1 space-y-1">
                          {dayEvents.map((event) => (
                            <div
                              key={event.id}
                              className="flex items-center space-x-1"
                            >
                              <Badge className="bg-primary/10 text-primary-foreground text-xs font-normal">
                                <Clock className="h-3 w-3 mr-1" />
                                {event.time}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className="w-80">
                        <div className="space-y-4">
                          {dayEvents.map((event) => (
                            <div key={event.id} className="space-y-1">
                              <h4 className="font-medium">{event.title}</h4>
                              <p className="text-sm text-muted-foreground flex items-center space-x-1">
                                <Clock className="h-4 w-4" />
                                <span>{event.time}</span>
                              </p>
                              <p className="text-sm text-muted-foreground flex items-center space-x-1">
                                <Users className="h-4 w-4" />
                                <span>{event.participants.join(", ")}</span>
                              </p>
                              <Button
                                variant="ghost"
                                className="w-full justify-start text-primary"
                              >
                                <ExternalLink className="h-4 w-4 mr-2" />
                                View Details
                              </Button>
                            </div>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

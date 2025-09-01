// src/components/ui/avatar-group.tsx

import * as React from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  total: number;
}

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, total, ...props }, ref) => {
    const visibleAvatars = React.Children.toArray(props.children).filter(
      React.isValidElement
    ).length;
    const remainingCount = total - visibleAvatars;

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center -space-x-2 rtl:space-x-reverse",
          className
        )}
        {...props}
      >
        {props.children}
        {remainingCount > 0 && (
          <Avatar className="h-8 w-8 z-10 border-2 border-background">
            <AvatarFallback className="text-xs text-foreground bg-muted">
              +{remainingCount}
            </AvatarFallback>
          </Avatar>
        )}
      </div>
    );
  }
);
AvatarGroup.displayName = "AvatarGroup";

const AvatarGroupItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("inline-flex z-[2]", className)} {...props} />
));
AvatarGroupItem.displayName = "AvatarGroupItem";

export { AvatarGroup, AvatarGroupItem };

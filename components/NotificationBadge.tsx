import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";

interface NotificationBadgeProps {
  icon: LucideIcon;
  text: string;
  variant?: "default" | "destructive" | "outline" | "secondary";
  className?: string;
}

export default function NotificationBadge({
  icon: Icon,
  text,
  variant = "default",
  className = "",
}: NotificationBadgeProps) {
  return (
    <Badge variant={variant} className={`flex items-center gap-2 px-3 py-1.5 ${className}`}>
      <Icon className="h-3.5 w-3.5" />
      <span>{text}</span>
    </Badge>
  );
}

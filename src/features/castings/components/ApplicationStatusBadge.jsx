import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, XCircle, HelpCircle } from "lucide-react";

const config = {
  PENDING: {
    label: "Pending",
    icon: Clock,
    variant: "secondary",
  },
  ACCEPTED: {
    label: "Accepted",
    icon: CheckCircle2,
    variant: "default",
  },
  REJECTED: {
    label: "Rejected",
    icon: XCircle,
    variant: "destructive",
  },
  NEEDS_MORE_INFO: {
    label: "Info",
    icon: HelpCircle,
    variant: "outline",
  },
};

export default function ApplicationStatusBadge({ status }) {
  const item = config[status] || config.PENDING;
  const Icon = item.icon;

  return (
    <Badge variant={item.variant} className="gap-1 rounded-full">
      <Icon className="h-3 w-3" />
      <span className="hidden sm:inline">{item.label}</span>
    </Badge>
  );
}
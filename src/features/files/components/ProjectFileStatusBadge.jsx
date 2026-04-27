import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, FileEdit, XCircle } from "lucide-react";

const config = {
  DRAFT: {
    label: "Draft",
    icon: FileEdit,
    variant: "secondary",
  },
  PENDING_REVIEW: {
    label: "Review",
    icon: Clock,
    variant: "outline",
  },
  APPROVED: {
    label: "Approved",
    icon: CheckCircle2,
    variant: "default",
  },
  REJECTED: {
    label: "Rejected",
    icon: XCircle,
    variant: "destructive",
  },
};

export default function ProjectFileStatusBadge({ status }) {
  const item = config[status] || config.DRAFT;
  const Icon = item.icon;

  return (
    <Badge variant={item.variant} className="gap-1 rounded-full">
      <Icon className="h-3 w-3" />
      <span className="hidden sm:inline">{item.label}</span>
    </Badge>
  );
}
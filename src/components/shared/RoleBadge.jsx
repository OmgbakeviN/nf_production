import { Badge } from "@/components/ui/badge";
import { Crown, Clapperboard, PenLine, Theater, Users } from "lucide-react";

const roleConfig = {
  PRODUCER: {
    label: "Producer",
    icon: Crown,
  },
  DIRECTOR: {
    label: "Director",
    icon: Clapperboard,
  },
  SCRIPTWRITER: {
    label: "Writer",
    icon: PenLine,
  },
  ACTOR: {
    label: "Actor",
    icon: Theater,
  },
  CREW: {
    label: "Crew",
    icon: Users,
  },
};

export default function RoleBadge({ role }) {
  const config = roleConfig[role] || roleConfig.CREW;
  const Icon = config.icon;

  return (
    <Badge variant="secondary" className="gap-1 rounded-full">
      <Icon className="h-3 w-3" />
      <span className="hidden sm:inline">{config.label}</span>
    </Badge>
  );
}
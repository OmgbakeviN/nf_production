import {
  LayoutDashboard,
  Users,
  ClipboardList,
  Theater,
  Clapperboard,
  Bell,
  Settings,
} from "lucide-react";

export const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    producerOnly: true,
  },
  {
    label: "Users",
    href: "/users",
    icon: Users,
    producerOnly: true,
  },
  {
    label: "Castings",
    href: "/castings",
    icon: ClipboardList,
    producerOnly: true,
  },
  {
    label: "Applications",
    href: "/applications",
    icon: Theater,
    producerOnly: true,
  },
  {
    label: "Projects",
    href: "/projects",
    icon: Clapperboard,
  },
  {
    label: "Notifications",
    href: "/notifications",
    icon: Bell,
    hasBadge: true,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function getNavItemsForUser(user) {
  if (user?.role === "PRODUCER") {
    return navItems;
  }

  return navItems.filter((item) => !item.producerOnly);
}
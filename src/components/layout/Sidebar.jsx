import { Link, useLocation } from "react-router-dom";
import { Clapperboard } from "lucide-react";

import { getCurrentUser } from "@/features/auth/authStore";
import { getNavItemsForUser } from "./navItems";

export default function Sidebar({ unreadCount = 0 }) {
  const location = useLocation();
  const user = getCurrentUser();

  const visibleNavItems = getNavItemsForUser(user);

  return (
    <aside className="hidden border-r bg-background lg:flex lg:w-64 lg:flex-col">
      <div className="flex h-16 items-center gap-2 border-b px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
          <Clapperboard className="h-5 w-5" />
        </div>

        <span className="font-semibold">NF PROD</span>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {visibleNavItems.map((item) => {
          const Icon = item.icon;
          const active = location.pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              to={item.href}
              className={`relative flex items-center gap-3 rounded-2xl px-3 py-2 text-sm transition ${
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />

              <span>{item.label}</span>

              {item.hasBadge && unreadCount > 0 && (
                <span className="ml-auto flex h-2.5 w-2.5 rounded-full bg-red-500" />
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
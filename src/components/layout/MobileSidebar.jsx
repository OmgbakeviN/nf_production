import { Link, useLocation } from "react-router-dom";
import { Clapperboard, X } from "lucide-react";

import { getCurrentUser } from "@/features/auth/authStore";
import { getNavItemsForUser } from "./navItems";

import { Button } from "@/components/ui/button";

export default function MobileSidebar({ open, onClose, unreadCount = 0 }) {
  const location = useLocation();
  const user = getCurrentUser();

  const visibleNavItems = getNavItemsForUser(user);

  return (
    <div
      className={`fixed inset-0 z-50 lg:hidden ${
        open ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      <aside
        className={`absolute left-0 top-0 h-full w-72 border-r bg-background shadow-xl transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b px-5">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <Clapperboard className="h-5 w-5" />
            </div>

            <span className="font-semibold">ProdHub</span>
          </div>

          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="space-y-1 p-4">
          {visibleNavItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={onClose}
                className={`relative flex items-center gap-3 rounded-2xl px-3 py-3 text-sm transition ${
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
    </div>
  );
}
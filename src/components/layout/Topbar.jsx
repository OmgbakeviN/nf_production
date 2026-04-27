import { Link, useNavigate } from "react-router-dom";
import { Bell, LogOut, Menu, UserCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getCurrentUser, logout } from "@/features/auth/authStore";
import RoleBadge from "@/components/shared/RoleBadge";

export default function Topbar({ onMenuClick, unreadCount = 0 }) {
  const user = getCurrentUser();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background/95 px-4 backdrop-blur sm:px-6">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </Button>

        <div>
          <p className="text-sm font-medium">Welcome back</p>
          <p className="hidden text-xs text-muted-foreground sm:block">
            Manage your production space
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1 sm:gap-2">
        {user?.role && <RoleBadge role={user.role} />}

        <Button
          variant="ghost"
          size="icon"
          className="relative"
          onClick={() => navigate("/notifications")}
        >
          <Bell className="h-5 w-5" />

          {unreadCount > 0 && (
            <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-background" />
          )}
        </Button>

        <Link to="/settings" className="flex h-9 w-9 items-center justify-center">
          {user?.avatar_url ? (
            <img
              src={user.avatar_url}
              alt={user.full_name}
              className="h-9 w-9 rounded-full object-cover"
            />
          ) : (
            <UserCircle className="h-5 w-5 text-muted-foreground" />
          )}
        </Link>

        <Button variant="ghost" size="icon" onClick={logout}>
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
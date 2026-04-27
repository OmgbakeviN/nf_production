import { useEffect, useState } from "react";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import MobileSidebar from "./MobileSidebar";

import { getNotifications } from "@/features/notifications/notificationsApi";

export default function AppLayout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  async function loadUnreadCount() {
    try {
      const data = await getNotifications();
      const count = data.filter((item) => !item.is_read).length;
      setUnreadCount(count);
    } catch (error) {
      setUnreadCount(0);
    }
  }

  useEffect(() => {
    loadUnreadCount();

    const interval = setInterval(loadUnreadCount, 30000);

    window.addEventListener("notifications-updated", loadUnreadCount);

    return () => {
      clearInterval(interval);
      window.removeEventListener("notifications-updated", loadUnreadCount);
    };
  }, []);

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="flex min-h-screen">
        <Sidebar unreadCount={unreadCount} />

        <MobileSidebar
          open={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          unreadCount={unreadCount}
        />

        <div className="flex min-h-screen flex-1 flex-col">
          <Topbar
            onMenuClick={() => setMobileMenuOpen(true)}
            unreadCount={unreadCount}
          />

          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
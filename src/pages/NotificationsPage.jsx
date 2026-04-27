import { useEffect, useState } from "react";
import { Bell, CheckCheck, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import {
  getNotifications,
  markAllNotificationsRead,
  markNotificationRead,
} from "@/features/notifications/notificationsApi";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadNotifications() {
    setLoading(true);

    try {
      const data = await getNotifications();
      setNotifications(data);
    } finally {
      setLoading(false);
    }
  }

  async function handleRead(id) {
    await markNotificationRead(id);
    await loadNotifications();
    window.dispatchEvent(new Event("notifications-updated"));
  }

  async function handleReadAll() {
    await markAllNotificationsRead();
    await loadNotifications();
    window.dispatchEvent(new Event("notifications-updated"));
  }

  useEffect(() => {
    loadNotifications();
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Notifications"
        description="Your project updates and production alerts."
        action={
          <Button
            variant="outline"
            className="rounded-2xl gap-2"
            onClick={handleReadAll}
          >
            <CheckCheck className="h-4 w-4" />
            <span className="hidden sm:inline">Read all</span>
          </Button>
        }
      />

      {loading ? (
        <Card className="rounded-3xl">
          <CardContent className="p-6 text-sm text-muted-foreground">
            Loading notifications...
          </CardContent>
        </Card>
      ) : notifications.length === 0 ? (
        <Card className="rounded-3xl">
          <CardContent className="flex flex-col items-center justify-center gap-3 p-10 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">
              <Bell className="h-6 w-6 text-muted-foreground" />
            </div>

            <p className="font-medium">No notifications</p>

            <p className="text-sm text-muted-foreground">
              Project updates will appear here.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-3">
          {notifications.map((item) => (
            <Card
              key={item.id}
              className={`rounded-3xl ${
                !item.is_read ? "border-primary/40 bg-primary/5" : ""
              }`}
            >
              <CardContent className="flex items-start justify-between gap-4 p-5">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    {!item.is_read && (
                      <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                    )}

                    <p className="font-medium">{item.title}</p>
                  </div>

                  <p className="mt-1 whitespace-pre-line text-sm text-muted-foreground">
                    {item.message}
                  </p>

                  <p className="mt-2 text-xs text-muted-foreground">
                    {item.type} · {new Date(item.created_at).toLocaleString()}
                  </p>

                  {item.related_url && (
                    <Button
                      asChild
                      variant="link"
                      className="mt-2 h-auto p-0 text-xs"
                    >
                      <Link to={item.related_url}>
                        Open related page
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                  )}
                </div>

                {!item.is_read && (
                  <Button
                    size="icon"
                    variant="ghost"
                    className="rounded-2xl"
                    onClick={() => handleRead(item.id)}
                  >
                    <CheckCheck className="h-4 w-4" />
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
import { api } from "@/lib/api";

export async function getNotifications() {
  const response = await api.get("/notifications/");
  return response.data;
}

export async function markNotificationRead(id) {
  const response = await api.patch(`/notifications/${id}/read/`);
  return response.data;
}

export async function markAllNotificationsRead() {
  const response = await api.post("/notifications/read-all/");
  return response.data;
}
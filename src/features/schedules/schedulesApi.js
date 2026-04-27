import { api } from "@/lib/api";

export async function getLocations(projectId) {
  const response = await api.get(`/projects/${projectId}/locations/`);
  return response.data;
}

export async function createLocation(projectId, formData) {
  const response = await api.post(`/projects/${projectId}/locations/`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}

export async function updateLocation(projectId, locationId, formData) {
  const response = await api.patch(`/projects/${projectId}/locations/${locationId}/`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}

export async function deleteLocation(projectId, locationId) {
  const response = await api.delete(`/projects/${projectId}/locations/${locationId}/`);
  return response.data;
}

export async function getScheduleEvents(projectId) {
  const response = await api.get(`/projects/${projectId}/schedule/`);
  return response.data;
}

export async function createScheduleEvent(projectId, payload) {
  const response = await api.post(`/projects/${projectId}/schedule/`, payload);
  return response.data;
}

export async function updateScheduleEvent(projectId, eventId, payload) {
  const response = await api.patch(`/projects/${projectId}/schedule/${eventId}/`, payload);
  return response.data;
}

export async function deleteScheduleEvent(projectId, eventId) {
  const response = await api.delete(`/projects/${projectId}/schedule/${eventId}/`);
  return response.data;
}
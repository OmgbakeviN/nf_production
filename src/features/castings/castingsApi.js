import { api } from "@/lib/api";

export async function getCastings() {
  const response = await api.get("/castings/");
  return response.data;
}

export async function createCasting(payload) {
  const response = await api.post("/castings/", payload);
  return response.data;
}

export async function getCasting(id) {
  const response = await api.get(`/castings/${id}/`);
  return response.data;
}

export async function getPublicCasting(id) {
  const response = await api.get(`/public/castings/${id}/`);
  return response.data;
}

export async function submitApplication(castingId, formData) {
  const response = await api.post(`/public/castings/${castingId}/apply/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}

export async function getApplications(params = {}) {
  const response = await api.get("/applications/", { params });
  return response.data;
}

export async function getApplication(id) {
  const response = await api.get(`/applications/${id}/`);
  return response.data;
}

export async function acceptApplication(id, payload = {}) {
  const response = await api.post(`/applications/${id}/accept/`, payload);
  return response.data;
}

export async function rejectApplication(id, payload = {}) {
  const response = await api.post(`/applications/${id}/reject/`, payload);
  return response.data;
}

export async function requestApplicationInfo(id, payload = {}) {
  const response = await api.post(`/applications/${id}/request-info/`, payload);
  return response.data;
}
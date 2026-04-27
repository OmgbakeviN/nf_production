import { api } from "@/lib/api";

export async function getUsers() {
  const response = await api.get("/accounts/users/");
  return response.data;
}

export async function inviteUser(payload) {
  const response = await api.post("/accounts/users/invite/", payload);
  return response.data;
}

export async function updateUser(id, payload) {
  const response = await api.patch(`/accounts/users/${id}/`, payload);
  return response.data;
}

export async function deleteUser(id) {
  const response = await api.delete(`/accounts/users/${id}/`);
  return response.data;
}
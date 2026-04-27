import { api } from "@/lib/api";

export async function loginUser(payload) {
  const response = await api.post("/accounts/auth/login/", payload);
  return response.data;
}

export async function getMe() {
  const response = await api.get("/accounts/auth/me/");
  return response.data;
}

export async function updateProfile(formData) {
  const response = await api.patch("/accounts/auth/profile/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}

export async function changePassword(payload) {
  const response = await api.post("/accounts/auth/change-password/", payload);
  return response.data;
}
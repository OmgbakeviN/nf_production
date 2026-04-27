import { api } from "@/lib/api";

export async function getProjectFiles(projectId) {
  const response = await api.get(`/projects/${projectId}/files/`);
  return response.data;
}

export async function uploadProjectFile(projectId, formData) {
  const response = await api.post(`/projects/${projectId}/files/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}

export async function updateProjectFile(projectId, fileId, formData) {
  const response = await api.patch(`/projects/${projectId}/files/${fileId}/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}

export async function deleteProjectFile(projectId, fileId) {
  const response = await api.delete(`/projects/${projectId}/files/${fileId}/`);
  return response.data;
}

export async function submitProjectFileReview(projectId, fileId, payload = {}) {
  const response = await api.post(
    `/projects/${projectId}/files/${fileId}/submit-review/`,
    payload
  );

  return response.data;
}

export async function approveProjectFile(projectId, fileId, payload = {}) {
  const response = await api.post(
    `/projects/${projectId}/files/${fileId}/approve/`,
    payload
  );

  return response.data;
}

export async function rejectProjectFile(projectId, fileId, payload) {
  const response = await api.post(
    `/projects/${projectId}/files/${fileId}/reject/`,
    payload
  );

  return response.data;
}
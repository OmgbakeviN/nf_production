import { api } from "@/lib/api";

export async function getProjects() {
  const response = await api.get("/projects/");
  return response.data;
}

export async function getProject(id) {
  const response = await api.get(`/projects/${id}/`);
  return response.data;
}

export async function createProject(formData) {
  const response = await api.post("/projects/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}

export async function updateProject(id, formData) {
  const response = await api.patch(`/projects/${id}/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}

export async function deleteProject(id) {
  const response = await api.delete(`/projects/${id}/`);
  return response.data;
}

export async function getProjectMembers(projectId) {
  const response = await api.get(`/projects/${projectId}/members/`);
  return response.data;
}

export async function addProjectMember(projectId, payload) {
  const response = await api.post(`/projects/${projectId}/members/`, payload);
  return response.data;
}

export async function updateProjectMember(projectId, memberId, payload) {
  const response = await api.patch(`/projects/${projectId}/members/${memberId}/`, payload);
  return response.data;
}

export async function removeProjectMember(projectId, memberId) {
  const response = await api.delete(`/projects/${projectId}/members/${memberId}/`);
  return response.data;
}
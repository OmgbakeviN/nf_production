export function saveTokens(tokens) {
  if (tokens.access) {
    localStorage.setItem("access_token", tokens.access);
  }

  if (tokens.refresh) {
    localStorage.setItem("refresh_token", tokens.refresh);
  }
}

export function getAccessToken() {
  return localStorage.getItem("access_token");
}

export function getRefreshToken() {
  return localStorage.getItem("refresh_token");
}

export function saveCurrentUser(user) {
  localStorage.setItem("current_user", JSON.stringify(user));
}

export function getCurrentUser() {
  const user = localStorage.getItem("current_user");
  return user ? JSON.parse(user) : null;
}

export function clearAuth() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("current_user");
}

export function logout() {
  clearAuth();
  window.location.href = "/login";
}
export function saveTokens(tokens) {
  localStorage.setItem("access_token", tokens.access);
  localStorage.setItem("refresh_token", tokens.refresh);
}

export function getAccessToken() {
  return localStorage.getItem("access_token");
}

export function logout() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("current_user");
  window.location.href = "/login";
}

export function saveCurrentUser(user) {
  localStorage.setItem("current_user", JSON.stringify(user));
}

export function getCurrentUser() {
  const user = localStorage.getItem("current_user");
  return user ? JSON.parse(user) : null;
}
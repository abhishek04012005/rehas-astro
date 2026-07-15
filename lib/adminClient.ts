export function hasAdminSessionCookie() {
  if (typeof document === "undefined") {
    return false;
  }

  return document.cookie
    .split(";")
    .map((item) => item.trim())
    .some((item) => item.startsWith("rehas_admin_session="));
}

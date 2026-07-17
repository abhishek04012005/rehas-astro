export function hasAdminSessionCookie() {
  if (typeof document === "undefined") {
    return false;
  }

  const cookie = document.cookie
    .split(";")
    .map((item) => item.trim())
    .find((item) => item.startsWith("rehas_admin_session="));

  if (!cookie) {
    return false;
  }

  const value = cookie.split("=")[1];
  return Boolean(value && value.length > 0);
}

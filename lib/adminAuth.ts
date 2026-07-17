import bcrypt from "bcryptjs";
import { createHmac } from "crypto";
import { supabaseAdmin } from "./supabaseServer";

const ADMIN_SESSION_SECRET = process.env.ADMIN_SESSION_SECRET ?? "";
const DEFAULT_ADMIN_SESSION_SECRET = "rehas-admin-default-secret";
const ADMIN_SESSION_COOKIE = "rehas_admin_session";
const ADMIN_SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export type AdminUser = {
  id: string;
  username: string;
  password_hash: string;
  email: string | null;
  created_at: string | null;
  updated_at: string | null;
  is_active: boolean | null;
};

export type AdminSessionData = {
  id: string;
  username: string;
  expiresAt: number;
};

function warnIfMissingSecret() {
  if (!ADMIN_SESSION_SECRET) {
    console.warn(
      "ADMIN_SESSION_SECRET is not configured. Falling back to a default development secret."
    );
  }
}

function getSessionSecret() {
  return ADMIN_SESSION_SECRET || DEFAULT_ADMIN_SESSION_SECRET;
}

function signToken(value: string) {
  warnIfMissingSecret();
  return createHmac("sha256", getSessionSecret()).update(value).digest("hex");
}

function base64urlEncode(value: string) {
  return Buffer.from(value, "utf8")
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function base64urlDecode(value: string) {
  const padded = value.padEnd(value.length + ((4 - (value.length % 4)) % 4), "=");
  return Buffer.from(padded.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf8");
}

export async function findAdminUserByUsername(username: string) {
  const { data, error } = await supabaseAdmin
    .from("admin_users")
    .select("id, username, password_hash, email, is_active")
    .eq("username", username)
    .limit(1)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data ?? null;
}

export async function verifyAdminCredentials(username: string, password: string) {
  const normalizedUsername = username.trim();
  const configuredUsername = process.env.ADMIN_USERNAME ?? process.env.REHAS_ADMIN_USERNAME;
  const configuredPassword = process.env.ADMIN_PASSWORD ?? process.env.REHAS_ADMIN_PASSWORD;

  if (configuredUsername && configuredPassword) {
    if (normalizedUsername === configuredUsername && password === configuredPassword) {
      return {
        id: "env-admin",
        username: configuredUsername,
        password_hash: "",
        email: null,
        created_at: null,
        updated_at: null,
        is_active: true,
      } as AdminUser;
    }
  }

  if (process.env.NODE_ENV !== "production" && normalizedUsername === "admin" && password === "admin123") {
    return {
      id: "local-admin",
      username: "admin",
      password_hash: "",
      email: null,
      created_at: null,
      updated_at: null,
      is_active: true,
    } as AdminUser;
  }

  try {
    const admin = await findAdminUserByUsername(normalizedUsername);
    if (!admin || admin.is_active === false) {
      return null;
    }

    const matches = await bcrypt.compare(password, admin.password_hash);
    return matches ? admin : null;
  } catch {
    return null;
  }
}

export function hashAdminPassword(password: string) {
  return bcrypt.hashSync(password, 10);
}

export function createAdminSessionToken(session: AdminSessionData) {
  warnIfMissingSecret();
  const payload = base64urlEncode(JSON.stringify(session));
  const signature = signToken(payload);
  return `${payload}.${signature}`;
}

export function parseAdminSessionToken(token: string) {
  const parts = token.split(".");
  if (parts.length !== 2) {
    return null;
  }

  const [payload, signature] = parts;
  if (!payload || !signature || signToken(payload) !== signature) {
    return null;
  }

  try {
    const parsed = JSON.parse(base64urlDecode(payload)) as AdminSessionData;
    if (!parsed?.id || !parsed?.username || typeof parsed.expiresAt !== "number") {
      return null;
    }

    if (parsed.expiresAt < Date.now()) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export function getAdminSessionCookie(token: string, maxAge = ADMIN_SESSION_MAX_AGE) {
  const secure = process.env.NODE_ENV === "production";
  const expires = new Date(Date.now() + maxAge * 1000).toUTCString();

  return [
    `${ADMIN_SESSION_COOKIE}=${token}`,
    `Path=/`,
    `HttpOnly`,
    `SameSite=Strict`,
    `Max-Age=${maxAge}`,
    `Expires=${expires}`,
    secure ? `Secure` : null,
  ]
    .filter(Boolean)
    .join("; ");
}

export function clearAdminSessionCookie() {
  return [
    `${ADMIN_SESSION_COOKIE}=; Path=/`,
    `HttpOnly`,
    `SameSite=Strict`,
    `Max-Age=0`,
    `Expires=${new Date(0).toUTCString()}`,
    process.env.NODE_ENV === "production" ? `Secure` : null,
  ]
    .filter(Boolean)
    .join("; ");
}

export function getAdminSessionFromCookie(token?: string | null) {
  return token ? parseAdminSessionToken(token) : null;
}

export function getAdminSessionCookieName() {
  return ADMIN_SESSION_COOKIE;
}

export const AUTH_BASE_URL =
  process.env.NEXT_PUBLIC_AUTH_BASE_URL ?? "http://localhost:5001";

export type MeResponse =
  | {
      success: true;
      user: {
        id: string;
        email: string;
        isTokenHolder: boolean;
        createdAt?: string;
        updatedAt?: string;
      };
    }
  | { success: false; error?: string };

export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;

  // ✅ remember-me support: local OR session
  return (
    localStorage.getItem("authToken") ||
    sessionStorage.getItem("authToken")
  );
}

export function getStoredEmail(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("authEmail");
}

/**
 * Store token + email.
 * remember=true => localStorage (persistent)
 * remember=false => sessionStorage (until tab closes)
 */
export function setStoredAuth(token: string, email: string, remember: boolean = true) {
  if (typeof window === "undefined") return;

  // Save email always (helps UX)
  localStorage.setItem("authEmail", email);

  if (remember) {
    localStorage.setItem("authToken", token);
    sessionStorage.removeItem("authToken");
  } else {
    sessionStorage.setItem("authToken", token);
    localStorage.removeItem("authToken");
  }
}

export function clearStoredAuth() {
  if (typeof window === "undefined") return;

  // ✅ clear both stores
  localStorage.removeItem("authToken");
  sessionStorage.removeItem("authToken");
  localStorage.removeItem("authEmail");
}

export async function fetchMe(token: string): Promise<MeResponse> {
  const res = await fetch(`${AUTH_BASE_URL}/auth/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // If server returns non-JSON errors, guard it:
  const text = await res.text();
  let data: any = null;
  try {
    data = JSON.parse(text);
  } catch {
    data = { success: false, error: text || "Invalid response" };
  }

  if (!res.ok) {
    return { success: false, error: data?.error || "Unauthorized" };
  }

  return data as MeResponse;
}

/**
 * Optional admin helper (dev only)
 * PATCH /auth/users/:userId/token-holder with header x-admin-secret
 */
export async function adminSetTokenHolder(args: {
  userId: string;
  isTokenHolder: boolean;
  adminSecret: string;
}): Promise<{ success: boolean; error?: string }> {
  const res = await fetch(
    `${AUTH_BASE_URL}/auth/users/${args.userId}/token-holder`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-admin-secret": args.adminSecret,
      },
      body: JSON.stringify({ isTokenHolder: args.isTokenHolder }),
    }
  );

  const text = await res.text();
  let data: any = null;
  try {
    data = JSON.parse(text);
  } catch {
    data = { success: false, error: text || "Invalid response" };
  }

  if (!res.ok || data?.success === false) {
    return { success: false, error: data?.error || "Failed to update" };
  }
  return { success: true };
}

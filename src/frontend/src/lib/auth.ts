export interface Session {
  userId: string;
  role: "user" | "owner" | "admin";
  phone: string;
  name: string;
  token: string;
  /** Whether owner has completed onboarding */
  onboardingDone?: boolean;
}

const SESSION_KEY = "pondyone_session";

export function saveSession(session: Session): void {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function getSession(): Session | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Session;
  } catch {
    return null;
  }
}

export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY);
}

export function isLoggedIn(): boolean {
  return getSession() !== null;
}

export function getRole(): "user" | "owner" | "admin" | null {
  return getSession()?.role ?? null;
}

export function updateSession(updates: Partial<Session>): void {
  const current = getSession();
  if (current) {
    saveSession({ ...current, ...updates });
  }
}

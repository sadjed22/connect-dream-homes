export const PENDING_SIGNUP_SESSION_KEY = "pending-signup-session";

export const isPendingSignupSessionActive = () => {
  if (typeof window === "undefined") return false;
  return window.sessionStorage.getItem(PENDING_SIGNUP_SESSION_KEY) === "true";
};
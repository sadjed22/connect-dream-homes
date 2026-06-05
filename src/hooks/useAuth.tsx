import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { isPendingSignupSessionActive } from "@/lib/auth";

interface AuthContextValue {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAdmin: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  session: null,
  loading: true,
  isAdmin: false,
  signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const resolveAccess = async (nextSession: Session | null) => {
    if (!nextSession?.user) {
      setSession(null);
      setUser(null);
      setIsAdmin(false);
      setLoading(false);
      return;
    }

    const { data: roleRow } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", nextSession.user.id)
      .eq("role", "admin")
      .maybeSingle();

    if (roleRow) {
      setSession(nextSession);
      setUser(nextSession.user);
      setIsAdmin(true);
      setLoading(false);
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("status")
      .eq("id", nextSession.user.id)
      .maybeSingle();

    if (profile?.status === "approved" && !isPendingSignupSessionActive()) {
      setSession(nextSession);
      setUser(nextSession.user);
      setIsAdmin(false);
      setLoading(false);
      return;
    }

    setSession(null);
    setUser(null);
    setIsAdmin(false);
    setLoading(false);
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setLoading(true);
      // Defer to avoid deadlock inside the callback
      setTimeout(() => {
        void resolveAccess(newSession);
      }, 0);
    });

    supabase.auth.getSession().then(async ({ data: { session: existing } }) => {
      await resolveAccess(existing);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, isAdmin, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

import { useEffect, useMemo, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import { Send, ShieldCheck, MessageSquare } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  listing_id: string;
  sender_id: string;
  recipient_id: string;
  content: string;
  created_at: string;
}

interface ThreadKey { listingId: string; otherId: string; }

const keyOf = (listingId: string, otherId: string) => `${listingId}::${otherId}`;

const Messages = () => {
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [listingTitles, setListingTitles] = useState<Record<string, string>>({});
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [text, setText] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .or(`sender_id.eq.${user.id},recipient_id.eq.${user.id}`)
        .order("created_at", { ascending: true });
      if (error) { toast({ title: "Erreur", description: error.message, variant: "destructive" }); return; }
      const msgs = (data as Message[]) ?? [];
      setMessages(msgs);
      const ids = Array.from(new Set(msgs.map((m) => m.listing_id)));
      if (ids.length) {
        const { data: ls } = await supabase.from("listings").select("id,title").in("id", ids);
        const map: Record<string, string> = {};
        ls?.forEach((l: { id: string; title: string }) => { map[l.id] = l.title; });
        setListingTitles(map);
      }
    })();

    const channel = supabase
      .channel(`inbox-${user.id}`)
      .on("postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          const m = payload.new as Message;
          if (m.sender_id === user.id || m.recipient_id === user.id) {
            setMessages((prev) => prev.some((p) => p.id === m.id) ? prev : [...prev, m]);
          }
        })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [user, toast]);

  const threads = useMemo(() => {
    if (!user) return [];
    const map = new Map<string, { key: ThreadKey; last: Message }>();
    for (const m of messages) {
      const otherId = m.sender_id === user.id ? m.recipient_id : m.sender_id;
      const k = keyOf(m.listing_id, otherId);
      const existing = map.get(k);
      if (!existing || existing.last.created_at < m.created_at) {
        map.set(k, { key: { listingId: m.listing_id, otherId }, last: m });
      }
    }
    return Array.from(map.entries())
      .map(([k, v]) => ({ k, ...v }))
      .sort((a, b) => b.last.created_at.localeCompare(a.last.created_at));
  }, [messages, user]);

  const active = activeKey ? threads.find((t) => t.k === activeKey) : threads[0];
  const activeMessages = useMemo(() => {
    if (!active || !user) return [];
    return messages.filter((m) =>
      m.listing_id === active.key.listingId &&
      ((m.sender_id === user.id && m.recipient_id === active.key.otherId) ||
       (m.sender_id === active.key.otherId && m.recipient_id === user.id))
    );
  }, [messages, active, user]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [activeMessages.length, activeKey]);

  const send = async () => {
    if (!user || !active || !text.trim()) return;
    const { error } = await supabase.from("messages").insert({
      listing_id: active.key.listingId,
      sender_id: user.id,
      recipient_id: active.key.otherId,
      content: text.trim(),
    });
    if (error) { toast({ title: "Échec", description: error.message, variant: "destructive" }); return; }
    setText("");
  };

  if (authLoading) return null;
  if (!user) return <Navigate to="/login?redirect=/messages" replace />;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-3xl font-bold tracking-tight mb-6">Mes messages</h1>

          {threads.length === 0 ? (
            <div className="text-center py-20 rounded-2xl border border-dashed">
              <MessageSquare className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
              <h3 className="text-lg font-semibold">Aucune conversation</h3>
              <p className="text-muted-foreground">Contactez un annonceur depuis une annonce pour démarrer.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-[300px_1fr] gap-4 rounded-2xl border bg-card overflow-hidden" style={{ boxShadow: "var(--shadow-card)" }}>
              <aside className="border-r max-h-[70vh] overflow-y-auto">
                {threads.map((t) => {
                  const isActive = active?.k === t.k;
                  return (
                    <button
                      key={t.k}
                      onClick={() => setActiveKey(t.k)}
                      className={`w-full text-left px-4 py-3 border-b hover:bg-muted/50 transition-colors ${isActive ? "bg-muted" : ""}`}
                    >
                      <div className="flex items-center gap-2 font-medium text-sm">
                        <ShieldCheck className="w-3.5 h-3.5 text-success shrink-0" />
                        <span className="truncate">{listingTitles[t.key.listingId] ?? "Annonce"}</span>
                      </div>
                      <div className="text-xs text-muted-foreground truncate mt-0.5">{t.last.content}</div>
                    </button>
                  );
                })}
              </aside>

              <section className="flex flex-col h-[70vh]">
                {active && (
                  <>
                    <div className="px-4 py-3 border-b">
                      <div className="font-semibold text-sm inline-flex items-center gap-1">
                        Annonceur vérifié <ShieldCheck className="w-3.5 h-3.5 text-success" />
                      </div>
                      <div className="text-xs text-muted-foreground truncate">
                        {listingTitles[active.key.listingId] ?? "Annonce"} — coordonnées masquées
                      </div>
                    </div>
                    <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-2 bg-muted/20">
                      {activeMessages.map((m) => {
                        const mine = m.sender_id === user.id;
                        return (
                          <div key={m.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                            <div className={`max-w-[75%] rounded-2xl p-3 text-sm ${mine ? "bg-primary text-primary-foreground" : "bg-card border"}`}>
                              {m.content}
                              <div className={`text-[10px] mt-1 ${mine ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                                {new Date(m.created_at).toLocaleString("fr-FR", { hour: "2-digit", minute: "2-digit", day: "2-digit", month: "2-digit" })}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="border-t p-3 flex items-center gap-2">
                      <Input
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
                        placeholder="Répondre..."
                        className="rounded-full bg-muted border-0"
                      />
                      <Button size="icon" onClick={send} disabled={!text.trim()} className="rounded-full shrink-0">
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </>
                )}
              </section>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Messages;

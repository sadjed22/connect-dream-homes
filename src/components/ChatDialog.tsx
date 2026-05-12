import { useEffect, useRef, useState } from "react";
import { Send, ShieldCheck } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  sender_id: string;
  recipient_id: string;
  content: string;
  created_at: string;
}

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  listingId: string;
  listingTitle: string;
  recipientId: string;
}

const ChatDialog = ({ open, onOpenChange, listingId, listingTitle, recipientId }: Props) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open || !user) return;
    (async () => {
      const { data } = await supabase
        .from("messages")
        .select("*")
        .eq("listing_id", listingId)
        .or(`and(sender_id.eq.${user.id},recipient_id.eq.${recipientId}),and(sender_id.eq.${recipientId},recipient_id.eq.${user.id})`)
        .order("created_at", { ascending: true });
      setMessages((data as Message[]) ?? []);
    })();

    const channel = supabase
      .channel(`chat-${listingId}-${user.id}`)
      .on("postgres_changes",
        { event: "INSERT", schema: "public", table: "messages", filter: `listing_id=eq.${listingId}` },
        (payload) => {
          const m = payload.new as Message;
          if ((m.sender_id === user.id && m.recipient_id === recipientId) ||
              (m.sender_id === recipientId && m.recipient_id === user.id)) {
            setMessages((prev) => prev.some((p) => p.id === m.id) ? prev : [...prev, m]);
          }
        })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [open, user, listingId, recipientId]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    if (!user || !text.trim()) return;
    setSending(true);
    const { error } = await supabase.from("messages").insert({
      listing_id: listingId,
      sender_id: user.id,
      recipient_id: recipientId,
      content: text.trim(),
    });
    setSending(false);
    if (error) {
      toast({ title: "Échec de l'envoi", description: error.message, variant: "destructive" });
      return;
    }
    setText("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 max-w-md gap-0 overflow-hidden">
        <div className="flex items-start gap-3 p-4 border-b">
          <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
            A
          </div>
          <div className="flex-1 min-w-0">
            <DialogTitle className="text-base inline-flex items-center gap-1">
              Annonceur vérifié <ShieldCheck className="w-4 h-4 text-success" />
            </DialogTitle>
            <p className="text-xs text-muted-foreground">Discussion sécurisée — coordonnées masquées</p>
          </div>
          <button onClick={() => onOpenChange(false)} className="p-1 rounded hover:bg-muted">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div ref={scrollRef} className="h-80 overflow-y-auto p-4 space-y-2 bg-muted/30">
          {messages.length === 0 && (
            <div className="bg-card border rounded-2xl p-3 text-sm max-w-[85%]">
              Bonjour, merci pour votre intérêt pour « {listingTitle} ». Comment puis-je vous aider ?
              <div className="text-[10px] text-muted-foreground mt-1">Message d'accueil automatique</div>
            </div>
          )}
          {messages.map((m) => {
            const mine = m.sender_id === user?.id;
            return (
              <div key={m.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] rounded-2xl p-3 text-sm ${mine ? "bg-primary text-primary-foreground" : "bg-card border"}`}>
                  {m.content}
                  <div className={`text-[10px] mt-1 ${mine ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                    {new Date(m.created_at).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="border-t p-3">
          <p className="text-[11px] text-center text-muted-foreground mb-2">
            Pour votre sécurité, ne partagez aucune information personnelle hors plateforme.
          </p>
          <div className="flex items-center gap-2">
            <Input
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
              placeholder="Écrire un message..."
              className="rounded-full bg-muted border-0"
            />
            <Button size="icon" onClick={send} disabled={sending || !text.trim()} className="rounded-full shrink-0">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatDialog;

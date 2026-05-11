import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { MapPin, BadgeCheck, ShieldCheck, MessageSquare, ArrowLeft, Lock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import ChatDialog from "@/components/ChatDialog";

const TYPE_LABEL: Record<string, string> = {
  vendre: "À vendre",
  louer: "À louer",
  projet: "Projet immobilier",
  notarial: "Annonce notariale",
};

interface ListingRow {
  id: string;
  title: string;
  description: string | null;
  location: string | null;
  price: string | null;
  image_url: string | null;
  type: string;
  user_id: string;
  created_at: string;
}

const ListingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [listing, setListing] = useState<ListingRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    if (!id) return;
    (async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("listings")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      if (error) toast({ title: "Erreur", description: error.message, variant: "destructive" });
      setListing(data as ListingRow | null);
      setLoading(false);
    })();
  }, [id, toast]);

  const handleContact = () => {
    if (!user) {
      toast({ title: "Connexion requise", description: "Connectez-vous pour contacter l'annonceur." });
      navigate(`/login?redirect=/annonces/${id}`);
      return;
    }
    if (listing && user.id === listing.user_id) {
      toast({ title: "C'est votre annonce", description: "Vous ne pouvez pas vous contacter vous-même." });
      return;
    }
    setChatOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="mb-4 gap-2">
            <ArrowLeft className="w-4 h-4" /> Retour
          </Button>

          {loading ? (
            <div className="space-y-4">
              <Skeleton className="aspect-[16/9] w-full rounded-2xl" />
              <Skeleton className="h-8 w-2/3" />
              <Skeleton className="h-4 w-1/3" />
            </div>
          ) : !listing ? (
            <div className="text-center py-20">
              <h1 className="text-2xl font-bold mb-2">Annonce introuvable</h1>
              <Button asChild><Link to="/annonces">Voir toutes les annonces</Link></Button>
            </div>
          ) : (
            <div className="grid lg:grid-cols-[1fr_360px] gap-8">
              <article>
                <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-muted mb-6">
                  {listing.image_url ? (
                    <img src={listing.image_url} alt={listing.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      Aucune image
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <Badge className="capitalize">{TYPE_LABEL[listing.type] ?? listing.type}</Badge>
                  <Badge variant="secondary" className="gap-1">
                    <BadgeCheck className="w-3 h-3" /> Annonceur vérifié
                  </Badge>
                </div>

                <h1 className="text-3xl font-bold tracking-tight mb-2">{listing.title}</h1>
                {listing.location && (
                  <p className="inline-flex items-center gap-1 text-muted-foreground mb-4">
                    <MapPin className="w-4 h-4" /> {listing.location}
                  </p>
                )}
                {listing.price && (
                  <p className="text-2xl font-bold text-primary mb-6">{listing.price}</p>
                )}

                {listing.description && (
                  <div className="prose max-w-none">
                    <h2 className="text-lg font-semibold mb-2">Description</h2>
                    <p className="text-foreground/80 whitespace-pre-line">{listing.description}</p>
                  </div>
                )}
              </article>

              <aside className="space-y-4">
                <div className="rounded-2xl border border-border bg-card p-6" style={{ boxShadow: "var(--shadow-card)" }}>
                  <div className="flex items-center gap-2 mb-3">
                    <ShieldCheck className="w-5 h-5 text-success" />
                    <span className="font-semibold">Coordonnées masquées</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 inline-flex items-start gap-2">
                    <Lock className="w-4 h-4 mt-0.5 shrink-0" />
                    Pour votre sécurité, le nom et le numéro de l'annonceur sont masqués. Échangez via la messagerie sécurisée.
                  </p>
                  <Button onClick={handleContact} className="w-full gap-2">
                    <MessageSquare className="w-4 h-4" /> Contacter l'annonceur
                  </Button>
                </div>
              </aside>
            </div>
          )}
        </div>
      </main>
      <Footer />

      {listing && user && (
        <ChatDialog
          open={chatOpen}
          onOpenChange={setChatOpen}
          listingId={listing.id}
          listingTitle={listing.title}
          recipientId={listing.user_id}
        />
      )}
    </div>
  );
};

export default ListingDetail;

import { useEffect, useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Home, Key, Building2, Scale, Upload, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

type ListingType = "vendre" | "louer" | "projet" | "notarial";

const ALL_TYPES: { id: ListingType; label: string; icon: typeof Home; desc: string }[] = [
  { id: "vendre", label: "À vendre", icon: Home, desc: "Mettre un bien en vente" },
  { id: "louer", label: "À louer", icon: Key, desc: "Proposer une location" },
  { id: "projet", label: "Projet immobilier", icon: Building2, desc: "Programme neuf / promotion" },
  { id: "notarial", label: "Annonce notariale", icon: Scale, desc: "Vente, succession, adjudication" },
];

const TYPES_BY_ROLE: Record<string, ListingType[]> = {
  particulier: ["vendre", "louer"],
  agent: ["vendre", "louer"],
  promoteur: ["vendre", "louer", "projet"],
  notaire: ["notarial"],
};

const CreateListing = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [profileType, setProfileType] = useState<string | null>(null);
  const [type, setType] = useState<ListingType | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Redirect if not connected
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login?redirect=/annonces/nouvelle", { replace: true });
    }
  }, [authLoading, user, navigate]);

  // Load profile to know which listing types are allowed
  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data } = await supabase
        .from("profiles")
        .select("profile_type, location")
        .eq("id", user.id)
        .maybeSingle();
      if (data) {
        setProfileType(data.profile_type);
        if (data.location) setLocation((prev) => prev || data.location);
        const allowed = TYPES_BY_ROLE[data.profile_type ?? ""] ?? ["vendre", "louer"];
        setType((prev) => prev ?? allowed[0]);
      }
    })();
  }, [user]);

  const allowedTypes = ALL_TYPES.filter((t) =>
    (TYPES_BY_ROLE[profileType ?? "particulier"] ?? ["vendre", "louer"]).includes(t.id)
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user || !type) return;

    setSubmitting(true);
    let image_url: string | null = null;

    if (image) {
      const ext = image.name.split(".").pop();
      const path = `${user.id}/${crypto.randomUUID()}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from("listings-images")
        .upload(path, image, { upsert: false });
      if (upErr) {
        setSubmitting(false);
        toast({ title: "Échec de l'upload de l'image", description: upErr.message, variant: "destructive" });
        return;
      }
      const { data: pub } = supabase.storage.from("listings-images").getPublicUrl(path);
      image_url = pub.publicUrl;
    }

    const { error } = await supabase.from("listings").insert({
      user_id: user.id,
      type,
      title,
      description,
      location,
      price: price || null,
      image_url,
    });

    setSubmitting(false);

    if (error) {
      toast({ title: "Échec de la publication", description: error.message, variant: "destructive" });
      return;
    }

    toast({ title: "Annonce publiée", description: "Votre annonce est en ligne." });
    navigate("/annonces");
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-16 container mx-auto px-4 text-center text-muted-foreground">
          Chargement…
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-1" /> Retour
          </Button>

          <Card className="shadow-xl border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl">Publier une annonce</CardTitle>
              <CardDescription>
                Renseignez les informations de votre bien. Votre annonce sera visible immédiatement.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Type selector */}
                <div className="space-y-2">
                  <Label>Type d'annonce</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {allowedTypes.map((t) => {
                      const Icon = t.icon;
                      const selected = type === t.id;
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setType(t.id)}
                          className={cn(
                            "flex items-start gap-3 p-4 rounded-lg border-2 text-left transition-all",
                            selected
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/40"
                          )}
                        >
                          <Icon className={cn("w-5 h-5 mt-0.5 shrink-0", selected ? "text-primary" : "text-muted-foreground")} />
                          <div>
                            <p className="text-sm font-semibold">{t.label}</p>
                            <p className="text-xs text-muted-foreground">{t.desc}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Titre</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ex : Appartement F4 standing à Hydra"
                    required
                    maxLength={120}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Décrivez le bien : surface, étage, équipements, environnement…"
                    rows={5}
                    maxLength={2000}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="location">Localisation</Label>
                    <Input
                      id="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Ville, Wilaya"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Prix</Label>
                    <Input
                      id="price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder={type === "louer" ? "Ex : 70 000 DA/mois" : "Ex : 18 500 000 DA"}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Photo (optionnel)</Label>
                  <label
                    htmlFor="image"
                    className={cn(
                      "flex flex-col items-center justify-center gap-2 p-6 rounded-lg border-2 border-dashed cursor-pointer transition-colors",
                      image ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-muted/30"
                    )}
                  >
                    <Upload className={cn("w-6 h-6", image ? "text-primary" : "text-muted-foreground")} />
                    <p className="text-sm font-medium">{image ? image.name : "Cliquez pour télécharger"}</p>
                    {!image && <p className="text-xs text-muted-foreground">JPG ou PNG — max 5 Mo</p>}
                    <input
                      id="image"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => setImage(e.target.files?.[0] ?? null)}
                    />
                  </label>
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={submitting || !type || !title || !location}>
                  {submitting ? "Publication…" : "Publier l'annonce"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CreateListing;

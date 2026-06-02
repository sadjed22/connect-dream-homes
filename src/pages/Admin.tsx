import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Check, X, FileText, Loader2, Mail, Phone, MapPin } from "lucide-react";

interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  location: string | null;
  profile_type: string | null;
  status: string;
  created_at: string;
}

interface DocFile {
  name: string;
  url: string;
}

const statusVariant = (s: string) =>
  s === "approved" ? "default" : s === "denied" ? "destructive" : "secondary";

const Admin = () => {
  const { user, isAdmin, loading } = useAuth();
  const { toast } = useToast();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [docs, setDocs] = useState<Record<string, DocFile[]>>({});
  const [busyId, setBusyId] = useState<string | null>(null);
  const [fetching, setFetching] = useState(true);

  const loadProfiles = async () => {
    setFetching(true);
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast({ title: "Erreur de chargement", description: error.message, variant: "destructive" });
    } else {
      setProfiles(data as Profile[]);
    }
    setFetching(false);
  };

  const loadDocs = async (userId: string) => {
    if (docs[userId]) return;
    const { data: list, error } = await supabase.storage
      .from("kyc-documents")
      .list(userId, { limit: 50 });
    if (error || !list) return;
    const files: DocFile[] = [];
    for (const f of list) {
      const { data: signed } = await supabase.storage
        .from("kyc-documents")
        .createSignedUrl(`${userId}/${f.name}`, 60 * 60);
      if (signed?.signedUrl) files.push({ name: f.name, url: signed.signedUrl });
    }
    setDocs((prev) => ({ ...prev, [userId]: files }));
  };

  useEffect(() => {
    if (isAdmin) loadProfiles();
  }, [isAdmin]);

  useEffect(() => {
    profiles.forEach((p) => loadDocs(p.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profiles]);

  const updateStatus = async (id: string, status: "approved" | "denied") => {
    setBusyId(id);
    const { error } = await supabase.from("profiles").update({ status }).eq("id", id);
    setBusyId(null);
    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    } else {
      toast({ title: status === "approved" ? "Compte approuvé" : "Compte refusé" });
      setProfiles((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/" replace />;

  const pending = profiles.filter((p) => p.status === "pending");
  const approved = profiles.filter((p) => p.status === "approved");
  const denied = profiles.filter((p) => p.status === "denied");

  const renderList = (list: Profile[]) => {
    if (fetching) {
      return (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      );
    }
    if (list.length === 0) {
      return <p className="text-center text-muted-foreground py-12">Aucun compte</p>;
    }
    return (
      <div className="space-y-4">
        {list.map((p) => (
          <Card key={p.id} className="border-border/60">
            <CardHeader className="flex flex-row items-start justify-between gap-4">
              <div className="space-y-1">
                <CardTitle className="text-lg">
                  {p.first_name} {p.last_name}
                </CardTitle>
                <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                  {p.profile_type && (
                    <Badge variant="outline" className="capitalize">
                      {p.profile_type}
                    </Badge>
                  )}
                  <Badge variant={statusVariant(p.status) as never}>{p.status}</Badge>
                </div>
              </div>
              {p.status === "pending" && (
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateStatus(p.id, "denied")}
                    disabled={busyId === p.id}
                  >
                    <X className="w-4 h-4" /> Refuser
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => updateStatus(p.id, "approved")}
                    disabled={busyId === p.id}
                  >
                    <Check className="w-4 h-4" /> Approuver
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid sm:grid-cols-3 gap-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-4 h-4" /> {p.email ?? "—"}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="w-4 h-4" /> {p.phone ?? "—"}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" /> {p.location ?? "—"}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Documents soumis</p>
                {docs[p.id]?.length ? (
                  <div className="flex flex-wrap gap-2">
                    {docs[p.id].map((f) => (
                      <a
                        key={f.name}
                        href={f.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-border bg-muted/40 text-sm hover:bg-muted transition-colors"
                      >
                        <FileText className="w-4 h-4 text-primary" />
                        {f.name}
                      </a>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground">Aucun document</p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 pt-24 pb-12 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Tableau de bord administrateur</h1>
          <p className="text-muted-foreground mt-1">
            Gérez les demandes d'inscription et vérifiez les documents soumis.
          </p>
        </div>

        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList>
            <TabsTrigger value="pending">En attente ({pending.length})</TabsTrigger>
            <TabsTrigger value="approved">Approuvés ({approved.length})</TabsTrigger>
            <TabsTrigger value="denied">Refusés ({denied.length})</TabsTrigger>
          </TabsList>
          <TabsContent value="pending">{renderList(pending)}</TabsContent>
          <TabsContent value="approved">{renderList(approved)}</TabsContent>
          <TabsContent value="denied">{renderList(denied)}</TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;

import { FormEvent, useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

const infos = [
  { icon: Mail, title: "Email", value: "contact@immoconnect.dz" },
  { icon: Phone, title: "Téléphone", value: "+213 555 00 00 00" },
  { icon: MapPin, title: "Adresse", value: "Alger, Algérie" },
];

const Contact = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({ title: "Message envoyé (démo)", description: "Activez Lovable Cloud pour envoyer de vrais emails." });
      (e.target as HTMLFormElement).reset();
    }, 600);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24">
        <section className="container mx-auto px-4 py-16 text-center max-w-2xl">
          <span className="inline-block px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-semibold tracking-wider uppercase mb-4">Contact</span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">Parlons de votre projet</h1>
          <p className="text-muted-foreground text-lg">Notre équipe vous répond sous 24 heures ouvrées.</p>
        </section>

        <section className="container mx-auto px-4 pb-20 grid lg:grid-cols-3 gap-8">
          <div className="space-y-4">
            {infos.map(({ icon: Icon, title, value }) => (
              <div key={title} className="p-6 rounded-2xl bg-card border border-border" style={{ boxShadow: "var(--shadow-card)" }}>
                <div className="w-11 h-11 rounded-xl grid place-items-center mb-3 bg-gradient-to-br from-primary to-secondary text-primary-foreground">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-sm text-muted-foreground">{title}</div>
                <div className="font-semibold">{value}</div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="lg:col-span-2 p-8 rounded-2xl bg-card border border-border space-y-5" style={{ boxShadow: "var(--shadow-card)" }}>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom complet</Label>
                <Input id="name" required placeholder="Votre nom" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required placeholder="vous@exemple.com" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Sujet</Label>
              <Input id="subject" required placeholder="Ex: Question sur une annonce" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" required rows={6} placeholder="Décrivez votre demande..." />
            </div>
            <Button type="submit" size="lg" className="rounded-full w-full sm:w-auto" disabled={loading}>
              <Send className="w-4 h-4 mr-2" /> {loading ? "Envoi..." : "Envoyer le message"}
            </Button>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;

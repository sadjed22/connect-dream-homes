import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Building2,
  Compass,
  Scale,
  TrendingUp,
  User,
  MapPin,
  Mail,
  Lock,
  Phone,
  Eye,
  EyeOff,
  ArrowLeft,
  ArrowRight,
  Upload,
  FileCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import AuthLayout from "@/components/auth/AuthLayout";
import Stepper from "@/components/auth/Stepper";

const profileTypes = [
  { id: "particulier", label: "Particulier", icon: User },
  { id: "agent", label: "Agent immobilier", icon: MapPin },
  { id: "promoteur", label: "Promoteur immobilier", icon: Building2 },
  { id: "notaire", label: "Notaire", icon: Scale },
  { id: "architecte", label: "Architecte / Ingénieur", icon: Compass },
  { id: "expert", label: "Expert immobilier", icon: TrendingUp },
];

type DocItem = { id: string; label: string; required: boolean };

const documentsByProfile: Record<string, DocItem[]> = {
  particulier: [
    { id: "cni", label: "Carte d'identité nationale (CNI)", required: true },
  ],
  agent: [
    { id: "agrement", label: "Carte d'agent immobilier (agrément)", required: true },
    { id: "rc", label: "Registre de commerce (RC)", required: true },
    { id: "nif", label: "Numéro d'identification fiscale (NIF)", required: true },
  ],
  promoteur: [
    { id: "cni", label: "Carte d'identité nationale (CNI)", required: true },
    { id: "rc", label: "Registre de commerce", required: true },
    { id: "nif", label: "Numéro d'identification fiscale (NIF)", required: true },
    { id: "statuts", label: "Statuts de l'entreprise", required: true },
    { id: "autorisation", label: "Autorisation de projet immobilier", required: false },
  ],
  notaire: [
    { id: "arrete", label: "Arrêté de nomination (ministère de la Justice)", required: true },
    { id: "carte-pro", label: "Carte professionnelle de notaire", required: true },
  ],
  architecte: [
    { id: "cni", label: "Carte nationale d'identité (CNI)", required: true },
    { id: "diplome", label: "Diplôme d'architecte ou d'ingénieur", required: true },
    { id: "cv", label: "CV professionnel", required: true },
  ],
  expert: [
    { id: "cni", label: "Carte nationale d'identité (CNI)", required: true },
    { id: "diplome", label: "Diplôme (immobilier, économie, gestion, etc.)", required: true },
    { id: "attestation", label: "Attestation d'expertise immobilière", required: true },
    { id: "experience", label: "Justificatif d'expérience", required: true },
  ],
};

const Signup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [profileType, setProfileType] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rectoFile, setRectoFile] = useState<File | null>(null);
  const [versoFile, setVersoFile] = useState<File | null>(null);

  const [files, setFiles] = useState<Record<string, File | null>>({});

  const requiredDocs = profileType ? documentsByProfile[profileType] ?? [] : [];

  const handleStep1 = (e: FormEvent) => {
    e.preventDefault();
    if (!profileType) {
      toast({ title: "Sélectionnez un profil", variant: "destructive" });
      return;
    }
    setFiles({});
    setStep(2);
  };

  const handleStep2 = (e: FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  const handleFinalSubmit = (e: FormEvent) => {
    e.preventDefault();
    const missing = requiredDocs.find((d) => d.required && !files[d.id]);
    if (missing) {
      toast({ title: `Document requis : ${missing.label}`, variant: "destructive" });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Compte créé (démo)",
        description: "L'authentification réelle nécessite Lovable Cloud.",
      });
      navigate("/login");
    }, 900);
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-xl">
        <Stepper current={step} />

        <Card className="shadow-xl border-border/50">
          {/* STEP 1 — Profile type */}
          {step === 1 && (
            <>
              <CardHeader className="text-center space-y-2">
                <CardTitle className="text-2xl">Créer votre compte</CardTitle>
                <CardDescription>Sélectionnez le type de profil qui vous correspond</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleStep1} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {profileTypes.map((type) => {
                      const Icon = type.icon;
                      const selected = profileType === type.id;
                      return (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setProfileType(type.id)}
                          className={cn(
                            "flex items-center gap-3 p-4 rounded-lg border-2 text-left transition-all",
                            selected
                              ? "border-primary bg-primary/5 text-foreground"
                              : "border-border hover:border-primary/40 text-muted-foreground hover:text-foreground"
                          )}
                        >
                          <Icon className={cn("w-5 h-5 shrink-0", selected ? "text-primary" : "")} />
                          <span className="text-sm font-medium">{type.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    Continuer
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </form>
              </CardContent>
            </>
          )}

          {/* STEP 2 — Personal info */}
          {step === 2 && (
            <>
              <CardHeader className="text-center space-y-2">
                <CardTitle className="text-2xl">Vos informations</CardTitle>
                <CardDescription>Renseignez vos coordonnées personnelles</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleStep2} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="firstname">Prénom</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input id="firstname" placeholder="Amine" required className="pl-10" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastname">Nom</Label>
                      <Input id="lastname" placeholder="Benali" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input id="signup-email" type="email" placeholder="vous@exemple.com" required className="pl-10" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input id="phone" type="tel" placeholder="+213 5XX XX XX XX" required className="pl-10" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Mot de passe</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="signup-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Au moins 8 caractères"
                        required
                        minLength={8}
                        className="pl-10 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Checkbox id="terms" required className="mt-0.5" />
                    <Label htmlFor="terms" className="text-sm font-normal cursor-pointer leading-snug">
                      J'accepte les{" "}
                      <a href="#" className="text-primary hover:underline">conditions d'utilisation</a>{" "}
                      et la{" "}
                      <a href="#" className="text-primary hover:underline">politique de confidentialité</a>
                    </Label>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
                      <ArrowLeft className="w-4 h-4" />
                      Retour
                    </Button>
                    <Button type="submit" className="flex-1">
                      Continuer
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </form>
              </CardContent>
            </>
          )}

          {/* STEP 3 — ID verification */}
          {step === 3 && (
            <>
              <CardHeader className="text-center space-y-2">
                <CardTitle className="text-2xl">Vérification d'identité</CardTitle>
                <CardDescription>Téléchargez une pièce d'identité pour vérifier votre compte</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleFinalSubmit} className="space-y-5">
                  <div className="flex gap-3 p-4 rounded-lg border border-primary/30 bg-primary/5">
                    <FileCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">Documents acceptés</p>
                      <p className="text-xs text-muted-foreground">
                        Carte d'identité nationale, Passeport, Permis de conduire
                      </p>
                    </div>
                  </div>

                  <FileUploadField
                    id="recto"
                    label="Recto du document"
                    required
                    file={rectoFile}
                    onFileChange={setRectoFile}
                  />

                  <FileUploadField
                    id="verso"
                    label="Verso du document"
                    optional
                    file={versoFile}
                    onFileChange={setVersoFile}
                  />

                  <div className="flex gap-3 pt-2">
                    <Button type="button" variant="outline" onClick={() => setStep(2)} className="flex-1">
                      <ArrowLeft className="w-4 h-4" />
                      Retour
                    </Button>
                    <Button type="submit" className="flex-1" disabled={loading}>
                      {loading ? "Création..." : "Créer mon compte"}
                      {!loading && <ArrowRight className="w-4 h-4" />}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </>
          )}
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Vous avez déjà un compte ?{" "}
          <Link to="/login" className="text-primary font-medium hover:underline">
            Se connecter
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

interface FileUploadFieldProps {
  id: string;
  label: string;
  required?: boolean;
  optional?: boolean;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const FileUploadField = ({ id, label, required, optional, file, onFileChange }: FileUploadFieldProps) => (
  <div className="space-y-2">
    <Label htmlFor={id} className="text-sm font-medium">
      {label} {required && <span className="text-destructive">*</span>}
      {optional && <span className="text-muted-foreground font-normal"> (optionnel)</span>}
    </Label>
    <label
      htmlFor={id}
      className={cn(
        "flex flex-col items-center justify-center gap-2 p-6 rounded-lg border-2 border-dashed cursor-pointer transition-colors",
        file ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-muted/30"
      )}
    >
      <Upload className={cn("w-6 h-6", file ? "text-primary" : "text-muted-foreground")} />
      <p className="text-sm font-medium">
        {file ? file.name : "Cliquez pour télécharger"}
      </p>
      {!file && <p className="text-xs text-muted-foreground">JPG, PNG ou PDF — max 5 Mo</p>}
      <input
        id={id}
        type="file"
        accept=".jpg,.jpeg,.png,.pdf"
        className="hidden"
        onChange={(e) => onFileChange(e.target.files?.[0] ?? null)}
      />
    </label>
  </div>
);

export default Signup;

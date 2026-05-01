import { useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import AuthLayout from "@/components/auth/AuthLayout";

const GoogleIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

const Login = () => {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent, label = "Connexion") => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: `${label} (démo)`,
        description: "L'authentification réelle nécessite Lovable Cloud.",
      });
    }, 700);
  };

  return (
    <AuthLayout>
      <Card className="w-full max-w-md shadow-xl border-border/50">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl">Bon retour !</CardTitle>
          <CardDescription>Connectez-vous à votre compte ImmoMatch</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={(e) => handleSubmit(e)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="login-email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="login-email" type="email" placeholder="vous@exemple.com" required className="pl-10" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="login-password">Mot de passe</Label>
                <button type="button" className="text-xs text-primary hover:underline">
                  Mot de passe oublié ?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
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

            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">
                Se souvenir de moi
              </Label>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Connexion..." : "Se connecter"}
            </Button>
          </form>

          <div className="relative my-6">
            <Separator />
            <span className="absolute left-1/2 -translate-x-1/2 -top-2.5 bg-card px-3 text-xs text-muted-foreground">
              OU CONTINUER AVEC
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" type="button" onClick={(e) => handleSubmit(e, "Google")}>
              <GoogleIcon />
              Google
            </Button>
            <Button variant="outline" type="button" onClick={(e) => handleSubmit(e, "SMS")}>
              <Phone className="w-4 h-4" />
              SMS
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Pas encore de compte ?{" "}
            <Link to="/signup" className="text-primary font-medium hover:underline">
              S'inscrire
            </Link>
          </p>
        </CardContent>
      </Card>
    </AuthLayout>
  );
};

export default Login;

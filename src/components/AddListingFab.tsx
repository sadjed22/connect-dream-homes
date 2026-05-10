import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const AddListingFab = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const { toast } = useToast();

  const handleClick = () => {
    if (loading) return;
    if (!user) {
      toast({
        title: "Connexion requise",
        description: "Connectez-vous ou créez un compte pour publier une annonce.",
      });
      navigate("/login?redirect=/annonces/nouvelle");
      return;
    }
    navigate("/annonces/nouvelle");
  };

  return (
    <Button
      onClick={handleClick}
      size="lg"
      className="fixed bottom-6 right-6 z-40 rounded-full shadow-lg gap-2 h-14 px-6 bg-primary hover:bg-primary/90"
      aria-label="Ajouter une annonce"
    >
      <Plus className="w-5 h-5" />
      <span className="hidden sm:inline">Ajouter une annonce</span>
    </Button>
  );
};

export default AddListingFab;

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Connexion — Administration Golf du Rova" },
      { name: "description", content: "Espace de connexion réservé à l'équipe du Golf du Rova." },
      { property: "og:title", content: "Connexion — Administration Golf du Rova" },
      { property: "og:description", content: "Espace réservé à l'équipe du Golf du Rova." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "in") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/admin" });
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin + "/admin" },
        });
        if (error) throw error;
        toast.success("Compte créé. Vérifiez votre e-mail pour confirmer votre adresse.");
        setMode("in");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erreur de connexion");
    } finally {
      setBusy(false);
    }
  };

  const google = async () => {
    const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin + "/auth" });
    if (result.error) return toast.error("Connexion Google impossible");
    if (result.redirected) return;
    navigate({ to: "/admin" });
  };

  return (
    <div className="min-h-screen bg-stone-soft flex items-center justify-center p-6 font-body">
      <div className="w-full max-w-md bg-background p-10 shadow-sm">
        <img src="/images/logo-golf-rova.png" alt="Golf du Rova" className="h-14 mx-auto mb-8" />
        <h1 className="font-display text-3xl text-center mb-2">Administration</h1>
        <p className="text-sm text-muted-foreground text-center mb-8">
          {mode === "in" ? "Connectez-vous pour gérer le site." : "Créez votre compte équipe."}
        </p>
        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Mot de passe</Label>
            <Input id="password" type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <Button type="submit" className="w-full" disabled={busy}>
            {mode === "in" ? "Se connecter" : "Créer le compte"}
          </Button>
        </form>
        <Button variant="outline" className="w-full mt-3" onClick={google}>Continuer avec Google</Button>
        <button
          type="button"
          onClick={() => setMode(mode === "in" ? "up" : "in")}
          className="mt-6 w-full text-xs text-muted-foreground hover:text-primary"
        >
          {mode === "in" ? "Pas encore de compte ? S'inscrire" : "Déjà un compte ? Se connecter"}
        </button>
      </div>
    </div>
  );
}

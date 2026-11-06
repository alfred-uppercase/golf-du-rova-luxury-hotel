import { createFileRoute, Link, Outlet, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { BedDouble, UtensilsCrossed, Home, Flag, Search, Users, LayoutDashboard, LogOut, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useMyRoles } from "@/lib/admin";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Administration — Golf du Rova" },
      { name: "description", content: "Gestion des contenus du site Golf du Rova." },
      { property: "og:title", content: "Administration — Golf du Rova" },
      { property: "og:description", content: "Gestion des contenus du site Golf du Rova." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminLayout,
});

const NAV = [
  { to: "/admin", label: "Tableau de bord", icon: LayoutDashboard },
  { to: "/admin/accueil", label: "Page d'accueil", icon: Home },
  { to: "/admin/golf", label: "Golf 18 trous", icon: Flag },
  { to: "/admin/chambres", label: "Chambres", icon: BedDouble },
  { to: "/admin/restaurants", label: "Restaurants", icon: UtensilsCrossed },
  { to: "/admin/seo", label: "Référencement (SEO)", icon: Search },
] as const;

function AdminLayout() {
  const { data, isLoading } = useMyRoles();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const isAdmin = data?.roles.includes("admin");

  const signOut = async () => {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  };

  if (isLoading) return <div className="p-10 text-muted-foreground">Chargement…</div>;

  if (!data?.roles.length) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-stone-soft font-body">
        <div className="bg-background p-10 max-w-md text-center">
          <h1 className="font-display text-2xl mb-4">Accès en attente</h1>
          <p className="text-muted-foreground mb-6">
            Votre compte ({data?.email}) est créé. Un administrateur doit vous attribuer un rôle avant que vous puissiez modifier le site.
          </p>
          <Button variant="outline" onClick={signOut}>Se déconnecter</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-stone-soft font-body text-foreground">
      <aside className="w-64 shrink-0 bg-primary text-primary-foreground flex flex-col">
        <div className="p-6 border-b border-primary-foreground/10">
          <img src="/images/logo-golf-rova.png" alt="Golf du Rova" className="h-12" />
          <p className="mt-3 text-[10px] font-mono uppercase tracking-[0.25em] opacity-70">Administration</p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {NAV.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              activeOptions={{ exact: true }}
              className="flex items-center gap-3 px-3 py-2.5 text-sm opacity-80 hover:opacity-100 hover:bg-primary-foreground/10 transition"
              activeProps={{ className: "bg-primary-foreground/15 opacity-100" }}
            >
              <Icon className="size-4" /> {label}
            </Link>
          ))}
          {isAdmin && (
            <Link
              to="/admin/utilisateurs"
              className="flex items-center gap-3 px-3 py-2.5 text-sm opacity-80 hover:opacity-100 hover:bg-primary-foreground/10 transition"
              activeProps={{ className: "bg-primary-foreground/15 opacity-100" }}
            >
              <Users className="size-4" /> Utilisateurs
            </Link>
          )}
        </nav>
        <div className="p-4 border-t border-primary-foreground/10 space-y-2 text-xs">
          <Link to="/" className="flex items-center gap-2 opacity-80 hover:opacity-100">
            <ExternalLink className="size-3.5" /> Voir le site
          </Link>
          <p className="opacity-60 truncate">{data.email} · {isAdmin ? "Admin" : "Éditeur"}</p>
          <button onClick={signOut} className="flex items-center gap-2 opacity-80 hover:opacity-100">
            <LogOut className="size-3.5" /> Déconnexion
          </button>
        </div>
      </aside>
      <main className="flex-1 p-6 md:p-10 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
}

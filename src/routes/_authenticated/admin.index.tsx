import { createFileRoute, Link } from "@tanstack/react-router";
import { BedDouble, UtensilsCrossed, Home, Flag, Search } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/")({
  component: Dashboard,
});

const CARDS = [
  { to: "/admin/accueil", title: "Page d'accueil", desc: "Textes FR/EN, photos et textes alternatifs.", icon: Home },
  { to: "/admin/golf", title: "Golf 18 trous", desc: "Textes et photos de la page golf.", icon: Flag },
  { to: "/admin/chambres", title: "Chambres", desc: "Ajouter, modifier, masquer ou supprimer des chambres.", icon: BedDouble },
  { to: "/admin/restaurants", title: "Restaurants", desc: "Gérer les restaurants et leurs photos.", icon: UtensilsCrossed },
  { to: "/admin/seo", title: "Référencement", desc: "Titres, descriptions et images de partage par page.", icon: Search },
] as const;

function Dashboard() {
  return (
    <div className="max-w-5xl">
      <h1 className="font-display text-4xl mb-2">Bienvenue</h1>
      <p className="text-muted-foreground mb-10">Choisissez ce que vous souhaitez modifier sur le site.</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CARDS.map(({ to, title, desc, icon: Icon }) => (
          <Link key={to} to={to} className="bg-background p-6 hover:shadow-md transition border border-border">
            <Icon className="size-6 text-accent mb-4" />
            <h2 className="font-display text-xl mb-1">{title}</h2>
            <p className="text-sm text-muted-foreground">{desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

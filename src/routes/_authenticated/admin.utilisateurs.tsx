import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useMyRoles } from "@/lib/admin";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/admin/utilisateurs")({
  component: UsersAdmin,
});

type Role = "admin" | "editor";

function UsersAdmin() {
  const me = useMyRoles().data;
  const { data, refetch } = useQuery({
    queryKey: ["admin", "users"],
    queryFn: async () => {
      const [p, r] = await Promise.all([
        supabase.from("profiles").select("id, email, created_at").order("created_at"),
        supabase.from("user_roles").select("user_id, role"),
      ]);
      return (p.data ?? []).map((u) => ({ ...u, roles: (r.data ?? []).filter((x) => x.user_id === u.id).map((x) => x.role as Role) }));
    },
  });

  if (!me?.roles.includes("admin")) return <p>Réservé aux administrateurs.</p>;

  const toggle = async (userId: string, role: Role, has: boolean) => {
    const { error } = has
      ? await supabase.from("user_roles").delete().eq("user_id", userId).eq("role", role)
      : await supabase.from("user_roles").insert({ user_id: userId, role });
    if (error) return toast.error(error.message);
    toast.success("Rôle mis à jour");
    refetch();
  };

  return (
    <div className="max-w-4xl">
      <h1 className="font-display text-4xl mb-2">Utilisateurs</h1>
      <p className="text-sm text-muted-foreground mb-8">
        Les nouveaux membres créent leur compte sur la page de connexion, puis vous leur donnez un rôle ici. Éditeur : modifie les contenus. Admin : gère aussi les utilisateurs.
      </p>
      <div className="bg-background border border-border divide-y divide-border">
        {(data ?? []).map((u) => (
          <div key={u.id} className="flex flex-wrap items-center justify-between gap-3 p-4">
            <div>
              <p className="font-medium">{u.email}</p>
              <p className="text-xs text-muted-foreground">{u.roles.length ? u.roles.join(", ") : "Aucun accès"}</p>
            </div>
            <div className="flex gap-2">
              {(["editor", "admin"] as Role[]).map((role) => {
                const has = u.roles.includes(role);
                return (
                  <Button key={role} size="sm" variant={has ? "default" : "outline"} onClick={() => toggle(u.id, role, has)}>
                    {role === "admin" ? "Admin" : "Éditeur"} {has ? "✓" : ""}
                  </Button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

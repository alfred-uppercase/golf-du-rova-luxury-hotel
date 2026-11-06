import { queryOptions, useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const myRolesQuery = queryOptions({
  queryKey: ["my-roles"],
  queryFn: async () => {
    const { data: u } = await supabase.auth.getUser();
    if (!u.user) return { email: "", roles: [] as string[] };
    const { data } = await supabase.from("user_roles").select("role").eq("user_id", u.user.id);
    return { email: u.user.email ?? "", roles: (data ?? []).map((r) => r.role as string) };
  },
});

export function useMyRoles() {
  return useQuery(myRolesQuery);
}

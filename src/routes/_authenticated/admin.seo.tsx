import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { SEO_PAGES, siteDataQuery } from "@/lib/site-data";
import { BilingualField, ImageField } from "@/components/admin-fields";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/admin/seo")({
  component: SeoAdmin,
});

type Seo = { title_fr: string; title_en: string; description_fr: string; description_en: string; og_image: string };
const empty: Seo = { title_fr: "", title_en: "", description_fr: "", description_en: "", og_image: "" };

function SeoAdmin() {
  const qc = useQueryClient();
  const { data } = useQuery(siteDataQuery);
  const [rows, setRows] = useState<Record<string, Seo>>({});
  useEffect(() => {
    if (!data) return;
    const r: Record<string, Seo> = {};
    for (const p of SEO_PAGES) {
      const s = data.seo.find((x) => x.page === p.page);
      r[p.page] = s ? { ...s, og_image: s.og_image ?? "" } : { ...empty };
    }
    setRows(r);
  }, [data]);

  const set = (page: string, patch: Partial<Seo>) => setRows((r) => ({ ...r, [page]: { ...r[page], ...patch } }));
  const save = async (page: string) => {
    const v = rows[page];
    const { error } = await supabase.from("page_seo").upsert({ page, ...v, og_image: v.og_image || null, updated_at: new Date().toISOString() });
    if (error) return toast.error(error.message);
    toast.success("Référencement enregistré");
    qc.invalidateQueries({ queryKey: siteDataQuery.queryKey });
  };

  return (
    <div className="max-w-5xl space-y-6">
      <div>
        <h1 className="font-display text-4xl">Référencement (SEO)</h1>
        <p className="text-sm text-muted-foreground mt-2">
          Laissez vide pour garder les valeurs actuelles. Titre : 50–60 caractères. Description : 140–160 caractères. Image de partage : 1200×630 idéalement.
        </p>
      </div>
      {SEO_PAGES.map((p) => {
        const v = rows[p.page] ?? empty;
        return (
          <section key={p.page} className="bg-background p-6 border border-border space-y-5">
            <h2 className="font-display text-2xl">{p.label} <span className="text-sm font-mono text-muted-foreground">{p.path}</span></h2>
            <BilingualField label={`Titre (FR ${v.title_fr.length} car.)`} fr={v.title_fr} en={v.title_en} onChange={(x) => set(p.page, { title_fr: x.fr, title_en: x.en })} />
            <BilingualField label={`Description (FR ${v.description_fr.length} car.)`} multiline fr={v.description_fr} en={v.description_en} onChange={(x) => set(p.page, { description_fr: x.fr, description_en: x.en })} />
            <ImageField label="Image de partage (réseaux sociaux)" value={v.og_image} onChange={(url) => set(p.page, { og_image: url })} />
            <Button onClick={() => save(p.page)}><Save className="size-4" /> Enregistrer</Button>
          </section>
        );
      })}
    </div>
  );
}

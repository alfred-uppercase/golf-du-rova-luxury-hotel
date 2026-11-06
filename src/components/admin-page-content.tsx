import { useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { RotateCcw, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { DICTIONARY } from "@/lib/i18n";
import { IMAGE_SLOTS, siteDataQuery } from "@/lib/site-data";
import { BilingualField, ImageField } from "@/components/admin-fields";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/** Editor for every text, alt text and photo slot of one page. */
export function PageContentEditor({ page, title, defaults }: { page: "home" | "golf"; title: string; defaults: Record<string, string> }) {
  const qc = useQueryClient();
  const { data } = useQuery(siteDataQuery);
  const [filter, setFilter] = useState("");
  const keys = useMemo(() => Object.keys(DICTIONARY).filter((k) => k.startsWith(page + ".")), [page]);
  const [texts, setTexts] = useState<Record<string, { fr: string; en: string }>>({});
  const [images, setImages] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!data) return;
    const t: Record<string, { fr: string; en: string }> = {};
    for (const k of keys) {
      const o = data.content.find((c) => c.key === k);
      t[k] = { fr: o?.fr || DICTIONARY[k].fr, en: o?.en || DICTIONARY[k].en };
    }
    setTexts(t);
    const i: Record<string, string> = {};
    for (const s of IMAGE_SLOTS[page]) i[s.key] = data.images.find((x) => x.key === s.key)?.url || defaults[s.key] || "";
    setImages(i);
  }, [data, keys, page, defaults]);

  const refresh = () => qc.invalidateQueries({ queryKey: siteDataQuery.queryKey });

  const saveText = async (k: string) => {
    const v = texts[k];
    const { error } = await supabase.from("site_content").upsert({ key: k, fr: v.fr, en: v.en, updated_at: new Date().toISOString() });
    if (error) return toast.error(error.message);
    toast.success("Texte enregistré");
    refresh();
  };
  const resetText = async (k: string) => {
    const { error } = await supabase.from("site_content").delete().eq("key", k);
    if (error) return toast.error(error.message);
    setTexts((s) => ({ ...s, [k]: { ...DICTIONARY[k] } }));
    toast.success("Texte d'origine restauré");
    refresh();
  };
  const saveImage = async (k: string, url: string) => {
    setImages((s) => ({ ...s, [k]: url }));
    const { error } = await supabase.from("site_images").upsert({ key: k, url, updated_at: new Date().toISOString() });
    if (error) return toast.error(error.message);
    toast.success("Photo mise à jour sur le site");
    refresh();
  };

  const shown = keys.filter((k) => !filter || k.includes(filter) || texts[k]?.fr.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className="max-w-5xl space-y-10">
      <h1 className="font-display text-4xl">{title}</h1>

      <section className="bg-background p-6 border border-border space-y-6">
        <h2 className="font-display text-2xl">Photos</h2>
        <p className="text-sm text-muted-foreground -mt-4">
          La photo est remplacée dès l'envoi. Son texte alternatif (SEO) se modifie dans la liste des textes ci-dessous (clés finissant par « alt »).
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {IMAGE_SLOTS[page].map((s) => (
            <ImageField key={s.key} label={s.label} value={images[s.key] ?? ""} onChange={(url) => saveImage(s.key, url)} />
          ))}
        </div>
      </section>

      <section className="bg-background p-6 border border-border space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="font-display text-2xl">Textes</h2>
          <Input placeholder="Rechercher un texte…" value={filter} onChange={(e) => setFilter(e.target.value)} className="max-w-xs" />
        </div>
        {shown.map((k) => (
          <div key={k} className="border-t border-border pt-5">
            <BilingualField
              label={k}
              fr={texts[k]?.fr ?? ""}
              en={texts[k]?.en ?? ""}
              multiline={(DICTIONARY[k].fr.length ?? 0) > 80}
              onChange={(v) => setTexts((s) => ({ ...s, [k]: v }))}
            />
            <div className="flex gap-2 mt-3">
              <Button size="sm" onClick={() => saveText(k)}><Save className="size-4" /> Enregistrer</Button>
              <Button size="sm" variant="ghost" onClick={() => resetText(k)}><RotateCcw className="size-4" /> Texte d'origine</Button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ArrowDown, ArrowUp, Plus, Save, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { siteDataQuery } from "@/lib/site-data";
import { BilingualField, ImageField } from "@/components/admin-fields";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

type Row = Record<string, unknown> & { id: string; sort_order: number; published: boolean; image_url: string | null };

export type FieldDef = { base: string; label: string; multiline?: boolean };

/** Generic list editor for rooms and restaurants. */
export function ItemsEditor({
  table,
  title,
  fields,
  titleField,
  hint,
}: {
  table: "rooms" | "restaurants";
  title: string;
  fields: FieldDef[];
  titleField: string;
  hint?: string;
}) {
  const qc = useQueryClient();
  const { data, refetch } = useQuery({
    queryKey: ["admin", table],
    queryFn: async () => {
      const { data, error } = await supabase.from(table).select("*").order("sort_order");
      if (error) throw error;
      return data as unknown as Row[];
    },
  });
  const [rows, setRows] = useState<Row[]>([]);
  useEffect(() => setRows(data ?? []), [data]);

  const done = () => {
    refetch();
    qc.invalidateQueries({ queryKey: siteDataQuery.queryKey });
  };
  const update = (id: string, patch: Partial<Row>) => setRows((r) => r.map((x) => (x.id === id ? { ...x, ...patch } : x)));

  const save = async (row: Row) => {
    const { id, created_at: _c, ...rest } = row;
    const { error } = await supabase.from(table).update(rest as never).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Enregistré");
    done();
  };
  const add = async () => {
    const sort = rows.length ? Math.max(...rows.map((r) => r.sort_order)) + 1 : 0;
    const { error } = await supabase.from(table).insert({ sort_order: sort, [`${titleField}_fr`]: "Nouveau", [`${titleField}_en`]: "New", published: false } as never);
    if (error) return toast.error(error.message);
    toast.success("Ajouté (masqué tant qu'il n'est pas publié)");
    done();
  };
  const remove = async (row: Row) => {
    if (!confirm(`Supprimer « ${row[`${titleField}_fr`]} » ?`)) return;
    const { error } = await supabase.from(table).delete().eq("id", row.id);
    if (error) return toast.error(error.message);
    toast.success("Supprimé");
    done();
  };
  const move = async (index: number, dir: -1 | 1) => {
    const a = rows[index];
    const b = rows[index + dir];
    if (!a || !b) return;
    await supabase.from(table).update({ sort_order: b.sort_order } as never).eq("id", a.id);
    await supabase.from(table).update({ sort_order: a.sort_order } as never).eq("id", b.id);
    done();
  };

  return (
    <div className="max-w-5xl space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl">{title}</h1>
          {hint && <p className="text-sm text-muted-foreground mt-2">{hint}</p>}
        </div>
        <Button onClick={add}><Plus className="size-4" /> Ajouter</Button>
      </div>
      {rows.map((row, i) => (
        <section key={row.id} className="bg-background p-6 border border-border space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display text-2xl">{String(row[`${titleField}_fr`] || "Sans titre")}</h2>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 mr-3">
                <Switch id={`pub-${row.id}`} checked={row.published} onCheckedChange={(v) => update(row.id, { published: v })} />
                <Label htmlFor={`pub-${row.id}`}>{row.published ? "Publié" : "Masqué"}</Label>
              </div>
              <Button size="icon" variant="ghost" disabled={i === 0} onClick={() => move(i, -1)} aria-label="Monter"><ArrowUp className="size-4" /></Button>
              <Button size="icon" variant="ghost" disabled={i === rows.length - 1} onClick={() => move(i, 1)} aria-label="Descendre"><ArrowDown className="size-4" /></Button>
            </div>
          </div>
          <ImageField label="Photo" value={row.image_url ?? ""} onChange={(url) => update(row.id, { image_url: url })} />
          {fields.map((f) => (
            <BilingualField
              key={f.base}
              label={f.label}
              multiline={f.multiline}
              fr={String(row[`${f.base}_fr`] ?? "")}
              en={String(row[`${f.base}_en`] ?? "")}
              onChange={(v) => update(row.id, { [`${f.base}_fr`]: v.fr, [`${f.base}_en`]: v.en })}
            />
          ))}
          <div className="flex gap-2">
            <Button onClick={() => save(row)}><Save className="size-4" /> Enregistrer</Button>
            <Button variant="ghost" className="text-destructive" onClick={() => remove(row)}><Trash2 className="size-4" /> Supprimer</Button>
          </div>
        </section>
      ))}
    </div>
  );
}

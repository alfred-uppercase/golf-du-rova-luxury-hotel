import { useRef, useState } from "react";
import { toast } from "sonner";
import { ImagePlus, Loader2 } from "lucide-react";
import { uploadMedia } from "@/lib/site-data";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function ImageField({ label, value, onChange }: { label: string; value: string; onChange: (url: string) => void }) {
  const ref = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const pick = async (file?: File) => {
    if (!file) return;
    setBusy(true);
    try {
      onChange(await uploadMedia(file));
      toast.success("Photo envoyée — pensez à enregistrer");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Envoi impossible");
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex gap-4 items-start">
        <div className="w-40 aspect-[4/3] bg-muted overflow-hidden shrink-0">
          {value ? <img src={value} alt="" className="size-full object-cover" /> : null}
        </div>
        <div className="space-y-2">
          <Button type="button" variant="outline" size="sm" disabled={busy} onClick={() => ref.current?.click()}>
            {busy ? <Loader2 className="size-4 animate-spin" /> : <ImagePlus className="size-4" />} Changer la photo
          </Button>
          <p className="text-xs text-muted-foreground">JPG, PNG ou WEBP — 10 Mo max.</p>
          <input ref={ref} type="file" accept="image/*" className="hidden" onChange={(e) => pick(e.target.files?.[0])} />
        </div>
      </div>
    </div>
  );
}

export function BilingualField({
  label,
  fr,
  en,
  onChange,
  multiline,
}: {
  label: string;
  fr: string;
  en: string;
  onChange: (v: { fr: string; en: string }) => void;
  multiline?: boolean;
}) {
  const C = multiline ? Textarea : Input;
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="grid md:grid-cols-2 gap-3">
        <div>
          <span className="text-[10px] font-mono uppercase text-muted-foreground">FR</span>
          <C value={fr} rows={multiline ? 6 : undefined} onChange={(e) => onChange({ fr: e.target.value, en })} />
        </div>
        <div>
          <span className="text-[10px] font-mono uppercase text-muted-foreground">EN</span>
          <C value={en} rows={multiline ? 6 : undefined} onChange={(e) => onChange({ fr, en: e.target.value })} />
        </div>
      </div>
    </div>
  );
}

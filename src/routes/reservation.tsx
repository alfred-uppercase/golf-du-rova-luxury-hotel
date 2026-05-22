import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { useT } from "@/lib/i18n";

const searchSchema = z.object({
  restaurant: z.enum(["rova", "asian", "view"]).optional(),
  tables: z.coerce.number().int().min(1).max(20).optional(),
});

export const Route = createFileRoute("/reservation")({
  validateSearch: (s) => searchSchema.parse(s),
  head: () => ({
    meta: [
      { title: "Réservation — Golf du Rova, Madagascar" },
      { name: "description", content: "Réservez votre table dans nos restaurants d'exception au Golf du Rova." },
    ],
  }),
  component: ReservationPage,
});

const RESTOS = [
  { id: "rova", label: "La Table du Rova" },
  { id: "asian", label: "Asian Gourmet" },
  { id: "view", label: "The View Bar Lounge" },
] as const;

const COUNTRIES = ["Madagascar", "France", "Maurice", "Réunion", "Belgique", "Suisse", "Canada", "États-Unis", "Royaume-Uni", "Allemagne", "Italie", "Espagne", "Afrique du Sud", "Autre"];

const formSchema = z.object({
  email: z.string().trim().email("Email invalide").max(255),
  firstName: z.string().trim().min(1, "Prénom requis").max(80),
  lastName: z.string().trim().min(1, "Nom requis").max(80),
  address: z.string().trim().min(1, "Adresse requise").max(200),
  zip: z.string().trim().min(1, "Code postal requis").max(20),
  city: z.string().trim().min(1, "Ville requise").max(100),
  country: z.string().min(1, "Pays requis"),
  phone: z.string().trim().min(4, "Téléphone requis").max(30),
  comment: z.string().max(130).optional(),
  restaurant: z.enum(["rova", "asian", "view"]),
  tables: z.coerce.number().int().min(1).max(20),
  date: z.string().min(1, "Date requise"),
  time: z.string().min(1, "Heure requise"),
});

function ReservationPage() {
  const { t } = useT();
  const { restaurant, tables } = Route.useSearch();
  const [resto, setResto] = useState<string>(restaurant ?? "rova");
  const [nbTables, setNbTables] = useState<number>(tables ?? 1);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    const parsed = formSchema.safeParse({ ...data, restaurant: resto, tables: nbTables });
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => {
        errs[String(i.path[0])] = i.message;
      });
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const inputCls =
    "w-full bg-transparent border border-foreground/20 px-4 py-3.5 text-sm placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none transition-colors";

  return (
    <div className="min-h-screen bg-background font-body text-foreground">
      <SiteHeader active="restaurants" />

      <section className="pt-36 md:pt-48 pb-16 px-6 md:px-12 border-b border-border">
        <div className="max-w-5xl mx-auto">
          <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-accent block mb-6">
            {t("resto.kicker")}
          </span>
          <h1 className="font-display text-4xl md:text-6xl leading-[1] tracking-tight mb-6">
            Réservation <span className="italic text-primary">d'une table</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl leading-relaxed">
            Renseignez vos informations ci-dessous. Notre conciergerie confirmera votre réservation sous 24 heures.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          {submitted ? (
            <div className="border border-primary/30 p-12 text-center">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent block mb-4">
                Confirmation
              </span>
              <h2 className="font-display text-3xl md:text-4xl mb-4">Merci pour votre <span className="italic">réservation</span>.</h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Votre demande a bien été transmise à notre conciergerie. Vous recevrez une confirmation par email dans les meilleurs délais.
              </p>
              <Link
                to="/restaurants"
                className="inline-block bg-primary text-primary-foreground px-8 py-3.5 text-[11px] uppercase tracking-[0.25em] font-medium hover:bg-accent hover:text-accent-foreground transition-all"
              >
                Retour aux restaurants
              </Link>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="space-y-10">
              {/* Section: réservation */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-mono text-[11px] uppercase tracking-[0.3em] text-foreground">
                    Votre réservation
                  </h2>
                  <span className="text-[11px] text-muted-foreground italic">
                    Les champs marqués d'un * sont obligatoires
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2">Restaurant *</label>
                    <select
                      value={resto}
                      onChange={(e) => setResto(e.target.value)}
                      className={inputCls}
                    >
                      {RESTOS.map((r) => (
                        <option key={r.id} value={r.id}>{r.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2">Nombre de tables *</label>
                    <input
                      type="number"
                      min={1}
                      max={20}
                      value={nbTables}
                      onChange={(e) => setNbTables(Math.max(1, Math.min(20, Number(e.target.value) || 1)))}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2">Date *</label>
                    <input type="date" name="date" required className={inputCls} />
                    {errors.date && <p className="text-[11px] text-destructive mt-1">{errors.date}</p>}
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2">Heure *</label>
                    <input type="time" name="time" required className={inputCls} />
                    {errors.time && <p className="text-[11px] text-destructive mt-1">{errors.time}</p>}
                  </div>
                </div>
              </div>

              {/* Section: My information */}
              <div>
                <h2 className="font-mono text-[11px] uppercase tracking-[0.3em] text-foreground mb-6">
                  Mes informations
                </h2>
                <div className="space-y-4">
                  <div>
                    <input type="email" name="email" placeholder="Email *" required maxLength={255} className={inputCls} />
                    {errors.email && <p className="text-[11px] text-destructive mt-1">{errors.email}</p>}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <input type="text" name="firstName" placeholder="Prénom *" required maxLength={80} className={inputCls} />
                      {errors.firstName && <p className="text-[11px] text-destructive mt-1">{errors.firstName}</p>}
                    </div>
                    <div>
                      <input type="text" name="lastName" placeholder="Nom *" required maxLength={80} className={inputCls} />
                      {errors.lastName && <p className="text-[11px] text-destructive mt-1">{errors.lastName}</p>}
                    </div>
                  </div>
                  <div>
                    <input type="text" name="address" placeholder="Adresse *" required maxLength={200} className={inputCls} />
                    {errors.address && <p className="text-[11px] text-destructive mt-1">{errors.address}</p>}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <input type="text" name="zip" placeholder="Code Postal *" required maxLength={20} className={inputCls} />
                      {errors.zip && <p className="text-[11px] text-destructive mt-1">{errors.zip}</p>}
                    </div>
                    <div>
                      <input type="text" name="city" placeholder="Ville *" required maxLength={100} className={inputCls} />
                      {errors.city && <p className="text-[11px] text-destructive mt-1">{errors.city}</p>}
                    </div>
                    <div>
                      <select name="country" required defaultValue="" className={inputCls}>
                        <option value="" disabled>— choisir le pays —</option>
                        {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                      {errors.country && <p className="text-[11px] text-destructive mt-1">{errors.country}</p>}
                    </div>
                  </div>
                  <div>
                    <input type="tel" name="phone" placeholder="Téléphone *" required maxLength={30} className={inputCls} />
                    {errors.phone && <p className="text-[11px] text-destructive mt-1">{errors.phone}</p>}
                  </div>
                  <div>
                    <textarea
                      name="comment"
                      placeholder="Commentaire"
                      maxLength={130}
                      rows={4}
                      value={comment}
                      onChange={(e) => setComment(e.target.value.slice(0, 130))}
                      className={inputCls + " resize-none"}
                    />
                    <div className="flex justify-end text-[11px] text-muted-foreground mt-1">{comment.length} / 130</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <button
                  type="submit"
                  className="bg-primary text-primary-foreground px-10 py-4 text-[11px] uppercase tracking-[0.25em] font-medium hover:bg-accent hover:text-accent-foreground transition-all"
                >
                  Confirmer la réservation
                </button>
                <Link
                  to="/restaurants"
                  className="text-[11px] uppercase tracking-[0.25em] font-semibold border-b border-foreground pb-2 hover:text-primary transition-colors self-center"
                >
                  Annuler
                </Link>
              </div>
            </form>
          )}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

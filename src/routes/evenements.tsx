import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Wifi, Presentation, NotebookPen, Mic, Users } from "lucide-react";
import palaisAsset from "@/assets/events-palais.webp.asset.json";
import conferenceAsset from "@/assets/events-conference.jpg.asset.json";
import banquetAsset from "@/assets/events-banquet.jpg.asset.json";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { BOOKING_URL } from "@/lib/booking";
import { useT, getFrenchCopy } from "@/lib/i18n";

export const Route = createFileRoute("/evenements")({
  head: () => ({
    meta: [
      { title: getFrenchCopy("events.meta.title") },
      { name: "description", content: getFrenchCopy("events.meta.description") },
      { property: "og:title", content: getFrenchCopy("events.meta.title") },
      { property: "og:description", content: getFrenchCopy("events.meta.description") },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EventsPage,
});

function EventsPage() {
  const { t } = useT();
  return (
    <div className="min-h-screen bg-background font-body text-foreground">
      <SiteHeader />
      <main>
        <section className="relative flex h-[78svh] min-h-[500px] items-end overflow-hidden px-6 pb-16 pt-28 md:px-12 md:pb-20">
          <img src={palaisAsset.url} alt={t("events.hero.alt")} className="absolute inset-0 size-full object-cover" fetchPriority="high" />
          <div className="absolute inset-0 bg-foreground/40" />
          <div className="relative mx-auto w-full max-w-6xl text-primary-foreground">
            <p className="font-mono text-[10px] uppercase mb-6">{t("events.kicker")}</p>
            <h1 className="font-display text-6xl md:text-8xl leading-none mb-6">{t("events.title")}</h1>
            <p className="font-display text-2xl md:text-3xl">{t("events.subtitle")}</p>
          </div>
        </section>
        <section className="px-6 py-16 md:px-12 md:py-24">
          <div className="mx-auto max-w-6xl grid gap-10 md:grid-cols-[1fr_2fr]">
            <div className="flex items-start gap-3 text-primary"><Users className="size-5 shrink-0 mt-1" /><p className="font-display text-2xl">{t("events.capacity")}</p></div>
            <p className="text-lg text-muted-foreground leading-relaxed">{t("events.intro")}</p>
          </div>
        </section>
        <section className="bg-stone-soft px-6 py-20 md:px-12 md:py-28">
          <div className="mx-auto max-w-6xl grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <img src={conferenceAsset.url} alt={t("events.pro.alt")} loading="lazy" className="aspect-[4/5] w-full object-cover" />
            <div>
              <span className="font-mono text-xs text-accent">01</span>
              <h2 className="font-display text-4xl md:text-5xl leading-tight mt-5 mb-8">{t("events.pro.title")}</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">{t("events.pro.p1")}</p>
              <p className="text-muted-foreground leading-relaxed mb-8">{t("events.pro.p2")}</p>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-6 border-t border-border pt-8">
                {[{ Icon: Wifi, key: "events.wifi" }, { Icon: Presentation, key: "events.flipchart" }, { Icon: NotebookPen, key: "events.notepad" }, { Icon: Mic, key: "events.lectern" }].map(({ Icon, key }) => <li key={key} className="flex gap-3 items-center text-sm"><Icon className="size-5 shrink-0 text-primary" /><span>{t(key)}</span></li>)}
              </ul>
            </div>
          </div>
        </section>
        <section className="px-6 py-20 md:px-12 md:py-28">
          <div className="mx-auto max-w-6xl grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="font-mono text-xs text-accent">02</span>
              <h2 className="font-display text-4xl md:text-5xl leading-tight mt-5 mb-8">{t("events.private.title")}</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">{t("events.private.p1")}</p>
              <p className="text-muted-foreground leading-relaxed mb-10">{t("events.private.p2")}</p>
              <Button asChild size="lg" className="rounded-none uppercase text-[11px] h-12"><a href={BOOKING_URL} target="_blank" rel="noreferrer">{t("nav.book")}<ArrowUpRight aria-hidden="true" /></a></Button>
            </div>
            <img src={banquetAsset.url} alt={t("events.private.alt")} loading="lazy" className="aspect-[4/5] w-full object-cover" />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
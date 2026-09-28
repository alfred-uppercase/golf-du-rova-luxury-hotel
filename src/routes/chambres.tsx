import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import roomDeluxe from "@/assets/room-deluxe.jpg";
import roomSignature from "@/assets/room-signature.jpg";
import roomVilla from "@/assets/room-villa.jpg";
import { useT } from "@/lib/i18n";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import {
  X,
  Wind,
  Wifi,
  ShowerHead,
  Coffee,
  Wine,
  Shirt,
  ShieldCheck,
  Phone,
  Tv,
  TreePalm,
} from "lucide-react";

const AMENITIES = [
  { icon: TreePalm, key: "rooms.amenity.terrace" },
  { icon: Shirt, key: "rooms.amenity.dressing" },
  { icon: Wind, key: "rooms.amenity.ac" },
  { icon: ShieldCheck, key: "rooms.amenity.safe" },
  { icon: Wifi, key: "rooms.amenity.wifi" },
  { icon: Phone, key: "rooms.amenity.phone" },
  { icon: ShowerHead, key: "rooms.amenity.shower" },
  { icon: Tv, key: "rooms.amenity.tv" },
  { icon: Coffee, key: "rooms.amenity.coffee" },
  { icon: Wine, key: "rooms.amenity.minibar" },
];

export const Route = createFileRoute("/chambres")({
  head: () => ({
    meta: [
      { title: "Chambres & Suites — Golf du Rova, Madagascar" },
      {
        name: "description",
        content:
          "Découvrez nos chambres, suites et villas privées : un sanctuaire de luxe ouvert sur les hauts plateaux malgaches, fondé en 1930.",
      },
      { property: "og:title", content: "Chambres & Suites — Golf du Rova" },
      {
        property: "og:description",
        content:
          "Quatre catégories d'hébergement d'exception, du Deluxe Heritage à la Villa Privée avec piscine.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ChambresPage,
});

type Room = {
  id: string;
  index: string;
  nameKey: string;
  catKey: string;
  altKey: string;
  descKey: string;
  img: string;
};

const rooms: Room[] = [
  {
    id: "golf", index: "01", nameKey: "rm.golf.name", catKey: "rm.golf.cat",
    altKey: "rm.golf.alt", descKey: "rm.golf.desc", img: roomSignature,
  },
  {
    id: "rural", index: "02", nameKey: "rm.rural.name", catKey: "rm.rural.cat",
    altKey: "rm.rural.alt", descKey: "rm.rural.desc", img: roomDeluxe,
  },
  {
    id: "forest", index: "03", nameKey: "rm.forest.name", catKey: "rm.forest.cat",
    altKey: "rm.forest.alt", descKey: "rm.forest.desc", img: roomVilla,
  },
];

function ChambresPage() {
  const { t } = useT();
  const [openInfo, setOpenInfo] = useState<string | null>(null);
  const active = rooms.find((x) => x.id === openInfo);

  return (
    <div className="min-h-screen bg-background font-body text-foreground selection:bg-primary/10 selection:text-primary">
      {/* Navigation */}
      <SiteHeader active="rooms" />

      {/* Hero */}
      <section className="relative pt-40 pb-20 md:pt-52 md:pb-28 px-6 md:px-12 border-b border-border">
        <div className="max-w-6xl mx-auto" style={{ animation: "var(--animate-fade-up)" }}>
          <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-accent block mb-6">
            {t("rooms.kicker")}
          </span>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight text-balance mb-10">
            {t("rooms.title.1")} <br />
            <span className="italic text-primary">{t("rooms.title.2")}</span>
          </h1>
          <div className="grid md:grid-cols-2 gap-10 max-w-5xl">
            <p className="text-muted-foreground text-pretty leading-relaxed text-lg">
              {t("rooms.intro.1")}
            </p>
            <p className="text-muted-foreground text-pretty leading-relaxed">
              {t("rooms.intro.2")}
            </p>
          </div>
        </div>
      </section>

      {/* Rooms */}
      <section className="py-24 md:py-32 px-6 md:px-12 space-y-28 md:space-y-40">
        {rooms.map((r, i) => (
          <article
            key={r.id}
            id={r.id}
            className={`max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-center ${
              i % 2 === 1 ? "lg:[&>div:first-child]:order-2" : ""
            }`}
          >
            <div className="lg:col-span-7">
              <img
                src={r.img}
                alt={t(r.altKey)}
                width={1280}
                height={1600}
                loading="lazy"
                className="w-full aspect-[4/5] object-cover shadow-sm"
              />
            </div>
            <div className="lg:col-span-5">
              <div className="flex items-center gap-4 mb-6">
                <span className="font-mono text-[10px] text-accent tracking-[0.3em]">
                  [ {r.index} ]
                </span>
                <span className="h-px flex-1 bg-border" />
              </div>
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground block mb-4">
                {t(r.catKey)}
              </span>
              <h2 className="font-display text-4xl md:text-5xl leading-tight mb-8 text-balance">
                {t(r.nameKey)}
              </h2>
              <p className="text-muted-foreground leading-relaxed text-pretty max-w-[52ch] mb-8">
                {t(r.descKey)}
              </p>

              <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                <button
                  onClick={() => setOpenInfo(r.id)}
                  className="text-[11px] uppercase tracking-[0.25em] font-semibold border-b border-primary pb-2 hover:text-primary transition-colors inline-flex items-center gap-2"
                >
                  {t("rooms.details.cta")}
                  <span aria-hidden>→</span>
                </button>
                <button className="bg-primary text-primary-foreground px-7 py-3.5 text-[11px] uppercase tracking-[0.25em] font-medium hover:bg-accent hover:text-accent-foreground transition-all">
                  {t("rooms.book")}
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 px-6 md:px-12 text-center">
        <div className="max-w-2xl mx-auto">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent block mb-6">
            {t("rooms.cta.kicker")}
          </span>
          <h2 className="font-display text-3xl md:text-5xl leading-tight mb-8 text-balance">
            {t("rooms.cta.title.1")} <span className="italic">{t("rooms.cta.title.2")}</span>
          </h2>
          <p className="text-muted-foreground mb-10 leading-relaxed">
            {t("rooms.cta.p")}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="bg-primary text-primary-foreground px-10 py-4 text-[11px] uppercase tracking-[0.25em] font-medium hover:bg-accent hover:text-accent-foreground transition-all">
              {t("home.check.availability")}
            </button>
            <a
              href="tel:+261342022011"
              className="border border-foreground/20 px-10 py-4 text-[11px] uppercase tracking-[0.25em] font-medium hover:bg-foreground hover:text-background transition-all"
            >
              +261 34 20 22 011 90
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />

      {/* Info modal — Aménagements */}
      {openInfo && active && (
        <div
          className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 md:p-6 overflow-y-auto"
          onClick={() => setOpenInfo(null)}
        >
          <div
            className="relative bg-background max-w-3xl w-full p-8 md:p-14 shadow-2xl my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpenInfo(null)}
              className="absolute top-5 right-5 text-foreground/60 hover:text-primary transition-colors"
              aria-label={t("common.close")}
            >
              <X className="size-5" />
            </button>

            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent block mb-3">
              {t(active.catKey)} · {t(active.nameKey)}
            </span>
            <h3 className="font-display text-3xl md:text-5xl text-primary mb-10 text-center md:text-left">
              {t("rooms.modal.title.1")} <span className="italic">{t("rooms.modal.title.2")}</span>
            </h3>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 mb-10">
              {AMENITIES.map(({ icon: Icon, key }) => (
                <li key={key} className="flex items-start gap-4">
                  <span className="shrink-0 mt-0.5 text-accent">
                    <Icon className="size-6" strokeWidth={1.4} />
                  </span>
                  <span className="text-sm md:text-[15px] leading-relaxed text-foreground/85">
                    {t(key)}
                  </span>
                </li>
              ))}
            </ul>

            <p className="text-xs text-muted-foreground leading-relaxed mb-8 italic">
              {t("rooms.modal.p")}
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="bg-primary text-primary-foreground px-7 py-3.5 text-[11px] uppercase tracking-[0.25em] font-medium hover:bg-accent hover:text-accent-foreground transition-all">
                {t("rooms.book")}
              </button>
              <button
                onClick={() => setOpenInfo(null)}
                className="text-[11px] uppercase tracking-[0.25em] font-semibold border-b border-foreground pb-2 hover:text-primary transition-colors"
              >
                {t("common.close")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import restoRovaAsset from "@/assets/resto-rova.png.asset.json";
import restoAsianAsset from "@/assets/resto-asian.png.asset.json";
import restoViewAsset from "@/assets/resto-view.png.asset.json";
const restoRova = restoRovaAsset.url;
const restoAsian = restoAsianAsset.url;
const restoView = restoViewAsset.url;
import chefZervas from "@/assets/chef-zervas.jpg";
import { useT } from "@/lib/i18n";
import { seoHead, siteDataQuery, splitParagraphs, useSiteData } from "@/lib/site-data";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BOOKING_URL } from "@/lib/booking";

const RESTAURANT_VIDEO = "https://golf-madagascar.mg/wp-content/uploads/2024/11/Restaurant_1.mp4";

export const Route = createFileRoute("/restaurants")({
  loader: ({ context }) => context.queryClient.ensureQueryData(siteDataQuery).catch(() => undefined),
  head: ({ loaderData }) =>
    seoHead(loaderData, "restaurants", "/restaurants", {
      title: "Restaurants — Golf du Rova, Madagascar",
      description: "Trois tables d'exception au Golf du Rova : La Table du Rova, Asian Gourmet et The View Bar Lounge.",
    }),
  component: RestaurantsPage,
});

type Shown = { id: string; index: string; name: string; cat: string; alt: string; paragraphs: string[]; img: string; bookingName: string };

type Resto = {
  id: string;
  nameKey: string;
  catKey: string;
  altKey: string;
  paraKeys: string[];
  img: string;
  index: string;
};

const restaurants: Resto[] = [
  {
    id: "rova",
    index: "01",
    nameKey: "r.rova.name",
    catKey: "r.rova.cat",
    altKey: "r.rova.alt",
    img: restoRova,
    paraKeys: ["r.rova.p1", "r.rova.p2", "r.rova.p3"],
  },
  {
    id: "asian",
    index: "02",
    nameKey: "r.asian.name",
    catKey: "r.asian.cat",
    altKey: "r.asian.alt",
    img: restoAsian,
    paraKeys: ["r.asian.p1", "r.asian.p2", "r.asian.p3"],
  },
  {
    id: "view",
    index: "03",
    nameKey: "r.view.name",
    catKey: "r.view.cat",
    altKey: "r.view.alt",
    img: restoView,
    paraKeys: ["r.view.p1", "r.view.p2"],
  },
];

function RestaurantsPage() {
  const { t, lang } = useT();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const site = useSiteData();
  const pick = (fr: string, en: string) => (lang === "en" ? en || fr : fr);
  const list: Shown[] = site?.restaurants.length
    ? site.restaurants.map((r, i) => ({
        id: r.slug || r.id,
        index: String(i + 1).padStart(2, "0"),
        name: pick(r.name_fr, r.name_en),
        cat: pick(r.category_fr, r.category_en),
        alt: pick(r.alt_fr, r.alt_en),
        paragraphs: splitParagraphs(pick(r.body_fr, r.body_en)),
        img: r.image_url ?? "",
        bookingName: r.name_fr,
      }))
    : restaurants.map((r) => ({
        id: r.id,
        index: r.index,
        name: t(r.nameKey),
        cat: t(r.catKey),
        alt: t(r.altKey),
        paragraphs: r.paraKeys.map((k) => t(k)),
        img: r.img,
        bookingName: t(r.nameKey),
      }));
  const active = list.find((r) => r.id === openMenu);

  return (
    <div className="min-h-screen bg-background font-body text-foreground selection:bg-primary/10 selection:text-primary">
      <SiteHeader active="restaurants" />

      {/* Hero video */}
      <section className="relative min-h-[720px] h-[92vh] flex items-end overflow-hidden px-6 md:px-12 pb-20 md:pb-24">
        <video src={RESTAURANT_VIDEO} autoPlay muted loop playsInline preload="auto" className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/30 to-black/80" />
        <div className="relative z-10 max-w-6xl mx-auto w-full text-white" style={{ animation: "var(--animate-fade-up)" }}>
          <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-accent block mb-6">
            {t("resto.kicker")}
          </span>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight text-balance mb-10">
            {t("resto.title.1")} <br />
            <span className="italic text-accent">{t("resto.title.2")}</span>
          </h1>
          <div className="grid md:grid-cols-2 gap-10 max-w-5xl">
            <p className="text-white/90 text-pretty leading-relaxed text-lg">
              {t("resto.intro.1")}
            </p>
            <p className="text-white/75 text-pretty leading-relaxed">
              {t("resto.intro.2")}
            </p>
          </div>
        </div>
      </section>

      {/* Restaurants */}
      <section className="py-24 md:py-32 px-6 md:px-12 space-y-28 md:space-y-40">
        {list.map((r, i) => (
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
                alt={r.alt}
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
                {r.cat}
              </span>
              <h2 className="font-display text-4xl md:text-5xl leading-tight mb-8 text-balance">
                {r.name}
              </h2>
              <div className="space-y-5 mb-10">
                {r.paragraphs.map((p, pi) => (
                  <p
                    key={pi}
                    className="text-muted-foreground leading-relaxed text-pretty max-w-[52ch]"
                  >
                    {p}
                  </p>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                <button
                  onClick={() => setOpenMenu(r.id)}
                  className="text-[11px] uppercase tracking-[0.25em] font-semibold border-b border-primary pb-2 hover:text-primary transition-colors inline-flex items-center gap-2"
                >
                  {t("resto.menu.cta")}
                  <span aria-hidden>→</span>
                </button>
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-primary text-primary-foreground px-7 py-3.5 text-[11px] uppercase tracking-[0.25em] font-medium hover:bg-accent hover:text-accent-foreground transition-all"
                >
                  {t("resto.book.table")}
                </a>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* Chef section */}
      <section className="bg-stone-soft py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-mono text-[11px] text-accent uppercase tracking-[0.3em] block mb-6">
              {t("resto.chefs.kicker")}
            </span>
            <h2 className="font-display text-4xl md:text-5xl leading-tight text-balance">
              {t("resto.chefs.title.1")} <span className="italic">{t("resto.chefs.title.2")}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center max-w-5xl mx-auto">
            <div className="lg:col-span-5">
              <img
                src={chefZervas}
                alt="Portrait du Chef Dimitrios Zervas"
                width={1024}
                height={1280}
                loading="lazy"
                className="w-full aspect-[4/5] object-cover shadow-sm"
              />
            </div>
            <div className="lg:col-span-7">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground block mb-3">
                La Table du Rova
              </span>
              <h3 className="font-display text-3xl md:text-4xl mb-2">
                Chef Dimitrios <span className="italic">Zervas</span>
              </h3>
              <div className="flex items-center gap-3 mb-8">
                <span className="h-px w-10 bg-accent" />
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">
                  {t("resto.chef.role")}
                </span>
              </div>
              <div className="space-y-5 text-muted-foreground leading-relaxed text-pretty max-w-[60ch]">
                <p>{t("resto.chef.p1")}</p>
                <p>{t("resto.chef.p2")}</p>
                <p>{t("resto.chef.p3")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 px-6 md:px-12 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-3xl md:text-5xl leading-tight mb-8 text-balance">
            {t("resto.cta.title.1")} <span className="italic">{t("resto.cta.title.2")}</span>
          </h2>
          <p className="text-muted-foreground mb-10 leading-relaxed">
            {t("resto.cta.p")}
          </p>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-block bg-primary text-primary-foreground px-10 py-4 text-[11px] uppercase tracking-[0.25em] font-medium hover:bg-accent hover:text-accent-foreground transition-all"
          >
            {t("resto.book.table")}
          </a>
        </div>
      </section>

      <SiteFooter />

      {/* Menu modal */}
      {openMenu && active && (
        <div
          className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={() => setOpenMenu(null)}
        >
          <div
            className="bg-background max-w-lg w-full p-10 md:p-12 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent block mb-4">
              {active.cat}
            </span>
            <h3 className="font-display text-3xl md:text-4xl mb-6">
              {active.name}
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-8">
              {t("resto.modal.p")}
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noreferrer"
                className="bg-primary text-primary-foreground px-6 py-3 text-[11px] uppercase tracking-[0.25em] font-medium hover:bg-accent hover:text-accent-foreground transition-all"
              >
                {t("resto.book.table")}
              </a>
              <button
                onClick={() => setOpenMenu(null)}
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

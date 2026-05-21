import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import restoRova from "@/assets/resto-rova.jpg";
import restoAsian from "@/assets/resto-asian.jpg";
import restoView from "@/assets/resto-view.jpg";
import chefZervas from "@/assets/chef-zervas.jpg";
import { useT } from "@/lib/i18n";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/restaurants")({
  head: () => ({
    meta: [
      { title: "Restaurants — Golf du Rova, Madagascar" },
      {
        name: "description",
        content:
          "Trois tables d'exception au Golf du Rova : La Table du Rova (gastronomique fusion), Asian Gourmet et The View Bar Lounge.",
      },
      { property: "og:title", content: "Restaurants — Golf du Rova" },
      {
        property: "og:description",
        content:
          "Voyage culinaire à travers nos trois restaurants étoilés au cœur des hauts plateaux malgaches.",
      },
    ],
  }),
  component: RestaurantsPage,
});

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
  const { t } = useT();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const active = restaurants.find((r) => r.id === openMenu);

  return (
    <div className="min-h-screen bg-background font-body text-foreground selection:bg-primary/10 selection:text-primary">
      <SiteHeader active="restaurants" />

      {/* Hero */}
      <section className="relative pt-40 pb-20 md:pt-52 md:pb-28 px-6 md:px-12 border-b border-border">
        <div className="max-w-6xl mx-auto" style={{ animation: "var(--animate-fade-up)" }}>
          <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-accent block mb-6">
            {t("resto.kicker")}
          </span>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight text-balance mb-10">
            {t("resto.title.1")} <br />
            <span className="italic text-primary">{t("resto.title.2")}</span>
          </h1>
          <div className="grid md:grid-cols-2 gap-10 max-w-5xl">
            <p className="text-muted-foreground text-pretty leading-relaxed text-lg">
              {t("resto.intro.1")}
            </p>
            <p className="text-muted-foreground text-pretty leading-relaxed">
              {t("resto.intro.2")}
            </p>
          </div>
        </div>
      </section>

      {/* Restaurants */}
      <section className="py-24 md:py-32 px-6 md:px-12 space-y-28 md:space-y-40">
        {restaurants.map((r, i) => (
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
              <div className="space-y-5 mb-10">
                {r.paraKeys.map((p) => (
                  <p
                    key={p}
                    className="text-muted-foreground leading-relaxed text-pretty max-w-[52ch]"
                  >
                    {t(p)}
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
                <button className="bg-primary text-primary-foreground px-7 py-3.5 text-[11px] uppercase tracking-[0.25em] font-medium hover:bg-accent hover:text-accent-foreground transition-all">
                  {t("resto.book.table")}
                </button>
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
          <button className="bg-primary text-primary-foreground px-10 py-4 text-[11px] uppercase tracking-[0.25em] font-medium hover:bg-accent hover:text-accent-foreground transition-all">
            {t("resto.book.table")}
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground pt-20 pb-10 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10 pb-10 border-b border-primary-foreground/10">
          <div>
            <span className="font-display text-2xl italic">Golf du Rova</span>
            <p className="text-[11px] uppercase tracking-[0.2em] opacity-60 mt-2">
              Andakana — Antananarivo · +261 34 20 22 011 90
            </p>
          </div>
          <Link
            to="/"
            className="text-[11px] uppercase tracking-[0.25em] opacity-70 hover:opacity-100 transition-opacity self-start md:self-center"
          >
            {t("footer.back")}
          </Link>
        </div>
        <p className="text-[9px] opacity-40 uppercase tracking-[0.25em] mt-8 text-center md:text-left">
          {t("footer.copy.short")}
        </p>
      </footer>

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
              {t(active.catKey)}
            </span>
            <h3 className="font-display text-3xl md:text-4xl mb-6">
              {t(active.nameKey)}
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-8">
              {t("resto.modal.p")}
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-primary text-primary-foreground px-6 py-3 text-[11px] uppercase tracking-[0.25em] font-medium hover:bg-accent hover:text-accent-foreground transition-all">
                {t("resto.book.table")}
              </button>
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

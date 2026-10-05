import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import chambreCharmeAsset from "@/assets/chambre-charme.png.asset.json";
import chambreConfortAsset from "@/assets/chambre-confort.png.asset.json";
const roomSuite = chambreCharmeAsset.url;
const roomDetail = chambreConfortAsset.url;
import golfView from "@/assets/chambre-vue-golf.png.asset.json";
import ruralView from "@/assets/chambre-vue-massif.png.asset.json";
import forestView from "@/assets/chambre-vue-foret.png.asset.json";
import { useT } from "@/lib/i18n";
import { BOOKING_URL } from "@/lib/booking";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { VideoModal } from "@/components/video-modal";
import {
  Play,
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

const ROOMS_VIDEO = "https://golf-madagascar.mg/wp-content/uploads/2024/11/Chambre.mp4";

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
          "Découvrez les chambres du Golf du Rova avec vue sur le parcours, le massif rural ou la forêt malgache.",
      },
      { property: "og:title", content: "Chambres & Suites — Golf du Rova" },
      {
        property: "og:description",
        content:
          "Trois horizons pour votre séjour : le parcours de golf, le massif rural et la forêt.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ChambresPage,
});

const views = [
  { image: golfView.url, nameKey: "rm.golf.name", altKey: "rm.golf.alt" },
  { image: ruralView.url, nameKey: "rm.rural.name", altKey: "rm.rural.alt" },
  { image: forestView.url, nameKey: "rm.forest.name", altKey: "rm.forest.alt" },
];

function ChambresPage() {
  const { t } = useT();
  const [openInfo, setOpenInfo] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);

  useEffect(() => {
    if (!openInfo) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenInfo(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [openInfo]);

  return (
    <div className="min-h-screen bg-background font-body text-foreground selection:bg-primary/10 selection:text-primary">
      {/* Navigation */}
      <SiteHeader active="rooms" />

      <section className="group/hero relative h-[88vh] min-h-[620px] flex items-end overflow-hidden px-6 md:px-12 pb-20 md:pb-24">
        <video src={ROOMS_VIDEO} autoPlay muted loop playsInline preload="auto" className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/20 to-black/75" />
        <button type="button" onClick={() => setVideoOpen(true)} className="absolute top-24 right-5 md:top-28 md:right-10 z-20 flex items-center gap-3 bg-white/10 backdrop-blur border border-white/30 text-white px-5 py-3 text-[10px] uppercase tracking-[0.25em] opacity-100 md:opacity-0 md:group-hover/hero:opacity-100 hover:bg-accent hover:border-accent hover:text-accent-foreground transition-all duration-500">
          <Play className="size-4 fill-current" /> {t("hero.watch.video")}
        </button>
        <div className="relative z-10 max-w-6xl mx-auto w-full text-white" style={{ animation: "var(--animate-fade-up)" }}>
          <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-accent block mb-6">{t("rooms.hero.kicker")}</span>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] text-balance">
            {t("rooms.title.1")} <br /><span className="italic text-accent">{t("rooms.title.2")}</span>
          </h1>
        </div>
      </section>

      <section className="py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            <img src={roomSuite} alt={t("rooms.section1.alt")} width={1280} height={960} loading="lazy" className="w-full aspect-[4/3] object-cover" />
          </div>
          <div className="lg:col-span-5">
            <span className="font-mono text-[10px] text-accent tracking-[0.3em] block mb-6">[ 01 ]</span>
            <h2 className="font-display text-4xl md:text-5xl leading-tight mb-8 text-balance">{t("rooms.section1.title")}</h2>
            <p className="text-muted-foreground leading-relaxed mb-5">{t("rooms.section1.p1")}</p>
            <p className="text-muted-foreground leading-relaxed mb-9">{t("rooms.section1.p2")}</p>
            <RoomActions t={t} onDetails={() => setOpenInfo(true)} />
          </div>
        </div>
      </section>

      <section className="bg-stone-soft py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5">
            <span className="font-mono text-[10px] text-accent tracking-[0.3em] block mb-6">[ 02 ]</span>
            <h2 className="font-display text-4xl md:text-5xl leading-tight mb-8 text-balance">{t("rooms.section2.title")}</h2>
            <p className="text-muted-foreground leading-relaxed mb-5">{t("rooms.section2.p1")}</p>
            <p className="text-muted-foreground leading-relaxed mb-9">{t("rooms.section2.p2")}</p>
            <RoomActions t={t} onDetails={() => setOpenInfo(true)} />
          </div>
          <div className="lg:col-span-7 lg:order-last order-first">
            <img src={roomDetail} alt={t("rooms.section2.alt")} width={1280} height={960} loading="lazy" className="w-full aspect-[4/3] object-cover" />
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent block mb-5">{t("rooms.views.kicker")}</span>
            <h2 className="font-display text-4xl md:text-5xl">{t("rooms.views.title")}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {views.map((view, index) => (
              <figure key={view.nameKey} className="group relative aspect-[4/5] overflow-hidden bg-stone-soft">
                <img src={view.image} alt={t(view.altKey)} loading="lazy" className="size-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 p-7 text-primary-foreground">
                  <span className="font-mono text-[9px] tracking-[0.25em] text-accent block mb-2">[ 0{index + 1} ]</span>
                  <h3 className="font-display text-2xl">{t(view.nameKey)}</h3>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
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
            <a href={BOOKING_URL} target="_blank" rel="noreferrer" className="bg-primary text-primary-foreground px-10 py-4 text-[11px] uppercase tracking-[0.25em] font-medium hover:bg-accent hover:text-accent-foreground transition-all">
              {t("home.check.availability")}
            </a>
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
      <VideoModal src={ROOMS_VIDEO} open={videoOpen} onClose={() => setVideoOpen(false)} />

      {/* Info modal — Aménagements */}
      {openInfo && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="room-amenities-title"
          className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 md:p-6 overflow-y-auto"
          onClick={() => setOpenInfo(false)}
        >
          <div
            className="relative bg-background max-w-3xl w-full p-8 md:p-14 shadow-2xl my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpenInfo(false)}
              className="absolute top-5 right-5 text-foreground/60 hover:text-primary transition-colors"
              aria-label={t("common.close")}
            >
              <X className="size-5" />
            </button>

            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent block mb-3">
              {t("rooms.hero.kicker")}
            </span>
            <h3 id="room-amenities-title" className="font-display text-3xl md:text-5xl text-primary mb-10 text-center md:text-left">
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
              <a href={BOOKING_URL} target="_blank" rel="noreferrer" className="bg-primary text-primary-foreground px-7 py-3.5 text-[11px] uppercase tracking-[0.25em] font-medium hover:bg-accent hover:text-accent-foreground transition-all">
                {t("rooms.book")}
              </a>
              <button
                onClick={() => setOpenInfo(false)}
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

function RoomActions({ t, onDetails }: { t: (key: string) => string; onDetails: () => void }) {
  return (
    <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
      <button type="button" onClick={onDetails} className="text-[11px] uppercase tracking-[0.25em] font-semibold border-b border-primary pb-2 hover:text-primary transition-colors inline-flex items-center gap-2">
        {t("rooms.details.cta")} <span aria-hidden>→</span>
      </button>
      <a href={BOOKING_URL} target="_blank" rel="noreferrer" className="bg-primary text-primary-foreground px-7 py-3.5 text-[11px] uppercase tracking-[0.25em] font-medium hover:bg-accent hover:text-accent-foreground transition-all">
        {t("home.check.availability")}
      </a>
    </div>
  );
}

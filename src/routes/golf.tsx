import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, X, Play } from "lucide-react";
import { useT } from "@/lib/i18n";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { VideoModal } from "@/components/video-modal";
import g1 from "@/assets/golf-g1.jpg";
import g2 from "@/assets/golf-g2.jpg";
import g3 from "@/assets/golf-g3.jpg";
import g4 from "@/assets/golf-g4.jpg";
import g5 from "@/assets/golf-g5.jpg";
import g6 from "@/assets/golf-g6.jpg";
import g7 from "@/assets/golf-g7.jpg";
import g8 from "@/assets/golf-g8.jpg";
import g9 from "@/assets/golf-g9.jpg";
import g10 from "@/assets/golf-g10.jpg";

export const Route = createFileRoute("/golf")({
  head: () => ({
    meta: [
      { title: "Golf 18 trous — Golf du Rova, Madagascar" },
      {
        name: "description",
        content:
          "Le seul véritable parcours 18 trous de Madagascar, fondé en 1930. Pro Shop, practice et clubhouse au cœur des hauts plateaux.",
      },
      { property: "og:title", content: "Le Golf 18 trous — Golf du Rova" },
      {
        property: "og:description",
        content:
          "Une institution centenaire à 30 minutes d'Antananarivo. Découvrez le parcours, le practice Le Swing et le Pro Shop.",
      },
    ],
  }),
  component: GolfPage,
});

const HERO_VIDEO = "https://golf-madagascar.mg/wp-content/uploads/2024/11/Golf.mp4";

const gallery = [
  { src: g1, fr: "Vue aérienne du parcours", en: "Aerial view of the course" },
  { src: g2, fr: "Détail club et gant", en: "Club and glove detail" },
  { src: g3, fr: "Pro Shop — couvre-clubs", en: "Pro Shop — club covers" },
  { src: g4, fr: "Practice Le Swing au coucher du soleil", en: "Le Swing practice range at sunset" },
  { src: g5, fr: "Drapeau rouge sur le green", en: "Red flag on the green" },
  { src: g6, fr: "Le Clubhouse", en: "The Clubhouse" },
  { src: g7, fr: "Sortie de bunker", en: "Bunker shot" },
  { src: g8, fr: "Vue aérienne du tracé", en: "Aerial view of the layout" },
  { src: g9, fr: "Joueurs sur le fairway", en: "Players on the fairway" },
  { src: g10, fr: "Putting green au soleil couchant", en: "Putting green at sunset" },
];

function GolfPage() {
  const { t, lang } = useT();
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [videoOpen, setVideoOpen] = useState(false);

  const close = useCallback(() => setLightbox(null), []);
  const next = useCallback(
    () => setLightbox((i) => (i === null ? null : (i + 1) % gallery.length)),
    [],
  );
  const prev = useCallback(
    () =>
      setLightbox((i) =>
        i === null ? null : (i - 1 + gallery.length) % gallery.length,
      ),
    [],
  );

  useEffect(() => {
    if (lightbox === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox, close, next, prev]);

  return (
    <div className="min-h-screen bg-background font-body text-foreground selection:bg-primary/10 selection:text-primary">
      <SiteHeader active="golf" />

      {/* Hero video */}
      <section className="group/hero relative h-[88vh] min-h-[560px] flex flex-col justify-end pb-20 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            src={HERO_VIDEO}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-background" />
        </div>
        <button
          type="button"
          onClick={() => setVideoOpen(true)}
          className="absolute top-24 right-5 md:top-28 md:right-10 z-20 flex items-center gap-3 bg-white/10 backdrop-blur border border-white/30 text-white px-5 py-3 text-[10px] uppercase tracking-[0.25em] opacity-0 group-hover/hero:opacity-100 hover:bg-accent hover:border-accent hover:text-accent-foreground transition-all duration-500"
        >
          <Play className="h-4 w-4 fill-current" />
          {t("hero.watch.video")}
        </button>
        <div
          className="relative z-10 px-6 md:px-12 max-w-6xl mx-auto w-full"
          style={{ animation: "var(--animate-fade-up)" }}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/85 block mb-6">
            {t("golf.kicker")}
          </span>
          <h1 className="font-display text-white text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight text-balance mb-10">
            {t("golf.title.1")} <br />
            <span className="italic text-accent">{t("golf.title.2")}</span>
          </h1>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl text-white/90">
            <p className="leading-relaxed text-pretty">{t("golf.intro.1")}</p>
            <p className="leading-relaxed text-pretty">{t("golf.intro.2")}</p>
          </div>
          <div className="mt-10">
            <button className="bg-accent text-accent-foreground px-8 py-4 text-[11px] uppercase tracking-[0.25em] font-semibold hover:bg-primary hover:text-primary-foreground transition-all">
              {t("golf.cta.book")}
            </button>
          </div>
        </div>
      </section>

      {/* Pro Shop */}
      <section className="py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5 lg:order-1">
            <span className="font-mono text-[11px] text-accent uppercase tracking-[0.3em] block mb-6">
              {t("golf.proshop.kicker")}
            </span>
            <h2 className="font-display text-4xl md:text-5xl leading-tight mb-8 text-balance">
              {t("golf.proshop.title.1")} <br />
              <span className="italic">{t("golf.proshop.title.2")}</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-5 max-w-[52ch]">
              {t("golf.proshop.p1")}
            </p>
            <p className="text-muted-foreground leading-relaxed max-w-[52ch]">
              {t("golf.proshop.p2")}
            </p>
          </div>
          <div className="lg:col-span-7 lg:order-2">
            <img
              src={g3}
              alt="Pro Shop"
              width={1280}
              height={1600}
              loading="lazy"
              className="w-full aspect-[4/5] object-cover shadow-sm"
            />
          </div>
        </div>
      </section>

      {/* Le Swing */}
      <section className="bg-stone-soft py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <img
              src={g4}
              alt="Le Swing"
              width={1600}
              height={1024}
              loading="lazy"
              className="w-full aspect-[4/3] object-cover shadow-sm"
            />
          </div>
          <div className="lg:col-span-5 order-1 lg:order-2">
            <span className="font-mono text-[11px] text-accent uppercase tracking-[0.3em] block mb-6">
              {t("golf.swing.kicker")}
            </span>
            <h2 className="font-display text-4xl md:text-5xl leading-tight mb-8 text-balance">
              {t("golf.swing.title.1")} <br />
              <span className="italic">{t("golf.swing.title.2")}</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-5 max-w-[52ch]">
              {t("golf.swing.p1")}
            </p>
            <p className="text-muted-foreground leading-relaxed max-w-[52ch]">
              {t("golf.swing.p2")}
            </p>
          </div>
        </div>
      </section>

      {/* Le Club */}
      <section className="py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5">
            <span className="font-mono text-[11px] text-accent uppercase tracking-[0.3em] block mb-6">
              {t("golf.club.kicker")}
            </span>
            <h2 className="font-display text-4xl md:text-5xl leading-tight mb-8 text-balance">
              {t("golf.club.title.1")} <br />
              <span className="italic">{t("golf.club.title.2")}</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-5 max-w-[52ch]">
              {t("golf.club.p1")}
            </p>
            <p className="text-muted-foreground leading-relaxed mb-10 max-w-[52ch]">
              {t("golf.club.p2")}
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] font-semibold border-b border-primary pb-2 hover:text-primary transition-colors"
            >
              {t("golf.club.cta")}
              <span aria-hidden>→</span>
            </a>
          </div>
          <div className="lg:col-span-7">
            <img
              src={g6}
              alt="Le Clubhouse"
              width={1600}
              height={1024}
              loading="lazy"
              className="w-full aspect-[4/3] object-cover shadow-sm"
            />
          </div>
        </div>
      </section>

      {/* Gallery — masonry */}
      <section className="bg-stone-soft py-24 md:py-32 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14 px-2">
            <span className="font-mono text-[11px] text-accent uppercase tracking-[0.3em] block mb-4">
              {t("golf.gallery.kicker")}
            </span>
            <h2 className="font-display text-4xl md:text-5xl">
              {t("golf.gallery.title")}
            </h2>
          </div>

          <div className="columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-4 [column-fill:_balance]">
            {gallery.map((img, i) => (
              <button
                key={img.src}
                type="button"
                onClick={() => setLightbox(i)}
                className="group relative mb-3 md:mb-4 block w-full overflow-hidden break-inside-avoid focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/30 transition-colors duration-500" />
                <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/90">
                    [ {String(i + 1).padStart(2, "0")} / {String(gallery.length).padStart(2, "0")} ]
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 px-6 md:px-12 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-3xl md:text-5xl leading-tight mb-8 text-balance">
            {t("golf.cta.title.1")} <span className="italic">{t("golf.cta.title.2")}</span>
          </h2>
          <p className="text-muted-foreground mb-10 leading-relaxed">{t("golf.cta.p")}</p>
          <button className="bg-primary text-primary-foreground px-10 py-4 text-[11px] uppercase tracking-[0.25em] font-medium hover:bg-accent hover:text-accent-foreground transition-all">
            {t("golf.cta.book")}
          </button>
        </div>
      </section>

      <SiteFooter />
      <VideoModal src={HERO_VIDEO} open={videoOpen} onClose={() => setVideoOpen(false)} />

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[80] bg-black/95 flex items-center justify-center p-4 md:p-10"
          onClick={close}
          style={{ animation: "var(--animate-fade-up)" }}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Fermer"
            className="absolute top-5 right-5 md:top-8 md:right-8 text-white/80 hover:text-white p-2"
          >
            <X className="h-7 w-7" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Précédent"
            className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 bg-white/5 hover:bg-white/15 rounded-full backdrop-blur"
          >
            <ChevronLeft className="h-7 w-7" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Suivant"
            className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 bg-white/5 hover:bg-white/15 rounded-full backdrop-blur"
          >
            <ChevronRight className="h-7 w-7" />
          </button>
          <figure
            className="relative max-w-6xl max-h-[88vh] w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              key={gallery[lightbox].src}
              src={gallery[lightbox].src}
              alt={gallery[lightbox].alt}
              className="max-h-[80vh] w-auto mx-auto object-contain shadow-2xl"
            />
            <figcaption className="mt-5 text-center text-white/70 text-[11px] uppercase tracking-[0.3em] font-mono">
              [ {String(lightbox + 1).padStart(2, "0")} / {String(gallery.length).padStart(2, "0")} ] · {gallery[lightbox].alt}
            </figcaption>
          </figure>
        </div>
      )}
    </div>
  );
}

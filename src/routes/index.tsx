import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Play } from "lucide-react";
import heritageWood from "@/assets/heritage-wood.jpg";
import heritageAerial from "@/assets/heritage-aerial.jpg";
import expSuite from "@/assets/exp-suite.jpg";
import expGolf from "@/assets/exp-golf.jpg";
import expSpa from "@/assets/exp-spa.jpg";
import { useT } from "@/lib/i18n";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { VideoModal } from "@/components/video-modal";

const HOME_HERO_VIDEO = "https://golf-madagascar.mg/wp-content/uploads/2025/02/GOLF-DU-ROVA-SPOT_Final_.mp4";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { t } = useT();
  const [videoOpen, setVideoOpen] = useState(false);
  return (
    <div className="min-h-screen bg-background font-body text-foreground selection:bg-primary/10 selection:text-primary">
      <SiteHeader active="hotel" />

      {/* Hero */}
      <section className="group/hero relative h-screen flex flex-col justify-end pb-44 md:pb-40">
        <div className="absolute inset-0 z-0">
          <video
            src={HOME_HERO_VIDEO}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/20 to-background" />
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
          className="relative z-10 px-6 md:px-12 max-w-6xl"
          style={{ animation: "var(--animate-fade-up)" }}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/80 block mb-6">
            {t("home.kicker")}
          </span>
          <h1 className="font-display text-white text-5xl md:text-7xl lg:text-8xl text-balance leading-[0.95] tracking-tight mb-8">
            {t("home.title.1")} <br />
            <span className="italic text-accent">{t("home.title.2")}</span>
          </h1>
        </div>

        {/* Booking widget */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-5xl px-6"
          style={{ animation: "var(--animate-fade-up-delay)" }}
        >
          <div className="bg-background/95 backdrop-blur shadow-2xl ring-1 ring-black/5 p-1 flex flex-col md:flex-row items-stretch">
            <div className="flex-1 flex border-b md:border-b-0 md:border-r border-border">
              <div className="flex-1 p-5 border-r border-border hover:bg-stone-soft transition-colors cursor-pointer">
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">{t("home.checkin")}</p>
                <p className="font-display text-lg">{t("home.date.in")}</p>
              </div>
              <div className="flex-1 p-5 hover:bg-stone-soft transition-colors cursor-pointer">
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">{t("home.checkout")}</p>
                <p className="font-display text-lg">{t("home.date.out")}</p>
              </div>
            </div>
            <div className="flex-1 flex">
              <div className="flex-1 p-5 border-r border-border hover:bg-stone-soft transition-colors cursor-pointer">
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">{t("home.guests")}</p>
                <p className="font-display text-lg">{t("home.adults")}</p>
              </div>
              <button className="flex-1 bg-accent text-accent-foreground uppercase tracking-[0.2em] text-[11px] font-bold hover:bg-primary hover:text-primary-foreground transition-all duration-500 px-6 py-5">
                {t("home.check.availability")}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Storytelling */}
      <section id="hotel" className="py-28 md:py-32 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5">
            <span className="font-mono text-[11px] text-accent uppercase tracking-[0.3em] block mb-6">
              {t("home.story.kicker")}
            </span>
            <h2 className="font-display text-4xl md:text-5xl leading-tight mb-8 text-balance">
              {t("home.story.title.1")} <br />
              <span className="italic font-normal">{t("home.story.title.2")}</span>
            </h2>
            <p className="text-muted-foreground text-pretty leading-relaxed mb-6 max-w-[48ch]">
              {t("home.story.p1")}
            </p>
            <p className="text-muted-foreground text-pretty leading-relaxed mb-10 max-w-[48ch]">
              {t("home.story.p2")}
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] font-semibold border-b border-primary pb-2 hover:text-primary transition-colors"
            >
              {t("home.story.cta")}
              <span aria-hidden>→</span>
            </a>
          </div>
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              <div className="pt-12">
                <img
                  src={heritageWood}
                  alt="Détail du club-house en bois noble"
                  width={800}
                  height={1056}
                  loading="lazy"
                  className="aspect-[3/4] object-cover w-full shadow-sm"
                />
              </div>
              <div>
                <img
                  src={heritageAerial}
                  alt="Vue aérienne des hauts plateaux malgaches"
                  width={800}
                  height={1056}
                  loading="lazy"
                  className="aspect-[3/4] object-cover w-full shadow-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experiences */}
      <section id="experiences" className="bg-stone-soft py-28 md:py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-14">
            <h2 className="font-display text-4xl md:text-5xl">{t("home.exp.title")}</h2>
            <span className="font-mono text-[11px] text-muted-foreground uppercase mb-2">
              [ 01 / 05 ]
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
            {[
              { img: expSuite, label: t("home.exp.suite.label"), title: t("home.exp.suite.title"), alt: "Suite luxueuse avec vue sur le green" },
              { img: expGolf, label: t("home.exp.golf.label"), title: t("home.exp.golf.title"), alt: "Trou de golf au coucher du soleil" },
              { img: expSpa, label: t("home.exp.spa.label"), title: t("home.exp.spa.title"), alt: "Spa minimaliste avec bassin" },
            ].map((card) => (
              <article
                key={card.title}
                className="group relative overflow-hidden aspect-[4/5] cursor-pointer"
              >
                <img
                  src={card.img}
                  alt={card.alt}
                  width={832}
                  height={1024}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/10 to-transparent opacity-70 group-hover:opacity-95 transition-opacity duration-500" />
                <div className="absolute bottom-8 left-8 right-8 text-primary-foreground translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="font-mono text-[9px] uppercase tracking-[0.25em] mb-2 text-accent">
                    {card.label}
                  </p>
                  <h3 className="font-display text-2xl md:text-3xl">{card.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Golf signature band */}
      <section id="golf" className="py-28 md:py-32 px-6 md:px-12 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="font-mono text-[11px] text-accent uppercase tracking-[0.3em] block mb-6">
            {t("home.golf.kicker")}
          </span>
          <h2 className="font-display text-4xl md:text-5xl leading-tight mb-8 text-balance">
            {t("home.golf.title.1")} <span className="italic">{t("home.golf.title.2")}</span> {t("home.golf.title.3")}
          </h2>
          <p className="text-muted-foreground leading-relaxed text-lg max-w-[55ch] mx-auto">
            {t("home.golf.p")}
          </p>
          <div className="mt-12 grid grid-cols-3 max-w-2xl mx-auto border-y border-border divide-x divide-border">
            {[
              { k: "1930", v: t("home.stat.1") },
              { k: "18", v: t("home.stat.2") },
              { k: "5★", v: t("home.stat.3") },
            ].map((s) => (
              <div key={s.k} className="py-8">
                <p className="font-display text-3xl md:text-4xl text-primary">{s.k}</p>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-2">
                  {s.v}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
      <VideoModal src={HOME_HERO_VIDEO} open={videoOpen} onClose={() => setVideoOpen(false)} />
    </div>
  );
}

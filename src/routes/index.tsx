import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ExternalLink, Play } from "lucide-react";
import clubhousePhotoAsset from "@/assets/real-clubhouse.png.asset.json";
import flagPhotoAsset from "@/assets/real-flag.png.asset.json";
import expSuite from "@/assets/home-suite-premium.png.asset.json";
import expGolf from "@/assets/home-golf-historique.png.asset.json";
import expSpa from "@/assets/home-sanctuaire.png.asset.json";
import { useT } from "@/lib/i18n";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { VideoModal } from "@/components/video-modal";
import { BOOKING_URL } from "@/lib/booking";

const HOME_HERO_VIDEO = "https://golf-madagascar.mg/wp-content/uploads/2025/02/GOLF-DU-ROVA-SPOT_Final_.mp4";
const GOOGLE_REVIEWS_URL = "https://www.google.com/travel/hotels/entity/CgoIoeGIqsKsu8JNEAE/reviews?q=golf%20du%20rova%20luxury%20hotel&hl=fr-MG&gl=mg";

const REVIEWS = [
  { author: "Zahirah", locationKey: "home.review.location.mauritius", quoteKey: "home.review.1" },
  { author: "Julia", locationKey: "home.review.location.madagascar", quoteKey: "home.review.2" },
  { author: "Philippe", locationKey: "home.review.location.poland", quoteKey: "home.review.3" },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Golf du Rova — Hôtel 5 étoiles à Madagascar" },
      { name: "description", content: "Luxe, authenticité : découvrez Madagascar sous un nouveau jour au Golf du Rova, hôtel 5 étoiles et parcours 18 trous." },
      { property: "og:title", content: "Golf du Rova — Hôtel 5 étoiles à Madagascar" },
      { property: "og:description", content: "Là où l’élégance rencontre l’histoire, au cœur des hauts plateaux malgaches." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const { t, lang } = useT();
  const [videoOpen, setVideoOpen] = useState(false);
  const fmt = new Intl.DateTimeFormat(lang === "fr" ? "fr-FR" : "en-GB", { day: "numeric", month: "long", year: "numeric" });
  const checkIn = new Date();
  checkIn.setDate(checkIn.getDate() + 2);
  const checkOut = new Date(checkIn);
  checkOut.setDate(checkOut.getDate() + 6);
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
          <h1 className="font-display text-white text-4xl md:text-6xl lg:text-7xl text-balance leading-[1] tracking-tight mb-8 max-w-5xl">
            {t("home.title.1")}
          </h1>
        </div>

        {/* Booking widget */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-5xl px-6"
          style={{ animation: "var(--animate-fade-up-delay)" }}
        >
          <div className="bg-background/95 backdrop-blur shadow-2xl ring-1 ring-black/5 p-1 flex flex-col md:flex-row items-stretch">
            <a href={BOOKING_URL} target="_blank" rel="noreferrer" className="flex-1 flex border-b md:border-b-0 md:border-r border-border">
              <div className="flex-1 p-5 border-r border-border hover:bg-stone-soft transition-colors cursor-pointer">
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">{t("home.checkin")}</p>
                <p className="font-display text-lg">{fmt.format(checkIn)}</p>
              </div>
              <div className="flex-1 p-5 hover:bg-stone-soft transition-colors cursor-pointer">
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">{t("home.checkout")}</p>
                <p className="font-display text-lg">{fmt.format(checkOut)}</p>
              </div>
            </a>
            <div className="flex-1 flex">
              <a href={BOOKING_URL} target="_blank" rel="noreferrer" className="flex-1 p-5 border-r border-border hover:bg-stone-soft transition-colors cursor-pointer">
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">{t("home.guests")}</p>
                <p className="font-display text-lg">{t("home.adults")}</p>
              </a>
              <a href={BOOKING_URL} target="_blank" rel="noreferrer" className="flex flex-1 items-center justify-center bg-accent text-accent-foreground uppercase tracking-[0.2em] text-[11px] font-bold hover:bg-primary hover:text-primary-foreground transition-all duration-500 px-6 py-5 text-center">
                {t("home.check.availability")}
              </a>
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
            <Link
              to="/evenements"
              className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] font-semibold border-b border-primary pb-2 hover:text-primary transition-colors"
            >
              {t("home.story.cta")}
              <span aria-hidden>→</span>
            </Link>
          </div>
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              <div className="pt-12">
                <img
                  src={clubhousePhotoAsset.url}
                  alt="Le Clubhouse du Golf du Rova face au green"
                  width={800}
                  height={1056}
                  loading="lazy"
                  className="aspect-[3/4] object-cover w-full shadow-sm"
                />
              </div>
              <div>
                <img
                  src={flagPhotoAsset.url}
                  alt="Drapeau du Golf du Rova au coucher du soleil"
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
              { img: expSuite.url, label: t("home.exp.suite.label"), title: t("home.exp.suite.title"), alt: t("home.exp.suite.alt"), to: "/chambres" as const },
              { img: expGolf.url, label: t("home.exp.golf.label"), title: t("home.exp.golf.title"), alt: t("home.exp.golf.alt"), to: "/golf" as const },
              { img: expSpa.url, label: t("home.exp.spa.label"), title: t("home.exp.spa.title"), alt: t("home.exp.spa.alt"), to: "/evenements" as const },
            ].map((card) => (
              <Link
                to={card.to}
                key={card.title}
                className="group relative block overflow-hidden aspect-[4/5] cursor-pointer focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-4"
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
              </Link>
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

      <section className="bg-stone-soft py-24 md:py-32 px-6 md:px-12" aria-labelledby="guest-reviews-title">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14">
            <div>
              <span className="font-mono text-[11px] text-accent uppercase tracking-[0.3em] block mb-5">
                {t("home.reviews.kicker")}
              </span>
              <h2 id="guest-reviews-title" className="font-display text-4xl md:text-5xl leading-tight">
                {t("home.reviews.title.1")} <span className="italic">{t("home.reviews.title.2")}</span>
              </h2>
            </div>
            <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 self-start md:self-auto text-[11px] uppercase tracking-[0.2em] font-semibold border-b border-primary pb-2 hover:text-primary transition-colors">
              {t("home.reviews.google")}<ExternalLink className="size-4" aria-hidden="true" />
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 border-y border-border md:divide-x md:divide-border">
            {REVIEWS.map((review) => (
              <figure key={review.author} className="py-10 md:px-8 first:pl-0 last:pr-0 border-b last:border-b-0 md:border-b-0 border-border">
                <blockquote className="font-display text-xl leading-relaxed mb-8">“{t(review.quoteKey)}”</blockquote>
                <figcaption>
                  <span className="block text-sm font-semibold">{review.author}</span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">{t(review.locationKey)} · {t("home.reviews.source")}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
      <VideoModal src={HOME_HERO_VIDEO} open={videoOpen} onClose={() => setVideoOpen(false)} />
    </div>
  );
}

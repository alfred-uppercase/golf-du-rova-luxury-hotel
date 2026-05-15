import { createFileRoute, Link } from "@tanstack/react-router";
import heroGolf from "@/assets/hero-golf.jpg";
import heritageWood from "@/assets/heritage-wood.jpg";
import heritageAerial from "@/assets/heritage-aerial.jpg";
import expSuite from "@/assets/exp-suite.jpg";
import expGolf from "@/assets/exp-golf.jpg";
import expSpa from "@/assets/exp-spa.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background font-body text-foreground selection:bg-primary/10 selection:text-primary">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-6 md:px-10 py-5 flex justify-between items-center bg-background/85 backdrop-blur-md border-b border-border">
        <div className="flex items-center gap-10">
          <div className="flex flex-col leading-none">
            <span className="font-display text-2xl tracking-tight text-primary font-semibold italic">
              Golf du Rova
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] mt-1 text-muted-foreground">
              Madagascar · Est. 1930
            </span>
          </div>
          <div className="hidden lg:flex gap-8 text-[11px] uppercase tracking-[0.18em] font-medium text-foreground/80">
            <a href="#hotel" className="hover:text-primary transition-colors">L'Hôtel</a>
            <a href="#golf" className="hover:text-primary transition-colors">Golf 18 Trous</a>
            <a href="#experiences" className="hover:text-primary transition-colors">Expériences</a>
            <Link to="/restaurants" className="hover:text-primary transition-colors">Restaurants</Link>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <span className="hidden sm:inline text-[10px] uppercase tracking-[0.25em] font-mono text-muted-foreground">
            FR / EN
          </span>
          <button className="bg-primary text-primary-foreground px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] font-medium hover:bg-primary/90 transition-all">
            Réserver
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative h-screen flex flex-col justify-end pb-44 md:pb-40">
        <div className="absolute inset-0 z-0">
          <img
            src={heroGolf}
            alt="Lever de soleil sur le parcours du Golf du Rova"
            width={1920}
            height={1088}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-background" />
        </div>

        <div
          className="relative z-10 px-6 md:px-12 max-w-6xl"
          style={{ animation: "var(--animate-fade-up)" }}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/80 block mb-6">
            Hôtel 5 étoiles · Antananarivo
          </span>
          <h1 className="font-display text-white text-5xl md:text-7xl lg:text-8xl text-balance leading-[0.95] tracking-tight mb-8">
            La quiétude d'un <br />
            <span className="italic text-accent">patrimoine vivant.</span>
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
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">Arrivée</p>
                <p className="font-display text-lg">12 Juin 2026</p>
              </div>
              <div className="flex-1 p-5 hover:bg-stone-soft transition-colors cursor-pointer">
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">Départ</p>
                <p className="font-display text-lg">18 Juin 2026</p>
              </div>
            </div>
            <div className="flex-1 flex">
              <div className="flex-1 p-5 border-r border-border hover:bg-stone-soft transition-colors cursor-pointer">
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">Hôtes</p>
                <p className="font-display text-lg">2 Adultes</p>
              </div>
              <button className="flex-1 bg-accent text-accent-foreground uppercase tracking-[0.2em] text-[11px] font-bold hover:bg-primary hover:text-primary-foreground transition-all duration-500 px-6 py-5">
                Vérifier la disponibilité
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
              Histoire & Élégance
            </span>
            <h2 className="font-display text-4xl md:text-5xl leading-tight mb-8 text-balance">
              Là où l'histoire <br />
              <span className="italic font-normal">sculpte le paysage.</span>
            </h2>
            <p className="text-muted-foreground text-pretty leading-relaxed mb-6 max-w-[48ch]">
              Fondé en 1930, le Golf du Rova allie l'exception d'un hôtel 5 étoiles de luxe à
              un site historique unique, offrant une expérience de golf incomparable sur le
              premier et seul véritable parcours de 18 trous à Madagascar.
            </p>
            <p className="text-muted-foreground text-pretty leading-relaxed mb-10 max-w-[48ch]">
              Entre bois précieux, lin froissé et lumière des hauts plateaux, vivez une
              expérience intemporelle, à la croisée du raffinement et de l'âme malgache.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] font-semibold border-b border-primary pb-2 hover:text-primary transition-colors"
            >
              Découvrir notre héritage
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
            <h2 className="font-display text-4xl md:text-5xl">L'Art de Recevoir</h2>
            <span className="font-mono text-[11px] text-muted-foreground uppercase mb-2">
              [ 01 / 05 ]
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
            {[
              { img: expSuite, label: "Hébergement", title: "Suites Impériales", alt: "Suite luxueuse avec vue sur le green" },
              { img: expGolf, label: "Performance", title: "Le 18 Trous Historique", alt: "Trou de golf au coucher du soleil" },
              { img: expSpa, label: "Bien-être", title: "Sanctuaire du Rova", alt: "Spa minimaliste avec bassin" },
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
            Parcours Signature
          </span>
          <h2 className="font-display text-4xl md:text-5xl leading-tight mb-8 text-balance">
            Le seul <span className="italic">18 trous</span> de Madagascar.
          </h2>
          <p className="text-muted-foreground leading-relaxed text-lg max-w-[55ch] mx-auto">
            Un tracé centenaire, dessiné dans la générosité des hauts plateaux. Chaque trou
            est un dialogue entre le geste, la lumière et la terre rouge.
          </p>
          <div className="mt-12 grid grid-cols-3 max-w-2xl mx-auto border-y border-border divide-x divide-border">
            {[
              { k: "1930", v: "Année de fondation" },
              { k: "18", v: "Trous d'exception" },
              { k: "5★", v: "Hôtel de luxe" },
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

      {/* Footer */}
      <footer id="restaurants" className="bg-primary text-primary-foreground pt-24 pb-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
          <div className="lg:col-span-5">
            <h4 className="font-display text-3xl md:text-4xl mb-6 italic">Restez informé</h4>
            <p className="text-primary-foreground/60 mb-8 max-w-sm text-sm leading-relaxed">
              Recevez nos invitations exclusives et les actualités du Domaine du Rova
              directement dans votre boîte mail.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex border-b border-primary-foreground/20 pb-2"
            >
              <input
                type="email"
                placeholder="VOTRE EMAIL"
                className="bg-transparent flex-1 text-[11px] tracking-[0.2em] outline-none placeholder:text-primary-foreground/30"
              />
              <button
                type="submit"
                className="text-[11px] font-bold tracking-[0.2em] hover:text-accent transition-colors"
              >
                S'INSCRIRE
              </button>
            </form>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-10 text-[11px] uppercase tracking-[0.2em]">
            <div className="space-y-4">
              <h5 className="text-accent font-bold mb-6">Exploration</h5>
              <a href="#hotel" className="block opacity-60 hover:opacity-100 transition-opacity">L'Hôtel</a>
              <a href="#golf" className="block opacity-60 hover:opacity-100 transition-opacity">Le Golf</a>
              <a href="#experiences" className="block opacity-60 hover:opacity-100 transition-opacity">Expériences</a>
            </div>
            <div className="space-y-4">
              <h5 className="text-accent font-bold mb-6">Services</h5>
              <a href="#" className="block opacity-60 hover:opacity-100 transition-opacity">Hélicoptère</a>
              <a href="#" className="block opacity-60 hover:opacity-100 transition-opacity">Événements</a>
              <a href="#" className="block opacity-60 hover:opacity-100 transition-opacity">Conciergerie</a>
            </div>
            <div className="space-y-4">
              <h5 className="text-accent font-bold mb-6">Contact</h5>
              <span className="block opacity-60 italic normal-case tracking-normal">
                Andakana — PK 20, Route de Mahajanga, Antananarivo
              </span>
              <span className="block opacity-60">+261 34 20 22 011 90</span>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col">
            <span className="font-display text-lg italic">Golf du Rova</span>
            <span className="text-[9px] opacity-40 uppercase tracking-[0.25em] mt-1">
              © 2026 Héritage Malgache — Tous droits réservés
            </span>
          </div>
          <div className="flex gap-8 opacity-50 text-[10px] tracking-[0.2em]">
            <a href="#" className="hover:opacity-100 transition-opacity">MENTIONS LÉGALES</a>
            <a href="#" className="hover:opacity-100 transition-opacity">CONFIDENTIALITÉ</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

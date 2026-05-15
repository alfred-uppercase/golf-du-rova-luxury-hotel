import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import restoRova from "@/assets/resto-rova.jpg";
import restoAsian from "@/assets/resto-asian.jpg";
import restoView from "@/assets/resto-view.jpg";
import chefZervas from "@/assets/chef-zervas.jpg";

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
  name: string;
  category: string;
  paragraphs: string[];
  img: string;
  alt: string;
  index: string;
};

const restaurants: Resto[] = [
  {
    id: "rova",
    index: "01",
    name: "La Table du Rova",
    category: "Gastronomique Fusion",
    img: restoRova,
    alt: "Salle gastronomique de La Table du Rova",
    paragraphs: [
      "À La Table du Rova, l'excellence gastronomique prend vie à travers une fusion harmonieuse de la richesse des saveurs malgaches et du raffinement de la cuisine européenne. Chaque création met en valeur les produits locaux d'exception, sublimés par des techniques modernes et des influences européennes revisitées avec une touche d'audace et de sophistication.",
      "Nos chefs, véritables artistes de la cuisine, vous invitent à découvrir un menu où tradition et innovation se rencontrent dans une symphonie de goûts uniques, offrant une expérience culinaire d'exception qui éveille les sens et enchante le palais.",
      "Laissez-vous séduire par un voyage gastronomique d'exception, où chaque plat devient un souvenir mémorable et chaque bouchée une célébration du luxe et du raffinement.",
    ],
  },
  {
    id: "asian",
    index: "02",
    name: "Asian Gourmet",
    category: "L'excellence de la cuisine asiatique",
    img: restoAsian,
    alt: "Plateau de sushis et teppanyaki à l'Asian Gourmet",
    paragraphs: [
      "Sous la direction du Chef Gerlie, talentueux artisan des saveurs, Asian Gourmet vous invite à découvrir une cuisine asiatique raffinée, où chaque plat est une véritable œuvre d'art.",
      "Parfaite harmonie entre les épices subtiles, les textures délicates et la qualité exceptionnelle des ingrédients sélectionnés avec soin, chaque bouchée est un voyage sensoriel.",
      "Laissez-vous envoûter par des créations minutieusement élaborées, des sushis exquis aux teppanyakis savamment exécutés, et explorez des saveurs authentiques venues de Thaïlande, du Japon, de Chine, de Singapour et de Malaisie.",
    ],
  },
  {
    id: "view",
    index: "03",
    name: "The View Bar Lounge",
    category: "Snack Bar",
    img: restoView,
    alt: "Terrasse panoramique du View Bar Lounge au coucher du soleil",
    paragraphs: [
      "Offrez-vous une parenthèse de sérénité au The View Bar Lounge, notre lieu d'exception où la beauté du paysage rural malgache se mêle à une ambiance raffinée. Avec sa vue panoramique imprenable, ce bar-lounge est l'endroit idéal pour savourer un moment de détente, que ce soit autour d'un verre ou d'une pause gourmande.",
      "Notre sélection de snacks sophistiqués et de boissons exquises, servie dans un cadre chic et apaisant, vous permettra de vous relaxer en toute élégance. Que vous souhaitiez vous adonner à une petite gourmandise légère ou simplement profiter de l'horizon, The View Bar Lounge est l'adresse parfaite pour un instant de calme, de plaisir et de contemplation.",
    ],
  },
];

function RestaurantsPage() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background font-body text-foreground selection:bg-primary/10 selection:text-primary">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-6 md:px-10 py-5 flex justify-between items-center bg-background/85 backdrop-blur-md border-b border-border">
        <div className="flex items-center gap-10">
          <Link to="/" className="flex flex-col leading-none">
            <span className="font-display text-2xl tracking-tight text-primary font-semibold italic">
              Golf du Rova
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] mt-1 text-muted-foreground">
              Madagascar · Est. 1930
            </span>
          </Link>
          <div className="hidden lg:flex gap-8 text-[11px] uppercase tracking-[0.18em] font-medium text-foreground/80">
            <Link to="/" className="hover:text-primary transition-colors">L'Hôtel</Link>
            <Link to="/" hash="golf" className="hover:text-primary transition-colors">Golf 18 Trous</Link>
            <Link to="/" hash="experiences" className="hover:text-primary transition-colors">Expériences</Link>
            <Link to="/restaurants" className="text-primary">Restaurants</Link>
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
      <section className="relative pt-40 pb-20 md:pt-52 md:pb-28 px-6 md:px-12 border-b border-border">
        <div className="max-w-6xl mx-auto" style={{ animation: "var(--animate-fade-up)" }}>
          <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-accent block mb-6">
            Tables & Lounges · Trois adresses
          </span>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight text-balance mb-10">
            Restaurants <br />
            <span className="italic text-primary">du Rova.</span>
          </h1>
          <div className="grid md:grid-cols-2 gap-10 max-w-5xl">
            <p className="text-muted-foreground text-pretty leading-relaxed text-lg">
              Le Golf du Rova Luxury Hotel vous invite à un voyage culinaire unique à travers
              ses trois restaurants, chacun offrant une expérience gastronomique raffinée et
              mémorable.
            </p>
            <p className="text-muted-foreground text-pretty leading-relaxed">
              Que vous recherchiez les arômes envoûtants de l'Asian Gourmet, les créations
              fusion de La Table du Rova, ou un instant de détente au The View Bar Lounge,
              chaque moment passé sera un plaisir pour vos sens — accueilli avec une qualité
              irréprochable et un service d'exception.
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
                {r.category}
              </span>
              <h2 className="font-display text-4xl md:text-5xl leading-tight mb-8 text-balance">
                {r.name}
              </h2>
              <div className="space-y-5 mb-10">
                {r.paragraphs.map((p, idx) => (
                  <p
                    key={idx}
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
                  Découvrez notre carte
                  <span aria-hidden>→</span>
                </button>
                <button className="bg-primary text-primary-foreground px-7 py-3.5 text-[11px] uppercase tracking-[0.25em] font-medium hover:bg-accent hover:text-accent-foreground transition-all">
                  Réserver une table
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
              Les Mains de l'Excellence
            </span>
            <h2 className="font-display text-4xl md:text-5xl leading-tight text-balance">
              Rencontrez <span className="italic">nos chefs.</span>
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
                  Chef Exécutif
                </span>
              </div>
              <div className="space-y-5 text-muted-foreground leading-relaxed text-pretty max-w-[60ch]">
                <p>
                  Dimitrios Zervas est un chef malgacho-grec, reconnu pour sa cuisine fusion
                  mêlant les saveurs méditerranéennes et les influences locales de Madagascar.
                  Il a grandi dans un environnement où la cuisine était au cœur de la culture
                  familiale, développant très tôt sa passion pour la gastronomie.
                </p>
                <p>
                  Après avoir perfectionné ses compétences dans des écoles culinaires
                  prestigieuses, il s'installe à Madagascar, où il s'inspire des produits
                  locaux et des traditions culinaires malgaches. Chef Zervas est connu pour sa
                  capacité à allier la richesse des saveurs méditerranéennes avec les
                  ingrédients uniques de Madagascar.
                </p>
                <p>
                  Il valorise particulièrement les produits frais et de saison, en mettant
                  l'accent sur la durabilité et la préservation des ressources locales. En
                  plus de ses talents culinaires, il est également un mentor engagé, formant
                  de jeunes chefs et partageant son expertise avec la nouvelle génération de
                  la gastronomie malgache.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 px-6 md:px-12 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-3xl md:text-5xl leading-tight mb-8 text-balance">
            Réservez votre <span className="italic">table d'exception.</span>
          </h2>
          <p className="text-muted-foreground mb-10 leading-relaxed">
            Notre conciergerie se tient à votre disposition pour orchestrer chaque détail de
            votre expérience culinaire au Domaine du Rova.
          </p>
          <button className="bg-primary text-primary-foreground px-10 py-4 text-[11px] uppercase tracking-[0.25em] font-medium hover:bg-accent hover:text-accent-foreground transition-all">
            Réserver une table
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
            ← Retour à l'accueil
          </Link>
        </div>
        <p className="text-[9px] opacity-40 uppercase tracking-[0.25em] mt-8 text-center md:text-left">
          © 2026 Golf du Rova — Héritage Malgache
        </p>
      </footer>

      {/* Menu modal */}
      {openMenu && (
        <div
          className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={() => setOpenMenu(null)}
        >
          <div
            className="bg-background max-w-lg w-full p-10 md:p-12 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent block mb-4">
              {restaurants.find((r) => r.id === openMenu)?.category}
            </span>
            <h3 className="font-display text-3xl md:text-4xl mb-6">
              {restaurants.find((r) => r.id === openMenu)?.name}
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-8">
              La carte complète sera bientôt disponible en téléchargement. Notre équipe se
              tient à votre disposition pour vous renseigner sur nos suggestions et menus du
              moment.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-primary text-primary-foreground px-6 py-3 text-[11px] uppercase tracking-[0.25em] font-medium hover:bg-accent hover:text-accent-foreground transition-all">
                Réserver une table
              </button>
              <button
                onClick={() => setOpenMenu(null)}
                className="text-[11px] uppercase tracking-[0.25em] font-semibold border-b border-foreground pb-2 hover:text-primary transition-colors"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

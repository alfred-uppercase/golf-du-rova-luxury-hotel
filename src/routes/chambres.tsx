import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import roomDeluxe from "@/assets/room-deluxe.jpg";
import roomSuite from "@/assets/room-suite.jpg";
import roomSignature from "@/assets/room-signature.jpg";
import roomVilla from "@/assets/room-villa.jpg";
import roomDetail from "@/assets/room-detail.jpg";

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
    ],
  }),
  component: ChambresPage,
});

type Room = {
  id: string;
  index: string;
  name: string;
  category: string;
  surface: string;
  capacity: string;
  view: string;
  img: string;
  alt: string;
  description: string;
  amenities: string[];
};

const rooms: Room[] = [
  {
    id: "deluxe",
    index: "01",
    name: "Chambre Deluxe Heritage",
    category: "Chambre · 42 m²",
    surface: "42 m²",
    capacity: "2 adultes",
    view: "Jardin colonial",
    img: roomDeluxe,
    alt: "Chambre Deluxe Heritage avec lit à baldaquin en acajou",
    description:
      "Pensée comme un cocon d'élégance feutrée, la chambre Deluxe Heritage célèbre l'art de vivre malgacho-colonial. Lit à baldaquin en acajou massif, textiles tissés à la main et terrasse privative ouverte sur les jardins centenaires du domaine.",
    amenities: ["King bed", "Salle de bain en marbre", "Terrasse privée", "Minibar"],
  },
  {
    id: "suite",
    index: "02",
    name: "Suite Exécutive Rova",
    category: "Suite · 68 m²",
    surface: "68 m²",
    capacity: "2 adultes + 1 enfant",
    view: "Hauts plateaux",
    img: roomSuite,
    alt: "Suite Exécutive avec cheminée et vue panoramique sur les hauts plateaux",
    description:
      "Un salon distinct, une cheminée à foyer ouvert et une baie vitrée toute hauteur ouverte sur le couchant. La Suite Exécutive offre une expérience résidentielle, idéale pour les longs séjours et les soirées contemplatives.",
    amenities: ["Salon séparé", "Cheminée", "Baie panoramique", "Butler service"],
  },
  {
    id: "signature",
    index: "03",
    name: "Suite Signature Fairway",
    category: "Suite · 92 m²",
    surface: "92 m²",
    capacity: "2 adultes",
    view: "Parcours 18 trous",
    img: roomSignature,
    alt: "Suite Signature ouverte sur le parcours de golf 18 trous",
    description:
      "Notre suite la plus demandée. Vastes volumes, mobilier d'antiquaire, balcon en bois exotique surplombant le parcours signature 18 trous. Le réveil s'y fait au son des oiseaux endémiques et des premiers swings de la matinée.",
    amenities: ["Balcon golf", "Dressing", "Bain en îlot", "Petit-déjeuner privé"],
  },
  {
    id: "villa",
    index: "04",
    name: "Villa Privée Rovaheli",
    category: "Villa · 180 m²",
    surface: "180 m²",
    capacity: "Jusqu'à 4 adultes",
    view: "Vallée & piscine",
    img: roomVilla,
    alt: "Villa privée avec piscine à débordement face à la vallée",
    description:
      "Un refuge d'exception en lisière du domaine : deux chambres, salon-cheminée, piscine à débordement, terrasse-deck et accès héliport dédié. La Villa Rovaheli incarne la promesse d'une intimité absolue, orchestrée par un majordome attitré.",
    amenities: ["Piscine privée", "2 chambres", "Héliport", "Majordome 24h"],
  },
];

function ChambresPage() {
  const [openInfo, setOpenInfo] = useState<string | null>(null);

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
            <Link to="/chambres" className="text-primary">Chambres</Link>
            <Link to="/restaurants" className="hover:text-primary transition-colors">Restaurants</Link>
            <Link to="/" hash="golf" className="hover:text-primary transition-colors">Golf 18 Trous</Link>
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
            Hébergement · 4 catégories d'exception
          </span>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight text-balance mb-10">
            Chambres <br />
            <span className="italic text-primary">& Suites.</span>
          </h1>
          <div className="grid md:grid-cols-2 gap-10 max-w-5xl">
            <p className="text-muted-foreground text-pretty leading-relaxed text-lg">
              Chaque chambre du Golf du Rova est conçue comme une page d'un récit centenaire,
              où le bois précieux des hauts plateaux dialogue avec la lumière douce de
              Madagascar.
            </p>
            <p className="text-muted-foreground text-pretty leading-relaxed">
              De la chambre Deluxe Heritage à la Villa Privée Rovaheli, nos 38 hébergements
              partagent un même art de l'hospitalité : matériaux nobles, literie de maison
              européenne et un service attentif, presque invisible.
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
              <p className="text-muted-foreground leading-relaxed text-pretty max-w-[52ch] mb-8">
                {r.description}
              </p>

              {/* Specs */}
              <dl className="grid grid-cols-3 gap-6 mb-10 border-y border-border py-6">
                <div>
                  <dt className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground mb-1">
                    Surface
                  </dt>
                  <dd className="font-display text-lg">{r.surface}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground mb-1">
                    Capacité
                  </dt>
                  <dd className="font-display text-lg">{r.capacity}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground mb-1">
                    Vue
                  </dt>
                  <dd className="font-display text-lg">{r.view}</dd>
                </div>
              </dl>

              <ul className="flex flex-wrap gap-x-5 gap-y-2 mb-10">
                {r.amenities.map((a) => (
                  <li
                    key={a}
                    className="text-[11px] uppercase tracking-[0.18em] text-foreground/70 before:content-['—'] before:mr-2 before:text-accent"
                  >
                    {a}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                <button
                  onClick={() => setOpenInfo(r.id)}
                  className="text-[11px] uppercase tracking-[0.25em] font-semibold border-b border-primary pb-2 hover:text-primary transition-colors inline-flex items-center gap-2"
                >
                  Détails & équipements
                  <span aria-hidden>→</span>
                </button>
                <button className="bg-primary text-primary-foreground px-7 py-3.5 text-[11px] uppercase tracking-[0.25em] font-medium hover:bg-accent hover:text-accent-foreground transition-all">
                  Réserver cette chambre
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* L'art du détail */}
      <section className="bg-stone-soft py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <span className="font-mono text-[11px] text-accent uppercase tracking-[0.3em] block mb-6">
              L'Art du Détail
            </span>
            <h2 className="font-display text-4xl md:text-5xl leading-tight text-balance mb-8">
              Une attention <span className="italic">à chaque geste.</span>
            </h2>
            <div className="space-y-5 text-muted-foreground leading-relaxed text-pretty max-w-[55ch]">
              <p>
                Marbre de Carrare, robinetterie en laiton brossé, draps en lin lavé tissés à
                Antananarivo : chaque matériau est choisi pour sa noblesse et sa capacité à
                bien vieillir, à raconter le temps qui passe.
              </p>
              <p>
                Notre majordomerie veille discrètement à chaque détail — du réveil parfumé au
                turn-down service du soir — pour que votre séjour relève moins de l'hôtellerie
                que de la résidence privée.
              </p>
            </div>
            <ul className="grid grid-cols-2 gap-4 mt-10 text-[11px] uppercase tracking-[0.2em] text-foreground/80">
              <li>— Linge de maison européen</li>
              <li>— Produits de bain signature</li>
              <li>— Climatisation silencieuse</li>
              <li>— Wi-Fi très haut débit</li>
              <li>— Coffre-fort biométrique</li>
              <li>— Service d'étage 24h/24</li>
            </ul>
          </div>
          <div className="lg:col-span-7 order-1 lg:order-2">
            <img
              src={roomDetail}
              alt="Détail de salle de bain en marbre avec robinetterie en laiton"
              width={1280}
              height={1600}
              loading="lazy"
              className="w-full aspect-[4/5] object-cover shadow-sm"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 px-6 md:px-12 text-center">
        <div className="max-w-2xl mx-auto">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent block mb-6">
            Conciergerie privée
          </span>
          <h2 className="font-display text-3xl md:text-5xl leading-tight mb-8 text-balance">
            Composez votre <span className="italic">séjour sur-mesure.</span>
          </h2>
          <p className="text-muted-foreground mb-10 leading-relaxed">
            Notre équipe orchestre chaque détail — transferts hélicoptère, parcours de golf,
            soins spa et tables d'exception — pour vous offrir un séjour à votre image.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="bg-primary text-primary-foreground px-10 py-4 text-[11px] uppercase tracking-[0.25em] font-medium hover:bg-accent hover:text-accent-foreground transition-all">
              Vérifier la disponibilité
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

      {/* Info modal */}
      {openInfo && (
        <div
          className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={() => setOpenInfo(null)}
        >
          <div
            className="bg-background max-w-lg w-full p-10 md:p-12 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {(() => {
              const r = rooms.find((x) => x.id === openInfo)!;
              return (
                <>
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent block mb-4">
                    {r.category}
                  </span>
                  <h3 className="font-display text-3xl md:text-4xl mb-6">{r.name}</h3>
                  <ul className="grid grid-cols-2 gap-3 mb-8 text-[11px] uppercase tracking-[0.18em] text-foreground/80">
                    {r.amenities.map((a) => (
                      <li key={a} className="before:content-['—'] before:mr-2 before:text-accent">
                        {a}
                      </li>
                    ))}
                  </ul>
                  <p className="text-muted-foreground leading-relaxed mb-8 text-sm">
                    La fiche détaillée complète, plan de chambre et tarifs saisonniers vous
                    seront transmis par notre conciergerie sur simple demande.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button className="bg-primary text-primary-foreground px-6 py-3 text-[11px] uppercase tracking-[0.25em] font-medium hover:bg-accent hover:text-accent-foreground transition-all">
                      Réserver
                    </button>
                    <button
                      onClick={() => setOpenInfo(null)}
                      className="text-[11px] uppercase tracking-[0.25em] font-semibold border-b border-foreground pb-2 hover:text-primary transition-colors"
                    >
                      Fermer
                    </button>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}

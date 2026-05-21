import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "fr" | "en";

type Dict = Record<string, { fr: string; en: string }>;

const D: Dict = {
  // Nav
  "nav.hotel": { fr: "L'Hôtel", en: "The Hotel" },
  "nav.rooms": { fr: "Chambres", en: "Rooms" },
  "nav.restaurants": { fr: "Restaurants", en: "Restaurants" },
  "nav.golf": { fr: "Golf 18 Trous", en: "18-Hole Golf" },
  "nav.experiences": { fr: "Expériences", en: "Experiences" },
  "nav.book": { fr: "Réserver", en: "Book" },
  "nav.tagline": { fr: "Madagascar · Est. 1930", en: "Madagascar · Est. 1930" },

  // Home — Hero
  "home.kicker": { fr: "Hôtel 5 étoiles · Antananarivo", en: "5-star Hotel · Antananarivo" },
  "home.title.1": { fr: "La quiétude d'un", en: "The serenity of a" },
  "home.title.2": { fr: "patrimoine vivant.", en: "living heritage." },
  "home.checkin": { fr: "Arrivée", en: "Check-in" },
  "home.checkout": { fr: "Départ", en: "Check-out" },
  "home.guests": { fr: "Hôtes", en: "Guests" },
  "home.adults": { fr: "2 Adultes", en: "2 Adults" },
  "home.date.in": { fr: "12 Juin 2026", en: "June 12, 2026" },
  "home.date.out": { fr: "18 Juin 2026", en: "June 18, 2026" },
  "home.check.availability": { fr: "Vérifier la disponibilité", en: "Check availability" },

  // Home — Story
  "home.story.kicker": { fr: "Histoire & Élégance", en: "History & Elegance" },
  "home.story.title.1": { fr: "Là où l'histoire", en: "Where history" },
  "home.story.title.2": { fr: "sculpte le paysage.", en: "shapes the landscape." },
  "home.story.p1": {
    fr: "Fondé en 1930, le Golf du Rova allie l'exception d'un hôtel 5 étoiles de luxe à un site historique unique, offrant une expérience de golf incomparable sur le premier et seul véritable parcours de 18 trous à Madagascar.",
    en: "Founded in 1930, Golf du Rova combines the excellence of a 5-star luxury hotel with a unique historic estate, offering an incomparable golf experience on Madagascar's first and only true 18-hole course.",
  },
  "home.story.p2": {
    fr: "Entre bois précieux, lin froissé et lumière des hauts plateaux, vivez une expérience intemporelle, à la croisée du raffinement et de l'âme malgache.",
    en: "Between precious woods, crumpled linen and the highland light, live a timeless experience at the crossroads of refinement and the Malagasy soul.",
  },
  "home.story.cta": { fr: "Découvrir notre héritage", en: "Discover our heritage" },

  // Home — Experiences
  "home.exp.title": { fr: "L'Art de Recevoir", en: "The Art of Hospitality" },
  "home.exp.suite.label": { fr: "Hébergement", en: "Accommodation" },
  "home.exp.suite.title": { fr: "Suites Impériales", en: "Imperial Suites" },
  "home.exp.golf.label": { fr: "Performance", en: "Performance" },
  "home.exp.golf.title": { fr: "Le 18 Trous Historique", en: "The Historic 18 Holes" },
  "home.exp.spa.label": { fr: "Bien-être", en: "Wellness" },
  "home.exp.spa.title": { fr: "Sanctuaire du Rova", en: "Rova Sanctuary" },

  // Home — Golf
  "home.golf.kicker": { fr: "Parcours Signature", en: "Signature Course" },
  "home.golf.title.1": { fr: "Le seul", en: "The only" },
  "home.golf.title.2": { fr: "18 trous", en: "18 holes" },
  "home.golf.title.3": { fr: "de Madagascar.", en: "in Madagascar." },
  "home.golf.p": {
    fr: "Un tracé centenaire, dessiné dans la générosité des hauts plateaux. Chaque trou est un dialogue entre le geste, la lumière et la terre rouge.",
    en: "A century-old layout, drawn into the generosity of the highlands. Each hole is a dialogue between the swing, the light and the red earth.",
  },
  "home.stat.1": { fr: "Année de fondation", en: "Founding year" },
  "home.stat.2": { fr: "Trous d'exception", en: "Exceptional holes" },
  "home.stat.3": { fr: "Hôtel de luxe", en: "Luxury hotel" },

  // Footer
  "footer.newsletter.title": { fr: "Restez informé", en: "Stay informed" },
  "footer.newsletter.p": {
    fr: "Recevez nos invitations exclusives et les actualités du Domaine du Rova directement dans votre boîte mail.",
    en: "Receive our exclusive invitations and news from Domaine du Rova directly in your inbox.",
  },
  "footer.email.placeholder": { fr: "VOTRE EMAIL", en: "YOUR EMAIL" },
  "footer.subscribe": { fr: "S'INSCRIRE", en: "SUBSCRIBE" },
  "footer.col.explore": { fr: "Exploration", en: "Explore" },
  "footer.col.services": { fr: "Services", en: "Services" },
  "footer.col.contact": { fr: "Contact", en: "Contact" },
  "footer.helicopter": { fr: "Hélicoptère", en: "Helicopter" },
  "footer.events": { fr: "Événements", en: "Events" },
  "footer.concierge": { fr: "Conciergerie", en: "Concierge" },
  "footer.rights": { fr: "© 2026 Héritage Malgache — Tous droits réservés", en: "© 2026 Malagasy Heritage — All rights reserved" },
  "footer.legal": { fr: "MENTIONS LÉGALES", en: "LEGAL" },
  "footer.privacy": { fr: "CONFIDENTIALITÉ", en: "PRIVACY" },
  "footer.back": { fr: "← Retour à l'accueil", en: "← Back to home" },
  "footer.copy.short": { fr: "© 2026 Golf du Rova — Héritage Malgache", en: "© 2026 Golf du Rova — Malagasy Heritage" },

  // Restaurants page
  "resto.kicker": { fr: "Tables & Lounges · Trois adresses", en: "Tables & Lounges · Three venues" },
  "resto.title.1": { fr: "Restaurants", en: "Restaurants" },
  "resto.title.2": { fr: "du Rova.", en: "of Rova." },
  "resto.intro.1": {
    fr: "Le Golf du Rova Luxury Hotel vous invite à un voyage culinaire unique à travers ses trois restaurants, chacun offrant une expérience gastronomique raffinée et mémorable.",
    en: "Golf du Rova Luxury Hotel invites you on a unique culinary journey across its three restaurants, each offering a refined and memorable gastronomic experience.",
  },
  "resto.intro.2": {
    fr: "Que vous recherchiez les arômes envoûtants de l'Asian Gourmet, les créations fusion de La Table du Rova, ou un instant de détente au The View Bar Lounge, chaque moment passé sera un plaisir pour vos sens — accueilli avec une qualité irréprochable et un service d'exception.",
    en: "Whether you seek the captivating aromas of Asian Gourmet, the fusion creations of La Table du Rova, or a moment of relaxation at The View Bar Lounge, every moment will be a pleasure for the senses — welcomed with impeccable quality and exceptional service.",
  },
  "resto.menu.cta": { fr: "Découvrez notre carte", en: "Discover our menu" },
  "resto.book.table": { fr: "Réserver une table", en: "Book a table" },
  "resto.chefs.kicker": { fr: "Les Mains de l'Excellence", en: "The Hands of Excellence" },
  "resto.chefs.title.1": { fr: "Rencontrez", en: "Meet" },
  "resto.chefs.title.2": { fr: "nos chefs.", en: "our chefs." },
  "resto.chef.role": { fr: "Chef Exécutif", en: "Executive Chef" },
  "resto.chef.p1": {
    fr: "Dimitrios Zervas est un chef malgacho-grec, reconnu pour sa cuisine fusion mêlant les saveurs méditerranéennes et les influences locales de Madagascar. Il a grandi dans un environnement où la cuisine était au cœur de la culture familiale, développant très tôt sa passion pour la gastronomie.",
    en: "Dimitrios Zervas is a Malagasy-Greek chef renowned for his fusion cuisine blending Mediterranean flavors with local Madagascar influences. He grew up in an environment where cooking was at the heart of family culture, developing his passion for gastronomy from an early age.",
  },
  "resto.chef.p2": {
    fr: "Après avoir perfectionné ses compétences dans des écoles culinaires prestigieuses, il s'installe à Madagascar, où il s'inspire des produits locaux et des traditions culinaires malgaches. Chef Zervas est connu pour sa capacité à allier la richesse des saveurs méditerranéennes avec les ingrédients uniques de Madagascar.",
    en: "After honing his skills in prestigious culinary schools, he settled in Madagascar, where he draws inspiration from local produce and Malagasy culinary traditions. Chef Zervas is known for his ability to combine the richness of Mediterranean flavors with Madagascar's unique ingredients.",
  },
  "resto.chef.p3": {
    fr: "Il valorise particulièrement les produits frais et de saison, en mettant l'accent sur la durabilité et la préservation des ressources locales. En plus de ses talents culinaires, il est également un mentor engagé, formant de jeunes chefs et partageant son expertise avec la nouvelle génération de la gastronomie malgache.",
    en: "He particularly values fresh, seasonal produce, with an emphasis on sustainability and the preservation of local resources. Beyond his culinary talents, he is also a dedicated mentor, training young chefs and sharing his expertise with the new generation of Malagasy gastronomy.",
  },
  "resto.cta.title.1": { fr: "Réservez votre", en: "Book your" },
  "resto.cta.title.2": { fr: "table d'exception.", en: "exceptional table." },
  "resto.cta.p": {
    fr: "Notre conciergerie se tient à votre disposition pour orchestrer chaque détail de votre expérience culinaire au Domaine du Rova.",
    en: "Our concierge is at your service to orchestrate every detail of your culinary experience at Domaine du Rova.",
  },
  "resto.modal.p": {
    fr: "La carte complète sera bientôt disponible en téléchargement. Notre équipe se tient à votre disposition pour vous renseigner sur nos suggestions et menus du moment.",
    en: "The full menu will soon be available for download. Our team is at your disposal to inform you about our current suggestions and menus.",
  },
  "common.close": { fr: "Fermer", en: "Close" },

  // Restaurant items
  "r.rova.name": { fr: "La Table du Rova", en: "La Table du Rova" },
  "r.rova.cat": { fr: "Gastronomique Fusion", en: "Gastronomic Fusion" },
  "r.rova.alt": { fr: "Salle gastronomique de La Table du Rova", en: "Gastronomic dining room at La Table du Rova" },
  "r.rova.p1": {
    fr: "À La Table du Rova, l'excellence gastronomique prend vie à travers une fusion harmonieuse de la richesse des saveurs malgaches et du raffinement de la cuisine européenne. Chaque création met en valeur les produits locaux d'exception, sublimés par des techniques modernes et des influences européennes revisitées avec une touche d'audace et de sophistication.",
    en: "At La Table du Rova, gastronomic excellence comes to life through a harmonious fusion of rich Malagasy flavors and the refinement of European cuisine. Each creation highlights exceptional local produce, elevated by modern techniques and European influences revisited with audacity and sophistication.",
  },
  "r.rova.p2": {
    fr: "Nos chefs, véritables artistes de la cuisine, vous invitent à découvrir un menu où tradition et innovation se rencontrent dans une symphonie de goûts uniques, offrant une expérience culinaire d'exception qui éveille les sens et enchante le palais.",
    en: "Our chefs, true culinary artists, invite you to discover a menu where tradition and innovation meet in a symphony of unique flavors, offering an exceptional culinary experience that awakens the senses and delights the palate.",
  },
  "r.rova.p3": {
    fr: "Laissez-vous séduire par un voyage gastronomique d'exception, où chaque plat devient un souvenir mémorable et chaque bouchée une célébration du luxe et du raffinement.",
    en: "Let yourself be charmed by an exceptional gastronomic journey, where each dish becomes a memorable souvenir and each bite a celebration of luxury and refinement.",
  },
  "r.asian.name": { fr: "Asian Gourmet", en: "Asian Gourmet" },
  "r.asian.cat": { fr: "L'excellence de la cuisine asiatique", en: "The excellence of Asian cuisine" },
  "r.asian.alt": { fr: "Plateau de sushis et teppanyaki à l'Asian Gourmet", en: "Sushi and teppanyaki platter at Asian Gourmet" },
  "r.asian.p1": {
    fr: "Sous la direction du Chef Gerlie, talentueux artisan des saveurs, Asian Gourmet vous invite à découvrir une cuisine asiatique raffinée, où chaque plat est une véritable œuvre d'art.",
    en: "Under the direction of Chef Gerlie, a talented artisan of flavors, Asian Gourmet invites you to discover refined Asian cuisine where each dish is a true work of art.",
  },
  "r.asian.p2": {
    fr: "Parfaite harmonie entre les épices subtiles, les textures délicates et la qualité exceptionnelle des ingrédients sélectionnés avec soin, chaque bouchée est un voyage sensoriel.",
    en: "A perfect harmony of subtle spices, delicate textures and the exceptional quality of carefully selected ingredients — every bite is a sensory journey.",
  },
  "r.asian.p3": {
    fr: "Laissez-vous envoûter par des créations minutieusement élaborées, des sushis exquis aux teppanyakis savamment exécutés, et explorez des saveurs authentiques venues de Thaïlande, du Japon, de Chine, de Singapour et de Malaisie.",
    en: "Be enchanted by meticulously crafted creations, from exquisite sushi to skillfully executed teppanyaki, and explore authentic flavors from Thailand, Japan, China, Singapore and Malaysia.",
  },
  "r.view.name": { fr: "The View Bar Lounge", en: "The View Bar Lounge" },
  "r.view.cat": { fr: "Snack Bar", en: "Snack Bar" },
  "r.view.alt": { fr: "Terrasse panoramique du View Bar Lounge au coucher du soleil", en: "Panoramic terrace of The View Bar Lounge at sunset" },
  "r.view.p1": {
    fr: "Offrez-vous une parenthèse de sérénité au The View Bar Lounge, notre lieu d'exception où la beauté du paysage rural malgache se mêle à une ambiance raffinée. Avec sa vue panoramique imprenable, ce bar-lounge est l'endroit idéal pour savourer un moment de détente, que ce soit autour d'un verre ou d'une pause gourmande.",
    en: "Treat yourself to a moment of serenity at The View Bar Lounge, our exceptional venue where the beauty of the Malagasy rural landscape meets a refined atmosphere. With its breathtaking panoramic view, this bar-lounge is the ideal place to enjoy a moment of relaxation, whether over a drink or a gourmet pause.",
  },
  "r.view.p2": {
    fr: "Notre sélection de snacks sophistiqués et de boissons exquises, servie dans un cadre chic et apaisant, vous permettra de vous relaxer en toute élégance. Que vous souhaitiez vous adonner à une petite gourmandise légère ou simplement profiter de l'horizon, The View Bar Lounge est l'adresse parfaite pour un instant de calme, de plaisir et de contemplation.",
    en: "Our selection of sophisticated snacks and exquisite drinks, served in a chic and soothing setting, will let you relax with elegance. Whether you want a light gourmet treat or simply to enjoy the horizon, The View Bar Lounge is the perfect address for a moment of calm, pleasure and contemplation.",
  },

  // Rooms page
  "rooms.kicker": { fr: "Hébergement · 4 catégories d'exception", en: "Accommodation · 4 exceptional categories" },
  "rooms.title.1": { fr: "Chambres", en: "Rooms" },
  "rooms.title.2": { fr: "& Suites.", en: "& Suites." },
  "rooms.intro.1": {
    fr: "Chaque chambre du Golf du Rova est conçue comme une page d'un récit centenaire, où le bois précieux des hauts plateaux dialogue avec la lumière douce de Madagascar.",
    en: "Each room at Golf du Rova is designed as a page in a century-old story, where the precious woods of the highlands dialogue with the soft Madagascar light.",
  },
  "rooms.intro.2": {
    fr: "De la chambre Deluxe Heritage à la Villa Privée Rovaheli, nos 38 hébergements partagent un même art de l'hospitalité : matériaux nobles, literie de maison européenne et un service attentif, presque invisible.",
    en: "From the Deluxe Heritage room to the Private Villa Rovaheli, our 38 accommodations share the same art of hospitality: noble materials, European household linens and an attentive, almost invisible service.",
  },
  "rooms.spec.surface": { fr: "Surface", en: "Surface" },
  "rooms.spec.capacity": { fr: "Capacité", en: "Capacity" },
  "rooms.spec.view": { fr: "Vue", en: "View" },
  "rooms.details.cta": { fr: "Détails & équipements", en: "Details & amenities" },
  "rooms.book": { fr: "Réserver cette chambre", en: "Book this room" },
  "rooms.art.kicker": { fr: "L'Art du Détail", en: "The Art of Detail" },
  "rooms.art.title.1": { fr: "Une attention", en: "Care given" },
  "rooms.art.title.2": { fr: "à chaque geste.", en: "to every gesture." },
  "rooms.art.p1": {
    fr: "Marbre de Carrare, robinetterie en laiton brossé, draps en lin lavé tissés à Antananarivo : chaque matériau est choisi pour sa noblesse et sa capacité à bien vieillir, à raconter le temps qui passe.",
    en: "Carrara marble, brushed brass fittings, washed linen sheets woven in Antananarivo: each material is chosen for its nobility and its ability to age beautifully, to tell of passing time.",
  },
  "rooms.art.p2": {
    fr: "Notre majordomerie veille discrètement à chaque détail — du réveil parfumé au turn-down service du soir — pour que votre séjour relève moins de l'hôtellerie que de la résidence privée.",
    en: "Our butler service discreetly attends to every detail — from the scented wake-up to the evening turn-down service — so that your stay feels less like a hotel and more like a private residence.",
  },
  "rooms.feat.1": { fr: "— Linge de maison européen", en: "— European household linen" },
  "rooms.feat.2": { fr: "— Produits de bain signature", en: "— Signature bath products" },
  "rooms.feat.3": { fr: "— Climatisation silencieuse", en: "— Silent air conditioning" },
  "rooms.feat.4": { fr: "— Wi-Fi très haut débit", en: "— High-speed Wi-Fi" },
  "rooms.feat.5": { fr: "— Coffre-fort biométrique", en: "— Biometric safe" },
  "rooms.feat.6": { fr: "— Service d'étage 24h/24", en: "— 24-hour room service" },
  "rooms.cta.kicker": { fr: "Conciergerie privée", en: "Private concierge" },
  "rooms.cta.title.1": { fr: "Composez votre", en: "Compose your" },
  "rooms.cta.title.2": { fr: "séjour sur-mesure.", en: "bespoke stay." },
  "rooms.cta.p": {
    fr: "Notre équipe orchestre chaque détail — transferts hélicoptère, parcours de golf, soins spa et tables d'exception — pour vous offrir un séjour à votre image.",
    en: "Our team orchestrates every detail — helicopter transfers, golf rounds, spa treatments and exceptional dining — to offer you a stay that mirrors who you are.",
  },
  "rooms.modal.p": {
    fr: "La fiche détaillée complète, plan de chambre et tarifs saisonniers vous seront transmis par notre conciergerie sur simple demande.",
    en: "The complete details sheet, room plan and seasonal rates will be sent by our concierge on request.",
  },

  // Room items
  "rm.deluxe.name": { fr: "Chambre Deluxe Heritage", en: "Deluxe Heritage Room" },
  "rm.deluxe.cat": { fr: "Chambre · 42 m²", en: "Room · 42 m²" },
  "rm.deluxe.cap": { fr: "2 adultes", en: "2 adults" },
  "rm.deluxe.view": { fr: "Jardin colonial", en: "Colonial garden" },
  "rm.deluxe.alt": { fr: "Chambre Deluxe Heritage avec lit à baldaquin en acajou", en: "Deluxe Heritage room with mahogany four-poster bed" },
  "rm.deluxe.desc": {
    fr: "Pensée comme un cocon d'élégance feutrée, la chambre Deluxe Heritage célèbre l'art de vivre malgacho-colonial. Lit à baldaquin en acajou massif, textiles tissés à la main et terrasse privative ouverte sur les jardins centenaires du domaine.",
    en: "Designed as a cocoon of hushed elegance, the Deluxe Heritage room celebrates Malagasy-colonial living. Solid mahogany four-poster bed, hand-woven textiles and a private terrace opening onto the estate's century-old gardens.",
  },
  "rm.deluxe.a1": { fr: "King bed", en: "King bed" },
  "rm.deluxe.a2": { fr: "Salle de bain en marbre", en: "Marble bathroom" },
  "rm.deluxe.a3": { fr: "Terrasse privée", en: "Private terrace" },
  "rm.deluxe.a4": { fr: "Minibar", en: "Minibar" },

  "rm.suite.name": { fr: "Suite Exécutive Rova", en: "Rova Executive Suite" },
  "rm.suite.cat": { fr: "Suite · 68 m²", en: "Suite · 68 m²" },
  "rm.suite.cap": { fr: "2 adultes + 1 enfant", en: "2 adults + 1 child" },
  "rm.suite.view": { fr: "Hauts plateaux", en: "Highlands" },
  "rm.suite.alt": { fr: "Suite Exécutive avec cheminée et vue panoramique sur les hauts plateaux", en: "Executive Suite with fireplace and panoramic highlands view" },
  "rm.suite.desc": {
    fr: "Un salon distinct, une cheminée à foyer ouvert et une baie vitrée toute hauteur ouverte sur le couchant. La Suite Exécutive offre une expérience résidentielle, idéale pour les longs séjours et les soirées contemplatives.",
    en: "A separate living room, an open-hearth fireplace and a full-height bay window opening onto the sunset. The Executive Suite offers a residential experience, ideal for long stays and contemplative evenings.",
  },
  "rm.suite.a1": { fr: "Salon séparé", en: "Separate lounge" },
  "rm.suite.a2": { fr: "Cheminée", en: "Fireplace" },
  "rm.suite.a3": { fr: "Baie panoramique", en: "Panoramic window" },
  "rm.suite.a4": { fr: "Butler service", en: "Butler service" },

  "rm.signature.name": { fr: "Suite Signature Fairway", en: "Signature Fairway Suite" },
  "rm.signature.cat": { fr: "Suite · 92 m²", en: "Suite · 92 m²" },
  "rm.signature.cap": { fr: "2 adultes", en: "2 adults" },
  "rm.signature.view": { fr: "Parcours 18 trous", en: "18-hole course" },
  "rm.signature.alt": { fr: "Suite Signature ouverte sur le parcours de golf 18 trous", en: "Signature Suite opening onto the 18-hole course" },
  "rm.signature.desc": {
    fr: "Notre suite la plus demandée. Vastes volumes, mobilier d'antiquaire, balcon en bois exotique surplombant le parcours signature 18 trous. Le réveil s'y fait au son des oiseaux endémiques et des premiers swings de la matinée.",
    en: "Our most sought-after suite. Vast volumes, antique furniture and an exotic-wood balcony overlooking the signature 18-hole course. Wake to the songs of endemic birds and the first morning swings.",
  },
  "rm.signature.a1": { fr: "Balcon golf", en: "Golf balcony" },
  "rm.signature.a2": { fr: "Dressing", en: "Walk-in closet" },
  "rm.signature.a3": { fr: "Bain en îlot", en: "Freestanding bath" },
  "rm.signature.a4": { fr: "Petit-déjeuner privé", en: "Private breakfast" },

  "rm.villa.name": { fr: "Villa Privée Rovaheli", en: "Rovaheli Private Villa" },
  "rm.villa.cat": { fr: "Villa · 180 m²", en: "Villa · 180 m²" },
  "rm.villa.cap": { fr: "Jusqu'à 4 adultes", en: "Up to 4 adults" },
  "rm.villa.view": { fr: "Vallée & piscine", en: "Valley & pool" },
  "rm.villa.alt": { fr: "Villa privée avec piscine à débordement face à la vallée", en: "Private villa with infinity pool facing the valley" },
  "rm.villa.desc": {
    fr: "Un refuge d'exception en lisière du domaine : deux chambres, salon-cheminée, piscine à débordement, terrasse-deck et accès héliport dédié. La Villa Rovaheli incarne la promesse d'une intimité absolue, orchestrée par un majordome attitré.",
    en: "An exceptional retreat on the edge of the estate: two bedrooms, fireplace lounge, infinity pool, deck terrace and dedicated helipad access. Villa Rovaheli embodies the promise of absolute intimacy, orchestrated by a dedicated butler.",
  },
  "rm.villa.a1": { fr: "Piscine privée", en: "Private pool" },
  "rm.villa.a2": { fr: "2 chambres", en: "2 bedrooms" },
  "rm.villa.a3": { fr: "Héliport", en: "Helipad" },
  "rm.villa.a4": { fr: "Majordome 24h", en: "24h butler" },

  // Golf page
  "golf.kicker": { fr: "Parcours d'exception · 18 trous · Par 72", en: "Exceptional course · 18 holes · Par 72" },
  "golf.title.1": { fr: "L'authentique", en: "The authentic" },
  "golf.title.2": { fr: "parcours 18 trous.", en: "18-hole course." },
  "golf.intro.1": {
    fr: "Le parcours du Golf du Rova est une véritable institution à Madagascar. Créé en 1930, il est le seul véritable parcours 18 trous de la Grande Île, et sans conteste le plus beau.",
    en: "Golf du Rova's course is a true Madagascar institution. Founded in 1930, it is the only true 18-hole course on the Grande Île — and unmistakably the finest.",
  },
  "golf.intro.2": {
    fr: "Oasis verdoyante hors du temps, son décor poétique offre une escapade à 30 minutes seulement de la capitale. Pour s'enrichir encore plus, le parcours s'intègre désormais à un complexe hôtelier 5 étoiles.",
    en: "A timeless green oasis, its poetic setting offers an escape just 30 minutes from the capital. The course is now woven into a five-star hotel estate.",
  },
  "golf.cta.book": { fr: "Réserver maintenant", en: "Book now" },
  "golf.proshop.kicker": { fr: "Pro Shop", en: "Pro Shop" },
  "golf.proshop.title.1": { fr: "Un Pro Shop", en: "A Pro Shop" },
  "golf.proshop.title.2": { fr: "à la hauteur de vos exigences.", en: "that meets your demands." },
  "golf.proshop.p1": {
    fr: "Que vous soyez golfeur débutant ou aguerri, le Pro Shop du Golf du Rova répond à toutes vos attentes en matière d'équipement.",
    en: "Whether you are a beginner or a seasoned golfer, the Pro Shop at Golf du Rova meets every equipment need.",
  },
  "golf.proshop.p2": {
    fr: "Nous proposons une sélection exigeante de produits pour hommes, femmes et enfants — clubs, sacs, chaussures, vêtements, accessoires — pour vous offrir un swing parfait dans une élégance intemporelle.",
    en: "We offer a curated selection for men, women and children — clubs, bags, shoes, apparel, accessories — to elevate your swing with timeless elegance.",
  },
  "golf.swing.kicker": { fr: "Le Swing", en: "Le Swing" },
  "golf.swing.title.1": { fr: "Une escale raffinée", en: "A refined pause" },
  "golf.swing.title.2": { fr: "au cœur du practice.", en: "at the heart of the range." },
  "golf.swing.p1": {
    fr: "Idéalement situé au centre du practice, Le Swing vous invite à une pause alliant simplicité et élégance.",
    en: "Set right in the centre of the practice range, Le Swing invites you to a pause that pairs simplicity and elegance.",
  },
  "golf.swing.p2": {
    fr: "Dédié aux joueurs en quête de fraîcheur et de plénitude, cet espace propose une large sélection de boissons. Chaque gorgée vous accompagne naturellement, tout en restant concentré sur votre jeu.",
    en: "Made for players seeking freshness and focus, the lounge offers a generous drink selection — every sip keeps you grounded in your game.",
  },
  "golf.club.kicker": { fr: "Le Club", en: "The Club" },
  "golf.club.title.1": { fr: "Un parcours d'exception", en: "A course of distinction" },
  "golf.club.title.2": { fr: "au cœur de l'excellence.", en: "at the heart of excellence." },
  "golf.club.p1": {
    fr: "Depuis toujours, le Golf du Rova est une escale unique pour les passionnés de golf, qu'ils soient débutants ou joueurs aguerris. C'est ici que vous toucherez des yeux les plus fameux fairways, lorsque chaque trou est une fenêtre ouverte sur le fairway légendaire.",
    en: "Since its founding, Golf du Rova has been a singular destination for golf lovers — beginners and seasoned players alike. Here, your eyes graze the most celebrated fairways, where every hole frames a view onto the legendary green.",
  },
  "golf.club.p2": {
    fr: "Un parcours unique, alliant beauté naturelle et défis techniques, où l'art de bien tenir le club et l'expérience golfique s'élèvent ensemble.",
    en: "A singular course, blending natural beauty with technical challenge, where craft and golfing experience rise together.",
  },
  "golf.club.cta": { fr: "Visiter le site du Rova Golf Club", en: "Visit the Rova Golf Club site" },
  "golf.gallery.title": { fr: "Galerie photos", en: "Photo gallery" },
  "golf.gallery.kicker": { fr: "Instantanés du parcours", en: "Course moments" },
  "golf.cta.title.1": { fr: "Réservez votre", en: "Book your" },
  "golf.cta.title.2": { fr: "tee-time d'exception.", en: "exceptional tee-time." },
  "golf.cta.p": {
    fr: "Notre conciergerie sportive coordonne caddies, voiturettes et leçons privées pour transformer chaque visite en souvenir mémorable.",
    en: "Our sports concierge coordinates caddies, carts and private lessons so every visit becomes a memorable one.",
  },
};

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: (key: string) => string }>({
  lang: "fr",
  setLang: () => {},
  t: (k) => k,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("lang") as Lang | null;
      if (saved === "fr" || saved === "en") setLangState(saved);
    } catch {}
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("lang", l);
    } catch {}
  };

  const t = (key: string) => {
    const entry = D[key];
    if (!entry) return key;
    return entry[lang];
  };

  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export function useT() {
  return useContext(LangContext);
}

export function LangSwitcher() {
  const { lang, setLang } = useT();
  return (
    <div className="hidden sm:flex items-center gap-1 text-[10px] uppercase tracking-[0.25em] font-mono">
      <button
        onClick={() => setLang("fr")}
        className={`px-1 transition-colors ${lang === "fr" ? "text-primary font-semibold" : "text-muted-foreground hover:text-foreground"}`}
        aria-label="Français"
      >
        FR
      </button>
      <span className="text-muted-foreground/50">/</span>
      <button
        onClick={() => setLang("en")}
        className={`px-1 transition-colors ${lang === "en" ? "text-primary font-semibold" : "text-muted-foreground hover:text-foreground"}`}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
}

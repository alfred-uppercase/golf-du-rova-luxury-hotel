CREATE TYPE public.app_role AS ENUM ('admin', 'editor');

CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  UNIQUE (user_id, role)
);
GRANT SELECT, INSERT, DELETE ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE OR REPLACE FUNCTION public.is_staff(_user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id)
$$;

CREATE POLICY "Own profile or admin" ON public.profiles FOR SELECT TO authenticated
  USING (id = auth.uid() OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Own roles or admin" ON public.user_roles FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins add roles" ON public.user_roles FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins remove roles" ON public.user_roles FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin') AND user_id <> auth.uid());

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, email) VALUES (NEW.id, NEW.email);
  IF NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin');
  END IF;
  RETURN NEW;
END $$;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE TABLE public.site_content (
  key text PRIMARY KEY,
  fr text NOT NULL DEFAULT '',
  en text NOT NULL DEFAULT '',
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE public.site_images (
  key text PRIMARY KEY,
  url text NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE public.page_seo (
  page text PRIMARY KEY,
  title_fr text NOT NULL DEFAULT '',
  title_en text NOT NULL DEFAULT '',
  description_fr text NOT NULL DEFAULT '',
  description_en text NOT NULL DEFAULT '',
  og_image text,
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE public.rooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sort_order int NOT NULL DEFAULT 0,
  title_fr text NOT NULL DEFAULT '',
  title_en text NOT NULL DEFAULT '',
  body_fr text NOT NULL DEFAULT '',
  body_en text NOT NULL DEFAULT '',
  image_url text,
  alt_fr text NOT NULL DEFAULT '',
  alt_en text NOT NULL DEFAULT '',
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE public.restaurants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sort_order int NOT NULL DEFAULT 0,
  slug text NOT NULL DEFAULT '',
  name_fr text NOT NULL DEFAULT '',
  name_en text NOT NULL DEFAULT '',
  category_fr text NOT NULL DEFAULT '',
  category_en text NOT NULL DEFAULT '',
  body_fr text NOT NULL DEFAULT '',
  body_en text NOT NULL DEFAULT '',
  image_url text,
  alt_fr text NOT NULL DEFAULT '',
  alt_en text NOT NULL DEFAULT '',
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.site_content, public.site_images, public.page_seo, public.rooms, public.restaurants TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_content, public.site_images, public.page_seo, public.rooms, public.restaurants TO authenticated;
GRANT ALL ON public.site_content, public.site_images, public.page_seo, public.rooms, public.restaurants TO service_role;

DO $$ DECLARE t text; BEGIN
  FOREACH t IN ARRAY ARRAY['site_content','site_images','page_seo','rooms','restaurants'] LOOP
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);
    EXECUTE format('CREATE POLICY "Staff insert" ON public.%I FOR INSERT TO authenticated WITH CHECK (public.is_staff(auth.uid()))', t);
    EXECUTE format('CREATE POLICY "Staff update" ON public.%I FOR UPDATE TO authenticated USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()))', t);
    EXECUTE format('CREATE POLICY "Staff delete" ON public.%I FOR DELETE TO authenticated USING (public.is_staff(auth.uid()))', t);
  END LOOP;
END $$;
CREATE POLICY "Public read" ON public.site_content FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read" ON public.site_images FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read" ON public.page_seo FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read published" ON public.rooms FOR SELECT TO anon, authenticated USING (published OR public.is_staff(auth.uid()));
CREATE POLICY "Public read published" ON public.restaurants FOR SELECT TO anon, authenticated USING (published OR public.is_staff(auth.uid()));

CREATE POLICY "Staff upload media" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'media' AND public.is_staff(auth.uid()));
CREATE POLICY "Staff update media" ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'media' AND public.is_staff(auth.uid()));
CREATE POLICY "Staff delete media" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'media' AND public.is_staff(auth.uid()));

INSERT INTO public.rooms (sort_order,title_fr,title_en,body_fr,body_en,image_url,alt_fr,alt_en) VALUES (0,'Le charme de Madagascar, réinventé dans le luxe','The charm of Madagascar, reimagined in luxury','Les chambres du Golf du Rova Luxury Hotel reflètent l’essence même de notre établissement, où le raffinement du luxe se conjugue subtilement à l’authenticité locale.

Imaginez-vous dans un écrin enchanteur, bercé par la sérénité de la nature environnante, loin de l’agitation du quotidien. Votre chambre, véritable refuge de paix et de raffinement, offre une élégance intemporelle et un confort absolu. Chaque détail, méticuleusement pensé, transforme votre séjour en une expérience de luxe inégalée.','The rooms at Golf du Rova Luxury Hotel reflect the very essence of our establishment, where refined luxury blends subtly with local authenticity.

Imagine yourself in an enchanting haven, lulled by the serenity of the surrounding nature and far from the bustle of everyday life. Your room, a true refuge of peace and refinement, offers timeless elegance and absolute comfort. Every meticulously considered detail transforms your stay into an unparalleled luxury experience.','/__l5e/assets-v1/f0d45c6c-fb02-4127-b8dc-d06a9a58fdc8/chambre-charme.png','Chambre élégante du Golf du Rova ouverte sur la nature','Elegant Golf du Rova room opening onto nature');
INSERT INTO public.rooms (sort_order,title_fr,title_en,body_fr,body_en,image_url,alt_fr,alt_en) VALUES (1,'Votre chambre : un choix sur mesure pour un confort absolu','Your room: a tailored choice for absolute comfort','Au Golf du Rova, chaque chambre est conçue pour répondre à vos attentes les plus raffinées. Les amateurs de golf se laisseront séduire par les chambres offrant une vue spectaculaire sur le parcours, en particulier le trou n° 18. Pour ceux en quête de tranquillité, des chambres donnant sur le lac serein ou les collines verdoyantes d’Ambohidratrimo offriront une expérience paisible et ressourçante.

Afin d’assurer un confort sur mesure, vous aurez également la possibilité de choisir une chambre avec ou sans douche extérieure, selon vos préférences personnelles.','At Golf du Rova, every room is designed to meet your most refined expectations. Golf enthusiasts will be captivated by rooms offering spectacular course views, particularly over the 18th hole. For those seeking tranquillity, rooms overlooking the serene lake or the green hills of Ambohidratrimo offer a peaceful and restorative experience.

For truly tailored comfort, you may also choose a room with or without an outdoor shower, according to your personal preference.','/__l5e/assets-v1/dba9ef3a-fe93-477f-b0ef-f53ecec1a7b4/chambre-confort.png','Détails raffinés d’une chambre du Golf du Rova','Refined details in a Golf du Rova room');
INSERT INTO public.restaurants (sort_order,slug,name_fr,name_en,category_fr,category_en,body_fr,body_en,image_url,alt_fr,alt_en) VALUES (0,'rova','La Table du Rova','La Table du Rova','Gastronomique Fusion','Gastronomic Fusion','À La Table du Rova, l''excellence gastronomique prend vie à travers une fusion harmonieuse de la richesse des saveurs malgaches et du raffinement de la cuisine européenne. Chaque création met en valeur les produits locaux d''exception, sublimés par des techniques modernes et des influences européennes revisitées avec une touche d''audace et de sophistication.

Nos chefs, véritables artistes de la cuisine, vous invitent à découvrir un menu où tradition et innovation se rencontrent dans une symphonie de goûts uniques, offrant une expérience culinaire d''exception qui éveille les sens et enchante le palais.

Laissez-vous séduire par un voyage gastronomique d''exception, où chaque plat devient un souvenir mémorable et chaque bouchée une célébration du luxe et du raffinement.','At La Table du Rova, gastronomic excellence comes to life through a harmonious fusion of rich Malagasy flavors and the refinement of European cuisine. Each creation highlights exceptional local produce, elevated by modern techniques and European influences revisited with audacity and sophistication.

Our chefs, true culinary artists, invite you to discover a menu where tradition and innovation meet in a symphony of unique flavors, offering an exceptional culinary experience that awakens the senses and delights the palate.

Let yourself be charmed by an exceptional gastronomic journey, where each dish becomes a memorable souvenir and each bite a celebration of luxury and refinement.','/__l5e/assets-v1/31801727-a81b-4b2c-90f3-298d917169ac/resto-rova.png','Salle gastronomique de La Table du Rova','Gastronomic dining room at La Table du Rova');
INSERT INTO public.restaurants (sort_order,slug,name_fr,name_en,category_fr,category_en,body_fr,body_en,image_url,alt_fr,alt_en) VALUES (1,'asian','Asian Gourmet','Asian Gourmet','L''excellence de la cuisine asiatique','The excellence of Asian cuisine','Sous la direction du Chef Gerlie, talentueux artisan des saveurs, Asian Gourmet vous invite à découvrir une cuisine asiatique raffinée, où chaque plat est une véritable œuvre d''art.

Parfaite harmonie entre les épices subtiles, les textures délicates et la qualité exceptionnelle des ingrédients sélectionnés avec soin, chaque bouchée est un voyage sensoriel.

Laissez-vous envoûter par des créations minutieusement élaborées, des sushis exquis aux teppanyakis savamment exécutés, et explorez des saveurs authentiques venues de Thaïlande, du Japon, de Chine, de Singapour et de Malaisie.','Under the direction of Chef Gerlie, a talented artisan of flavors, Asian Gourmet invites you to discover refined Asian cuisine where each dish is a true work of art.

A perfect harmony of subtle spices, delicate textures and the exceptional quality of carefully selected ingredients — every bite is a sensory journey.

Be enchanted by meticulously crafted creations, from exquisite sushi to skillfully executed teppanyaki, and explore authentic flavors from Thailand, Japan, China, Singapore and Malaysia.','/__l5e/assets-v1/806c2cba-3638-4059-a7db-5588660b575c/resto-asian.png','Plateau de sushis et teppanyaki à l''Asian Gourmet','Sushi and teppanyaki platter at Asian Gourmet');
INSERT INTO public.restaurants (sort_order,slug,name_fr,name_en,category_fr,category_en,body_fr,body_en,image_url,alt_fr,alt_en) VALUES (2,'view','The View Bar Lounge','The View Bar Lounge','Snack Bar','Snack Bar','Offrez-vous une parenthèse de sérénité au The View Bar Lounge, notre lieu d''exception où la beauté du paysage rural malgache se mêle à une ambiance raffinée. Avec sa vue panoramique imprenable, ce bar-lounge est l''endroit idéal pour savourer un moment de détente, que ce soit autour d''un verre ou d''une pause gourmande.

Notre sélection de snacks sophistiqués et de boissons exquises, servie dans un cadre chic et apaisant, vous permettra de vous relaxer en toute élégance. Que vous souhaitiez vous adonner à une petite gourmandise légère ou simplement profiter de l''horizon, The View Bar Lounge est l''adresse parfaite pour un instant de calme, de plaisir et de contemplation.','Treat yourself to a moment of serenity at The View Bar Lounge, our exceptional venue where the beauty of the Malagasy rural landscape meets a refined atmosphere. With its breathtaking panoramic view, this bar-lounge is the ideal place to enjoy a moment of relaxation, whether over a drink or a gourmet pause.

Our selection of sophisticated snacks and exquisite drinks, served in a chic and soothing setting, will let you relax with elegance. Whether you want a light gourmet treat or simply to enjoy the horizon, The View Bar Lounge is the perfect address for a moment of calm, pleasure and contemplation.','/__l5e/assets-v1/526186e9-810c-480c-85e6-7fa4625e932a/resto-view.png','Terrasse panoramique du View Bar Lounge au coucher du soleil','Panoramic terrace of The View Bar Lounge at sunset');
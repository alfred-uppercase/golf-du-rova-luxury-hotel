import { queryOptions, useQuery } from "@tanstack/react-query";
import { getSiteData } from "@/lib/site-data.functions";
import { supabase } from "@/integrations/supabase/client";

export const SITE_URL = "https://golfdurova.lovable.app";

export const siteDataQuery = queryOptions({
  queryKey: ["site-data"],
  queryFn: () => getSiteData(),
  staleTime: 60_000,
});

export type SiteData = Awaited<ReturnType<typeof getSiteData>>;

export function useSiteData() {
  return useQuery(siteDataQuery).data;
}

/** Image slots editable from the admin, with their alt-text translation key. */
export const IMAGE_SLOTS: Record<"home" | "golf", { key: string; label: string; altKey?: string }[]> = {
  home: [
    { key: "home.img.story1", label: "Histoire — photo 1 (Clubhouse)" },
    { key: "home.img.story2", label: "Histoire — photo 2 (Drapeau)" },
    { key: "home.img.exp.suite", label: "Art de recevoir — Suite Premium", altKey: "home.exp.suite.alt" },
    { key: "home.img.exp.golf", label: "Art de recevoir — 18 trous", altKey: "home.exp.golf.alt" },
    { key: "home.img.exp.spa", label: "Art de recevoir — Sanctuaire", altKey: "home.exp.spa.alt" },
  ],
  golf: [
    { key: "golf.img.proshop", label: "Pro Shop" },
    { key: "golf.img.practice", label: "Practice" },
    { key: "golf.img.clubhouse", label: "Parcours / Clubhouse" },
  ],
};

export function useSiteImage(key: string, fallback: string) {
  const data = useSiteData();
  return data?.images.find((i) => i.key === key)?.url || fallback;
}

export const SEO_PAGES = [
  { page: "home", label: "Accueil", path: "/" },
  { page: "rooms", label: "Chambres", path: "/chambres" },
  { page: "restaurants", label: "Restaurants", path: "/restaurants" },
  { page: "golf", label: "Golf 18 trous", path: "/golf" },
  { page: "events", label: "Événements", path: "/evenements" },
] as const;

export function splitParagraphs(text: string) {
  return text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
}

export function absoluteUrl(url: string) {
  return url.startsWith("http") ? url : `${SITE_URL}${url}`;
}

/** Build page meta tags: admin values (French) override the coded defaults. */
export function seoHead(
  data: SiteData | undefined,
  page: string,
  path: string,
  fallback: { title: string; description: string; image?: string },
) {
  const row = data?.seo.find((s) => s.page === page);
  const title = row?.title_fr || fallback.title;
  const description = row?.description_fr || fallback.description;
  const image = row?.og_image || fallback.image;
  const meta: Record<string, string>[] = [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: `${SITE_URL}${path}` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
  ];
  if (image) {
    meta.push({ property: "og:image", content: absoluteUrl(image) }, { name: "twitter:image", content: absoluteUrl(image) });
  }
  return { meta, links: [{ rel: "canonical", href: `${SITE_URL}${path}` }] };
}

/** Upload a photo to the private media library and return a long-lived link. */
export async function uploadMedia(file: File) {
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from("media").upload(path, file, { contentType: file.type });
  if (error) throw error;
  const { data, error: signError } = await supabase.storage
    .from("media")
    .createSignedUrl(path, 60 * 60 * 24 * 365 * 10);
  if (signError || !data) throw signError ?? new Error("Lien introuvable");
  return data.signedUrl;
}

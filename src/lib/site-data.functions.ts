import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

// Public, read-only content for the website (texts, images, rooms, restaurants, SEO).
export const getSiteData = createServerFn({ method: "GET" }).handler(async () => {
  const url = process.env["SUPABASE_URL"]!;
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  const sb = createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false, storage: undefined },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
  const [content, images, seo, rooms, restaurants] = await Promise.all([
    sb.from("site_content").select("key, fr, en"),
    sb.from("site_images").select("key, url"),
    sb.from("page_seo").select("page, title_fr, title_en, description_fr, description_en, og_image"),
    sb.from("rooms").select("*").eq("published", true).order("sort_order"),
    sb.from("restaurants").select("*").eq("published", true).order("sort_order"),
  ]);
  return {
    content: content.data ?? [],
    images: images.data ?? [],
    seo: seo.data ?? [],
    rooms: rooms.data ?? [],
    restaurants: restaurants.data ?? [],
  };
});

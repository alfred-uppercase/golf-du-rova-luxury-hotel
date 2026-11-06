import { createFileRoute } from "@tanstack/react-router";
import { PageContentEditor } from "@/components/admin-page-content";
import { DEFAULT_IMAGES } from "@/lib/default-images";

export const Route = createFileRoute("/_authenticated/admin/accueil")({
  component: () => <PageContentEditor page="home" title="Page d'accueil" defaults={DEFAULT_IMAGES} />,
});

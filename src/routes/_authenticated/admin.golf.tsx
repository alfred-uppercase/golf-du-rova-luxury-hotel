import { createFileRoute } from "@tanstack/react-router";
import { PageContentEditor } from "@/components/admin-page-content";
import { DEFAULT_IMAGES } from "@/lib/default-images";

export const Route = createFileRoute("/_authenticated/admin/golf")({
  component: () => <PageContentEditor page="golf" title="Golf 18 trous" defaults={DEFAULT_IMAGES} />,
});

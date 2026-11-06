import { createFileRoute } from "@tanstack/react-router";
import { ItemsEditor } from "@/components/admin-items";

export const Route = createFileRoute("/_authenticated/admin/restaurants")({
  component: () => (
    <ItemsEditor
      table="restaurants"
      title="Restaurants"
      titleField="name"
      hint="Séparez les paragraphes de la description par une ligne vide."
      fields={[
        { base: "name", label: "Nom" },
        { base: "category", label: "Catégorie" },
        { base: "body", label: "Description", multiline: true },
        { base: "alt", label: "Texte alternatif de la photo (SEO)" },
      ]}
    />
  ),
});

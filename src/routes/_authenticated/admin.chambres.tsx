import { createFileRoute } from "@tanstack/react-router";
import { ItemsEditor } from "@/components/admin-items";

export const Route = createFileRoute("/_authenticated/admin/chambres")({
  component: () => (
    <ItemsEditor
      table="rooms"
      title="Chambres"
      titleField="title"
      hint="Chaque bloc s'affiche comme une grande section sur la page Chambres. Séparez les paragraphes par une ligne vide."
      fields={[
        { base: "title", label: "Titre" },
        { base: "body", label: "Description", multiline: true },
        { base: "alt", label: "Texte alternatif de la photo (SEO)" },
      ]}
    />
  ),
});

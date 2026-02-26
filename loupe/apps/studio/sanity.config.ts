import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";

export default defineConfig({
  name: "loupe",
  title: "Loupe",

  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET ?? "production",

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Lens Library")
              .child(
                S.documentList()
                  .title("All Lenses")
                  .filter('_type == "lens"')
                  .defaultOrdering([{ field: "order", direction: "asc" }])
              ),
            S.divider(),
            S.listItem()
              .title("Relationship Guides")
              .child(
                S.documentList()
                  .title("All Guides")
                  .filter('_type == "relationshipGuide"')
              ),
            S.divider(),
            S.listItem()
              .title("The World Right Now")
              .child(
                S.documentList()
                  .title("Articles")
                  .filter('_type == "article"')
                  .defaultOrdering([{ field: "publishedAt", direction: "desc" }])
              ),
            S.divider(),
            S.listItem()
              .title("Assessment Questions")
              .child(
                S.documentList()
                  .title("Questions")
                  .filter('_type == "assessmentQuestion"')
                  .defaultOrdering([
                    { field: "section", direction: "asc" },
                    { field: "order", direction: "asc" },
                  ])
              ),
          ]),
    }),
    visionTool(), // GROQ query playground — useful for development
  ],

  schema: { types: schemaTypes },
});

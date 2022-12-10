// import S from "@sanity/desk-tool/structure-builder"
import {
  FacebookLogo,
  MagnifyingGlass,
  Rows,
  Sliders,
  SlidersHorizontal,
} from "phosphor-react"

export const settingsMenu = (S) =>
  S.listItem()
    .title("Innstillinger")
    .icon(SlidersHorizontal)
    .child(
      S.list()
        .title("Innstillinger")
        .items([
          S.listItem()
            .title("Sideinnstillinger")
            .child(
              S.editor()
                .id("siteSettings")
                .schemaType("siteSettings")
                .documentId("siteSettings")
            )
            .icon(Sliders),
          S.divider(),
          S.listItem()
            .title("SEO / Metadata")
            .child(
              S.editor()
                .id("seoSettings")
                .schemaType("seoSettings")
                .documentId("seoSettings")
            )
            .icon(MagnifyingGlass),
          S.divider(),
          S.listItem()
            .title("Mal for prosjekter")
            .child(
              S.editor()
                .id("caseStudyTemplate")
                .schemaType("caseStudyTemplate")
                .documentId("caseStudyTemplate")
            )
            .icon(Rows),

          S.listItem()
            .title("Mal for tjenester")
            .child(
              S.editor()
                .id("serviceTemplate")
                .schemaType("serviceTemplate")
                .documentId("serviceTemplate")
            )
            .icon(Rows),

          S.listItem()
            .title("Mal for sidebunn")
            .icon(Rows)
            .child(
              S.documentTypeList("ctaTemplate").title(
                "Call to Action Templates"
              )
            ),

          S.listItem()
            .title("Innstillinger for sidebunn")
            .child(
              S.editor()
                .title("Innstillinger for sidebunn")
                .id("ctaSettings")
                .schemaType("ctaSettings")
                .documentId("ctaSettings")
            )
            .icon(SlidersHorizontal),
          S.divider(),
        ])
    )

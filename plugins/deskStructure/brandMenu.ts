// import S from "@sanity/desk-tool/structure-builder"
import { Eye, PencilSimple, Sliders, Swatches, Waves } from "phosphor-react"
import resolveProductionUrl from "plugins/previews/getDocumentHandle"
import Iframe from "sanity-plugin-iframe-pane"

export const brandMenu = (S) =>
  S.listItem()
    .title("Designmanual")
    .icon(Swatches)
    .child(
      S.list()
        .title("Designmanual")
        .items([
          S.listItem()
            .title("Retningslinjer")
            .child(
              S.documentTypeList("brandGuideline")
                .title("Designmanual")
                .child((documentId) =>
                  S.document()
                    .documentId(documentId)
                    .schemaType("brandGuideline")
                    .views([
                      S.view
                        .component(Iframe)
                        .icon(Eye)
                        .options({
                          // Required: Accepts an async function
                          url: (doc) => resolveProductionUrl(doc),
                          // Optional: Set the default size
                          defaultSize: `desktop`, // default `desktop`
                          // Optional: Add a reload button, or reload on new document revisions
                          reload: {
                            button: true,
                            revision: true,
                          },
                        })
                        .title("Preview"),
                      S.view.form().icon(PencilSimple),
                    ])
                )
            )
            .icon(Swatches),
          S.divider(),
          S.listItem()
            .title("Gradient")
            .icon(Waves)
            .child(
              S.documentTypeList("gradient")
                .title("Gradient")
                .child((documentId) =>
                  S.document().documentId(documentId).schemaType("gradient")
                )
            ),
          S.divider(),
          S.listItem()
            .title("Innstillinger")
            .child(
              S.editor()
                .id("brandSettings")
                .schemaType("brandSettings")
                .documentId("brandSettings")
            )
            .icon(Sliders),
        ])
    )

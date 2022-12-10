import { capitalize } from "lib/utils/string-utils"
import { Archive, Browser, Megaphone } from "phosphor-react"
import { Browsers } from "phosphor-react"
import { standardViews } from "plugins/previews/standardViews"

import { archiveTypes } from "../../schemas/utils/generate-archive-pages.utils.schema"

export const websiteMenu = (S) =>
  S.listItem()
    .title("Nettside")
    .id("webMenu")
    .icon(Browser)
    .child(
      S.list()
        .title("Web")
        .items([
          S.listItem()
            .title("Hovedsider")
            .icon(Browsers)
            .child(
              S.documentTypeList("page")
                .title("Side")
                .child((documentId) =>
                  S.document()
                    .documentId(documentId)
                    .schemaType("page")
                    .views(standardViews(S))
                )
            ),

          S.listItem()
            .title("Markedsføringssider")
            .icon(Megaphone)
            .child(
              S.documentTypeList("landingPage")
                .title("Markedsføringsside")
                .child((documentId) =>
                  S.document()
                    .documentId(documentId)
                    .schemaType("landingPage")
                    .views(standardViews(S))
                )
            ),
          S.listItem()
            .title("Arkivsider")
            .child(
              S.list()
                .title("Arkiv")
                .items(
                  archiveTypes.map((type) => {
                    const norwegianTitle =
                      type == "people"
                        ? "Team"
                        : type == "article"
                        ? "Artikler"
                        : type == "caseStudy"
                        ? "Prosjekter"
                        : type

                    return S.listItem()
                      .title(norwegianTitle)
                      .icon(Archive)
                      .child(
                        S.editor()
                          .id(type + "Archive")
                          .schemaType(type + "Archive")
                          .documentId(type + "Archive")
                      )
                  })
                )
            )
            .icon(Archive),

          S.divider(),
        ])
    )

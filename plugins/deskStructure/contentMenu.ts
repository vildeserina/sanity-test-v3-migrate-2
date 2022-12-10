import {
  Files,
  FolderOpen,
  Newspaper,
  Quotes,
  Tag,
  VideoCamera,
} from "phosphor-react"
import { standardViews } from "plugins/previews/standardViews"

export const contentMenu = (S) =>
  S.listItem()
    .title("Innhold")
    .id("contentMenu")
    .icon(Files)
    .child(
      S.list()
        .title("Innhold")
        .items([
          S.listItem()
            .title("Kategorier")
            .icon(Tag)
            .child(S.documentTypeList("category").title("Kategori")),
          S.listItem()
            .title("Arrangementkategori")
            .icon(Tag)
            .child(
              S.documentTypeList("eventCategory").title("Arrangementkategori")
            ),

          S.divider(),
          S.listItem()
            .title("Artikler")
            .icon(Newspaper)
            .child(
              S.documentTypeList("article")
                .title("Artikkel")
                .child((documentId) =>
                  S.document()
                    .documentId(documentId)
                    .schemaType("article")
                    .views(standardViews(S))
                )
            ),

          S.listItem()
            .title("Tjenester")
            .icon(VideoCamera)
            .child(
              S.documentTypeList("service")
                .title("Tjeneste")
                .child((documentId) =>
                  S.document()
                    .documentId(documentId)
                    .schemaType("service")
                    .views(standardViews(S))
                )
            ),
          S.listItem()
            .title("Prosjekter")
            .icon(FolderOpen)
            .child(
              S.documentTypeList("caseStudy")
                .title("Prosjekt")
                .child((documentId) =>
                  S.document()
                    .documentId(documentId)
                    .schemaType("caseStudy")
                    .views(standardViews(S))
                )
            ),

          S.divider(),
        ])
    )

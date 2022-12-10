import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list"
import { ArticleMedium, Check, ClipboardText, Table, Tag } from "phosphor-react"
import { Sliders } from "phosphor-react"
import { Image } from "phosphor-react"
import { Article, Briefcase, Browsers, Copy, FileText } from "phosphor-react"
import { standardViews } from "plugins/previews/standardViews"

export const proposalMenu = (S, context) =>
  S.listItem()
    .title("Tilbud")
    .icon(Briefcase)
    .child(
      S.list()
        .title("Tilbud")
        .items([
          S.listItem()
            .title("Innstillinger")
            .child(
              S.list()
                .title("Innstillinger")
                .items([
                  S.listItem()
                    .title("Innstillinger")
                    .child(
                      S.editor()
                        .id("proposalSettings")
                        .schemaType("proposalSettings")
                        .documentId("proposalSettings")
                    )
                    .icon(Sliders),
                  S.divider(),
                  S.listItem()
                    .title("Kategorier")
                    .child(
                      S.documentTypeList("proposalCategory")
                        .title("Kategorier")
                        .child((documentId) =>
                          S.document()
                            .documentId(documentId)
                            .schemaType("proposalCategory")
                        )
                    )
                    .icon(Tag),
                  orderableDocumentListDeskItem({
                    type: "proposalStatus",
                    title: "Status",
                    icon: Tag,
                    S,
                    context,
                  }),
                ])
            )
            .icon(Sliders),

          S.divider(),
          S.listItem()
            .title("Alle tilbud")
            .child(
              S.documentTypeList("proposal")
                .title("Tilbud")
                .child((documentId) =>
                  S.document()
                    .documentId(documentId)
                    .schemaType("proposal")
                    .views(standardViews)
                )
            )
            .icon(FileText),
          S.listItem()
            .title("Filtrert på avdelinger")
            .icon(Tag)
            .child(
              S.documentTypeList("department")
                .title("Avdeling")
                .child((departmentId) =>
                  S.documentList()
                    .title("Tilbud")
                    .filter(
                      '_type == "proposal" && $departmentId == department._ref'
                    )
                    .params({ departmentId })
                )
            ),
          S.listItem()
            .title("Filtrert på kategori")
            .icon(Tag)
            .child(
              S.documentTypeList("proposalCategory")
                .title("Kategori")

                .child((categoryId) =>
                  S.documentList()
                    .title("Tilbud")
                    .filter(
                      '_type == "proposal" && $categoryId in categories[]._ref'
                    )
                    .params({ categoryId })
                )
            ),
          S.listItem()
            .title("Filtrert på kunde")
            .icon(Tag)
            .child(
              S.documentTypeList("customer")
                .title("Kunde")
                .child((customerId) =>
                  S.documentList()
                    .title("Tilbud")
                    .filter(
                      '_type == "proposal" && $customerId == customer._ref'
                    )
                    .params({ customerId })
                )
            ),
          S.listItem()
            .title("Filtrert på status")
            .icon(Tag)
            .child(
              S.documentTypeList("proposalStatus")
                .title("Status")
                .child((proposalId) =>
                  S.documentList()
                    .title("Tilbud")
                    .filter(
                      '_type == "proposal" && $proposalId == proposalStatus._ref'
                    )
                    .params({ proposalId })
                )
            ),
          S.listItem()
            .title("Godkjente tilbud")
            .icon(Check)
            .child(
              S.documentList()
                .title("Godkjent")
                .filter('_type == "proposal" && isAccepted.current == true')
            ),
          S.divider(),
          S.listItem()
            .title("Alle tilbudsmaler")
            .icon(ClipboardText)
            .child(
              S.documentTypeList("proposalTemplate")
                .title("Tilbudsmal")
                .child((documentId) =>
                  S.document()
                    .documentId(documentId)
                    .schemaType("proposalTemplate")
                    .views(standardViews)
                )
            ),
          S.listItem()
            .title("Filtrert på kategori")
            .id("proposalTemplateByCategory")
            .icon(Tag)
            .child(
              S.documentTypeList("proposalCategory")
                .title("Kategori")

                .child((categoryId) =>
                  S.documentList()
                    .title("Tilbud")
                    .filter(
                      '_type == "proposalTemplate" && $categoryId in categories[]._ref'
                    )
                    .params({ categoryId })
                )
            ),

          // S.listItem()
          //   .title("Tilbudsmaler")
          //   .icon(Files)
          //   .child(
          //     S.list()
          //       .title("Tilbudsmaler")
          //       .items([
          //         S.listItem()
          //           .title("Alle")
          //           .child(
          //             S.documentTypeList("proposalTemplate")
          //               .title("Tilbudsmal")
          //               .child((documentId) =>
          //                 S.document()
          //                   .documentId(documentId)
          //                   .schemaType("proposalTemplate")
          //               )
          //           ),
          //         S.listItem()
          //           .title("Filtrert på kategori")
          //           .icon(Tag)
          //           .child(
          //             S.documentTypeList("proposalCategory")
          //               .title("Kategori")

          //               .child((categoryId) =>
          //                 S.documentList()
          //                   .title("Tilbud")
          //                   .filter(
          //                     '_type == "proposalTemplate" && $categoryId in categories[]._ref'
          //                   )
          //                   .params({ categoryId })
          //               )
          //           ),
          //       ])
          //   ),
          S.divider(),
          S.listItem()
            .title("Modulmaler")
            .child(
              S.list()
                .title("Modulmaler")
                .items([
                  S.listItem()
                    .title("Modulsett")
                    .child(
                      S.documentTypeList("proposalBlockSet")
                        .title("Modulsett")
                        .child((documentId) =>
                          S.document()
                            .documentId(documentId)
                            .schemaType("proposalBlockSet")
                        )
                    )
                    .icon(Browsers),
                  S.listItem()
                    .title("Filtrert på kategori")
                    .icon(Browsers)
                    .child(
                      S.documentTypeList("proposalCategory")
                        .title("Kategori")

                        .child((categoryId) =>
                          S.documentList()
                            .title("Tilbud")
                            .filter(
                              '_type == "proposalBlockSet" && $categoryId in categories[]._ref'
                            )
                            .params({ categoryId })
                        )
                    ),
                  S.divider(),
                  S.listItem()
                    .title("Tekst")
                    .child(
                      S.documentTypeList("proposalTemplateText")
                        .title("Tekst")
                        .child((documentId) =>
                          S.document()
                            .documentId(documentId)
                            .schemaType("proposalTemplateText")
                        )
                    )
                    .icon(ArticleMedium),
                  S.listItem()
                    .title("Bildegalleri")
                    .child(
                      S.documentTypeList("proposalTemplateGallery")
                        .title("Bildegalleri")
                        .child((documentId) =>
                          S.document()
                            .documentId(documentId)
                            .schemaType("proposalTemplateGallery")
                        )
                    )
                    .icon(Image),
                  // S.listItem()
                  //   .title("Logogalleri")
                  //   .child(
                  //     S.documentTypeList("proposalTemplateLogos")
                  //       .title("Logogalleri")
                  //       .child((documentId) =>
                  //         S.document()
                  //           .documentId(documentId)
                  //           .schemaType("proposalTemplateLogos")
                  //       )
                  //   )
                  //   .icon(SquaresFour),
                  S.listItem()
                    .title("Tabell")
                    .child(
                      S.documentTypeList("proposalTemplateTable")
                        .title("Tabell")
                        .child((documentId) =>
                          S.document()
                            .documentId(documentId)
                            .schemaType("proposalTemplateTable")
                        )
                    )
                    .icon(Table),
                  S.listItem()
                    .title("Vilkår")
                    .child(
                      S.documentTypeList("proposalTemplateTerm")
                        .title("Tabell")
                        .child((documentId) =>
                          S.document()
                            .documentId(documentId)
                            .schemaType("proposalTemplateTerm")
                        )
                    )
                    .icon(Check),
                ])
            )
            .icon(Copy),

          S.divider(),
        ])
    )

//  S.documentTypeList("proposalStatus")
//    .title("Status")
//    .child((documentId) =>
//      S.document().documentId(documentId).schemaType("proposalStatus")
//    )

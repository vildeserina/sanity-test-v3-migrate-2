import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list"
import {
  Buildings,
  FacebookLogo,
  IdentificationBadge,
  MapPin,
  Notebook,
  Quotes,
  Tag,
} from "phosphor-react"

import { brandMenu } from "./brandMenu"
import { contentMenu } from "./contentMenu"
import { proposalMenu } from "./proposalMenu"
import { settingsMenu } from "./settingsMenu"
import { websiteMenu } from "./websiteMenu"

export const deskStructure = (S, context) => {
  return S.list()
    .title("Innhold")
    .items([
      settingsMenu(S),
      S.divider(),
      websiteMenu(S),
      contentMenu(S),
      S.divider(),
      S.listItem()
        .title("Personer")
        .icon(IdentificationBadge)
        .child(
          S.list()
            .title("Person")
            .items([
              orderableDocumentListDeskItem({
                type: "person",
                title: "Personer",
                icon: IdentificationBadge,
                S,
                context,
              }),

              S.divider(),
              S.listItem()
                .title("Personkategorier")
                .icon(Tag)
                .child(S.documentTypeList("personCategory").title("Category")),
              S.divider(),
            ])
        ),
      S.listItem()
        .title("Kunder")
        .icon(Notebook)
        .child(
          S.list()
            .title("Kunder")
            .items([
              orderableDocumentListDeskItem({
                type: "customer",
                title: "Kunde",
                icon: Notebook,
                S,
                context,
              }),
              S.listItem()
                .title("Sitater")
                .icon(Quotes)
                .child(S.documentTypeList("quote").title("Sitat")),
            ])
        ),
      S.divider(),
      S.listItem()
        .title("Kontakt")
        .icon(MapPin)
        .child(
          S.list()
            .title("Kontakt")
            .items([
              S.listItem()
                .title("Kontakt")
                .icon(MapPin)
                .child(
                  S.editor()
                    .title("Kontaktinfo")
                    .id("contactInfo")
                    .schemaType("contactInfo")
                    .documentId("contactInfo")
                ),

              S.divider(),
              S.listItem()
                .title("Sosiale medier")
                .icon(FacebookLogo)
                .child(
                  S.editor()
                    .title("Sosiale medier")
                    .id("socialConfig")
                    .schemaType("socialConfig")
                    .documentId("socialConfig")
                ),
              S.divider(),
              S.listItem()
                .title("Avdelinger")
                .icon(Buildings)
                .child(S.documentTypeList("department").title("Department")),

              S.divider(),
            ])
        ),

      S.divider(),
      proposalMenu(S, context),
      S.divider(),
      brandMenu(S),
      S.listItem()
        .title("Hello")
        .icon(Buildings)
        .child(S.documentTypeList("hello").title("Hello test")),
    ])
}

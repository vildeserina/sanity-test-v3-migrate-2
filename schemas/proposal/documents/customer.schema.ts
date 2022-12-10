import {
  orderRankField,
  orderRankOrdering,
} from "@sanity/orderable-document-list"
import { AddressBook } from "phosphor-react"

import generateFigure from "../../utils/generate-figure.utils.schema"

export const customer = {
  name: "customer",
  title: "Kunde",
  type: "document",
  orderings: [orderRankOrdering],
  icon: AddressBook,
  fields: [
    orderRankField({ type: "customer" }),
    {
      title: "Tittel",
      name: "title",
      type: "string",
    },
    generateFigure({
      title: "Logo",
      name: "logo",
      caption: false,
      alt: false,
      description:
        "Logoen bør være i hvit på transparent bakgrunn (svg eller png)",
    }),
  ],
}

import {
  orderRankField,
  orderRankOrdering,
} from "@sanity/orderable-document-list"
import { Newspaper, User } from "phosphor-react"

import generateFigure from "../utils/generate-figure.utils.schema"

export const person = {
  name: "person",
  type: "document",
  title: "Person",
  icon: User,
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: "person" }),
    {
      name: "name",
      type: "string",
      title: "Navn",
      // validation: (Rule) => Rule.required(),
    },
    {
      name: "title",
      type: "string",
      title: "Tittel",
    },
    {
      name: "category",
      type: "reference",
      title: "Kategori",
      to: [{ type: "personCategory" }],
    },
    {
      name: "department",
      type: "reference",
      title: "Avdeling",
      to: [{ type: "department" }],
    },

    {
      title: "Kort beskrivelse",
      name: "introduction",
      type: "simplePortableText",
      rows: 3,
      options: {
        collapsible: true,
      },
      // validation: (Rule) => Rule.max(500).error("Max 300 characters"),
    },
    {
      name: "email",
      type: "string",
      title: "E-post",
    },
    {
      name: "phone",
      type: "number",
      title: "Telefonnummer (kun tall)",
    },
    generateFigure({
      caption: false,
      alt: false,
    }),
    generateFigure({
      title: "Signatur",
      name: "signature",
      description: "Må ha gjennomsiktig bakgrunn. PNG eller SVG anbefales",
      caption: false,
      alt: false,
    }),
    {
      title: "CV",
      name: "cv",
      type: "simplePortableText",
      description:
        "Om du ønsker å legge til en fil, kan du gjøre dette som en lenke til Dropbox eller Google Drive",
    },
  ],

  preview: {
    select: {
      title: "name",
      subtitle: "title",
      media: "figure",
    },
  },
}

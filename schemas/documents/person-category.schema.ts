import { Tag } from "phosphor-react"

export const personCategory = {
  name: "personCategory",
  title: "Ansattkategori",
  icon: Tag,
  type: "document",
  i18n: true,
  fields: [
    {
      name: "title",
      title: "Tittel",
      type: "string",
    },
  ],
}

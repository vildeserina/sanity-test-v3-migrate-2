import { Tag } from "phosphor-react"

export const eventCategory = {
  name: "eventCategory",
  title: "Arrangementkategori",
  icon: Tag,
  type: "document",
  i18n: true,
  fields: [
    {
      name: "title",
      title: "Tittel",
      type: "string",
    },
    {
      title: "Vis som filter i arkiv",
      name: "showFilter",
      type: "boolean",
      initialValue: true,
    },
  ],
}

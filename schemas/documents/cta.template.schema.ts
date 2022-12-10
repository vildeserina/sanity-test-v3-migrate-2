import { Megaphone } from "phosphor-react"

export const ctaTemplate = {
  name: "ctaTemplate",
  type: "document",
  title: "Mal for sidebunn",
  icon: Megaphone,
  fields: [
    {
      name: "title",
      type: "string",
      title: "Tittel",
    },
    {
      title: "Moduler",
      name: "sections",
      type: "sections",
    },
    // {
    //   title: "Category",
    //   name: "category",
    //   type: "reference",
    //   to: [{ type: "category" }],
    // },
  ],
  preview: {
    select: {
      title: "title",
    },
  },
}

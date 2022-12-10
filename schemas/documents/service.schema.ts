import { ChartLineUp } from "phosphor-react"

import generateColorTheme from "../utils/generate-color-theme.utils.schema"
import { page } from "./page.schema"

export const service = {
  name: "service",
  type: "document",
  title: "Tjeneste",
  icon: ChartLineUp,
  groups: page.groups,
  fields: [
    {
      name: "title",
      type: "string",
      title: "Tittel",
      group: "general",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "general",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => [
        Rule.required().error("The page needs a slug"),
        Rule.custom((slug) => {
          if (typeof slug.current === "undefined") {
            return true
          }
          return slug.current.indexOf(" ") >= 0
            ? "The slug should not contain spaces"
            : true
        }).error(),
      ],
    },
    {
      title: "Tjenester",
      name: "categories",
      type: "array",
      group: "general",
      of: [
        {
          title: "Kategori",
          name: "category",
          type: "reference",
          to: [{ type: "category" }],
        },
      ],
    },

    {
      title: "Gradering",
      name: "gradient",
      type: "reference",
      to: [{ type: "gradient" }],
      group: "hero",
    },
    {
      title: "Vis relevante prosjekter",
      name: "showRelated",
      type: "boolean",
      group: "general",
      initialValue: true,
    },
    generateColorTheme({
      group: "hero",
    }),
    {
      title: "Introduksjon",
      name: "introduction",
      type: "simplePortableText",
      group: "content",
    },
    {
      title: "Moduler",
      name: "sections",
      type: "sections",
      group: "content",
    },
    {
      name: "seo",
      type: "seo",
      group: "meta",
      title: "Metadata / SEO",
      description: "This description populates meta-tags on the webpage",
    },
  ],
}

import { Newspaper } from "phosphor-react"

import generateColorTheme from "../utils/generate-color-theme.utils.schema"

export const articleSection = {
  type: "object",
  name: "articleSection",
  title: "Artikler",
  icon: Newspaper,
  fields: [
    {
      title: "Overskrift",
      name: "heading",
      type: "string",
    },
    generateColorTheme({
      initialValue: "yellow",
    }),
    {
      title: "Kilde",
      name: "source",
      type: "string",
      options: {
        list: [
          {
            title: "Sist publisert",
            value: "lastPublished",
          },
          {
            title: "Relatert til kategori",
            value: "category",
          },
          {
            title: "Manuelt",
            value: "manual",
          },
        ],
        layout: "radio",
        initialValue: "lastPublished",
      },
    },
    {
      title: "Kategori",
      name: "category",
      type: "reference",
      to: [{ type: "category" }],
      hidden: ({ parent }) => parent.source !== "category",
    },
    {
      title: "Velg artikler",
      name: "items",
      type: "array",
      of: [
        {
          title: "Artikkel",
          name: "article",
          type: "reference",
          to: [{ type: "article" }],
        },
      ],
      hidden: ({ parent }) => parent.source !== "manual",
    },
  ],
  preview: {
    select: {
      title: "heading",
      layout: "layout",
    },
    prepare({ title }) {
      return {
        title: `Artikler`,
        subtitle: title ?? "",
      }
    },
  },
}

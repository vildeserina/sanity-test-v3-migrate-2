import generateColorTheme from "../utils/generate-color-theme.utils.schema"
import generateFigure from "../utils/generate-figure.utils.schema"

export const hero = {
  type: "object",
  name: "hero",
  title: "Sidetopp",
  fields: [
    {
      name: "layout",
      title: "Layout",
      type: "string",
      options: {
        list: [
          { title: "Enkel", value: "simple" },
          { title: "Utvidet: Venstrevridd diagonal", value: "fullLeft" },
          { title: "Utvidet: Høyrevridd diagonal", value: "fullRight" },
        ],
        layout: "radio",
      },
      initialValue: "leftAligned",
    },
    generateColorTheme({}),
    {
      title: "Overskrift",
      description: "Overstyrer sidetittelen",
      name: "heading",
      type: "string",
      rows: 2,
      hidden: ({ document }) => document?.layout === "simple",
      validation: (Rule) => Rule.max(200).error("Maks 200 tegn"),
    },
    {
      title: "Introduksjon",
      name: "introduction",
      type: "simplePortableText",
      hidden: ({ document }) => document?.layout === "simple",
      validation: (Rule) => Rule.max(500).error("Maks 500 tegn"),
    },
    {
      title: "Lenker",
      type: "array",
      name: "buttons",
      of: [{ type: "button" }],
      hidden: ({ document }) => document?.layout === "simple",
      validation: (Rule) => [Rule.max(2).error("Maks 2 knapper")],
    },
    {
      title: "Media",
      description: "Video bør være i stående format",
      name: "media",
      type: "media",
      hidden: ({ document }) => document?.layout === "simple",
    },
  ],
}

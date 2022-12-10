import { Swatches } from "phosphor-react"

export const brandColor = {
  name: "brandColor",
  title: "Farger",
  type: "object",
  icon: Swatches,
  fields: [
    { title: "Tittel", name: "title", type: "string" },
    {
      title: "Forklaring",
      name: "description",
      type: "simpleText",
      description: "Kan stå tom",
    },
    {
      title: "Vis fargetitler",
      name: "showColorTitles",
      type: "boolean",
      initialValue: true,
    },
    {
      title: "Farger",
      name: "colors",
      type: "array",
      of: [
        {
          title: "Farge",
          type: "object",
          color: "color",
          fields: [
            {
              name: "name",
              title: "Navn",
              type: "string",
            },
            {
              name: "rgb",
              title: "Digitalt",
              type: "color",
              options: {
                disableAlpha: true,
              },
            },
            {
              name: "cmyk",
              title: "CMYK",
              type: "string",
            },
            {
              name: "pantoneCoated",
              title: "Pantone C",
              type: "string",
            },
            {
              name: "pantoneUncoated",
              title: "Pantone U",
              type: "string",
            },
          ],
          preview: {
            select: {
              name: "name",
              cmyk: "cmyk",
              color: "rgb",
            },
            prepare: ({ name, color, cmyk }) => {
              const title = name ?? color?.hex ?? "Farge"
              const subtitle = color?.hex ?? cmyk ?? "Farge"

              return {
                title,
                subtitle,
                media: color,
              }
            },
          },
        },
      ],
    },
  ],
}

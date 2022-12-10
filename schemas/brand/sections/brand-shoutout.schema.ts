import { WarningCircle } from "phosphor-react"

export const brandShoutout = {
  name: "brandShoutout",
  title: "Infoboks",
  type: "object",
  icon: WarningCircle,
  fields: [
    {
      title: "Tittel",
      name: "title",
      type: "string",
    },
    {
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Nøytral", value: "neutral" },
          { title: "Viktig", value: "important" },
          { title: "Positivt", value: "positive" },
          { title: "Idé", value: "idea" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      initialValue: "standard",
    },
    {
      title: "Innhold",
      name: "content",
      type: "simpleText",
    },
  ],
  preview: {
    select: {
      contentTitle: "title",
    },
    prepare: ({ contentTitle, media }) => {
      const title = contentTitle ?? "Innhold"
      const subtitle = "Infoboks"
      return {
        title,
        media,
        subtitle,
      }
    },
  },
}

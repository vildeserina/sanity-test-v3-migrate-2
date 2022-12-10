import { PencilSimple } from "phosphor-react"

export const brandContent = {
  name: "brandContent",
  title: "Innhold",
  type: "object",
  icon: PencilSimple,
  fields: [
    {
      title: "Tittel",
      name: "title",
      type: "string",
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
      return {
        title,
        media,
      }
    },
  },
}

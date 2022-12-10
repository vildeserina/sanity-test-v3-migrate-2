import { Lightbulb } from "phosphor-react"

export const brandGallery = {
  name: "brandGallery",
  title: "Galleri",
  type: "object",
  icon: Lightbulb,
  fields: [
    {
      title: "Images",
      name: "gallery",
      type: "array",
      of: [
        {
          name: "brandImage",
          title: "Bilde",
          type: "brandImage",
        },
      ],
    },
  ],
  preview: {
    select: {
      media: "gallery[0].image",
    },
    prepare: ({ media }) => {
      const title = "Galleri"
      return {
        title,
        media,
      }
    },
  },
}

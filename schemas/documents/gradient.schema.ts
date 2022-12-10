import { Waves } from "phosphor-react"

import generateFigure from "../utils/generate-figure.utils.schema"

export const gradient = {
  name: "gradient",
  title: "Gradering",
  icon: Waves,
  type: "document",
  fields: [
    {
      title: "Tittel",
      name: "title",
      type: "string",
    },
    generateFigure({
      title: "Bilde",
      name: "image",
      caption: false,
      alt: false,
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
    },
  },
}

import { FileImage } from "phosphor-react"

import generateFigure from "./generate-figure.utils.schema"

// TODO – initial value always first gradient
export const media = {
  title: "Media",
  name: "media",
  icon: FileImage,
  type: "object",
  fields: [
    {
      title: "Type",
      type: "string",
      name: "type",
      options: {
        list: [
          { title: "Gradering", value: "gradient" },
          { title: "Bilde", value: "image" },
          { title: "Video", value: "video" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      initialValue: "gradient",
    },
    generateFigure({
      title: "Bilde (desktop)",
      alt: true,
      caption: false,
      name: "image",
      hidden: ({ parent }) => parent.type !== "image",
    }),
    generateFigure({
      title: "Bilde (mobil)",
      alt: true,
      caption: false,
      name: "mobileImage",
      hidden: ({ parent }) => parent.type !== "image",
    }),
    {
      title: "Gradering",
      name: "gradient",
      type: "reference",
      to: [{ type: "gradient" }],
      hidden: ({ parent }) => parent.type !== "gradient",
    },
    {
      title: "Video (desktop)",
      description: "Bør være i kvadratisk eller stående format",
      name: "video",
      type: "mux.video",
      hidden: ({ parent }) => parent.type !== "video",
    },
    {
      title: "Video (mobil)",
      options: { collapsible: true, collapsed: true },
      description: "Bør være i stående format",
      name: "mobileVideo",
      type: "mux.video",
      hidden: ({ parent }) => parent.type !== "video",
    },
  ],
}

import { FileImage } from "phosphor-react"

import generateFigure from "../../utils/generate-figure.utils.schema"

// TODO – initial value always first gradient
export const proposalMedia = {
  title: "Media",
  name: "proposalMedia",
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
        ],
        layout: "radio",
        direction: "horizontal",
      },
      initialValue: "gradient",
    },
    generateFigure({
      title: "Bilde",
      alt: true,
      caption: false,
      name: "image",
      hidden: ({ parent }) => parent.type !== "image",
    }),
    {
      title: "Gradering",
      name: "gradient",
      type: "reference",
      to: [{ type: "gradient" }],
      hidden: ({ parent }) => parent.type !== "gradient",
    },
  ],
}

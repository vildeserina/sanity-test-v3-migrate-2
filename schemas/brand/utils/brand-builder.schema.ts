import { Divide } from "phosphor-react"

export const brandBuilder = {
  title: "Sidebygger",
  name: "brandBuilder",
  type: "array",
  of: [
    {
      type: "brandVariant",
    },
    {
      type: "brandContent",
    },
    {
      type: "brandShoutout",
    },
    {
      type: "brandColor",
    },
    {
      type: "brandDownload",
    },
    {
      type: "brandButton",
    },
    {
      title: "Divider",
      name: "brandDivider",
      type: "object",
      icon: Divide,
      fields: [
        {
          title: "Farge",
          name: "color",
          type: "string",
          options: {
            list: [
              { title: "Primær", value: "primary" },
              { title: "Sekundær", value: "secondary" },
              { title: "Kontrast", value: "accent" },
            ],
            layout: "radio",
            direction: "horizontal",
          },
          initialValue: "primary",
        },
      ],
    },
  ],
}

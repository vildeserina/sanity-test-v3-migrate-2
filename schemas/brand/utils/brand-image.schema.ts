export const brandImage = {
  title: "Bilde",
  type: "image",
  name: "brandImage",
  options: {
    hotspot: true,
  },
  fields: [
    {
      name: "size",
      title: "Størrelse",
      type: "string",
      options: {
        list: [
          { title: "Small – 1/4", value: "small" },
          { title: "Medium – 1/3", value: "medium" },
          { title: "Large – 1/2", value: "large" },
          { title: "Max – 1/1", value: "max" },
        ],
      },
      initialValue: "medium",
    },
    {
      name: "aspectRatio",
      title: "Format",
      type: "string",
      options: {
        list: [
          { title: "Original", value: "original" },
          { title: "Kvadratisk 1:1", value: "square" },
          { title: "Horisontal", value: "horizontal" },
          { title: "Vertikal", value: "vertical" },
        ],
      },
      initialValue: "original",
    },
    {
      name: "decorator",
      title: "Ramme eller bakgrunn",
      type: "string",
      options: {
        list: [
          { title: "Ingen", value: "none" },
          { title: "Bakgrunn", value: "brand-bg-grey" },
          { title: "Ramme", value: "brand-border-grey border-2" },
          {
            title: "Grønn ramme",
            value: "brand-border-green border-2 border-opacity-50",
          },
          {
            title: "Rød ramme",
            value: "brand-border-red border-2 border-opacity-75",
          },
        ],
      },
      initialValue: "none",
    },
    {
      name: "alt",
      type: "string",
      title: "Alternative text",
      description: "Important for SEO and accessiblity.",
    },
    {
      title: "Caption",
      name: "caption",
      type: "string",
    },
  ],
  preview: {
    select: {
      imageUrl: "asset.url",
      title: "caption",
    },
  },
}

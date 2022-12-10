import generateFigure from "schemas/utils/generate-figure.utils.schema"

export const illustration = {
  type: "object",
  name: "illustration",
  title: "Illustration",
  fields: [
    {
      title: "Heading",
      name: "heading",
      type: "string",
      initialValue: "Visste du?",
    },
    generateFigure({
      caption: true,
    }),
    {
      title: "Content",
      name: "content",
      type: "text",
    },
    {
      title: "Button",
      name: "button",
      type: "button",
      options: { collapsible: true, collapsed: true },
    },
  ],
}

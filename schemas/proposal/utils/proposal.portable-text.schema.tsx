import React from "react"

const IntroStyle = (props) => (
  <span style={{ fontSize: "1.2em", fontWeight: "bold" }}>
    {props.children}
  </span>
)

export const proposalPortableText = {
  title: "Portable Text",
  name: "proposalPortableText",
  type: "array",
  of: [
    {
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        {
          title: "Ingress",
          value: "intro",
          blockEditor: {
            render: IntroStyle,
          },
        },
        { title: "Tittel", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbers", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
        ],
      },
    },
    { type: "button" },
    { type: "videoSection" },
    { type: "flexibleImage" },
    { type: "personPreview" },
    { type: "accordion" },
  ],
}

import { ArrowSquareOut, Link } from "phosphor-react"
import React from "react"

const InternalLinkRender = ({ children }) => (
  <span>
    {children}
    <Link />{" "}
  </span>
)

const LinkRender = ({ children }) => (
  <span>
    {children}
    <ArrowSquareOut />{" "}
  </span>
)

export const simpleText = {
  title: "Simple Text",
  name: "simpleText",
  type: "array",
  of: [
    {
      title: "Block",
      type: "block",
      styles: [
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [{ title: "Bullet", value: "bullet" }],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
          { title: "Code", value: "code" },
        ],
        annotations: [
          {
            name: "internalLink",
            type: "object",
            title: "Internal link",
            icon: Link,
            fields: [
              {
                name: "reference",
                type: "reference",
                title: "Reference",
                to: [{ type: "brandGuideline" }],
              },
            ],
            blockEditor: {
              icon: Link,
              render: InternalLinkRender,
            },
          },
          {
            name: "brandExternalLink",
            title: "Ekstern lenke",
            type: "object",
            icon: ArrowSquareOut,
            fields: [
              {
                name: "externalLink",
                description:
                  'URLen må starte med "https://", "http://", "mailto:" eller "tel:"',
                title: "URL",
                type: "externalLink",
              },
            ],
            options: {
              collapsible: false,
            },
            blockEditor: {
              icon: ArrowSquareOut,
              render: LinkRender,
            },
          },
        ],
      },
    },
  ],
}

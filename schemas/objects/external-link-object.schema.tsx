import { ArrowSquareOut } from "phosphor-react"
import React from "react"

const LinkRender = ({ children }) => (
  <span>
    {children}
    <ArrowSquareOut />{" "}
  </span>
)

export const externalLinkObject = {
  name: "externalLinkObject",
  title: "Ekstern lenke",
  type: "object",
  icon: ArrowSquareOut,
  fields: [
    {
      name: "externalLink",
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
}

import { Link } from "phosphor-react"
import React from "react"

const InternalLinkRender = ({ children }) => (
  <span>
    {children}
    <Link />{" "}
  </span>
)

export const internalLinkObject = {
  name: "internalLinkObject",
  title: "Intern lenke",
  type: "object",
  icon: Link,
  fields: [
    {
      name: "internalLink",
      title: "Velg dokument",
      type: "internalLink",
    },
  ],
  options: {
    collapsible: false,
  },
  blockEditor: {
    icon: Link,
    render: InternalLinkRender,
  },
}

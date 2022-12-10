import { Link } from "phosphor-react"

export const brandButton = {
  name: "brandButton",
  title: "Lenke",
  type: "object",
  icon: Link,
  fields: [
    {
      name: "linkType",
      title: "Type lenke",
      type: "string",
      options: {
        list: [
          { title: "Intern", value: "internal" },
          { title: "Ekstern", value: "external" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      initialValue: "internal",
    },
    {
      name: "internalLink",
      title: "Velg dokument",
      type: "reference",
      to: [{ type: "brandGuideline" }],
      hidden: ({ parent }) => {
        return parent?.linkType !== "internal"
      },
    },
    {
      name: "externalLink",
      title: "URL",
      type: "url",
      hidden: ({ parent }) => {
        return parent?.linkType !== "external"
      },
    },
    {
      name: "hasCustomTitle",
      title: "Egendefinert tittel",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "customTitle",
      title: "Egendefinert tittel",
      type: "string",
      hidden: ({ parent }) => {
        return parent?.hasCustomTitle !== true
      },
    },
  ],
  preview: {
    select: {
      linkType: "linkType",
      internalLinkTitle: "internalLink.title",
      externalLink: "externalLink",
      hasCustomTitle: "hasCustomTitle",
      customTitle: "customTitle",
    },
    prepare({
      linkType,
      internalLinkTitle,
      externalLink,
      hasCustomTitle,
      customTitle,
    }) {
      let title =
        hasCustomTitle && customTitle ? customTitle : internalLinkTitle

      let media = Link
      let subtitle = "Knapp"
      if (linkType === "external") {
        title = hasCustomTitle && customTitle ? customTitle : externalLink
        media = Link
        subtitle = "Knapp"
      }
      return {
        title,
        subtitle,
        media,
      }
    },
  },
}

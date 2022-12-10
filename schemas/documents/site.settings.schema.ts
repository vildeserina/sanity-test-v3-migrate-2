import { Link } from "phosphor-react"

import generateFigure from "../utils/generate-figure.utils.schema"

export const siteSettings = {
  name: "siteSettings",
  type: "document",
  title: "Site settings",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Sidetittel",
    },
    {
      title: "Forside",
      name: "home",
      type: "reference",
      to: [{ type: "page" }],
    },
    {
      title: "Kontaktside",
      name: "contactPage",
      type: "reference",
      to: [{ type: "page" }],
    },
    {
      title: "Hovednavigasjon",
      name: "mainNavigation",
      description: "Select pages for the top menu",
      validation: (Rule) => [
        Rule.max(7).warning("Are you sure you want more than 7 items?"),
        Rule.unique().error("You have duplicate menu items"),
      ],
      type: "array",
      of: [
        {
          title: "Link",
          icon: Link,
          type: "internalLink",
        },
      ],
    },
    {
      title: "Lenker i sidebunn",
      name: "footerNavigation",
      description: "Velg sider som skal vises i sidebunnen",
      validation: (Rule) => [
        Rule.max(7).warning("Are you sure you want more than 7 items?"),
        Rule.unique().error("You have duplicate menu items"),
      ],
      type: "array",
      of: [
        {
          title: "Link",
          icon: Link,
          type: "internalLink",
        },
      ],
    },
    generateFigure({
      title: "Standardbilde for artikler",
      description: "Vises dersom bilde mangler",
      name: "defaultImage",
      required: true,
      caption: false,
      alt: true,
    }),
  ],
}

import React from "react"

export const seoSettings = {
  title: "SEO-innstillinger",
  name: "seoSettings",
  type: "document",
  fields: [
    {
      title: "Standard metatittel-avslutning",
      name: "metaTitleEnding",
      type: "string",
      description:
        "Om metatittel blir overstyrt vil denne bli lagt til på slutten",
      validation: (Rule) =>
        Rule.max(30).warning(
          "Longer titles may be truncated by search engines"
        ),
    },
    {
      title: "Standard metabeskrivelse",
      name: "metaDesc",
      type: "text",
      rows: 3,
      validation: (Rule) =>
        Rule.max(150).warning(
          "Longer descriptions may be truncated by search engines"
        ),
    },
    // {
    //   title: "Standard delingsbeskrivelse",
    //   name: "shareDesc",
    //   type: "text",
    //   rows: 3,
    //   validation: (Rule) =>
    //     Rule.max(150).warning(
    //       "Longer descriptions may be truncated by social sites"
    //     ),
    // },
    {
      title: "Standard delingsbilde",
      name: "shareGraphic",
      type: "figure",
      description: "Anbefalt størrelse: 1200x630 (PNG eller JPG)",
    },
  ],
  preview: {
    prepare() {
      return {
        title: "Standard SEO / Share",
      }
    },
  },
}

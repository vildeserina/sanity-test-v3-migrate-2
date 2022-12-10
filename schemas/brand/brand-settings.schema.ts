export const brandSettings = {
  title: "Brand config",
  name: "brandSettings",
  type: "document",
  fields: [
    {
      title: "Title",
      type: "string",
      name: "title",
    },
    {
      title: "Subtitle",
      type: "string",
      name: "secondaryTitle",
      initialValue: "brand",
    },
    {
      title: "Logo",
      type: "image",
      name: "brandLogo",
    },
    {
      title: "Frontpage",
      name: "frontpage",
      type: "reference",
      to: [{ type: "brandGuideline" }],
    },
    {
      title: "Navigation",
      type: "array",
      name: "brandNav",
      of: [
        {
          title: "Reference",
          name: "guidelineRef",
          type: "reference",
          to: [{ type: "brandGuideline" }],
        },
      ],
    },

    {
      title: "Footer text",
      type: "simpleText",
      name: "brandFooterText",
    },
    {
      title: "Hide from search indexes / Google",
      type: "boolean",
      name: "hideSeo",
    },
  ],
}

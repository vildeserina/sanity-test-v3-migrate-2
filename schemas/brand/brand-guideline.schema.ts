export const brandGuideline = {
  title: "Brand guideline",
  name: "brandGuideline",
  type: "document",
  fieldsets: [
    {
      title: "Introduksjon",
      name: "intro",
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: [
    {
      title: "Title",
      type: "string",
      name: "title",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      validation: (Rule) => [
        Rule.required().error("Slug er påkrevd"),
        Rule.custom((slug) => {
          if (typeof slug.current === "undefined") {
            return true
          }
          return slug.current.indexOf(" ") >= 0
            ? "Slug kan ikke inneholde mellomrom"
            : true
        }).error(),
      ],
      options: {
        source: "title",
        maxLength: 96,
      },
    },
    {
      title: "Innhold",
      type: "simpleText",
      name: "introContent",
      description:
        "Kan gi en generell beskrivelse av meningen med logoen og historien bak",
    },
    {
      title: "Sidebygger",
      type: "brandBuilder",
      name: "brandBuilder",
    },
  ],
}

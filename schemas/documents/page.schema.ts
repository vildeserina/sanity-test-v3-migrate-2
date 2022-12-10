import generateFigure from "../utils/generate-figure.utils.schema"

export const page = {
  name: "page",
  type: "document",
  title: "Page",
  groups: [
    {
      title: "Grunnleggende",
      name: "general",
      default: true,
    },
    {
      title: "Sidetopp",
      name: "hero",
    },
    {
      title: "Innhold",
      name: "content",
    },
    {
      title: "Metadata / SEO",
      name: "meta",
    },
  ],
  fields: [
    {
      name: "title",
      type: "string",
      title: "Tittel",
      group: "general",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "general",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => [
        Rule.required().error("The page needs a slug"),
        Rule.custom((slug) => {
          if (typeof slug.current === "undefined") {
            return true
          }
          return slug.current.indexOf(" ") >= 0
            ? "The slug should not contain spaces"
            : true
        }).error(),
      ],
    },
    {
      title: "Introduksjon",
      type: "text",
      name: "introduction",
      description: "Brukt i forhåndsvisninger",
      group: "general",
      validation: (Rule) =>
        Rule.max(300).warning(
          "Bør ikke være mer enn 300 tegn i introduksjonen"
        ),
    },
    { title: "Sidetopp", name: "hero", type: "hero", group: "hero" },
    {
      title: "Moduler",
      name: "sections",
      type: "sections",
      group: "content",
    },
    {
      title: "Vis standard sidebunn",
      name: "showCta",
      type: "boolean",
      group: "content",
      initialValue: true,
    },
    {
      name: "seo",
      type: "seo",
      group: "meta",
      title: "Metadata / SEO",
      description: "This description populates meta-tags on the webpage",
    },
  ],
}

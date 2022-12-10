export const archiveTypes = ["article", "people", "caseStudy"]

export function generateArchivePages(archiveTypes) {
  return archiveTypes.map((type) => {
    return {
      type: "document",
      name: type + "Archive",
      title: type + "Archive",
      fields: [
        {
          type: "string",
          name: "title",
          title: "Tittel",
        },
        {
          name: "heading",
          type: "string",
          title: "Overskrift",
        },
        {
          type: "text",
          name: "introduction",
          title: "Introduksjon",
          description: "Brukes i forhåndsvisninger og i enkelte maler",
        },
        {
          type: "button",
          name: "button",
          title: "Knapp",
          description: "Brukes i personarkivet",
        },
        {
          title: "Media",
          description: "Brukes til forhåndsvisninger",
          name: "media",
          type: "media",
        },
        {
          title: "Sidebygger",
          name: "sections",
          type: "sections",
        },
        {
          title: "SEO / metadata",
          name: "seo",
          type: "seo",
        },
      ],
    }
  })
}

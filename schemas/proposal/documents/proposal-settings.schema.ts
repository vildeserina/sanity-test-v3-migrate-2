export const proposalSettings = {
  name: "proposalSettings",
  title: "Innstillinger",
  type: "document",
  fields: [
    {
      title: "Tekst i footer",
      name: "footerText",
      type: "string",
    },
    {
      title: "Fallback",
      description: "Thumbnail som vises ved deling dersom det mangler bilde",
      type: "reference",
      to: [{ type: "gradient" }],
      name: "fallbackImage",
      validation: (Rule) => Rule.required(),
    },
  ],
}

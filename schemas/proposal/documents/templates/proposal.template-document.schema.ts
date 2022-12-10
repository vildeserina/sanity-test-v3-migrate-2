export const templateDocument = {
  name: "templateDocument",
  title: "Intern mal",
  type: "document",
  templateGroups: [
    { title: "Intern beskrivelse", name: "internal" },
    { title: "Innhold", name: "content", default: true },
    { title: "Mal", name: "templateFields" },
  ],
  groups: [
    { title: "Intern beskrivelse", name: "internal" },
    { title: "Innhold", name: "content", default: true },

    { title: "Mal", name: "templateFields" },
  ],
  fieldsets: [
    { title: "Innhold", name: "content" },
    { title: "Importer fra mal", name: "importFields" },
    {
      title: "Beskrivelse",
      name: "description",
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    {
      title: "Intern tittel",
      name: "internalTitle",
      type: "string",
      group: "internal",
    },
    {
      title: "Intern beskrivelse",
      name: "internalDescription",
      type: "string",
      group: "internal",
      options: { collapsible: true, collapsed: true },
    },
    {
      title: "Tagger",
      name: "tags",
      type: "array",
      group: "internal",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    },
    {
      title: "Kategorier",
      name: "categories",
      type: "array",
      group: "internal",
      of: [{ type: "reference", to: [{ type: "proposalCategory" }] }],
    },
  ],
}

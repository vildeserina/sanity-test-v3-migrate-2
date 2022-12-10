import { Folder } from "phosphor-react"

import { caseStudy } from "./case-study.schema"

export const caseStudyTemplate = {
  name: "caseStudyTemplate",
  type: "document",
  title: "Mal for prosjekter",
  icon: Folder,
  groups: [
    {
      title: "Grunnleggende",
      name: "general",
    },
    {
      title: "Bilder",
      name: "images",
    },
    {
      title: "Innhold",
      name: "content",
      default: true,
    },
    {
      title: "Metadata / SEO",
      name: "meta",
    },
  ],
  fields: [
    {
      title: "Tittel på mal",
      name: "templateTitle",
      type: "string",
      group: "content",
    },
    ...caseStudy.fields,
  ],
  preview: {
    select: {
      title: "templateTitle",
      subtitle: "title",
    },
  },
}

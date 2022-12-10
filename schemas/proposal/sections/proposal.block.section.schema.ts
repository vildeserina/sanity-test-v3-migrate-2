import { ArticleMedium } from "phosphor-react"

import { blocks } from "../documents/templates/proposal.template.schema"
import { templateDocument } from "../documents/templates/proposal.template-document.schema"
import generateTemplate from "../utils/generate-template.proposal.schema"
import { proposalTemplateText } from "./proposal.text.section.schema"

export const proposalBlockSet = {
  name: "proposalBlockSet",
  title: "Gjenbrukbare moduler",
  type: "document",
  groups: templateDocument?.templateGroups,
  fieldsets: templateDocument?.fieldsets,
  fields: [...templateDocument?.fields, blocks],
  preview: {
    select: {
      title: "internalTitle",
      subtitle: "internalDescription",
      media: "image",
    },
    prepare({ title, subtitle }) {
      return {
        title: title ?? "",
        subtitle: subtitle ?? "",
      }
    },
  },
}

const [internalDescription, internalTitle, categories, tags, ...contentFields] =
  proposalTemplateText.fields

export const proposalBlockSection = {
  name: "proposalBlockSection",
  title: "Gjenbrukbare moduler",
  icon: ArticleMedium,
  type: "object",
  groups: templateDocument?.groups,
  fieldsets: templateDocument?.fieldsets,
  fields: [
    generateTemplate({
      fieldset: "importFields",
      group: "templateFields",
      templateType: "proposalBlockSet",
    }),
    ...contentFields,
  ],
  preview: {
    select: {
      title: "title",
      heading: "heading",
    },
    prepare({ title, heading }) {
      return {
        title: "Tekst",
        subtitle: title ?? heading ?? "",
      }
    },
  },
}

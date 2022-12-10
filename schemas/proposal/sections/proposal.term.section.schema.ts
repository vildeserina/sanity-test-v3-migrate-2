import { Check } from "phosphor-react"
import generateColorTheme from "schemas/utils/generate-color-theme.utils.schema"

import { templateDocument } from "../documents/templates/proposal.template-document.schema"
import generateTemplate from "../utils/generate-template.proposal.schema"

// 📓 TEMPLATE
export const proposalTemplateTerm = {
  name: "proposalTemplateTerm",
  title: "Vilkår",
  icon: Check,
  type: "document",
  groups: templateDocument?.templateGroups,
  fieldsets: templateDocument?.fieldsets,
  fields: [
    ...templateDocument?.fields,
    {
      title: "Tittel",
      name: "title",
      type: "string",
      group: "content",
    },
    {
      title: "Innhold",
      name: "content",
      type: "proposalPortableText",
      group: "content",
    },
    generateColorTheme({
      colorList: [
        { title: "Beige", value: "beige" },
        { title: "Svart", value: "black" },
        { title: "Gul", value: "yellow" },
        { title: "Grønn", value: "green" },
      ],
      group: "content",
      initialValue: "beige",
      hidden: ({ document }) => document?.layout == "simple",
    }),
  ],
  preview: {
    select: {
      internalTitle: "internalTitle",
      internalDescription: "internalDescription",
      title: "title",
    },
    prepare({ title, internalTitle, internalDescription }) {
      return {
        title: internalTitle ?? title ?? "Vilkår",
        subtitle:
          internalTitle && internalDescription
            ? internalDescription
            : internalTitle ?? "Vilkår",
      }
    },
  },
}

const [internalDescription, internalTitle, categories, tags, ...contentFields] =
  proposalTemplateTerm.fields

// 📃 SECTION
export const proposalTermSection = {
  name: "proposalTermSection",
  title: "Vilkår",
  icon: Check,
  type: "object",
  groups: [
    { title: "Innhold", name: "content", default: true },
    { title: "📥 Mal", name: "templateFields" },
  ],
  fieldsets: [
    { title: "Innhold", name: "content" },
    { title: "📥 Importer fra mal", name: "importFields" },
  ],
  fields: [
    generateTemplate({
      group: "templateFields",
      templateType: "proposalTemplateTerm",
      hidden: ({ parent }) =>
        !parent?.title || parent?.isAccepted?.current == true,
    }),
    ...contentFields,
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: "Vilkår",
        subtitle: title ?? "",
      }
    },
  },
}

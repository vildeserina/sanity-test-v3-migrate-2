import { truncate } from "lib/utils/string-utils"
import { Quotes } from "phosphor-react"
import generateColorTheme from "schemas/utils/generate-color-theme.utils.schema"

import ProposalPreviewComponent from "../../utils/proposal-preview.utils"
import { templateDocument } from "../documents/templates/proposal.template-document.schema"

// 📓 TEMPLATE
export const proposalTemplateTestimonial = {
  name: "proposalTemplateTestimonial",
  title: "Sitater",
  icon: Quotes,
  type: "document",
  groups: templateDocument?.templateGroups,
  fieldsets: templateDocument?.fieldsets,
  fields: [
    ...templateDocument?.fields,
    {
      title: "Størrelse på sitater",
      name: "layout",
      type: "string",
      group: "content",
      options: {
        list: [
          { title: "Stor", value: "lg" },
          { title: "Små", value: "sm" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      initialValue: "lg",
    },
    {
      title: "Tittel",
      name: "title",
      type: "string",
      group: "content",
      hidden: ({ parent }) => parent?.layout !== "sm",
    },
    {
      title: "Kort introduksjon",
      name: "text",
      type: "text",
      group: "content",
      hidden: ({ parent }) => parent?.layout !== "sm",
    },
    {
      title: "Sitater",
      name: "quotes",
      type: "array",
      group: "content",
      of: [{ name: "quote", type: "reference", to: [{ type: "quote" }] }],
    },
    generateColorTheme({
      colorList: [
        { title: "Beige", value: "beige" },
        { title: "Svart", value: "black" },
        { title: "Gul", value: "yellow" },
        { title: "Grønn", value: "green" },
      ],
      group: "content",
      initialValue: "green",
      hidden: ({ document }) => document?.layout == "simple",
    }),
  ],
  preview: {
    select: {
      title: "title",
      layout: "layout",
    },
    prepare({ title, layout }) {
      return {
        title: title ? "Sitater: " + title : "Sitater",
        subtitle: `${layout == "sm" ? "Små" : "Store"}`,
      }
    },
  },
}

const [internalDescription, internalTitle, categories, tags, ...contentFields] =
  proposalTemplateTestimonial.fields

// 📃 SECTION
export const proposalTestimonialSection = {
  name: "proposalTestimonialSection",
  title: "Sitater",
  icon: Quotes,
  type: "object",
  groups: templateDocument?.groups,
  fieldsets: templateDocument?.fieldsets,
  fields: [...contentFields],
  preview: {
    select: {
      title: "title",
      layout: "layout",
      text: "text",
    },
    prepare({ title, layout, text }) {
      return {
        title: title,
        layout: `${layout == "sm" ? "Små" : "Store"}`,
        section: "Sitater",
        subtitle: text ? truncate(text, 40) : null,
      }
    },
    components: { preview: ProposalPreviewComponent },
  },
}

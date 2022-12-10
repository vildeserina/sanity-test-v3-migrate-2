import { createSingleString } from "lib/utils/string-utils"
import { ArticleMedium } from "phosphor-react"
import generateColorTheme from "schemas/utils/generate-color-theme.utils.schema"

import ProposalPreviewComponent from "../../utils/proposal-preview.utils"
import { templateDocument } from "../documents/templates/proposal.template-document.schema"

export const proposalTemplateCase = {
  name: "proposalTemplateCase",
  title: "Kundecaser",
  type: "document",
  groups: templateDocument?.templateGroups,
  fieldsets: templateDocument?.fieldsets,
  fields: [
    ...templateDocument?.fields,
    {
      title: "Overskrift",
      name: "heading",
      type: "string",
    },
    {
      title: "Vis filtere",
      name: "showFilters",
      type: "boolean",
    },
    {
      title: "Vis 'Se alle'-knapp",
      name: "seeAllButton",
      type: "boolean",
    },
    generateColorTheme({
      colorList: [
        { title: "Beige", value: "beige" },
        { title: "Svart", value: "black" },
        { title: "Gul", value: "yellow" },
        { title: "Grønn", value: "green" },
      ],
      initialValue: "black",
      hidden: ({ document }) => document?.layout == "simple",
    }),
    {
      title: "Kundecaser",
      name: "cases",
      type: "array",
      of: [
        {
          title: "Casereferanse",
          name: "caseRef",
          type: "reference",
          to: [{ type: "caseStudy" }],
        },
      ],
    },
  ],
}

const [internalDescription, internalTitle, categories, tags, ...contentFields] =
  proposalTemplateCase.fields

export const proposalCaseSection = {
  name: "proposalCaseSection",
  title: "Kundecase",
  icon: ArticleMedium,
  type: "object",
  groups: [
    { title: "Innhold", name: "content", default: true },
    { title: "📥 Mal", name: "templateFields" },
  ],
  fieldsets: [
    { title: "Innhold", name: "content" },
    { title: "📥 Importer fra mal", name: "importFields" },
  ],
  fields: [...contentFields],
  preview: {
    select: {
      title: "heading",
      bgColor: "colorTheme",
      case1: "cases.0.title",
      case2: "cases.1.title",
      case3: "cases.2.title",
      case4: "cases.3.title",
    },
    prepare({ title, bgColor, case1, case2, case3, case4 }) {
      const subtitle = createSingleString([case1, case2, case3], case4)

      return {
        title: title,
        subtitle: subtitle,
        section: "Kundecaser",
        bgColor: bgColor,
      }
    },
    components: { preview: ProposalPreviewComponent },
  },
}

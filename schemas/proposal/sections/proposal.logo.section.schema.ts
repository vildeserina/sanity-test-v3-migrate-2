import { createSingleString } from "lib/utils/string-utils"
import { SquaresFour } from "phosphor-react"
import generateColorTheme from "schemas/utils/generate-color-theme.utils.schema"

import ProposalPreviewComponent from "../../utils/proposal-preview.utils"
import { templateDocument } from "../documents/templates/proposal.template-document.schema"

// 📓 TEMPLATE
export const proposalTemplateLogos = {
  name: "proposalTemplateLogos",
  title: "Logogalleri",
  icon: SquaresFour,
  type: "document",
  groups: templateDocument?.templateGroups,
  fieldsets: templateDocument?.fieldsets,
  fields: [
    ...templateDocument?.fields,
    { title: "Tittel", name: "title", type: "string", group: "content" },
    {
      title: "Logoer",
      description: "(Bare kunder med opplastede logoer vises)",
      name: "customers",
      type: "array",
      group: "content",
      of: [
        {
          name: "customer",
          type: "reference",
          to: [{ type: "customer" }],
          options: {
            filter: "defined(logo)",
          },
        },
      ],
    },
    generateColorTheme({
      colorList: [
        { title: "Beige", value: "beige" },
        { title: "Svart", value: "black" },
        { title: "Gul", value: "yellow" },
        { title: "Grønn", value: "green" },
      ],
      group: "content",
      initialValue: "black",
      hidden: ({ document }) => document?.layout == "simple",
    }),
  ],
  preview: {
    select: {
      title: "internalTitle",
      description: "internalDescription",
    },
    prepare({ title, description }) {
      return {
        title: title ?? description ?? "Bildegalleri",
        subtitle: title && description && description,
      }
    },
  },
}

const [internalDescription, internalTitle, categories, tags, ...contentFields] =
  proposalTemplateLogos.fields

// 📃 SECTION
export const proposalLogoSection = {
  name: "proposalLogoSection",
  title: "Logogalleri",
  icon: SquaresFour,
  type: "document",
  groups: proposalTemplateLogos?.groups,
  fieldsets: proposalTemplateLogos?.fieldsets,
  fields: [...contentFields],
  preview: {
    select: {
      title: "title",
      logos: "logos",
      logo0: "customers.0.title",
      logo1: "customers.1.title",
      logo2: "customers.2.title",
      logo3: "customers.3.title",
      colorTheme: "colorTheme",
    },
    prepare({ title, colorTheme, logos, logo0, logo1, logo2, logo3 }) {
      const subtitle = createSingleString([logo0, logo1, logo2], logo3) ?? null

      return {
        heading: title ?? "Logogalleri",
        subtitle: subtitle,
        section: "Logogalleri",
        bgColor: colorTheme,
      }
    },
    components: { preview: ProposalPreviewComponent },
  },
}

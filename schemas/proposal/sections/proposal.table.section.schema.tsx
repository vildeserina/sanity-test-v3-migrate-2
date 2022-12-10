import TableComponent from "components/studio/table/table.component"
import TablePreview from "components/studio/table/table-preview.component"
import { Table } from "phosphor-react"
import generateColorTheme from "schemas/utils/generate-color-theme.utils.schema"

import ProposalPreviewComponent from "../../utils/proposal-preview.utils"
import { templateDocument } from "../documents/templates/proposal.template-document.schema"
import generateCreateTemplate from "../utils/generate-create-template.utils.schema"
import generateTemplate from "../utils/generate-template.proposal.schema"

// 📓 TEMPLATE
export const proposalTemplateTable = {
  name: "proposalTemplateTable",
  title: "Enkel tabell",
  type: "document",
  icon: Table,
  groups: templateDocument?.templateGroups,
  fieldsets: templateDocument?.fieldsets,
  fields: [
    ...templateDocument?.fields,
    {
      title: "Tag",
      name: "tag",
      type: "string",
      group: "content",
      fieldset: "description",
    },
    {
      title: "Stor overskrift",
      name: "heading",
      type: "string",
      group: "content",
      fieldset: "description",
    },
    {
      title: "Innhold",
      name: "content",
      type: "proposalPortableText",
      group: "content",
      fieldset: "description",
    },

    {
      title: "Tabelltittel",
      name: "title",
      type: "string",
      group: "content",
    },
    {
      title: "Tabell",
      name: "table",
      group: "content",
      type: "object",
      fields: [
        {
          name: "rows",
          type: "array",
          of: [
            {
              type: "tableRow",
            },
          ],
        },
        {
          title: "Bruk første rad som overskrift",
          name: "useFirstRowAsHeader",
          type: "boolean",
          initialValue: false,
        },
      ],
      components: { field: TableComponent },
      preview: {
        select: {
          rows: "rows",
          useFirstRowAsHeader: "useFirstRowAsHeader",
        },
        prepare: ({ rows, useFirstRowAsHeader }) => ({
          title: "Table",
          media: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 25 25"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
            >
              <path d="M3 3h18v18H3zM21 9H3M21 15H3M12 3v18" />
            </svg>
          ),
          extendedPreview: (
            <TablePreview
              rows={rows || []}
              enableHeader={useFirstRowAsHeader}
            />
          ),
        }),
      },
    },
    generateColorTheme({
      colorList: [
        { title: "Beige", value: "beige" },
        { title: "Svart", value: "black" },
        { title: "Gul", value: "yellow" },
        { title: "Grønn", value: "green" },
      ],
      fieldset: "description",
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
        title: internalTitle ?? title ?? "Tabell",
        subtitle:
          internalTitle && internalDescription
            ? internalDescription
            : internalTitle ?? "Tabell",
      }
    },
  },
}

const [internalDescription, internalTitle, categories, tags, ...contentFields] =
  proposalTemplateTable.fields

// 📃 SECTION

export const proposalTableSection = {
  name: "proposalTableSection",
  title: "Enkel tabell",
  type: "object",
  icon: Table,
  groups: [
    { title: "Innhold", name: "content", default: true },
    { title: "📥 Mal", name: "templateFields" },
  ],
  fieldsets: [
    { title: "Innhold", name: "content" },
    { title: "📥 Importer fra mal", name: "importFields" },
    {
      title: "Beskrivelse",
      name: "description",
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    generateTemplate({
      fieldset: "importFields",
      group: "templateFields",
      templateType: "proposalTemplateTable",
    }),
    generateCreateTemplate({
      title: "Lag mal",
      group: "templateFields",
      templateType: "proposalTemplateTable",
    }),
    ...contentFields,
  ],
  preview: {
    select: {
      title: "title",
      tag: "tag",
      heading: "heading",
      colorTheme: "colorTheme",
    },
    prepare({ title, heading, tag, colorTheme }) {
      return {
        section: "Tabell",
        title: title
          ? title
          : heading && tag
          ? `${tag} – ${heading}`
          : heading ?? tag ?? "Tabell",
        bgColor: colorTheme,
      }
    },
    components: { preview: ProposalPreviewComponent },
  },
}

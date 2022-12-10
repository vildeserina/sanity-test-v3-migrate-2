import { portableToString, truncate } from "lib/utils/string-utils"
import { ArticleMedium } from "phosphor-react"
import React from "react"
import generateColorTheme from "schemas/utils/generate-color-theme.utils.schema"

import ProposalPreviewComponent from "../../utils/proposal-preview.utils"
import { templateDocument } from "../documents/templates/proposal.template-document.schema"
import generateTemplate from "../utils/generate-template.proposal.schema"

export const textLayoutList = [
  { title: "Bred enkeltkolonne", value: "singleCol" },
  { title: "To kolonner", value: "twoCols" },
  { title: "Venstrestilt", value: "leftCol" },
  { title: "Høyrestilt", value: "rightCol" },
]

// 📓 TEMPLATE
export const proposalTemplateText = {
  name: "proposalTemplateText",
  title: "Tekster",
  icon: ArticleMedium,
  type: "document",
  groups: templateDocument?.templateGroups,
  fieldsets: templateDocument?.fieldsets,
  fields: [
    ...templateDocument?.fields,
    {
      title: "Layout",
      name: "layout",
      type: "string",
      group: "content",
      initialValue: "singleCol",
      options: {
        list: textLayoutList,
        layout: "radio",
        direction: "horizontal",
      },
      hidden: ({ document }) => document?.layout == "simple",
    },
    { title: "Tag", name: "title", type: "string", group: "content" },
    {
      title: "Stor overskrift",
      name: "heading",
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
      heading: "heading",
    },
    prepare({ title, heading, internalTitle, internalDescription }) {
      return {
        title: internalTitle ?? title ?? heading ?? "Tekst",
        subtitle:
          internalTitle && internalDescription
            ? internalDescription
            : internalTitle ?? heading ?? "Tekst",
      }
    },
  },
}

const [internalDescription, internalTitle, categories, tags, ...contentFields] =
  proposalTemplateText.fields

// 📃 SECTION
export const proposalTextSection = {
  name: "proposalTextSection",
  title: "Tekst",
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
  fields: [
    generateTemplate({
      fieldset: "importFields",
      group: "templateFields",
      templateType: "proposalTemplateText",
    }),
    ...contentFields,
  ],
  preview: {
    select: {
      tag: "title",
      heading: "heading",
      layout: "layout",
      bgColor: "colorTheme",
      content: "content",
    },
    prepare({ tag, heading, layout, bgColor, content }) {
      const layoutTitle =
        layout && textLayoutList?.find((item) => item?.value == layout)

      // const subtitle = content ? content[0]?.children[0]?.text : ""

      const plainText = content ? portableToString(content) : null
      // const subtitle =
      //   plainText?.length > 2 ? plainText.slice(0, 40) + "..." : null

      const subtitle = plainText?.length > 2 ? truncate(plainText, 40) : null

      return {
        title:
          heading && tag ? `${tag} – ${heading}` : heading ?? tag ?? "Tekst",
        section: "Tekst",
        layout: layoutTitle?.title,
        bgColor: bgColor,
        subtitle: subtitle,
      }
    },
    components: { preview: ProposalPreviewComponent },
  },
}

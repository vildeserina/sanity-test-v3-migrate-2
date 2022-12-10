import { ClipboardText } from "phosphor-react"

import generateCreateTemplate from "../../utils/generate-create-template.utils.schema"
import generateTemplate from "../../utils/generate-template.proposal.schema"
import { templateDocument } from "./proposal.template-document.schema"

export const blocks = {
  title: "Moduler",
  name: "blocks",
  type: "array",
  group: "content",
  of: [
    { type: "proposalTextSection" },
    { type: "proposalGallerySection" },
    { type: "proposalShortcutSection" },
    { type: "proposalTestimonialSection" },
    { type: "proposalLogoSection" },
    { type: "proposalCaseSection" },
    { type: "proposalTableSection" },
  ],
}

export const proposalGroups = [
  { title: "Kategorier", name: "categories" },
  { title: "Intro", name: "hero" },
  { title: "Innhold", name: "content" },
  { title: "Aksept", name: "accept" },
  { title: "📥 Mal", name: "templateGroup" },
]

export const proposalTemplate = {
  name: "proposalTemplate",
  title: "Tilbudsmal",
  type: "document",
  icon: ClipboardText,

  initialValue: { introContent: { title: "Om tilbudet" } },
  groups: [
    { title: "ℹ️ Internt", name: "internal", default: true },
    { title: "Grunnleggende", name: "basic" },
    ...proposalGroups,
  ],

  fields: [
    ...templateDocument?.fields,
    { title: "Tittel", name: "title", type: "string", group: "basic" },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "basic",
      options: {
        source: "_id",
        maxLength: 96,
      },
      validation: (Rule) => [
        Rule.required().error("The page needs a slug"),
        Rule.custom((slug) => {
          if (typeof slug.current === "undefined") {
            return true
          }
          return slug.current.indexOf(" ") >= 0
            ? "The slug should not contain spaces"
            : true
        }).error(),
      ],
    },

    { title: "Overskrift", name: "heading", type: "string", group: "hero" },
    {
      title: "Ingress",
      name: "intro",
      type: "string",
      group: "hero",
      options: { collapsible: true, collapsed: true },
    },

    {
      title: "Vis snarveier",
      name: "showShortcuts",
      type: "boolean",
      group: "hero",
      initialValue: true,
    },
    {
      title: "Fargetema på snarveier",
      name: "shortcutTheme",
      type: "string",
      group: "hero",
      options: {
        list: [
          { title: "Mørk", value: "negative" },
          { title: "Lys", value: "positive" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      initialValue: "negative",
      hidden: ({ document }) =>
        document.showShortcuts !== true || document?.layout == "simple",
    },
    {
      title: "Introduksjon",
      name: "introContent",
      type: "object",
      group: "hero",
      fields: [
        { title: "Tittel", name: "title", type: "string" },
        { title: "Innhold", name: "content", type: "proposalPortableText" },
      ],
    },
    {
      title: "Bakgrunnsbilde",
      type: "proposalMedia",
      name: "media",
      group: "hero",
      options: { collapsible: true, collapsed: true },
      hidden: ({ parent }) => parent?.layout === "simple",
      initialValue: { type: "gradient" },
    },

    generateTemplate({
      hidden: ({ parent }) =>
        !parent?.title || parent?.isAccepted?.current == true,
      group: "templateGroup",
      templateType: "proposalTemplate",
      title: "Importer innhold fra mal",
    }),
    {
      title: "Layout",
      name: "layout",
      group: "basic",
      type: "string",
      initialValue: "simple",
      options: {
        list: [
          { title: "Enkel", value: "simple" },
          { title: "Utvidet", value: "full" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
    },
    blocks,
    generateTemplate({
      title: "Hent fra modulsett",
      name: "addBlockSets",
      group: "content",
      templateType: "proposalBlockSet",
    }),
    generateCreateTemplate({
      title: "Lagre moduler som mal",
      templateType: "proposalBlockSet",
      sourceType: "blocks",
      group: "content",
    }),
    {
      title: "Godkjenn tilbud",
      type: "object",
      name: "acceptOffer",
      group: "accept",
      fields: [
        {
          title: "Overskrift",
          name: "heading",
          type: "string",
          initialValue: "Aksepter tilbudet",
        },
        {
          title: "Tekst",
          name: "text",
          type: "string",
          initialValue:
            "Godkjenn tilbudet ved å sende mail, eller trykke på knappen under.",
        },
        {
          title: "Skjul",
          name: "isHidden",
          type: "boolean",
          initialValue: false,
        },
      ],
    },
    {
      title: "Vilkår",
      name: "terms",
      type: "proposalTermSection",
      group: "accept",
    },
  ],
  preview: {
    select: {
      title: "title",
      internalTitle: "internalTitle",
      internalDescription: "internalDescription",
      media: "media",
    },
    prepare({ title, internalTitle, internalDescription, media }) {
      const mediaType = media && media?.type ? media?.type : null

      const image =
        mediaType == "gradient"
          ? media?.gradient?.image
          : mediaType == "image"
          ? media?.image
          : null

      return {
        title: `${internalTitle ?? title}`,
        subtitle: internalDescription
          ? internalDescription
          : !internalDescription && internalTitle && title
          ? title
          : "",
        media: image,
      }
    },
  },
}

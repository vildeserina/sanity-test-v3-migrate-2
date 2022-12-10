import { ImageSquare } from "phosphor-react"
import { gallerySection } from "schemas/sections/gallery.section.schema"

import ProposalPreviewComponent from "../../utils/proposal-preview.utils"
import { templateDocument } from "../documents/templates/proposal.template-document.schema"
import generateTemplate from "../utils/generate-template.proposal.schema"

export const proposalTemplateGallery = {
  name: "proposalTemplateGallery",
  title: "Bildegalleri",
  icon: ImageSquare,
  type: "document",
  groups: templateDocument?.templateGroups,
  fieldsets: templateDocument?.fieldsets,
  fields: [...templateDocument?.fields, ...gallerySection.fields],
  preview: {
    select: {
      title: "internalTitle",
      description: "internalDescription",
      topColor: "topColor",
      bottomColor: "bottomColor",
    },
    prepare({ title, topColor, bottomColor, description }) {
      return {
        title: title ?? description ?? "Bildegalleri",
        subtitle:
          title && description ? description : `${topColor} | ${bottomColor}`,
      }
    },
  },
}

const [internalDescription, internalTitle, categories, tags, ...contentFields] =
  proposalTemplateGallery.fields

export const proposalGallerySection = {
  name: "proposalGallerySection",
  title: "Bildegalleri",
  icon: ImageSquare,
  type: "object",
  groups: proposalTemplateGallery?.groups,
  fieldsets: proposalTemplateGallery?.fieldsets,
  fields: [
    generateTemplate({
      fieldset: "importFields",
      group: "templateFields",
      templateType: "proposalTemplateGallery",
    }),
    ...contentFields,
  ],
  preview: {
    select: {
      topColor: "topColor",
      bottomColor: "bottomColor",
      media: "imageGallery.0.image",
    },
    prepare({ topColor, bottomColor, media }) {
      return {
        title: `Bildegalleri`,
        media: media ?? null,
        section: "Bildegalleri",
        bgColor: topColor,
        secondaryColor: bottomColor,
      }
    },
    components: { preview: ProposalPreviewComponent },
  },
}

// bgColor: `${defaultColorList[topColor].title} | ${defaultColorList[bottomColor].title} `,

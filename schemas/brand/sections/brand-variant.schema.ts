import { Lightbulb } from "phosphor-react"

export const brandVariant = {
  name: "brandVariant",
  title: "Variantgalleri",
  type: "object",
  icon: Lightbulb,
  fields: [
    {
      title: "Tittel",
      name: "title",
      type: "string",
    },
    {
      title: "Varianter",
      name: "variants",
      type: "array",
      of: [
        {
          title: "Variant",
          name: "variant",
          type: "object",
          fieldsets: [
            {
              title: "Nedlasting",
              name: "download",
            },
            {
              title: "Innhold",
              name: "content",
            },
          ],
          fields: [
            {
              name: "image",
              title: "Bilde",
              type: "brandImage",
            },
            {
              name: "variantType",
              title: "Type",
              type: "string",
              options: {
                list: [
                  { title: "Standard", value: "standard" },
                  { title: "Unngå", value: "avoid" },
                  { title: "Positiv", value: "positive" },
                ],
                layout: "radio",
                direction: "horizontal",
              },
              initialValue: "standard",
              fieldset: "content",
            },
            {
              name: "title",
              title: "Tittel",
              type: "string",
              fieldset: "content",
            },
            {
              name: "description",
              title: "Beskrivelse",
              type: "text",
              fieldset: "content",
              rows: 2,
            },
            {
              title: "Nedlastingslenker",
              type: "array",
              name: "downloadLinks",
              of: [
                {
                  title: "Fil",
                  name: "fileObject",
                  type: "object",
                  fields: [
                    {
                      name: "linkType",
                      title: "Type fil",
                      type: "string",
                      options: {
                        list: [
                          {
                            title: "Lenke til ekstern fil",
                            value: "externalFile",
                          },
                          {
                            title: "Fil",
                            value: "fileDownload",
                          },
                          {
                            title: "Fra media biblioteket",
                            value: "originalDownload",
                          },
                        ],
                        layout: "radio",
                        direction: "horizontal",
                      },
                      initialValue: "externalFile",
                    },
                    {
                      title: "Fra media biblioteket",
                      name: "mediaFile",
                      type: "image",
                      hidden: ({ parent }) => {
                        return parent?.linkType !== "originalDownload"
                      },
                    },
                    {
                      title: "Hovedtittel / filtype",
                      name: "fileType",
                      type: "string",
                    },
                    {
                      title: "Sekundærtittel",
                      description: "Kan f.eks. være format eller fargevariant",
                      name: "comment",
                      type: "string",
                    },

                    {
                      title: "Lenke",
                      name: "downloadUrl",
                      type: "url",

                      hidden: ({ parent }) => {
                        return parent?.linkType !== "externalFile"
                      },
                    },
                    {
                      title: "Fil",
                      name: "file",
                      type: "file",
                      initialValue: "Last ned",

                      hidden: ({ parent }) => {
                        return parent?.linkType !== "fileDownload"
                      },
                    },
                  ],
                  preview: {
                    select: {
                      fileTitle: "fileType",
                      subtitle: "linkType",
                      media: "mediaFile",
                      comment: "comment",
                    },
                    prepare: ({ comment, subtitle, fileTitle, media }) => {
                      const title =
                        comment && fileTitle
                          ? fileTitle + " " + comment
                          : fileTitle
                          ? fileTitle
                          : subtitle
                      return {
                        title,
                        subtitle,
                        media,
                      }
                    },
                  },
                },
              ],
            },
          ],
          preview: {
            select: {
              variantTitle: "title",
              media: "image",
            },
            prepare: ({ variantTitle, media }) => {
              const title = variantTitle ?? "Variant"
              return {
                title,
                media,
              }
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      variantTitle: "title",
      media: "variants[0].image",
    },
    prepare: ({ variantTitle, media }) => {
      const title = variantTitle ?? "Varianter"
      const subtitle = "Varianter"
      return {
        title,
        media,
        subtitle,
      }
    },
  },
}

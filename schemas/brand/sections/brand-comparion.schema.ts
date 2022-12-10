import { ThumbsUp } from "phosphor-react"

export const brandComparison = {
  name: "brandComparison",
  title: "Riktig og feil",
  type: "object",
  icon: ThumbsUp,
  fields: [
    {
      title: "Sammenligning",
      name: "variants",
      type: "array",
      of: [
        {
          title: "Variant",
          name: "variant",
          type: "object",
          fieldsets: [{ title: "Riktig", name: "correct" }],
          fields: [
            {
              name: "image",
              title: "Bilde",
              type: "image",
              fieldset: "correct",
            },
            {
              name: "title",
              title: "Tittel",
              type: "string",
            },
            {
              name: "description",
              title: "Beskrivelse",
              description:
                "Fyll ut dersom det trengs en ekstra forklaring på når variant skal brukes. Kan stå tom",
              type: "text",
            },
            {
              name: "externalLink",
              title: "URL for å laste ned",
              type: "externalLink",
            },
          ],
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
      return {
        title,
        media,
      }
    },
  },
}

const crops = [
  { title: "Original", value: "0" },
  { title: "1 : 1 (square)", value: "1" },
  { title: "Medium", value: "medium" },
  { title: "Vertical", value: "vertical" },
  { title: "Horizontal", value: "horizontal" },
]

const sizes = [
  { title: "Halv – 1/2", value: "half" },
  { title: "Maks – 1/1", value: "max" },
]

export default function generateFigure({
  alt = true,
  caption = true,
  name = "figure",
  hidden = false,
  group,
  title,
  size = false,
  required,
  description,
}: {
  alt?: boolean
  caption?: boolean
  name?: string
  hidden?: boolean | ((props: any) => boolean)
  group?: string
  title?: string
  size?: boolean
  required?: boolean
  description?: string
}) {
  const groupType = group && { group: group }
  // const hiddenType = hidden && { hidden: hidden }
  const descriptionType = description && { description: description }

  return {
    name: name,
    title: title ?? "Bilde",
    type: "image",
    options: {
      hotspot: true,
    },
    // ...(hiddenType && hiddenType),
    ...(groupType && groupType),
    ...(descriptionType && descriptionType),
    ...(required && { validation: (Rule) => Rule.required() }),
    fields: [
      { type: "string", name: "hidden", hidden: true },
      ...(caption
        ? [
            {
              title: "Bildetekst",
              name: "caption",
              type: "string",
            },
          ]
        : []),
      ...(alt
        ? [
            {
              name: "alt",
              type: "string",
              title: "Alternativ tekst",
              // validation: (Rule) =>
              //   Rule.custom((field, { parent }) => {
              //     if (parent?.decorative || (field && field.length > 0)) {
              //       return true
              //     }

              //     return "Alt tekst er påkrevd med mindre motivet er 100% dekorativt."
              //   }),
            },
            {
              title: "100% dekorativt bilde",
              name: "decorative",
              type: "boolean",
            },
          ]
        : []),
      ...(size
        ? [
            {
              name: "size",
              type: "string",
              title: "Størrelse",
              options: {
                list: sizes,
              },
              initialValue: "half",
            },
          ]
        : []),
    ],
    preview: {
      select: {
        alt: "alt",
        caption: "caption",
        media: "image",
        imageUrl: "asset.url",
        size: "size",
      },
      prepare({ alt, caption, imageUrl, size }) {
        const sizeTitle = sizes?.find((item) => item?.value == size)
        return {
          title: alt ?? caption ?? "Mangler alt-tekst",
          subtitle: sizeTitle?.title ?? "",
          imageUrl: imageUrl,
        }
      },
    },
  }
}

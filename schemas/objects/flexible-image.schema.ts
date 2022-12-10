// This image can be used with crop and hotspot with "Sanity Next Image", it also has different options for aspect ratios. Perfect to use in portableText

const crops = [
  { title: 'Original', value: '0' },
  { title: '1 : 1 (square)', value: '1' },
  { title: 'Medium', value: 'medium' },
  { title: 'Vertical', value: 'vertical' },
  { title: 'Horizontal', value: 'horizontal' },
]

export const flexibleImage = {
  name: 'flexibleImage',
  title: 'Image',
  type: 'image',
  options: {
    hotspot: true,
  },
  fields: [
    {
      title: 'Format (aspect ratio)',
      name: 'customRatio',
      type: 'string',
      options: {
        list: crops,
      },
      initialValue: '0',
    },
    {
      title: 'Caption',
      name: 'caption',
      type: 'string',
    },
    {
      name: 'alt',
      type: 'string',
      title: 'Alternative text',
      description:
        'Describe the content of the image. Important for SEO and accessiblity.',

      validation: (Rule) =>
        Rule.custom((field, { parent }) => {
          if (
            !parent?.image ||
            parent?.decorative ||
            (field && field.length > 0)
          ) {
            return true
          }

          return 'Alt tekst er påkrevd med mindre motivet er 100% dekorativt.'
        }),
    },
    {
      title: 'Purely decorative image?',
      name: 'decorative',
      type: 'boolean',
    },
  ],
  preview: {
    select: {
      title: 'caption',
      imageUrl: 'asset.url',
      alt: 'alt',
      caption: 'caption',
    },

    prepare({ imageUrl, alt, caption }) {
      return {
        title: 'Image',
        subtitle: alt || caption,
        imageUrl: imageUrl,
      }
    },
  },
}

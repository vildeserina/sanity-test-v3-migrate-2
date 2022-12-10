export const figure = {
  name: 'figure',
  title: 'Image',
  type: 'image',
  options: {
    hotspot: true,
  },
  fields: [
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
          if (!parent?.figure) return true

          if (parent?.decorative || (field && field.length > 0)) {
            return true
          }

          return 'Alt text is required unless the image is purely decorative.'
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
      imageUrl: 'asset.url',
      title: 'caption',
    },
  },
}

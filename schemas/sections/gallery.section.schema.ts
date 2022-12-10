import { Image } from 'phosphor-react'

import generateColorTheme from '../utils/generate-color-theme.utils.schema'
import generateFigure from '../utils/generate-figure.utils.schema'

export const gallerySection = {
  type: 'object',
  name: 'gallerySection',
  title: 'Bildegalleri',
  icon: Image,
  groups: [{ title: 'Innhold', name: 'content' }],
  fields: [
    generateColorTheme({
      title: 'Farge øverst',
      name: 'topColor',
      group: 'content',
      colorList: [
        { title: 'Beige', value: 'beige' },
        { title: 'Svart', value: 'black' },
        { title: 'Gul', value: 'yellow' },
        { title: 'Grønn', value: 'green' },
      ],
      hidden: ({ document }) =>
        document?.layout == 'simple' &&
        (document?._type == 'proposal' ||
          document?._type == 'proposalTemplate'),
    }),
    generateColorTheme({
      title: 'Farge nederst',
      name: 'bottomColor',
      group: 'content',
      colorList: [
        { title: 'Beige', value: 'beige' },
        { title: 'Svart', value: 'black' },
        { title: 'Gul', value: 'yellow' },
        { title: 'Grønn', value: 'green' },
      ],
      hidden: ({ document }) =>
        document?.layout == 'simple' &&
        (document?._type == 'proposal' ||
          document?._type == 'proposalTemplate'),
    }),
    {
      title: 'Bildegalleri',
      type: 'array',
      name: 'imageGallery',
      group: 'content',
      of: [generateFigure({ caption: true, size: true })],
    },
    {
      title: 'Animasjon',
      name: 'animationOn',
      type: 'boolean',
      initialValue: true,
    },
  ],
  preview: {
    select: {
      topColor: 'topColor',
      bottomColor: 'bottomColor',
      media: 'imageGallery.0.image',
    },
    prepare({ topColor, bottomColor, media }) {
      return {
        title: `Bildegalleri`,
        subtitle: `Topp: ${topColor} | Bunnfarge: ${bottomColor} `,
        media: media ?? null,
      }
    },
  },
}

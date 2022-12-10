import { Cards } from 'phosphor-react'

import generateFigure from '../utils/generate-figure.utils.schema'

export const cardSection = {
  type: 'object',
  name: 'cardSection',
  title: 'Fremhevede lenker',
  icon: Cards,
  fields: [
    {
      title: 'Overskrift',
      name: 'heading',
      type: 'string',
    },
    {
      title: 'Cards',
      name: 'cards',
      type: 'array',
      of: [
        {
          title: 'Referanse til side',
          name: 'pageRef',
          type: 'internalLink',
        },
        {
          title: 'Legg til manuelt',
          name: 'manualCard',
          type: 'object',
          fields: [
            {
              title: 'Tittel',
              name: 'title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              title: 'Kort beskrivelse',
              name: 'description',
              type: 'text',
            },
            {
              title: 'Media',
              name: 'media',
              type: 'media',
            },
            {
              title: 'Lenke',
              name: 'internalLink',
              type: 'internalLink',
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'title',
              media: 'media.image',
            },
            prepare({ media, title }) {
              return {
                title: title,
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
      title: 'heading',
    },
    prepare({ title }) {
      return {
        title: `Fremhevede lenker`,
        subtitle: title ?? '',
      }
    },
  },
}

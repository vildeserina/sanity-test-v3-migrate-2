import { ChartBar } from 'phosphor-react'

export const statsSection = {
  type: 'object',
  name: 'statsSection',
  title: 'Stats',
  icon: ChartBar,
  fields: [
    {
      title: 'Overskrift',
      name: 'heading',
      type: 'string',
    },
    {
      title: 'Statistikk',
      name: 'stats',
      type: 'array',
      of: [
        {
          title: 'Seksjon',
          name: 'item',
          type: 'object',
          fields: [
            {
              title: 'Tittel',
              type: 'string',
              name: 'heading',
            },
            { title: 'Undertekst', type: 'string', name: 'subtitle' },
          ],
          preview: {
            select: {
              title: 'heading',
              subtitle: 'subtitle',
            },
            prepare({ title, subtitle }) {
              return {
                title: `${title}`,
                subtitle: `${subtitle}`,
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
        title: `Stats`,
        subtitle: title,
      }
    },
  },
}

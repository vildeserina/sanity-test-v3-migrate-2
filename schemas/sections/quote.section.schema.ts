import { Quotes } from 'phosphor-react'

export const quoteSection = {
  type: 'object',
  name: 'quoteSection',
  title: 'Sitater',
  icon: Quotes,
  fields: [
    {
      title: 'Overskrift',
      description: 'Kun for skjermlesere, er usynlig rent visuelt',
      name: 'heading',
      type: 'string',
      initialValue: 'Sitat',
    },
    {
      title: 'Sitat',
      name: 'quote',
      type: 'reference',
      to: [{ type: 'quote' }],
    },
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare({ title }) {
      return {
        title: `Sitater`,
        subtitle: title,
      }
    },
  },
}

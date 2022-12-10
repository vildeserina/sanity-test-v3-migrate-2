import { Megaphone } from 'phosphor-react'

export const bannerSection = {
  type: 'object',
  name: 'bannerSection',
  title: 'Bildebanner',
  icon: Megaphone,
  fields: [
    {
      title: 'Layout',
      name: 'layout',
      type: 'string',
      options: {
        list: [
          { title: 'Kun bilde', value: 'image' },
          { title: 'Bilde og tekst', value: 'full' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    },
    {
      title: 'Bakgrunn',
      name: 'media',
      type: 'media',
      validation: (Rule) =>
        Rule.required().error('Banner må ha bakgrunnsbilde'),
    },
    {
      title: 'Tittel',
      name: 'title',
      type: 'string',
      hidden: ({ parent }) => parent.layout == 'image',
    },
    {
      title: 'Beskrivelse',
      name: 'description',
      type: 'text',
      hidden: ({ parent }) => parent.layout == 'image',
    },
    {
      title: 'Lenker',
      type: 'array',
      name: 'buttons',
      of: [{ type: 'button' }],
      hidden: ({ parent }) => parent.layout == 'image',
      validation: (Rule) => [Rule.max(2).error('Maks 2 knapper')],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'background.type',
    },
    prepare({ title, subtitle }) {
      return {
        title: 'Banner',
        subtitle: title ? title : subtitle,
      }
    },
  },
}

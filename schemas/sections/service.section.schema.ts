import { Graph, VideoCamera } from 'phosphor-react'

export const serviceSection = {
  type: 'object',
  name: 'serviceSection',
  title: 'Tjenester',
  icon: VideoCamera,
  fields: [
    {
      title: 'Layout',
      name: 'layout',
      type: 'string',
      options: {
        list: [
          {
            title: 'Slider',
            value: 'slider',
          },
          {
            title: 'Rutenett',
            value: 'grid',
          },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'slider',
    },
    {
      title: 'Overskrift',
      name: 'heading',
      type: 'string',
    },
    {
      title: 'Kilde',
      name: 'source',
      type: 'string',
      options: {
        list: [
          {
            title: 'Sist publisert',
            value: 'lastPublished',
          },
          {
            title: 'Relatert til kategori',
            value: 'category',
          },
          {
            title: 'Manuell',
            value: 'manual',
          },
        ],
        layout: 'radio',
        initialValue: 'lastPublished',
      },
    },
    {
      title: 'Kategori',
      name: 'category',
      type: 'reference',
      to: [{ type: 'category' }],
      hidden: ({ parent }) => parent.source !== 'category',
    },
    {
      title: 'Velg manuelt',
      name: 'cases',
      type: 'array',
      of: [
        {
          title: 'Service',
          name: 'service',
          type: 'reference',
          to: [{ type: 'service' }],
        },
      ],
      hidden: ({ parent }) => parent.source !== 'manual',
    },
  ],
  preview: {
    select: {
      title: 'heading',
      layout: 'layout',
    },
    prepare({ title, layout }) {
      return {
        title: `Tjenester`,
        subtitle: title,
      }
    },
  },
}

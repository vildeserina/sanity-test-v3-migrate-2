import { Newspaper } from 'phosphor-react'

import generateColorTheme from '../utils/generate-color-theme.utils.schema'

export const caseSection = {
  type: 'object',
  name: 'caseSection',
  title: 'Prosjekter',
  icon: Newspaper,
  fields: [
    {
      title: 'Overskrift',
      name: 'heading',
      type: 'string',
    },
    { title: 'Undertittel', name: 'tag', type: 'string' },
    { title: 'Kort intro', name: 'text', type: 'text' },
    // {
    //   name: "layout",
    //   title: "Layout",
    //   type: "string",
    //   options: {
    //     list: [
    //       { title: "Enkel", value: "simple" },
    //       { title: "Utvidet", value: "full" },
    //     ],
    //     layout: "radio",
    //     direction: "horizontal",
    //   },
    //   initialValue: "full",
    // },
    generateColorTheme({
      initialValue: 'yellow',
    }),
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
            title: 'Manuelt',
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
      title: 'Velg prosjekter',
      name: 'items',
      type: 'array',
      of: [
        {
          title: 'Prosjekt',
          name: 'caseStudy',
          type: 'reference',
          to: [{ type: 'caseStudy' }],
        },
      ],
      hidden: ({ parent }) => parent.source !== 'manual',
    },
    // {
    //   title: "Button",
    //   type: "button",
    //   name: "button",
    // },
  ],
  preview: {
    select: {
      title: 'heading',
      layout: 'layout',
    },
    prepare({ title, layout = 'grid' }) {
      return {
        title: `Prosjekter`,
        subtitle: (title ?? '') + (' / ' + layout.toUpperCase() ?? ''),
      }
    },
  },
}

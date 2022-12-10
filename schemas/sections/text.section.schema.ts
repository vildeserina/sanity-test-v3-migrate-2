import { Article } from 'phosphor-react'

import generateColorTheme from '../utils/generate-color-theme.utils.schema'

export const textSection = {
  type: 'object',
  name: 'textSection',
  title: 'Tekst',
  icon: Article,
  fieldsets: [
    {
      title: 'Faktaboks',
      name: 'extra',
      hidden: ({ parent }) => parent.layout !== 'singleCol',
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    {
      title: 'Layout',
      name: 'layout',
      type: 'string',
      options: {
        list: [
          {
            title: 'En kolonne',
            value: 'singleCol',
          },
          {
            title: 'Tokolonner',
            value: 'twoCols',
          },
          {
            title: 'Stor tittel',
            value: 'bigTitle',
          },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'singleCol',
    },
    {
      title: 'Tag',
      name: 'tag',
      type: 'string',
      hidden: ({ parent }) => ['bigTitle', 'twoCols'].includes(parent.layout),
    },
    {
      title: 'Overskrift',
      name: 'heading',
      type: 'string',
    },
    {
      title: 'Innhold',
      name: 'content',
      type: 'portableText',
      hidden: ({ parent }) => parent?.layout == 'bigTitle',
    },
    {
      title: 'Uthevet tekst',
      fieldset: 'extra',
      description: 'Vises til høyre for teksten, nederst i modulen',
      name: 'infoBox',
      type: 'text',
      hidden: ({ parent }) => parent?.layout !== 'singleCol',
    },
    generateColorTheme({}),
  ],
  preview: {
    select: {
      title: 'heading',
      tag: 'tag',
    },
    prepare({ title, tag }) {
      return {
        title: 'Tekst',
        subtitle: title ?? tag,
      }
    },
  },
}

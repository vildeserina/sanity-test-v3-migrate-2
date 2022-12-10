import { Columns } from 'phosphor-react'

import generateColorTheme from '../utils/generate-color-theme.utils.schema'
import generateFigure from '../utils/generate-figure.utils.schema'

export const twoColSection = {
  type: 'object',
  name: 'twoColSection',
  title: 'Two Columns',
  icon: Columns,
  fieldsets: [
    { title: 'Columns', name: 'colContent', options: { columns: 2 } },
  ],
  groups: [
    { title: 'Layout', name: 'layout', default: true },
    { title: 'Left Column', name: 'leftGroup' },
    { title: 'Right Column', name: 'rightGroup' },
  ],
  fields: [
    generateColorTheme({
      group: 'layout',
      initialValue: 'yellow',
    }),
    {
      title: 'Left Col',
      name: 'leftCol',
      type: 'string',
      fieldset: 'colContent',
      group: 'layout',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Content', value: 'content' },
        ],
      },
      initialValue: 'content',
      layout: 'radio',
    },
    {
      title: 'Right Col',
      name: 'rightCol',
      type: 'string',
      group: 'layout',
      fieldset: 'colContent',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Text', value: 'content' },
        ],
      },
      initialValue: 'image',
      layout: 'radio',
    },

    {
      title: 'Heading',
      name: 'leftHeading',
      group: 'leftGroup',

      type: 'string',
      hidden: ({ parent }) => parent.leftCol == 'image',
    },
    {
      title: 'Left',
      name: 'leftContent',
      group: 'leftGroup',
      type: 'simplePortableText',
      hidden: ({ parent }) => parent.leftCol == 'image',
    },
    {
      title: 'Image Layout',
      name: 'leftImgLayout',
      group: 'leftGroup',
      type: 'string',
      options: {
        list: [
          { title: 'Single Image', value: 'single' },
          { title: 'Image + Diamond', value: 'diamond' },
          { title: 'Four Squares', value: 'four' },
        ],
        initialValue: 'single',
      },
      hidden: ({ parent }) => parent.leftCol == 'content',
    },
    generateFigure({
      caption: false,
      group: 'leftGroup',
      name: 'leftImage',
      hidden: ({ parent }) => parent.leftCol == 'content',
    }),
    generateFigure({
      caption: false,
      name: 'leftSecondaryImage',
      group: 'leftGroup',
      hidden: ({ parent }) =>
        parent.leftCol == 'content' || parent.leftImgLayout !== 'four',
    }),
    {
      title: 'Image Layout',
      name: 'rightImgLayout',
      group: 'rightGroup',
      type: 'string',
      options: {
        list: [
          { title: 'Single Image', value: 'single' },
          { title: 'Image + Diamond', value: 'diamond' },
          { title: 'Four Squares', value: 'four' },
        ],
        initialValue: 'single',
      },
      hidden: ({ parent }) => parent.rightCol == 'content',
    },
    generateFigure({
      caption: false,
      name: 'rightImage',
      group: 'rightGroup',
      hidden: ({ parent }) => parent.rightCol == 'content',
    }),
    generateFigure({
      caption: false,
      name: 'rightSecondaryImage',
      group: 'rightGroup',
      hidden: ({ parent }) =>
        parent.rightCol == 'content' || parent.rightImgLayout !== 'four',
    }),
    {
      title: 'Heading',
      name: 'rightHeading',
      group: 'rightGroup',
      type: 'string',
      hidden: ({ parent }) => parent.rightCol == 'image',
    },
    {
      title: 'Right',
      group: 'rightGroup',
      name: 'rightContent',
      type: 'simplePortableText',
      hidden: ({ parent }) => parent.rightCol == 'image',
    },
    {
      title: 'Buttons',
      type: 'array',
      name: 'leftButtons',
      of: [{ type: 'button' }],
      group: 'leftGroup',
      // validation: (Rule) => [Rule.max(2).error("Maks 2 knapper")],
      hidden: ({ parent }) => parent.leftCol == 'image',
    },
    {
      title: 'Buttons',
      type: 'array',
      name: 'rightButtons',
      of: [{ type: 'button' }],
      group: 'rightGroup',
      hidden: ({ parent }) => parent.rightCol == 'image',
      // validation: (Rule) => [Rule.max(2).error("Maks 2 knapper")],
    },
  ],
  preview: {
    select: {
      leftHeading: 'leftHeading',
      rightHeading: 'rightHeading',
      leftCol: 'leftCol',
      rightCol: 'rightCol',
      leftImage: 'leftImage',
      rightImage: 'rightImage',
    },
    prepare({
      leftHeading,
      rightHeading,
      leftCol,
      rightCol,
      leftImage,
      rightImage,
    }) {
      const getLayout = (layout) => {
        switch (layout) {
          case 'image':
            return '📸'

          case 'content':
            return '📝'

          default:
            return ''
        }
      }

      return {
        title: `Two Columns: ${getLayout(leftCol)} + ${getLayout(rightCol)}`,
        subtitle: leftHeading ?? rightHeading,
        media: rightImage ?? leftImage,
      }
    },
  },
}

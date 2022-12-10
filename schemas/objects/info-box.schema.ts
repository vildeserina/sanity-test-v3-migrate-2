import generateFigure from '../utils/generate-figure.utils.schema'

export const infoBox = {
  type: 'object',
  name: 'infoBox',
  title: 'Info box',
  fields: [
    {
      title: 'Heading',
      name: 'heading',
      type: 'string',
      initialValue: 'Visste du?',
    },
    generateFigure({
      caption: true,
    }),
    {
      title: 'Content',
      name: 'content',
      type: 'text',
    },
    {
      title: 'Button',
      name: 'button',
      type: 'button',
      options: { collapsible: true, collapsed: true },
    },
  ],
}

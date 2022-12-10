export const seo = {
  title: 'SEO / Share Settings',
  name: 'seo',
  type: 'object',
  options: {
    collapsible: true,
    collapsed: false,
  },
  fields: [
    {
      title: 'Meta Title',
      name: 'metaTitle',
      type: 'string',
      description: 'Title used for search engines and browsers',
      validation: (Rule) =>
        Rule.max(50).warning(
          'Longer titles may be truncated by search engines'
        ),
    },
    {
      title: 'Show default ending',
      description: 'Turn off if you want to use your own end to the meta title',
      type: 'boolean',
      name: 'showDefaultEnding',
      initialValue: true,
    },
    {
      title: 'Meta Description',
      name: 'metaDesc',
      type: 'text',
      rows: 3,
      description: 'Description for search engines',
      validation: (Rule) =>
        Rule.max(150).warning(
          'Longer descriptions may be truncated by search engines'
        ),
    },
    {
      title: 'Share Title',
      name: 'shareTitle',
      type: 'string',
      description: 'Title used for social sharing cards',
      validation: (Rule) =>
        Rule.max(50).warning('Longer titles may be truncated by social sites'),
    },
    {
      title: 'Share Description',
      name: 'shareDesc',
      type: 'text',
      rows: 3,
      description: 'Description used for social sharing cards',
      validation: (Rule) =>
        Rule.max(150).warning(
          'Longer descriptions may be truncated by social sites'
        ),
    },
    {
      title: 'Share Graphic',
      name: 'shareGraphic',
      type: 'image',
      description: 'Recommended size: 1200x630 (PNG or JPG)',
    },
    {
      title: 'Share Graphic Alt text',
      name: 'shareGraphicAlt',
      type: 'string',
    },
  ],
}

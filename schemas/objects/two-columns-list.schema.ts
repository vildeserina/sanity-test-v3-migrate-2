import { Columns } from 'phosphor-react'

export const twoColumnList = {
  title: 'Liste i kolonner',
  name: 'twoColumnList',
  type: 'object',
  icon: Columns,
  fields: [
    {
      title: 'Liste',
      name: 'list',
      type: 'array',
      of: [{ type: 'string' }],
    },
  ],
  preview: {
    prepare() {
      return {
        title: `Liste`,
      }
    },
  },
}

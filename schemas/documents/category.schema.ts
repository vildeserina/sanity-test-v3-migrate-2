import { Tag } from 'phosphor-react'

export const category = {
  name: 'category',
  title: 'Kategori',
  icon: Tag,
  type: 'document',
  i18n: true,
  fields: [
    {
      name: 'title',
      title: 'Tittel',
      type: 'string',
    },
    {
      title: 'Vis som filter i arkiv',
      name: 'showFilter',
      type: 'boolean',
      initialValue: false,
    },
  ],
}

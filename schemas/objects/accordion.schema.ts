import { CaretDown } from 'phosphor-react'

export const accordion = {
  name: 'accordion',
  title: 'Trekkspill',
  icon: CaretDown,
  type: 'document',
  fields: [
    { title: 'Tittel', name: 'title', type: 'string' },
    { title: 'Innhold', type: 'simplePortableText', name: 'content' },
  ],
}

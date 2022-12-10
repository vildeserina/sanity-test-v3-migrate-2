import { User } from 'phosphor-react'

export const personRef = {
  type: 'object',
  name: 'personRef',
  icon: User,
  title: 'Person',
  fields: [
    {
      title: 'Person',
      type: 'reference',
      name: 'person',
      to: [{ type: 'person' }],
    },
  ],
  preview: {
    select: {
      title: 'person.name',
      media: 'person.figure',
    },
  },
}

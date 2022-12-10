import { Person } from 'phosphor-react'

export const personPreview = {
  title: 'Personer',
  name: 'personPreview',
  type: 'object',
  icon: Person,
  fields: [
    {
      title: 'Vis bilder',
      name: 'showImage',
      type: 'boolean',
      initialValue: true,
    },
    {
      title: 'Vis signaturer',
      name: 'showSignature',
      type: 'boolean',
      initialValue: true,
    },
    {
      title: 'Vis CVer',
      name: 'showCV',
      type: 'boolean',
      initialValue: false,
    },
    {
      title: 'Vis introduksjoner',
      name: 'showIntroduction',
      type: 'boolean',
      initialValue: false,
    },
    {
      title: 'Personer',
      name: 'people',
      type: 'array',
      of: [
        {
          title: 'Person',
          name: 'singlePerson',
          type: 'object',
          fields: [
            {
              title: 'Referanse',
              name: 'reference',
              type: 'reference',
              to: [{ type: 'person' }],
            },
            {
              title: 'Overstyr arbeidstittel',
              name: 'overwriteTitle',
              type: 'boolean',
              initialValue: false,
            },
            {
              title: 'Tittel',
              name: 'newTitle',
              type: 'string',
              hidden: ({ parent }) => parent.overwriteTitle === false,
            },
          ],
          preview: {
            select: {
              name: 'reference.name',
              newTitle: 'newTitle',
              originalTitle: 'reference.title',
              media: 'reference.figure',
              overwriteTitle: 'overwriteTitle',
            },
            prepare({ name, originalTitle, media, newTitle, overwriteTitle }) {
              return {
                title: name,
                subtitle: overwriteTitle ? newTitle : originalTitle ?? '',
                media: media,
              }
            },
          },
        },
      ],
    },
  ],

  preview: {
    select: {
      title: 'people[0].person.reference.name',

      person1image: 'people.0.reference.figure',
      person1: 'people.0.reference.name',
      person2: 'people.1.reference.name',
      person3: 'people.2.reference.name',
    },
    prepare({ person1, person2, person3, person1image }) {
      const people = [person1, person2, person3].filter(Boolean) ?? []

      console.log(people)

      const peopleString =
        people && people?.length > 1
          ? people?.join(', ')
          : people?.length > 0
          ? people[0]
          : 'Personer'

      console.log(peopleString)

      return {
        title: peopleString,
        subtitle: `Antall personer: ${people?.length ?? 0}`,
        media: person1image ?? null,
      }
    },
  },
}

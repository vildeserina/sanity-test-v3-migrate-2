import { Folder } from 'phosphor-react'

import generateColorTheme from '../utils/generate-color-theme.utils.schema'
import generateFigure from '../utils/generate-figure.utils.schema'

export const caseStudy = {
  name: 'caseStudy',
  type: 'document',
  title: 'Prosjekt',
  icon: Folder,
  groups: [
    {
      title: 'Grunnleggende',
      name: 'general',
      default: true,
    },
    {
      title: 'Bilder',
      name: 'images',
    },
    {
      title: 'Innhold',
      name: 'content',
    },
    {
      title: 'Metadata / SEO',
      name: 'meta',
    },
  ],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Tittel',
      group: 'general',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'general',
      options: {
        source: 'customer',
        maxLength: 96,
      },
      validation: (Rule) => [
        Rule.required().error('The page needs a slug'),
        Rule.custom((slug) => {
          if (typeof slug.current === 'undefined') {
            return true
          }
          return slug.current.indexOf(' ') >= 0
            ? 'The slug should not contain spaces'
            : true
        }).error(),
      ],
    },
    {
      title: 'Kundereferanse',
      name: 'customerReference',
      type: 'reference',
      to: [{ type: 'customer' }],
      group: 'general',
    },
    {
      name: 'customer',
      type: 'string',
      title: 'Kundetittel',
      description: 'Overstyrer tittel fra kundereferanse',
      group: 'general',
    },

    {
      title: 'Arrangementkategori',
      name: 'type',
      type: 'array',
      group: 'general',
      of: [
        {
          name: 'eventCategory',
          type: 'reference',
          to: [{ type: 'eventCategory' }],
        },
      ],
    },
    {
      title: 'Levert',
      name: 'categories',
      type: 'array',
      group: 'general',
      of: [{ name: 'category', type: 'reference', to: [{ type: 'category' }] }],
    },
    {
      title: 'Media',
      name: 'media',
      type: 'media',
      group: 'images',
    },
    generateFigure({ title: 'Bilde nederst', name: 'image', group: 'images' }),
    {
      title: 'Medvirkende',
      name: 'credit',
      type: 'array',
      group: 'general',
      of: [
        {
          title: 'Person',
          name: 'person',
          type: 'reference',
          to: [{ type: 'person' }],
        },
        {
          title: 'Samarbeidspartner eller byrå',
          name: 'partner',
          type: 'object',
          fields: [{ title: 'Title', name: 'title', type: 'string' }],
        },
      ],
    },
    {
      title: 'Introduksjon',
      name: 'introduction',
      type: 'text',
      group: 'content',
      validation: (Rule) => [
        Rule.max(300).warning(
          'Bør ikke være mer enn 300 tegn i introduksjonen'
        ),

        Rule.max(600).error('Kan ikke være mer enn 600 tegn'),
      ],
    },
    {
      title: 'Moduler',
      name: 'sections',
      type: 'sections',
      group: 'content',
    },
    {
      title: 'Bunn',
      name: 'bottom',
      group: 'content',
      type: 'object',
      fields: [generateColorTheme({}), generateFigure({})],
    },
    {
      name: 'seo',
      type: 'seo',
      group: 'meta',
      title: 'Metadata / SEO',
      description: 'This description populates meta-tags on the webpage',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'customer',
      endImage: 'image',
      image: 'media.image',
      gradient: 'media.gradient.image',
      sharingImage: 'seo.shareGraphic',
    },
    prepare({ title, subtitle, endImage, image, gradient, sharingImage }) {
      return {
        title: `${title}`,
        subtitle: `${subtitle}`,
        media: image ?? endImage ?? gradient ?? sharingImage,
      }
    },
  },
}

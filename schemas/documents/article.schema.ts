import { Newspaper } from 'phosphor-react'

import generateFigure from '../utils/generate-figure.utils.schema'

export const article = {
  name: 'article',
  type: 'document',
  title: 'Artikkel',
  icon: Newspaper,
  // initialValue: async () => {
  //   const response = await client.fetch(
  //     `
  //       *[_type == "siteSettings"][0]{
  //           defaultImage
  //       }
  //     `
  //   )

  //   return { image: response?.defaultImage }
  // },
  groups: [
    {
      title: 'Grunnleggende',
      name: 'general',
      default: true,
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
      validation: (Rule) => Rule.required(),
      group: 'general',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'general',
      options: {
        source: 'title',
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
      name: 'categories',
      title: 'Kategorier',
      type: 'array',
      group: 'general',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
    },

    {
      name: 'author',
      group: 'general',
      type: 'reference',
      title: 'Forfatter',
      to: [{ type: 'person' }],
    },
    {
      title: 'Publisert',
      name: 'publishDate',
      group: 'general',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
    {
      title: 'Introduksjon',
      name: 'introduction',
      description: 'Kommer før bilde (hvis bilde finnes)',
      type: 'portableText',
      group: 'content',
      rows: 3,
      options: {
        collapsible: true,
      },
      validation: (Rule) => Rule.max(300).error('Max 300 characters'),
    },
    generateFigure({
      title: 'Bilde',
      alt: true,
      caption: false,
      name: 'image',
      group: 'content',
    }),
    {
      title: 'Hovedinnhold',
      name: 'body',
      type: 'portableText',
      group: 'content',
    },
    // {
    //   name: "ctaTemplate",
    //   type: "reference",
    //   title: "Overstyr mal for sidebunn",
    //   group: "content",
    //   to: [{ type: "ctaTemplate" }],
    // },
    {
      name: 'seo',
      type: 'seo',
      title: 'SoMe / SEO',
      group: 'meta',
    },
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      image: 'media.image',
      gradient: 'media.gradient.image',
      seoSharing: 'seo.shareGraphic',
    },
    prepare({ title, author, image, gradient, seoSharing }) {
      return {
        title: `${title}`,
        subtitle: author ?? '',
        media: seoSharing ?? image ?? gradient,
      }
    },
  },
}

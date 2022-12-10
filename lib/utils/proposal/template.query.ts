export const templateOptionQuery = `*[_type == $documentType && !(_id in path('drafts.**'))]{
      "title": select(
        defined(internalTitle) => internalTitle,
        defined(title) => title,
        defined(heading) => heading,
        title
      ),
      "description": select(
        defined(internalDescription) => internalDescription,
        defined(internalTitle && title) => title,
        defined(heading) => heading
      ),
      "image": select(
        defined(media) && media.type == "image" => media.image.asset->url,
        defined(media) && media.type == "gradient" =>  media.gradient->image.asset->url,
        null
      ),
      _id,
      tags,
      "categories": categories[]->title
    }`

export const mediaQuery = `
  media{
    type,
    ...
}`

export const templateQuery = `
    layout, heading, content, ${mediaQuery}, blocks[]
`

export const galleryQuery = `
    imageGallery, topColor, bottomColor
`

export const textQuery = `
    title, layout, heading, ${mediaQuery}, content,
`

export const tableQuery = `
    title, table, heading, tag, colorTheme
`

export const blockSetQuery = `
   blocks[]
`

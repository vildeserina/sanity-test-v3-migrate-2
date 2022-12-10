import { PortableTextProps } from "@portabletext/react"
import { nanoid } from "nanoid"

import { removeEmpty } from "../remove-empty"
import { templateQuery } from "./template.query"

export const fetchProposalTemplate = async (client, templateId, documentId) => {
  const templateData = await client.fetch(
    `*[_type == "proposalTemplate" && _id == $templateId][0]{${templateQuery}}`,
    {
      templateId: templateId,
    }
  )

  const filteredData: any = templateData && removeEmpty(templateData)

  const { blocks, ...rest } = filteredData

  if (!blocks) return

  const blocksWithoutKeys =
    blocks?.map(({ _key, ...keepAttrs }) => {
      return { ...keepAttrs, _key: nanoid() }
    }) ?? []

  if (filteredData) {
    await client
      .patch(documentId)
      .set(rest)
      .setIfMissing({ blocks: [] })
      .append("blocks", blocksWithoutKeys)
      .commit({ autoGenerateArrayKeys: true })
  }
}

export const fetchTermTemplate = async (client, templateId, documentId) => {
  const templateData = await client.fetch(
    `*[_type == "proposalTemplateTerm" && _id == $templateId][0]{title, content}`,
    {
      templateId: templateId,
    }
  )

  const filteredData = templateData && removeEmpty(templateData)

  const { content, title }: any = filteredData

  if (!content) return

  const contentWithoutKeys =
    content?.map(({ _key, ...keepAttrs }) => {
      return { ...keepAttrs, _key: nanoid() }
    }) ?? []

  if (filteredData) {
    await client
      .patch(documentId)
      .set({ terms: { title: title, content: contentWithoutKeys } })
      .commit({ autoGenerateArrayKeys: true })
  }
}

export function removeKeys(obj) {
  const { _key, ...rest } = obj
  return rest
}

export function replaceKeys(obj) {
  const { _key, ...rest } = obj
  return { _key: nanoid(), ...rest }
}

export function replaceContentKeys(obj) {
  const { _key, children, ...rest } = obj

  const childrenWithoutKeys = children?.map((item) => replaceKeys(item))

  return { _key: nanoid(), children: childrenWithoutKeys, ...rest }
}

export const removeDuplicateContentKeys = (blocks) => {
  return blocks?.map((item) => removeKeysFromSection(item))
}

export function removeKeysFromSection(section) {
  if ("quotes" in section) {
    const { quotes, ...rest } = section

    const keysRemoved = quotes?.map((item) => replaceKeys(item))

    const filtered = keysRemoved?.filter((item) => !!item)

    return { ...rest, quotes: filtered }
  }

  if ("content" in section) {
    const { content, ...rest } = section

    const keysRemoved = content?.map((item) => replaceContentKeys(item))

    const filtered = keysRemoved?.filter((item) => !!item)

    return { ...rest, content: filtered }
  }

  if ("table" in section) {
    const { table, ...rest } = section

    const keysRemovedFromRows = table?.rows?.map((item) => {
      return replaceKeys(item)
    })

    const keysRemovedFromCells = keysRemovedFromRows?.map((item) => {
      return {
        ...item,
        cells: item?.cells?.map((cell) => replaceKeys(cell)),
      }
    })

    return {
      ...rest,
      table: {
        rows: keysRemovedFromCells,
        useFirstRowAsHeader: table?.useFirstRowAsHeader,
      },
    }
  }

  if ("imageGallery" in section) {
    const { imageGallery, ...rest } = section

    const keysRemoved = imageGallery?.map((item) => replaceKeys(item))

    const filtered = keysRemoved?.filter((item) => !!item)

    return { ...rest, imageGallery: filtered }
  }

  return section
}

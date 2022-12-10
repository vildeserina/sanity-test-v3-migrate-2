import { removeDuplicateContentKeys } from "./fetch-template.utils"
import { blockSetQuery } from "./template.query"

export const fetchBlocksetTemplate = async (client, templateId, documentId) => {
  const templateData = await client.fetch(
    `*[_type == "proposalBlockSet" && _id == $templateId][0]{${blockSetQuery}}`,
    {
      templateId: templateId,
    }
  )

  const { blocks } = templateData

  const blocksWithoutKeys =
    blocks.map(({ _key, ...keepAttrs }) => keepAttrs) ?? []

  const blocksWithoutContentKeys = removeDuplicateContentKeys(blocksWithoutKeys)

  if (templateData) {
    await client
      .patch(documentId)
      .setIfMissing({ blocks: [] })
      .append("blocks", blocksWithoutContentKeys)
      .commit({ autoGenerateArrayKeys: true })
  }
}

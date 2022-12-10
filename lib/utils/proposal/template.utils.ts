import { SanityClientLike } from "@sanity/image-url/lib/types/types"
import { useSanityClient } from "plugins/use-sanity-client"
import { SanityClient } from "sanity"

import { fetchBlocksetTemplate } from "./fetch-blockset.utils"
import { fetchProposalSection } from "./fetch-section.utils"
import {
  fetchProposalTemplate,
  fetchTermTemplate,
} from "./fetch-template.utils"
import { templateOptionQuery } from "./template.query"

export const fetchTemplateList = async (
  documentType: string = "proposalTemplate",
  client: SanityClient
) => {
  return await client.fetch(templateOptionQuery, {
    documentType: documentType,
  })
}

export const fetchTemplateData = async (
  client: SanityClient,
  templateId: string,
  documentId: string,
  documentType: string = "proposalTemplate",
  parentKey?: string,
  prevBlocks?: any[]
) => {
  if (documentType === "proposalTemplate") {
    return await fetchProposalTemplate(client, templateId, documentId)
  }

  if (documentType === "proposalBlockSet") {
    return await fetchBlocksetTemplate(client, templateId, documentId)
  }

  if (documentType === "proposalTemplateTerm") {
    return await fetchTermTemplate(client, templateId, documentId)
  }

  return await fetchProposalSection(
    client,
    templateId,
    documentId,
    documentType,
    parentKey,
    prevBlocks
  )
}

export const replaceArrayContent = (
  client,
  type,
  documentId,
  prevBlocks,
  parentKey,
  newData
) => {
  const currentContent = prevBlocks

  const blockData = currentContent?.find((block) => block._key === parentKey)
  const filteredBlocks = currentContent?.filter(
    (item) => item._key !== parentKey
  )

  let newBlock
  if (type == "template") {
    const { template, ...block } = blockData || {}
    newBlock = { ...newData, _key: parentKey, ...block }
  }

  if (type == "proposalTemplateText") {
    const { title, layout, heading, media, content, ...block } = blockData || {}
    newBlock = { ...newData, _key: parentKey, ...block }
  }

  if (type == "proposalTemplateGallery") {
    const { imageGallery, topColor, bottomColor, ...block } = blockData
    newBlock = { ...newData, _key: parentKey, ...block }
  }

  if (type == "proposalTemplateTable") {
    const { table, title, tag, heading, ...block } = blockData
    newBlock = { ...newData, _key: parentKey, ...block }
  }

  const completeBlocks = {
    blocks: [...filteredBlocks, newBlock],
  }

  client.patch(documentId).set(completeBlocks).commit()
}

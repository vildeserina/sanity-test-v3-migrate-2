import { useSanityClient } from "plugins/use-sanity-client"

import { removeEmpty } from "../remove-empty"
import { removeKeysFromSection } from "./fetch-template.utils"
import { galleryQuery, tableQuery, textQuery } from "./template.query"
import { replaceArrayContent } from "./template.utils"

export const fetchProposalSection = async (
  client,
  templateId,
  documentId,
  sectionType,
  parentKey,
  prevBlocks
) => {
  const queryItems =
    sectionType === "proposalTemplateText"
      ? textQuery
      : sectionType === "proposalTemplateGallery"
      ? galleryQuery
      : sectionType === "proposalTemplateTable"
      ? tableQuery
      : ""

  const templateData = await client.fetch(
    `*[_type == $sectionType && _id == $templateId][0]{${queryItems}}`,
    {
      templateId: templateId,
      sectionType: sectionType,
    }
  )

  const filteredData = templateData && removeEmpty(templateData)

  const keysRemoved = removeKeysFromSection(filteredData)

  if (templateData) {
    replaceArrayContent(
      client,
      sectionType,
      documentId,
      prevBlocks,
      parentKey,
      keysRemoved
    )
  }
}

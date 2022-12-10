import { Button, Card, Flex, Grid, Label, Stack, Text } from "@sanity/ui"
import {
  fetchTemplateList,
  replaceArrayContent,
} from "lib/utils/proposal/template.utils"
import { ArrowDown, ArrowUp, WarningCircle } from "phosphor-react"
import { useSanityClient } from "plugins/use-sanity-client"
import React, { useEffect, useState } from "react"
import { useFormValue } from "sanity"

import { Buttons } from "./buttons.studio.component"
import { SingleOption } from "./single-option.studio.component"
import { TemplateSelect } from "./template-select.studio.component"

const FetchTemplateData = (props, ref) => {
  const [templates, setTemplates] = useState(null)
  const [isHighlighted, setIsHighlighted] = useState(
    props?.document?._type == "proposalTemplate"
      ? false
      : !props?.document?.heading || props?.document?._type !== "proposal"
      ? true
      : false
  )

  const client = useSanityClient()

  const [status, setStatus] = useState("none")
  const { parent, type, getValuePath } = props

  const document: any = useFormValue([])

  const documentType = type?.fields[0]?.type?.value ?? "proposalTemplate"

  const documentId = document._id

  const onlyKeysInPath = props.path
    .filter((item) => item._key)
    .map((item) => item._key)
    .reverse()

  const parentKey = onlyKeysInPath[0] ?? null

  const template =
    type.title === "Hent fra modulsett"
      ? document?.addBlockSets
      : documentType == "proposal" || documentType == "proposalTemplate"
      ? document?.template
      : parent?.template

  // console.log("documentType", documentType)

  // console.log("DOCUMENT", document)
  // console.log("PARENT", parent)
  // console.log("PARENT KEY", parent._key)
  // console.log("PROPS", props)
  // console.log("PROPS PARENT", props?.parent)
  // console.log("TYPE", type)

  // console.log("DOCUMENT CONTENT", document?.content)
  // console.log("DOCUMENT TYPE", documentType)

  // console.log("VALUE PATH", props?.getValuePath())

  useEffect(() => {
    if (isHighlighted) {
      const fetchData = async () => {
        const data = await fetchTemplateList(documentType, client)

        setTemplates(data)
      }

      fetchData().catch(console.error)
    }
  }, [isHighlighted, client, documentType])

  if (!documentId) return <Label>Dokument mangler tittel</Label>

  if (!templates && isHighlighted) return <Label>Laster maler...</Label>

  const options =
    templates &&
    templates?.map((option) => {
      return {
        value: option?._id,
        payload: {
          title: option?.title,
          description: option?.description,
          tags: option?.tags,
          categories: option?.categories,
          image: option?.image ? `${option?.image}?w=200&h=200&fit=crop` : null,
          id: option?._id,
        },
      }
    })

  const prevBlocks = document?.blocks

  const handlePatch = async (value) => {
    const selectedTemplate = options.find((item) => item.value === value)

    if (documentType == "proposalTemplate") {
      await client
        .patch(documentId)
        .set({ template: { ...selectedTemplate.payload } })
        .commit()
        .catch((err) => {
          console.error("Oh no, the update failed: ", err.message)
        })

      return
    }

    if (documentType == "proposalBlockSet") {
      client
        .patch(documentId)
        .set({ addBlockSets: { ...selectedTemplate.payload } })
        .commit()
      return
    }

    if (documentType == "proposalTemplateTerm") {
      client
        .patch(documentId)
        .set({
          terms: {
            ...document?.terms,
            template: { ...selectedTemplate.payload },
          },
        })
        .commit()
      return
    }

    if (documentType !== "proposalTemplate") {
      replaceArrayContent(
        client,
        "template",
        documentId,
        prevBlocks,
        parentKey,
        {
          template: selectedTemplate?.payload,
        }
      )
    }
  }

  return (
    <Grid gap={2} ref={ref}>
      <Flex align="center" justify={"space-between"}>
        <Label size={2}>{type?.title}</Label>
        <Button
          onClick={() => setIsHighlighted(!isHighlighted)}
          fontSize={1}
          icon={isHighlighted ? ArrowUp : ArrowDown}
          padding={2}
          text={isHighlighted ? "Skjul" : "Vis"}
          mode={isHighlighted ? "ghost" : "default"}
        />
      </Flex>

      {isHighlighted && templates && (
        <Stack space={2}>
          <TemplateSelect
            options={options}
            documentType={documentType}
            status={status}
            setStatus={setStatus}
            documentId={documentId}
            handlePatch={handlePatch}
          />
          {template && (
            <Card border={true} radius={4} tone={"primary"}>
              <SingleOption documentType={documentType} {...template} />
            </Card>
          )}
          <Buttons
            selectedTemplate={template}
            status={status}
            setStatus={setStatus}
            documentType={documentType}
            documentId={documentId}
            parentKey={parentKey}
            prevBlocks={prevBlocks}
          />
          {document?.heading &&
            document?._type == "proposal" &&
            document?.template &&
            type?.title == "Velg mal" && (
              <Card padding={[3, 3, 4]} radius={2} shadow={1} tone="caution">
                <Flex gap={4}>
                  <WarningCircle size={30} />
                  <Text size={2}>
                    Om du importerer malen på nytt vil felter med innhold fra
                    malen overstyre eksisterende innhold.
                  </Text>
                </Flex>
              </Card>
            )}
        </Stack>
      )}
    </Grid>
  )
}

export default FetchTemplateData

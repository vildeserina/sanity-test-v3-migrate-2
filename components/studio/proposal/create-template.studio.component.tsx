import {
  Button,
  Card,
  Flex,
  Grid,
  Label,
  Stack,
  Text,
  TextInput,
  useToast,
} from "@sanity/ui"
import { nanoid } from "nanoid"
import { ArrowDown, ArrowUp } from "phosphor-react"
import { useSanityClient } from "plugins/use-sanity-client"
import React, { useEffect, useState } from "react"
import { useFormValue } from "sanity"

const CreateTemplate = (props, ref) => {
  const [templateTitle, setTemplateTitle] = useState("")

  const toast = useToast()
  const { parent, type } = props
  // @TODO: Re add parent

  const [isHighlighted, setIsHighlighted] = useState(
    type?.fields[1]?.type?.value ?? false
  )

  const templateType = type?.fields[0]?.type?.value ?? "proposalTemplate"
  const sourceType = type?.fields[0]?.type?.value ?? "document"

  const document: any = useFormValue([])
  const documentId = document._id
  const client = useSanityClient()

  if (!documentId) return <Label>Dokument mangler tittel</Label>

  if (!sourceType || !templateType)
    return <Label>Feil ved oppsett av felt</Label>

  const handleCreate = async () => {
    if (templateType == "proposalTemplate") {
      const {
        _type,
        publishDate,
        acceptOffer,
        _updatedAt,
        _id,
        _rev,
        template,
        addBlockSets,
        customer,
        status,
        version,
        showStatus,
        createProposalTemplate,
        ...fields
      } = document

      await client
        .create({
          _type: templateType,
          _id: nanoid(),
          internalTitle: templateTitle,
          title: templateTitle,
          ...fields,
        })
        .then(() => {
          toast.push({
            status: "success",
            title: `✅ Ny mal "${templateTitle}" opprettet`,
          })
          setTemplateTitle("")
        })
        .catch((err) => {
          toast.push({
            status: "error",
            title: `Feil ved opprettelse av ny mal`,
          })
          console.error("Error: ", err.message)
        })

      return
    }

    // if (templateType == "proposalBlockSet") {
    //   client
    //     .patch(documentId)
    //     .set({ addBlockSets: { ...selectedTemplate.payload } })
    //     .commit()
    //   return
    // }
    // @TODO: Fix

    // if (templateType == "proposalTemplateTable") {
    //   const { _type, _updatedAt, _id, _rev, template, colorTheme, ...fields } =
    //     parent

    //   await client
    //     .create({
    //       _type: "proposalTemplateTable",
    //       _id: nanoid(),
    //       internalTitle: templateTitle,
    //       title: templateTitle,
    //       ...fields,
    //     })
    //     .then(() => {
    //       toast.push({
    //         status: "success",
    //         title: `✅ Ny tabell-mal "${templateTitle}" opprettet`,
    //       })
    //       setTemplateTitle("")
    //     })
    //     .catch((err) => {
    //       toast.push({
    //         status: "failure",
    //         title: `Feil ved opprettelse av ny tabellmal`,
    //       })
    //       console.error("Error: ", err.message)
    //     })

    //   return
    // }

    if (templateType !== "proposalTemplate") {
      const fieldToCopy = document[sourceType]

      await client
        .create({
          _type: templateType,
          _id: nanoid(),
          internalTitle: templateTitle,
          [sourceType]: fieldToCopy,
        })
        .then(() => {
          toast.push({
            status: "success",
            title: `✅ Ny mal "${templateTitle}" opprettet`,
          })
          setTemplateTitle("")
        })
        .catch((err) => {
          toast.push({
            status: "error",
            title: `Feil ved opprettelse av ny mal`,
          })
          console.error("Error: ", err.message)
        })

      return
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

      {isHighlighted && (
        <Stack space={2}>
          <Card>
            <Flex gap={2}>
              <TextInput
                onChange={(event) =>
                  setTemplateTitle(event.currentTarget.value)
                }
                padding={[3, 3, 4]}
                fontSize={2}
                placeholder="Tittel"
                value={templateTitle}
                width={8}
              />

              <Button
                paddingX={3}
                fontSize={2}
                mode={templateTitle?.length > 0 ? "default" : "ghost"}
                onClick={handleCreate}
                disabled={!templateTitle || templateTitle?.length == 0}
              >
                {!templateTitle || templateTitle?.length == 0
                  ? "Skriv inn tittel"
                  : "Lagre som mal"}
              </Button>
            </Flex>
          </Card>
        </Stack>
      )}
    </Grid>
  )
}

export default CreateTemplate

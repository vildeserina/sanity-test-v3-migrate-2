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

const CreateProposalCopy = (props, ref) => {
  const [isHighlighted, setIsHighlighted] = useState(false)

  const client = useSanityClient()

  const toast = useToast()
  const { type } = props

  const document: any = useFormValue([])

  const documentId = useFormValue([`_id`])

  if (!documentId || typeof documentId !== "string")
    return <Label>Dokument mangler tittel</Label>

  const handleCreate = async () => {
    const [
      _type,
      publishDate,
      _id,
      _rev,
      template,
      addBlockSets,
      slug,
      ...fields
    ] = document

    const updateVersion = client.patch(documentId).set({
      version: {
        ...document?.version,
        version: document?.version?.version + 1,
      },
    })

    await client
      .transaction()
      .create({
        _type: "proposal",
        _id: nanoid(),
        title: "Kopi av " + document?.title,
        ...fields,
      })
      .commit()
      .then(() => {
        toast.push({
          status: "success",
          title: `✅ Kopi av "${document?.title}" opprettet`,
        })
      })
      .catch((err) => {
        toast.push({
          status: "error",
          title: `Feil ved opprettelse av kopi`,
        })
        console.error("Error: ", err.message)
      })
    //   .transaction()
    //   .patch(updateVersion)
    // @TODO: Find out if this is necessary

    return
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
              <Button paddingX={3} fontSize={2} onClick={handleCreate}>
                Lagre kopi
              </Button>
            </Flex>
          </Card>
        </Stack>
      )}
    </Grid>
  )
}

export default CreateProposalCopy

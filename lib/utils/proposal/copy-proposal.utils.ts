import { useToast } from "@sanity/ui"
import { nanoid } from "nanoid"
import { CopySimple } from "phosphor-react"
import { useSanityClient } from "plugins/use-sanity-client"
import { useEffect, useState } from "react"
import { useDocumentOperation } from "sanity"

export function CopyProposal(props) {
  const { publish } = useDocumentOperation(props.id, props.type)
  const [isPublishing, setIsPublishing] = useState(false)
  const toast = useToast()
  const client = useSanityClient()

  const documentToCopy = props?.published

  useEffect(() => {
    if (isPublishing || !publish.disabled) {
      setIsPublishing(false)
    }
  }, [props?.published, isPublishing, publish.disabled])

  if (props.type !== "proposal") {
    return null
  }

  return {
    icon: CopySimple,
    disabled: !publish.disabled,
    label: !publish.disabled
      ? "Publiser først for å lage kopi"
      : isPublishing
      ? "Lager kopi av tilbud..."
      : "Lagre kopi av versjon",
    onHandle: () => {
      setIsPublishing(true)

      const newTitle = "💾 " + documentToCopy?.title

      const newSlug =
        documentToCopy?.slug?.current +
        `-v${documentToCopy?.version?.version ?? 2}`

      const {
        _type,
        _id,
        _rev,
        template,
        addBlockSets,
        slug,
        title,
        ...fields
      } = documentToCopy

      client
        .create({
          _type: "proposal",
          _id: nanoid(),
          title: newTitle,
          slug: { current: newSlug },
          ...fields,
        })
        .then(() => {
          toast.push({
            status: "success",
            title: `✅ Kopi av "${documentToCopy?.title}" opprettet`,
          })
        })
        .catch((err) => {
          toast.push({
            status: "error",
            title: `Feil ved opprettelse av kopi`,
          })
          console.error("Error: ", err.message)
          props.onComplete()
          return
        })

      function updateVersion() {
        client
          .patch(props?.id)
          .set({
            version: {
              ...documentToCopy?.version,
              version: (documentToCopy?.version?.version ?? 0) + 1,
            },
          })
          .commit()
      }

      updateVersion()

      props.onComplete()
    },
  }
}

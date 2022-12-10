import { Button, useToast } from "@sanity/ui"
import { fetchTemplateData } from "lib/utils/proposal/template.utils"
import {
  ArrowUp,
  FileArrowDown,
  Sunglasses,
  WarningCircle,
} from "phosphor-react"
import { useSanityClient } from "plugins/use-sanity-client"
import React from "react"

export const Buttons = ({
  selectedTemplate,
  status,
  setStatus,
  documentId,
  documentType,
  parentKey,
  prevBlocks,
}) => {
  const client = useSanityClient()
  const toast = useToast()
  return (
    <>
      {selectedTemplate && status == "none" ? (
        <Button
          onClick={async () => {
            try {
              await fetchTemplateData(
                client,
                selectedTemplate?.id,
                documentId,
                documentType,
                parentKey,
                prevBlocks
              )

              setStatus("success")
              toast.push({
                status: "success",
                // icon: "rocket",
                title: "Innhold fra mal ble importert",
              })
            } catch (error) {
              setStatus("failed")
              toast.push({
                // status: "failed",
                title: "Det skjedde en feil under importen fra malen",
              })
            }
          }}
          fontSize={2}
          icon={FileArrowDown}
          padding={4}
          text="Importer innhold fra mal"
          tone={"primary"}
        />
      ) : status == "fail" ? (
        <Button
          fontSize={2}
          icon={WarningCircle}
          padding={4}
          text="Feil ved import"
          // tone={"warning"}
          disabled={true}
        />
      ) : status == "success" ? (
        <Button
          fontSize={2}
          icon={Sunglasses}
          padding={4}
          text="Innhold importert"
          tone={"positive"}
        />
      ) : (
        <Button
          fontSize={2}
          icon={ArrowUp}
          padding={4}
          text="Velg mal"
          // tone={"ghost"}
          disabled={true}
        />
      )}
    </>
  )
}

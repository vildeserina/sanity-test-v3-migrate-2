import { Autocomplete, Card, Label } from "@sanity/ui"
import { MagnifyingGlass } from "phosphor-react"
import React, { useEffect } from "react"

import { SingleOption } from "./single-option.studio.component"

export const TemplateSelect = ({
  options,
  status,
  setStatus,
  documentType,
  documentId,
  handlePatch,
}) => {
  useEffect(() => {
    const id =
      typeof window !== "undefined" &&
      window.setTimeout(() => {
        setStatus("none")
      }, 3000)

    return () => window.clearTimeout(id)
  }, [status, setStatus])

  if (!documentId || !documentType) return <Label>Dokument mangler ID</Label>

  return (
    <Card padding={0} paddingBottom={[2, 2, 2]}>
      <Autocomplete
        id={documentId}
        filterOption={(query, option: any) => {
          if (!query) return true
          const matchesTitle = option?.payload?.title
            ? option.payload.title.toLowerCase().indexOf(query?.toLowerCase()) >
              -1
            : false

          const matchesDescription = option?.payload?.description
            ? option?.payload?.description
                .toLowerCase()
                .indexOf(query?.toLowerCase()) > -1
            : false

          // TODO: Sørg for at søk også matcher på kategorier og tags

          return matchesTitle || matchesDescription
        }}
        fontSize={[2, 2, 3]}
        icon={MagnifyingGlass}
        openButton
        onChange={() => console.log("CHANGE")}
        options={options}
        padding={[2, 2, 4]}
        placeholder="Søk etter mal …"
        renderOption={(option) => (
          <Card as="button">
            <SingleOption {...option?.payload} documentType={documentType} />
          </Card>
        )}
        onSelect={handlePatch}
        renderValue={(value, option) => option?.payload || value}
      />
    </Card>
  )
}

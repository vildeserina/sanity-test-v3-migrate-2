import {
  Box,
  Button,
  Card,
  Dialog,
  Flex,
  Inline,
  Label,
  TextInput,
} from "@sanity/ui"
import React, { FormEventHandler, FunctionComponent, useState } from "react"

import { NumColInputs } from "./num-col-inputs.component"

export type NumColType = {
  numColActions: {
    updateSuffix: (e: FormEventHandler<HTMLInputElement>) => any
    updatePrefix: (e: FormEventHandler<HTMLInputElement>) => any
    resetNumColState: () => void
    updateSumTitle: (e: FormEventHandler<HTMLInputElement>) => any
    updateToBeSummed: (toBeSummed: boolean) => any
    updateState: (numColState: {
      suffix?: string
      prefix?: string
      calculation?: {
        toBeSummed?: boolean
        title?: string
      }
    }) => void
  }
  numColState: {
    suffix?: string
    prefix?: string
    calculation?: {
      toBeSummed?: boolean
      title?: string
    }
  }
}

type TableDialogType = {
  title?: string
  type: "number" | "text" | string
  dialogType?: "add" | "edit"
  numColActions: NumColType["numColActions"]
  numColState: NumColType["numColState"]
  setDialog: any
  onConfirm: (type?: "number" | "text" | string) => any
  count?: number
  updateCount?: (e: any) => any
}

export const TableDialog = ({
  type,
  title,
  setDialog,
  onConfirm,
  numColState,
  numColActions,
  dialogType = "add",
  count,
  updateCount,
}: TableDialogType) => {
  return (
    <Dialog
      header={dialogType == "edit" ? `Endre ${title}` : `Legg til ${title}`}
      id={dialogType == "edit" ? "dialog-edit" : "dialog-add"}
      onClose={() => setDialog(null)}
      zOffset={1000}
    >
      <Card padding={4}>
        <Flex gap={2} direction="column">
          {dialogType == "add" && (
            <TextInput
              style={{ textAlign: "left" }}
              fontSize={2}
              padding={3}
              min={0}
              max={10}
              type="number"
              value={count}
              onChange={updateCount}
              placeholder={
                title == "tekstkolonner" ||
                title == "rader" ||
                title == "tallkolonner"
                  ? "Antall"
                  : "Indeks (fra 0 og oppover)"
              }
            />
          )}
          {type == "number" && (
            <>
              <NumColInputs
                numColActions={numColActions}
                numColState={numColState}
              />
            </>
          )}
        </Flex>
        <Box marginTop={4}>
          <Inline space={1} style={{ textAlign: "right" }}>
            <Button
              text="Bekreft"
              tone="positive"
              onClick={() => onConfirm(type)}
            />
            <Button
              text="Avbryt"
              mode="ghost"
              onClick={() => setDialog(null)}
            />
          </Inline>
        </Box>
      </Card>
    </Dialog>
  )
}

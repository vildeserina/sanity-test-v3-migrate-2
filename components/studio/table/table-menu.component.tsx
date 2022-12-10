import React, { FormEventHandler, FunctionComponent, useState } from "react"
import {
  Box,
  Button,
  Card,
  Dialog,
  Flex,
  Inline,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  Switch,
  TextInput,
  Text,
  Label,
} from "@sanity/ui"

import { PlusCircle, Trash, WarningCircle } from "phosphor-react"
import { NumColInputs } from "./num-col-inputs.component"
import { TableDialog } from "./table-dialog.component"
import { NumColType } from "./table-dialog.component"

const TableMenu: FunctionComponent<{
  addColumns: (count: number) => any
  addColumnAt: (index: number) => any
  addRows: (count: number) => any
  addRowAt: (index: number) => any
  addNumberColumns: (count: number, prefix?: string, suffix?: string) => any
  remove: () => any
  placement: "top" | "bottom" | "left" | "right" | "auto"
  updateHeader: (useFirstRowAsHeader: boolean) => any
  useFirstRowAsHeader: boolean

  numColActions: NumColType["numColActions"]
  numColState: NumColType["numColState"]
}> = (props) => {
  const [dialog, setDialog] = useState<{
    type: string
    callback: (count: number, prefix?: string, suffix?: string) => any
  } | null>(null)

  const [count, setCount] = useState("")

  const { numColState, numColActions } = props

  const updateCount: FormEventHandler<HTMLInputElement> = (e) => {
    setCount(e.currentTarget.value)
  }

  const addRows = () => {
    setDialog({
      title: "rader",
      type: "text",
      callback: (count) => props.addRows(count),
    })
  }

  const addRowAt = () => {
    setDialog({
      title: "rad",
      type: "text",
      callback: (index) => props.addRowAt(index),
    })
  }

  const addColumns = () => {
    setDialog({
      title: "tekstkolonner",
      type: "text",
      callback: (count) => props.addColumns(count),
    })
  }

  const addColumnsAt = () => {
    setDialog({
      title: "tekstkolonne",
      type: "text",
      callback: (index) => props.addColumnAt(index),
    })
  }

  const addNumColumns = () => {
    setDialog({
      title: "tallkolonner",
      type: "number",
      callback: (count, prefix, suffix) => {
        return props.addNumberColumns(count, prefix, suffix)
      },
    })
  }

  const onConfirm = (type?: "number" | "text") => {
    const parsedCount = parseInt(count, 10)

    if (type === "number" && parsedCount < 100) {
      setDialog(null)
      dialog.callback(parsedCount, numColState.prefix, numColState?.suffix)
      setCount("")
      numColActions.resetNumColState("")
    }

    if (type === "text" && parsedCount < 100) {
      setDialog(null)
      dialog.callback(parsedCount)
      setCount("")
    }
  }

  return (
    <React.Fragment>
      <Label size={4} style={{ marginTop: 10, marginRight: "auto" }}>
        Tabell
      </Label>

      <Flex justify={"space-between"} align={"center"}>
        <Card
          padding={1}
          paddingX={2}
          marginBottom={2}
          radius={4}
          style={{ textAlign: "center" }}
          marginLeft={10}
        >
          <Inline space={[3, 3, 4, 5]}>
            <Box>
              <Flex padding={1} gap={2} align="center" justify={"flex-start"}>
                <Switch
                  checked={props.useFirstRowAsHeader}
                  onChange={() =>
                    props.updateHeader(!props.useFirstRowAsHeader)
                  }
                />
                <Text size={1}>Bruk første rad om tittel</Text>
              </Flex>
            </Box>
          </Inline>
        </Card>

        <MenuButton
          button={
            <Button
              icon={PlusCircle}
              fontSize={1}
              paddingY={3}
              paddingX={4}
              radius={5}
              tone="primary"
              text="Ny"
              style={{ marginBottom: 8, marginLeft: 10 }}
            />
          }
          id="menu-button-example"
          menu={
            <Menu>
              <MenuItem
                icon={PlusCircle}
                fontSize={1}
                text="Legg til rader"
                onClick={addRows}
              />
              <MenuItem
                icon={PlusCircle}
                fontSize={1}
                text="Legg til rad på indeks"
                onClick={addRowAt}
              />
              <MenuItem
                icon={PlusCircle}
                fontSize={1}
                text="Legg til tekstkolonner"
                onClick={addColumns}
              />
              <MenuItem
                icon={PlusCircle}
                fontSize={1}
                text="Legg til tekstkolonne på indeks"
                onClick={addColumnsAt}
              />
              <MenuItem
                icon={PlusCircle}
                fontSize={1}
                text="Legg til tallkolonner"
                onClick={addNumColumns}
              />

              <MenuDivider />
              <MenuItem
                icon={Trash}
                fontSize={1}
                text="Fjern"
                tone="critical"
                onClick={props.remove}
              />
            </Menu>
          }
          placement={props.placement}
        />

        {dialog && (
          <TableDialog
            {...dialog}
            numColActions={numColActions}
            numColState={numColState}
            count={count}
            updateCount={updateCount}
            onConfirm={onConfirm}
            setDialog={setDialog}
          />
        )}
      </Flex>
    </React.Fragment>
  )
}

export default TableMenu

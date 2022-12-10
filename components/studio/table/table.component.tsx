import {
  Box,
  Button,
  Card,
  Dialog,
  Flex,
  Inline,
  Label,
  Text,
} from "@sanity/ui"
import { nanoid } from "nanoid"
import React, {
  FormEvent,
  FormEventHandler,
  forwardRef,
  FunctionComponent,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from "react"
import { set, unset } from "sanity"

import TableControl from "./table-control.component"
import TableInput from "./table-input.component"
import TableMenu from "./table-menu.component"
import { useNumCol } from "./use-num-col.hook"

const deepClone: <T>(data: T) => T =
  globalThis.structuredClone ?? ((data) => JSON.parse(JSON.stringify(data)))

type Props = {
  level: number
  markers: any[]
  type: {
    title: string
    description: string
    options: Record<string, any>
  }
  value: {
    rows: TableRow[]
    useFirstRowAsHeader?: boolean
  }
  onChange: (data: unknown) => unknown
}

export type TableRow = {
  _type: "tableRow"
  _key: string
  useFirstRowAsHeader?: boolean
  cells: Array<{
    _type: "cell" | string
    value: string
    type: "number" | "text" | "header" | string
    suffix?: string
    prefix?: string
    _key: string
    calculation?: {
      toBeSummed?: boolean
      title?: string
    }
  }>
}

const TableComponent: FunctionComponent<Props> = (props) => {
  const { type, level, value, markers, onChange } = props
  const [dialog, setDialog] = useState<{
    title?: string
    type: string
    callback: () => any
  } | null>(null)

  const { numColState, numColActions } = useNumCol()

  const updateValue = useCallback(
    (event) => onChange(set(event.currentTarget.value)),
    [onChange]
  )

  const resetValue = useCallback(() => onChange(unset()), [onChange])

  const createTable = () => {
    const newValue = {
      rows: [
        {
          _type: "tableRow",
          _key: nanoid(),
          cells: [
            { _type: "cell", value: "", type: "text", _key: nanoid() + 91 },
            { _type: "cell", value: "", type: "text", _key: nanoid() + 92 },
          ],
        },
        {
          _type: "tableRow",
          _key: nanoid(),
          cells: [
            { _type: "cell", value: "", type: "text", _key: nanoid() + 93 },
            { _type: "cell", value: "", type: "text", _key: nanoid() + 94 },
          ],
        },
      ],
    }
    return updateValue({ ...(value ?? {}), ...newValue })
  }

  const confirmRemoveTable = () => {
    setDialog({ type: "table", callback: removeTable })
  }
  const removeTable = () => {
    resetValue()
    setDialog(null)
  }

  const addRows = (count: number = 1) => {
    const newValue = deepClone(value)

    const templateCells = newValue.rows[1].cells

    const newCells = templateCells?.map((cell, i) => {
      return {
        _type: "cell",
        value: "",
        suffix: cell?.suffix,
        prefix: cell?.prefix,
        type: cell?.type,
        calculation: cell?.calculation,
      }
    })

    for (let i = 0; i < count; i++) {
      const cellsWithNewKey = newCells?.map((item, index) => {
        return { ...item, _key: nanoid() + index, _type: "cell" }
      })

      newValue.rows.push({
        _type: "tableRow",
        _key: nanoid() + i,
        cells: cellsWithNewKey,
      })
    }
    // return updateValue(newValue)
  }

  const addRowAt = (index: number = 1, isHeader = false) => {
    const newValue = deepClone(value)

    const templateCells = value.rows[1].cells

    const newCells = templateCells?.map((cell, i) => {
      if (isHeader)
        return {
          _type: "cell",
          value: "",
          type: "header",
          _key: nanoid() + i,
        }

      return {
        _type: "cell",
        value: "",
        suffix: cell?.suffix,
        prefix: cell?.prefix,
        type: cell?.type ?? "text",
        _key: nanoid() + i,
      }
    })

    newValue.rows.splice(index, 0, {
      _type: "tableRow",
      _key: nanoid(),
      cells: newCells,
    })

    return updateValue(newValue)
  }

  const removeRow = (index: number) => {
    const newValue = deepClone(value)
    newValue.rows.splice(index, 1)
    updateValue(newValue)
    setDialog(null)
  }

  const confirmRemoveRow = (index: number) => {
    if (value.rows.length <= 1) return confirmRemoveTable()
    return setDialog({ type: "row", callback: () => removeRow(index) })
  }

  const confirmRemoveColumn = (index: number) => {
    if (value.rows[0].cells.length <= 1) return confirmRemoveTable()
    return setDialog({ type: "column", callback: () => removeColumn(index) })
  }

  const addNumberColumns = (
    count: number,
    prefix?: string,
    suffix?: string,
    toBeSummed?: boolean,
    title?: string
  ) => {
    const newValue = deepClone(value)

    newValue.rows.forEach((_, i) => {
      for (let j = 0; j < count; j++) {
        newValue.rows[i].cells.push({
          _type: "cell",
          value: "",
          prefix: prefix,
          suffix: suffix,
          type: "number",
          calculation: {
            toBeSummed: toBeSummed,
            title: title ?? "Totalt",
            // _type: "calculation",
          },
          _key: nanoid() + i,
        })
      }
    })

    return updateValue(newValue)
  }

  const editNumberColumns = (
    index: number,
    numColState?: {
      prefix?: string
      suffix?: string
      calculation?: { toBeSummed?: boolean; title?: string }
    }
  ) => {
    const newValue = deepClone(value)

    newValue.rows.forEach((_, i) => {
      newValue.rows[i].cells[index].prefix = numColState?.prefix ?? ""
      newValue.rows[i].cells[index].suffix = numColState?.suffix ?? ""
      newValue.rows[i].cells[index].calculation = {
        toBeSummed: numColState?.calculation?.toBeSummed ?? false,
        title: numColState?.calculation?.title ?? "",
      }
    })

    // const editedNumCols = newValue?.rows?.map((item, i) => {
    //   if (item?.cells[index]?.type === "number") {
    //     return {
    //       ...item?.cells[index],
    //       prefix: prefix,
    //       suffix: suffix,
    //       calculation: calculation,
    //     }
    //   }

    //   return item
    // })

    // console.log("EDITED NUM COLS", editedNumCols)

    // newValue.rows.forEach((_, i) => {
    //   for (let j = 0; j < count; j++) {
    //     newValue.rows[i].cells.push({
    //       value: "",
    //       prefix: prefix,
    //       suffix: suffix,
    //       type: "number",
    //       calculation: {
    //         toBeSummed: toBeSummed,
    //         title: title ?? "Totalt",
    //       },
    //       _key: nanoid() + i,
    //     })
    //   }
    // })

    // return updateValue(newValue)
  }

  const addColumns = (count: number) => {
    const newValue = deepClone(value)
    // Add a cell to each of the rows
    newValue.rows.forEach((_, i) => {
      for (let j = 0; j < count; j++) {
        newValue.rows[i].cells.push({
          _type: "cell",
          value: "",
          type: "text",
          _key: nanoid() + i,
        })
      }
    })
    return updateValue(newValue)
  }

  const addColumnAt = (index: number) => {
    const newValue = deepClone(value)

    newValue.rows.forEach((_, i) => {
      newValue.rows[i].cells.splice(
        index,
        { _type: "cell", value: "", type: "text", _key: nanoid() + i },
        { _type: "cell", value: "", type: "text", _key: nanoid() + i }
      )
    })

    return updateValue(newValue)
  }

  const removeColumn = (index: number) => {
    const newValue = deepClone(value)
    newValue.rows.forEach((row) => {
      row.cells.splice(index, 1)
    })
    updateValue(newValue)
    setDialog(null)
  }

  const updateCell = (
    e: FormEvent<HTMLInputElement>,
    rowIndex: number,
    cellIndex: number,
    _key: string
  ) => {
    const newValue = deepClone(value)
    const oldCell = value.rows[rowIndex].cells[cellIndex]

    newValue.rows[rowIndex].cells[cellIndex] =
      oldCell.type === "number"
        ? {
            _type: "cell",
            value: (e.target as HTMLInputElement).value,
            type: "number",
            prefix: oldCell.prefix,
            suffix: oldCell.suffix,
            calculation: oldCell.calculation,
            _key: oldCell?._key,
          }
        : {
            _type: "cell",
            value: (e.target as HTMLInputElement).value,
            type: "text",
            _key: oldCell?._key,
          }

    return updateValue(newValue)
  }

  const updateHeader = (useFirstRowAsHeader) => {
    const newValue = deepClone(value)

    newValue.useFirstRowAsHeader = useFirstRowAsHeader

    return updateValue(newValue)
  }

  return (
    <>
      <div
        style={{
          marginTop: 30,
          paddingTop: 30,
          borderTop: 2,
          borderStyle: "solid",
          borderColor: "#dae2e8",
          padding: 10,
          borderRadius: 10,
          backgroundColor: "#F0F8FF",
        }}
      >
        {dialog && (
          <Dialog
            header={`Remove ${dialog.type}`}
            id="dialog-remove"
            onClose={() => setDialog(null)}
            zOffset={1000}
          >
            <Card padding={4}>
              <Text>Are you sure you want to remove this {dialog.type}?</Text>
              <Box marginTop={4}>
                <Inline space={1} style={{ textAlign: "right" }}>
                  <Button
                    text="Cancel"
                    mode="ghost"
                    onClick={() => setDialog(null)}
                  />
                  <Button
                    text="Confirm"
                    tone="critical"
                    onClick={() => dialog.callback()}
                  />
                </Inline>
              </Box>
            </Card>
          </Dialog>
        )}
        <Flex align="flex-start" justify="space-between">
          {/* <FormField
            label={type.title}
            __unstable_markers={markers}
            description={type.description}
            level={level}
            __unstable_changeIndicator={false}
          >
            <p></p>
          </FormField> */}
          {value?.rows?.length && (
            <TableMenu
              addColumns={addColumns}
              addColumnAt={addColumnAt}
              addRows={addRows}
              addRowAt={addRowAt}
              addNumberColumns={addNumberColumns}
              remove={confirmRemoveTable}
              placement="left"
              useFirstRowAsHeader={value.useFirstRowAsHeader}
              updateHeader={updateHeader}
              numColState={numColState}
              numColActions={numColActions}
            />
          )}
        </Flex>

        {value?.rows?.length && (
          <TableInput
            rows={value.rows}
            removeRow={confirmRemoveRow}
            removeColumn={confirmRemoveColumn}
            updateCell={updateCell}
            useFirstRowAsHeader={value?.useFirstRowAsHeader}
            numColState={numColState}
            numColActions={numColActions}
            editNumberColumns={editNumberColumns}
          />
        )}

        {(!value || !value?.rows?.length) && (
          <TableControl create={createTable} />
        )}
      </div>
    </>
  )
}

export default TableComponent

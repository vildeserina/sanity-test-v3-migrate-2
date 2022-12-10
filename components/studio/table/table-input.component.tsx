import { Box, Button, Card, Flex, Label, Text, TextInput } from "@sanity/ui"
import { Gear, MinusCircle } from "phosphor-react"
import React, { FunctionComponent, useState } from "react"

import type { TableRow } from "./table.component"
import styles from "./table.module.css"
import { NumColType, TableDialog } from "./table-dialog.component"

const TableInput: FunctionComponent<{
  rows: TableRow[]
  updateCell: (e: any, rowIndex: number, cellIndex: number) => any
  removeRow: (index: number) => any
  removeColumn: (index: number) => any
  useFirstRowAsHeader: boolean
  numColActions: NumColType["numColActions"]
  numColState: NumColType["numColState"]
  editNumberColumns: (
    index: number,
    prefix?: string,
    suffix?: string,
    calculation?: { toBeSummed?: boolean; title?: string }
  ) => any
}> = (props) => {
  const [dialog, setDialog] = useState<{
    title: string
    type: string
    callback: (count: number, prefix?: string, suffix?: string) => any
  } | null>(null)

  const { useFirstRowAsHeader, numColState, numColActions } = props

  const editNumCol = (i) => {
    setDialog({
      title: "tallkolonne",
      type: "number",
      callback: (index, numColState) => props.editNumberColumns(i, numColState),
    })
  }

  const onConfirm = (index) => {
    setDialog(null)
    dialog.callback(index, numColState?.prefix, numColState?.suffix)
    // numColActions?.resetNumColState()
  }

  const renderRowCell =
    (rowIndex: number, isHeader?: boolean) =>
    // eslint-disable-next-line react/display-name
    (
      cell: {
        _key: string
        value: string
        prefix?: string
        suffix?: string
        type: string
        calculation: {
          toBeSummed: boolean
          title: string
        }
      },
      cellIndex: number
    ) =>
      (
        <td
          id={`cell-${rowIndex}-${cellIndex}`}
          key={`cell-${rowIndex}-${cellIndex}–${isHeader}–${cell._key}`}
        >
          <Card
            scheme={isHeader ? "dark" : "light"}
            tone={cell?.type == "number" || isHeader ? "primary" : "default"}
          >
            <TextInput
              type={"text"}
              prefix={
                !isHeader &&
                cell?.prefix && <InputText title={cell?.prefix} type="prefix" />
              }
              suffix={
                !isHeader &&
                cell?.suffix && <InputText title={cell?.suffix} type="suffix" />
              }
              fontSize={1}
              padding={3}
              value={cell?.value}
              border={false}
              onChange={(e) => props.updateCell(e, rowIndex, cellIndex)}
            />
          </Card>
        </td>
      )

  const renderRow = (row: TableRow, rowIndex: number, isHeader?: boolean) => {
    const renderCell = renderRowCell(rowIndex, isHeader)

    if (useFirstRowAsHeader && !isHeader && rowIndex == 0) return null

    return (
      <tr id={`row-${rowIndex}`} key={`row-${rowIndex}`}>
        {row.cells.map(renderCell)}

        <td>
          <Box marginLeft={1} style={{ textAlign: "center" }}>
            <Button
              icon={MinusCircle}
              style={{ borderColor: "#dae2e8", border: 2, borderRadius: 30 }}
              padding={1}
              onClick={() => props.removeRow(rowIndex)}
              mode="bleed"
            />
          </Box>
        </td>
      </tr>
    )
  }

  const sumCells = props.rows[0]?.cells?.filter(
    (item) => item?.type == "number" && item?.calculation?.toBeSummed
  )

  return (
    <>
      <table className={styles.table}>
        {useFirstRowAsHeader && (
          <thead>{renderRow(props.rows[0], 0, true)}</thead>
        )}
        <tbody>
          {props.rows.map((item, i) => renderRow(item, i))}

          <tr>
            {sumCells?.length > 0 &&
              props.rows[0]?.cells?.map((item, colIndex) => {
                if (item?.type == "number" && item?.calculation?.toBeSummed) {
                  const totalSum = props?.rows?.reduce((acc, curr) => {
                    const value =
                      parseFloat(curr?.cells[colIndex]?.value ?? "0") ?? 0

                    if (isNaN(value)) return acc

                    return acc + value
                  }, 0)

                  return (
                    <td
                      id={item?._key + colIndex}
                      key={`${item?._key}_${colIndex}_${item?.calculation?.title}`}
                      style={{
                        backgroundColor: "#e8f1fe",
                        color: "#132540",
                        padding: "8px",
                        opacity: 0.8,
                      }}
                    >
                      <Flex direction={"column"} gap={2}>
                        <Label size={0}>{item?.calculation?.title}</Label>
                        <Text size={1}>
                          {isNaN(totalSum) ? (
                            <span></span>
                          ) : (
                            <>
                              {item?.prefix && (
                                <span
                                  style={{ opacity: 0.5, marginRight: "5px" }}
                                >
                                  {item?.prefix.toLowerCase()}
                                </span>
                              )}
                              {totalSum}{" "}
                              {item?.suffix && (
                                <span
                                  style={{ opacity: 0.3, marginLeft: "5 px" }}
                                >
                                  {item?.suffix.toLowerCase()}
                                </span>
                              )}
                            </>
                          )}
                        </Text>
                      </Flex>
                    </td>
                  )
                }

                return (
                  <td
                    key={`${item?._key}_${colIndex}`}
                    style={{
                      backgroundColor: "#fff",
                      opacity: 0.5,
                    }}
                  ></td>
                )
              })}
          </tr>

          <tr>
            {(props.rows[0]?.cells || []).map((item, i) => (
              <td key={i + item?._key}>
                <Flex justify={"center"}>
                  <Box marginTop={1} style={{ textAlign: "center" }}>
                    <Button
                      icon={MinusCircle}
                      style={{
                        borderColor: "#dae2e8",
                        border: 2,
                        borderRadius: 30,
                      }}
                      padding={1}
                      onClick={() => props.removeColumn(i)}
                      mode="bleed"
                    />
                  </Box>
                  <Box marginTop={1} style={{ textAlign: "center" }}>
                    {item?.type == "number" && (
                      <Button
                        icon={Gear}
                        fontSize={1}
                        padding={1}
                        radius={5}
                        onClick={async () => {
                          numColActions?.updateState(item)
                          editNumCol(i)
                        }}
                        tone="primary"
                        mode={"ghost"}
                        style={{
                          marginBottom: 10,
                          marginLeft: 10,
                          paddingBottom: 1,
                        }}
                      />
                    )}
                  </Box>
                  {dialog && (
                    <TableDialog
                      title={dialog?.title}
                      type={dialog?.type}
                      setDialog={setDialog}
                      onConfirm={onConfirm}
                      dialogType="edit"
                      numColActions={numColActions}
                      numColState={numColState}
                    />
                  )}
                </Flex>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </>
  )
}

const InputText = ({ title, type }) => {
  let renderedTitle = title?.toUpperCase()
  if (title?.length > 4 && type == "prefix") {
    renderedTitle = title.substring(0, 4) + ".."
  }

  if (title?.length > 10 && type == "suffix") {
    renderedTitle = title.substring(0, 10) + ".."
  }

  return (
    <Card padding={1}>
      <Text
        size={0}
        muted={true}
        style={title?.length > 7 ? { fontSize: "6px" } : {}}
      >
        {renderedTitle}
      </Text>
    </Card>
  )
}

export default TableInput

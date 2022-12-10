import React, { FunctionComponent } from "react"

import type { TableRow } from "./table.component"
import styles from "./table.module.css"

const TablePreview: FunctionComponent<{
  rows: TableRow[]
  enableHeader?: boolean
}> = (props) => {
  return <p>Table preview</p>
  // return (
  //   <table className={styles.tablePreview}>
  //     <tbody>
  //       {props.rows.map((row, index) => (
  //         <tr
  //           key={row._key}
  //           style={index == 0 && { backgroundColor: "#f2f2f2" }}
  //         >
  //           {row.cells.map((cell, j) => (
  //             <td key={`${row._key}-${j}`}>{cell}</td>
  //           ))}
  //         </tr>
  //       ))}
  //     </tbody>
  //   </table>
  // )
}

export default TablePreview

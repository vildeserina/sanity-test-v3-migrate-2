import {
  Box,
  Card,
  Flex,
  Inline,
  Label,
  Switch,
  Text,
  TextInput,
} from "@sanity/ui"
import React, { FunctionComponent, useState } from "react"

import { NumColType } from "./table-dialog.component"

export const NumColInputs = ({ numColState, numColActions }: NumColType) => {
  const {
    suffix = "",
    prefix = "",
    calculation: { toBeSummed = false, title = "" } = {},
  } = numColState

  const { updatePrefix, updateSuffix, updateSumTitle, updateToBeSummed } =
    numColActions

  return <p>Hello</p>

  // return (
  // <div>
  //   <TextInput
  //     style={{ textAlign: "left" }}
  //     fontSize={2}
  //     padding={3}
  //     type="text"
  //     value={prefix}
  //     onChange={updatePrefix}
  //     // onChange={(e) => setPrefix(e.currentTarget.value)}
  //     placeholder="Prefix"
  //   />

  //   <TextInput
  //     style={{ textAlign: "left" }}
  //     fontSize={2}
  //     padding={3}
  //     type="text"
  //     value={suffix}
  //     onChange={updateSuffix}
  //     // onChange={(e) => setSuffix(e.currentTarget.value)}
  //     placeholder="Suffix"
  //   />
  //   <Card padding={2} marginY={3} radius={4} marginLeft={10} border={true}>
  //     <Inline space={[3, 3, 4, 5]}>
  //       <Box>
  //         <Flex
  //           padding={1}
  //           gap={2}
  //           align="center"
  //           width={"full"}
  //           justify={"space-between"}
  //         >
  //           <Text size={2}>Summer tall i kolonne</Text>
  //           <Switch
  //             checked={toBeSummed}
  //             onChange={() => updateToBeSummed(!toBeSummed)}
  //           />
  //         </Flex>
  //       </Box>
  //     </Inline>
  //   </Card>
  //   {toBeSummed && (
  //     <Flex gap={2} direction="column">
  //       <Label size={1}>Tittel på sum</Label>
  //       <TextInput
  //         style={{ textAlign: "left" }}
  //         fontSize={2}
  //         padding={3}
  //         type="text"
  //         value={title}
  //         onChange={updateSumTitle}
  //         // onChange={(e) => setSuffix(e.currentTarget.value)}
  //         placeholder="Totalt"
  //       />
  //     </Flex>
  //   )}
  // </div>
  // )
}

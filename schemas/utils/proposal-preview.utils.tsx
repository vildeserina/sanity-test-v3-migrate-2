import {
  Avatar,
  Badge,
  Box,
  Card,
  Container,
  Flex,
  Grid,
  Inline,
  Label,
  Stack,
  Text,
} from "@sanity/ui"
import React from "react"
import { useFormValue } from "sanity"
import { ProposalSectionType } from "types/proposal.types"

import { defaultColorList } from "./generate-color-theme.utils.schema"

const ProposalPreviewComponent = (props, ref) => {
  const layout: any = useFormValue([`layout`])

  const {
    title,
    section,
    bgColor,
    secondaryColor,
    subtitle,
  }: {
    title?: string
    section: string
    bgColor?: "yellow" | "black" | "beige" | "green"
    secondaryColor?: "yellow" | "black" | "beige" | "green"
    subtitle?: string
  } = props.value || {}
  const Icon = props?.icon
  const Media = props?.media

  const isShortcut = section == "Snarvei"

  const showColors = props?.document?.layout == "full"

  // console.log("MEDIA", media)

  console.log(props)

  return (
    <Card
      radius={2}
      paddingY={isShortcut ? 4 : 3}
      paddingX={3}
      tone={isShortcut ? "primary" : "default"}
    >
      <Flex justify={"space-between"} align="center" gap={2}>
        <Flex gap={1}>
          <Box margin={1}>
            {props?.media ? <Media /> : props?.icon ? <Icon /> : ""}
          </Box>
          <Stack space={3}>
            <Inline>
              <Badge tone="primary" fontSize={1}>
                {section}
              </Badge>
            </Inline>

            <Text weight="semibold" size={2}>
              {title ?? section}
            </Text>

            <Text muted={true} size={0}>
              {subtitle}
            </Text>
          </Stack>
        </Flex>
        <Box padding={2}>
          <Flex align="flex-end" direction="column" gap={2}>
            {showColors && layout && typeof layout == "string" && (
              <Badge mode="outline" fontSize={1}>
                {layout ?? "Ingen layout"}
              </Badge>
            )}

            {showColors && (
              <Inline space={1}>
                {bgColor && (
                  <Badge mode="outline" fontSize={1}>
                    <Inline space={1}>
                      <div
                        style={{
                          padding: 6,
                          borderRadius: 990,
                          backgroundColor: bgColor,
                        }}
                      ></div>
                      {defaultColorList[bgColor].title}
                    </Inline>
                  </Badge>
                )}
                {secondaryColor && (
                  <Badge mode="outline" fontSize={1}>
                    <Inline space={1}>
                      <div
                        style={{
                          padding: 6,
                          borderRadius: 990,
                          backgroundColor: secondaryColor,
                        }}
                      ></div>
                      {defaultColorList[secondaryColor].title}
                    </Inline>
                  </Badge>
                )}
              </Inline>
            )}
          </Flex>
        </Box>
      </Flex>
    </Card>
  )
}

export default ProposalPreviewComponent

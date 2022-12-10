import {
  Avatar,
  Badge,
  Box,
  Flex,
  Inline,
  Label,
  Stack,
  Text,
} from "@sanity/ui"
import { ArticleMedium, FileText, Image } from "phosphor-react"
import React from "react"

export const SingleOption = ({
  image,
  title,
  description,
  tags,
  documentType,
  categories,
}) => {
  if (!title) return null

  return (
    <Flex align="center">
      <Box paddingLeft={3} paddingY={2}>
        {image ? (
          <Avatar src={image} size={2} />
        ) : documentType === "proposalTemplateText" ? (
          <ArticleMedium />
        ) : documentType === "proposalGallerySection" ? (
          <Image alt="" />
        ) : (
          <FileText size={25} />
        )}
      </Box>
      <Box flex={1} padding={4}>
        <Stack space={[2, 2, 3]}>
          <Text size={[2, 2, 3]}>{title}</Text>
          {description && (
            <Label size={1} style={{ opacity: 0.5 }}>
              {description}
            </Label>
          )}
          {categories?.length && (
            <Inline space={2}>
              {categories?.map((category, index) => (
                <Badge
                  key={`${category}_${title}_${index}`}
                  size={1}
                  tone={"primary"}
                >
                  {category}
                </Badge>
              ))}
            </Inline>
          )}
          {tags?.length && (
            <Inline space={2}>
              {tags?.map((tag) => (
                <Badge
                  key={`${tag}_${title}`}
                  size={1}
                  tone={"primary"}
                  mode="outline"
                >
                  {tag}
                </Badge>
              ))}
            </Inline>
          )}
        </Stack>
      </Box>
    </Flex>
  )
}

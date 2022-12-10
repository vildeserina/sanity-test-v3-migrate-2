import CreateProposalCopy from "components/studio/proposal/create-proposal-copy.studio.component"
import CreateTemplate from "components/studio/proposal/create-template.studio.component"
import { capitalize } from "lib/utils/string-utils"

export default function generateCreateTemplate({
  hidden = false,
  group,
  title,
  required,
  fieldset,
  isHighlighted = false,
  templateType = "proposal",
  sourceType = "document",
}: {
  hidden?: boolean
  group?: string
  title?: string
  required?: boolean
  fieldset?: string
  isHighlighted?: boolean
  templateType?: string
  sourceType?: string
}) {
  const groupType = group && { group: group }
  const hiddenType = hidden && { hidden: hidden }
  const fieldsetType = fieldset && { fieldset: fieldset }

  return {
    name: "create" + capitalize(templateType),
    title: title ?? "Lagre som mal",
    type: "object",
    options: {
      hotspot: true,
    },
    ...(hiddenType && hiddenType),
    ...(groupType && groupType),
    ...(fieldsetType && fieldsetType),
    ...(required && { validation: (Rule) => Rule.required() }),
    components: { field: CreateTemplate },
    fields: [
      {
        name: "templateType",
        type: "string",
        hidden: true,
        initialValue: templateType,
        value: templateType,
      },
      {
        name: "sourceType",
        type: "string",
        hidden: true,
        initialValue: sourceType,
        value: sourceType,
      },
      {
        name: "isHighlighted",
        type: "boolean",
        hidden: true,
        value: isHighlighted ?? false,
      },
    ],
  }
}

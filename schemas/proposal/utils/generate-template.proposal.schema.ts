import FetchTemplateData from "components/studio/proposal/fetch-template-data.studio.component"

export default function generateTemplate({
  hidden = false,
  group,
  title,
  required,
  fieldset,
  name = "template",
  templateType = "proposal",
  parentKey,
}: {
  hidden?: boolean | ((props: any) => boolean)
  group?: string
  title?: string
  required?: boolean
  fieldset?: string
  name?: string
  templateType?: string
  parentKey?: string
}) {
  const groupType = group && { group: group }
  const hiddenType = hidden && { hidden: hidden }
  const fieldsetType = fieldset && { fieldset: fieldset }

  return {
    name: name,
    title: title ?? "Velg mal",
    type: "object",
    options: {
      hotspot: true,
    },
    ...(hiddenType && hiddenType),
    ...(groupType && groupType),
    ...(fieldsetType && fieldsetType),
    ...(required && { validation: (Rule) => Rule.required() }),
    components: { field: FetchTemplateData },
    fields: [
      {
        name: "templateType",
        type: "string",
        hidden: true,
        initialValue: templateType,
        value: templateType,
      },
      {
        name: "parentKey",
        type: "string",
        hidden: true,
        initialValue: parentKey,
        value: parentKey,
      },
      {
        name: "description",
        type: "string",
        hidden: true,
      },
      {
        name: "tags",
        type: "array",
        of: [{ type: "string" }],
        hidden: true,
      },
      {
        name: "categories",
        type: "array",
        of: [{ type: "string" }],
        hidden: true,
      },
      {
        name: "id",
        type: "string",
        hidden: true,
      },
      {
        name: "image",
        type: "url",
        hidden: true,
      },
    ],
  }
}

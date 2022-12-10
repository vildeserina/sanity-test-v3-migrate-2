export const defaultColorList = {
  beige: { title: "Beige", value: "beige", emoji: "⚪️", color: "#ECE5DA" },
  black: { title: "Svart", value: "black", emoji: "⚫️", color: "#29282B" },
  yellow: { title: "Gul", value: "yellow", emoji: "🟡", color: "#F4B45A" },
  green: { title: "Grønn", value: "green", emoji: "🟢", color: "#31A37C" },
}

export default function generateColorTheme({
  colorList,
  initialValue,
  hidden = false,
  group,
  name,
  fieldset,
  title,
}: {
  title?: string
  colorList?: any
  initialValue?: string
  hidden?: boolean | ((props: any) => boolean)
  group?: string
  name?: string
  fieldset?: string
}) {
  const hiddenType = hidden && { hidden: hidden }
  const groupType = group && { group: group }
  const fieldsetType = fieldset && { fieldset: fieldset }

  return {
    title: title ?? "Fargetema",
    name: name ?? "colorTheme",
    type: "string",
    ...(hiddenType && hiddenType),
    ...(groupType && groupType),
    ...(fieldsetType && fieldsetType),
    options: {
      list: colorList ?? [
        { title: "Beige", value: "beige" },
        { title: "Gul", value: "yellow" },
        { title: "Grønn", value: "green" },
      ],
      layout: "radio",
      direction: "horizontal",
    },
    initialValue: initialValue ?? "beige",
  }
}

export function portableToString(blocks = []) {
  return (
    blocks
      // loop through each block
      .map((block) => {
        // if it's not a text block with children,
        // return nothing
        if (block._type !== "block" || !block.children) {
          return ""
        }
        // loop through the children spans, and join the
        // text strings
        return block.children.map((child) => child.text).join("")
      })
      // join the paragraphs leaving split by two linebreaks
      .join("\n\n")
  )
}

export function truncate(str, n) {
  return str.length > n ? str.slice(0, n - 1) + "..." : str
}

export function createSingleString(list, final) {
  const cleanedList = list.filter(Boolean)
  const subtitle = cleanedList.length > 0 ? `${cleanedList.join(", ")}` : ""
  const hasMore = Boolean(final)

  return hasMore ? `${subtitle}…` : subtitle
}

export const capitalize = (s) => {
  if (typeof s !== "string") return ""
  return s.charAt(0).toUpperCase() + s.slice(1)
}

import { Download } from "phosphor-react"

export const brandDownload = {
  name: "brandDownload",
  title: "Fil",
  type: "object",
  icon: Download,
  fields: [
    {
      name: "file",
      title: "Last opp fil",
      type: "file",
    },
    {
      name: "title",
      title: "Tittel på nedlastingsknapp",
      type: "string",
    },
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: title ? title : " ",
        media: Download,
      }
    },
  },
}

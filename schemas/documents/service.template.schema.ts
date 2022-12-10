import { Folder } from "phosphor-react"

import { service } from "./service.schema"

export const serviceTemplate = {
  name: "serviceTemplate",
  type: "document",
  title: "Mal for tjenester",
  icon: Folder,
  groups: [
    {
      title: "Grunnleggende",
      name: "general",
    },
    {
      title: "Sidetopp",
      name: "hero",
    },
    {
      title: "Innhold",
      name: "content",
      default: true,
    },
    {
      title: "Metadata / SEO",
      name: "meta",
    },
  ],
  fields: service.fields,
}

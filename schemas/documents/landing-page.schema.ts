import { Megaphone } from "phosphor-react"

import { page } from "./page.schema"

export const landingPage = {
  name: "landingPage",
  type: "document",
  title: "Landingsside",
  icon: Megaphone,
  groups: page.groups,
  fields: page.fields,
}

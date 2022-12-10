import { Megaphone } from "phosphor-react"

const allCtaDocs = ["article", "service", "page", "caseStudy"]

export const ctaSettings = {
  name: "ctaSettings",
  type: "document",
  title: "Mal for sidebunn",
  icon: Megaphone,
  fields: allCtaDocs.map((doc) => {
    return {
      name: doc,
      type: "reference",
      title: "Velg mal for " + doc,
      to: [{ type: "ctaTemplate" }],
    }
  }),
}

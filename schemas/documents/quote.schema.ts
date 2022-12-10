import { Quotes } from "phosphor-react"

export const quote = {
  name: "quote",
  title: "Sitat",
  icon: Quotes,
  type: "document",
  fields: [
    {
      name: "content",
      title: "Sitat",
      type: "text",
    },
    {
      title: "Navn og tittel",
      name: "title",
      description: "F.eks. 'Karina Bergman, Kolbotn Eiendom AS'",
      type: "string",
    },
    {
      title: "Kunde",
      name: "customer",
      type: "reference",
      to: [{ type: "customer" }],
    },
  ],
}

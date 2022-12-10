import { Article, ChartLine } from "phosphor-react"

export const sanityTemplates = (prev, context) => {
  const { client } = context

  return [
    ...prev,
    {
      id: "defaultService",
      title: "Mal for tjeneste (anbefalt)",
      schemaType: "service",
      icon: ChartLine,
      value: async () => {
        const response = await client.fetch(
          `*[_type == "serviceTemplate"][0]{
                  title, 
                  introduction,
                  sections
              }`
        )

        return { ...response }
      },
    },
    {
      id: "defaultCaseStudy",
      title: "Mal for prosjekt (anbefalt)",
      schemaType: "caseStudy",
      icon: Article,
      value: async () => {
        const response = await client.fetch(
          `*[_type == "caseStudyTemplate"][0]{
                introduction, 
                sections,
                title, 
                customer, 
                categories,
                partners,
                credit, 
                bottom, 
              }`
        )

        return { ...response }
      },
    },
  ]
}

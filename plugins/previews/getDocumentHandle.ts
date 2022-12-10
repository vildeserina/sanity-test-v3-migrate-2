// ./studio/resolveProductionUrl.js

import { previewSecretId } from "lib/sanity.api"

// Any random string, must match SANITY_PREVIEW_SECRET in the Next.js .env.local file

// Replace `remoteUrl` with your deployed Next.js site
const remoteURL = "https://holi-theta.vercel.app"
const localUrl = `http://localhost:3000`

export default function resolveProductionUrl(doc) {
  const baseUrl =
    typeof window !== "undefined" && window?.location.hostname === "localhost"
      ? localUrl
      : remoteURL

  const previewUrl = new URL(baseUrl)

  const slug = getDocumentHandle(doc) + doc?.slug?.current

  previewUrl.pathname = `/api/preview`
  previewUrl.searchParams.append(`secret`, previewSecretId)
  previewUrl.searchParams.append(`slug`, slug ?? `/`)

  return previewUrl.toString()
}

export function getDocumentHandle(document) {
  // @FIXME Add document handles to make sure preview works
  switch (document._type) {
    case "brandGuideline":
      return "designmanual/"
    case "service":
      return "tjenester/"
    case "caseStudy":
      return "prosjekter/"
    case "article":
      return "artikler/"
    case "proposal":
      return "tilbud/"
    case "proposalTemplate":
      return "tilbud/mal/"
    default:
      return ""
  }
}

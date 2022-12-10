// import S from "@sanity/desk-tool/structure-builder"
import { Eye, PencilSimpleLine } from "phosphor-react"
import Iframe from "sanity-plugin-iframe-pane"

import resolveProductionUrl from "./getDocumentHandle"

export const standardViews = (S) => [
  S.view.form().icon(PencilSimpleLine),

  S.view
    .component(Iframe)
    .icon(Eye)
    .options({
      // Required: Accepts an async function
      url: (doc) => resolveProductionUrl(doc),
      // Optional: Set the default size
      defaultSize: `desktop`, // default `desktop`
      // Optional: Add a reload button, or reload on new document revisions
      reload: {
        button: true,
        revision: true,
      },
    })
    .title("Preview"),
]
